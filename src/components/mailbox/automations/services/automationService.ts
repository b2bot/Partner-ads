
import { apiClient } from '@/integrations/apiClient';
import { Automation, AutomationLog, CreateAutomationRequest, UpdateAutomationRequest } from '../types/automations';

export class AutomationService {
  // Buscar automações do usuário
  static async getAutomations(page: number = 1, pageSize: number = 20) {
    const { data: { user } } = await apiClient.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const offset = (page - 1) * pageSize;

    const { data, error, count } = await apiClient
      .from('mailbox_automations')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;
    return { data: data as Automation[], count: count || 0 };
  }

  // Buscar uma automação específica
  static async getAutomation(id: string): Promise<Automation> {
    const { data, error } = await apiClient
      .from('mailbox_automations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Automation;
  }

  // Criar nova automação
  static async createAutomation(automation: CreateAutomationRequest): Promise<Automation> {
    const { data: { user } } = await apiClient.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Calcular próxima execução
    let nextRun = null;
    if (automation.schedule_cron) {
      // Aqui você pode usar uma biblioteca como node-cron para calcular
      // Por simplicidade, vou definir para 1 hora a partir de agora
      nextRun = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    } else if (automation.schedule_once) {
      nextRun = automation.schedule_once;
    }

    const { data, error } = await apiClient
      .from('mailbox_automations')
      .insert({
        user_id: user.id,
        ...automation,
        next_run: nextRun
      })
      .select()
      .single();

    if (error) throw error;
    return data as Automation;
  }

  // Atualizar automação
  static async updateAutomation(automation: UpdateAutomationRequest): Promise<Automation> {
    const { id, ...updateData } = automation;

    const { data, error } = await apiClient
      .from('mailbox_automations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Automation;
  }

  // Deletar automação
  static async deleteAutomation(id: string): Promise<void> {
    const { error } = await apiClient
      .from('mailbox_automations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Buscar logs de automação
  static async getAutomationLogs(automationId: string, page: number = 1, pageSize: number = 20) {
    const offset = (page - 1) * pageSize;

    const { data, error, count } = await apiClient
      .from('mailbox_automation_logs')
      .select('*', { count: 'exact' })
      .eq('automation_id', automationId)
      .order('run_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;
    return { data: data as AutomationLog[], count: count || 0 };
  }

  // Processar automações pendentes
  static async processAutomations() {
    const { data, error } = await apiClient.rpc('process_pending_automations');
    if (error) throw error;
    return data;
  }
}
