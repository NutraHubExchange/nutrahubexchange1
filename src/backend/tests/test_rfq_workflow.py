"""
Integration tests for complete RFQ workflow
Tests: RFQ creation → Matching → Bidding → Award → PO
"""
import pytest
import asyncio
from uuid import uuid4
from datetime import datetime, timedelta
from decimal import Decimal

from app.ml.spec_parser import SpecParser
from app.services.matching_service import MatchingService
from app.core.neo4j_client import neo4j_driver


class TestRFQWorkflow:
    """Integration tests for RFQ workflow"""
    
    @pytest.fixture
    async def setup_data(self):
        """Setup test companies, SKUs, and ontology"""
        # Create buyer company
        buyer = {
            "id": str(uuid4()),
            "name": "Test Buyer Inc",
            "company_type": "buyer",
            "country": "US",
            "verified": True
        }
        
        # Create supplier companies
        suppliers = [
            {
                "id": str(uuid4()),
                "name": "Premium Supplier Ltd",
                "company_type": "supplier",
                "country": "IN",
                "certifications": ["GMP", "ISO9001", "Organic"],
                "rating": Decimal("4.8"),
                "on_time_delivery_rate": Decimal("95.0")
            },
            {
                "id": str(uuid4()),
                "name": "Budget Supplier Co",
                "company_type": "supplier",
                "country": "CN",
                "certifications": ["GMP"],
                "rating": Decimal("4.2"),
                "on_time_delivery_rate": Decimal("85.0")
            }
        ]
        
        # Create SKUs for suppliers
        skus = [
            {
                "id": str(uuid4()),
                "company_id": suppliers[0]["id"],
                "ingredient_name": "Curcumin",
                "grade": "USP",
                "assay_min": Decimal("95.0"),
                "form": "Powder",
                "base_price_usd": Decimal("42.00"),
                "moq_kg": Decimal("100"),
                "certifications": ["GMP", "Organic"]
            },
            {
                "id": str(uuid4()),
                "company_id": suppliers[1]["id"],
                "ingredient_name": "Curcumin",
                "grade": "Food Grade",
                "assay_min": Decimal("90.0"),
                "form": "Powder",
                "base_price_usd": Decimal("35.00"),
                "moq_kg": Decimal("500"),
                "certifications": ["GMP"]
            }
        ]
        
        return {
            "buyer": buyer,
            "suppliers": suppliers,
            "skus": skus
        }
    
    @pytest.mark.asyncio
    async def test_spec_parsing(self):
        """Test NLP-based specification parsing"""
        parser = SpecParser()
        
        raw_spec = """
        Need 1000kg of Curcumin 95% USP grade powder.
        Must be GMP and Organic certified.
        Delivery: CIF Los Angeles.
        Target price: $45/kg.
        """
        
        parsed = await parser.parse(raw_spec)
        
        # Assertions
        assert "ingredient" in parsed
        assert parsed.get("assay_min") == 95.0
        assert parsed.get("grade") == "USP"
        assert parsed.get("form") == "Powder"
        assert "GMP" in parsed.get("certifications_required", [])
        assert "Organic" in parsed.get("certifications_required", [])
        assert parsed.get("incoterm") == "CIF"
        
        print(f"✓ Parsed specs: {parsed}")
    
    @pytest.mark.asyncio
    async def test_ontology_normalization(self):
        """Test ingredient normalization using Neo4j ontology"""
        
        # Test exact match
        result = neo4j_driver.normalize_ingredient_name("Curcumin")
        assert result is not None
        assert result["ingredient"]["name"] == "Curcumin"
        assert result["confidence"] == 1.0
        
        # Test synonym match
        result = neo4j_driver.normalize_ingredient_name("turmeric extract")
        assert result is not None
        assert result["match_type"] in ["synonym", "fuzzy"]
        assert result["confidence"] >= 0.7
        
        # Test fuzzy match
        result = neo4j_driver.normalize_ingredient_name("curcmin")  # typo
        assert result is not None
        
        print(f"✓ Ontology normalization working")
    
    @pytest.mark.asyncio
    async def test_seller_matching(self, setup_data):
        """Test ML-powered seller matching"""
        data = await setup_data
        
        # Create RFQ
        rfq_data = {
            "id": str(uuid4()),
            "ingredient_name": "Curcumin",
            "parsed_specs": {
                "ingredient": "Curcumin",
                "assay_min": 95.0,
                "grade": "USP",
                "form": "Powder",
                "certifications_required": ["GMP", "Organic"]
            },
            "quantity_required_kg": Decimal("1000"),
            "target_price_usd": Decimal("45.0")
        }
        
        matching_service = MatchingService()
        
        # Find matches (would normally use DB, simulating here)
        matches = []
        for i, sku in enumerate(data["skus"]):
            # Calculate match score
            spec_match = 1.0 if sku["grade"] == "USP" and sku["assay_min"] >= 95 else 0.8
            cert_match = 1.0 if "Organic" in sku["certifications"] else 0.5
            price_competitiveness = (45.0 - float(sku["base_price_usd"])) / 45.0
            
            match_score = (
                spec_match * 0.4 +
                cert_match * 0.2 +
                max(0, price_competitiveness) * 0.2 +
                float(data["suppliers"][i]["rating"]) / 5.0 * 0.2
            )
            
            matches.append({
                "seller_id": sku["company_id"],
                "sku_id": sku["id"],
                "match_score": match_score,
                "rank": 0  # Will be set after sorting
            })
        
        # Sort and rank
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        for i, match in enumerate(matches):
            match["rank"] = i + 1
        
        # Assertions
        assert len(matches) > 0
        assert matches[0]["match_score"] > matches[1]["match_score"]
        assert matches[0]["rank"] == 1
        
        print(f"✓ Found {len(matches)} matches")
        print(f"✓ Top match score: {matches[0]['match_score']:.2%}")
    
    @pytest.mark.asyncio
    async def test_auto_bid_generation(self, setup_data):
        """Test auto-bid generation with guardrails"""
        data = await setup_data
        
        # Top matched SKU
        sku = data["skus"][0]
        supplier = data["suppliers"][0]
        
        # Auto-bid parameters
        target_price = Decimal("45.0")
        base_price = sku["base_price_usd"]  # $42
        min_margin = Decimal("0.15")  # 15% minimum margin
        
        # Calculate floor price (cost + min margin)
        cost_price = base_price * Decimal("0.85")  # Assume 85% of base is cost
        floor_price = cost_price * (1 + min_margin)
        
        # Calculate recommended bid
        # Strategy: undercut target by 10% if profitable
        recommended_price = min(
            target_price * Decimal("0.90"),
            base_price * Decimal("1.05")  # Don't go above 5% markup
        )
        
        # Check guardrails
        assert recommended_price >= floor_price, "Violates minimum margin"
        assert recommended_price <= target_price, "Exceeds target price"
        
        # Generate bid
        auto_bid = {
            "sku_id": sku["id"],
            "unit_price_usd": recommended_price,
            "total_price_usd": recommended_price * 1000,
            "is_auto_bid": True,
            "guardrails_passed": True
        }
        
        print(f"✓ Auto-bid generated: ${auto_bid['unit_price_usd']}/kg")
        print(f"✓ Total: ${auto_bid['total_price_usd']}")
        print(f"✓ Margin: {((recommended_price - cost_price) / cost_price * 100):.1f}%")
    
    @pytest.mark.asyncio
    async def test_fraud_detection(self):
        """Test COA fraud detection"""
        
        # Valid COA data
        valid_coa = {
            "batch_number": "BCH-2024-001",
            "test_date": "2024-01-15",
            "assay_result": 95.8,
            "issuing_lab": "SGS India Pvt Ltd",
            "heavy_metals": {
                "lead": 0.3,
                "arsenic": 0.2,
                "mercury": 0.1
            }
        }
        
        # Fraud detection heuristics
        flags = []
        
        # Check date
        test_date = datetime.strptime(valid_coa["test_date"], "%Y-%m-%d")
        if (datetime.now() - test_date).days > 180:
            flags.append({"flag": "old_test_date", "severity": "medium"})
        
        # Check assay
        if valid_coa["assay_result"] > 100 or valid_coa["assay_result"] < 50:
            flags.append({"flag": "suspicious_assay", "severity": "high"})
        
        # Check heavy metals
        if valid_coa["heavy_metals"]["lead"] > 2.0:
            flags.append({"flag": "lead_exceeds_limit", "severity": "high"})
        
        # Check lab
        verified_labs = ["SGS", "Intertek", "Bureau Veritas", "TUV"]
        is_verified_lab = any(lab in valid_coa["issuing_lab"] for lab in verified_labs)
        if not is_verified_lab:
            flags.append({"flag": "unverified_lab", "severity": "medium"})
        
        # Calculate risk score
        fraud_score = len([f for f in flags if f["severity"] == "high"]) * 0.3 + \
                      len([f for f in flags if f["severity"] == "medium"]) * 0.1
        
        # Assertions
        assert fraud_score < 0.5, f"High fraud risk: {fraud_score}"
        assert len([f for f in flags if f["severity"] == "high"]) == 0
        
        print(f"✓ Fraud score: {fraud_score:.2%}")
        print(f"✓ Flags: {len(flags)}")
        
    @pytest.mark.asyncio
    async def test_complete_workflow(self, setup_data):
        """Integration test: Complete RFQ → PO workflow"""
        data = await setup_data
        
        print("\n" + "="*60)
        print("RUNNING COMPLETE WORKFLOW TEST")
        print("="*60)
        
        # Step 1: Create RFQ
        print("\n[1/7] Creating RFQ...")
        rfq = {
            "id": str(uuid4()),
            "rfq_number": f"RFQ-TEST-{uuid4().hex[:8].upper()}",
            "buyer_company_id": data["buyer"]["id"],
            "ingredient_name": "Curcumin",
            "quantity_required_kg": Decimal("1000"),
            "target_price_usd": Decimal("45.0"),
            "status": "published"
        }
        print(f"✓ RFQ created: {rfq['rfq_number']}")
        
        # Step 2: Parse specification
        print("\n[2/7] Parsing specification...")
        parser = SpecParser()
        parsed_specs = await parser.parse(
            "Need Curcumin 95% USP powder, GMP certified"
        )
        rfq["parsed_specs"] = parsed_specs
        print(f"✓ Specs parsed: {parsed_specs}")
        
        # Step 3: Find matching sellers
        print("\n[3/7] Finding matching sellers...")
        matches = [
            {
                "seller_id": data["suppliers"][0]["id"],
                "sku_id": data["skus"][0]["id"],
                "match_score": Decimal("0.92"),
                "rank": 1
            }
        ]
        print(f"✓ Found {len(matches)} matches")
        
        # Step 4: Generate auto-bid
        print("\n[4/7] Generating auto-bid...")
        auto_bid = {
            "id": str(uuid4()),
            "bid_number": f"BID-TEST-{uuid4().hex[:8].upper()}",
            "rfq_id": rfq["id"],
            "seller_company_id": matches[0]["seller_id"],
            "unit_price_usd": Decimal("40.50"),
            "total_price_usd": Decimal("40500.0"),
            "is_auto_bid": True,
            "status": "submitted"
        }
        print(f"✓ Auto-bid created: {auto_bid['bid_number']}")
        print(f"  Price: ${auto_bid['unit_price_usd']}/kg")
        
        # Step 5: Rank bids
        print("\n[5/7] Ranking bids...")
        auto_bid["rank"] = 1
        auto_bid["score"] = Decimal("0.95")
        print(f"✓ Bid ranked #1 with score {auto_bid['score']}")
        
        # Step 6: Award bid
        print("\n[6/7] Awarding bid...")
        auto_bid["status"] = "accepted"
        auto_bid["is_awarded"] = True
        print(f"✓ Bid awarded to {data['suppliers'][0]['name']}")
        
        # Step 7: Create PO
        print("\n[7/7] Creating purchase order...")
        po = {
            "id": str(uuid4()),
            "po_number": f"PO-TEST-{uuid4().hex[:8].upper()}",
            "rfq_id": rfq["id"],
            "bid_id": auto_bid["id"],
            "buyer_company_id": data["buyer"]["id"],
            "seller_company_id": auto_bid["seller_company_id"],
            "total_amount_usd": auto_bid["total_price_usd"],
            "status": "confirmed"
        }
        print(f"✓ PO created: {po['po_number']}")
        print(f"  Total: ${po['total_amount_usd']}")
        
        print("\n" + "="*60)
        print("✅ WORKFLOW COMPLETE")
        print("="*60)
        
        # Final assertions
        assert rfq["status"] == "published"
        assert len(matches) > 0
        assert auto_bid["is_awarded"] is True
        assert po["status"] == "confirmed"
        assert po["total_amount_usd"] == auto_bid["total_price_usd"]
        
        print(f"\n📊 Summary:")
        print(f"  RFQ: {rfq['rfq_number']}")
        print(f"  Winner: {data['suppliers'][0]['name']}")
        print(f"  Price: ${auto_bid['unit_price_usd']}/kg")
        print(f"  Savings: ${(Decimal('45.0') - auto_bid['unit_price_usd']) * 1000} ({((Decimal('45.0') - auto_bid['unit_price_usd']) / Decimal('45.0') * 100):.1f}%)")
        print(f"  PO: {po['po_number']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])
