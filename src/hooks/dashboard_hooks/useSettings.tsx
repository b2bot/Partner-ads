
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SettingsData {
  [key: string]: any;
}

interface SettingsContextType {
  settings: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  updateSettings: async () => {},
  loading: false,
  error: null,
});

interface SettingsProviderProps {
  children: ReactNode;
  clientId: string;
}

export function SettingsProvider({ children, clientId }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('settings')
        .select('data')
        .eq('client_id', clientId)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      const settingsData = data?.data || {};
      if (typeof settingsData === 'object' && settingsData !== null) {
        setSettings(settingsData as SettingsData);
      } else {
        setSettings({});
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SettingsData>) => {
    if (!clientId) return;

    try {
      const updatedSettings = { ...settings, ...newSettings };

      const { error: updateError } = await supabase
        .from('settings')
        .upsert({
          client_id: clientId,
          data: updatedSettings,
        });

      if (updateError) {
        throw updateError;
      }

      setSettings(updatedSettings);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [clientId]);

  const value = {
    settings,
    updateSettings,
    loading,
    error,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
