
-- Criar tabela de projetos para organizar tarefas
CREATE TABLE public.projetos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  cliente_id UUID REFERENCES public.clientes(id),
  cor TEXT DEFAULT '#3b82f6',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar enum para tipos de tarefa
CREATE TYPE task_type AS ENUM ('desenvolvimento', 'design', 'marketing', 'suporte', 'revisao', 'outros');

-- Criar enum para prioridades
CREATE TYPE task_priority AS ENUM ('baixa', 'media', 'alta', 'urgente');

-- Criar enum para status das tarefas
CREATE TYPE task_status AS ENUM ('backlog', 'execucao', 'revisao', 'aguardando', 'finalizada', 'cancelada');

-- Criar tabela de templates de tarefa
CREATE TABLE public.task_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo task_type NOT NULL DEFAULT 'outros',
  prioridade task_priority NOT NULL DEFAULT 'media',
  fases_padrao JSONB DEFAULT '["backlog", "execucao", "revisao", "finalizada"]',
  tempo_estimado INTEGER, -- em horas
  tags TEXT[] DEFAULT '{}',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela principal de tarefas
CREATE TABLE public.tarefas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo task_type NOT NULL DEFAULT 'outros',
  prioridade task_priority NOT NULL DEFAULT 'media',
  status task_status NOT NULL DEFAULT 'backlog',
  projeto_id UUID REFERENCES public.projetos(id),
  template_id UUID REFERENCES public.task_templates(id),
  
  -- Integrações
  chamado_id UUID REFERENCES public.chamados(id),
  criativo_id UUID REFERENCES public.criativos(id),
  cliente_id UUID REFERENCES public.clientes(id),
  
  -- Atribuições
  criado_por UUID REFERENCES public.profiles(id),
  responsavel_id UUID REFERENCES public.profiles(id),
  aprovador_id UUID REFERENCES public.profiles(id),
  
  -- Tempo e cronometragem
  tempo_estimado INTEGER, -- em horas
  tempo_gasto INTEGER DEFAULT 0, -- em minutos
  data_inicio TIMESTAMP WITH TIME ZONE,
  data_prazo TIMESTAMP WITH TIME ZONE,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  
  -- Metadados
  tags TEXT[] DEFAULT '{}',
  arquivos_urls TEXT[] DEFAULT '{}',
  observacoes TEXT,
  motivo_status TEXT, -- para quando status = 'aguardando'
  resumo_conclusao TEXT, -- obrigatório quando finalizar
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de fases customizáveis
CREATE TABLE public.task_fases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cor TEXT DEFAULT '#6b7280',
  ordem INTEGER NOT NULL,
  projeto_id UUID REFERENCES public.projetos(id),
  template_id UUID REFERENCES public.task_templates(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(nome, projeto_id),
  UNIQUE(nome, template_id)
);

-- Criar tabela de cronometragem detalhada
CREATE TABLE public.task_time_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tarefa_id UUID NOT NULL REFERENCES public.tarefas(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES public.profiles(id),
  fase TEXT NOT NULL,
  tempo_minutos INTEGER NOT NULL,
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  data_fim TIMESTAMP WITH TIME ZONE,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true, -- para pausar/retomar
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de comentários/atividades nas tarefas
CREATE TABLE public.task_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tarefa_id UUID NOT NULL REFERENCES public.tarefas(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES public.profiles(id),
  usuario_nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'comentario', -- comentario, status_change, assignment, etc
  conteudo TEXT,
  status_anterior task_status,
  status_novo task_status,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para todas as tabelas
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_fases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_activities ENABLE ROW LEVEL SECURITY;

-- Políticas para projetos
CREATE POLICY "Allow all access for authenticated users" ON public.projetos FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Políticas para templates
CREATE POLICY "Allow all access for authenticated users" ON public.task_templates FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Políticas para tarefas
CREATE POLICY "Allow all access for authenticated users" ON public.tarefas FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Políticas para fases
CREATE POLICY "Allow all access for authenticated users" ON public.task_fases FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Políticas para time logs
CREATE POLICY "Allow all access for authenticated users" ON public.task_time_logs FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Políticas para atividades
CREATE POLICY "Allow all access for authenticated users" ON public.task_activities FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Triggers para updated_at
CREATE TRIGGER update_projetos_updated_at BEFORE UPDATE ON public.projetos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tarefas_updated_at BEFORE UPDATE ON public.tarefas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função para auto-cronometragem quando mover para execução
CREATE OR REPLACE FUNCTION public.auto_start_task_timer()
RETURNS TRIGGER AS $$
BEGIN
  -- Se mudou para execução e não tinha data_inicio, definir agora
  IF NEW.status = 'execucao' AND OLD.status != 'execucao' AND NEW.data_inicio IS NULL THEN
    NEW.data_inicio = now();
  END IF;
  
  -- Se finalizou, definir data_conclusao
  IF NEW.status = 'finalizada' AND OLD.status != 'finalizada' THEN
    NEW.data_conclusao = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_start_task_timer_trigger
BEFORE UPDATE ON public.tarefas
FOR EACH ROW EXECUTE FUNCTION public.auto_start_task_timer();

-- Função para criar atividade quando status muda
CREATE OR REPLACE FUNCTION public.create_task_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Criar atividade para criação
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata
    ) VALUES (
      NEW.id,
      auth.uid(),
      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), 'Sistema'),
      'criacao',
      'Tarefa criada: ' || NEW.titulo,
      jsonb_build_object('prioridade', NEW.prioridade, 'tipo', NEW.tipo)
    );
    RETURN NEW;
  END IF;
  
  -- Criar atividade para mudança de status
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO public.task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo,
      status_anterior, status_novo
    ) VALUES (
      NEW.id,
      auth.uid(),
      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), 'Sistema'),
      'status_change',
      'Status alterado de "' || OLD.status || '" para "' || NEW.status || '"',
      OLD.status,
      NEW.status
    );
  END IF;
  
  -- Criar atividade para mudança de responsável
  IF TG_OP = 'UPDATE' AND OLD.responsavel_id != NEW.responsavel_id THEN
    INSERT INTO public.task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata
    ) VALUES (
      NEW.id,
      auth.uid(),
      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), 'Sistema'),
      'assignment',
      'Responsável alterado',
      jsonb_build_object(
        'responsavel_anterior', OLD.responsavel_id,
        'responsavel_novo', NEW.responsavel_id
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_task_activity_trigger
AFTER INSERT OR UPDATE ON public.tarefas
FOR EACH ROW EXECUTE FUNCTION public.create_task_activity();
