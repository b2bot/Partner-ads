# AGENTS.md

Este documento registra diretrizes e tarefas importantes para a migração do projeto Partner Manager de Supabase para um backend em PHP/MySQL hospedado na pasta `API/`.  
Sempre que novas tarefas forem concluídas ou surgirem informações relevantes, este arquivo deve ser atualizado.

## Fluxo de Trabalho
1. **Executar tarefas em sequência.**  
   - Cada tarefa da lista abaixo deve ser iniciada somente após a conclusão da anterior.
   - Manter este arquivo atualizado com um resumo do que foi feito.

2. **Commit e revisão.**  
   - Evitar commits parciais em arquivos de funcionalidade diferente.
   - Descrever no commit as mudanças principais.

## Tarefas de Migração

1. **Substituir o cliente Supabase por `apiClient`.**  
   - Criar `src/integrations/apiClient.ts` (fetch genérico para `${import.meta.env.VITE_API_URL}`).
   - Atualizar `.env.local` para `VITE_API_URL` e remover variáveis do Supabase.
   - Ajustar imports de todo o código que utiliza `apiClient`.

2. **Refatorar hooks de autenticação.**  
   - `useAuth.tsx` e `useAuthActions.tsx` devem chamar `login.php`, `register.php`, `logout.php`.
   - Salvar o token retornado no storage e enviar no header `Authorization`.

3. **Implementar scripts PHP.**  
   - Na pasta `API/` do servidor, criar arquivos `login.php`, `register.php`, `logout.php` e um script CRUD para cada tabela (clientes, contas, tasks, chamados, etc.).
   - Incluir scripts de upload de arquivos (`upload_ticket_file.php`, `upload_creative_file.php`) e funções que substituem as edge functions do Supabase.

4. **Migrar consultas dos hooks.**  
   - Cada hook de dados (`useClientes`, `useTasks`, `useWhatsApp*`, etc.) fará requisições REST para os scripts PHP correspondentes.

5. **Remover dependências do Supabase.**  
   - Excluir `@apiClient/apiClient-js` do `package.json`.
   - Garantir que o build funcione apenas com o `apiClient`.

6. **Atualizar este arquivo.**  
   - Registrar as etapas concluídas e anotar qualquer configuração especial, endpoints ou convenções novas.

## Informações Úteis

- O código atual está escrito em React com Vite e Tailwind.  
- Todas as migrações e estruturas de tabelas originais encontram-se em `apiClient/migrations`.
- Qualquer personalização de permissões ou triggers deverá ser reproduzida nos scripts PHP ou no banco MySQL.

---

Com esse esboço, basta criar manualmente o arquivo `AGENTS.md` no repositório (na raiz) e começar a atualizar à medida que as tarefas forem cumpridas.

## Registro de Progresso

- Substituído o cliente Supabase pelo novo `apiClient`.
- Atualizado `.env.local` com `VITE_API_URL` e removidas variáveis do Supabase.
- Ajustados todos os imports para usar `apiClient`.
- Removidos componentes antigos da pasta `ANTIGOS ANTES DA CORREÇÃO MANUS`.
- Atualizados hooks de autenticação e formulários para consumir `/api/login.php`,
  `/api/register.php` e `/api/logout.php` com token salvo no `localStorage`.
- Hooks de dados migrados para consumir scripts PHP em `/api/*.php` em vez de consultas Supabase.

- Criados scripts PHP na pasta `API/` com CRUD para todas as tabelas e endpoints de autenticacao (`login.php`, `register.php`, `logout.php`).
- Implementados `upload_ticket_file.php` e `upload_creative_file.php` para recebimento de arquivos via `multipart/form-data`. Componentes de upload agora enviam anexos para esses scripts.
- Convertidas as edge functions `process-automations`, `send-email` e `receive-emails` para scripts PHP (`process_automations.php`, `send_email.php`, `receive_emails.php`).
- `AutomationService.processAutomations` atualizado para chamar `/process_automations.php` via `apiClient`.
- Removida dependência @supabase/supabase-js e arquivos associados.
