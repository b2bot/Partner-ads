
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
      const { data: sheetData, error: sheetError } = await supabase
        .from('sheet_data')
        .select('*')
        .eq('client_id', clientId);

      if (sheetError) throw sheetError;

      const parsedData = sheetData?.map(row => ({
        ...row,
        data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data
      })) || [];

      setData(parsedData);
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
