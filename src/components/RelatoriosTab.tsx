
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart3, 
  Download
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { ReportsMetricsCards } from '@/components/reports/ReportsMetricsCards';
import { ReportsCharts } from '@/components/reports/ReportsCharts';
import { ReportsTable } from '@/components/reports/ReportsTable';
import { ProtectedRoute } from '@/components/ProtectedRoute';

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
  { id: 'relatorios', name: 'Relatórios Diários', icon: BarChart3, color: 'bg-purple-500' },
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

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports', selectedPlatform, selectedClient, dateRange, filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedPlatform === 'relatorios') {
        return {
          metrics: {
            contatos: 1250,
            agendado: 892,
            atendimento: 654,
            vendas: 234,
            orcamentos: 456,
            faturado: 125600.50
          },
          chartData: [
            { date: '2024-01-01', contatos: 120, agendado: 85, atendimento: 65, vendas: 25 },
            { date: '2024-01-02', contatos: 150, agendado: 102, atendimento: 78, vendas: 28 },
            { date: '2024-01-03', contatos: 110, agendado: 75, atendimento: 58, vendas: 22 },
          ],
          tableData: [
            { 
              data: '2024-01-01', 
              responsavel: 'João Silva',
              contatos: 120, 
              agendado: 85, 
              atendimento: 65,
              vendas: 25,
              orcamentos: 35
            },
          ]
        };
      }
      
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
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Relatórios Personalizados
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Visualize e analise suas métricas de campanhas e dados operacionais
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

      <Card className="premium-card">
        <CardContent className="p-4">
          <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 gap-1">
              {platforms.map((platform) => (
                <TabsTrigger
                  key={platform.id}
                  value={platform.id}
                  className="flex items-center gap-2 text-xs lg:text-sm"
                >
                  <div className={`w-2 h-2 rounded-full ${platform.color}`} />
                  <span className="hidden sm:inline">{platform.name}</span>
                  <span className="sm:hidden">{platform.name.slice(0, 3)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {!isSpecialPlatform && (
        <Card className="premium-card">
          <CardContent className="p-4">
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
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="premium-card">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-6">
          <ReportsMetricsCards 
            data={reportData?.metrics} 
            platform={selectedPlatform} 
          />

          <ReportsCharts 
            data={reportData?.chartData} 
            platform={selectedPlatform} 
          />

          <ReportsTable 
            data={reportData?.tableData} 
            platform={selectedPlatform} 
          />
        </div>
      )}
    </div>
  );
}

export default function Relatorios() {
  return (
    <ProtectedRoute requiredPermission="access_client_reports">
      <RelatoriosContent />
    </ProtectedRoute>
  );
}
