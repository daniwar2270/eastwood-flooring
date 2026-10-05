-- =============================================================================
-- FloorOps Pro - Production Seed Data (Matches UI Pipeline & Job Scenarios)
-- =============================================================================

-- 1. Users
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role`, `avatar_initials`, `phone`) VALUES
(1, 'marcus.vance@floorops.pro', '$2b$10$hashedpass1', 'Marcus Vance', 'OPS_LEAD', 'MV', '+1 (415) 555-0101'),
(2, 'sarah.chen@floorops.pro', '$2b$10$hashedpass2', 'Sarah Chen', 'ESTIMATOR', 'SC', '+1 (415) 555-0102'),
(3, 'marco.gomez@floorops.pro', '$2b$10$hashedpass3', 'Marco Gomez', 'LEAD_INSTALLER', 'MG', '+1 (415) 555-0103'),
(4, 'elena.rodriguez@floorops.pro', '$2b$10$hashedpass4', 'Elena Rodriguez', 'PROJECT_MANAGER', 'ER', '+1 (415) 555-0104');

-- 2. Suppliers
INSERT INTO `suppliers` (`id`, `code`, `name`, `contact_name`, `contact_email`, `contact_phone`, `default_lead_time_days`, `address`) VALUES
(1, 'MOHAWK', 'Mohawk Commercial', 'David Miller', 'commercial@mohawkflooring.com', '+1 (800) 555-6642', 2, 'Calhoun, GA'),
(2, 'SHAW', 'Shaw Floors Commercial', 'Jennifer Watts', 'orders@shawcommercial.com', '+1 (800) 555-7429', 2, 'Dalton, GA'),
(3, 'BONA', 'Bona Commercial US', 'Kurt Lindqvist', 'commercial.us@bona.com', '+1 (800) 555-2662', 3, 'Aurora, CO'),
(4, 'LOBA_WAKOL', 'Loba-Wakol USA Spec', 'Markus Steiner', 'orders@loba-wakol.com', '+1 (800) 555-5622', 4, 'Pineville, NC'),
(5, 'ECOFLOR', 'EcoFlor Innovations', 'Rachel Green', 'dispatch@ecoflorinno.com', '+1 (800) 555-3263', 5, 'Portland, OR');

-- 3. Materials
INSERT INTO `materials` (`id`, `sku`, `name`, `supplier_id`, `category`, `unit_of_measure`, `unit_price`, `package_spec`, `stock_quantity`, `safety_stock_threshold`, `warehouse_location`, `status`, `lead_time_days`, `voc_compliance`) VALUES
(1, 'WO-PLK-501', 'Select White Oak 5-inch Plank', 1, 'HARDWOOD_PLANK', 'SQ_FT', 9.20, '20 sq ft carton ($184.00/ctn)', 3400.00, 1000.00, 'Main Whs - Aisle 4B', 'IN_STOCK', 2, 'LEED v4.1 Compliant'),
(2, 'BT-HD-04', 'Bona Traffic HD Extra Matte', 3, 'FINISH_SEALANT', 'GALLON', 125.00, 'Coverage ~400 sq ft/gal', 4.00, 10.00, 'Laydown Bay 2', 'LOW_STOCK', 3, 'Ultra-Low VOC < 150 g/L'),
(3, 'LVP-CHEV-88', 'Acoustic Scandinavian Chevron LVP', 2, 'LVP_ENGINEERED', 'SQ_FT', 5.85, '22 mil Commercial Wear', 1850.00, 500.00, 'Main Whs - Aisle 2C', 'IN_STOCK', 1, 'FloorScore Certified'),
(4, 'INT-CPT-602', 'Interface Commercial Carpet Tile - Neutral Weave', 1, 'CARPET_TILE', 'SQ_FT', 4.85, '50x50 cm Box (Nylon 6,6)', 0.00, 800.00, 'Depleted Reserve', 'OUT_OF_STOCK', 7, 'Carbon Neutral Floors'),
(5, 'EPX-SLT-200', 'Seamless Bio-Polymer Epoxy Resin (Slate Gray)', 5, 'EPOXY_RESIN', 'PAIL_5GAL', 130.00, '5-Gal Pail ($6.50/sq ft loaded)', 2.00, 5.00, 'Chemical Cabinet C', 'LOW_STOCK', 4, 'LEED v4.1 Compliant'),
(6, 'CNC-SAT-14', 'Architectural Polished Concrete Satin Sealant', 4, 'POLISHED_CONCRETE', 'DRUM_55GAL', 1870.00, '55-Gal Industrial Drum ($3.40/sq ft)', 8.00, 2.00, 'Bay 4 Yard', 'IN_STOCK', 0, 'Zero VOC / USDA Approved'),
(7, 'SUB-BAR-02', 'AcoustiGuard Vapor Underlayment', 4, 'UNDERLAYMENT_BARRIER', 'ROLL', 230.00, '200 sq ft / roll ($1.15/sq ft)', 20.00, 15.00, 'Bay 1 Staging', 'IN_STOCK', 4, 'Class 1 Permeance Moisture Sheath'),
(8, 'SL-COMP-50', 'Self-Leveling Compound (50lb)', 4, 'SELF_LEVELING_COMPOUND', 'BAG_50LB', 32.00, '50lb Heavy Duty Bag', 45.00, 20.00, 'Aisle 1 Floor Stacking', 'IN_STOCK', 2, 'Rapid Cure 24h');

-- 4. Equipment
INSERT INTO `equipment` (`id`, `equipment_code`, `name`, `category`, `rental_daily_rate`, `status`, `serial_number`, `last_calibration_date`) VALUES
(1, 'EQ-DEHUM-01', 'LGR 7000 Commercial Dehumidifier', 'DEHUMIDIFICATION', 75.00, 'DEPLOYED_ON_SITE', 'LGR70-88192', '2026-09-15'),
(2, 'EQ-LASER-02', 'Industrial Moisture Laser Array & Mesh Monitor', 'MOISTURE_MONITORING', 75.00, 'DEPLOYED_ON_SITE', 'TRX-LAS-4029', '2026-09-28'),
(3, 'EQ-SANDER-01', 'Continuous Drum Sander 220V', 'DRUM_SANDER', 140.00, 'AVAILABLE', 'DRUM-SND-1092', '2026-08-10'),
(4, 'EQ-AIR-03', 'OmniDry Pro Axial Air Mover (Pair)', 'AIR_MOVER', 45.00, 'DEPLOYED_ON_SITE', 'AIR-MV-5501', '2026-09-15');

-- 5. Projects
INSERT INTO `projects` (`id`, `project_code`, `name`, `client_name`, `client_type`, `jobsite_address`, `stage`, `priority`, `scope_substrate_summary`, `finish_spec_summary`, `gross_area_sqft`, `usable_zones_count`, `contract_total`, `target_margin_pct`, `has_critical_blocker`, `lead_installer_id`, `estimator_id`, `project_manager_id`) VALUES
(1, 'FLR-104', 'Smith Residence - Master Suite & Hallway', 'David & Karen Smith', 'RESIDENTIAL_REMODEL', '2419 Highland Ridge, Los Gatos, CA', 'SUBFLOOR_PREP', 'HIGH', '1,450 sq ft • Plywood over Joist', 'White Oak 7" Select • Bona Traffic HD', 1450.00, 3, 21155.00, 28.50, TRUE, 3, 2, 4),
(2, 'FLR-119', 'Harbor View Offices - Level 2 Suites', 'Harbor Pacific Real Estate', 'COMMERCIAL_FITOUT', '400 Embarcadero Suite 200, San Francisco, CA', 'MATERIALS_ORDERED', 'HIGH', '4,800 sq ft • Suspended Concrete Slab', 'Shaw LVP Commercial Acoustical', 4800.00, 6, 114300.00, 26.00, FALSE, 3, 2, 4),
(3, 'FLR-122', 'Oakland Tech Hub - 4th Floor Open Plan', 'Aetheric Systems Corp', 'COMMERCIAL_TI', '1901 Broadway Floor 4, Oakland, CA', 'ESTIMATING', 'MEDIUM', '6,200 sq ft • Polished Slab + Raised Access', 'Interface Carpet Tile + Polished Concrete', 6200.00, 4, 44520.00, 28.50, FALSE, 3, 2, 1),
(4, 'FLR-125', 'Bellevue Custom Loft - Great Room', 'Alexander Vance', 'BESPOKE_RESIDENTIAL', '88 102nd Ave NE, Bellevue, WA', 'ESTIMATING', 'HIGH', '1,120 sq ft • Soundproof Cork Substrate', 'Herringbone Walnut Prime (90° double-groove)', 1120.00, 2, 18200.00, 32.00, FALSE, 3, 1, 4),
(5, 'FLR-108', 'Highland Towers Penthouse', 'Highland Properties Group', 'COMMERCIAL_FITOUT', '1200 California St, San Francisco, CA', 'SUBFLOOR_PREP', 'URGENT', '3,200 sq ft • Cast Gypsum Underlayment', 'Chevron Engineered European Oak', 3200.00, 5, 49800.00, 27.50, FALSE, 3, 2, 4),
(6, 'FLR-99', 'Presidio Heights Residence', 'Catherine DuMont', 'BESPOKE_RESIDENTIAL', '3400 Washington St, San Francisco, CA', 'INSTALLATION', 'MEDIUM', '2,100 sq ft • Radiantly Heated Slab', 'Herringbone French Oak Double-Stained', 2100.00, 4, 32400.00, 30.00, FALSE, 3, 2, 1);

-- 6. Purchase Orders
INSERT INTO `purchase_orders` (`id`, `po_number`, `project_id`, `supplier_id`, `status`, `carrier_name`, `tracking_number`, `order_date`, `target_delivery_window`, `original_eta`, `revised_eta`, `delay_hours_slip`, `delay_reason`, `dock_bay`, `total_freight_value`, `qc_passed_mc_pct`) VALUES
(1, 'PO-88219', 1, 4, 'TERMINAL_HOLD', 'FedEx Freight', 'TRK-88219-FX', '2026-10-01', 'Bay 3 Quarantine', '2026-10-16 09:00:00', '2026-10-18 14:00:00', 48, 'Terminal Hold: Reno, NV (Weather Chain Restriction)', 'Bay 3 Quarantine', 4600.00, NULL),
(2, 'PO-98421', 2, 1, 'IN_TRANSIT', 'Old Dominion Freight', 'ODFL-449102-CA', '2026-10-02', 'Today 11:30 AM • Bay 2', '2026-10-21 11:30:00', '2026-10-21 11:30:00', 0, NULL, 'Bay 2', 28080.00, NULL),
(3, 'PO-77402', 4, 3, 'DELAYED_CARRIER', 'R+L Carriers', 'RL-993810-US', '2026-10-03', 'Laydown Yard B', '2026-10-17 14:00:00', '2026-10-18 14:00:00', 24, 'Mechanical Breakdown: Incline Axle Replacement', 'Laydown Yard B', 1000.00, NULL),
(4, 'PO-55318', 1, 1, 'DOCKED_UNLOADING', 'Mohawk Direct Fleet', 'TRK-MOH-14', '2026-09-28', 'Docked 08:14 AM • Bay 1', '2026-10-05 08:00:00', '2026-10-05 08:14:00', 0, NULL, 'Bay 1', 14720.00, 8.20);

-- Purchase Order Items
INSERT INTO `purchase_order_items` (`purchase_order_id`, `material_id`, `ordered_quantity`, `received_quantity`, `unit_price`, `status`) VALUES
(1, 7, 20.00, 0.00, 230.00, 'IN_TRANSIT'),
(2, 3, 4800.00, 1920.00, 5.85, 'IN_TRANSIT'),
(3, 2, 8.00, 0.00, 125.00, 'IN_TRANSIT'),
(4, 1, 1600.00, 1600.00, 9.20, 'RECEIVED');

-- 7. Critical Blocker on FLR-104
INSERT INTO `project_blockers` (`id`, `project_id`, `blocker_type`, `severity`, `title`, `description`, `threshold_target`, `current_reading`, `unit_of_measure`, `related_po_id`, `is_resolved`) VALUES
(1, 1, 'MOISTURE_EXCEEDED', 'CRITICAL', 'Critical Dependency: Installation Blocked', 'Cannot proceed to Installation until Subfloor Moisture drops below 12.0% (Current: 14.8%) and AcoustiGuard Vapor Barrier arrives.', 12.00, 14.80, '% MC', 1, FALSE);

-- 8. Estimates (FLR-122 Oakland Tech Hub)
INSERT INTO `estimates` (`id`, `project_id`, `scenario_name`, `formula_version`, `is_primary`, `is_locked`, `gross_area_sqft`, `usable_rooms_zones`, `materials_cost`, `labor_cost`, `equipment_cost`, `modifiers_adder`, `direct_cost`, `overhead_pct`, `overhead_amount`, `target_margin_pct`, `target_gross_profit`, `total_client_quote`) VALUES
(1, 3, 'Base Bid (Scenario A)', 'Formula Lock v3.4', TRUE, TRUE, 6200.00, 4, 40228.00, 7104.00, 975.00, 4836.00, 48307.00, 15.00, 7246.00, 28.50, 17813.00, 44520.00);

-- Estimate Sections
INSERT INTO `estimate_sections` (`id`, `estimate_id`, `section_type`, `title`, `section_cost`, `sort_order`) VALUES
(1, 1, 'SURFACE_MATERIALS', 'Section 1: Surface Materials & Finish Takeoff', 40228.00, 1),
(2, 1, 'LABOR_CREWS', 'Section 2: Labor & Installation Crews', 7104.00, 2),
(3, 1, 'EQUIPMENT_CONDITIONING', 'Section 3: Equipment & Environmental Conditioning', 975.00, 3),
(4, 1, 'MODIFIERS_CONTINGENCY', 'Section 4: Formula Modifiers & Contingency Rules', 4836.00, 4);

-- Estimate Line Items with Waste Modifiers & Crew Composers
INSERT INTO `estimate_line_items` (`section_id`, `item_type`, `title`, `subtitle`, `material_id`, `takeoff_quantity`, `base_rate`, `waste_modifier_pct`, `billed_quantity`, `crew_composition`, `technicians_count`, `estimated_hours`, `blended_hourly_rate`, `equipment_id`, `deployment_days`, `daily_rental_rate`, `modifier_rule_code`, `calculated_subtotal`, `sort_order`) VALUES
-- 1. Materials with +10% Waste Factor
(1, 'MATERIAL_TAKEOFF', 'Interface Commercial Carpet Tile', 'Main Open Workspace Zone A & B (Nylon 6,6)', 4, 4800.00, 4.85, 10.00, 5280.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 25608.00, 1),
(1, 'MATERIAL_TAKEOFF', 'Polished Concrete & Epoxy Sealant', 'Executive Boardrooms & Breakout Hub', 6, 1400.00, 6.50, 0.00, 1400.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9100.00, 2),
(1, 'MATERIAL_TAKEOFF', 'AcoustiGuard Vapor Underlayment', 'Under-carpet dampening roll', 7, 4800.00, 1.15, 0.00, 4800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5520.00, 3),
-- 2. Labor Crews
(2, 'LABOR_CREW', 'Lead Subfloor Prep Crew', 'Grinding, crack repairs, vacuuming', NULL, NULL, NULL, 0.00, NULL, '3 Technicians', 3, 16.00, 52.00, NULL, NULL, NULL, NULL, 2496.00, 1),
(2, 'LABOR_CREW', 'Commercial Tile Installers', 'Adhesive layout, pattern setting', NULL, NULL, NULL, 0.00, NULL, '4 Installers', 4, 24.00, 48.00, NULL, NULL, NULL, NULL, 4608.00, 2),
-- 3. Equipment
(3, 'EQUIPMENT_UNIT', 'Dehumidifier & Moisture Laser Array', 'Continuous slab monitoring unit (3 Days)', NULL, NULL, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, 2, 5.00, 75.00, NULL, 375.00, 1),
-- 4. Modifiers
(4, 'CONTINGENCY_RULE', 'High RH Surcharge Modifier (+12%)', 'Triggered by high RH reading on Floor 4 Core slab test (14.8%)', NULL, NULL, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#MR-42', 4836.00, 1);

-- 9. Telemetry Sessions (FLR-104)
INSERT INTO `telemetry_inspection_sessions` (`id`, `project_id`, `inspector_user_id`, `session_code`, `inspection_date`, `calibrated_device_info`, `ambient_temp_f`, `ambient_rh_pct`, `average_moisture_content_pct`, `target_moisture_threshold_pct`, `moisture_delta_pct`, `overall_compliance_status`, `is_signoff_locked`, `prescribed_mitigation`, `superintendent_notes`) VALUES
(1, 1, 3, 'TRX-SCAN-v4.2-FLR104', '2026-10-05 08:42:00', 'Tramex CMEX5 #TX-4409', 68.0, 45.0, 13.90, 12.00, 1.90, 'FAIL_STOP_WORK_ORDER', TRUE, 'Deploy LGR 7000 Dehumidifier + 2 Air Movers for 24h. Re-testing scheduled for tomorrow 08:00 AM.', 'Subfloor concrete slab near north exterior wall still retaining residual dampness. Extended industrial dehumidifier runtime by 24h. Re-testing scheduled for tomorrow 08:00 AM.');

-- Telemetry Test Points
INSERT INTO `telemetry_reading_points` (`session_id`, `room_zone`, `point_label`, `location_description`, `method_depth`, `moisture_content_pct`, `equilibrium_rh_pct`, `status`) VALUES
(1, 'Master Bedroom', 'A', 'North Exterior Wall', 'ASTM F2170 probe depth 40mm Sleeve', 14.80, 86.00, 'FAIL_HIGH'),
(1, 'Master Bedroom', 'B', 'Center Subfloor Field', 'Pinless Capacitive Scan • Stable Core', 11.40, 72.00, 'PASS_OK'),
(1, 'Master Bedroom', 'C', 'South Threshold Seam', 'Direct Pin Probe / Deep', 15.50, 89.00, 'FAIL_CRITICAL'),
(1, 'Hallway Connector', 'H1', 'Main Entry Corridor', 'Pinless Capacitive Scan', 12.10, 74.00, 'PASS_OK'),
(1, 'Walk-in Closet', 'W1', 'Interior Perimeter', 'Pinless Capacitive Scan', 10.80, 68.00, 'PASS_OK');

-- Acclimatization Log
INSERT INTO `material_acclimatization_logs` (`project_id`, `material_id`, `purchase_order_id`, `staging_bay_location`, `staged_quantity`, `wood_moisture_content_pct`, `subfloor_moisture_content_pct`, `differential_pct`, `max_allowed_differential_pct`, `acclimatization_day_current`, `acclimatization_days_required`, `status`, `notes`) VALUES
(1, 1, 4, 'Bay 1 (Master Wing)', 1600.00, 8.20, 13.90, 5.70, 2.00, 2, 3, 'ON_TRACK', 'Wood-to-subfloor differential currently 5.7% (Max allowed: 2.0%). Subfloor drying required before fastener installation.'),
(1, 7, 1, 'Bay 3 Quarantine (Pending Delivery)', 20.00, 0.00, 13.90, 0.00, 2.00, 0, 3, 'SUPPLY_CHAIN_DELAY', 'Delayed in transit (FedEx TRK-88219). Revised ETA Oct 18.'),
(1, 2, 3, 'Climate Vestibule (68°F / 45% RH)', 8.00, 0.00, 13.90, 0.00, 2.00, 2, 2, 'IN_STOCK_COMPLIANT', '8 Gallons received from local warehouse reserve. Staged in climate vestibule.');
