
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Task {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: 'desenvolvimento' | 'design' | 'marketing' | 'suporte' | 'revisao' | 'outros';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'backlog' | 'execucao' | 'revisao' | 'aguardando' | 'finalizada' | 'cancelada';
  projeto_id?: string;
  template_id?: string;
  chamado_id?: string;
  criativo_id?: string;
  cliente_id?: string;
  criado_por?: string;
  responsavel_id?: string;
  aprovador_id?: string;
  tempo_estimado?: number;
  tempo_gasto: number;
  data_inicio?: string;
  data_prazo?: string;
  data_conclusao?: string;
  tags: string[];
  arquivos_urls: string[];
  observacoes?: string;
  motivo_status?: string;
  resumo_conclusao?: string;
  created_at: string;
  updated_at: string;
  projeto?: any;
  responsavel?: any;
  cliente?: any;
}

export interface Project {
  id: string;
  nome: string;
  descricao?: string;
  cliente_id?: string;
  cor: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  cliente?: any;
}

export interface TaskTemplate {
  id: string;
  nome: string;
  descricao?: string;
  tipo: 'desenvolvimento' | 'design' | 'marketing' | 'suporte' | 'revisao' | 'outros';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  fases_padrao: string[];
  tempo_estimado?: number;
  tags: string[];
  ativo: boolean;
  created_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTasks = async (filters: {
    status?: string;
    projeto_id?: string;
    responsavel_id?: string;
    cliente_id?: string;
    minhasTarefas?: boolean;
  } = {}) => {
    try {
      let query = supabase
        .from('tarefas')
        .select(`
          *,
          projeto:projetos(id, nome, cor, cliente:clientes(nome)),
          responsavel:profiles!responsavel_id(id, nome),
          cliente:clientes(id, nome)
        `)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.projeto_id) {
        query = query.eq('projeto_id', filters.projeto_id);
      }

      if (filters.responsavel_id) {
        query = query.eq('responsavel_id', filters.responsavel_id);
      }

      if (filters.cliente_id) {
        query = query.eq('cliente_id', filters.cliente_id);
      }

      if (filters.minhasTarefas && user) {
        query = query.eq('responsavel_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;

      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar tarefas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select(`
          *,
          cliente:clientes(id, nome)
        `)
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar projetos",
        variant: "destructive",
      });
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;

      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates",
        variant: "destructive",
      });
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tarefas')
        .insert({
          ...taskData,
          criado_por: user?.id,
        })
        .select(`
          *,
          projeto:projetos(id, nome, cor, cliente:clientes(nome)),
          responsavel:profiles!responsavel_id(id, nome),
          cliente:clientes(id, nome)
        `)
        .single();

      if (error) throw error;

      setTasks(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Tarefa criada com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar tarefa",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tarefas')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          projeto:projetos(id, nome, cor, cliente:clientes(nome)),
          responsavel:profiles!responsavel_id(id, nome),
          cliente:clientes(id, nome)
        `)
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => task.id === id ? data : task));
      toast({
        title: "Sucesso",
        description: "Tarefa atualizada com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar tarefa",
        variant: "destructive",
      });
      throw error;
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .insert(projectData)
        .select(`
          *,
          cliente:clientes(id, nome)
        `)
        .single();

      if (error) throw error;

      setProjects(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Projeto criado com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar projeto",
        variant: "destructive",
      });
      throw error;
    }
  };

  const createTemplate = async (templateData: Partial<TaskTemplate>) => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .insert(templateData)
        .select()
        .single();

      if (error) throw error;

      setTemplates(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Template criado com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar template",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getTasksByStatus = () => {
    return {
      backlog: tasks.filter(task => task.status === 'backlog'),
      execucao: tasks.filter(task => task.status === 'execucao'),
      revisao: tasks.filter(task => task.status === 'revisao'),
      aguardando: tasks.filter(task => task.status === 'aguardando'),
      finalizada: tasks.filter(task => task.status === 'finalizada'),
      cancelada: tasks.filter(task => task.status === 'cancelada'),
    };
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchTemplates();
  }, [user]);

  return {
    tasks,
    projects,
    templates,
    loading,
    createTask,
    updateTask,
    createProject,
    createTemplate,
    fetchTasks,
    getTasksByStatus,
  };
}
