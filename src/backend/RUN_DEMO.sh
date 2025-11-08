#!/bin/bash

# NutraSense AI - One-Command Demo
# This script does everything: setup, start services, run demo

echo "=================================================="
echo "  NUTRASENSE AI - AUTOMATED DEMO"
echo "=================================================="
echo ""
echo "This script will:"
echo "  1. Start Docker services"
echo "  2. Setup Python environment"
echo "  3. Initialize database & ontology"
echo "  4. Run complete workflow demo"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "${GREEN}[1/5] Checking prerequisites...${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "${RED}❌ Docker not found. Please install Docker Desktop${NC}"
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo "${RED}❌ Docker is not running. Please start Docker Desktop${NC}"
    exit 1
fi

echo "   ✓ Docker is running"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "${RED}❌ Python3 not found${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d ' ' -f 2 | cut -d '.' -f 1,2)
echo "   ✓ Python $PYTHON_VERSION found"

echo ""
echo "${GREEN}[2/5] Starting Docker services...${NC}"
docker-compose up -d

echo ""
echo "${GREEN}[3/5] Waiting for services to initialize (30s)...${NC}"
sleep 30

echo ""
echo "${GREEN}[4/5] Setting up Python environment...${NC}"

# Create venv if doesn't exist
if [ ! -d "venv" ]; then
    echo "   Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "   Installing dependencies (this may take a minute)..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "${GREEN}[5/5] Initializing database...${NC}"

# Seed ontology
echo "   Seeding Neo4j ontology..."
python scripts/seed_ontology.py

echo ""
echo "=================================================="
echo "${GREEN}✅ SETUP COMPLETE${NC}"
echo "=================================================="
echo ""
echo "${YELLOW}🧪 Running connection test...${NC}"
python scripts/test_connection.py

echo ""
echo "=================================================="
echo "${GREEN}🎬 Running Complete Workflow Demo${NC}"
echo "=================================================="
echo ""
python examples/example_rfq_workflow.py

echo ""
echo "=================================================="
echo "${GREEN}✅ DEMO COMPLETE!${NC}"
echo "=================================================="
echo ""
echo "📚 What's next?"
echo "   1. Explore API:  http://localhost:8000/docs"
echo "   2. View Neo4j:   http://localhost:7474"
echo "   3. Run tests:    pytest tests/ -v"
echo "   4. Start API:    uvicorn app.main:app --reload"
echo ""
echo "To stop services:"
echo "   docker-compose down"
echo ""
