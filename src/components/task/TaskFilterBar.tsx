import { Project } from '@/types/task';
import { TaskFilters } from './TaskFilters';

interface TaskFilterBarProps {
  filters: {
    project_id?: string;
    status?: string;
    priority?: string;
    owner_id?: string;
  };
  onChange: (filters: any) => void;
  projects: Project[];
}

export function TaskFilterBar({ filters, onChange, projects }: TaskFilterBarProps) {
  return <TaskFilters filters={filters} onFiltersChange={onChange} projects={projects} />;
}
