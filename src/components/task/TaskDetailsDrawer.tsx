import { Task } from '@/types/task';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';

interface TaskDetailsDrawerProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailsDrawer({ task, open, onOpenChange }: TaskDetailsDrawerProps) {
  if (!task) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{task.title}</DrawerTitle>
          <DrawerDescription className="flex gap-2 mt-2">
            <Badge variant="secondary">{task.priority}</Badge>
            <Badge variant="secondary">{task.status}</Badge>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
          {task.description || 'Sem descrição'}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
