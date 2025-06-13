
import React, { useState, useEffect } from 'react';
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
  Edit, 
  Play, 
  Pause, 
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AccountFilter } from './AccountFilter';
import { EditCampaignModal } from './EditCampaignModal';
import { CreateCampaignModal } from './CreateCampaignModal';
import { useMetaData } from '@/hooks/useMetaData';
import { useCampaignInsights } from '@/hooks/useInsights';
import { useMetricsConfig, MetricsConfig } from '@/hooks/useMetricsConfig';
import { updateCampaign } from '@/lib/metaApi';
import { getMetricDisplayName, formatMetricValue } from '@/lib/metaInsights';
import { Skeleton } from '@/components/ui/skeleton';

interface CampaignsTabProps {
  viewMode: 'table' | 'cards';
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function CampaignsTab({ viewMode }: CampaignsTabProps) {
  const { campaigns, loading, credentials, refetch, selectedAdAccount } = useMetaData();
  const { data: insights = [], isLoading: insightsLoading } = useCampaignInsights();
  const { config } = useMetricsConfig();
  const { toast } = useToast();
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  // Refetch campaigns when selectedAdAccount changes
  useEffect(() => {
    if (selectedAdAccount) {
      refetch.campaigns();
    }
  }, [selectedAdAccount, refetch]);

  const getCampaignInsights = (campaignId: string) => {
    return insights.find(insight => insight.id === campaignId);
  };

  const handleToggleStatus = async (campaign: any) => {
    if (!credentials?.access_token) return;

    const newStatus = campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setLoadingAction(campaign.id);

    try {
      await updateCampaign(credentials.access_token, campaign.id, {
        status: newStatus
      });

      toast({
        title: 'Sucesso',
        description: `Campanha ${newStatus === 'ACTIVE' ? 'ativada' : 'pausada'} com sucesso.`,
      });

      refetch.campaigns();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar campanha.',
        variant: 'destructive',
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSort = (field: string) => {
    if (sortConfig.key === field) {
      setSortConfig({
        key: field,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSortConfig({ key: field, direction: 'asc' });
    }
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.key !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const sortedCampaigns = React.useMemo(() => {
    return [...campaigns].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortConfig.key === 'name' || sortConfig.key === 'objective' || sortConfig.key === 'status') {
        aValue = a[sortConfig.key as keyof typeof a];
        bValue = b[sortConfig.key as keyof typeof b];
      } else if (sortConfig.key === 'created_time') {
        aValue = new Date(a.created_time);
        bValue = new Date(b.created_time);
      } else if (sortConfig.key === 'daily_budget') {
        aValue = parseFloat(a.daily_budget || '0');
        bValue = parseFloat(b.daily_budget || '0');
      } else {
        // Métricas
        const aInsights = getCampaignInsights(a.id);
        const bInsights = getCampaignInsights(b.id);
        aValue = aInsights?.[sortConfig.key as keyof typeof aInsights] || 0;
        bValue = bInsights?.[sortConfig.key as keyof typeof bInsights] || 0;
        
        if (typeof aValue === 'string') aValue = parseFloat(aValue) || 0;
        if (typeof bValue === 'string') bValue = parseFloat(bValue) || 0;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [campaigns, sortConfig, insights]);

  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'R$ 0,00';
    const numValue = parseFloat(value) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const metricsConfig = config as MetricsConfig;
  const campaignMetrics = metricsConfig.campaigns || [];

  if (loading.campaigns || insightsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!selectedAdAccount) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <AccountFilter />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Selecione uma conta de anúncios
          </h3>
          <p className="text-slate-500">
            Escolha uma conta de anúncios para visualizar suas campanhas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AccountFilter />
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      {/* Métricas de Campanhas Ativas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-sm text-slate-600">Total de Campanhas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {campaigns.filter(c => c.status === 'ACTIVE').length}
            </div>
            <p className="text-sm text-slate-600">Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {campaigns.filter(c => c.status === 'PAUSED').length}
            </div>
            <p className="text-sm text-slate-600">Pausadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {new Set(campaigns.map(c => c.objective)).size}
            </div>
            <p className="text-sm text-slate-600">Objetivos Únicos</p>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCampaigns.map((campaign) => {
            const campaignInsights = getCampaignInsights(campaign.id);
            
            return (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.objective}</CardDescription>
                    </div>
                    <Badge 
                      variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}
                    >
                      {campaign.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Orçamento diário:</span>
                      <span className="font-medium">{formatCurrency(campaign.daily_budget)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Criada em:</span>
                      <span className="font-medium">{formatDate(campaign.created_time)}</span>
                    </div>
                    {/* Métricas */}
                    {campaignInsights && (
                      <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
                        {campaignMetrics.slice(0, 4).map((metricKey) => (
                          <div key={metricKey} className="text-center">
                            <span className="text-slate-500 block text-xs">{getMetricDisplayName(metricKey)}</span>
                            <div className="font-semibold">
                              {campaignInsights[metricKey as keyof typeof campaignInsights] !== undefined
                                ? formatMetricValue(metricKey, campaignInsights[metricKey as keyof typeof campaignInsights])
                                : '-'
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCampaign(campaign)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant={campaign.status === 'ACTIVE' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => handleToggleStatus(campaign)}
                      disabled={loadingAction === campaign.id}
                    >
                      {campaign.status === 'ACTIVE' ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Ativar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Campanhas</CardTitle>
            <CardDescription>
              Gerencie suas campanhas do Facebook Ads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Nome
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('objective')}
                  >
                    <div className="flex items-center gap-1">
                      Objetivo
                      {getSortIcon('objective')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('daily_budget')}
                  >
                    <div className="flex items-center gap-1">
                      Orçamento Diário
                      {getSortIcon('daily_budget')}
                    </div>
                  </TableHead>
                  {campaignMetrics.map((metricKey) => (
                    <TableHead 
                      key={metricKey}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort(metricKey)}
                    >
                      <div className="flex items-center gap-1">
                        {getMetricDisplayName(metricKey)}
                        {getSortIcon(metricKey)}
                      </div>
                    </TableHead>
                  ))}
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('created_time')}
                  >
                    <div className="flex items-center gap-1">
                      Criada em
                      {getSortIcon('created_time')}
                    </div>
                  </TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCampaigns.map((campaign) => {
                  const campaignInsights = getCampaignInsights(campaign.id);
                  
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}
                        >
                          {campaign.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.objective}</TableCell>
                      <TableCell>{formatCurrency(campaign.daily_budget)}</TableCell>
                      {campaignMetrics.map((metricKey) => (
                        <TableCell key={metricKey}>
                          {campaignInsights && campaignInsights[metricKey as keyof typeof campaignInsights] !== undefined
                            ? formatMetricValue(metricKey, campaignInsights[metricKey as keyof typeof campaignInsights])
                            : '-'
                          }
                        </TableCell>
                      ))}
                      <TableCell>{formatDate(campaign.created_time)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCampaign(campaign)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={campaign.status === 'ACTIVE' ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => handleToggleStatus(campaign)}
                            disabled={loadingAction === campaign.id}
                          >
                            {campaign.status === 'ACTIVE' ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {campaigns.length === 0 && !loading.campaigns && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Nenhuma campanha encontrada
          </h3>
          <p className="text-slate-500 mb-4">
            Crie sua primeira campanha para começar a anunciar
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Campanha
          </Button>
        </div>
      )}

      <EditCampaignModal
        campaign={editingCampaign}
        isOpen={!!editingCampaign}
        onClose={() => setEditingCampaign(null)}
        onSuccess={() => {
          refetch.campaigns();
          setEditingCampaign(null);
        }}
      />

      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          refetch.campaigns();
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}
