🧠 VISÃO DETALHADA DO PROJETO

✅ Nome do sistema: Partner Manager 🧩 Objetivo da plataforma Gerenciar campanhas de mídia paga, integração com a Meta API, controle de criativos, métricas, relatórios de WhatsApp e chamados, com diferenciação clara entre área administrativa e área do cliente.

🔐 Autenticação e Permissões Backend usa Supabase.

Permissões são controladas via tabela user_permissions com tipo permission_type. Cada permissão é validada no frontend com hasPermission('exemplo'). Usuário root (is_root_admin = true) vê e acessa tudo.

Exemplo de permissões: access_dashboard manage_collaborators view_system_logs manage_user_settings (e muitas outras específicas por recurso)

🎯 Funcionalidades principais (até agora) 👤 Gestão de usuários (backoffice) Permite configurar permissões de colaboradores. Painéis específicos pra root admin. Modais de criação e edição integrados com Supabase. Base respeita enums e tipos do Supabase corretamente.

📦 MÓDULOS ATIVOS NO SISTEMA 🎛️ Dashboard: Exibe dados agregados das campanhas (impressões, cliques, conversões). Tem cards, gráficos, filtros por conta, e modo cards/tabela. Mostra também log de atividades com permissão view_system_logs.

📈 Resultados: Visualização avançada das campanhas (funil, gráficos, desempenho por data). Tabs com filtros por plataforma: Meta, Google, TikTok, etc. Integração com Google Sheets API via Vercel e criando a integração Meta Ads API. Dashboard de performance por período e funil de conversão.

📊 Campanhas / Conjuntos / Anúncios Interface tipo painel de controle com filtros avançados. Estados como ACTIVE, PAUSED, etc. Cada item possui dados como: nome, status, métricas, ações.

📞 Relatórios WhatsApp: Acompanha disparos, entregas, visualizações e erros via WhatsApp Business API. Status de conexão com WhatsApp exibido. Painel conectado à WhatsApp Business API. Conexão configurada via aba "Configurações".

📎 Chamados: Tela “Central de Suporte”. Cards com status visual (aguardando, em análise, resolvido...). Filtros por categoria, prioridade e cliente. Central de suporte com filtros por status, categoria, prioridade e cliente. Permissões específicas controlam quem acessa e gerencia.

🧠 Métricas e Objetivos: Personalização visual de métricas com faixas de performance (bom, médio, ruim). Cada métrica tem escala customizada e representação colorida. (Esta tela será alterada para outra funcionalidade)

🧑‍💻 Criativos: Upload de criativos para aprovação de clientes. Design simples e funcional.

📚 Log de Atividades: Histórico de ações do sistema. Aparece se usuário tiver view_system_logs.

🧩 Configurações Composta por 4 abas abas internas: Gestão da API Meta Gestão de Dados Colaboradores Clientes

🔌 Aba 1: Gestão da API Meta Visualização do App ID, status da conexão e testes em tempo real. Exibe: App ID, Status de conexão, Última verificação e credenciais. Controle de chamadas por hora (rate limit). Cache e reset automático

📂 Aba 2: Gestão de Dados Objetivo: Gerenciar a conta de anúncios padrão e personalizar as métricas visíveis nas páginas operacionais. Configurações disponíveis: Conta Principal de Anúncio (dropdown com lista de contas vinculadas). Métricas por Página: Dashboard, Campanhas, Conjuntos, Anúncios

Controle das métricas visíveis por página, com as seguintec Categorias de métricas: Performance (Impressões, Cliques, etc.) Conversões (Resultados, Leads) Custos (CPC, CPM, CPA, etc.) Engajamento (Reações, Curtidas) Vídeo (Visualizações, Reproduções) Tráfego (Cliques externos, em links)

🧑‍🤝‍🧑 Aba 3: Colaboradores Lista de colaboradores com status (ativo/inativo) e permissões personalizadas. Modal de criação com nome, email, senha e checkbox de permissões.

👥 Aba 4: Clientes Lista de clientes com tipo de acesso (API / Google Sheets). Modal com campos: nome, empresa, email, telefone, contas vinculadas, tipo de acesso.

💅 DESIGN ATUAL Layout moderno, clean, responsivo e premium. Glassmorphism, gradientes, sombras e cantos arredondados. Sidebar com hover, transições, grupos. Nova paleta e tipografia hierárquica. Scroll customizado. Header com transparência. Utilitários: .premium-card, .premium-button, .premium-sidebar-item, etc.

🚨 Histórico de bugs importantes (já resolvidos) Permissões desatualizadas quebrando render de tabs. Uso de enum inexistente (access_resultados) causava erro de tipagem. Falha de build por @apply group (Tailwind não permite isso). Falta de espaçamentos e inconsistência de estilo visual.

🧱 Estrutura Geral Stack Principal: Frontend: React (com TailwindCSS)

Backend/DB: Supabase Query Layer: React Query UI Components: ShadCN/UI + Lucide Icons State Management: useQuery, useMutation, useQueryClient (da React Query) Notificações: Sonner Armazenamento & APIs: Supabase como backend + integração com Meta API

Stack e Ferramentas: Frontend: React + TailwindCSS (UI visivelmente montada com shadcn/ui)

Backend/API: Supabase Chamada direta à Meta Ads API (via settings.ts, storeKey.ts, testConnection.ts)

Build/Dev Tools: Vite - TypeScript - PostCSS ESLint Vitest (testes unitários com arquivos .test.ts) Gerenciamento de Estado e API Cache: Tanstack React Query Outros libs chave detectados: lucide-react, sonner, react-hook-form, class-variance-authority, react-day-picker, radix-ui libs Queries usando .from(...).select().order()... com mapeamento em interfaces

🔄 React Query Cache das queries principais: ['metrics-config'], ['clients-management'], etc. Mutations com onSuccess e onError + toast feedback

sistema completo de limpeza de cache e diagnóstico com os seguintes recursos:

🔧 Utilitários de Cache:

CacheManager singleton para gerenciar cache do Vite Diagnóstico automático de problemas Limpeza completa de todos os tipos de cache 📊 Painel de Debug:

Interface visual para diagnosticar problemas Botões para limpar cache e forçar reload Exibição detalhada do status do sistema 🚨 Detecção Automática:

Detecta erros de importação automaticamente Mostra notificações quando há problemas Sistema de auto-correção configurável Como usar:

Acesse /cache-debug para usar o painel visual Console automático - o sistema detecta erros e oferece soluções Notificações aparecem automaticamente quando há problemas de cache O sistema agora detectará automaticamente o erro "does not provide an export named" e oferecerá soluções imediatas!

📂 Estrutura de Diretórios Relevante

├── api/ │ ├── settings.ts # Configurações de conexão com a API Meta │ ├── storeKey.ts # Chave de acesso/token da conta │ ├── testConnection.ts # Função de teste de conexão com a API │ └── tests/ # Testes unitários da API

+---public | favicon.ico | placeholder.svg | robots.txt |
+---src | | App.css | | App.tsx | | index.css | | main.tsx | | vite-env.d.ts | |
| +---components | | | AccountFilter.tsx | | | ActivityLog.tsx | | | AdSetsTab.tsx | | | AdsTab.tsx | | | AdvancedFilters.tsx | | | ApiMonitoring.tsx | | | AuthWrapper.tsx | | | CampaignsTab.tsx | | | ClientGreeting.tsx | | | ClientsManagementTab.tsx | | | CollaboratorsManagement.tsx | | | CollapsibleAccountFilter.tsx | | | CreateAdModal.tsx | | | CreateAdSetModal.tsx | | | CreateCampaignModal.tsx | | | CreateClientModal.tsx | | | CreateCollaboratorModal.tsx | | | CreateTicketModal.tsx | | | CreativeDetailModal.tsx | | | CreativesTab.tsx | | | Dashboard.tsx | | | DataManagement.tsx | | | DateRangeFilter.tsx | | | DynamicFilters.tsx | | | EditAdModal.tsx | | | EditAdSetModal.tsx | | | EditCampaignModal.tsx | | | EditClientModal.tsx | | | EditCollaboratorModal.tsx | | | EmergencyLogout.tsx | | | GlobalSearch.tsx | | | Header.tsx | | | HierarchicalFilter.tsx | | | LoginForm.tsx | | | MetaApiManagement.tsx | | | MetaApiSettings.tsx | | | MetricsCustomization.tsx | | | MetricsObjectivesTab.tsx | | | PermissionTemplatesManagement.tsx | | | ProtectedRoute.tsx | | | QuickCreateButton.tsx | | | SelectedAccountDisplay.tsx | | | SettingsTab.tsx | | | Sidebar.tsx | | | TableColumnConfig.tsx | | | ThemeToggle.tsx | | | TicketDetailModal.tsx | | | TicketsTab.tsx | | | TicketsTabAdvanced.tsx | | | UploadCreativeModal.tsx | | | UserMenu.tsx | | | WhatsAppReportsTab.tsx | | |
| | +---collaborators | | | AccessDenied.tsx | | | CollaboratorRow.tsx | | | CollaboratorsHeader.tsx | | | CollaboratorsList.tsx | | | CollaboratorsSearch.tsx | | | LoadingSpinner.tsx | | |
| | +---tickets | | | ClientMessageForm.tsx | | | CreateTicketModalAdvanced.tsx | | | TicketCard.tsx | | | TicketDetailModalAdvanced.tsx | | | TicketFilters.tsx | | | TicketStatusBadge.tsx | | | TicketStepper.tsx | | | TicketTimeline.tsx | | |
| | +---ui | | | accordion.tsx | | | alert-dialog.tsx | | | alert.tsx | | | aspect-ratio.tsx | | | avatar.tsx | | | badge.tsx | | | breadcrumb.tsx | | | button.tsx | | | calendar.tsx | | | card.tsx | | | carousel.tsx | | | chart.tsx | | | checkbox.tsx | | | collapsible.tsx | | | command.tsx | | | context-menu.tsx | | | dialog.tsx | | | drawer.tsx | | | dropdown-menu.tsx | | | form.tsx | | | hover-card.tsx | | | input-otp.tsx | | | input.tsx | | | label.tsx | | | menubar.tsx | | | navigation-menu.tsx | | | pagination.tsx | | | popover.tsx | | | progress.tsx | | | radio-group.tsx | | | resizable.tsx | | | scroll-area.tsx | | | select.tsx | | | separator.tsx | | | sheet.tsx | | | sidebar.tsx | | | skeleton.tsx | | | slider.tsx | | | sonner.tsx | | | switch.tsx | | | table.tsx | | | tabs.tsx | | | textarea.tsx | | | toast.tsx | | | toaster.tsx | | | toggle-group.tsx | | | toggle.tsx | | | tooltip.tsx | | | use-toast.ts | | |
| | ---whatsapp | | CampaignList.tsx | | ContactSelector.tsx | | ContactsTable.tsx | | MessageFiltersModal.tsx | | MessagesTable.tsx | | NewCampaignModal.tsx | | NewContactModal.tsx | | NewMessageModal.tsx | | TemplateSelector.tsx | | WhatsAppConnectionCard.tsx | | WhatsAppDashboard.tsx | |
| +---hooks | | use-mobile.tsx | | use-toast.ts | | useAccountInsights.tsx | | useActivityLog.tsx | | useAuth.tsx | | useAuthActions.tsx | | useCollaborators.tsx | | useDateRange.tsx | | useGlobalAdAccount.tsx | | useInsights.tsx | | useMetaData.tsx | | useMetricsConfig.tsx | | usePermissions.tsx | | useSystemLog.tsx | | useUserAccess.tsx | | useUserPermissions.tsx | | useUserProfile.tsx | | useWhatsAppConfig.ts | | useWhatsAppContacts.ts | | useWhatsAppMessages.ts | | useWhatsAppTemplates.ts | |
| +---integrations | | ---supabase | | client.ts | | types.ts | |
| +---lib | | metaApi.ts | | metaApiWithRateLimit.ts | | metaInsights.ts | | rateLimit.ts | | utils.ts | |
| +---pages | | Index.tsx | | MetricsObjectivesTab.tsx | | NotFound.tsx | | objetivos-metricas.tsx | | WhatsAppReportsTab.tsx | |
| +---types | | auth.ts | |
| ---utils | permissionUtils.ts | seedActivityLogs.ts |
---supabase/ ├── | config.toml
