import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { useSheetData } from '@/hooks/dashboard_hooks/useSheetData';
import CampaignCharts from '@/components/dashboard/CampaignCharts';
import { FunnelVisualization } from '@/components/dashboard/FunnelVisualization';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { PlatformNavigation } from '@/components/dashboard_navigation/PlatformNavigation';
import { toast } from 'sonner';
import type { SheetRow } from '@/types/sheets';

type Platform = 'meta' | 'google' | 'tiktok' | 'linkedin';

export function ResultadosTab() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('meta');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  
  const { 
    data, 
    loading, 
    error, 
    fetchSheetData, 
    currentClientId, 
    setCurrentClientId 
  } = useSheetData();

  useEffect(() => {
    if (currentClientId) {
      fetchSheetData(currentClientId);
    }
  }, [currentClientId, fetchSheetData]);

  const handleAccountChange = (accountId: string) => {
    setSelectedAccount(accountId);
    console.log('Selected account:', accountId);
  };

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatform(platform);
    console.log('Selected platform:', platform);
  };

  const handleRefreshData = () => {
    if (currentClientId) {
      toast.promise(
        fetchSheetData(currentClientId),
        {
          loading: 'Atualizando dados...',
          success: () => 'Dados atualizados com sucesso!',
          error: (e) => `Erro ao atualizar dados: ${e.message}`,
        }
      );
    } else {
      toast.error('Selecione um cliente para atualizar os dados.');
    }
  };

  const processDataForCharts = (rawData: any[]) => {
    if (!Array.isArray(rawData)) return [];
    
    return rawData.map((row: SheetRow) => ({
      date: row.date || row.Date || row.DATA,
      impressions: parseFloat(row.impressions || row.Impressões || '0') || 0,
      clicks: parseFloat(row.clicks || row.Cliques || '0') || 0,
      spend: parseFloat(row.spend || row.Gasto || '0') || 0,
      conversions: parseFloat(row.conversions || row.Conversões || '0') || 0,
    }));
  };

  const calculateMetrics = (data: SheetRow[]) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    
    const totalImpressions = data.reduce((sum: number, row: SheetRow) => sum + (parseFloat(row.impressions || '0') || 0), 0);
    const totalClicks = data.reduce((sum: number, row: SheetRow) => sum + (parseFloat(row.clicks || '0') || 0), 0);
    const totalSpend = data.reduce((sum: number, row: SheetRow) => sum + (parseFloat(row.spend || '0') || 0), 0);
    const totalConversions = data.reduce((sum: number, row: SheetRow) => sum + (parseFloat(row.conversions || '0') || 0), 0);

    return {
      impressions: totalImpressions,
      clicks: totalClicks,
      spend: totalSpend,
      conversions: totalConversions,
      ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
      cpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const chartData = processDataForCharts(data?.rows || []);
  const metrics = calculateMetrics(data?.rows || []);
  const accounts: string[] = data?.accounts || [];

  return (
    <div className="space-y-6">
      {/* Platform Navigation */}
      <PlatformNavigation 
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
      />

      <div className="flex items-center justify-between">
        <Select onValueChange={handleAccountChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Selecionar Conta" />
          </SelectTrigger>
          <SelectContent>
            {accounts?.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar Dados
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Impressões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(metrics.impressions)}</div>
              <Badge variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                22%
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cliques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(metrics.clicks)}</div>
              <Badge variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                15%
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.spend)}</div>
              <Badge variant="outline">
                <TrendingDown className="h-4 w-4 mr-2" />
                5%
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(metrics.conversions)}</div>
              <Badge variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                30%
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts and Visualization */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CampaignCharts data={chartData} />
          <FunnelVisualization data={chartData} />
        </div>
      )}

      <MetricsGrid data={data?.rows || []} />
    </div>
  );
}
