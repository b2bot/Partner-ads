import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  // Adicione outras configurações aqui
}

const initialSettings: Settings = {
  theme: 'system',
  // Defina outros valores iniciais aqui
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSettings = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 1)
        .single();

      if (error) {
        throw error;
      }

      if (data?.data) {
        setSettings(data.data as Settings);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar configurações';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: Partial<Settings>) => {
    setLoading(true);
    setError('');
    
    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          id: 1,
          data: updatedSettings,
          client_id: null
        });

      if (error) {
        throw error;
      }

      setSettings(updatedSettings);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar configurações';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
    loadSettings
  };
}
