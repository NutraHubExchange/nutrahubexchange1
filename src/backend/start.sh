#!/bin/bash

# NutraSense AI - Quick Start Script
# This script starts all services and initializes the system

set -e  # Exit on error

echo "=================================================="
echo "  NUTRASENSE AI - STARTUP SCRIPT"
echo "=================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "   Please start Docker Desktop and try again"
    exit 1
fi

echo ""
echo "[1/5] Starting Docker services..."
docker-compose up -d

echo ""
echo "[2/5] Waiting for services to initialize (30 seconds)..."
sleep 30

echo ""
echo "[3/5] Checking service health..."
docker-compose ps

echo ""
echo "[4/5] Setting up Python environment..."

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "   Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "   Installing Python dependencies..."
pip install -q -r requirements.txt

echo ""
echo "[5/5] Seeding Neo4j ontology..."
python scripts/seed_ontology.py

echo ""
echo "=================================================="
echo "✅ SETUP COMPLETE!"
echo "=================================================="
echo ""
echo "🚀 Starting API server..."
echo "   Press Ctrl+C to stop"
echo ""
echo "📊 Access points:"
echo "   API Docs:     http://localhost:8000/docs"
echo "   Health Check: http://localhost:8000/health"
echo "   Neo4j:        http://localhost:7474"
echo ""
echo "=================================================="
echo ""

# Start API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
