import React, { useState } from 'react';
import { Terminal, Play, CheckCircle, Clock, Copy, Check } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_CATALOG, MOCK_FREIGHT } from '../data/mock-records';

interface EndpointDef {
  method: 'GET' | 'POST' | 'PATCH';
  path: string;
  description: string;
  response: any;
  payload?: any;
}

export const ApiConsoleView: React.FC = () => {
  const endpoints: EndpointDef[] = [
    {
      method: 'GET',
      path: '/api/v1/projects/pipeline-board',
      description: 'Fetch complete 6-stage Kanban board with blocker tallies and in-flight values',
      response: {
        totalJobs: 28,
        activeStagesCount: 6,
        blockedOnMaterialsCount: 4,
        inFlightTotalValue: 482500.0,
        stages: [
          { stage: 'ESTIMATING', count: 5, totalAmount: 78200.0 },
          { stage: 'MATERIALS_ORDERED', count: 6, totalAmount: 114300.0 },
          { stage: 'SUBFLOOR_PREP', count: 4, totalAmount: 92600.0 },
          { stage: 'INSTALLATION', count: 7, totalAmount: 126800.0 },
          { stage: 'FINISHING_CURING', count: 3, totalAmount: 41200.0 },
          { stage: 'COMPLETED', count: 3, totalAmount: 29400.0 },
        ],
        activeProjects: MOCK_PROJECTS.slice(0, 4),
      },
    },
    {
      method: 'GET',
      path: '/api/v1/estimates/project/3',
      description: 'Fetch Oakland Tech Hub (FLR-122) dynamic estimate formula with +10% waste calculations',
      response: {
        id: '1',
        projectId: '3',
        projectCode: 'FLR-122',
        scenarioName: 'Base Bid (Scenario A)',
        formulaVersion: 'Formula Lock v3.4',
        grossAreaSqft: 6200.0,
        usableRoomsZones: 4,
        materialsCost: 40228.0,
        laborCost: 7104.0,
        equipmentCost: 975.0,
        modifiersAdder: 4836.0,
        directCost: 48307.0,
        overheadPct: 15.0,
        overheadAmount: 7246.0,
        targetMarginPct: 28.5,
        targetGrossProfit: 17813.0,
        totalClientQuote: 44520.0,
        sections: [
          {
            sectionNumber: 1,
            title: 'Section 1: Surface Materials & Finish Takeoff',
            cost: 40228.0,
            lineItems: [
              {
                title: 'Interface Commercial Carpet Tile',
                takeoffQty: 4800,
                baseRate: 4.85,
                wastePct: 10.0,
                billedQty: 5280,
                subtotal: 25608.0,
              },
              {
                title: 'Polished Concrete & Epoxy Sealant',
                takeoffQty: 1400,
                baseRate: 6.5,
                wastePct: 0.0,
                billedQty: 1400,
                subtotal: 9100.0,
              },
              {
                title: 'AcoustiGuard Vapor Underlayment',
                takeoffQty: 4800,
                baseRate: 1.15,
                wastePct: 0.0,
                billedQty: 4800,
                subtotal: 5520.0,
              },
            ],
          },
        ],
      },
    },
    {
      method: 'GET',
      path: '/api/v1/logistics/inbound-freight?status=DELAYED',
      description: 'Query multi-vendor PO freight dispatches currently flagged with terminal or transit delays',
      response: MOCK_FREIGHT.filter((f) => f.status === 'DELAYED'),
    },
    {
      method: 'POST',
      path: '/api/v1/telemetry/sessions',
      description: 'Submit ASTM F2170 subfloor moisture probe readings and evaluate project blocker triggers',
      payload: {
        projectId: '1',
        inspectorUserId: '3',
        calibratedDeviceInfo: 'Tramex CMEX5 #TX-4409',
        ambientTempF: 68.0,
        ambientRhPct: 45.0,
        readings: [
          { roomZone: 'Master Bedroom', pointLabel: 'A', readingMc: 14.8, equilibriumRh: 86.0 },
          { roomZone: 'Master Bedroom', pointLabel: 'B', readingMc: 11.4, equilibriumRh: 72.0 },
          { roomZone: 'Master Bedroom', pointLabel: 'C', readingMc: 15.5, equilibriumRh: 89.0 },
        ],
      },
      response: {
        sessionId: 'TRX-SCAN-v4.2-FLR104',
        averageMcPct: 13.9,
        targetThresholdPct: 12.0,
        moistureDeltaPct: 1.9,
        overallComplianceStatus: 'FAIL_STOP_WORK_ORDER',
        isSignoffLocked: true,
        projectBlockerCreated: {
          id: '1',
          blockerType: 'MOISTURE_EXCEEDED',
          severity: 'CRITICAL',
          title: 'Critical Dependency: Installation Blocked',
          currentReading: 14.8,
          thresholdTarget: 12.0,
        },
      },
    },
  ];

  const [activeEndpoint, setActiveEndpoint] = useState<EndpointDef>(endpoints[0]);
  const [responseLog, setResponseLog] = useState<any>(endpoints[0].response);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleExecute = (ep: EndpointDef) => {
    setActiveEndpoint(ep);
    setIsExecuting(true);
    setTimeout(() => {
      setResponseLog(ep.response);
      setIsExecuting(false);
    }, 400);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(responseLog, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-3 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#172B4D] tracking-tight">
            Interactive NestJS / Angular REST API Console
          </h2>
          <p className="text-[12px] text-[#5E6C84] mt-0.5">
            Test backend payload contracts, query params, DTOs, and real-time response schemas for FloorOps Pro.
          </p>
        </div>
      </div>

      {/* Two-Pane API Console */}
      <div className="flex-1 flex overflow-hidden p-6 gap-5">
        {/* Endpoints List (Left) */}
        <div className="w-96 shrink-0 bg-white rounded-lg border border-[#DFE1E6] shadow-xs flex flex-col overflow-hidden">
          <div className="p-3 bg-[#FAFBFC] border-b border-[#DFE1E6] text-[12px] font-bold text-[#172B4D]">
            Available Endpoints ({endpoints.length})
          </div>
          <div className="divide-y divide-[#EBECF0] overflow-y-auto">
            {endpoints.map((ep) => {
              const isSelected = activeEndpoint.path === ep.path && activeEndpoint.method === ep.method;
              return (
                <div
                  key={ep.method + ep.path}
                  onClick={() => handleExecute(ep)}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#E8EDFF]' : 'hover:bg-[#FAFBFC]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-800'
                          : ep.method === 'POST'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[#172B4D] truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5E6C84] line-clamp-2">{ep.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Request & Response Viewer (Right) */}
        <div className="flex-1 bg-[#1E293B] rounded-lg border border-[#334155] shadow-lg flex flex-col overflow-hidden text-white font-mono text-[12px]">
          {/* Console Header Bar */}
          <div className="px-4 py-2.5 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeEndpoint.method === 'GET' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
              >
                {activeEndpoint.method}
              </span>
              <span className="text-[13px] font-bold text-white">{activeEndpoint.path}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 200 OK
              </span>
              <button
                onClick={handleCopyJson}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>

          {/* Response Payload */}
          <div className="flex-1 overflow-y-auto p-4 text-[#E2E8F0]">
            {isExecuting ? (
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Clock className="w-4 h-4 animate-spin text-[#0052CC]" />
                <span>Executing request on NestJS backend...</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{JSON.stringify(responseLog, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
