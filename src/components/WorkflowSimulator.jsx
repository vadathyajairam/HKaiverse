import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, Clock, Footprints, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Server, ChevronRight } from 'lucide-react';
import { INITIAL_DEPARTMENTS, FIELD_METRICS } from '../data/mockData';

export default function WorkflowSimulator() {
  const [activeMode, setActiveMode] = useState('clearflow'); // 'manual' | 'clearflow'
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isSimulating) {
      if (activeMode === 'manual') {
        timer = setInterval(() => {
          setCurrentStepIndex((prev) => {
            if (prev >= INITIAL_DEPARTMENTS.length - 1) {
              setIsSimulating(false);
              return prev;
            }
            return prev + 1;
          });
          setElapsedTime((prev) => prev + 18); // Simulated hours
        }, 1200);
      } else {
        timer = setInterval(() => {
          setCurrentStepIndex((prev) => {
            if (prev >= INITIAL_DEPARTMENTS.length - 1) {
              setIsSimulating(false);
              return prev;
            }
            return prev + 1;
          });
          setElapsedTime((prev) => prev + 1.1); // Simulated minutes
        }, 400);
      }
    }
    return () => clearInterval(timer);
  }, [isSimulating, activeMode]);

  const handleStartSimulation = (mode) => {
    setActiveMode(mode);
    setCurrentStepIndex(0);
    setElapsedTime(mode === 'manual' ? 2 : 0.5);
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStepIndex(-1);
    setElapsedTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Banner Mission Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 md:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Field Intelligence Investigation</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Campus Multi-Department Clearance & No-Dues Flow
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              We observed and measured the paper-heavy multi-department NOC workflow across 6 campus buildings. 
              Compare the physical paper walk against the <strong className="text-indigo-400 font-semibold">ClearFlow Asynchronous Parallel Engine</strong> below.
            </p>
          </div>

          {/* Action Simulation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleStartSimulation('clearflow')}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Simulate ClearFlow Digital</span>
            </button>
            <button
              onClick={() => handleStartSimulation('manual')}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Footprints className="w-4 h-4 text-amber-400" />
              <span>Simulate Legacy Paper Walk</span>
            </button>
            {(currentStepIndex >= 0 || isSimulating) && (
              <button
                onClick={handleReset}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Field Measurement KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Process Latency</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{FIELD_METRICS.averageManualDays} Days</span>
            <span className="text-xs text-emerald-400 font-semibold">→ {FIELD_METRICS.averageClearFlowMins} Mins</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">99.8% process time reduction</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Physical Distance</span>
            <Footprints className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{FIELD_METRICS.walkingDistanceMeters} m</span>
            <span className="text-xs text-emerald-400 font-semibold">→ 0 m</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">6 buildings physical travel saved</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Paper Forms</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{FIELD_METRICS.paperSheetsSavedPerStudent} Sheets</span>
            <span className="text-xs text-emerald-400 font-semibold">→ 0 Paper</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">100% digital NOC verification</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Status Inquiry Calls</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">-{FIELD_METRICS.statusInquiriesReducedPercent}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Zero "what happened to request?" visits</p>
        </div>
      </div>

      {/* Mode Comparison Ticker Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Simulation Execution</span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {activeMode === 'clearflow' ? (
                <>
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <span>ClearFlow Parallel Digital Pipeline</span>
                  <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Legacy Sequential Paper Walk</span>
                  <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Manual Bottleneck</span>
                </>
              )}
            </h2>
          </div>

          {currentStepIndex >= 0 && (
            <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium uppercase">Simulated Elapsed Time</p>
                <p className="text-base font-mono font-bold text-indigo-400">
                  {activeMode === 'manual' ? `${elapsedTime.toFixed(0)} Hours (~${(elapsedTime/24).toFixed(1)} Days)` : `${elapsedTime.toFixed(1)} Minutes`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Workflow Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_DEPARTMENTS.map((dept, index) => {
            const isCompleted = currentStepIndex > index || (activeMode === 'clearflow' && currentStepIndex >= 0);
            const isCurrent = currentStepIndex === index;
            const isPending = currentStepIndex < index;

            return (
              <div
                key={dept.id}
                className={`relative rounded-xl p-4 border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/50 scale-[1.02]'
                    : isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800 text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      isCurrent ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-100">{dept.name}</h3>
                      <p className="text-[11px] text-slate-400">{dept.responsibleBuilding}</p>
                    </div>
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                  ) : null}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Manual Queue Latency:</span>
                    <span className="font-mono text-amber-400">{dept.avgManualWaitMins} mins</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>ClearFlow Rule:</span>
                    <span className="font-mono text-emerald-400 text-[11px] truncate max-w-[130px]">{dept.autoRule}</span>
                  </div>
                </div>

                {activeMode === 'clearflow' && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Execution Mode:</span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <Server className="w-3 h-3" /> Auto Parallel API
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Observation Callout Box */}
        <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Field Intelligence Root Cause Finding</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In the legacy manual process, students must move <em>sequentially</em> between physical desks. If a single desk (e.g. Accounts or HOD) has an absent officer or 2-hour lunch break, the entire clearance process freezes for days. ClearFlow solves this by treating department clearances as <strong>independent, asynchronous parallel events</strong> with automated rule evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
