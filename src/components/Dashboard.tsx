
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  ArrowUpDown,
  Plus
} from 'lucide-react';
import { AccountFilter } from './AccountFilter';
import { useMetaData } from '@/hooks/useMetaData';
import { getAdAccountInsights, getCampaignInsights } from '@/lib/metaApi';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardMetrics {
  impressions: number;
  clicks: number;
  spend: number;
  reach: number;
  ctr: number;
  cpc: number;
  cpm: number;
}

interface CampaignWithInsights {
  id: string;
  name: string;
  status: string;
  impressions: number;
  clicks: number;
  spend: number;
  reach: number;
  ctr: number;
  cpc: number;
  cpm: number;
}

export function Dashboard() {
  const { credentials, selectedAdAccount, campaigns, loading } = useMetaData();
  const { config } = useMetricsConfig();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [campaignInsights, setCampaignInsights] = useState<CampaignWithInsights[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [sortField, setSortField] = useState<keyof CampaignWithInsights>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const dateRange = {
    since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0]
  };

  useEffect(() => {
    if (credentials?.access_token && selectedAdAccount) {
      loadDashboardData();
    }
  }, [credentials, selectedAdAccount]);

  const loadDashboardData = async () => {
    if (!credentials?.access_token || !selectedAdAccount) return;

    setLoadingMetrics(true);
    try {
      // Carregar métricas da conta
      const accountInsights = await getAdAccountInsights(
        credentials.access_token,
        selectedAdAccount,
        dateRange
      );

      if (accountInsights) {
        setMetrics({
          impressions: parseInt(accountInsights.impressions) || 0,
          clicks: parseInt(accountInsights.clicks) || 0,
          spend: parseFloat(accountInsights.spend) || 0,
          reach: parseInt(accountInsights.reach) || 0,
          ctr: parseFloat(accountInsights.ctr) || 0,
          cpc: parseFloat(accountInsights.cpc) || 0,
          cpm: parseFloat(accountInsights.cpm) || 0,
        });
      }

      // Carregar insights das campanhas
      const campaignInsightsPromises = campaigns.map(async (campaign) => {
        try {
          const insights = await getCampaignInsights(
            credentials.access_token!,
            campaign.id,
            dateRange
          );
          
          return {
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            impressions: insights ? parseInt(insights.impressions) || 0 : 0,
            clicks: insights ? parseInt(insights.clicks) || 0 : 0,
            spend: insights ? parseFloat(insights.spend) || 0 : 0,
            reach: insights ? parseInt(insights.reach) || 0 : 0,
            ctr: insights ? parseFloat(insights.ctr) || 0 : 0,
            cpc: insights ? parseFloat(insights.cpc) || 0 : 0,
            cpm: insights ? parseFloat(insights.cpm) || 0 : 0,
          };
        } catch (error) {
          console.error(`Error loading insights for campaign ${campaign.id}:`, error);
          return {
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            impressions: 0,
            clicks: 0,
            spend: 0,
            reach: 0,
            ctr: 0,
            cpc: 0,
            cpm: 0,
          };
        }
      });

      const insights = await Promise.all(campaignInsightsPromises);
      setCampaignInsights(insights);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const handleSort = (field: keyof CampaignWithInsights) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaignInsights].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading.adAccounts) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!credentials || !selectedAdAccount) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-slate-600 mb-2">
          Configure sua conexão com a Meta
        </h3>
        <p className="text-slate-500">
          Vá para Configurações para conectar sua conta do Facebook Ads
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AccountFilter />
        <div className="flex items-center gap-2">
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

      {loadingMetrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <>
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impressões</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(metrics?.impressions || 0)}</div>
                  <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cliques</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(metrics?.clicks || 0)}</div>
                  <p className="text-xs text-muted-foreground">+180.1% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Gasto</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(metrics?.spend || 0)}</div>
                  <p className="text-xs text-muted-foreground">+19% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CTR</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercentage(metrics?.ctr || 0)}</div>
                  <p className="text-xs text-muted-foreground">+201 desde a última hora</p>
                </CardContent>
              </Card>
            </div>
          )}

          {viewMode === 'table' && (
            <Card>
              <CardHeader>
                <CardTitle>Campanhas - Últimos 30 dias</CardTitle>
                <CardDescription>
                  Performance detalhada das suas campanhas ativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Nome da Campanha
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('impressions')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Impressões
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('clicks')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Cliques
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('ctr')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          CTR
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('cpc')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          CPC
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => handleSort('spend')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Valor Gasto
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}
                          >
                            {campaign.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatNumber(campaign.impressions)}</TableCell>
                        <TableCell className="text-right">{formatNumber(campaign.clicks)}</TableCell>
                        <TableCell className="text-right">{formatPercentage(campaign.ctr)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(campaign.cpc)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(campaign.spend)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
