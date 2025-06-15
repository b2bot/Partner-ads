
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useWhatsAppConfig } from './useWhatsAppConfig';

export interface WhatsAppTemplate {
  id: string;
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  components: {
    type: string;
    format?: string;
    text?: string;
    parameters?: Array<{
      type: string;
      text?: string;
    }>;
  }[];
  variables: string[]; // Campos dinâmicos extraídos do template
}

export function useWhatsAppTemplates() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { config } = useWhatsAppConfig();
  const { toast } = useToast();

  const extractVariables = (components: any[]): string[] => {
    const variables: string[] = [];
    
    components.forEach(component => {
      if (component.text) {
        // Extrair variáveis no formato {{variavel}}
        const matches = component.text.match(/\{\{(\w+)\}\}/g);
        if (matches) {
          matches.forEach((match: string) => {
            const variable = match.replace(/\{\{|\}\}/g, '');
            if (!variables.includes(variable)) {
              variables.push(variable);
            }
          });
        }
      }
    });
    
    return variables;
  };

  const fetchTemplatesFromWhatsApp = async () => {
    if (!config?.business_account_id || !config?.access_token) {
      console.log('WhatsApp config not available');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${config.business_account_id}/message_templates?access_token=${config.access_token}`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar templates do WhatsApp');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      // Filtrar apenas templates aprovados
      const approvedTemplates = data.data
        .filter((template: any) => template.status === 'APPROVED')
        .map((template: any) => ({
          id: template.id,
          name: template.name,
          language: template.language,
          category: template.category,
          status: template.status,
          components: template.components,
          variables: extractVariables(template.components),
        }));

      setTemplates(approvedTemplates);

      // Sincronizar com banco local para cache
      await supabase
        .from('whatsapp_templates')
        .upsert(
          approvedTemplates.map(template => ({
            name: template.name,
            language: template.language,
            category: template.category,
            status: template.status,
            body_text: template.components.find(c => c.type === 'BODY')?.text || '',
            header_text: template.components.find(c => c.type === 'HEADER')?.text,
            footer_text: template.components.find(c => c.type === 'FOOTER')?.text,
            variables: template.variables,
            components: template.components,
          })),
          { onConflict: 'name' }
        );

    } catch (error) {
      console.error('Error fetching WhatsApp templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao buscar templates do WhatsApp Business",
        variant: "destructive",
      });
      
      // Fallback para templates locais
      await fetchLocalTemplates();
    } finally {
      setLoading(false);
    }
  };

  const fetchLocalTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_templates')
        .select('*')
        .eq('status', 'APPROVED')
        .order('name');

      if (error) throw error;

      const localTemplates: WhatsAppTemplate[] = (data || []).map(template => ({
        id: template.id,
        name: template.name,
        language: template.language,
        category: template.category as 'MARKETING' | 'UTILITY' | 'AUTHENTICATION',
        status: template.status as 'APPROVED' | 'PENDING' | 'REJECTED',
        components: template.components,
        variables: Array.isArray(template.variables) ? template.variables as string[] : [],
      }));

      setTemplates(localTemplates);
    } catch (error) {
      console.error('Error fetching local templates:', error);
    }
  };

  const getTemplatePreview = (template: WhatsAppTemplate, variables: Record<string, string> = {}) => {
    let preview = '';
    
    template.components.forEach(component => {
      if (component.type === 'HEADER' && component.text) {
        preview += `*${component.text}*\n\n`;
      } else if (component.type === 'BODY' && component.text) {
        let bodyText = component.text;
        // Substituir variáveis no preview
        Object.entries(variables).forEach(([key, value]) => {
          bodyText = bodyText.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `{{${key}}}`);
        });
        preview += `${bodyText}\n\n`;
      } else if (component.type === 'FOOTER' && component.text) {
        preview += `_${component.text}_`;
      }
    });
    
    return preview.trim();
  };

  useEffect(() => {
    if (config?.business_account_id && config?.access_token) {
      fetchTemplatesFromWhatsApp();
    } else {
      fetchLocalTemplates();
    }
  }, [config]);

  return {
    templates,
    loading,
    refetch: fetchTemplatesFromWhatsApp,
    getTemplatePreview,
  };
}
