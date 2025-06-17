
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';

export interface SheetRow {
  id?: string;
  day?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
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
  accountName?: string;
  responsavel?: string;
  observacoes?: string;
  submissionDate?: string;
  [key: string]: any;
}

export const useSheetData = (sheetId?: string, range?: string) => {
  return useQuery({
    queryKey: ['sheetData', sheetId, range],
    queryFn: async (): Promise<SheetRow[]> => {
      if (!sheetId || !range) {
        return [];
      }

      try {
        // Simulação de dados enquanto a API não está configurada
        const mockData: SheetRow[] = Array.from({ length: 50 }, (_, i) => ({
          id: `row_${i}`,
          day: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
          campaignName: `Campanha ${i + 1}`,
          adSetName: `Grupo ${i + 1}`,
          adName: `Anúncio ${i + 1}`,
          impressions: Math.floor(Math.random() * 10000) + 1000,
          clicks: Math.floor(Math.random() * 500) + 50,
          amountSpent: Math.random() * 1000 + 100,
          actionMessagingConversationsStarted: Math.floor(Math.random() * 50) + 5,
          costPerActionMessagingConversations: Math.random() * 50 + 10,
          actionLinkClicks: Math.floor(Math.random() * 300) + 30,
          reach: Math.floor(Math.random() * 8000) + 800,
          frequency: Math.random() * 3 + 1,
          cpm: Math.random() * 20 + 5,
          cpc: Math.random() * 5 + 1,
          accountName: `Conta ${Math.floor(i / 10) + 1}`,
          responsavel: `Responsável ${Math.floor(i / 5) + 1}`,
          observacoes: `Observação para o registro ${i + 1}`,
          submissionDate: format(new Date(), 'yyyy-MM-dd'),
        }));

        return mockData;
      } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
        return [];
      }
    },
    enabled: !!sheetId && !!range,
  });
};
