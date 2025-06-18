
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SheetRow {
  [key: string]: any;
}

export interface Platform {
  id: string;
  name: string;
  active: boolean;
}

export interface UseSheetDataReturn {
  data: SheetRow[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  currentSheetId: string;
  setCurrentSheetId: (id: string) => void;
}

export const useSheetData = (clientId?: string): UseSheetDataReturn => {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSheetId, setCurrentSheetId] = useState<string>('');

  const fetchData = async () => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    try {
      // Simular dados para teste já que a tabela sheet_data não existe
      const mockData = [
        {
          id: '1',
          campaign_name: 'Campanha Teste 1',
          adset_name: 'Conjunto 1',
          ad_name: 'Anúncio 1',
          impressions: 1000,
          clicks: 50,
          amountSpent: 100,
          day: '2024-01-15'
        },
        {
          id: '2',
          campaign_name: 'Campanha Teste 2',
          adset_name: 'Conjunto 2',
          ad_name: 'Anúncio 2',
          impressions: 2000,
          clicks: 80,
          amountSpent: 150,
          day: '2024-01-16'
        }
      ];

      setData(mockData);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [clientId]);

  return {
    data,
    loading,
    error,
    refetch,
    currentSheetId,
    setCurrentSheetId
  };
};
