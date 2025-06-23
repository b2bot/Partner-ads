
import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/types/Tarefas';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig = {
  backlog: { label: 'Backlog', className: 'bg-gray-100 text-gray-800' },
  em_execucao: { label: 'Em Execução', className: 'bg-blue-100 text-blue-800' },
  em_revisao: { label: 'Em Revisão', className: 'bg-yellow-100 text-yellow-800' },
  aguardando: { label: 'Aguardando', className: 'bg-orange-100 text-orange-800' },
  finalizada: { label: 'Finalizada', className: 'bg-green-100 text-green-800' },
  cancelada: { label: 'Cancelada', className: 'bg-red-100 text-red-800' },
};

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};
