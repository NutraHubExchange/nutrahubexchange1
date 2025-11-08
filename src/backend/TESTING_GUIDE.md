# NutraSense AI - Testing Guide

## ✅ **Is It Ready to Test?**

**YES!** The backend is fully implemented and ready for testing. Follow this guide to get it running.

---

## 🚀 **Quick Start (5 Steps)**

### **Step 1: Prerequisites**

Make sure you have installed:
- **Docker Desktop** (for Mac/Windows) or **Docker + Docker Compose** (for Linux)
- **Python 3.11+**
- **Git**

Check versions:
```bash
docker --version          # Should be 20.10+
docker-compose --version  # Should be 1.29+
python --version          # Should be 3.11+
```

---

### **Step 2: Start Backend Services**

```bash
cd backend

# Start all services (PostgreSQL, Neo4j, Redis, etc.)
docker-compose up -d

# Wait 30 seconds for services to initialize
sleep 30

# Check services are running
docker-compose ps
```

**Expected Output:**
```
NAME                      STATUS          PORTS
nutrasense-postgres       Up             0.0.0.0:5432->5432/tcp
nutrasense-neo4j          Up             0.0.0.0:7474->7474/tcp, 0.0.0.0:7687->7687/tcp
nutrasense-redis          Up             0.0.0.0:6379->6379/tcp
nutrasense-opensearch     Up             0.0.0.0:9200->9200/tcp
nutrasense-minio          Up             0.0.0.0:9000-9001->9000-9001/tcp
nutrasense-mlflow         Up             0.0.0.0:5000->5000/tcp
```

---

### **Step 3: Setup Python Environment**

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt
```

---

### **Step 4: Initialize Database & Ontology**

```bash
# Create database tables (PostgreSQL)
# Note: Alembic is optional for demo - tables will be created automatically

# Seed Neo4j ontology (ingredient data)
python scripts/seed_ontology.py
```

**Expected Output:**
```
Starting Neo4j ontology seeding...
Found 50+ statements to execute
✓ Executed statement 1/50
✓ Executed statement 2/50
...
✅ Ontology seeding complete: 50/50 statements succeeded
📊 Total ingredients in database: 5
```

---

### **Step 5: Start the API**

```bash
# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
🚀 Starting NutraSense AI...
📊 Initializing PostgreSQL...
🔴 Testing Redis connection...
✅ Redis connected
🌐 Testing Neo4j connection...
✅ Neo4j connected
✨ NutraSense AI started successfully!
```

---

## 🧪 **Test the System**

### **Test 1: Health Check**

Open a new terminal and run:

```bash
curl http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "NutraSense AI",
  "version": "v1",
  "environment": "development"
}
```

---

### **Test 2: API Documentation**

Open in browser:
- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc

You should see interactive API documentation with all endpoints.

---

### **Test 3: Service Dashboards**

Open these in your browser:

| Service | URL | Username | Password |
|---------|-----|----------|----------|
| **API Docs** | http://localhost:8000/docs | - | - |
| **Neo4j Browser** | http://localhost:7474 | neo4j | neo4jpassword |
| **MLflow** | http://localhost:5000 | - | - |
| **MinIO Console** | http://localhost:9001 | minioadmin | minioadmin |
| **Flower (Celery)** | http://localhost:5555 | - | - |

---

### **Test 4: Connection Test Script**

```bash
python scripts/test_connection.py
```

**Expected Output:**
```
============================================================
NUTRASENSE AI - CONNECTION TEST
============================================================

[1/4] Testing PostgreSQL connection...
✅ PostgreSQL: Connected

[2/4] Testing Neo4j connection...
✅ Neo4j: Connected

[3/4] Testing Redis connection...
✅ Redis: Connected

[4/4] Testing API endpoint...
✅ API: Running
   Response: {'status': 'healthy', 'service': 'NutraSense AI', ...}

============================================================
CONNECTION SUMMARY
============================================================
✅ PostgreSQL: OK
✅ Neo4j: OK
✅ Redis: OK
✅ API: OK

🎉 All services are running! You're ready to test.
============================================================
```

---

### **Test 5: Complete RFQ Workflow Demo**

Run the full demonstration:

```bash
python examples/example_rfq_workflow.py
```

**This will:**
1. Create buyer and supplier companies
2. Submit an RFQ with natural language specification
3. Parse specs using NLP
4. Match sellers using ML
5. Generate auto-bids
6. Rank bids with explanations
7. Award bid and create Purchase Order
8. Validate COA with fraud detection

**Output Preview:**
```
================================================================================
NUTRASENSE AI - COMPLETE RFQ WORKFLOW EXAMPLE
================================================================================

[STEP 1] Creating buyer company...
✓ Buyer created: HealthPro Supplements Inc.

[STEP 2] Creating RFQ with natural language specification...
Raw Specification:
    Need 1000 kg of Curcumin 95% extract, USP grade powder.
    Must be GMP and Organic certified.

✓ RFQ Created: RFQ-20240520-A1B2C3D4

Parsed Specifications:
{
  "ingredient": "Curcumin",
  "botanical_name": "Curcuma longa",
  "assay_min": 95.0,
  "grade": "USP",
  "form": "Powder",
  "certifications_required": ["GMP", "Organic"],
  "ontology_confidence": 0.98
}

[STEP 3] Running ML-powered seller matching...
✓ Matched 3 qualified sellers

Top Matches (Ranked by ML Model):
#1 Sabinsa Corporation
   Match Score: 92.00%
   Recommended Price: $39.60/kg
   
   Explanation:
      ✓ Exact specification match
      ✓ All required certifications
      ✓ 12% below target price
      ✓ Can deliver 2 weeks early
      ✓ 4.9★ supplier rating

...

🏆 Bid Awarded to: Sabinsa Corporation
   Total Value: $39,600.00
   Savings vs Target: $5,400 (12.0%)

✓ Purchase Order Created: PO-20240520-K4L5M6N7

✅ WORKFLOW COMPLETE
```

---

### **Test 6: Run Integration Tests**

```bash
pytest tests/ -v

# Or with coverage
pytest tests/ -v --cov=app
```

**Expected Output:**
```
tests/test_rfq_workflow.py::test_spec_parsing PASSED
tests/test_rfq_workflow.py::test_ontology_normalization PASSED
tests/test_rfq_workflow.py::test_seller_matching PASSED
tests/test_rfq_workflow.py::test_auto_bid_generation PASSED
tests/test_rfq_workflow.py::test_fraud_detection PASSED
tests/test_rfq_workflow.py::test_complete_workflow PASSED

========================= 6 passed in 5.2s =========================
```

---

## 🌐 **Test API Endpoints Manually**

### **1. Create RFQ**

```bash
curl -X POST "http://localhost:8000/api/v1/rfq/" \
  -H "Content-Type: application/json" \
  -d '{
    "buyer_company_id": "123e4567-e89b-12d3-a456-426614174000",
    "created_by_user_id": "123e4567-e89b-12d3-a456-426614174001",
    "ingredient_name": "Curcumin Extract",
    "raw_specification": "Need 1000kg of Curcumin 95% USP powder, GMP certified",
    "quantity_required_kg": 1000,
    "target_price_usd": 45.0,
    "delivery_deadline": "2024-12-31",
    "quotation_deadline": "2024-11-30T23:59:59Z",
    "auto_publish": true
  }'
```

### **2. Check Neo4j Ontology**

Open Neo4j Browser (http://localhost:7474) and run:

```cypher
// See all ingredients
MATCH (i:Ingredient) RETURN i LIMIT 10

// Find synonyms for Curcumin
MATCH (i:Ingredient {name: "Curcumin"})-[:HAS_SYNONYM]->(s:Synonym)
RETURN i.name, s.text, s.confidence

// Find substitutes
MATCH (i:Ingredient {name: "Curcumin"})-[r:CAN_SUBSTITUTE]->(sub)
RETURN i.name, sub.name, r.similarity
```

---

## 🐛 **Troubleshooting**

### **Issue: Docker services not starting**

```bash
# Check Docker is running
docker ps

# View logs
docker-compose logs postgres
docker-compose logs neo4j
docker-compose logs redis

# Restart services
docker-compose down
docker-compose up -d
```

---

### **Issue: Port already in use**

If you see "port 8000 is already allocated":

```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or change port
uvicorn app.main:app --reload --port 8001
```

---

### **Issue: Module not found**

```bash
# Make sure you're in virtual environment
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Or use full path
python -m app.main
```

---

### **Issue: Database connection failed**

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Test connection manually
docker-compose exec postgres psql -U postgres -c "SELECT 1"

# Recreate database
docker-compose down -v  # Warning: deletes data
docker-compose up -d
```

---

### **Issue: Neo4j authentication failed**

```bash
# Reset Neo4j password
docker-compose down
docker volume rm backend_neo4j_data
docker-compose up -d neo4j

# Wait and check logs
docker-compose logs neo4j
```

---

## 📊 **What Can You Test?**

✅ **NLP Spec Parser** - Natural language → Structured data  
✅ **Ontology Matching** - Ingredient normalization with Neo4j  
✅ **ML Ranking** - Seller matching with explanations  
✅ **Auto-Bidding** - Intelligent pricing with guardrails  
✅ **Fraud Detection** - COA validation  
✅ **Complete Workflow** - RFQ → Bid → Award → PO  
✅ **API Endpoints** - All REST endpoints functional  
✅ **Health Checks** - Service monitoring  

---

## 🎯 **Next Steps After Testing**

1. **Explore API**: Try different endpoints in Swagger UI
2. **Modify Examples**: Edit `examples/example_rfq_workflow.py`
3. **Add Data**: Create more companies, SKUs, ingredients
4. **Run Tests**: Execute pytest suite
5. **Deploy**: Follow Kubernetes deployment guide

---

## 📞 **Need Help?**

- **Documentation**: See `/backend/README.md`, `/backend/ARCHITECTURE.md`
- **API Docs**: http://localhost:8000/docs
- **Connection Test**: `python scripts/test_connection.py`
- **Health Check**: `curl http://localhost:8000/health`

---

## ✅ **Checklist**

- [ ] Docker services running (`docker-compose ps`)
- [ ] Python environment activated (`source venv/bin/activate`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Ontology seeded (`python scripts/seed_ontology.py`)
- [ ] API running (`uvicorn app.main:app --reload`)
- [ ] Health check passes (`curl http://localhost:8000/health`)
- [ ] Connection test passes (`python scripts/test_connection.py`)
- [ ] Example workflow runs (`python examples/example_rfq_workflow.py`)
- [ ] Tests pass (`pytest tests/ -v`)

---

**🎉 If all checkboxes are ticked, you're ready to test!**
