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

export type TaskStatus = Database['public']['Enums']['task_status'];
export type TaskPriority = Database['public']['Enums']['task_priority'];
export type UserRole = Database['public']['Enums']['user_role'];

export interface TaskWithDetails extends Task {
  project?: Project | null;
  section?: TaskSection | null;
  assigned_user?: Profile | null;
  creator?: Profile | null;
  subtasks?: Subtask[];
  comments?: (TaskComment & { user?: Profile | null })[];
  attachments?: TaskAttachment[];
}

export interface ProjectWithDetails extends Project {
  client?: Client | null;
  responsible?: Profile | null;
  creator?: Profile | null;
  tasks?: Task[];
}

export type TabType = 'lista' | 'kanban' | 'calendario' | 'projetos' | 'fluxos' | 'gestor';