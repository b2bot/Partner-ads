--
-- PostgreSQL database dump
--



--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--




--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--




--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--




--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--




--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--



--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--



--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--



--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--



--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION `uuid-ossp`; Type: COMMENT; Schema: -; Owner: 
--



--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: access_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE access_type AS ENUM (
    'api',
    'sheet'
);


ALTER TYPE access_type OWNER TO postgres;

--
-- Name: account_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE account_type AS ENUM (
    'meta',
    'google'
);


ALTER TYPE account_type OWNER TO postgres;

--
-- Name: client_module; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE client_module AS ENUM (
    'dashboard',
    'chamados',
    'relatorios',
    'criativos'
);


ALTER TYPE client_module OWNER TO postgres;

--
-- Name: creative_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE creative_status AS ENUM (
    'pendente',
    'aprovado',
    'reprovado',
    'ajuste_solicitado'
);


ALTER TYPE creative_status OWNER TO postgres;

--
-- Name: permission_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE permission_type AS ENUM (
    'access_dashboard',
    'access_whatsapp',
    'create_campaigns',
    'edit_campaigns',
    'view_templates',
    'send_messages',
    'view_metrics',
    'access_tasks',
    'create_tasks',
    'assign_tasks',
    'finalize_tasks',
    'edit_execution_time',
    'access_calls',
    'create_calls',
    'finalize_calls',
    'link_calls_to_tasks',
    'access_creatives',
    'create_edit_creatives',
    'approve_creatives',
    'view_change_history',
    'access_paid_media',
    'create_campaigns_media',
    'view_metrics_media',
    'access_reports',
    'create_automatic_reports',
    'manage_user_settings',
    'manage_collaborators',
    'manage_whatsapp_templates',
    'manage_api_settings',
    'manage_appearance_and_visual_identity',
    'manage_external_integrations',
    'manage_variables_and_pre_configurations',
    'view_billing_settings',
    'view_system_logs',
    'access_client_reports',
    'manage_clients',
    'delete_campaigns',
    'create_adsets',
    'edit_adsets',
    'delete_adsets',
    'create_ads',
    'edit_ads',
    'delete_ads',
    'export_data',
    'manage_creatives',
    'upload_creatives',
    'edit_creatives',
    'delete_creatives',
    'view_tickets',
    'create_tickets',
    'edit_tickets',
    'resolve_tickets',
    'create_collaborators',
    'edit_collaborators',
    'delete_collaborators',
    'create_campaigns_whatsapp',
    'manage_contacts',
    'edit_tasks',
    'delete_tasks',
    'manage_tasks'
);


ALTER TYPE permission_type OWNER TO postgres;

--
-- Name: report_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE report_type AS ENUM (
    'campanhas',
    'conjuntos_anuncios',
    'anuncios',
    'criativos_performance',
    'whatsapp'
);


ALTER TYPE report_type OWNER TO postgres;

--
-- Name: task_priority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE task_priority AS ENUM (
    'baixa',
    'media',
    'alta',
    'urgente'
);


ALTER TYPE task_priority OWNER TO postgres;

--
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE task_status AS ENUM (
    'backlog',
    'execucao',
    'revisao',
    'aguardando',
    'finalizada',
    'cancelada'
);


ALTER TYPE task_status OWNER TO postgres;

--
-- Name: task_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE task_type AS ENUM (
    'desenvolvimento',
    'design',
    'marketing',
    'suporte',
    'revisao',
    'outros'
);


ALTER TYPE task_type OWNER TO postgres;

--
-- Name: ticket_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE ticket_status AS ENUM (
    'novo',
    'aguardando_equipe',
    'aguardando_cliente',
    'em_analise',
    'em_andamento',
    'resolvido'
);


ALTER TYPE ticket_status OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_role AS ENUM (
    'admin',
    'cliente'
);


ALTER TYPE user_role OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value json,
	is_pkey tinyint(1),
	is_selectable tinyint(1)
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal json,
	is_rls_enabled tinyint(1),
	subscription_ids json,
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')->> 'email')
  )
$$;



--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )
$$;



--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')->> 'role')
  )
$$;



--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')->> 'sub')
  )
$$;



--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;



--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_graphql;
        create or replace function graphql_graphql(
            `operationName` text default null,
            query text default null,
            variables json default null,
            extensions json default null
        )
            returns json
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                `operationName` := `operationName`,
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;



--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;


    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params json, headers json, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body json, params json, headers json, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params json, headers json, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body json, params json, headers json, timeout_milliseconds integer) SET search_path = net;


    END IF;
  END IF;
END;
$$;



--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;



--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;



--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_graphql(
            `operationName` text default null,
            query text default null,
            variables json default null,
            extensions json default null
        )
            returns json
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2)));

                IF server_version >= 14 THEN
                    RETURN json_build_object(
                        'errors', json_build_array(
                            json_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN json_build_object(
                        'errors', json_build_array(
                            json_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;



--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname, 
        case when rolvaliduntil < CURRENT_TIMESTAMP 
            then null 
            else rolpassword
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;



--
-- Name: assign_default_permissions(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  -- Atribuir permissão básica de acesso a tarefas para novos usuários
  INSERT INTO user_permissions (user_id, permission)
  VALUES (NEW.id, 'access_tasks');
  
  RETURN NEW;
END;
$$;



--
-- Name: auto_start_task_timer(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Se mudou para execução e não tinha data_inicio, definir agora
  IF NEW.status = 'execucao' AND OLD.status != 'execucao' AND NEW.data_inicio IS NULL THEN
    NEW.data_inicio = CURRENT_TIMESTAMP;
  END IF;
  
  -- Se finalizou, definir data_conclusao
  IF NEW.status = 'finalizada' AND OLD.status != 'finalizada' THEN
    NEW.data_conclusao = CURRENT_TIMESTAMP;
  END IF;
  
  RETURN NEW;
END;
$$;



--
-- Name: check_is_root_admin(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT COALESCE(
    (SELECT is_root_admin FROM profiles WHERE id = user_id LIMIT 1),
    false
  );
$$;



--
-- Name: client_has_module_permission(uuid, client_module); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM client_permissions cp
    JOIN clientes c ON c.id = cp.client_id
    WHERE c.user_id = client_user_id 
    AND cp.module = module_name 
    AND cp.enabled = true
  );
$$;



--
-- Name: client_has_report_permission(uuid, report_type); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM client_report_permissions crp
    JOIN clientes c ON c.id = crp.client_id
    WHERE c.user_id = client_user_id 
    AND crp.report_type = report_name 
    AND crp.enabled = true
  );
$$;



--
-- Name: create_chamado_historico(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Inserir histórico quando chamado é criado
  IF TG_OP = 'INSERT' THEN
    INSERT INTO chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)
    VALUES (
      NEW.id, 
      'criado', 
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'Chamado criado: ' || NEW.titulo
    );
    RETURN NEW;
  END IF;
  
  -- Inserir histórico quando status muda
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)
    VALUES (
      NEW.id, 
      'status_alterado', 
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'Status alterado de `' || OLD.status || '` para `' || NEW.status || '`'
    );
  END IF;
  
  -- Inserir histórico quando resposta é adicionada
  IF TG_OP = 'UPDATE' AND (OLD.resposta IS NULL OR OLD.resposta = '') AND NEW.resposta IS NOT NULL AND NEW.resposta != '' THEN
    INSERT INTO chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)
    VALUES (
      NEW.id, 
      'respondido', 
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'Nova resposta adicionada'
    );
  END IF;
  
  RETURN NEW;
END;
$$;



--
-- Name: create_default_client_permissions(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Inserir permissões padrão para módulos básicos
  INSERT INTO client_permissions (client_id, module, enabled) VALUES
    (NEW.id, 'dashboard', true),
    (NEW.id, 'chamados', true),
    (NEW.id, 'criativos', true);
  
  RETURN NEW;
END;
$$;



--
-- Name: create_task_activity(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Criar atividade para criação
  IF TG_OP = 'INSERT' THEN
    INSERT INTO task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata
    ) VALUES (
      NEW.id,
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'criacao',
      'Tarefa criada: ' || NEW.titulo,
      json_build_object('prioridade', NEW.prioridade, 'tipo', NEW.tipo)
    );
    RETURN NEW;
  END IF;
  
  -- Criar atividade para mudança de status
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo,
      status_anterior, status_novo
    ) VALUES (
      NEW.id,
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'status_change',
      'Status alterado de `' || OLD.status || '` para `' || NEW.status || '`',
      OLD.status,
      NEW.status
    );
  END IF;
  
  -- Criar atividade para mudança de responsável
  IF TG_OP = 'UPDATE' AND OLD.responsavel_id != NEW.responsavel_id THEN
    INSERT INTO task_activities (
      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata
    ) VALUES (
      NEW.id,
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      'assignment',
      'Responsável alterado',
      json_build_object(
        'responsavel_anterior', OLD.responsavel_id,
        'responsavel_novo', NEW.responsavel_id
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;



--
-- Name: create_ticket_timeline_entry(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Entrada para criação do chamado
  IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'chamados' THEN
    INSERT INTO chamados_timeline (
      chamado_id, 
      tipo, 
      conteudo, 
      autor_id, 
      autor_nome, 
      autor_tipo,
      metadata
    ) VALUES (
      NEW.id,
      'criacao',
      NEW.mensagem,
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      NEW.aberto_por,
      json_build_object('titulo', NEW.titulo, 'categoria', NEW.categoria, 'prioridade', NEW.prioridade)
    );
  END IF;

  -- Entrada para nova mensagem
  IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'chamados_mensagens' THEN
    INSERT INTO chamados_timeline (
      chamado_id,
      tipo,
      conteudo,
      autor_id,
      autor_nome,
      autor_tipo,
      metadata
    ) VALUES (
      NEW.chamado_id,
      'mensagem',
      NEW.conteudo,
      NEW.autor_id,
      NEW.autor_nome,
      NEW.autor_tipo,
      NEW.metadata
    );
  END IF;

  -- Entrada para mudança de status
  IF TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'chamados' AND OLD.status != NEW.status THEN
    INSERT INTO chamados_timeline (
      chamado_id,
      tipo,
      conteudo,
      autor_id,
      autor_nome,
      autor_tipo,
      metadata
    ) VALUES (
      NEW.id,
      'status_change',
      'Status alterado de `' || OLD.status || '` para `' || NEW.status || '`',
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      CASE WHEN is_admin() THEN 'admin' ELSE 'cliente' END,
      json_build_object('status_anterior', OLD.status, 'status_novo', NEW.status)
    );
  END IF;

  -- Entrada para nova resposta (campo resposta)
  IF TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'chamados' AND (OLD.resposta IS NULL OR OLD.resposta = '') AND NEW.resposta IS NOT NULL AND NEW.resposta != '' THEN
    INSERT INTO chamados_timeline (
      chamado_id,
      tipo,
      conteudo,
      autor_id,
      autor_nome,
      autor_tipo
    ) VALUES (
      NEW.id,
      'resposta',
      NEW.resposta,
      uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
      CASE WHEN is_admin() THEN 'admin' ELSE 'cliente' END
    );
  END IF;

  RETURN NEW;
END;
$$;



--
-- Name: get_user_cliente_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT c.id FROM clientes c
  WHERE c.user_id = uid();
$$;



--
-- Name: get_user_permissions(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT COALESCE(array_agg(permission), '{}') 
  FROM user_permissions 
  WHERE user_permissions.user_id = get_user_permissions.user_id;
$$;



--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into usuarios (id, nome)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$;



--
-- Name: has_permission(uuid, permission_type); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_permissions 
    WHERE user_permissions.user_id = has_permission.user_id 
    AND permission = required_permission
  ) OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = has_permission.user_id 
    AND is_root_admin = TRUE
  );
$$;



--
-- Name: is_admin(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE sql STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = uid() AND role = 'admin'
  );
$$;



--
-- Name: log_permission_changes(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO permission_logs (target_user_id, changed_by, action, permission, details)
    VALUES (NEW.user_id, uid(), 'granted', NEW.permission, 
            json_build_object('timestamp', NOW()));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO permission_logs (target_user_id, changed_by, action, permission, details)
    VALUES (OLD.user_id, uid(), 'revoked', OLD.permission, 
            json_build_object('timestamp', NOW()));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;



--
-- Name: log_system_activity(text, text, json, inet, text); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO system_activity_logs (
    usuario_id, 
    usuario_nome, 
    acao, 
    modulo, 
    detalhes, 
    ip_address, 
    user_agent
  ) VALUES (
    uid(),
    COALESCE((SELECT nome FROM profiles WHERE id = uid()), 'Sistema'),
    p_acao,
    p_modulo,
    p_detalhes,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;



--
-- Name: update_ticket_detailed_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Definir status detalhado baseado no status e outras condições
  IF NEW.status = 'novo' AND NEW.aberto_por = 'admin' THEN
    NEW.status_detalhado = 'Novo - Aberto pela Equipe';
  ELSIF NEW.status = 'novo' AND NEW.aberto_por = 'cliente' THEN
    NEW.status_detalhado = 'Novo - Aberto pelo Cliente';
  ELSIF NEW.status = 'aguardando_equipe' THEN
    NEW.status_detalhado = 'Aguardando resposta da equipe';
  ELSIF NEW.status = 'aguardando_cliente' THEN
    NEW.status_detalhado = 'Aguardando resposta do cliente';
  ELSIF NEW.status = 'em_analise' THEN
    NEW.status_detalhado = 'Em análise pela equipe';
  ELSIF NEW.status = 'em_andamento' THEN
    NEW.status_detalhado = 'Em andamento';
  ELSIF NEW.status = 'resolvido' THEN
    NEW.status_detalhado = 'Resolvido';
  ELSE
    NEW.status_detalhado = NEW.status;
  END IF;
  
  RETURN NEW;
END;
$$;



--
-- Name: update_ticket_status_on_message(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Se é uma mensagem de cliente, alterar status para 'aguardando_equipe'
  IF NEW.autor_tipo = 'cliente' THEN
    UPDATE chamados 
    WHERE id = NEW.chamado_id;
  END IF;
  
  RETURN NEW;
END;
$$;



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;



--
-- Name: apply_rls(json, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'));

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims json;

subscription_id char(36);
subscription_has_access bool;
visible_to_subscription_ids json = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size tinyint(1) = octet_length(wal) > max_record_bytes;

-- Primary json output for record
output json;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid'), -- null when wal2json version <= 2.4
                    (x->>'type')
                )
            ),
            (pks ->> 'name') is not null,
            true
        ).wal_column
    )
    from
        json_array_elements(wal -> 'columns') x
        left join json_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid'), -- null when wal2json version <= 2.4
                    (x->>'type')
                )
            ),
            (pks ->> 'name') is not null,
            true
        ).wal_column
    )
    from
        json_array_elements(wal -> 'identity') x
        left join json_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            ).wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                ).wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            json_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        ).wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            json_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        ).wal_rls;

    else
        output = json_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')'utc'),
                'YYYY-MM-DD`T`HH24:MI:SS.MS`Z`'
            ),
            'columns', (
                select
                    json_agg(
                        json_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add `record` key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                json_build_object(
                    'record',
                    (
                        select
                            json_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value) <= 64))
                    )
                )
            else '{}'
        end
        -- Add `old_record` key for update and delete
        || case
            when action = 'UPDATE' then
                json_build_object(
                        'old_record',
                        (
                            select json_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value) <= 64))
                        )
                    )
            when action = 'DELETE' then
                json_build_object(
                    'old_record',
                    (
                        select json_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '`' from working_role), true),
                    set_config('request.jwt.claims', claims, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        ).wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;



--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data json := '{}';
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := json_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;



--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('notes', '{`id`}'[], '{`bigint`}'[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;



--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res json;
    begin
      execute format('select to_json(%L::'|| type_|| ')', val)  into res;
      return res;
    end
    $$;



--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res tinyint(1);
      begin
          execute format(
              'select %L::'|| type_|| ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_|| '[]'
                      else type_
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;



--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid, -- null when wal2json version <= 2.4
                            col.type_name
                        ),
                        -- cast json to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;



--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE sql
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;



--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '`')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname, null), 1)
              and x.ch = '`'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '`')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname, null), 1)
              and x.ch = '`'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;



--
-- Name: send(json, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          json_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )
      );
  END;
END;
$$;



--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)= new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name),
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val json;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'.equality_op then
                in_val = realtime.cast(filter.value, (col_type|| '[]'));
                if coalesce(json_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;



--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

    LANGUAGE sql IMMUTABLE
    AS $$ select role_name$$;



--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '');
$$;



--
-- Name: can_insert_object(text, text, uuid, json); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO `storage`.`objects` (`bucket_id`, `name`, `owner`, `metadata`) VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;



--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;



--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;



--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;



--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')) as size, obj.bucket_id
        from `storage`.objects as obj
        group by obj.bucket_id;
END
$$;



--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE `C`) * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE `C` > $4
                            ELSE
                                key COLLATE `C` > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE `C` > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE `C` ASC, created_at ASC) as e order by key COLLATE `C` LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;



--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE `C`) * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE `C` > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE `C` > $4
                            ELSE
                                name COLLATE `C` > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE `C` ASC) as e order by name COLLATE `C` LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;



--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;



--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as `name`,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as `name`,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW; 
END;
$$;





--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE audit_log_entries (
    instance_id char(36),
    id char(36) NOT NULL,
    payload json,
    created_at timestamp,
    ip_address character varying(64) DEFAULT ''
);



--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE flow_state (
    id char(36) NOT NULL,
    user_id char(36),
    auth_code text NOT NULL,
    code_challenge_method code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp,
    updated_at timestamp,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp
);



--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE identities (
    provider_id text NOT NULL,
    user_id char(36) NOT NULL,
    identity_data json NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp,
    created_at timestamp,
    updated_at timestamp,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'))) STORED,
    id char(36) DEFAULT gen_random_uuid() NOT NULL
);



--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE instances (
    id char(36) NOT NULL,
    uuid char(36),
    raw_base_config text,
    created_at timestamp,
    updated_at timestamp
);



--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE mfa_amr_claims (
    session_id char(36) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    authentication_method text NOT NULL,
    id char(36) NOT NULL
);



--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE mfa_challenges (
    id char(36) NOT NULL,
    factor_id char(36) NOT NULL,
    created_at timestamp NOT NULL,
    verified_at timestamp,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data json
);



--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE mfa_factors (
    id char(36) NOT NULL,
    user_id char(36) NOT NULL,
    friendly_name text,
    factor_type factor_type NOT NULL,
    status factor_status NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp,
    web_authn_credential json,
    web_authn_aaguid char(36)
);



--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE one_time_tokens (
    id char(36) NOT NULL,
    user_id char(36) NOT NULL,
    token_type one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);



--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE refresh_tokens (
    instance_id char(36),
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked tinyint(1),
    created_at timestamp,
    updated_at timestamp,
    parent character varying(255),
    session_id char(36)
);



--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE saml_providers (
    id char(36) NOT NULL,
    sso_provider_id char(36) NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping json,
    created_at timestamp,
    updated_at timestamp,
    name_id_format text,
    CONSTRAINT `entity_id not empty` CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT `metadata_url not empty` CHECK (((metadata_url = NULL) OR (char_length(metadata_url) > 0))),
    CONSTRAINT `metadata_xml not empty` CHECK ((char_length(metadata_xml) > 0))
);



--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE saml_relay_states (
    id char(36) NOT NULL,
    sso_provider_id char(36) NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp,
    updated_at timestamp,
    flow_state_id char(36),
    CONSTRAINT `request_id not empty` CHECK ((char_length(request_id) > 0))
);



--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);



--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE sessions (
    id char(36) NOT NULL,
    user_id char(36) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    factor_id char(36),
    aal aal_level,
    not_after timestamp,
    refreshed_at timestamp,
    user_agent text,
    ip inet,
    tag text
);



--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE sso_domains (
    id char(36) NOT NULL,
    sso_provider_id char(36) NOT NULL,
    domain text NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT `domain not empty` CHECK ((char_length(domain) > 0))
);



--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE sso_providers (
    id char(36) NOT NULL,
    resource_id text,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT `resource_id not empty` CHECK (((resource_id = NULL) OR (char_length(resource_id) > 0)))
);



--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE users (
    instance_id char(36),
    id char(36) NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp,
    invited_at timestamp,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp,
    recovery_token character varying(255),
    recovery_sent_at timestamp,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp,
    last_sign_in_at timestamp,
    raw_app_meta_data json,
    raw_user_meta_data json,
    is_super_admin tinyint(1),
    created_at timestamp,
    updated_at timestamp,
    phone text DEFAULT NULL,
    phone_confirmed_at timestamp,
    phone_change text DEFAULT '',
    phone_change_token character varying(255) DEFAULT '',
    phone_change_sent_at timestamp,
    confirmed_at timestamp GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT '',
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp,
    reauthentication_token character varying(255) DEFAULT '',
    reauthentication_sent_at timestamp,
    is_sso_user tinyint(1) DEFAULT false NOT NULL,
    deleted_at timestamp,
    is_anonymous tinyint(1) DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);



--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE activity_logs (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    entity_name text NOT NULL,
    user_id char(36),
    user_name text NOT NULL,
    details json,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: chamados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    cliente_id char(36) NOT NULL,
    titulo text NOT NULL,
    mensagem text NOT NULL,
    resposta text,
    arquivo_url text,
    respondido_por char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    aberto_por text DEFAULT 'cliente',
    status_detalhado text,
    categoria text DEFAULT 'outros',
    prioridade text DEFAULT 'media',
    nota_interna text,
    tempo_resposta_horas integer,
    status ticket_status DEFAULT 'novo'.ticket_status NOT NULL
);



--
-- Name: chamados_anexos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados_anexos (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    chamado_id char(36),
    nome_arquivo text NOT NULL,
    url_arquivo text NOT NULL,
    tipo_arquivo text NOT NULL,
    tamanho_arquivo bigint,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    uploaded_by char(36)
);



--
-- Name: chamados_historico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados_historico (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    chamado_id char(36) NOT NULL,
    acao text NOT NULL,
    usuario_id char(36),
    usuario_nome text NOT NULL,
    detalhes text,
    data_acao timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: chamados_mensagens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados_mensagens (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    chamado_id char(36) NOT NULL,
    conteudo text NOT NULL,
    arquivo_url text,
    autor_id char(36),
    autor_nome text NOT NULL,
    autor_tipo text DEFAULT 'cliente',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    metadata json DEFAULT '{}',
    CONSTRAINT chamados_mensagens_autor_tipo_check CHECK ((autor_tipo = ANY (ARRAY['cliente', 'admin', 'sistema'])))
);



--
-- Name: chamados_timeline; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados_timeline (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    chamado_id char(36),
    tipo text DEFAULT 'mensagem',
    conteudo text,
    autor_id char(36),
    autor_nome text NOT NULL,
    autor_tipo text DEFAULT 'cliente',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    metadata json DEFAULT '{}'
);



--
-- Name: client_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client_permissions (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    client_id char(36) NOT NULL,
    module client_module NOT NULL,
    enabled tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: client_report_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client_report_permissions (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    client_id char(36) NOT NULL,
    report_type report_type NOT NULL,
    enabled tinyint(1) DEFAULT true NOT NULL,
    account_ids text[] DEFAULT '{}'[],
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE clientes (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    user_id char(36) NOT NULL,
    nome text NOT NULL,
    tipo_acesso access_type DEFAULT 'api'.access_type NOT NULL,
    ativo tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text,
    telefone text,
    empresa text,
    observacoes_internas text,
    responsavel_conta char(36),
    contas_meta text[]
);



--
-- Name: contas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE contas (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    cliente_id char(36) NOT NULL,
    tipo account_type NOT NULL,
    identificador text NOT NULL,
    nome text NOT NULL,
    ativo tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: criativos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE criativos (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    cliente_id char(36) NOT NULL,
    titulo text NOT NULL,
    descricao text,
    arquivo_url text NOT NULL,
    tipo_arquivo text NOT NULL,
    status creative_status DEFAULT 'pendente'.creative_status NOT NULL,
    resposta text,
    comentario_cliente text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    campanha text,
    nome_criativo text,
    titulo_anuncio text,
    descricao_anuncio text
);



--
-- Name: meta_api_credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE meta_api_credentials (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    app_id text NOT NULL,
    app_secret text NOT NULL,
    access_token text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: metrics_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE metrics_config (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    config json DEFAULT '{`ads`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`], `adsets`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`], `campaigns`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`, `reach`], `dashboard`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`]}'
);



--
-- Name: permission_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE permission_logs (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    target_user_id char(36),
    changed_by char(36),
    action text NOT NULL,
    permission permission_type,
    details json,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: permission_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE permission_templates (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    permissions permission_type[] DEFAULT '{}'.permission_type[] NOT NULL,
    created_by char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE profiles (
    id char(36) NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    role user_role DEFAULT 'admin'.user_role NOT NULL,
    ativo tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_root_admin tinyint(1) DEFAULT false,
    foto_url text,
    status text DEFAULT 'ativo'
);



--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE projects (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    client_id char(36),
    created_by char(36) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    status text DEFAULT 'ativo',
    responsible_id char(36),
    start_date timestamp,
    end_date timestamp
);



--
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sections (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    project_id char(36),
    order_index integer,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE settings (
    id bigint NOT NULL,
    client_id char(36),
    data json,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE settings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: system_activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE system_activity_logs (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    usuario_id char(36),
    usuario_nome text NOT NULL,
    acao text NOT NULL,
    modulo text NOT NULL,
    detalhes json,
    ip_address inet,
    user_agent text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: task_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE task_comments (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    task_id char(36) NOT NULL,
    author_id char(36) NOT NULL,
    content text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: task_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE task_steps (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    task_id char(36),
    content text,
    checked tinyint(1) DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tasks (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    status text,
    priority text,
    due_date date,
    tags text[],
    project_id char(36),
    owner_id char(36),
    created_by char(36),
    linked_ticket_id char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    type text DEFAULT 'geral',
    actual_hours numeric,
    assigned_to char(36),
    estimated_hours numeric,
    order_index integer,
    section_id char(36),
    start_date date,
    updated_at timestamp
);



--
-- Name: user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_permissions (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    user_id char(36),
    permission permission_type NOT NULL,
    granted_by char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usuarios (
    id char(36) NOT NULL,
    nome text,
    tipo text DEFAULT 'cliente',
    criado_em timestamp DEFAULT timezone('utc', CURRENT_TIMESTAMP),
    CONSTRAINT usuarios_tipo_check CHECK ((tipo = ANY (ARRAY['admin', 'cliente'])))
);



--
-- Name: whatsapp_campaign_executions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_campaign_executions (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    campaign_id char(36),
    execution_date timestamp NOT NULL,
    status text DEFAULT 'pending',
    messages_sent integer DEFAULT 0,
    messages_delivered integer DEFAULT 0,
    messages_failed integer DEFAULT 0,
    execution_details json,
    error_message text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    completed_at timestamp
);



--
-- Name: whatsapp_campaigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_campaigns (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    template_id char(36),
    meta_account_id text,
    frequency text NOT NULL,
    day_of_week integer,
    send_time time without time zone NOT NULL,
    data_period_days integer DEFAULT 7,
    is_active tinyint(1) DEFAULT true,
    contacts json DEFAULT '{}'[],
    variables_mapping json DEFAULT '{}',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    timezone text DEFAULT 'America/Sao_Paulo',
    next_execution timestamp,
    last_execution timestamp,
    CONSTRAINT whatsapp_campaigns_day_of_week_check CHECK (((day_of_week >= 0) AND (day_of_week <= 6))),
    CONSTRAINT whatsapp_campaigns_frequency_check CHECK ((frequency = ANY (ARRAY['diario', 'semanal', 'mensal']))),
    CONSTRAINT whatsapp_campaigns_type_check CHECK ((type = ANY (ARRAY['relatorio', 'financeiro', 'promocional', 'suporte'])))
);



--
-- Name: whatsapp_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_config (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    phone_number_id text NOT NULL,
    access_token text NOT NULL,
    business_account_id text,
    webhook_verify_token text,
    status text DEFAULT 'disconnected',
    last_verified_at timestamp,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT whatsapp_config_status_check CHECK ((status = ANY (ARRAY['connected', 'disconnected', 'error'])))
);



--
-- Name: whatsapp_contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_contacts (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    phone_number text NOT NULL,
    client_id char(36),
    tags text[] DEFAULT '{}'[],
    is_active tinyint(1) DEFAULT true,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    meta_account_id text,
    grupo text,
    observacoes text
);



--
-- Name: whatsapp_message_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_message_logs (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    message_id char(36),
    status text DEFAULT 'sent',
    whatsapp_message_id text,
    `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
    error_details json,
    webhook_data json,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: whatsapp_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_messages (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    campaign_id char(36),
    template_id char(36),
    contact_id char(36),
    phone_number text NOT NULL,
    message_type text NOT NULL,
    template_name text,
    template_variables json DEFAULT '{}',
    message_content text,
    whatsapp_message_id text,
    status text DEFAULT 'pending',
    error_message text,
    sent_at timestamp,
    delivered_at timestamp,
    read_at timestamp,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT whatsapp_messages_message_type_check CHECK ((message_type = ANY (ARRAY['template', 'text']))),
    CONSTRAINT whatsapp_messages_status_check CHECK ((status = ANY (ARRAY['pending', 'sent', 'delivered', 'read', 'failed'])))
);



--
-- Name: whatsapp_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE whatsapp_templates (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    language text DEFAULT 'pt_BR',
    category text NOT NULL,
    status text NOT NULL,
    header_type text,
    header_text text,
    body_text text NOT NULL,
    footer_text text,
    variables json DEFAULT '[]',
    components json NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT whatsapp_templates_category_check CHECK ((category = ANY (ARRAY['MARKETING', 'UTILITY', 'AUTHENTICATION']))),
    CONSTRAINT whatsapp_templates_header_type_check CHECK ((header_type = ANY (ARRAY['TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT']))),
    CONSTRAINT whatsapp_templates_status_check CHECK ((status = ANY (ARRAY['APPROVED', 'PENDING', 'REJECTED'])))
);



--
-- Name: workflow_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE workflow_templates (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    category text,
    icon text,
    steps json NOT NULL,
    created_by char(36),
    is_public tinyint(1) DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload json,
    event text,
    private tinyint(1) DEFAULT false,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    inserted_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id char(36) DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);



--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);



--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id char(36) NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'.user_defined_filter[] NOT NULL,
    claims json NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'))) STORED NOT NULL,
    created_at timestamp DEFAULT timezone('utc', CURRENT_TIMESTAMP) NOT NULL
);



--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    public tinyint(1) DEFAULT false,
    avif_autodetection tinyint(1) DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);



--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner char(36),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at timestamp DEFAULT CURRENT_TIMESTAMP,
    metadata json,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED,
    version text,
    owner_id text,
    user_metadata json
);



--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog.`C`,
    version text NOT NULL,
    owner_id text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_metadata json
);



--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id char(36) DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog.`C`,
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text,
    created_by text,
    idempotency_key text
);



--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_anexos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_historico; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_timeline; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: client_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: client_report_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: contas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: criativos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: meta_api_credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: metrics_config; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: permission_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: permission_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: system_activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: task_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: task_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_campaign_executions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_campaigns; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_config; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_message_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workflow_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('refresh_tokens_id_seq', 561, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('settings_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: chamados_anexos chamados_anexos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_anexos_pkey PRIMARY KEY (id);


--
-- Name: chamados_historico chamados_historico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_historico_pkey PRIMARY KEY (id);


--
-- Name: chamados_mensagens chamados_mensagens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_mensagens_pkey PRIMARY KEY (id);


--
-- Name: chamados chamados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_pkey PRIMARY KEY (id);


--
-- Name: chamados_timeline chamados_timeline_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_timeline_pkey PRIMARY KEY (id);


--
-- Name: client_permissions client_permissions_client_id_module_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_permissions_client_id_module_key UNIQUE (client_id, module);


--
-- Name: client_permissions client_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_permissions_pkey PRIMARY KEY (id);


--
-- Name: client_report_permissions client_report_permissions_client_id_report_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_report_permissions_client_id_report_type_key UNIQUE (client_id, report_type);


--
-- Name: client_report_permissions client_report_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_report_permissions_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT clientes_user_id_key UNIQUE (user_id);


--
-- Name: contas contas_cliente_id_tipo_identificador_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT contas_cliente_id_tipo_identificador_key UNIQUE (cliente_id, tipo, identificador);


--
-- Name: contas contas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT contas_pkey PRIMARY KEY (id);


--
-- Name: criativos criativos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT criativos_pkey PRIMARY KEY (id);


--
-- Name: meta_api_credentials meta_api_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT meta_api_credentials_pkey PRIMARY KEY (id);


--
-- Name: metrics_config metrics_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT metrics_config_pkey PRIMARY KEY (id);


--
-- Name: permission_logs permission_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT permission_logs_pkey PRIMARY KEY (id);


--
-- Name: permission_templates permission_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT permission_templates_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: system_activity_logs system_activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT system_activity_logs_pkey PRIMARY KEY (id);


--
-- Name: task_comments task_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT task_comments_pkey PRIMARY KEY (id);


--
-- Name: task_steps task_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT task_steps_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_permissions user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT user_permissions_pkey PRIMARY KEY (id);


--
-- Name: user_permissions user_permissions_user_id_permission_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT user_permissions_user_id_permission_key UNIQUE (user_id, permission);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_campaign_executions whatsapp_campaign_executions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_campaign_executions_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_campaigns whatsapp_campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_campaigns_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_config whatsapp_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_config_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_contacts whatsapp_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_contacts_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_message_logs whatsapp_message_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_message_logs_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_messages whatsapp_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_messages_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_templates whatsapp_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_templates_pkey PRIMARY KEY (id);


--
-- Name: workflow_templates workflow_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT workflow_templates_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_idempotency_key_key; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

    ADD CONSTRAINT schema_migrations_idempotency_key_key UNIQUE (idempotency_key);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON users USING btree (confirmation_token) WHERE ((confirmation_token)!~ '^[0-9 ]*$');


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON users USING btree (email_change_token_current) WHERE ((email_change_token_current)!~ '^[0-9 ]*$');


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON users USING btree (email_change_token_new) WHERE ((email_change_token_new)!~ '^[0-9 ]*$');


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> '');


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON users USING btree (reauthentication_token) WHERE ((reauthentication_token)!~ '^[0-9 ]*$');


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON users USING btree (recovery_token) WHERE ((recovery_token)!~ '^[0-9 ]*$');


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON users USING btree (instance_id, lower((email)));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON users USING btree (is_anonymous);


--
-- Name: idx_activity_logs_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_logs_created_at ON activity_logs USING btree (created_at DESC);


--
-- Name: idx_activity_logs_entity_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_logs_entity_type ON activity_logs USING btree (entity_type);


--
-- Name: idx_activity_logs_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_logs_user_id ON activity_logs USING btree (user_id);


--
-- Name: idx_tasks_assigned_to; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_assigned_to ON tasks USING btree (assigned_to);


--
-- Name: idx_tasks_order_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_order_index ON tasks USING btree (order_index);


--
-- Name: idx_tasks_section_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_section_id ON tasks USING btree (section_id);


--
-- Name: idx_tasks_updated_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_updated_at ON tasks USING btree (updated_at);


--
-- Name: idx_whatsapp_campaign_executions_campaign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_campaign_executions_campaign ON whatsapp_campaign_executions USING btree (campaign_id);


--
-- Name: idx_whatsapp_campaign_executions_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_campaign_executions_date ON whatsapp_campaign_executions USING btree (execution_date);


--
-- Name: idx_whatsapp_campaigns_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_campaigns_active ON whatsapp_campaigns USING btree (is_active);


--
-- Name: idx_whatsapp_contacts_client_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_contacts_client_id ON whatsapp_contacts USING btree (client_id);


--
-- Name: idx_whatsapp_contacts_phone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_contacts_phone ON whatsapp_contacts USING btree (phone_number);


--
-- Name: idx_whatsapp_contacts_tags; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_contacts_tags ON whatsapp_contacts USING gin (tags);


--
-- Name: idx_whatsapp_messages_campaign_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_messages_campaign_id ON whatsapp_messages USING btree (campaign_id);


--
-- Name: idx_whatsapp_messages_phone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_messages_phone ON whatsapp_messages USING btree (phone_number);


--
-- Name: idx_whatsapp_messages_sent_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_messages_sent_at ON whatsapp_messages USING btree (sent_at);


--
-- Name: idx_whatsapp_messages_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_whatsapp_messages_status ON whatsapp_messages USING btree (status);


--
-- Name: idx_workflow_templates_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_workflow_templates_category ON workflow_templates USING btree (category);


--
-- Name: idx_workflow_templates_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_workflow_templates_created_at ON workflow_templates USING btree (created_at);


--
-- Name: idx_workflow_templates_created_by; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_workflow_templates_created_by ON workflow_templates USING btree (created_by);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE `C`);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


--
-- Name: chamados chamado_historico_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER chamado_historico_trigger AFTER INSERT OR UPDATE ON chamados FOR EACH ROW EXECUTE FUNCTION create_chamado_historico();


--
-- Name: clientes create_client_permissions_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER create_client_permissions_trigger AFTER INSERT ON clientes FOR EACH ROW EXECUTE FUNCTION create_default_client_permissions();


--
-- Name: user_permissions permission_changes_log; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER permission_changes_log AFTER INSERT OR DELETE ON user_permissions FOR EACH ROW EXECUTE FUNCTION log_permission_changes();


--
-- Name: chamados ticket_timeline_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER ticket_timeline_trigger AFTER INSERT OR UPDATE ON chamados FOR EACH ROW EXECUTE FUNCTION create_ticket_timeline_entry();


--
-- Name: chamados_mensagens trigger_timeline_entry_mensagens; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_timeline_entry_mensagens AFTER INSERT ON chamados_mensagens FOR EACH ROW EXECUTE FUNCTION create_ticket_timeline_entry();


--
-- Name: chamados_mensagens trigger_update_status_on_client_message; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_status_on_client_message AFTER INSERT ON chamados_mensagens FOR EACH ROW EXECUTE FUNCTION update_ticket_status_on_message();


--
-- Name: chamados update_chamados_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_chamados_updated_at BEFORE UPDATE ON chamados FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: clientes update_clientes_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: criativos update_criativos_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_criativos_updated_at BEFORE UPDATE ON criativos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: chamados update_ticket_status_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_ticket_status_trigger BEFORE INSERT OR UPDATE ON chamados FOR EACH ROW EXECUTE FUNCTION update_ticket_detailed_status();


--
-- Name: whatsapp_campaigns update_whatsapp_campaigns_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_whatsapp_campaigns_updated_at BEFORE UPDATE ON whatsapp_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: whatsapp_config update_whatsapp_config_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_whatsapp_config_updated_at BEFORE UPDATE ON whatsapp_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: whatsapp_contacts update_whatsapp_contacts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_whatsapp_contacts_updated_at BEFORE UPDATE ON whatsapp_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: whatsapp_templates update_whatsapp_templates_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_whatsapp_templates_updated_at BEFORE UPDATE ON whatsapp_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES sso_providers(id) ON DELETE CASCADE;


--
-- Name: activity_logs activity_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: chamados_anexos chamados_anexos_chamado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_anexos_chamado_id_fkey FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE;


--
-- Name: chamados_anexos chamados_anexos_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_anexos_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES users(id);


--
-- Name: chamados chamados_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE;


--
-- Name: chamados_historico chamados_historico_chamado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_historico_chamado_id_fkey FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE;


--
-- Name: chamados_historico chamados_historico_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_historico_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES profiles(id);


--
-- Name: chamados chamados_respondido_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_respondido_por_fkey FOREIGN KEY (respondido_por) REFERENCES profiles(id);


--
-- Name: chamados_timeline chamados_timeline_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_timeline_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES users(id);


--
-- Name: chamados_timeline chamados_timeline_chamado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT chamados_timeline_chamado_id_fkey FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE;


--
-- Name: client_permissions client_permissions_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_permissions_client_id_fkey FOREIGN KEY (client_id) REFERENCES clientes(id) ON DELETE CASCADE;


--
-- Name: client_report_permissions client_report_permissions_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT client_report_permissions_client_id_fkey FOREIGN KEY (client_id) REFERENCES clientes(id) ON DELETE CASCADE;


--
-- Name: clientes clientes_responsavel_conta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT clientes_responsavel_conta_fkey FOREIGN KEY (responsavel_conta) REFERENCES profiles(id);


--
-- Name: clientes clientes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT clientes_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;


--
-- Name: contas contas_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT contas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE;


--
-- Name: criativos criativos_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT criativos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE;


--
-- Name: projects fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT;


--
-- Name: tasks fk_linked_ticket; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_linked_ticket FOREIGN KEY (linked_ticket_id) REFERENCES chamados(id) ON DELETE SET NULL;


--
-- Name: projects fk_projects_responsible; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_projects_responsible FOREIGN KEY (responsible_id) REFERENCES profiles(id);


--
-- Name: task_comments fk_task_comments_author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_task_comments_author FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: task_comments fk_task_comments_task; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_task_comments_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE;


--
-- Name: tasks fk_tasks_assigned_to; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_tasks_assigned_to FOREIGN KEY (assigned_to) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: tasks fk_tasks_section; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT fk_tasks_section FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL;


--
-- Name: permission_logs permission_logs_changed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT permission_logs_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES profiles(id);


--
-- Name: permission_logs permission_logs_target_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT permission_logs_target_user_id_fkey FOREIGN KEY (target_user_id) REFERENCES profiles(id);


--
-- Name: permission_templates permission_templates_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT permission_templates_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: projects projects_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES clientes(id);


--
-- Name: projects projects_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT projects_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: sections sections_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT sections_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;


--
-- Name: settings settings_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT settings_client_id_fkey FOREIGN KEY (client_id) REFERENCES clientes(id);


--
-- Name: system_activity_logs system_activity_logs_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT system_activity_logs_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES profiles(id);


--
-- Name: task_steps task_steps_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT task_steps_task_id_fkey FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT tasks_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: tasks tasks_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT tasks_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;


--
-- Name: user_permissions user_permissions_granted_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT user_permissions_granted_by_fkey FOREIGN KEY (granted_by) REFERENCES profiles(id);


--
-- Name: user_permissions user_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT user_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;


--
-- Name: usuarios usuarios_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: whatsapp_campaign_executions whatsapp_campaign_executions_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_campaign_executions_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES whatsapp_campaigns(id) ON DELETE CASCADE;


--
-- Name: whatsapp_campaigns whatsapp_campaigns_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_campaigns_template_id_fkey FOREIGN KEY (template_id) REFERENCES whatsapp_templates(id) ON DELETE CASCADE;


--
-- Name: whatsapp_contacts whatsapp_contacts_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_contacts_client_id_fkey FOREIGN KEY (client_id) REFERENCES clientes(id) ON DELETE SET NULL;


--
-- Name: whatsapp_message_logs whatsapp_message_logs_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_message_logs_message_id_fkey FOREIGN KEY (message_id) REFERENCES whatsapp_messages(id) ON DELETE CASCADE;


--
-- Name: whatsapp_messages whatsapp_messages_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_messages_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES whatsapp_campaigns(id) ON DELETE SET NULL;


--
-- Name: whatsapp_messages whatsapp_messages_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_messages_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES whatsapp_contacts(id) ON DELETE CASCADE;


--
-- Name: whatsapp_messages whatsapp_messages_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT whatsapp_messages_template_id_fkey FOREIGN KEY (template_id) REFERENCES whatsapp_templates(id) ON DELETE SET NULL;


--
-- Name: workflow_templates workflow_templates_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

    ADD CONSTRAINT workflow_templates_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT `objects_bucketId_fkey` FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

--
-- Name: tasks Admin pode ver todas as tarefas; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles p
  WHERE ((p.id = uid()) AND (p.role = 'admin'.user_role)))));


--
-- Name: whatsapp_campaigns Admins can access whatsapp_campaigns; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_config Admins can access whatsapp_config; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_contacts Admins can access whatsapp_contacts; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_messages Admins can access whatsapp_messages; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_templates Admins can access whatsapp_templates; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: projects Admins can delete projects; Type: POLICY; Schema: public; Owner: postgres
--

   FROM user_permissions up
  WHERE ((up.user_id = uid()) AND (up.permission = 'manage_clients'.permission_type)))));


--
-- Name: client_permissions Admins can manage all client permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND ((profiles.role = 'admin'.user_role) OR (profiles.is_root_admin = true))))));


--
-- Name: client_report_permissions Admins can manage all client report permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND ((profiles.role = 'admin'.user_role) OR (profiles.is_root_admin = true))))));


--
-- Name: clientes Admins can manage all clients; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Admins can manage all creatives; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Admins can manage all tickets; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: clientes Admins can manage clients; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: activity_logs Admins can view all activity logs; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: clientes Admins can view all clients; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: system_activity_logs Admins can view all logs, users only their own; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE (profiles.id = uid())) = 'admin'.user_role) OR (usuario_id = uid())));


--
-- Name: chamados Admins can view all tickets; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Admins podem atualizar qualquer perfil; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Admins podem gerenciar chamados; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: clientes Admins podem gerenciar clientes; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: contas Admins podem gerenciar contas; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Admins podem gerenciar criativos; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Admins podem inserir perfis; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: contas Admins podem ver todas as contas; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Admins podem ver todos os chamados; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: clientes Admins podem ver todos os clientes; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Admins podem ver todos os criativos; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: system_activity_logs All authenticated users can insert logs; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_campaigns Allow all access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_config Allow all access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_contacts Allow all access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_messages Allow all access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_templates Allow all access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: metrics_config Allow all access to metrics config; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_campaign_executions Allow all access to whatsapp_campaign_executions; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_message_logs Allow all access to whatsapp_message_logs; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Allow authenticated users to read their permissions; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: tasks Allow insert for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: usuarios Allow insert for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: permission_logs Allow insert own permission logs; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: settings Clientes acessam só seus settings; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: clientes Clients can manage their own data; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: client_permissions Clients can view their own permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: client_report_permissions Clients can view their own report permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: chamados Clients can view their own tickets; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados_anexos Inserir anexos próprios; Type: POLICY; Schema: public; Owner: postgres
--

   FROM chamados c
  WHERE ((c.id = chamados_anexos.chamado_id) AND ((c.cliente_id = ( SELECT get_user_cliente_id() AS get_user_cliente_id)) OR is_admin())))));


--
-- Name: chamados_timeline Inserir timeline própria; Type: POLICY; Schema: public; Owner: postgres
--

   FROM chamados c
  WHERE ((c.id = chamados_timeline.chamado_id) AND ((c.cliente_id = ( SELECT get_user_cliente_id() AS get_user_cliente_id)) OR is_admin())))));


--
-- Name: profiles Ler meu próprio perfil; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Ler permissões do usuário; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados_historico Only authenticated users can insert historico; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: tasks Permitir deletar tarefas; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Read My Permissions; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Read Own Permissions; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Read Own Profile; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Read own permissions; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Read own profile; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: activity_logs System can insert activity logs; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: projects Users can create projects; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: tasks Users can create tasks; Type: POLICY; Schema: public; Owner: postgres
--

   FROM user_permissions up
  WHERE ((up.user_id = uid()) AND (up.permission = 'access_tasks'.permission_type))))));


--
-- Name: chamados Users can create tickets; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Users can create tickets for their client; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: task_comments Users can insert their own comments; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions Users can manage permissions with manage_collaborators permissi; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND (profiles.is_root_admin = true))))));


--
-- Name: permission_templates Users can manage templates with manage_collaborators permission; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND (profiles.is_root_admin = true))))));


--
-- Name: projects Users can read projects; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: tasks Users can read tasks; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Users can update creatives for their client; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: projects Users can update own projects; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: tasks Users can update tasks; Type: POLICY; Schema: public; Owner: postgres
--

   FROM user_permissions up
  WHERE ((up.user_id = uid()) AND (up.permission = 'assign_tasks'.permission_type))))));


--
-- Name: chamados Users can update their client tickets; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: chamados Users can update tickets; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados_historico Users can view chamados_historico based on access; Type: POLICY; Schema: public; Owner: postgres
--

CASE
    WHEN (( SELECT profiles.role
       FROM profiles
      WHERE (profiles.id = uid())) = 'admin'.user_role) THEN true
    ELSE (chamado_id IN ( SELECT chamados.id
       FROM chamados
      WHERE (chamados.cliente_id = ( SELECT get_user_cliente_id() AS get_user_cliente_id))))
END);


--
-- Name: criativos Users can view creatives for their client; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: permission_logs Users can view logs with view_system_logs permission; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND (profiles.is_root_admin = true))))));


--
-- Name: profiles Users can view own profile or if has permission; Type: POLICY; Schema: public; Owner: postgres
--

   FROM user_permissions
  WHERE (user_permissions.permission = 'manage_collaborators'.permission_type))) OR (EXISTS ( SELECT 1
   FROM user_permissions
  WHERE ((user_permissions.user_id = uid()) AND (user_permissions.permission = 'view_system_logs'.permission_type))))));


--
-- Name: user_permissions Users can view permissions with manage_collaborators permission; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND (profiles.is_root_admin = true))))));


--
-- Name: permission_templates Users can view templates with manage_collaborators permission; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND (profiles.is_root_admin = true))))));


--
-- Name: clientes Users can view their own client data; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Users can view tickets from their client; Type: POLICY; Schema: public; Owner: postgres
--

   FROM clientes
  WHERE (clientes.user_id = uid()))));


--
-- Name: profiles Usuários podem atualizar seu próprio perfil; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Usuários podem atualizar seus próprios chamados; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Usuários podem atualizar seus próprios criativos; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Usuários podem criar chamados; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: clientes Usuários podem ver seu próprio cliente; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Usuários podem ver seu próprio perfil; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados Usuários podem ver seus próprios chamados; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: criativos Usuários podem ver seus próprios criativos; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: contas Usuários podem ver suas próprias contas; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles Ver perfil se for o dono ou root; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles p
  WHERE ((p.id = uid()) AND (p.is_root_admin = true))))));


--
-- Name: user_permissions Ver permissões se for o dono ou root; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles p
  WHERE ((p.id = uid()) AND (p.is_root_admin = true))))));


--
-- Name: chamados_anexos Visualizar anexos próprios; Type: POLICY; Schema: public; Owner: postgres
--

   FROM chamados c
  WHERE ((c.id = chamados_anexos.chamado_id) AND ((c.cliente_id = ( SELECT get_user_cliente_id() AS get_user_cliente_id)) OR is_admin())))));


--
-- Name: chamados_timeline Visualizar timeline própria; Type: POLICY; Schema: public; Owner: postgres
--

   FROM chamados c
  WHERE ((c.id = chamados_timeline.chamado_id) AND ((c.cliente_id = ( SELECT get_user_cliente_id() AS get_user_cliente_id)) OR is_admin())))));


--
-- Name: activity_logs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: user_permissions allow_own_permissions_select; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles allow_own_profile_select; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles allow_own_profile_update; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: permission_logs allow_root_admin_logs_select; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions allow_root_admin_permissions_all; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions allow_root_admin_permissions_select; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles allow_root_admin_select_all; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: permission_templates allow_root_admin_templates_all; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: permission_templates allow_root_admin_templates_select; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: profiles allow_root_admin_update_all; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: chamados; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE chamados ENABLE ROW LEVEL SECURITY;

--
-- Name: chamados_anexos; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE chamados_anexos ENABLE ROW LEVEL SECURITY;

--
-- Name: chamados_historico; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE chamados_historico ENABLE ROW LEVEL SECURITY;

--
-- Name: chamados_timeline; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE chamados_timeline ENABLE ROW LEVEL SECURITY;

--
-- Name: client_permissions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE client_permissions ENABLE ROW LEVEL SECURITY;

--
-- Name: client_report_permissions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE client_report_permissions ENABLE ROW LEVEL SECURITY;

--
-- Name: clientes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

--
-- Name: contas; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE contas ENABLE ROW LEVEL SECURITY;

--
-- Name: criativos; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE criativos ENABLE ROW LEVEL SECURITY;

--
-- Name: meta_api_credentials delete_own_credentials; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: meta_api_credentials insert_own_credentials; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: metrics_config; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE metrics_config ENABLE ROW LEVEL SECURITY;

--
-- Name: permission_logs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE permission_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: permission_templates; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE permission_templates ENABLE ROW LEVEL SECURITY;

--
-- Name: meta_api_credentials select_own_credentials; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: settings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

--
-- Name: system_activity_logs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE system_activity_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: tasks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

--
-- Name: meta_api_credentials update_own_credentials; Type: POLICY; Schema: public; Owner: postgres
--



--
-- Name: user_permissions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

--
-- Name: usuarios; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_campaign_executions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_campaign_executions ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_campaigns; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_campaigns ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_config; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_config ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_contacts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_contacts ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_message_logs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_message_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: whatsapp_templates; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--



--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--



--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--



--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--



--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--



--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--



--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp, OUT minmax_stats_since timestamp); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--



--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: FUNCTION graphql(`operationName` text, query text, variables json, extensions json); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--



--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--



--
-- Name: FUNCTION assign_default_permissions(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION auto_start_task_timer(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION check_is_root_admin(user_id uuid); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION client_has_module_permission(client_user_id uuid, module_name client_module); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION client_has_report_permission(client_user_id uuid, report_name report_type); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION create_chamado_historico(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION create_default_client_permissions(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION create_task_activity(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION create_ticket_timeline_entry(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION get_user_cliente_id(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION get_user_permissions(user_id uuid); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION has_permission(user_id uuid, required_permission permission_type); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION is_admin(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION log_permission_changes(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION log_system_activity(p_acao text, p_modulo text, p_detalhes json, p_ip_address inet, p_user_agent text); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION update_ticket_detailed_status(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION update_ticket_status_on_message(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: FUNCTION apply_rls(wal json, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION `cast`(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION send(payload json, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--



--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--



--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--



--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--



--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--



--
-- Name: TABLE activity_logs; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE chamados; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE chamados_anexos; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE chamados_historico; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE chamados_mensagens; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE chamados_timeline; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE client_permissions; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE client_report_permissions; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE clientes; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE contas; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE criativos; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE meta_api_credentials; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE metrics_config; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE permission_logs; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE permission_templates; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE projects; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE sections; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE settings; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: SEQUENCE settings_id_seq; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE system_activity_logs; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE task_comments; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE task_steps; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE tasks; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE user_permissions; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE usuarios; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_campaign_executions; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_campaigns; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_config; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_contacts; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_message_logs; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_messages; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE whatsapp_templates; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE workflow_templates; Type: ACL; Schema: public; Owner: postgres
--



--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--



--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--



--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--



--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--



--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

