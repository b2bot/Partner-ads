
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Play, 
  Pause, 
  Edit, 
  Copy,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  Plus,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMetaData } from '@/hooks/useMetaData';
import { useAdInsights } from '@/hooks/useInsights';
import { useMetricsConfig, MetricsConfig } from '@/hooks/useMetricsConfig';
import { useToast } from '@/hooks/use-toast';
import { updateAd, Ad } from '@/lib/metaApi';
import { getAdCreativeImage, formatMetricValue, getMetricDisplayName } from '@/lib/metaInsights';
import { AccountFilter } from './AccountFilter';
import { EditAdModal } from './EditAdModal';
import { CreateAdModal } from './CreateAdModal';

interface AdsTabProps {
  viewMode: 'table' | 'cards';
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function AdsTab({ viewMode }: AdsTabProps) {
  const { ads, adSets, loading, credentials, refetch, selectedAdAccount } = useMetaData();
  const { data: insights = [], isLoading: insightsLoading } = useAdInsights();
  const { config } = useMetricsConfig();
  const [updatingAd, setUpdatingAd] = useState<string | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [imageModal, setImageModal] = useState<{ isOpen: boolean; imageUrl: string; adName: string }>({
    isOpen: false,
    imageUrl: '',
    adName: ''
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });
  const { toast } = useToast();

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

  const getAdSetName = (adSetId: string) => {
    const adSet = adSets.find(as => as.id === adSetId);
    return adSet?.name || 'Conjunto não encontrado';
  };

  const getAdInsights = (adId: string) => {
    return insights.find((insight: any) => insight?.id === adId);
  };

  const handleStatusToggle = async (adId: string, currentStatus: string) => {
    if (!credentials?.access_token) {
      toast({
        title: 'Erro',
        description: 'Credenciais da Meta API não encontradas.',
        variant: 'destructive',
      });
      return;
    }

    setUpdatingAd(adId);
    const newStatus = currentStatus.toLowerCase() === 'active' ? 'PAUSED' : 'ACTIVE';

    try {
      await updateAd(credentials.access_token, adId, { status: newStatus });
      await refetch.ads();
      toast({
        title: 'Sucesso',
        description: `Anúncio ${newStatus.toLowerCase() === 'active' ? 'ativado' : 'pausado'} com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar anúncio.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingAd(null);
    }
  };

  const loadAdImage = async (adId: string, adName: string) => {
    if (!credentials?.access_token) return;
    
    try {
      const imageUrl = await getAdCreativeImage(credentials.access_token, adId);
      if (imageUrl) {
        setImageModal({ isOpen: true, imageUrl, adName });
      } else {
        toast({
          title: 'Imagem não encontrada',
          description: 'Não foi possível carregar a imagem deste anúncio.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar imagem do anúncio.',
        variant: 'destructive',
      });
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAds = React.useMemo(() => {
    if (!sortConfig.key) return ads;

    return [...ads].sort((a, b) => {
      let aValue: any = '';
      let bValue: any = '';

      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.key === 'adset_name') {
        aValue = getAdSetName(a.adset_id);
        bValue = getAdSetName(b.adset_id);
      } else if (sortConfig.key === 'status') {
        aValue = a.status;
        bValue = b.status;
      } else if (sortConfig.key === 'created_time') {
        aValue = new Date(a.created_time);
        bValue = new Date(b.created_time);
      } else {
        // Métricas
        const aInsights = getAdInsights(a.id);
        const bInsights = getAdInsights(b.id);
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
  }, [ads, sortConfig, insights, adSets]);

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const metricsConfig = config as MetricsConfig;
  const adMetrics = metricsConfig.ads || [];

  if (!credentials) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Anúncios</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Conexão com Meta API necessária
            </h3>
            <p className="text-slate-500 mb-4">
              Configure suas credenciais da Meta API na página de configurações para visualizar seus anúncios.
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
          <h2 className="text-lg font-semibold">Anúncios</h2>
        </div>
        <AccountFilter />
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Selecione uma conta de anúncios
            </h3>
            <p className="text-slate-500 mb-4">
              Escolha uma conta de anúncios para visualizar seus anúncios.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading.ads || insightsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Anúncios</h2>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm text-slate-500">Carregando anúncios e métricas...</span>
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Anúncios ({ads.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch.ads()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Anúncio
          </Button>
        </div>
      </div>

      <AccountFilter />

      {viewMode === 'table' ? (
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
                      Nome do Anúncio
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleSort('adset_name')}
                  >
                    <div className="flex items-center gap-1">
                      Conjunto
                      {getSortIcon('adset_name')}
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
                  {adMetrics.map((metricKey) => (
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
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAds.map((ad) => {
                  const adInsights = getAdInsights(ad.id);
                  
                  return (
                    <TableRow key={ad.id}>
                      <TableCell>
                        <Switch
                          checked={ad.status.toLowerCase() === 'active'}
                          onCheckedChange={() => handleStatusToggle(ad.id, ad.status)}
                          disabled={updatingAd === ad.id}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{ad.name}</TableCell>
                      <TableCell className="text-sm text-slate-600">{getAdSetName(ad.adset_id)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ad.status)}>
                          {getStatusText(ad.status)}
                        </Badge>
                      </TableCell>
                      {adMetrics.map((metricKey) => (
                        <TableCell key={metricKey}>
                          {adInsights && adInsights[metricKey as keyof typeof adInsights] !== undefined
                            ? formatMetricValue(metricKey, adInsights[metricKey as keyof typeof adInsights])
                            : '-'
                          }
                        </TableCell>
                      ))}
                      <TableCell>{new Date(ad.created_time).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={updatingAd === ad.id}>
                              {updatingAd === ad.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="w-4 h-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingAd(ad)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => loadAdImage(ad.id, ad.name)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Ver Criativo
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedAds.map((ad) => {
            const adInsights = getAdInsights(ad.id);
            
            return (
              <Card key={ad.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {ad.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={ad.status.toLowerCase() === 'active'}
                          onCheckedChange={() => handleStatusToggle(ad.id, ad.status)}
                          disabled={updatingAd === ad.id}
                        />
                        <Badge className={getStatusColor(ad.status)}>
                          {getStatusText(ad.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">{getAdSetName(ad.adset_id)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={updatingAd === ad.id}>
                          {updatingAd === ad.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="w-4 h-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditingAd(ad)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => loadAdImage(ad.id, ad.name)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Ver Criativo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Métricas */}
                  {adInsights && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {adMetrics.slice(0, 6).map((metricKey) => (
                        <div key={metricKey} className="text-center">
                          <span className="text-slate-500 block">{getMetricDisplayName(metricKey)}</span>
                          <div className="font-semibold">
                            {adInsights[metricKey as keyof typeof adInsights] !== undefined
                              ? formatMetricValue(metricKey, adInsights[metricKey as keyof typeof adInsights])
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
                      <p className="font-medium text-sm">{new Date(ad.created_time).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Image Modal */}
      <Dialog open={imageModal.isOpen} onOpenChange={(open) => setImageModal(prev => ({ ...prev, isOpen: open }))}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{imageModal.adName}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img 
              src={imageModal.imageUrl} 
              alt={imageModal.adName}
              className="max-w-full max-h-96 object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <EditAdModal
        ad={editingAd}
        isOpen={!!editingAd}
        onClose={() => setEditingAd(null)}
        onSuccess={() => refetch.ads()}
      />

      <CreateAdModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => refetch.ads()}
      />
    </div>
  );
}
