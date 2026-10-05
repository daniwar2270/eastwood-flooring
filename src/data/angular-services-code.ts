/**
 * Angular Client Models & Services for FloorOps Pro
 * For consumption in Angular 17+ with standalone components & signals
 */

export const ANGULAR_SERVICES_SOURCE = `
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// =============================================================================
// ANGULAR FRONTEND DATA CONTRACTS (INTERFACES)
// =============================================================================

export interface ProjectSummaryDto {
  id: string;
  projectCode: string;
  name: string;
  clientName: string;
  clientType: string;
  jobsiteAddress: string;
  stage: 'ESTIMATING' | 'MATERIALS_ORDERED' | 'SUBFLOOR_PREP' | 'INSTALLATION' | 'FINISHING_CURING' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  grossAreaSqft: number;
  contractTotal: number;
  targetMarginPct: number;
  hasCriticalBlocker: boolean;
  leadInstallerName?: string;
  estimatorName?: string;
  blockersCount: number;
}

export interface PipelineBoardResponse {
  totalJobs: number;
  activeStagesCount: number;
  blockedOnMaterialsCount: number;
  inFlightTotalValue: number;
  columns: {
    stage: string;
    label: string;
    totalAmount: number;
    jobs: ProjectSummaryDto[];
  }[];
}

export interface EstimateDetailDto {
  id: string;
  projectId: string;
  scenarioName: string;
  formulaVersion: string;
  grossAreaSqft: number;
  usableRoomsZones: number;
  materialsCost: number;
  laborCost: number;
  equipmentCost: number;
  modifiersAdder: number;
  directCost: number;
  overheadPct: number;
  overheadAmount: number;
  targetMarginPct: number;
  targetGrossProfit: number;
  totalClientQuote: number;
  sections: {
    id: string;
    sectionType: string;
    title: string;
    sectionCost: number;
    lineItems: {
      id: string;
      title: string;
      subtitle?: string;
      takeoffQuantity?: number;
      baseRate?: number;
      wasteModifierPct: number; // e.g. 10.0 for +10%
      billedQuantity?: number;  // takeoff * 1.10
      crewComposition?: string;
      estimatedHours?: number;
      blendedHourlyRate?: number;
      calculatedSubtotal: number;
    }[];
  }[];
}

export interface InboundFreightShipmentDto {
  id: string;
  poNumber: string;
  projectCode: string;
  projectName: string;
  supplierName: string;
  carrierName: string;
  trackingNumber: string;
  status: string;
  orderDate: string;
  revisedEta: string;
  delayHoursSlip: number;
  delayReason?: string;
  dockBay: string;
  totalFreightValue: number;
  items: {
    materialSku: string;
    materialName: string;
    orderedQuantity: number;
    receivedQuantity: number;
    unitPrice: number;
  }[];
}

export interface TelemetryReadingPayload {
  projectId: string;
  inspectorUserId: string;
  calibratedDeviceInfo: string;
  ambientTempF: number;
  ambientRhPct: number;
  readings: {
    roomZone: string;
    pointLabel: string;
    locationDescription: string;
    methodDepth: string;
    moistureContentPct: number;
    equilibriumRhPct: number;
  }[];
  notes?: string;
}

// =============================================================================
// ANGULAR HTTP API SERVICES
// =============================================================================

@Injectable({
  providedIn: 'root'
})
export class FloorOpsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1';

  /** 1. Get complete live Kanban pipeline */
  getPipelineBoard(filterParams?: { crewId?: string; supplierId?: string; blockerOnly?: boolean }): Observable<PipelineBoardResponse> {
    let params = new HttpParams();
    if (filterParams?.crewId) params = params.set('crewId', filterParams.crewId);
    if (filterParams?.supplierId) params = params.set('supplierId', filterParams.supplierId);
    if (filterParams?.blockerOnly) params = params.set('blockerOnly', 'true');
    return this.http.get<PipelineBoardResponse>(\`\${this.baseUrl}/projects/pipeline-board\`, { params });
  }

  /** 2. Fetch project detail with dynamic estimate formula */
  getProjectEstimate(projectId: string): Observable<EstimateDetailDto> {
    return this.http.get<EstimateDetailDto>(\`\${this.baseUrl}/estimates/project/\${projectId}\`);
  }

  /** 3. Update estimate waste modifiers or target margin in real-time */
  recalculateEstimate(estimateId: string, changes: { targetMarginPct?: number; lineItemWasteUpdates?: { id: string; wastePct: number }[] }): Observable<EstimateDetailDto> {
    return this.http.patch<EstimateDetailDto>(\`\${this.baseUrl}/estimates/\${estimateId}/recalculate\`, changes);
  }

  /** 4. Inbound logistics and purchase order tracking */
  getInboundFreight(statusFilter?: string): Observable<InboundFreightShipmentDto[]> {
    let params = new HttpParams();
    if (statusFilter) params = params.set('status', statusFilter);
    return this.http.get<InboundFreightShipmentDto[]>(\`\${this.baseUrl}/logistics/inbound-freight\`, { params });
  }

  /** 5. Submit jobsite moisture telemetry log (ASTM F2170) */
  submitTelemetrySession(payload: TelemetryReadingPayload): Observable<{ success: boolean; averageMc: number; isBlocked: boolean; blockerId?: string }> {
    return this.http.post<{ success: boolean; averageMc: number; isBlocked: boolean; blockerId?: string }>(\`\${this.baseUrl}/telemetry/sessions\`, payload);
  }

  /** 6. Move project to next stage or resolve blocker */
  advanceProjectStage(projectId: string, targetStage: string): Observable<{ success: boolean; currentStage: string }> {
    return this.http.post<{ success: boolean; currentStage: string }>(\`\${this.baseUrl}/projects/\${projectId}/advance-stage\`, { targetStage });
  }
}
`;
