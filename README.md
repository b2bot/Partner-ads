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



📊 Páginas Operacionais
2. Dashboard
Dados de visão geral da conta ativa.


Exibe:


Impressões totais
Cliques totais
Gasto total
CTR médio
Cards de campanhas ativas com estatísticas rápidas


Problemas pendentes:


Data range ainda não atualiza os dados corretamente
Alguns cards não carregam informações



3. Campanhas
Tabela com todas as campanhas da conta ativa selecionada.


Filtros:


Status da campanha
Período (últimos X dias)


Colunas:


Nome, Status, Objetivo
Impressões, Cliques, Resultados
Custo por Resultado
Data de criação


Sorting funciona por clique nas colunas


Ponto de atenção:


Fontes ainda grandes, precisa de um ajuste visual
Algumas métricas ainda com valores zerados



4. Conjuntos de Anúncios
Listagem dos adsets vinculados à campanha


Filtros:


Por campanha
Por status
Por período


Colunas:


Nome do conjunto
Campanha associada
Métricas (impressões, cliques, CPM, resultados, CPA)


Problemas:


Carregamento lento dos dados
Colunas desalinhadas
Botão de limpar desalinhado



5. Anúncios
Tabela com todos os anúncios do adset


Filtros:


Por campanha
Por conjunto
Por status
Por período


Colunas:


Criativo (imagem miniatura)
Nome do anúncio
Status
Conjunto
Campanha
Métricas (Impressões, CTR, Frequência, etc.)


Funcionalidade importante:


Clicar na imagem do criativo abre modal ou visualização ampliada (em desenvolvimento)


Problemas:


Algumas métricas não carregam
Falta alinhar os inputs e filtros no topo
Botão “Limpar” desalinhado



🎯 Página: Personalização de Métricas
Aqui é onde a mágica acontece!


Possível selecionar quais métricas devem ser exibidas em:


Dashboard
Campanhas
Conjuntos
Anúncios


Templates com configurações visuais para bom, médio e ruim por faixa de valor


Exemplo:


CPC: Verde = R$0-R$6,80 | Laranja = R$6,80-R$18,80 | Vermelho = R$18,80+
CTR: Verde = 5%+ | Laranja = 2-5% | Vermelho <2%



📤 Relatórios via WhatsApp
Conecta com API de WhatsApp
Permite agendar envio semanal/mensal de relatórios para clientes
Clientes configurados via painel


Status atual:


Funcionalidade de conexão está no ar
Envio depende da conta estar conectada



📥 Gerenciar Chamados
Lista de chamados abertos por clientes
Status: Aguardando, Respondido
Sistema de resposta interno com botão de criar novo chamado



👤 Gerenciar Clientes
Lista de clientes vinculados ao sistema


Exibe:
Nome, e-mail
Tipo de acesso (API ou Sheets)
Contas vinculadas
Botões de editar, desativar, remover



🔌 Integrações & Lógica
📡 Supabase
Armazena:


Configs de métricas (metrics_config)
Clientes (clientes)
Perfis (profiles)
Contas vinculadas (contas)
Atividades do sistema (system_logs)


Queries usando .from(...).select().order()... com mapeamento em interfaces


🔄 React Query
Cache das queries principais: ['metrics-config'], ['clients-management'], etc.
Mutations com onSuccess e onError + toast feedback


📂 Estrutura de Diretórios Relevante

├── api/
│   ├── settings.ts           # Configurações de conexão com a API Meta
│   ├── storeKey.ts           # Chave de acesso/token da conta
│   ├── testConnection.ts     # Função de teste de conexão com a API
│   └── __tests__/            # Testes unitários da API


+---public
|       favicon.ico
|       placeholder.svg
|       robots.txt
|       
+---src
|   |   App.css
|   |   App.tsx
|   |   index.css
|   |   main.tsx
|   |   vite-env.d.ts
|   |   
|   +---components
|   |   |   ProtectedRoute.tsx
|   |   |   
|   |   +---admin
|   |   |   |   AdminPanel.tsx
|   |   |   |   
|   |   |   \---__tests_
|   |   |           AdminPanel.test.tsx
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
|   |   |       
|   |   +---filters
|   |   |       AdvancedFilters.tsx
|   |   |       DateRangePicker.tsx
|   |   |       ItemLevelFilter.tsx
|   |   |       
|   |   +---navigation
|   |   |       PlatformNavigation.tsx
|   |   |       SectionTabs.tsx
|   |   |       
|   |   \---ui
|   |           accordion.tsx
|   |           alert-dialog.tsx
|   |           alert.tsx
|   |           aspect-ratio.tsx
|   |           avatar.tsx
|   |           badge.tsx
|   |           breadcrumb.tsx
|   |           button.tsx
|   |           calendar.tsx
|   |           card.tsx
|   |           carousel.tsx
|   |           chart.tsx
|   |           checkbox.tsx
|   |           collapsible.tsx
|   |           command.tsx
|   |           context-menu.tsx
|   |           dialog.tsx
|   |           drawer.tsx
|   |           dropdown-menu.tsx
|   |           form.tsx
|   |           hover-card.tsx
|   |           input-otp.tsx
|   |           input.tsx
|   |           label.tsx
|   |           menubar.tsx
|   |           navigation-menu.tsx
|   |           pagination.tsx
|   |           popover.tsx
|   |           progress.tsx
|   |           radio-group.tsx
|   |           resizable.tsx
|   |           scroll-area.tsx
|   |           select.tsx
|   |           separator.tsx
|   |           sheet.tsx
|   |           sidebar.tsx
|   |           skeleton.tsx
|   |           slider.tsx
|   |           sonner.tsx
|   |           switch.tsx
|   |           table.tsx
|   |           tabs.tsx
|   |           textarea.tsx
|   |           theme-toggle.tsx
|   |           toast.tsx
|   |           toaster.tsx
|   |           toggle-group.tsx
|   |           toggle.tsx
|   |           tooltip.tsx
|   |           use-toast.ts
|   |           
|   +---hooks
|   |       use-mobile.tsx
|   |       use-toast.ts
|   |       useAnalyticsData.ts
|   |       useAuth.tsx
|   |       useClientManager.ts
|   |       useDataSelector.ts
|   |       useFilters.tsx
|   |       useHierarchicalData.ts
|   |       useHierarchicalNavigation.ts
|   |       useMetaData.ts
|   |       usePlatformNavigation.ts
|   |       useSettings.tsx
|   |       useSheetData.ts
|   |       useTheme.tsx
|   |       
|   +---lib
|   |       analyticsApi.ts
|   |       clients.ts
|   |       integrations.ts
|   |       metaApi.ts
|   |       supabase.ts
|   |       utils.ts
|   |       
|   \---pages
|           Admin.tsx
|           Index.tsx
|           Login.tsx
|           NotFound.tsx
|           Register.tsx
|           
\---tests
        adminPage.test.tsx
        dataSelector.test.tsx
        useSettings.test.tsx

