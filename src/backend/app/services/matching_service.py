"""
Seller Matching Service
ML-powered matching and ranking of sellers for RFQs
"""
from typing import List, Dict
from uuid import UUID
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from loguru import logger

from app.models.company import Company, SKU
from app.models.rfq import RFQ, RFQMatch
from app.core.redis_client import redis_client


class MatchingService:
    """
    Service for matching sellers to RFQs using ML models
    """
    
    async def find_and_rank_sellers(
        self,
        rfq_id: UUID,
        db: AsyncSession
    ) -> List[RFQMatch]:
        """
        Find and rank sellers for an RFQ
        
        Process:
        1. Load RFQ details
        2. Find SKUs matching specification
        3. Calculate match scores (ML model)
        4. Generate explanations
        5. Store matches in database
        """
        
        logger.info(f"Starting matching for RFQ {rfq_id}")
        
        # Load RFQ
        result = await db.execute(select(RFQ).where(RFQ.id == rfq_id))
        rfq = result.scalar_one_or_none()
        
        if not rfq:
            logger.error(f"RFQ {rfq_id} not found")
            return []
        
        parsed_specs = rfq.parsed_specs
        
        # Find matching SKUs
        query = select(SKU).where(SKU.is_active == True)
        
        # Filter by ingredient
        if parsed_specs.get("ingredient"):
            query = query.where(
                SKU.ingredient_name.ilike(f"%{parsed_specs['ingredient']}%")
            )
        
        # Filter by grade
        if parsed_specs.get("grade"):
            query = query.where(SKU.grade == parsed_specs["grade"])
        
        result = await db.execute(query)
        matching_skus = result.scalars().all()
        
        logger.info(f"Found {len(matching_skus)} matching SKUs")
        
        # Calculate match scores for each SKU
        matches = []
        for sku in matching_skus:
            match_data = await self._calculate_match_score(
                rfq, sku, parsed_specs, db
            )
            
            if match_data["match_score"] >= 0.6:  # Threshold
                matches.append(match_data)
        
        # Sort by match score
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        
        # Assign ranks
        for i, match in enumerate(matches, 1):
            match["rank"] = i
        
        # Store in database
        for match_data in matches:
            rfq_match = RFQMatch(
                rfq_id=rfq_id,
                seller_company_id=match_data["seller_company_id"],
                sku_id=match_data["sku_id"],
                match_score=match_data["match_score"],
                rank=match_data["rank"],
                explanation=match_data["explanation"],
                recommended_price_usd=match_data["recommended_price_usd"],
                auto_bid_eligible=match_data["auto_bid_eligible"]
            )
            db.add(rfq_match)
        
        await db.flush()
        
        # Cache results
        await redis_client.cache_rfq_matches(
            str(rfq_id),
            [
                {
                    "seller_id": str(m["seller_company_id"]),
                    "match_score": float(m["match_score"]),
                    "rank": m["rank"]
                }
                for m in matches
            ]
        )
        
        logger.info(f"✅ Matching complete: {len(matches)} sellers ranked")
        
        return matches
    
    async def _calculate_match_score(
        self,
        rfq: RFQ,
        sku: SKU,
        parsed_specs: Dict,
        db: AsyncSession
    ) -> Dict:
        """
        Calculate match score using ML features
        
        Features:
        - Spec similarity (40%)
        - Price competitiveness (20%)
        - Certification compliance (20%)
        - Delivery capability (10%)
        - Quality history (10%)
        """
        
        # Load seller company
        result = await db.execute(
            select(Company).where(Company.id == sku.company_id)
        )
        seller = result.scalar_one_or_none()
        
        # Calculate feature scores
        spec_score = self._calculate_spec_match(parsed_specs, sku)
        price_score = self._calculate_price_competitiveness(rfq, sku)
        cert_score = self._calculate_certification_match(parsed_specs, sku, seller)
        delivery_score = self._calculate_delivery_score(sku, seller)
        quality_score = float(seller.rating) / 5.0 if seller else 0.5
        
        # Weighted sum (can be replaced with XGBoost model)
        match_score = (
            spec_score * 0.4 +
            price_score * 0.2 +
            cert_score * 0.2 +
            delivery_score * 0.1 +
            quality_score * 0.1
        )
        
        # Generate explanation
        explanation = self._generate_explanation(
            spec_score, price_score, cert_score, 
            delivery_score, quality_score,
            rfq, sku, seller
        )
        
        # Calculate recommended price
        recommended_price = self._calculate_recommended_price(
            sku, rfq, match_score
        )
        
        # Check auto-bid eligibility
        auto_bid_eligible = (
            match_score >= 0.85 and
            recommended_price >= sku.base_price_usd * Decimal("1.10")  # Min 10% margin
        )
        
        return {
            "seller_company_id": sku.company_id,
            "sku_id": sku.id,
            "match_score": Decimal(str(match_score)),
            "rank": 0,  # Will be set later
            "explanation": explanation,
            "recommended_price_usd": recommended_price,
            "auto_bid_eligible": auto_bid_eligible
        }
    
    def _calculate_spec_match(self, parsed_specs: Dict, sku: SKU) -> float:
        """Calculate specification match score"""
        score = 0.0
        checks = 0
        
        # Grade match
        if parsed_specs.get("grade"):
            checks += 1
            if sku.grade == parsed_specs["grade"]:
                score += 1.0
            elif sku.grade in ["USP", "Pharmaceutical Grade"]:
                score += 0.8  # Premium grade
        
        # Assay match
        if parsed_specs.get("assay_min"):
            checks += 1
            if sku.assay_min and sku.assay_min >= Decimal(str(parsed_specs["assay_min"])):
                score += 1.0
            elif sku.assay_min and sku.assay_min >= Decimal(str(parsed_specs["assay_min"])) * Decimal("0.95"):
                score += 0.8
        
        # Form match
        if parsed_specs.get("form"):
            checks += 1
            if sku.form and sku.form.lower() == parsed_specs["form"].lower():
                score += 1.0
        
        return score / checks if checks > 0 else 0.5
    
    def _calculate_price_competitiveness(self, rfq: RFQ, sku: SKU) -> float:
        """Calculate price competitiveness score"""
        if not rfq.target_price_usd or not sku.base_price_usd:
            return 0.5
        
        # Score based on how much below target price
        if sku.base_price_usd <= rfq.target_price_usd:
            # Below or at target - excellent
            savings_pct = float((rfq.target_price_usd - sku.base_price_usd) / rfq.target_price_usd)
            return min(1.0, 0.7 + savings_pct * 3)  # Reward savings
        else:
            # Above target - penalize
            excess_pct = float((sku.base_price_usd - rfq.target_price_usd) / rfq.target_price_usd)
            return max(0.0, 0.5 - excess_pct * 2)
    
    def _calculate_certification_match(
        self, 
        parsed_specs: Dict, 
        sku: SKU,
        seller: Company
    ) -> float:
        """Calculate certification compliance score"""
        required_certs = set(parsed_specs.get("certifications_required", []))
        
        if not required_certs:
            return 1.0  # No requirements
        
        # Combine SKU and company certifications
        sku_certs = set(sku.certifications or [])
        company_certs = set(seller.certifications or [])
        available_certs = sku_certs | company_certs
        
        # Calculate match
        matched = required_certs & available_certs
        return len(matched) / len(required_certs) if required_certs else 1.0
    
    def _calculate_delivery_score(self, sku: SKU, seller: Company) -> float:
        """Calculate delivery capability score"""
        score = 0.5
        
        # Lead time
        if sku.lead_time_days:
            if sku.lead_time_days <= 21:
                score += 0.3
            elif sku.lead_time_days <= 30:
                score += 0.2
        
        # On-time delivery history
        if seller.on_time_delivery_rate:
            score += float(seller.on_time_delivery_rate) / 100 * 0.2
        
        return min(1.0, score)
    
    def _generate_explanation(
        self,
        spec_score: float,
        price_score: float,
        cert_score: float,
        delivery_score: float,
        quality_score: float,
        rfq: RFQ,
        sku: SKU,
        seller: Company
    ) -> Dict:
        """Generate human-readable explanation"""
        
        reasons = []
        
        # Spec match
        if spec_score >= 0.95:
            reasons.append("✓ Exact specification match")
        elif spec_score >= 0.8:
            reasons.append("✓ Very good specification match")
        else:
            reasons.append("~ Partial specification match")
        
        # Certifications
        if cert_score >= 0.95:
            reasons.append("✓ All required certifications met")
        elif cert_score >= 0.7:
            reasons.append("~ Most certifications met")
        else:
            reasons.append("⚠ Missing some certifications")
        
        # Price
        if sku.base_price_usd and rfq.target_price_usd:
            savings_pct = float((rfq.target_price_usd - sku.base_price_usd) / rfq.target_price_usd * 100)
            if savings_pct > 10:
                reasons.append(f"✓ {abs(savings_pct):.0f}% below target price (${sku.base_price_usd}/kg)")
            elif savings_pct > 0:
                reasons.append(f"✓ {abs(savings_pct):.0f}% below target price")
            else:
                reasons.append(f"~ At or above target price")
        
        # Delivery
        if sku.lead_time_days and sku.lead_time_days <= 21:
            reasons.append("✓ Fast delivery capability")
        
        # Quality
        if seller.rating >= Decimal("4.5"):
            reasons.append(f"✓ {seller.rating}★ supplier rating")
        
        if seller.on_time_delivery_rate >= Decimal("95"):
            reasons.append(f"✓ {seller.on_time_delivery_rate}% on-time delivery")
        
        return {
            "spec_match": spec_score,
            "price_competitiveness": price_score,
            "compliance_score": cert_score,
            "delivery_score": delivery_score,
            "quality_history": quality_score,
            "reasons": reasons
        }
    
    def _calculate_recommended_price(
        self,
        sku: SKU,
        rfq: RFQ,
        match_score: float
    ) -> Decimal:
        """Calculate recommended bid price"""
        
        if not sku.base_price_usd:
            return rfq.target_price_usd or Decimal("0")
        
        # Strategy: High match score = more aggressive pricing
        if match_score >= 0.9:
            # Very strong match - can be aggressive
            return sku.base_price_usd * Decimal("1.05")  # 5% markup
        elif match_score >= 0.8:
            # Good match - moderate pricing
            return sku.base_price_usd * Decimal("1.10")  # 10% markup
        else:
            # Weaker match - conservative pricing
            return sku.base_price_usd * Decimal("1.15")  # 15% markup
