import { CreateTaskModal } from './CreateTaskModal';
import { EditTaskModal } from './EditTaskModal';
import { Task } from '@/types/task';

interface TaskModalProps {
  task?: Task;
  open: boolean;
  onClose: () => void;
}

export function TaskModal({ task, open, onClose }: TaskModalProps) {
  if (task) {
    return <EditTaskModal task={task} open={open} onClose={onClose} />;
  }
  return <CreateTaskModal open={open} onClose={onClose} />;
}
