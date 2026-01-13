import redis
import json
from typing import Optional, Dict

class MarketAnalysisCache:
    def __init__(self, host='localhost', port=6379):
        try:
            self.redis_client = redis.Redis(host=host, port=port, decode_responses=True)
            self.redis_client.ping()
            self.enabled = True
        except:
            self.enabled = False
            self.local_cache = {}

    def get_analysis(self, genre: str) -> Optional[Dict]:
        # CRITICAL: Key includes genre to prevent data mixing
        key = f"genregenius:analysis:{genre.lower()}"
        if self.enabled:
            data = self.redis_client.get(key)
            return json.loads(data) if data else None
        return self.local_cache.get(key)

    def cache_analysis(self, genre: str, data: Dict):
        key = f"genregenius:analysis:{genre.lower()}"
        if self.enabled:
            self.redis_client.setex(key, 86400, json.dumps(data))
        else:
            self.local_cache[key] = data

def add_cache_endpoints(app, cache: MarketAnalysisCache):
    @app.delete("/api/cache/clear-all")
    async def clear_cache():
        if cache.enabled: cache.redis_client.flushdb()
        else: cache.local_cache = {}
        return {"message": "Cache Cleared"}