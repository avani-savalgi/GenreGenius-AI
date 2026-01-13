import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle } from 'lucide-react';

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'];

const SentimentChart = ({ data = [] }) => {
  // Defensive check: prevent 'reading map of undefined'
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-[300px] flex items-center justify-center">
        <p className="text-slate-500 italic text-sm text-white">No sentiment data available for this genre.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
        <AlertCircle className="text-red-400" size={20} />
        Top User Complaints (Gap Analysis)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis dataKey="complaint" type="category" width={150} stroke="#e2e8f0" />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;