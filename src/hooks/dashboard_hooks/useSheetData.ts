
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SheetRow {
  day?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
  accountName?: string;
  impressions?: number;
  clicks?: number;
  amountSpent?: number;
  actionMessagingConversationsStarted?: number;
  costPerActionMessagingConversations?: number;
  actionLinkClicks?: number;
  reach?: number;
  frequency?: number;
  cpm?: number;
  cpc?: number;
  [key: string]: any;
}

interface SheetDataHook {
  data: any[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSheetData(sheetId: string, range: string): SheetDataHook {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!sheetId || !range) {
      setData([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sheets?sheetId=${sheetId}&range=${range}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Process and transform the data
      const processedData = result.data || [];
      setData(processedData);
      
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sheetId, range]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
