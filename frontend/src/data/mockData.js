export const GENRE_DATA = {
  productivity: {
    name: 'Productivity Apps',
    saturationScore: 68,
    opportunityScore: 82,
    avgRating: 4.2,
    topApps: 847,
    searchVolume: '2.4M/month',
    growthTrend: [
      { month: 'Jul', downloads: 820000, revenue: 45000 },
      { month: 'Aug', downloads: 950000, revenue: 52000 },
      { month: 'Sep', downloads: 1100000, revenue: 61000 },
      { month: 'Oct', downloads: 1250000, revenue: 68000 },
      { month: 'Nov', downloads: 1400000, revenue: 76000 },
      { month: 'Dec', downloads: 1650000, revenue: 89000 }
    ],
    sentimentData: [
      { complaint: 'Too Many Ads', count: 3420, severity: 85 },
      { complaint: 'No Dark Mode', count: 2891, severity: 72 },
      { complaint: 'Poor Sync', count: 2156, severity: 68 },
      { complaint: 'Limited Features', count: 1847, severity: 61 },
      { complaint: 'Expensive', count: 1523, severity: 54 }
    ],
    competitiveGaps: [
      { feature: 'AI Task Prioritization', market: 23, opportunity: 92 },
      { feature: 'Offline Mode', market: 45, opportunity: 88 },
      { feature: 'Apple Watch Support', market: 31, opportunity: 85 },
      { feature: 'Voice Commands', market: 38, opportunity: 79 },
      { feature: 'Team Collaboration', market: 67, opportunity: 45 }
    ],
    recommendations: [
      {
        priority: 'HIGH',
        title: 'Build Ad-Free Premium Experience',
        reasoning: '3,420 negative reviews mention ads. Top competitors charge $4.99/month.',
        impact: 'Could capture 15-20% of frustrated users'
      },
      {
        priority: 'HIGH',
        title: 'Implement AI-Powered Task Sorting',
        reasoning: 'Only 23% of apps have this. Search volume: 89K/month for "smart todo app"',
        impact: 'Strong differentiation in crowded market'
      }
    ]
  },
  fitness: {
    name: 'Fitness & Health',
    saturationScore: 45,
    opportunityScore: 91,
    avgRating: 4.5,
    topApps: 1204,
    searchVolume: '5.1M/month',
    growthTrend: [
      { month: 'Jul', downloads: 1200000, revenue: 85000 },
      { month: 'Aug', downloads: 1400000, revenue: 92000 },
      { month: 'Sep', downloads: 1350000, revenue: 88000 },
      { month: 'Oct', downloads: 1600000, revenue: 110000 },
      { month: 'Nov', downloads: 1900000, revenue: 135000 },
      { month: 'Dec', downloads: 2100000, revenue: 155000 }
    ],
    sentimentData: [
      { complaint: 'Subscription Only', count: 5100, severity: 90 },
      { complaint: 'Battery Drain', count: 4200, severity: 80 },
      { complaint: 'Inaccurate GPS', count: 3100, severity: 75 },
      { complaint: 'UI is Cluttered', count: 2500, severity: 60 }
    ],
    competitiveGaps: [
      { feature: 'Low-Battery Mode', market: 12, opportunity: 95 },
      { feature: 'Social Competitions', market: 55, opportunity: 70 },
      { feature: 'Diet Integration', market: 78, opportunity: 40 },
      { feature: 'Offline GPS', market: 22, opportunity: 88 }
    ],
    recommendations: [
      {
        priority: 'HIGH',
        title: 'Develop Battery-Optimized Tracking',
        reasoning: '4,200 users reported battery issues in competitors. This is a massive pain point.',
        impact: 'Reduce churn by up to 25%'
      }
    ]
  }
};