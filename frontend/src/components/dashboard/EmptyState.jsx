import React from 'react';
import { Search, Sparkles, BarChart3, ShieldCheck } from 'lucide-react';

const EmptyState = ({ onAnalyze, selectedGenre }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
      <div className="bg-slate-900/50 p-8 rounded-full mb-8 border border-slate-800 shadow-2xl">
        <Sparkles size={64} className="text-purple-500 animate-pulse" />
      </div>
      
      <h2 className="text-4xl font-black mb-4 text-white">
        Start Your Market Intelligence Search
      </h2>
      <p className="text-slate-400 max-w-lg mb-10 text-lg leading-relaxed">
        Choose a genre and let AI analyze real-time Play Store data to find 
        market gaps, competitor weaknesses, and your ideal tech stack.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl">
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <BarChart3 className="text-blue-400" size={20} />
          <span className="text-sm text-slate-300">Live Scraper Data</span>
        </div>
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Sparkles className="text-purple-400" size={20} />
          <span className="text-sm text-slate-300">AI Gap Analysis</span>
        </div>
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <ShieldCheck className="text-green-400" size={20} />
          <span className="text-sm text-slate-300">MVP Roadmap</span>
        </div>
      </div>

      <button 
        onClick={() => onAnalyze(selectedGenre)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-xl shadow-purple-500/20 flex items-center gap-3"
      >
        <Search size={24} />
        Analyze {selectedGenre} Market
      </button>
    </div>
  );
};

export default EmptyState;