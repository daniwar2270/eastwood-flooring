/**
 * FloorOps Pro - NestJS TypeORM Entity Models
 * Covers: Projects & Kanban, Dynamic Estimator, Catalog & Inventory, Logistics & Telemetry
 */

// =============================================================================
// ENUMS (Matching MySQL ENUM definitions)
// =============================================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  OPS_LEAD = 'OPS_LEAD',
  ESTIMATOR = 'ESTIMATOR',
  LEAD_INSTALLER = 'LEAD_INSTALLER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  QC_SPECIALIST = 'QC_SPECIALIST',
}

export enum ProjectStage {
  ESTIMATING = 'ESTIMATING',
  MATERIALS_ORDERED = 'MATERIALS_ORDERED',
  SUBFLOOR_PREP = 'SUBFLOOR_PREP',
  INSTALLATION = 'INSTALLATION',
  FINISHING_CURING = 'FINISHING_CURING',
  COMPLETED = 'COMPLETED',
}

export enum ProjectPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum ClientType {
  RESIDENTIAL_REMODEL = 'RESIDENTIAL_REMODEL',
  COMMERCIAL_FITOUT = 'COMMERCIAL_FITOUT',
  BESPOKE_RESIDENTIAL = 'BESPOKE_RESIDENTIAL',
  COMMERCIAL_TI = 'COMMERCIAL_TI',
}

export enum MaterialCategory {
  HARDWOOD_PLANK = 'HARDWOOD_PLANK',
  LVP_ENGINEERED = 'LVP_ENGINEERED',
  CARPET_TILE = 'CARPET_TILE',
  EPOXY_RESIN = 'EPOXY_RESIN',
  FINISH_SEALANT = 'FINISH_SEALANT',
  POLISHED_CONCRETE = 'POLISHED_CONCRETE',
  UNDERLAYMENT_BARRIER = 'UNDERLAYMENT_BARRIER',
  SELF_LEVELING_COMPOUND = 'SELF_LEVELING_COMPOUND',
}

export enum UnitOfMeasure {
  SQ_FT = 'SQ_FT',
  GALLON = 'GALLON',
  PAIL_5GAL = 'PAIL_5GAL',
  BAG_50LB = 'BAG_50LB',
  DRUM_55GAL = 'DRUM_55GAL',
  ROLL = 'ROLL',
  CARTON = 'CARTON',
}

export enum InventoryStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum EquipmentCategory {
  DEHUMIDIFICATION = 'DEHUMIDIFICATION',
  MOISTURE_MONITORING = 'MOISTURE_MONITORING',
  DRUM_SANDER = 'DRUM_SANDER',
  AIR_MOVER = 'AIR_MOVER',
  HEPA_VACUUM = 'HEPA_VACUUM',
  SURFACE_GRINDER = 'SURFACE_GRINDER',
}

export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  DEPLOYED_ON_SITE = 'DEPLOYED_ON_SITE',
  MAINTENANCE_CALIBRATION = 'MAINTENANCE_CALIBRATION',
}

export enum POStatus {
  DRAFT = 'DRAFT',
  ORDERED = 'ORDERED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELAYED_CARRIER = 'DELAYED_CARRIER',
  TERMINAL_HOLD = 'TERMINAL_HOLD',
  DOCKED_UNLOADING = 'DOCKED_UNLOADING',
  RECEIVED_QC_PASSED = 'RECEIVED_QC_PASSED',
  QUARANTINED = 'QUARANTINED',
  CANCELLED = 'CANCELLED',
}

export enum BlockerType {
  MOISTURE_EXCEEDED = 'MOISTURE_EXCEEDED',
  MATERIAL_DELAY = 'MATERIAL_DELAY',
  CURING_GATE_ACTIVE = 'CURING_GATE_ACTIVE',
  EQUIPMENT_DEFICIT = 'EQUIPMENT_DEFICIT',
  ACCLIMATIZATION_HOLD = 'ACCLIMATIZATION_HOLD',
  STRUCTURAL_DEFECT = 'STRUCTURAL_DEFECT',
}

export enum BlockerSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum SectionType {
  SURFACE_MATERIALS = 'SURFACE_MATERIALS',
  LABOR_CREWS = 'LABOR_CREWS',
  EQUIPMENT_CONDITIONING = 'EQUIPMENT_CONDITIONING',
  MODIFIERS_CONTINGENCY = 'MODIFIERS_CONTINGENCY',
}

export enum EstimateLineItemType {
  MATERIAL_TAKEOFF = 'MATERIAL_TAKEOFF',
  LABOR_CREW = 'LABOR_CREW',
  EQUIPMENT_UNIT = 'EQUIPMENT_UNIT',
  CONTINGENCY_RULE = 'CONTINGENCY_RULE',
}

export enum ComplianceStatus {
  PASS_COMPLIANT = 'PASS_COMPLIANT',
  FAIL_STOP_WORK_ORDER = 'FAIL_STOP_WORK_ORDER',
  PENDING_RETEST = 'PENDING_RETEST',
}

export enum TestPointStatus {
  PASS_OK = 'PASS_OK',
  FAIL_HIGH = 'FAIL_HIGH',
  FAIL_CRITICAL = 'FAIL_CRITICAL',
}

export enum AcclimatizationStatus {
  ON_TRACK = 'ON_TRACK',
  SUPPLY_CHAIN_DELAY = 'SUPPLY_CHAIN_DELAY',
  IN_STOCK_COMPLIANT = 'IN_STOCK_COMPLIANT',
  DIFFERENTIAL_FAIL = 'DIFFERENTIAL_FAIL',
}

// =============================================================================
// TYPEORM TYPE DECLARATIONS (for standalone export & compilation safety)
// =============================================================================

export interface UserEntity {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarInitials: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierEntity {
  id: string;
  code: string;
  name: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  defaultLeadTimeDays: number;
  address?: string;
  materials?: MaterialEntity[];
  purchaseOrders?: PurchaseOrderEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialEntity {
  id: string;
  sku: string;
  name: string;
  supplierId: string;
  supplier?: SupplierEntity;
  category: MaterialCategory;
  unitOfMeasure: UnitOfMeasure;
  unitPrice: number;
  packageSpec?: string;
  stockQuantity: number;
  safetyStockThreshold: number;
  warehouseLocation: string;
  status: InventoryStatus;
  leadTimeDays: number;
  vocCompliance?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentEntity {
  id: string;
  equipmentCode: string;
  name: string;
  category: EquipmentCategory;
  rentalDailyRate: number;
  status: EquipmentStatus;
  currentProjectId?: string;
  currentProject?: ProjectEntity;
  serialNumber?: string;
  lastCalibrationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectEntity {
  id: string;
  projectCode: string; // e.g. FLR-104
  name: string;
  clientName: string;
  clientType: ClientType;
  jobsiteAddress: string;
  stage: ProjectStage;
  priority: ProjectPriority;
  scopeSubstrateSummary?: string;
  finishSpecSummary?: string;
  grossAreaSqft: number;
  usableZonesCount: number;
  contractTotal: number;
  targetMarginPct: number;
  hasCriticalBlocker: boolean;
  leadInstallerId?: string;
  leadInstaller?: UserEntity;
  estimatorId?: string;
  estimator?: UserEntity;
  projectManagerId?: string;
  projectManager?: UserEntity;
  blockers?: ProjectBlockerEntity[];
  estimates?: EstimateEntity[];
  purchaseOrders?: PurchaseOrderEntity[];
  telemetrySessions?: TelemetryInspectionSessionEntity[];
  acclimatizationLogs?: MaterialAcclimatizationLogEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBlockerEntity {
  id: string;
  projectId: string;
  project?: ProjectEntity;
  blockerType: BlockerType;
  severity: BlockerSeverity;
  title: string;
  description: string;
  thresholdTarget?: number;
  currentReading?: number;
  unitOfMeasure?: string;
  relatedPoId?: string;
  relatedPurchaseOrder?: PurchaseOrderEntity;
  isResolved: boolean;
  resolvedAt?: Date;
  resolvedByUserId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderEntity {
  id: string;
  poNumber: string; // e.g. PO-88219
  projectId: string;
  project?: ProjectEntity;
  supplierId: string;
  supplier?: SupplierEntity;
  status: POStatus;
  carrierName?: string;
  trackingNumber?: string;
  billOfLading?: string;
  orderDate: Date;
  targetDeliveryWindow?: string;
  originalEta?: Date;
  revisedEta?: Date;
  delayHoursSlip: number; // e.g. 48 for +48h
  delayReason?: string;
  dockBay?: string; // e.g. Bay 3 Quarantine
  totalFreightValue: number;
  driverName?: string;
  qcPassedMcPct?: number; // e.g. 8.2% MC
  items?: PurchaseOrderItemEntity[];
  blockers?: ProjectBlockerEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderItemEntity {
  id: string;
  purchaseOrderId: string;
  purchaseOrder?: PurchaseOrderEntity;
  materialId: string;
  material?: MaterialEntity;
  orderedQuantity: number;
  receivedQuantity: number;
  unitPrice: number;
  totalCost: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateEntity {
  id: string;
  projectId: string;
  project?: ProjectEntity;
  scenarioName: string;
  formulaVersion: string;
  isPrimary: boolean;
  isLocked: boolean;
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
  sections?: EstimateSectionEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateSectionEntity {
  id: string;
  estimateId: string;
  estimate?: EstimateEntity;
  sectionType: SectionType;
  title: string;
  sectionCost: number;
  sortOrder: number;
  lineItems?: EstimateLineItemEntity[];
}

export interface EstimateLineItemEntity {
  id: string;
  sectionId: string;
  section?: EstimateSectionEntity;
  itemType: EstimateLineItemType;
  title: string;
  subtitle?: string;
  materialId?: string;
  material?: MaterialEntity;
  takeoffQuantity?: number;
  baseRate?: number;
  wasteModifierPct: number; // e.g. 10.0 for +10%
  billedQuantity?: number; // takeoff * (1 + waste/100)
  crewComposition?: string;
  techniciansCount?: number;
  estimatedHours?: number;
  blendedHourlyRate?: number;
  equipmentId?: string;
  equipment?: EquipmentEntity;
  deploymentDays?: number;
  dailyRentalRate?: number;
  calibrationSurcharge?: number;
  modifierRuleCode?: string;
  calculatedSubtotal: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TelemetryInspectionSessionEntity {
  id: string;
  projectId: string;
  project?: ProjectEntity;
  inspectorUserId: string;
  inspector?: UserEntity;
  sessionCode: string;
  inspectionDate: Date;
  calibratedDeviceInfo: string;
  ambientTempF: number;
  ambientRhPct: number;
  averageMoistureContentPct: number; // e.g. 13.9%
  targetMoistureThresholdPct: number; // e.g. 12.0%
  moistureDeltaPct: number; // e.g. +1.9%
  overallComplianceStatus: ComplianceStatus;
  isSignoffLocked: boolean;
  prescribedMitigation?: string;
  superintendentNotes?: string;
  readingPoints?: TelemetryReadingPointEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TelemetryReadingPointEntity {
  id: string;
  sessionId: string;
  session?: TelemetryInspectionSessionEntity;
  roomZone: string; // e.g. Master Bedroom
  pointLabel: string; // e.g. Point A
  locationDescription: string;
  methodDepth: string;
  moistureContentPct: number; // e.g. 14.8
  equilibriumRhPct: number; // e.g. 86.0
  status: TestPointStatus;
  photoEvidenceUrl?: string;
  createdAt: Date;
}

export interface MaterialAcclimatizationLogEntity {
  id: string;
  projectId: string;
  project?: ProjectEntity;
  materialId: string;
  material?: MaterialEntity;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrderEntity;
  stagingBayLocation: string;
  stagedQuantity: number;
  woodMoistureContentPct: number; // e.g. 8.2%
  subfloorMoistureContentPct: number; // e.g. 13.9%
  differentialPct: number; // e.g. 5.7% (max 2.0%)
  maxAllowedDifferentialPct: number;
  acclimatizationDayCurrent: number;
  acclimatizationDaysRequired: number;
  ambientTempF: number;
  ambientRhPct: number;
  status: AcclimatizationStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
