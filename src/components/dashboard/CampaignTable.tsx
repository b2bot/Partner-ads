
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CampaignTableProps {
  data: any[];
}

const CampaignTable = ({ data }: CampaignTableProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Tabela de Campanhas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campanha</TableHead>
              <TableHead>Impressões</TableHead>
              <TableHead>Cliques</TableHead>
              <TableHead>Valor Gasto</TableHead>
              <TableHead>CTR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 10).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.campaignName || 'Sem nome'}
                </TableCell>
                <TableCell>{(item.impressions || 0).toLocaleString()}</TableCell>
                <TableCell>{(item.clicks || 0).toLocaleString()}</TableCell>
                <TableCell>R$ {(item.amountSpent || 0).toFixed(2)}</TableCell>
                <TableCell>
                  {item.impressions > 0 
                    ? ((item.clicks / item.impressions) * 100).toFixed(2) + '%'
                    : '0%'
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignTable;
