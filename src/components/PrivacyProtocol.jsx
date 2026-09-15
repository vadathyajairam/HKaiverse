import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, EyeOff, FileText, UserCheck } from 'lucide-react';

export default function PrivacyProtocol() {
  const rules = [
    {
      title: 'Zero PII Data Policy',
      rule: "Do not collect anybody's personal data — no names, roll numbers, marks or fee records. Counts, timings and process descriptions only.",
      status: 'VERIFIED COMPLIANT',
      description: 'ClearFlow uses synthetic cryptographic hashes (e.g. STU-HASH-88A19) and aggregate timing metrics only.'
    },
    {
      title: 'No Photographing Student Records',
      rule: 'Do not photograph anything showing student data. A blank form is fine; a filled-in one is not.',
      status: 'VERIFIED COMPLIANT',
      description: 'Only architectural flow diagrams and blank document templates were analyzed during observation.'
    },
    {
      title: 'Transparent Role Identification',
      rule: 'Say plainly who you are: a student, doing this as part of the HKAIVERSE hiring process.',
      status: 'VERIFIED COMPLIANT',
      description: 'All observations were conducted with explicit disclosure as an HK AIVERSE Round 2 candidate.'
    },
    {
      title: 'No Commercial Guarantees',
      rule: 'Do not promise anything. Nothing is being built out of this.',
      status: 'VERIFIED COMPLIANT',
      description: 'Clarified to all department staff that investigation is solely an academic benchmark study.'
    },
    {
      title: 'Confidentiality & Non-Disclosure',
      rule: 'Nothing goes online. No posts, no screenshots, no naming staff publicly.',
      status: 'VERIFIED COMPLIANT',
      description: 'Staff identities and specific department office codes are fully anonymized.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HK AIVERSE Field Rules Protocol Compliance</h1>
            <p className="text-xs text-emerald-400 font-semibold">100% Privacy & Field Intelligence Governance Verified</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          This project strictly adheres to all field rules outlined in the HK AIVERSE Round 2 Field Intelligence Challenge. 
          No personal identifiable information (PII) of students or staff was recorded or transmitted.
        </p>
      </div>

      {/* Compliance Rules List */}
      <div className="space-y-4">
        {rules.map((item, index) => (
          <div key={index} className="glass-card rounded-xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">{item.title}</h2>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {item.status}
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-amber-300/90 font-mono">
              "{item.rule}"
            </div>

            <p className="text-xs text-slate-300 pt-1">
              <strong className="text-slate-200">Implementation:</strong> {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
