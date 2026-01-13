import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, Line, ComposedChart, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const GrowthChart = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mt-8">
      <h2 className="text-xl font-bold flex items-center gap-2 text-white mb-8">
        <TrendingUp className="text-green-400" size={24} />
        Market Growth Forecast (MVP Phase)
      </h2>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            
            {/* Dual Axes Fix */}
            <YAxis yAxisId="left" stroke="#8b5cf6" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} />

            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
            <Legend verticalAlign="top" height={36}/>
            
            <Area yAxisId="left" type="monotone" dataKey="downloads" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Downloads" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue ($)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;