
import { useState } from 'react';
import { useTasks } from '@/hooks/task/useTasks';
import { useProjects } from '@/hooks/task/useProjects';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { TaskFilterBar } from './TaskFilterBar';
import { Skeleton } from '@/components/ui/skeleton';

const statusGroups = [
  { status: 'backlog', label: 'Planejamento' },
  { status: 'execucao', label: 'Execução' },
  { status: 'revisao', label: 'Revisão' },
  { status: 'aguardando', label: 'Aguardando' },
  { status: 'finalizada', label: 'Finalizada' },
  { status: 'cancelada', label: 'Cancelada' },
];

export function TaskListView() {
  const [filters, setFilters] = useState<{
    project_id?: string;
    status?: string;
    priority?: string;
    owner_id?: string;
  }>({});

  const { tasks, isLoading } = useTasks(filters);
  const { projects } = useProjects();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const filteredTasks = tasks.filter((task: Task) => {
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <TaskFilterBar
        filters={filters}
        onChange={setFilters}
        projects={projects}
      />

      <div className="space-y-8">
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 premium-card">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
              <span className="text-white font-bold text-xl">📋</span>
            </div>
            <h3 className="text-heading-4 text-slate-600 dark:text-slate-300 mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-body-small text-slate-500 dark:text-slate-400">
              Crie uma nova tarefa para começar
            </p>
          </div>
        )}

        {statusGroups.map((group) => {
          const groupTasks = filteredTasks.filter(t => t.status === group.status);
          if (groupTasks.length === 0) return null;
          return (
            <div key={group.status} className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {group.label}
              </h3>
              <div className="space-y-3">
                {groupTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
