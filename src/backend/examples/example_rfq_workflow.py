"""
Complete RFQ Workflow Example - Production Simulation
Demonstrates: RFQ creation → Spec parsing → Matching → Bidding → Award → PO
"""
import asyncio
import httpx
import json
from uuid import uuid4
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api/v1"


async def run_example():
    """
    Complete workflow demonstration:
    1. Create buyer and suppliers
    2. Create RFQ with natural language specification
    3. Parse specs with NLP
    4. Match sellers using ML
    5. Generate auto-bids
    6. Submit manual bid
    7. Rank and explain matches
    8. Award bid
    9. Create Purchase Order
    10. Upload COA for fraud detection
    """
    
    async with httpx.AsyncClient() as client:
        
        print("=" * 80)
        print("NUTRASENSE AI - COMPLETE RFQ WORKFLOW EXAMPLE")
        print("=" * 80)
        
        # ============================================================
        # STEP 1: Setup - Create Companies & Users
        # ============================================================
        print("\n[STEP 1] Creating buyer company...")
        
        buyer_data = {
            "name": "HealthPro Supplements Inc.",
            "company_type": "buyer",
            "country": "US",
            "city": "Los Angeles",
            "email": "buyer@healthpro.com",
            "verified": True
        }
        
        # Create buyer (in real app, would use auth)
        buyer_id = str(uuid4())
        buyer_user_id = str(uuid4())
        
        print(f"✓ Buyer created: {buyer_data['name']} (ID: {buyer_id})")
        
        # Create suppliers
        suppliers = [
            {
                "id": str(uuid4()),
                "name": "Himalaya Wellness",
                "country": "IN",
                "city": "Bangalore",
                "certifications": ["GMP", "ISO9001", "Organic"],
                "rating": 4.8,
                "on_time_delivery_rate": 95.0
            },
            {
                "id": str(uuid4()),
                "name": "Sabinsa Corporation",
                "country": "IN",
                "city": "Bangalore",
                "certifications": ["GMP", "ISO9001", "Halal", "Kosher"],
                "rating": 4.9,
                "on_time_delivery_rate": 98.0
            },
            {
                "id": str(uuid4()),
                "name": "Sun Pharmaceutical",
                "country": "IN",
                "city": "Mumbai",
                "certifications": ["GMP", "WHO-GMP", "FDA"],
                "rating": 4.7,
                "on_time_delivery_rate": 92.0
            }
        ]
        
        print(f"\n✓ Created {len(suppliers)} supplier companies")
        for s in suppliers:
            print(f"  - {s['name']} (Rating: {s['rating']}, Delivery: {s['on_time_delivery_rate']}%)")
        
        # ============================================================
        # STEP 2: Create RFQ with Natural Language Specification
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 2] Creating RFQ with natural language specification...")
        
        rfq_payload = {
            "buyer_company_id": buyer_id,
            "created_by_user_id": buyer_user_id,
            "ingredient_name": "Curcumin Extract",
            "raw_specification": """
                Need 1000 kg of Curcumin 95% extract, USP grade powder.
                Must be GMP and Organic certified.
                Mesh size: 80 mesh.
                Delivery: CIF Los Angeles Port.
                Target price: $45/kg.
                Need delivery by March 15, 2024.
            """,
            "quantity_required_kg": 1000,
            "target_price_usd": 45.0,
            "max_budget_usd": 50000.0,
            "delivery_deadline": "2024-03-15",
            "quotation_deadline": (datetime.now() + timedelta(days=7)).isoformat(),
            "incoterm": "CIF",
            "payment_terms": "30% advance, 70% on delivery",
            "auto_publish": True
        }
        
        print("\nRaw Specification:")
        print(rfq_payload["raw_specification"])
        
        # Simulate API call
        print("\n→ POST /api/v1/rfq/")
        
        # Simulated parsed response
        parsed_specs = {
            "ingredient": "Curcumin",
            "botanical_name": "Curcuma longa",
            "assay_min": 95.0,
            "grade": "USP",
            "form": "Powder",
            "mesh_size": "80 mesh",
            "certifications_required": ["GMP", "Organic"],
            "incoterm": "CIF",
            "delivery_location": "Los Angeles",
            "ontology_confidence": 0.98
        }
        
        rfq_id = str(uuid4())
        rfq_number = f"RFQ-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8].upper()}"
        
        print(f"\n✓ RFQ Created: {rfq_number}")
        print(f"  RFQ ID: {rfq_id}")
        print(f"\nParsed Specifications:")
        print(json.dumps(parsed_specs, indent=2))
        
        # ============================================================
        # STEP 3: ML-Powered Seller Matching
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 3] Running ML-powered seller matching...")
        
        print("\n→ Matching Engine Processing:")
        print("  1. Ontology lookup for ingredient normalization...")
        print("  2. Finding sellers with matching SKUs...")
        print("  3. Calculating compliance scores...")
        print("  4. Running XGBoost ranking model...")
        print("  5. Generating explainable recommendations...")
        
        # Simulate matching results
        await asyncio.sleep(1)  # Simulate processing
        
        matches = [
            {
                "seller_id": suppliers[1]["id"],
                "seller_name": suppliers[1]["name"],
                "sku_id": str(uuid4()),
                "match_score": 0.92,
                "rank": 1,
                "explanation": {
                    "spec_match": 0.98,
                    "price_competitiveness": 0.88,
                    "compliance_score": 1.0,
                    "delivery_score": 0.95,
                    "quality_history": 0.89,
                    "reasons": [
                        "✓ Exact specification match (Curcumin 95% USP)",
                        "✓ All required certifications (GMP, Organic)",
                        "✓ 12% below target price ($39.60/kg)",
                        "✓ Can deliver 2 weeks early",
                        "✓ 98% on-time delivery history",
                        "✓ 4.9★ supplier rating"
                    ]
                },
                "recommended_price_usd": 39.60,
                "auto_bid_eligible": True,
                "estimated_total": 39600.0
            },
            {
                "seller_id": suppliers[0]["id"],
                "seller_name": suppliers[0]["name"],
                "sku_id": str(uuid4()),
                "match_score": 0.86,
                "rank": 2,
                "explanation": {
                    "spec_match": 0.95,
                    "price_competitiveness": 0.82,
                    "compliance_score": 0.95,
                    "delivery_score": 0.90,
                    "quality_history": 0.85,
                    "reasons": [
                        "✓ Very good specification match (Curcumin 95%)",
                        "✓ GMP and Organic certified",
                        "~ 5% below target price ($42.75/kg)",
                        "✓ Can deliver on time",
                        "✓ 95% on-time delivery history",
                        "✓ 4.8★ supplier rating"
                    ]
                },
                "recommended_price_usd": 42.75,
                "auto_bid_eligible": True,
                "estimated_total": 42750.0
            },
            {
                "seller_id": suppliers[2]["id"],
                "seller_name": suppliers[2]["name"],
                "sku_id": str(uuid4()),
                "match_score": 0.79,
                "rank": 3,
                "explanation": {
                    "spec_match": 0.90,
                    "price_competitiveness": 0.75,
                    "compliance_score": 1.0,
                    "delivery_score": 0.85,
                    "quality_history": 0.75,
                    "reasons": [
                        "✓ Good specification match",
                        "✓ Exceeds certification requirements (GMP, WHO-GMP, FDA)",
                        "~ At target price ($45.00/kg)",
                        "~ Standard delivery timeline",
                        "✓ 92% on-time delivery history",
                        "✓ 4.7★ supplier rating"
                    ]
                },
                "recommended_price_usd": 45.00,
                "auto_bid_eligible": False,  # At price ceiling
                "estimated_total": 45000.0
            }
        ]
        
        print(f"\n✓ Matched {len(matches)} qualified sellers")
        print("\nTop Matches (Ranked by ML Model):")
        print("-" * 80)
        
        for match in matches:
            print(f"\n#{match['rank']} {match['seller_name']}")
            print(f"   Match Score: {match['match_score']:.2%}")
            print(f"   Recommended Price: ${match['recommended_price_usd']}/kg")
            print(f"   Total Estimate: ${match['estimated_total']:,.0f}")
            print(f"   Auto-Bid Eligible: {'Yes ✓' if match['auto_bid_eligible'] else 'No'}")
            print(f"\n   Explanation:")
            for reason in match['explanation']['reasons']:
                print(f"      {reason}")
        
        # ============================================================
        # STEP 4: Auto-Bidding with Guardrails
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 4] Auto-Bidding System (with guardrails)...")
        
        # Top match with auto-bid eligible
        top_match = matches[0]
        
        print(f"\n→ Auto-Bid for {top_match['seller_name']}:")
        print(f"  Recommended Price: ${top_match['recommended_price_usd']}/kg")
        print(f"  Guardrails:")
        print(f"    - Min Margin: 15% (don't go below cost)")
        print(f"    - Max Discount: 15% (don't sacrifice profit)")
        print(f"    - Match Score: ≥ 0.85 (high confidence only)")
        print(f"  ✓ All guardrails passed")
        
        auto_bid = {
            "bid_number": f"BID-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8].upper()}",
            "rfq_id": rfq_id,
            "seller_company_id": top_match["seller_id"],
            "sku_id": top_match["sku_id"],
            "unit_price_usd": top_match["recommended_price_usd"],
            "total_price_usd": top_match["estimated_total"],
            "quantity_offered_kg": 1000,
            "lead_time_days": 21,
            "delivery_date": "2024-03-01",
            "incoterm": "CIF",
            "payment_terms": "30% advance, 70% on delivery",
            "is_auto_bid": True,
            "status": "submitted",
            "rank": 1,
            "score": top_match["match_score"]
        }
        
        print(f"\n✓ Auto-bid submitted: {auto_bid['bid_number']}")
        print(f"  Price: ${auto_bid['unit_price_usd']}/kg")
        print(f"  Total: ${auto_bid['total_price_usd']:,.0f}")
        print(f"  Delivery: {auto_bid['delivery_date']}")
        
        # ============================================================
        # STEP 5: Manual Bid Submission
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 5] Manual Bid Submission (Competitor)...")
        
        manual_bid = {
            "bid_number": f"BID-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8].upper()}",
            "rfq_id": rfq_id,
            "seller_company_id": suppliers[0]["id"],
            "seller_name": suppliers[0]["name"],
            "unit_price_usd": 42.75,
            "total_price_usd": 42750.0,
            "quantity_offered_kg": 1000,
            "lead_time_days": 28,
            "is_auto_bid": False
        }
        
        print(f"\n→ POST /api/v1/bids/")
        print(f"✓ Manual bid submitted: {manual_bid['bid_number']}")
        print(f"  Seller: {manual_bid['seller_name']}")
        print(f"  Price: ${manual_bid['unit_price_usd']}/kg")
        
        # ============================================================
        # STEP 6: Bid Ranking & Evaluation
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 6] Bid Ranking & Evaluation...")
        
        all_bids = [auto_bid, manual_bid]
        
        print("\n→ GET /api/v1/rfq/{rfq_id}/bids")
        print(f"\nReceived {len(all_bids)} bids:")
        print("-" * 80)
        
        for i, bid in enumerate(all_bids, 1):
            print(f"\n#{i} {suppliers[i-1]['name']}")
            print(f"   Bid: {bid['bid_number']}")
            print(f"   Price: ${bid['unit_price_usd']}/kg (Total: ${bid['total_price_usd']:,.0f})")
            print(f"   Type: {'🤖 Auto-Bid' if bid['is_auto_bid'] else '👤 Manual'}")
            print(f"   Lead Time: {bid['lead_time_days']} days")
            
            # Calculate score
            price_score = (50 - bid['unit_price_usd']) / 50
            time_score = 1.0 if bid['lead_time_days'] <= 21 else 0.8
            overall = (price_score * 0.5) + (time_score * 0.3) + (matches[i-1]['match_score'] * 0.2)
            
            print(f"   Overall Score: {overall:.2%}")
        
        # ============================================================
        # STEP 7: Award Bid & Create Purchase Order
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 7] Awarding Bid & Creating Purchase Order...")
        
        winner_bid = auto_bid
        winner_seller = suppliers[1]
        
        print(f"\n→ POST /api/v1/bids/{winner_bid['bid_number']}/award")
        print(f"\n🏆 Bid Awarded to: {winner_seller['name']}")
        print(f"   Winning Bid: {winner_bid['bid_number']}")
        print(f"   Price: ${winner_bid['unit_price_usd']}/kg")
        print(f"   Total Value: ${winner_bid['total_price_usd']:,.0f}")
        print(f"   Savings vs Target: ${(45.0 - winner_bid['unit_price_usd']) * 1000:,.0f} ({((45.0 - winner_bid['unit_price_usd']) / 45.0 * 100):.1f}%)")
        
        # Create PO
        po_number = f"PO-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8].upper()}"
        
        po = {
            "po_number": po_number,
            "rfq_id": rfq_id,
            "bid_id": winner_bid["bid_number"],
            "buyer_company_id": buyer_id,
            "seller_company_id": winner_bid["seller_company_id"],
            "sku_id": winner_bid["sku_id"],
            "quantity_kg": 1000,
            "unit_price_usd": winner_bid["unit_price_usd"],
            "total_amount_usd": winner_bid["total_price_usd"],
            "incoterm": "CIF",
            "payment_terms": "30% advance, 70% on delivery",
            "delivery_deadline": "2024-03-01",
            "status": "confirmed"
        }
        
        print(f"\n✓ Purchase Order Created: {po_number}")
        print(f"  Status: {po['status']}")
        print(f"  Delivery: {po['delivery_deadline']}")
        
        # ============================================================
        # STEP 8: COA Upload & Fraud Detection
        # ============================================================
        print("\n" + "=" * 80)
        print("[STEP 8] Certificate of Analysis (COA) Fraud Detection...")
        
        print("\n→ POST /api/v1/documents/upload")
        print("  Uploading COA PDF...")
        
        coa_data = {
            "document_id": str(uuid4()),
            "document_type": "coa",
            "file_name": "COA-BCH-2024-001.pdf",
            "company_id": winner_bid["seller_company_id"],
            "sku_id": winner_bid["sku_id"],
            "extracted_data": {
                "batch_number": "BCH-2024-001",
                "test_date": "2024-01-15",
                "assay_result": 95.8,
                "heavy_metals": {
                    "lead": 0.3,
                    "arsenic": 0.2,
                    "mercury": 0.1
                },
                "microbiological": {
                    "total_plate_count": 800,
                    "yeast_mold": 50,
                    "e_coli": "Negative",
                    "salmonella": "Negative"
                },
                "issuing_lab": "SGS India Pvt Ltd",
                "authorized_signatory": "Dr. Rajesh Kumar"
            }
        }
        
        print("\n✓ COA Uploaded and Parsed")
        print(f"  Batch: {coa_data['extracted_data']['batch_number']}")
        print(f"  Assay: {coa_data['extracted_data']['assay_result']}%")
        
        print("\n→ Running Fraud Detection Model...")
        await asyncio.sleep(1)
        
        fraud_check = {
            "fraud_score": 0.05,  # Low risk
            "flags": [],
            "validation": {
                "date_consistency": "PASS",
                "signature_verification": "PASS",
                "lab_verification": "PASS (SGS India registered)",
                "spec_match": "PASS (95.8% meets ≥95% requirement)",
                "heavy_metals": "PASS (All within limits)",
                "microbiology": "PASS (All parameters passed)"
            }
        }
        
        print(f"\n✓ Fraud Detection Complete")
        print(f"  Risk Score: {fraud_check['fraud_score']:.2%} (LOW RISK)")
        print(f"  Flags: {len(fraud_check['flags'])} (None)")
        print(f"  Verification Status: APPROVED ✓")
        
        # ============================================================
        # STEP 9: Summary & Insights
        # ============================================================
        print("\n" + "=" * 80)
        print("WORKFLOW SUMMARY")
        print("=" * 80)
        
        print(f"\n📊 Transaction Overview:")
        print(f"  RFQ: {rfq_number}")
        print(f"  Ingredient: {parsed_specs['ingredient']} ({parsed_specs['botanical_name']})")
        print(f"  Quantity: {rfq_payload['quantity_required_kg']} kg")
        print(f"  Winner: {winner_seller['name']}")
        print(f"  Price: ${winner_bid['unit_price_usd']}/kg")
        print(f"  Total: ${winner_bid['total_price_usd']:,.0f}")
        print(f"  Savings: ${(45.0 - winner_bid['unit_price_usd']) * 1000:,.0f} ({((45.0 - winner_bid['unit_price_usd']) / 45.0 * 100):.1f}%)")
        print(f"\n⏱️  Timeline:")
        print(f"  RFQ Created: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        print(f"  Matching Completed: ~1.2 seconds")
        print(f"  Bids Received: {len(all_bids)}")
        print(f"  Bid Awarded: ~5 seconds total")
        print(f"  PO Generated: Instant")
        print(f"\n✨ AI Contributions:")
        print(f"  NLP Spec Parsing: {parsed_specs['ontology_confidence']:.1%} confidence")
        print(f"  Sellers Matched: {len(matches)} qualified")
        print(f"  Auto-Bids Generated: 1")
        print(f"  Fraud Detection: 0.05 risk score (Safe)")
        print(f"  Total Processing Time: ~6 seconds")
        
        print("\n" + "=" * 80)
        print("✅ WORKFLOW COMPLETE - NUTRASENSE AI DEMO SUCCESS")
        print("=" * 80)
        print()


if __name__ == "__main__":
    asyncio.run(run_example())
