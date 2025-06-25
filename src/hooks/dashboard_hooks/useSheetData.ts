import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface SheetRow {
  [key: string]: any;
}

const SHEET_ID = '1RkIUU3a_arzxY7IGAtl8sPeNLA9Ztkj4y0CRtrpBAuE';
const BASE_URL = import.meta.env.VITE_GSHEETS_API_URL || 'https://gsheets-api-1bdv.vercel.app';

export const useSheetData = (
  aba: string,
  accountName?: string,
): UseQueryResult<SheetRow[], Error> => {
  return useQuery<SheetRow[]>({
    queryKey: ['sheet-data', aba, accountName],
    queryFn: async () => {
      if (!aba) return [];
      const url = `${BASE_URL}/api/sheets?sheetId=${SHEET_ID}&range=${encodeURIComponent(aba)}!A:Z`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch sheet data');
      const json = await res.json();
      const rows: string[][] = json?.data || [];
      if (!rows.length) return [];
      const [header, ...dataRows] = rows;

      const normalizeKey = (key: string) => {
        const clean = key.toLowerCase().replace(/[_\s]+/g, '');
        const mappings: Record<string, string> = {
          impressions: 'impressions',
          impressoes: 'impressions',
          clicks: 'clicks',
          cliques: 'clicks',
          spend: 'amountSpent',
          amountspent: 'amountSpent',
          investimento: 'amountSpent',
          cost: 'amountSpent', // google cost column
          conversions: 'conversions',
          resultados: 'conversions',
          mensagensstarted: 'actionMessagingConversationsStarted',
          messagingconversationsstarted: 'actionMessagingConversationsStarted',
          costperconversion: 'costPerActionMessagingConversations',
          custopormensagens: 'costPerActionMessagingConversations',
          custoporconversao: 'costPerActionMessagingConversations',
        };

        for (const mapKey of Object.keys(mappings)) {
          if (clean.includes(mapKey)) return mappings[mapKey];
        }

        return key
          .toLowerCase()
          .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      };

      const normalizedHeader = header.map(normalizeKey);

      const mapped = dataRows.map((row) => {
        const obj: SheetRow = {};
        normalizedHeader.forEach((key, idx) => {
          obj[key] = row[idx];
        });
        return obj;
      });
      return accountName
        ? mapped.filter((r) => r['Account Name'] === accountName)
        : mapped;
    },
  });
};
