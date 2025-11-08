-- NutraSense AI Database Schema
-- PostgreSQL 15+

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Enums
CREATE TYPE user_role AS ENUM ('buyer', 'supplier', 'admin', 'system');
CREATE TYPE rfq_status AS ENUM ('draft', 'published', 'matching', 'bidding', 'evaluating', 'awarded', 'cancelled', 'expired');
CREATE TYPE bid_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE po_status AS ENUM ('pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'failed', 'expired');
CREATE TYPE document_type AS ENUM ('coa', 'gmp_certificate', 'iso_certificate', 'organic_certificate', 'halal_certificate', 'kosher_certificate', 'invoice', 'packing_list', 'other');

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    company_type VARCHAR(50) NOT NULL, -- 'buyer', 'supplier', 'both'
    country VARCHAR(2) NOT NULL, -- ISO 3166-1 alpha-2
    city VARCHAR(100),
    address TEXT,
    website VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    tax_id VARCHAR(100),
    
    -- Verification & Compliance
    verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP,
    certifications JSONB DEFAULT '[]', -- ['GMP', 'ISO9001', 'HACCP']
    
    -- Ratings & Metrics
    rating DECIMAL(3,2) DEFAULT 0,
    total_transactions INTEGER DEFAULT 0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 0,
    quality_score DECIMAL(5,2) DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    suspended_until TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT rating_range CHECK (rating >= 0 AND rating <= 5)
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    job_title VARCHAR(100),
    phone VARCHAR(50),
    
    -- Authentication
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- SKUs (Stock Keeping Units)
CREATE TABLE skus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    sku_code VARCHAR(100) NOT NULL,
    
    -- Ingredient Details
    ingredient_name VARCHAR(255) NOT NULL,
    botanical_name VARCHAR(255),
    cas_number VARCHAR(50),
    
    -- Specifications
    grade VARCHAR(100), -- 'USP', 'BP', 'EP', 'Food Grade', 'Pharmaceutical'
    assay_min DECIMAL(5,2), -- 95.0 means >= 95%
    assay_max DECIMAL(5,2),
    form VARCHAR(50), -- 'Powder', 'Extract', 'Oil', 'Granules'
    mesh_size VARCHAR(50),
    
    -- Packaging
    standard_pack_size DECIMAL(10,2), -- in kg
    standard_pack_unit VARCHAR(10) DEFAULT 'kg',
    
    -- Pricing
    base_price_usd DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    moq_kg DECIMAL(10,2),
    
    -- Certifications for this SKU
    certifications JSONB DEFAULT '[]',
    
    -- Availability
    is_active BOOLEAN DEFAULT true,
    lead_time_days INTEGER,
    
    -- Ontology linking (for matching)
    ontology_node_id VARCHAR(100), -- Reference to Neo4j node
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(company_id, sku_code)
);

-- Inventory Batches
CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku_id UUID NOT NULL REFERENCES skus(id) ON DELETE CASCADE,
    batch_number VARCHAR(100) NOT NULL,
    
    -- Quantity
    quantity_kg DECIMAL(10,2) NOT NULL,
    available_kg DECIMAL(10,2) NOT NULL,
    reserved_kg DECIMAL(10,2) DEFAULT 0,
    
    -- Quality specs for this batch
    actual_assay DECIMAL(5,2),
    manufacturing_date DATE,
    expiry_date DATE,
    
    -- Location
    warehouse_location VARCHAR(255),
    
    -- COA reference
    coa_document_id UUID,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT quantity_valid CHECK (available_kg >= 0 AND reserved_kg >= 0),
    UNIQUE(sku_id, batch_number)
);

-- RFQs (Request for Quotations)
CREATE TABLE rfqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfq_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_company_id UUID NOT NULL REFERENCES companies(id),
    created_by_user_id UUID NOT NULL REFERENCES users(id),
    
    -- Item details
    ingredient_name VARCHAR(255) NOT NULL,
    raw_specification TEXT NOT NULL, -- Original buyer text
    
    -- Parsed specifications (from NLP)
    parsed_specs JSONB DEFAULT '{}',
    /*
    {
        "ingredient": "Curcumin Extract",
        "botanical_name": "Curcuma longa",
        "assay_min": 95.0,
        "grade": "USP",
        "form": "Powder",
        "certifications_required": ["GMP", "Organic"],
        "incoterm": "CIF",
        "delivery_location": "Los Angeles Port"
    }
    */
    
    -- Quantity
    quantity_required_kg DECIMAL(10,2) NOT NULL,
    
    -- Target pricing
    target_price_usd DECIMAL(10,2),
    max_budget_usd DECIMAL(12,2),
    
    -- Timeline
    delivery_deadline DATE,
    quotation_deadline TIMESTAMP NOT NULL,
    
    -- Terms
    incoterm VARCHAR(10), -- 'FOB', 'CIF', 'EXW'
    payment_terms VARCHAR(100),
    
    -- Status & workflow
    status rfq_status DEFAULT 'draft',
    published_at TIMESTAMP,
    closed_at TIMESTAMP,
    
    -- Matching results
    matched_seller_count INTEGER DEFAULT 0,
    match_completed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- RFQ-Seller Matches (from ML matching engine)
CREATE TABLE rfq_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfq_id UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
    seller_company_id UUID NOT NULL REFERENCES companies(id),
    sku_id UUID REFERENCES skus(id),
    
    -- Match score & explanation
    match_score DECIMAL(5,4) NOT NULL, -- 0.0 to 1.0
    rank INTEGER,
    explanation JSONB DEFAULT '{}',
    /*
    {
        "spec_match": 0.95,
        "price_competitiveness": 0.85,
        "compliance_score": 1.0,
        "delivery_score": 0.90,
        "quality_history": 0.92,
        "reasons": [
            "Exact specification match",
            "GMP + Organic certified",
            "15% below target price",
            "Can deliver 2 weeks early"
        ]
    }
    */
    
    -- Auto-bid recommendation
    recommended_price_usd DECIMAL(10,2),
    auto_bid_eligible BOOLEAN DEFAULT false,
    
    -- Invitation status
    invited BOOLEAN DEFAULT false,
    invited_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bids
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bid_number VARCHAR(50) UNIQUE NOT NULL,
    rfq_id UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
    seller_company_id UUID NOT NULL REFERENCES companies(id),
    submitted_by_user_id UUID REFERENCES users(id),
    sku_id UUID REFERENCES skus(id),
    
    -- Pricing
    unit_price_usd DECIMAL(10,2) NOT NULL,
    total_price_usd DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Quantity & delivery
    quantity_offered_kg DECIMAL(10,2) NOT NULL,
    lead_time_days INTEGER NOT NULL,
    delivery_date DATE,
    
    -- Terms
    incoterm VARCHAR(10),
    payment_terms VARCHAR(100),
    validity_days INTEGER DEFAULT 30,
    valid_until TIMESTAMP,
    
    -- Specifications offered
    offered_specs JSONB DEFAULT '{}',
    
    -- Auto-bid metadata
    is_auto_bid BOOLEAN DEFAULT false,
    auto_bid_params JSONB,
    
    -- Status
    status bid_status DEFAULT 'draft',
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    
    -- Ranking in this RFQ
    rank INTEGER,
    score DECIMAL(5,4),
    
    -- Award
    is_awarded BOOLEAN DEFAULT false,
    awarded_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Purchase Orders
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number VARCHAR(50) UNIQUE NOT NULL,
    rfq_id UUID NOT NULL REFERENCES rfqs(id),
    bid_id UUID NOT NULL REFERENCES bids(id),
    buyer_company_id UUID NOT NULL REFERENCES companies(id),
    seller_company_id UUID NOT NULL REFERENCES companies(id),
    
    -- Order details
    sku_id UUID NOT NULL REFERENCES skus(id),
    quantity_kg DECIMAL(10,2) NOT NULL,
    unit_price_usd DECIMAL(10,2) NOT NULL,
    total_amount_usd DECIMAL(12,2) NOT NULL,
    
    -- Terms
    incoterm VARCHAR(10),
    payment_terms VARCHAR(100),
    delivery_address TEXT,
    delivery_deadline DATE,
    
    -- Status
    status po_status DEFAULT 'pending',
    confirmed_at TIMESTAMP,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    
    -- Documents
    contract_document_id UUID,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Documents (COAs, Certificates, etc.)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id),
    uploaded_by_user_id UUID REFERENCES users(id),
    
    -- Document metadata
    document_type document_type NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    s3_bucket VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    
    -- Relations
    sku_id UUID REFERENCES skus(id),
    batch_id UUID REFERENCES inventory_batches(id),
    po_id UUID REFERENCES purchase_orders(id),
    
    -- Verification
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMP,
    verified_by_user_id UUID REFERENCES users(id),
    
    -- Fraud detection results
    fraud_check_score DECIMAL(5,4),
    fraud_flags JSONB DEFAULT '[]',
    /*
    [
        {"flag": "inconsistent_dates", "severity": "high"},
        {"flag": "suspicious_signature", "severity": "medium"}
    ]
    */
    
    -- Expiry (for certificates)
    issue_date DATE,
    expiry_date DATE,
    
    -- Extracted data (for COAs)
    extracted_data JSONB DEFAULT '{}',
    /*
    {
        "batch_number": "BCH-2024-001",
        "test_date": "2024-01-15",
        "assay_result": 95.8,
        "heavy_metals": {"lead": 0.5, "arsenic": 0.3},
        "microbiological": {"tpc": 1000, "yeast_mold": 100}
    }
    */
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Certifications (Company-level)
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id),
    
    certification_type VARCHAR(100) NOT NULL, -- 'GMP', 'ISO9001', 'HACCP', 'Organic', 'Halal', 'Kosher'
    certification_body VARCHAR(255),
    certificate_number VARCHAR(100),
    
    -- Validity
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    is_valid BOOLEAN DEFAULT true,
    
    -- Document reference
    document_id UUID REFERENCES documents(id),
    
    -- Verification
    verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Shipments
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_id UUID NOT NULL REFERENCES purchase_orders(id),
    tracking_number VARCHAR(100),
    
    carrier VARCHAR(100),
    shipping_method VARCHAR(50),
    
    -- Dates
    shipped_date DATE,
    estimated_arrival DATE,
    actual_arrival DATE,
    
    -- Location tracking
    current_location VARCHAR(255),
    tracking_events JSONB DEFAULT '[]',
    
    -- Documents
    packing_list_id UUID REFERENCES documents(id),
    commercial_invoice_id UUID REFERENCES documents(id),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Scorecards (Performance tracking)
CREATE TABLE scorecards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id),
    evaluated_by_company_id UUID NOT NULL REFERENCES companies(id),
    po_id UUID REFERENCES purchase_orders(id),
    
    -- Ratings (1-5 scale)
    product_quality_rating DECIMAL(3,2),
    delivery_rating DECIMAL(3,2),
    communication_rating DECIMAL(3,2),
    documentation_rating DECIMAL(3,2),
    overall_rating DECIMAL(3,2),
    
    -- Feedback
    comments TEXT,
    would_work_again BOOLEAN,
    
    -- Issues
    issues_reported JSONB DEFAULT '[]',
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT rating_range CHECK (
        product_quality_rating BETWEEN 1 AND 5 AND
        delivery_rating BETWEEN 1 AND 5 AND
        communication_rating BETWEEN 1 AND 5 AND
        documentation_rating BETWEEN 1 AND 5 AND
        overall_rating BETWEEN 1 AND 5
    )
);

-- ML Model Predictions Log
CREATE TABLE ml_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50),
    
    -- Input
    input_data JSONB NOT NULL,
    
    -- Output
    prediction JSONB NOT NULL,
    confidence_score DECIMAL(5,4),
    
    -- Performance tracking
    actual_outcome JSONB,
    was_correct BOOLEAN,
    
    -- Metadata
    inference_time_ms INTEGER,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_companies_type ON companies(company_type);
CREATE INDEX idx_companies_country ON companies(country);
CREATE INDEX idx_companies_verified ON companies(verified, is_active);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_skus_company ON skus(company_id);
CREATE INDEX idx_skus_ingredient ON skus(ingredient_name);
CREATE INDEX idx_skus_active ON skus(is_active);
CREATE INDEX idx_skus_ontology ON skus(ontology_node_id);

CREATE INDEX idx_inventory_sku ON inventory_batches(sku_id);
CREATE INDEX idx_inventory_available ON inventory_batches(available_kg) WHERE available_kg > 0;

CREATE INDEX idx_rfqs_buyer ON rfqs(buyer_company_id);
CREATE INDEX idx_rfqs_status ON rfqs(status);
CREATE INDEX idx_rfqs_deadline ON rfqs(quotation_deadline);
CREATE INDEX idx_rfqs_published ON rfqs(published_at) WHERE status NOT IN ('draft', 'cancelled');

CREATE INDEX idx_matches_rfq ON rfq_matches(rfq_id);
CREATE INDEX idx_matches_seller ON rfq_matches(seller_company_id);
CREATE INDEX idx_matches_score ON rfq_matches(match_score DESC);

CREATE INDEX idx_bids_rfq ON bids(rfq_id);
CREATE INDEX idx_bids_seller ON bids(seller_company_id);
CREATE INDEX idx_bids_status ON bids(status);
CREATE INDEX idx_bids_awarded ON bids(is_awarded) WHERE is_awarded = true;

CREATE INDEX idx_pos_buyer ON purchase_orders(buyer_company_id);
CREATE INDEX idx_pos_seller ON purchase_orders(seller_company_id);
CREATE INDEX idx_pos_status ON purchase_orders(status);

CREATE INDEX idx_docs_company ON documents(company_id);
CREATE INDEX idx_docs_type ON documents(document_type);
CREATE INDEX idx_docs_verification ON documents(verification_status);

CREATE INDEX idx_certs_company ON certifications(company_id);
CREATE INDEX idx_certs_valid ON certifications(is_valid, expiry_date);

-- Full-text search indexes
CREATE INDEX idx_skus_ingredient_trgm ON skus USING gin(ingredient_name gin_trgm_ops);
CREATE INDEX idx_rfqs_spec_trgm ON rfqs USING gin(raw_specification gin_trgm_ops);

-- Updated timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skus_updated_at BEFORE UPDATE ON skus FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfqs_updated_at BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bids_updated_at BEFORE UPDATE ON bids FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pos_updated_at BEFORE UPDATE ON purchase_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_docs_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certs_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
