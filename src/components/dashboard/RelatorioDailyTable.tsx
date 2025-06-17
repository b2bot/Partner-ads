
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, Users, DollarSign } from 'lucide-react';
import { SheetRow } from '@/hooks/dashboard_hooks/useSheetData';
import { format, parseISO } from 'date-fns';

interface RelatorioDailyTableProps {
  data: SheetRow[];
}

const RelatorioDailyTable = ({ data }: RelatorioDailyTableProps) => {
  const formatNumber = (num?: number) => 
    typeof num === 'number' && !isNaN(num)
      ? new Intl.NumberFormat('pt-BR').format(num)
      : '0';

  const formatCurrency = (num?: number) => 
    typeof num === 'number' && !isNaN(num)
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
      : 'R$ 0,00';

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Relatório Diário
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {data.length} registros
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                  Data
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                  <Eye className="w-3 h-3 inline mr-1" />
                  Impressões
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                  <MousePointer className="w-3 h-3 inline mr-1" />
                  Cliques
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                  <DollarSign className="w-3 h-3 inline mr-1" />
                  Gasto
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-xs">
                  <Users className="w-3 h-3 inline mr-1" />
                  Conversões
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-4 text-xs text-gray-900 dark:text-gray-100">
                    {row.day ? format(parseISO(row.day), 'dd/MM/yyyy') : 'N/A'}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatorioDailyTable;
