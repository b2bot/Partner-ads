import { Pencil, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskQuickActionsProps {
  onEdit: () => void;
  onComplete: () => void;
}

export function TaskQuickActions({ onEdit, onComplete }: TaskQuickActionsProps) {
  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button size="icon" variant="ghost" onClick={onComplete}>
        <CheckCircle2 className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
