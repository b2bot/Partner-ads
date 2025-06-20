
export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';
export type TaskStatus = 'backlog' | 'execucao' | 'revisao' | 'aguardando' | 'finalizada' | 'cancelada';
export type StepStatus = 'pendente' | 'andamento' | 'feito';
export type ProjectStatus = 'ativo' | 'arquivado';
export type TaskFrequency = 'diaria' | 'semanal' | 'mensal';

export interface Project {
  id: string;
  name: string;
  description?: string;
  client_id?: string;
  status: ProjectStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    nome: string;
  };
  created_by_profile?: {
    id: string;
    nome: string;
  };
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  type?: string;
  priority: TaskPriority;
  status: TaskStatus;
  owner_id?: string;
  start_date?: string;
  due_date?: string;
  is_recurring: boolean;
  frequency?: TaskFrequency;
  next_generation_date?: string;
  template_base_id?: string;
  linked_ticket_id?: string;
  tags: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
  data_inicio?: string;
  data_conclusao?: string;
  project?: Project;
  owner?: {
    id: string;
    nome: string;
  };
  created_by_profile?: {
    id: string;
    nome: string;
  };
  linked_ticket?: {
    id: string;
    titulo: string;
  };
}

export interface TaskStep {
  id: string;
  task_id: string;
  title: string;
  description?: string;
  assignee_ids: string[];
  status: StepStatus;
  due_date?: string;
  checklist: ChecklistItem[];
  is_parallel: boolean;
  blocked_if_incomplete: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
  assignees?: {
    id: string;
    nome: string;
  }[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  task_id: string;
  step_id?: string;
  author_id?: string;
  author_name: string;
  content: string;
  mentions: string[];
  created_at: string;
}

export interface TaskAttachment {
  id: string;
  task_id: string;
  step_id?: string;
  filename: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_by?: string;
  created_at: string;
  uploaded_by_profile?: {
    id: string;
    nome: string;
  };
}

export interface TaskActivity {
  id: string;
  task_id: string;
  usuario_id?: string;
  usuario_nome: string;
  tipo: string;
  conteudo: string;
  status_anterior?: TaskStatus;
  status_novo?: TaskStatus;
  metadata: Record<string, any>;
  created_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  client_id?: string;
}

export interface CreateTaskData {
  project_id: string;
  title: string;
  description?: string;
  type?: string;
  priority: TaskPriority;
  owner_id?: string;
  start_date?: string;
  due_date?: string;
  tags?: string[];
  linked_ticket_id?: string;
  is_recurring?: boolean;
  frequency?: TaskFrequency;
}

export interface UpdateTaskData {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  owner_id?: string;
  start_date?: string;
  due_date?: string;
  tags?: string[];
  project_id?: string;
}

export interface CreateTaskStepData {
  task_id: string;
  title: string;
  description?: string;
  assignee_ids?: string[];
  due_date?: string;
  is_parallel?: boolean;
  blocked_if_incomplete?: boolean;
  order_index?: number;
}
