from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import tempfile  # Fixed: Added missing import
import random
import os
from datetime import datetime
import uvicorn

from scraper import run_full_analysis
from redis_cache_layer import MarketAnalysisCache, add_cache_endpoints

app = FastAPI(title="GenreGenius AI - Standardized Engine")
cache = MarketAnalysisCache()
add_cache_endpoints(app, cache)

app.add_middleware(CORSMiddleware, allow_origins=["https://genre-genius-ai.vercel.app"], allow_methods=["*"], allow_headers=["*"])

# --- DYNAMIC FORECAST LOGIC ---
def generate_growth_forecast(apps_data: list, opportunity_score: int):
    """Calculates a 4-month forecast based on actual scraper data."""
    # Sum up real installs from the top 10 apps found by the scraper
    total_base_installs = sum(int(app.get('installs_numeric', 5000)) for app in apps_data[:10])
    
    months = ["Oct", "Nov", "Dec", "Jan"]
    multiplier = 1 + (opportunity_score / 100) # Higher opportunity = steeper growth curve
    base_revenue_per_download = 0.05 # Assume $0.05 revenue per download for the MVP
    
    trend = []
    for i, month in enumerate(months):
        # Calculate downloads with a growth curve
        factor = (multiplier ** i) 
        monthly_downloads = int((total_base_installs / 24) * factor)
        
        trend.append({
            "month": month,
            "downloads": monthly_downloads,
            "revenue": int(monthly_downloads * base_revenue_per_download) # Dynamic Revenue
        })
    return trend

async def process_analysis(genre: str):
    """Orchestrates scraper data and formats it for the dashboard."""
    raw_data = await run_full_analysis(genre)
    
    # Mapping data to dashboard requirements
    response = {
        "genre": genre,
        "metrics": {
            "opportunity_score": raw_data['opportunity_score'],
            "saturation_score": raw_data['saturation_score'],
            "top_apps_count": len(raw_data['play_store_apps']),
            "search_volume": f"{random.randint(1, 5)}M/mo"
        },
        "sentiment_chart_data": [{"complaint": c['category'], "count": c['count']} for c in raw_data['sentiment_data']],
        "opportunity_matrix": raw_data['competitive_gaps'], 
        "growth_trend": generate_growth_forecast(raw_data['play_store_apps'], raw_data['opportunity_score']),
        "recommendations": raw_data.get('recommendations', []),
        "tech_stack": raw_data.get('tech_stack', []),
        "aso_keywords": ["smart", "ai", genre],
        "is_cached": False,
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    return response

@app.post("/api/analyze")
async def analyze_market(request: dict):
    genre = request.get("genre", "Productivity")
    cached = cache.get_analysis(genre)
    if cached:
        cached["is_cached"] = True
        return cached
    
    try:
        response = await process_analysis(genre)
        cache.cache_analysis(genre, response)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/refresh")
async def refresh_market(request: dict):
    """Forced refresh endpoint used by the React button."""
    genre = request.get("genre", "Productivity")
    try:
        response = await process_analysis(genre)
        cache.cache_analysis(genre, response)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-pdf")
async def generate_pdf(data: dict):
    """Generates the blueprint report."""
    from pdf_generator import MVPBlueprintGenerator
    generator = MVPBlueprintGenerator()
    
    # Fixed: Uses tempfile correctly with the import
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
        try:
            generator.generate_report(data, tmp.name)
            return FileResponse(
                tmp.name, 
                media_type='application/pdf', 
                filename=f"Blueprint_{data.get('genre', 'Analysis')}.pdf"
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)