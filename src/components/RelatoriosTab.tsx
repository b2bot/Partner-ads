
import React, { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { useSheetData } from '@/hooks/dashboard_hooks/useSheetData';
import { platformConfig } from '@/hooks/dashboard_hooks/usePlatformNavigation';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { ReportsMetricsCards } from '@/components/reports/ReportsMetricsCards';
import { ReportsCharts } from '@/components/reports/ReportsCharts';
import { ReportsTable } from '@/components/reports/ReportsTable';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType;
  color: string;
}

const platforms: Platform[] = [
  { id: 'meta', name: 'Meta', icon: BarChart3, color: 'bg-blue-500' },
  { id: 'google', name: 'Google', icon: BarChart3, color: 'bg-red-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: BarChart3, color: 'bg-blue-600' },
  { id: 'youtube', name: 'YouTube', icon: BarChart3, color: 'bg-red-600' },
  { id: 'tiktok', name: 'TikTok', icon: BarChart3, color: 'bg-black' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'bg-orange-500' },
  { id: 'instagram', name: 'Instagram', icon: BarChart3, color: 'bg-pink-500' },
  { id: 'b2bot', name: 'B2Bot', icon: BarChart3, color: 'bg-green-500' },
  { id: 'relatorios', name: 'Relatórios', icon: BarChart3, color: 'bg-purple-500' },
];

const metricMap: Record<string, Record<string, string>> = {
  Meta: {
    impressions: 'Impressions',
    clicks: 'Clicks',
    spend: 'Spend (Cost, Amount Spent)',
    cpc: 'CPC (Cost per Click)',
    cpm: 'CPM (Cost per 1000 Impressions)',
    ctr: 'CTR (Clickthrough Rate)',
  },
  Google: {
    impressions: 'Impressions',
    clicks: 'Clicks',
    spend: 'Cost (Spend, Amount Spent)',
    cpc: 'Average CPC',
    cpm: 'Average CPM',
    ctr: 'CTR',
  },
  LinkedIn: {
    impressions: 'Ad Analytics Impressions',
    clicks: 'Ad Analytics Clicks',
    spend: 'Ad Analytics Cost (USD)',
    cpc: 'CPC',
    cpm: 'CPM',
    ctr: 'CTR',
  },
};

function RelatoriosContent() {
  const { hasPermission, isAdmin, isCliente, profile } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState('meta');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });

  const accountFilter = isCliente ? profile?.account_name || '' : selectedClient;
  const sheetName = platformConfig[selectedPlatform]?.sheetRange.split('!')[0] || selectedPlatform;

  const { data: allRows = [], isLoading, error } = useSheetData(
    sheetName,
    accountFilter || undefined,
  );

  const { data: accountRows = [] } = useSheetData(sheetName);
  const accountOptions = useMemo(
    () => [...new Set(accountRows.map((r) => r['Account Name']))].filter(Boolean),
    [accountRows],
  );

  const dateKey = useMemo(() => {
    const sample = allRows[0] || {};
    const lowerKeys: Record<string, string> = {};
    Object.keys(sample).forEach((k) => {
      lowerKeys[k.toLowerCase()] = k;
    });

    if (lowerKeys['data']) return lowerKeys['data'];
    if (lowerKeys['date']) return lowerKeys['date'];
    if (lowerKeys['day']) return lowerKeys['day'];

    const dateLike = Object.keys(lowerKeys).find((k) =>
      k.includes('date') || k.includes('day'),
    );

    return dateLike ? lowerKeys[dateLike] : 'Data';
  }, [allRows]);

  const filteredByDate = useMemo(() => {
    return allRows.filter((row) => {
      const dateValue = row[dateKey];
      if (!dateValue) return false;
      const d = new Date(dateValue);
      return d >= dateRange.from && d <= dateRange.to;
    });
  }, [allRows, dateRange, dateKey]);

  const reportData = useMemo(() => {
    if (filteredByDate.length === 0) return null;

    const mapping = metricMap[sheetName] || {};

    const sum = (field: string) =>
      filteredByDate.reduce((acc, row) => acc + (Number(row[field]) || 0), 0);

    if (selectedPlatform === 'relatorios') {
      const metrics = {
        contatos: sum('Contatos'),
        agendado: sum('Agendado'),
        atendimento: sum('Atendimento'),
        orcamentos: sum('Orçamentos'),
        vendas: sum('Vendas'),
        faturado: sum('Faturado'),
      };

      const chartMap: Record<string, any> = {};
      filteredByDate.forEach((row) => {
        const date = row['Data'];
        if (!chartMap[date]) {
          chartMap[date] = {
            date,
            contatos: 0,
            agendado: 0,
            atendimento: 0,
            vendas: 0,
          };
        }
        chartMap[date].contatos += Number(row['Contatos']) || 0;
        chartMap[date].agendado += Number(row['Agendado']) || 0;
        chartMap[date].atendimento += Number(row['Atendimento']) || 0;
        chartMap[date].vendas += Number(row['Vendas']) || 0;
      });

      const chartData = Object.values(chartMap).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      return { metrics, chartData, tableData: filteredByDate };
    }

    const sample = filteredByDate[0] || {};
    const getKey = (names: string[]): string | null => {
      const lowerMap: Record<string, string> = {};
      Object.keys(sample).forEach((k) => {
        lowerMap[k.toLowerCase()] = k;
      });
      for (const n of names) {
        const lower = n.toLowerCase();
        if (lowerMap[lower]) return lowerMap[lower];
      }
      const partial = Object.keys(lowerMap).find((k) =>
        names.some((n) => k.includes(n.toLowerCase())),
      );
      return partial ? lowerMap[partial] : null;
    };

    const impressionsKey = mapping.impressions || getKey(['impressions', 'impressões']);
    const clicksKey = mapping.clicks || getKey(['clicks', 'cliques']);
    const spendKey = mapping.spend || getKey(['spend', 'amount spent', 'investimento']);
    const conversionsKey = getKey(['conversions', 'resultados', 'leads']);
    const ctrKey = mapping.ctr || getKey(['ctr']);
    const cpcKey = mapping.cpc || getKey(['cpc']);
    const cpmKey = mapping.cpm || getKey(['cpm']);
    const campaignKey = getKey(['campaign name', 'campanha']);
    const adSetKey = getKey(['ad set name', 'conjunto', 'grupo']);
    const adNameKey = getKey(['ad name', 'anuncio']);

    const sumKey = (key: string | null) =>
      key
        ? filteredByDate.reduce((acc, row) => acc + (Number(row[key]) || 0), 0)
        : 0;

    const metrics = {
      impressions: sumKey(impressionsKey),
      clicks: sumKey(clicksKey),
      spend: sumKey(spendKey),
      conversions: sumKey(conversionsKey),
      costPerConversion: 0,
    } as any;

    const clicksTotal = metrics.clicks || 0;
    const impressionsTotal = metrics.impressions || 0;
    const spendTotal = metrics.spend || 0;
    const conversionsTotal = metrics.conversions || 0;

    metrics.ctr = ctrKey
      ? filteredByDate.reduce((acc, row) => acc + (Number(row[ctrKey]) || 0), 0) /
          filteredByDate.length
      : impressionsTotal > 0
        ? (clicksTotal * 100) / impressionsTotal
        : 0;
    metrics.cpc = cpcKey
      ? filteredByDate.reduce((acc, row) => acc + (Number(row[cpcKey]) || 0), 0) /
          filteredByDate.length
      : clicksTotal > 0
        ? spendTotal / clicksTotal
        : 0;
    metrics.cpm = cpmKey
      ? filteredByDate.reduce((acc, row) => acc + (Number(row[cpmKey]) || 0), 0) /
          filteredByDate.length
      : impressionsTotal > 0
        ? (spendTotal / impressionsTotal) * 1000
        : 0;
    metrics.costPerConversion = costConvKey
      ? filteredByDate.reduce((acc, row) => acc + (Number(row[costConvKey]) || 0), 0) /
          filteredByDate.length
      : conversionsTotal > 0
        ? spendTotal / conversionsTotal
        : 0;

    const chartMap: Record<string, any> = {};
    filteredByDate.forEach((row) => {
      const date = row[dateKey];
      if (!chartMap[date]) {
        chartMap[date] = { date, impressions: 0, clicks: 0, spend: 0 };
      }
      if (impressionsKey) chartMap[date].impressions += Number(row[impressionsKey]) || 0;
      if (clicksKey) chartMap[date].clicks += Number(row[clicksKey]) || 0;
      if (spendKey) chartMap[date].spend += Number(row[spendKey]) || 0;
    });

    const chartData = Object.values(chartMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const mapRow = (row: any) => ({
      campaign: campaignKey ? row[campaignKey] : row['Campaign'] || row['Campanha'],
      impressions: impressionsKey ? Number(row[impressionsKey]) || 0 : 0,
      clicks: clicksKey ? Number(row[clicksKey]) || 0 : 0,
      spend: spendKey ? Number(row[spendKey]) || 0 : 0,
      ctr:
        ctrKey && row[ctrKey]
          ? Number(row[ctrKey])
          : impressionsKey && Number(row[impressionsKey])
            ? ((Number(row[clicksKey]) || 0) * 100) / Number(row[impressionsKey])
            : 0,
      cpc:
        cpcKey && row[cpcKey]
          ? Number(row[cpcKey])
          : Number(row[clicksKey])
            ? Number(row[spendKey] || 0) / Number(row[clicksKey])
            : 0,
      conversions: conversionsKey ? Number(row[conversionsKey]) || 0 : 0,
      costPerConversion:
        costConvKey && row[costConvKey]
          ? Number(row[costConvKey])
          : Number(row[conversionsKey])
            ? Number(row[spendKey] || 0) / Number(row[conversionsKey])
            : 0,
    });

    const tableData = filteredByDate.map(mapRow);

    const groupRows = (key: string | null) => {
      if (!key) return [] as typeof tableData;
      const groups: Record<string, any> = {};
      filteredByDate.forEach((r) => {
        const name = r[key];
        if (!name) return;
        if (!groups[name]) {
          groups[name] = { name, rows: [] as any[] };
        }
        groups[name].rows.push(mapRow(r));
      });
      return Object.values(groups).map((g: any) => {
        const base = { campaign: g.name, impressions: 0, clicks: 0, spend: 0, conversions: 0 } as any;
        g.rows.forEach((row: any) => {
          base.impressions += row.impressions;
          base.clicks += row.clicks;
          base.spend += row.spend;
          base.conversions += row.conversions;
        });
        base.ctr = base.impressions > 0 ? (base.clicks * 100) / base.impressions : 0;
        base.cpc = base.clicks > 0 ? base.spend / base.clicks : 0;
        base.costPerConversion = base.conversions > 0 ? base.spend / base.conversions : 0;
        return base;
      });
    };

    if (selectedPlatform === 'meta') {
      return {
        metrics,
        chartData,
        tableData: {
          campaigns: groupRows(campaignKey),
          adsets: groupRows(adSetKey),
          ads: groupRows(adNameKey),
        },
      };
    }

    return { metrics, chartData, tableData };
  }, [filteredByDate, selectedPlatform, dateKey, sheetName]);


  return (
    <div className="w-full p-0 m-0 space-y-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
         {/* <h1 className="text-lg font-bold text-slate-800">
            Relatórios Personalizados
          </h1>
          <p className="text-slate-600 text-xs">
            Métricas, tendências e performance de campanhas
          </p>*/}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!isCliente && (
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecionar Cliente" />
              </SelectTrigger>
              <SelectContent>
                {accountOptions.map((acc) => (
                  <SelectItem key={acc} value={acc}>{acc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <DatePickerWithRange
            date={dateRange}
            onDateChange={setDateRange}
          />

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="bg-transparent border-none shadow-none p-0">
        <CardContent className="p-0">
          <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-10 gap-2 px-1 py-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl w-full">
              {platforms.map((platform) => (
                <TabsTrigger
                  key={platform.id}
                  value={platform.id}
                  className="flex items-center justify-start gap-2 text-xs font-medium px-4 py-1.5 rounded-1x transition-colors data-[state=active]:bg-blue-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <div className={`w-2 h-2 rounded-full ${platform.color}`} />
                  {platform.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>


      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-transparent border-none shadow-none p-0">
                <div className="p-6">
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      ) : error ? (
        <p className="text-sm text-red-500">Erro ao carregar dados.</p>
      ) : (
        <div className="space-y-6">
          {/* Cards de Métricas */}
          <ReportsMetricsCards 
            data={reportData?.metrics} 
            platform={selectedPlatform} 
          />

          {/* Gráficos */}
          <ReportsCharts 
            data={reportData?.chartData} 
            platform={selectedPlatform} 
          />

          {/* Tabela Detalhada */}
          <ReportsTable 
            data={reportData?.tableData} 
            platform={selectedPlatform} 
          />
        </div>
      )}
    </div>
  );
}

export const RelatoriosTab = RelatoriosContent;
