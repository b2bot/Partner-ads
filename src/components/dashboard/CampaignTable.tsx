
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/dashboard_lib/formatters';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format, parseISO } from 'date-fns';
import { MoreHorizontal, TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface SheetRow {
  accountName?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
  day?: string;
  impressions?: number;
  clicks?: number;
  amountSpent?: number;
  actionMessagingConversationsStarted?: number;
  costPerActionMessagingConversations?: number;
  actionLinkClicks?: number;
  reach?: number;
  frequency?: number;
  cpm?: number;
  cpc?: number;
  [key: string]: any;
}

interface CampaignTableProps {
  data: SheetRow[];
  section?: string;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ data, section = 'campanhas' }) => {
  const [selectedItem, setSelectedItem] = useState<SheetRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (item: SheetRow) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getItemName = (item: SheetRow) => {
    switch (section) {
      case 'grupos':
        return item.adSetName || 'Grupo sem nome';
      case 'anuncios':
        return item.adName || 'Anúncio sem nome';
      default:
        return item.campaignName || 'Campanha sem nome';
    }
  };

  const getStatusColor = (ctr: number) => {
    if (ctr >= 2) return 'bg-green-100 text-green-800';
    if (ctr >= 1) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? (clicks / impressions) * 100 : 0;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch {
      return 'Data inválida';
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nenhum dado encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Não há dados para exibir na tabela de {section}.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Tabela de {section.charAt(0).toUpperCase() + section.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Nome
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Data
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Impressões
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Cliques
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Gasto
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    CTR
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    CPC
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const ctr = calculateCTR(item.clicks || 0, item.impressions || 0);
                  return (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {getItemName(item)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.accountName || 'Conta não informada'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {formatDate(item.day)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 dark:text-gray-100">
                        {formatNumber(item.impressions)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 dark:text-gray-100">
                        {formatNumber(item.clicks)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.amountSpent)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge className={getStatusColor(ctr)}>
                          {formatPercentage(ctr)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.cpc)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(item)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalhes</p>
                          </TooltipContent>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do {section.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {getItemName(selectedItem)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conta</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {selectedItem.accountName || 'Não informado'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Data</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(selectedItem.day)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Impressões</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatNumber(selectedItem.impressions)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Cliques</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatNumber(selectedItem.clicks)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gasto</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatCurrency(selectedItem.amountSpent)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CPC</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatCurrency(selectedItem.cpc)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CPM</label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {formatCurrency(selectedItem.cpm)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default CampaignTable;
