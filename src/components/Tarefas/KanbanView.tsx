import { useTasks, useUpdateTask } from '@/hooks/Tarefas/useTasks';
import { TaskWithDetails, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface KanbanViewProps {
  projectId?: string;
  onTaskClick?: (task: TaskWithDetails) => void;
  onCreateTask?: () => void;
}

const statusColumns: { status: TaskStatus; title: string; color: string; description: string }[] = [
  { status: 'backlog', title: 'Backlog', color: 'bg-gray-50 border-gray-200', description: 'Tarefas planejadas' },
  { status: 'execucao', title: 'Em Execução', color: 'bg-blue-50 border-blue-200', description: 'Trabalho em andamento' },
  { status: 'revisao', title: 'Em Revisão', color: 'bg-yellow-50 border-yellow-200', description: 'Aguardando aprovação' },
  { status: 'aguardando', title: 'Aguardando', color: 'bg-orange-50 border-orange-200', description: 'Bloqueadas ou pendentes' },
  { status: 'finalizada', title: 'Finalizada', color: 'bg-green-50 border-green-200', description: 'Concluídas' },
  { status: 'cancelada', title: 'Cancelada', color: 'bg-red-50 border-red-200', description: 'Canceladas' },
];

export const KanbanView = ({ projectId, onTaskClick, onCreateTask }: KanbanViewProps) => {
  const { data: tasks, isLoading } = useTasks(projectId);
  const updateTask = useUpdateTask();
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando quadro...</span>
      </div>
    );
  }

  const tasksByStatus = (tasks || []).reduce((acc, task) => {
    const status = task.status || 'backlog';
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {} as Record<TaskStatus, TaskWithDetails[]>);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDragLeave = () => setDragOverColumn(null);

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    if (draggedTask) {
      const task = tasks?.find(t => t.id === draggedTask);
      if (task && task.status !== newStatus) {
        updateTask.mutate({ id: draggedTask, updates: { status: newStatus } });
      }
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {onCreateTask && (
          <Button onClick={onCreateTask} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        )}
      </div>

      {/* Board Kanban com scroll fluido e sem espaçamento final */}
      <div className="overflow-x-auto pb-6">
        <div className="flex w-max gap-3 pr-[2px]">
          {statusColumns.map((column) => {
            const columnTasks = tasksByStatus[column.status] || [];
            const isDragOver = dragOverColumn === column.status;

            return (
              <div
                key={column.status}
                className={`
                  w-[250px] flex-shrink-0 rounded-lg border-2 transition-all duration-200
                  ${column.color}
                  ${isDragOver ? 'border-blue-400 bg-blue-100' : 'border-dashed'}
                `}
                onDragOver={(e) => handleDragOver(e, column.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    <span className="text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{column.description}</p>
                </div>

                <div className="p-4 space-y-3 min-h-[200px]">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      className={`
                        cursor-move transition-all duration-200
                        ${draggedTask === task.id ? 'opacity-50 transform rotate-2 scale-105' : 'hover:scale-102'}
                      `}
                    >
                      <TaskCard
                        task={task}
                        onClick={() => onTaskClick?.(task)}
                        compact
                      />
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <div className="text-sm">Nenhuma tarefa</div>
                      {column.status === 'backlog' && onCreateTask && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onCreateTask}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {draggedTask && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg z-50">
          Arraste para alterar o status
        </div>
      )}
    </div>
  );
};
