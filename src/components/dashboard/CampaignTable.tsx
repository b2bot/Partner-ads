
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, MousePointer, Users, DollarSign, TrendingUp, Filter, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format, parseISO } from 'date-fns';

export interface SheetRow {
  id?: string;
  day?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
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
  accountName?: string;
  [key: string]: any;
}

interface CampaignTableProps {
  data: SheetRow[];
  title?: string;
  showFilters?: boolean;
}

const CampaignTable = ({ data, title = "Dados da Campanha", showFilters = true }: CampaignTableProps) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRow, setSelectedRow] = useState<SheetRow | null>(null);

  const formatNumber = (num?: number) => 
    typeof num === 'number' && !isNaN(num) 
      ? new Intl.NumberFormat('pt-BR').format(num) 
      : '0';

  const formatCurrency = (num?: number) => 
    typeof num === 'number' && !isNaN(num)
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
      : 'R$ 0,00';

  const formatPercentage = (num?: number) => 
    typeof num === 'number' && !isNaN(num)
      ? `${(num * 100).toFixed(2)}%`
      : '0%';

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortField as keyof SheetRow];
      const bVal = b[sortField as keyof SheetRow];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal || '');
      const bStr = String(bVal || '');
      return sortDirection === 'asc' 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    });
  }, [data, sortField, sortDirection]);

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <th 
      className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <TrendingUp className={`w-3 h-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
        )}
      </div>
    </th>
  );

  return (
    <TooltipProvider>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {data.length} registros
              </Badge>
              {showFilters && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filtros disponíveis</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <SortableHeader field="day">Data</SortableHeader>
                  <SortableHeader field="campaignName">Campanha</SortableHeader>
                  <SortableHeader field="impressions">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Impressões
                  </SortableHeader>
                  <SortableHeader field="clicks">
                    <MousePointer className="w-3 h-3 inline mr-1" />
                    Cliques
                  </SortableHeader>
                  <SortableHeader field="amountSpent">
                    <DollarSign className="w-3 h-3 inline mr-1" />
                    Gasto
                  </SortableHeader>
                  <SortableHeader field="actionMessagingConversationsStarted">
                    <Users className="w-3 h-3 inline mr-1" />
                    Conversões
                  </SortableHeader>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-3 px-4 text-xs text-gray-900 dark:text-gray-100">
                      {row.day ? format(parseISO(row.day), 'dd/MM/yyyy') : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-900 dark:text-gray-100 max-w-48">
                      <div className="truncate" title={row.campaignName}>
                        {row.campaignName || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {formatNumber(row.impressions)}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-green-600 dark:text-green-400">
                      {formatNumber(row.clicks)}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(row.amountSpent)}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-purple-600 dark:text-purple-400">
                      {formatNumber(row.actionMessagingConversationsStarted)}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedRow(row)}
                            className="h-6 w-6 p-0"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes da Campanha</DialogTitle>
                          </DialogHeader>
                          {selectedRow && (
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className="space-y-2">
                                <p><strong>Data:</strong> {selectedRow.day ? format(parseISO(selectedRow.day), 'dd/MM/yyyy') : 'N/A'}</p>
                                <p><strong>Campanha:</strong> {selectedRow.campaignName || 'N/A'}</p>
                                <p><strong>Grupo de Anúncios:</strong> {selectedRow.adSetName || 'N/A'}</p>
                                <p><strong>Anúncio:</strong> {selectedRow.adName || 'N/A'}</p>
                              </div>
                              <div className="space-y-2">
                                <p><strong>Impressões:</strong> {formatNumber(selectedRow.impressions)}</p>
                                <p><strong>Cliques:</strong> {formatNumber(selectedRow.clicks)}</p>
                                <p><strong>Gasto:</strong> {formatCurrency(selectedRow.amountSpent)}</p>
                                <p><strong>Conversões:</strong> {formatNumber(selectedRow.actionMessagingConversationsStarted)}</p>
                                <p><strong>Alcance:</strong> {formatNumber(selectedRow.reach)}</p>
                                <p><strong>CPM:</strong> {formatCurrency(selectedRow.cpm)}</p>
                                <p><strong>CPC:</strong> {formatCurrency(selectedRow.cpc)}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default CampaignTable;
