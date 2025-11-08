# NutraSense AI - Intelligent B2B Nutraceutical Marketplace Engine

## System Architecture

### Tech Stack
- **API**: FastAPI (async Python 3.11+)
- **Databases**: PostgreSQL 15 (transactional), Neo4j 5 (ontology graph)
- **Cache/Queue**: Redis 7
- **Search**: OpenSearch 2
- **Storage**: AWS S3 (documents, COAs, certificates)
- **ML Ops**: MLflow, Airflow
- **Orchestration**: Docker, Kubernetes
- **Monitoring**: Prometheus, Grafana

### Core Components

1. **API Layer** (`/api`)
   - RFQ Management
   - Bid Management
   - Matching Engine
   - Document Upload & Verification
   - PO Generation

2. **ML Pipeline** (`/ml`)
   - NLP Spec Parser (DistilBERT-based)
   - Seller Matching & Ranking (XGBoost)
   - Auto-Bid Optimizer
   - Fraud Detection (COA/Certificate validation)

3. **Data Layer** (`/db`)
   - PostgreSQL schemas (transactional data)
   - Neo4j ontology (ingredients, synonyms, substitutions)
   - Redis (caching, real-time matching)

4. **Workers** (`/workers`)
   - Airflow DAGs (batch processing, retraining)
   - Celery tasks (async matching, notifications)

5. **Infrastructure** (`/infra`)
   - Docker Compose (local dev)
   - Kubernetes manifests (production)
   - CI/CD pipelines

## Quick Start

```bash
# Local development
docker-compose up -d
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python scripts/seed_ontology.py
uvicorn app.main:app --reload

# Run tests
pytest tests/ -v --cov=app

# Production deployment
kubectl apply -f infra/k8s/
```

## API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables
See `.env.example` for configuration.
