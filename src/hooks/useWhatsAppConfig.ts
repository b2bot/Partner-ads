import { useState, useEffect } from 'react';
import { apiClient } from '@/integrations/apiClient';
import { useToast } from '@/hooks/use-toast';

export interface WhatsAppConfig {
  id: string;
  phone_number_id: string;
  access_token: string;
  business_account_id?: string;
  webhook_verify_token?: string;
  status: 'connected' | 'disconnected' | 'error' | string;
  last_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export function useWhatsAppConfig() {
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConfig = async () => {
    try {
      const { data, error } = await apiClient
        .from('whatsapp_config')
        .select('*')
        .limit(1)
        .single();

      if (error) throw new Error(error.message);

      setConfig(data ?? null);
    } catch (error: any) {
      console.error('Erro ao carregar configuração do WhatsApp:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar configuração do WhatsApp. Verifique permissões.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (configData: Partial<WhatsAppConfig>) => {
    try {
      const payload = {
        phone_number_id: configData.phone_number_id ?? '',
        access_token: configData.access_token ?? '',
        business_account_id: configData.business_account_id,
        webhook_verify_token: configData.webhook_verify_token,
        status: configData.status ?? 'disconnected',
        last_verified_at: configData.last_verified_at,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await apiClient
        .from('whatsapp_config')
        .upsert([{
          ...payload,
          ...(configData.id ? { id: configData.id } : {}),
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);

      setConfig(data);
      toast({
        title: 'Sucesso',
        description: 'Configuração do WhatsApp atualizada',
      });
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar configuração',
        variant: 'destructive',
      });
    }
  };

  const testConnection = async () => {
    if (!config) return false;

    try {
      const isConnected = true; // ✅ Substituir futuramente por chamada real ao WhatsApp
      await updateConfig({
        ...config,
        status: isConnected ? 'connected' : 'error',
        last_verified_at: new Date().toISOString(),
      });

      return isConnected;
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
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
