import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  Play, 
  Pause, 
  Plus,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AccountFilter } from './AccountFilter';
import { EditAdSetModal } from './EditAdSetModal';
import { CreateAdSetModal } from './CreateAdSetModal';
import { useMetaData } from '@/hooks/useMetaData';
import { useAdSetInsights } from '@/hooks/useInsights';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { updateAdSet, AdSet } from '@/lib/metaApi';
import { getMetricDisplayName, formatMetricValue } from '@/lib/metaInsights';
import { Skeleton } from '@/components/ui/skeleton';

interface AdSetsTabProps {
  viewMode: 'table' | 'cards';
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function AdSetsTab({ viewMode }: AdSetsTabProps) {
  const { adSets, campaigns, loading, credentials, refetch, selectedAdAccount } = useMetaData();
  const { data: insights = [], isLoading: insightsLoading } = useAdSetInsights();
  const { config } = useMetricsConfig();
  const { toast } = useToast();
  const [editingAdSet, setEditingAdSet] = useState<AdSet | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updatingAdSet, setUpdatingAdSet] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  // Refetch ad sets when selectedAdAccount changes
  useEffect(() => {
    if (selectedAdAccount) {
      refetch.adSets();
    }
  }, [selectedAdAccount, refetch]);

  const getAdSetInsights = (adSetId: string) => {
    return insights.find((insight: any) => insight?.id === adSetId);
  };

  const getCampaignName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.name || 'Campanha não encontrada';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'deleted':
      case 'archived':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Ativo';
      case 'paused':
        return 'Pausado';
      case 'deleted':
        return 'Excluído';
      case 'archived':
        return 'Arquivado';
      default:
        return status;
    }
  };

  const handleStatusToggle = async (adSetId: string, currentStatus: string) => {
    if (!credentials?.access_token) {
      toast({
        title: 'Erro',
        description: 'Credenciais da Meta API não encontradas.',
        variant: 'destructive',
      });
      return;
    }

    setUpdatingAdSet(adSetId);
    const newStatus = currentStatus.toLowerCase() === 'active' ? 'PAUSED' : 'ACTIVE';

    try {
      await updateAdSet(credentials.access_token, adSetId, { status: newStatus });
      await refetch.adSets();
      toast({
        title: 'Sucesso',
        description: `Conjunto de anúncios ${newStatus.toLowerCase() === 'active' ? 'ativado' : 'pausado'} com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar conjunto de anúncios.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingAdSet(null);
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const sortedAdSets = React.useMemo(() => {
    if (!sortConfig.key) return adSets;

    return [...adSets].sort((a, b) => {
      let aValue: any = '';
      let bValue: any = '';

      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.key === 'campaign_name') {
        aValue = getCampaignName(a.campaign_id);
        bValue = getCampaignName(b.campaign_id);
      } else if (sortConfig.key === 'status') {
        aValue = a.status;
        bValue = b.status;
      } else if (sortConfig.key === 'created_time') {
        aValue = new Date(a.created_time);
        bValue = new Date(b.created_time);
      } else {
        // Métricas
        const aInsights = getAdSetInsights(a.id);
        const bInsights = getAdSetInsights(b.id);
        aValue = aInsights?.[sortConfig.key as keyof typeof aInsights] || 0;
        bValue = bInsights?.[sortConfig.key as keyof typeof bInsights] || 0;
        
        // Converter para números se necessário
        if (typeof aValue === 'string') aValue = parseFloat(aValue) || 0;
        if (typeof bValue === 'string') bValue = parseFloat(bValue) || 0;
      }

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [adSets, sortConfig, insights, campaigns]);

  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'R$ 0,00';
    const numValue = parseFloat(value) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue);
  };

  if (!credentials) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Conjuntos de Anúncios</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Conexão com Meta API necessária
            </h3>
            <p className="text-slate-500 mb-4">
              Configure suas credenciais da Meta API na página de configurações para visualizar seus conjuntos de anúncios.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '#settings'}>
              Ir para Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedAdAccount) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Conjuntos de Anúncios</h2>
        </div>
        <AccountFilter />
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Selecione uma conta de anúncios
            </h3>
            <p className="text-slate-500 mb-4">
              Escolha uma conta de anúncios para visualizar seus conjuntos de anúncios.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading.adSets || insightsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Conjuntos de Anúncios</h2>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm text-slate-500">Carregando conjuntos e métricas...</span>
          </div>
        </div>
        <AccountFilter />
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Conjuntos de Anúncios ({adSets.length})</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch.adSets()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Conjunto
            </Button>
          </div>
        </div>

        <AccountFilter />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ativo</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Nome do Conjunto
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('campaign_name')}
                  >
                    <div className="flex items-center gap-1">
                      Campanha
                      {getSortIcon('campaign_name')}
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
                  {config.adsets.map((metricKey) => (
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
                      Criado em
                      {getSortIcon('created_time')}
                    </div>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAdSets.map((adSet) => {
                  const adSetInsights = getAdSetInsights(adSet.id);
                  
                  return (
                    <TableRow key={adSet.id}>
                      <TableCell>
                        <Switch
                          checked={adSet.status.toLowerCase() === 'active'}
                          onCheckedChange={() => handleStatusToggle(adSet.id, adSet.status)}
                          disabled={updatingAdSet === adSet.id}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{adSet.name}</TableCell>
                      <TableCell className="text-sm text-slate-600">{getCampaignName(adSet.campaign_id)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(adSet.status)}>
                          {getStatusText(adSet.status)}
                        </Badge>
                      </TableCell>
                      {config.adsets.map((metricKey) => (
                        <TableCell key={metricKey}>
                          {adSetInsights && adSetInsights[metricKey as keyof typeof adSetInsights] !== undefined
                            ? formatMetricValue(metricKey, adSetInsights[metricKey as keyof typeof adSetInsights])
                            : '-'
                          }
                        </TableCell>
                      ))}
                      <TableCell>{new Date(adSet.created_time).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={updatingAdSet === adSet.id}>
                              {updatingAdSet === adSet.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="w-4 h-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingAdSet(adSet)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <EditAdSetModal
          adSet={editingAdSet}
          isOpen={!!editingAdSet}
          onClose={() => setEditingAdSet(null)}
          onSuccess={() => refetch.adSets()}
        />

        <CreateAdSetModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => refetch.adSets()}
        />
      </div>
    );
  }

  // View mode cards
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Conjuntos de Anúncios ({adSets.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch.adSets()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Conjunto
          </Button>
        </div>
      </div>

      <AccountFilter />

      {adSets.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Nenhum conjunto de anúncios encontrado
            </h3>
            <p className="text-slate-500 mb-4">
              Você ainda não possui conjuntos de anúncios nesta conta.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Conjunto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedAdSets.map((adSet) => {
            const adSetInsights = getAdSetInsights(adSet.id);
            
            return (
              <Card key={adSet.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {adSet.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={adSet.status.toLowerCase() === 'active'}
                          onCheckedChange={() => handleStatusToggle(adSet.id, adSet.status)}
                          disabled={updatingAdSet === adSet.id}
                        />
                        <Badge className={getStatusColor(adSet.status)}>
                          {getStatusText(adSet.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">{getCampaignName(adSet.campaign_id)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={updatingAdSet === adSet.id}>
                          {updatingAdSet === adSet.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="w-4 h-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditingAdSet(adSet)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Métricas */}
                  {adSetInsights && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {config.adsets.slice(0, 6).map((metricKey) => (
                        <div key={metricKey} className="text-center">
                          <span className="text-slate-500 block">{getMetricDisplayName(metricKey)}</span>
                          <div className="font-semibold">
                            {adSetInsights[metricKey as keyof typeof adSetInsights] !== undefined
                              ? formatMetricValue(metricKey, adSetInsights[metricKey as keyof typeof adSetInsights])
                              : '-'
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Criado em</p>
                      <p className="font-medium text-sm">{new Date(adSet.created_time).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <EditAdSetModal
        adSet={editingAdSet}
        isOpen={!!editingAdSet}
        onClose={() => setEditingAdSet(null)}
        onSuccess={() => refetch.adSets()}
      />

      <CreateAdSetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => refetch.adSets()}
      />
    </div>
  );
}
