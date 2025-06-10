
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Edit, 
  Copy,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle
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
import { useToast } from '@/hooks/use-toast';
import { updateCampaign } from '@/lib/metaApi';

interface CampaignsTabProps {
  viewMode: 'table' | 'cards';
}

export function CampaignsTab({ viewMode }: CampaignsTabProps) {
  const { campaigns, loading, credentials, refetch } = useMetaData();
  const [updatingCampaign, setUpdatingCampaign] = useState<string | null>(null);
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
        return 'Ativa';
      case 'paused':
        return 'Pausada';
      case 'deleted':
        return 'Excluída';
      case 'archived':
        return 'Arquivada';
      default:
        return status;
    }
  };

  const formatBudget = (dailyBudget?: string, lifetimeBudget?: string) => {
    if (dailyBudget) {
      return `R$ ${(parseInt(dailyBudget) / 100).toFixed(2)}/dia`;
    }
    if (lifetimeBudget) {
      return `R$ ${(parseInt(lifetimeBudget) / 100).toFixed(2)} total`;
    }
    return 'Não definido';
  };

  const handleStatusToggle = async (campaignId: string, currentStatus: string) => {
    if (!credentials?.access_token) {
      toast({
        title: 'Erro',
        description: 'Credenciais da Meta API não encontradas.',
        variant: 'destructive',
      });
      return;
    }

    setUpdatingCampaign(campaignId);
    const newStatus = currentStatus.toLowerCase() === 'active' ? 'PAUSED' : 'ACTIVE';

    try {
      await updateCampaign(credentials.access_token, campaignId, { status: newStatus });
      await refetch.campaigns();
      toast({
        title: 'Sucesso',
        description: `Campanha ${newStatus.toLowerCase() === 'active' ? 'ativada' : 'pausada'} com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar campanha.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingCampaign(null);
    }
  };

  if (!credentials) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Campanhas</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Conexão com Meta API necessária
            </h3>
            <p className="text-slate-500 mb-4">
              Configure suas credenciais da Meta API na página de configurações para visualizar suas campanhas.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '#settings'}>
              Ir para Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading.campaigns) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Campanhas</h2>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm text-slate-500">Carregando campanhas...</span>
          </div>
        </div>
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
          <h2 className="text-lg font-semibold">Suas Campanhas ({campaigns.length})</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch.campaigns()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Nova Campanha
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Campanha</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead>Criada em</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusText(campaign.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.objective || 'Não definido'}</TableCell>
                    <TableCell>{formatBudget(campaign.daily_budget, campaign.lifetime_budget)}</TableCell>
                    <TableCell>{new Date(campaign.created_time).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={updatingCampaign === campaign.id}>
                            {updatingCampaign === campaign.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="w-4 h-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusToggle(campaign.id, campaign.status)}
                          >
                            {campaign.status.toLowerCase() === 'active' ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Ativar
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Suas Campanhas ({campaigns.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch.campaigns()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Nova Campanha
          </Button>
        </div>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Nenhuma campanha encontrada
            </h3>
            <p className="text-slate-500 mb-4">
              Você ainda não possui campanhas ativas nesta conta de anúncios.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {campaign.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusText(campaign.status)}
                      </Badge>
                      <span className="text-sm text-slate-500">{campaign.objective}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={updatingCampaign === campaign.id}>
                        {updatingCampaign === campaign.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="w-4 h-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusToggle(campaign.id, campaign.status)}
                      >
                        {campaign.status.toLowerCase() === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Orçamento</p>
                    <p className="font-semibold">{formatBudget(campaign.daily_budget, campaign.lifetime_budget)}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">Criada em</p>
                    <p className="font-medium text-sm">{new Date(campaign.created_time).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
