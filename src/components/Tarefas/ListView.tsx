// /src/components/Tarefas/ListView.tsx

import { useTasks } from '@/hooks/Tarefas/useTasks';
import { TaskWithDetails } from '@/types/task';
import { Loader2, MessageCircle, Paperclip, Pencil } from 'lucide-react';
import { useState } from 'react';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';

interface ListViewProps {
  projectId?: string;
}

export const ListView = ({ projectId }: ListViewProps) => {
  const { data: tasks, isLoading } = useTasks(projectId);
  const [selectedTask, setSelectedTask] = useState<TaskWithDetails | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const handleTaskClick = (task: TaskWithDetails) => {
    setSelectedTask(task);
  };

  return (
    <div className="w-full overflow-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-white text-left text-xs font-semibold text-gray-600 border-b">
            <th className="p-3 border-r">Tarefa</th>
            <th className="p-3 border-r">Responsável</th>
            <th className="p-3 border-r">Status</th>
            <th className="p-3 border-r">Prioridade</th>
            <th className="p-3 border-r">Entrega</th>
            <th className="p-3 border-r">Comentários</th>
            <th className="p-3 border-r">Anexos</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 border-b cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <td className="p-3 font-medium text-gray-800 border-r">{task.title}</td>
              <td className="p-3 border-r">
                {task.assigned_user ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={task.assigned_user.avatar_url || ''}
                      alt={task.assigned_user.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{task.assigned_user.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">Não atribuído</span>
                )}
              </td>
              <td className="p-3 border-r">
                <TaskStatusBadge status={task.status} />
              </td>
              <td className="p-3 border-r">
                <TaskPriorityBadge priority={task.priority} />
              </td>
              <td className="p-3 border-r">
                {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '—'}
              </td>
              <td className="p-3 border-r">
                {task.comments?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{task.comments.length}</span>
                  </div>
                )}
              </td>
              <td className="p-3">
                {task.attachments?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <span>{task.attachments.length}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <TaskDetailsDrawer
          open={!!selectedTask}
          onOpenChange={() => setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  );
};