import React, { useState } from "react";
import axios from "axios";
import { Zap, Download, RefreshCw, BarChart3, TrendingUp, Search, AlertCircle, Database, Clock } from 'lucide-react';

// Component Imports
import MetricCard from "./components/ui/MetricCard";
import GrowthChart from "./components/dashboard/GrowthChart";
import SentimentChart from "./components/dashboard/SentimentChart";
import FeatureMatrix from "./components/dashboard/FeatureMatrix";
import StrategicRoadmap from "./components/dashboard/StrategicRoadmap";
import TechStack from "./components/dashboard/TechStack";
import ASOKeywords from "./components/dashboard/ASOKeywords";
import MonetizationCard from "./components/dashboard/MonetizationCard";
import EmptyState from "./components/dashboard/EmptyState";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("Finance");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [data, setData] = useState(null);

  const performAnalysis = async (endpoint, genre) => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, { genre });
      setData(response.data);
    } catch (e) { 
      alert("Backend Connection Error"); 
    } finally { 
      setIsAnalyzing(false); 
    }
  };

  const analyzeMarket = (genre) => performAnalysis("analyze", genre);
  const refreshData = (genre) => performAnalysis("analyze/refresh", genre);

  const downloadReport = async () => {
    if (!data) return;
    setIsDownloading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generate-pdf", data, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Blueprint_${data.genre}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (e) { alert("PDF Error"); }
    finally { setIsDownloading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 gap-6">
        <div className="flex items-center gap-3">
          <Database className="text-purple-500" size={32} />
          <h1 className="text-2xl font-black uppercase">GenreGenius AI</h1>
        </div>
        <div className="flex gap-3">
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl outline-none">
            <option>Productivity</option>
            <option>Books & Reference</option>
            <option>Fitness</option>
            <option>Finance</option>
          </select>
          <button onClick={() => analyzeMarket(selectedGenre)} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700 px-8 py-2.5 rounded-xl font-bold flex items-center gap-2">
            {isAnalyzing ? <RefreshCw className="animate-spin" /> : <Zap />} {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
          {data && (
            <button onClick={() => refreshData(selectedGenre)} disabled={isAnalyzing} className="bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors">
              <RefreshCw size={18} className={isAnalyzing ? "animate-spin" : ""} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {!data && !isAnalyzing ? (
          <EmptyState onAnalyze={analyzeMarket} selectedGenre={selectedGenre} />
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center py-40 animate-pulse">
            <RefreshCw className="animate-spin text-purple-500 mb-6" size={64} />
            <h2 className="text-2xl font-bold tracking-tight">Accessing Real-Time Market Data...</h2>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-700">
            {/* Status Indicator */}
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <div className={`w-2 h-2 rounded-full ${data.is_cached ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  <span className={data.is_cached ? 'text-yellow-500' : 'text-green-500'}>
                    {data.is_cached ? 'Cached Data' : 'Live Store Data'}
                  </span>
               </div>
               {/* <div className="text-xs text-slate-500 flex items-center gap-1">
                 <Clock size={12} /> Last Scraped: {data.last_updated}
               </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard title="Opportunity" value={`${data.metrics.opportunity_score}/100`} icon={<BarChart3 className="text-purple-400"/>} />
              <MetricCard title="Saturation" value={`${data.metrics.saturation_score}%`} icon={<TrendingUp className="text-blue-400"/>} />
              <MetricCard title="Search Volume" value={data.metrics.search_volume} icon={<Search className="text-green-400"/>} />
              <MetricCard title="Competing Apps" value={data.metrics.top_apps_count} icon={<AlertCircle className="text-pink-400"/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SentimentChart data={data.sentiment_chart_data} />
              <FeatureMatrix data={data.opportunity_matrix} />
            </div>

            <GrowthChart data={data.growth_trend} />
            <StrategicRoadmap recommendations={data.recommendations} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TechStack stack={data.tech_stack} /><ASOKeywords keywords={data.aso_keywords} />
            </div>
            {data && (
              <button onClick={downloadReport} disabled={isDownloading} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                {isDownloading ? <RefreshCw className="animate-spin" /> : <Download />} Download Full PDF Blueprint
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


