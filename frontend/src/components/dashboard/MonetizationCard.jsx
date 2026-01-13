import React from 'react';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';

const MonetizationCard = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/20 p-2 rounded-lg">
          <DollarSign className="text-green-400" size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">AI Monetization Strategy</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex gap-4 items-start bg-slate-900/40 p-5 rounded-xl border border-slate-700">
          <div className="bg-purple-500/10 p-3 rounded-lg shrink-0">
            <CreditCard className="text-purple-400" size={28} />
          </div>
          <p className="text-slate-300 leading-relaxed text-lg">
            {strategy}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
            <TrendingUp className="text-green-400" size={20} />
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Revenue Potential</p>
              <p className="text-sm text-slate-200">High (Tier 1 Markets)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetizationCard;