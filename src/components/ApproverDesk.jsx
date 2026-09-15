import React, { useState } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Filter, Search, ShieldCheck, Zap, Server, ChevronRight } from 'lucide-react';
import { INITIAL_DEPARTMENTS } from '../data/mockData';

export default function ApproverDesk({ requests, setRequests }) {
  const [selectedDeptId, setSelectedDeptId] = useState('lib');
  const [searchHash, setSearchHash] = useState('');

  const activeDept = INITIAL_DEPARTMENTS.find((d) => d.id === selectedDeptId) || INITIAL_DEPARTMENTS[0];

  const handleUpdateStatus = (reqId, newStatus, noteText) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== reqId) return req;
        const currentDeptObj = req.departmentStatus[selectedDeptId] || {};
        const updatedDeptStatus = {
          ...req.departmentStatus,
          [selectedDeptId]: {
            ...currentDeptObj,
            status: newStatus,
            updatedBy: `${activeDept.code} Officer Desk`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: noteText || (newStatus === 'APPROVED' ? 'Clearance verified' : 'Flagged for review'),
          }
        };

        // Check if all are now approved
        const allApproved = Object.values(updatedDeptStatus).every((d) => d.status === 'APPROVED');

        return {
          ...req,
          status: allApproved ? 'COMPLETED' : newStatus === 'FLAGGED' ? 'FLAGGED' : 'IN_PROGRESS',
          departmentStatus: updatedDeptStatus,
        };
      })
    );
  };

  const handleRunBatchAutoCheck = () => {
    setRequests((prev) =>
      prev.map((req) => {
        const currentDeptObj = req.departmentStatus[selectedDeptId];
        if (!currentDeptObj || currentDeptObj.status === 'APPROVED') return req;

        const updatedDeptStatus = {
          ...req.departmentStatus,
          [selectedDeptId]: {
            ...currentDeptObj,
            status: 'APPROVED',
            updatedBy: 'Automated Catalog Rules Engine',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: 'Auto-verified: Zero active catalogue dues found',
          }
        };

        const allApproved = Object.values(updatedDeptStatus).every((d) => d.status === 'APPROVED');
        return {
          ...req,
          status: allApproved ? 'COMPLETED' : 'IN_PROGRESS',
          departmentStatus: updatedDeptStatus,
        };
      })
    );
  };

  const filteredRequests = requests.filter((req) => {
    if (searchHash) {
      return (
        req.id.toLowerCase().includes(searchHash.toLowerCase()) ||
        req.hashId.toLowerCase().includes(searchHash.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>Multi-Department Officer Desk</span>
          </h1>
          <p className="text-xs text-slate-400">
            Single-click approval workspace with automated database cross-check rule execution.
          </p>
        </div>

        <button
          onClick={handleRunBatchAutoCheck}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-all"
        >
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Execute Auto-Rule Desk Audit</span>
        </button>
      </div>

      {/* Department Desk Selection Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {INITIAL_DEPARTMENTS.map((dept) => {
          const isActive = dept.id === selectedDeptId;
          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{dept.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({dept.code})</span>
            </button>
          );
        })}
      </div>

      {/* Active Desk Info Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Active Office Desk</span>
            <h2 className="text-lg font-bold text-white">{activeDept.name}</h2>
            <p className="text-xs text-slate-400">{activeDept.responsibleBuilding}</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Rule Engine:</span>
            <span className="text-emerald-400 font-medium">{activeDept.autoRule}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Request ID or Student Hash ID..."
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Request Approvals Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-3">Request ID</th>
                <th className="py-3 px-3">Anonymized Student Hash</th>
                <th className="py-3 px-3">Program</th>
                <th className="py-3 px-3">Desk Clearance Status</th>
                <th className="py-3 px-3">Officer Note</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRequests.map((req) => {
                const deptStatusObj = req.departmentStatus[selectedDeptId] || { status: 'PENDING', note: 'Pending' };
                const isApproved = deptStatusObj.status === 'APPROVED';
                const isFlagged = deptStatusObj.status === 'FLAGGED';

                return (
                  <tr key={req.id} className="hover:bg-slate-900/50 transition-all">
                    <td className="py-3.5 px-3 font-mono font-bold text-indigo-400">{req.id}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">{req.hashId}</td>
                    <td className="py-3.5 px-3 text-slate-200 font-medium">{req.degreeProgram}</td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        isApproved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        isFlagged ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {isApproved ? <CheckCircle2 className="w-3 h-3" /> :
                         isFlagged ? <AlertTriangle className="w-3 h-3" /> : null}
                        <span>{deptStatusObj.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">{deptStatusObj.note}</td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isApproved && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'APPROVED', 'Verified by officer')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] shadow-sm flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                        )}
                        {!isFlagged && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'FLAGGED', 'Outstanding verification required')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-950 text-amber-400 hover:text-amber-300 font-semibold text-[11px] border border-amber-500/30"
                          >
                            <span>Flag</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
