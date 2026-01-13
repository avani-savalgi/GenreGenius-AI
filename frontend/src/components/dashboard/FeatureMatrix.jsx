import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Target } from 'lucide-react';

const FeatureMatrix = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Target className="text-blue-400" size={20} />
        Feature Opportunity Matrix
      </h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis 
              dataKey="feature" 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#334155" />
            <Radar
              name="Market Coverage %"
              dataKey="market"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.4}
            />
            <Radar
              name="Opportunity Score"
              dataKey="opportunity"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.5}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-slate-400 mt-4 text-center">🎯 Target features with high Opportunity (Green) and low Coverage (Red).</p>
    </div>
  );
};

export default FeatureMatrix;