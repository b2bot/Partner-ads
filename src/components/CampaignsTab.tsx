
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
  TrendingDown
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

interface CampaignsTabProps {
  viewMode: 'table' | 'cards';
}

const campaigns = [
  {
    id: '1',
    name: 'Campanha Black Friday 2024',
    status: 'active',
    objective: 'Conversões',
    budget: 500,
    budgetType: 'diário',
    spend: 2450,
    roas: 5.2,
    roasChange: 12,
    impressions: 45320,
    clicks: 1280,
    ctr: 2.8,
    cpc: 1.91,
    conversions: 89,
    conversionRate: 6.95
  },
  {
    id: '2',
    name: 'Retargeting - Carrinho Abandonado',
    status: 'active',
    objective: 'Conversões',
    budget: 200,
    budgetType: 'diário',
    spend: 890,
    roas: 3.8,
    roasChange: -5,
    impressions: 12450,
    clicks: 456,
    ctr: 3.7,
    cpc: 1.95,
    conversions: 34,
    conversionRate: 7.46
  },
  {
    id: '3',
    name: 'Prospecção - Lookalike',
    status: 'paused',
    objective: 'Tráfego',
    budget: 300,
    budgetType: 'diário',
    spend: 1200,
    roas: 2.1,
    roasChange: -8,
    impressions: 28670,
    clicks: 890,
    ctr: 3.1,
    cpc: 1.35,
    conversions: 18,
    conversionRate: 2.02
  }
];

export function CampaignsTab({ viewMode }: CampaignsTabProps) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'ended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'paused':
        return 'Pausada';
      case 'ended':
        return 'Finalizada';
      default:
        return status;
    }
  };

  if (viewMode === 'table') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Suas Campanhas</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Nova Campanha
          </Button>
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
                  <TableHead>Gasto</TableHead>
                  <TableHead>ROAS</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Conversões</TableHead>
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
                    <TableCell>{campaign.objective}</TableCell>
                    <TableCell>R$ {campaign.budget}/{campaign.budgetType}</TableCell>
                    <TableCell>R$ {campaign.spend.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {campaign.roas}x
                        {campaign.roasChange > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{campaign.ctr}%</TableCell>
                    <TableCell>R$ {campaign.cpc}</TableCell>
                    <TableCell>{campaign.conversions}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
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
                          <DropdownMenuItem>
                            {campaign.status === 'active' ? (
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
        <h2 className="text-lg font-semibold">Suas Campanhas</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Nova Campanha
        </Button>
      </div>

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
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
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
                    <DropdownMenuItem>
                      {campaign.status === 'active' ? (
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Orçamento</p>
                  <p className="font-semibold">R$ {campaign.budget}/{campaign.budgetType}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Gasto</p>
                  <p className="font-semibold">R$ {campaign.spend.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">ROAS</p>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg">{campaign.roas}x</span>
                    {campaign.roasChange > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs ${campaign.roasChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {campaign.roasChange > 0 ? '+' : ''}{campaign.roasChange}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Conversões</p>
                  <p className="font-bold text-lg">{campaign.conversions}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-slate-500">CTR</p>
                    <p className="font-medium text-sm">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">CPC</p>
                    <p className="font-medium text-sm">R$ {campaign.cpc}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Taxa Conv.</p>
                    <p className="font-medium text-sm">{campaign.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
