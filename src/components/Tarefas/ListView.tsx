
import { useTasks } from '@/hooks/Task/useTasks';
import { TaskWithDetails } from '@/types/Tarefas';
import { TaskCard } from './TaskCard';
import { Loader2 } from 'lucide-react';

interface ListViewProps {
  onTaskClick: (task: TaskWithDetails) => void;
}

export const ListView = ({ onTaskClick }: ListViewProps) => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Agrupar tarefas por seção
  const tasksBySection = tasks?.reduce((acc, task) => {
    const sectionName = task.section?.name || 'Sem Seção';
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(task);
    return acc;
  }, {} as Record<string, TaskWithDetails[]>) || {};

  return (
    <div className="space-y-6">
      {Object.entries(tasksBySection).map(([sectionName, sectionTasks]) => (
        <div key={sectionName} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{sectionName}</h3>
          <div className="space-y-2">
            {sectionTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        </div>
      ))}

      {Object.keys(tasksBySection).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma tarefa encontrada</p>
        </div>
      )}
    </div>
  );
};
