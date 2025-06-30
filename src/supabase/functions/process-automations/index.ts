
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AutomationToProcess {
  id: string;
  name: string;
  subject: string;
  body: string;
  recipients_filter: any;
  user_id: string;
  schedule_cron?: string;
  schedule_once?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Processando automações pendentes...');

    // Buscar automações pendentes
    const { data: automations, error: fetchError } = await supabaseClient
      .from('mailbox_automations')
      .select('*')
      .eq('active', true)
      .lte('next_run', new Date().toISOString())
      .order('next_run', { ascending: true })
      .limit(10);

    if (fetchError) {
      throw new Error(`Erro ao buscar automações: ${fetchError.message}`);
    }

    if (!automations || automations.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Nenhuma automação pendente',
          processed: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log(`Encontradas ${automations.length} automações para processar`);

    const results = [];

    for (const automation of automations) {
      try {
        console.log(`Processando automação: ${automation.name}`);

        // Buscar configurações SMTP do usuário
        const { data: settings } = await supabaseClient
          .from('mailbox_settings')
          .select('*')
          .eq('user_id', automation.user_id)
          .single();

        if (!settings || !settings.smtp_host) {
          console.log(`Configurações SMTP não encontradas para usuário ${automation.user_id}`);
          
          // Log de erro
          await supabaseClient
            .from('mailbox_automation_logs')
            .insert({
              automation_id: automation.id,
              status: 'error',
              details: { error: 'Configurações SMTP não encontradas' },
              emails_sent: 0,
              emails_failed: 0
            });

          results.push({
            automationId: automation.id,
            status: 'error',
            error: 'Configurações SMTP não encontradas'
          });
          continue;
        }

        // Processar destinatários
        const recipients = automation.recipients_filter?.emails || [];
        
        if (recipients.length === 0) {
          console.log(`Nenhum destinatário encontrado para automação ${automation.name}`);
          
          await supabaseClient
            .from('mailbox_automation_logs')
            .insert({
              automation_id: automation.id,
              status: 'error',
              details: { error: 'Nenhum destinatário encontrado' },
              emails_sent: 0,
              emails_failed: 0
            });

          results.push({
            automationId: automation.id,
            status: 'error',
            error: 'Nenhum destinatário encontrado'
          });
          continue;
        }

        let emailsSent = 0;
        let emailsFailed = 0;
        const errors: string[] = [];

        // Enviar emails para cada destinatário
        for (const recipient of recipients) {
          try {
            // Inserir mensagem no banco (simulando envio)
            const { error: insertError } = await supabaseClient
              .from('mailbox_messages')
              .insert({
                user_id: automation.user_id,
                subject: automation.subject,
                body: automation.body || '',
                from_email: settings.smtp_username || 'noreply@example.com',
                from_name: 'Sistema de Automação',
                to_email: recipient,
                status: 'sent',
                folder: 'sent',
                sent_at: new Date().toISOString()
              });

            if (insertError) {
              console.error(`Erro ao inserir mensagem para ${recipient}:`, insertError);
              emailsFailed++;
              errors.push(`${recipient}: ${insertError.message}`);
            } else {
              console.log(`Email enviado para ${recipient}`);
              emailsSent++;
            }
          } catch (emailError) {
            console.error(`Erro ao processar email para ${recipient}:`, emailError);
            emailsFailed++;
            errors.push(`${recipient}: ${emailError.message}`);
          }
        }

        // Determinar status da execução
        let executionStatus: 'success' | 'error' | 'partial';
        if (emailsSent > 0 && emailsFailed === 0) {
          executionStatus = 'success';
        } else if (emailsSent === 0) {
          executionStatus = 'error';
        } else {
          executionStatus = 'partial';
        }

        // Log da execução
        await supabaseClient
          .from('mailbox_automation_logs')
          .insert({
            automation_id: automation.id,
            status: executionStatus,
            details: {
              recipients_processed: recipients.length,
              errors: errors
            },
            emails_sent: emailsSent,
            emails_failed: emailsFailed
          });

        // Calcular próxima execução ou desativar
        let nextRun = null;
        let shouldDeactivate = false;

        if (automation.schedule_cron) {
          // Para cron recorrente, calcular próxima execução
          // Implementação simplificada - adicionar 1 hora
          nextRun = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        } else if (automation.schedule_once) {
          // Para execução única, desativar
          shouldDeactivate = true;
        }

        // Atualizar automação
        const updateData: any = {};
        if (nextRun) {
          updateData.next_run = nextRun;
        }
        if (shouldDeactivate) {
          updateData.active = false;
          updateData.next_run = null;
        }

        if (Object.keys(updateData).length > 0) {
          await supabaseClient
            .from('mailbox_automations')
            .update(updateData)
            .eq('id', automation.id);
        }

        results.push({
          automationId: automation.id,
          status: executionStatus,
          emailsSent,
          emailsFailed
        });

      } catch (automationError) {
        console.error(`Erro ao processar automação ${automation.id}:`, automationError);
        
        await supabaseClient
          .from('mailbox_automation_logs')
          .insert({
            automation_id: automation.id,
            status: 'error',
            details: { error: automationError.message },
            emails_sent: 0,
            emails_failed: 0
          });

        results.push({
          automationId: automation.id,
          status: 'error',
          error: automationError.message
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${automations.length} automações processadas`,
        processed: automations.length,
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Erro geral no processamento de automações:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
