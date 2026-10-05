/**
 * Complete NestJS TypeORM Entity Source Code for FloorOps Pro
 * Ready for copy-paste into NestJS src/modules
 */

export const NESTJS_TYPEORM_SOURCE = `
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';

// =============================================================================
// ENUMS
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

// =============================================================================
// ENTITIES
// =============================================================================

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ name: 'full_name', type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ESTIMATOR })
  role: UserRole;

  @Column({ name: 'avatar_initials', type: 'varchar', length: 4 })
  avatarInitials: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ name: 'project_code', type: 'varchar', length: 32, unique: true })
  projectCode: string; // e.g. FLR-104

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'client_name', type: 'varchar', length: 150 })
  clientName: string;

  @Column({ name: 'client_type', type: 'enum', enum: ClientType, default: ClientType.COMMERCIAL_FITOUT })
  clientType: ClientType;

  @Column({ name: 'jobsite_address', type: 'varchar', length: 255 })
  jobsiteAddress: string;

  @Column({ type: 'enum', enum: ProjectStage, default: ProjectStage.ESTIMATING })
  stage: ProjectStage;

  @Column({ type: 'enum', enum: ProjectPriority, default: ProjectPriority.MEDIUM })
  priority: ProjectPriority;

  @Column({ name: 'scope_substrate_summary', type: 'varchar', length: 255, nullable: true })
  scopeSubstrateSummary?: string;

  @Column({ name: 'finish_spec_summary', type: 'varchar', length: 255, nullable: true })
  finishSpecSummary?: string;

  @Column({ name: 'gross_area_sqft', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  grossAreaSqft: number;

  @Column({ name: 'usable_zones_count', type: 'int', unsigned: true, default: 1 })
  usableZonesCount: number;

  @Column({ name: 'contract_total', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  contractTotal: number;

  @Column({ name: 'target_margin_pct', type: 'decimal', precision: 5, scale: 2, default: 28.5 })
  targetMarginPct: number;

  @Column({ name: 'has_critical_blocker', type: 'boolean', default: false })
  hasCriticalBlocker: boolean;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lead_installer_id' })
  leadInstaller?: User;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'estimator_id' })
  estimator?: User;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project_manager_id' })
  projectManager?: User;

  @OneToMany(() => ProjectBlocker, (blocker) => blocker.project)
  blockers: ProjectBlocker[];

  @OneToMany(() => PurchaseOrder, (po) => po.project)
  purchaseOrders: PurchaseOrder[];

  @OneToMany(() => Estimate, (estimate) => estimate.project)
  estimates: Estimate[];

  @OneToMany(() => TelemetryInspectionSession, (session) => session.project)
  telemetrySessions: TelemetryInspectionSession[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  code: string; // e.g. MOHAWK, SHAW, BONA

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'contact_name', type: 'varchar', length: 100, nullable: true })
  contactName?: string;

  @Column({ name: 'contact_email', type: 'varchar', length: 191, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', type: 'varchar', length: 32, nullable: true })
  contactPhone?: string;

  @Column({ name: 'default_lead_time_days', type: 'int', unsigned: true, default: 3 })
  defaultLeadTimeDays: number;

  @OneToMany(() => Material, (m) => m.supplier)
  materials: Material[];

  @OneToMany(() => PurchaseOrder, (po) => po.supplier)
  purchaseOrders: PurchaseOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  sku: string; // e.g. WO-PLK-501, BT-HD-04

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @ManyToOne(() => Supplier, (s) => s.materials, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'enum', enum: MaterialCategory })
  category: MaterialCategory;

  @Column({ name: 'unit_of_measure', type: 'enum', enum: UnitOfMeasure, default: UnitOfMeasure.SQ_FT })
  unitOfMeasure: UnitOfMeasure;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  unitPrice: number;

  @Column({ name: 'package_spec', type: 'varchar', length: 100, nullable: true })
  packageSpec?: string;

  @Column({ name: 'stock_quantity', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  stockQuantity: number;

  @Column({ name: 'safety_stock_threshold', type: 'decimal', precision: 10, scale: 2, default: 10.0 })
  safetyStockThreshold: number;

  @Column({ name: 'warehouse_location', type: 'varchar', length: 100, default: 'Main Warehouse' })
  warehouseLocation: string;

  @Column({ type: 'enum', enum: InventoryStatus, default: InventoryStatus.IN_STOCK })
  status: InventoryStatus;

  @Column({ name: 'lead_time_days', type: 'int', unsigned: true, default: 2 })
  leadTimeDays: number;

  @Column({ name: 'voc_compliance', type: 'varchar', length: 64, nullable: true })
  vocCompliance?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ name: 'po_number', type: 'varchar', length: 32, unique: true })
  poNumber: string; // e.g. PO-88219

  @ManyToOne(() => Project, (p) => p.purchaseOrders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Supplier, (s) => s.purchaseOrders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'enum', enum: POStatus, default: POStatus.ORDERED })
  status: POStatus;

  @Column({ name: 'carrier_name', type: 'varchar', length: 100, nullable: true })
  carrierName?: string;

  @Column({ name: 'tracking_number', type: 'varchar', length: 100, nullable: true })
  trackingNumber?: string;

  @Column({ name: 'order_date', type: 'date' })
  orderDate: Date;

  @Column({ name: 'target_delivery_window', type: 'varchar', length: 100, nullable: true })
  targetDeliveryWindow?: string;

  @Column({ name: 'original_eta', type: 'datetime', nullable: true })
  originalEta?: Date;

  @Column({ name: 'revised_eta', type: 'datetime', nullable: true })
  revisedEta?: Date;

  @Column({ name: 'delay_hours_slip', type: 'int', default: 0 })
  delayHoursSlip: number; // e.g. 48 for +48h

  @Column({ name: 'delay_reason', type: 'varchar', length: 255, nullable: true })
  delayReason?: string;

  @Column({ name: 'dock_bay', type: 'varchar', length: 50, nullable: true })
  dockBay?: string;

  @Column({ name: 'total_freight_value', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  totalFreightValue: number;

  @Column({ name: 'qc_passed_mc_pct', type: 'decimal', precision: 5, scale: 2, nullable: true })
  qcPassedMcPct?: number;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, { cascade: true })
  items: PurchaseOrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('purchase_order_items')
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => PurchaseOrder, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => Material, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ name: 'ordered_quantity', type: 'decimal', precision: 10, scale: 2 })
  orderedQuantity: number;

  @Column({ name: 'received_quantity', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  receivedQuantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;
}

@Entity('project_blockers')
export class ProjectBlocker {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Project, (p) => p.blockers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'blocker_type', type: 'enum', enum: BlockerType })
  blockerType: BlockerType;

  @Column({ type: 'enum', enum: BlockerSeverity, default: BlockerSeverity.CRITICAL })
  severity: BlockerSeverity;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'threshold_target', type: 'decimal', precision: 8, scale: 2, nullable: true })
  thresholdTarget?: number;

  @Column({ name: 'current_reading', type: 'decimal', precision: 8, scale: 2, nullable: true })
  currentReading?: number;

  @Column({ name: 'unit_of_measure', type: 'varchar', length: 32, default: '% MC' })
  unitOfMeasure: string;

  @ManyToOne(() => PurchaseOrder, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'related_po_id' })
  relatedPurchaseOrder?: PurchaseOrder;

  @Column({ name: 'is_resolved', type: 'boolean', default: false })
  isResolved: boolean;

  @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('estimates')
export class Estimate {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Project, (p) => p.estimates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'scenario_name', type: 'varchar', length: 100, default: 'Base Bid (Scenario A)' })
  scenarioName: string;

  @Column({ name: 'formula_version', type: 'varchar', length: 32, default: 'Formula Lock v3.4' })
  formulaVersion: string;

  @Column({ name: 'is_primary', type: 'boolean', default: true })
  isPrimary: boolean;

  @Column({ name: 'gross_area_sqft', type: 'decimal', precision: 10, scale: 2 })
  grossAreaSqft: number;

  @Column({ name: 'materials_cost', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  materialsCost: number;

  @Column({ name: 'labor_cost', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  laborCost: number;

  @Column({ name: 'equipment_cost', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  equipmentCost: number;

  @Column({ name: 'modifiers_adder', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  modifiersAdder: number;

  @Column({ name: 'direct_cost', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  directCost: number;

  @Column({ name: 'overhead_pct', type: 'decimal', precision: 5, scale: 2, default: 15.0 })
  overheadPct: number;

  @Column({ name: 'target_margin_pct', type: 'decimal', precision: 5, scale: 2, default: 28.5 })
  targetMarginPct: number;

  @Column({ name: 'total_client_quote', type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  totalClientQuote: number;

  @OneToMany(() => EstimateSection, (s) => s.estimate, { cascade: true })
  sections: EstimateSection[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('estimate_sections')
export class EstimateSection {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Estimate, (e) => e.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estimate_id' })
  estimate: Estimate;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ name: 'section_cost', type: 'decimal', precision: 12, scale: 2 })
  sectionCost: number;

  @OneToMany(() => EstimateLineItem, (li) => li.section, { cascade: true })
  lineItems: EstimateLineItem[];
}

@Entity('estimate_line_items')
export class EstimateLineItem {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => EstimateSection, (s) => s.lineItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  section: EstimateSection;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle?: string;

  @ManyToOne(() => Material, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'material_id' })
  material?: Material;

  @Column({ name: 'takeoff_quantity', type: 'decimal', precision: 10, scale: 2, nullable: true })
  takeoffQuantity?: number;

  @Column({ name: 'base_rate', type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseRate?: number;

  @Column({ name: 'waste_modifier_pct', type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  wasteModifierPct: number; // e.g. 10.00 for +10%

  @Column({ name: 'billed_quantity', type: 'decimal', precision: 10, scale: 2, nullable: true })
  billedQuantity?: number;

  @Column({ name: 'crew_composition', type: 'varchar', length: 100, nullable: true })
  crewComposition?: string;

  @Column({ name: 'estimated_hours', type: 'decimal', precision: 8, scale: 2, nullable: true })
  estimatedHours?: number;

  @Column({ name: 'blended_hourly_rate', type: 'decimal', precision: 10, scale: 2, nullable: true })
  blendedHourlyRate?: number;

  @Column({ name: 'modifier_rule_code', type: 'varchar', length: 50, nullable: true })
  modifierRuleCode?: string;

  @Column({ name: 'calculated_subtotal', type: 'decimal', precision: 12, scale: 2 })
  calculatedSubtotal: number;
}

@Entity('telemetry_inspection_sessions')
export class TelemetryInspectionSession {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Project, (p) => p.telemetrySessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'inspector_user_id' })
  inspector: User;

  @Column({ name: 'session_code', type: 'varchar', length: 64 })
  sessionCode: string;

  @Column({ name: 'inspection_date', type: 'datetime' })
  inspectionDate: Date;

  @Column({ name: 'calibrated_device_info', type: 'varchar', length: 150 })
  calibratedDeviceInfo: string; // e.g. Tramex CMEX5 #TX-4409

  @Column({ name: 'average_moisture_content_pct', type: 'decimal', precision: 5, scale: 2 })
  averageMoistureContentPct: number; // e.g. 13.90

  @Column({ name: 'target_moisture_threshold_pct', type: 'decimal', precision: 5, scale: 2, default: 12.0 })
  targetMoistureThresholdPct: number;

  @Column({ name: 'overall_compliance_status', type: 'varchar', length: 32, default: 'FAIL_STOP_WORK_ORDER' })
  overallComplianceStatus: string;

  @Column({ name: 'is_signoff_locked', type: 'boolean', default: true })
  isSignoffLocked: boolean;

  @OneToMany(() => TelemetryReadingPoint, (p) => p.session, { cascade: true })
  readingPoints: TelemetryReadingPoint[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('telemetry_reading_points')
export class TelemetryReadingPoint {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => TelemetryInspectionSession, (s) => s.readingPoints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: TelemetryInspectionSession;

  @Column({ name: 'room_zone', type: 'varchar', length: 100 })
  roomZone: string; // e.g. Master Bedroom

  @Column({ name: 'point_label', type: 'varchar', length: 10 })
  pointLabel: string; // e.g. A, B, C

  @Column({ name: 'location_description', type: 'varchar', length: 150 })
  locationDescription: string;

  @Column({ name: 'method_depth', type: 'varchar', length: 100 })
  methodDepth: string;

  @Column({ name: 'moisture_content_pct', type: 'decimal', precision: 5, scale: 2 })
  moistureContentPct: number;

  @Column({ name: 'equilibrium_rh_pct', type: 'decimal', precision: 5, scale: 2 })
  equilibriumRhPct: number;

  @Column({ type: 'varchar', length: 32 })
  status: string; // PASS_OK, FAIL_HIGH, FAIL_CRITICAL
}
`;
