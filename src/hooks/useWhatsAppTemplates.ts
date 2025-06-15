
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WhatsAppTemplate {
  id: string;
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION' | string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
  header_type?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  header_text?: string;
  body_text: string;
  footer_text?: string;
  variables: string[];
  components: any;
}

export function useWhatsAppTemplates() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_templates')
        .select('*')
        .eq('status', 'APPROVED')
        .order('name');

      if (error) throw error;

      // Normalizar os dados vindos do Supabase para corresponder à interface local
      const normalizedTemplates: WhatsAppTemplate[] = (data || []).map(template => ({
        id: template.id,
        name: template.name,
        language: template.language,
        category: ['MARKETING', 'UTILITY', 'AUTHENTICATION'].includes(template.category) 
          ? template.category as 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
          : template.category,
        status: ['APPROVED', 'PENDING', 'REJECTED'].includes(template.status)
          ? template.status as 'APPROVED' | 'PENDING' | 'REJECTED'
          : template.status,
        header_type: template.header_type as 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | undefined,
        header_text: template.header_text || undefined,
        body_text: template.body_text,
        footer_text: template.footer_text || undefined,
        variables: Array.isArray(template.variables) ? template.variables as string[] : [],
        components: template.components,
      }));

      setTemplates(normalizedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncTemplates = async () => {
    try {
      setLoading(true);
      // Aqui você implementaria a sincronização com a API do WhatsApp
      // Por enquanto, vamos simular alguns templates
      
      const mockTemplates = [
        {
          name: 'relatorio_semanal',
          language: 'pt_BR',
          category: 'UTILITY' as const,
          status: 'APPROVED' as const,
          body_text: 'Olá {{client_name}}! Segue o relatório semanal de {{date_range}}. Investimento: {{total_spend}}. Resultados: {{total_results}}.',
          variables: ['client_name', 'date_range', 'total_spend', 'total_results'],
          components: {},
        },
        {
          name: 'promocao_mensal',
          language: 'pt_BR',
          category: 'MARKETING' as const,
          status: 'APPROVED' as const,
          body_text: 'Olá {{client_name}}! Confira nossa promoção especial para {{month}}. Desconto de {{discount}}% válido até {{valid_until}}.',
          variables: ['client_name', 'month', 'discount', 'valid_until'],
          components: {},
        },
      ];

      for (const template of mockTemplates) {
        await supabase
          .from('whatsapp_templates')
          .upsert(template);
      }

      await fetchTemplates();
      
      toast({
        title: "Sucesso",
        description: "Templates sincronizados com sucesso",
      });
    } catch (error) {
      console.error('Error syncing templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao sincronizar templates",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    fetchTemplates,
    syncTemplates,
  };
}
