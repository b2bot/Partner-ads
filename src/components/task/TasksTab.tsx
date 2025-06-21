import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TaskTabView } from './TaskTabView';
import { TaskModal } from './TaskModal';
import { CreateProjectModal } from './CreateProjectModal';
import { EditProjectModal } from './EditProjectModal';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus } from 'lucide-react';
import { Project } from '@/types/task';

export function TasksTab() {
  const { hasPermission } = useAuth();

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showEditProject, setShowEditProject] = useState(false);

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
    <div className="space-y-6 max-w-9xl">
      <div className="premium-container py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Gerenciamento de Tarefas
            </h1>
            <p className="text-slate-600 text-xs">
              Organize e acompanhe o progresso dos seus projetos e tarefas
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
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

        <TaskTabView
          onEditProject={(project) => {
            setEditProject(project);
            setShowEditProject(true);
          }}
        />

        {/* Modais */}
        {showCreateTask && (
          <TaskModal
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

        {editProject && showEditProject && (
          <EditProjectModal
            open={showEditProject}
            onClose={() => setShowEditProject(false)}
            project={editProject}
          />
        )}
      </div>
    </div>
  );
}