import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskListView } from './TaskListView';
import { TaskKanban } from './TaskKanban';
import { TaskCalendar } from './TaskCalendar';
import { TaskProjectsView } from './TaskProjectsView';
import { TaskFlowTemplates } from './TaskFlowTemplates';
import { TaskManagerDashboard } from './TaskManagerDashboard';
import { useAuth } from '@/hooks/useAuth';

interface TaskTabViewProps {
  onEditProject: (projectId: any) => void;
}

export function TaskTabView({ onEditProject }: TaskTabViewProps) {
  const { isRootAdmin } = useAuth();
  const [activeView, setActiveView] = useState('list');

  return (
    <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
      <TabsList className={`grid w-full ${isRootAdmin ? 'grid-cols-6' : 'grid-cols-5'} max-w-md mb-6`}>
        <TabsTrigger value="list">Lista</TabsTrigger>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="calendar">Calendário</TabsTrigger>
        <TabsTrigger value="projects">Projetos</TabsTrigger>
        <TabsTrigger value="flows">Fluxos</TabsTrigger>
        {isRootAdmin && (
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="list" className="space-y-6">
        <TaskListView />
      </TabsContent>
      <TabsContent value="kanban" className="space-y-6">
        <TaskKanban />
      </TabsContent>
      <TabsContent value="calendar" className="space-y-6">
        <TaskCalendar />
      </TabsContent>
      <TabsContent value="projects" className="space-y-6">
        <TaskProjectsView onEditProject={onEditProject} />
      </TabsContent>
      <TabsContent value="flows" className="space-y-6">
        <TaskFlowTemplates />
      </TabsContent>
      {isRootAdmin && (
        <TabsContent value="overview" className="space-y-6">
          <TaskManagerDashboard />
        </TabsContent>
      )}
    </Tabs>
  );
}
