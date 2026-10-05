import React, { useState } from 'react';
import { ANGULAR_SERVICES_SOURCE } from '../data/angular-services-code';
import { FileCode, Copy, Check, Download, Layers, ShieldCheck } from 'lucide-react';

export const AngularServicesView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ANGULAR_SERVICES_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ANGULAR_SERVICES_SOURCE], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'floorops_angular_services.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-[18px] font-bold text-[#172B4D] tracking-tight">
            Angular Client DTOs &amp; Injectable HTTP Services
          </h2>
          <p className="text-[12px] text-[#5E6C84] mt-0.5">
            Strict TypeScript interfaces and injectable Angular services for reactive Kanban pipeline updates, dynamic estimating calculations, and telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#EBECF0] hover:bg-[#DFE1E6] text-[#172B4D] text-[12px] font-semibold rounded flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Angular Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-semibold rounded flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download .TS File</span>
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="bg-[#1E293B] rounded-lg border border-[#334155] shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 text-white font-bold">src/app/core/services/floorops-api.service.ts</span>
            </div>
            <span>Angular 17+ / Standalone / RxJS</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 text-[12px] font-mono leading-relaxed text-[#E2E8F0]">
            <pre className="whitespace-pre">{ANGULAR_SERVICES_SOURCE}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
