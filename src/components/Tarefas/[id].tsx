import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useProjectById } from '@/hooks/Tarefas/useProjectById';

import ListView from '@/components/Tarefas/ListView';
import KanbanView from '@/components/Tarefas/KanbanView';
import CalendarView from '@/components/Tarefas/CalendarView';
import WorkflowsView from '@/components/Tarefas/WorkflowsView';
import ManagerView from '@/components/Tarefas/ManagerView';

const ProjectTasksPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState('lista');

  const { project, isLoading, error } = useProjectById(id as string);

  useEffect(() => {
    if (!id) return;
    setTab('lista'); // default tab
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Carregando projeto...
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-medium">
          Erro ao carregar o projeto. Verifique o ID na URL.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">
        Projeto: {project.name}
      </h1>
      <p className="text-gray-500">{project.description}</p>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="gestor">Visão de Gestor</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <ListView projectId={project.id} />
        </TabsContent>
        <TabsContent value="kanban">
          <KanbanView projectId={project.id} />
        </TabsContent>
        <TabsContent value="calendario">
          <CalendarView projectId={project.id} />
        </TabsContent>
        <TabsContent value="workflows">
          <WorkflowsView projectId={project.id} />
        </TabsContent>
        <TabsContent value="gestor">
          <ManagerView projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTasksPage;
