import React, { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Search, Download, ChevronLeft, ChevronRight, ArrowUpDown
} from 'lucide-react';

interface TableData {
  [key: string]: any;
}

interface ReportsTableProps {
  data?: TableData[];
  platform: string;
}

export function ReportsTable({ data, platform }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const itemsPerPage = 10;

  if (!data || data.length === 0) return null;

  const isRelatorios = platform === 'relatorios';

  const relatoriosData = [
    {
      dataEnvio: '2024-01-15',
      data: '2024-01-14',
      responsavel: 'João Silva',
      contatos: 45,
      agendado: 32,
      atendimento: 28,
      vendas: 12,
      orcamentos: 8,
      taxaAgendamento: '71.1%',
      taxaConversao: '42.9%',
    },
    {
      dataEnvio: '2024-01-14',
      data: '2024-01-13',
      responsavel: 'Maria Santos',
      contatos: 52,
      agendado: 38,
      atendimento: 35,
      vendas: 15,
      orcamentos: 10,
      taxaAgendamento: '73.1%',
      taxaConversao: '42.9%',
    }
  ];

  const observacoesData = [
    {
      data: '2024-01-15',
      conta: 'Conta Principal',
      responsavel: 'João Silva',
      observacoes:
        'Tivemos um ótimo desempenho hoje, principalmente nos anúncios de vídeo. A campanha de retargeting está convertendo muito bem e conseguimos reduzir o CPA em 15%. Recomendo manter essa estratégia para os próximos dias.',
    },
    {
      data: '2024-01-14',
      conta: 'Conta Secundária',
      responsavel: 'Maria Santos',
      observacoes:
        'Notamos uma queda no CTR dos anúncios estáticos. Sugiro testar novos criativos e ajustar as audiences para melhorar o engajamento. A campanha de awareness está funcionando bem.',
    }
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (sortConfig) {
    filteredData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortConfig.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <CardHeader>
      <CardTitle className="text-h2">{children}</CardTitle>
      <CardDescription className="text-caption text-muted-foreground">
        Informações completas dos relatórios
      </CardDescription>
    </CardHeader>
  );

  return (
    <Card className="premium-card">
      <Heading>{isRelatorios ? 'Dados Detalhados' : `Dados Detalhados - ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}</Heading>
      <CardContent className="space-y-4">
        {isRelatorios ? (
          <Tabs defaultValue="dados" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dados">Dados enviados diariamente</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="space-y-4">
              {/* Search + Export */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar nos dados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-[300px]"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {['dataEnvio', 'data'].map((col) => (
                        <TableHead key={col} className="cursor-pointer" onClick={() => handleSort(col)}>
                          {col === 'dataEnvio' ? 'Data de Envio' : 'Data'} <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                      ))}
                      <TableHead>Responsável</TableHead>
                      <TableHead className="text-right">Contatos</TableHead>
                      <TableHead className="text-right">Agendado</TableHead>
                      <TableHead className="text-right">Atendimento</TableHead>
                      <TableHead className="text-right">Vendas</TableHead>
                      <TableHead className="text-right">Orçamentos</TableHead>
                      <TableHead className="text-right">Taxa Agendamento</TableHead>
                      <TableHead className="text-right">Taxa Conversão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relatoriosData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(row.dataEnvio).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(row.data).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{row.responsavel}</TableCell>
                        <TableCell className="text-right">{row.contatos}</TableCell>
                        <TableCell className="text-right">{row.agendado}</TableCell>
                        <TableCell className="text-right">{row.atendimento}</TableCell>
                        <TableCell className="text-right">{row.vendas}</TableCell>
                        <TableCell className="text-right">{row.orcamentos}</TableCell>
                        <TableCell className="text-right"><Badge variant="secondary">{row.taxaAgendamento}</Badge></TableCell>
                        <TableCell className="text-right"><Badge variant="secondary">{row.taxaConversao}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="observacoes" className="space-y-4">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Data</TableHead>
                      <TableHead className="w-[150px]">Conta</TableHead>
                      <TableHead className="w-[130px]">Responsável</TableHead>
                      <TableHead className="w-[70%]">Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {observacoesData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(row.data).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{row.conta}</TableCell>
                        <TableCell>{row.responsavel}</TableCell>
                        <TableCell className="max-w-0"><div className="text-sm leading-relaxed">{row.observacoes}</div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar campanhas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-[300px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      { key: 'campaign', label: 'Campanha' },
                      { key: 'impressions', label: 'Impressões' },
                      { key: 'clicks', label: 'Cliques' },
                      { key: 'spend', label: 'Investimento' }
                    ].map(({ key, label }) => (
                      <TableHead key={key} className="text-right cursor-pointer" onClick={() => handleSort(key)}>
                        {label} <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      </TableHead>
                    ))}
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">CPC</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.campaign}</TableCell>
                      <TableCell className="text-right">{row.impressions?.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-right">{row.clicks?.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.spend)}
                      </TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">{row.ctr?.toFixed(2)}%</Badge></TableCell>
                      <TableCell className="text-right">R$ {row.cpc?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}