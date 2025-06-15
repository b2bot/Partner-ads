
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WhatsAppConfig {
  id: string;
  phone_number_id: string;
  access_token: string;
  business_account_id?: string;
  status: 'connected' | 'disconnected' | 'error';
  last_verified_at?: string;
}

export function useWhatsAppConfig() {
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setConfig(data);
    } catch (error) {
      console.error('Error fetching WhatsApp config:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar configuração do WhatsApp",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (configData: Partial<WhatsAppConfig>) => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .upsert({
          ...configData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setConfig(data);
      toast({
        title: "Sucesso",
        description: "Configuração do WhatsApp atualizada",
      });
    } catch (error) {
      console.error('Error updating WhatsApp config:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar configuração",
        variant: "destructive",
      });
    }
  };

  const testConnection = async () => {
    if (!config) return false;

    try {
      // Simulação de teste de conexão - aqui você implementaria a chamada real para a API
      const isConnected = true; // Placeholder
      
      await updateConfig({
        ...config,
        status: isConnected ? 'connected' : 'error',
        last_verified_at: new Date().toISOString(),
      });

      return isConnected;
    } catch (error) {
      console.error('Error testing connection:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    loading,
    updateConfig,
    testConnection,
    refetch: fetchConfig,
  };
}
