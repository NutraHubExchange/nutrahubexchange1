"""
RFQ Management API Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID
from datetime import datetime

from app.core.database import get_db
from app.schemas.rfq import RFQCreate, RFQResponse, RFQUpdate
from app.models.rfq import RFQ, RFQStatus
from app.models.company import Company
from app.ml.spec_parser import SpecParser
from app.services.matching_service import MatchingService
from loguru import logger

router = APIRouter()

# Initialize services
spec_parser = SpecParser()
matching_service = MatchingService()


@router.post("/", response_model=RFQResponse, status_code=status.HTTP_201_CREATED)
async def create_rfq(
    rfq_data: RFQCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new RFQ (Request for Quotation)
    
    **Process:**
    1. Parse specification text using NLP
    2. Normalize ingredient name using ontology
    3. Extract requirements (assay, grade, certifications, etc.)
    4. Store RFQ in database
    5. Trigger async matching if auto-publish enabled
    """
    
    # Generate RFQ number
    rfq_number = f"RFQ-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8].upper()}"
    
    # Parse specifications using NLP
    logger.info(f"Parsing specification for RFQ {rfq_number}")
    parsed_specs = await spec_parser.parse(rfq_data.raw_specification)
    
    logger.info(f"Parsed specs: {parsed_specs}")
    
    # Create RFQ
    rfq = RFQ(
        rfq_number=rfq_number,
        buyer_company_id=rfq_data.buyer_company_id,
        created_by_user_id=rfq_data.created_by_user_id,
        ingredient_name=parsed_specs.get("ingredient", rfq_data.ingredient_name),
        raw_specification=rfq_data.raw_specification,
        parsed_specs=parsed_specs,
        quantity_required_kg=rfq_data.quantity_required_kg,
        target_price_usd=rfq_data.target_price_usd,
        max_budget_usd=rfq_data.max_budget_usd,
        delivery_deadline=rfq_data.delivery_deadline,
        quotation_deadline=rfq_data.quotation_deadline,
        incoterm=rfq_data.incoterm,
        payment_terms=rfq_data.payment_terms,
        status=RFQStatus.DRAFT if not rfq_data.auto_publish else RFQStatus.PUBLISHED,
        published_at=datetime.utcnow() if rfq_data.auto_publish else None
    )
    
    db.add(rfq)
    await db.flush()
    await db.refresh(rfq)
    
    # Trigger matching in background if published
    if rfq_data.auto_publish:
        logger.info(f"Triggering async matching for {rfq_number}")
        background_tasks.add_task(
            matching_service.find_and_rank_sellers,
            rfq_id=rfq.id,
            db=db
        )
    
    return rfq


@router.get("/{rfq_id}", response_model=RFQResponse)
async def get_rfq(
    rfq_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get RFQ by ID"""
    result = await db.execute(
        select(RFQ).where(RFQ.id == rfq_id)
    )
    rfq = result.scalar_one_or_none()
    
    if not rfq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"RFQ {rfq_id} not found"
        )
    
    return rfq


@router.post("/{rfq_id}/publish")
async def publish_rfq(
    rfq_id: UUID,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """
    Publish RFQ and trigger seller matching
    """
    result = await db.execute(
        select(RFQ).where(RFQ.id == rfq_id)
    )
    rfq = result.scalar_one_or_none()
    
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    
    if rfq.status != RFQStatus.DRAFT:
        raise HTTPException(
            status_code=400,
            detail=f"RFQ is already {rfq.status}"
        )
    
    # Update status
    rfq.status = RFQStatus.PUBLISHED
    rfq.published_at = datetime.utcnow()
    
    await db.flush()
    
    # Trigger matching
    logger.info(f"Publishing RFQ {rfq.rfq_number}, triggering matching")
    background_tasks.add_task(
        matching_service.find_and_rank_sellers,
        rfq_id=rfq.id,
        db=db
    )
    
    return {"message": "RFQ published, matching initiated", "rfq_id": str(rfq.id)}


@router.get("/{rfq_id}/matches")
async def get_rfq_matches(
    rfq_id: UUID,
    min_score: float = 0.6,
    limit: int = 20,
    db: AsyncSession = Depends(get_db)
):
    """
    Get seller matches for an RFQ with explanations
    """
    from app.models.rfq import RFQMatch
    
    result = await db.execute(
        select(RFQMatch)
        .where(RFQMatch.rfq_id == rfq_id)
        .where(RFQMatch.match_score >= min_score)
        .order_by(RFQMatch.rank)
        .limit(limit)
    )
    
    matches = result.scalars().all()
    
    return {
        "rfq_id": str(rfq_id),
        "total_matches": len(matches),
        "matches": [
            {
                "seller_id": str(m.seller_company_id),
                "sku_id": str(m.sku_id) if m.sku_id else None,
                "match_score": float(m.match_score),
                "rank": m.rank,
                "explanation": m.explanation,
                "recommended_price_usd": float(m.recommended_price_usd) if m.recommended_price_usd else None,
                "auto_bid_eligible": m.auto_bid_eligible
            }
            for m in matches
        ]
    }


@router.get("/", response_model=List[RFQResponse])
async def list_rfqs(
    company_id: UUID = None,
    status: RFQStatus = None,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    """List RFQs with filters"""
    query = select(RFQ)
    
    if company_id:
        query = query.where(RFQ.buyer_company_id == company_id)
    
    if status:
        query = query.where(RFQ.status == status)
    
    query = query.offset(skip).limit(limit).order_by(RFQ.created_at.desc())
    
    result = await db.execute(query)
    rfqs = result.scalars().all()
    
    return rfqs
