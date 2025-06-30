
import { supabase } from '@/integrations/supabase/client';
import { 
  MailboxMessage, 
  MailboxThread, 
  MailboxAttachment, 
  MailboxSettings,
  MailboxFolderCount,
  SendMessageRequest,
  UpdateMessageStatusRequest,
  MailboxFolderType 
} from '@/types/mailbox';

export class MailboxService {
  // Buscar mensagens com paginação
  static async getMessages(
    folder: MailboxFolderType = 'inbox',
    page: number = 1,
    pageSize: number = 20,
    search?: string
  ) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.rpc('get_mailbox_messages', {
      p_user_id: user.id,
      p_folder: folder,
      p_page: page,
      p_page_size: pageSize,
      p_search: search || null
    });

    if (error) throw error;
    return data;
  }

  // Buscar uma mensagem específica
  static async getMessage(id: string): Promise<MailboxMessage> {
    const { data, error } = await supabase
      .from('mailbox_messages')
      .select(`
        *,
        attachments:mailbox_attachments(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as MailboxMessage;
  }

  // Enviar nova mensagem
  static async sendMessage(request: SendMessageRequest): Promise<MailboxMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const messageData = {
      user_id: user.id,
      subject: request.subject,
      body: request.body || '',
      from_email: request.from_email,
      from_name: request.from_name,
      to_email: request.to_email,
      to_name: request.to_name,
      cc_emails: request.cc_emails || [],
      bcc_emails: request.bcc_emails || [],
      status: 'sent' as const,
      folder: 'sent' as const,
      is_html: request.is_html || true,
      has_attachments: (request.attachments?.length || 0) > 0,
      sent_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('mailbox_messages')
      .insert(messageData)
      .select()
      .single();

    if (error) throw error;

    return data as MailboxMessage;
  }

  // Atualizar status da mensagem
  static async updateMessageStatus(request: UpdateMessageStatusRequest): Promise<MailboxMessage> {
    const updateData: any = {
      status: request.status,
      updated_at: new Date().toISOString()
    };

    if (request.folder) {
      updateData.folder = request.folder;
    }

    if (request.status === 'read' && !updateData.read_at) {
      updateData.read_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('mailbox_messages')
      .update(updateData)
      .eq('id', request.id)
      .select()
      .single();

    if (error) throw error;
    return data as MailboxMessage;
  }

  // Deletar mensagem
  static async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('mailbox_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Buscar contadores por pasta
  static async getFolderCounts(): Promise<MailboxFolderCount[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.rpc('get_mailbox_folder_counts', {
      p_user_id: user.id
    });

    if (error) throw error;
    return data || [];
  }

  // Buscar configurações do usuário
  static async getSettings(): Promise<MailboxSettings | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('mailbox_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data as MailboxSettings | null;
  }

  // Salvar configurações
  static async saveSettings(settings: Partial<MailboxSettings>): Promise<MailboxSettings> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('mailbox_settings')
      .upsert({
        user_id: user.id,
        ...settings,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data as MailboxSettings;
  }

  // Buscar thread completa
  static async getThread(threadId: string): Promise<{ thread: MailboxThread; messages: MailboxMessage[] }> {
    const [threadResult, messagesResult] = await Promise.all([
      supabase
        .from('mailbox_threads')
        .select('*')
        .eq('id', threadId)
        .single(),
      supabase
        .from('mailbox_messages')
        .select(`
          *,
          attachments:mailbox_attachments(*)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true })
    ]);

    if (threadResult.error) throw threadResult.error;
    if (messagesResult.error) throw messagesResult.error;

    return {
      thread: threadResult.data as MailboxThread,
      messages: (messagesResult.data || []) as MailboxMessage[]
    };
  }
}
