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




--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: access_type; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: account_type; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: client_module; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: creative_status; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: permission_type; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: report_type; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: task_priority; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: task_type; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: ticket_status; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--




--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--




--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--




--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.ENUM('eq','neq','lt','lte','gt','gte','in'),
	value text
);



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



--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal json,
	is_rls_enabled tinyint(1),
	subscription_ids json,
	errors text[]
);



--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--




--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--




--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--


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




--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--




--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--




--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

    END IF;

    END;
$_$;



--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--



--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--




--
-- Name: assign_default_permissions(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: auto_start_task_timer(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: check_is_root_admin(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: client_has_module_permission(uuid, client_module); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: client_has_report_permission(uuid, report_type); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: create_chamado_historico(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: create_default_client_permissions(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: create_task_activity(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: create_ticket_timeline_entry(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: get_user_cliente_id(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: get_user_permissions(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: has_permission(uuid, permission_type); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: is_admin(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: log_permission_changes(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: log_system_activity(text, text, json, inet, text); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: update_ticket_detailed_status(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: update_ticket_status_on_message(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--




--
-- Name: apply_rls(json, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: send(json, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--




--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--




--
-- Name: can_insert_object(text, text, uuid, json); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--




--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--






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
    ENUM('s256','plain') ENUM('s256','plain') NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL
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
    ENUM('totp','webauthn','phone') ENUM('totp','webauthn','phone') NOT NULL,
    status ENUM('unverified','verified') NOT NULL,
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
    token_type ENUM('confirmation_token','reauthentication_token','recovery_token','email_change_token_new','email_change_token_current','phone_change_token') NOT NULL,
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
    aal ENUM('aal1','aal2','aal3'),
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
    id char(36) DEFAULT UUID() NOT NULL,
    ENUM('INSERT','UPDATE','DELETE','TRUNCATE','ERROR') text NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    status ENUM('novo','aguardando_equipe','aguardando_cliente','em_analise','em_andamento','resolvido') DEFAULT 'novo' NOT NULL
);



--
-- Name: chamados_anexos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE chamados_anexos (
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
    client_id char(36) NOT NULL,
    module ENUM('dashboard','chamados','relatorios','criativos') NOT NULL,
    enabled tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: client_report_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client_report_permissions (
    id char(36) DEFAULT UUID() NOT NULL,
    client_id char(36) NOT NULL,
    ENUM('campanhas','conjuntos_anuncios','anuncios','criativos_performance','whatsapp') ENUM('campanhas','conjuntos_anuncios','anuncios','criativos_performance','whatsapp') NOT NULL,
    enabled tinyint(1) DEFAULT true NOT NULL,
    account_ids text[] DEFAULT '{}'[],
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE clientes (
    id char(36) DEFAULT UUID() NOT NULL,
    user_id char(36) NOT NULL,
    nome text NOT NULL,
    tipo_acesso ENUM('api','sheet') DEFAULT 'api' NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
    cliente_id char(36) NOT NULL,
    tipo ENUM('meta','google') NOT NULL,
    identificador text NOT NULL,
    nome text NOT NULL,
    ativo tinyint(1) DEFAULT true NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: criativos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE criativos (
    id char(36) DEFAULT UUID() NOT NULL,
    cliente_id char(36) NOT NULL,
    titulo text NOT NULL,
    descricao text,
    arquivo_url text NOT NULL,
    tipo_arquivo text NOT NULL,
    status ENUM('pendente','aprovado','reprovado','ajuste_solicitado') DEFAULT 'pendente' NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
    app_id text NOT NULL,
    app_secret text NOT NULL,
    access_token text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: metrics_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE metrics_config (
    id char(36) DEFAULT UUID() NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    config json DEFAULT '{`ads`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`], `adsets`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`], `campaigns`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`, `reach`], `dashboard`: [`impressions`, `clicks`, `spend`, `ctr`, `cpc`]}'
);



--
-- Name: permission_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE permission_logs (
    id char(36) DEFAULT UUID() NOT NULL,
    target_user_id char(36),
    changed_by char(36),
    ENUM('INSERT','UPDATE','DELETE','TRUNCATE','ERROR') text NOT NULL,
    permission ENUM('access_dashboard','access_whatsapp','create_campaigns','edit_campaigns','view_templates','send_messages','view_metrics','access_tasks','create_tasks','assign_tasks','finalize_tasks','edit_execution_time','access_calls','create_calls','finalize_calls','link_calls_to_tasks','access_creatives','create_edit_creatives','approve_creatives','view_change_history','access_paid_media','create_campaigns_media','view_metrics_media','access_reports','create_automatic_reports','manage_user_settings','manage_collaborators','manage_whatsapp_templates','manage_api_settings','manage_appearance_and_visual_identity','manage_external_integrations','manage_variables_and_pre_configurations','view_billing_settings','view_system_logs','access_client_reports','manage_clients','delete_campaigns','create_adsets','edit_adsets','delete_adsets','create_ads','edit_ads','delete_ads','export_data','manage_creatives','upload_creatives','edit_creatives','delete_creatives','view_tickets','create_tickets','edit_tickets','resolve_tickets','create_collaborators','edit_collaborators','delete_collaborators','create_campaigns_whatsapp','manage_contacts','edit_tasks','delete_tasks','manage_tasks'),
    details json,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: permission_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE permission_templates (
    id char(36) DEFAULT UUID() NOT NULL,
    name text NOT NULL,
    description text,
    permissions ENUM('access_dashboard','access_whatsapp','create_campaigns','edit_campaigns','view_templates','send_messages','view_metrics','access_tasks','create_tasks','assign_tasks','finalize_tasks','edit_execution_time','access_calls','create_calls','finalize_calls','link_calls_to_tasks','access_creatives','create_edit_creatives','approve_creatives','view_change_history','access_paid_media','create_campaigns_media','view_metrics_media','access_reports','create_automatic_reports','manage_user_settings','manage_collaborators','manage_whatsapp_templates','manage_api_settings','manage_appearance_and_visual_identity','manage_external_integrations','manage_variables_and_pre_configurations','view_billing_settings','view_system_logs','access_client_reports','manage_clients','delete_campaigns','create_adsets','edit_adsets','delete_adsets','create_ads','edit_ads','delete_ads','export_data','manage_creatives','upload_creatives','edit_creatives','delete_creatives','view_tickets','create_tickets','edit_tickets','resolve_tickets','create_collaborators','edit_collaborators','delete_collaborators','create_campaigns_whatsapp','manage_contacts','edit_tasks','delete_tasks','manage_tasks')[] DEFAULT '{}'[] NOT NULL,
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
    role ENUM('admin','cliente') DEFAULT 'admin' NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
    task_id char(36) NOT NULL,
    author_id char(36) NOT NULL,
    content text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: task_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE task_steps (
    id char(36) DEFAULT UUID() NOT NULL,
    task_id char(36),
    content text,
    checked tinyint(1) DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);



--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tasks (
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
    user_id char(36),
    permission ENUM('access_dashboard','access_whatsapp','create_campaigns','edit_campaigns','view_templates','send_messages','view_metrics','access_tasks','create_tasks','assign_tasks','finalize_tasks','edit_execution_time','access_calls','create_calls','finalize_calls','link_calls_to_tasks','access_creatives','create_edit_creatives','approve_creatives','view_change_history','access_paid_media','create_campaigns_media','view_metrics_media','access_reports','create_automatic_reports','manage_user_settings','manage_collaborators','manage_whatsapp_templates','manage_api_settings','manage_appearance_and_visual_identity','manage_external_integrations','manage_variables_and_pre_configurations','view_billing_settings','view_system_logs','access_client_reports','manage_clients','delete_campaigns','create_adsets','edit_adsets','delete_adsets','create_ads','edit_ads','delete_ads','export_data','manage_creatives','upload_creatives','edit_creatives','delete_creatives','view_tickets','create_tickets','edit_tickets','resolve_tickets','create_collaborators','edit_collaborators','delete_collaborators','create_campaigns_whatsapp','manage_contacts','edit_tasks','delete_tasks','manage_tasks') NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL
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
    id char(36) DEFAULT UUID() NOT NULL,
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
    id char(36) DEFAULT UUID() NOT NULL,
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

INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43d29ca7-fa98-4834-9f3b-0b340f02c11c', '{"action":"user_confirmation_requested","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-13 12:14:10.694228+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '44e5c8d9-506d-46d4-b38b-3f3afd403842', '{"action":"user_recovery_requested","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-13 12:15:28.229193+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4c869dab-eec9-4055-9deb-c3a036f7f9e8', '{"action":"user_signedup","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"team"}', '2025-06-13 12:15:51.35603+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bb0b9032-fcbc-400f-bd4b-a9280d4bcf5e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 12:16:13.711417+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bd017941-7eb8-4eaa-9f3c-fa3c778dd8e0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 12:25:53.998357+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ea6e7051-a29e-4014-9314-e700c7394bc1', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"agencia.cmideias@gmail.com","user_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","user_phone":""}}', '2025-06-13 12:55:56.535169+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fd39064e-de8a-465d-a080-1959bee71c8b', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 13:00:53.27761+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a7d99d0b-16fa-48dd-85a3-afeafc782965', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 13:13:59.316533+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fd7f14ad-9cda-4c26-9ea5-dc7faa7e3e60', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 13:13:59.318021+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2e454690-dace-4b8f-93b9-c5b54023de0c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 13:31:21.143372+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f553e33e-01db-4a99-b2f6-016229f93381', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 13:31:21.144901+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '05eb6649-5a43-4959-a4ed-3a2c48b47515', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 14:25:30.742571+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f9f58c53-c538-418e-a986-1a5d56fa93ff', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 14:31:33.81611+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '30dcd525-d60f-4dc1-add9-1b962a386361', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 14:31:33.817479+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4121aa69-2826-4a2c-abb3-0740525a95d9', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 14:32:59.399205+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4cd60450-951c-4e65-a2d8-1e1928f92d93', '{"action":"user_confirmation_requested","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-13 14:43:26.870012+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1060c64-c873-473a-b96c-a1972915fc0f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.349521+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fff4a2c4-5e44-4365-85c5-a9f636ff19af', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.351473+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f0e684f-a3a4-44a0-898c-1d0faed4f71d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.586777+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd98f1297-531f-4105-b94e-aa6a06d8a8e6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.587403+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc6a1bea-fe0a-4e18-a83b-e3f8d3ada62b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.596906+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5e75cf0f-05c2-4d97-a307-07224e10f8cc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.597721+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '06da5202-adc0-4bee-8a75-c59cb77012ce', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.612362+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3d03efe4-db04-4b08-9bbe-6cfac687efc0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 16:48:33.613207+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '39c66338-0b0f-4c2f-af7d-8377cfb076ee', '{"action":"user_confirmation_requested","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-13 17:44:54.802898+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6a3cfca6-cc62-45a6-bf15-626bccb48f8d', '{"action":"user_signedup","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"team"}', '2025-06-13 17:46:37.436048+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4d1239b-aa38-450e-a2bd-7448ec669730', '{"action":"logout","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-13 17:47:57.87191+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a6adccd0-fead-449e-8a5d-36900129b92f', '{"action":"login","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 17:48:00.063632+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57ed158e-41fa-43e6-91e8-71ed7159ca81', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 17:48:25.179105+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e6fb3665-edcb-4384-91ee-baacb157508a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-13 18:42:45.933628+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbda8f5e-2bf7-479b-8122-8c645df8e3dd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:50:33.546164+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '97d391a5-cdfd-4491-aa31-e3a31c89a6ea', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:50:33.548174+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e8251f43-745b-4a0e-af78-1b8c4477cf86', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:50:42.432634+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd8b124fd-ec87-4449-a001-79f116d16e31', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:50:42.433196+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '97686164-2325-467c-99a9-189dcf781032', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:51:32.623017+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1edbf0d0-1539-42f8-9b55-5a430557388d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 18:51:32.623635+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8abd44f8-b0db-4fb6-a302-5976a27ed3de', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:19:23.380605+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bad26263-171e-4eeb-af19-e7d4c1c31008', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:19:23.38215+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2178fc22-478e-44bd-a008-78191af8ab8f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:41:04.397615+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e6906887-e973-4ba6-8b7c-e7aa6435b7de', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:41:04.399081+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd8233058-3895-4b1c-9016-682e6ff28699', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:49:22.410183+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd986fe8d-69dd-4887-9780-852b108236c7', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 19:49:22.412376+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3dba8bef-7fd1-4ba2-b187-3f7d8ff9d037', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:07:59.179736+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '27525f32-bd56-403f-afee-40e0bba07240', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:07:59.181781+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c269c523-25fe-4234-b0a8-0b1790e0b9b7', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:18:08.002801+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '916d83eb-cc4d-41dd-947f-1987480344fb', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:18:08.0036+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '86a95e8e-06ee-4bca-af38-ae62714183af', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:39:12.043126+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5de8d475-387e-44f3-a677-8d1410646a67', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:39:12.046037+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ca3dfcfd-0d0c-4ad8-8514-7563cc8ef276', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:47:03.216182+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c58ff78f-7844-4539-8d60-aa4b14cba7b9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 20:47:03.218166+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0b7a2762-7b27-45d8-9ece-367af30b661c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:06:31.886867+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3d89bba5-e579-4a0a-b82d-1bb9c7d2401a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:06:31.888848+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'de2258b3-00b9-44d5-aaae-a8bf9a9d4efa', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:21:45.933701+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bb4a280c-baa9-4451-ac83-47039efe1050', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:21:45.935344+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7923d8b1-da64-4552-b252-d2e061e1c80d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:37:17.227934+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5025dc4c-d76d-4e65-bc2e-e4e23d79ff70', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:37:17.228748+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd76e75ab-1423-492b-ae16-dbd265f925bd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:46:16.786184+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '37d13350-c2f5-4178-8884-e80135f09eb0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-13 21:46:16.788026+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ca53fcd3-565b-4106-888e-738c4c7df09f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 06:38:37.810793+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6733cdcc-61ec-4115-a8da-91c001db20f4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 06:38:37.825914+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0d9ce9c2-2884-44a8-acd8-5e19827d25b0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 06:49:56.33734+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '00584ec2-7fba-459a-970b-82fcc5609026', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 06:49:56.340139+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5c5e0732-153a-4680-9512-0d5550881a2d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:36:30.813108+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '856dc652-6a63-4c0b-8c02-0ed2958ec976', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:36:30.816522+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '206800b9-1e37-429f-974d-0f8798af3f72', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:36:33.226632+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1d8dc9f5-d9b2-466f-b85d-ed796aa8be81', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:36:33.227247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fccc0282-f4fa-4b5b-a7fa-319a74b50315', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:37:22.239803+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '504fd1b4-61b5-4a68-96e6-64b1bd34d1ec', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:37:22.24102+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cd308e1b-7bdd-4500-96a5-c65995001cd4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:42:22.160365+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '644a393d-764e-450d-9940-bac4a40e18b4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 07:42:22.161857+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '91d36085-cb00-4a08-80ab-6b4dbe00e01c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:19:49.537159+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b31ea694-c875-48e8-993d-e3062130fac5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:19:49.543178+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd012afd7-e8ef-43fd-a238-345dec157a03', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:34:43.828749+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '60ecebfd-8d6a-4a05-b6ba-bc9d9351be1f', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:34:43.829624+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6da0e398-d502-4abe-912a-1f604312db1a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:41:59.668231+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4711b0db-ecb2-429a-a158-b80d90e23628', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:41:59.66901+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '80446a48-2e3e-439b-81dc-9ab9b8c5d06b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:41:59.937188+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c13b34de-75d5-4942-84d0-73f3213b8ca0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:41:59.937747+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '961f6109-e365-4e25-99ff-3d05a0d3d846', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:42:07.608891+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e7581d7d-7a60-4b79-8e36-c15c2f80c7a8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 08:42:07.609481+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4e31bacb-0191-47cf-a434-f8496d9f7871', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:35:05.388727+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cbbdda5b-c11c-462f-91e0-4432e0aa0ca4', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:35:05.394609+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11691cf9-5878-44bf-9e6f-3a86ed289241', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:40:18.251792+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43a87958-9b8b-4b5e-969f-e7c49b72a7e0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:40:18.253384+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5863ae58-11a1-4a58-af9e-aea7829b0050', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:40:18.279343+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '891d7672-8e65-49e8-af9a-ab0fd9b0e668', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 09:40:18.279898+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '52e233d9-19a3-45be-a29c-cf2dbd5429e9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:19:54.96211+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c66da57d-7a71-4f9e-8c28-88fdd9b919f6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:19:54.964765+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '00ae8b33-1520-484a-abfa-12b0c8a4a007', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:32:59.073187+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '08e95d0f-31b4-4fc9-9f1d-4b515c86ad4c', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:32:59.074566+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1ac1f5df-08c6-41c1-967a-778bedfc54c8', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:45:41.521632+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa807009-8819-4080-9a0a-9c7f13481c6e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:45:41.522407+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '04bb93a1-4df4-4de2-8240-a389cf784aec', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:45:54.083928+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '08ad578d-3b12-4e76-a6b3-2fe877ca67bb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 10:45:54.084579+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bb4ba568-edb2-4072-b961-8e58d0df1647', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 11:20:07.598215+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2f95299c-75bf-4981-b3be-84889bac2906', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 11:20:07.600317+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '833eb1c5-c930-4794-a3f1-9e2b73bc2b5c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 11:25:51.341393+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '05d74d92-0f77-4202-b268-bea4ec130e2a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 11:25:51.346373+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9b1cf818-aef3-4c46-bdfd-e99549d0a279', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.576382+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0191a590-ef80-4c37-9ee4-ae23ffb0c7b9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.577826+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '53408ccf-6128-4907-b6c6-01544f6f2eb0', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.600267+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '362f75a4-9f0c-485b-bf3e-094747ed91d9', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.600901+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '046f82dd-3b31-4c19-ad80-598a0e6a0756', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.619113+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1544ba8-caea-40e0-a13a-8eb8dfe9034f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.619876+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '20e62d12-e4f0-4f38-a0e0-de0492b206e6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.623652+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '021ee17c-a3ab-4725-b9df-338432bb2e64', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:17:34.625668+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8784d1b3-7756-44bd-867d-0fd83325e6db', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:20:14.783722+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0a14a87d-2a8e-44be-b863-29766bdd1715', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 12:20:14.785117+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bf30d564-15bd-4086-9391-9efbb618ddaa', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:19:47.037974+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b30dee71-65e8-43f8-8f2d-186ab0a9d001', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:19:47.039573+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '76f8e528-49ac-43ae-8994-2fc5702657ed', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:22:32.747677+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '07f73e4d-8871-4d10-9b4a-b0773ddb9250', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:22:32.748505+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '919c50c3-87cb-4498-8260-a3ae0aed25c7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:22:43.78421+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'da6aca48-203d-4dbe-8bc9-cdd26a2b2cd0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:22:43.784772+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2bdbb03f-fc57-41d0-942f-a5a3bb6703cc', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:33:58.627512+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b875de5c-15d8-45b6-93d4-6da88141d01c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 13:33:58.628296+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9a783cc0-67cc-4812-971d-e390505266a7', '{"action":"login","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 13:52:02.74512+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '59e9d820-4d54-4dd3-bb51-9ca2043afb01', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-14 13:52:24.293411+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81920874-69e1-4a87-bb23-1f2d4d224a11', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 13:52:42.403498+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ba019b1d-604c-4073-b77a-c3b3c6bac096', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 14:37:09.381636+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b2872b37-9848-479b-9c85-c3911bc1105d', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 14:40:46.359868+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '842cc395-a29c-4ab7-8b2f-827b2b5db731', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 14:40:46.362499+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd77513fe-04c1-4387-b7f0-2b676280ec2e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 14:51:06.953082+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '867a61ce-29cf-4c6c-9501-2110a5eba859', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 14:51:06.95619+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac2fa586-1cb5-46c4-b4c0-47347b48f71b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:46:41.693087+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3db7c05f-0ae4-4a2d-98d4-b3421774c1e1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:46:41.694985+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '27e4c343-d7c0-4e71-b826-47d593585594', '{"action":"token_refreshed","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:47:37.707271+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c5329bcc-f24c-4aa0-ac7d-eeda689fd614', '{"action":"token_revoked","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:47:37.708593+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '66445513-15b1-4b19-b494-d429285dff74', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:53:06.802991+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c730af71-69ca-40a8-9972-98fffd2492a0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 15:53:06.805056+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '58f866a8-0533-4432-9534-abd82a3b1903', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 16:06:09.54606+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e0bae34d-b199-443e-acf3-1774574a470e', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 16:06:09.548001+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3c52d939-48ac-458e-a0f7-a70e614dcb0d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 16:06:42.270925+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '66bdaec6-ae70-49f9-804b-c25ae974f784', '{"action":"token_refreshed","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.117626+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '24fa194e-a5c9-4805-a96b-eab0e4f60248', '{"action":"token_refreshed","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.119484+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1528a29-fcd3-4e08-bf67-02f93163b634', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.119946+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6514e3dc-c4e5-4081-9be7-c7be79a5c063', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.118636+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1cabdcbb-05f9-4a14-b5cc-6a50cbffaee0', '{"action":"token_revoked","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.126961+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '01b98afd-b533-44fb-8d41-61267478f2e4', '{"action":"token_revoked","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.127072+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4186f4b4-6c79-48a1-92cc-a98435a27dda', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.127217+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbb9b864-d15b-4aa4-84b3-cfb16f84b2c4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 21:44:08.129189+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '32c7b120-66ec-4993-864c-5f112e8123d1', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 22:02:35.077407+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2ed052fb-e122-4578-bdaa-f1ab89f35a6a', '{"action":"login","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 22:05:07.657339+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b4df0507-ab6d-45d5-8b19-14f24e05a2fa', '{"action":"user_repeated_signup","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 22:08:57.090693+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b74afbef-8cae-46be-acbd-b878980e22cf', '{"action":"user_repeated_signup","actor_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 22:10:03.906193+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b6b01e29-76c3-4c0f-abb9-11b60ca522fe', '{"action":"user_confirmation_requested","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-14 22:10:30.322078+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '85ae917b-3300-4026-99bb-deae5cbe2fa1', '{"action":"user_signedup","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"team"}', '2025-06-14 22:12:49.010424+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11950d94-2e03-4d08-998f-56428ce47e95', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-14 22:23:46.176473+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '555f3e98-cced-4e1e-add4-8cc907c73404', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:00:52.676695+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8d3761b0-0b69-4600-868c-60246c3aefdc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:00:52.67822+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9b67baf9-f0a6-4333-8c94-174e8179c445', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:10:12.859582+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'af404ce6-052c-4933-a262-ecf9fc65eee1', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:10:12.861212+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '949bb2d8-c4f0-4cce-b801-6c764b7354d6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:21:40.255118+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8a44665a-d6b7-42e1-be47-89c26c97d25e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-14 23:21:40.258485+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5cb168ce-779c-469d-825a-586fe15d6533', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:06:32.556943+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7eef1aeb-8ae5-4e33-9241-37aafe108808', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:06:32.571277+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '360af43e-9417-492d-b287-c16ce63cf7b9', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:08:08.630834+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e48b23f1-b3f1-4ff8-b601-ae4335bee8c1', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:08:08.632346+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '651a9745-bf9c-49f1-ab1b-9bc07da8f826', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:08:45.244442+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7d1411ab-0a1f-408a-9fea-f1111744eb48', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:08:45.247353+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6e7163fd-ced8-48eb-ba0a-9f0c8ec744bb', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 14:17:02.486976+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '53e6fa4b-52cc-421d-ba72-b5bdcff3775e', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-15 14:48:07.466506+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b4992de4-2d4c-455a-b919-e76c8cde4901', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 14:48:15.49917+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1e06c649-3473-408f-b398-f581e3132ea4', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:09:07.529931+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ffea1f51-02ba-4455-8ba2-e355e6e224d8', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:09:07.532378+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8ee0fdfa-cb01-461e-a076-d42c051b87e9', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 15:24:51.720634+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '699772fa-2e85-4a73-a202-31df191c408e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 15:33:10.385894+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e4ff9280-577a-4670-8dbe-0e6003e47de1', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:48:32.705121+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '09a5f2fe-f544-49aa-865a-9674f42fd3f4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:48:32.707837+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aaa94d71-adef-4fb5-b156-21dd6520a736', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:26.202169+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '44b451ce-55c1-4489-b21e-8cb8707b8635', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:26.205465+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43e40475-a94f-434a-9635-2723c1dccc33', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:30.771217+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '42a822c1-c490-4f3e-a949-e4f64f4b6295', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:30.771769+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7be484de-ba32-4180-8240-ecab96448236', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:50.121893+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2d47f409-c250-47cb-9fd5-718d1d6b5ca4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:25:50.123295+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ca9a1e30-28d5-4d00-ab1c-50d5b317b5fd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:23:11.127095+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a7e5bab8-fcd5-4421-8f92-c23d78cca5b5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:23:11.129301+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ee50dbd6-7ced-494f-a6b3-3130f6b616ac', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:23:29.805681+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce331a57-ff34-4ea0-8ad2-5bb9f4252d8a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:23:29.80623+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a4219da2-205c-4456-91fe-d405f4ebd519', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:32:58.124001+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b46c52c1-0ab9-42b7-b761-1685dd2544e5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:32:58.125614+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f85f8fd2-9e20-44e6-b880-871f60041be7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:08:55.103105+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bcc0153e-d059-4591-bbe7-44365b270d45', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:08:55.107576+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '28c1466c-5a01-407e-95ad-92f97ed6cd9f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:09:06.47437+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '98fda5fc-910e-44ec-9db8-5c820f17fa8e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:09:06.474937+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ca657c80-a0c2-439d-9dce-2652d269b18b', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:20:57.725877+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9b2a55ce-7d53-4cf3-836f-6cd3010061e8', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:20:57.727431+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f734940d-3838-4da7-8a5e-6e9d4fd1f82a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:51:44.203729+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a8738563-bb21-4b2d-9039-b46852e98c72', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-15 23:51:44.206487+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '60213ffb-2116-4641-a980-8621cd75cb98', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 00:07:02.846975+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6b29f2c2-6933-4534-bb8a-f440af77b0f6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 00:07:02.848475+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '86fa1616-ecd4-4e56-a6f5-9b180470d0ee', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 00:07:57.049313+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '04cac693-220e-460c-b4b7-1513618865e6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 00:07:57.049931+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c3644122-af80-4119-a863-61bee1442725', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.657717+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '679aa0cb-411b-4a35-b9be-3f59f936f04b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.656643+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '50c54838-c817-4eb3-962d-95d26ea5f2c0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.665816+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b8610618-6f76-486a-8030-a530670cedda', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.666501+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f1ff64d4-7657-49b3-a252-6811babbf7d5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.654762+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a31ef3dd-7dd9-4f18-abc3-36e238d5a85e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.668265+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '762be26c-67a8-401e-a52c-cc7631796486', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.65448+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '337b9d8f-f776-4885-8fd0-9b2071f7abb4', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 08:36:21.671699+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce82b749-2bca-498c-9803-99db3854d6e5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:42:56.081767+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e10052a4-dd17-4204-9739-7ac2ccd5480b', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:46:03.405453+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2c6a0554-692b-4fcc-9fd5-3022c05b1942', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:47:18.212902+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '15bf3b54-1980-4a15-8785-521c782b5a8a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:47:36.612802+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '003a5a6f-5be2-43ce-aaca-c74088927216', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:48:00.402237+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '79f1fef8-edb0-4e53-8b17-b42bf9a75434', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:48:36.301551+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '13eaec03-9b60-4630-9062-cbe1fbc103cc', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:49:04.794496+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '42307ecf-fad2-48a4-9de6-760871d25031', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:51:07.472913+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5a8d881c-00b0-40a5-bfac-d59a2df67199', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:52:21.299585+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '679c6530-c6e4-48ea-96f5-bfc5cc8e3178', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:54:26.882924+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '93eb1786-c7de-4245-b242-a6923895a115', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:55:01.006471+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1125802e-565c-43cd-b09d-50fcc33d3684', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:55:16.675978+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4aa12ff2-8906-4eda-80d4-c5e9f62894f2', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:55:32.360754+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '82781b80-397d-4b08-8874-4f2a077b8279', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:55:39.897841+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f3ca16f9-81e7-41ff-91a2-a19be2090f68', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:55:51.074471+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3cd0424f-2462-41fa-b713-fcd7aebaae36', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 08:57:52.574849+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c068ed00-ee23-4497-8c0b-e81486dd2422', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 09:33:45.549023+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '94637a72-53fe-4a31-9cd5-9ef41e32477b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 09:33:45.555206+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8242dd88-bff7-4f48-a172-1724ffd6bb81', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 09:36:51.760562+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd039c695-396b-4273-bd51-bc9f92a6f070', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 09:36:51.762957+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6671bc49-2f85-48d3-94ba-b4eed3c50c2c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:31:15.568371+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '761951b1-fc05-4648-8326-404310c38361', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:31:15.569894+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a3e448b3-2267-4526-8cca-881a6d8d18c4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:36:34.019056+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '48ee84ca-e427-4d1f-9d5a-86f4d05371c0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:36:34.023231+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e47e228c-26af-4207-8ba9-d48d8749437b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:37:48.001806+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3bc22b88-629f-46f9-9be8-9461dc0d72f5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:37:48.0026+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2ffa28f9-8ae6-47f1-abd1-27f143579d24', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 10:45:03.387959+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '149c9e47-61dd-422f-9811-15e4042c8c5f', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:56:47.350114+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '39f0a9ee-546a-446a-9a57-23bc0ffeeb6e', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:56:47.352341+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a163179f-4b31-429d-8252-b37cdf423402', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:00:25.490106+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '25481228-fc39-49ad-a6dd-5c9bbdba2c68', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:04:12.053077+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a0f9efdc-cf74-4bc0-a1ac-07d6b3cbfef3', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:10:33.417413+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3fb0360f-55ac-4330-87a9-e37ae8d0ceb0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:17:00.147014+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2973b79d-28d8-4c8b-aa62-acfdf3e5c9e8', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:23:52.554798+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11208645-1dbf-4411-bd6f-749cfc6d2f58', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:34:08.588865+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '98491d49-8550-4277-b509-d937d053c2b3', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:34:08.591924+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bef3bce8-c26f-475b-910a-301238d522d0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:37:56.815699+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f96d500e-849c-4371-b4cb-cfea34820f85', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:37:56.816421+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1d4073cc-4d98-4167-aade-4a402bbb4647', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:38:16.089003+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '558a048f-b8b0-4eb7-8cba-6128d1ec8151', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:38:16.089681+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ee980cf2-3b42-4466-91ec-ce7599f1c3f8', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 11:41:27.591831+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '38e6aa2b-8b51-4043-8ce2-6209cf02c831', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 12:20:30.085341+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c3e9027a-95ce-488d-8ed9-28fa4d119bd0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:32:49.276817+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f1b1a971-7c4b-42a6-b3c0-1bbe8c66255c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:32:49.279494+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3a73ca07-94c9-484e-a82f-6e40b4f99a2d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 12:33:38.346481+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbfadc09-9475-4b35-be1d-0a2dafc5bee4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:37:10.209493+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bd1cb48c-5b01-4d32-909b-cedf7562f7ab', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:37:10.211976+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa56d7db-2772-4a6d-8004-7809eb062db1', '{"action":"user_confirmation_requested","actor_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","actor_username":"desenvolvimento@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-16 12:37:45.558956+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '56199f93-d556-4e35-956c-a69062b67e0d', '{"action":"user_signedup","actor_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","actor_username":"desenvolvimento@leadclinic.com.br","actor_via_sso":false,"log_type":"team"}', '2025-06-16 12:41:01.603637+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '592bdcfc-0afc-4aeb-85e6-8dc26e07b775', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 13:01:39.494201+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '13a10229-ecda-45c7-aedd-31fb5a17faf2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 13:10:09.188298+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '10e63881-0704-4ab4-a0ef-8345f0cf66d6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 13:10:09.193386+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b39c4feb-957b-489d-a78d-6c36ec52afc4', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 13:13:08.730421+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bcd9b2bf-7a84-4134-b715-91c7ba649472', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:01:23.135255+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c5b177f5-2ba8-4a06-bddb-4c1c39eab8c1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:01:23.138212+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '765b68c4-affe-4d6d-9963-f677b816c54b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:10:53.761908+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '54662bc7-c038-40f5-96f4-e7468ca2acbd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:10:53.765114+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9394f4ad-e654-4273-a422-e1afad8f84f0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:01:30.198948+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9e2ff6fb-4e02-4ea2-9938-8c7e8b848452', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:01:30.201948+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '280248f3-980d-452e-b095-de4f055f780e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:08:23.720157+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '92f4df9f-26c2-4d55-a057-b2fe76760000', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:08:23.722017+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3803a344-4d49-429a-a2cc-df1e9e7fcb3c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 16:01:37.15587+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c67d6b7e-c28a-4bb5-85bf-4d853550c2af', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 16:01:37.159276+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd666b3a6-8c99-4179-82fe-3b6ab7df557d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 16:05:53.719311+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c72f5b84-3587-4ede-a0d1-e79ae4dc19ef', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 16:05:53.722634+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ef56d948-04a2-4740-b86a-059c0c24d281', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:03:36.931232+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f55c9faa-89be-467a-970d-b74d4e26f581', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:03:36.934531+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2d381fc8-597b-441f-a1be-cdd8be42d835', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:12:24.291309+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '14f53cee-e462-4120-97a7-fa5e2ef28ab3', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:12:24.296467+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '990e8e78-ddea-4f50-80c4-452d640e47dd', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:12:43.548317+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5343b0d7-375f-417e-a83b-9eb13bb71e11', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:17:16.61778+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aec28f48-9b55-4004-ab2f-bc3bb3e479fd', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:22:34.601094+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '100963f7-4080-48c9-afd5-1a81662a5050', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:24:18.11274+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5f7839a0-78fc-490b-8464-88fe29024f83', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:27:04.648467+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bd772641-e713-4699-94ec-8115c21bb072', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:33:28.384619+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9172c30a-785f-440d-8db2-9bc50996b955', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:36:36.42977+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd4e76b94-3acc-4faf-92f1-0d19150cfd1c', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:51:31.252363+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4a7b4b2f-0ba4-4b1b-8698-ae0b2cb64813', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:54:42.617249+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'caf91477-0a48-46ac-92c8-61d9fd7f02e5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 17:57:34.627124+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f5583f11-563c-4b9c-835e-b8e72a957996', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:57:47.668033+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '58d24bed-d9c8-407d-a642-4a0ef253563f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:57:47.668589+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd9a6cf8f-d125-4471-a67f-7fc54a15dcf1', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:05:54.136565+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '58e9d8ef-90f9-4314-b596-28e1671dffca', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:08:10.424937+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '575d6560-a02a-41a1-90dc-098ef4b35ad1', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:13:43.099386+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ea7e424c-79bc-4642-a614-8b09ad5aa8c0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:13:43.100782+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c0955f21-8ce7-447b-a9c2-b17deb8bbb09', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:13:53.124601+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e7a0fabc-8e3e-4333-91ad-752d84127a50', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:15:09.056461+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6ee4170e-5fec-4054-aa59-407a3b9d4ade', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:15:17.291886+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c5f679f9-77c9-43f2-8064-b2b552e33da6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:15:23.695301+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7ab9f658-8167-47b3-9b3c-eefa191b227d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:15:29.844566+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aa45f630-6f53-4305-ad78-81b3fbfc6639', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:21:27.232687+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '83420510-96e8-429e-b446-07aa182c904c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:21:27.234134+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e67884ff-2ec2-4eaa-b7f0-f0888a0e369d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:28:44.564145+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '32484380-d2b8-4d93-8018-dbdc1c095c91', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-16 18:28:48.331748+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '70668662-a38d-4fe3-b402-c9050ec9b21d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:28:56.677949+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2090d222-e656-4294-bbef-ccdc824843cc', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-16 18:32:18.999895+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6c6224fc-aca7-4f14-8391-072d3fc2f2a3', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:32:30.133875+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b5dee333-cc93-4128-b121-7bf76450b3b9', '{"action":"login","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:36:30.821568+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0fb52eb3-1027-4f9e-ad8c-be068f8c3673', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:48:11.585075+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a547c797-7d6e-428e-b41c-ca0ec9e2db8d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:50:24.348283+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '74c9d02d-89ea-4ae0-b2ea-b20ff8a0d95a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 18:57:42.40441+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6713eebc-3d2c-4673-8bff-eda741957eb1', '{"action":"user_confirmation_requested","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-16 19:01:35.360823+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8f1633f6-ed99-4616-b9a3-8296989fe8bd', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 19:08:00.343096+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '046d583a-180b-44d2-9474-bc8f8def6385', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 19:16:13.494165+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cffc3d21-5c93-421a-a4f8-326bfc0d3682', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-16 19:35:38.354685+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e9bca77c-1ac3-46b9-8ecb-482b0e67a252', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 19:35:51.101012+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bde1a17b-2bed-4081-8cec-1c2f3488eb48', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 20:03:16.669296+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1abcafc-522c-42dd-9db9-3ce726589ba6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 21:06:43.402403+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a0d2f91d-e55a-4f5b-bb6f-47e890888a94', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 21:06:43.405039+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b211b82f-6025-4c8d-b10e-be1e6e877403', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-16 21:07:02.184291+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5da1abe9-5079-4f5d-b3a0-b483797b0148', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 21:20:25.577318+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9ce3a783-f112-4136-8a9f-ff4a4706690b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-16 21:20:25.58018+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fb6e752a-cbfa-4004-ada7-2acea41f02fe', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 06:26:51.733103+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '20d4776d-c219-4d1f-b046-b8a519fea8de', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 06:26:51.744118+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '200476ae-07c5-4aec-93d2-921a19d6beb4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 07:23:57.065215+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a9fd6707-85f4-4544-94c0-5af075a0e361', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 07:23:57.074311+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'df026a11-74cc-4956-8595-b855724cc52a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 07:26:55.433201+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0735a5ec-5338-4e2a-b7c5-bbc70ec7b3cb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 07:26:55.437541+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0374068c-b0d3-4981-a470-8cb725e1e04e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 08:27:02.868502+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '56fe17e8-a354-4be1-bf72-2871a5246e00', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 08:27:02.871157+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c6ccc49c-8ec8-414f-880b-3f9234061e86', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 09:27:18.588752+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1acd745d-5687-4ca3-a76c-46eebea3e1d0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 09:27:18.591853+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0747c709-8527-4d9e-b7ac-94d2ea11f683', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-17 09:44:07.934186+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2ff60446-4ed6-44c9-bc07-cceac0f17e14', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 09:44:20.756501+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '03f26606-51fd-4664-ae46-6d6849063385', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 09:48:59.64824+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b78c2b46-10f7-4dd6-bb90-483001a252b4', '{"action":"token_refreshed","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:01:33.78833+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '340666fd-0c90-4abc-8ec0-31e4874e52df', '{"action":"token_revoked","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:01:33.790277+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bc549bd5-043c-4616-81c6-44040e071b83', '{"action":"logout","actor_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","actor_username":"vagnercoach@outlook.com","actor_via_sso":false,"log_type":"account"}', '2025-06-17 10:01:42.376431+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a0e18e74-0078-417e-a11b-fd860ffc9f8f', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 10:01:58.643+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '30e54c11-7a0d-4657-86c8-99f03144641a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:42:29.356695+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '51d64d51-30c4-4d09-9eaf-6c1784c9c71d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:42:29.358963+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c1d54d83-4fbe-48fc-a109-a1acc6140333', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:46:48.892433+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9632867-9e35-459a-9b87-deabda2ef3e7', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 10:46:48.894678+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '87887281-10bb-4bd0-8829-d579257f3e1f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:12:13.883189+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '358237b6-3a9b-4eb4-b146-c6035c3635e2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:12:13.884674+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b2e3c31e-4954-4e7f-a63b-973d141ed203', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:45:02.93896+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f9964f9f-db0f-4098-a495-63f50ad151ad', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:45:02.941264+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a23c1cce-1b43-46e4-9fa8-32d3e74cc340', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:52:19.651828+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '22e38d82-f421-49da-99a2-d85407cbf611', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:52:19.653124+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '46f5eae4-5d6b-47f7-89c5-2cda843657a0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 11:52:46.959599+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '90bac85a-e92f-4e87-81c8-d5a3094f733c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 11:57:04.077591+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4500bea9-b958-4b78-9a7e-776acf65f522', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 12:18:20.376029+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1ec70f8f-f6ce-4c50-b73a-60501af4bb4a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 12:18:33.993802+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3307037c-aa06-452f-bc9a-a29bec75c2ab', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 12:21:49.564471+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5e4f4b6c-63bd-423c-a0b7-38a2ce128c91', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 12:45:56.212091+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7251ffc2-1ae0-435f-a715-a9a5f562719d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 12:45:56.215247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0a70883a-27bc-42c8-a0ec-cdeae42d4997', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 12:59:47.836434+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'da03de99-2b03-40a6-ba1d-30aa3dbc81b7', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 12:59:47.839726+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57e8a368-cf6d-4c4a-a985-57cedc0c41c3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 13:24:41.118554+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8ba38626-ada3-453d-a0e0-f6afdea85b44', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 13:25:29.665908+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '693324bf-6c89-41d6-aebf-4da4e8804c42', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 13:25:29.670643+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '430d6926-0366-41d5-a81a-b1cfe7007675', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-17 13:27:20.918909+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '922e9cd3-748c-4fff-8716-a89e0c0810ff', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 13:27:28.178963+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a158f5d3-ac15-4d23-bfa0-6cc2b2cdb2f5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 13:40:16.16611+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0142ce34-35d1-4a81-b232-bab9583ebf49', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 13:40:56.896006+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a06badd7-9b17-47e5-831f-4a5c15bf7ecc', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 14:57:36.049796+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e79adda9-9099-4793-b7f8-e09483ab051a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 14:57:36.058747+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4567511-10d3-4fbd-bd8b-4d78c6901724', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-17 14:57:38.077782+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9065087a-009a-452c-b66a-e7806d542943', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 14:59:13.046618+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7aef9401-6224-4ea9-89a5-be1de63d8fbc', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 15:34:07.035349+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a039b285-9c1a-44ba-a9b8-fc7bde56f2a1', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 15:36:53.959903+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '20d36bf0-9fca-4d7f-8df1-6d68a2dd0f84', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 15:42:53.363434+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bfaf97e6-b45a-4c42-a6ad-b90aafb389b9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 16:42:01.494596+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '865b03c7-8a5c-41d1-b5a5-8bc9ec737f83', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 16:42:01.497233+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '741696b8-bb08-4156-8a55-2a3d563782da', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 16:50:47.821508+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '83a41f91-d504-4fe4-ac25-379e442b4e37', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 17:48:31.261438+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8d5697c4-613f-4bdf-931a-3685654089db', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 17:48:31.264055+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3d1e6165-6151-4ecd-a958-1915b1118c8e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 18:05:17.532251+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '067e8ad5-24cd-48ac-8f5c-af6e7f201776', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 19:09:38.197017+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '32618c18-2d89-45a0-bea0-dc79ca52c8a6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 19:09:38.199313+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e3252c22-e55f-42f4-8b82-8a70eea772ee', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-17 19:14:10.21527+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5fceb7c7-d814-4a70-ac80-bd93f7622b32', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 19:14:20.526982+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ec4495bf-7b77-4806-ad7f-a54ee578f7ed', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 20:05:26.293305+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b645cabe-19c7-4e61-9fcc-30cce87f310a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 20:06:45.132344+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e249d05c-01ea-4603-a085-0caa39a0589e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 20:22:00.24394+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3f40727d-b4f0-4e66-8b14-8c7fe8c3f470', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 20:22:00.246947+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f1704569-c048-4d5f-8857-29c739f142ae', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-17 20:53:03.952147+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9c6f087-a604-4a77-a949-1aa60fbd6d98', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:06:40.319176+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'dbf12595-f9c8-4aa7-ad51-d399b025b80c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:06:40.323313+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '360f098d-c6e9-4c4b-835b-22c05996fbae', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:19:30.065008+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c8eb7990-572c-4b1d-8449-6804ec1a84d4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:19:30.068422+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f3e337c2-5492-431b-84c4-f067a73f4049', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:50:28.432153+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f44e7bcb-7009-480c-a92a-3e3e2a3ef01c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 21:50:28.437358+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa44ba01-ea83-40c9-b812-3f3a6678550a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 22:04:05.482272+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b090cd59-c52b-4fa8-b9ba-1df71f829294', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 22:04:05.48436+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0fbf4f56-85c7-475a-9ccb-8ab9424184d2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 22:17:00.115706+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c6db78ba-d9c5-4fd9-b974-de86e5ba3e3d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 22:17:00.117272+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e283a03c-9245-4907-9127-c6acc2691738', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:01:35.495858+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7cece793-63c8-4075-b7bc-0a4f1efd3d24', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:01:35.49734+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b98be80b-16eb-485a-91b8-341bd256a276', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:14:30.0242+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '948a914f-153d-4e76-8a2c-54302c746526', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:14:30.025853+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bdf9adde-ee6f-4038-97d2-322ef17be8a6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:59:05.414258+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2bd55f0e-6fa7-4704-b597-d62e387c1e01', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-17 23:59:05.417397+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1f348f25-ab9c-45fb-85fe-013b19fe8c21', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 00:12:01.090393+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '22243bb1-b8b0-47ee-ba07-1c313d4ef759', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 00:12:01.093162+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7e99a4b1-346e-42a6-baa4-c6924d5a69ab', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 00:56:35.415475+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f8b9beb6-a1bf-4ae5-b1b6-26c3175b0b74', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 00:56:35.418044+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eaa94beb-6470-4817-a2bb-e5fbf157695c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 01:09:29.97574+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f6941c27-cdd7-4e90-a24b-0d1a2029e894', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 01:09:29.978374+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f5f6328-b2a3-4f88-a656-31ae268f5c16', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 01:54:05.553399+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4321990d-1717-40b5-bd79-1ec8f0cc4db8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 01:54:05.556473+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1b7565ca-379b-4a21-96a4-f1d98fa7eb3d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 02:07:00.01015+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5b61243a-c3ba-4c69-81eb-1823eeb4cf8d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 02:07:00.013075+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3698144d-a497-46c7-9dc9-e10acf56f560', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 02:51:35.369175+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f5cc24cb-507b-4a59-9d66-449ca317a939', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 02:51:35.371436+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6dfeb06a-0318-4a21-b99d-ba5b06ba74bf', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 03:04:30.119136+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'be40ad1a-aea0-43f5-9978-5e40bdcaa8cd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 03:04:30.121664+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e3487c43-17ec-40e6-a86a-46bee94d6110', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 03:49:05.297264+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7e93ee4a-35c5-42d6-bdfd-9e0fd0252428', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 03:49:05.300292+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '06d211dd-1318-497e-8685-fe6a612513ff', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:02:00.127227+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '84bea79b-14d7-47f2-b55d-6fe722f38104', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:02:00.13043+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '15222df2-3825-412f-bc34-b896033aa8b8', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:46:35.311399+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ba34cf22-dff5-4acb-8644-20287dd525ae', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:46:35.314352+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7bb3f684-44fb-41f5-955f-fb1d76ae2487', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:59:29.886572+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0a4ac77c-c5e7-4921-bbb9-0d18465c5814', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 04:59:29.88874+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1342bc48-9000-4d73-aa65-231e851152f7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:44:05.26061+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6c08d4ac-5bf0-454f-b417-b951d433e496', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:44:05.262856+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8f1ca886-d71b-4648-958f-5b1f45d34207', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:56:59.888377+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'af6afe47-294f-4ce9-81ea-7d3e7c14db18', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:56:59.890831+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c9816263-c735-4e47-8ef4-5a224ca9c359', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 06:41:31.881158+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2d957995-2e8f-4e92-af20-e5ce59653abe', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 06:41:31.892729+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd4712262-0f9f-403c-9eb2-beefe88cba08', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 06:54:29.824816+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '591dfa41-fc72-419b-bf77-31cd33f7c3f2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 06:54:29.825628+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8fd09450-d340-4132-a07e-29597a2ed0aa', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:37:22.955453+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '47f2eafc-3f9e-4486-832b-f7ada9a97a6e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:38:34.051353+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9578cec8-4dcc-4bbe-9bd1-4c32b78d3ca6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:38:58.126671+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '41cb7c8a-743f-4a3a-a505-3ae9e14115e0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:39:10.509986+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9c12bf0a-9d9b-4574-9dd1-6776111490c2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:39:16.525541+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '36cebb16-a9a7-443e-82cd-b22de378cec3', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:39:16.526139+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ecd28d13-4096-4c2b-a0c9-719aa9eb87ad', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:40:16.787388+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1842aa30-7f61-48cc-b60a-3fd07890c320', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:40:42.492204+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ccd12400-0b8f-4beb-aa9f-084c85ff12e0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:41:14.158348+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5f18d89d-988d-4a6e-aebc-202e4c999a95', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:44:41.653729+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6e5304ee-5949-4116-a69a-0ddd074042b4', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:45:13.016945+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f52e25a5-b695-4a37-bbd6-d87b3c2f4bb6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:46:39.476168+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a1fd7f97-bf0f-46aa-bc90-b7df08bd05b2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:52:00.023744+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '44eeb1cc-5b60-4ece-937e-6a8535c4a5c5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:52:00.026582+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '107a6b44-e10d-436b-bc9d-507150507317', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:52:06.639909+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e6110af9-5e16-4619-9cd7-90b97389ea13', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:56:39.434483+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'da418e70-eb99-46b9-a26c-c02ab858e46f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 07:56:39.438261+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3244073f-81f0-456b-9e84-364520cd9bad', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 07:59:21.997539+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8c8fd9d1-52b9-4210-8f44-1025c24085c3', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 08:30:22.591169+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8bfa93b5-58e5-4962-a33b-e1cb4c9c90ef', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 08:57:17.920575+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b416fe0c-2b25-4d28-86ec-37d7904eec40', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 08:57:17.925951+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c70e04ff-ea4a-41f3-af1d-c2a8da8e9d00', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 09:05:24.21887+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '29df43ef-aeb1-46d9-b8be-c8a8948c8afb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 09:05:24.221014+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5f5dc8d2-c3c0-4101-b8bc-ac554c1b7cdf', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 09:12:07.07938+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b5dfffcc-efa4-4b09-8bf4-8ac60d800833', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 09:12:07.084757+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bc0dd9ef-bc13-4314-ac75-766eb7a1f32f', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 09:13:40.508965+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd34965ad-7eff-43ed-8693-1815abd39b22', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 09:15:04.09249+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '432f5e3e-d2ba-4ebe-961f-54a39cc68921', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 10:23:22.255543+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0380edf7-7295-4736-8275-88c734e8a498', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 10:23:22.258743+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '046f73a6-a9ff-4fb3-a673-d47810f6f456', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 11:23:38.395714+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cffd2820-3795-44bc-818a-b98e8b150fc8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 11:23:38.398012+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '596f4e9c-996f-4183-8e70-3ef206ce3e3e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 12:23:45.730552+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5a7c120a-d65f-4a22-b115-f5f3d38a07e8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 12:23:45.732653+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6ac27617-13d2-4524-ab21-d9bab49bd553', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 12:27:55.301219+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fe56f356-6268-4734-a91c-8c8a3865b665', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 12:27:55.304791+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b57b7469-e99c-4878-9417-45b36220c4bc', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 12:31:23.366418+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e352d822-c97f-4b3d-b40b-71bfeabd242e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:24:00.287271+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9c5b029e-1eca-428e-b9ed-f0c1650035f1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:24:00.290302+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '89b82d15-ad0a-49e0-ada5-1a12295e33a4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:26:27.923938+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f26c7b31-ec68-4637-a4b5-0730881d4917', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:26:27.927401+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '61a1d149-13ae-4e1e-afcc-b990974e2b4d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:28:51.947783+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7434af72-13e9-46cc-9787-49acad69a83b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 13:28:51.949193+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac11071b-bc63-4a4e-8579-0a4c8ee5e076', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:33:18.718466+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4368dc39-1a12-4f27-b25f-94326fafad7e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:33:18.722434+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9fca6d82-db3d-4d76-82a2-c6832258d5d7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:43:25.623956+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9be3b323-9039-4f9a-9267-4b337eb5cb27', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:43:25.62545+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '849228c0-693b-4d79-b454-4b31309005a7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:43:46.110903+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ff9ce4d8-39e9-4c3d-af38-f639ccce1690', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:43:46.111475+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7a8821bc-59e7-4e3b-9a3f-cb67338cddfa', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:48:18.43719+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0ebe775-f290-4dbc-beee-954be51540e9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:48:18.440631+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '398c0530-a2ea-45c7-b090-1317945fe1b5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 15:43:01.832446+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bc770d62-92ed-4c36-918c-8de52be1d1e1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 15:43:01.834715+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '30d3e3ec-12da-4f26-8bbd-1f9f691d4b1b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 15:51:54.984662+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac2c4ebe-a54a-46d9-91b1-481dbf7603b9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 15:51:54.987863+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e657a89f-ba68-4d4d-802d-9da5ccb13ccf', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:03:30.461828+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '05ee9bb7-ad55-4a23-9ade-5006719d1cc5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:03:30.464923+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '132f1ef4-ed5c-4832-8021-53cb101cb78b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:44:58.893145+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bbbe4ea8-004c-45b3-8176-46a2a185a2a8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:44:58.897959+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '86cf1768-568e-4840-87b1-94648ac36c1c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:59:26.942941+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5aadc6fb-ec9f-4bd8-8e3a-bc41e5313d41', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 16:59:26.945795+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd2e7747e-28c4-4709-8e6c-12018c705bd7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 17:03:46.249134+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cb0b6a59-79d3-4274-9cd4-2cfe790df022', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 17:03:46.251949+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '39918a64-7f43-4335-b3a6-7de4e8c3748f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 17:42:18.913265+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e913ee73-9fee-4c96-b091-dcd93d0c9da5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 17:42:18.917087+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4232eed6-dfa9-4587-a7f7-dbcdd81f7af9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:06:36.190781+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6faca4eb-d362-4b27-a23e-2961b27a3cdc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:06:36.195434+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '886b8339-a647-4e71-800e-a08ee528d60a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:14:40.949415+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f2968ae8-da65-499a-a249-9540f02eca77', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:14:40.952915+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7e25cfb7-70f6-41d9-aa17-1735fd639a36', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:40:25.944537+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '33a80238-17e3-47f8-890d-a82dfdd6bd8a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 18:40:25.94858+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4213ad6-e2c7-4ff1-9e03-61955ff4137f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:25:08.342355+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0788af5f-6567-4d46-91da-358d63628451', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:25:08.3458+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '09d435f0-e941-42e8-8fc1-3d97926cc1ea', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:41:48.493416+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '01c48c47-17ba-4ae8-90d9-ac7d32044145', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:41:48.496617+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4551d4c-2808-4627-b590-e938ded5c407', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:47:10.21005+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c95651f5-7560-4ac9-8097-f47f023fcc0b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 19:47:10.211586+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fe2495ee-fb3b-450e-8902-69bf1910ed17', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 20:23:21.412597+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fc41d616-25fe-4de5-9886-408e08f92240', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 20:23:21.41499+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c138fce5-951e-4c61-a567-f13c352eb299', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 21:54:51.994945+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9a7107c9-5e9b-4092-b7e7-56b384bac7ad', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-18 21:54:51.999324+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '94dbda0a-d30f-4b0a-a3aa-8807c81b27eb', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 07:19:24.886512+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8f3317b5-82a5-44f5-b201-ff8037dc7bf7', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 07:19:24.907547+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '994d129c-3bec-4ee8-9f83-49ce48ecfd86', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-19 07:35:06.592661+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '71f1a615-9a39-4ebe-a6f7-2ef17ec2584e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-19 07:38:01.29423+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eebb1a10-adb0-4035-9547-bc1e60e8785a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 08:19:32.817913+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '85de61c9-85ba-4912-8b77-f9d2a07aafea', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 08:19:32.821689+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '464d73f9-fe6a-4524-8711-c618de85bf4f', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-19 08:26:51.233226+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f0024de3-27bc-475b-b7dd-c9cf61ae9f5c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:11:43.920914+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '01644204-8603-4966-8b6a-7ab5b3c5f604', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:11:43.923579+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '201d242d-8395-45db-bc8b-8af3ecd4b333', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:19:50.506481+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbd8774c-1127-4bd2-8d40-b140117376da', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:19:50.511686+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4e332066-61c4-4744-bafa-5f0265b8096f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:26:53.470204+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '52aacded-8e6a-4bf2-844d-ad4fb870597e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 09:26:53.472178+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'db3017ec-60f8-4ec8-a8d3-8052e3ad7ec2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 10:24:40.429551+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2fa29610-713b-4034-9ed7-d6d21f2b0f73', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 10:24:40.433337+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7b7b9c42-dc38-4a01-a319-5c4357052a23', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 10:50:06.904333+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '573de275-873a-476e-a2c1-ce0c3433ebdb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 10:50:06.906972+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7f816653-2cba-4c04-a971-1d7033b3839c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 11:22:15.80199+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6566b27d-2e9b-4913-87d2-44c9b7729034', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 11:22:15.804235+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4cdf2eb0-1b19-4086-8b2e-d53ee182ac85', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 12:19:35.875022+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4350557f-97ad-4830-8e83-bc839f63f8ba', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 12:19:35.877625+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f3f7da89-9c96-4a8c-87ff-7d2f59a6d404', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 12:20:13.612132+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0b6ac6ab-8534-446c-869d-2721a5be81c4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 12:20:13.615687+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a0925ebc-075b-4b81-a49f-8e7275893579', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 13:23:18.498205+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd9488aa2-12d0-413d-b6d8-4a8f456b8316', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 13:23:18.502047+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd119faea-fab8-4bd0-aa55-2bf9714ba783', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 13:23:18.971356+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ee3a2ae3-cff8-4f12-9e34-d2d48c688901', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 13:23:18.973348+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f7d838b5-70d9-4a41-ab41-391ba6fec7a0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 14:21:38.074395+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '14de8a99-174b-4255-aaf5-61060cedf9a9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 14:21:38.075639+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9415a9bc-423c-463b-8292-2b74f742ed13', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 14:23:42.016449+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3b84fd47-d718-4bca-8b49-de63b8778b0c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 14:23:42.018496+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1a30aade-1541-4ba0-851c-99dc7e018193', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:20:01.991724+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '058f7fa6-ccb1-45c6-8960-80105d8fbadd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:20:01.996879+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '673f157f-4250-42b4-92fc-1e2d33ad4cdd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:23:55.747816+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eaec7fe3-3e6b-4672-a78d-6b023370dd86', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 15:23:55.749479+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '550b04e7-b1e9-4ddb-96ce-5fd7047df3a8', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 17:30:05.46873+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'be46a62a-758e-432f-b056-a901ef3c1bb0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 17:30:05.475797+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd722a783-7933-4643-8296-3d36f008592a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 17:54:03.973047+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e7740b7f-aba8-4e54-965f-0f28a2f1fff9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 17:54:03.975717+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3dc5d0d7-c60a-4c18-84c9-3c95a383c2e6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-19 18:06:46.074512+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5920d097-cd44-4d45-9a48-6158793e2016', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 18:32:35.558523+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b847d978-2234-49f5-9de1-1c2119888f7a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 18:32:35.560014+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '885073ba-1548-4494-9837-57978a86bbb6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 19:35:24.115904+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57cc3b53-7d99-47c2-99ee-28e38fb26246', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 19:35:24.123891+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fcb29dab-37a5-4007-a38d-8ac20b1677e3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 20:24:44.011981+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '60250c93-3fc9-43b2-ac67-a0b3bc558de7', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-19 20:24:44.013784+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9ab42660-14d3-4583-9668-33c7322972ca', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 08:41:52.510952+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9e4cbebf-8014-4478-805e-a5fb6a58debd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 08:41:52.522744+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '17da7783-fde6-4187-9054-9474b8e70bac', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 09:09:11.782979+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f2992ad9-e7f0-4145-882f-01b2fe98c576', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 09:09:11.786986+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cd8692f4-3a05-4090-83bf-77d9ccef79f3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 09:32:52.35653+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd7a9eb2a-23ec-4d8e-b1ee-60b41ea64305', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 09:32:52.35803+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '721016ee-adee-4c72-8095-6d4c68d901d1', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-20 09:43:33.929668+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa67d949-1fb8-45fb-a177-a2fc5ea5469a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 09:43:58.335818+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5d1a4400-1a39-4f29-89f2-6e6bfbabb6b8', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 10:04:06.156973+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fb4ca256-7151-4a58-a5a9-fc829986f6c9', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 10:20:35.160042+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c6153ad2-6ded-4742-a923-c177d55b119f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 10:56:22.089997+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5cd72237-48d4-428f-b817-d8bfe4420a9b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 10:56:22.093176+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6a29a020-7e64-46c7-9ce4-d9635bd66aea', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-20 11:03:16.817298+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1a1a9b37-a6c9-4183-bb81-058e44cd74aa', '{"action":"user_recovery_requested","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:03:25.294323+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '28d930d7-281e-4445-8854-4f7d443eb612', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-20 11:04:20.513114+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0bdd0829-c285-4253-8aa5-e032924a7049', '{"action":"user_updated_password","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:04:38.953047+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f9197b81-2a76-4414-910b-9fcee74509f7', '{"action":"user_modified","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:04:38.954327+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c12b53a6-14e2-408f-b763-68248c167c32', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 11:18:50.766892+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2515fd2e-795a-4cc4-862c-7ddde7eee82e', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"vagner@cmideias.com.br","user_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","user_phone":""}}', '2025-06-20 11:19:59.784177+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '22f62276-e3bb-4861-b97a-57235a25e4e7', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"vagner@cmideias.com.br","user_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","user_phone":""}}', '2025-06-20 11:20:56.494077+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9a2fd470-17f6-473c-8a33-728fc22967b6', '{"action":"user_recovery_requested","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:21:41.096295+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '952cba4c-dcc7-40bc-a05e-4f20473f9bbb', '{"action":"user_signedup","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"team"}', '2025-06-20 11:22:33.476272+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd73d6e64-24f0-4e99-9276-aa6ad215ad9d', '{"action":"user_updated_password","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:23:04.625983+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6a54359e-8fb8-40f4-9887-bdb3f1df5e2f', '{"action":"user_modified","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-20 11:23:04.626613+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e5a66322-7ebe-4832-b900-1d0533c63590', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 12:09:10.571634+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fdd99d81-afdc-4f71-988c-58417a4ca589', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 12:11:36.427526+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0b1ead72-1d15-4632-9f75-b7d5b0eac9fb', '{"action":"token_refreshed","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 12:20:03.013535+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bc7847bf-5e6a-4a89-9dfc-3ab044f02014', '{"action":"token_revoked","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 12:20:03.018148+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '79553033-1002-479f-ab0f-e14a9f226f21', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 12:37:07.960813+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '941b638d-1bf4-4003-9038-c8f36d014557', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 12:37:07.965841+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '977c4f97-1f17-43ef-bd10-cae31b2b5a98', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:09:01.747626+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '19dfb7d0-0b89-485e-9d7c-9d4a52102fe8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:09:01.75044+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6c168f95-294a-4290-805f-af143ae47b3c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:09:50.039563+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8837faef-eb72-415f-b742-442b39b516c2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:09:50.040123+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1b303510-62d1-4fa0-a724-5dd05846045a', '{"action":"token_refreshed","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:19:53.594888+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '36537f94-3204-4401-850f-de48b4345a9e', '{"action":"token_revoked","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 13:19:53.59643+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b16f1d9c-be67-42e6-bb0f-5499e6347f00', '{"action":"logout","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-20 13:19:58.680363+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc4951d4-47d4-4720-8f6e-adedfaac0948', '{"action":"login","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 13:20:17.892976+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0ad40cc0-3f68-44c5-9eb5-76148f14611f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:10:42.46063+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7eb421b6-2791-4122-ab8d-dece0c892245', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:10:42.463858+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f2d1f419-a962-4352-b417-2c38f82aadc2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:11:18.82612+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '12a8bd89-f37e-429d-bec6-185a7a0f5284', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:11:18.826677+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '62610436-80ea-4ba9-8756-6e1ad4b17525', '{"action":"token_refreshed","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:56:15.228832+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc178cf0-882c-4cff-b60e-e1fc6c45e5ae', '{"action":"token_revoked","actor_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","actor_username":"vagner@cmideias.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:56:15.233876+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c1546e5f-9468-43cd-975f-830ee47b37b4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:56:21.375029+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '31bca19c-129d-4f0d-a476-c00f02fd5d2d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 14:56:21.375681+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e21f0dae-b6bb-4966-9308-0a1d239adc78', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 15:08:08.126459+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5fd17f4f-dbf3-4c6d-b868-1a3004e8d771', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 15:08:08.129713+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'caed5a23-3465-40e3-a5b2-bac012eb88ed', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 15:23:40.620969+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '96142988-aa37-4184-89d5-ad7c685d5afb', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 15:43:09.544768+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4149ed89-166e-4c5b-aab2-63227c70b4cc', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 16:01:13.428011+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e1658459-0870-40c9-8389-9dd316c12da1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 16:01:13.433294+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '501f2a4e-9d04-4610-a143-56b6bbe5c499', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 16:06:26.093232+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa99b2aa-c993-40a9-a94f-4dd9b81c06ff', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 16:09:08.609604+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1da11d35-7ad5-424f-8dfe-f0eca1e5e8da', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 16:09:08.611649+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'edd35518-e018-411c-8fa5-7347b148bd25', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 16:41:31.132885+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0ac24700-0579-4b90-8383-c34591b741da', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 17:26:29.359965+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2d95828e-73e7-40d7-bb54-e9d89e0176b8', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 17:37:30.077015+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '746ad7a4-fd26-4cf4-b669-3310ac3ea2c3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 17:41:06.246782+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7b26eb8b-ff50-4a16-acfd-7f6b3c7715be', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 17:41:06.250422+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bb9834a5-bb47-4d72-bd23-acec4304531f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 17:41:17.743246+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ea969340-c05c-44a4-a675-5da4494d996a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 17:41:17.746532+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9da8dee5-2a79-456a-b07b-eec80c550aa4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 18:24:59.361859+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '02959c62-86c7-4597-a3b7-c3d65c34cfa5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 18:24:59.365455+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2b480faa-a14f-43dc-bc55-cdc84605546b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 18:55:03.769023+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2ff46493-3285-4620-998c-a58a8f7bda81', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 18:55:03.771536+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc9bf092-8978-4588-8853-e1e446f9d682', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 19:03:22.995166+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3e90b4d8-429f-4209-b55e-d77f5e11209f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 19:03:22.999012+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11ed30b4-9556-45ef-a2d3-13ab9da8a009', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 19:22:50.879664+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bf4eab6b-3660-4467-b418-498c6eefac2a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 19:22:50.882261+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c702be3c-2968-4952-b577-4b478cbd4c7b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 20:44:16.77101+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '01065ff5-93aa-462c-9d05-e9a7555557c1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 20:44:16.775871+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '42eb7a6c-1c60-4282-8e61-6fe9c722652f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:16:13.779229+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3e710319-062a-4ee1-9209-d16ccb4ca5c5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:16:13.782604+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f83e24e6-c622-460f-8da1-ad70a4865e07', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:16:18.819156+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0bdd8cf-5557-44e3-b943-fe15b30c4df4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:16:18.821139+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bc632813-5e1b-496a-87bf-71284b3a9f3e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:42:48.408065+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b06a781d-c061-4230-89d8-f9893c11f1c8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 21:42:48.412102+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a55fd8fa-157d-492e-82a1-13c6c62a06ca', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 22:02:54.398282+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1217e83-f492-480b-9a45-09cee0e27aaf', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 22:14:16.24098+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '28203536-50d6-45ff-9ea3-3ff900f3280e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 22:14:16.244435+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9fde4d8d-22a3-457a-a25b-1198858797a1', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 22:40:22.28455+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '506f1b4a-947c-47d1-829b-f9990ba56d27', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 22:40:22.287547+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '62ca76d2-208f-44de-afde-93fc828a2d49', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:46.970821+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a4b8a89b-0ccb-499c-8fdb-80c1117748dc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:46.977667+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '92ff3af0-ffed-4369-a4b6-a3155dda4692', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:47.740857+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7e3f8ea6-ee06-4760-9823-6afe4e2a7c08', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:47.741506+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81c9fa07-56e9-4ba3-a137-fe186a5288d7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:47.765809+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a0e27090-046e-45c2-a40d-106a76ca534a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:33:47.766667+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '29ce3332-013e-4f42-824e-30be917cfe7c', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-20 23:34:55.101068+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c59a1a12-80a2-4040-a582-079c8de17c58', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:39:07.215187+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e7afa37b-8112-4f18-a85f-3b196f0ea5bf', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-20 23:39:07.218362+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c9bbe9e0-8da8-4dd0-bf81-33badd1e081e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 00:36:43.483757+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c41558aa-3cc5-4278-9c28-a363cdaf80a2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 00:36:43.487485+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '30a330a1-b686-40a7-924c-a0ac0464fae8', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 01:34:13.383542+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0f9f1e4c-fb4c-4bcb-8ce9-6c45ef8fc0eb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 01:34:13.386349+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e6933c14-ca1f-4802-b90d-a64b77aea7ba', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 02:31:43.401583+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5369b394-9e9b-44a5-a3be-e612c457229f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 02:31:43.402976+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '36ad10bc-ec73-43d8-8025-c20b38ea2d83', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 03:29:13.357819+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd977991f-ef0d-4feb-93ec-3cd33a0d262f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 03:29:13.359932+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5cb427e0-13c4-4b8e-a47c-771a1b964dcc', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 04:26:43.38681+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0584b4d7-24fa-4f9c-bf95-ff0d0d9986cc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 04:26:43.388231+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4d4d3ffa-54b3-4bb9-a542-9eda7fb70333', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 05:24:13.291796+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '135fd429-9ba6-4f6a-88fd-3e48e3261960', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 05:24:13.295521+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '869adbdb-39ee-498d-9c97-99cebc09277f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 06:21:43.60818+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0c4fddef-b23c-4ebf-b366-2cf3bf231d03', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 06:21:43.612671+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43581a27-8899-4b11-9866-4652b4fe0eca', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:06.81356+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '92d0255b-dd52-4bdc-b0fd-42bae9eea8dc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:06.816291+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '907ec329-069a-4e4d-9626-0869ae37ce8c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:07.983987+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '72cd44b0-539f-46e9-b49e-8f48c90e080b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:07.988129+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fa89bab3-4184-481a-b185-b5002dd02be0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:07.989153+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aa226829-46fa-4f3d-955b-6328ecabc4f4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 07:20:07.9971+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b10135c9-0730-415b-b583-d1d0a4653b7c', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-21 07:59:39.776491+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f797019d-81ed-4627-8a2c-569c0c824ba9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 08:19:07.91801+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '74e3dfed-bc5c-4bd3-ac0b-39d87463cf02', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 08:19:07.920624+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '47b81b68-74c9-498d-b74f-14915a73390a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 08:21:22.020209+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '13323dbf-74e7-4e4b-a4e7-4ba7ce45ad2a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-21 08:21:22.022697+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8d7ec6d8-ce08-48a9-8fb6-c41650283ad6', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"agencia.cmideias@gmail.com","user_id":"ab50aeab-6037-42b9-bfcd-4f7ddca3c49e","user_phone":""}}', '2025-06-21 11:12:30.809637+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3ac14970-d16e-4884-94c5-f87a8d5b942c', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-22 15:51:32.733941+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '551ab698-95dc-45bc-a302-4c38850b4474', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 17:04:50.079538+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'dc552d62-9100-4096-ae8c-8cf0774dc15d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 17:04:50.088115+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8915656a-c504-4c35-8163-62ab655140d5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:02:07.612388+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '79fd1977-5271-498b-bbfb-981e994e1bc4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:02:07.618918+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '27416980-949e-4faf-aca5-ca0327b98106', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:59:54.752383+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3c0d8d3d-21c3-4bb6-9e8a-de8ec81d6d16', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 18:59:54.756489+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'abd9b1fc-494f-4814-90fb-e6e73c7d68e5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 19:59:34.375622+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6a597143-dc3e-46a1-adff-b1836e3a1d0b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 19:59:34.380247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3f0e21e0-663b-435a-805b-90728daf1f1b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 21:07:18.534524+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '296238fd-5e45-42fa-8153-8b049a990c72', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-22 21:07:18.536936+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '73225e06-e31b-44e9-bb3c-19ee83819dc3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 07:54:21.868839+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eef60e92-b879-4685-847a-892e128547d4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 07:54:21.881094+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0be4556-9a0c-4149-83ce-7ba3896583ef', '{"action":"user_confirmation_requested","actor_id":"25c11e7d-af6d-4999-ad1b-f5c6a8f818a9","actor_username":"teste@admin.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 10:02:02.777057+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd3d16c47-a61d-4a6c-96c1-734ffb8ba6ec', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 13:30:58.358332+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7a3e5215-62ca-4e1d-a5c7-7c4911cf7f37', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 13:30:58.367363+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0824ce92-f7cb-4eda-90c6-edf4244c73e0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 14:29:59.84125+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f2d5893-f3a0-4581-9181-cbc0332f5a52', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 14:29:59.846955+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '28ab0531-d3e7-48a8-a9d9-3b7a01fe3b57', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 15:30:30.37853+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6e97a2f2-154d-44c7-ba82-d0db19f8bc6a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 15:30:30.379363+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b861b8d6-5e49-448c-b754-114318d594e5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 17:24:15.135164+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4b81ca8-3c2b-4e6a-9cba-999bb79a7453', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 17:24:15.136018+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bf8ae157-533d-4a71-a9b6-f1de9bef5f43', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 18:23:51.533016+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1b972bf-e21a-46c8-a617-a4df011a7988', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 18:23:51.533844+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '62f6aadd-41b7-449a-b277-eaf36ebf1e7b', '{"action":"user_repeated_signup","actor_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","actor_username":"desenvolvimento@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 19:17:57.688247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3d56e5d6-3dde-4fd0-a282-141d47ab5dc2', '{"action":"user_repeated_signup","actor_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","actor_username":"desenvolvimento@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 19:18:09.202126+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ae21b158-fdb0-4ec1-8c46-4d20240ce40e', '{"action":"user_repeated_signup","actor_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","actor_username":"desenvolvimento@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 19:19:16.59751+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '872d1ca0-47a9-45b1-acf3-00b8e5e11696', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 19:21:24.955503+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2ad5724e-fb1c-419c-b092-2b756a219920', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 19:21:24.956351+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5301342e-a9d7-49ad-884f-84728fb4041f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 20:24:04.372693+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '79cf89ed-74f3-4cd9-a19b-a23248bd1992', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 20:24:04.37596+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '05282666-a071-4688-9ed9-8fc127ea1c2f', '{"action":"user_repeated_signup","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 20:52:13.538879+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cb581cbd-2b0a-48e2-a989-c7233fb999ef', '{"action":"user_repeated_signup","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 20:57:46.111468+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '00336236-7ce5-478e-a0ea-431099545f04', '{"action":"user_repeated_signup","actor_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-23 21:07:57.466102+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd538e843-1cfa-40d0-8472-73a0cf3ba2d2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 21:24:25.426166+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3cd305e4-3a7e-4af4-bbe3-c91e724ef4ce', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-23 21:24:25.42765+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac432a14-6958-4484-801b-79187bb9a74b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 06:49:34.629663+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'dd935827-2a2d-4c0f-bd0c-2b5e5d08c1ce', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 06:49:34.641674+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7919dfce-908d-4f51-9acd-31b967222528', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 07:47:04.028223+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b529b3d9-7216-447d-bb73-d2019f956a03', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 07:47:04.030842+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '55a3a75e-cd17-4f36-8aa6-20717214ab93', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 08:47:04.090731+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4b9f3b93-069c-461a-b3ee-cb1e3c99f101', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 08:47:04.092756+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '33ab2588-6426-46b7-8a21-364fba1ebce0', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"vagnercoach@outlook.com","user_id":"b50ff998-63b8-4f33-8135-87cef6a9336c","user_phone":""}}', '2025-06-24 10:31:06.483229+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5dad5b66-d642-45c0-881f-5253a4b24ade', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"suporte.tecnico@leadclinic.com.br","user_id":"995aefc5-6b1a-49cb-bd35-73c2fc358d1c","user_phone":""}}', '2025-06-24 10:31:06.483107+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8bcbc44a-1be3-44d1-8bdd-a9c601542df0', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"vagner@cmideias.com.br","user_id":"725c2733-9583-4dc8-badd-2d7e943cf9fc","user_phone":""}}', '2025-06-24 10:31:06.483987+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ae001be9-295e-4324-b2a0-92e16a374fe7', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"desenvolvimento@leadclinic.com.br","user_id":"8e99208f-de3f-4074-bc0f-6889bfcd34db","user_phone":""}}', '2025-06-24 10:31:06.485778+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f16c941-b995-4519-becc-369093914d7e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"teste@admin.com","user_id":"25c11e7d-af6d-4999-ad1b-f5c6a8f818a9","user_phone":""}}', '2025-06-24 10:31:06.485279+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2996dca8-898d-4b0b-8441-5b9285460415', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 10:39:40.938202+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fd613a4a-0deb-47b2-a0d5-4fa0192f1e33', '{"action":"user_recovery_requested","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-24 10:46:42.267677+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ddb55684-c14d-4971-a18e-d9a02b4cc86d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-24 10:47:47.876336+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '30de56e6-1a59-4b1e-aa0c-3d4975608264', '{"action":"user_recovery_requested","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"user"}', '2025-06-24 10:49:22.70413+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a308ba98-8474-4d14-b244-fe0aa16d25bf', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-24 10:50:15.622906+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e4b3084e-32aa-4666-940e-91a0a20c1b2a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 12:33:17.609963+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0d0a987e-55ef-428c-a88f-be2071ce0116', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 12:33:17.612795+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c9fae957-b13a-4cf9-bcbc-9c9a3973f3cf', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-24 12:33:26.603659+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce4a2421-0ca7-4128-97e4-46b571edf03e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 12:33:34.152114+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '79d90ea9-3ba8-4490-a2bc-dafd13b1b1d6', '{"action":"user_confirmation_requested","actor_id":"3a307fc7-353f-4ae6-bac9-18029f367487","actor_username":"teste@teste.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-24 13:01:58.438027+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7514c0f9-960b-46f3-a052-6f37123b0d0d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 13:35:11.973048+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2251aab2-67ef-4e9b-9b16-c0a048a901f3', '{"action":"user_confirmation_requested","actor_id":"70b54462-828c-4d86-85da-9be4040e93d7","actor_username":"cliente@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-24 13:42:48.1689+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '64190d39-9c6f-4975-b9e8-da389fd74593', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 14:35:36.499848+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b6d1b818-5db9-457d-a03f-cdd4111b8816', '{"action":"user_confirmation_requested","actor_id":"536b84a9-6191-430b-ae30-f04bbfd76ebd","actor_username":"leadclinic@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-24 14:36:42.394894+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4bf0fced-3afd-41f1-ae8e-39ed92ffdb1a', '{"action":"user_confirmation_requested","actor_id":"2154728e-4e56-4530-be02-f009f40de0a6","actor_username":"teste@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-24 14:37:23.078452+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ae0406db-03fa-480a-9f6e-267ec1127f9b', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 14:52:07.012563+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0e848c0-cac2-4e89-a155-c1bd45916b87', '{"action":"user_confirmation_requested","actor_id":"2a5a8d61-d0e0-4ff5-8ad3-f031c45e7e3b","actor_username":"colaborar@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-24 14:55:47.214726+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '22793462-1e77-4431-88cc-f7726eef16e0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 15:01:51.048272+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd32864db-7bed-4e3e-ad50-b57da710eaf0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 15:50:05.975384+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ecf03161-f282-44a7-a0e2-3e65b0de328d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 15:50:05.976881+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '13237d58-acab-4c32-b06b-f18f36492fef', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 16:17:46.304266+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '53ecf32d-7fe0-47fa-9575-82d1de77aec5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 16:17:46.307142+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '40994db3-8c98-43ac-a182-3e3717d5f81c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 16:31:57.949901+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4dcc74c5-49b0-4180-9b34-36a78a61ec71', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 16:31:57.952807+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '61cd1e1d-dbd1-4c05-a5c5-5ef5bedbe432', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 17:02:07.920406+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c2d95d05-ad2b-48f5-8557-38fdaad350b7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 17:02:08.919588+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9431c739-9ba9-46b4-b266-f705d9734366', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 17:02:08.920181+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fc1ee3af-8a16-48e6-b705-f32da550a5ab', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 17:17:24.359384+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57486cca-1ab3-4601-9831-1b1b552bf893', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 17:17:24.360216+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e736ef7c-96af-4cec-8911-4cabe25048ba', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 18:01:56.59328+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c836f2e8-8f04-4c36-8f69-458f82c7c9bd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 18:01:56.595345+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9b04c252-3a12-494a-be0c-f46c15567c51', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 18:59:31.667332+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a7e238d1-8795-40a0-b213-511108ce57a2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 18:59:31.670577+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1ab60d60-c3d3-4a53-b009-8f1e902a6c3c', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 20:22:03.157289+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '481899e2-45e1-439c-a0d2-7bd356c89906', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 21:51:19.411524+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'caa56cf7-ad2c-4c17-a7e9-33b8736220ba', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 21:51:40.313492+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bda9c20b-b108-46cd-8484-4097337eabe4', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 21:54:22.948253+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4b9e2a7b-92d0-4746-9076-ae4f3dbfb6e2', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:00:55.94096+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '69588138-b64b-4c7d-bb5d-ebede70b95b4', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:03:27.595302+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43b367be-256f-4b70-af71-d33045ebe638', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:05:48.006037+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd4ece82e-1138-4ad1-9215-009cb8fb055a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:08:05.24959+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a09a352c-5f02-4809-b73e-375d0c1fe3d0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:10:03.379598+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9e1426c2-0316-43f1-aea4-07b26022bc30', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:14:24.374052+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eeb8b8e8-0aa9-47f2-97a8-de313d21a4b3', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:16:24.544026+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8b0a6d8e-813c-4252-a3a8-7ec841bce6c6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:18:58.610888+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd1b603bb-d0b7-48ee-afe4-aa9b633fa910', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:20:54.534572+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1138cecd-331e-4a31-941a-c8948ecd2bfd', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:22:21.060658+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '481d36c2-285c-46dc-b47c-eb4ac53fff09', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:32:44.634749+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '55ed7793-02d4-4ce3-969b-b93a8293ad77', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:36:24.06458+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2c5d8109-740d-4507-885b-225cf9709f87', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:41:42.836782+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '70604f1e-3f9a-457b-b222-f71c8e22b6e5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:44:25.209162+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4591aecd-9eec-4e33-9c54-179b831c2fcb', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 22:48:56.893209+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81ca85ff-bfbe-45b8-8751-fb3ce19a0c55', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 22:48:56.895869+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5d0f2515-91cb-4492-8d84-ce7ba99135d7', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:49:28.156255+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ebb5fe46-506b-4d91-af5e-5450c9c5bd0a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:52:10.156424+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'bfb79bae-c8a0-441d-b722-95472b17b1a6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:57:34.583532+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '897882f0-ea96-465f-80b4-5d38e7161622', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 22:58:55.267323+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '34d237a7-55de-4674-b389-392ae1128fba', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-24 23:00:39.356838+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b21a1225-bd30-4bd2-8180-fd2feb3b53de', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 23:46:32.655794+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '85b96adc-05b4-4fc4-b357-2d7a6bcc4174', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 23:46:32.658497+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd013cd99-79ab-47c2-b0f5-94d3d88ca8ba', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 23:58:04.484025+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '10373bcc-422f-42e7-a6df-8f22ffe4492f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-24 23:58:04.489681+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e3684d97-ac73-4c4b-9835-6cdc131c9e3d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 00:44:02.833914+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9a794494-63b4-4e05-9be6-aeb42b01ed4c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 00:44:02.836286+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1dce6b79-bcc7-457f-afc9-b22b82c041d7', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 00:55:34.167247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '407bc366-8ebd-427a-bdb2-a74feb4c0482', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 00:55:34.169868+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2fa80eca-99c5-455a-bcc2-27fa9d9b3c65', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 01:41:32.360341+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '15f514ee-e88a-49b5-a7a5-45e98de4c2d0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 01:41:32.363103+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '52aa0546-6be1-4d40-a6c0-d20d0a421907', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 01:53:04.151095+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '678118c0-70f1-4fa4-b550-85c386c94423', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 01:53:04.154537+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6d999169-db8a-42a5-be9c-d5e5aec59fd4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 02:39:02.286266+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f15e2af1-3744-4147-b245-649500ac6681', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 02:39:02.289196+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '903f6d06-d23e-4395-bbb5-06a21f278ae0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 02:50:34.11174+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '343902e3-adff-42e9-aa91-03a6c7bab413', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 02:50:34.115013+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3d4f0cd1-e2bc-4f89-abfe-39792433f6b9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 03:36:32.486163+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4b22bd60-d8b8-4652-ac45-fab581077325', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 03:36:32.489437+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b65c9a50-f24d-435c-a4d4-cec412977d9b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 03:48:04.118193+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eca0ceea-a8ac-41b5-bafd-eb4091bb065f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 03:48:04.120384+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c6ccabc9-017f-4704-976d-d9f2e1a4ff87', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 04:34:46.234416+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '23627d15-d8ef-44f5-bc8e-477549399f22', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 04:34:46.236387+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '64389eac-1881-4cde-8d77-58b8f04d6226', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 04:45:34.033401+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '76b9cb55-568c-420b-88be-850a18605842', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 04:45:34.034944+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'df6d9775-6e86-4be7-b618-466cd4cc0618', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 05:32:02.247824+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81be630c-712f-4a80-a3ca-998420f498e3', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 05:32:02.250316+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0e9141c-e3b0-4069-803c-86673d032730', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 05:43:04.038559+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b3b36868-57a8-414c-8fcf-03783653e257', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 05:43:04.040572+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1565ce60-8fb4-46eb-b32c-2a56d766afd5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 06:29:32.344589+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1bb267df-6fa5-477e-ba42-a86b9d6dbf1f', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 06:29:32.356609+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '87fa4de0-3f70-4c7e-b5d7-85d8bf3ec0f6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 06:40:33.98443+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a27a6b0b-4219-4f52-aa7c-76fb7a71afb9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 06:40:33.988006+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '04ee6481-b5bd-4cec-855e-39f95f507c6f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 07:27:02.198768+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'efa0c963-e0f6-4dac-9ebf-b740c260ac5e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 07:27:02.201334+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eaec4f12-483b-47fa-aeec-487eef31abd3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 07:38:03.975736+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1c68a079-692c-48af-8eef-8913a78b0691', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 07:38:03.977707+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ba17f369-44d7-4a7b-a67d-6e7c98677092', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 07:51:23.079166+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4df06d7a-44aa-425f-b04f-abba8fc2d75d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 07:53:59.160408+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '64dd98cd-df1c-4e67-b00e-1b166b1133b5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 07:55:25.895802+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd871efcf-ce70-4e5a-99a3-4198faf1da0c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 08:24:15.833732+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fd9da3d2-4bd2-4081-96c9-502b16a85595', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 08:24:15.835219+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '39b14bed-cf33-4f5d-899a-0abff5dc446e', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:28:46.415244+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3969321b-7f29-4db4-ab9f-465973ea32a9', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:35:50.709605+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7b2f714c-d161-4380-8d4e-cbd25cae297f', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:38:48.566316+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3a4585e8-7e3c-463d-82bf-47c08e168e06', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:40:03.381187+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '52dd0161-7869-48e4-b1fc-6a3bafef3fb6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:41:42.716982+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '982366f3-88d6-49aa-92e8-f81da37e49d0', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:44:35.849577+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1f459fe5-3dbf-4167-8f73-e425a5dce5ac', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:49:22.852041+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ab448263-a90c-4c54-a5b3-5061659e3230', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:54:48.164254+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4cadf400-a135-477e-be53-0e4b2da5306d', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:56:28.28998+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '65ced7f5-cba0-4701-92a5-19958d262760', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 08:58:42.786671+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4819d495-f24d-4ec6-a1dd-0c14b0a45db9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 08:58:42.789641+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5307df48-7d55-4118-8fc2-cd3796aca3f7', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 08:59:20.817176+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '789029ce-75a7-4586-ab64-5cab1112d1c9', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 09:01:17.885149+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aa27aeb9-aeba-4437-bbb3-76698e634396', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 09:55:58.104687+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '72fdfe20-e4cc-46fc-ac9c-d7731b50708a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 09:55:58.113659+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b35ef2f7-1cc7-469c-8a48-69ed5a210a1f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 10:53:28.342921+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '529afe9a-107c-47c2-880b-1a9fd679d37a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 10:53:28.347771+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '35b5bce6-1312-48d9-9c0e-1d000574d1da', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 11:50:58.307946+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8fe6de92-c82a-4e79-bc2b-3e01c4e14f27', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 11:50:58.309898+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8f7b58bd-06ea-448f-ac5e-cd0c2d835f71', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 11:52:08.593024+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '577fb4fb-a2a5-427b-aff3-0d6cadd0f9b8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 11:52:08.593807+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0890f95d-b029-4b4b-b11e-94a76a99e280', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 12:48:34.478517+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a66b2e8a-628a-44a5-8487-c6007f780f7d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 12:48:34.481014+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1ebeec52-ac4c-4828-aaf7-9596a89f796e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 12:52:23.775213+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c1ad9362-df1e-40c7-9fdd-2e900ad8ae48', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 12:52:23.776117+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '12d9e428-656f-4da1-87ca-985ad246e222', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:46:08.10219+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0109be43-73fd-4a57-8d3f-dca52fd151b5', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:46:08.104345+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f4f40883-741a-470a-9515-25e579d62f83', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:52:33.529874+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '62c0a050-a608-4165-85bc-517408bf9d52', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 13:52:33.532553+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fb2fbb45-4afa-452c-a25e-bdd0410c113b', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-25 14:24:20.626564+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd5546991-43c3-4fe1-8d7f-322b53284c60', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 14:24:52.844163+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81f16eb3-dfc5-4dbd-bfb4-593541ac719a', '{"action":"user_confirmation_requested","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-25 14:25:59.356019+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8382bee3-37d9-41ae-a821-71ec935c690b', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-25 14:27:46.237433+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e54c978b-e68a-41f6-b35a-be70775a2140', '{"action":"user_signedup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-25 14:28:14.680036+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1dbf0dc3-2578-4fb4-8e06-c35ba0e8ad2a', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 14:49:52.385411+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '41f6e451-d952-44fa-a03c-73cf2d24d0e4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 16:08:37.155412+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b2e1de1d-37cc-4ae0-8d8a-314288705bb2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 16:08:37.15848+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '345b7396-e745-4a15-92ec-ed61714294fa', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 17:42:16.195028+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3f6f399c-5c82-43dc-8a93-9390b859337a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 17:42:16.199377+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a4e8fcb2-fbe1-4eec-8d93-858a703ef789', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 18:39:53.180028+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a6742ba3-cf52-4e29-83be-e8d3442b86bf', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 18:39:53.183911+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '92530549-34a9-442d-805f-241c56d2af48', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 19:55:06.265847+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b70eebfb-d6fb-46d0-bc45-1fca816b0667', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 19:55:06.267296+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f00bf617-b59c-42c0-b8e1-9e3f8e036266', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 19:55:11.062946+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '60d6596a-55a9-4c15-9025-06691c810d86', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 20:53:39.205597+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9895415f-67ff-4068-a89d-727af26187bd', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 20:53:39.207141+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6d2854da-baaf-4bf1-9a0c-5ea1b1d660cd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 21:53:31.12138+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd4965a27-9400-4dc2-b767-257ea65b9d76', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-25 21:53:31.123586+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b78bb25a-af6d-41a9-a880-249ad7422ce8', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-25 22:44:28.443342+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6a76a10b-29fa-4252-8435-827809781589', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 07:52:16.221237+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6416736a-fac8-44db-8c84-b55e5495d395', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 07:52:16.233273+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'abf698ad-8a7e-4b7c-bd25-b501945728c2', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-26 08:11:02.603958+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '49e4986d-06ed-44ea-a6a7-27204ddb951f', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 09:08:21.95181+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b7bd5cbd-2026-47e0-9acf-7a3806c1fb54', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 09:08:21.952619+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '21fd2261-7fac-45cb-bbd9-0af4e1d4ea20', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 10:06:01.244983+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4e93ca79-7a1c-4623-9b13-afc81532c670', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 10:06:01.248163+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3b2d461b-db44-4864-a7c1-3e8ca7b7a2d9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 13:27:29.856702+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3f231247-a7bc-452d-967c-d76e5e3741fb', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 13:27:29.860394+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '690cdbd7-9006-47fd-a3f8-af5b3b6f85c9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 14:28:29.021147+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6af2ac61-61df-4c83-bb3e-56828aa982f2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 14:28:29.024401+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'feb9e6eb-2ec0-4924-bdf1-ed401c8578d1', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 15:25:57.440272+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '40d0fb24-6c9a-49ea-99ff-5049482e4469', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 15:25:57.448088+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5d5e9b4f-6dd1-4aa3-8769-2637c0bc409b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 16:39:34.881152+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57f07bd0-6506-4af0-8955-be22a590424e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 16:39:34.883932+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0f5f9d50-aeaf-4ac0-8820-3601266a4778', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 17:36:58.716832+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9c793c1-2a16-4a9b-91b8-4d380c01a415', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 17:36:58.720483+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '38322994-af24-4c6f-aae5-df83c825ed9b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 18:35:25.01496+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '46b629a2-1446-4d77-bbe0-386d6f5f36e6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 18:35:25.018048+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd4ab2ba2-9778-461f-83f3-9d3e4ebba979', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 19:35:54.967344+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c48041b4-7650-4196-948e-5e72c3000b08', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-26 19:35:54.970519+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '925c931e-045f-4828-9a97-9577f8c455ba', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 07:44:14.920449+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b7c02563-ecff-4d25-aefb-b3dbc5e736d9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 07:44:14.933144+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '58c09b3a-a4a9-4b5a-b4ff-5a80a8d6a0c6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 08:41:58.072631+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '53bf6069-e302-400c-bc1e-190ee683e183', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 08:41:58.076293+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b31ded6c-2be0-4863-b585-9ed74b372b34', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 09:39:43.195542+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a4c2673d-52a9-40fd-b8b8-6835285f304e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 09:39:43.197002+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '90547ab6-082a-4afb-8261-ea53d6cfd350', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 12:06:11.14859+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '36386974-5648-4365-a630-4dc67676fb25', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 12:06:11.15164+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '636d7e02-e762-4f20-b665-93818ee47796', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 14:33:57.263998+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f72f484-10b6-4418-899c-9e9beef32aa2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 14:33:57.270963+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6b2aa5f3-69c4-4cd9-9d5d-b7303e6834f2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 17:09:47.891666+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5cf18562-0d11-4398-8997-3229dfd2c357', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 17:09:47.895484+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '63ff2de8-8e47-45ae-9d8d-b7f680fcf591', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 18:08:19.302689+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a6b96268-3a42-48c7-b2a4-2ecb06cca30a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 18:08:19.308459+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '371c7ed1-bbca-4f4a-9a5c-951ff7369f02', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 19:23:56.199633+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b6cbf03a-fafe-456b-a9c0-bb89a0502ca6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 19:23:56.202241+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ccde59ef-24e2-48e7-9010-fcf775b84ee8', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 20:22:35.232163+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '80c5ac70-e758-41aa-ba84-6046570ad783', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 20:22:35.235301+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '421eb9ab-8bd7-4963-88cc-79c99da86c6b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 21:20:08.773748+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b13ea3c8-9a16-4607-b3d3-b275445ece0b', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 21:20:08.779795+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5bd6fa8e-a837-4e80-a928-0583fe73401e', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 22:17:40.631767+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '552d15b2-e434-49ad-834d-13d93e6d7ac9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 22:17:40.638585+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '77506aaa-228d-4810-a512-cacea5eaaca1', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 23:14:49.736214+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c54fbd98-e9b9-4dd0-9320-4fa9a1d056cf', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-27 23:14:49.740124+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '57294b94-483b-4fd0-b528-a6d5346d09de', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 00:12:09.662385+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cd4cb036-ddb6-46a4-a769-e3c9d4bbdc88', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 00:12:09.666506+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f74c6551-aa64-4a17-9fd0-64e919519de5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 01:09:39.677029+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd3102f77-1cd2-47de-b3cc-02dc6df85018', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 01:09:39.68841+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11e102bb-71df-45de-8fc6-91ddfa525124', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 02:07:09.562704+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0fd38e31-8947-40e9-912c-f660862e18bc', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 02:07:09.565986+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fef9d487-6052-4837-9b2f-1281f06c416b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 03:04:39.611294+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '663547a4-f56f-4ba3-a6f6-630e35c4ae20', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 03:04:39.613972+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '43ac49fa-2d40-4b05-a085-e410d17cfe94', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 04:02:09.565221+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1f04feb3-397a-4c65-9075-33845235cec6', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 04:02:09.569119+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '09613848-a8ed-49f6-a789-0c68c9dbda9d', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 04:59:39.808379+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7fec04fb-99c8-45a9-a409-a3f64c3d93be', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 04:59:39.812081+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2265dc3a-00cd-4932-987b-d89cd45a5acd', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 05:57:09.45984+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9c0e84a-da43-4bf6-862c-e9a7c9f0fc00', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 05:57:09.46198+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a8a7b62d-6b3b-4287-8e24-dae8d2b7d165', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 06:54:39.827089+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c1982596-5c4f-48ed-a6d9-ba0e291071c1', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 06:54:39.833608+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '843cc7ff-4a96-47e6-b245-3715d5af1798', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 07:52:09.497794+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a79ede82-d1b2-46d6-812e-a19fbe11f590', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 07:52:09.501771+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '468a60b8-dd4c-4f2e-8fa2-d33f687b6f76', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 08:49:39.702162+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '188c3a84-7151-45c7-9ca8-33bd6ad36e85', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 08:49:39.7047+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '38dee0e2-43a6-4a46-8058-eaf42b20e109', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 09:47:09.369465+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd00d889d-6045-4634-abe5-5a2491b67cab', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 09:47:09.370984+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '04a69358-d147-4346-a0be-a5ea9cf26956', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 10:44:39.687786+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6155b7ba-8d41-4257-aeff-058baf35ec17', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 10:44:39.689943+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3022721c-470e-478d-9e4e-a57fd51a7fa9', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 11:42:09.327743+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7ee8d976-3e41-4b59-9718-3538666abf40', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 11:42:09.330374+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9ae2fa96-5d66-490b-ac08-b09fa991ca38', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 12:39:39.446408+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4390c35a-3dbb-4528-a799-e24274daba05', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 12:39:39.44959+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e8c58b1c-9356-4383-80fe-c87f89ffbd5a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 13:37:09.444235+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f3501617-90c0-44d3-a2e5-b0342ee69db9', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 13:37:09.447913+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e88aa187-a86c-4c49-b58f-6094cb70a292', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 14:34:39.332267+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b80c5dce-2371-4b9d-9cb0-5e9e7813b2c8', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 14:34:39.334844+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '07c29995-1965-48a5-a152-b50c64c39fb5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 15:32:09.486132+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9b6c7530-e4cc-482b-8b04-ed11290d86de', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 15:32:09.489122+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '68fb92ef-0c31-4cb1-9290-f6afe364bc94', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 16:31:08.024467+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a07ec5be-5f4b-4089-b6a4-566b3ccf565e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 16:31:08.027641+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '71a2acef-8d1f-4a5b-949e-2d6d08d8d9c0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 22:44:24.671644+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4f53dff3-43d8-4f26-9c3e-228b51b5cbf2', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 22:44:24.67487+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aec7ae28-3ba1-4d00-a002-35a05d1e0c85', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 23:41:39.251626+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '50bbb069-2fcc-4f33-a39b-bf3471cd941e', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-28 23:41:39.260323+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9c11f925-ba7e-4060-915e-be4bdee8c9d6', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 18:35:45.843371+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9d29445d-e29b-40cd-8d4f-b341389f843c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 18:35:45.859092+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c4d30f61-f6b9-43e8-884f-38751d17f6a6', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-29 18:44:01.052963+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b1f84185-d4c9-4ab3-ae43-0cbac0d214e0', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 22:02:57.884645+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eb5299fd-cea3-4f5c-98d8-f10e425c6736', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 22:02:57.887497+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '48866f06-b2a1-46d0-a086-9ac58fb52ca2', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 23:40:46.163399+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'befe491f-35fb-4854-a897-c3b9b38303f4', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-29 23:40:46.179205+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '547be660-245c-4e36-88f7-610842bf2a22', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 00:38:33.48465+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '599b5357-c1a4-4f55-a768-70b6b7ff40ef', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 00:38:33.490395+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4cddb5db-91e6-415e-9a13-1721dddba688', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 08:14:46.494647+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0065a39b-4c9c-47f3-a140-822d117a6f70', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 08:14:46.519528+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '36d8bcbe-4b60-486a-af4b-402df7bfd613', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 09:12:07.797549+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'acc3af8d-3fa7-469e-b0c4-6d28b6e01bea', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 09:12:07.80158+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '49f3c9d7-3123-4252-a2c2-9944ddb4c33c', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 10:09:35.259908+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '41423be0-f5ab-4537-90db-64d39bebc21c', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 10:09:35.272095+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'da874000-101b-44cb-96f9-63e54775fc25', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 11:06:59.299275+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '038e90e5-6d32-472d-91b6-77a97a285e51', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 11:06:59.304961+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2933f9b6-0f4c-44f0-b999-a4afbacad17d', '{"action":"user_repeated_signup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:16:12.779155+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6f45b9f1-7d0b-4ae6-9f8e-d22522edea39', '{"action":"user_repeated_signup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:20:53.306169+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9860ef5-3dc0-4394-8f51-cc2d1fd9faa6', '{"action":"user_repeated_signup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:21:06.230055+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '230a6689-b36e-419b-a577-c90e4decaaa6', '{"action":"user_repeated_signup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:21:11.318696+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cfa8250a-abe6-420a-8a35-a3d0a47a4e80', '{"action":"user_repeated_signup","actor_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","actor_username":"agencia.cmideias@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:32:58.604247+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '97c40f7c-0230-4a8d-9223-cf3098b86be7', '{"action":"logout","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account"}', '2025-06-30 11:45:55.876167+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8fd86b4e-e3ec-417c-8980-be2acd5dca0d', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"agencia.cmideias@gmail.com","user_id":"afba4dcb-2866-4884-8c6b-01e350b03edf","user_phone":""}}', '2025-06-30 11:51:16.622852+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e8587d1e-c33c-4cd4-86ad-1945fa89c8f1', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-30 11:51:30.77239+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b3b11e14-331c-4258-aac7-c84be90943cd', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"colaborar@leadclinic.com.br","user_id":"2a5a8d61-d0e0-4ff5-8ad3-f031c45e7e3b","user_phone":""}}', '2025-06-30 11:53:11.051827+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4071dba3-27e5-4059-98c6-35066cbe75c2', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"suporte.tecnico@leadclinic.com.br","user_id":"29a1ac70-4c32-449e-bc92-40e54aab300b","user_phone":""}}', '2025-06-30 11:53:31.024986+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b8c7cfe5-4c33-4c4a-96b4-5a37e7ee3268', '{"action":"user_confirmation_requested","actor_id":"331154a6-c85f-464b-b840-74448443e470","actor_username":"suporte25@leadclinic.com.br","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-30 11:57:49.374884+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8ca26fd8-b5a7-48d0-95cf-df6723889b3f', '{"action":"login","actor_id":"29a1ac70-4c32-449e-bc92-40e54aab300b","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-30 11:59:16.596878+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b98aa1d7-70de-42f4-8d1c-f74b4fb316c5', '{"action":"login","actor_id":"29a1ac70-4c32-449e-bc92-40e54aab300b","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-30 11:59:45.820329+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2987efe8-4886-4815-a8b8-bb8c72d9f0d6', '{"action":"login","actor_id":"29a1ac70-4c32-449e-bc92-40e54aab300b","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-30 12:00:29.436063+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '437b744f-9baf-4437-9357-d85811a97eda', '{"action":"login","actor_id":"29a1ac70-4c32-449e-bc92-40e54aab300b","actor_username":"suporte.tecnico@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-30 12:32:36.326117+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd27ce6fe-8b25-4812-8bf1-65cc0fd153d4', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 12:49:08.214304+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b708526d-27a2-487c-8237-49bb9bbd2f33', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 12:49:08.217639+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '38860b01-ae5f-41d8-8551-1b531aa2d5b3', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 14:25:58.975024+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6b905fde-6031-4922-af57-bf948382a09d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 14:25:58.980483+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'daaa7f26-1f68-41c0-a60f-8016bc7a493a', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 15:23:13.173551+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aaae6da5-189a-4d5d-8d04-ba319595bd9a', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 15:23:13.182032+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd41ceeba-d68e-4e19-8572-00fb5802606b', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 17:00:45.451541+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0703177f-483c-400b-b268-f47317aa1dfa', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 17:00:45.454288+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd9411783-7f88-4346-b861-fb6a20dd6982', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 18:01:54.218009+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c9787702-9e03-4e60-b956-f428f3d8f35d', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 18:01:54.224191+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a16a0aa5-5155-4b96-9470-2b05c4480ecc', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 19:09:46.927955+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a1f1d2bf-3188-4dc7-a925-ba1b153987a3', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 19:09:46.936908+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '455b0c1b-fe9b-463b-9b4c-6fb74bd7fbb5', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 20:06:58.894151+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '644c88a1-53cb-42c2-a376-5db522a39db0', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 20:06:58.900083+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac6829d0-748a-43d6-984e-dfea5f7fde56', '{"action":"token_refreshed","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 21:07:14.997159+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c132397e-765c-4832-b06e-a7ea446aa543', '{"action":"token_revoked","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"token"}', '2025-06-30 21:07:15.004189+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b0e31c9d-377b-4f36-8d99-d81308adabb5', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-04 08:40:41.834207+00', '');
INSERT INTO audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0bafa82b-1a1f-4c45-b854-18b335e47fff', '{"action":"login","actor_id":"8c858fa0-380a-4940-bee7-2b302753e6f2","actor_username":"vagner@leadclinic.com.br","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-04 08:41:37.94605+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('8c858fa0-380a-4940-bee7-2b302753e6f2', '8c858fa0-380a-4940-bee7-2b302753e6f2', '{"sub": "8c858fa0-380a-4940-bee7-2b302753e6f2", "nome": "Vagner", "role": "cliente", "email": "vagner@leadclinic.com.br", "email_verified": true, "phone_verified": false}', 'email', '2025-06-13 12:14:10.687832+00', '2025-06-13 12:14:10.687901+00', '2025-06-13 12:14:10.687901+00', '7c15f644-ed14-4bbf-b870-ce8a54b7e359');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('3a307fc7-353f-4ae6-bac9-18029f367487', '3a307fc7-353f-4ae6-bac9-18029f367487', '{"sub": "3a307fc7-353f-4ae6-bac9-18029f367487", "nome": "Cliente Teste", "role": "cliente", "email": "teste@teste.com", "email_verified": false, "phone_verified": false}', 'email', '2025-06-24 13:01:58.433237+00', '2025-06-24 13:01:58.433296+00', '2025-06-24 13:01:58.433296+00', '3a9c4e25-4d47-4f14-80fb-611b67af5f56');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('70b54462-828c-4d86-85da-9be4040e93d7', '70b54462-828c-4d86-85da-9be4040e93d7', '{"sub": "70b54462-828c-4d86-85da-9be4040e93d7", "nome": "Cliente 2", "role": "cliente", "email": "cliente@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-06-24 13:42:48.164583+00', '2025-06-24 13:42:48.164638+00', '2025-06-24 13:42:48.164638+00', '288d2d34-35fc-4317-a4dc-8228f9c7a402');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('536b84a9-6191-430b-ae30-f04bbfd76ebd', '536b84a9-6191-430b-ae30-f04bbfd76ebd', '{"sub": "536b84a9-6191-430b-ae30-f04bbfd76ebd", "nome": "Vagner", "role": "admin", "email": "leadclinic@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-06-24 14:36:42.392833+00', '2025-06-24 14:36:42.392879+00', '2025-06-24 14:36:42.392879+00', '702cd214-e942-4e95-a852-667f03febc2b');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('2154728e-4e56-4530-be02-f009f40de0a6', '2154728e-4e56-4530-be02-f009f40de0a6', '{"sub": "2154728e-4e56-4530-be02-f009f40de0a6", "nome": "cliente teste", "role": "cliente", "email": "teste@hotmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-06-24 14:37:23.07559+00', '2025-06-24 14:37:23.075641+00', '2025-06-24 14:37:23.075641+00', '5a8988f1-705a-4d6c-922f-9e6cac7019c6');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('29a1ac70-4c32-449e-bc92-40e54aab300b', '29a1ac70-4c32-449e-bc92-40e54aab300b', '{"sub": "29a1ac70-4c32-449e-bc92-40e54aab300b", "email": "suporte.tecnico@leadclinic.com.br", "email_verified": false, "phone_verified": false}', 'email', '2025-06-30 11:53:31.021549+00', '2025-06-30 11:53:31.021629+00', '2025-06-30 11:53:31.021629+00', '3517d841-3ac5-4dfc-b03b-80f29f949333');
INSERT INTO identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('331154a6-c85f-464b-b840-74448443e470', '331154a6-c85f-464b-b840-74448443e470', '{"sub": "331154a6-c85f-464b-b840-74448443e470", "nome": "Suporte Técnico", "role": "admin", "email": "suporte25@leadclinic.com.br", "email_verified": false, "phone_verified": false}', 'email', '2025-06-30 11:57:49.36962+00', '2025-06-30 11:57:49.369678+00', '2025-06-30 11:57:49.369678+00', '44a9daac-ab81-4298-b4bd-cdab7316d87f');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('5f918606-3bb5-441c-83fb-70f9764bf803', '2025-06-30 11:51:30.786955+00', '2025-06-30 11:51:30.786955+00', 'password', 'ada1329d-f3f2-429f-bb90-4501dcdd8167');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('cbfea49b-e650-460c-8c2e-3dd2cfb3273d', '2025-06-30 11:59:16.605172+00', '2025-06-30 11:59:16.605172+00', 'password', '9965f52a-e447-4684-adc4-2280e8c409d0');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('afceb9e5-005e-4997-bd9d-5c7687778855', '2025-06-30 11:59:45.82601+00', '2025-06-30 11:59:45.82601+00', 'password', 'c6e1bbf9-db7a-45c2-bbbf-59955c371555');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('4740f2fd-0e14-43be-8434-aea1a52d588a', '2025-06-30 12:00:29.438556+00', '2025-06-30 12:00:29.438556+00', 'password', '228fcd82-978c-437d-b819-1455d10fa3ce');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('bd563438-0832-4abc-a103-cdfc4a2183d3', '2025-06-30 12:32:36.351242+00', '2025-06-30 12:32:36.351242+00', 'password', 'ef784d81-2fda-460b-92e9-4cb89ecf5078');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('2ca19259-c346-4374-a192-035ae4f2a32d', '2025-07-04 08:40:41.915084+00', '2025-07-04 08:40:41.915084+00', 'password', '4ef68447-b3ba-4b28-a1ff-5ce2e598b409');
INSERT INTO mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('edb38c4f-5f45-42d0-be70-e1dd6df393fb', '2025-07-04 08:41:37.958386+00', '2025-07-04 08:41:37.958386+00', 'password', '918f533b-909a-417a-bdc6-1cf6bd8278ba');


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('0c182569-347a-4e61-9fd4-6fc663eaef7e', '3a307fc7-353f-4ae6-bac9-18029f367487', 'confirmation_token', '6dd0760542f42ce7349563ced46daf0f191121396a1d0edd5d5b1ce7', 'teste@teste.com', '2025-06-24 13:02:00.624084', '2025-06-24 13:02:00.624084');
INSERT INTO one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('a25e19a7-50cc-4fca-a785-a133e348d49c', '70b54462-828c-4d86-85da-9be4040e93d7', 'confirmation_token', '09941757abc440e48fa769ec0f5e654b0af9d45d49a8e9ebeba3bd69', 'cliente@gmail.com', '2025-06-24 13:42:50.15661', '2025-06-24 13:42:50.15661');
INSERT INTO one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('69bcebf1-e9c6-4433-8b78-4462d50a315e', '536b84a9-6191-430b-ae30-f04bbfd76ebd', 'confirmation_token', '3841f558df51a728258016db1b1c58ffdc2e98aef6bab57cfe046187', 'leadclinic@gmail.com', '2025-06-24 14:36:44.331275', '2025-06-24 14:36:44.331275');
INSERT INTO one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('ef813374-8b53-4237-80b8-1a10e5cd8e06', '2154728e-4e56-4530-be02-f009f40de0a6', 'confirmation_token', 'e4d5be18c0558dd9ab6211fa49b8bc639b04882e4bcc230f67d9e009', 'teste@hotmail.com', '2025-06-24 14:37:25.106467', '2025-06-24 14:37:25.106467');
INSERT INTO one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('3014b929-6a9c-4fe6-a457-897a215821e7', '331154a6-c85f-464b-b840-74448443e470', 'confirmation_token', '270304015798924b6eaeb11205d67b732f8f1943cbcf12f0623e8b1e', 'suporte25@leadclinic.com.br', '2025-06-30 11:57:51.545283', '2025-06-30 11:57:51.545283');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '548', 'ftrioernjnhr', '29a1ac70-4c32-449e-bc92-40e54aab300b', 'f', '2025-06-30 11:59:16.602228+00', '2025-06-30 11:59:16.602228+00', NULL, 'cbfea49b-e650-460c-8c2e-3dd2cfb3273d');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '549', '6nkyd4svhkyj', '29a1ac70-4c32-449e-bc92-40e54aab300b', 'f', '2025-06-30 11:59:45.824768+00', '2025-06-30 11:59:45.824768+00', NULL, 'afceb9e5-005e-4997-bd9d-5c7687778855');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '550', 'd64tnzskj2cv', '29a1ac70-4c32-449e-bc92-40e54aab300b', 'f', '2025-06-30 12:00:29.43744+00', '2025-06-30 12:00:29.43744+00', NULL, '4740f2fd-0e14-43be-8434-aea1a52d588a');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '551', 'dp22moq2ayte', '29a1ac70-4c32-449e-bc92-40e54aab300b', 'f', '2025-06-30 12:32:36.342503+00', '2025-06-30 12:32:36.342503+00', NULL, 'bd563438-0832-4abc-a103-cdfc4a2183d3');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '547', '7pecv2x2au3a', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 11:51:30.784656+00', '2025-06-30 12:49:08.218153+00', NULL, '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '552', 'qfdrlqm6ozpo', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 12:49:08.220459+00', '2025-06-30 14:25:58.981784+00', '7pecv2x2au3a', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '553', 'yenklmzxcqi3', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 14:25:58.984396+00', '2025-06-30 15:23:13.183968+00', 'qfdrlqm6ozpo', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '554', '7bem7eudpkr7', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 15:23:13.185215+00', '2025-06-30 17:00:45.454821+00', 'yenklmzxcqi3', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '555', 'hyody5gru5jz', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 17:00:45.457271+00', '2025-06-30 18:01:54.225244+00', '7bem7eudpkr7', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '556', 'amlpz34kmcm4', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 18:01:54.232361+00', '2025-06-30 19:09:46.937493+00', 'hyody5gru5jz', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '557', 'icklphctfts4', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 19:09:46.940675+00', '2025-06-30 20:06:58.900627+00', 'amlpz34kmcm4', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '558', '3cjw5j5eqeyh', '8c858fa0-380a-4940-bee7-2b302753e6f2', 't', '2025-06-30 20:06:58.90188+00', '2025-06-30 21:07:15.005963+00', 'icklphctfts4', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '559', 'q3z2i6w3dhmk', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'f', '2025-06-30 21:07:15.013745+00', '2025-06-30 21:07:15.013745+00', '3cjw5j5eqeyh', '5f918606-3bb5-441c-83fb-70f9764bf803');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '560', 'nepiggvpdsfb', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'f', '2025-07-04 08:40:41.874659+00', '2025-07-04 08:40:41.874659+00', NULL, '2ca19259-c346-4374-a192-035ae4f2a32d');
INSERT INTO refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '561', 'mxs5wf3j5x6f', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'f', '2025-07-04 08:41:37.953593+00', '2025-07-04 08:41:37.953593+00', NULL, 'edb38c4f-5f45-42d0-be70-e1dd6df393fb');


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO schema_migrations (version) VALUES ('20171026211738');
INSERT INTO schema_migrations (version) VALUES ('20171026211808');
INSERT INTO schema_migrations (version) VALUES ('20171026211834');
INSERT INTO schema_migrations (version) VALUES ('20180103212743');
INSERT INTO schema_migrations (version) VALUES ('20180108183307');
INSERT INTO schema_migrations (version) VALUES ('20180119214651');
INSERT INTO schema_migrations (version) VALUES ('20180125194653');
INSERT INTO schema_migrations (version) VALUES ('00');
INSERT INTO schema_migrations (version) VALUES ('20210710035447');
INSERT INTO schema_migrations (version) VALUES ('20210722035447');
INSERT INTO schema_migrations (version) VALUES ('20210730183235');
INSERT INTO schema_migrations (version) VALUES ('20210909172000');
INSERT INTO schema_migrations (version) VALUES ('20210927181326');
INSERT INTO schema_migrations (version) VALUES ('20211122151130');
INSERT INTO schema_migrations (version) VALUES ('20211124214934');
INSERT INTO schema_migrations (version) VALUES ('20211202183645');
INSERT INTO schema_migrations (version) VALUES ('20220114185221');
INSERT INTO schema_migrations (version) VALUES ('20220114185340');
INSERT INTO schema_migrations (version) VALUES ('20220224000811');
INSERT INTO schema_migrations (version) VALUES ('20220323170000');
INSERT INTO schema_migrations (version) VALUES ('20220429102000');
INSERT INTO schema_migrations (version) VALUES ('20220531120530');
INSERT INTO schema_migrations (version) VALUES ('20220614074223');
INSERT INTO schema_migrations (version) VALUES ('20220811173540');
INSERT INTO schema_migrations (version) VALUES ('20221003041349');
INSERT INTO schema_migrations (version) VALUES ('20221003041400');
INSERT INTO schema_migrations (version) VALUES ('20221011041400');
INSERT INTO schema_migrations (version) VALUES ('20221020193600');
INSERT INTO schema_migrations (version) VALUES ('20221021073300');
INSERT INTO schema_migrations (version) VALUES ('20221021082433');
INSERT INTO schema_migrations (version) VALUES ('20221027105023');
INSERT INTO schema_migrations (version) VALUES ('20221114143122');
INSERT INTO schema_migrations (version) VALUES ('20221114143410');
INSERT INTO schema_migrations (version) VALUES ('20221125140132');
INSERT INTO schema_migrations (version) VALUES ('20221208132122');
INSERT INTO schema_migrations (version) VALUES ('20221215195500');
INSERT INTO schema_migrations (version) VALUES ('20221215195800');
INSERT INTO schema_migrations (version) VALUES ('20221215195900');
INSERT INTO schema_migrations (version) VALUES ('20230116124310');
INSERT INTO schema_migrations (version) VALUES ('20230116124412');
INSERT INTO schema_migrations (version) VALUES ('20230131181311');
INSERT INTO schema_migrations (version) VALUES ('20230322519590');
INSERT INTO schema_migrations (version) VALUES ('20230402418590');
INSERT INTO schema_migrations (version) VALUES ('20230411005111');
INSERT INTO schema_migrations (version) VALUES ('20230508135423');
INSERT INTO schema_migrations (version) VALUES ('20230523124323');
INSERT INTO schema_migrations (version) VALUES ('20230818113222');
INSERT INTO schema_migrations (version) VALUES ('20230914180801');
INSERT INTO schema_migrations (version) VALUES ('20231027141322');
INSERT INTO schema_migrations (version) VALUES ('20231114161723');
INSERT INTO schema_migrations (version) VALUES ('20231117164230');
INSERT INTO schema_migrations (version) VALUES ('20240115144230');
INSERT INTO schema_migrations (version) VALUES ('20240214120130');
INSERT INTO schema_migrations (version) VALUES ('20240306115329');
INSERT INTO schema_migrations (version) VALUES ('20240314092811');
INSERT INTO schema_migrations (version) VALUES ('20240427152123');
INSERT INTO schema_migrations (version) VALUES ('20240612123726');
INSERT INTO schema_migrations (version) VALUES ('20240729123726');
INSERT INTO schema_migrations (version) VALUES ('20240802193726');
INSERT INTO schema_migrations (version) VALUES ('20240806073726');
INSERT INTO schema_migrations (version) VALUES ('20241009103726');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('cbfea49b-e650-460c-8c2e-3dd2cfb3273d', '29a1ac70-4c32-449e-bc92-40e54aab300b', '2025-06-30 11:59:16.599283+00', '2025-06-30 11:59:16.599283+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('afceb9e5-005e-4997-bd9d-5c7687778855', '29a1ac70-4c32-449e-bc92-40e54aab300b', '2025-06-30 11:59:45.82283+00', '2025-06-30 11:59:45.82283+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('4740f2fd-0e14-43be-8434-aea1a52d588a', '29a1ac70-4c32-449e-bc92-40e54aab300b', '2025-06-30 12:00:29.436787+00', '2025-06-30 12:00:29.436787+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('2ca19259-c346-4374-a192-035ae4f2a32d', '8c858fa0-380a-4940-bee7-2b302753e6f2', '2025-07-04 08:40:41.853126+00', '2025-07-04 08:40:41.853126+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('edb38c4f-5f45-42d0-be70-e1dd6df393fb', '8c858fa0-380a-4940-bee7-2b302753e6f2', '2025-07-04 08:41:37.950919+00', '2025-07-04 08:41:37.950919+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('bd563438-0832-4abc-a103-cdfc4a2183d3', '29a1ac70-4c32-449e-bc92-40e54aab300b', '2025-06-30 12:32:36.339566+00', '2025-06-30 12:32:36.339566+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);
INSERT INTO sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('5f918606-3bb5-441c-83fb-70f9764bf803', '8c858fa0-380a-4940-bee7-2b302753e6f2', '2025-06-30 11:51:30.775099+00', '2025-06-30 21:07:15.019315+00', NULL, 'aal1', NULL, '2025-06-30 21:07:15.019238', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '177.183.99.216', NULL);


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '331154a6-c85f-464b-b840-74448443e470', 'authenticated', 'authenticated', 'suporte25@leadclinic.com.br', '$2a$10$bCRf94yZ86i2TbDtbF3bYuv1CJqia0Vp6pS5mIK7zowHG9FH/0XxW', NULL, NULL, '270304015798924b6eaeb11205d67b732f8f1943cbcf12f0623e8b1e', '2025-06-30 11:57:49.3808+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "331154a6-c85f-464b-b840-74448443e470", "nome": "Suporte Técnico", "role": "admin", "email": "suporte25@leadclinic.com.br", "email_verified": false, "phone_verified": false}', NULL, '2025-06-30 11:57:49.354483+00', '2025-06-30 11:57:51.541526+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '29a1ac70-4c32-449e-bc92-40e54aab300b', 'authenticated', 'authenticated', 'suporte.tecnico@leadclinic.com.br', '$2a$10$db3TkNmQtPtb1Zn/8vXiJ.53EQJ/yYrliEpbcGdmIi8FXZ2cfBPmG', '2025-06-30 11:53:31.026232+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-06-30 12:32:36.339477+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-06-30 11:53:31.006274+00', '2025-06-30 12:32:36.350473+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'authenticated', 'authenticated', 'vagner@leadclinic.com.br', '$2a$10$vr5Jtseg9U/k241YhEjfUeSYOnJ2ZJK.Mi4L4D0UaD92UMIZTY9Rm', '2025-06-13 12:15:51.357219+00', NULL, '', NULL, '', '2025-06-24 10:49:22.705325+00', '', '', NULL, '2025-07-04 08:41:37.95083+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8c858fa0-380a-4940-bee7-2b302753e6f2", "nome": "Vagner", "role": "is_root_admin", "email": "vagner@leadclinic.com.br", "email_verified": true, "phone_verified": false}', 't', '2025-06-13 12:14:10.668016+00', '2025-07-04 08:41:37.958039+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '2154728e-4e56-4530-be02-f009f40de0a6', 'authenticated', 'authenticated', 'teste@hotmail.com', '$2a$10$3.LFsP873XwOFSJ9IvPol.Wwg136NxY6oYqQVDH9M.3m.0EZu12ly', NULL, NULL, 'e4d5be18c0558dd9ab6211fa49b8bc639b04882e4bcc230f67d9e009', '2025-06-24 14:37:23.079539+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "2154728e-4e56-4530-be02-f009f40de0a6", "nome": "cliente teste", "role": "cliente", "email": "teste@hotmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-06-24 14:37:23.071579+00', '2025-06-24 14:37:25.105581+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '3a307fc7-353f-4ae6-bac9-18029f367487', 'authenticated', 'authenticated', 'teste@teste.com', '$2a$10$NodONiePnf/xz9YFmNy8vOjL0uK/.DCS8XOAqNhaBB/GvJBLVf57G', NULL, NULL, '6dd0760542f42ce7349563ced46daf0f191121396a1d0edd5d5b1ce7', '2025-06-24 13:01:58.440534+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "3a307fc7-353f-4ae6-bac9-18029f367487", "nome": "Cliente Teste", "role": "cliente", "email": "teste@teste.com", "email_verified": false, "phone_verified": false}', NULL, '2025-06-24 13:01:58.414227+00', '2025-06-24 13:02:00.620958+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '70b54462-828c-4d86-85da-9be4040e93d7', 'authenticated', 'authenticated', 'cliente@gmail.com', '$2a$10$bw7ZRqAFG2S6DMUpruJin.4/60cSKDPsX1ywR.a68WFEHBLc6xW3m', NULL, NULL, '09941757abc440e48fa769ec0f5e654b0af9d45d49a8e9ebeba3bd69', '2025-06-24 13:42:48.172361+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "70b54462-828c-4d86-85da-9be4040e93d7", "nome": "Cliente 2", "role": "cliente", "email": "cliente@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-06-24 13:42:48.157178+00', '2025-06-24 13:42:50.153217+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '536b84a9-6191-430b-ae30-f04bbfd76ebd', 'authenticated', 'authenticated', 'leadclinic@gmail.com', '$2a$10$Z79OR8ILSHGO0FsgtUXszO6PkWdCWXs37oHfdlDvBVmF5LJqWiRJS', NULL, NULL, '3841f558df51a728258016db1b1c58ffdc2e98aef6bab57cfe046187', '2025-06-24 14:36:42.395434+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "536b84a9-6191-430b-ae30-f04bbfd76ebd", "nome": "Vagner", "role": "admin", "email": "leadclinic@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-06-24 14:36:42.389632+00', '2025-06-24 14:36:44.32942+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');


--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO chamados (id, cliente_id, titulo, mensagem, resposta, arquivo_url, respondido_por, created_at, updated_at, aberto_por, status_detalhado, categoria, prioridade, nota_interna, tempo_resposta_horas, status) VALUES ('cad04c86-c239-44cd-bd61-28985c75c788', 'dde48b88-3536-43f4-a1d6-73f4f6695410', 'Chamado Teste', 'rr', 'Teste', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', '2025-06-24 14:13:24.450573+00', '2025-06-25 17:46:29.336438+00', 'admin', 'Aguardando resposta do cliente', 'hospedagem', 'media', NULL, NULL, 'aguardando_cliente');


--
-- Data for Name: chamados_anexos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_historico; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO chamados_historico (id, chamado_id, acao, usuario_id, usuario_nome, detalhes, data_acao) VALUES ('6e00ce64-b249-4034-855f-2af8ce7c31c7', 'cad04c86-c239-44cd-bd61-28985c75c788', 'criado', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'Chamado criado: Chamado Teste', '2025-06-24 14:13:24.450573+00');
INSERT INTO chamados_historico (id, chamado_id, acao, usuario_id, usuario_nome, detalhes, data_acao) VALUES ('a7aba9ad-fc26-47fd-a50d-438296fbbd6c', 'cad04c86-c239-44cd-bd61-28985c75c788', 'status_alterado', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'Status alterado de "novo" para "aguardando_equipe"', '2025-06-24 14:37:55.452473+00');
INSERT INTO chamados_historico (id, chamado_id, acao, usuario_id, usuario_nome, detalhes, data_acao) VALUES ('5d7e5331-5058-49da-b18c-99f1fa4ba730', 'cad04c86-c239-44cd-bd61-28985c75c788', 'respondido', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'Nova resposta adicionada', '2025-06-24 14:37:55.452473+00');
INSERT INTO chamados_historico (id, chamado_id, acao, usuario_id, usuario_nome, detalhes, data_acao) VALUES ('dfb344d9-f9af-4e56-b806-2c34ebe0baf3', 'cad04c86-c239-44cd-bd61-28985c75c788', 'status_alterado', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'Status alterado de "aguardando_equipe" para "aguardando_cliente"', '2025-06-25 17:46:29.336438+00');


--
-- Data for Name: chamados_mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: chamados_timeline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO chamados_timeline (id, chamado_id, tipo, conteudo, autor_id, autor_nome, autor_tipo, created_at, metadata) VALUES ('398a5a5e-930e-4bfe-a7ff-082929ca58ed', 'cad04c86-c239-44cd-bd61-28985c75c788', 'criacao', 'rr', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'admin', '2025-06-24 14:13:24.450573+00', '{"titulo": "Chamado Teste", "categoria": "hospedagem", "prioridade": "media"}');
INSERT INTO chamados_timeline (id, chamado_id, tipo, conteudo, autor_id, autor_nome, autor_tipo, created_at, metadata) VALUES ('4a4e5d1d-68aa-4e27-a931-8f740d1480d5', 'cad04c86-c239-44cd-bd61-28985c75c788', 'status_change', 'Status alterado de "novo" para "aguardando_equipe"', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'admin', '2025-06-24 14:37:55.452473+00', '{"status_novo": "aguardando_equipe", "status_anterior": "novo"}');
INSERT INTO chamados_timeline (id, chamado_id, tipo, conteudo, autor_id, autor_nome, autor_tipo, created_at, metadata) VALUES ('ce24cacf-942e-45bd-9783-21b8890e596a', 'cad04c86-c239-44cd-bd61-28985c75c788', 'resposta', 'ggg', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'admin', '2025-06-24 14:37:55.452473+00', '{}');
INSERT INTO chamados_timeline (id, chamado_id, tipo, conteudo, autor_id, autor_nome, autor_tipo, created_at, metadata) VALUES ('973b3af4-dbc7-42dd-97c4-1f4df2eff460', 'cad04c86-c239-44cd-bd61-28985c75c788', 'status_change', 'Status alterado de "aguardando_equipe" para "aguardando_cliente"', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'admin', '2025-06-25 17:46:29.336438+00', '{"status_novo": "aguardando_cliente", "status_anterior": "aguardando_equipe"}');


--
-- Data for Name: client_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('6c017ac1-91d9-4954-8122-d14d01f4d566', '54799458-7dc0-4eb0-a742-284e67f2ff2f', 'dashboard', 't', '2025-06-24 13:02:01.854146+00', '2025-06-24 13:02:01.854146+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('a4532849-2204-4512-a040-535388776439', '54799458-7dc0-4eb0-a742-284e67f2ff2f', 'chamados', 't', '2025-06-24 13:02:01.854146+00', '2025-06-24 13:02:01.854146+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('c30ed60f-2583-4b15-b168-1d606d6babe4', '54799458-7dc0-4eb0-a742-284e67f2ff2f', 'criativos', 't', '2025-06-24 13:02:01.854146+00', '2025-06-24 13:02:01.854146+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('f84a6461-5cd1-4704-be51-f5e2c73ac305', 'dde48b88-3536-43f4-a1d6-73f4f6695410', 'dashboard', 't', '2025-06-24 13:42:51.510085+00', '2025-06-24 13:42:51.510085+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('4a3714e3-a46e-4b34-99be-2af00e87fed6', 'dde48b88-3536-43f4-a1d6-73f4f6695410', 'chamados', 't', '2025-06-24 13:42:51.510085+00', '2025-06-24 13:42:51.510085+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('d375535c-689c-41a8-bc4d-f8a3021302f9', 'dde48b88-3536-43f4-a1d6-73f4f6695410', 'criativos', 't', '2025-06-24 13:42:51.510085+00', '2025-06-24 13:42:51.510085+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('d93ea1d7-ee47-48de-a94b-0af48cbc1316', 'dde48b88-3536-43f4-a1d6-73f4f6695410', 'relatorios', 't', '2025-06-24 14:11:23.439819+00', '2025-06-24 14:11:23.439819+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('56396a26-78a1-4451-b2d5-c80c43723680', '412e6c31-cef0-4051-aba1-db8867c1fdd9', 'dashboard', 't', '2025-06-24 14:37:26.357996+00', '2025-06-24 14:37:26.357996+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('05bcc6be-9867-4564-9143-9851d774c067', '412e6c31-cef0-4051-aba1-db8867c1fdd9', 'chamados', 't', '2025-06-24 14:37:26.357996+00', '2025-06-24 14:37:26.357996+00');
INSERT INTO client_permissions (id, client_id, module, enabled, created_at, updated_at) VALUES ('5d7dc736-3b02-4882-b9db-f28c682ad2b8', '412e6c31-cef0-4051-aba1-db8867c1fdd9', 'criativos', 't', '2025-06-24 14:37:26.357996+00', '2025-06-24 14:37:26.357996+00');


--
-- Data for Name: client_report_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO clientes (id, user_id, nome, tipo_acesso, ativo, created_at, updated_at, email, telefone, empresa, observacoes_internas, responsavel_conta, contas_meta) VALUES ('54799458-7dc0-4eb0-a742-284e67f2ff2f', '3a307fc7-353f-4ae6-bac9-18029f367487', 'Cliente Teste', 'api', 't', '2025-06-24 13:02:01.854146+00', '2025-06-24 13:02:01.854146+00', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO clientes (id, user_id, nome, tipo_acesso, ativo, created_at, updated_at, email, telefone, empresa, observacoes_internas, responsavel_conta, contas_meta) VALUES ('dde48b88-3536-43f4-a1d6-73f4f6695410', '70b54462-828c-4d86-85da-9be4040e93d7', 'Cliente 2', 'api', 't', '2025-06-24 13:42:51.510085+00', '2025-06-24 13:42:51.510085+00', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO clientes (id, user_id, nome, tipo_acesso, ativo, created_at, updated_at, email, telefone, empresa, observacoes_internas, responsavel_conta, contas_meta) VALUES ('412e6c31-cef0-4051-aba1-db8867c1fdd9', '2154728e-4e56-4530-be02-f009f40de0a6', 'cliente teste', 'api', 't', '2025-06-24 14:37:26.357996+00', '2025-06-24 14:37:26.357996+00', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: contas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: criativos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: meta_api_credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('5fab3b9a-a923-43fc-a32c-5500b10e00a6', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-10 16:37:22.420247+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('30e68ffa-3e04-4109-801e-2c03389b2de3', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-10 16:44:37.832389+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('c9822057-c3f9-4e2a-bf96-4d4a194ef0c0', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO3LEtSOXkhX2jIpczWEntqfgsdvHujTQJ8N91f5W6GmZBF8K2AAZCaSnEvrqESZCFd3ioGpj3IoCmReuDeD4ngI5fqmPovTn5UXlO6eNE0GSi5gXL37TOuCfwbPNv4NRUtgwGzIhCZCHUoNE3plQ7xuJEPv7TYzJoVVEHUeN3ZAow8JTt\n', '2025-06-10 16:45:45.483655+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('220e9abd-76a7-4893-8392-9a44b59aaf4f', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO3LEtSOXkhX2jIpczWEntqfgsdvHujTQJ8N91f5W6GmZBF8K2AAZCaSnEvrqESZCFd3ioGpj3IoCmReuDeD4ngI5fqmPovTn5UXlO6eNE0GSi5gXL37TOuCfwbPNv4NRUtgwGzIhCZCHUoNE3plQ7xuJEPv7TYzJoVVEHUeN3ZAow8JTt\n', '2025-06-10 19:30:21.472505+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('e9fa96c2-03eb-4e32-be72-cc4bedb1f4b0', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-12 20:52:12.411135+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('691c3952-b299-48fd-ad2d-5690c32a09de', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 12:19:13.612425+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('24979567-be81-4a80-b58c-d92bb24a4b5a', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 14:45:24.670595+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('8ec45f6e-ce78-4fdd-9874-2e121b8537b0', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 14:46:59.099584+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('cc34f68d-f6d4-4f2f-bdc7-f07ec7857872', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 14:50:47.392303+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('35b23889-517d-4fe2-b2c3-b89f00d1da6b', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 14:54:33.382249+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('e585a05b-c90c-481b-9485-51b8e1820e2e', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO0HzysXppOB8N6bBDgG8EX07Sc135bmZB9LIKckM3iExCjV1pqb0Fc74OI0NZCZCugEfZCQRcwlZBb9jDuC4k8GUfrf9LNBEcOH8TaQ6Cn8dgvcyS1vZC5EUo0X58ohA1dmjjxW1PTco5glOVPcQ7LEu5JnbNWYOZCymBlh4qvYeoukYX541MqQpgfg7tdGNGmnPvOpGfmpfDodWuMFAg77Bmi6\n', '2025-06-13 17:33:15.395268+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('5f193c26-c83a-4fe8-82ea-506431c47cd5', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO3GTHLNkhywkxsPUEKLOnbaE2Ayn0ZBbZAo38wl5Buj6gXvjXME4OksZBVVSJqye99nNa6V1bfnxXhEFH0lZBxFfutaPV5prjCTIyCBddu5cLwfaaL7Lxx8WNd4xIfudZB0tspVl5CZCxrhSBAJ2bwkSqWXGKotJ7rRgZBbxWhPAWCue16UXMMsOQWD', '2025-06-13 17:40:32.174814+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('9f169a99-b338-411e-9e73-de2175e6fdec', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO3GTHLNkhywkxsPUEKLOnbaE2Ayn0ZBbZAo38wl5Buj6gXvjXME4OksZBVVSJqye99nNa6V1bfnxXhEFH0lZBxFfutaPV5prjCTIyCBddu5cLwfaaL7Lxx8WNd4xIfudZB0tspVl5CZCxrhSBAJ2bwkSqWXGKotJ7rRgZBbxWhPAWCue16UXMMsOQWD', '2025-06-13 19:23:32.540198+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('7cd48094-b6ee-475d-b455-522f3062cfa3', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO3GTHLNkhywkxsPUEKLOnbaE2Ayn0ZBbZAo38wl5Buj6gXvjXME4OksZBVVSJqye99nNa6V1bfnxXhEFH0lZBxFfutaPV5prjCTIyCBddu5cLwfaaL7Lxx8WNd4xIfudZB0tspVl5CZCxrhSBAJ2bwkSqWXGKotJ7rRgZBbxWhPAWCue16UXMMsOQWD', '2025-06-13 19:43:42.101299+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('fab13020-cfe2-4158-9af7-c521e157a762', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBOx19xt908fm3C2Iy0bY6kFI3yJQSZBjsNzIVmyXJCjadQRY7dHk49PDa5uiaudXXTnZCuHb0x9jWPBZAYAsEK8bL9Q4PLZAMMISIazF1NZBgAPNpVlHabrCBU8JgOoR0X6GntGyxaosuk2htvyYdcKKTg2gzZALVdvfgODqVTifVMZBlcAHXMn8QctZB', '2025-06-13 19:50:42.990228+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('7d6cc078-1c93-4c2c-b1f3-f1fe63520280', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBOx19xt908fm3C2Iy0bY6kFI3yJQSZBjsNzIVmyXJCjadQRY7dHk49PDa5uiaudXXTnZCuHb0x9jWPBZAYAsEK8bL9Q4PLZAMMISIazF1NZBgAPNpVlHabrCBU8JgOoR0X6GntGyxaosuk2htvyYdcKKTg2gzZALVdvfgODqVTifVMZBlcAHXMn8QctZB', '2025-06-13 19:55:54.751227+00');
INSERT INTO meta_api_credentials (id, app_id, app_secret, access_token, created_at) VALUES ('3983971d-cefe-4ba8-96d5-24efb7f4bf13', '585774567328419', '14e544441b9b2262068a0b6443b30680', 'EAAIUwkUBCqMBO6nA8OlDuZCLJrb7MeBLQ4COZB579TY25V6d9ZBIozDkDrUKjGm9NTKQowTBpIoc1zFCq0q5Ko3M8GZCRm7yGwVhxBdsFxJEKXxoAMocuZAhAELwpS32ZAFIdaffIZBNYGYx2ZCgJnG4I47syoEcxSqRMoZCJBhFs6hw9vZCyG4myARVDZAddzvXgZDZD', '2025-06-16 09:11:53.723671+00');


--
-- Data for Name: metrics_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('9864ca6d-ab60-4704-9918-33166c8c290e', '2025-06-12 17:27:30.352713+00', '2025-06-12 17:27:30.352713+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('433e9979-c932-4861-b5e7-3fd6106750df', '2025-06-12 17:27:35.474572+00', '2025-06-12 17:27:35.474572+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('8659a09e-7aa5-44f5-ac50-df5b9f3dfead', '2025-06-12 17:27:36.656368+00', '2025-06-12 17:27:36.656368+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('95c03454-a959-4509-8826-516f59d7395d', '2025-06-12 17:27:43.02133+00', '2025-06-12 17:27:43.02133+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('4dc3865f-6fe3-4bee-83b8-c117845468d8', '2025-06-12 17:27:45.57464+00', '2025-06-12 17:27:45.57464+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"conversions\\",\\"link_clicks\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('6dd0b41d-1022-4f5b-940d-6eb261026f83', '2025-06-12 17:27:46.317434+00', '2025-06-12 17:27:46.317434+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"conversions\\",\\"link_clicks\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('b3bf5a6e-7cea-4fb4-8e56-1e8f7d9fae24', '2025-06-12 17:45:59.049149+00', '2025-06-12 17:45:59.049149+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('4f615882-547e-4ddc-bcf5-27ee64205226', '2025-06-12 17:46:13.641821+00', '2025-06-12 17:46:13.641821+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('0c06b30f-639e-4945-8db7-f40691f088b7', '2025-06-12 17:46:19.430609+00', '2025-06-12 17:46:19.430609+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"frequency\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('2eec0217-eddc-45e1-a466-9f8ba3095b7c', '2025-06-12 17:46:30.734597+00', '2025-06-12 17:46:30.734597+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"frequency\\",\\"conversions\\",\\"link_clicks\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('fd1c59b5-6238-4d7f-8885-a47850b95c40', '2025-06-12 17:46:36.985311+00', '2025-06-12 17:46:36.985311+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"frequency\\",\\"conversions\\",\\"link_clicks\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('5c3b4d97-a373-40ff-8fd7-3221d4a651fb', '2025-06-13 12:19:24.852784+00', '2025-06-13 12:19:24.852784+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"reach\\",\\"clicks\\",\\"unique_clicks\\",\\"spend\\",\\"ctr\\",\\"unique_ctr\\",\\"cpc\\",\\"cost_per_unique_click\\",\\"cpm\\",\\"frequency\\",\\"post_engagement\\",\\"page_engagement\\",\\"post_reactions\\",\\"comment\\",\\"share\\",\\"like\\",\\"photo_view\\",\\"video_views\\",\\"video_view_rate\\",\\"cost_per_video_view\\",\\"video_play\\",\\"canvas_avg_view_time\\",\\"canvas_avg_view_percent\\",\\"conversions\\",\\"purchases\\",\\"actions\\",\\"cost_per_action_type\\",\\"website_clicks\\",\\"link_clicks\\",\\"unique_inline_link_clicks\\",\\"inline_link_clicks\\",\\"inline_post_engagement\\",\\"cost_per_inline_link_click\\",\\"cost_per_inline_post_engagement\\",\\"outbound_clicks\\",\\"cost_per_outbound_click\\",\\"unique_outbound_clicks\\",\\"cost_per_unique_outbound_click\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('4e1d689b-5013-4e3e-8b48-ce03a9e25233', '2025-06-13 12:19:28.546611+00', '2025-06-13 12:19:28.546611+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"reach\\",\\"clicks\\",\\"unique_clicks\\",\\"spend\\",\\"ctr\\",\\"unique_ctr\\",\\"cpc\\",\\"cost_per_unique_click\\",\\"cpm\\",\\"frequency\\",\\"post_engagement\\",\\"page_engagement\\",\\"post_reactions\\",\\"comment\\",\\"share\\",\\"like\\",\\"photo_view\\",\\"video_views\\",\\"video_view_rate\\",\\"cost_per_video_view\\",\\"video_play\\",\\"canvas_avg_view_time\\",\\"canvas_avg_view_percent\\",\\"conversions\\",\\"purchases\\",\\"actions\\",\\"cost_per_action_type\\",\\"website_clicks\\",\\"link_clicks\\",\\"unique_inline_link_clicks\\",\\"inline_link_clicks\\",\\"inline_post_engagement\\",\\"cost_per_inline_link_click\\",\\"cost_per_inline_post_engagement\\",\\"outbound_clicks\\",\\"cost_per_outbound_click\\",\\"unique_outbound_clicks\\",\\"cost_per_unique_outbound_click\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('22cabdd7-4db5-4127-8362-8a0dff7c32f5', '2025-06-13 14:47:12.300882+00', '2025-06-13 14:47:12.300882+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('8f514efc-669a-4bb0-bf15-caaa878db35d', '2025-06-13 14:47:14.575805+00', '2025-06-13 14:47:14.575805+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('ab3f7941-d8f5-4791-a483-6a12798c3884', '2025-06-13 17:41:40.742139+00', '2025-06-13 17:41:40.742139+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('3e68aea7-afe5-4ec7-9d78-8ffa8eefa41a', '2025-06-13 17:41:46.118441+00', '2025-06-13 17:41:46.118441+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('62364894-6b3b-406b-9fff-68269f31a76c', '2025-06-13 17:41:53.888896+00', '2025-06-13 17:41:53.888896+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('240a61b7-464c-4dce-b3bd-a2127df3cd02', '2025-06-13 17:42:10.892324+00', '2025-06-13 17:42:10.892324+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('307544c6-ff45-4d74-929a-b70400654f16', '2025-06-13 17:42:12.559893+00', '2025-06-13 17:42:12.559893+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('42f5dccc-96fd-4edf-a96a-9ac3e9837244', '2025-06-13 17:42:13.087573+00', '2025-06-13 17:42:13.087573+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('ced0028a-c61a-4c37-bf31-1207210730bc', '2025-06-13 17:42:16.934963+00', '2025-06-13 17:42:16.934963+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('84b1db44-19da-4b35-87c2-9135798ed295', '2025-06-13 17:42:36.660554+00', '2025-06-13 17:42:36.660554+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\",\\"conversions\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('9564abc2-ab74-4c3d-94ba-e046af819e6c', '2025-06-13 17:42:20.672049+00', '2025-06-13 17:42:20.672049+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('0841d2d8-3a68-43a6-a9cd-4ab4456fd9b5', '2025-06-13 17:42:32.575701+00', '2025-06-13 17:42:32.575701+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('be491819-c6ce-4901-b3d1-d6a53fbf5a7f', '2025-06-13 17:42:35.852018+00', '2025-06-13 17:42:35.852018+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\",\\"frequency\\",\\"cpm\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"unique_ctr\\",\\"cpm\\",\\"frequency\\",\\"conversions\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\",\\"conversions\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('0a2f3bdb-733c-4b37-b995-b588e5ab5d81', '2025-06-13 18:44:03.222688+00', '2025-06-13 18:44:03.222688+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('7b9ce8f7-b182-4931-994c-864da3544568', '2025-06-13 18:44:06.52654+00', '2025-06-13 18:44:06.52654+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('6dd12ecc-278a-4016-a9b4-6ad1c524aa3d', '2025-06-13 18:44:12.050042+00', '2025-06-13 18:44:12.050042+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('f148cf5e-0897-4a14-9060-aa1bfb453ee9', '2025-06-13 18:44:20.446127+00', '2025-06-13 18:44:20.446127+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('d22f1a8c-1d2a-42bd-8590-22369710be86', '2025-06-13 18:44:28.823966+00', '2025-06-13 18:44:28.823966+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('f1cfc013-982a-4d9e-b033-8b68e5972f45', '2025-06-13 18:56:48.344512+00', '2025-06-13 18:56:48.344512+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('956fc9d1-0b7a-4d9f-b052-2842f48b53eb', '2025-06-13 18:56:58.891027+00', '2025-06-13 18:56:58.891027+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('d176ed29-011e-40b3-8868-e409e8b723c4', '2025-06-13 18:57:31.978978+00', '2025-06-13 18:57:31.978978+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"frequency\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('3f4e5068-37fc-4d98-acd1-c2b099454fdc', '2025-06-13 18:57:35.465352+00', '2025-06-13 18:57:35.465352+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('e62eb58e-46f3-4cca-b2ea-5796a992d054', '2025-06-13 18:57:47.155236+00', '2025-06-13 18:57:47.155236+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('a65a87c8-2764-4c6a-acab-3d8e34c639d4', '2025-06-13 18:57:53.361876+00', '2025-06-13 18:57:53.361876+00', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"conversions\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"]}"');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('1a5dcb2e-65f7-480c-89c5-577b4009cd5c', '2025-06-13 21:21:20.755247+00', '2025-06-13 21:21:20.755247+00', '{"ads": ["impressions", "reach", "clicks", "unique_clicks", "spend", "ctr", "unique_ctr", "cpc", "cost_per_unique_click", "cpm", "frequency", "post_engagement", "page_engagement", "post_reactions", "comment", "share", "like", "photo_view", "video_views", "video_view_rate", "cost_per_video_view", "video_play", "canvas_avg_view_time", "canvas_avg_view_percent", "conversions", "purchases", "actions", "cost_per_action_type", "website_clicks", "link_clicks", "unique_inline_link_clicks", "inline_link_clicks", "inline_post_engagement", "cost_per_inline_link_click", "cost_per_inline_post_engagement", "outbound_clicks", "cost_per_outbound_click", "unique_outbound_clicks", "cost_per_unique_outbound_click"], "adsets": ["impressions", "clicks", "spend", "ctr", "cpc"], "campaigns": ["impressions", "clicks", "spend", "ctr", "cpc", "reach"], "dashboard": ["impressions", "clicks", "spend", "ctr", "cpc"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('961710f5-3b22-4bb2-9324-016b57381467', '2025-06-13 21:21:22.301312+00', '2025-06-13 21:21:22.301312+00', '{"ads": [], "adsets": ["impressions", "clicks", "spend", "ctr", "cpc"], "campaigns": ["impressions", "clicks", "spend", "ctr", "cpc", "reach"], "dashboard": ["impressions", "clicks", "spend", "ctr", "cpc"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('9e945846-db81-4b3c-bab2-519b262d2384', '2025-06-14 09:33:20.84989+00', '2025-06-14 09:33:20.84989+00', '{"ads": [], "adsets": ["impressions", "clicks", "spend", "ctr", "cpc"], "campaigns": ["impressions", "clicks", "cpm"], "dashboard": ["impressions", "clicks", "cpm"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('5da4509d-ec1a-4790-988c-ae15b96510fb', '2025-06-14 09:33:51.689802+00', '2025-06-14 09:33:51.689802+00', '{"ads": ["impressions", "clicks", "frequency"], "adsets": ["impressions", "clicks", "cpm"], "campaigns": ["impressions", "clicks", "cpm"], "dashboard": ["impressions", "clicks", "cpm"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('152bdf0c-e076-4193-815f-82e1e0a379c1', '2025-06-14 10:55:52.840624+00', '2025-06-14 10:55:52.840624+00', '{"ads": ["impressions", "clicks", "frequency", "results", "cost_per_result", "ctr"], "adsets": ["impressions", "clicks", "cpm", "results", "cost_per_result"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "conversions"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('54c68f70-3d13-4f40-a749-07c81545b697', '2025-06-14 10:58:05.163831+00', '2025-06-14 10:58:05.163831+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result"], "adsets": ["impressions", "clicks", "cpm", "results", "cost_per_result"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "conversions"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('c3d5140f-80fa-48a0-ba18-9c40cf2c3347', '2025-06-14 11:00:48.068138+00', '2025-06-14 11:00:48.068138+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result"], "adsets": ["impressions", "clicks", "cpm", "results", "cost_per_result"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "results", "cost_per_result"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('4c63a9b8-e21b-416a-b1f7-52bcba1c93c2', '2025-06-14 13:24:42.146899+00', '2025-06-14 13:24:42.146899+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result", "cpm", "cpc", "ctr"], "adsets": ["impressions", "clicks", "cpm", "results", "cost_per_result"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "results", "cost_per_result"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('6719c2cc-6b6c-4095-aaab-98f922e0ed40', '2025-06-14 13:25:50.890334+00', '2025-06-14 13:25:50.890334+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result", "ctr"], "adsets": ["impressions", "clicks", "cpm", "results", "cost_per_result"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "results", "cost_per_result"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('53424434-62bc-49ae-aae5-33b6b25a6a66', '2025-06-16 09:23:07.164796+00', '2025-06-16 09:23:07.164796+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result", "ctr"], "adsets": ["impressions", "clicks", "results", "cost_per_result", "link_clicks", "frequency", "spend"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "results", "cost_per_result"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('47268afa-333c-4db2-bfdd-48b8e1391106', '2025-06-16 09:23:44.513615+00', '2025-06-16 09:23:44.513615+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result", "ctr"], "adsets": ["impressions", "clicks", "link_clicks", "frequency", "spend", "conversions", "leads", "cost_per_conversion"], "campaigns": ["impressions", "clicks", "results", "cost_per_result"], "dashboard": ["impressions", "clicks", "results", "cost_per_result"]}');
INSERT INTO metrics_config (id, created_at, updated_at, config) VALUES ('315c1ca2-f985-4f9a-97b4-62484a999bd4', '2025-06-16 09:24:51.472563+00', '2025-06-16 09:24:51.472563+00', '{"ads": ["impressions", "frequency", "results", "cost_per_result", "ctr"], "adsets": ["impressions", "clicks", "link_clicks", "frequency", "spend", "results"], "campaigns": ["impressions", "clicks", "reach", "spend"], "dashboard": ["impressions", "clicks", "reach", "spend"]}');


--
-- Data for Name: permission_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('63927094-9dce-4235-8f6e-03240a68e3cf', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_dashboard', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('efe5d9bb-b0e1-4d3e-91a4-f5f050045c51', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_whatsapp', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('49a36857-7b0d-4d76-8b9d-ce590963d5fc', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_campaigns', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('c4b92e25-e073-44e8-b248-705db7f9b5cf', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'edit_campaigns', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('56b6e332-bfad-4142-8cbf-4a87eab59fef', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_templates', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('4f457abd-641f-49ac-b1b5-216aa54b603f', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'send_messages', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('518a3359-ade0-4cd6-b29e-d8ed148f7c05', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_metrics', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('7ae78f86-7105-43b7-8107-d4f50b8c979e', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_tasks', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('0a6faf2b-5cf2-4335-9c4d-73455ad54f0b', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_tasks', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('408d5a39-9f8d-449e-b030-95c0d10d72c7', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'assign_tasks', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('784ba97f-7a82-4014-acf4-64c32b8779eb', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'finalize_tasks', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('5d3bfe63-7b0f-4b08-b6cd-21b02ccc2154', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'edit_execution_time', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('07ae4cdb-fc26-4c29-898b-08af0931446a', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_calls', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('0d01ca5e-d156-4f7a-95e4-748cd13d02b8', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_calls', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('0a512638-acb4-48fb-ae6e-e72b4881af66', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'finalize_calls', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('00a50526-6230-4098-8673-efe05a6c05ae', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'link_calls_to_tasks', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('03401ed3-9191-4c0b-9784-0b04eccce5b2', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_creatives', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('21c100da-f996-4622-88eb-0ef80151e35b', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_edit_creatives', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('7ad0946e-d0c5-4b1c-a171-f7459ac96f10', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'approve_creatives', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('5b0550c7-44ba-4bb6-89c3-156e6c4b1967', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_change_history', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('1a29aa44-efce-413b-9695-09328870bfe3', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_paid_media', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('b068da53-f69a-4cfa-8479-a13ffb9a0b6e', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_campaigns_media', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('df99a99b-3adc-450d-b6bb-11764cba6390', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_metrics_media', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('c4d1f62f-a243-4faf-9001-bfce70f864af', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'access_reports', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('1074ed8f-ebb6-4c6d-8d2f-f8a507218e3a', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'create_automatic_reports', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('a665aa93-e851-439e-ab79-f4567415313a', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_user_settings', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('f334e2ca-61f2-4fc6-9be8-128710e85711', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_collaborators', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('23cf64c0-2e6f-45cc-beb7-bf594ab8b72d', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_whatsapp_templates', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('a489b1c3-9380-47a7-9065-fae84f00e92e', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_api_settings', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('44d94374-6a15-4963-acc4-4cb34d213ab9', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_appearance_and_visual_identity', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('a5ceec9a-4436-4c30-9a80-70c52deeeec5', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_external_integrations', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('9c2b0b98-6420-49e2-a487-6bcb9b3426cc', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_variables_and_pre_configurations', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('47a45ecc-fabc-4f38-af23-0046a027013f', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_billing_settings', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('53389fed-3c67-47e0-99c8-96595c872d1c', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'view_system_logs', '{"timestamp": "2025-06-16T13:00:32.885459+00:00"}', '2025-06-16 13:00:32.885459+00');
INSERT INTO permission_logs (id, target_user_id, changed_by, action, permission, details, created_at) VALUES ('50622b7e-7daa-4afb-9ab6-00df545aa785', '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'granted', 'manage_clients', '{"timestamp": "2025-06-23T13:18:10.490007+00:00"}', '2025-06-23 13:18:10.490007+00');


--
-- Data for Name: permission_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner Admin', 'vagner@leadclinic.com.br', 'admin', 't', '2025-06-13 14:42:03.908398+00', '2025-06-16 18:30:51.82025+00', 't', NULL, 'ativo');
INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('536b84a9-6191-430b-ae30-f04bbfd76ebd', 'Vagner', 'leadclinic@gmail.com', 'admin', 't', '2025-06-24 14:36:44.492371+00', '2025-06-24 14:36:44.492371+00', 'f', NULL, 'ativo');
INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('2154728e-4e56-4530-be02-f009f40de0a6', 'cliente teste', 'teste@hotmail.com', 'cliente', 't', '2025-06-24 14:37:25.182272+00', '2025-06-24 14:37:25.182272+00', 'f', NULL, 'ativo');
INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('3a307fc7-353f-4ae6-bac9-18029f367487', 'Cliente Teste', 'teste@teste.com', 'admin', 't', '2025-06-24 13:02:00.735531+00', '2025-06-24 14:52:21.725479+00', 'f', NULL, 'ativo');
INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('70b54462-828c-4d86-85da-9be4040e93d7', 'Cliente 2', 'cliente@gmail.com', 'cliente', 'f', '2025-06-24 13:42:50.299668+00', '2025-06-30 12:46:23.937746+00', 'f', NULL, 'inativo');
INSERT INTO profiles (id, nome, email, role, ativo, created_at, updated_at, is_root_admin, foto_url, status) VALUES ('331154a6-c85f-464b-b840-74448443e470', 'Suporte Técnico', 'suporte.tecnico@leadclinic.com.br', 'admin', 't', '2025-06-30 11:57:51.61769+00', '2025-06-30 13:01:41.085209+00', 'f', NULL, 'ativo');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO projects (id, name, description, client_id, created_by, created_at, status, responsible_id, start_date, end_date) VALUES ('f2fa808e-deeb-4f24-88bd-1764aa7e1cea', 'Projeto Teste', 'Projeto Teste', 'dde48b88-3536-43f4-a1d6-73f4f6695410', '8c858fa0-380a-4940-bee7-2b302753e6f2', '2025-06-24 14:38:45.224663+00', 'ativo', '536b84a9-6191-430b-ae30-f04bbfd76ebd', '2025-06-26 00:00:00+00', '2025-06-28 00:00:00+00');


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: system_activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('f6bff369-0eac-4aa5-9ffb-cbf37285316b', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[\\"impressions\\",\\"reach\\",\\"clicks\\",\\"unique_clicks\\",\\"spend\\",\\"ctr\\",\\"unique_ctr\\",\\"cpc\\",\\"cost_per_unique_click\\",\\"cpm\\",\\"frequency\\",\\"post_engagement\\",\\"page_engagement\\",\\"post_reactions\\",\\"comment\\",\\"share\\",\\"like\\",\\"photo_view\\",\\"video_views\\",\\"video_view_rate\\",\\"cost_per_video_view\\",\\"video_play\\",\\"canvas_avg_view_time\\",\\"canvas_avg_view_percent\\",\\"conversions\\",\\"purchases\\",\\"actions\\",\\"cost_per_action_type\\",\\"website_clicks\\",\\"link_clicks\\",\\"unique_inline_link_clicks\\",\\"inline_link_clicks\\",\\"inline_post_engagement\\",\\"cost_per_inline_link_click\\",\\"cost_per_inline_post_engagement\\",\\"outbound_clicks\\",\\"cost_per_outbound_click\\",\\"unique_outbound_clicks\\",\\"cost_per_unique_outbound_click\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-13 21:21:20.873782+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('4a231b25-8852-4220-9133-e13463b675a5', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\",\\"reach\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-13 21:21:22.36816+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('dcf5cfbd-3ef3-4424-af68-204bed4e376a', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"spend\\",\\"ctr\\",\\"cpc\\"],\\"ads\\":[]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 09:33:20.977805+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('7ca7decd-de3e-4d8b-a180-6aeab29b9ca0', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"frequency\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 09:33:51.743337+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('5250f8fe-c6d7-427f-8614-efa5e7f7d853', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"conversions\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\",\\"results\\",\\"cost_per_result\\"],\\"ads\\":[\\"impressions\\",\\"clicks\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 10:55:52.959586+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('558c6cf2-53f6-418b-8d68-7497f128dc34', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"conversions\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\",\\"results\\",\\"cost_per_result\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 10:58:05.226961+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('293f362f-b760-4b18-b412-34e086fd8b4c', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\",\\"results\\",\\"cost_per_result\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 11:00:48.124939+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('abb725b3-b0dc-42de-8245-8a9d148379d5', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\",\\"results\\",\\"cost_per_result\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"cpm\\",\\"cpc\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 13:24:42.337025+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('4dd107ef-402b-43af-8e03-de65cea515ff', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"cpm\\",\\"results\\",\\"cost_per_result\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 13:25:50.949424+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('9528c423-d7aa-4586-895f-58f8acf2b2ba', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'api_connection_tested', 'meta_api', '"{\\"status\\":\\"success\\"}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-14 13:27:03.261155+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('bbaeb64c-4eb6-434b-af24-c9871d972ee9', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'api_credentials_updated', 'meta_api', '"{\\"app_id\\":\\"585774567328419\\",\\"has_token\\":true}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-16 09:11:53.847432+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('a965354d-999b-487b-a037-910fa0d206ee', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'api_connection_tested', 'meta_api', '"{\\"status\\":\\"success\\"}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-16 09:11:58.932739+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('1e2a10b1-e3c8-4e78-a5f4-fbb54011e98b', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\",\\"link_clicks\\",\\"frequency\\",\\"spend\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-16 09:23:07.257336+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('4b0d10ec-b997-425e-b728-bda7feb8ce16', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"results\\",\\"cost_per_result\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"link_clicks\\",\\"frequency\\",\\"spend\\",\\"conversions\\",\\"leads\\",\\"cost_per_conversion\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-16 09:23:44.616018+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('5a44a08f-1c3c-488f-99bc-9f37ea6ebc79', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'Vagner', 'metrics_config_updated', 'configuracoes', '"{\\"dashboard\\":[\\"impressions\\",\\"clicks\\",\\"reach\\",\\"spend\\"],\\"campaigns\\":[\\"impressions\\",\\"clicks\\",\\"reach\\",\\"spend\\"],\\"adsets\\":[\\"impressions\\",\\"clicks\\",\\"link_clicks\\",\\"frequency\\",\\"spend\\",\\"results\\"],\\"ads\\":[\\"impressions\\",\\"frequency\\",\\"results\\",\\"cost_per_result\\",\\"ctr\\"]}"', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '2025-06-16 09:24:51.565893+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('6062fbae-bd5c-45ad-aff7-50cc3c460c04', NULL, 'Sistema', 'password_reset', 'client_management', '{"admin_id": "8c858fa0-380a-4940-bee7-2b302753e6f2", "client_id": "f259c2ad-9af2-4f1f-977a-e07b2c81455f", "timestamp": "2025-06-20T11:19:59.797Z", "client_name": "Cliente teste geral"}', NULL, NULL, '2025-06-20 11:19:59.818409+00');
INSERT INTO system_activity_logs (id, usuario_id, usuario_nome, acao, modulo, detalhes, ip_address, user_agent, created_at) VALUES ('68cd51ed-0ec9-4b4d-8632-40ffd495a854', NULL, 'Sistema', 'password_reset', 'client_management', '{"admin_id": "8c858fa0-380a-4940-bee7-2b302753e6f2", "client_id": "f259c2ad-9af2-4f1f-977a-e07b2c81455f", "timestamp": "2025-06-20T11:20:56.507Z", "client_name": "Cliente teste geral"}', NULL, NULL, '2025-06-20 11:20:56.540853+00');


--
-- Data for Name: task_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO task_comments (id, task_id, author_id, content, created_at) VALUES ('f01821b6-ae60-47bc-ad12-841be71d59d2', '562cbbc1-9c84-4b6c-a50e-dacab3410c89', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'teste', '2025-06-30 01:17:36.736769+00');


--
-- Data for Name: task_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tasks (id, title, description, status, priority, due_date, tags, project_id, owner_id, created_by, linked_ticket_id, created_at, type, actual_hours, assigned_to, estimated_hours, order_index, section_id, start_date, updated_at) VALUES ('1fda0e62-7b2f-479c-9a6b-d8ef77400d20', 'Otimização para Motores de Busca', 'Otimização para Motores de Busca', 'em_execucao', 'alta', '2025-07-04', '{}', 'f2fa808e-deeb-4f24-88bd-1764aa7e1cea', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, '2025-06-27 20:41:47.408701+00', 'geral', NULL, '331154a6-c85f-464b-b840-74448443e470', '0', NULL, NULL, NULL, NULL);
INSERT INTO tasks (id, title, description, status, priority, due_date, tags, project_id, owner_id, created_by, linked_ticket_id, created_at, type, actual_hours, assigned_to, estimated_hours, order_index, section_id, start_date, updated_at) VALUES ('44ced383-7baf-4f9e-a999-12a438403a37', 'Vídeo para edição - b2bot', 'Vídeo para edição - b2bot', 'backlog', 'baixa', '2025-06-30', '{}', 'f2fa808e-deeb-4f24-88bd-1764aa7e1cea', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, '2025-06-27 20:41:12.972492+00', 'geral', NULL, '331154a6-c85f-464b-b840-74448443e470', '0', NULL, NULL, NULL, NULL);
INSERT INTO tasks (id, title, description, status, priority, due_date, tags, project_id, owner_id, created_by, linked_ticket_id, created_at, type, actual_hours, assigned_to, estimated_hours, order_index, section_id, start_date, updated_at) VALUES ('948740e2-e5cb-4ffd-80be-f0b36ff1886c', 'Renovação de Licença Elementor', 'Renovação de Licença Elementor', 'aguardando', 'media', '2025-07-04', '{}', 'f2fa808e-deeb-4f24-88bd-1764aa7e1cea', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, '2025-06-27 20:42:38.197261+00', 'geral', NULL, '536b84a9-6191-430b-ae30-f04bbfd76ebd', '0', NULL, NULL, NULL, NULL);
INSERT INTO tasks (id, title, description, status, priority, due_date, tags, project_id, owner_id, created_by, linked_ticket_id, created_at, type, actual_hours, assigned_to, estimated_hours, order_index, section_id, start_date, updated_at) VALUES ('b66c9905-3377-4063-9f86-f10482ad79b8', 'Rotina de Manutenção e Atualização de Sites', 'Rotina de Manutenção e Atualização de Sites', 'finalizada', 'urgente', '2025-07-12', '{}', 'f2fa808e-deeb-4f24-88bd-1764aa7e1cea', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, '2025-06-27 20:42:11.000039+00', 'geral', NULL, '536b84a9-6191-430b-ae30-f04bbfd76ebd', '0', NULL, NULL, NULL, NULL);
INSERT INTO tasks (id, title, description, status, priority, due_date, tags, project_id, owner_id, created_by, linked_ticket_id, created_at, type, actual_hours, assigned_to, estimated_hours, order_index, section_id, start_date, updated_at) VALUES ('562cbbc1-9c84-4b6c-a50e-dacab3410c89', 'Otimização de Campanhas', 'Otimização de Campanhas de campanhas para as contas\nCL299 e CL220', 'em_revisao', 'alta', '2025-07-11', '{}', 'f2fa808e-deeb-4f24-88bd-1764aa7e1cea', NULL, '8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, '2025-06-30 01:16:40.310498+00', 'geral', NULL, '536b84a9-6191-430b-ae30-f04bbfd76ebd', '12', NULL, NULL, NULL, NULL);


--
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('7d18c472-33c1-4bb5-8246-5a53277caad7', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_dashboard', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('ba5f220a-ae48-47f9-9364-28b4e2973ddf', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_whatsapp', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('1815249e-aee9-40fc-8ccc-a794c81f5a59', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_campaigns', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('baf80081-f040-4bae-8c35-d0f830f31ec2', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'edit_campaigns', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('b156f2a2-663c-48a8-8c25-450005433625', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_templates', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('927bbff7-84ff-4119-b87a-f6b12b2a714b', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'send_messages', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('96174575-6fce-4ca0-afbd-1703e54200d7', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_metrics', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('ea29ad76-6174-46a1-b205-dd26775628aa', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_tasks', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('3c63cc23-9f2c-482c-8c4f-22b413053e72', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_tasks', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('ee584da2-01e1-4897-8876-61d4c95b702f', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'assign_tasks', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('2fda99d7-1d5c-4cc7-9bee-3da55b4315ac', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'finalize_tasks', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('1d8ecac0-c5bc-4bbc-9e9c-22316e2fed2f', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'edit_execution_time', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('1b9f71f0-e18d-4898-9ec5-95bbf90bb3e6', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_calls', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('25949673-a7aa-4996-88f8-1bea6e0df3c7', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_calls', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('34178da8-a1bc-448a-9564-bb1f8385aa3d', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'finalize_calls', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('8db482ae-8325-4637-9e38-bde34da85fd5', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'link_calls_to_tasks', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('595660e8-0f22-48de-badd-021205296848', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_creatives', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('fbd56bab-b4a3-4ac9-b101-024f32267907', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_edit_creatives', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('35dd473f-d047-4e1d-8fe2-c445af211cb5', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'approve_creatives', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('9eb8587a-92ce-494b-9f04-ecff1988bccc', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_change_history', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('78a73257-6a30-4465-8f46-8766cd57fa92', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_paid_media', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('52932853-cce0-4854-b232-194b6e69eea9', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_campaigns_media', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('9c815f1b-4aab-4caf-be7d-9587e9ff4b70', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_metrics_media', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('042dfcf1-18e6-4c2d-8eb1-207c8fc0a7f0', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'access_reports', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('601122fc-515e-42c7-8377-ee80eb22a0b9', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'create_automatic_reports', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('4482a6b9-3929-4daf-895a-cad9741e8cf6', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_user_settings', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('339cc27d-68d5-4ad4-9d8b-8275f55a81ed', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_collaborators', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('07497665-c90d-4aa3-aad8-ce48d1dddca2', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_whatsapp_templates', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('0c994aca-f55f-4c06-801b-d6b6af423d3f', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_api_settings', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('1681fa46-6c1b-4dc9-a18e-e1ff52d94c2a', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_appearance_and_visual_identity', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('15a7eecb-d765-4dc0-b8d6-35b241bc5d18', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_external_integrations', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('b89ad77b-5b4f-415b-80ec-d09f37f8b718', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_variables_and_pre_configurations', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('cd6f98b8-7ac3-49aa-84b5-4f0758b0a7c8', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_billing_settings', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('bc60b1da-1231-4843-ae9b-78f06f030844', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'view_system_logs', NULL, '2025-06-16 13:00:32.885459+00');
INSERT INTO user_permissions (id, user_id, permission, granted_by, created_at) VALUES ('cf1baafb-4523-454a-b7d3-e293ce6e6905', '8c858fa0-380a-4940-bee7-2b302753e6f2', 'manage_clients', NULL, '2025-06-23 13:18:10.490007+00');


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('8c858fa0-380a-4940-bee7-2b302753e6f2', NULL, 'cliente', '2025-06-13 12:14:10.667638+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('3a307fc7-353f-4ae6-bac9-18029f367487', NULL, 'cliente', '2025-06-24 13:01:58.413253+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('70b54462-828c-4d86-85da-9be4040e93d7', NULL, 'cliente', '2025-06-24 13:42:48.156832+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('536b84a9-6191-430b-ae30-f04bbfd76ebd', NULL, 'cliente', '2025-06-24 14:36:42.3893+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('2154728e-4e56-4530-be02-f009f40de0a6', NULL, 'cliente', '2025-06-24 14:37:23.071255+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('29a1ac70-4c32-449e-bc92-40e54aab300b', NULL, 'admin', '2025-06-30 11:53:31.005915+00');
INSERT INTO usuarios (id, nome, tipo, criado_em) VALUES ('331154a6-c85f-464b-b840-74448443e470', NULL, 'cliente', '2025-06-30 11:57:49.353425+00');


--
-- Data for Name: whatsapp_campaign_executions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_campaigns; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: whatsapp_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('3624bcf3-7deb-422f-bfd1-05d996d3a251', '372003975999118', 'EAAZAzZBX8ZBOp0BOwwyCPDuNzU9HqTSQ0E8AjUvQZBRm55Ykq2mir5iJDE2Qwmue4WCNAUeZBKvDByOn7OZCm1sjo3lb5hsZCZAZAPkFCdcJlK8TPARV0TajDKbCoyJPAc28lbZBT1s2ZCdir01tYPjX1eORZBRfALj37EWSZAQThkGrxGH0PSYMPpiK6H9Vbm4nq4tqM5Nab155H7dFVX46K6u97SmOA8fTaZAgRI', '', NULL, 'connected', '2025-06-15 19:08:33.237+00', '2025-06-15 15:23:09.899597+00', '2025-06-15 19:07:52.018562+00');
INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('4e21e420-e8e5-4e2e-be2b-2b53a7e00446', '372003975999118', 'EAAZAzZBX8ZBOp0BO2SWZAPR6dZBfwdZA2bDSbD20CXVRicN04N0x0ZC9k4xyVKXqbBZAYZB5zwuQbUFBNZBGEne3ipSu3gCJyhIg0ePHHdP11htNP3ULiOwPoyO5QHzXLOK2sZBSX3jC4jbZBT3p9yt6CBHMyxwPu2eywaz5DRFZBbC5L3pITO0EqHDSF2Om6A6DDNTYyqoshUoZCe5kZCxHXlGAi6rZCZCQKawypbGUZD', '404720412715975', NULL, 'connected', '2025-06-15 19:13:58.636+00', '2025-06-15 19:13:12.308482+00', '2025-06-15 19:13:17.207195+00');
INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('ed20ef4d-5c6a-473a-a8ed-0d76316dbf00', '372003975999118', 'EAAZAzZBX8ZBOp0BO2SWZAPR6dZBfwdZA2bDSbD20CXVRicN04N0x0ZC9k4xyVKXqbBZAYZB5zwuQbUFBNZBGEne3ipSu3gCJyhIg0ePHHdP11htNP3ULiOwPoyO5QHzXLOK2sZBSX3jC4jbZBT3p9yt6CBHMyxwPu2eywaz5DRFZBbC5L3pITO0EqHDSF2Om6A6DDNTYyqoshUoZCe5kZCxHXlGAi6rZCZCQKawypbGUZD', '404720412715975', NULL, 'connected', '2025-06-15 19:16:27.985+00', '2025-06-15 19:15:40.579602+00', '2025-06-15 19:15:46.519165+00');
INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('c6323fbc-1a6d-45f5-9a62-36fb84fb6e36', '372003975999118', 'EAAIUwkUBCqMBO95ZAhK8bAFTi41e0Go2iGyeFyKyCAO6ffHKyXA6ghynihz0fZBzZCmDZBi0rMVEvdVvqxuoitjMT6repalhjRwO7IuWzyGvRBCLbd79IidDPHzzFnOG83AI4AMJTvElahNTiFX0fPe6J1pZCxD2woA6TiDhikjWkWMqeorLDmmNMZANGAdgJZBIJM9giVpN0C1u9DWoIjhIcevKmub45cZD', '404720412715975', NULL, 'connected', '2025-06-16 09:07:10.27+00', '2025-06-16 09:06:24.195452+00', '2025-06-16 09:06:28.23061+00');
INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('d66a7a25-fd93-4aa9-8f0c-0f3b5847c723', '372003975999118', 'EAAIUwkUBCqMBO6nA8OlDuZCLJrb7MeBLQ4COZB579TY25V6d9ZBIozDkDrUKjGm9NTKQowTBpIoc1zFCq0q5Ko3M8GZCRm7yGwVhxBdsFxJEKXxoAMocuZAhAELwpS32ZAFIdaffIZBNYGYx2ZCgJnG4I47syoEcxSqRMoZCJBhFs6hw9vZCyG4myARVDZAddzvXgZDZD', '404720412715975', NULL, 'connected', '2025-06-16 09:11:33.197+00', '2025-06-16 09:10:45.549123+00', '2025-06-16 09:10:51.177164+00');
INSERT INTO whatsapp_config (id, phone_number_id, access_token, business_account_id, webhook_verify_token, status, last_verified_at, created_at, updated_at) VALUES ('a2beb4b4-a31d-4202-b834-44cc5ac8f0de', '372003975999118', 'EAAIUwkUBCqMBO6nA8OlDuZCLJrb7MeBLQ4COZB579TY25V6d9ZBIozDkDrUKjGm9NTKQowTBpIoc1zFCq0q5Ko3M8GZCRm7yGwVhxBdsFxJEKXxoAMocuZAhAELwpS32ZAFIdaffIZBNYGYx2ZCgJnG4I47syoEcxSqRMoZCJBhFs6hw9vZCyG4myARVDZAddzvXgZDZD', '404720412715975', NULL, 'connected', '2025-06-16 09:22:38.573+00', '2025-06-16 09:21:55.155915+00', '2025-06-16 09:21:56.522065+00');


--
-- Data for Name: whatsapp_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO whatsapp_contacts (id, name, phone_number, client_id, tags, is_active, created_at, updated_at, meta_account_id, grupo, observacoes) VALUES ('ce95a461-932d-4bbf-b4c4-05a0fe572bfb', 'Contato 01', '551199112365', NULL, '{Tag01}', 't', '2025-06-15 17:28:54.196281+00', '2025-06-15 17:28:54.196281+00', NULL, NULL, NULL);


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

INSERT INTO workflow_templates (id, name, description, category, icon, steps, created_by, is_public, created_at) VALUES ('78e6da0c-c9e9-460b-9f09-031040e493f3', 'Onboarding de Cliente', 'Processo completo para integrar novos clientes', 'Comercial', 'user-plus', '[{"title": "Reunião de kick-off", "description": "Agendar e realizar reunião inicial", "estimated_hours": 2}, {"title": "Documentação de requisitos", "description": "Coletar e documentar todos os requisitos", "estimated_hours": 4}, {"title": "Setup inicial", "description": "Configurar ferramentas e acessos", "estimated_hours": 3}, {"title": "Entrega do material", "description": "Entregar documentação e orientações", "estimated_hours": 1}]', NULL, 't', '2025-06-21 09:01:51.023856+00');
INSERT INTO workflow_templates (id, name, description, category, icon, steps, created_by, is_public, created_at) VALUES ('af52fb19-59c9-4cb6-b522-aded17a7379d', 'Landing Page', 'Criação completa de landing page', 'Design', 'layout', '[{"title": "Briefing do projeto", "description": "Entender objetivos e público-alvo", "estimated_hours": 2}, {"title": "Wireframe", "description": "Criar estrutura da página", "estimated_hours": 4}, {"title": "Design visual", "description": "Desenvolver layout final", "estimated_hours": 8}, {"title": "Desenvolvimento", "description": "Implementar a página", "estimated_hours": 12}, {"title": "Testes e ajustes", "description": "Testar funcionamento e fazer correções", "estimated_hours": 4}]', NULL, 't', '2025-06-21 09:01:51.023856+00');
INSERT INTO workflow_templates (id, name, description, category, icon, steps, created_by, is_public, created_at) VALUES ('c4ee1005-52a9-4a39-a097-cd2b06052616', 'Desenvolvimento SEO', 'Otimização completa de SEO para websites', 'Marketing', 'search', '[{"title": "Auditoria SEO", "description": "Análise completa do site atual", "estimated_hours": 6}, {"title": "Pesquisa de palavras-chave", "description": "Identificar termos relevantes", "estimated_hours": 4}, {"title": "Otimização on-page", "description": "Melhorar conteúdo e estrutura", "estimated_hours": 8}, {"title": "Link building", "description": "Estratégia de construção de links", "estimated_hours": 10}]', NULL, 't', '2025-06-21 09:01:51.023856+00');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116024918', '2025-06-10 06:22:10');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116045059', '2025-06-10 06:22:14');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116050929', '2025-06-10 06:22:18');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116051442', '2025-06-10 06:22:21');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116212300', '2025-06-10 06:22:25');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116213355', '2025-06-10 06:22:29');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116213934', '2025-06-10 06:22:32');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116214523', '2025-06-10 06:22:36');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211122062447', '2025-06-10 06:22:40');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211124070109', '2025-06-10 06:22:43');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211202204204', '2025-06-10 06:22:46');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211202204605', '2025-06-10 06:22:50');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211210212804', '2025-06-10 06:23:00');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211228014915', '2025-06-10 06:23:04');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220107221237', '2025-06-10 06:23:07');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220228202821', '2025-06-10 06:23:10');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220312004840', '2025-06-10 06:23:14');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220603231003', '2025-06-10 06:23:19');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220603232444', '2025-06-10 06:23:22');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220615214548', '2025-06-10 06:23:26');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220712093339', '2025-06-10 06:23:30');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220908172859', '2025-06-10 06:23:33');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220916233421', '2025-06-10 06:23:36');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230119133233', '2025-06-10 06:23:40');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230128025114', '2025-06-10 06:23:44');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230128025212', '2025-06-10 06:23:48');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230227211149', '2025-06-10 06:23:51');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230228184745', '2025-06-10 06:23:54');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230308225145', '2025-06-10 06:23:58');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230328144023', '2025-06-10 06:24:01');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231018144023', '2025-06-10 06:24:05');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144023', '2025-06-10 06:24:10');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144024', '2025-06-10 06:24:14');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144025', '2025-06-10 06:24:17');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240108234812', '2025-06-10 06:24:20');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240109165339', '2025-06-10 06:24:24');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240227174441', '2025-06-10 06:24:29');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240311171622', '2025-06-10 06:24:34');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240321100241', '2025-06-10 06:24:41');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240401105812', '2025-06-10 06:24:51');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240418121054', '2025-06-10 06:24:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240523004032', '2025-06-10 06:25:07');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240618124746', '2025-06-10 06:25:11');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240801235015', '2025-06-10 06:25:14');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240805133720', '2025-06-10 06:25:17');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240827160934', '2025-06-10 06:25:21');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240919163303', '2025-06-10 06:25:25');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240919163305', '2025-06-10 06:25:29');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241019105805', '2025-06-10 06:25:32');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241030150047', '2025-06-10 06:25:44');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241108114728', '2025-06-10 06:25:49');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241121104152', '2025-06-10 06:25:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241130184212', '2025-06-10 06:25:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241220035512', '2025-06-10 06:26:00');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241220123912', '2025-06-10 06:26:03');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241224161212', '2025-06-10 06:26:06');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250107150512', '2025-06-10 06:26:10');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250110162412', '2025-06-10 06:26:13');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250123174212', '2025-06-10 06:26:16');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250128220012', '2025-06-10 06:26:20');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250506224012', '2025-06-10 06:26:22');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250523164012', '2025-06-10 06:26:26');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) VALUES ('ticket-attachments', 'ticket-attachments', NULL, '2025-06-14 15:49:43.782846+00', '2025-06-14 15:49:43.782846+00', 't', 'f', NULL, NULL, NULL);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('0', 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-06-10 06:22:03.092208');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('1', 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-06-10 06:22:03.103325');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('2', 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-06-10 06:22:03.110945');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('3', 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-06-10 06:22:03.134649');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('4', 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-06-10 06:22:03.149456');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('5', 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-06-10 06:22:03.157383');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('6', 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-06-10 06:22:03.165779');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('7', 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-06-10 06:22:03.17346');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('8', 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-06-10 06:22:03.181105');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('9', 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-06-10 06:22:03.189251');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('10', 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-06-10 06:22:03.197009');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('11', 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-06-10 06:22:03.205215');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('12', 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-06-10 06:22:03.217721');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('13', 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-06-10 06:22:03.225277');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('14', 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-06-10 06:22:03.233543');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('15', 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-06-10 06:22:03.254801');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('16', 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-06-10 06:22:03.26233');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('17', 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-06-10 06:22:03.269848');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('18', 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-06-10 06:22:03.281291');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('19', 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-06-10 06:22:03.289774');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('20', 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-06-10 06:22:03.298089');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('21', 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-06-10 06:22:03.30948');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('22', 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-06-10 06:22:03.32727');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('23', 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-06-10 06:22:03.341915');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('24', 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-06-10 06:22:03.350317');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('25', 'custom-metadata', 'd974c6057c3db1c1f847afa0e291e6165693b990', '2025-06-10 06:22:03.358577');


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

INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250613071443', '{"\n-- Criar enum para tipos de usuário\nCREATE TYPE public.user_role AS ENUM (''admin'', ''cliente'');\n\n-- Criar enum para tipos de conta\nCREATE TYPE public.account_type AS ENUM (''meta'', ''google'');\n\n-- Criar enum para status de chamados\nCREATE TYPE public.ticket_status AS ENUM (''aberto'', ''em_andamento'', ''resolvido'');\n\n-- Criar enum para status de criativos\nCREATE TYPE public.creative_status AS ENUM (''pendente'', ''aprovado'', ''reprovado'', ''ajuste_solicitado'');\n\n-- Criar enum para tipo de acesso\nCREATE TYPE public.access_type AS ENUM (''api'', ''sheet'');\n\n-- Tabela de perfis de usuário (vinculada ao auth.users do Supabase)\nCREATE TABLE public.profiles (\n    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,\n    nome TEXT NOT NULL,\n    email TEXT NOT NULL,\n    role user_role NOT NULL DEFAULT ''cliente'',\n    ativo BOOLEAN NOT NULL DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    PRIMARY KEY (id)\n);\n\n-- Tabela de clientes (para dados específicos do cliente)\nCREATE TABLE public.clientes (\n    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,\n    nome TEXT NOT NULL,\n    tipo_acesso access_type NOT NULL DEFAULT ''api'',\n    ativo BOOLEAN NOT NULL DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    UNIQUE(user_id)\n);\n\n-- Tabela de contas vinculadas aos clientes\nCREATE TABLE public.contas (\n    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,\n    tipo account_type NOT NULL,\n    identificador TEXT NOT NULL, -- ID da conta Meta/Google\n    nome TEXT NOT NULL,\n    ativo BOOLEAN NOT NULL DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    UNIQUE(cliente_id, tipo, identificador)\n);\n\n-- Tabela de chamados\nCREATE TABLE public.chamados (\n    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,\n    titulo TEXT NOT NULL,\n    mensagem TEXT NOT NULL,\n    status ticket_status NOT NULL DEFAULT ''aberto'',\n    resposta TEXT,\n    arquivo_url TEXT,\n    respondido_por UUID REFERENCES public.profiles(id),\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Tabela de criativos\nCREATE TABLE public.criativos (\n    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,\n    titulo TEXT NOT NULL,\n    descricao TEXT,\n    arquivo_url TEXT NOT NULL,\n    tipo_arquivo TEXT NOT NULL, -- image/video\n    status creative_status NOT NULL DEFAULT ''pendente'',\n    resposta TEXT,\n    comentario_cliente TEXT,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Habilitar RLS em todas as tabelas\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.contas ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.chamados ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.criativos ENABLE ROW LEVEL SECURITY;\n\n-- Função para verificar se o usuário é admin\nCREATE OR REPLACE FUNCTION public.is_admin()\nRETURNS BOOLEAN\nLANGUAGE SQL\nSTABLE\nSECURITY DEFINER\nAS $$\n  SELECT EXISTS (\n    SELECT 1 FROM public.profiles\n    WHERE id = auth.uid() AND role = ''admin''\n  );\n$$;\n\n-- Função para obter o cliente_id do usuário atual\nCREATE OR REPLACE FUNCTION public.get_user_cliente_id()\nRETURNS UUID\nLANGUAGE SQL\nSTABLE\nSECURITY DEFINER\nAS $$\n  SELECT c.id FROM public.clientes c\n  WHERE c.user_id = auth.uid();\n$$;\n\n-- Políticas RLS para profiles\nCREATE POLICY \\"Usuários podem ver seu próprio perfil\\"\n  ON public.profiles FOR SELECT\n  USING (auth.uid() = id);\n\nCREATE POLICY \\"Admins podem ver todos os perfis\\"\n  ON public.profiles FOR SELECT\n  USING (public.is_admin());\n\nCREATE POLICY \\"Usuários podem atualizar seu próprio perfil\\"\n  ON public.profiles FOR UPDATE\n  USING (auth.uid() = id);\n\nCREATE POLICY \\"Admins podem inserir perfis\\"\n  ON public.profiles FOR INSERT\n  WITH CHECK (public.is_admin());\n\nCREATE POLICY \\"Admins podem atualizar qualquer perfil\\"\n  ON public.profiles FOR UPDATE\n  USING (public.is_admin());\n\n-- Políticas RLS para clientes\nCREATE POLICY \\"Usuários podem ver seu próprio cliente\\"\n  ON public.clientes FOR SELECT\n  USING (user_id = auth.uid());\n\nCREATE POLICY \\"Admins podem ver todos os clientes\\"\n  ON public.clientes FOR SELECT\n  USING (public.is_admin());\n\nCREATE POLICY \\"Admins podem gerenciar clientes\\"\n  ON public.clientes FOR ALL\n  USING (public.is_admin());\n\n-- Políticas RLS para contas\nCREATE POLICY \\"Usuários podem ver suas próprias contas\\"\n  ON public.contas FOR SELECT\n  USING (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Admins podem ver todas as contas\\"\n  ON public.contas FOR SELECT\n  USING (public.is_admin());\n\nCREATE POLICY \\"Admins podem gerenciar contas\\"\n  ON public.contas FOR ALL\n  USING (public.is_admin());\n\n-- Políticas RLS para chamados\nCREATE POLICY \\"Usuários podem ver seus próprios chamados\\"\n  ON public.chamados FOR SELECT\n  USING (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Usuários podem criar chamados\\"\n  ON public.chamados FOR INSERT\n  WITH CHECK (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Usuários podem atualizar seus próprios chamados\\"\n  ON public.chamados FOR UPDATE\n  USING (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Admins podem ver todos os chamados\\"\n  ON public.chamados FOR SELECT\n  USING (public.is_admin());\n\nCREATE POLICY \\"Admins podem gerenciar chamados\\"\n  ON public.chamados FOR ALL\n  USING (public.is_admin());\n\n-- Políticas RLS para criativos\nCREATE POLICY \\"Usuários podem ver seus próprios criativos\\"\n  ON public.criativos FOR SELECT\n  USING (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Usuários podem atualizar seus próprios criativos\\"\n  ON public.criativos FOR UPDATE\n  USING (cliente_id = public.get_user_cliente_id());\n\nCREATE POLICY \\"Admins podem ver todos os criativos\\"\n  ON public.criativos FOR SELECT\n  USING (public.is_admin());\n\nCREATE POLICY \\"Admins podem gerenciar criativos\\"\n  ON public.criativos FOR ALL\n  USING (public.is_admin());\n\n-- Trigger para criar perfil automaticamente quando usuário se registra\nCREATE OR REPLACE FUNCTION public.handle_new_user()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nSECURITY DEFINER SET search_path = ''''\nAS $$\nBEGIN\n  INSERT INTO public.profiles (id, nome, email, role)\n  VALUES (\n    new.id,\n    COALESCE(new.raw_user_meta_data ->> ''nome'', new.email),\n    new.email,\n    COALESCE((new.raw_user_meta_data ->> ''role'')::user_role, ''cliente'')\n  );\n  RETURN new;\nEND;\n$$;\n\n-- Trigger para executar a função quando um usuário é criado\nCREATE TRIGGER on_auth_user_created\n  AFTER INSERT ON auth.users\n  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();\n\n-- Função para atualizar updated_at\nCREATE OR REPLACE FUNCTION public.update_updated_at_column()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = now();\n  RETURN NEW;\nEND;\n$$ language ''plpgsql'';\n\n-- Triggers para atualizar updated_at automaticamente\nCREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();\nCREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();\nCREATE TRIGGER update_chamados_updated_at BEFORE UPDATE ON public.chamados FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();\nCREATE TRIGGER update_criativos_updated_at BEFORE UPDATE ON public.criativos FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();\n"}', '8131066b-e700-4e37-be32-745036d7e8e6', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250613124855', '{"\n-- Primeiro, vamos corrigir as políticas RLS que estão causando os erros 406\n-- Criar políticas para a tabela profiles\nCREATE POLICY \\"Users can view their own profile\\" ON public.profiles\nFOR SELECT USING (auth.uid() = id);\n\nCREATE POLICY \\"Users can update their own profile\\" ON public.profiles\nFOR UPDATE USING (auth.uid() = id);\n\n-- Criar políticas para a tabela clientes\nCREATE POLICY \\"Admins can view all clients\\" ON public.clientes\nFOR SELECT USING (public.is_admin());\n\nCREATE POLICY \\"Users can view their own client data\\" ON public.clientes\nFOR SELECT USING (auth.uid() = user_id);\n\nCREATE POLICY \\"Admins can manage clients\\" ON public.clientes\nFOR ALL USING (public.is_admin());\n\n-- Criar políticas para chamados\nCREATE POLICY \\"Admins can view all tickets\\" ON public.chamados\nFOR SELECT USING (public.is_admin());\n\nCREATE POLICY \\"Users can view tickets from their client\\" ON public.chamados\nFOR SELECT USING (\n  cliente_id IN (\n    SELECT id FROM public.clientes WHERE user_id = auth.uid()\n  )\n);\n\nCREATE POLICY \\"Admins can manage all tickets\\" ON public.chamados\nFOR ALL USING (public.is_admin());\n\nCREATE POLICY \\"Users can create tickets for their client\\" ON public.chamados\nFOR INSERT WITH CHECK (\n  cliente_id IN (\n    SELECT id FROM public.clientes WHERE user_id = auth.uid()\n  )\n);\n\nCREATE POLICY \\"Users can update their client tickets\\" ON public.chamados\nFOR UPDATE USING (\n  cliente_id IN (\n    SELECT id FROM public.clientes WHERE user_id = auth.uid()\n  )\n);\n\n-- Criar políticas para criativos\nCREATE POLICY \\"Admins can manage all creatives\\" ON public.criativos\nFOR ALL USING (public.is_admin());\n\nCREATE POLICY \\"Users can view creatives for their client\\" ON public.criativos\nFOR SELECT USING (\n  cliente_id IN (\n    SELECT id FROM public.clientes WHERE user_id = auth.uid()\n  )\n);\n\nCREATE POLICY \\"Users can update creatives for their client\\" ON public.criativos\nFOR UPDATE USING (\n  cliente_id IN (\n    SELECT id FROM public.clientes WHERE user_id = auth.uid()\n  )\n);\n\n-- Atualizar a estrutura da tabela criativos para incluir os novos campos\nALTER TABLE public.criativos \nADD COLUMN IF NOT EXISTS campanha TEXT,\nADD COLUMN IF NOT EXISTS nome_criativo TEXT,\nADD COLUMN IF NOT EXISTS titulo_anuncio TEXT,\nADD COLUMN IF NOT EXISTS descricao_anuncio TEXT;\n\n-- Atualizar a estrutura da tabela chamados para melhor controle de status\nALTER TABLE public.chamados \nADD COLUMN IF NOT EXISTS aberto_por TEXT DEFAULT ''cliente'',\nADD COLUMN IF NOT EXISTS status_detalhado TEXT;\n\n-- Criar função para atualizar status detalhado dos chamados\nCREATE OR REPLACE FUNCTION update_ticket_detailed_status()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Definir status detalhado baseado no status e outras condições\n  IF NEW.status = ''aberto'' AND NEW.aberto_por = ''admin'' THEN\n    NEW.status_detalhado = ''Aberto pela Equipe'';\n  ELSIF NEW.status = ''aberto'' AND NEW.aberto_por = ''cliente'' THEN\n    NEW.status_detalhado = ''Aberto pelo Cliente'';\n  ELSIF NEW.status = ''em_andamento'' AND NEW.resposta IS NOT NULL AND NEW.respondido_por IS NOT NULL THEN\n    -- Verificar se quem respondeu foi admin\n    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.respondido_por AND role = ''admin'') THEN\n      NEW.status_detalhado = ''Aguardando Resposta do Cliente'';\n    ELSE\n      NEW.status_detalhado = ''Aguardando resposta da equipe'';\n    END IF;\n  ELSIF NEW.status = ''resolvido'' THEN\n    NEW.status_detalhado = ''Concluído'';\n  ELSE\n    NEW.status_detalhado = NEW.status;\n  END IF;\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Criar trigger para atualizar status detalhado\nDROP TRIGGER IF EXISTS update_ticket_status_trigger ON public.chamados;\nCREATE TRIGGER update_ticket_status_trigger\n  BEFORE INSERT OR UPDATE ON public.chamados\n  FOR EACH ROW\n  EXECUTE FUNCTION update_ticket_detailed_status();\n"}', '096449ce-64bc-435c-87de-d87a01dfbf84', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250613070518', '{"\n-- Criar tabela activity_logs para registrar ações do sistema\nCREATE TABLE public.activity_logs (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  action TEXT NOT NULL,\n  entity_type TEXT NOT NULL,\n  entity_id TEXT NOT NULL,\n  entity_name TEXT NOT NULL,\n  user_id UUID REFERENCES auth.users(id),\n  user_name TEXT NOT NULL,\n  details JSONB,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Adicionar RLS para que admins vejam todos os logs\nALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;\n\n-- Política para admins verem todos os logs\nCREATE POLICY \\"Admins can view all activity logs\\" ON public.activity_logs\nFOR SELECT USING (public.is_admin());\n\n-- Política para permitir inserção de logs pelo sistema\nCREATE POLICY \\"System can insert activity logs\\" ON public.activity_logs\nFOR INSERT WITH CHECK (true);\n\n-- Criar índices para performance\nCREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);\nCREATE INDEX idx_activity_logs_entity_type ON public.activity_logs(entity_type);\nCREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);\n"}', '9cb15cc5-b5bc-442e-9ee5-fa29566dac42', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250613081728', '{"\n-- Melhorar tabela de clientes com campos obrigatórios\nALTER TABLE public.clientes \nADD COLUMN IF NOT EXISTS email TEXT,\nADD COLUMN IF NOT EXISTS telefone TEXT,\nADD COLUMN IF NOT EXISTS empresa TEXT,\nADD COLUMN IF NOT EXISTS observacoes_internas TEXT,\nADD COLUMN IF NOT EXISTS responsavel_conta UUID REFERENCES public.profiles(id),\nADD COLUMN IF NOT EXISTS contas_meta TEXT[]; -- Array de IDs das contas Meta vinculadas\n\n-- Criar tabela para histórico/timeline dos chamados\nCREATE TABLE IF NOT EXISTS public.chamados_historico (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  chamado_id UUID NOT NULL REFERENCES public.chamados(id) ON DELETE CASCADE,\n  acao TEXT NOT NULL, -- ''criado'', ''respondido'', ''status_alterado'', ''arquivo_anexado''\n  usuario_id UUID REFERENCES public.profiles(id),\n  usuario_nome TEXT NOT NULL,\n  detalhes TEXT,\n  data_acao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Habilitar RLS na tabela de histórico\nALTER TABLE public.chamados_historico ENABLE ROW LEVEL SECURITY;\n\n-- Políticas para histórico de chamados\nCREATE POLICY \\"Users can view chamados_historico based on access\\" ON public.chamados_historico\n  FOR SELECT USING (\n    CASE \n      WHEN (SELECT role FROM public.profiles WHERE id = auth.uid()) = ''admin'' THEN true\n      ELSE chamado_id IN (\n        SELECT id FROM public.chamados \n        WHERE cliente_id = (SELECT get_user_cliente_id())\n      )\n    END\n  );\n\nCREATE POLICY \\"Only authenticated users can insert historico\\" ON public.chamados_historico\n  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);\n\n-- Trigger para criar histórico automaticamente quando chamado é criado\nCREATE OR REPLACE FUNCTION public.create_chamado_historico()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Inserir histórico quando chamado é criado\n  IF TG_OP = ''INSERT'' THEN\n    INSERT INTO public.chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)\n    VALUES (\n      NEW.id, \n      ''criado'', \n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''Chamado criado: '' || NEW.titulo\n    );\n    RETURN NEW;\n  END IF;\n  \n  -- Inserir histórico quando status muda\n  IF TG_OP = ''UPDATE'' AND OLD.status != NEW.status THEN\n    INSERT INTO public.chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)\n    VALUES (\n      NEW.id, \n      ''status_alterado'', \n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''Status alterado de \\"'' || OLD.status || ''\\" para \\"'' || NEW.status || ''\\"''\n    );\n  END IF;\n  \n  -- Inserir histórico quando resposta é adicionada\n  IF TG_OP = ''UPDATE'' AND (OLD.resposta IS NULL OR OLD.resposta = '''') AND NEW.resposta IS NOT NULL AND NEW.resposta != '''' THEN\n    INSERT INTO public.chamados_historico (chamado_id, acao, usuario_id, usuario_nome, detalhes)\n    VALUES (\n      NEW.id, \n      ''respondido'', \n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''Nova resposta adicionada''\n    );\n  END IF;\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Criar trigger\nDROP TRIGGER IF EXISTS chamado_historico_trigger ON public.chamados;\nCREATE TRIGGER chamado_historico_trigger\n  AFTER INSERT OR UPDATE ON public.chamados\n  FOR EACH ROW EXECUTE FUNCTION public.create_chamado_historico();\n\n-- Melhorar estrutura de logs de atividade\nCREATE TABLE IF NOT EXISTS public.system_activity_logs (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  usuario_id UUID REFERENCES public.profiles(id),\n  usuario_nome TEXT NOT NULL,\n  acao TEXT NOT NULL, -- ''login'', ''api_call'', ''filter_change'', ''export'', etc\n  modulo TEXT NOT NULL, -- ''campanhas'', ''adsets'', ''chamados'', ''clientes'', etc\n  detalhes JSONB,\n  ip_address INET,\n  user_agent TEXT,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- RLS para logs do sistema\nALTER TABLE public.system_activity_logs ENABLE ROW LEVEL SECURITY;\n\n-- Admins podem ver todos os logs, usuários comuns apenas os próprios\nCREATE POLICY \\"Admins can view all logs, users only their own\\" ON public.system_activity_logs\n  FOR SELECT USING (\n    (SELECT role FROM public.profiles WHERE id = auth.uid()) = ''admin'' \n    OR usuario_id = auth.uid()\n  );\n\nCREATE POLICY \\"All authenticated users can insert logs\\" ON public.system_activity_logs\n  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);\n\n-- Função para registrar atividade no sistema\nCREATE OR REPLACE FUNCTION public.log_system_activity(\n  p_acao TEXT,\n  p_modulo TEXT,\n  p_detalhes JSONB DEFAULT NULL,\n  p_ip_address INET DEFAULT NULL,\n  p_user_agent TEXT DEFAULT NULL\n)\nRETURNS UUID AS $$\nDECLARE\n  log_id UUID;\nBEGIN\n  INSERT INTO public.system_activity_logs (\n    usuario_id, \n    usuario_nome, \n    acao, \n    modulo, \n    detalhes, \n    ip_address, \n    user_agent\n  ) VALUES (\n    auth.uid(),\n    COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n    p_acao,\n    p_modulo,\n    p_detalhes,\n    p_ip_address,\n    p_user_agent\n  ) RETURNING id INTO log_id;\n  \n  RETURN log_id;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER;\n"}', 'd0f77029-c2dd-4eac-a645-509965ade5c5', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250614034943', '{"\n-- Adicionar novas colunas à tabela chamados\nALTER TABLE chamados \nADD COLUMN IF NOT EXISTS categoria text DEFAULT ''outros'',\nADD COLUMN IF NOT EXISTS prioridade text DEFAULT ''media'',\nADD COLUMN IF NOT EXISTS nota_interna text,\nADD COLUMN IF NOT EXISTS tempo_resposta_horas integer;\n\n-- Criar tabela para anexos de chamados\nCREATE TABLE IF NOT EXISTS chamados_anexos (\n  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n  chamado_id uuid REFERENCES chamados(id) ON DELETE CASCADE,\n  nome_arquivo text NOT NULL,\n  url_arquivo text NOT NULL,\n  tipo_arquivo text NOT NULL,\n  tamanho_arquivo bigint,\n  created_at timestamp with time zone DEFAULT now(),\n  uploaded_by uuid REFERENCES auth.users(id)\n);\n\n-- Criar tabela para timeline de conversas\nCREATE TABLE IF NOT EXISTS chamados_timeline (\n  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n  chamado_id uuid REFERENCES chamados(id) ON DELETE CASCADE,\n  tipo text NOT NULL DEFAULT ''mensagem'', -- mensagem, status_change, note\n  conteudo text,\n  autor_id uuid REFERENCES auth.users(id),\n  autor_nome text NOT NULL,\n  autor_tipo text NOT NULL DEFAULT ''cliente'', -- cliente, admin, sistema\n  created_at timestamp with time zone DEFAULT now(),\n  metadata jsonb DEFAULT ''{}''::jsonb\n);\n\n-- Habilitar RLS nas novas tabelas\nALTER TABLE chamados_anexos ENABLE ROW LEVEL SECURITY;\nALTER TABLE chamados_timeline ENABLE ROW LEVEL SECURITY;\n\n-- Políticas RLS para anexos\nCREATE POLICY \\"Visualizar anexos próprios\\" ON chamados_anexos\n  FOR SELECT USING (\n    EXISTS (\n      SELECT 1 FROM chamados c \n      WHERE c.id = chamado_id \n      AND (c.cliente_id = (SELECT get_user_cliente_id()) OR is_admin())\n    )\n  );\n\nCREATE POLICY \\"Inserir anexos próprios\\" ON chamados_anexos\n  FOR INSERT WITH CHECK (\n    EXISTS (\n      SELECT 1 FROM chamados c \n      WHERE c.id = chamado_id \n      AND (c.cliente_id = (SELECT get_user_cliente_id()) OR is_admin())\n    )\n  );\n\n-- Políticas RLS para timeline\nCREATE POLICY \\"Visualizar timeline própria\\" ON chamados_timeline\n  FOR SELECT USING (\n    EXISTS (\n      SELECT 1 FROM chamados c \n      WHERE c.id = chamado_id \n      AND (c.cliente_id = (SELECT get_user_cliente_id()) OR is_admin())\n    )\n  );\n\nCREATE POLICY \\"Inserir timeline própria\\" ON chamados_timeline\n  FOR INSERT WITH CHECK (\n    EXISTS (\n      SELECT 1 FROM chamados c \n      WHERE c.id = chamado_id \n      AND (c.cliente_id = (SELECT get_user_cliente_id()) OR is_admin())\n    )\n  );\n\n-- Trigger para criar entrada na timeline quando chamado é criado\nCREATE OR REPLACE FUNCTION create_ticket_timeline_entry()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Entrada para criação do chamado\n  IF TG_OP = ''INSERT'' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id, \n      tipo, \n      conteudo, \n      autor_id, \n      autor_nome, \n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''criacao'',\n      NEW.mensagem,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      NEW.aberto_por,\n      jsonb_build_object(''titulo'', NEW.titulo, ''categoria'', NEW.categoria, ''prioridade'', NEW.prioridade)\n    );\n  END IF;\n\n  -- Entrada para mudança de status\n  IF TG_OP = ''UPDATE'' AND OLD.status != NEW.status THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''status_change'',\n      ''Status alterado de \\"'' || OLD.status || ''\\" para \\"'' || NEW.status || ''\\"'',\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END,\n      jsonb_build_object(''status_anterior'', OLD.status, ''status_novo'', NEW.status)\n    );\n  END IF;\n\n  -- Entrada para nova resposta\n  IF TG_OP = ''UPDATE'' AND (OLD.resposta IS NULL OR OLD.resposta = '''') AND NEW.resposta IS NOT NULL AND NEW.resposta != '''' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo\n    ) VALUES (\n      NEW.id,\n      ''resposta'',\n      NEW.resposta,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END\n    );\n  END IF;\n\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Aplicar trigger\nDROP TRIGGER IF EXISTS ticket_timeline_trigger ON chamados;\nCREATE TRIGGER ticket_timeline_trigger\n  AFTER INSERT OR UPDATE ON chamados\n  FOR EACH ROW\n  EXECUTE FUNCTION create_ticket_timeline_entry();\n\n-- Criar storage bucket para anexos se não existir\nINSERT INTO storage.buckets (id, name, public) \nVALUES (''ticket-attachments'', ''ticket-attachments'', true)\nON CONFLICT (id) DO NOTHING;\n"}', 'c3750da7-f88d-423c-a5d5-a0d8f90d8a3a', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250614104119', '{"\n-- Atualizar o enum de status dos chamados\nALTER TYPE ticket_status RENAME TO ticket_status_old;\n\nCREATE TYPE ticket_status AS ENUM (''novo'', ''aguardando_equipe'', ''aguardando_cliente'', ''em_analise'', ''em_andamento'', ''resolvido'');\n\n-- Atualizar a coluna status na tabela chamados\nALTER TABLE chamados ALTER COLUMN status DROP DEFAULT;\nALTER TABLE chamados ALTER COLUMN status TYPE ticket_status USING \n  CASE \n    WHEN status::text = ''aberto'' THEN ''novo''::ticket_status\n    WHEN status::text = ''em_andamento'' THEN ''em_andamento''::ticket_status\n    WHEN status::text = ''resolvido'' THEN ''resolvido''::ticket_status\n    ELSE ''novo''::ticket_status\n  END;\nALTER TABLE chamados ALTER COLUMN status SET DEFAULT ''novo''::ticket_status;\n\n-- Remover o tipo antigo\nDROP TYPE ticket_status_old;\n\n-- Criar tabela para mensagens do timeline (separada das mensagens iniciais)\nCREATE TABLE IF NOT EXISTS public.chamados_mensagens (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  chamado_id UUID NOT NULL,\n  conteudo TEXT NOT NULL,\n  arquivo_url TEXT,\n  autor_id UUID,\n  autor_nome TEXT NOT NULL,\n  autor_tipo TEXT NOT NULL DEFAULT ''cliente'' CHECK (autor_tipo IN (''cliente'', ''admin'', ''sistema'')),\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n  metadata JSONB DEFAULT ''{}''::jsonb\n);\n\n-- Atualizar a função de trigger para os novos status\nCREATE OR REPLACE FUNCTION public.update_ticket_status_on_message()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  -- Se é uma mensagem de cliente, alterar status para ''aguardando_equipe''\n  IF NEW.autor_tipo = ''cliente'' THEN\n    UPDATE chamados \n    SET status = ''aguardando_equipe''::ticket_status, updated_at = now()\n    WHERE id = NEW.chamado_id;\n  END IF;\n  \n  RETURN NEW;\nEND;\n$$;\n\n-- Criar trigger para atualizar status quando cliente responde\nCREATE TRIGGER trigger_update_status_on_client_message\n  AFTER INSERT ON chamados_mensagens\n  FOR EACH ROW\n  EXECUTE FUNCTION update_ticket_status_on_message();\n\n-- Atualizar a função create_ticket_timeline_entry para incluir mensagens\nCREATE OR REPLACE FUNCTION public.create_ticket_timeline_entry()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  -- Entrada para criação do chamado\n  IF TG_OP = ''INSERT'' AND TG_TABLE_NAME = ''chamados'' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id, \n      tipo, \n      conteudo, \n      autor_id, \n      autor_nome, \n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''criacao'',\n      NEW.mensagem,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      NEW.aberto_por,\n      jsonb_build_object(''titulo'', NEW.titulo, ''categoria'', NEW.categoria, ''prioridade'', NEW.prioridade)\n    );\n  END IF;\n\n  -- Entrada para nova mensagem\n  IF TG_OP = ''INSERT'' AND TG_TABLE_NAME = ''chamados_mensagens'' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.chamado_id,\n      ''mensagem'',\n      NEW.conteudo,\n      NEW.autor_id,\n      NEW.autor_nome,\n      NEW.autor_tipo,\n      NEW.metadata\n    );\n  END IF;\n\n  -- Entrada para mudança de status\n  IF TG_OP = ''UPDATE'' AND TG_TABLE_NAME = ''chamados'' AND OLD.status != NEW.status THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''status_change'',\n      ''Status alterado de \\"'' || OLD.status || ''\\" para \\"'' || NEW.status || ''\\"'',\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END,\n      jsonb_build_object(''status_anterior'', OLD.status, ''status_novo'', NEW.status)\n    );\n  END IF;\n\n  -- Entrada para nova resposta (campo resposta)\n  IF TG_OP = ''UPDATE'' AND TG_TABLE_NAME = ''chamados'' AND (OLD.resposta IS NULL OR OLD.resposta = '''') AND NEW.resposta IS NOT NULL AND NEW.resposta != '''' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo\n    ) VALUES (\n      NEW.id,\n      ''resposta'',\n      NEW.resposta,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END\n    );\n  END IF;\n\n  RETURN NEW;\nEND;\n$$;\n\n-- Criar trigger para mensagens\nCREATE TRIGGER trigger_timeline_entry_mensagens\n  AFTER INSERT ON chamados_mensagens\n  FOR EACH ROW\n  EXECUTE FUNCTION create_ticket_timeline_entry();\n\n-- Atualizar chamados existentes com status ''aberto'' para ''novo''\nUPDATE chamados SET status = ''novo''::ticket_status WHERE status::text = ''aberto'';\n"}', '176e0d70-2d98-47b5-adff-d5a754a2f47a', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250614113715', '{"\n-- Primeiro, remover o default da coluna\nALTER TABLE chamados ALTER COLUMN status DROP DEFAULT;\n\n-- Atualizar todos os chamados com status antigos para os novos status\nUPDATE chamados \nSET status = ''novo''::ticket_status \nWHERE status::text = ''aberto'';\n\nUPDATE chamados \nSET status = ''aguardando_equipe''::ticket_status \nWHERE status::text = ''respondido'';\n\n-- Criar o novo enum com os status corretos\nDROP TYPE IF EXISTS ticket_status_new CASCADE;\nCREATE TYPE ticket_status_new AS ENUM (''novo'', ''aguardando_equipe'', ''aguardando_cliente'', ''em_analise'', ''em_andamento'', ''resolvido'');\n\n-- Atualizar a coluna para usar o novo enum\nALTER TABLE chamados ALTER COLUMN status TYPE ticket_status_new USING \n  CASE \n    WHEN status::text = ''novo'' THEN ''novo''::ticket_status_new\n    WHEN status::text = ''aguardando_equipe'' THEN ''aguardando_equipe''::ticket_status_new\n    WHEN status::text = ''aguardando_cliente'' THEN ''aguardando_cliente''::ticket_status_new\n    WHEN status::text = ''em_analise'' THEN ''em_analise''::ticket_status_new\n    WHEN status::text = ''em_andamento'' THEN ''em_andamento''::ticket_status_new\n    WHEN status::text = ''resolvido'' THEN ''resolvido''::ticket_status_new\n    ELSE ''novo''::ticket_status_new\n  END;\n\n-- Remover o enum antigo e renomear o novo\nDROP TYPE ticket_status;\nALTER TYPE ticket_status_new RENAME TO ticket_status;\n\n-- Definir o novo valor padrão\nALTER TABLE chamados ALTER COLUMN status SET DEFAULT ''novo''::ticket_status;\n"}', '5f705efc-3d21-480f-be46-be3fcf4d1e1b', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250615024415', '{"\n-- Tabela para armazenar configurações do WhatsApp Business API\nCREATE TABLE whatsapp_config (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  phone_number_id TEXT NOT NULL,\n  access_token TEXT NOT NULL,\n  business_account_id TEXT,\n  webhook_verify_token TEXT,\n  status TEXT DEFAULT ''disconnected'' CHECK (status IN (''connected'', ''disconnected'', ''error'')),\n  last_verified_at TIMESTAMPTZ,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Tabela para templates de mensagem aprovados\nCREATE TABLE whatsapp_templates (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL,\n  language TEXT NOT NULL DEFAULT ''pt_BR'',\n  category TEXT NOT NULL CHECK (category IN (''MARKETING'', ''UTILITY'', ''AUTHENTICATION'')),\n  status TEXT NOT NULL CHECK (status IN (''APPROVED'', ''PENDING'', ''REJECTED'')),\n  header_type TEXT CHECK (header_type IN (''TEXT'', ''IMAGE'', ''VIDEO'', ''DOCUMENT'')),\n  header_text TEXT,\n  body_text TEXT NOT NULL,\n  footer_text TEXT,\n  variables JSONB DEFAULT ''[]''::jsonb,\n  components JSONB NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Tabela para contatos/clientes\nCREATE TABLE whatsapp_contacts (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL,\n  phone_number TEXT NOT NULL,\n  client_id UUID REFERENCES clientes(id) ON DELETE SET NULL,\n  tags TEXT[] DEFAULT ''{}'',\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Tabela para campanhas automatizadas\nCREATE TABLE whatsapp_campaigns (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL,\n  type TEXT NOT NULL CHECK (type IN (''relatorio'', ''financeiro'', ''promocional'', ''suporte'')),\n  template_id UUID REFERENCES whatsapp_templates(id) ON DELETE CASCADE,\n  meta_account_id TEXT,\n  frequency TEXT NOT NULL CHECK (frequency IN (''diario'', ''semanal'', ''mensal'')),\n  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = domingo\n  send_time TIME NOT NULL,\n  data_period_days INTEGER DEFAULT 7,\n  is_active BOOLEAN DEFAULT true,\n  contacts UUID[] DEFAULT ''{}'',\n  variables_mapping JSONB DEFAULT ''{}''::jsonb,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Tabela para histórico de envios\nCREATE TABLE whatsapp_messages (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  campaign_id UUID REFERENCES whatsapp_campaigns(id) ON DELETE SET NULL,\n  template_id UUID REFERENCES whatsapp_templates(id) ON DELETE SET NULL,\n  contact_id UUID REFERENCES whatsapp_contacts(id) ON DELETE CASCADE,\n  phone_number TEXT NOT NULL,\n  message_type TEXT NOT NULL CHECK (message_type IN (''template'', ''text'')),\n  template_name TEXT,\n  template_variables JSONB DEFAULT ''{}''::jsonb,\n  message_content TEXT,\n  whatsapp_message_id TEXT,\n  status TEXT NOT NULL DEFAULT ''pending'' CHECK (status IN (''pending'', ''sent'', ''delivered'', ''read'', ''failed'')),\n  error_message TEXT,\n  sent_at TIMESTAMPTZ,\n  delivered_at TIMESTAMPTZ,\n  read_at TIMESTAMPTZ,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Índices para performance\nCREATE INDEX idx_whatsapp_messages_status ON whatsapp_messages(status);\nCREATE INDEX idx_whatsapp_messages_sent_at ON whatsapp_messages(sent_at);\nCREATE INDEX idx_whatsapp_messages_campaign_id ON whatsapp_messages(campaign_id);\nCREATE INDEX idx_whatsapp_contacts_phone ON whatsapp_contacts(phone_number);\nCREATE INDEX idx_whatsapp_campaigns_active ON whatsapp_campaigns(is_active);\n\n-- Trigger para updated_at\nCREATE TRIGGER update_whatsapp_config_updated_at\n  BEFORE UPDATE ON whatsapp_config\n  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();\n\nCREATE TRIGGER update_whatsapp_templates_updated_at\n  BEFORE UPDATE ON whatsapp_templates\n  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();\n\nCREATE TRIGGER update_whatsapp_contacts_updated_at\n  BEFORE UPDATE ON whatsapp_contacts\n  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();\n\nCREATE TRIGGER update_whatsapp_campaigns_updated_at\n  BEFORE UPDATE ON whatsapp_campaigns\n  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();\n\n-- RLS (Row Level Security)\nALTER TABLE whatsapp_config ENABLE ROW LEVEL SECURITY;\nALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;\nALTER TABLE whatsapp_contacts ENABLE ROW LEVEL SECURITY;\nALTER TABLE whatsapp_campaigns ENABLE ROW LEVEL SECURITY;\nALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;\n\n-- Políticas RLS (apenas admins podem acessar)\nCREATE POLICY \\"Admins can access whatsapp_config\\" ON whatsapp_config\n  FOR ALL USING (is_admin());\n\nCREATE POLICY \\"Admins can access whatsapp_templates\\" ON whatsapp_templates\n  FOR ALL USING (is_admin());\n\nCREATE POLICY \\"Admins can access whatsapp_contacts\\" ON whatsapp_contacts\n  FOR ALL USING (is_admin());\n\nCREATE POLICY \\"Admins can access whatsapp_campaigns\\" ON whatsapp_campaigns\n  FOR ALL USING (is_admin());\n\nCREATE POLICY \\"Admins can access whatsapp_messages\\" ON whatsapp_messages\n  FOR ALL USING (is_admin());\n"}', '272c2790-d849-4c4e-83c3-63e9bb3bb8a3', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250615061735', '{"\n-- Adicionar colunas que faltam na tabela whatsapp_contacts para suporte a tags e agrupamento\nALTER TABLE whatsapp_contacts \nADD COLUMN IF NOT EXISTS meta_account_id TEXT,\nADD COLUMN IF NOT EXISTS grupo TEXT,\nADD COLUMN IF NOT EXISTS observacoes TEXT;\n\n-- Criar tabela para logs de mensagens WhatsApp\nCREATE TABLE IF NOT EXISTS whatsapp_message_logs (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  message_id UUID REFERENCES whatsapp_messages(id) ON DELETE CASCADE,\n  status TEXT NOT NULL DEFAULT ''sent'',\n  whatsapp_message_id TEXT,\n  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  error_details JSONB,\n  webhook_data JSONB,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Criar tabela para execução de campanhas automatizadas\nCREATE TABLE IF NOT EXISTS whatsapp_campaign_executions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  campaign_id UUID REFERENCES whatsapp_campaigns(id) ON DELETE CASCADE,\n  execution_date TIMESTAMP WITH TIME ZONE NOT NULL,\n  status TEXT NOT NULL DEFAULT ''pending'',\n  messages_sent INTEGER DEFAULT 0,\n  messages_delivered INTEGER DEFAULT 0,\n  messages_failed INTEGER DEFAULT 0,\n  execution_details JSONB,\n  error_message TEXT,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  completed_at TIMESTAMP WITH TIME ZONE\n);\n\n-- Adicionar índices para performance\nCREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_tags ON whatsapp_contacts USING GIN(tags);\nCREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_client_id ON whatsapp_contacts(client_id);\nCREATE INDEX IF NOT EXISTS idx_whatsapp_messages_status ON whatsapp_messages(status);\nCREATE INDEX IF NOT EXISTS idx_whatsapp_messages_phone ON whatsapp_messages(phone_number);\nCREATE INDEX IF NOT EXISTS idx_whatsapp_campaign_executions_campaign ON whatsapp_campaign_executions(campaign_id);\nCREATE INDEX IF NOT EXISTS idx_whatsapp_campaign_executions_date ON whatsapp_campaign_executions(execution_date);\n\n-- Habilitar RLS nas novas tabelas\nALTER TABLE whatsapp_message_logs ENABLE ROW LEVEL SECURITY;\nALTER TABLE whatsapp_campaign_executions ENABLE ROW LEVEL SECURITY;\n\n-- Criar políticas RLS básicas (assumindo que será usado por admins)\nCREATE POLICY \\"Allow all access to whatsapp_message_logs\\" ON whatsapp_message_logs FOR ALL USING (true);\nCREATE POLICY \\"Allow all access to whatsapp_campaign_executions\\" ON whatsapp_campaign_executions FOR ALL USING (true);\n\n-- Atualizar a tabela whatsapp_campaigns para incluir timezone\nALTER TABLE whatsapp_campaigns \nADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT ''America/Sao_Paulo'',\nADD COLUMN IF NOT EXISTS next_execution TIMESTAMP WITH TIME ZONE,\nADD COLUMN IF NOT EXISTS last_execution TIMESTAMP WITH TIME ZONE;\n"}', 'e98ebf9f-6e85-4c92-8200-8e3eb181deb4', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250615070512', '{"\n-- Habilita RLS e cria políticas para as tabelas do WhatsApp e outras tabelas essenciais.\n-- Isso garante que usuários autenticados possam acessar e modificar os dados conforme as regras.\n\n-- Tabela: whatsapp_config\nALTER TABLE public.whatsapp_config ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Allow all access for authenticated users\\" ON public.whatsapp_config;\nCREATE POLICY \\"Allow all access for authenticated users\\"\nON public.whatsapp_config FOR ALL\nUSING (auth.role() = ''authenticated'')\nWITH CHECK (auth.role() = ''authenticated'');\n\n-- Tabela: whatsapp_templates\nALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Allow all access for authenticated users\\" ON public.whatsapp_templates;\nCREATE POLICY \\"Allow all access for authenticated users\\"\nON public.whatsapp_templates FOR ALL\nUSING (auth.role() = ''authenticated'')\nWITH CHECK (auth.role() = ''authenticated'');\n\n-- Tabela: whatsapp_contacts\nALTER TABLE public.whatsapp_contacts ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Allow all access for authenticated users\\" ON public.whatsapp_contacts;\nCREATE POLICY \\"Allow all access for authenticated users\\"\nON public.whatsapp_contacts FOR ALL\nUSING (auth.role() = ''authenticated'')\nWITH CHECK (auth.role() = ''authenticated'');\n\n-- Tabela: whatsapp_messages\nALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Allow all access for authenticated users\\" ON public.whatsapp_messages;\nCREATE POLICY \\"Allow all access for authenticated users\\"\nON public.whatsapp_messages FOR ALL\nUSING (auth.role() = ''authenticated'')\nWITH CHECK (auth.role() = ''authenticated'');\n\n-- Tabela: whatsapp_campaigns\nALTER TABLE public.whatsapp_campaigns ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Allow all access for authenticated users\\" ON public.whatsapp_campaigns;\nCREATE POLICY \\"Allow all access for authenticated users\\"\nON public.whatsapp_campaigns FOR ALL\nUSING (auth.role() = ''authenticated'')\nWITH CHECK (auth.role() = ''authenticated'');\n\n-- Tabela: profiles\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Users can view their own profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Admins can view all profiles\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Users can update their own profile\\" ON public.profiles;\nCREATE POLICY \\"Users can view their own profile\\"\nON public.profiles FOR SELECT USING (auth.uid() = id);\nCREATE POLICY \\"Admins can view all profiles\\"\nON public.profiles FOR SELECT USING (public.is_admin());\nCREATE POLICY \\"Users can update their own profile\\"\nON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);\n\n-- Tabela: clientes\nALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS \\"Clients can manage their own data\\" ON public.clientes;\nDROP POLICY IF EXISTS \\"Admins can manage all clients\\" ON public.clientes;\nCREATE POLICY \\"Clients can manage their own data\\"\nON public.clientes FOR ALL USING (auth.uid() = user_id)\nWITH CHECK (auth.uid() = user_id);\nCREATE POLICY \\"Admins can manage all clients\\"\nON public.clientes FOR ALL USING (public.is_admin())\nWITH CHECK (public.is_admin());\n"}', 'cbc5dc16-3363-4d32-ae85-ca9f37bbbf30', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250615115327', '{"\n-- Criar tabela de projetos para organizar tarefas\nCREATE TABLE public.projetos (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  nome TEXT NOT NULL,\n  descricao TEXT,\n  cliente_id UUID REFERENCES public.clientes(id),\n  cor TEXT DEFAULT ''#3b82f6'',\n  ativo BOOLEAN NOT NULL DEFAULT true,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Criar enum para tipos de tarefa\nCREATE TYPE task_type AS ENUM (''desenvolvimento'', ''design'', ''marketing'', ''suporte'', ''revisao'', ''outros'');\n\n-- Criar enum para prioridades\nCREATE TYPE task_priority AS ENUM (''baixa'', ''media'', ''alta'', ''urgente'');\n\n-- Criar enum para status das tarefas\nCREATE TYPE task_status AS ENUM (''backlog'', ''execucao'', ''revisao'', ''aguardando'', ''finalizada'', ''cancelada'');\n\n-- Criar tabela de templates de tarefa\nCREATE TABLE public.task_templates (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  nome TEXT NOT NULL,\n  descricao TEXT,\n  tipo task_type NOT NULL DEFAULT ''outros'',\n  prioridade task_priority NOT NULL DEFAULT ''media'',\n  fases_padrao JSONB DEFAULT ''[\\"backlog\\", \\"execucao\\", \\"revisao\\", \\"finalizada\\"]'',\n  tempo_estimado INTEGER, -- em horas\n  tags TEXT[] DEFAULT ''{}'',\n  ativo BOOLEAN NOT NULL DEFAULT true,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Criar tabela principal de tarefas\nCREATE TABLE public.tarefas (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  titulo TEXT NOT NULL,\n  descricao TEXT,\n  tipo task_type NOT NULL DEFAULT ''outros'',\n  prioridade task_priority NOT NULL DEFAULT ''media'',\n  status task_status NOT NULL DEFAULT ''backlog'',\n  projeto_id UUID REFERENCES public.projetos(id),\n  template_id UUID REFERENCES public.task_templates(id),\n  \n  -- Integrações\n  chamado_id UUID REFERENCES public.chamados(id),\n  criativo_id UUID REFERENCES public.criativos(id),\n  cliente_id UUID REFERENCES public.clientes(id),\n  \n  -- Atribuições\n  criado_por UUID REFERENCES public.profiles(id),\n  responsavel_id UUID REFERENCES public.profiles(id),\n  aprovador_id UUID REFERENCES public.profiles(id),\n  \n  -- Tempo e cronometragem\n  tempo_estimado INTEGER, -- em horas\n  tempo_gasto INTEGER DEFAULT 0, -- em minutos\n  data_inicio TIMESTAMP WITH TIME ZONE,\n  data_prazo TIMESTAMP WITH TIME ZONE,\n  data_conclusao TIMESTAMP WITH TIME ZONE,\n  \n  -- Metadados\n  tags TEXT[] DEFAULT ''{}'',\n  arquivos_urls TEXT[] DEFAULT ''{}'',\n  observacoes TEXT,\n  motivo_status TEXT, -- para quando status = ''aguardando''\n  resumo_conclusao TEXT, -- obrigatório quando finalizar\n  \n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Criar tabela de fases customizáveis\nCREATE TABLE public.task_fases (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  nome TEXT NOT NULL,\n  cor TEXT DEFAULT ''#6b7280'',\n  ordem INTEGER NOT NULL,\n  projeto_id UUID REFERENCES public.projetos(id),\n  template_id UUID REFERENCES public.task_templates(id),\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n  \n  UNIQUE(nome, projeto_id),\n  UNIQUE(nome, template_id)\n);\n\n-- Criar tabela de cronometragem detalhada\nCREATE TABLE public.task_time_logs (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  tarefa_id UUID NOT NULL REFERENCES public.tarefas(id) ON DELETE CASCADE,\n  usuario_id UUID NOT NULL REFERENCES public.profiles(id),\n  fase TEXT NOT NULL,\n  tempo_minutos INTEGER NOT NULL,\n  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,\n  data_fim TIMESTAMP WITH TIME ZONE,\n  descricao TEXT,\n  ativo BOOLEAN DEFAULT true, -- para pausar/retomar\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Criar tabela de comentários/atividades nas tarefas\nCREATE TABLE public.task_activities (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  tarefa_id UUID NOT NULL REFERENCES public.tarefas(id) ON DELETE CASCADE,\n  usuario_id UUID REFERENCES public.profiles(id),\n  usuario_nome TEXT NOT NULL,\n  tipo TEXT NOT NULL DEFAULT ''comentario'', -- comentario, status_change, assignment, etc\n  conteudo TEXT,\n  status_anterior task_status,\n  status_novo task_status,\n  metadata JSONB DEFAULT ''{}'',\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n);\n\n-- Habilitar RLS para todas as tabelas\nALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.task_fases ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.task_time_logs ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.task_activities ENABLE ROW LEVEL SECURITY;\n\n-- Políticas para projetos\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.projetos FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Políticas para templates\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.task_templates FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Políticas para tarefas\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.tarefas FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Políticas para fases\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.task_fases FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Políticas para time logs\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.task_time_logs FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Políticas para atividades\nCREATE POLICY \\"Allow all access for authenticated users\\" ON public.task_activities FOR ALL\nUSING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');\n\n-- Triggers para updated_at\nCREATE TRIGGER update_projetos_updated_at BEFORE UPDATE ON public.projetos\nFOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();\n\nCREATE TRIGGER update_tarefas_updated_at BEFORE UPDATE ON public.tarefas\nFOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();\n\n-- Função para auto-cronometragem quando mover para execução\nCREATE OR REPLACE FUNCTION public.auto_start_task_timer()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Se mudou para execução e não tinha data_inicio, definir agora\n  IF NEW.status = ''execucao'' AND OLD.status != ''execucao'' AND NEW.data_inicio IS NULL THEN\n    NEW.data_inicio = now();\n  END IF;\n  \n  -- Se finalizou, definir data_conclusao\n  IF NEW.status = ''finalizada'' AND OLD.status != ''finalizada'' THEN\n    NEW.data_conclusao = now();\n  END IF;\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER auto_start_task_timer_trigger\nBEFORE UPDATE ON public.tarefas\nFOR EACH ROW EXECUTE FUNCTION public.auto_start_task_timer();\n\n-- Função para criar atividade quando status muda\nCREATE OR REPLACE FUNCTION public.create_task_activity()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Criar atividade para criação\n  IF TG_OP = ''INSERT'' THEN\n    INSERT INTO public.task_activities (\n      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata\n    ) VALUES (\n      NEW.id,\n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''criacao'',\n      ''Tarefa criada: '' || NEW.titulo,\n      jsonb_build_object(''prioridade'', NEW.prioridade, ''tipo'', NEW.tipo)\n    );\n    RETURN NEW;\n  END IF;\n  \n  -- Criar atividade para mudança de status\n  IF TG_OP = ''UPDATE'' AND OLD.status != NEW.status THEN\n    INSERT INTO public.task_activities (\n      tarefa_id, usuario_id, usuario_nome, tipo, conteudo,\n      status_anterior, status_novo\n    ) VALUES (\n      NEW.id,\n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''status_change'',\n      ''Status alterado de \\"'' || OLD.status || ''\\" para \\"'' || NEW.status || ''\\"'',\n      OLD.status,\n      NEW.status\n    );\n  END IF;\n  \n  -- Criar atividade para mudança de responsável\n  IF TG_OP = ''UPDATE'' AND OLD.responsavel_id != NEW.responsavel_id THEN\n    INSERT INTO public.task_activities (\n      tarefa_id, usuario_id, usuario_nome, tipo, conteudo, metadata\n    ) VALUES (\n      NEW.id,\n      auth.uid(),\n      COALESCE((SELECT nome FROM public.profiles WHERE id = auth.uid()), ''Sistema''),\n      ''assignment'',\n      ''Responsável alterado'',\n      jsonb_build_object(\n        ''responsavel_anterior'', OLD.responsavel_id,\n        ''responsavel_novo'', NEW.responsavel_id\n      )\n    );\n  END IF;\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER create_task_activity_trigger\nAFTER INSERT OR UPDATE ON public.tarefas\nFOR EACH ROW EXECUTE FUNCTION public.create_task_activity();\n"}', 'd76d4ecb-a9d4-421d-aa26-c061b70db04e', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250616103851', '{"\n-- Criar enum para tipos de permissões\nCREATE TYPE permission_type AS ENUM (\n  ''access_dashboard'',\n  ''access_whatsapp'',\n  ''create_campaigns'',\n  ''edit_campaigns'',\n  ''view_templates'',\n  ''send_messages'',\n  ''view_metrics'',\n  ''access_tasks'',\n  ''create_tasks'',\n  ''assign_tasks'',\n  ''finalize_tasks'',\n  ''edit_execution_time'',\n  ''access_calls'',\n  ''create_calls'',\n  ''finalize_calls'',\n  ''link_calls_to_tasks'',\n  ''access_creatives'',\n  ''create_edit_creatives'',\n  ''approve_creatives'',\n  ''view_change_history'',\n  ''access_paid_media'',\n  ''create_campaigns_media'',\n  ''view_metrics_media'',\n  ''access_reports'',\n  ''create_automatic_reports'',\n  ''manage_user_settings'',\n  ''manage_collaborators'',\n  ''manage_whatsapp_templates'',\n  ''manage_api_settings'',\n  ''manage_appearance_and_visual_identity'',\n  ''manage_external_integrations'',\n  ''manage_variables_and_pre_configurations'',\n  ''view_billing_settings'',\n  ''view_system_logs''\n);\n\n-- Adicionar campos necessários à tabela profiles\nALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_root_admin BOOLEAN DEFAULT FALSE;\nALTER TABLE profiles ADD COLUMN IF NOT EXISTS foto_url TEXT;\nALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT ''ativo'';\n\n-- Tabela de permissões dos usuários\nCREATE TABLE IF NOT EXISTS user_permissions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,\n  permission permission_type NOT NULL,\n  granted_by UUID REFERENCES profiles(id),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  UNIQUE(user_id, permission)\n);\n\n-- Tabela de templates de permissões\nCREATE TABLE IF NOT EXISTS permission_templates (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL,\n  description TEXT,\n  permissions permission_type[] NOT NULL DEFAULT ''{}'',\n  created_by UUID REFERENCES profiles(id),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Tabela de logs de alterações de permissões\nCREATE TABLE IF NOT EXISTS permission_logs (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  target_user_id UUID REFERENCES profiles(id),\n  changed_by UUID REFERENCES profiles(id),\n  action TEXT NOT NULL, -- ''granted'', ''revoked'', ''user_created'', ''user_updated''\n  permission permission_type,\n  details JSONB,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Função para verificar se um usuário tem uma permissão específica\nCREATE OR REPLACE FUNCTION has_permission(user_id UUID, required_permission permission_type)\nRETURNS BOOLEAN\nLANGUAGE SQL\nSTABLE\nSECURITY DEFINER\nAS $$\n  SELECT EXISTS (\n    SELECT 1 FROM user_permissions \n    WHERE user_permissions.user_id = has_permission.user_id \n    AND permission = required_permission\n  ) OR EXISTS (\n    SELECT 1 FROM profiles \n    WHERE id = has_permission.user_id \n    AND is_root_admin = TRUE\n  );\n$$;\n\n-- Função para obter todas as permissões de um usuário\nCREATE OR REPLACE FUNCTION get_user_permissions(user_id UUID)\nRETURNS permission_type[]\nLANGUAGE SQL\nSTABLE\nSECURITY DEFINER\nAS $$\n  SELECT COALESCE(array_agg(permission), ''{}'') \n  FROM user_permissions \n  WHERE user_permissions.user_id = get_user_permissions.user_id;\n$$;\n\n-- RLS para user_permissions\nALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY \\"Users can view permissions with manage_collaborators permission\\"\n  ON user_permissions FOR SELECT\n  USING (\n    has_permission(auth.uid(), ''manage_collaborators'') OR \n    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n  );\n\nCREATE POLICY \\"Users can manage permissions with manage_collaborators permission\\"\n  ON user_permissions FOR ALL\n  USING (\n    has_permission(auth.uid(), ''manage_collaborators'') OR \n    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n  );\n\n-- RLS para permission_templates\nALTER TABLE permission_templates ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY \\"Users can view templates with manage_collaborators permission\\"\n  ON permission_templates FOR SELECT\n  USING (\n    has_permission(auth.uid(), ''manage_collaborators'') OR \n    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n  );\n\nCREATE POLICY \\"Users can manage templates with manage_collaborators permission\\"\n  ON permission_templates FOR ALL\n  USING (\n    has_permission(auth.uid(), ''manage_collaborators'') OR \n    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n  );\n\n-- RLS para permission_logs\nALTER TABLE permission_logs ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY \\"Users can view logs with view_system_logs permission\\"\n  ON permission_logs FOR SELECT\n  USING (\n    has_permission(auth.uid(), ''view_system_logs'') OR \n    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n  );\n\n-- Atualizar a política de profiles para ocultar root admin\nDROP POLICY IF EXISTS \\"Users can view their own profile\\" ON profiles;\nCREATE POLICY \\"Users can view profiles except root admin\\"\n  ON profiles FOR SELECT\n  USING (\n    (id = auth.uid()) OR \n    (is_root_admin = FALSE AND (\n      has_permission(auth.uid(), ''manage_collaborators'') OR \n      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_root_admin = TRUE)\n    ))\n  );\n\n-- Trigger para criar logs de alterações\nCREATE OR REPLACE FUNCTION log_permission_changes()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nAS $$\nBEGIN\n  IF TG_OP = ''INSERT'' THEN\n    INSERT INTO permission_logs (target_user_id, changed_by, action, permission, details)\n    VALUES (NEW.user_id, auth.uid(), ''granted'', NEW.permission, \n            jsonb_build_object(''timestamp'', NOW()));\n    RETURN NEW;\n  ELSIF TG_OP = ''DELETE'' THEN\n    INSERT INTO permission_logs (target_user_id, changed_by, action, permission, details)\n    VALUES (OLD.user_id, auth.uid(), ''revoked'', OLD.permission, \n            jsonb_build_object(''timestamp'', NOW()));\n    RETURN OLD;\n  END IF;\n  RETURN NULL;\nEND;\n$$;\n\nCREATE TRIGGER permission_changes_log\n  AFTER INSERT OR DELETE ON user_permissions\n  FOR EACH ROW EXECUTE FUNCTION log_permission_changes();\n"}', '4719ac7e-4fb4-409b-8fa9-2f004bc05588', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250616115239', '{"\n-- Remover políticas existentes que causam recursão\nDROP POLICY IF EXISTS \\"Users can view their own profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Admins can view all profiles\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Users can update their own profile\\" ON public.profiles;\n\n-- Criar políticas simples sem recursão\nCREATE POLICY \\"Users can view their own profile\\"\nON public.profiles FOR SELECT \nUSING (id = auth.uid());\n\nCREATE POLICY \\"Users can update their own profile\\"\nON public.profiles FOR UPDATE \nUSING (id = auth.uid()) \nWITH CHECK (id = auth.uid());\n\n-- Política para admins visualizarem todos os perfis (usando função segura)\nCREATE POLICY \\"Root admins can view all profiles\\"\nON public.profiles FOR SELECT \nUSING (\n  EXISTS (\n    SELECT 1 FROM public.profiles p \n    WHERE p.id = auth.uid() AND p.is_root_admin = true\n  )\n);\n\n-- Política para admins atualizarem qualquer perfil\nCREATE POLICY \\"Root admins can update all profiles\\"\nON public.profiles FOR UPDATE \nUSING (\n  EXISTS (\n    SELECT 1 FROM public.profiles p \n    WHERE p.id = auth.uid() AND p.is_root_admin = true\n  )\n) \nWITH CHECK (\n  EXISTS (\n    SELECT 1 FROM public.profiles p \n    WHERE p.id = auth.uid() AND p.is_root_admin = true\n  )\n);\n"}', '3ff9f576-2c1a-4902-ad26-acc974f054dc', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250616062329', '{"\n-- Primeiro, vamos limpar COMPLETAMENTE todas as políticas problemáticas\nDROP POLICY IF EXISTS \\"Users can view their own profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Users can update their own profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Root admins can view all profiles\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"Root admins can update all profiles\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"view_own_profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"update_own_profile\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"root_admin_view_all_profiles\\" ON public.profiles;\nDROP POLICY IF EXISTS \\"root_admin_update_all_profiles\\" ON public.profiles;\n\n-- Limpar políticas de permissões\nDROP POLICY IF EXISTS \\"Users can view own permissions\\" ON public.user_permissions;\nDROP POLICY IF EXISTS \\"Root admins can view all permissions\\" ON public.user_permissions;\nDROP POLICY IF EXISTS \\"Root admins can manage all permissions\\" ON public.user_permissions;\nDROP POLICY IF EXISTS \\"view_own_permissions\\" ON public.user_permissions;\nDROP POLICY IF EXISTS \\"root_admin_view_all_permissions\\" ON public.user_permissions;\nDROP POLICY IF EXISTS \\"root_admin_manage_all_permissions\\" ON public.user_permissions;\n\n-- Limpar políticas de templates\nDROP POLICY IF EXISTS \\"Root admins can view all templates\\" ON public.permission_templates;\nDROP POLICY IF EXISTS \\"Root admins can manage all templates\\" ON public.permission_templates;\nDROP POLICY IF EXISTS \\"root_admin_view_templates\\" ON public.permission_templates;\nDROP POLICY IF EXISTS \\"root_admin_manage_templates\\" ON public.permission_templates;\n\n-- Limpar políticas de logs\nDROP POLICY IF EXISTS \\"Root admins can view all logs\\" ON public.permission_logs;\nDROP POLICY IF EXISTS \\"root_admin_view_logs\\" ON public.permission_logs;\n\n-- Remover função antiga se existir\nDROP FUNCTION IF EXISTS public.is_root_admin();\n\n-- Primeiro, vamos garantir que seu usuário seja root admin\nUPDATE public.profiles \nSET is_root_admin = true, role = ''admin''\nWHERE id = ''8c858fa0-380a-4940-bee7-2b302753e6f2'' OR email = ''vagner@leadclinic.com.br'';\n\n-- Inserir perfil se não existir\nINSERT INTO public.profiles (id, nome, email, role, is_root_admin, ativo)\nVALUES (''8c858fa0-380a-4940-bee7-2b302753e6f2'', ''Vagner'', ''vagner@leadclinic.com.br'', ''admin'', true, true)\nON CONFLICT (id) DO UPDATE SET\n  is_root_admin = true,\n  role = ''admin'',\n  ativo = true;\n\n-- Criar função MUITO simples para verificar root admin\nCREATE OR REPLACE FUNCTION public.check_is_root_admin(user_id uuid)\nRETURNS boolean\nLANGUAGE sql\nSTABLE\nSECURITY DEFINER\nAS $$\n  SELECT COALESCE(\n    (SELECT is_root_admin FROM public.profiles WHERE id = user_id LIMIT 1),\n    false\n  );\n$$;\n\n-- Políticas SIMPLES para profiles - SEM RECURSÃO\nCREATE POLICY \\"allow_own_profile_select\\" ON public.profiles \nFOR SELECT \nUSING (id = auth.uid());\n\nCREATE POLICY \\"allow_own_profile_update\\" ON public.profiles \nFOR UPDATE \nUSING (id = auth.uid()) \nWITH CHECK (id = auth.uid());\n\nCREATE POLICY \\"allow_root_admin_select_all\\" ON public.profiles \nFOR SELECT \nUSING (public.check_is_root_admin(auth.uid()));\n\nCREATE POLICY \\"allow_root_admin_update_all\\" ON public.profiles \nFOR UPDATE \nUSING (public.check_is_root_admin(auth.uid())) \nWITH CHECK (public.check_is_root_admin(auth.uid()));\n\n-- Políticas para user_permissions\nCREATE POLICY \\"allow_own_permissions_select\\" ON public.user_permissions \nFOR SELECT \nUSING (user_id = auth.uid());\n\nCREATE POLICY \\"allow_root_admin_permissions_select\\" ON public.user_permissions \nFOR SELECT \nUSING (public.check_is_root_admin(auth.uid()));\n\nCREATE POLICY \\"allow_root_admin_permissions_all\\" ON public.user_permissions \nFOR ALL \nUSING (public.check_is_root_admin(auth.uid()));\n\n-- Políticas para permission_templates\nCREATE POLICY \\"allow_root_admin_templates_select\\" ON public.permission_templates \nFOR SELECT \nUSING (public.check_is_root_admin(auth.uid()));\n\nCREATE POLICY \\"allow_root_admin_templates_all\\" ON public.permission_templates \nFOR ALL \nUSING (public.check_is_root_admin(auth.uid()));\n\n-- Políticas para permission_logs\nCREATE POLICY \\"allow_root_admin_logs_select\\" ON public.permission_logs \nFOR SELECT \nUSING (public.check_is_root_admin(auth.uid()));\n\n-- Garantir que RLS está habilitado\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.permission_templates ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.permission_logs ENABLE ROW LEVEL SECURITY;\n"}', 'b8a6d049-20a7-4cb8-a4d8-fb5f465c1574', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250616063051', '{"\n-- Primeiro, vamos garantir que seu usuário tenha TODAS as permissões necessárias\n-- Inserir todas as permissões para o usuário root admin\nINSERT INTO public.user_permissions (user_id, permission, granted_by)\nSELECT \n  ''8c858fa0-380a-4940-bee7-2b302753e6f2'',\n  permission_name::permission_type,\n  ''8c858fa0-380a-4940-bee7-2b302753e6f2''\nFROM (\n  VALUES \n    (''access_dashboard''),\n    (''access_whatsapp''),\n    (''create_campaigns''),\n    (''edit_campaigns''),\n    (''view_templates''),\n    (''send_messages''),\n    (''view_metrics''),\n    (''access_tasks''),\n    (''create_tasks''),\n    (''assign_tasks''),\n    (''finalize_tasks''),\n    (''edit_execution_time''),\n    (''access_calls''),\n    (''create_calls''),\n    (''finalize_calls''),\n    (''link_calls_to_tasks''),\n    (''access_creatives''),\n    (''create_edit_creatives''),\n    (''approve_creatives''),\n    (''view_change_history''),\n    (''access_paid_media''),\n    (''create_campaigns_media''),\n    (''view_metrics_media''),\n    (''access_reports''),\n    (''create_automatic_reports''),\n    (''manage_user_settings''),\n    (''manage_collaborators''),\n    (''manage_whatsapp_templates''),\n    (''manage_api_settings''),\n    (''manage_appearance_and_visual_identity''),\n    (''manage_external_integrations''),\n    (''manage_variables_and_pre_configurations''),\n    (''view_billing_settings''),\n    (''view_system_logs'')\n) AS permissions(permission_name)\nON CONFLICT (user_id, permission) DO NOTHING;\n\n-- Vamos também TEMPORARIAMENTE desabilitar RLS nas tabelas principais para garantir acesso\nALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;\nALTER TABLE public.user_permissions DISABLE ROW LEVEL SECURITY;\n\n-- E garantir novamente que o perfil está correto\nUPDATE public.profiles \nSET \n  is_root_admin = true,\n  role = ''admin'',\n  ativo = true,\n  nome = ''Vagner Admin'',\n  email = ''vagner@leadclinic.com.br''\nWHERE id = ''8c858fa0-380a-4940-bee7-2b302753e6f2'';\n\n-- Verificar se o registro existe, se não, inserir\nINSERT INTO public.profiles (id, nome, email, role, is_root_admin, ativo)\nVALUES (''8c858fa0-380a-4940-bee7-2b302753e6f2'', ''Vagner Admin'', ''vagner@leadclinic.com.br'', ''admin'', true, true)\nON CONFLICT (id) DO UPDATE SET\n  is_root_admin = true,\n  role = ''admin'',\n  ativo = true,\n  nome = ''Vagner Admin'',\n  email = ''vagner@leadclinic.com.br'';\n"}', '0b913d7d-7af5-4155-930f-6ac232dc0aca', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250616071131', '{"\n-- Primeiro, vamos verificar e corrigir o enum ticket_status\nDROP TYPE IF EXISTS ticket_status CASCADE;\n\nCREATE TYPE ticket_status AS ENUM (\n  ''novo'',\n  ''aguardando_equipe'', \n  ''aguardando_cliente'',\n  ''em_analise'',\n  ''em_andamento'',\n  ''resolvido''\n);\n\n-- Recriar a coluna status na tabela chamados com o novo enum\nALTER TABLE chamados \nDROP COLUMN IF EXISTS status CASCADE;\n\nALTER TABLE chamados \nADD COLUMN status ticket_status NOT NULL DEFAULT ''novo'';\n\n-- Atualizar qualquer referência antiga de status\nUPDATE chamados SET status = ''novo'' WHERE status IS NULL;\n\n-- Garantir que as políticas RLS estejam funcionando\nALTER TABLE chamados ENABLE ROW LEVEL SECURITY;\n\n-- Política para admins verem todos os chamados\nDROP POLICY IF EXISTS \\"Admins can view all tickets\\" ON chamados;\nCREATE POLICY \\"Admins can view all tickets\\" ON chamados\n  FOR SELECT USING (is_admin());\n\n-- Política para clientes verem apenas seus chamados\nDROP POLICY IF EXISTS \\"Clients can view their own tickets\\" ON chamados;\nCREATE POLICY \\"Clients can view their own tickets\\" ON chamados\n  FOR SELECT USING (cliente_id = get_user_cliente_id());\n\n-- Política para inserir chamados\nDROP POLICY IF EXISTS \\"Users can create tickets\\" ON chamados;\nCREATE POLICY \\"Users can create tickets\\" ON chamados\n  FOR INSERT WITH CHECK (\n    (is_admin() AND cliente_id IS NOT NULL) OR \n    (cliente_id = get_user_cliente_id())\n  );\n\n-- Política para atualizar chamados\nDROP POLICY IF EXISTS \\"Users can update tickets\\" ON chamados;\nCREATE POLICY \\"Users can update tickets\\" ON chamados\n  FOR UPDATE USING (\n    is_admin() OR cliente_id = get_user_cliente_id()\n  );\n"}', 'f2fc3e55-87af-420f-a580-ddad4efae45c', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250618062522', '{"\n-- Adicionar a nova permissão ''access_client_reports'' ao enum permission_type\nALTER TYPE permission_type ADD VALUE ''access_client_reports'';\n"}', '2bca142d-7b1d-4cd3-836e-8daba4a8ed0c', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250620101642', '{"\n-- 1. Primeiro, vamos verificar se existem registros com status inválidos\nUPDATE chamados \nSET status = ''novo''::ticket_status \nWHERE status::text NOT IN (''novo'', ''aguardando_equipe'', ''aguardando_cliente'', ''em_analise'', ''em_andamento'', ''resolvido'');\n\n-- 2. Atualizar a função create_ticket_timeline_entry para remover qualquer referência a \\"aberto\\"\nCREATE OR REPLACE FUNCTION public.create_ticket_timeline_entry()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $function$\nBEGIN\n  -- Entrada para criação do chamado\n  IF TG_OP = ''INSERT'' AND TG_TABLE_NAME = ''chamados'' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id, \n      tipo, \n      conteudo, \n      autor_id, \n      autor_nome, \n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''criacao'',\n      NEW.mensagem,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      NEW.aberto_por,\n      jsonb_build_object(''titulo'', NEW.titulo, ''categoria'', NEW.categoria, ''prioridade'', NEW.prioridade)\n    );\n  END IF;\n\n  -- Entrada para nova mensagem\n  IF TG_OP = ''INSERT'' AND TG_TABLE_NAME = ''chamados_mensagens'' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.chamado_id,\n      ''mensagem'',\n      NEW.conteudo,\n      NEW.autor_id,\n      NEW.autor_nome,\n      NEW.autor_tipo,\n      NEW.metadata\n    );\n  END IF;\n\n  -- Entrada para mudança de status\n  IF TG_OP = ''UPDATE'' AND TG_TABLE_NAME = ''chamados'' AND OLD.status != NEW.status THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo,\n      metadata\n    ) VALUES (\n      NEW.id,\n      ''status_change'',\n      ''Status alterado de \\"'' || OLD.status || ''\\" para \\"'' || NEW.status || ''\\"'',\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END,\n      jsonb_build_object(''status_anterior'', OLD.status, ''status_novo'', NEW.status)\n    );\n  END IF;\n\n  -- Entrada para nova resposta (campo resposta)\n  IF TG_OP = ''UPDATE'' AND TG_TABLE_NAME = ''chamados'' AND (OLD.resposta IS NULL OR OLD.resposta = '''') AND NEW.resposta IS NOT NULL AND NEW.resposta != '''' THEN\n    INSERT INTO chamados_timeline (\n      chamado_id,\n      tipo,\n      conteudo,\n      autor_id,\n      autor_nome,\n      autor_tipo\n    ) VALUES (\n      NEW.id,\n      ''resposta'',\n      NEW.resposta,\n      auth.uid(),\n      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), ''Sistema''),\n      CASE WHEN is_admin() THEN ''admin'' ELSE ''cliente'' END\n    );\n  END IF;\n\n  RETURN NEW;\nEND;\n$function$;\n\n-- 3. Atualizar função update_ticket_detailed_status para usar apenas os novos status\nCREATE OR REPLACE FUNCTION public.update_ticket_detailed_status()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $function$\nBEGIN\n  -- Definir status detalhado baseado no status e outras condições\n  IF NEW.status = ''novo'' AND NEW.aberto_por = ''admin'' THEN\n    NEW.status_detalhado = ''Novo - Aberto pela Equipe'';\n  ELSIF NEW.status = ''novo'' AND NEW.aberto_por = ''cliente'' THEN\n    NEW.status_detalhado = ''Novo - Aberto pelo Cliente'';\n  ELSIF NEW.status = ''aguardando_equipe'' THEN\n    NEW.status_detalhado = ''Aguardando resposta da equipe'';\n  ELSIF NEW.status = ''aguardando_cliente'' THEN\n    NEW.status_detalhado = ''Aguardando resposta do cliente'';\n  ELSIF NEW.status = ''em_analise'' THEN\n    NEW.status_detalhado = ''Em análise pela equipe'';\n  ELSIF NEW.status = ''em_andamento'' THEN\n    NEW.status_detalhado = ''Em andamento'';\n  ELSIF NEW.status = ''resolvido'' THEN\n    NEW.status_detalhado = ''Resolvido'';\n  ELSE\n    NEW.status_detalhado = NEW.status;\n  END IF;\n  \n  RETURN NEW;\nEND;\n$function$;\n\n-- 4. Verificar se há dados órfãos no histórico e timeline\nUPDATE chamados_historico \nSET detalhes = REPLACE(detalhes, ''\\"aberto\\"'', ''\\"novo\\"'')\nWHERE detalhes LIKE ''%aberto%'';\n\nUPDATE chamados_timeline \nSET conteudo = REPLACE(conteudo, ''\\"aberto\\"'', ''\\"novo\\"'')\nWHERE conteudo LIKE ''%aberto%'';\n"}', 'f52c17b4-5b21-453b-8144-50fabe8102e9', 'vagner@leadclinic.com.br', NULL);
INSERT INTO supabase_migrations.schema_migrations (version, statements, name, created_by, idempotency_key) VALUES ('20250620123904', '{"\n-- Criar enum para os módulos que clientes podem acessar\nCREATE TYPE client_module AS ENUM (\n  ''dashboard'',\n  ''chamados'', \n  ''relatorios'',\n  ''criativos''\n);\n\n-- Criar enum para tipos de relatórios específicos\nCREATE TYPE report_type AS ENUM (\n  ''campanhas'',\n  ''conjuntos_anuncios'',\n  ''anuncios'',\n  ''criativos_performance'',\n  ''whatsapp''\n);\n\n-- Tabela para permissões de módulos dos clientes\nCREATE TABLE public.client_permissions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  client_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,\n  module client_module NOT NULL,\n  enabled BOOLEAN NOT NULL DEFAULT true,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),\n  UNIQUE(client_id, module)\n);\n\n-- Tabela para permissões específicas de relatórios dos clientes\nCREATE TABLE public.client_report_permissions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  client_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,\n  report_type report_type NOT NULL,\n  enabled BOOLEAN NOT NULL DEFAULT true,\n  account_ids TEXT[] DEFAULT ''{}'', -- IDs das contas específicas que o cliente pode ver neste relatório\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),\n  UNIQUE(client_id, report_type)\n);\n\n-- Habilitar RLS\nALTER TABLE public.client_permissions ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.client_report_permissions ENABLE ROW LEVEL SECURITY;\n\n-- Políticas RLS para client_permissions\nCREATE POLICY \\"Admins can manage all client permissions\\" ON public.client_permissions\n  FOR ALL USING (\n    EXISTS (\n      SELECT 1 FROM public.profiles \n      WHERE id = auth.uid() \n      AND (role = ''admin'' OR is_root_admin = true)\n    )\n  );\n\nCREATE POLICY \\"Clients can view their own permissions\\" ON public.client_permissions\n  FOR SELECT USING (\n    client_id IN (\n      SELECT id FROM public.clientes WHERE user_id = auth.uid()\n    )\n  );\n\n-- Políticas RLS para client_report_permissions\nCREATE POLICY \\"Admins can manage all client report permissions\\" ON public.client_report_permissions\n  FOR ALL USING (\n    EXISTS (\n      SELECT 1 FROM public.profiles \n      WHERE id = auth.uid() \n      AND (role = ''admin'' OR is_root_admin = true)\n    )\n  );\n\nCREATE POLICY \\"Clients can view their own report permissions\\" ON public.client_report_permissions\n  FOR SELECT USING (\n    client_id IN (\n      SELECT id FROM public.clientes WHERE user_id = auth.uid()\n    )\n  );\n\n-- Função para criar permissões padrão quando um cliente é criado\nCREATE OR REPLACE FUNCTION create_default_client_permissions()\nRETURNS TRIGGER AS $$\nBEGIN\n  -- Inserir permissões padrão para módulos básicos\n  INSERT INTO public.client_permissions (client_id, module, enabled) VALUES\n    (NEW.id, ''dashboard'', true),\n    (NEW.id, ''chamados'', true),\n    (NEW.id, ''criativos'', true);\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Trigger para criar permissões padrão\nCREATE TRIGGER create_client_permissions_trigger\n  AFTER INSERT ON public.clientes\n  FOR EACH ROW\n  EXECUTE FUNCTION create_default_client_permissions();\n\n-- Função para verificar se cliente tem permissão para um módulo\nCREATE OR REPLACE FUNCTION client_has_module_permission(client_user_id UUID, module_name client_module)\nRETURNS BOOLEAN\nLANGUAGE sql\nSTABLE SECURITY DEFINER\nAS $$\n  SELECT EXISTS (\n    SELECT 1 \n    FROM public.client_permissions cp\n    JOIN public.clientes c ON c.id = cp.client_id\n    WHERE c.user_id = client_user_id \n    AND cp.module = module_name \n    AND cp.enabled = true\n  );\n$$;\n\n-- Função para verificar se cliente tem permissão para um tipo de relatório\nCREATE OR REPLACE FUNCTION client_has_report_permission(client_user_id UUID, report_name report_type)\nRETURNS BOOLEAN\nLANGUAGE sql\nSTABLE SECURITY DEFINER\nAS $$\n  SELECT EXISTS (\n    SELECT 1 \n    FROM public.client_report_permissions crp\n    JOIN public.clientes c ON c.id = crp.client_id\n    WHERE c.user_id = client_user_id \n    AND crp.report_type = report_name \n    AND crp.enabled = true\n  );\n$$;\n\n-- Inserir permissões padrão para clientes existentes\nINSERT INTO public.client_permissions (client_id, module, enabled)\nSELECT id, ''dashboard'', true FROM public.clientes\nWHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = ''dashboard'');\n\nINSERT INTO public.client_permissions (client_id, module, enabled)\nSELECT id, ''chamados'', true FROM public.clientes\nWHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = ''chamados'');\n\nINSERT INTO public.client_permissions (client_id, module, enabled)\nSELECT id, ''criativos'', true FROM public.clientes\nWHERE id NOT IN (SELECT client_id FROM public.client_permissions WHERE module = ''criativos'');\n"}', 'd6bcd090-a8c3-4262-b6e0-047d32629e3e', 'vagner@leadclinic.com.br', NULL);


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

    ADD CONSTRAINT client_report_permissions_client_id_report_type_key UNIQUE (client_id, ENUM('campanhas','conjuntos_anuncios','anuncios','criativos_performance','whatsapp'));


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



--
-- Name: chamados chamado_historico_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: clientes create_client_permissions_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: user_permissions permission_changes_log; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: chamados ticket_timeline_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: chamados_mensagens trigger_timeline_entry_mensagens; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: chamados_mensagens trigger_update_status_on_client_message; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: chamados update_chamados_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: clientes update_clientes_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: criativos update_criativos_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: chamados update_ticket_status_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_campaigns update_whatsapp_campaigns_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_config update_whatsapp_config_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_contacts update_whatsapp_contacts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: whatsapp_templates update_whatsapp_templates_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--



--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--



--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--



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
  WHERE ((p.id = uid()) AND (p.role = 'admin')))));


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
  WHERE ((up.user_id = uid()) AND (up.permission = 'manage_clients')))));


--
-- Name: client_permissions Admins can manage all client permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND ((profiles.role = 'admin') OR (profiles.is_root_admin = true))))));


--
-- Name: client_report_permissions Admins can manage all client report permissions; Type: POLICY; Schema: public; Owner: postgres
--

   FROM profiles
  WHERE ((profiles.id = uid()) AND ((profiles.role = 'admin') OR (profiles.is_root_admin = true))))));


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
  WHERE (profiles.id = uid())) = 'admin') OR (usuario_id = uid())));


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
  WHERE ((up.user_id = uid()) AND (up.permission = 'access_tasks'))))));


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
  WHERE ((up.user_id = uid()) AND (up.permission = 'assign_tasks'))))));


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
      WHERE (profiles.id = uid())) = 'admin') THEN true
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
  WHERE (user_permissions.permission = 'manage_collaborators'))) OR (EXISTS ( SELECT 1
   FROM user_permissions
  WHERE ((user_permissions.user_id = uid()) AND (user_permissions.permission = 'view_system_logs'))))));


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
-- Name: FUNCTION UUID(); Type: ACL; Schema: extensions; Owner: postgres
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

         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();



--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();



--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();



--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();



--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

   EXECUTE FUNCTION extensions.pgrst_ddl_watch();



--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

   EXECUTE FUNCTION extensions.pgrst_drop_watch();



--
-- PostgreSQL database dump complete
--

