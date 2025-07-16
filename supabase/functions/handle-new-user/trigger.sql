
-- Criar função que chama a Edge Function
CREATE OR REPLACE FUNCTION public.handle_new_user_webhook()
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
  
  RAISE LOG 'Criando usuário: email=%, role=%, nome=%', NEW.email, user_role_text, user_name;
  
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

  -- 2. Inserir permissões básicas baseadas no role
  IF user_role_value = 'admin' THEN
    -- Permissões para admin
    INSERT INTO public.user_permissions (user_id, permission, granted_by, created_at) VALUES
      (NEW.id, 'access_dashboard', NEW.id, now()),
      (NEW.id, 'access_calls', NEW.id, now()),
      (NEW.id, 'access_tasks', NEW.id, now()),
      (NEW.id, 'manage_tasks', NEW.id, now());
  ELSE
    -- Permissões para cliente
    INSERT INTO public.user_permissions (user_id, permission, granted_by, created_at) VALUES
      (NEW.id, 'access_dashboard', NEW.id, now()),
      (NEW.id, 'access_calls', NEW.id, now()),
      (NEW.id, 'access_creatives', NEW.id, now()),
      (NEW.id, 'access_reports', NEW.id, now());
  END IF;

  -- 3. Se for admin, inserir na tabela colaboradores
  IF user_role_value = 'admin' THEN
    INSERT INTO public.colaboradores (user_id, email, nome, ativo, nivel_acesso, created_at)
    VALUES (NEW.id, NEW.email, user_name, true, 'admin', now());
    
    RAISE LOG 'Colaborador criado para usuário %', NEW.id;
  END IF;

  -- 4. Se for cliente, inserir na tabela clientes  
  IF user_role_value = 'cliente' THEN
    INSERT INTO public.clientes (user_id, nome, email, ativo, tipo_acesso, created_at)
    VALUES (NEW.id, user_name, NEW.email, true, 'api'::public.access_type, now());
    
    RAISE LOG 'Cliente criado para usuário %', NEW.id;
  END IF;

  RAISE LOG 'Usuário % criado com sucesso em todas as tabelas', NEW.email;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Erro na função handle_new_user_webhook para usuário %: %', NEW.email, SQLERRM;
    -- Não bloquear a criação do usuário, mas registrar o erro
    RETURN NEW;
END;
$$;

-- Remover trigger antigo se existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Criar novo trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_webhook();
