
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WhatsAppMessage {
  id: string;
  phone_number: string;
  message_type: string;
  template_name?: string;
  message_content?: string;
  template_variables?: Record<string, string>;
  status: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  created_at: string;
}

export function useWhatsAppMessages() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Mock messages for development
      setMessages([
        {
          id: '1',
          phone_number: '+5511999999999',
          message_type: 'template',
          template_name: 'relatorio_semanal',
          status: 'delivered',
          sent_at: new Date().toISOString(),
          delivered_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          phone_number: '+5511888888888',
          message_type: 'template',
          template_name: 'promocao_mensal',
          status: 'sent',
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async ({ phoneNumber, templateName, templateVariables, contactId }: {
    phoneNumber: string;
    templateName: string;
    templateVariables: Record<string, string>;
    contactId?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert({
          phone_number: phoneNumber,
          message_type: 'template',
          template_name: templateName,
          template_variables: templateVariables,
          contact_id: contactId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchMessages();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const sendBulkMessages = async (phoneNumbers: string[], templateName: string, templateVariables: Record<string, string>) => {
    try {
      const messages = phoneNumbers.map(phoneNumber => ({
        phone_number: phoneNumber,
        message_type: 'template',
        template_name: templateName,
        template_variables: templateVariables,
        status: 'pending'
      }));

      const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert(messages)
        .select();

      if (error) throw error;

      await fetchMessages();
      return data;
    } catch (error) {
      console.error('Error sending bulk messages:', error);
      throw error;
    }
  };

  const getMessageStats = () => {
    const total = messages.length;
    const delivered = messages.filter(m => m.status === 'delivered').length;
    const read = messages.filter(m => m.status === 'read').length;
    const failed = messages.filter(m => m.status === 'failed').length;
    const pending = messages.filter(m => m.status === 'pending').length;

    return {
      total,
      delivered,
      read,
      failed,
      pending,
      deliveryRate: total > 0 ? Math.round((delivered / total) * 100) : 0,
      readRate: delivered > 0 ? Math.round((read / delivered) * 100) : 0
    };
  };

  return {
    messages,
    loading,
    fetchMessages,
    sendMessage,
    sendBulkMessages,
    getMessageStats
  };
}
