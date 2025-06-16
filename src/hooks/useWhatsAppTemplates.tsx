
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  language: string;
  status: string;
  body_text: string;
  header_text?: string;
  footer_text?: string;
  variables: string[];
  components: any;
}

export function useWhatsAppTemplates() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_templates')
        .select('*')
        .eq('status', 'APPROVED')
        .order('name');

      if (error) throw error;

      const parsedTemplates: WhatsAppTemplate[] = (data || []).map(template => ({
        ...template,
        variables: Array.isArray(template.variables) ? template.variables : []
      }));

      setTemplates(parsedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Mock templates for development
      setTemplates([
        {
          id: '1',
          name: 'relatorio_semanal',
          category: 'UTILITY',
          language: 'pt_BR',
          status: 'APPROVED',
          body_text: 'Olá {{nome}}, seu relatório semanal está pronto! Total de vendas: {{vendas}}. Acesse o link: {{link}}',
          variables: ['nome', 'vendas', 'link'],
          components: {}
        },
        {
          id: '2',
          name: 'promocao_mensal',
          category: 'MARKETING',
          language: 'pt_BR',
          status: 'APPROVED',
          body_text: 'Promoção especial para {{nome}}! Desconto de {{desconto}}% válido até {{validade}}.',
          variables: ['nome', 'desconto', 'validade'],
          components: {}
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTemplatePreview = (template: WhatsAppTemplate, variables: Record<string, string>) => {
    let preview = template.body_text;
    
    template.variables.forEach(variable => {
      const value = variables[variable] || `{{${variable}}}`;
      preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });
    
    return preview;
  };

  return {
    templates,
    loading,
    fetchTemplates,
    getTemplatePreview
  };
}
