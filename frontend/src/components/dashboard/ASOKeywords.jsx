import React from 'react';
import { Search, Hash } from 'lucide-react';

const ASOKeywords = ({ keywords }) => {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mt-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Search className="text-purple-400" size={24} />
        ASO Keyword Researcher
      </h2>
      <div className="flex flex-wrap gap-3">
        {keywords.map((word, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 bg-slate-900/80 border border-purple-500/30 px-4 py-2 rounded-full hover:border-purple-500 transition-colors group"
          >
            <Hash size={14} className="text-purple-400 group-hover:text-purple-300" />
            <span className="text-slate-200 font-medium">{word}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4 italic">
        *Keywords generated based on current competitor metadata and search trends.
      </p>
    </div>
  );
};

export default ASOKeywords;