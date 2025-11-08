"""
Company SQLAlchemy model
"""
from sqlalchemy import Column, String, Boolean, Numeric, Integer, DateTime, JSON, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.core.database import Base


class Company(Base):
    __tablename__ = "companies"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    legal_name = Column(String(255))
    company_type = Column(String(50), nullable=False)  # 'buyer', 'supplier', 'both'
    country = Column(String(2), nullable=False)
    city = Column(String(100))
    address = Column(String)
    website = Column(String(255))
    phone = Column(String(50))
    email = Column(String(255))
    tax_id = Column(String(100))
    
    # Verification
    verified = Column(Boolean, default=False)
    verification_date = Column(DateTime)
    certifications = Column(JSON, default=[])
    
    # Ratings
    rating = Column(Numeric(3, 2), default=0)
    total_transactions = Column(Integer, default=0)
    on_time_delivery_rate = Column(Numeric(5, 2), default=0)
    quality_score = Column(Numeric(5, 2), default=0)
    
    # Status
    is_active = Column(Boolean, default=True)
    suspended_until = Column(DateTime)
    
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    __table_args__ = (
        CheckConstraint('rating >= 0 AND rating <= 5', name='rating_range'),
    )


class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    job_title = Column(String(100))
    phone = Column(String(50))
    
    # Authentication
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    email_verified = Column(Boolean, default=False)
    last_login = Column(DateTime)
    
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class SKU(Base):
    __tablename__ = "skus"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), nullable=False)
    sku_code = Column(String(100), nullable=False)
    
    # Ingredient
    ingredient_name = Column(String(255), nullable=False)
    botanical_name = Column(String(255))
    cas_number = Column(String(50))
    
    # Specifications
    grade = Column(String(100))
    assay_min = Column(Numeric(5, 2))
    assay_max = Column(Numeric(5, 2))
    form = Column(String(50))
    mesh_size = Column(String(50))
    
    # Packaging
    standard_pack_size = Column(Numeric(10, 2))
    standard_pack_unit = Column(String(10), default='kg')
    
    # Pricing
    base_price_usd = Column(Numeric(10, 2))
    currency = Column(String(3), default='USD')
    moq_kg = Column(Numeric(10, 2))
    
    # Certifications
    certifications = Column(JSON, default=[])
    
    # Availability
    is_active = Column(Boolean, default=True)
    lead_time_days = Column(Integer)
    
    # Ontology
    ontology_node_id = Column(String(100))
    
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
