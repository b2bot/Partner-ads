-- Primeiro, vamos corrigir a função handle_new_user para funcionar adequadamente
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_role text;
  user_name text;
BEGIN
  -- Obter dados do usuário
  user_role := COALESCE(NEW.raw_user_meta_data ->> 'role', 'cliente');
  user_name := COALESCE(NEW.raw_user_meta_data ->> 'nome', split_part(NEW.email, '@', 1));
  
  -- Inserir perfil no profiles
  INSERT INTO public.profiles (id, email, role, ativo, nome, status)
  VALUES (
    NEW.id, 
    NEW.email, 
    user_role::user_role, 
    true, 
    user_name,
    'ativo'
  );

  -- Inserir permissões básicas
  INSERT INTO public.user_permissions (user_id, permission, granted_by) VALUES
    (NEW.id, 'access_dashboard', NEW.id),
    (NEW.id, 'access_tasks', NEW.id),
    (NEW.id, 'access_whatsapp', NEW.id);

  -- Se for admin, inserir na tabela colaboradores
  IF user_role = 'admin' THEN
    INSERT INTO public.colaboradores (user_id, email, nome, ativo, nivel_acesso)
    VALUES (NEW.id, NEW.email, user_name, true, 'admin');
  END IF;

  -- Se for cliente, inserir na tabela clientes  
  IF user_role = 'cliente' THEN
    INSERT INTO public.clientes (user_id, nome, email, ativo, tipo_acesso)
    VALUES (NEW.id, user_name, NEW.email, true, 'api'::access_type);
  END IF;

  RETURN NEW;
END;
$$;

-- Recriar o trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();