GenreGenius AI: Full-Stack Market Intelligence Engine
GenreGenius AI is a data-driven market research platform designed for mobile app developers. It automates the "opportunity discovery" phase by scraping live Google Play Store data, analyzing competitor sentiment, and generating a 4-page technical MVP blueprint.

TECH STACK
Frontend: React.js, Tailwind CSS, Recharts (Data Viz), Lucide React (Icons).
Backend: Python 3.9+, FastAPI (Asynchronous Framework), Uvicorn.
Data Processing: Google Play Scraper, NLTK-inspired sentiment analysis, Matplotlib.
Caching & Persistence: Redis (Market analysis caching for low-latency retrieval).
Reporting: ReportLab (Automated PDF generation).

KEY TECHNICAL FEATURES
1. Dynamic Sentiment & Pain Point Analysis
The engine scrapes hundreds of user reviews and utilizes a custom keyword-based categorization logic to identify recurring competitor failures.
Logic: Aggregates low-rated reviews (1-3 stars) and matches text patterns against categories like "Bugs/Crashes," "Poor UI," and "Missing Features".
<img width="927" height="709" alt="image" src="https://github.com/user-attachments/assets/e5514693-1ddf-4629-8a8a-9d865e300120" />

2. Competitive Gap Matrix (Radar Chart)
Utilizes a 5-point radar polygon to visualize "Market Coverage" vs. "Opportunity Score".
Innovation: Ensures a balanced 5-point data structure for consistent geometric rendering, helping developers see exactly where competitors are weak.
<img width="911" height="692" alt="image" src="https://github.com/user-attachments/assets/03ef050b-42be-4ef7-9341-3f205d32cde8" />

3. Dual-Axis Growth & Revenue Forecast
Implements a dynamic forecasting algorithm that maps market saturation against opportunity scores.
Implementation: Uses a Dual Y-Axis chart to display high-volume download metrics alongside financial revenue projections, solving common scaling disparities in business charts.
<img width="1835" height="742" alt="image" src="https://github.com/user-attachments/assets/0403e96e-167f-437e-ad77-2da4b7e029f2" />

4. Automated MVP Blueprinting
A dedicated PDF generation service that converts the dashboard state into a professional document.
Content: Includes AI-suggested Tech Stacks, Strategic Roadmaps, and ASO (App Store Optimization) keyword sets.

PROJECT IMPACT
80% reduction in manual market research time by automating data collection.
Low-latency performance via Redis caching, serving repeat queries in milliseconds.
Actionable insights through integrated technical roadmaps and implementation strategies.

Author
Avani Savalgi | 2nd Year B.Tech Student | Aspiring Full-Stack Developer
