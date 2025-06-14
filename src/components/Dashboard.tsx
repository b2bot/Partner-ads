import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Target } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';
import { useAccountInsights } from '@/hooks/useAccountInsights';
import { useCampaignInsights } from '@/hooks/useInsights';
import { AccountFilter } from '@/components/AccountFilter';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { formatMetricValue } from '@/lib/metaInsights';
import { useDateRange } from '@/hooks/useDateRange';

export function Dashboard() {
  const { campaigns, loading, selectedAdAccount } = useMetaData();
  const { config } = useMetricsConfig();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const { dateRange, setDateRange, getApiDateRange } = useDateRange();
  
  const insights = useAccountInsights(getApiDateRange());

  // Hook para insights de campanhas
  const { data: campaignInsights = [], isLoading: campaignInsightsLoading } = useCampaignInsights(getApiDateRange());

  // Função para obter insights de uma campanha específica
  const getCampaignInsightsData = (campaignId: string) => {
    return campaignInsights.find(insight => insight.id === campaignId);
  };

  // Calcular custo por conversão
  const calculateCostPerConversion = (spend: any, conversions: any) => {
    const spendValue = typeof spend === 'string' ? parseFloat(spend) : spend || 0;
    const conversionsValue = typeof conversions === 'string' ? parseFloat(conversions) : conversions || 0;
    
    if (conversionsValue === 0) return 0;
    return spendValue / conversionsValue;
  };

  // Funções utilitárias
  const formatNumber = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR');
    }
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return Number(value).toLocaleString('pt-BR');
    }
    return value || '0';
  };

  const formatCurrency = (value: any) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return (num || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Campanhas ativas, evitando undefined
  const activeCampaigns = campaigns?.filter((c) => c.status === 'ACTIVE') || [];

  if (loading.campaigns || !selectedAdAccount) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <div className="flex gap-4">
            <AccountFilter />
            <DateRangeFilter onDateChange={setDateRange} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <div className="flex gap-4">
          <AccountFilter />
          <DateRangeFilter onDateChange={setDateRange} />
        </div>
      </div>

      {/* Métricas da Conta */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Impressões</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {formatNumber(insights.data?.impressions || 0)}
            </div>
            <p className="text-xs text-slate-500">Total das campanhas ativas</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {formatNumber(insights.data?.clicks || 0)}
            </div>
            <p className="text-xs text-slate-500">Total das campanhas ativas</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Valor Gasto</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(insights.data?.spend || 0)}
            </div>
            <p className="text-xs text-slate-500">Total das campanhas ativas</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">CTR</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {insights.data?.ctr ? `${parseFloat(insights.data.ctr.toString()).toFixed(2)}%` : '0.00%'}
            </div>
            <p className="text-xs text-slate-500">Taxa de cliques média</p>
          </CardContent>
        </Card>
      </div>

      {/* Controles de Visualização */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">
          Campanhas Ativas ({activeCampaigns.length})
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Tabela
          </Button>
        </div>
      </div>

      {/* Visualização de Campanhas Ativas */}
      {viewMode === 'cards' ? (
        <div className="space-y-6">
          {activeCampaigns.map((campaign) => {
            const campaignData = getCampaignInsightsData(campaign.id);
            const costPerConversion = campaignData ? calculateCostPerConversion(campaignData.spend, campaignData.conversions) : 0;
            
            return (
              <div key={campaign.id} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{campaign.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Card 1: Custo Total */}
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-slate-600">Custo Total</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {campaignData ? formatCurrency(campaignData.spend || 0) : 'R$ 0,00'}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2: Impressões */}
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Impressões</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {campaignData ? formatNumber(campaignData.impressions || 0) : '0'}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 3: Cliques */}
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointer className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-slate-600">Cliques</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {campaignData ? formatNumber(campaignData.clicks || 0) : '0'}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 4: Conversões */}
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-slate-600">Conversões</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {campaignData ? formatNumber(campaignData.conversions || 0) : '0'}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 5: Custo por Conversão */}
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-slate-600">Custo/Conversão</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {formatCurrency(costPerConversion)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Campanha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Custo Total</TableHead>
                <TableHead>Impressões</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>Conversões</TableHead>
                <TableHead>Custo/Conversão</TableHead>
                <TableHead>Criada em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCampaigns.map((campaign) => {
                const campaignData = getCampaignInsightsData(campaign.id);
                const costPerConversion = campaignData ? calculateCostPerConversion(campaignData.spend, campaignData.conversions) : 0;
                
                return (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        Ativa
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.objective}</TableCell>
                    <TableCell>{campaignData ? formatCurrency(campaignData.spend || 0) : 'R$ 0,00'}</TableCell>
                    <TableCell>{campaignData ? formatNumber(campaignData.impressions || 0) : '0'}</TableCell>
                    <TableCell>{campaignData ? formatNumber(campaignData.clicks || 0) : '0'}</TableCell>
                    <TableCell>{campaignData ? formatNumber(campaignData.conversions || 0) : '0'}</TableCell>
                    <TableCell>{formatCurrency(costPerConversion)}</TableCell>
                    <TableCell>{new Date(campaign.created_time).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {activeCampaigns.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Nenhuma campanha ativa</h3>
            <p className="text-slate-500 text-center">
              Ative campanhas existentes ou crie novas para ver métricas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
