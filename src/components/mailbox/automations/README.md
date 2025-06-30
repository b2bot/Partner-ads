
# Módulo de Automações de Email

Este módulo permite criar e gerenciar automações para envio programado de emails em lote.

## Estrutura do Projeto

```
src/components/automations/
├── components/
│   ├── AutomationsTab.tsx       # Interface principal
│   ├── AutomationsList.tsx      # Lista de automações
│   ├── AutomationForm.tsx       # Formulário de criação/edição
│   └── AutomationLogs.tsx       # Histórico de execuções
├── hooks/
│   └── useAutomations.ts        # Hooks React Query
├── services/
│   └── automationService.ts     # Serviços da API
├── types/
│   └── automations.d.ts         # Definições TypeScript
├── utils/
│   ├── cronParser.ts            # Parser de expressões cron
│   └── recipientsFilter.ts      # Filtros de destinatários
└── README.md                    # Este arquivo
```

## Funcionalidades

### 1. Gestão de Automações
- ✅ Criar automações de email
- ✅ Editar automações existentes
- ✅ Ativar/pausar automações
- ✅ Excluir automações
- ✅ Visualizar lista com filtros

### 2. Agendamento
- ✅ Execução recorrente via expressões cron
- ✅ Execução única em data/hora específica
- ✅ Presets rápidos (diário, semanal, mensal)
- ✅ Preview visual da programação

### 3. Destinatários
- ✅ Lista personalizada de emails
- ✅ Validação de formato de email
- ✅ Suporte a múltiplos destinatários

### 4. Histórico e Logs
- ✅ Registro de todas as execuções
- ✅ Status detalhado (sucesso, erro, parcial)
- ✅ Contadores de emails enviados/falharam
- ✅ Detalhes de erros

## Configuração do Banco de Dados

### Tabelas Criadas

1. **mailbox_automations**
   - Armazena as configurações das automações
   - Inclui RLS para isolamento por usuário

2. **mailbox_automation_logs**
   - Histórico de execuções
   - Métricas de sucesso/falha

### Políticas RLS

Todas as tabelas possuem Row Level Security habilitado:
- Usuários só veem seus próprios dados
- Inserção/atualização limitada ao user_id correto

## Edge Function

A função `process-automations` executa as automações pendentes:

```typescript
// Chamada manual via hook
const processAutomations = useProcessAutomations();
processAutomations.mutate();
```

## Como Usar

### 1. Acessar o Módulo
Navegue para a aba "Automações" no mailbox principal.

### 2. Criar Nova Automação
1. Clique em "Nova Automação"
2. Preencha nome e assunto
3. Digite o conteúdo do email
4. Configure o agendamento (cron ou data única)
5. Adicione a lista de destinatários
6. Salve a automação

### 3. Gerenciar Automações
- Use os botões para ativar/pausar
- Clique em "Editar" para modificar
- Use "Excluir" para remover permanentemente

### 4. Visualizar Histórico
- Vá para a aba "Histórico"
- Selecione uma automação
- Veja todas as execuções passadas

## Expressões Cron Suportadas

| Expressão | Descrição |
|-----------|-----------|
| `0 * * * *` | A cada hora |
| `0 9 * * *` | Diariamente às 9h |
| `0 18 * * *` | Diariamente às 18h |
| `0 9 * * 1` | Segundas às 9h |
| `0 9 * * 0` | Domingos às 9h |
| `0 9 1 * *` | Mensalmente no dia 1 às 9h |

## Limitações Atuais

1. **Parsing Cron**: Implementação simplificada (recomenda-se usar node-cron em produção)
2. **Anexos**: Interface preparada mas não implementada
3. **Templates**: Suporte básico a HTML, sem editor visual
4. **Filtros Avançados**: Apenas listas personalizadas implementadas

## Próximos Passos

1. Implementar editor rich-text para emails
2. Adicionar suporte a anexos
3. Criar sistema de templates
4. Implementar filtros avançados (domínio, tags, etc.)
5. Adicionar cron scheduler automático
6. Implementar métricas e analytics

## Dependências

- React Query (@tanstack/react-query)
- Supabase JS SDK
- Radix UI components
- Lucide React (ícones)
- Sonner (toast notifications)

## Configuração Local

1. Certifique-se que as migrações SQL foram aplicadas
2. As políticas RLS estão configuradas
3. A edge function foi deployada
4. Configure variáveis de ambiente se necessário

## Troubleshooting

### Erro "permission denied for table mailbox_settings"
- Verifique se as políticas RLS estão aplicadas
- Confirme que o usuário está autenticado
- Teste a conexão com o banco

### Automações não executam
- Verifique se next_run está configurado
- Confirme que active=true
- Execute manualmente via "Executar Agora"

### Emails não são enviados
- Confirme configurações SMTP em mailbox_settings
- Verifique logs na tabela mailbox_automation_logs
- Teste com a edge function de envio

---

Para mais informações, consulte o código fonte ou abra uma issue no repositório.
