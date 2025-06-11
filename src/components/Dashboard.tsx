
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Target } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';
import { useAccountInsights } from '@/hooks/useAccountInsights';
import { AccountFilter } from '@/components/AccountFilter';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { DateRange } from 'react-day-picker';

export function Dashboard() {
  const { campaigns, loading, selectedAdAccount } = useMetaData();
  const { config } = useMetricsConfig();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  const insights = useAccountInsights(
    dateRange ? {
      since: dateRange.from?.toISOString().split('T')[0] || '',
      until: dateRange.to?.toISOString().split('T')[0] || ''
    } : undefined
  );

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue || 0);
  };

  const formatNumber = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR').format(numValue || 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtrar apenas campanhas ativas
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'ACTIVE');

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
              {insights.data?.ctr ? `${parseFloat(insights.data.ctr).toFixed(2)}%` : '0.00%'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.slice(0, 6).map((campaign) => (
            <Card key={campaign.id} className="hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-slate-800 truncate">
                    {campaign.name}
                  </CardTitle>
                  <Badge className={getStatusColor(campaign.status)}>
                    Ativa
                  </Badge>
                </div>
                <CardDescription className="text-slate-600">
                  {campaign.objective}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Orçamento:</span>
                    <div className="font-semibold">
                      {campaign.daily_budget 
                        ? formatCurrency(parseFloat(campaign.daily_budget) / 100) + '/dia'
                        : campaign.lifetime_budget 
                        ? formatCurrency(parseFloat(campaign.lifetime_budget) / 100) + ' total'
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Criada em:</span>
                    <div className="font-semibold">
                      {new Date(campaign.created_time).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Campanha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Criada em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      Ativa
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.objective}</TableCell>
                  <TableCell>
                    {campaign.daily_budget 
                      ? formatCurrency(parseFloat(campaign.daily_budget) / 100) + '/dia'
                      : campaign.lifetime_budget 
                      ? formatCurrency(parseFloat(campaign.lifetime_budget) / 100) + ' total'
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>{new Date(campaign.created_time).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
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
