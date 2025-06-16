
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WhatsAppContact {
  id: string;
  name: string;
  phone_number: string;
  grupo?: string;
  observacoes?: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useWhatsAppContacts() {
  const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      const parsedContacts: WhatsAppContact[] = (data || []).map(contact => ({
        ...contact,
        tags: Array.isArray(contact.tags) ? contact.tags : []
      }));

      setContacts(parsedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Mock contacts for development
      setContacts([
        {
          id: '1',
          name: 'João Silva',
          phone_number: '+5511999999999',
          grupo: 'Clientes Premium',
          observacoes: 'Cliente VIP',
          tags: ['vip', 'premium'],
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Maria Santos',
          phone_number: '+5511888888888',
          grupo: 'Leads',
          observacoes: 'Interesse em campanhas',
          tags: ['lead', 'marketing'],
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: Partial<WhatsAppContact>) => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .insert(contactData)
        .select()
        .single();

      if (error) throw error;

      await fetchContacts();
      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  };

  const updateContact = async (id: string, contactData: Partial<WhatsAppContact>) => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .update(contactData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchContacts();
      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_contacts')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const getAllTags = () => {
    const allTags = contacts.flatMap(contact => contact.tags);
    return [...new Set(allTags)];
  };

  return {
    contacts,
    loading,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    getAllTags
  };
}
