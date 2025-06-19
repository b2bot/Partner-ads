
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
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
  const { hasPermission, isAdmin, isCliente } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState('meta');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  const [filters, setFilters] = useState({
    account: '',
    campaign: '',
    adset: '',
    ad: ''
  });

  // Mock data query - substituir pela integração real com a API
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports', selectedPlatform, selectedClient, dateRange, filters],
    queryFn: async () => {
      // Simular chamada para a API do Google Sheets
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        metrics: {
          impressions: 1250000,
          clicks: 45200,
          spend: 15600.50,
          conversions: 892,
          ctr: 3.62,
          cpc: 0.35,
          cpm: 12.48
        },
        chartData: [
          { date: '2024-01-01', impressions: 12000, clicks: 450, spend: 1200 },
          { date: '2024-01-02', impressions: 15000, clicks: 520, spend: 1400 },
          { date: '2024-01-03', impressions: 11000, clicks: 380, spend: 1100 },
        ],
        tableData: [
          { 
            campaign: 'Campanha Verão 2024', 
            impressions: 125000, 
            clicks: 4200, 
            spend: 1560.50,
            ctr: 3.36,
            cpc: 0.37
          },
        ]
      };
    }
  });

  // Persistir filtros no localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('reports-filters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reports-filters', JSON.stringify(filters));
  }, [filters]);

  const isSpecialPlatform = selectedPlatform === 'relatorios';

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-800">
            Relatórios Personalizados
          </h1>
          <p className="text-slate-600 text-xs">
            Métricas, tendências e performance de campanhas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!isCliente && (
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecionar Cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente1">Cliente A</SelectItem>
                <SelectItem value="cliente2">Cliente B</SelectItem>
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

      {!isSpecialPlatform && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={filters.account} onValueChange={(value) => setFilters(prev => ({ ...prev, account: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as Contas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conta1">Conta Principal</SelectItem>
              <SelectItem value="conta2">Conta Secundária</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.campaign} onValueChange={(value) => setFilters(prev => ({ ...prev, campaign: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as Campanhas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="camp1">Campanha Verão</SelectItem>
              <SelectItem value="camp2">Campanha Inverno</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.adset} onValueChange={(value) => setFilters(prev => ({ ...prev, adset: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os Grupos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adset1">Grupo A</SelectItem>
              <SelectItem value="adset2">Grupo B</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.ad} onValueChange={(value) => setFilters(prev => ({ ...prev, ad: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os Anúncios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ad1">Anúncio 1</SelectItem>
              <SelectItem value="ad2">Anúncio 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

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
