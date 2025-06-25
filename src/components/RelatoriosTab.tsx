
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

  const { data: allRows = [], isLoading } = useSheetData(sheetName, accountFilter || undefined);

  const { data: accountRows = [] } = useSheetData(sheetName);
  const accountOptions = useMemo(
    () => [...new Set(accountRows.map((r) => r['Account Name']))].filter(Boolean),
    [accountRows],
  );

  const dateKey = useMemo(() => {
    const sample = allRows[0] || {};
    if ('Data' in sample) return 'Data';
    if ('date' in sample) return 'date';
    if ('day' in sample) return 'day';
    return Object.keys(sample).find(k => k.toLowerCase().includes('date')) || 'Data';
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

    return { metrics: {}, chartData: [], tableData: filteredByDate };
  }, [filteredByDate, selectedPlatform]);


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
