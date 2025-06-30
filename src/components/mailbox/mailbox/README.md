
# Módulo Mailbox

Sistema completo de gestão de emails inspirado no Perfex, desenvolvido com React/TypeScript + Supabase.

## Estrutura

```
src/
├── components/mailbox/
│   ├── MailboxTab.tsx          # Componente principal com verificação de permissões
│   ├── MailboxSidebar.tsx      # Menu lateral com pastas e contadores
│   ├── MailboxList.tsx         # Lista de mensagens com filtros e ações
│   ├── MailboxThread.tsx       # Visualização de thread/mensagem
│   ├── NewMessageModal.tsx     # Modal para envio de mensagens
│   └── MailboxSettings.tsx     # Configurações SMTP/IMAP
├── hooks/mailbox/
│   ├── useMailboxMessages.ts   # Hooks para mensagens
│   ├── useMailboxSettings.ts   # Hooks para configurações
│   └── useMailboxThread.ts     # Hooks para threads
├── services/mailbox/
│   └── api.ts                  # Serviço de API do Supabase
├── utils/mailbox/
│   ├── permissions.ts          # Verificação de permissões
│   └── formatters.ts          # Utilitários de formatação
└── types/
    └── mailbox.ts             # Tipos TypeScript
```

## Funcionalidades Implementadas

### ✅ Estrutura de Dados
- Tabelas: messages, threads, attachments, settings
- Enums: status e tipos de pasta
- RLS policies para segurança por usuário
- Funções PostgreSQL otimizadas

### ✅ Interface Completa
- Sidebar com contadores de mensagens
- Lista paginada com busca e filtros
- Visualização de threads/mensagens
- Modal de composição de mensagens
- Tela de configurações SMTP/IMAP

### ✅ Funcionalidades
- Sistema de permissões integrado
- CRUD completo de mensagens
- Ações em lote (marcar como lida, excluir, etc.)
- Upload de anexos (estrutura pronta)
- Configurações por usuário

## Configuração

### Variáveis de Ambiente
```env
# Para segurança, configure as senhas como variáveis de ambiente
SMTP_PASSWORD=sua_senha_smtp
IMAP_PASSWORD=sua_senha_imap
```

### Permissões
O sistema verifica a permissão `access_mailbox` antes de permitir acesso.
Ajuste a função `hasMailboxPermission` em `utils/mailbox/permissions.ts` conforme sua lógica de autorização.

## Como Usar

1. **Importar o componente principal:**
```tsx
import { MailboxTab } from '@/components/mailbox/MailboxTab';

// Em seu roteador/tabs
<MailboxTab />
```

2. **Configurar permissões:**
```tsx
// Ajustar em utils/mailbox/permissions.ts
export const hasMailboxPermission = (permission: string): boolean => {
  // Sua lógica de verificação de permissões
  const userPermissions = getUserPermissions();
  return userPermissions.includes(permission);
};
```

## Próximos Passos

### Melhorias Sugeridas
- [ ] Implementar upload real de anexos com Supabase Storage
- [ ] Integração com provedor de email real (SendGrid, etc.)
- [ ] Sincronização IMAP automática
- [ ] Templates de resposta
- [ ] Filtros avançados e labels
- [ ] Busca full-text
- [ ] Notificações em tempo real
- [ ] Assinatura digital de emails

### Integração com Email
Para funcionar completamente, você precisará:
1. Configurar um provedor de email (Gmail, Outlook, etc.)
2. Implementar sincronização IMAP/POP3
3. Configurar envio via SMTP
4. Adicionar processamento de anexos

O sistema atual fornece toda a estrutura de interface e dados necessária para essas integrações.
