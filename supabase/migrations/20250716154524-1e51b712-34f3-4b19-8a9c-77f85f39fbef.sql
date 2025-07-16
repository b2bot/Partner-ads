-- Primeiro, vamos verificar se a trigger existe e recriar tudo do zero
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Criar função que funciona corretamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role_text text;
  user_role_value public.user_role;
  user_name text;
BEGIN
  -- Extrair dados do raw_user_meta_data
  user_role_text := COALESCE(NEW.raw_user_meta_data ->> 'role', 'cliente');
  user_role_value := user_role_text::public.user_role;
  user_name := COALESCE(NEW.raw_user_meta_data ->> 'nome', split_part(NEW.email, '@', 1));
  
  -- Log para debug
  RAISE LOG 'Trigger executada para usuário: email=%, role=%, nome=%', NEW.email, user_role_text, user_name;
  
  -- Confirmar email automaticamente - IMPORTANTE: fazer isso antes das inserções
  UPDATE auth.users 
  SET 
    email_confirmed_at = now(), 
    confirmed_at = now()
  WHERE id = NEW.id;
  
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
      (NEW.id, 'view_tickets', NEW.id, now()),
      (NEW.id, 'create_tickets', NEW.id, now()),
      (NEW.id, 'access_tasks', NEW.id, now()),
      (NEW.id, 'access_whatsapp', NEW.id, now()),
      (NEW.id, 'manage_tasks', NEW.id, now()),
      (NEW.id, 'manage_collaborators', NEW.id, now());
  ELSE
    -- Permissões para cliente
    INSERT INTO public.user_permissions (user_id, permission, granted_by, created_at) VALUES
      (NEW.id, 'access_dashboard', NEW.id, now()),
      (NEW.id, 'access_creatives', NEW.id, now()),
      (NEW.id, 'view_tickets', NEW.id, now()),
      (NEW.id, 'create_tickets', NEW.id, now());
  END IF;

  -- 3. Se for admin, inserir na tabela colaboradores
  IF user_role_value = 'admin' THEN
    INSERT INTO public.colaboradores (user_id, email, nome, ativo, nivel_acesso, created_at)
    VALUES (NEW.id, NEW.email, user_name, true, 'admin', now());
    
    RAISE LOG 'Colaborador criado para usuário ID: %', NEW.id;
  END IF;

  -- 4. Se for cliente, inserir na tabela clientes  
  IF user_role_value = 'cliente' THEN
    INSERT INTO public.clientes (user_id, nome, email, ativo, tipo_acesso, created_at)
    VALUES (NEW.id, user_name, NEW.email, true, 'api'::public.access_type, now());
    
    RAISE LOG 'Cliente criado para usuário ID: %', NEW.id;
  END IF;

  RAISE LOG 'Usuário % processado com sucesso. Profile, permissões e tabela específica criados.', NEW.email;
  RETURN NEW;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'ERRO na trigger handle_new_user para usuário %: % - %', NEW.email, SQLSTATE, SQLERRM;
    -- Permitir que a criação do usuário continue mesmo com erro
    RETURN NEW;
END;
$$;

-- Recriar trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();