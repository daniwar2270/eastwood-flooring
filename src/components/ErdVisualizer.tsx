import React, { useState } from 'react';
import {
  SCHEMA_TABLES,
  SchemaTableDef,
} from '../data/mock-db';
import {
  Database,
  Key,
  Link2,
  FolderOpen,
  Calculator,
  Palette,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

export const ErdVisualizer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTable, setActiveTable] = useState<SchemaTableDef>(SCHEMA_TABLES[1]); // projects table
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'ALL', label: 'All 14 Tables', icon: Database, count: 14 },
    { id: 'PROJECTS_KANBAN', label: 'Projects & Kanban', icon: FolderOpen, count: 3 },
    { id: 'ESTIMATOR', label: 'Dynamic Estimator', icon: Calculator, count: 3 },
    { id: 'CATALOG_INVENTORY', label: 'Catalog & Inventory', icon: Palette, count: 3 },
    { id: 'LOGISTICS_TELEMETRY', label: 'Logistics & Telemetry', icon: Truck, count: 5 },
  ];

  const filteredTables =
    selectedCategory === 'ALL'
      ? SCHEMA_TABLES
      : SCHEMA_TABLES.filter((t) => t.category === selectedCategory);

  const handleCopyTableName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Category Subheader */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-[18px] font-bold text-[#172B4D] tracking-tight">
            Relational Architecture &amp; ERD Diagram
          </h2>
          <p className="text-[12px] text-[#5E6C84] mt-0.5">
            Normalized MySQL 8.0 schema for FloorOps Pro with strict foreign keys between Projects, Materials, and Purchase Orders.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#F1F3FF] p-1 rounded-lg border border-[#DFE1E6]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-[12px] font-medium flex items-center gap-1.5 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0052CC] shadow-xs font-semibold'
                    : 'text-[#5E6C84] hover:text-[#172B4D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className="text-[10px] bg-[#E8EDFF] text-[#0052CC] px-1.5 py-0.2 rounded-full font-mono">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Pane Interactive Explorer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Visual ERD Table Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTables.map((table) => {
              const isSelected = activeTable.name === table.name;
              const fkCount = table.columns.filter((c) => c.foreignKey).length;
              return (
                <div
                  key={table.name}
                  onClick={() => setActiveTable(table)}
                  className={`bg-white rounded-lg border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'border-2 border-[#0052CC] ring-2 ring-[#0052CC]/10'
                      : 'border-[#DFE1E6] hover:border-[#0052CC]/60'
                  }`}
                >
                  {/* Table Header */}
                  <div
                    className={`px-3.5 py-2.5 border-b flex items-center justify-between ${
                      isSelected ? 'bg-[#E8EDFF] border-[#C4D2FF]' : 'bg-[#FAFBFC] border-[#EBECF0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Database className={`w-4 h-4 ${isSelected ? 'text-[#0052CC]' : 'text-[#5E6C84]'}`} />
                      <span className="font-mono text-[13px] font-bold text-[#172B4D]">{table.name}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-white border border-[#DFE1E6] px-1.5 py-0.5 rounded text-[#5E6C84]">
                      {table.columns.length} cols
                    </span>
                  </div>

                  {/* Quick description & column glance */}
                  <div className="p-3 text-[12px]">
                    <p className="text-[#5E6C84] line-clamp-1 mb-2 text-[11px]">{table.description}</p>
                    <div className="space-y-1">
                      {table.columns.slice(0, 4).map((col) => (
                        <div key={col.name} className="flex items-center justify-between text-[11px] font-mono">
                          <span className="flex items-center gap-1.5 text-[#172B4D]">
                            {col.isPrimary ? (
                              <Key className="w-3 h-3 text-amber-500" />
                            ) : col.foreignKey ? (
                              <Link2 className="w-3 h-3 text-[#0052CC]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DFE1E6]" />
                            )}
                            <span className={col.isPrimary ? 'font-bold' : ''}>{col.name}</span>
                          </span>
                          <span className="text-[#737685] text-[10px] truncate max-w-[120px]">{col.type}</span>
                        </div>
                      ))}
                      {table.columns.length > 4 && (
                        <div className="text-[10px] text-[#0052CC] font-medium pt-1">
                          + {table.columns.length - 4} more fields...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer badges */}
                  <div className="px-3 py-1.5 bg-[#F9F9FF] border-t border-[#EBECF0] flex items-center justify-between text-[10px] text-[#5E6C84]">
                    <span className="uppercase font-semibold tracking-wider text-[9px]">
                      {table.category.replace('_', ' ')}
                    </span>
                    {fkCount > 0 && (
                      <span className="flex items-center gap-1 text-[#0052CC] font-semibold">
                        <Link2 className="w-3 h-3" />
                        <span>{fkCount} Foreign Key{fkCount > 1 ? 's' : ''}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Relationship Connection Summary Banner */}
          <div className="bg-white rounded-lg border border-[#DFE1E6] p-4 mt-6">
            <h3 className="text-[13px] font-bold text-[#172B4D] mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#0052CC]" />
              <span>Core Foreign Key Dependencies in FloorOps Pro</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
              <div className="p-2.5 rounded bg-[#F9F9FF] border border-[#EBECF0]">
                <div className="font-semibold text-[#0052CC] mb-1">Projects ⇄ Purchase Orders</div>
                <p className="text-[11px] text-[#5E6C84]">
                  `purchase_orders.project_id` references `projects.id`. Multi-vendor freights (Mohawk, Bona) directly update project material readiness % and flag blockers.
                </p>
              </div>
              <div className="p-2.5 rounded bg-[#F9F9FF] border border-[#EBECF0]">
                <div className="font-semibold text-[#0052CC] mb-1">Materials ⇄ Estimator Line Items</div>
                <p className="text-[11px] text-[#5E6C84]">
                  `estimate_line_items.material_id` links to `materials.id` for automated unit rates, waste modifier formulas (+10%), and supplier lead times.
                </p>
              </div>
              <div className="p-2.5 rounded bg-[#F9F9FF] border border-[#EBECF0]">
                <div className="font-semibold text-[#0052CC] mb-1">Projects ⇄ Moisture Telemetry</div>
                <p className="text-[11px] text-[#5E6C84]">
                  `telemetry_inspection_sessions.project_id` enforces ASTM F2170 compliance. Readings &gt; 12.0% automatically populate `project_blockers`.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Table Detail Inspector (380px) */}
        <aside className="w-96 shrink-0 bg-white border-l border-[#DFE1E6] flex flex-col h-full shadow-sm">
          {/* Header */}
          <div className="p-4 border-b border-[#DFE1E6] bg-[#FAFBFC] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[14px] font-bold text-[#0052CC]">{activeTable.name}</span>
                <span className="text-[10px] bg-[#E8EDFF] text-[#0052CC] px-2 py-0.5 rounded font-mono font-semibold">
                  TABLE
                </span>
              </div>
              <p className="text-[11px] text-[#5E6C84] mt-0.5">{activeTable.description}</p>
            </div>
            <button
              onClick={() => handleCopyTableName(activeTable.name)}
              className="p-1.5 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded transition-colors"
              title="Copy Table Name"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Column Breakdown */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#737685]">
              Columns &amp; Data Types ({activeTable.columns.length})
            </div>

            <div className="space-y-2">
              {activeTable.columns.map((col) => (
                <div
                  key={col.name}
                  className="p-2.5 rounded border border-[#DFE1E6] bg-[#FAFBFC] hover:bg-white transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-[#172B4D]">
                      {col.isPrimary && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] px-1 rounded flex items-center gap-0.5">
                          <Key className="w-2.5 h-2.5" /> PK
                        </span>
                      )}
                      {col.foreignKey && (
                        <span className="bg-[#DEEBFF] text-[#0052CC] text-[9px] px-1 rounded flex items-center gap-0.5">
                          <Link2 className="w-2.5 h-2.5" /> FK
                        </span>
                      )}
                      <span>{col.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#5E6C84] bg-white border border-[#DFE1E6] px-1.5 py-0.2 rounded">
                      {col.type}
                    </span>
                  </div>

                  {col.foreignKey && (
                    <div className="mt-1.5 text-[11px] text-[#0052CC] flex items-center gap-1 font-mono">
                      <ArrowRight className="w-3 h-3" />
                      <span>
                        References `{col.foreignKey.table}.{col.foreignKey.column}`
                      </span>
                    </div>
                  )}

                  {col.comment && (
                    <div className="mt-1 text-[11px] text-[#5E6C84] italic">
                      Note: {col.comment}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
