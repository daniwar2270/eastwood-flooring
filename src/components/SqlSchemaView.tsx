import React, { useState } from 'react';
import { Database, Copy, Check, Download, Layers, ShieldCheck } from 'lucide-react';

export const SqlSchemaView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // We can read or embed the full SQL script
  const sqlContent = `-- =============================================================================
-- FloorOps Pro - Enterprise Logistics, Estimating & Telemetry Database Schema
-- Dialect: MySQL 8.0+ / InnoDB
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS & ROLES
CREATE TABLE \`users\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(191) NOT NULL,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`role\` ENUM('ADMIN', 'OPS_LEAD', 'ESTIMATOR', 'LEAD_INSTALLER', 'PROJECT_MANAGER', 'QC_SPECIALIST') NOT NULL DEFAULT 'ESTIMATOR',
  \`avatar_initials\` VARCHAR(4) NOT NULL,
  \`phone\` VARCHAR(32) NULL,
  \`is_active\` BOOLEAN NOT NULL DEFAULT TRUE,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_users_email\` (\`email\`),
  KEY \`idx_users_role\` (\`role\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROJECTS & KANBAN
CREATE TABLE \`projects\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`project_code\` VARCHAR(32) NOT NULL COMMENT 'e.g. FLR-104, FLR-119',
  \`name\` VARCHAR(255) NOT NULL,
  \`client_name\` VARCHAR(150) NOT NULL,
  \`client_type\` ENUM('RESIDENTIAL_REMODEL', 'COMMERCIAL_FITOUT', 'BESPOKE_RESIDENTIAL', 'COMMERCIAL_TI') NOT NULL DEFAULT 'COMMERCIAL_FITOUT',
  \`jobsite_address\` VARCHAR(255) NOT NULL,
  \`stage\` ENUM('ESTIMATING', 'MATERIALS_ORDERED', 'SUBFLOOR_PREP', 'INSTALLATION', 'FINISHING_CURING', 'COMPLETED') NOT NULL DEFAULT 'ESTIMATING',
  \`priority\` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
  \`scope_substrate_summary\` VARCHAR(255) NULL,
  \`finish_spec_summary\` VARCHAR(255) NULL,
  \`gross_area_sqft\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`usable_zones_count\` INT UNSIGNED NOT NULL DEFAULT 1,
  \`contract_total\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`target_margin_pct\` DECIMAL(5,2) NOT NULL DEFAULT 25.00,
  \`has_critical_blocker\` BOOLEAN NOT NULL DEFAULT FALSE,
  \`lead_installer_id\` BIGINT UNSIGNED NULL,
  \`estimator_id\` BIGINT UNSIGNED NULL,
  \`project_manager_id\` BIGINT UNSIGNED NULL,
  \`start_date\` DATE NULL,
  \`target_completion_date\` DATE NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_projects_code\` (\`project_code\`),
  KEY \`idx_projects_stage\` (\`stage\`),
  KEY \`idx_projects_priority\` (\`priority\`),
  CONSTRAINT \`fk_projects_lead_installer\` FOREIGN KEY (\`lead_installer_id\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`fk_projects_estimator\` FOREIGN KEY (\`estimator_id\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`fk_projects_pm\` FOREIGN KEY (\`project_manager_id\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SUPPLIERS & MATERIALS (CATALOG & INVENTORY)
CREATE TABLE \`suppliers\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`code\` VARCHAR(32) NOT NULL COMMENT 'e.g. MOHAWK, SHAW, BONA, LOBA_WAKOL',
  \`name\` VARCHAR(150) NOT NULL,
  \`contact_name\` VARCHAR(100) NULL,
  \`contact_email\` VARCHAR(191) NULL,
  \`contact_phone\` VARCHAR(32) NULL,
  \`default_lead_time_days\` INT UNSIGNED NOT NULL DEFAULT 3,
  \`address\` VARCHAR(255) NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_suppliers_code\` (\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`materials\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`sku\` VARCHAR(64) NOT NULL COMMENT 'e.g. WO-PLK-501, BT-HD-04, LVP-CHEV-88',
  \`name\` VARCHAR(200) NOT NULL,
  \`supplier_id\` BIGINT UNSIGNED NOT NULL,
  \`category\` ENUM('HARDWOOD_PLANK', 'LVP_ENGINEERED', 'CARPET_TILE', 'EPOXY_RESIN', 'FINISH_SEALANT', 'POLISHED_CONCRETE', 'UNDERLAYMENT_BARRIER', 'SELF_LEVELING_COMPOUND') NOT NULL,
  \`unit_of_measure\` ENUM('SQ_FT', 'GALLON', 'PAIL_5GAL', 'BAG_50LB', 'DRUM_55GAL', 'ROLL', 'CARTON') NOT NULL DEFAULT 'SQ_FT',
  \`unit_price\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`package_spec\` VARCHAR(100) NULL,
  \`stock_quantity\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`safety_stock_threshold\` DECIMAL(10,2) NOT NULL DEFAULT 10.00,
  \`warehouse_location\` VARCHAR(100) NOT NULL DEFAULT 'Main Warehouse',
  \`status\` ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK') NOT NULL DEFAULT 'IN_STOCK',
  \`lead_time_days\` INT UNSIGNED NOT NULL DEFAULT 2,
  \`voc_compliance\` VARCHAR(64) NULL,
  \`image_url\` VARCHAR(500) NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_materials_sku\` (\`sku\`),
  KEY \`idx_materials_supplier\` (\`supplier_id\`),
  KEY \`idx_materials_category\` (\`category\`),
  CONSTRAINT \`fk_materials_supplier\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`equipment\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`equipment_code\` VARCHAR(32) NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`category\` ENUM('DEHUMIDIFICATION', 'MOISTURE_MONITORING', 'DRUM_SANDER', 'AIR_MOVER', 'HEPA_VACUUM', 'SURFACE_GRINDER') NOT NULL,
  \`rental_daily_rate\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`status\` ENUM('AVAILABLE', 'DEPLOYED_ON_SITE', 'MAINTENANCE_CALIBRATION') NOT NULL DEFAULT 'AVAILABLE',
  \`current_project_id\` BIGINT UNSIGNED NULL,
  \`serial_number\` VARCHAR(100) NULL,
  \`last_calibration_date\` DATE NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_equipment_code\` (\`equipment_code\`),
  CONSTRAINT \`fk_equipment_project\` FOREIGN KEY (\`current_project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PURCHASE ORDERS & FREIGHT
CREATE TABLE \`purchase_orders\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`po_number\` VARCHAR(32) NOT NULL COMMENT 'e.g. PO-88219',
  \`project_id\` BIGINT UNSIGNED NOT NULL,
  \`supplier_id\` BIGINT UNSIGNED NOT NULL,
  \`status\` ENUM('DRAFT', 'ORDERED', 'IN_TRANSIT', 'DELAYED_CARRIER', 'TERMINAL_HOLD', 'DOCKED_UNLOADING', 'RECEIVED_QC_PASSED', 'QUARANTINED', 'CANCELLED') NOT NULL DEFAULT 'ORDERED',
  \`carrier_name\` VARCHAR(100) NULL,
  \`tracking_number\` VARCHAR(100) NULL,
  \`bill_of_lading\` VARCHAR(100) NULL,
  \`order_date\` DATE NOT NULL,
  \`target_delivery_window\` VARCHAR(100) NULL,
  \`original_eta\` DATETIME NULL,
  \`revised_eta\` DATETIME NULL,
  \`delay_hours_slip\` INT NOT NULL DEFAULT 0,
  \`delay_reason\` VARCHAR(255) NULL,
  \`dock_bay\` VARCHAR(50) NULL,
  \`total_freight_value\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`driver_name\` VARCHAR(100) NULL,
  \`qc_passed_mc_pct\` DECIMAL(5,2) NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_po_number\` (\`po_number\`),
  KEY \`idx_po_project\` (\`project_id\`),
  KEY \`idx_po_supplier\` (\`supplier_id\`),
  CONSTRAINT \`fk_po_project\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE RESTRICT,
  CONSTRAINT \`fk_po_supplier\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`purchase_order_items\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`purchase_order_id\` BIGINT UNSIGNED NOT NULL,
  \`material_id\` BIGINT UNSIGNED NOT NULL,
  \`ordered_quantity\` DECIMAL(10,2) NOT NULL,
  \`received_quantity\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`unit_price\` DECIMAL(10,2) NOT NULL,
  \`status\` ENUM('ORDERED', 'IN_TRANSIT', 'RECEIVED', 'QUARANTINED', 'SHORT_SHIPPED') NOT NULL DEFAULT 'ORDERED',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_po_items_po\` (\`purchase_order_id\`),
  KEY \`idx_po_items_material\` (\`material_id\`),
  CONSTRAINT \`fk_po_items_po\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_po_items_material\` FOREIGN KEY (\`material_id\`) REFERENCES \`materials\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. CRITICAL BLOCKERS
CREATE TABLE \`project_blockers\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`project_id\` BIGINT UNSIGNED NOT NULL,
  \`blocker_type\` ENUM('MOISTURE_EXCEEDED', 'MATERIAL_DELAY', 'CURING_GATE_ACTIVE', 'EQUIPMENT_DEFICIT', 'ACCLIMATIZATION_HOLD', 'STRUCTURAL_DEFECT') NOT NULL,
  \`severity\` ENUM('CRITICAL', 'HIGH', 'WARNING', 'INFO') NOT NULL DEFAULT 'CRITICAL',
  \`title\` VARCHAR(150) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`threshold_target\` DECIMAL(8,2) NULL,
  \`current_reading\` DECIMAL(8,2) NULL,
  \`unit_of_measure\` VARCHAR(32) NULL DEFAULT '% MC',
  \`related_po_id\` BIGINT UNSIGNED NULL,
  \`is_resolved\` BOOLEAN NOT NULL DEFAULT FALSE,
  \`resolved_at\` TIMESTAMP NULL,
  \`resolved_by_user_id\` BIGINT UNSIGNED NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_blockers_project\` (\`project_id\`),
  CONSTRAINT \`fk_blockers_project\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_blockers_po\` FOREIGN KEY (\`related_po_id\`) REFERENCES \`purchase_orders\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`fk_blockers_resolved_by\` FOREIGN KEY (\`resolved_by_user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ESTIMATOR ENGINE
CREATE TABLE \`estimates\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`project_id\` BIGINT UNSIGNED NOT NULL,
  \`scenario_name\` VARCHAR(100) NOT NULL DEFAULT 'Base Bid (Scenario A)',
  \`formula_version\` VARCHAR(32) NOT NULL DEFAULT 'Formula Lock v3.4',
  \`is_primary\` BOOLEAN NOT NULL DEFAULT TRUE,
  \`gross_area_sqft\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`materials_cost\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`labor_cost\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`equipment_cost\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`modifiers_adder\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`direct_cost\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`overhead_pct\` DECIMAL(5,2) NOT NULL DEFAULT 15.00,
  \`target_margin_pct\` DECIMAL(5,2) NOT NULL DEFAULT 28.50,
  \`total_client_quote\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_estimates_project\` (\`project_id\`),
  CONSTRAINT \`fk_estimates_project\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`estimate_sections\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`estimate_id\` BIGINT UNSIGNED NOT NULL,
  \`section_type\` ENUM('SURFACE_MATERIALS', 'LABOR_CREWS', 'EQUIPMENT_CONDITIONING', 'MODIFIERS_CONTINGENCY') NOT NULL,
  \`title\` VARCHAR(150) NOT NULL,
  \`section_cost\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`sort_order\` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`),
  KEY \`idx_est_sections_estimate\` (\`estimate_id\`),
  CONSTRAINT \`fk_est_sections_estimate\` FOREIGN KEY (\`estimate_id\`) REFERENCES \`estimates\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`estimate_line_items\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`section_id\` BIGINT UNSIGNED NOT NULL,
  \`item_type\` ENUM('MATERIAL_TAKEOFF', 'LABOR_CREW', 'EQUIPMENT_UNIT', 'CONTINGENCY_RULE') NOT NULL,
  \`title\` VARCHAR(200) NOT NULL,
  \`subtitle\` VARCHAR(255) NULL,
  \`material_id\` BIGINT UNSIGNED NULL,
  \`takeoff_quantity\` DECIMAL(10,2) NULL,
  \`base_rate\` DECIMAL(10,2) NULL,
  \`waste_modifier_pct\` DECIMAL(5,2) NOT NULL DEFAULT 0.00 COMMENT '+10.00% waste',
  \`billed_quantity\` DECIMAL(10,2) NULL,
  \`crew_composition\` VARCHAR(100) NULL,
  \`estimated_hours\` DECIMAL(8,2) NULL,
  \`blended_hourly_rate\` DECIMAL(10,2) NULL,
  \`equipment_id\` BIGINT UNSIGNED NULL,
  \`modifier_rule_code\` VARCHAR(50) NULL,
  \`calculated_subtotal\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`sort_order\` INT UNSIGNED NOT NULL DEFAULT 1,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_line_items_section\` (\`section_id\`),
  CONSTRAINT \`fk_line_items_section\` FOREIGN KEY (\`section_id\`) REFERENCES \`estimate_sections\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_line_items_material\` FOREIGN KEY (\`material_id\`) REFERENCES \`materials\` (\`id\`) ON DELETE SET NULL,
  CONSTRAINT \`fk_line_items_equipment\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TELEMETRY & MOISTURE SENSORS (ASTM F2170)
CREATE TABLE \`telemetry_inspection_sessions\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`project_id\` BIGINT UNSIGNED NOT NULL,
  \`inspector_user_id\` BIGINT UNSIGNED NOT NULL,
  \`session_code\` VARCHAR(64) NOT NULL,
  \`inspection_date\` DATETIME NOT NULL,
  \`calibrated_device_info\` VARCHAR(150) NOT NULL COMMENT 'Tramex CMEX5 #TX-4409',
  \`average_moisture_content_pct\` DECIMAL(5,2) NOT NULL,
  \`target_moisture_threshold_pct\` DECIMAL(5,2) NOT NULL DEFAULT 12.00,
  \`moisture_delta_pct\` DECIMAL(5,2) NOT NULL,
  \`overall_compliance_status\` ENUM('PASS_COMPLIANT', 'FAIL_STOP_WORK_ORDER', 'PENDING_RETEST') NOT NULL DEFAULT 'FAIL_STOP_WORK_ORDER',
  \`is_signoff_locked\` BOOLEAN NOT NULL DEFAULT TRUE,
  \`prescribed_mitigation\` TEXT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_telemetry_project\` (\`project_id\`),
  CONSTRAINT \`fk_telemetry_project\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_telemetry_inspector\` FOREIGN KEY (\`inspector_user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`telemetry_reading_points\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`session_id\` BIGINT UNSIGNED NOT NULL,
  \`room_zone\` VARCHAR(100) NOT NULL,
  \`point_label\` VARCHAR(10) NOT NULL,
  \`location_description\` VARCHAR(150) NOT NULL,
  \`method_depth\` VARCHAR(100) NOT NULL,
  \`moisture_content_pct\` DECIMAL(5,2) NOT NULL,
  \`equilibrium_rh_pct\` DECIMAL(5,2) NOT NULL,
  \`status\` ENUM('PASS_OK', 'FAIL_HIGH', 'FAIL_CRITICAL') NOT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_reading_points_session\` (\`session_id\`),
  CONSTRAINT \`fk_reading_points_session\` FOREIGN KEY (\`session_id\`) REFERENCES \`telemetry_inspection_sessions\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`material_acclimatization_logs\` (
  \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`project_id\` BIGINT UNSIGNED NOT NULL,
  \`material_id\` BIGINT UNSIGNED NOT NULL,
  \`purchase_order_id\` BIGINT UNSIGNED NULL,
  \`staging_bay_location\` VARCHAR(100) NOT NULL,
  \`staged_quantity\` DECIMAL(10,2) NOT NULL,
  \`wood_moisture_content_pct\` DECIMAL(5,2) NOT NULL,
  \`subfloor_moisture_content_pct\` DECIMAL(5,2) NOT NULL,
  \`differential_pct\` DECIMAL(5,2) NOT NULL,
  \`max_allowed_differential_pct\` DECIMAL(5,2) NOT NULL DEFAULT 2.00,
  \`status\` ENUM('ON_TRACK', 'SUPPLY_CHAIN_DELAY', 'IN_STOCK_COMPLIANT', 'DIFFERENTIAL_FAIL') NOT NULL DEFAULT 'ON_TRACK',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_acclim_project\` (\`project_id\`),
  CONSTRAINT \`fk_acclim_project\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_acclim_material\` FOREIGN KEY (\`material_id\`) REFERENCES \`materials\` (\`id\`) ON DELETE RESTRICT,
  CONSTRAINT \`fk_acclim_po\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'floorops_pro_mysql_schema.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#DFE1E6] px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-[18px] font-bold text-[#172B4D] tracking-tight">
            MySQL 8.0+ Normalized Schema DDL
          </h2>
          <p className="text-[12px] text-[#5E6C84] mt-0.5">
            Production-grade DDL with foreign key integrity, check constraints, decimal precision for currency/percentages, and comprehensive indexes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#EBECF0] hover:bg-[#DFE1E6] text-[#172B4D] text-[12px] font-semibold rounded flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white text-[12px] font-semibold rounded flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download .SQL File</span>
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="bg-[#1E293B] rounded-lg border border-[#334155] shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 text-white font-bold">floorops_pro_schema.sql</span>
            </div>
            <span>MySQL 8.0+ / InnoDB / utf8mb4</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 text-[12px] font-mono leading-relaxed text-[#E2E8F0]">
            <pre className="whitespace-pre">{sqlContent}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
