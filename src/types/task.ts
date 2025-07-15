import { Database } from '@/types/database';

export type Task = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
export type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export type Client = Database['public']['Tables']['clientes']['Row'];
export type ClientInsert = Database['public']['Tables']['clientes']['Insert'];

export type TaskSection = Database['public']['Tables']['sections']['Row'];
export type TaskSectionInsert = Database['public']['Tables']['sections']['Insert'];

export type Subtask = Database['public']['Tables']['task_steps']['Row'];
export type SubtaskInsert = Database['public']['Tables']['task_steps']['Insert'];

export type TaskComment = Database['public']['Tables']['task_comments']['Row'];
export type TaskCommentInsert = Database['public']['Tables']['task_comments']['Insert'];

export type TaskAttachment = Database['public']['Tables']['task_attachments']['Row'];
export type TaskAttachmentInsert = Database['public']['Tables']['task_attachments']['Insert'];

export type WorkflowTemplate = Database['public']['Tables']['workflow_templates']['Row'];

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type TaskStatus = 'backlog' | 'em_execucao' | 'revisao' | 'aguardando' | 'finalizada' | 'cancelada';
export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';
export type UserRole = Database['public']['Enums']['user_role'];

export interface TaskWithDetails {
  id: string;
  title: string;
  description?: string | null;
  status?: TaskStatus | null;
  priority?: TaskPriority | null;
  due_date?: string | null;
  start_date?: string | null;
  assigned_to?: string | null;
  created_by?: string | null;
  project_id?: string | null;
  section_id?: string | null;
  tags?: string[] | null;
  estimated_hours?: number | null;
  actual_hours?: number | null;
  order_index?: number | null;
  type?: string | null;
  linked_ticket_id?: string | null;
  owner_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  project?: Project | null;
  section?: TaskSection | null;
  assigned_user?: Profile | null;
  creator?: Profile | null;
  subtasks?: Subtask[];
  comments?: (TaskComment & { user?: Profile | null })[];
  attachments?: TaskAttachment[];
}

export interface ProjectWithDetails {
  id: string;
  name: string;
  description?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string | null;
  created_by: string;
  client_id?: string | null;
  responsible_id?: string | null;
  client?: Client | null;
  responsible?: Profile | null;
  creator?: Profile | null;
  tasks?: Task[];
}

export type TabType = 'lista' | 'kanban' | 'calendario' | 'projetos' | 'fluxos' | 'gestor';