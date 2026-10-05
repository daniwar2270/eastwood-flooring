/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ErdVisualizer } from './components/ErdVisualizer';
import { KanbanBoardView } from './components/KanbanBoardView';
import { DynamicEstimatorView } from './components/DynamicEstimatorView';
import { FinishesCatalogView } from './components/FinishesCatalogView';
import { LogisticsDeliveriesView } from './components/LogisticsDeliveriesView';
import { MoistureTelemetryView } from './components/MoistureTelemetryView';
import { SqlSchemaView } from './components/SqlSchemaView';
import { NestJsEntitiesView } from './components/NestJsEntitiesView';
import { AngularServicesView } from './components/AngularServicesView';
import { ApiConsoleView } from './components/ApiConsoleView';
import { NewProjectModal } from './components/NewProjectModal';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('kanban');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);

  const handleCreateProject = (projectData: any) => {
    // In our live workbench, we can notify the user or switch to Kanban
    setCurrentView('kanban');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F5F7] text-[#041B3C] font-sans antialiased">
      {/* 1. Left Docked Sidebar (240px) */}
      <Sidebar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onOpenNewModal={() => setIsNewProjectModalOpen(true)}
      />

      {/* 2. Main Content Viewport Area (offset 240px) */}
      <div className="flex-1 flex flex-col ml-60 h-screen overflow-hidden min-w-0">
        <Header
          currentView={currentView}
          onViewChange={(view) => setCurrentView(view)}
          onOpenNewModal={() => setIsNewProjectModalOpen(true)}
        />

        {/* Dynamic Viewport Content */}
        <div className="flex-1 flex overflow-hidden">
          {currentView === 'erd' && <ErdVisualizer />}
          {currentView === 'kanban' && (
            <KanbanBoardView
              onNavigateToEstimator={() => setCurrentView('estimator')}
              onNavigateToTelemetry={() => setCurrentView('telemetry')}
              onNavigateToDeliveries={() => setCurrentView('deliveries')}
            />
          )}
          {currentView === 'estimator' && <DynamicEstimatorView />}
          {currentView === 'catalog' && <FinishesCatalogView />}
          {currentView === 'deliveries' && (
            <LogisticsDeliveriesView onInspectBlocker={() => setCurrentView('telemetry')} />
          )}
          {currentView === 'telemetry' && <MoistureTelemetryView />}
          {currentView === 'sql' && <SqlSchemaView />}
          {currentView === 'nestjs' && <NestJsEntitiesView />}
          {currentView === 'angular' && <AngularServicesView />}
          {currentView === 'api' && <ApiConsoleView />}
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
