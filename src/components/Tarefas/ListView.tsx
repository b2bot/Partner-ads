
import { useTasks } from '@/hooks/Tarefas/useTasks';
import { TaskWithDetails } from '@/types/task';
import { Loader2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';

interface ListViewProps {
  projectId?: string;
  onTaskClick?: (task: TaskWithDetails) => void;
}

export const ListView = ({ projectId, onTaskClick }: ListViewProps) => {
  const { data: tasks, isLoading } = useTasks(projectId);
  const [selectedTask, setSelectedTask] = useState<TaskWithDetails | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const handleRowClick = (task: TaskWithDetails) => {
    if (onTaskClick) {
      onTaskClick(task);
    } else {
      setSelectedTask(task);
    }
  };

  return (
    <div className="w-full overflow-auto mt-2 rounded-xl border border-gray-300">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="bg-white text-left text-xs font-regular text-gray-600 border-b border-gray-300">
            <th className="p-2 border-r">Tarefa</th>
            <th className="p-2 border-r w-[50px]">Resp.</th>
			<th className="p-2 border-r w-32">Status</th>
            <th className="p-2 border-r w-32">Prioridade</th>
            <th className="p-2 border-r w-24">Entrega</th>
            <th className="p-2 border-r w-10 text-center">
              <MessageCircle className="h-4 w-4 text-gray-600 mx-auto" />
            </th>
            <th className="p-2 border-r w-20">ID</th>
            <th className="p-2">Tags</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 border-b cursor-pointer h-[32px]"
              onClick={() => handleRowClick(task)}
            >
              <td className="p-2 text-xs font-regular text-gray-600 border-r">{task.title}</td>
              <td className="p-2 border-r">
                {task.assigned_user ? (
                  <div className="flex items-center gap-1 truncate">
                    <img
                      src={task.assigned_colaborador.foto_url || ''}
                      alt={task.assigned_colaborador.nome}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="text-xs truncate">{task.assigned_colaborador.nome}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">Não atribuído</span>
                )}
              </td>
              <td className="p-0 border-r text-center align-middle overflow-hidden">
                <TaskStatusBadge status={task.status} />
              </td>
              <td className="p-0 border-r text-center align-middle overflow-hidden">
                <TaskPriorityBadge priority={task.priority} />
              </td>
              <td className="p-2 border-r text-gray-600 text-xs">
                {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '—'}
              </td>
              <td className="p-2 border-r text-center w-10">
                {task.comments?.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600 text-xs">{task.comments.length}</span>
                  </div>
                ) : (
                  <span className="text-gray-300">0</span>
                )}
              </td>
                <td className="p-2 border-r text-gray-600 text-xs">
				  {/* mostra só os 4 últimos dígitos */}
				  …{task.id.slice(-4)}
			    </td>
              <td className="p-2 text-gray-600 text-xs">
                {task.tags && task.tags.length > 0
                  ? task.tags.join(', ')
                  : '—'}
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
