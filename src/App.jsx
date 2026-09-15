import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WorkflowSimulator from './components/WorkflowSimulator';
import StudentPortal from './components/StudentPortal';
import ApproverDesk from './components/ApproverDesk';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PrivacyProtocol from './components/PrivacyProtocol';
import { INITIAL_REQUESTS } from './data/mockData';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {activeTab === 'simulator' && <WorkflowSimulator />}
        {activeTab === 'student' && <StudentPortal requests={requests} setRequests={setRequests} />}
        {activeTab === 'approver' && <ApproverDesk requests={requests} setRequests={setRequests} />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'privacy' && <PrivacyProtocol />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HK AIVERSE Round 2 Field Intelligence Challenge Candidate Project</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-400">
              Zero PII Protocol Compliant
            </span>
            <span>•</span>
            <span className="font-mono text-indigo-400">v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
