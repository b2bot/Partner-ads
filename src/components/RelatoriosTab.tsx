import React, { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { useSheetData } from '@/hooks/useSheetData';
import { platformConfig } from '@/hooks/reports/usePlatformNavigation';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { ReportsMetricsCards } from '@/components/reports/ReportsMetricsCards';
import { ReportsCharts } from '@/components/reports/ReportsCharts';
import { ReportsTable } from '@/components/reports/ReportsTable';
import FunnelVisualization from '@/components/reports/FunnelVisualization';

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
	conversions: 'Action Messaging Conversations Started (Onsite Conversion)',
    costPerConversion: 'Cost Per Action Messaging Conversations Started (Onsite Conversion)',
	thumbnailURL: 'Thumbnail URL',
    statusCampaign: 'status',
    statusAdSet: 'status',
    statusAd: 'Adcreative Status',
  },
  Google: {
    impressions: 'Impressions',
    clicks: 'Clicks',
    spend: 'Cost (Spend, Amount Spent)',
    cpc: 'Average CPC',
    cpm: 'Average CPM',
    ctr: 'CTR',
	conversions: 'Conversions',                    
    costPerConversion: 'Cost per Conversion',     
	conversionRate: 'Conversions from Interactions Rate',
	status: 'Status',
  },
  LinkedIn: {
    impressions: 'Ad Analytics Impressions',
    clicks: 'Ad Analytics Clicks',
    spend: 'Ad Analytics Cost (USD)',
    cpc: 'CPC',
    cpm: 'CPM',
    ctr: 'CTR',
    status: 'Status',
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
  const [lightboxSrc, setLightboxSrc] = useState<string|null>(null);

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

    return dateLike ? lowerKeys[dateLike] : 'Date';
  }, [allRows]);

  const filteredByDate = useMemo(() => {
    return allRows.filter((row) => {
      const dateValue = row[dateKey];
      if (!dateValue) return false;
      const d = new Date(dateValue);
      return d >= dateRange.from && d <= dateRange.to;
    });
  }, [allRows, dateRange, dateKey]);
  
  console.log('Amostra Meta raw row:', filteredByDate[0]);
  
  const reportData = useMemo(() => {
    if (filteredByDate.length === 0) return null;

    const mapping = metricMap[sheetName] || {};

    const parseNumber = (value: any) => {
      if (value === null || value === undefined) return 0;
      const normalized = String(value).replace(/\./g, '').replace(',', '.');
      return parseFloat(normalized) || 0;
    };

    const sum = (field: string) =>
      filteredByDate.reduce((acc, row) => acc + parseNumber(row[field]), 0);

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
        chartMap[date].contatos += parseNumber(row['Contatos']);
        chartMap[date].agendado += parseNumber(row['Agendado']);
        chartMap[date].atendimento += parseNumber(row['Atendimento']);
        chartMap[date].vendas += parseNumber(row['Vendas']);
      });

      const chartData = Object.values(chartMap).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      return { metrics, chartData, tableData: filteredByDate };
    }

    const getKey = (names: string[]): string | null => {
      const sample = filteredByDate[0]!;
      const lowerMap: Record<string, string> = {};
      Object.keys(sample).forEach(k => {
        lowerMap[k.toLowerCase()] = k;
      });
      for (const n of names) {
        if (lowerMap[n.toLowerCase()]) return lowerMap[n.toLowerCase()];
      }
      const found = Object.keys(lowerMap).find(k =>
        names.some(n => k.includes(n.toLowerCase()))
      );
      return found ? lowerMap[found] : null;
    };

    const impressionsKey = mapping.impressions || getKey(['impressions', 'impressões']);
    const clicksKey = mapping.clicks || getKey(['clicks', 'cliques']);
    const spendKey = mapping.spend || getKey(['spend', 'amountSpent', 'investimento', 'cost']);
    const conversionsKey = mapping.conversions || getKey(['conversions', 'conversões']);
    const costPerConversionKey = mapping.costPerConversion || getKey(['cost per conversion','custo']);
    const ctrKey = mapping.ctr || getKey(['ctr']);
    const cpcKey = mapping.cpc || getKey(['cpc']);
    const cpmKey = mapping.cpm || getKey(['cpm']);
    const campaignKey = getKey(['campaign name', 'campaignGroupName', 'campaign Group Name','campanha']);
    const adSetKey = getKey(['adset name', 'ad set name', 'adSetName', 'adGroupName', 'ad Group Name', 'conjunto', 'grupo']);
    const adNameKey = getKey(['ad name', 'anuncio', 'creative Name', 'creativeName']);
	const thumbKey = mapping.thumbnailURL || getKey(['thumbnail url', 'thumbnailURL']);
	const statusAdKey = mapping.statusAd || getKey(['adcreativeStatus', 'Adcreative Status', 'adCreativeStatus']);
	const statusCampaignKey = mapping.statusCampaign || getKey(['status']);
	const statusAdSetKey = mapping.statusAdSet|| getKey(['status']);


    const sumKey = (key: string | null) =>
      key ? filteredByDate.reduce((acc, row) => acc + parseNumber(row[key]), 0) : 0;

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
      ? filteredByDate.reduce((acc, row) => acc + parseNumber(row[ctrKey]), 0) /
          filteredByDate.length
      : impressionsTotal > 0
        ? (clicksTotal * 100) / impressionsTotal
        : 0;
    metrics.cpc = cpcKey
      ? filteredByDate.reduce((acc, row) => acc + parseNumber(row[cpcKey]), 0) /
          filteredByDate.length
      : clicksTotal > 0
        ? spendTotal / clicksTotal
        : 0;
    metrics.cpm = cpmKey
      ? filteredByDate.reduce((acc, row) => acc + parseNumber(row[cpmKey]), 0) /
          filteredByDate.length
      : impressionsTotal > 0
        ? (spendTotal / impressionsTotal) * 1000
        : 0;
    metrics.costPerConversion = costPerConversionKey
      ? filteredByDate.reduce((acc, row) => acc + parseNumber(row[costPerConversionKey]), 0) /
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
      if (impressionsKey) chartMap[date].impressions += parseNumber(row[impressionsKey]);
      if (clicksKey) chartMap[date].clicks += parseNumber(row[clicksKey]);
      if (spendKey) chartMap[date].spend += parseNumber(row[spendKey]);
    });

    const chartData = Object.values(chartMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const mapRow = (row: any) => ({
	  campaign: campaignKey ? row[campaignKey] : row['Campaign Name'] || row['Campanha'],
	  statusCampaign: statusCampaignKey ? row[statusCampaignKey] : row['status'],
	  adset: adSetKey ? row[adSetKey] : row['Adset Name'] || row['Ad Set Name'],
	  statusAdSet: statusAdSetKey ? row[statusAdSetKey] : row['status'],
	  adName: adNameKey ? row[adNameKey] : row['Ad Name'],
	  adCreativeStatus: statusAdKey ? row[statusAdKey] : row['Adcreative Status'],
	  date: row[dateKey],
	  impressions: impressionsKey ? parseNumber(row[impressionsKey]) : 0,
	  clicks: clicksKey ? parseNumber(row[clicksKey]) : 0,
	  spend: spendKey ? parseNumber(row[spendKey]) : 0,
	  ctr:
		ctrKey && row[ctrKey]
		  ? parseNumber(row[ctrKey])
		  : impressionsKey && parseNumber(row[impressionsKey])
			? (parseNumber(row[clicksKey]) * 100) / parseNumber(row[impressionsKey])
			: 0,
	  cpc:
		cpcKey && row[cpcKey]
		  ? parseNumber(row[cpcKey])
		  : parseNumber(row[clicksKey])
			? parseNumber(row[spendKey]) / parseNumber(row[clicksKey])
			: 0,
	  conversions: conversionsKey ? parseNumber(row[conversionsKey]) : 0,
	  costPerConversion:
		costPerConversionKey && row[costPerConversionKey]
		  ? parseNumber(row[costPerConversionKey])
		  : parseNumber(row[conversionsKey])
			? parseNumber(row[spendKey]) / parseNumber(row[conversionsKey])
			: 0,

	  creative: row[thumbKey] || '',

	  

	});

    if (selectedPlatform === 'meta') {
      const groupRows = (key: string | null) => {
        if (!key) return [] as ReturnType<typeof mapRow>[];
        const groups: Record<string, { name: string; rows: any[]; status: string }> = {};
        filteredByDate.forEach(r => {
          const name = r[key];
          if (!name) return;
          if (!groups[name]) {
            groups[name] = { 
              name, 
              rows: [], 
              status: r['status'] || '' 
            };
          }
          groups[name].rows.push(mapRow(r));
        });
        return Object.values(groups).map(g => {
          const base = { 
            campaign: g.name, 
            impressions: 0, 
            clicks: 0, 
            spend: 0, 
            conversions: 0,
            statusCampaign: g.status,
            statusAdSet: g.status,
            statusAd: g.adCreativeStatus,
            status: g.status
          } as any;
          g.rows.forEach(row => {
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

      return {
        metrics,
        chartData,
        tableData: {
          campaigns: groupRows(campaignKey),
          adsets: groupRows(adSetKey),
          ads: filteredByDate.map(mapRow),
        },
      };
    }

    // Para Google e demais plataformas
	return {
	  metrics,
	  chartData,
	  tableData: filteredByDate.map((row) => {
		console.log('Google raw row:', row);
		
		const parseNumber = (v: any) => {
		  const n = String(v).replace(/\./g, '').replace(',', '.');
		  return parseFloat(n) || 0;
		};

		const rawDate = row[dateKey];

		const adset =
		  row['Ad Group Name'] ||
		  row['adGroupName'] ||
		  row['Ad Set Name'] ||
		  row['Ad Set'] ||
		  row['Adset Name'] ||
		  row['Ad Set ID'] ||
		  '';

		return {
		  date: rawDate,
		  adset,
		  impressions: parseNumber(row[mapping.impressions || 'Impressions']),
		  clicks: parseNumber(row[mapping.clicks || 'Clicks']),
		  spend: parseNumber(row[mapping.spend || 'Cost (Spend, Amount Spent)']),
		  ctr: metrics.ctr,
		  conversions: parseNumber(row[mapping.conversions || 'Conversions']),
		  conversionRate:
			row[mapping.conversions || 'Conversions'] &&
			row[mapping.clicks || 'Clicks']
			  ? (parseNumber(row[mapping.conversions!]) * 100) /
				parseNumber(row[mapping.clicks!])
			  : 0,
		  costPerConversion:
			parseNumber(row[mapping.costPerConversion || 'Cost per Conversion']),
		  creative: row[thumbKey] || '',
		  status: row['Status'] || '',
		};
	  }),
	};
  }, [filteredByDate, selectedPlatform, sheetName, dateKey]);

  return (
    <div className="w-full p-0 m-0 space-y-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          {/*<h1 className="text-lg font-bold text-slate-800">
            Relatórios Personalizados
          </h1>*/}
          <p className="text-slate-600 text-xs flex items-center gap-1">
			<BarChart3 className="w-4 h-4" />
			Performance de mídia e relatórios
		  </p>
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

          {/*<Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>*/}
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
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-slate-100"
                >
                  <div className={`w-2 h-2 rounded-full ${platform.color}`} />
                  <span className="hidden sm:inline">{platform.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {platforms.map((platform) => (
              <TabsContent key={platform.id} value={platform.id} className="mt-6">
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                      ))}
                    </div>
                    <Skeleton className="h-64" />
                    <Skeleton className="h-96" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Erro ao carregar dados: {error.message}</p>
                  </div>
                ) : !reportData ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500">Nenhum dado encontrado para o período selecionado</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <ReportsMetricsCards 
                      data={reportData.metrics} 
                      platform={platform.id}
                    />
					
					
                    
                    <ReportsCharts 
                      data={reportData.chartData} 
                      platform={platform.id}
                    />
                    
                    <ReportsTable 
                      data={reportData.tableData} 
                      platform={platform.id}
                      onImageClick={setLightboxSrc}

                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {lightboxSrc && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="max-w-4xl max-h-4xl p-4">
            <img 
              src={lightboxSrc} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}





export const RelatoriosTab = RelatoriosContent;