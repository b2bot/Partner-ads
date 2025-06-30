
import { Badge } from '@/components/ui/badge';
import { TaskPriority } from '@/types/task';
import { AlertTriangle, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig = {
  baixa: { 
    label: 'Baixa', 
    className: 'bg-gray-100 text-gray-700',
    icon: ArrowDown 
  },
  media: { 
    label: 'Média', 
    className: 'bg-blue-100 text-blue-700',
    icon: Minus 
  },
  alta: { 
    label: 'Alta', 
    className: 'bg-orange-100 text-orange-700',
    icon: ArrowUp 
  },
  urgente: { 
    label: 'Urgente', 
    className: 'bg-red-100 text-red-700',
    icon: AlertTriangle 
  },
};

export const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
	<div
      className={`w-full h-full min-h-[37px] flex items-center gap-1 justify-center text-xs font-medium ${config.className}`}
    >
      {config.label}
    </div>
  );
};
