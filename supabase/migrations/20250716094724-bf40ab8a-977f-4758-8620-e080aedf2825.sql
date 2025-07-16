

-- Corrigir a função handle_new_user() com sintaxe adequada e referências corretas
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_role_text text;
  user_role_enum user_role;
  user_name text;
BEGIN
  -- Extrair dados do user_metadata (não raw_user_meta_data)
  user_role_text := COALESCE(NEW.user_metadata ->> 'role', 'cliente');
  user_role_enum := user_role_text::user_role;
  user_name := COALESCE(NEW.user_metadata ->> 'nome', split_part(NEW.email, '@', 1));
  
  RAISE NOTICE 'Criando usuário: email=%, role=%, nome=%', NEW.email, user_role_text, user_name;
  
  -- Inserir perfil no profiles
  INSERT INTO public.profiles (id, email, role, ativo, nome, status)
  VALUES (
    NEW.id, 
    NEW.email, 
    user_role_enum, 
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
  IF user_role_enum = 'admin' THEN
    INSERT INTO public.colaboradores (user_id, email, nome, ativo, nivel_acesso)
    VALUES (NEW.id, NEW.email, user_name, true, 'admin');
    
    RAISE NOTICE 'Colaborador criado para usuário %', NEW.id;
  END IF;

  -- Se for cliente, inserir na tabela clientes  
  IF user_role_enum = 'cliente' THEN
    INSERT INTO public.clientes (user_id, nome, email, ativo, tipo_acesso)
    VALUES (NEW.id, user_name, NEW.email, true, 'api'::access_type);
    
    RAISE NOTICE 'Cliente criado para usuário %', NEW.id;
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Erro na função handle_new_user: %', SQLERRM;
END;
$$;

-- Garantir que o trigger existe e está ativo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

