import { useState, useEffect } from 'react';
import { useProjectById } from '@/hooks/Tarefas/useProjectById';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

import { ListView } from '@/components/Tarefas/ListView';
import { KanbanView } from '@/components/Tarefas/KanbanView';
import { CalendarView } from '@/components/Tarefas/CalendarView';
import { WorkflowsView } from '@/components/Tarefas/WorkflowsView';
import { ManagerView } from '@/components/Tarefas/ManagerView';

export function ProjectTasksView({ projectId }: { projectId: string }) {
  const { project, isLoading, error } = useProjectById(projectId);
  const [tab, setTab] = useState('lista');

  if (isLoading) {
    return <div className="flex justify-center items-center py-8">
      <Loader2 className="h-5 w-5 animate-spin mr-2" /> Carregando...
    </div>;
  }

  if (!project || error) {
    return <div className="text-red-500 text-center mt-8">Erro ao carregar projeto</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Projeto: {project.name}</h2>
      <p className="text-sm text-muted-foreground">{project.description}</p>

      {/*<Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="gestor">Visão do Gestor</TabsTrigger>
        </TabsList>*/}

        <TabsContent value="lista">
          <ListView projectId={projectId} />
        </TabsContent>
        <TabsContent value="kanban">
          <KanbanView projectId={projectId} />
        </TabsContent>
        <TabsContent value="calendario">
          <CalendarView projectId={projectId} />
        </TabsContent>
        <TabsContent value="workflows">
          <WorkflowsView projectId={projectId} />
        </TabsContent>
        <TabsContent value="gestor">
          <ManagerView projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
