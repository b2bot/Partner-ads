
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MetricsConfig {
  dashboard: string[];
  campaigns: string[];
  adsets: string[];
  ads: string[];
}

const defaultConfig: MetricsConfig = {
  dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
  campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach'],
  adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
  ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc']
};

export function useMetricsConfig() {
  const [config, setConfig] = useState<MetricsConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics_config')
        .select('config')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading metrics config:', error);
      } else if (data && data.config) {
        // Safely parse the config data
        let parsedConfig: MetricsConfig;
        if (typeof data.config === 'string') {
          parsedConfig = JSON.parse(data.config);
        } else if (typeof data.config === 'object' && data.config !== null) {
          // Type assertion for the config object
          parsedConfig = data.config as unknown as MetricsConfig;
        } else {
          parsedConfig = defaultConfig;
        }
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error('Error loading metrics config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (newConfig: MetricsConfig) => {
    try {
      // Convert config to JSON string for storage
      const configJson = JSON.stringify(newConfig);
      
      const { error } = await supabase
        .from('metrics_config')
        .upsert([{ config: configJson }], { onConflict: 'id' });

      if (error) throw error;
      setConfig(newConfig);
      return true;
    } catch (error) {
      console.error('Error saving metrics config:', error);
      return false;
    }
  };

  return {
    config,
    loading,
    saveConfig
  };
}
