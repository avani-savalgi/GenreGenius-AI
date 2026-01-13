import React from 'react';

const MetricCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        {/* Render the icon directly as a JSX element */}
        <div className="p-2 bg-slate-800 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-500 font-medium">{trend}</div>
    </div>
  );
};

export default MetricCard;