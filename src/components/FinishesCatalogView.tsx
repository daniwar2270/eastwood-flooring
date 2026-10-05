import React, { useState } from 'react';
import { MOCK_CATALOG, CatalogMaterial } from '../data/mock-records';
import {
  Palette,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Truck,
  ArrowUpDown,
  Download,
  Plus,
  RefreshCw,
  Box,
  Layers,
  AlertOctagon,
  Clock,
} from 'lucide-react';

export const FinishesCatalogView: React.FC = () => {
  const [materials, setMaterials] = useState<CatalogMaterial[]>(MOCK_CATALOG);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('ALL');
  const [selectedStockLevel, setSelectedStockLevel] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const handleReorder = (id: string) => {
    setReorderedId(id);
    setTimeout(() => {
      setMaterials((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'IN_STOCK', stockQty: item.stockQty + 20, warehouseCapacityPct: 75, alertNote: undefined }
            : item
        )
      );
      setReorderedId(null);
    }, 1200);
  };

  const filteredMaterials = materials.filter((m) => {
    if (selectedSupplier !== 'ALL' && !m.supplier.includes(selectedSupplier)) return false;
    if (selectedStockLevel === 'FLAGGED' && m.status === 'IN_STOCK') return false;
    if (
      searchTerm &&
      !m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !m.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Subheader & Metrics Banner */}
      <div className="bg-white px-6 py-4 border-b border-[#DFE1E6] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[20px] font-bold text-[#172B4D] tracking-tight">Finishes &amp; Materials Catalog</h2>
            <p className="text-[12px] text-[#5E6C84] mt-0.5">
              Central repository for flooring specifications, commercial coatings, stock reserves, and supplier order pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-[#EBECF0] hover:bg-[#DFE1E6] text-[#172B4D] text-[12px] font-medium rounded flex items-center gap-1.5 transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-semibold rounded flex items-center gap-1.5 shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Finish / Material</span>
            </button>
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-4 gap-3 pt-2 border-t border-[#EBECF0]">
          <div className="bg-[#FAFBFC] p-2.5 rounded border border-[#DFE1E6] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E8EDFF] flex items-center justify-center text-[#0052CC]">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#737685] uppercase tracking-wider block font-bold">Total Catalog Items</span>
              <span className="text-[15px] font-bold text-[#172B4D]">148 Items</span>
            </div>
          </div>

          <div className="bg-[#FAFBFC] p-2.5 rounded border border-[#DFE1E6] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#FFF0B3] flex items-center justify-center text-[#172B4D]">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] text-[#737685] uppercase tracking-wider block font-bold">Low Stock Alert</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-[#172B4D]">7 Items</span>
                <span className="bg-[#FFF0B3] text-[#172B4D] text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">Attention</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFBFC] p-2.5 rounded border border-[#DFE1E6] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#FFDAD6] flex items-center justify-center text-red-600">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#737685] uppercase tracking-wider block font-bold">Out of Stock</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-red-600">3 Items</span>
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">Critical</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFBFC] p-2.5 rounded border border-[#DFE1E6] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E3FCEF] flex items-center justify-center text-[#006644]">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] text-[#737685] uppercase tracking-wider block font-bold">Total Valuation</span>
              <span className="text-[15px] font-bold text-[#172B4D] font-mono">$184,250</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Toolbar */}
      <div className="bg-white px-6 py-2.5 border-b border-[#DFE1E6] flex items-center justify-between shrink-0 text-[12px]">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-52">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737685]" />
            <input
              type="text"
              placeholder="Filter SKU or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 pl-8 pr-2 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[11px] outline-none"
            />
          </div>

          {/* Supplier dropdown */}
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#172B4D] text-[12px] outline-none cursor-pointer"
          >
            <option value="ALL">Supplier: All Suppliers (Mohawk, Shaw, Bona...)</option>
            <option value="Mohawk">Mohawk Commercial</option>
            <option value="Shaw">Shaw Floors Commercial</option>
            <option value="Bona">Bona Commercial US</option>
            <option value="EcoFlor">EcoFlor Innovations</option>
            <option value="Loba-Wakol">Loba-Wakol Spec</option>
          </select>

          {/* Stock Level Filter */}
          <select
            value={selectedStockLevel}
            onChange={(e) => setSelectedStockLevel(e.target.value)}
            className="h-8 px-2.5 bg-[#F4F5F7] border border-[#0052CC] text-[#0052CC] font-semibold rounded text-[12px] outline-none cursor-pointer"
          >
            <option value="ALL">Stock Level: All Inventory Levels</option>
            <option value="FLAGGED">Stock Level: Flagged &amp; Low Stock</option>
          </select>

          {(selectedSupplier !== 'ALL' || selectedStockLevel !== 'ALL' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedSupplier('ALL');
                setSelectedStockLevel('ALL');
                setSearchTerm('');
              }}
              className="text-[#5E6C84] hover:text-[#172B4D] underline ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-[#5E6C84]">
          <span className="text-[11px]">Showing {filteredMaterials.length} of 148 materials</span>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-12">
          {filteredMaterials.map((item) => {
            const isLow = item.status === 'LOW_STOCK';
            const isOut = item.status === 'OUT_OF_STOCK';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-lg border flex flex-col shadow-xs hover:shadow-md transition-shadow relative overflow-hidden ${
                  isLow ? 'border-2 border-amber-300' : isOut ? 'border-2 border-red-300' : 'border-[#DFE1E6]'
                }`}
              >
                {/* Top SKU Badge Strip */}
                <div className="p-3 bg-[#FAFBFC] border-b border-[#EBECF0] flex items-center justify-between">
                  <span className="bg-[#EBECF0] text-[#172B4D] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#DFE1E6]">
                    {item.sku}
                  </span>

                  {isOut ? (
                    <span className="bg-red-100 text-red-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertOctagon className="w-3 h-3 text-red-600" />
                      Out of Stock (0)
                    </span>
                  ) : isLow ? (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      Low Stock ({item.stockQty} {item.unitOfMeasure} left)
                    </span>
                  ) : (
                    <span className="bg-[#E3FCEF] text-[#006644] text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      In Stock ({item.stockQty.toLocaleString()} {item.unitOfMeasure})
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-[12px]">
                  <div>
                    <div className="flex items-center justify-between text-[#737685] text-[11px] mb-1">
                      <span>{item.category}</span>
                      <span className="font-semibold text-[#172B4D]">{item.supplier}</span>
                    </div>

                    <h3 className="text-[14px] font-bold text-[#172B4D] line-clamp-1">{item.name}</h3>

                    <div className="flex items-baseline gap-2 mt-2 font-mono">
                      <span className="text-[18px] font-bold text-[#172B4D]">${item.unitPrice.toFixed(2)}</span>
                      <span className="text-[12px] text-[#5E6C84]">/ {item.unitOfMeasure}</span>
                      <span className="text-[11px] text-[#737685]">({item.packageSpec})</span>
                    </div>
                  </div>

                  {/* Warning banner if threshold deficit */}
                  {item.alertNote && (
                    <div className="p-2 bg-amber-50 border-l-4 border-amber-500 rounded-r text-[11px] text-amber-950">
                      <span className="font-bold block mb-0.5">Threshold Deficit</span>
                      <span>{item.alertNote}</span>
                    </div>
                  )}

                  {/* Capacity Bar & Lead Time */}
                  <div className="space-y-1.5 pt-2 border-t border-[#EBECF0]">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#737685]">Warehouse Capacity:</span>
                      <span className={`font-semibold ${isOut ? 'text-red-600' : isLow ? 'text-amber-800' : 'text-emerald-700'}`}>
                        {item.warehouseCapacityPct}% {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="w-full bg-[#EBECF0] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isOut ? 'bg-red-600' : isLow ? 'bg-amber-500' : 'bg-emerald-600'}`}
                        style={{ width: `${item.warehouseCapacityPct}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#5E6C84] pt-1">
                      <Truck className="w-3.5 h-3.5 text-[#737685]" />
                      <span>Lead Time: <strong>{item.leadTime}</strong></span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2 border-t border-[#EBECF0] flex items-center justify-between gap-2">
                    <button className="h-8 px-3 bg-[#F1F3FF] hover:bg-[#E0E8FF] text-[#172B4D] rounded flex-1 font-semibold transition-colors">
                      Edit Specs
                    </button>
                    <button
                      onClick={() => handleReorder(item.id)}
                      disabled={reorderedId === item.id}
                      className={`h-8 px-3 rounded flex-1 font-semibold transition-colors flex items-center justify-center gap-1 ${
                        isLow || isOut
                          ? 'bg-[#0052CC] text-white hover:bg-[#0747A6]'
                          : 'bg-[#E8EDFF] text-[#0052CC] hover:bg-[#0052CC] hover:text-white'
                      }`}
                    >
                      {reorderedId === item.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>Reorder Supplier</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
