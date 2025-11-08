"""
API v1 Router
"""
from fastapi import APIRouter
from app.api.v1.endpoints import rfq, bids, matching, documents, purchase_orders

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(rfq.router, prefix="/rfq", tags=["RFQ"])
api_router.include_router(matching.router, prefix="/matching", tags=["Matching"])
api_router.include_router(bids.router, prefix="/bids", tags=["Bids"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router.include_router(purchase_orders.router, prefix="/po", tags=["Purchase Orders"])
