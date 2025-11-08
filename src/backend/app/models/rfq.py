"""
RFQ (Request for Quotation) SQLAlchemy models
"""
from sqlalchemy import Column, String, Text, Numeric, Integer, DateTime, Boolean, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base


class RFQStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    MATCHING = "matching"
    BIDDING = "bidding"
    EVALUATING = "evaluating"
    AWARDED = "awarded"
    CANCELLED = "cancelled"
    EXPIRED = "expired"


class RFQ(Base):
    __tablename__ = "rfqs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rfq_number = Column(String(50), unique=True, nullable=False, index=True)
    buyer_company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Item details
    ingredient_name = Column(String(255), nullable=False)
    raw_specification = Column(Text, nullable=False)
    parsed_specs = Column(JSON, default={})
    
    # Quantity
    quantity_required_kg = Column(Numeric(10, 2), nullable=False)
    
    # Pricing
    target_price_usd = Column(Numeric(10, 2))
    max_budget_usd = Column(Numeric(12, 2))
    
    # Timeline
    delivery_deadline = Column(DateTime)
    quotation_deadline = Column(DateTime, nullable=False)
    
    # Terms
    incoterm = Column(String(10))
    payment_terms = Column(String(100))
    
    # Status
    status = Column(SQLEnum(RFQStatus), default=RFQStatus.DRAFT)
    published_at = Column(DateTime)
    closed_at = Column(DateTime)
    
    # Matching
    matched_seller_count = Column(Integer, default=0)
    match_completed_at = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    buyer = relationship("Company", foreign_keys=[buyer_company_id])
    created_by = relationship("User", foreign_keys=[created_by_user_id])
    matches = relationship("RFQMatch", back_populates="rfq", cascade="all, delete-orphan")
    bids = relationship("Bid", back_populates="rfq", cascade="all, delete-orphan")


class RFQMatch(Base):
    __tablename__ = "rfq_matches"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rfq_id = Column(UUID(as_uuid=True), ForeignKey("rfqs.id", ondelete="CASCADE"), nullable=False)
    seller_company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    sku_id = Column(UUID(as_uuid=True), ForeignKey("skus.id"))
    
    # Match scores
    match_score = Column(Numeric(5, 4), nullable=False)
    rank = Column(Integer)
    explanation = Column(JSON, default={})
    
    # Auto-bid
    recommended_price_usd = Column(Numeric(10, 2))
    auto_bid_eligible = Column(Boolean, default=False)
    
    # Invitation
    invited = Column(Boolean, default=False)
    invited_at = Column(DateTime)
    
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    rfq = relationship("RFQ", back_populates="matches")
    seller = relationship("Company", foreign_keys=[seller_company_id])
    sku = relationship("SKU")
