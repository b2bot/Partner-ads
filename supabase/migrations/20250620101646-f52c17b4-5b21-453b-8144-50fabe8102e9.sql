
-- 1. Primeiro, vamos verificar se existem registros com status inválidos
UPDATE chamados 
SET status = 'novo'::ticket_status 
WHERE status::text NOT IN ('novo', 'aguardando_equipe', 'aguardando_cliente', 'em_analise', 'em_andamento', 'resolvido');

-- 2. Atualizar a função create_ticket_timeline_entry para remover qualquer referência a "aberto"
CREATE OR REPLACE FUNCTION public.create_ticket_timeline_entry()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
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
      auth.uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), 'Sistema'),
      NEW.aberto_por,
      jsonb_build_object('titulo', NEW.titulo, 'categoria', NEW.categoria, 'prioridade', NEW.prioridade)
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
      'Status alterado de "' || OLD.status || '" para "' || NEW.status || '"',
      auth.uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), 'Sistema'),
      CASE WHEN is_admin() THEN 'admin' ELSE 'cliente' END,
      jsonb_build_object('status_anterior', OLD.status, 'status_novo', NEW.status)
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
      auth.uid(),
      COALESCE((SELECT nome FROM profiles WHERE id = auth.uid()), 'Sistema'),
      CASE WHEN is_admin() THEN 'admin' ELSE 'cliente' END
    );
  END IF;

  RETURN NEW;
END;
$function$;

-- 3. Atualizar função update_ticket_detailed_status para usar apenas os novos status
CREATE OR REPLACE FUNCTION public.update_ticket_detailed_status()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
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
$function$;

-- 4. Verificar se há dados órfãos no histórico e timeline
UPDATE chamados_historico 
SET detalhes = REPLACE(detalhes, '"aberto"', '"novo"')
WHERE detalhes LIKE '%aberto%';

UPDATE chamados_timeline 
SET conteudo = REPLACE(conteudo, '"aberto"', '"novo"')
WHERE conteudo LIKE '%aberto%';
