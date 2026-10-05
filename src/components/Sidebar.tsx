import React from 'react';
import {
  Layers,
  LayoutDashboard,
  FolderOpen,
  Calculator,
  Palette,
  Boxes,
  Truck,
  Network,
  Database,
  Code2,
  FileCode,
  Terminal,
  Settings,
  HelpCircle,
  MoreVertical,
  AlertTriangle,
  PlusCircle,
  Droplets,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenNewModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onOpenNewModal,
}) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col h-screen w-60 shrink-0 justify-between bg-[#1D3052] border-r border-[#C3C6D6]/20 select-none text-[#C3C6D6]">
      {/* Top Section: Brand & Nav Links */}
      <div className="flex flex-col">
        {/* Brand Anchor Header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0052CC] flex items-center justify-center text-white shadow-sm font-bold">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-white leading-tight tracking-tight">FloorOps Pro</span>
              <span className="text-[11px] text-[#A0B0CB] font-normal">Enterprise Logistics</span>
            </div>
          </div>
        </div>

        {/* Quick Action CTA inside Sidebar */}
        <div className="p-3">
          <button
            onClick={onOpenNewModal}
            className="w-full bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white font-medium text-[12px] py-2 px-3 rounded flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Estimate / Project</span>
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="px-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-270px)]">
          <div className="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#7388A9]">
            Architecture &amp; Schema
          </div>

          <button
            onClick={() => onViewChange('erd')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'erd'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Network className="w-4 h-4 text-[#709BFE]" />
              <span>ERD Architecture</span>
            </div>
            <span className="text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded font-mono">14 Tables</span>
          </button>

          <button
            onClick={() => onViewChange('sql')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'sql'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>MySQL 8.0 DDL</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono">.SQL</span>
          </button>

          <button
            onClick={() => onViewChange('nestjs')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'nestjs'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Code2 className="w-4 h-4 text-red-400" />
              <span>NestJS TypeORM</span>
            </div>
            <span className="text-[10px] text-red-300 font-mono">NestJS</span>
          </button>

          <button
            onClick={() => onViewChange('angular')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'angular'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>Angular Models/API</span>
            </div>
            <span className="text-[10px] text-purple-300 font-mono">TS</span>
          </button>

          <div className="px-2 pt-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#7388A9]">
            Live Operating Systems
          </div>

          <button
            onClick={() => onViewChange('kanban')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'kanban'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderOpen className="w-4 h-4 text-[#709BFE]" />
              <span>Projects Active</span>
            </div>
            <span className="bg-[#0052CC] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">28</span>
          </button>

          <button
            onClick={() => onViewChange('estimator')}
            className={`w-full text-left px-3 py-2 flex items-center gap-2.5 rounded text-[12px] font-medium transition-colors ${
              currentView === 'estimator'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Estimator &amp; Formulas</span>
          </button>

          <button
            onClick={() => onViewChange('catalog')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'catalog'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4 text-pink-400" />
              <span>Finishes Catalog</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>

          <button
            onClick={() => onViewChange('deliveries')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'deliveries'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Supplier Deliveries</span>
            </div>
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">4</span>
          </button>

          <button
            onClick={() => onViewChange('telemetry')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'telemetry'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Moisture Telemetry</span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold">14.8% MC</span>
          </button>

          <button
            onClick={() => onViewChange('api')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-[12px] font-medium transition-colors ${
              currentView === 'api'
                ? 'bg-[#0052CC]/30 text-white font-semibold border-l-2 border-[#0052CC]'
                : 'text-[#A0B0CB] hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>REST API Console</span>
            </div>
            <span className="text-[10px] text-emerald-400">Live</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section: User Profile & Status */}
      <div className="p-3 border-t border-white/10 bg-[#172642]">
        <div className="flex items-center justify-between p-2 rounded bg-white/5 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-bold flex items-center justify-center text-[11px] shrink-0">
              MV
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold truncate leading-tight">Marcus Vance</span>
              <span className="text-[10px] text-[#A0B0CB] truncate">Chief Operations Lead</span>
            </div>
          </div>
          <button className="text-[#A0B0CB] hover:text-white p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
