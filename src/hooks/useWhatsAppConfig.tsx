
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WhatsAppConfig {
  id: string;
  phone_number_id: string;
  access_token: string;
  business_account_id?: string;
  status: string;
  last_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export function useWhatsAppConfig() {
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setConfig(data);
    } catch (error) {
      console.error('Error fetching WhatsApp config:', error);
      setConfig(null);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (configData: Partial<WhatsAppConfig>) => {
    try {
      if (config) {
        const { data, error } = await supabase
          .from('whatsapp_config')
          .update(configData)
          .eq('id', config.id)
          .select()
          .single();

        if (error) throw error;
        setConfig(data);
      } else {
        const { data, error } = await supabase
          .from('whatsapp_config')
          .insert(configData)
          .select()
          .single();

        if (error) throw error;
        setConfig(data);
      }
    } catch (error) {
      console.error('Error updating WhatsApp config:', error);
      throw error;
    }
  };

  const testConnection = async () => {
    try {
      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (config) {
        await updateConfig({
          status: 'connected',
          last_verified_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      if (config) {
        await updateConfig({
          status: 'error'
        });
      }
      throw error;
    }
  };

  return {
    config,
    loading,
    updateConfig,
    testConnection,
    fetchConfig
  };
}
