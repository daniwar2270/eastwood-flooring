import React, { useState } from 'react';
import {
  Calculator,
  Layers,
  Sparkles,
  Bookmark,
  FileDown,
  CheckCircle,
  Search,
  Plus,
  Trash2,
  AlertTriangle,
  Lock,
  ChevronRight,
  TrendingUp,
  Percent,
  Sliders,
  DollarSign,
  Send,
} from 'lucide-react';

export const DynamicEstimatorView: React.FC = () => {
  // Scenario state
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');

  // Interactive waste factors & quantities
  const [carpetTakeoff, setCarpetTakeoff] = useState<number>(4800);
  const [carpetWastePct, setCarpetWastePct] = useState<number>(10); // +10% standard waste
  const [concreteTakeoff, setConcreteTakeoff] = useState<number>(1400);
  const [underlaymentTakeoff, setUnderlaymentTakeoff] = useState<number>(4800);

  // Crew hours
  const [prepCrewHours, setPrepCrewHours] = useState<number>(16.0);
  const [tileCrewHours, setTileCrewHours] = useState<number>(24.0);

  // Equipment days
  const [dehumDays, setDehumDays] = useState<number>(5);

  // Target margin slider (28.5%)
  const [targetMarginPct, setTargetMarginPct] = useState<number>(28.5);

  // Dynamic calculations
  const carpetBilledSqft = Math.round(carpetTakeoff * (1 + carpetWastePct / 100));
  const carpetTotal = carpetBilledSqft * 4.85;
  const concreteTotal = concreteTakeoff * 6.50;
  const underlaymentTotal = underlaymentTakeoff * 1.15;
  const materialsCost = carpetTotal + concreteTotal + underlaymentTotal; // ~$40,228

  const prepLaborTotal = 3 * prepCrewHours * 52.0; // 3 techs
  const tileLaborTotal = 4 * tileCrewHours * 48.0; // 4 installers
  const laborCost = prepLaborTotal + tileLaborTotal; // ~$7,104

  const equipCost = dehumDays * 75.0; // $375

  const moistureContingency = Math.round(materialsCost * 0.05); // +$2,011 or #MR-42 modifier
  const directCost = materialsCost + laborCost + equipCost;
  const overheadPct = 15.0;
  const overheadAmount = Math.round(directCost * (overheadPct / 100));
  const costWithOverhead = directCost + overheadAmount;

  // Selling Price = costWithOverhead / (1 - targetMarginPct / 100)
  const totalProposal = Math.round(costWithOverhead / (1 - targetMarginPct / 100));
  const grossProfit = totalProposal - directCost;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-[12px] text-[#5E6C84] gap-1.5">
            <span>Projects</span>
            <span className="text-[#DFE1E6]">/</span>
            <span className="font-semibold text-[#172B4D]">Oakland Tech Hub (FLR-122)</span>
            <span className="text-[#DFE1E6]">/</span>
            <span className="font-semibold text-[#0052CC]">Dynamic Estimator</span>
          </div>
          <span className="bg-[#EBECF0] text-[#172B4D] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#DFE1E6]">
            FLR-122
          </span>
          <span className="bg-[#E8EDFF] text-[#0052CC] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C4D2FF]">
            DRAFT ESTIMATE
          </span>
        </div>

        {/* Live Total & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#F1F3FF] border border-[#DFE1E6] px-3 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase font-bold text-[#5E6C84]">Live Calculated Total</span>
              <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                ${totalProposal.toLocaleString()}.00
              </span>
            </div>
            <div className="h-5 w-px bg-[#DFE1E6] mx-1"></div>
            <div className="text-left text-[11px] leading-tight">
              <span className="text-emerald-700 font-bold">{targetMarginPct.toFixed(1)}% Margin</span>
              <span className="text-[#737685] block text-[9px]">Target: 25.0%</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium bg-[#EBECF0] px-2 py-1 rounded text-[#172B4D]">
            <Lock className="w-3 h-3 text-[#5E6C84]" />
            <span>Formula Lock v3.4</span>
          </div>

          <button className="bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-semibold px-3 py-1.5 rounded transition-all shadow-sm flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Approve &amp; Push to Quote</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Rate Library & Modifiers Sidebar (~330px) */}
        <aside className="w-80 shrink-0 bg-white border-r border-[#DFE1E6] flex flex-col h-full overflow-hidden">
          <div className="p-3 border-b border-[#DFE1E6] bg-[#FAFBFC] space-y-2">
            <div className="flex items-center justify-between text-[12px] font-bold text-[#172B4D]">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Rate Library &amp; Modifiers</span>
              </span>
              <span className="text-[10px] text-[#737685] uppercase font-mono">48 items</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737685]" />
              <input
                type="text"
                placeholder="Search catalog materials, labor rates..."
                className="w-full bg-[#F4F5F7] border border-[#DFE1E6] rounded py-1 pl-8 pr-2 text-[11px] outline-none focus:border-[#0052CC]"
              />
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-0.5">
              <span className="px-2 py-0.5 bg-[#0052CC] text-white rounded-full font-semibold">All</span>
              <span className="px-2 py-0.5 bg-[#F1F3FF] text-[#172B4D] rounded-full">Materials</span>
              <span className="px-2 py-0.5 bg-[#F1F3FF] text-[#172B4D] rounded-full">Labor</span>
              <span className="px-2 py-0.5 bg-[#F1F3FF] text-[#172B4D] rounded-full">Modifiers</span>
            </div>
          </div>

          {/* Library Items Accordion List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#0052CC] mb-1.5">
                Finishes &amp; Materials
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-white flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="font-semibold text-[#172B4D] block">Select White Oak 5-inch Plank</span>
                    <span className="text-[#737685] font-mono">$9.20 / sq ft</span>
                  </div>
                  <button className="w-6 h-6 rounded bg-[#E8EDFF] text-[#0052CC] flex items-center justify-center font-bold hover:bg-[#0052CC] hover:text-white transition-colors">
                    +
                  </button>
                </div>

                <div className="p-2 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-white flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="font-semibold text-[#172B4D] block">Interface Commercial Carpet Tile</span>
                    <span className="text-[#737685] font-mono">$4.85 / sq ft</span>
                  </div>
                  <button className="w-6 h-6 rounded bg-[#E8EDFF] text-[#0052CC] flex items-center justify-center font-bold hover:bg-[#0052CC] hover:text-white transition-colors">
                    +
                  </button>
                </div>

                <div className="p-2 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-white flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="font-semibold text-[#172B4D] block">AcoustiGuard Vapor Underlayment</span>
                    <span className="text-[#737685] font-mono">$1.15 / sq ft</span>
                  </div>
                  <button className="w-6 h-6 rounded bg-[#E8EDFF] text-[#0052CC] flex items-center justify-center font-bold hover:bg-[#0052CC] hover:text-white transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5">
                Labor Roles &amp; Crews
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded border border-[#DFE1E6] bg-[#FAFBFC] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#172B4D] block">Subfloor Prep Specialist</span>
                    <span className="text-[#737685] font-mono">$52.00 / hr loaded</span>
                  </div>
                  <button className="w-6 h-6 rounded bg-[#E8EDFF] text-[#0052CC] flex items-center justify-center font-bold">
                    +
                  </button>
                </div>
                <div className="p-2 rounded border border-[#DFE1E6] bg-[#FAFBFC] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#172B4D] block">Commercial Tile Installer</span>
                    <span className="text-[#737685] font-mono">$48.00 / hr loaded</span>
                  </div>
                  <button className="w-6 h-6 rounded bg-[#E8EDFF] text-[#0052CC] flex items-center justify-center font-bold">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
                Modifiers &amp; Rules
              </div>
              <div className="p-2 rounded border border-emerald-200 bg-[#E3FCEF]/40 text-[11px]">
                <span className="font-bold text-[#006644] block">Standard Waste Factor (+10%)</span>
                <span className="text-[#5E6C84]">Applied to carpet &amp; hardwood takeoffs</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Canvas: Dynamic Calculation Sections */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
          {/* Canvas Sub-bar */}
          <div className="bg-white border-b border-[#DFE1E6] px-6 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#F1F3FF] p-0.5 rounded border border-[#DFE1E6] text-[12px]">
                <button
                  onClick={() => setActiveScenario('A')}
                  className={`px-3 py-1 rounded font-semibold transition-colors ${
                    activeScenario === 'A' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84]'
                  }`}
                >
                  Base Bid Scenario A
                </button>
                <button
                  onClick={() => setActiveScenario('B')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    activeScenario === 'B' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84]'
                  }`}
                >
                  Option B: Polished Stone (+ $8.2k)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[12px]">
              <div className="bg-[#F1F3FF] px-2.5 py-1 rounded border border-[#DFE1E6] font-mono">
                <span className="text-[#5E6C84]">Gross Area:</span>{' '}
                <strong className="text-[#172B4D]">6,200 sq ft</strong>
              </div>
              <div className="bg-[#F1F3FF] px-2.5 py-1 rounded border border-[#DFE1E6] font-mono">
                <span className="text-[#5E6C84]">Usable Zones:</span>{' '}
                <strong className="text-[#172B4D]">4 Zones</strong>
              </div>
              <div className="bg-[#FFF0B3] text-[#172B4D] px-2.5 py-1 rounded border border-[#FFE380] text-[11px] font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Moisture Test: 14.8% flagged</span>
              </div>
            </div>
          </div>

          {/* Scrollable Sections Canvas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* SECTION 1: Materials Takeoff */}
            <div className="bg-white rounded-lg border border-[#DFE1E6] shadow-xs overflow-hidden">
              <div className="bg-[#FAFBFC] px-4 py-2 border-b border-[#EBECF0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC]" />
                  <span className="text-[13px] font-bold text-[#172B4D]">
                    Section 1: Surface Materials &amp; Finish Takeoff
                  </span>
                  <span className="text-[10px] bg-[#EBECF0] text-[#5E6C84] px-1.5 py-0.2 rounded font-mono font-bold">
                    3 Blocks
                  </span>
                </div>
                <div className="text-[12px] font-mono">
                  <span className="text-[#737685]">Section Cost: </span>
                  <strong className="text-[#0052CC] text-[14px]">${materialsCost.toLocaleString()}.00</strong>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#EBECF0] text-[12px]">
                {/* Block 1: Carpet Tile with +10% Waste */}
                <div className="p-3.5 flex items-center gap-4 hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-1/4">
                    <span className="font-bold text-[#172B4D] block">Interface Commercial Carpet Tile</span>
                    <span className="text-[11px] text-[#5E6C84]">Main Open Workspace Zone A &amp; B</span>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Takeoff Qty</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <input
                          type="number"
                          value={carpetTakeoff}
                          onChange={(e) => setCarpetTakeoff(Number(e.target.value))}
                          className="w-full bg-transparent text-right font-bold text-[#172B4D] outline-none"
                        />
                        <span className="text-[10px] text-[#737685] ml-1">sq ft</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Base Rate</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <span className="text-[10px] text-[#737685] mr-0.5">$</span>
                        <span className="w-full text-right font-bold text-[#172B4D]">4.85</span>
                        <span className="text-[10px] text-[#737685] ml-1">/ft²</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-emerald-700 block">Waste Modifier</label>
                      <div className="flex items-center bg-[#E3FCEF] border border-emerald-300 rounded px-2 py-1 font-mono">
                        <span className="text-emerald-800 font-bold text-[11px]">+{carpetWastePct}%</span>
                        <span className="text-[10px] text-emerald-950 ml-auto">({carpetBilledSqft.toLocaleString()} ft² billed)</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Calculated Subtotal</label>
                      <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                        ${carpetTotal.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Block 2: Polished Concrete */}
                <div className="p-3.5 flex items-center gap-4 hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-1/4">
                    <span className="font-bold text-[#172B4D] block">Polished Concrete &amp; Epoxy Sealant</span>
                    <span className="text-[11px] text-[#5E6C84]">Executive Boardrooms &amp; Breakout Hub</span>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Takeoff Qty</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <input
                          type="number"
                          value={concreteTakeoff}
                          onChange={(e) => setConcreteTakeoff(Number(e.target.value))}
                          className="w-full bg-transparent text-right font-bold text-[#172B4D] outline-none"
                        />
                        <span className="text-[10px] text-[#737685] ml-1">sq ft</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Base Rate</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <span className="text-[10px] text-[#737685] mr-0.5">$</span>
                        <span className="w-full text-right font-bold text-[#172B4D]">6.50</span>
                        <span className="text-[10px] text-[#737685] ml-1">/ft²</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Waste Modifier</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 text-[11px] text-[#5E6C84]">
                        <span>0% (Liquid/Bulk)</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Calculated Subtotal</label>
                      <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                        ${concreteTotal.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Block 3: AcoustiGuard Underlayment */}
                <div className="p-3.5 flex items-center gap-4 hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-1/4">
                    <span className="font-bold text-[#172B4D] block">AcoustiGuard Vapor Underlayment</span>
                    <span className="text-[11px] text-[#5E6C84]">Under-carpet dampening roll</span>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Takeoff Qty</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <input
                          type="number"
                          value={underlaymentTakeoff}
                          onChange={(e) => setUnderlaymentTakeoff(Number(e.target.value))}
                          className="w-full bg-transparent text-right font-bold text-[#172B4D] outline-none"
                        />
                        <span className="text-[10px] text-[#737685] ml-1">sq ft</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Base Rate</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <span className="text-[10px] text-[#737685] mr-0.5">$</span>
                        <span className="w-full text-right font-bold text-[#172B4D]">1.15</span>
                        <span className="text-[10px] text-[#737685] ml-1">/ft²</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Waste Modifier</label>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 text-[11px] text-[#5E6C84]">
                        <span>Included in Spec</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-[10px] uppercase font-bold text-[#737685] block">Calculated Subtotal</label>
                      <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                        ${underlaymentTotal.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Labor & Installation Crews */}
            <div className="bg-white rounded-lg border border-[#DFE1E6] shadow-xs overflow-hidden">
              <div className="bg-[#FAFBFC] px-4 py-2 border-b border-[#EBECF0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span className="text-[13px] font-bold text-[#172B4D]">
                    Section 2: Labor &amp; Installation Crews
                  </span>
                  <span className="text-[10px] bg-[#EBECF0] text-[#5E6C84] px-1.5 py-0.2 rounded font-mono font-bold">
                    2 Crews
                  </span>
                </div>
                <div className="text-[12px] font-mono">
                  <span className="text-[#737685]">Section Cost: </span>
                  <strong className="text-amber-800 text-[14px]">${laborCost.toLocaleString()}.00</strong>
                </div>
              </div>

              <div className="divide-y divide-[#EBECF0] text-[12px]">
                <div className="p-3.5 flex items-center gap-4 hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-1/4">
                    <span className="font-bold text-[#172B4D] block">Lead Subfloor Prep Crew</span>
                    <span className="text-[11px] text-[#5E6C84]">Grinding, crack repairs, vacuuming</span>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Crew Composition</span>
                      <span className="font-bold text-[#172B4D]">3 Technicians</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Estimated Time</span>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <input
                          type="number"
                          value={prepCrewHours}
                          onChange={(e) => setPrepCrewHours(Number(e.target.value))}
                          className="w-full bg-transparent text-right font-bold text-[#172B4D] outline-none"
                        />
                        <span className="text-[10px] text-[#737685] ml-1">hrs</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Blended Rate</span>
                      <span className="text-[#5E6C84] font-mono">$52.00 / tech·hr</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Calculated Subtotal</span>
                      <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                        ${prepLaborTotal.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex items-center gap-4 hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-1/4">
                    <span className="font-bold text-[#172B4D] block">Commercial Tile Installers</span>
                    <span className="text-[11px] text-[#5E6C84]">Adhesive layout, pattern setting</span>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Crew Composition</span>
                      <span className="font-bold text-[#172B4D]">4 Installers</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Estimated Time</span>
                      <div className="flex items-center bg-[#F4F5F7] border border-[#DFE1E6] rounded px-2 py-1 font-mono">
                        <input
                          type="number"
                          value={tileCrewHours}
                          onChange={(e) => setTileCrewHours(Number(e.target.value))}
                          className="w-full bg-transparent text-right font-bold text-[#172B4D] outline-none"
                        />
                        <span className="text-[10px] text-[#737685] ml-1">hrs</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Blended Rate</span>
                      <span className="text-[#5E6C84] font-mono">$48.00 / tech·hr</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#737685] block">Calculated Subtotal</span>
                      <span className="font-mono text-[14px] font-bold text-[#172B4D]">
                        ${tileLaborTotal.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Equipment & Environmental Conditioning */}
            <div className="bg-white rounded-lg border border-[#DFE1E6] shadow-xs p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <div>
                  <span className="font-bold text-[#172B4D] block text-[13px]">
                    Dehumidifier &amp; Moisture Laser Array
                  </span>
                  <span className="text-[11px] text-[#5E6C84]">Continuous slab monitoring unit (5 Days deployed)</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-[12px] font-mono">
                <div>
                  <span className="text-[#737685] text-[10px] block">Daily Rate</span>
                  <span className="font-bold">$75.00 / day</span>
                </div>
                <div className="text-right">
                  <span className="text-[#737685] text-[10px] block">Calculated Subtotal</span>
                  <span className="font-bold text-[#172B4D] text-[14px]">${equipCost}.00</span>
                </div>
              </div>
            </div>

            {/* SECTION 4: Formula Modifiers & Contingency Rules */}
            <div className="bg-[#E3FCEF]/40 border border-emerald-300 rounded-lg p-3.5 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2.5">
                <Percent className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="font-bold text-emerald-950 block">
                    Moisture Risk Mitigation Contingency (+5% on wet slabs)
                  </span>
                  <span className="text-[11px] text-emerald-800">
                    Triggered by high RH reading on Floor 4 Core slab test (14.8%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span className="text-[11px] bg-white border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  FORMULA RULE #MR-42
                </span>
                <span className="font-bold text-emerald-900 text-[14px]">
                  +${moistureContingency.toLocaleString()}.00
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Summary & Margin Engine Bar */}
          <footer className="bg-white border-t border-[#DFE1E6] px-6 py-3 shrink-0 flex items-center justify-between shadow-lg">
            {/* Cost Breakdown */}
            <div className="flex items-center gap-6 text-[12px]">
              <div>
                <span className="text-[10px] text-[#737685] uppercase font-bold block">Materials</span>
                <span className="font-mono font-bold text-[#172B4D]">${materialsCost.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#737685] uppercase font-bold block">Labor</span>
                <span className="font-mono font-bold text-[#172B4D]">${laborCost.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#737685] uppercase font-bold block">Equip</span>
                <span className="font-mono font-bold text-[#172B4D]">${equipCost}</span>
              </div>

              <div className="h-6 w-px bg-[#DFE1E6]"></div>

              <div>
                <span className="text-[10px] text-[#737685] uppercase font-bold block">Direct Cost</span>
                <span className="font-mono font-bold text-[#172B4D]">${directCost.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#737685] uppercase font-bold block">Overhead (+15%)</span>
                <span className="font-mono text-[#5E6C84]">${overheadAmount.toLocaleString()}</span>
              </div>

              <div className="h-6 w-px bg-[#DFE1E6]"></div>

              {/* Margin Slider */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-[#737685] uppercase">Target Margin</span>
                  <span className="text-emerald-700">{targetMarginPct.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <input
                    type="range"
                    min="15"
                    max="45"
                    step="0.5"
                    value={targetMarginPct}
                    onChange={(e) => setTargetMarginPct(Number(e.target.value))}
                    className="w-28 h-1.5 bg-[#DFE1E6] rounded-lg appearance-none cursor-pointer accent-[#0052CC]"
                  />
                  <span className="font-mono text-[11px] text-emerald-700 font-bold">
                    +${grossProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Proposal & Actions */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#737685] block">Total Client Proposal</span>
                <span className="text-[20px] font-mono font-bold text-[#0052CC]">
                  ${totalProposal.toLocaleString()}.00
                </span>
              </div>
              <button className="bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-semibold px-4 py-2 rounded flex items-center gap-1.5 shadow-sm transition-all">
                <Send className="w-3.5 h-3.5" />
                <span>Generate Client Proposal</span>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
