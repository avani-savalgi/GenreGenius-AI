import React from 'react';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';

const StrategicRoadmap = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Zap className="text-yellow-400" size={20} />
        AI-Generated Strategic Roadmap
      </h2>
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-600 hover:border-purple-500 transition-colors group">
            <div className="flex items-start gap-4">
              <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                rec.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {rec.priority}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{rec.title}</h3>
                <p className="text-slate-300 text-sm mb-3">{rec.reasoning}</p>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  <span className="font-semibold">Expected Impact:</span>
                  <span className="text-slate-300">{rec.impact}</span>
                </div>
              </div>
              {/* <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                Details
                <ArrowRight size={16} />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// THIS IS THE MISSING LINE CAUSING THE ERROR:
export default StrategicRoadmap;