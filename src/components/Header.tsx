import React from 'react';
import {
  Layers,
  Search,
  Bell,
  SlidersHorizontal,
  FolderOpen,
  Plus,
  Network,
  Database,
  Code2,
  Terminal,
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenNewModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenNewModal,
}) => {
  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'erd':
        return 'Relational Architecture & ERD Diagram';
      case 'kanban':
        return 'Q4 Commercial & Residential Pipeline';
      case 'estimator':
        return 'Oakland Tech Hub (FLR-122) / Dynamic Estimator';
      case 'catalog':
        return 'Finishes & Materials Catalog';
      case 'deliveries':
        return 'Inbound Freight & Supplier Logistics';
      case 'telemetry':
        return 'FLR-104 Smith Residence / Subfloor Moisture Telemetry';
      case 'sql':
        return 'MySQL 8.0+ Normalized Schema DDL';
      case 'nestjs':
        return 'NestJS TypeORM Production Entities';
      case 'angular':
        return 'Angular Client Models & Services';
      case 'api':
        return 'Interactive REST API Console';
      default:
        return 'Active Board';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 w-full h-14 bg-white border-b border-[#DFE1E6] shrink-0">
      {/* Left: Breadcrumbs & Context */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center text-[13px] text-[#5E6C84] gap-1.5 truncate">
          <span className="font-medium text-[#5E6C84]">FloorOps Pro</span>
          <span className="text-[#C3C6D6]">/</span>
          <span className="font-semibold text-[#172B4D] truncate">{getBreadcrumbTitle()}</span>
        </div>
        <span className="bg-[#E8EDFF] text-[#0052CC] font-mono text-[11px] font-semibold px-2 py-0.5 rounded border border-[#C4D2FF]">
          FLOOR-2024
        </span>
      </div>

      {/* Center: Search Field */}
      <div className="relative w-72 max-w-sm hidden md:block">
        <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737685]" />
        <input
          type="text"
          placeholder="Search tables, SKUs, tickets, carriers..."
          className="w-full h-8 pl-8 pr-12 text-[12px] bg-[#F1F3FF] border border-[#DFE1E6] rounded focus:border-[#0052CC] focus:bg-white outline-none transition-all placeholder:text-[#737685]"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8EDFF] border border-[#DFE1E6] text-[10px] text-[#5E6C84] px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right: View Toggles & Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Nav Shortcut Pill */}
        <div className="hidden lg:flex items-center bg-[#F1F3FF] p-0.5 rounded border border-[#DFE1E6] text-[12px]">
          <button
            onClick={() => onViewChange('erd')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
              currentView === 'erd' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>ERD Graph</span>
          </button>
          <button
            onClick={() => onViewChange('kanban')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
              currentView === 'kanban' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => onViewChange('sql')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
              currentView === 'sql' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MySQL SQL</span>
          </button>
          <button
            onClick={() => onViewChange('nestjs')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
              currentView === 'nestjs' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>TypeORM</span>
          </button>
          <button
            onClick={() => onViewChange('api')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
              currentView === 'api' ? 'bg-white text-[#0052CC] shadow-xs' : 'text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>API</span>
          </button>
        </div>

        <div className="h-5 w-px bg-[#DFE1E6] hidden sm:block"></div>

        {/* New Estimate / Project CTA */}
        <button
          onClick={onOpenNewModal}
          className="bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white px-3.5 h-8 rounded text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Estimate / Project</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#0052CC] text-white flex items-center justify-center font-bold text-[12px] ring-2 ring-[#E8EDFF]">
            MV
          </div>
        </div>
      </div>
    </header>
  );
};
