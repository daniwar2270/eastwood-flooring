import React, { useState } from 'react';
import { MOCK_PROJECTS, ProjectRecord } from '../data/mock-records';
import {
  AlertTriangle,
  FolderOpen,
  Search,
  Filter,
  Users,
  Box,
  Truck,
  DollarSign,
  ArrowRight,
  ExternalLink,
  X,
  Calculator,
  CheckCircle2,
  Clock,
  RefreshCw,
} from 'lucide-react';

interface KanbanBoardViewProps {
  onNavigateToEstimator?: () => void;
  onNavigateToTelemetry?: () => void;
  onNavigateToDeliveries?: () => void;
}

export const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({
  onNavigateToEstimator,
  onNavigateToTelemetry,
  onNavigateToDeliveries,
}) => {
  const [selectedJob, setSelectedJob] = useState<ProjectRecord>(MOCK_PROJECTS[0]); // FLR-104
  const [filterBlockerOnly, setFilterBlockerOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  const stages = [
    { id: 'ESTIMATING', label: 'Estimating', count: 5, total: '$78,200' },
    { id: 'MATERIALS_ORDERED', label: 'Materials Ordered', count: 6, total: '$114,300' },
    { id: 'SUBFLOOR_PREP', label: 'Subfloor Prep', count: 4, total: '$92,600' },
    { id: 'INSTALLATION', label: 'Installation', count: 7, total: '$126,800' },
    { id: 'FINISHING_CURING', label: 'Finishing & Curing', count: 3, total: '$41,200' },
    { id: 'COMPLETED', label: 'Completed', count: 3, total: '$29,400' },
  ];

  const filteredJobs = MOCK_PROJECTS.filter((job) => {
    if (filterBlockerOnly && !job.blocker) return false;
    if (
      searchTerm &&
      !job.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Subheader & Filter Toolbar (Row 1 & Row 2) */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-2.5 flex flex-col gap-2 shrink-0">
        {/* Row 1: Interactive Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="relative w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737685]" />
              <input
                type="text"
                placeholder="Filter tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-7 pl-7 pr-2 text-[12px] bg-[#F1F3FF] border border-[#DFE1E6] rounded focus:border-[#0052CC] focus:bg-white outline-none"
              />
            </div>

            {/* Blocker Filter Pill */}
            <button
              onClick={() => setFilterBlockerOnly(!filterBlockerOnly)}
              className={`h-7 px-2.5 rounded text-[12px] font-semibold flex items-center gap-1.5 transition-colors border ${
                filterBlockerOnly
                  ? 'bg-red-600 text-white border-red-700'
                  : 'bg-[#FFDAD6] text-[#93000A] border-red-200 hover:bg-[#FFDAD6]/80'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Blocker Status: Flagged Only</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${filterBlockerOnly ? 'bg-white text-red-700' : 'bg-red-600 text-white'}`}>
                4
              </span>
            </button>

            {/* Crew Selector */}
            <div className="h-7 px-2.5 rounded bg-[#F1F3FF] border border-[#DFE1E6] text-[12px] text-[#5E6C84] flex items-center gap-1.5">
              <span>Crew:</span>
              <span className="font-semibold text-[#172B4D]">All Crews (5)</span>
            </div>

            {/* Supplier Filter */}
            <div className="h-7 px-2.5 rounded bg-[#F1F3FF] border border-[#DFE1E6] text-[12px] text-[#5E6C84] flex items-center gap-1.5">
              <span>Supplier:</span>
              <span className="font-semibold text-[#172B4D]">Mohawk, Shaw, Bona</span>
            </div>

            {(filterBlockerOnly || searchTerm) && (
              <button
                onClick={() => {
                  setFilterBlockerOnly(false);
                  setSearchTerm('');
                }}
                className="text-[11px] text-[#5E6C84] hover:text-[#172B4D] underline ml-1"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Right Group By Switcher */}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#737685]">Group by:</span>
            <div className="flex items-center bg-[#F1F3FF] rounded border border-[#DFE1E6] p-0.5">
              <button className="bg-white text-[#0052CC] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                Status
              </button>
              <button className="text-[#5E6C84] text-[11px] px-2 py-0.5 rounded hover:text-[#172B4D]">
                Crew
              </button>
              <button className="text-[#5E6C84] text-[11px] px-2 py-0.5 rounded hover:text-[#172B4D]">
                Supplier
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Live Operational Metadata Bar */}
        <div className="flex items-center justify-between text-[12px] pt-1.5 border-t border-[#EBECF0] text-[#5E6C84]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
              <strong className="text-[#172B4D]">6</strong> Active Stages
            </span>
            <span className="text-[#DFE1E6]">•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#172B4D]">28</strong> Total Jobs
            </span>
            <span className="text-[#DFE1E6]">•</span>
            <span className="flex items-center gap-1.5 text-red-600 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <strong>4</strong> Blocked on Materials
            </span>
            <span className="text-[#DFE1E6]">•</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <DollarSign className="w-3.5 h-3.5" />
              $482,500 In-Flight Value
            </span>
          </div>

          <div className="text-[11px] text-[#737685] flex items-center gap-2">
            <span>Last sync: 2 mins ago</span>
            <RefreshCw className="w-3 h-3 text-[#0052CC] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Workspace: 6-Column Kanban + Slide-Out Inspector Drawer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Horizontal Kanban Scroll Area */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 bg-[#F4F5F7] flex gap-3">
          {stages.map((stage) => {
            const columnJobs = filteredJobs.filter((job) => job.stage === stage.id);
            return (
              <section
                key={stage.id}
                className="w-80 shrink-0 flex flex-col bg-[#EBEDF0]/70 rounded-lg border border-[#DFE1E6] h-full max-h-full"
              >
                {/* Column Header */}
                <div className="p-2.5 border-b border-[#DFE1E6] flex items-center justify-between bg-white/70 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[#172B4D] uppercase tracking-wider">
                      {stage.label}
                    </span>
                    <span className="bg-[#DFE1E6] text-[#172B4D] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                      {stage.count}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#5E6C84]">{stage.total}</span>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2.5">
                  {columnJobs.map((job) => {
                    const isSelected = selectedJob?.id === job.id && isDrawerOpen;
                    return (
                      <article
                        key={job.id}
                        onClick={() => {
                          setSelectedJob(job);
                          setIsDrawerOpen(true);
                        }}
                        className={`bg-white rounded-lg p-3 cursor-pointer transition-all shadow-xs hover:shadow-md relative ${
                          isSelected
                            ? 'border-2 border-[#0052CC] ring-2 ring-[#0052CC]/15'
                            : 'border border-[#DFE1E6] hover:border-[#0052CC]'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2.5 -right-1 bg-[#0052CC] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                            SELECTED
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[12px] font-bold text-[#0052CC] hover:underline">
                            {job.code}
                          </span>
                          {job.priority === 'HIGH' || job.priority === 'URGENT' ? (
                            <span className="text-red-600 flex items-center gap-0.5 text-[10px] font-bold uppercase">
                              <AlertTriangle className="w-3 h-3" />
                              {job.priority}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#737685] uppercase font-mono">NORMAL</span>
                          )}
                        </div>

                        <h4 className="text-[13px] font-bold text-[#172B4D] mb-0.5 leading-snug line-clamp-1">
                          {job.name}
                        </h4>
                        <p className="text-[11px] text-[#5E6C84] mb-2 line-clamp-1">{job.materialsSummary}</p>

                        {/* Blocker alert if present */}
                        {job.blocker && (
                          <div className="bg-[#FFDAD6]/60 border border-red-300 text-red-900 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 mb-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="truncate">⚠️ Blocked: Moisture {job.blocker.reading}%</span>
                          </div>
                        )}

                        {/* Readiness Progress Bar */}
                        <div className="mb-2">
                          <div className="flex justify-between text-[10px] mb-1 text-[#5E6C84]">
                            <span>Materials Readiness:</span>
                            <span className="font-semibold text-[#172B4D]">{job.materialsReceivedPct}%</span>
                          </div>
                          <div className="w-full bg-[#EBECF0] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                job.materialsReceivedPct === 100
                                  ? 'bg-emerald-600'
                                  : job.materialsReceivedPct > 50
                                  ? 'bg-[#0052CC]'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${job.materialsReceivedPct}%` }}
                            />
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-1.5 border-t border-[#EBECF0] text-[11px] text-[#5E6C84]">
                          <span className="truncate">{job.leadInstaller}</span>
                          <span className="font-mono font-bold text-[#172B4D]">${job.contractTotal.toLocaleString()}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>

        {/* Slide-Out Inspector Drawer (Matches Screenshot FLR-104 Inspector) */}
        {isDrawerOpen && selectedJob && (
          <aside className="w-96 shrink-0 bg-white border-l border-[#DFE1E6] flex flex-col h-full shadow-lg z-20">
            {/* Drawer Header */}
            <div className="p-3.5 border-b border-[#DFE1E6] flex items-center justify-between bg-[#FAFBFC]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-[#0052CC] font-bold">{selectedJob.code}</span>
                <span className="bg-[#E8EDFF] text-[#0052CC] text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  {selectedJob.stage.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 hover:bg-[#EBECF0] rounded text-[#5E6C84] hover:text-[#172B4D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Detail Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#172B4D] leading-tight">{selectedJob.name}</h3>
                <p className="text-[12px] text-[#5E6C84] mt-1">{selectedJob.address}</p>
              </div>

              {/* Critical Blocker Lozenge Banner */}
              {selectedJob.blocker && (
                <div className="bg-[#FFDAD6]/50 border-l-4 border-red-600 p-3 rounded-r text-red-950">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-[12px]">
                      <span className="font-bold block text-red-900">{selectedJob.blocker.title}</span>
                      <p className="mt-0.5 leading-snug">{selectedJob.blocker.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Estimating & Formula Engine Bento Module */}
              <div className="border border-[#DFE1E6] rounded-lg p-3 bg-[#F9F9FF] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#EBECF0]">
                  <span className="text-[12px] font-bold text-[#172B4D] flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-[#0052CC]" />
                    <span>Estimating &amp; Formula Engine</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-[#E3FCEF] px-1.5 py-0.5 rounded">
                    {selectedJob.formulaVersion}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[12px] pt-1">
                  <div>
                    <span className="text-[11px] text-[#737685] block">Net Area Takeoff:</span>
                    <span className="font-bold text-[#172B4D] font-mono">{selectedJob.areaSqft.toLocaleString()} sq ft</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#737685] block">Waste Factor (+10%):</span>
                    <span className="font-bold text-[#172B4D] font-mono">{Math.round(selectedJob.areaSqft * 1.1).toLocaleString()} sq ft billed</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#737685] block">Calculated Material:</span>
                    <span className="font-bold text-[#172B4D] font-mono">${Math.round(selectedJob.contractTotal * 0.68).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#737685] block">Labor &amp; Prep:</span>
                    <span className="font-bold text-[#172B4D] font-mono">${Math.round(selectedJob.contractTotal * 0.32).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[#EBECF0] flex items-center justify-between bg-white p-2 rounded">
                  <span className="text-[12px] font-bold text-[#172B4D]">Total Contract Estimate</span>
                  <span className="text-[16px] font-mono text-[#0052CC] font-bold">
                    ${selectedJob.contractTotal.toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Material Manifest & Logistics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-[#172B4D] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#0052CC]" />
                    <span>Material Manifest &amp; Deliveries</span>
                  </span>
                  <span className="text-[11px] text-[#737685]">3 items tracked</span>
                </div>

                <div className="space-y-1.5 text-[12px]">
                  <div className="p-2 border border-[#DFE1E6] rounded bg-white flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#172B4D] block text-[12px]">5-in Select White Oak Planks</span>
                      <span className="text-[11px] text-[#737685]">Supplier: Mohawk Floors • 1,600 sq ft</span>
                    </div>
                    <span className="bg-[#E3FCEF] text-[#006644] text-[10px] font-bold px-2 py-0.5 rounded">
                      ARRIVED (BAY 3)
                    </span>
                  </div>

                  <div className="p-2 border border-red-300 rounded bg-[#FFDAD6]/30 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-red-900 block text-[12px]">AcoustiGuard Vapor Moisture Barrier</span>
                      <span className="text-[11px] text-red-700">Loba-Wakol • Freight TRK-88219</span>
                    </div>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      DELAYED (ETA OCT 18)
                    </span>
                  </div>

                  <div className="p-2 border border-[#DFE1E6] rounded bg-white flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#172B4D] block text-[12px]">Bona Traffic HD Extra Matte</span>
                      <span className="text-[11px] text-[#737685]">Supplier: Bona • 8 Gallons Commercial</span>
                    </div>
                    <span className="bg-[#E8EDFF] text-[#0052CC] text-[10px] font-bold px-2 py-0.5 rounded">
                      IN STOCK (WAREHOUSE A)
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Personnel */}
              <div className="border-t border-[#EBECF0] pt-3 space-y-2 text-[12px]">
                <span className="font-bold text-[#172B4D] block">Project Crew &amp; Estimator</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1D3052] text-white font-bold flex items-center justify-center text-[10px]">
                      MG
                    </div>
                    <div>
                      <span className="font-semibold text-[#172B4D] block text-[12px]">{selectedJob.leadInstaller}</span>
                      <span className="text-[10px] text-[#737685]">Lead Subfloor Installer</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-[#E3FCEF] px-1.5 py-0.2 rounded">On-Site</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-[#DFE1E6] bg-white space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onNavigateToEstimator}
                  className="py-1.5 px-2 bg-[#F1F3FF] hover:bg-[#E0E8FF] text-[#172B4D] text-[12px] font-semibold rounded border border-[#DFE1E6] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Full Estimator</span>
                </button>
                <button
                  onClick={onNavigateToDeliveries}
                  className="py-1.5 px-2 bg-[#F1F3FF] hover:bg-[#E0E8FF] text-[#172B4D] text-[12px] font-semibold rounded border border-[#DFE1E6] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Update Tracking</span>
                </button>
              </div>

              <button
                onClick={onNavigateToTelemetry}
                className="w-full bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-bold py-2 px-3 rounded flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>View Moisture Blocker (14.8% MC)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
