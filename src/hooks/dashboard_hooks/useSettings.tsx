
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SettingsData {
  [key: string]: any;
}

interface SettingsContextType {
  settings: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
  clientId?: string;
}

export function SettingsProvider({ children, clientId }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, [clientId]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('client_id', clientId || 'default')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data?.data && typeof data.data === 'object') {
        setSettings(data.data as SettingsData);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SettingsData>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      const { error } = await supabase
        .from('settings')
        .upsert({
          client_id: clientId || 'default',
          data: updatedSettings
        });

      if (error) throw error;
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}
