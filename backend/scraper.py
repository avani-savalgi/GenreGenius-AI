import asyncio
import re
import random
from typing import List, Dict, Optional
from datetime import datetime
from collections import Counter
from google_play_scraper import search, app, reviews_all, Sort

# --- HELPER: CLEAN NUMBERS ---
def parse_installs(installs_str: str) -> int:
    """Converts strings like '1,000,000+' into clean integers."""
    if not installs_str: return 0
    clean = re.sub(r'[^\d]', '', str(installs_str))
    try:
        return int(clean) if clean else 0
    except ValueError:
        return 0

class PlayStoreScraper:
    def __init__(self):
        self.rate_limit_delay = 0.5
    
    async def search_genre(self, genre: str, limit: int = 10) -> List[Dict]:
        """Searches for apps and enriches metadata."""
        try:
            print(f"🔍 Searching Play Store for '{genre}' apps...")
            results = search(genre, lang="en", country="us", n_hits=limit)
            
            enriched_results = []
            for app_data in results:
                try:
                    details = app(app_data['appId'], lang='en', country='us')
                    enriched_results.append({
                        'app_id': details['appId'],
                        'title': details['title'],
                        'rating': details.get('score', 0),
                        'installs_numeric': parse_installs(details.get('installs', '0')),
                        'description': details.get('description', ''),
                        'icon': details.get('icon', '')
                    })
                    await asyncio.sleep(self.rate_limit_delay)
                except Exception:
                    continue
            return enriched_results
        except Exception as e:
            print(f"❌ Search Error: {e}")
            return []
    
    async def scrape_reviews(self, app_id: str, max_reviews: int = 40) -> List[Dict]:
        """Retrieves user reviews for sentiment analysis."""
        try:
            result = reviews_all(app_id, sleep_milliseconds=100, lang='en', country='us', sort=Sort.MOST_RELEVANT)
            return [{'content': r['content'], 'score': r['score']} for r in result[:max_reviews]]
        except Exception:
            return []

class SentimentAnalyzer:
    def analyze_reviews(self, reviews: List[Dict]) -> List[Dict]:
        """Categorizes negative reviews into pain points."""
        complaint_counter = Counter()
        keywords = {
            'Too Many Ads': ['ad', 'ads', 'advert'],
            'Bugs/Crashes': ['crash', 'freeze', 'bug', 'error'],
            'Expensive': ['price', 'cost', 'subscription'],
            'Poor UI': ['ugly', 'confusing', 'hard to use'],
            'Missing Features': ['wish', 'need', 'missing']
        }
        
        for review in reviews:
            if review.get('score', 5) <= 3:
                text = str(review.get('content', '')).lower()
                for category, words in keywords.items():
                    if any(w in text for w in words):
                        complaint_counter[category] += 1
        
        return [{'category': k, 'count': v} for k, v in complaint_counter.most_common(5)]

# --- MAIN ORCHESTRATOR ---
async def run_full_analysis(genre: str) -> Dict:
    """Orchestrates the full market sweep."""
    print(f"📡 Starting analysis for: {genre}")
    play_scraper = PlayStoreScraper()
    sentiment_analyzer = SentimentAnalyzer()
    
    # 1. Scrape App Data
    play_apps = await play_scraper.search_genre(genre)
    
    # 2. Scrape & Analyze Reviews
    all_reviews = []
    for app_item in play_apps[:3]:
        reviews = await play_scraper.scrape_reviews(app_item['app_id'])
        all_reviews.extend(reviews)
    
    sentiment_results = sentiment_analyzer.analyze_reviews(all_reviews)
    
    # 3. Calculate Market Metrics
    valid_ratings = [a.get('rating', 0) for a in play_apps if a.get('rating') is not None]
    avg_rating = sum(valid_ratings) / max(len(valid_ratings), 1) if valid_ratings else 4.0
    total_installs = sum(app.get('installs_numeric', 0) for app in play_apps)
    saturation = min(int(total_installs / 1000000), 100)
    
    # 4. Generate EXACTLY 5 Feature Gaps for the Polygon
    random.seed(genre)
    feature_sets = {
        "Productivity": ["AI Task Prep", "Offline Sync", "Collab Tools", "Privacy Shield", "Automation"],
        "Fitness": ["Heart Tracking", "Meal Planner", "Social Community", "Wearable Sync", "AI Coach"],
        "Finance": ["Crypto Sync", "Tax Export", "Budgeting Bot", "Fraud Alert", "Goal Tracker"]
    }
    features = feature_sets.get(genre, ["AI Logic", "Offline Mode", "Customization", "Analytics", "Security"])

    base_coverage = int((avg_rating / 5) * 100)
    complaint_map = {c['category']: c['count'] for c in sentiment_results}
    
    competitive_gaps = []
    for f in features:
        market_score = max(20, min(85, base_coverage + random.randint(-10, 10)))
        pain_factor = (complaint_map.get('Bugs/Crashes', 0) + complaint_map.get('Missing Features', 0)) // 2
        opp_score = max(30, min(95, (100 - base_coverage) + pain_factor))
        
        competitive_gaps.append({
            'feature': f,
            'market': market_score,
            'opportunity': opp_score
        })

    # --- ROADMAP & TECH STACK LOGIC ---
    tech_stack = [
        {'category': 'Framework', 'recommended': 'React Native' if saturation > 50 else 'Flutter', 'reasoning': 'Optimal for rapid MVP deployment.'},
        {'category': 'Backend', 'recommended': 'FastAPI', 'reasoning': 'Asynchronous handling of scraping data.'},
        {'category': 'Database', 'recommended': 'PostgreSQL', 'reasoning': 'Reliable storage for app metadata.'},
        {'category': 'AI/ML', 'recommended': 'OpenAI API', 'reasoning': f'Used to automate {genre} data analysis.'}
    ]

    recommendations = [
        {
            'priority': 'HIGH' if complaint_map.get('Bugs/Crashes', 0) > 3 else 'MEDIUM',
            'title': f'Develop {features[0]}',
            'reasoning': f'Significant gap found in existing {genre} applications.',
            'impact': 'Market Acquisition'
        },
        {
            'priority': 'HIGH' if complaint_map.get('Poor UI', 0) > 5 else 'MEDIUM',
            'title': 'UX Optimization',
            'reasoning': 'Address core usability issues reported in competitor reviews.',
            'impact': 'User Retention'
        }
    ]

    return {
        'genre': genre,
        'opportunity_score': max(10, min(95, int(100 - (saturation * 0.5) + (5 - avg_rating) * 10))),
        'saturation_score': saturation,
        'play_store_apps': play_apps,
        'sentiment_data': sentiment_results,
        'competitive_gaps': competitive_gaps,
        'tech_stack': tech_stack,       # Now populates TechStack
        'recommendations': recommendations # Now populates StrategicRoadmap
    }