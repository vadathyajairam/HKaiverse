import React, { useState } from 'react';
import { UserCheck, Clock, CheckCircle2, AlertTriangle, FileCheck, ShieldCheck, Download, Plus, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DEPARTMENTS } from '../data/mockData';

export default function StudentPortal({ requests, setRequests }) {
  const [selectedReqId, setSelectedReqId] = useState(requests[0]?.id || '');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProgram, setNewProgram] = useState('B.Tech Computer Science');
  const [newGradYear, setNewGradYear] = useState('2026');
  const [showCertificate, setShowCertificate] = useState(false);

  const activeRequest = requests.find((r) => r.id === selectedReqId) || requests[0];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newHash = `STU-HASH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Auto rule engine clearance simulation for initial departments with 0 dues
    const newReq = {
      id: `REQ-2026-${randomNum}`,
      hashId: newHash,
      degreeProgram: newProgram,
      gradYear: newGradYear,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'IN_PROGRESS',
      manualTimeSpentMins: 480,
      clearFlowTimeMins: 3.5,
      departmentStatus: {
        lib: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: 'Just now', note: 'Zero library dues' },
        hst: { status: 'PENDING', updatedBy: 'Hostel Desk', timestamp: '-', note: 'Pending room checkout' },
        lab: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: 'Just now', note: 'Hardware kits cleared' },
        spt: { status: 'APPROVED', updatedBy: 'Auto-Rule-Engine', timestamp: 'Just now', note: 'No sports gear assigned' },
        acc: { status: 'APPROVED', updatedBy: 'Accounts System', timestamp: 'Just now', note: 'Semester fees verified' },
        hod: { status: 'PENDING', updatedBy: 'HOD Office', timestamp: '-', note: 'Awaiting Hostel clearance' },
      }
    };

    setRequests([newReq, ...requests]);
    setSelectedReqId(newReq.id);
    setShowNewModal(false);
  };

  const handleDownloadCertificate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowCertificate(true);
  };

  // Calculate percentage completion
  const deptKeys = Object.keys(activeRequest?.departmentStatus || {});
  const approvedCount = deptKeys.filter(
    (k) => activeRequest?.departmentStatus[k].status === 'APPROVED'
  ).length;
  const progressPercent = Math.round((approvedCount / deptKeys.length) * 100);
  const isFullyApproved = progressPercent === 100;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span>Student Digital NOC & Clearance Hub</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time multi-department status tracker — eliminates physical queues & phone inquiries.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Clearance Request</span>
        </button>
      </div>

      {/* Main Grid: Request Selector + Request Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Request List Cards */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Your Clearance Requests</h2>
          {requests.map((req) => {
            const isSelected = req.id === selectedReqId;
            const approved = Object.values(req.departmentStatus).filter((d) => d.status === 'APPROVED').length;
            const isDone = approved === INITIAL_DEPARTMENTS.length;

            return (
              <div
                key={req.id}
                onClick={() => setSelectedReqId(req.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/30 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">{req.id}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    req.status === 'FLAGGED' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {isDone ? 'FULLY CLEARED' : req.status === 'FLAGGED' ? 'REQUIRES REVIEW' : 'IN PROCESSING'}
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-medium mb-1">{req.degreeProgram}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-[10px]">{req.hashId}</span>
                  <span>{approved}/{INITIAL_DEPARTMENTS.length} Depts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Timeline & Digital NOC Card */}
        <div className="lg:col-span-2 space-y-6">
          {activeRequest && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
              {/* Header Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white font-mono">{activeRequest.id}</h3>
                    <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 font-mono">
                      {activeRequest.hashId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {activeRequest.degreeProgram} • Graduating Class of {activeRequest.gradYear}
                  </p>
                </div>

                {isFullyApproved && (
                  <button
                    onClick={handleDownloadCertificate}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Digital NOC</span>
                  </button>
                )}
              </div>

              {/* Real-time Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Clearance Progress</span>
                  <span className="font-bold text-indigo-400">{progressPercent}% Completed</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Department Stage Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Multi-Department Clearance Pipeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {INITIAL_DEPARTMENTS.map((dept) => {
                    const deptInfo = activeRequest.departmentStatus[dept.id] || { status: 'PENDING', note: 'Pending check' };
                    const isApp = deptInfo.status === 'APPROVED';
                    const isFlag = deptInfo.status === 'FLAGGED';

                    return (
                      <div
                        key={dept.id}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                          isApp ? 'bg-slate-900/80 border-emerald-500/30' :
                          isFlag ? 'bg-slate-900/80 border-amber-500/40' : 'bg-slate-900/30 border-slate-800'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isApp ? 'bg-emerald-500/10 text-emerald-400' :
                          isFlag ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isApp ? <CheckCircle2 className="w-4 h-4" /> :
                           isFlag ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-100">{dept.name}</span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              isApp ? 'text-emerald-400 bg-emerald-500/10' :
                              isFlag ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 bg-slate-800'
                            }`}>
                              {deptInfo.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{deptInfo.note}</p>
                          <p className="text-[10px] text-slate-400 pt-1">Officer / Engine: <span className="text-slate-400 font-mono">{deptInfo.updatedBy}</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-2xl p-6 border border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              <span>Submit Digital Clearance Request</span>
            </h3>
            <p className="text-xs text-slate-300">
              In accordance with HK AIVERSE Field Rules, your identity will be processed using an anonymized hash token (<span className="font-mono text-indigo-400">STU-HASH-XXXX</span>).
            </p>

            <form onSubmit={handleCreateRequest} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Degree Program</label>
                <select
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</option>
                  <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                  <option value="M.Tech Data Science">M.Tech Data Science</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Graduation Year</label>
                <select
                  value={newGradYear}
                  onChange={(e) => setNewGradYear(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/20"
                >
                  Dispatch to All 6 Depts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Certificate Modal */}
      {showCertificate && activeRequest && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 max-w-lg w-full rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />
            
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-1">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Campus Digital NOC Certificate</h3>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Verified Multi-Department Clearance</p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Request Certificate ID:</span>
                <span className="text-white font-bold">{activeRequest.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Anonymized Hash:</span>
                <span className="text-indigo-400">{activeRequest.hashId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Program:</span>
                <span className="text-white">{activeRequest.degreeProgram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clearance Completed In:</span>
                <span className="text-emerald-400 font-bold">{activeRequest.clearFlowTimeMins} Minutes</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="bg-white p-2 rounded-lg">
                <QrCode className="w-16 h-16 text-slate-950" />
              </div>
              <div className="text-left space-y-1">
                <p className="text-xs font-bold text-white">Tamper-Proof Verification Hash</p>
                <p className="text-[10px] text-slate-400 font-mono">0x9F42A...E88B1</p>
                <p className="text-[10px] text-emerald-400 font-medium">HKAIVERSE Field Protocol Approved</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
