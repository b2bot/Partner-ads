🧠 VISÃO DETALHADA DO PROJETO
🧱 Estrutura Geral
Stack Principal:
Frontend: React (com TailwindCSS)


Backend/DB: Supabase


Query Layer: React Query


UI Components: ShadCN/UI + Lucide Icons


State Management: useQuery, useMutation, useQueryClient (da React Query)


Notificações: Sonner


Armazenamento & APIs: Supabase como backend + integração com Meta API

Stack e Ferramentas:
Frontend: React + TailwindCSS (UI visivelmente montada com shadcn/ui)


Backend/API:


Supabase


Chamada direta à Meta Ads API (via settings.ts, storeKey.ts, testConnection.ts)


Build/Dev Tools:


Vite


TypeScript


PostCSS


ESLint


Vitest (testes unitários com arquivos .test.ts)


Gerenciamento de Estado e API Cache:


Tanstack React Query


Outros libs chave detectados:


lucide-react, sonner, react-hook-form, class-variance-authority, react-day-picker, radix-ui libs




🗺️ Fluxo de Uso
1. Configurações (Admin)
🧩 Aba 1: Gestão da API Meta
Objetivo: Validar, visualizar e configurar a conexão com a Meta API.


Exibe:


App ID


Status de conexão


Última verificação


Controle de chamadas por hora (rate limit)


Cache e reset automático


🧩 Aba 2: Gestão de Dados
Objetivo: Gerenciar a conta de anúncios padrão e personalizar as métricas visíveis nas páginas operacionais.


Configurações disponíveis:


Conta Principal de Anúncio (dropdown com lista de contas vinculadas)


Métricas por Página: Dashboard, Campanhas, Conjuntos, Anúncios


Categorias de métricas:


Performance (Impressões, Cliques, etc.)
Conversões (Resultados, Leads)
Custos (CPC, CPM, CPA, etc.)
Engajamento (Reações, Curtidas)
Vídeo (Visualizações, Reproduções)
Tráfego (Cliques externos, em links)



Partner Ads Pro - README.md
✨ Visão Geral
Partner Ads Pro é um sistema completo de gestão de campanhas, criativos, métricas e relatórios publicitários, com integração direta ao Meta Ads e gestão de comunicação via WhatsApp. Ele é pensado para times de mídia paga, gestores de tráfego e agências.
🌐 Tecnologias Principais
React + TypeScript
Vite
Supabase (auth e banco de dados)
React Router DOM
TailwindCSS
Tanstack Query
Lucide Icons

🌎 Estrutura Geral de Pastas
src/components/
Contém a maioria dos componentes compartilhados e modulares, separados por tipo ou função:
dashboard/: componentes da página de métricas (novo dashboard modularizado)
ui/: componentes de UI (buttons, cards, toasts, inputs...)
dashboard.ui/: UI personalizada para o dashboard
tickets/: componentes para chamados
whatsapp/: gestão de mensagens e campanhas WhatsApp
src/hooks/
Contém hooks reutilizáveis para controle de autenticação, permissões, dados do Meta, etc.
dashboard_hooks/: hooks exclusivos para o novo dashboard (index/métricas)
src/pages/
Contém as rotas principais:
Index.tsx: página principal que renderiza o sistema com tabs
dashboard/Index.tsx: novo dashboard ("Métricas")
NotFound.tsx: rota fallback
src/lib/ e src/integrations/
lib/: funções auxiliares, integrações e chamadas a APIs (Meta, etc.)
integrations/supabase/: client e tipos do Supabase
supabase/
Contém o config.toml para configuração de policies e projetos do Supabase

🔍 Funcionalidades por Seção
▶ Dashboard (Principal)
Visualização geral de campanhas ativas, impressões, gastos e log de atividades
📊 Métricas (Nova página)
Charts, Tabelas e KPIs organizados por Ad / Adset / Campaign
Hierarquia por cliente + conta + campanha
Filtros avançados e granularidade
📉 Métricas e Objetivos
Definição de KPIs, metas e configurações personalizadas
📰 WhatsApp
Gestão de contatos, campanhas e mensagens
Conexão com conta do WhatsApp Business
📆 Chamados
Criação e gestão de chamados por cliente/admin
Status com RLS seguro e detalhado
👥 Colaboradores e Clientes
CRUD de colaboradores e permissões (inclusive templates)
CRUD de clientes e contas
🌟 Criativos
Upload e organização de criativos com detalhes por campanha
⚙ Configurações
Integrações com API, controle de acesso e logs de sistema

🚀 Como Rodar Localmente
Instale dependências (caso erro de peer, use --legacy-peer-deps ou --force):
npm install --legacy-peer-deps

Rode o projeto:
npm run dev

URL de acesso:
http://localhost:5173

🔒 Controle de Acesso
O projeto usa permissões baseadas em RLS via Supabase. As principais permissoes são:
access_dashboard
access_paid_media
access_tasks
access_whatsapp
manage_user_settings, manage_collaborators, etc.

🔍 Navegação
O sistema tem duas formas de renderização de páginas:
Via activeTab no Index.tsx (tabs internas)
Via React Router (/metricas, /notfound, etc.)
⚡ A página de Métricas (dashboard/Index.tsx) é acessada pela rota /metricas

🚨 Considerações
O sistema é modular, responsivo e seguro
Toda a lógica de permissão está baseada no useAuth + Supabase
Vários componentes e hooks foram desacoplados para reuso

🚀 Roadmap

🙌 Colaboração
Pull Requests são bem-vindos! Organize-se pelo roadmap e issues, ou fale com a equipe técnica.



🌐 Estrutura


C:.
|   .env
|   bun.lockb
|   components.json
|   eslint.config.js
|   estrutura.txt
|   estruturapartner.txt
|   index.html
|   package-lock.json
|   package.json
|   postcss.config.js
|   README.md
|   tailwind.config.ts
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|   
+---api
|       settings.ts

+---public
|       favicon.ico
|       placeholder.svg
|       robots.txt
|       
+---src
|   |   antigo_index.css
|   |   App.css
|   |   App.tsx
|   |   index.css
|   |   main.tsx
|   |   vite-env.d.ts
|   |   
|   +---components
|   |   |   AccountFilter.tsx
|   |   |   ActivityLog.tsx
|   |   |   AdSetsTab.tsx
|   |   |   AdsTab.tsx
|   |   |   AdvancedFilters.tsx
|   |   |   ApiMonitoring.tsx
|   |   |   AuthWrapper.tsx
|   |   |   CampaignsTab.tsx
|   |   |   ClientGreeting.tsx
|   |   |   ClientsManagementTab.tsx
|   |   |   CollaboratorsManagement.tsx
|   |   |   CollapsibleAccountFilter.tsx
|   |   |   CreateAdModal.tsx
|   |   |   CreateAdSetModal.tsx
|   |   |   CreateCampaignModal.tsx
|   |   |   CreateClientModal.tsx
|   |   |   CreateCollaboratorModal.tsx
|   |   |   CreateTicketModal.tsx
|   |   |   CreativeDetailModal.tsx
|   |   |   CreativesTab.tsx
|   |   |   Dashboard.tsx
|   |   |   DataManagement.tsx
|   |   |   DateRangeFilter.tsx
|   |   |   DynamicFilters.tsx
|   |   |   EditAdModal.tsx
|   |   |   EditAdSetModal.tsx
|   |   |   EditCampaignModal.tsx
|   |   |   EditClientModal.tsx
|   |   |   EditCollaboratorModal.tsx
|   |   |   EmergencyLogout.tsx
|   |   |   GlobalSearch.tsx
|   |   |   Header.tsx
|   |   |   HierarchicalFilter.tsx
|   |   |   LoginForm.tsx
|   |   |   MetaApiManagement.tsx
|   |   |   MetaApiSettings.tsx
|   |   |   MetricsCustomization.tsx
|   |   |   MetricsObjectivesTab.tsx
|   |   |   PermissionTemplatesManagement.tsx
|   |   |   ProtectedRoute.tsx
|   |   |   QuickCreateButton.tsx
|   |   |   SelectedAccountDisplay.tsx
|   |   |   SettingsTab.tsx
|   |   |   Sidebar.tsx
|   |   |   TableColumnConfig.tsx
|   |   |   ThemeToggle.tsx
|   |   |   TicketDetailModal.tsx
|   |   |   TicketsTab.tsx
|   |   |   TicketsTabAdvanced.tsx
|   |   |   UploadCreativeModal.tsx
|   |   |   UserMenu.tsx
|   |   |   WhatsAppReportsTab.tsx
|   |   |   
|   |   +---collaborators
|   |   |       AccessDenied.tsx
|   |   |       CollaboratorRow.tsx
|   |   |       CollaboratorsHeader.tsx
|   |   |       CollaboratorsList.tsx
|   |   |       CollaboratorsSearch.tsx
|   |   |       LoadingSpinner.tsx
|   |   |       
|   |   +---dashboard
|   |   |       AdLevel.tsx
|   |   |       AdSetLevel.tsx
|   |   |       CampaignCharts.tsx
|   |   |       CampaignLevel.tsx
|   |   |       CampaignTable.tsx
|   |   |       DashboardFilters.tsx
|   |   |       DashboardHeader.tsx
|   |   |       FunnelVisualization.tsx
|   |   |       MetricsGrid.tsx
|   |   |       MetricsOverview.tsx
|   |   |       ObservacoesTable.tsx
|   |   |       RelatorioDailyTable.tsx
|   |   |       
|   |   +---dashboard.ui
|   |   |       accordion.tsx
|   |   |       alert-dialog.tsx
|   |   |       alert.tsx
|   |   |       aspect-ratio.tsx
|   |   |       avatar.tsx
|   |   |       badge.tsx
|   |   |       breadcrumb.tsx
|   |   |       button.tsx
|   |   |       calendar.tsx
|   |   |       card.tsx
|   |   |       carousel.tsx
|   |   |       chart.tsx
|   |   |       checkbox.tsx
|   |   |       collapsible.tsx
|   |   |       command.tsx
|   |   |       context-menu.tsx
|   |   |       dialog.tsx
|   |   |       drawer.tsx
|   |   |       dropdown-menu.tsx
|   |   |       form.tsx
|   |   |       hover-card.tsx
|   |   |       input-otp.tsx
|   |   |       input.tsx
|   |   |       label.tsx
|   |   |       menubar.tsx
|   |   |       navigation-menu.tsx
|   |   |       pagination.tsx
|   |   |       popover.tsx
|   |   |       progress.tsx
|   |   |       radio-group.tsx
|   |   |       resizable.tsx
|   |   |       scroll-area.tsx
|   |   |       select.tsx
|   |   |       separator.tsx
|   |   |       sheet.tsx
|   |   |       sidebar.tsx
|   |   |       skeleton.tsx
|   |   |       slider.tsx
|   |   |       sonner.tsx
|   |   |       switch.tsx
|   |   |       table.tsx
|   |   |       tabs.tsx
|   |   |       textarea.tsx
|   |   |       theme-toggle.tsx
|   |   |       toast.tsx
|   |   |       toaster.tsx
|   |   |       toggle-group.tsx
|   |   |       toggle.tsx
|   |   |       tooltip.tsx
|   |   |       use-toast.ts
|   |   |       
|   |   +---dashboard_filters
|   |   |       AdvancedFilters.tsx
|   |   |       DateRangePicker.tsx
|   |   |       ItemLevelFilter.tsx
|   |   |       
|   |   +---dashboard_navigation
|   |   |       PlatformNavigation.tsx
|   |   |       SectionTabs.tsx
|   |   |       
|   |   +---tickets
|   |   |       ClientMessageForm.tsx
|   |   |       CreateTicketModalAdvanced.tsx
|   |   |       TicketCard.tsx
|   |   |       TicketDetailModalAdvanced.tsx
|   |   |       TicketFilters.tsx
|   |   |       TicketStatusBadge.tsx
|   |   |       TicketStepper.tsx
|   |   |       TicketTimeline.tsx
|   |   |       
|   |   +---ui
|   |   |       accordion.tsx
|   |   |       alert-dialog.tsx
|   |   |       alert.tsx
|   |   |       aspect-ratio.tsx
|   |   |       avatar.tsx
|   |   |       badge.tsx
|   |   |       breadcrumb.tsx
|   |   |       button.tsx
|   |   |       calendar.tsx
|   |   |       card.tsx
|   |   |       carousel.tsx
|   |   |       chart.tsx
|   |   |       checkbox.tsx
|   |   |       collapsible.tsx
|   |   |       command.tsx
|   |   |       context-menu.tsx
|   |   |       dialog.tsx
|   |   |       drawer.tsx
|   |   |       dropdown-menu.tsx
|   |   |       form.tsx
|   |   |       hover-card.tsx
|   |   |       input-otp.tsx
|   |   |       input.tsx
|   |   |       label.tsx
|   |   |       menubar.tsx
|   |   |       navigation-menu.tsx
|   |   |       pagination.tsx
|   |   |       popover.tsx
|   |   |       progress.tsx
|   |   |       radio-group.tsx
|   |   |       resizable.tsx
|   |   |       scroll-area.tsx
|   |   |       select.tsx
|   |   |       separator.tsx
|   |   |       sheet.tsx
|   |   |       sidebar.tsx
|   |   |       skeleton.tsx
|   |   |       slider.tsx
|   |   |       sonner.tsx
|   |   |       switch.tsx
|   |   |       table.tsx
|   |   |       tabs.tsx
|   |   |       textarea.tsx
|   |   |       toast.tsx
|   |   |       toaster.tsx
|   |   |       toggle-group.tsx
|   |   |       toggle.tsx
|   |   |       tooltip.tsx
|   |   |       use-toast.ts
|   |   |       
|   |   \---whatsapp
|   |           CampaignList.tsx
|   |           ContactSelector.tsx
|   |           ContactsTable.tsx
|   |           MessageFiltersModal.tsx
|   |           MessagesTable.tsx
|   |           NewCampaignModal.tsx
|   |           NewContactModal.tsx
|   |           NewMessageModal.tsx
|   |           TemplateSelector.tsx
|   |           WhatsAppConnectionCard.tsx
|   |           WhatsAppDashboard.tsx
|   |           
|   +---hooks
|   |   |   use-mobile.tsx
|   |   |   use-toast.ts
|   |   |   useAccountInsights.tsx
|   |   |   useActivityLog.tsx
|   |   |   useAuth.tsx
|   |   |   useAuthActions.tsx
|   |   |   useCollaborators.tsx
|   |   |   useDateRange.tsx
|   |   |   useGlobalAdAccount.tsx
|   |   |   useInsights.tsx
|   |   |   useMetaData.tsx
|   |   |   useMetricsConfig.tsx
|   |   |   usePermissions.tsx
|   |   |   useSystemLog.tsx
|   |   |   useUserAccess.tsx
|   |   |   useUserPermissions.tsx
|   |   |   useUserProfile.tsx
|   |   |   useWhatsAppConfig.ts
|   |   |   useWhatsAppContacts.ts
|   |   |   useWhatsAppMessages.ts
|   |   |   useWhatsAppTemplates.ts
|   |   |   
|   |   \---dashboard_hooks
|   |           use-mobile.tsx
|   |           use-toast.ts
|   |           useAnalyticsData.ts
|   |           useClientManager.ts
|   |           useDataSelector.ts
|   |           useFilters.tsx
|   |           useHierarchicalData.ts
|   |           useHierarchicalNavigation.ts
|   |           useMetaData.ts
|   |           usePlatformNavigation.ts
|   |           useSettings.tsx
|   |           useSheetData.ts
|   |           useTheme.tsx
|   |           
|   +---integrations
|   |   \---supabase
|   |           client.ts
|   |           types.ts
|   |           
|   +---lib
|   |   |   metaApi.ts
|   |   |   metaApiWithRateLimit.ts
|   |   |   metaInsights.ts
|   |   |   rateLimit.ts
|   |   |   utils.ts
|   |   |   
|   |   \---dashboard_lib
|   |           analyticsApi.ts
|   |           clients.ts
|   |           integrations.ts
|   |           metaApi.ts
|   |           supabase.ts
|   |           utils.ts
|   |           
|   +---pages
|   |   |   Index.tsx
|   |   |   MetricsObjectivesTab.tsx
|   |   |   NotFound.tsx
|   |   |   objetivos-metricas.tsx
|   |   |   WhatsAppReportsTab.tsx
|   |   |   
|   |   \---dashboard
|   |           Index.tsx
|   |           NotFound.tsx
|   |           
|   +---types
|   |       auth.ts
|   |       
|   \---utils
|           permissionUtils.ts
|           seedActivityLogs.ts
|           
\---supabase
    |   config.toml

