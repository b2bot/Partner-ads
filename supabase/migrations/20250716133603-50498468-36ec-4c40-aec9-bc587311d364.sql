
-- Remover trigger existente se houver
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Criar função trigger simplificada
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_role_text text;
  user_role_value public.user_role;
  user_name text;
BEGIN
  -- Extrair dados do user_metadata
  user_role_text := COALESCE(NEW.user_metadata ->> 'role', 'cliente');
  user_role_value := user_role_text::public.user_role;
  user_name := COALESCE(NEW.user_metadata ->> 'nome', split_part(NEW.email, '@', 1));
  
  -- 1. Inserir em profiles
  INSERT INTO public.profiles (id, email, role, ativo, nome, status, created_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    user_role_value, 
    true, 
    user_name,
    'ativo',
    now()
  );

  -- 2. Inserir permissões básicas
  INSERT INTO public.user_permissions (user_id, permission, granted_by, created_at) VALUES
    (NEW.id, 'access_dashboard', NEW.id, now()),
    (NEW.id, 'access_tasks', NEW.id, now()),
    (NEW.id, 'access_whatsapp', NEW.id, now());

  -- 3. Se for admin, inserir na tabela colaboradores
  IF user_role_value = 'admin' THEN
    INSERT INTO public.colaboradores (user_id, email, nome, ativo, nivel_acesso, created_at)
    VALUES (NEW.id, NEW.email, user_name, true, 'admin', now());
  END IF;

  -- 4. Se for cliente, inserir na tabela clientes  
  IF user_role_value = 'cliente' THEN
    INSERT INTO public.clientes (user_id, nome, email, ativo, tipo_acesso, created_at)
    VALUES (NEW.id, user_name, NEW.email, true, 'api'::public.access_type, now());
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Erro na função handle_new_user para usuário %: %', NEW.email, SQLERRM;
    RETURN NEW; -- Não bloquear a criação do usuário
END;
$$;

-- Criar trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Políticas RLS para permitir que a trigger funcione
-- Profiles: permitir INSERT para authenticated (trigger roda como SECURITY DEFINER)
DROP POLICY IF EXISTS "Allow trigger insert" ON public.profiles;
CREATE POLICY "Allow trigger insert" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- User permissions: permitir INSERT 
DROP POLICY IF EXISTS "Allow trigger insert permissions" ON public.user_permissions;
CREATE POLICY "Allow trigger insert permissions" ON public.user_permissions
  FOR INSERT WITH CHECK (true);

-- Colaboradores: permitir INSERT
DROP POLICY IF EXISTS "Allow trigger insert colaboradores" ON public.colaboradores;
CREATE POLICY "Allow trigger insert colaboradores" ON public.colaboradores
  FOR INSERT WITH CHECK (true);

-- Clientes: permitir INSERT
DROP POLICY IF EXISTS "Allow trigger insert clientes" ON public.clientes;
CREATE POLICY "Allow trigger insert clientes" ON public.clientes
  FOR INSERT WITH CHECK (true);
