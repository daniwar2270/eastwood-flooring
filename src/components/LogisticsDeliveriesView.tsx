import React, { useState } from 'react';
import { MOCK_FREIGHT, InboundFreightRecord } from '../data/mock-records';
import {
  Truck,
  AlertTriangle,
  Clock,
  CheckCircle,
  Warehouse,
  Search,
  FileText,
  MapPin,
  Barcode,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface LogisticsDeliveriesViewProps {
  onInspectBlocker?: () => void;
}

export const LogisticsDeliveriesView: React.FC<LogisticsDeliveriesViewProps> = ({
  onInspectBlocker,
}) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'DELAYED' | 'IN_TRANSIT' | 'DOCKED'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredShipments = MOCK_FREIGHT.filter((s) => {
    if (filterTab !== 'ALL' && s.status !== filterTab) return false;
    if (
      searchTerm &&
      !s.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !s.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !s.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Top Header & Metrics Banner */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-3 shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-bold text-[#172B4D] tracking-tight">Inbound Freight &amp; Supplier Logistics</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E3FCEF] text-[#006644] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Synced
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#737685]">WH-BAY-PACIFIC</span>
        </div>

        {/* High-Impact Critical Blocker Alert (Jira/Atlassian Incident Style) */}
        <div className="bg-[#FFDAD6]/50 border-l-4 border-red-600 rounded-r p-3 flex items-center justify-between shadow-xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                  CRITICAL SUPPLY CHAIN DELAY (4 Flagged)
                </span>
                <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded font-mono">
                  URGENT
                </span>
              </div>
              <p className="text-[12px] text-[#172B4D] mt-0.5">
                <strong className="text-red-900 font-bold">FLR-104 Smith Residence</strong> installation halted:
                AcoustiGuard Vapor Barrier delayed <strong className="text-red-600 font-bold">+48h</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onInspectBlocker}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded text-[12px] font-semibold transition-colors shrink-0 shadow-sm"
          >
            Re-route Reserve
          </button>
        </div>

        {/* 4 Summary Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#737685] font-bold uppercase">
              <span>Inbound</span>
              <Truck className="w-4 h-4 text-[#0052CC]" />
            </div>
            <div className="mt-1">
              <span className="text-[20px] font-bold text-[#0052CC] font-mono">12</span>
              <span className="text-[10px] text-emerald-700 block font-semibold">✓ 8 On Schedule</span>
            </div>
          </div>

          <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#737685] font-bold uppercase">
              <span>Delays</span>
              <Clock className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-1">
              <span className="text-[20px] font-bold text-red-600 font-mono">4</span>
              <span className="text-[10px] text-red-600 block font-semibold">⚠️ 3 Critical Blockers</span>
            </div>
          </div>

          <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#737685] font-bold uppercase">
              <span>In Dock Today</span>
              <Warehouse className="w-4 h-4 text-[#0052CC]" />
            </div>
            <div className="mt-1">
              <span className="text-[20px] font-bold text-[#172B4D] font-mono">3</span>
              <span className="text-[10px] text-[#5E6C84] block font-medium">Bays Active: 1, 2, 4</span>
            </div>
          </div>

          <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#737685] font-bold uppercase">
              <span>Freight Value</span>
              <span className="text-[10px] text-[#737685] font-mono">USD</span>
            </div>
            <div className="mt-1">
              <span className="text-[20px] font-bold text-[#172B4D] font-mono">$68.4k</span>
              <span className="text-[10px] text-[#5E6C84] block font-medium">18 Purchase Orders</span>
            </div>
          </div>
        </div>

        {/* Gate Windows Glance */}
        <div className="pt-2 border-t border-[#EBECF0]">
          <div className="flex items-center justify-between mb-1.5 text-[11px] font-bold">
            <span className="text-[#172B4D]">Today's Gate Windows (Pacific Hub)</span>
            <span className="text-[#737685] font-mono">SCHEDULED DOCKING</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <div className="min-w-[170px] bg-[#F9F9FF] border border-[#DFE1E6] rounded p-2 text-[11px]">
              <div className="flex items-center justify-between mb-0.5 font-mono">
                <span className="bg-[#EBECF0] px-1 rounded text-[#172B4D] font-bold">08:00 AM</span>
                <span className="text-emerald-700 font-bold">BAY 1</span>
              </div>
              <span className="font-semibold text-[#172B4D] block truncate">Shaw Commercial</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">✓ UNLOADED</span>
            </div>

            <div className="min-w-[170px] bg-[#F9F9FF] border border-[#DFE1E6] rounded p-2 text-[11px]">
              <div className="flex items-center justify-between mb-0.5 font-mono">
                <span className="bg-[#E8EDFF] text-[#0052CC] px-1 rounded font-bold">11:30 AM</span>
                <span className="text-[#0052CC] font-bold">BAY 3</span>
              </div>
              <span className="font-semibold text-[#172B4D] block truncate">Loba-Wakol USA</span>
              <span className="text-[10px] text-[#0052CC] font-bold uppercase">APPROACHING</span>
            </div>

            <div className="min-w-[170px] bg-[#FFDAD6]/30 border border-red-200 rounded p-2 text-[11px]">
              <div className="flex items-center justify-between mb-0.5 font-mono">
                <span className="bg-red-100 text-red-700 px-1 rounded font-bold">14:00 PM</span>
                <span className="text-red-700 font-bold">YARD B</span>
              </div>
              <span className="font-semibold text-[#172B4D] block truncate">Bona Commercial US</span>
              <span className="text-[10px] text-red-600 font-bold uppercase">DELAYED +48h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-6 py-2 border-b border-[#DFE1E6] flex items-center justify-between shrink-0 text-[12px]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
              filterTab === 'ALL' ? 'bg-[#0052CC] text-white' : 'bg-[#F1F3FF] text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            All (12)
          </button>
          <button
            onClick={() => setFilterTab('DELAYED')}
            className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors flex items-center gap-1 ${
              filterTab === 'DELAYED' ? 'bg-red-600 text-white' : 'bg-[#FFDAD6] text-[#93000A]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Delayed (4)
          </button>
          <button
            onClick={() => setFilterTab('IN_TRANSIT')}
            className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
              filterTab === 'IN_TRANSIT' ? 'bg-[#0052CC] text-white' : 'bg-[#F1F3FF] text-[#5E6C84]'
            }`}
          >
            In-Transit (5)
          </button>
          <button
            onClick={() => setFilterTab('DOCKED')}
            className={`px-3 py-1 rounded text-[12px] font-semibold transition-colors ${
              filterTab === 'DOCKED' ? 'bg-[#0052CC] text-white' : 'bg-[#F1F3FF] text-[#5E6C84]'
            }`}
          >
            Docked (3)
          </button>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737685]" />
          <input
            type="text"
            placeholder="Search PO, BOL, Carrier, or Jobsite..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-7 pl-8 pr-2 text-[11px] bg-[#F4F5F7] border border-[#DFE1E6] rounded outline-none"
          />
        </div>
      </div>

      {/* Shipments List */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredShipments.map((shipment) => {
          const isDelayed = shipment.status === 'DELAYED';
          return (
            <article
              key={shipment.id}
              className={`bg-white rounded-lg border p-4 shadow-xs relative overflow-hidden ${
                isDelayed ? 'border-2 border-red-300' : 'border-[#DFE1E6]'
              }`}
            >
              {isDelayed && <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-red-600" />}

              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isDelayed
                          ? 'bg-red-600 text-white'
                          : shipment.status === 'DOCKED'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#0052CC] text-white'
                      }`}
                    >
                      {shipment.status} {shipment.slipHours ? `(+${shipment.slipHours}h Slip)` : ''}
                    </span>
                    {shipment.actionRequired && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                        {shipment.actionRequired}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[15px] font-bold text-[#172B4D] mt-1">
                    {shipment.projectCode} {shipment.projectName}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="bg-[#EBECF0] text-[#172B4D] font-mono text-[12px] font-bold px-2 py-0.5 rounded border border-[#DFE1E6]">
                    {shipment.poNumber}
                  </span>
                  <span className="text-[11px] font-mono text-[#5E6C84] block mt-1">
                    Value: ${shipment.totalFreight.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Material & Carrier Specs Box */}
              <div className="p-3 rounded bg-[#FAFBFC] border border-[#EBECF0] text-[12px] space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#172B4D]">{shipment.itemSummary}</span>
                  <span className="font-mono text-[#5E6C84] text-[11px]">Supplier: {shipment.supplier}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#5E6C84] pt-1 border-t border-[#EBECF0]">
                  <span className="flex items-center gap-1 font-mono">
                    <Truck className="w-3.5 h-3.5 text-[#737685]" />
                    {shipment.carrier}
                  </span>
                  {shipment.slipReason ? (
                    <span className="text-red-700 font-medium">{shipment.slipReason}</span>
                  ) : (
                    <span className="text-[#0052CC] font-semibold">{shipment.dockBay}</span>
                  )}
                </div>
              </div>

              {/* ETA & Action Row */}
              <div className="flex items-center justify-between text-[12px] pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#737685]" />
                  <span className="text-[#5E6C84]">
                    {shipment.etaNote}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#F1F3FF] hover:bg-[#E0E8FF] text-[#172B4D] font-semibold rounded text-[12px] border border-[#DFE1E6] transition-colors">
                    Manifest Details
                  </button>
                  <button className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white font-semibold rounded text-[12px] shadow-sm transition-colors">
                    Receive / Quarantine
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
};
