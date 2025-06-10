
import { useState } from 'react';
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
  ArrowUpDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AccountFilter } from './AccountFilter';
import { EditCampaignModal } from './EditCampaignModal';
import { CreateCampaignModal } from './CreateCampaignModal';
import { useMetaData } from '@/hooks/useMetaData';
import { updateCampaign } from '@/lib/metaApi';
import { Skeleton } from '@/components/ui/skeleton';

interface CampaignsTabProps {
  viewMode: 'table' | 'cards';
}

export function CampaignsTab({ viewMode }: CampaignsTabProps) {
  const { campaigns, loading, credentials, refetch, selectedAdAccount } = useMetaData();
  const { toast } = useToast();
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

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

  if (loading.campaigns) {
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

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCampaigns.map((campaign) => (
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
          ))}
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
                    className="cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Nome
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('objective')}
                  >
                    <div className="flex items-center gap-1">
                      Objetivo
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Orçamento Diário</TableHead>
                  <TableHead>Criada em</TableHead>
                  <TableHead>Ações</TableHead>
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
                    <TableCell>{campaign.objective}</TableCell>
                    <TableCell>{formatCurrency(campaign.daily_budget)}</TableCell>
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
                ))}
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
