
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Filter, RefreshCw, Download, TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';
import { useSheetData, SheetRow } from '@/hooks/dashboard_hooks/useSheetData';
import { CampaignCharts } from '@/components/dashboard/CampaignCharts';
import { FunnelVisualization } from '@/components/dashboard/FunnelVisualization';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { useAuth } from '@/hooks/useAuth';

interface Platform {
  id: string;
  name: string;
  active: boolean;
}

export function ResultadosTab() {
  const { profile } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('meta');
  const [dateRange, setDateRange] = useState<string>('30d');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { data, loading, error, refetch, currentSheetId } = useSheetData(profile?.id);

  const platforms: Platform[] = [
    { id: 'meta', name: 'Meta Ads', active: true },
    { id: 'google', name: 'Google Ads', active: true },
    { id: 'tiktok', name: 'TikTok Ads', active: false }
  ];

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter((row: SheetRow) => {
      const matchesSearch = !searchTerm || 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'ACTIVE': { variant: 'default', label: 'Ativo' },
      'PAUSED': { variant: 'secondary', label: 'Pausado' },
      'CAMPAIGN_PAUSED': { variant: 'secondary', label: 'Pausado' },
      'DELETED': { variant: 'destructive', label: 'Deletado' },
      'PENDING_REVIEW': { variant: 'outline', label: 'Em Revisão' },
      'DISAPPROVED': { variant: 'destructive', label: 'Reprovado' },
      'PREAPPROVED': { variant: 'secondary', label: 'Pré-aprovado' },
      'PENDING_BILLING_INFO': { variant: 'outline', label: 'Pendente' },
      'CAMPAIGN_GROUP_PAUSED': { variant: 'secondary', label: 'Pausado' },
      'ARCHIVED': { variant: 'outline', label: 'Arquivado' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { variant: 'outline', label: status || 'Desconhecido' };

    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return 'R$ 0,00';
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  const formatNumber = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '0';
    
    return new Intl.NumberFormat('pt-BR').format(numValue);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-sm text-muted-foreground">Carregando dados...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          Erro ao carregar dados: {typeof error === 'string' ? error : (error as Error).message}
        </div>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  // Extract unique values for filters
  const campaigns = filteredData.map((row: SheetRow) => row.campaign_name).filter(Boolean);
  const adSets = filteredData.map((row: SheetRow) => row.adset_name).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Resultados de Campanhas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análise detalhada do desempenho das suas campanhas
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Plataforma</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem 
                      key={platform.id} 
                      value={platform.id}
                      disabled={!platform.active}
                    >
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="PAUSED">Pausado</SelectItem>
                  <SelectItem value="DELETED">Deletado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <Input
                placeholder="Buscar campanhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="adsets">Conjuntos</TabsTrigger>
          <TabsTrigger value="ads">Anúncios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsGrid data={filteredData} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CampaignCharts data={filteredData} />
            <FunnelVisualization data={filteredData} />
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <CampaignTable data={filteredData} level="campaign" />
        </TabsContent>

        <TabsContent value="adsets" className="space-y-6">
          <CampaignTable data={filteredData} level="adset" />
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <CampaignTable data={filteredData} level="ad" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
