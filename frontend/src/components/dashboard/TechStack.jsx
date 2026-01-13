import React from 'react';
import { Code2, Server, Cpu, BarChart3 } from 'lucide-react';

const TechStack = ({ stack }) => {
  if (!stack) return null;

  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'framework': return <Code2 size={20} className="text-blue-400" />;
      case 'backend': return <Server size={20} className="text-green-400" />;
      case 'ai/ml': return <Cpu size={20} className="text-purple-400" />;
      default: return <BarChart3 size={20} className="text-pink-400" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mt-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Code2 className="text-blue-400" size={24} />
        Recommended Tech Stack
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stack.map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              {getIcon(item.category)}
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <p className="font-bold text-lg text-white mb-1">{item.recommended}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{item.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;