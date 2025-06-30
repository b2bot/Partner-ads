import { TaskStatus } from '@/types/task';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig = {
  backlog: { label: 'Backlog', className: 'bg-gray-400 text-white' },
  em_execucao: { label: 'Em Execução', className: 'bg-blue-500 text-white' },
  em_revisao: { label: 'Em Revisão', className: 'bg-yellow-400 text-black' },
  aguardando: { label: 'Aguardando', className: 'bg-orange-400 text-white' },
  finalizada: { label: 'Finalizada', className: 'bg-green-500 text-white' },
  cancelada: { label: 'Cancelada', className: 'bg-red-500 text-white' },
};

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const config = statusConfig[status] ?? statusConfig['backlog'];

  return (
    <div
      className={`w-full h-full min-h-[38px] flex items-center justify-center text-xs font-medium ${config.className}`}
    >
      {config.label}
    </div>
  );
};
