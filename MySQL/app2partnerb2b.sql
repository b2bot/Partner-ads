-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 02-Jul-2025 às 16:27
-- Versão do servidor: 8.0.37-cll-lve
-- versão do PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `app2partnerb2b`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`app2partnerb2b`@`localhost` PROCEDURE `CreateDefaultClientPermissions` (IN `client_id` CHAR(36))  BEGIN
    INSERT INTO `client_permissions` (`client_id`, `module`, `enabled`) VALUES
    (client_id, 'dashboard', 1),
    (client_id, 'chamados', 1),
    (client_id, 'criativos', 1)
    ON DUPLICATE KEY UPDATE enabled = enabled;
END$$

CREATE DEFINER=`app2partnerb2b`@`localhost` PROCEDURE `LogActivity` (IN `p_action` VARCHAR(255), IN `p_entity_type` VARCHAR(100), IN `p_entity_id` VARCHAR(255), IN `p_entity_name` VARCHAR(255), IN `p_user_id` CHAR(36), IN `p_user_name` VARCHAR(255), IN `p_details` JSON)  BEGIN
    INSERT INTO `activity_logs` 
    (`action`, `entity_type`, `entity_id`, `entity_name`, `user_id`, `user_name`, `details`)
    VALUES 
    (p_action, p_entity_type, p_entity_id, p_entity_name, p_user_id, p_user_name, p_details);
END$$

--
-- Funções
--
CREATE DEFINER=`app2partnerb2b`@`localhost` FUNCTION `ClientHasModulePermission` (`client_id` CHAR(36), `module_name` VARCHAR(50)) RETURNS TINYINT(1) READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE has_permission BOOLEAN DEFAULT FALSE;
    
    SELECT COUNT(*) > 0 INTO has_permission
    FROM `client_permissions`
    WHERE `client_id` = client_id 
    AND `module` = module_name 
    AND `enabled` = 1;
    
    RETURN has_permission;
END$$

CREATE DEFINER=`app2partnerb2b`@`localhost` FUNCTION `IsAdmin` (`user_id` CHAR(36)) RETURNS TINYINT(1) READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE is_admin BOOLEAN DEFAULT FALSE;
    
    SELECT COUNT(*) > 0 INTO is_admin
    FROM `profiles`
    WHERE `id` = user_id 
    AND (`role` = 'admin' OR `is_root_admin` = 1)
    AND `ativo` = 1;
    
    RETURN is_admin;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados`
--

CREATE TABLE `chamados` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `cliente_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `resposta` text COLLATE utf8mb4_unicode_ci,
  `arquivo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `respondido_por` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `aberto_por` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_detalhado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoria` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prioridade` enum('baixa','media','alta','urgente') COLLATE utf8mb4_unicode_ci DEFAULT 'media',
  `nota_interna` text COLLATE utf8mb4_unicode_ci,
  `tempo_resposta_horas` int DEFAULT NULL,
  `status` enum('novo','aguardando_equipe','aguardando_cliente','em_analise','em_andamento','resolvido') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'novo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Acionadores `chamados`
--
DELIMITER $$
CREATE TRIGGER `tr_chamados_after_update` AFTER UPDATE ON `chamados` FOR EACH ROW BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO `chamados_historico` 
        (`chamado_id`, `acao`, `usuario_nome`, `detalhes`)
        VALUES 
        (NEW.id, 'Status alterado', 'Sistema', 
         CONCAT('Status alterado de "', OLD.status, '" para "', NEW.status, '"'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados_anexos`
--

CREATE TABLE `chamados_anexos` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `chamado_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome_arquivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_arquivo` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_arquivo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tamanho_arquivo` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uploaded_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados_historico`
--

CREATE TABLE `chamados_historico` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `chamado_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `acao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario_nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalhes` text COLLATE utf8mb4_unicode_ci,
  `data_acao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados_mensagens`
--

CREATE TABLE `chamados_mensagens` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `chamado_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conteudo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `arquivo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `autor_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `autor_nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autor_tipo` enum('admin','client','system') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metadata` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamados_timeline`
--

CREATE TABLE `chamados_timeline` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `chamado_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conteudo` text COLLATE utf8mb4_unicode_ci,
  `autor_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `autor_nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autor_tipo` enum('admin','client','system') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `metadata` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_acesso` enum('basico','premium','enterprise') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'basico',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes_internas` text COLLATE utf8mb4_unicode_ci,
  `responsavel_conta` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contas_meta` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Acionadores `clientes`
--
DELIMITER $$
CREATE TRIGGER `tr_clientes_after_insert` AFTER INSERT ON `clientes` FOR EACH ROW BEGIN
    CALL CreateDefaultClientPermissions(NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `client_permissions`
--

CREATE TABLE `client_permissions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` enum('dashboard','chamados','relatorios','criativos') COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `client_report_permissions`
--

CREATE TABLE `client_report_permissions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_type` enum('campanhas','conjuntos_anuncios','anuncios','criativos_performance','whatsapp') COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `account_ids` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `contas`
--

CREATE TABLE `contas` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `cliente_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('facebook','instagram','whatsapp','google') COLLATE utf8mb4_unicode_ci NOT NULL,
  `identificador` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `criativos`
--

CREATE TABLE `criativos` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `cliente_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `arquivo_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_arquivo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pendente','aprovado','rejeitado','em_revisao') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendente',
  `resposta` text COLLATE utf8mb4_unicode_ci,
  `comentario_cliente` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `campanha` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome_criativo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titulo_anuncio` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descricao_anuncio` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `meta_api_credentials`
--

CREATE TABLE `meta_api_credentials` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `app_secret` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `metrics_config`
--

CREATE TABLE `metrics_config` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `config` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `permission_logs`
--

CREATE TABLE `permission_logs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `target_user_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `changed_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `permission_templates`
--

CREATE TABLE `permission_templates` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `permissions` json NOT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `permission_templates`
--

INSERT INTO `permission_templates` (`id`, `name`, `description`, `permissions`, `created_by`, `created_at`) VALUES
('6c46c958-565e-11f0-8fdc-bc2411766a2a', 'Cliente Básico', 'Permissões básicas para clientes', '[\"dashboard\", \"chamados\", \"criativos\"]', NULL, '2025-07-01 09:33:19'),
('6c46cc99-565e-11f0-8fdc-bc2411766a2a', 'Cliente Premium', 'Permissões premium para clientes', '[\"dashboard\", \"chamados\", \"criativos\", \"relatorios\"]', NULL, '2025-07-01 09:33:19'),
('6c46cf01-565e-11f0-8fdc-bc2411766a2a', 'Administrador', 'Permissões completas de administrador', '[\"dashboard\", \"chamados\", \"criativos\", \"relatorios\", \"admin\"]', NULL, '2025-07-01 09:33:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `profiles`
--

CREATE TABLE `profiles` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','client','collaborator') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_root_admin` tinyint(1) DEFAULT '0',
  `foto_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `profiles`
--

INSERT INTO `profiles` (`id`, `nome`, `email`, `password`, `role`, `ativo`, `created_at`, `is_root_admin`, `foto_url`, `status`) VALUES
('4089b7b5-5756-11f0-8fdc-bc2411766a2a', '', '', NULL, 'client', 1, '2025-07-02 15:07:21', 0, NULL, 'ativo'),
('45bb7eae-5756-11f0-8fdc-bc2411766a2a', 'Usuário Teste', 'teste@teste.com', '@123', 'client', 1, '2025-07-02 15:07:29', 0, NULL, 'ativo'),
('fb926fe2-56c6-11f0-8fdc-bc2411766a2a', 'Administrador', 'vagner@leadclinic.com.br', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1, '2025-07-01 22:01:47', 1, NULL, 'ativo');

--
-- Acionadores `profiles`
--
DELIMITER $$
CREATE TRIGGER `tr_profiles_before_update` BEFORE UPDATE ON `profiles` FOR EACH ROW BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projects`
--

CREATE TABLE `projects` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `client_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ativo','pausado','concluido','cancelado') COLLATE utf8mb4_unicode_ci DEFAULT 'ativo',
  `responsible_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `sections`
--

CREATE TABLE `sections` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `settings`
--

CREATE TABLE `settings` (
  `id` bigint NOT NULL,
  `client_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `system_activity_logs`
--

CREATE TABLE `system_activity_logs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tasks`
--

CREATE TABLE `tasks` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `project_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assigned_to` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pendente','em_andamento','concluida','cancelada') COLLATE utf8mb4_unicode_ci DEFAULT 'pendente',
  `priority` enum('baixa','media','alta','urgente') COLLATE utf8mb4_unicode_ci DEFAULT 'media',
  `due_date` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `task_comments`
--

CREATE TABLE `task_comments` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `task_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `task_steps`
--

CREATE TABLE `task_steps` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `task_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `completed` tinyint(1) DEFAULT '0',
  `order_index` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_permissions`
--

CREATE TABLE `user_permissions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `granted` tinyint(1) DEFAULT '1',
  `granted_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `profile_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `v_chamados_completos`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `v_chamados_completos` (
`cliente_email` varchar(255)
,`cliente_nome` varchar(255)
,`created_at` timestamp
,`id` char(36)
,`mensagem` text
,`prioridade` enum('baixa','media','alta','urgente')
,`respondido_por_nome` varchar(255)
,`status` enum('novo','aguardando_equipe','aguardando_cliente','em_analise','em_andamento','resolvido')
,`titulo` varchar(500)
,`updated_at` timestamp
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `v_chamados_stats`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `v_chamados_stats` (
`cliente_nome` varchar(255)
,`em_andamento` decimal(23,0)
,`novos` decimal(23,0)
,`resolvidos` decimal(23,0)
,`tempo_medio_resposta` decimal(14,4)
,`total_chamados` bigint
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `v_user_permissions`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `v_user_permissions` (
`client_modules` text
,`email` varchar(255)
,`role` enum('admin','client','collaborator')
,`user_id` char(36)
,`user_name` varchar(255)
,`user_permissions` text
);

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_campaigns`
--

CREATE TABLE `whatsapp_campaigns` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `template_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_contacts` json NOT NULL,
  `status` enum('draft','scheduled','running','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_campaign_executions`
--

CREATE TABLE `whatsapp_campaign_executions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `campaign_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','sent','delivered','read','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `message_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `sent_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_config`
--

CREATE TABLE `whatsapp_config` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `webhook_verify_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_account_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_contacts`
--

CREATE TABLE `whatsapp_contacts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `custom_fields` json DEFAULT NULL,
  `opt_in` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_messages`
--

CREATE TABLE `whatsapp_messages` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direction` enum('inbound','outbound') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('text','image','document','audio','video','template') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json NOT NULL,
  `status` enum('sent','delivered','read','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'sent',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_message_logs`
--

CREATE TABLE `whatsapp_message_logs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `message_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` enum('sent','delivered','read','failed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `whatsapp_templates`
--

CREATE TABLE `whatsapp_templates` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `client_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('marketing','utility','authentication') COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'pt_BR',
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `components` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `workflow_templates`
--

CREATE TABLE `workflow_templates` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `steps` json NOT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para vista `v_chamados_completos`
--
DROP TABLE IF EXISTS `v_chamados_completos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`app2partnerb2b`@`localhost` SQL SECURITY DEFINER VIEW `v_chamados_completos`  AS  select `c`.`id` AS `id`,`c`.`titulo` AS `titulo`,`c`.`mensagem` AS `mensagem`,`c`.`status` AS `status`,`c`.`prioridade` AS `prioridade`,`c`.`created_at` AS `created_at`,`c`.`updated_at` AS `updated_at`,`cl`.`nome` AS `cliente_nome`,`cl`.`email` AS `cliente_email`,`p`.`nome` AS `respondido_por_nome` from ((`chamados` `c` left join `clientes` `cl` on((`c`.`cliente_id` = `cl`.`id`))) left join `profiles` `p` on((`c`.`respondido_por` = `p`.`id`))) ;

-- --------------------------------------------------------

--
-- Estrutura para vista `v_chamados_stats`
--
DROP TABLE IF EXISTS `v_chamados_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`app2partnerb2b`@`localhost` SQL SECURITY DEFINER VIEW `v_chamados_stats`  AS  select `cl`.`nome` AS `cliente_nome`,count(0) AS `total_chamados`,sum((case when (`c`.`status` = 'novo') then 1 else 0 end)) AS `novos`,sum((case when (`c`.`status` = 'em_andamento') then 1 else 0 end)) AS `em_andamento`,sum((case when (`c`.`status` = 'resolvido') then 1 else 0 end)) AS `resolvidos`,avg(`c`.`tempo_resposta_horas`) AS `tempo_medio_resposta` from (`chamados` `c` join `clientes` `cl` on((`c`.`cliente_id` = `cl`.`id`))) group by `cl`.`id`,`cl`.`nome` ;

-- --------------------------------------------------------

--
-- Estrutura para vista `v_user_permissions`
--
DROP TABLE IF EXISTS `v_user_permissions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`app2partnerb2b`@`localhost` SQL SECURITY DEFINER VIEW `v_user_permissions`  AS  select `p`.`id` AS `user_id`,`p`.`nome` AS `user_name`,`p`.`email` AS `email`,`p`.`role` AS `role`,group_concat(`cp`.`module` separator ',') AS `client_modules`,group_concat(`up`.`permission` separator ',') AS `user_permissions` from (((`profiles` `p` left join `clientes` `cl` on((`p`.`id` = `cl`.`user_id`))) left join `client_permissions` `cp` on(((`cl`.`id` = `cp`.`client_id`) and (`cp`.`enabled` = 1)))) left join `user_permissions` `up` on(((`p`.`id` = `up`.`user_id`) and (`up`.`granted` = 1)))) group by `p`.`id` ;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_activity_logs_user_id` (`user_id`),
  ADD KEY `idx_activity_logs_entity` (`entity_type`,`entity_id`),
  ADD KEY `idx_activity_logs_created_at` (`created_at`);

--
-- Índices para tabela `chamados`
--
ALTER TABLE `chamados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondido_por` (`respondido_por`),
  ADD KEY `idx_chamados_cliente_id` (`cliente_id`),
  ADD KEY `idx_chamados_status` (`status`),
  ADD KEY `idx_chamados_prioridade` (`prioridade`),
  ADD KEY `idx_chamados_created_at` (`created_at`),
  ADD KEY `idx_chamados_cliente_status` (`cliente_id`,`status`),
  ADD KEY `idx_chamados_status_created` (`status`,`created_at`);

--
-- Índices para tabela `chamados_anexos`
--
ALTER TABLE `chamados_anexos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`),
  ADD KEY `idx_anexos_chamado_id` (`chamado_id`);

--
-- Índices para tabela `chamados_historico`
--
ALTER TABLE `chamados_historico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_historico_chamado_id` (`chamado_id`),
  ADD KEY `idx_historico_data_acao` (`data_acao`);

--
-- Índices para tabela `chamados_mensagens`
--
ALTER TABLE `chamados_mensagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`),
  ADD KEY `idx_mensagens_chamado_id` (`chamado_id`),
  ADD KEY `idx_mensagens_created_at` (`created_at`);

--
-- Índices para tabela `chamados_timeline`
--
ALTER TABLE `chamados_timeline`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`),
  ADD KEY `idx_timeline_chamado_id` (`chamado_id`),
  ADD KEY `idx_timeline_created_at` (`created_at`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_clientes_user_id` (`user_id`),
  ADD KEY `idx_clientes_responsavel` (`responsavel_conta`),
  ADD KEY `idx_clientes_ativo` (`ativo`);

--
-- Índices para tabela `client_permissions`
--
ALTER TABLE `client_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_client_permissions` (`client_id`,`module`),
  ADD KEY `idx_client_permissions_client_id` (`client_id`);

--
-- Índices para tabela `client_report_permissions`
--
ALTER TABLE `client_report_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_client_report_permissions` (`client_id`,`report_type`),
  ADD KEY `idx_client_report_permissions_client_id` (`client_id`);

--
-- Índices para tabela `contas`
--
ALTER TABLE `contas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_contas_cliente_identificador` (`cliente_id`,`identificador`),
  ADD KEY `idx_contas_cliente_id` (`cliente_id`),
  ADD KEY `idx_contas_tipo` (`tipo`);

--
-- Índices para tabela `criativos`
--
ALTER TABLE `criativos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_criativos_cliente_id` (`cliente_id`),
  ADD KEY `idx_criativos_status` (`status`);

--
-- Índices para tabela `meta_api_credentials`
--
ALTER TABLE `meta_api_credentials`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `metrics_config`
--
ALTER TABLE `metrics_config`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `permission_logs`
--
ALTER TABLE `permission_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_permission_logs_target_user` (`target_user_id`),
  ADD KEY `idx_permission_logs_changed_by` (`changed_by`);

--
-- Índices para tabela `permission_templates`
--
ALTER TABLE `permission_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_permission_templates_name` (`name`);

--
-- Índices para tabela `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_profiles_email` (`email`),
  ADD KEY `idx_profiles_role` (`role`),
  ADD KEY `idx_profiles_role_ativo` (`role`,`ativo`);

--
-- Índices para tabela `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `responsible_id` (`responsible_id`),
  ADD KEY `idx_projects_client_id` (`client_id`),
  ADD KEY `idx_projects_status` (`status`);

--
-- Índices para tabela `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sections_project_id` (`project_id`),
  ADD KEY `idx_sections_order` (`order_index`);

--
-- Índices para tabela `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_settings_client_id` (`client_id`);

--
-- Índices para tabela `system_activity_logs`
--
ALTER TABLE `system_activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_system_logs_user_id` (`user_id`),
  ADD KEY `idx_system_logs_action` (`action`),
  ADD KEY `idx_system_logs_created_at` (`created_at`);

--
-- Índices para tabela `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_tasks_project_id` (`project_id`),
  ADD KEY `idx_tasks_assigned_to` (`assigned_to`),
  ADD KEY `idx_tasks_status` (`status`),
  ADD KEY `idx_tasks_project_status` (`project_id`,`status`);

--
-- Índices para tabela `task_comments`
--
ALTER TABLE `task_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_task_comments_task_id` (`task_id`),
  ADD KEY `idx_task_comments_created_at` (`created_at`);

--
-- Índices para tabela `task_steps`
--
ALTER TABLE `task_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_task_steps_task_id` (`task_id`),
  ADD KEY `idx_task_steps_order` (`order_index`);

--
-- Índices para tabela `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_permissions` (`user_id`,`permission`),
  ADD KEY `granted_by` (`granted_by`),
  ADD KEY `idx_user_permissions_user_id` (`user_id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_usuarios_profile` (`profile_id`);

--
-- Índices para tabela `whatsapp_campaigns`
--
ALTER TABLE `whatsapp_campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_id` (`template_id`),
  ADD KEY `idx_whatsapp_campaigns_client_id` (`client_id`);

--
-- Índices para tabela `whatsapp_campaign_executions`
--
ALTER TABLE `whatsapp_campaign_executions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `idx_whatsapp_executions_campaign_id` (`campaign_id`),
  ADD KEY `idx_whatsapp_executions_status` (`status`);

--
-- Índices para tabela `whatsapp_config`
--
ALTER TABLE `whatsapp_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_whatsapp_config_client` (`client_id`);

--
-- Índices para tabela `whatsapp_contacts`
--
ALTER TABLE `whatsapp_contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_whatsapp_contacts` (`client_id`,`phone_number`),
  ADD KEY `idx_whatsapp_contacts_client_id` (`client_id`);

--
-- Índices para tabela `whatsapp_messages`
--
ALTER TABLE `whatsapp_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_whatsapp_messages_client_id` (`client_id`),
  ADD KEY `idx_whatsapp_messages_contact_id` (`contact_id`),
  ADD KEY `idx_whatsapp_messages_created_at` (`created_at`),
  ADD KEY `idx_whatsapp_messages_client_created` (`client_id`,`created_at`);

--
-- Índices para tabela `whatsapp_message_logs`
--
ALTER TABLE `whatsapp_message_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_whatsapp_logs_message_id` (`message_id`),
  ADD KEY `idx_whatsapp_logs_timestamp` (`timestamp`);

--
-- Índices para tabela `whatsapp_templates`
--
ALTER TABLE `whatsapp_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_whatsapp_templates_client_id` (`client_id`);

--
-- Índices para tabela `workflow_templates`
--
ALTER TABLE `workflow_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `chamados`
--
ALTER TABLE `chamados`
  ADD CONSTRAINT `chamados_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chamados_ibfk_2` FOREIGN KEY (`respondido_por`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `chamados_anexos`
--
ALTER TABLE `chamados_anexos`
  ADD CONSTRAINT `chamados_anexos_ibfk_1` FOREIGN KEY (`chamado_id`) REFERENCES `chamados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chamados_anexos_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `chamados_historico`
--
ALTER TABLE `chamados_historico`
  ADD CONSTRAINT `chamados_historico_ibfk_1` FOREIGN KEY (`chamado_id`) REFERENCES `chamados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chamados_historico_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `chamados_mensagens`
--
ALTER TABLE `chamados_mensagens`
  ADD CONSTRAINT `chamados_mensagens_ibfk_1` FOREIGN KEY (`chamado_id`) REFERENCES `chamados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chamados_mensagens_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `chamados_timeline`
--
ALTER TABLE `chamados_timeline`
  ADD CONSTRAINT `chamados_timeline_ibfk_1` FOREIGN KEY (`chamado_id`) REFERENCES `chamados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chamados_timeline_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`responsavel_conta`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `client_permissions`
--
ALTER TABLE `client_permissions`
  ADD CONSTRAINT `client_permissions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `client_report_permissions`
--
ALTER TABLE `client_report_permissions`
  ADD CONSTRAINT `client_report_permissions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `contas`
--
ALTER TABLE `contas`
  ADD CONSTRAINT `contas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `criativos`
--
ALTER TABLE `criativos`
  ADD CONSTRAINT `criativos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `permission_logs`
--
ALTER TABLE `permission_logs`
  ADD CONSTRAINT `permission_logs_ibfk_1` FOREIGN KEY (`target_user_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `permission_logs_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `permission_templates`
--
ALTER TABLE `permission_templates`
  ADD CONSTRAINT `permission_templates_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`responsible_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `system_activity_logs`
--
ALTER TABLE `system_activity_logs`
  ADD CONSTRAINT `system_activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `profiles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`) ON DELETE RESTRICT;

--
-- Limitadores para a tabela `task_comments`
--
ALTER TABLE `task_comments`
  ADD CONSTRAINT `task_comments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `task_steps`
--
ALTER TABLE `task_steps`
  ADD CONSTRAINT `task_steps_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`granted_by`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_campaigns`
--
ALTER TABLE `whatsapp_campaigns`
  ADD CONSTRAINT `whatsapp_campaigns_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `whatsapp_campaigns_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `whatsapp_templates` (`id`) ON DELETE RESTRICT;

--
-- Limitadores para a tabela `whatsapp_campaign_executions`
--
ALTER TABLE `whatsapp_campaign_executions`
  ADD CONSTRAINT `whatsapp_campaign_executions_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `whatsapp_campaigns` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `whatsapp_campaign_executions_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `whatsapp_contacts` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_config`
--
ALTER TABLE `whatsapp_config`
  ADD CONSTRAINT `whatsapp_config_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_contacts`
--
ALTER TABLE `whatsapp_contacts`
  ADD CONSTRAINT `whatsapp_contacts_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_messages`
--
ALTER TABLE `whatsapp_messages`
  ADD CONSTRAINT `whatsapp_messages_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `whatsapp_messages_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `whatsapp_contacts` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_message_logs`
--
ALTER TABLE `whatsapp_message_logs`
  ADD CONSTRAINT `whatsapp_message_logs_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `whatsapp_messages` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `whatsapp_templates`
--
ALTER TABLE `whatsapp_templates`
  ADD CONSTRAINT `whatsapp_templates_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `workflow_templates`
--
ALTER TABLE `workflow_templates`
  ADD CONSTRAINT `workflow_templates_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
