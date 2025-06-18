import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SheetData {
  rows: any[];
  accounts: string[];
  updated_at?: string;
}

interface UseSheetDataReturn {
  data: SheetData | null;
  loading: boolean;
  error: string;
  fetchSheetData: (clientId: string, sheetId?: string) => Promise<void>;
  currentClientId: string;
  setCurrentClientId: (clientId: string) => void;
}

const initialState: SheetData = {
  rows: [],
  accounts: [],
};

export function useSheetData(): UseSheetDataReturn {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentClientId, setCurrentClientId] = useState('');

  const fetchSheetData = useCallback(async (clientId: string, sheetId?: string) => {
    console.log('🔄 Fetching sheet data for client:', clientId);
    
    if (!clientId) {
      console.log('❌ No client ID provided');
      setError('Cliente não selecionado');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Get client data from Supabase
      const { data: clientData, error: clientError } = await supabase
        .from('clientes')
        .select('nome, tipo_acesso')
        .eq('id', clientId)
        .single();

      if (clientError) throw clientError;

      // Determine the table name based on access type
      const tableName = clientData?.tipo_acesso === 'api' ? 'sheet_data' : 'sheet_data_google';

      // Fetch data from Supabase
      const { data: sheetData, error, } = await supabase
        .from(tableName)
        .select('*')
        .eq('client_id', clientId)
        .eq('sheet_id', sheetId || '')
        .single();

      if (error) {
        console.error('❌ Error fetching sheet data from Supabase:', error);
        setError('Erro ao buscar dados da planilha');
        return;
      }

      if (!sheetData?.data) {
        console.log('🗄️ No data found in Supabase, attempting to fetch from API');
        
        const response = await fetch(`/api/sheets?client=${encodeURIComponent(clientId)}&sheet=${encodeURIComponent(sheetId || '')}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const parsedData = await response.json();

        if (parsedData.error) {
          throw new Error(parsedData.error);
        }

        setData(parsedData);
        
      } else {
        console.log('✅ Sheet data loaded from Supabase');
        setData(sheetData.data as SheetData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('❌ Error fetching sheet data:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchSheetData,
    currentClientId,
    setCurrentClientId,
  };
}
