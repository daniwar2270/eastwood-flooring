import React, { useState } from 'react';
import {
  Droplets,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldAlert,
  Camera,
  Lock,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  FileCheck,
  Flag,
} from 'lucide-react';

export const MoistureTelemetryView: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<'A' | 'B' | 'C'>('A');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const testPoints = [
    {
      id: 'A',
      name: 'Point A (North Exterior Wall)',
      method: 'ASTM F2170 / 40mm Probe Sleeve',
      reading: 14.8,
      rh: 86,
      status: 'FAIL_HIGH',
      statusText: 'FAIL / HIGH',
    },
    {
      id: 'B',
      name: 'Point B (Center Subfloor Field)',
      method: 'Pinless Capacitive Scan • Stable Core',
      reading: 11.4,
      rh: 72,
      status: 'PASS_OK',
      statusText: 'PASS / OK',
    },
    {
      id: 'C',
      name: 'Point C (South Threshold Seam)',
      method: 'Direct Pin Probe / Deep',
      reading: 15.5,
      rh: 89,
      status: 'FAIL_CRITICAL',
      statusText: 'FAIL / CRITICAL',
    },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Dependencies Synchronized: Stop Work Order retained (Average 13.9% > 12.0% cutoff)');
      setTimeout(() => setSubmitMessage(null), 4000);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F4F5F7] p-6 space-y-5">
      {/* Top Incident Banner: STOP WORK ORDER ACTIVE */}
      <section className="bg-[#FFDAD6]/40 border border-red-300 border-l-4 border-l-red-600 rounded p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider font-mono">
                STOP WORK ORDER ACTIVE
              </span>
              <h2 className="text-[15px] font-bold text-red-950">
                CRITICAL DEPENDENCY: INSTALLATION BLOCKED
              </h2>
            </div>
            <p className="text-[12px] text-[#172B4D] mt-1 leading-snug">
              Subfloor moisture must drop below <strong className="text-red-900 font-bold">12.0%</strong> across all test points before fastener installation can commence. Current average:{' '}
              <strong className="text-red-700 font-bold font-mono">13.9% (FAIL)</strong>. Conforms to ASTM F2170 &amp; NWFA Subfloor Guidelines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-1.5 bg-white border border-[#DFE1E6] hover:bg-[#F1F3FF] text-[#172B4D] text-[12px] font-semibold rounded transition-colors">
            View Tolerance Rules
          </button>
          <button className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold rounded shadow-sm transition-colors">
            Deploy Remediation Order
          </button>
        </div>
      </section>

      {/* 4 Summary Telemetry Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-3.5 rounded-lg border border-[#DFE1E6] shadow-xs">
          <span className="text-[10px] text-[#737685] font-bold uppercase tracking-wider block">Average Moisture Content</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-bold text-red-600 font-mono">13.9%</span>
            <span className="text-[12px] text-[#5E6C84]">MC</span>
          </div>
          <div className="text-[11px] text-red-700 font-semibold mt-1">Target: &lt; 12.0% (+1.9% High Risk)</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DFE1E6] shadow-xs">
          <span className="text-[10px] text-[#737685] font-bold uppercase tracking-wider block">Testing Points Status</span>
          <div className="flex items-baseline gap-1 mt-1 font-mono">
            <span className="text-[26px] font-bold text-red-600">3</span>
            <span className="text-[13px] text-red-700 font-semibold">Failed</span>
            <span className="text-[14px] text-[#737685] ml-1">/ 2 Pending</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">2 Passed Core Field</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DFE1E6] shadow-xs">
          <span className="text-[10px] text-[#737685] font-bold uppercase tracking-wider block">Acclimatization Staging</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-bold text-[#0052CC] font-mono">2 of 3</span>
            <span className="text-[12px] text-[#5E6C84]">Materials</span>
          </div>
          <div className="text-[11px] text-[#0052CC] font-semibold mt-1">Day 2 of 3 • Oak: 8.2% (Pass)</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DFE1E6] shadow-xs">
          <span className="text-[10px] text-[#737685] font-bold uppercase tracking-wider block">Active Mitigation</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[18px] font-bold text-[#172B4D]">LGR 7000 Dehum</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Runtime: 18h / 24h (Est. 28h Target)</div>
        </div>
      </section>

      {/* Two-Column Grid: Probes & Graph (60%) vs Staging & Sign-Off (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Subfloor Moisture Telemetry Table */}
          <div className="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBECF0]">
              <div>
                <h3 className="text-[15px] font-bold text-[#172B4D]">Subfloor Moisture Telemetry</h3>
                <p className="text-[11px] text-[#5E6C84]">Real-time capacitive &amp; in-situ RH relative humidity probes (ASTM F2170)</p>
              </div>
              <span className="font-mono text-[11px] text-[#0052CC] bg-[#E8EDFF] px-2 py-0.5 rounded border border-[#C4D2FF]">
                Tramex CMEX5 #TX-4409
              </span>
            </div>

            {/* Test Points Table */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#FAFBFC] text-[#737685] uppercase text-[10px] font-bold border-b border-[#DFE1E6]">
                    <th className="py-2 px-2.5">Probe Location</th>
                    <th className="py-2 px-2.5">Method</th>
                    <th className="py-2 px-2.5">MC%</th>
                    <th className="py-2 px-2.5">Equilibrium RH</th>
                    <th className="py-2 px-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBECF0]">
                  {testPoints.map((pt) => (
                    <tr
                      key={pt.id}
                      onClick={() => setSelectedPoint(pt.id as any)}
                      className={`cursor-pointer transition-colors ${
                        selectedPoint === pt.id ? 'bg-[#E8EDFF]/50' : 'hover:bg-[#FAFBFC]'
                      }`}
                    >
                      <td className="py-2.5 px-2.5 font-semibold text-[#172B4D] flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono text-white ${
                            pt.status.includes('FAIL') ? 'bg-red-600' : 'bg-emerald-600'
                          }`}
                        >
                          {pt.id}
                        </span>
                        <span>{pt.name}</span>
                      </td>
                      <td className="py-2.5 px-2.5 text-[#5E6C84]">{pt.method}</td>
                      <td className="py-2.5 px-2.5 font-mono font-bold text-[13px] text-[#172B4D]">
                        {pt.reading}%
                      </td>
                      <td className="py-2.5 px-2.5 font-mono text-[#5E6C84]">{pt.rh}% RH</td>
                      <td className="py-2.5 px-2.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            pt.status.includes('FAIL')
                              ? 'bg-red-100 text-red-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {pt.statusText}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 72-Hour Desiccant Moisture Decline Curve (SVG) */}
            <div className="mt-4 bg-[#FAFBFC] p-3 rounded-lg border border-[#DFE1E6]">
              <div className="flex items-center justify-between mb-2 text-[12px]">
                <span className="font-bold text-[#172B4D] flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[#0052CC]" />
                  <span>72-Hour Desiccant Moisture Decline Curve</span>
                </span>
                <span className="text-[11px] text-[#737685]">Target crossover &lt; 12.0%: Projected in 28 Hours</span>
              </div>

              {/* Visual Graph Curve */}
              <div className="w-full h-24 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 80" preserveAspectRatio="none">
                  <line x1="0" y1="45" x2="500" y2="45" stroke="#BA1A1A" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="6" y="41" fill="#BA1A1A" fontSize="9" fontWeight="700">
                    ASTM Fastener Cutoff (12.0% MC)
                  </text>
                  <defs>
                    <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0052CC" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0052CC" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,12 100,20 200,28 320,38 420,42 500,46 500,80 0,80" fill="url(#moistGrad)" />
                  <polyline points="0,12 100,20 200,28 320,38 420,42 500,46" fill="none" stroke="#0052CC" strokeWidth="2.5" />
                  <circle cx="0" cy="12" r="3.5" fill="#BA1A1A" />
                  <circle cx="200" cy="28" r="3.5" fill="#BA1A1A" />
                  <circle cx="320" cy="38" r="4.5" fill="#0052CC" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#737685] font-mono mt-2 pt-1 border-t border-[#DFE1E6]">
                <span>T-72h (16.2% MC)</span>
                <span>T-48h (15.1% MC)</span>
                <span>T-24h (14.4% MC)</span>
                <span className="font-bold text-[#172B4D]">Now: 13.9% MC</span>
                <span className="text-emerald-700 font-bold">T+28h Est. (11.8% MC Target)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Acclimatization & Sign-Off Lock (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Material Laydown & Acclimatization */}
          <div className="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBECF0]">
              <h3 className="text-[14px] font-bold text-[#172B4D]">Material Acclimatization</h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-[#E3FCEF] px-2 py-0.5 rounded">
                2 / 3 Staged
              </span>
            </div>

            <div className="space-y-2 text-[12px]">
              {/* Item 1 */}
              <div className="p-2.5 rounded border border-[#DFE1E6] bg-[#FAFBFC]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172B4D]">5-in Select White Oak Planks</span>
                  <span className="text-[10px] font-mono text-[#5E6C84]">PO-55318</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#5E6C84] mt-1">
                  <span>Wood Moisture: <strong className="text-emerald-700">8.2% MC</strong></span>
                  <span>Acclim. Duration: <strong>Day 2 of 3</strong></span>
                </div>
                <div className="text-[10px] text-amber-800 font-medium mt-1">
                  Wood-to-subfloor differential currently 5.7% (Max allowed: 2.0%). Subfloor drying required.
                </div>
              </div>

              {/* Item 2: AcoustiGuard Barrier */}
              <div className="p-2.5 rounded border border-red-300 bg-[#FFDAD6]/30">
                <div className="flex items-center justify-between text-red-950 font-bold">
                  <span>AcoustiGuard Vapor Barrier</span>
                  <span className="text-[10px] font-mono text-red-700">PO-88219</span>
                </div>
                <div className="text-[11px] text-red-800 mt-1">
                  Delayed in transit (FedEx TRK-88219). Revised ETA Oct 18.
                </div>
              </div>

              {/* Item 3: Bona Traffic HD */}
              <div className="p-2.5 rounded border border-[#DFE1E6] bg-[#FAFBFC]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172B4D]">Bona Traffic HD Extra Matte</span>
                  <span className="text-[10px] font-mono text-[#5E6C84]">PO-77402</span>
                </div>
                <div className="text-[11px] text-[#5E6C84] mt-1">
                  8 Gallons staged in climate vestibule (68°F / 45% RH compliant).
                </div>
              </div>
            </div>
          </div>

          {/* Superintendent Field Log & Sign-Off Lock */}
          <div className="bg-white rounded-lg border border-[#DFE1E6] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBECF0]">
              <span className="text-[13px] font-bold text-[#172B4D]">Superintendent Field Log</span>
              <span className="text-[11px] text-[#737685]">Lead: Marco Gomez</span>
            </div>

            <p className="text-[12px] text-[#5E6C84] italic bg-[#FAFBFC] p-2.5 rounded border border-[#DFE1E6]">
              "Subfloor concrete slab near north exterior wall still retaining residual dampness. Extended industrial dehumidifier runtime by 24h. Re-testing scheduled for tomorrow 08:00 AM."
            </p>

            {/* Lock Container */}
            <div className="bg-[#EBECF0] p-3 rounded border border-[#DFE1E6] flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-600" />
                <div>
                  <span className="font-bold text-[#172B4D] block">Subfloor Sign-Off Locked</span>
                  <span className="text-[11px] text-[#737685]">Blocked until 100% of probes &lt; 12.0% MC</span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                LOCKED
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-10 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white rounded text-[12px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Submit Log &amp; Update Dependencies</span>
                  </>
                )}
              </button>

              {submitMessage && (
                <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-[11px] text-emerald-900 font-semibold text-center animate-fade-in">
                  {submitMessage}
                </div>
              )}

              <button className="w-full py-1.5 text-center text-red-600 hover:text-red-800 text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Flag className="w-3.5 h-3.5" />
                <span>Flag Site Delay to Marcus Vance (Ops Lead)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
