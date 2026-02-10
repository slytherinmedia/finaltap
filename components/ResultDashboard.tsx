
import React from 'react';
import { PredictionResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultDashboardProps {
  result: PredictionResult;
  onReset: () => void;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, onReset }) => {
  const healthScoreData = [
    { name: 'Soul Integrity', value: result.healthScore },
    { name: 'Abyss', value: 100 - result.healthScore }
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-1000">
      {/* Demon Animation Overlay */}
      <div className="flex justify-center mb-[-40px]">
        <div className="demon-eye scale-75 opacity-80"></div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-black border border-red-900/50 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_0_50px_rgba(127,29,29,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 to-transparent pointer-events-none"></div>
          <p className="text-red-500 font-hell uppercase tracking-[0.4em] text-sm mb-4">The Moment of Departure</p>
          <h2 className="text-6xl md:text-8xl font-hell text-white mb-6 tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
            {result.estimatedDeathDate}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 text-zinc-500">
            <span className="bg-red-950/40 px-6 py-2 rounded-full text-xs font-hell border border-red-800/30 text-red-200">
              ALLOCATED DURATION: {result.estimatedLifespan} CYCLES
            </span>
            <span className="text-orange-600 flex items-center gap-2 animate-pulse">
              <i className="fas fa-fire"></i> THE GATE IS OPEN
            </span>
          </div>
        </div>

        <div className="bg-black border border-red-900/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-52 h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthScoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {/* Removed invalid 'shadow' prop to fix TypeScript error */}
                  <Cell fill="#ef4444" />
                  <Cell fill="#1a0505" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-hell text-white drop-shadow-md">{result.healthScore}</span>
              <span className="text-[10px] text-red-500 font-hell uppercase mt-1">Soul Resilience</span>
            </div>
          </div>
          <p className="mt-6 text-zinc-500 text-sm italic font-serif leading-relaxed">
            "Your mortal tether is {result.healthScore < 50 ? 'fraying at the edges.' : 'sturdier than most souls we claim.'}"
          </p>
        </div>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative">
          <h3 className="text-2xl font-hell text-red-600 mb-8 flex items-center gap-3">
            <i className="fas fa-scroll"></i> Cursed Threads
          </h3>
          <div className="space-y-5">
            {result.keyFactors.map((factor, idx) => (
              <div key={idx} className="p-5 bg-zinc-950/50 rounded-2xl border border-red-950/30 flex items-start gap-5 hover:bg-zinc-900 transition-colors">
                <div className={`mt-1.5 h-3 w-3 rounded-full shrink-0 animate-pulse ${
                  factor.impact === 'Positive' ? 'bg-orange-500 shadow-[0_0_15px_#f97316]' : 
                  factor.impact === 'Negative' ? 'bg-red-700 shadow-[0_0_15px_#7f1d1d]' : 'bg-zinc-700'
                }`}></div>
                <div>
                  <h4 className="font-hell text-white text-base mb-1">{factor.factor}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed font-serif">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl">
          <h3 className="text-2xl font-hell text-orange-600 mb-8 flex items-center gap-3">
            <i className="fas fa-hand-holding-medical"></i> Infernal Pacts
          </h3>
          <ul className="space-y-4">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-4 text-base text-zinc-400 font-serif">
                <span className="text-orange-700 mt-1"><i className="fas fa-bolt text-xs"></i></span>
                {rec}
              </li>
            ))}
          </ul>
          <div className="mt-10 p-6 bg-red-950/10 border border-red-900/30 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-800"></div>
            <p className="text-sm text-red-400 font-serif italic leading-loose">"{result.scientificInsights}"</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-12 pb-8">
        <button
          onClick={onReset}
          className="px-12 py-4 bg-transparent hover:bg-red-950/30 text-red-500 rounded-full transition-all border border-red-900/50 text-sm font-hell tracking-widest flex items-center gap-3 group"
        >
          <i className="fas fa-history group-hover:rotate-[-180deg] transition-transform duration-500"></i> 
          ALTER THE DESTINY
        </button>
      </div>
    </div>
  );
};

export default ResultDashboard;
