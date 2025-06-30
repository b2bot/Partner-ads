
import { useState, useEffect } from 'react';
import { apiClient } from '@/integrations/apiClient';
import { useToast } from '@/hooks/use-toast';

export interface WhatsAppContact {
  id: string;
  name: string;
  phone_number: string;
  client_id?: string;
  meta_account_id?: string;
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
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      const data = await apiClient.get<WhatsAppContact[]>('/api/whatsapp_contacts.php');
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar contatos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: Partial<WhatsAppContact>) => {
    try {
      const data = await apiClient.post<WhatsAppContact>(
        '/api/whatsapp_contacts.php',
        {
          name: contactData.name,
          phone_number: contactData.phone_number,
          client_id: contactData.client_id,
          meta_account_id: contactData.meta_account_id,
          grupo: contactData.grupo,
          observacoes: contactData.observacoes,
          tags: contactData.tags || [],
          is_active: true,
        }
      );

      // Atualizar lista local
      setContacts(prev => [...prev, data]);

      toast({
        title: "Sucesso",
        description: "Contato criado com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar contato",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateContact = async (id: string, contactData: Partial<WhatsAppContact>) => {
    try {
      const data = await apiClient.put<WhatsAppContact>(
        `/api/whatsapp_contacts.php?id=${id}`,
        {
          ...contactData,
          updated_at: new Date().toISOString(),
        }
      );

      // Atualizar lista local
      setContacts(prev => prev.map(contact => 
        contact.id === id ? { ...contact, ...data } : contact
      ));

      toast({
        title: "Sucesso",
        description: "Contato atualizado com sucesso",
      });

      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar contato",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await apiClient.delete(`/api/whatsapp_contacts.php?id=${id}`);

      // Remover da lista local
      setContacts(prev => prev.filter(contact => contact.id !== id));

      toast({
        title: "Sucesso",
        description: "Contato removido com sucesso",
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover contato",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getContactsByTag = (tag: string) => {
    return contacts.filter(contact => contact.tags.includes(tag));
  };

  const getAllTags = () => {
    const allTags = contacts.flatMap(contact => contact.tags);
    return [...new Set(allTags)].sort();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    createContact,
    updateContact,
    deleteContact,
    getContactsByTag,
    getAllTags,
    refetch: fetchContacts,
  };
}
