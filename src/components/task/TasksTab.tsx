
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TasksList } from './TasksList';
import { ProjectsList } from './ProjectsList';
import { TaskKanban } from './TaskKanban';
import { TaskCalendar } from './TaskCalendar';
import { CreateTaskModal } from './CreateTaskModal';
import { CreateProjectModal } from './CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus } from 'lucide-react';

export function TasksTab() {
  const { hasPermission } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [activeView, setActiveView] = useState('list');

  if (!hasPermission('access_tasks')) {
    return (
      <div className="text-center py-20 premium-surface">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
          <span className="text-white font-bold text-2xl">×</span>
        </div>
        <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
        <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Tarefas.</p>
      </div>
    );
  }

  return (
    <div className="premium-surface h-full">
      <div className="premium-container py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-heading-2 text-slate-800 dark:text-slate-100 mb-2">
              Gerenciamento de Tarefas
            </h1>
            <p className="text-body text-slate-600 dark:text-slate-400">
              Organize e acompanhe o progresso dos seus projetos e tarefas
            </p>
          </div>
          
          <div className="flex gap-3">
            {hasPermission('create_tasks') && (
              <>
                <Button
                  onClick={() => setShowCreateProject(true)}
                  className="premium-button"
                  variant="outline"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Button>
                <Button
                  onClick={() => setShowCreateTask(true)}
                  className="premium-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mb-6">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <TasksList />
          </TabsContent>

          <TabsContent value="kanban" className="space-y-6">
            <TaskKanban />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <TaskCalendar />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsList />
          </TabsContent>
        </Tabs>

        {showCreateTask && (
          <CreateTaskModal
            open={showCreateTask}
            onClose={() => setShowCreateTask(false)}
          />
        )}

        {showCreateProject && (
          <CreateProjectModal
            open={showCreateProject}
            onClose={() => setShowCreateProject(false)}
          />
        )}
      </div>
    </div>
  );
}
