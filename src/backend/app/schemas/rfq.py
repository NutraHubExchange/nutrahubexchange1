"""
Pydantic schemas for RFQ API
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional, Dict, List
from datetime import datetime
from decimal import Decimal
from uuid import UUID


class RFQCreate(BaseModel):
    """Schema for creating an RFQ"""
    buyer_company_id: UUID
    created_by_user_id: UUID
    ingredient_name: str = Field(..., min_length=1, max_length=255)
    raw_specification: str = Field(..., min_length=10)
    quantity_required_kg: Decimal = Field(..., gt=0)
    target_price_usd: Optional[Decimal] = Field(None, gt=0)
    max_budget_usd: Optional[Decimal] = Field(None, gt=0)
    delivery_deadline: Optional[datetime] = None
    quotation_deadline: datetime
    incoterm: Optional[str] = Field(None, max_length=10)
    payment_terms: Optional[str] = Field(None, max_length=100)
    auto_publish: bool = False
    
    @field_validator('quotation_deadline')
    def deadline_in_future(cls, v):
        if v <= datetime.utcnow():
            raise ValueError('Quotation deadline must be in the future')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "buyer_company_id": "123e4567-e89b-12d3-a456-426614174000",
                "created_by_user_id": "123e4567-e89b-12d3-a456-426614174001",
                "ingredient_name": "Curcumin Extract",
                "raw_specification": "Need 1000kg of Curcumin 95% USP powder, GMP certified, CIF Los Angeles",
                "quantity_required_kg": 1000,
                "target_price_usd": 45.0,
                "max_budget_usd": 50000.0,
                "delivery_deadline": "2024-12-31T00:00:00Z",
                "quotation_deadline": "2024-11-30T23:59:59Z",
                "incoterm": "CIF",
                "payment_terms": "30% advance, 70% on delivery",
                "auto_publish": True
            }
        }


class RFQUpdate(BaseModel):
    """Schema for updating an RFQ"""
    raw_specification: Optional[str] = None
    quantity_required_kg: Optional[Decimal] = Field(None, gt=0)
    target_price_usd: Optional[Decimal] = Field(None, gt=0)
    delivery_deadline: Optional[datetime] = None
    quotation_deadline: Optional[datetime] = None
    incoterm: Optional[str] = None
    payment_terms: Optional[str] = None


class RFQResponse(BaseModel):
    """Schema for RFQ response"""
    id: UUID
    rfq_number: str
    buyer_company_id: UUID
    ingredient_name: str
    raw_specification: str
    parsed_specs: Dict
    quantity_required_kg: Decimal
    target_price_usd: Optional[Decimal]
    max_budget_usd: Optional[Decimal]
    delivery_deadline: Optional[datetime]
    quotation_deadline: datetime
    incoterm: Optional[str]
    payment_terms: Optional[str]
    status: str
    matched_seller_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class MatchExplanation(BaseModel):
    """Explanation for a seller match"""
    spec_match: float = Field(..., ge=0, le=1)
    price_competitiveness: float = Field(..., ge=0, le=1)
    compliance_score: float = Field(..., ge=0, le=1)
    delivery_score: float = Field(..., ge=0, le=1)
    quality_history: float = Field(..., ge=0, le=1)
    reasons: List[str]


class SellerMatch(BaseModel):
    """Schema for seller match result"""
    seller_id: UUID
    seller_name: str
    sku_id: Optional[UUID]
    match_score: float = Field(..., ge=0, le=1)
    rank: int
    explanation: MatchExplanation
    recommended_price_usd: Optional[Decimal]
    auto_bid_eligible: bool


class BidCreate(BaseModel):
    """Schema for creating a bid"""
    rfq_id: UUID
    seller_company_id: UUID
    submitted_by_user_id: UUID
    sku_id: Optional[UUID]
    unit_price_usd: Decimal = Field(..., gt=0)
    quantity_offered_kg: Decimal = Field(..., gt=0)
    lead_time_days: int = Field(..., gt=0)
    delivery_date: Optional[datetime]
    incoterm: Optional[str]
    payment_terms: Optional[str]
    validity_days: int = Field(default=30, gt=0)


class BidResponse(BaseModel):
    """Schema for bid response"""
    id: UUID
    bid_number: str
    rfq_id: UUID
    seller_company_id: UUID
    unit_price_usd: Decimal
    total_price_usd: Decimal
    quantity_offered_kg: Decimal
    lead_time_days: int
    status: str
    is_auto_bid: bool
    rank: Optional[int]
    score: Optional[float]
    is_awarded: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
