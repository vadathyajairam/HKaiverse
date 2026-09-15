import React from 'react';
import { BarChart3, Clock, Footprints, FileText, TrendingDown, Layers, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { FIELD_METRICS, INITIAL_DEPARTMENTS } from '../data/mockData';

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <span>Field Intelligence & Time-Motion Analytics</span>
        </h1>
        <p className="text-xs text-slate-400">
          Empirical measurements observed during the campus manual workflow investigation (Sample size: {FIELD_METRICS.surveySampleCount} students & staff).
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Manual Turnaround Latency</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">4.2 Days</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Target: 6.5 Mins (ClearFlow)</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Redundant Data Copies</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">6 Ledgers</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>0 Manual Transcriptions</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Walking Distance per Student</span>
            <Footprints className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">1,850 m</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>0 m (100% Digital)</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Status Inquiry Reduction</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">94.2%</div>
          <p className="text-[11px] text-slate-400">Eliminated physical inquiry visits</p>
        </div>
      </div>

      {/* Latency Breakdown Heatmap */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Departmental Queue Latency Comparison</h2>
          <p className="text-xs text-slate-400">
            Observed average queue wait times per physical department visit (Minutes per student).
          </p>
        </div>

        <div className="space-y-4">
          {INITIAL_DEPARTMENTS.map((dept) => {
            const maxWait = 180;
            const widthPercent = Math.round((dept.avgManualWaitMins / maxWait) * 100);

            return (
              <div key={dept.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{dept.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono font-semibold">Manual: {dept.avgManualWaitMins}m</span>
                    <span className="text-emerald-400 font-mono font-semibold">ClearFlow: &lt; 0.5m</span>
                  </div>
                </div>

                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
                  {/* Manual Bar */}
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500 rounded-full"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Observed Workflow Qualitative Findings Grid */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Qualitative Field Observations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELD_METRICS.fieldObservations.map((obs, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>{obs.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{obs.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
