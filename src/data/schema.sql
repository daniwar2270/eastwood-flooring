-- =============================================================================
-- FloorOps Pro - Enterprise Logistics, Estimating & Telemetry Database Schema
-- Dialect: MySQL 8.0+ / InnoDB
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. SYSTEM USERS & ROLES
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `role` ENUM('ADMIN', 'OPS_LEAD', 'ESTIMATOR', 'LEAD_INSTALLER', 'PROJECT_MANAGER', 'QC_SPECIALIST') NOT NULL DEFAULT 'ESTIMATOR',
  `avatar_initials` VARCHAR(4) NOT NULL,
  `phone` VARCHAR(32) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Company personnel, estimators, installers, and operations leads';

-- -----------------------------------------------------------------------------
-- 2. PROJECTS & KANBAN PIPELINE
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_code` VARCHAR(32) NOT NULL COMMENT 'Human-readable ticket code e.g. FLR-104, FLR-119',
  `name` VARCHAR(255) NOT NULL COMMENT 'e.g. Smith Residence - Master Suite & Hallway',
  `client_name` VARCHAR(150) NOT NULL,
  `client_type` ENUM('RESIDENTIAL_REMODEL', 'COMMERCIAL_FITOUT', 'BESPOKE_RESIDENTIAL', 'COMMERCIAL_TI') NOT NULL DEFAULT 'COMMERCIAL_FITOUT',
  `jobsite_address` VARCHAR(255) NOT NULL,
  `stage` ENUM('ESTIMATING', 'MATERIALS_ORDERED', 'SUBFLOOR_PREP', 'INSTALLATION', 'FINISHING_CURING', 'COMPLETED') NOT NULL DEFAULT 'ESTIMATING',
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
  `scope_substrate_summary` VARCHAR(255) NULL COMMENT 'e.g. 1,450 sq ft • Plywood over Joist',
  `finish_spec_summary` VARCHAR(255) NULL COMMENT 'e.g. White Oak 7" Select • Bona Traffic HD',
  `gross_area_sqft` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `usable_zones_count` INT UNSIGNED NOT NULL DEFAULT 1,
  `contract_total` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `target_margin_pct` DECIMAL(5,2) NOT NULL DEFAULT 25.00 COMMENT 'e.g. 28.50%',
  `has_critical_blocker` BOOLEAN NOT NULL DEFAULT FALSE,
  `lead_installer_id` BIGINT UNSIGNED NULL,
  `estimator_id` BIGINT UNSIGNED NULL,
  `project_manager_id` BIGINT UNSIGNED NULL,
  `start_date` DATE NULL,
  `target_completion_date` DATE NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_projects_code` (`project_code`),
  KEY `idx_projects_stage` (`stage`),
  KEY `idx_projects_priority` (`priority`),
  KEY `idx_projects_has_blocker` (`has_critical_blocker`),
  KEY `idx_projects_lead_installer` (`lead_installer_id`),
  KEY `idx_projects_estimator` (`estimator_id`),
  KEY `idx_projects_pm` (`project_manager_id`),
  CONSTRAINT `fk_projects_lead_installer` FOREIGN KEY (`lead_installer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_projects_estimator` FOREIGN KEY (`estimator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_projects_pm` FOREIGN KEY (`project_manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Commercial and residential flooring jobsites';

DROP TABLE IF EXISTS `project_stage_history`;
CREATE TABLE `project_stage_history` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `from_stage` ENUM('ESTIMATING', 'MATERIALS_ORDERED', 'SUBFLOOR_PREP', 'INSTALLATION', 'FINISHING_CURING', 'COMPLETED') NULL,
  `to_stage` ENUM('ESTIMATING', 'MATERIALS_ORDERED', 'SUBFLOOR_PREP', 'INSTALLATION', 'FINISHING_CURING', 'COMPLETED') NOT NULL,
  `changed_by_user_id` BIGINT UNSIGNED NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_stage_history_project` (`project_id`),
  CONSTRAINT `fk_stage_history_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_stage_history_user` FOREIGN KEY (`changed_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Kanban stage transitions audit log';

-- -----------------------------------------------------------------------------
-- 3. CATALOG: SUPPLIERS, MATERIALS & INVENTORY
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(32) NOT NULL COMMENT 'e.g. MOHAWK, SHAW, BONA, LOBA_WAKOL',
  `name` VARCHAR(150) NOT NULL COMMENT 'e.g. Mohawk Commercial, Bona Commercial US',
  `contact_name` VARCHAR(100) NULL,
  `contact_email` VARCHAR(191) NULL,
  `contact_phone` VARCHAR(32) NULL,
  `default_lead_time_days` INT UNSIGNED NOT NULL DEFAULT 3,
  `address` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_suppliers_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flooring distributors and chemical manufacturers';

DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(64) NOT NULL COMMENT 'e.g. WO-PLK-501, BT-HD-04, LVP-CHEV-88',
  `name` VARCHAR(200) NOT NULL COMMENT 'e.g. Select White Oak 5-inch Plank, Bona Traffic HD Extra Matte',
  `supplier_id` BIGINT UNSIGNED NOT NULL,
  `category` ENUM('HARDWOOD_PLANK', 'LVP_ENGINEERED', 'CARPET_TILE', 'EPOXY_RESIN', 'FINISH_SEALANT', 'POLISHED_CONCRETE', 'UNDERLAYMENT_BARRIER', 'SELF_LEVELING_COMPOUND') NOT NULL,
  `unit_of_measure` ENUM('SQ_FT', 'GALLON', 'PAIL_5GAL', 'BAG_50LB', 'DRUM_55GAL', 'ROLL', 'CARTON') NOT NULL DEFAULT 'SQ_FT',
  `unit_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Standard catalog purchase or base billing rate',
  `package_spec` VARCHAR(100) NULL COMMENT 'e.g. 20 sq ft carton, Coverage ~400 sq ft/gal',
  `stock_quantity` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `safety_stock_threshold` DECIMAL(10,2) NOT NULL DEFAULT 10.00,
  `warehouse_location` VARCHAR(100) NOT NULL DEFAULT 'Main Warehouse' COMMENT 'e.g. Main Whs - Aisle 4B, Laydown Bay 2',
  `status` ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK') NOT NULL DEFAULT 'IN_STOCK',
  `lead_time_days` INT UNSIGNED NOT NULL DEFAULT 2,
  `voc_compliance` VARCHAR(64) NULL COMMENT 'e.g. LEED v4.1 Compliant, Ultra-Low VOC',
  `image_url` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_materials_sku` (`sku`),
  KEY `idx_materials_supplier` (`supplier_id`),
  KEY `idx_materials_category` (`category`),
  KEY `idx_materials_status` (`status`),
  CONSTRAINT `fk_materials_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Catalog materials, stock reserves, and reorder thresholds';

DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `equipment_code` VARCHAR(32) NOT NULL COMMENT 'e.g. EQ-DEHUM-01, EQ-SANDER-04',
  `name` VARCHAR(150) NOT NULL COMMENT 'e.g. LGR 7000 Dehumidifier, Continuous Drum Sander',
  `category` ENUM('DEHUMIDIFICATION', 'MOISTURE_MONITORING', 'DRUM_SANDER', 'AIR_MOVER', 'HEPA_VACUUM', 'SURFACE_GRINDER') NOT NULL,
  `rental_daily_rate` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `status` ENUM('AVAILABLE', 'DEPLOYED_ON_SITE', 'MAINTENANCE_CALIBRATION') NOT NULL DEFAULT 'AVAILABLE',
  `current_project_id` BIGINT UNSIGNED NULL,
  `serial_number` VARCHAR(100) NULL,
  `last_calibration_date` DATE NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_equipment_code` (`equipment_code`),
  KEY `idx_equipment_project` (`current_project_id`),
  KEY `idx_equipment_status` (`status`),
  CONSTRAINT `fk_equipment_project` FOREIGN KEY (`current_project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Heavy equipment, floor sanders, dehumidifiers and laser arrays';

-- -----------------------------------------------------------------------------
-- 4. LOGISTICS: PURCHASE ORDERS & INBOUND DELIVERIES
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `purchase_orders`;
CREATE TABLE `purchase_orders` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `po_number` VARCHAR(32) NOT NULL COMMENT 'e.g. PO-88219, PO-98421, PO-77402, PO-55318',
  `project_id` BIGINT UNSIGNED NOT NULL,
  `supplier_id` BIGINT UNSIGNED NOT NULL,
  `status` ENUM('DRAFT', 'ORDERED', 'IN_TRANSIT', 'DELAYED_CARRIER', 'TERMINAL_HOLD', 'DOCKED_UNLOADING', 'RECEIVED_QC_PASSED', 'QUARANTINED', 'CANCELLED') NOT NULL DEFAULT 'ORDERED',
  `carrier_name` VARCHAR(100) NULL COMMENT 'e.g. FedEx Freight, Old Dominion, R+L Carriers, Mohawk Direct Fleet',
  `tracking_number` VARCHAR(100) NULL COMMENT 'e.g. TRK-88219-FX, ODFL-449102-CA',
  `bill_of_lading` VARCHAR(100) NULL,
  `order_date` DATE NOT NULL,
  `target_delivery_window` VARCHAR(100) NULL COMMENT 'e.g. Today 11:30 AM • Bay 2',
  `original_eta` DATETIME NULL,
  `revised_eta` DATETIME NULL,
  `delay_hours_slip` INT NOT NULL DEFAULT 0 COMMENT 'Positive number of slipped hours e.g. +48h, +24h',
  `delay_reason` VARCHAR(255) NULL COMMENT 'e.g. Terminal Hold: Reno, NV or Mechanical Breakdown',
  `dock_bay` VARCHAR(50) NULL COMMENT 'e.g. Bay 1, Bay 2, Bay 3 Quarantine, Laydown Yard B',
  `total_freight_value` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `driver_name` VARCHAR(100) NULL,
  `qc_passed_mc_pct` DECIMAL(5,2) NULL COMMENT 'Subfloor/material moisture verification reading on dock e.g. 8.2% MC',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_po_number` (`po_number`),
  KEY `idx_po_project` (`project_id`),
  KEY `idx_po_supplier` (`supplier_id`),
  KEY `idx_po_status` (`status`),
  CONSTRAINT `fk_po_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_po_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Multi-vendor purchase orders and freight dispatch tracking';

DROP TABLE IF EXISTS `purchase_order_items`;
CREATE TABLE `purchase_order_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase_order_id` BIGINT UNSIGNED NOT NULL,
  `material_id` BIGINT UNSIGNED NOT NULL,
  `ordered_quantity` DECIMAL(10,2) NOT NULL,
  `received_quantity` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `total_cost` DECIMAL(12,2) GENERATED ALWAYS AS (`ordered_quantity` * `unit_price`) STORED,
  `status` ENUM('ORDERED', 'IN_TRANSIT', 'RECEIVED', 'QUARANTINED', 'SHORT_SHIPPED') NOT NULL DEFAULT 'ORDERED',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_po_items_po` (`purchase_order_id`),
  KEY `idx_po_items_material` (`material_id`),
  CONSTRAINT `fk_po_items_po` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_po_items_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Line items associated with supplier purchase orders';

-- -----------------------------------------------------------------------------
-- 5. CRITICAL DEPENDENCIES & BLOCKERS
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `project_blockers`;
CREATE TABLE `project_blockers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `blocker_type` ENUM('MOISTURE_EXCEEDED', 'MATERIAL_DELAY', 'CURING_GATE_ACTIVE', 'EQUIPMENT_DEFICIT', 'ACCLIMATIZATION_HOLD', 'STRUCTURAL_DEFECT') NOT NULL,
  `severity` ENUM('CRITICAL', 'HIGH', 'WARNING', 'INFO') NOT NULL DEFAULT 'CRITICAL',
  `title` VARCHAR(150) NOT NULL COMMENT 'e.g. Critical Dependency: Installation Blocked',
  `description` TEXT NOT NULL COMMENT 'e.g. Subfloor moisture must drop below 12.0% across all test points (Current: 14.8%)',
  `threshold_target` DECIMAL(8,2) NULL COMMENT 'e.g. 12.00 (Max allowed moisture %)',
  `current_reading` DECIMAL(8,2) NULL COMMENT 'e.g. 14.80 (% measured)',
  `unit_of_measure` VARCHAR(32) NULL DEFAULT '% MC',
  `related_po_id` BIGINT UNSIGNED NULL COMMENT 'Linked PO causing material freight delay',
  `is_resolved` BOOLEAN NOT NULL DEFAULT FALSE,
  `resolved_at` TIMESTAMP NULL,
  `resolved_by_user_id` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_blockers_project` (`project_id`),
  KEY `idx_blockers_severity` (`severity`),
  KEY `idx_blockers_po` (`related_po_id`),
  CONSTRAINT `fk_blockers_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_blockers_po` FOREIGN KEY (`related_po_id`) REFERENCES `purchase_orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_blockers_resolved_by` FOREIGN KEY (`resolved_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Critical dependency flags halting installation stages';

-- -----------------------------------------------------------------------------
-- 6. DYNAMIC ESTIMATOR & FORMULA ENGINE
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `estimates`;
CREATE TABLE `estimates` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `scenario_name` VARCHAR(100) NOT NULL DEFAULT 'Base Bid (Scenario A)',
  `formula_version` VARCHAR(32) NOT NULL DEFAULT 'Formula Lock v3.4',
  `is_primary` BOOLEAN NOT NULL DEFAULT TRUE,
  `is_locked` BOOLEAN NOT NULL DEFAULT FALSE,
  `gross_area_sqft` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `usable_rooms_zones` INT UNSIGNED NOT NULL DEFAULT 1,
  `materials_cost` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `labor_cost` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `equipment_cost` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `modifiers_adder` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `direct_cost` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `overhead_pct` DECIMAL(5,2) NOT NULL DEFAULT 15.00,
  `overhead_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `target_margin_pct` DECIMAL(5,2) NOT NULL DEFAULT 28.50,
  `target_gross_profit` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `total_client_quote` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `approved_at` TIMESTAMP NULL,
  `approved_by_user_id` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_estimates_project` (`project_id`),
  CONSTRAINT `fk_estimates_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_estimates_approver` FOREIGN KEY (`approved_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Dynamic project estimate bids and calculation scenarios';

DROP TABLE IF EXISTS `estimate_sections`;
CREATE TABLE `estimate_sections` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `estimate_id` BIGINT UNSIGNED NOT NULL,
  `section_type` ENUM('SURFACE_MATERIALS', 'LABOR_CREWS', 'EQUIPMENT_CONDITIONING', 'MODIFIERS_CONTINGENCY') NOT NULL,
  `title` VARCHAR(150) NOT NULL COMMENT 'e.g. Section 1: Surface Materials & Finish Takeoff',
  `section_cost` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `sort_order` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_est_sections_estimate` (`estimate_id`),
  CONSTRAINT `fk_est_sections_estimate` FOREIGN KEY (`estimate_id`) REFERENCES `estimates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Logical calculation groups inside an estimate';

DROP TABLE IF EXISTS `estimate_line_items`;
CREATE TABLE `estimate_line_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_id` BIGINT UNSIGNED NOT NULL,
  `item_type` ENUM('MATERIAL_TAKEOFF', 'LABOR_CREW', 'EQUIPMENT_UNIT', 'CONTINGENCY_RULE') NOT NULL,
  `title` VARCHAR(200) NOT NULL COMMENT 'e.g. Interface Commercial Carpet Tile or Lead Subfloor Prep Crew',
  `subtitle` VARCHAR(255) NULL COMMENT 'e.g. Main Open Workspace Zone A & B',
  
  -- Material calculations
  `material_id` BIGINT UNSIGNED NULL,
  `takeoff_quantity` DECIMAL(10,2) NULL COMMENT 'Net takeoff measurement from laser plan (sq ft)',
  `base_rate` DECIMAL(10,2) NULL COMMENT 'Unit price per sq ft / gal',
  `waste_modifier_pct` DECIMAL(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Standard waste adder e.g. +10.00%',
  `billed_quantity` DECIMAL(10,2) NULL COMMENT 'Computed billed amount: takeoff * (1 + waste%)',
  
  -- Labor crew calculations
  `crew_composition` VARCHAR(100) NULL COMMENT 'e.g. 3 Technicians or 4 Installers',
  `technicians_count` INT UNSIGNED NULL,
  `estimated_hours` DECIMAL(8,2) NULL COMMENT 'e.g. 16.0 hrs',
  `blended_hourly_rate` DECIMAL(10,2) NULL COMMENT 'e.g. $52.00 / tech·hr',
  
  -- Equipment calculations
  `equipment_id` BIGINT UNSIGNED NULL,
  `deployment_days` DECIMAL(8,2) NULL COMMENT 'e.g. 5 Days',
  `daily_rental_rate` DECIMAL(10,2) NULL COMMENT 'e.g. $75.00 / day',
  `calibration_surcharge` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  
  -- Modifiers and formulas
  `modifier_rule_code` VARCHAR(50) NULL COMMENT 'e.g. #MR-42 (Moisture Risk Contingency)',
  `calculated_subtotal` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `sort_order` INT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_line_items_section` (`section_id`),
  KEY `idx_line_items_material` (`material_id`),
  KEY `idx_line_items_equipment` (`equipment_id`),
  CONSTRAINT `fk_line_items_section` FOREIGN KEY (`section_id`) REFERENCES `estimate_sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_line_items_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_line_items_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Granular formula line items supporting +10% waste modifiers and crew composition';

-- -----------------------------------------------------------------------------
-- 7. JOBSITE TELEMETRY & ENVIRONMENTAL MOISTURE READINGS
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `telemetry_inspection_sessions`;
CREATE TABLE `telemetry_inspection_sessions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `inspector_user_id` BIGINT UNSIGNED NOT NULL,
  `session_code` VARCHAR(64) NOT NULL COMMENT 'e.g. TRX-SCAN-v4.2-FLR104',
  `inspection_date` DATETIME NOT NULL,
  `calibrated_device_info` VARCHAR(150) NOT NULL COMMENT 'e.g. Tramex CMEX5 #TX-4409',
  `ambient_temp_f` DECIMAL(5,1) NOT NULL DEFAULT 68.0,
  `ambient_rh_pct` DECIMAL(5,1) NOT NULL DEFAULT 45.0,
  `average_moisture_content_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 13.90',
  `target_moisture_threshold_pct` DECIMAL(5,2) NOT NULL DEFAULT 12.00,
  `moisture_delta_pct` DECIMAL(5,2) NOT NULL DEFAULT 1.90 COMMENT '+1.90% above threshold',
  `overall_compliance_status` ENUM('PASS_COMPLIANT', 'FAIL_STOP_WORK_ORDER', 'PENDING_RETEST') NOT NULL DEFAULT 'FAIL_STOP_WORK_ORDER',
  `is_signoff_locked` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Cryptographic or programmatic lock on installation phase',
  `prescribed_mitigation` TEXT NULL COMMENT 'e.g. Deploy LGR 7000 Dehumidifier + 2 Air Movers for 24h',
  `superintendent_notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telemetry_project` (`project_id`),
  KEY `idx_telemetry_inspector` (`inspector_user_id`),
  CONSTRAINT `fk_telemetry_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_telemetry_inspector` FOREIGN KEY (`inspector_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daily on-site subfloor testing inspection headers';

DROP TABLE IF EXISTS `telemetry_reading_points`;
CREATE TABLE `telemetry_reading_points` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_id` BIGINT UNSIGNED NOT NULL,
  `room_zone` VARCHAR(100) NOT NULL COMMENT 'e.g. Master Bedroom, Hallway Connector, Walk-in Closet',
  `point_label` VARCHAR(10) NOT NULL COMMENT 'e.g. A, B, C',
  `location_description` VARCHAR(150) NOT NULL COMMENT 'e.g. North Exterior Wall, Center Subfloor Field, South Threshold Seam',
  `method_depth` VARCHAR(100) NOT NULL COMMENT 'e.g. ASTM F2170 / 40mm Sleeve, Pinless Capacitive Scan',
  `moisture_content_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 14.80, 11.40, 15.50',
  `equilibrium_rh_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 86.00, 72.00, 89.00',
  `status` ENUM('PASS_OK', 'FAIL_HIGH', 'FAIL_CRITICAL') NOT NULL,
  `photo_evidence_url` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reading_points_session` (`session_id`),
  CONSTRAINT `fk_reading_points_session` FOREIGN KEY (`session_id`) REFERENCES `telemetry_inspection_sessions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Granular probe test points for ASTM F2170 compliance';

DROP TABLE IF EXISTS `material_acclimatization_logs`;
CREATE TABLE `material_acclimatization_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `material_id` BIGINT UNSIGNED NOT NULL,
  `purchase_order_id` BIGINT UNSIGNED NULL,
  `staging_bay_location` VARCHAR(100) NOT NULL COMMENT 'e.g. Bay 1 (Master Wing), Climate Vestibule',
  `staged_quantity` DECIMAL(10,2) NOT NULL,
  `wood_moisture_content_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 8.20% MC',
  `subfloor_moisture_content_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 13.90% MC',
  `differential_pct` DECIMAL(5,2) NOT NULL COMMENT 'e.g. 5.70% (Must be <= 2.0%)',
  `max_allowed_differential_pct` DECIMAL(5,2) NOT NULL DEFAULT 2.00,
  `acclimatization_day_current` INT UNSIGNED NOT NULL DEFAULT 2,
  `acclimatization_days_required` INT UNSIGNED NOT NULL DEFAULT 3,
  `ambient_temp_f` DECIMAL(5,1) NOT NULL DEFAULT 68.0,
  `ambient_rh_pct` DECIMAL(5,1) NOT NULL DEFAULT 45.0,
  `status` ENUM('ON_TRACK', 'SUPPLY_CHAIN_DELAY', 'IN_STOCK_COMPLIANT', 'DIFFERENTIAL_FAIL') NOT NULL DEFAULT 'ON_TRACK',
  `notes` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_acclim_project` (`project_id`),
  KEY `idx_acclim_material` (`material_id`),
  KEY `idx_acclim_po` (`purchase_order_id`),
  CONSTRAINT `fk_acclim_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_acclim_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_acclim_po` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Wood-to-subfloor moisture differential acclimatization tracking';

SET FOREIGN_KEY_CHECKS = 1;
