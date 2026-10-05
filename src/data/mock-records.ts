/**
 * FloorOps Pro - Live Mock Records Data
 */

export interface ProjectRecord {
  id: string;
  code: string;
  name: string;
  client: string;
  type: string;
  address: string;
  stage: 'ESTIMATING' | 'MATERIALS_ORDERED' | 'SUBFLOOR_PREP' | 'INSTALLATION' | 'FINISHING_CURING' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  areaSqft: number;
  contractTotal: number;
  leadInstaller: string;
  estimator: string;
  blocker?: {
    severity: 'CRITICAL' | 'WARNING';
    title: string;
    description: string;
    reading: number;
    threshold: number;
    carrier?: string;
  };
  materialsSummary: string;
  materialsReceivedPct: number;
  formulaVersion: string;
}

export const MOCK_PROJECTS: ProjectRecord[] = [
  {
    id: '1',
    code: 'FLR-104',
    name: 'Smith Residence - Master Suite & Hallway',
    client: 'David & Karen Smith',
    type: 'Residential Remodel',
    address: '2419 Highland Ridge, Los Gatos, CA',
    stage: 'SUBFLOOR_PREP',
    priority: 'HIGH',
    areaSqft: 1450,
    contractTotal: 21155,
    leadInstaller: 'Marco Gomez',
    estimator: 'Sarah Chen',
    blocker: {
      severity: 'CRITICAL',
      title: 'Critical Dependency Flagged',
      description: 'Cannot proceed to Installation until Subfloor Moisture drops below 12.0% (Current: 14.8%) and Underlayment freight arrives.',
      reading: 14.8,
      threshold: 12.0,
      carrier: 'FedEx Freight #TRK-88219-FX',
    },
    materialsSummary: 'White Oak 5-inch Select Plank • 1,450 sq ft',
    materialsReceivedPct: 65,
    formulaVersion: 'Formula Lock v4',
  },
  {
    id: '2',
    code: 'FLR-119',
    name: 'Harbor View Offices - Level 2 Suites',
    client: 'Harbor Pacific Commercial',
    type: 'Commercial Fit-Out',
    address: '400 Embarcadero Suite 200, San Francisco, CA',
    stage: 'MATERIALS_ORDERED',
    priority: 'HIGH',
    areaSqft: 4800,
    contractTotal: 114300,
    leadInstaller: 'Apex Flooring Crew',
    estimator: 'Elena Rodriguez',
    materialsSummary: 'Shaw LVP Commercial Acoustical • 4,800 sq ft',
    materialsReceivedPct: 40,
    formulaVersion: 'Commercial v3.4',
  },
  {
    id: '3',
    code: 'FLR-122',
    name: 'Oakland Tech Hub - 4th Floor Open Plan',
    client: 'Aetheric Systems Corp',
    type: 'Commercial Tenant Improvement',
    address: '1901 Broadway Floor 4, Oakland, CA',
    stage: 'ESTIMATING',
    priority: 'MEDIUM',
    areaSqft: 6200,
    contractTotal: 44520,
    leadInstaller: 'Marco Gomez',
    estimator: 'Sarah Chen',
    materialsSummary: 'Interface Carpet Tile + Polished Concrete • 6,200 sq ft',
    materialsReceivedPct: 0,
    formulaVersion: 'Formula Lock v3.4',
  },
  {
    id: '4',
    code: 'FLR-125',
    name: 'Bellevue Custom Loft - Great Room',
    client: 'Alexander Vance',
    type: 'Bespoke Residential',
    address: '88 102nd Ave NE, Bellevue, WA',
    stage: 'ESTIMATING',
    priority: 'HIGH',
    areaSqft: 1120,
    contractTotal: 18200,
    leadInstaller: 'Marco Gomez',
    estimator: 'Marcus Vance',
    materialsSummary: 'Herringbone Walnut Prime • 1,120 sq ft',
    materialsReceivedPct: 0,
    formulaVersion: 'Dynamic Moisture Model',
  },
  {
    id: '5',
    code: 'FLR-108',
    name: 'Highland Towers Penthouse',
    client: 'Highland Properties Group',
    type: 'Commercial Fit-Out',
    address: '1200 California St, San Francisco, CA',
    stage: 'SUBFLOOR_PREP',
    priority: 'URGENT',
    areaSqft: 3200,
    contractTotal: 49800,
    leadInstaller: "Marco's Team",
    estimator: 'Sarah Chen',
    materialsSummary: 'Chevron Engineered European Oak • 3,200 sq ft',
    materialsReceivedPct: 100,
    formulaVersion: 'Leveling Compound 48h Cure (18h left)',
  },
  {
    id: '6',
    code: 'FLR-115',
    name: 'Kensington Manor Dining Wing',
    client: 'Kensington Hospitality',
    type: 'Bespoke Residential',
    address: '50 Kensington Park, Berkeley, CA',
    stage: 'MATERIALS_ORDERED',
    priority: 'MEDIUM',
    areaSqft: 950,
    contractTotal: 24600,
    leadInstaller: 'Apex Flooring Crew',
    estimator: 'Marcus Vance',
    materialsSummary: 'Quarter-Sawn Red Oak • 950 sq ft',
    materialsReceivedPct: 80,
    formulaVersion: 'Standard v2',
  },
  {
    id: '7',
    code: 'FLR-99',
    name: 'Presidio Heights Residence',
    client: 'Catherine DuMont',
    type: 'Bespoke Residential',
    address: '3400 Washington St, San Francisco, CA',
    stage: 'INSTALLATION',
    priority: 'MEDIUM',
    areaSqft: 2100,
    contractTotal: 32400,
    leadInstaller: 'Apex Flooring Crew',
    estimator: 'Elena Rodriguez',
    materialsSummary: 'Herringbone French Oak Double-Stained • 2,100 sq ft',
    materialsReceivedPct: 100,
    formulaVersion: 'Day 3 of 5 • 62% Installed',
  },
  {
    id: '8',
    code: 'FLR-112',
    name: 'Pacific Heights Villa',
    client: 'Jonathan Sterling',
    type: 'Residential Remodel',
    address: '2800 Pacific Ave, San Francisco, CA',
    stage: 'FINISHING_CURING',
    priority: 'MEDIUM',
    areaSqft: 1800,
    contractTotal: 23700,
    leadInstaller: 'Tom H.',
    estimator: 'Sarah Chen',
    materialsSummary: 'Bona Traffic HD Commercial Matte Finish • 1,800 sq ft',
    materialsReceivedPct: 100,
    formulaVersion: 'Curing: Coat 2 of 3 (24h remaining)',
  },
  {
    id: '9',
    code: 'FLR-92',
    name: 'Seacliff Estate Gallery',
    client: 'Seacliff Trust',
    type: 'Bespoke Residential',
    address: '150 El Camino Del Mar, San Francisco, CA',
    stage: 'COMPLETED',
    priority: 'LOW',
    areaSqft: 1300,
    contractTotal: 29400,
    leadInstaller: 'Marco Gomez',
    estimator: 'Sarah Chen',
    materialsSummary: 'Quarter-Sawn European Walnut • 1,300 sq ft',
    materialsReceivedPct: 100,
    formulaVersion: 'Client Signed Off • Warranty Released',
  },
];

export interface CatalogMaterial {
  id: string;
  sku: string;
  name: string;
  category: string;
  supplier: string;
  unitPrice: number;
  unitOfMeasure: string;
  packageSpec: string;
  stockQty: number;
  safetyThreshold: number;
  warehouseLocation: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  leadTime: string;
  warehouseCapacityPct: number;
  alertNote?: string;
  imageUrl?: string;
}

export const MOCK_CATALOG: CatalogMaterial[] = [
  {
    id: '1',
    sku: 'WO-PLK-501',
    name: 'Select White Oak 5-inch Plank',
    category: 'Hardwood / Solid Planks',
    supplier: 'Mohawk Commercial',
    unitPrice: 9.20,
    unitOfMeasure: 'sq ft',
    packageSpec: '$184.00 / 20 sq ft carton',
    stockQty: 3400,
    safetyThreshold: 1000,
    warehouseLocation: 'Main Whs - Aisle 4B',
    status: 'IN_STOCK',
    leadTime: '2 Days (Local Warehouse)',
    warehouseCapacityPct: 85,
  },
  {
    id: '2',
    sku: 'BT-HD-04',
    name: 'Bona Traffic HD Extra Matte',
    category: 'Finishes & Protective Sealants',
    supplier: 'Bona Commercial US',
    unitPrice: 125.00,
    unitOfMeasure: 'Gallon',
    packageSpec: 'Coverage ~400 sq ft/gal',
    stockQty: 4,
    safetyThreshold: 10,
    warehouseLocation: 'Laydown Bay 2',
    status: 'LOW_STOCK',
    leadTime: '3-4 Days',
    warehouseCapacityPct: 12,
    alertNote: 'Below safety threshold of 10 gal. Required for FLR-104 Smith Residence.',
  },
  {
    id: '3',
    sku: 'LVP-CHEV-88',
    name: 'Acoustic Scandinavian Chevron LVP',
    category: 'Luxury Vinyl Plank (LVP)',
    supplier: 'Shaw Floors Commercial',
    unitPrice: 5.85,
    unitOfMeasure: 'sq ft',
    packageSpec: '22 mil Commercial Wear',
    stockQty: 1850,
    safetyThreshold: 500,
    warehouseLocation: 'Main Whs - Aisle 2C',
    status: 'IN_STOCK',
    leadTime: 'Next Day Delivery',
    warehouseCapacityPct: 62,
  },
  {
    id: '4',
    sku: 'INT-CPT-602',
    name: 'Interface Modular Carpet Tile - Neutral Weave',
    category: 'Commercial Carpet Tile',
    supplier: 'Mohawk Commercial',
    unitPrice: 4.85,
    unitOfMeasure: 'sq ft',
    packageSpec: '50x50 cm Box',
    stockQty: 0,
    safetyThreshold: 800,
    warehouseLocation: 'Depleted Reserve',
    status: 'OUT_OF_STOCK',
    leadTime: 'Backordered until Nov 4 (Inbound PO-98421)',
    warehouseCapacityPct: 0,
    alertNote: 'Backordered until Nov 4. In-transit shipment arriving Friday.',
  },
  {
    id: '5',
    sku: 'EPX-SLT-200',
    name: 'Seamless Bio-Polymer Epoxy Resin (Slate Gray)',
    category: 'Industrial Epoxy & Coatings',
    supplier: 'EcoFlor Innovations',
    unitPrice: 6.50,
    unitOfMeasure: 'sq ft loaded',
    packageSpec: '5-Gal Pail ($130.00)',
    stockQty: 2,
    safetyThreshold: 5,
    warehouseLocation: 'Chemical Cabinet C',
    status: 'LOW_STOCK',
    leadTime: '3-5 Business Days',
    warehouseCapacityPct: 18,
    alertNote: 'Safety cap is 5 pails. Required for Meridian Medical Dental Wing.',
  },
  {
    id: '6',
    sku: 'CNC-SAT-14',
    name: 'Architectural Polished Concrete Satin Sealant',
    category: 'Concrete & Subfloor Treatment',
    supplier: 'Loba-Wakol Spec',
    unitPrice: 3.40,
    unitOfMeasure: 'sq ft',
    packageSpec: '55-Gal Industrial Drum',
    stockQty: 8,
    safetyThreshold: 2,
    warehouseLocation: 'Bay 4 Yard',
    status: 'IN_STOCK',
    leadTime: 'In Stock (Bay 4 Yard)',
    warehouseCapacityPct: 74,
  },
];

export interface InboundFreightRecord {
  id: string;
  poNumber: string;
  projectCode: string;
  projectName: string;
  itemSummary: string;
  supplier: string;
  carrier: string;
  tracking: string;
  status: 'DELAYED' | 'IN_TRANSIT' | 'DOCKED' | 'RECEIVED';
  etaNote: string;
  slipHours?: number;
  slipReason?: string;
  dockBay: string;
  actionRequired?: string;
  totalFreight: number;
}

export const MOCK_FREIGHT: InboundFreightRecord[] = [
  {
    id: '1',
    poNumber: 'PO-88219',
    projectCode: 'FLR-104',
    projectName: 'Smith Residence',
    itemSummary: '20 Rolls AcoustiGuard Vapor Barrier (200 mil)',
    supplier: 'Loba-Wakol',
    carrier: 'FedEx Freight #TRK-88219-FX',
    tracking: 'TRK-88219-FX',
    status: 'DELAYED',
    etaNote: 'Revised ETA: Oct 18 • Bay 3 Quarantine',
    slipHours: 48,
    slipReason: 'Terminal Hold: Reno, NV (Weather Chain Restriction)',
    dockBay: 'Bay 3 Quarantine',
    actionRequired: 'CRITICAL BLOCKER: Installation Halted',
    totalFreight: 4600,
  },
  {
    id: '2',
    poNumber: 'PO-98421',
    projectCode: 'FLR-119',
    projectName: 'Harbor View Offices',
    itemSummary: '4,800 sq ft Shaw Chevron LVP (4 Pallets)',
    supplier: 'Mohawk Commercial',
    carrier: 'Old Dominion #ODFL-449102-CA',
    tracking: 'ODFL-449102-CA',
    status: 'IN_TRANSIT',
    etaNote: 'Target Window: Today 11:30 AM • Bay 2',
    dockBay: 'Bay 2',
    totalFreight: 28080,
  },
  {
    id: '3',
    poNumber: 'PO-77402',
    projectCode: 'FLR-125',
    projectName: 'Bellevue Custom Loft',
    itemSummary: '8 Gallons Bona Traffic HD Extra Matte (Lot #4092-B)',
    supplier: 'Bona Commercial US',
    carrier: 'R+L Carriers #RL-993810-US',
    tracking: 'RL-993810-US',
    status: 'DELAYED',
    etaNote: 'ETA Slipped: +24h • Laydown Yard B',
    slipHours: 24,
    slipReason: 'Carrier Alert: Mechanical Breakdown (Axle Replacement)',
    dockBay: 'Laydown Yard B',
    actionRequired: 'Acclimatization Staging Delayed',
    totalFreight: 1000,
  },
  {
    id: '4',
    poNumber: 'PO-55318',
    projectCode: 'FLR-122',
    projectName: 'Oakland Tech Hub',
    itemSummary: '5,200 sq ft Select White Oak 5-in (6 Bundles)',
    supplier: 'Mohawk Direct Fleet',
    carrier: 'Mohawk Direct Fleet #TRK-MOH-14 (Driver: Ron Jenkins)',
    tracking: 'TRK-MOH-14',
    status: 'DOCKED',
    etaNote: 'Status: Docked 08:14 AM • Bay 1 (Unloading)',
    dockBay: 'Bay 1',
    totalFreight: 14720,
  },
];
