# 🚀 Meta Ads Pro Manager - Sistema Completo de Gestão Empresarial

[![TypeScript](https://img.shields.io/badge/TypeScript-95.7%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-1.0-3ECF8E)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38b2ac)](https://tailwindcss.com/)

## 📋 Visão Geral

O **Meta Ads Pro Manager** é uma plataforma empresarial completa que vai muito além do gerenciamento de campanhas. É um **ERP moderno** que integra gestão de projetos, sistema de emails (mailbox), automações, tarefas, tickets, WhatsApp Business, Meta Ads e muito mais, tudo em uma única plataforma robusta e escalável.

### 🎯 Principais Módulos

- **📊 Dashboard Avançado**: Métricas em tempo real e analytics
- **📧 Sistema de Email (Mailbox)**: Email corporativo completo com automações
- **📋 Gestão de Tarefas**: Sistema Kanban, calendário e workflows
- **🎫 Sistema de Tickets**: Central de suporte avançada
- **📱 WhatsApp Business**: Campanhas e automações
- **🎯 Meta Ads**: Gestão completa de campanhas Facebook/Instagram
- **👥 Gestão de Clientes**: CRM integrado
- **🔐 Sistema de Permissões**: Controle granular de acesso
- **📈 Relatórios**: Analytics e insights avançados

## 🏗️ Arquitetura do Sistema

### **Frontend**
- **Framework**: React 18.x com TypeScript
- **Styling**: TailwindCSS + ShadCN/UI Components
- **State Management**: TanStack React Query
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Notifications**: Sonner

### **Backend**
- **Database**: Supabase Postgres
- **API**: Supabase Edge/REST
- **Authentication**: Supabase Auth
- **Email**: Sistema próprio de mailbox
- **Automations**: Sistema de automações integrado

- **Hosting**: Supabase
- **Domain**: app2.partnerb2b.com.br
- **SSL**: Certificado HTTPS configurado
- **Email Server**: Servidor de email integrado

## 📦 Estrutura Completa do Projeto

```
Partner-ads/
├── 📁 api/                          # Backend PHP APIs
│   ├── 🔐 Autenticação
│   │   ├── login.php                # Sistema de login
│   │   ├── register.php             # Registro de usuários
│   │   ├── logout.php               # Logout seguro
│   │   └── profiles.php             # Perfis de usuário
│   │
│   ├── 📧 Sistema de Email (Mailbox)
│   │   ├── mailbox_messages.php     # Mensagens de email
│   │   ├── mailbox_threads.php      # Threads de conversas
│   │   ├── mailbox_attachments.php  # Anexos de email
│   │   ├── mailbox_settings.php     # Configurações de email
│   │   ├── send_email.php           # Envio de emails
│   │   └── receive_emails.php       # Recebimento de emails
│   │
│   ├── 📋 Sistema de Tarefas
│   │   ├── tasks.php                # Gestão de tarefas
│   │   ├── task_comments.php        # Comentários em tarefas
│   │   ├── task_steps.php           # Etapas de tarefas
│   │   └── projects.php             # Gestão de projetos
│   │
│   ├── 🎫 Sistema de Tickets
│   │   ├── chamados.php             # Gestão de chamados
│   │   ├── chamados_mensagens.php   # Mensagens de chamados
│   │   └── upload_ticket_file.php   # Upload de arquivos
│   │
│   ├── 📱 WhatsApp Business
│   │   ├── whatsapp_campaigns.php   # Campanhas WhatsApp
│   │   ├── whatsapp_contacts.php    # Contatos WhatsApp
│   │   ├── whatsapp_messages.php    # Mensagens WhatsApp
│   │   └── whatsapp_templates.php   # Templates de mensagem
│   │
│   ├── 👥 Gestão de Clientes
│   │   ├── clientes.php             # CRUD de clientes
│   │   ├── client_permissions.php   # Permissões de clientes
│   │   └── client_report_permissions.php # Permissões de relatórios
│   │
│   ├── 🎯 Meta Ads
│   │   ├── meta_api_credentials.php # Credenciais Meta API
│   │   ├── criativos.php           # Gestão de criativos
│   │   └── upload_creative_file.php # Upload de criativos
│   │
│   ├── ⚙️ Automações
│   │   └── process_automations.php  # Processamento de automações
│   │
│   └── 🔧 Configurações
│       ├── settings.php             # Configurações gerais
│       ├── permission_templates.php # Templates de permissões
│       └── user_permissions.php     # Permissões de usuários
│
├── 📁 src/                          # Frontend React
│   ├── 📁 components/               # Componentes React
│   │   ├── 📧 mailbox/              # Sistema de Email
│   │   │   ├── 📁 mailbox/          # Interface de email
│   │   │   │   ├── MailboxTab.tsx   # Aba principal do mailbox
│   │   │   │   ├── MailboxList.tsx  # Lista de emails
│   │   │   │   ├── MailboxThread.tsx # Thread de conversas
│   │   │   │   ├── MailboxSidebar.tsx # Sidebar do mailbox
│   │   │   │   ├── MailboxSettings.tsx # Configurações
│   │   │   │   └── NewMessageModal.tsx # Novo email
│   │   │   │
│   │   │   └── 📁 automations/      # Sistema de Automações
│   │   │       ├── AutomationsTab.tsx # Aba de automações
│   │   │       ├── AutomationsList.tsx # Lista de automações
│   │   │       ├── AutomationForm.tsx # Formulário de automação
│   │   │       └── AutomationLogs.tsx # Logs de automações
│   │   │
│   │   ├── 📋 Tarefas/              # Sistema de Tarefas
│   │   │   ├── KanbanView.tsx       # Visualização Kanban
│   │   │   ├── CalendarView.tsx     # Visualização de calendário
│   │   │   ├── ListView.tsx         # Visualização em lista
│   │   │   ├── ManagerView.tsx      # Visão gerencial
│   │   │   ├── ProjectsView.tsx     # Visualização de projetos
│   │   │   ├── ProjectTasksView.tsx # Tarefas por projeto
│   │   │   ├── TaskCard.tsx         # Card de tarefa
│   │   │   ├── TaskModal.tsx        # Modal de tarefa
│   │   │   ├── TaskDetailsDrawer.tsx # Detalhes da tarefa
│   │   │   ├── ProjectModal.tsx     # Modal de projeto
│   │   │   ├── ProjectEditModal.tsx # Edição de projeto
│   │   │   ├── EditTaskModal.tsx    # Edição de tarefa
│   │   │   ├── TemplateModal.tsx    # Templates de workflow
│   │   │   ├── WorkflowsView.tsx    # Visualização de workflows
│   │   │   ├── TaskPriorityBadge.tsx # Badge de prioridade
│   │   │   └── TaskStatusBadge.tsx  # Badge de status
│   │   │
│   │   ├── 🎫 tickets/              # Sistema de Tickets
│   │   │   ├── TicketCard.tsx       # Card de ticket
│   │   │   ├── TicketDetailModalAdvanced.tsx # Detalhes avançados
│   │   │   ├── CreateTicketModalAdvanced.tsx # Criação avançada
│   │   │   ├── TicketFilters.tsx    # Filtros de tickets
│   │   │   ├── TicketStatusBadge.tsx # Badge de status
│   │   │   ├── TicketStepper.tsx    # Stepper de progresso
│   │   │   ├── TicketTimeline.tsx   # Timeline do ticket
│   │   │   └── ClientMessageForm.tsx # Formulário de mensagem
│   │   │
│   │   ├── 📱 whatsapp/             # WhatsApp Business
│   │   │   ├── WhatsAppDashboard.tsx # Dashboard WhatsApp
│   │   │   ├── WhatsAppConnectionCard.tsx # Status de conexão
│   │   │   ├── CampaignList.tsx     # Lista de campanhas
│   │   │   ├── ContactsTable.tsx    # Tabela de contatos
│   │   │   ├── MessagesTable.tsx    # Tabela de mensagens
│   │   │   ├── NewCampaignModal.tsx # Nova campanha
│   │   │   ├── NewContactModal.tsx  # Novo contato
│   │   │   ├── NewMessageModal.tsx  # Nova mensagem
│   │   │   ├── TemplateSelector.tsx # Seletor de templates
│   │   │   ├── ContactSelector.tsx  # Seletor de contatos
│   │   │   └── MessageFiltersModal.tsx # Filtros de mensagens
│   │   │
│   │   ├── 📊 dashboard/            # Dashboard Avançado
│   │   │   ├── MetricsGrid.tsx      # Grid de métricas
│   │   │   ├── MetricsOverview.tsx  # Visão geral de métricas
│   │   │   ├── CampaignCharts.tsx   # Gráficos de campanhas
│   │   │   ├── CampaignTable.tsx    # Tabela de campanhas
│   │   │   ├── CampaignLevel.tsx    # Nível de campanha
│   │   │   ├── AdSetLevel.tsx       # Nível de conjunto
│   │   │   ├── AdLevel.tsx          # Nível de anúncio
│   │   │   ├── FunnelVisualization.tsx # Visualização de funil
│   │   │   ├── DashboardHeader.tsx  # Cabeçalho do dashboard
│   │   │   ├── DashboardFilters.tsx # Filtros do dashboard
│   │   │   ├── RelatorioDailyTable.tsx # Relatório diário
│   │   │   └── ObservacoesTable.tsx # Tabela de observações
│   │   │
│   │   ├── 📈 reports/              # Sistema de Relatórios
│   │   │   ├── ReportsCharts.tsx    # Gráficos de relatórios
│   │   │   ├── ReportsTable.tsx     # Tabela de relatórios
│   │   │   ├── ReportsMetricsCards.tsx # Cards de métricas
│   │   │   └── FunnelVisualization.tsx # Visualização de funil
│   │   │
│   │   ├── 👥 collaborators/        # Gestão de Colaboradores
│   │   │   ├── CollaboratorsList.tsx # Lista de colaboradores
│   │   │   ├── CollaboratorRow.tsx  # Linha de colaborador
│   │   │   ├── CollaboratorsHeader.tsx # Cabeçalho
│   │   │   ├── CollaboratorsSearch.tsx # Busca
│   │   │   ├── LoadingSpinner.tsx   # Loading
│   │   │   └── AccessDenied.tsx     # Acesso negado
│   │   │
│   │   ├── 🔐 auth/                 # Autenticação
│   │   │   ├── AuthProvider.tsx     # Provider de autenticação
│   │   │   └── LoginForm.tsx        # Formulário de login
│   │   │
│   │   ├── 🎛️ dashboard_filters/    # Filtros do Dashboard
│   │   │   ├── AdvancedFilters.tsx  # Filtros avançados
│   │   │   ├── DateRangePicker.tsx  # Seletor de período
│   │   │   └── ItemLevelFilter.tsx  # Filtro por nível
│   │   │
│   │   ├── 🧭 dashboard_navigation/ # Navegação do Dashboard
│   │   │   ├── PlatformNavigation.tsx # Navegação por plataforma
│   │   │   └── SectionTabs.tsx      # Abas de seção
│   │   │
│   │   ├── 🎨 ui/                   # Componentes UI Base
│   │   │   ├── button.tsx           # Botões
│   │   │   ├── card.tsx             # Cards
│   │   │   ├── dialog.tsx           # Diálogos
│   │   │   ├── table.tsx            # Tabelas
│   │   │   ├── form.tsx             # Formulários
│   │   │   ├── input.tsx            # Inputs
│   │   │   ├── select.tsx           # Selects
│   │   │   ├── calendar.tsx         # Calendário
│   │   │   ├── chart.tsx            # Gráficos
│   │   │   ├── badge.tsx            # Badges
│   │   │   ├── avatar.tsx           # Avatares
│   │   │   ├── toast.tsx            # Notificações
│   │   │   ├── sidebar.tsx          # Sidebar
│   │   │   ├── tabs.tsx             # Abas
│   │   │   ├── accordion.tsx        # Acordeão
│   │   │   ├── dropdown-menu.tsx    # Dropdown
│   │   │   ├── popover.tsx          # Popover
│   │   │   ├── tooltip.tsx          # Tooltip
│   │   │   ├── progress.tsx         # Barra de progresso
│   │   │   ├── skeleton.tsx         # Loading skeleton
│   │   │   ├── switch.tsx           # Switch
│   │   │   ├── checkbox.tsx         # Checkbox
│   │   │   ├── radio-group.tsx      # Radio buttons
│   │   │   ├── slider.tsx           # Slider
│   │   │   ├── textarea.tsx         # Textarea
│   │   │   ├── scroll-area.tsx      # Área de scroll
│   │   │   ├── separator.tsx        # Separador
│   │   │   ├── sheet.tsx            # Sheet
│   │   │   ├── drawer.tsx           # Drawer
│   │   │   ├── alert.tsx            # Alertas
│   │   │   ├── alert-dialog.tsx     # Diálogo de alerta
│   │   │   ├── context-menu.tsx     # Menu de contexto
│   │   │   ├── hover-card.tsx       # Card de hover
│   │   │   ├── menubar.tsx          # Barra de menu
│   │   │   ├── navigation-menu.tsx  # Menu de navegação
│   │   │   ├── command.tsx          # Command palette
│   │   │   ├── pagination.tsx       # Paginação
│   │   │   ├── breadcrumb.tsx       # Breadcrumb
│   │   │   ├── carousel.tsx         # Carrossel
│   │   │   ├── collapsible.tsx      # Collapsible
│   │   │   ├── resizable.tsx        # Resizable
│   │   │   ├── toggle.tsx           # Toggle
│   │   │   ├── toggle-group.tsx     # Grupo de toggles
│   │   │   ├── aspect-ratio.tsx     # Aspect ratio
│   │   │   ├── input-otp.tsx        # Input OTP
│   │   │   ├── date-picker.tsx      # Date picker
│   │   │   ├── theme-toggle.tsx     # Toggle de tema
│   │   │   └── use-toast.ts         # Hook de toast
│   │   │
│   │   └── 🔧 Componentes Gerais
│   │       ├── Header.tsx           # Cabeçalho principal
│   │       ├── Sidebar.tsx          # Sidebar principal
│   │       ├── Dashboard.tsx        # Dashboard principal
│   │       ├── UserMenu.tsx         # Menu do usuário
│   │       ├── ThemeToggle.tsx      # Toggle de tema
│   │       ├── GlobalSearch.tsx     # Busca global
│   │       ├── QuickCreateButton.tsx # Botão de criação rápida
│   │       ├── EmergencyLogout.tsx  # Logout de emergência
│   │       ├── ProtectedRoute.tsx   # Rota protegida
│   │       ├── AuthWrapper.tsx      # Wrapper de autenticação
│   │       ├── LoginForm.tsx        # Formulário de login
│   │       ├── ResetPasswordForm.tsx # Reset de senha
│   │       ├── UserAvatarSelect.tsx # Seletor de avatar
│   │       ├── ClientGreeting.tsx   # Saudação do cliente
│   │       ├── ActivityLog.tsx      # Log de atividades
│   │       ├── ApiMonitoring.tsx    # Monitoramento de API
│   │       ├── MetaApiSettings.tsx  # Configurações Meta API
│   │       ├── MetaApiManagement.tsx # Gestão Meta API
│   │       ├── DataManagement.tsx   # Gestão de dados
│   │       ├── MetricsCustomization.tsx # Customização de métricas
│   │       ├── SettingsTab.tsx      # Aba de configurações
│   │       ├── CollaboratorsManagement.tsx # Gestão de colaboradores
│   │       ├── ClientsManagementTab.tsx # Gestão de clientes
│   │       ├── ClientPermissionsManager.tsx # Permissões de clientes
│   │       ├── PermissionTemplatesManagement.tsx # Templates de permissões
│   │       ├── CreateClientModal.tsx # Criar cliente
│   │       ├── EditClientModal.tsx  # Editar cliente
│   │       ├── ResetClientPasswordModal.tsx # Reset senha cliente
│   │       ├── CreateCollaboratorModal.tsx # Criar colaborador
│   │       ├── EditCollaboratorModal.tsx # Editar colaborador
│   │       ├── CreateTicketModal.tsx # Criar ticket
│   │       ├── TicketDetailModal.tsx # Detalhes do ticket
│   │       ├── TicketsTab.tsx       # Aba de tickets
│   │       ├── TicketsTabAdvanced.tsx # Tickets avançados
│   │       ├── CreativesTab.tsx     # Aba de criativos
│   │       ├── CreativeDetailModal.tsx # Detalhes do criativo
│   │       ├── UploadCreativeModal.tsx # Upload de criativo
│   │       ├── CampaignsTab.tsx     # Aba de campanhas
│   │       ├── AdSetsTab.tsx        # Aba de conjuntos
│   │       ├── AdsTab.tsx           # Aba de anúncios
│   │       ├── CreateCampaignModal.tsx # Criar campanha
│   │       ├── EditCampaignModal.tsx # Editar campanha
│   │       ├── CreateAdSetModal.tsx # Criar conjunto
│   │       ├── EditAdSetModal.tsx   # Editar conjunto
│   │       ├── CreateAdModal.tsx    # Criar anúncio
│   │       ├── EditAdModal.tsx      # Editar anúncio
│   │       ├── RelatoriosTab.tsx    # Aba de relatórios
│   │       ├── ResultadosTab.tsx    # Aba de resultados
│   │       ├── WhatsAppReportsTab.tsx # Relatórios WhatsApp
│   │       ├── MetricsObjectivesTab.tsx # Métricas e objetivos
│   │       ├── AccountFilter.tsx    # Filtro de conta
│   │       ├── CollapsibleAccountFilter.tsx # Filtro recolhível
│   │       ├── SelectedAccountDisplay.tsx # Exibição da conta
│   │       ├── DateRangeFilter.tsx  # Filtro de período
│   │       ├── AdvancedFilters.tsx  # Filtros avançados
│   │       ├── DynamicFilters.tsx   # Filtros dinâmicos
│   │       ├── HierarchicalFilter.tsx # Filtro hierárquico
│   │       └── TableColumnConfig.tsx # Configuração de colunas
│   │
│   ├── 📁 hooks/                    # Custom React Hooks
│   │   ├── 🔐 Autenticação
│   │   │   ├── useAuth.tsx          # Hook de autenticação
│   │   │   ├── useAuthActions.tsx   # Ações de autenticação
│   │   │   ├── useUserProfile.tsx   # Perfil do usuário
│   │   │   ├── useUserAccess.tsx    # Acesso do usuário
│   │   │   ├── usePermissions.tsx   # Permissões
│   │   │   └── useUserPermissions.tsx # Permissões do usuário
│   │   │
│   │   ├── 📧 Sistema de Email
│   │   │   ├── useMailboxMessages.ts # Mensagens do mailbox
│   │   │   ├── useMailboxThread.ts  # Thread do mailbox
│   │   │   └── useMailboxSettings.ts # Configurações do mailbox
│   │   │
│   │   ├── 📋 Sistema de Tarefas
│   │   │   ├── useTasks.ts          # Hook de tarefas
│   │   │   ├── useProjects.ts       # Hook de projetos
│   │   │   ├── useComments.ts       # Hook de comentários
│   │   │   ├── useProjectById.ts    # Projeto por ID
│   │   │   ├── useDeleteProject.ts  # Deletar projeto
│   │   │   ├── useWorkflowTemplates.ts # Templates de workflow
│   │   │   ├── useClients.ts        # Hook de clientes
│   │   │   └── useTaskSteps.tsx     # Etapas de tarefas
│   │   │
│   │   ├── 📊 Dashboard
│   │   │   ├── useAnalyticsData.ts  # Dados de analytics
│   │   │   ├── useClientManager.ts  # Gerenciador de clientes
│   │   │   ├── useDataSelector.ts   # Seletor de dados
│   │   │   ├── useFilters.tsx       # Filtros
│   │   │   ├── useHierarchicalData.ts # Dados hierárquicos
│   │   │   ├── useHierarchicalNavigation.ts # Navegação hierárquica
│   │   │   ├── useMetaData.ts       # Dados Meta
│   │   │   ├── usePlatformNavigation.ts # Navegação por plataforma
│   │   │   ├── useSettings.tsx      # Configurações
│   │   │   ├── useSheetData.ts      # Dados de planilha
│   │   │   └── useTheme.tsx         # Tema
│   │   │
│   │   ├── 📱 WhatsApp
│   │   │   ├── useWhatsAppConfig.ts # Configurações WhatsApp
│   │   │   ├── useWhatsAppContacts.ts # Contatos WhatsApp
│   │   │   ├── useWhatsAppMessages.ts # Mensagens WhatsApp
│   │   │   └── useWhatsAppTemplates.ts # Templates WhatsApp
│   │   │
│   │   ├── 📈 Relatórios
│   │   │   └── usePlatformNavigation.ts # Navegação por plataforma
│   │   │
│   │   └── 🔧 Hooks Gerais
│   │       ├── use-mobile.tsx       # Hook mobile
│   │       ├── use-toast.ts         # Hook de toast
│   │       ├── useAccountInsights.tsx # Insights de conta
│   │       ├── useActivityLog.tsx   # Log de atividades
│   │       ├── useClientes.ts       # Clientes
│   │       ├── useClientPermissions.tsx # Permissões de clientes
│   │       ├── useCollaborators.tsx # Colaboradores
│   │       ├── useDateRange.tsx     # Período de datas
│   │       ├── useGlobalAdAccount.tsx # Conta global de anúncios
│   │       ├── useInsights.tsx      # Insights
│   │       ├── useMetaData.tsx      # Dados Meta
│   │       ├── useMetricsConfig.tsx # Configuração de métricas
│   │       ├── useSheetData.ts      # Dados de planilha
│   │       └── useSystemLog.tsx     # Log do sistema
│   │
│   ├── 📁 lib/                      # Bibliotecas e Utilitários
│   │   ├── 📊 Dashboard
│   │   │   ├── analyticsApi.ts      # API de analytics
│   │   │   ├── clients.ts           # Clientes
│   │   │   ├── integrations.ts      # Integrações
│   │   │   ├── metaApi.ts           # Meta API
│   │   │   └── utils.ts             # Utilitários
│   │   │
│   │   ├── 📧 Mailbox
│   │   │   └── utils.ts             # Utilitários do mailbox
│   │   │
│   │   └── 🔧 Bibliotecas Gerais
│   │       ├── metaApi.ts           # Meta API
│   │       ├── metaApiWithRateLimit.ts # Meta API com rate limit
│   │       ├── metaInsights.ts      # Insights Meta
│   │       ├── rateLimit.ts         # Rate limiting
│   │       └── utils.ts             # Utilitários gerais
│   │
│   ├── 📁 pages/                    # Páginas da Aplicação
│   │   ├── Index.tsx                # Página inicial
│   │   ├── NotFound.tsx             # Página 404
│   │   ├── Resultados.tsx           # Página de resultados
│   │   ├── MetricsObjectivesTab.tsx # Métricas e objetivos
│   │   ├── WhatsAppReportsTab.tsx   # Relatórios WhatsApp
│   │   ├── objetivos-metricas.tsx   # Objetivos e métricas
│   │   └── 📁 Desativados/          # Páginas desativadas
│   │
│   ├── 📁 services/                 # Serviços
│   │   └── 📧 mailbox/
│   │       └── api.ts               # API do mailbox
│   │
│   ├── 📁 types/                    # Definições TypeScript
│   │   ├── auth.ts                  # Tipos de autenticação
│   │   ├── database.ts              # Tipos do banco de dados
│   │   ├── mailbox.ts               # Tipos do mailbox
│   │   └── task.ts                  # Tipos de tarefas
│   │
│   ├── 📁 utils/                    # Utilitários
│   │   ├── metricsMap.ts            # Mapeamento de métricas
│   │   ├── permissionUtils.ts       # Utilitários de permissões
│   │   └── seedActivityLogs.ts      # Seed de logs de atividade
│   │
│   └── 📁 integrations/             # Integrações
│       └── apiClient.ts             # Cliente de API
│
├── 📁 MySQL/                        # Banco de Dados
│   └── informacao-do-banco-de-dados.sql # Schema completo
│
├── 📁 supabase/functions/           # Funções Serverless
│   ├── process-automations/         # Processamento de automações
│   ├── receive-emails/              # Recebimento de emails
│   └── send-email/                  # Envio de emails
│
├── 📁 dist/                         # Build de produção
├── 📁 public/                       # Assets estáticos
└── 📁 .vercel/                      # Configurações Vercel
```

## 🔐 Sistema de Autenticação e Permissões

### **Autenticação Multi-nível**
- **JWT Tokens**: Autenticação baseada em tokens seguros
- **Session Management**: Controle de sessões ativas
- **Password Hashing**: Senhas criptografadas com bcrypt
- **Multi-level Access**: Usuários, Colaboradores e Clientes
- **Emergency Logout**: Sistema de logout de emergência

### **Sistema de Permissões Granulares**
```typescript
const permissions = [
  // Dashboard e Analytics
  'access_dashboard',
  'view_analytics',
  'export_reports',
  
  // Sistema de Email (Mailbox)
  'access_mailbox',
  'send_emails',
  'manage_email_settings',
  'view_email_automations',
  'create_email_automations',
  
  // Sistema de Tarefas
  'access_tasks',
  'create_tasks',
  'edit_tasks',
  'delete_tasks',
  'manage_projects',
  'view_all_tasks',
  'assign_tasks',
  
  // Sistema de Tickets
  'access_tickets',
  'create_tickets',
  'manage_tickets',
  'view_all_tickets',
  'close_tickets',
  
  // WhatsApp Business
  'access_whatsapp',
  'send_whatsapp',
  'manage_whatsapp_campaigns',
  'view_whatsapp_analytics',
  
  // Meta Ads
  'access_campaigns',
  'create_campaigns',
  'edit_campaigns',
  'view_campaign_insights',
  'manage_creatives',
  
  // Gestão de Clientes
  'manage_clients',
  'view_clients',
  'edit_client_permissions',
  'reset_client_passwords',
  
  // Administração
  'manage_collaborators',
  'view_system_logs',
  'manage_user_settings',
  'admin_settings',
  'manage_permissions',
  'view_all_data'
];
```

## 📧 Sistema de Email (Mailbox) - Módulo Principal

### **Funcionalidades Completas**
- **📥 Caixa de Entrada**: Recebimento e organização de emails
- **📤 Envio de Emails**: Sistema completo de envio
- **🧵 Threads**: Conversas organizadas por thread
- **📎 Anexos**: Gestão completa de anexos
- **⚙️ Configurações**: Configurações personalizáveis
- **🤖 Automações**: Sistema avançado de automações de email

### **Automações de Email**
```typescript
interface EmailAutomation {
  id: string;
  name: string;
  trigger: 'new_client' | 'task_completed' | 'ticket_created' | 'custom';
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  schedule?: CronExpression;
  active: boolean;
}
```

### **APIs do Mailbox**
- **mailbox_messages.php**: Gestão de mensagens
- **mailbox_threads.php**: Gestão de threads
- **mailbox_attachments.php**: Gestão de anexos
- **mailbox_settings.php**: Configurações
- **send_email.php**: Envio de emails
- **receive_emails.php**: Recebimento de emails

## 📋 Sistema de Tarefas - Gestão Completa de Projetos

### **Visualizações Múltiplas**
- **🗂️ Kanban**: Visualização em quadros Kanban
- **📅 Calendário**: Visualização de calendário
- **📝 Lista**: Visualização em lista
- **👨‍💼 Gerencial**: Visão gerencial com métricas
- **📊 Projetos**: Gestão completa de projetos

### **Funcionalidades Avançadas**
- **🔄 Workflows**: Templates de workflow personalizáveis
- **💬 Comentários**: Sistema de comentários em tarefas
- **📋 Etapas**: Divisão de tarefas em etapas
- **🏷️ Prioridades**: Sistema de prioridades
- **📊 Status**: Controle de status avançado
- **👥 Atribuição**: Atribuição de tarefas para colaboradores

### **Gestão de Projetos**
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date: Date;
  end_date: Date;
  tasks: Task[];
  team_members: User[];
  progress: number;
}
```

## 🎫 Sistema de Tickets - Central de Suporte Avançada

### **Funcionalidades Completas**
- **🎫 Gestão de Tickets**: Criação, edição, fechamento
- **💬 Mensagens**: Sistema de mensagens por ticket
- **📎 Anexos**: Upload de arquivos nos tickets
- **🔄 Status**: Controle avançado de status
- **📊 Prioridades**: Sistema de prioridades
- **📈 Analytics**: Métricas de atendimento

### **Workflow de Tickets**
```typescript
interface Ticket {
  id: string;
  title: string;
  description: string;
  client_id: string;
  assigned_to: string;
  status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created_at: Date;
  updated_at: Date;
  messages: TicketMessage[];
  attachments: TicketAttachment[];
}
```

## 📱 WhatsApp Business - Campanhas e Automações

### **Funcionalidades Completas**
- **📊 Dashboard**: Métricas em tempo real
- **🔗 Conexão**: Status de conexão com WhatsApp Business API
- **📋 Campanhas**: Criação e gestão de campanhas
- **👥 Contatos**: Gestão completa de contatos
- **💬 Mensagens**: Envio e recebimento de mensagens
- **📝 Templates**: Gestão de templates de mensagem

### **APIs WhatsApp**
- **whatsapp_campaigns.php**: Gestão de campanhas
- **whatsapp_contacts.php**: Gestão de contatos
- **whatsapp_messages.php**: Gestão de mensagens
- **whatsapp_templates.php**: Gestão de templates

## 🎯 Meta Ads - Gestão Completa de Campanhas

### **Hierarquia Completa**
- **📊 Campanhas**: Nível superior de organização
- **📋 Conjuntos de Anúncios**: Segmentação e orçamento
- **🎨 Anúncios**: Criativos individuais
- **📈 Insights**: Métricas detalhadas

### **Gestão de Criativos**
- **📁 Upload**: Sistema de upload seguro
- **✅ Aprovação**: Workflow de aprovação
- **📊 Performance**: Métricas por criativo
- **🔄 Versionamento**: Controle de versões

## 📊 Dashboard e Analytics

### **Métricas Principais**
```typescript
interface Metrics {
  // Performance
  impressions: number;
  clicks: number;
  ctr: number;
  
  // Custos
  spend: number;
  cpc: number;
  cpm: number;
  cpa: number;
  
  // Conversões
  conversions: number;
  conversion_rate: number;
  roas: number;
  
  // Engajamento
  likes: number;
  comments: number;
  shares: number;
  
  // Vídeo
  video_views: number;
  video_completion_rate: number;
}
```

### **Visualizações Avançadas**
- **📊 Gráficos**: Charts interativos
- **📈 Funil**: Visualização de funil de conversão
- **📋 Tabelas**: Tabelas dinâmicas
- **🎯 Cards**: Cards de métricas
- **📅 Timeline**: Análise temporal

## 🗄️ Estrutura do Banco de Dados MySQL

### **Tabelas Principais (50+ tabelas)**

```sql
-- 🔐 Autenticação e Usuários
users                    # Usuários do sistema
auth_tokens             # Tokens de autenticação
user_permissions        # Permissões granulares
collaborators          # Colaboradores
clients                # Clientes

-- 📧 Sistema de Email (Mailbox)
mailbox_messages        # Mensagens de email
mailbox_threads         # Threads de conversas
mailbox_attachments     # Anexos de email
mailbox_settings        # Configurações de email
email_automations       # Automações de email
automation_logs         # Logs de automações

-- 📋 Sistema de Tarefas
tasks                   # Tarefas
projects               # Projetos
task_comments          # Comentários em tarefas
task_steps             # Etapas de tarefas
workflow_templates     # Templates de workflow
project_members        # Membros do projeto

-- 🎫 Sistema de Tickets
tickets                # Tickets/Chamados
ticket_messages        # Mensagens dos tickets
ticket_attachments     # Anexos dos tickets
ticket_categories      # Categorias de tickets

-- 📱 WhatsApp Business
whatsapp_campaigns     # Campanhas WhatsApp
whatsapp_messages      # Mensagens WhatsApp
whatsapp_contacts      # Contatos WhatsApp
whatsapp_templates     # Templates de mensagem
whatsapp_automations   # Automações WhatsApp

-- 🎯 Meta Ads
campaigns              # Campanhas Meta Ads
ad_sets               # Conjuntos de anúncios
ads                   # Anúncios individuais
ad_accounts           # Contas de anúncios Meta
creatives             # Criativos
creative_files        # Arquivos de criativos

-- 📊 Analytics e Relatórios
campaign_insights      # Insights de campanhas
daily_reports         # Relatórios diários
custom_reports        # Relatórios customizados
metrics_config        # Configuração de métricas

-- ⚙️ Configurações e Logs
settings              # Configurações globais
activity_logs         # Log de atividades
system_logs          # Logs do sistema
api_usage_logs       # Logs de uso da API
permission_templates  # Templates de permissões

-- 🔗 Relacionamentos e Permissões
client_permissions    # Permissões específicas de clientes
client_report_permissions # Permissões de relatórios
user_project_access   # Acesso de usuários a projetos
task_assignments     # Atribuições de tarefas
```

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- Node.js 18+
- PHP 8.0+
- MySQL 8.0+
- Servidor de email (para mailbox)
- Composer (para dependências PHP)

### **1. Clone e Instalação**
```bash
git clone https://github.com/b2bot/Partner-ads.git
cd Partner-ads
npm install
```

### **2. Configuração do Banco de Dados**
```bash
mysql -u username -p database_name < MySQL/informacao-do-banco-de-dados.sql
```

### **3. Configuração das Variáveis de Ambiente**
```env
# API Configuration
VITE_API_URL=https://app2.partnerb2b.com.br

# Database
DB_HOST=localhost
DB_NAME=app2partnerb2b
DB_USER=your_db_user
DB_PASS=your_db_password

# Meta API
VITE_META_APP_ID=your_meta_app_id
VITE_META_APP_SECRET=your_meta_app_secret

# WhatsApp Business API
WHATSAPP_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_ID=your_phone_id

# Email Server (Mailbox)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
IMAP_HOST=your_imap_host
IMAP_PORT=993

# Automations
AUTOMATION_SECRET_KEY=your_automation_key
CRON_ENABLED=true
```

### **4. Build e Deploy**
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
```

## 🔧 APIs Completas

### **APIs de Autenticação**
```
POST /api/login.php              # Login
POST /api/register.php           # Registro
POST /api/logout.php             # Logout
GET  /api/profiles.php           # Perfil do usuário
GET  /api/user_permissions.php   # Permissões
```

### **APIs do Mailbox**
```
GET    /api/mailbox_messages.php     # Listar mensagens
POST   /api/mailbox_messages.php     # Criar mensagem
GET    /api/mailbox_threads.php      # Listar threads
POST   /api/send_email.php           # Enviar email
POST   /api/receive_emails.php       # Receber emails
GET    /api/mailbox_attachments.php  # Listar anexos
POST   /api/mailbox_attachments.php  # Upload anexo
GET    /api/mailbox_settings.php     # Configurações
PUT    /api/mailbox_settings.php     # Atualizar configurações
```

### **APIs de Tarefas**
```
GET    /api/tasks.php            # Listar tarefas
POST   /api/tasks.php            # Criar tarefa
PUT    /api/tasks.php            # Atualizar tarefa
DELETE /api/tasks.php            # Deletar tarefa
GET    /api/projects.php         # Listar projetos
POST   /api/projects.php         # Criar projeto
GET    /api/task_comments.php    # Comentários
POST   /api/task_comments.php    # Adicionar comentário
GET    /api/task_steps.php       # Etapas da tarefa
POST   /api/task_steps.php       # Criar etapa
```

### **APIs de Tickets**
```
GET    /api/chamados.php         # Listar tickets
POST   /api/chamados.php         # Criar ticket
PUT    /api/chamados.php         # Atualizar ticket
GET    /api/chamados_mensagens.php # Mensagens do ticket
POST   /api/chamados_mensagens.php # Adicionar mensagem
POST   /api/upload_ticket_file.php # Upload arquivo
```

### **APIs WhatsApp**
```
GET    /api/whatsapp_campaigns.php  # Campanhas
POST   /api/whatsapp_campaigns.php  # Criar campanha
GET    /api/whatsapp_contacts.php   # Contatos
POST   /api/whatsapp_contacts.php   # Adicionar contato
GET    /api/whatsapp_messages.php   # Mensagens
POST   /api/whatsapp_messages.php   # Enviar mensagem
GET    /api/whatsapp_templates.php  # Templates
POST   /api/whatsapp_templates.php  # Criar template
```

### **APIs de Automações**
```
GET    /api/process_automations.php # Listar automações
POST   /api/process_automations.php # Criar automação
PUT    /api/process_automations.php # Atualizar automação
DELETE /api/process_automations.php # Deletar automação
```

## 🎨 Design System Premium

### **Paleta de Cores Completa**
```css
/* Cores principais */
--primary: #6366f1        /* Indigo */
--primary-foreground: #ffffff
--secondary: #8b5cf6      /* Violet */
--secondary-foreground: #ffffff
--accent: #06b6d4         /* Cyan */
--accent-foreground: #ffffff

/* Status colors */
--success: #10b981        /* Emerald */
--warning: #f59e0b        /* Amber */
--error: #ef4444          /* Red */
--info: #3b82f6           /* Blue */

/* Tons de cinza */
--background: #ffffff
--foreground: #0f172a
--muted: #f1f5f9
--muted-foreground: #64748b
--border: #e2e8f0
--input: #ffffff
--ring: #6366f1

/* Dark mode */
--dark-background: #0f172a
--dark-foreground: #f8fafc
--dark-muted: #1e293b
--dark-border: #334155
```

### **Componentes Premium**
- **Glassmorphism**: Efeitos de vidro translúcido
- **Gradientes**: Transições suaves de cores
- **Sombras**: Sistema de elevação
- **Animações**: Transições fluidas
- **Responsividade**: Design mobile-first
- **Dark Mode**: Tema escuro completo

## 📊 Métricas e KPIs

### **Métricas do Sistema**
- **👥 Usuários Ativos**: Usuários logados no sistema
- **📧 Emails Processados**: Emails enviados/recebidos
- **📋 Tarefas Completadas**: Taxa de conclusão de tarefas
- **🎫 Tickets Resolvidos**: Taxa de resolução de tickets
- **📱 Mensagens WhatsApp**: Volume de mensagens
- **🎯 Performance de Campanhas**: ROI e ROAS
- **⚡ Performance do Sistema**: Tempo de resposta
- **🔒 Segurança**: Tentativas de login, acessos

### **Analytics Avançados**
- **📈 Dashboards Personalizáveis**: Por usuário/cliente
- **📊 Relatórios Automáticos**: Geração automática
- **🎯 Funil de Conversão**: Análise de funil
- **📅 Análise Temporal**: Tendências e sazonalidade
- **🔍 Drill-down**: Análise detalhada
- **📤 Exportação**: PDF, Excel, CSV

## 🔒 Segurança e Compliance

### **Medidas de Segurança**
- **🔐 HTTPS**: Comunicação criptografada
- **🔑 JWT**: Tokens seguros com expiração
- **🛡️ CORS**: Controle de origem rigoroso
- **💉 SQL Injection**: Prepared statements
- **🚫 XSS**: Sanitização de inputs
- **🔒 CSRF**: Proteção contra ataques
- **📝 Logs**: Auditoria completa
- **🔄 Backup**: Backup automático
- **🚨 Monitoramento**: Alertas de segurança

### **Compliance**
- **LGPD**: Conformidade com LGPD
- **GDPR**: Conformidade com GDPR
- **ISO 27001**: Práticas de segurança
- **SOC 2**: Controles de segurança

## 🚀 Performance e Escalabilidade

### **Otimizações Implementadas**
- **⚡ Cache Redis**: Cache de dados frequentes
- **🔄 Rate Limiting**: Controle de chamadas API
- **📦 Lazy Loading**: Carregamento sob demanda
- **✂️ Code Splitting**: Divisão do código
- **🖼️ Image Optimization**: Otimização automática
- **📱 PWA**: Progressive Web App
- **🗜️ Compression**: Compressão de assets
- **📊 CDN**: Content Delivery Network

### **Monitoramento**
- **📈 APM**: Application Performance Monitoring
- **📊 Metrics**: Métricas de performance
- **🚨 Alerts**: Alertas automáticos
- **📝 Logs**: Logs centralizados
- **🔍 Tracing**: Rastreamento de requisições

## 🧪 Testes e Qualidade

### **Cobertura de Testes**
```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

### **Ferramentas de Qualidade**
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **TypeScript**: Tipagem estática
- **Vitest**: Framework de testes
- **Playwright**: Testes E2E
- **Husky**: Git hooks
- **Commitlint**: Conventional commits

## 🌐 Deploy e Produção

### **Ambiente de Produção**
- **URL**: https://app2.partnerb2b.com.br
- **Servidor**: Hostoo (srv-200-9-22-2)
- **SSL**: Certificado válido
- **CDN**: Otimização de assets
- **Backup**: Backup automático diário
- **Monitoring**: Uptime monitoring

### **CI/CD Pipeline**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

## 📚 Documentação e Suporte

### **Documentação Técnica**
- **📖 API Documentation**: Swagger/OpenAPI
- **🧩 Component Library**: Storybook
- **🔗 Hooks Reference**: Documentação dos hooks
- **🗄️ Database Schema**: Diagrama ER
- **🏗️ Architecture**: Diagramas de arquitetura

### **Documentação do Usuário**
- **📘 Manual do Usuário**: Guia completo
- **🎥 Video Tutorials**: Tutoriais em vídeo
- **❓ FAQ**: Perguntas frequentes
- **🆘 Support**: Canal de suporte

## 🤝 Contribuição e Desenvolvimento

### **Padrões de Desenvolvimento**
```bash
# Estrutura de commits
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração
test: adiciona testes
chore: tarefas de manutenção
```

### **Workflow de Desenvolvimento**
1. **Fork** do repositório
2. **Branch** para feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** das mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para branch (`git push origin feature/nova-funcionalidade`)
5. **Pull Request** com descrição detalhada

## 📞 Suporte e Contato

### **Canais de Suporte**
- **📧 Email**: suporte@partnerb2b.com.br
- **🎫 Tickets**: Sistema interno de tickets
- **📚 Documentation**: Wiki do projeto
- **💬 Community**: Discord/Slack

### **Equipe de Desenvolvimento**
- **👨‍💻 Lead Developer**: @b2bot
- **⚛️ Frontend Team**: React/TypeScript specialists
- **🐘 Backend Team**: PHP/MySQL experts
- **🚀 DevOps Team**: Infrastructure management
- **🎨 Design Team**: UI/UX designers

## 📄 Licença e Propriedade

Este projeto é propriedade privada da **Partner B2B**. Todos os direitos reservados.

### **Tecnologias Utilizadas**
- React 18.x
- TypeScript 5.x
- TailwindCSS 3.x
- ShadCN/UI
- TanStack React Query
- Vite 5.x
- PHP 8.x
- MySQL 8.0
- Lucide React
- Sonner

---

**🚀 Meta Ads Pro Manager** - A plataforma empresarial mais completa para gestão de campanhas, projetos, emails, tarefas e muito mais. Transformando a gestão empresarial com tecnologia de ponta e experiência excepcional.

*Última atualização: Julho 2025*
*Versão: 2.0.0*
*Build: Production Ready*

