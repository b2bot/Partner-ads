
-- Criar enum para os módulos que clientes podem acessar
CREATE TYPE client_module AS ENUM (
  'dashboard',
  'chamados', 
  'relatorios',
  'criativos'
);

-- Criar enum para tipos de relatórios específicos
CREATE TYPE report_type AS ENUM (
  'campanhas',
  'conjuntos_anuncios',
  'anuncios',
  'criativos_performance',
  'whatsapp'
);

-- Tabela para permissões de módulos dos clientes
CREATE TABLE public.client_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  module client_module NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(client_id, module)
);

-- Tabela para permissões específicas de relatórios dos clientes
CREATE TABLE public.client_report_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  report_type report_type NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  account_ids TEXT[] DEFAULT '{}', -- IDs das contas específicas que o cliente pode ver neste relatório
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(client_id, report_type)
);

-- Habilitar RLS
ALTER TABLE public.client_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_report_permissions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para client_permissions
CREATE POLICY "Admins can manage all client permissions" ON public.client_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (role = 'admin' OR is_root_admin = true)
    )
  );

CREATE POLICY "Clients can view their own permissions" ON public.client_permissions
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM public.clientes WHERE user_id = auth.uid()
    )
  );

-- Políticas RLS para client_report_permissions
CREATE POLICY "Admins can manage all client report permissions" ON public.client_report_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (role = 'admin' OR is_root_admin = true)
    )
  );

CREATE POLICY "Clients can view their own report permissions" ON public.client_report_permissions
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM public.clientes WHERE user_id = auth.uid()
    )
  );

-- Função para criar permissões padrão quando um cliente é criado
CREATE OR REPLACE FUNCTION create_default_client_permissions()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir permissões padrão para módulos básicos
  INSERT INTO public.client_permissions (client_id, module, enabled) VALUES
    (NEW.id, 'dashboard', true),
    (NEW.id, 'chamados', true),
    (NEW.id, 'criativos', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar permissões padrão
CREATE TRIGGER create_client_permissions_trigger
  AFTER INSERT ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION create_default_client_permissions();

-- Função para verificar se cliente tem permissão para um módulo
CREATE OR REPLACE FUNCTION client_has_module_permission(client_user_id UUID, module_name client_module)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.client_permissions cp
    JOIN public.clientes c ON c.id = cp.client_id
    WHERE c.user_id = client_user_id 
    AND cp.module = module_name 
    AND cp.enabled = true
  );
$$;

-- Função para verificar se cliente tem permissão para um tipo de relatório
CREATE OR REPLACE FUNCTION client_has_report_permission(client_user_id UUID, report_name report_type)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.client_report_permissions crp
    JOIN public.clientes c ON c.id = crp.client_id
    WHERE c.user_id = client_user_id 
    AND crp.report_type = report_name 
    AND crp.enabled = true
  );
$$;

-- Inserir permissões padrão para clientes existentes
INSERT INTO public.client_permissions (client_id, module, enabled)
SELECT id, 'dashboard', true FROM public.clientes
WHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = 'dashboard');

INSERT INTO public.client_permissions (client_id, module, enabled)
SELECT id, 'chamados', true FROM public.clientes
WHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = 'chamados');

INSERT INTO public.client_permissions (client_id, module, enabled)
SELECT id, 'criativos', true FROM public.clientes
WHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = 'criativos');
