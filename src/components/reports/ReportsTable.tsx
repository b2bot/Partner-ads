import React, { useState, useMemo } from 'react';
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
import { Switch } from '@/components/ui/switch';

interface TableData {
  [key: string]: any;
}

interface ReportsTableProps {
  data?: any;
  platform: string;
}

export function ReportsTable({ data, platform }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyActive, setOnlyActive] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const itemsPerPage = 10;
  const [metaTab, setMetaTab] = useState<'campaigns' | 'adsets' | 'ads'>('campaigns');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  
  const isMeta = platform === 'meta' && data && !Array.isArray(data);

  // ① Pegamos o array bruto
  let baseData = isMeta
    ? (data[metaTab] ?? [])
    : (data ?? []);

  // ② Aplicamos o filtro "Só ativos"
  if (onlyActive) {
    baseData = baseData.filter((row: any) => row.status === 'ACTIVE');
  }

  // ③ A partir daqui, continuamos usando safeData
  const safeData = baseData;


  const isRelatorios = platform === 'relatorios';
  
  // Headers configuration for Google tab
  const googleHeaders = useMemo(() => {
    if (platform !== 'google') return [];
    // nós queremos agrupar sempre por Ad Set (Grupo de Anúncios)
    return [
      { key: 'adset',            label: 'Grupo de Anúncios' },
	  { key: 'status',           label: 'Status'   },
	  { key: 'date',             label: 'Data' },
      { key: 'spend',            label: 'Investimento' },
      { key: 'impressions',      label: 'Impressões' },
      { key: 'clicks',           label: 'Cliques' },
      { key: 'ctr',              label: 'CTR' },
      { key: 'conversions',      label: 'Resultado' },
      { key: 'conversionRate',   label: 'Taxa/Conv.' },  // se quiser exibir %
      { key: 'costPerConversion',label: 'CPR' },

    ];
  }, [platform]);
  
  // Headers configuration for Meta tabs
  const metaHeaders = useMemo(() => {
    if (!isMeta) return [];
    if (metaTab === 'campaigns') {
      return [
        { key: 'campaign', label: 'Campanha' },
		{ key: 'status',   label: 'Status'    },
        { key: 'spend', label: 'Investimento' },
        { key: 'impressions', label: 'Impressões' },
        { key: 'clicks', label: 'Cliques' },
        { key: 'ctr', label: 'CTR' },
        { key: 'conversions', label: 'Resultado' },
        { key: 'costPerConversion', label: 'CPR' },
      ];
    }
    if (metaTab === 'ads') {
      return [
        { key: 'campaign', label: 'Anúncio' },
		{ key: 'adCreativeStatus', label: 'Status' },
        { key: 'creative', label: 'Criativo' },
        { key: 'spend', label: 'Investimento' },
        { key: 'impressions', label: 'Impressões' },
        { key: 'clicks', label: 'Cliques' },
        { key: 'ctr', label: 'CTR' },
        { key: 'conversions', label: 'Resultado' },
        { key: 'costPerConversion', label: 'CPR' },
      ];
    }
    // adsets tab
    return [
      { key: 'campaign', label: 'Grupo' },
	  { key: 'status', label: 'Status' },
	  { key: 'spend', label: 'Investimento' },
      { key: 'impressions', label: 'Impressões' },
      { key: 'clicks', label: 'Cliques' },
      { key: 'ctr', label: 'CTR' },
      { key: 'cpc', label: 'CPC' },
      { key: 'conversions', label: 'Resultado' },
      { key: 'costPerConversion', label: 'CPR' },
    ];
  }, [isMeta, metaTab]);
  

  const relatoriosData = useMemo(() => {
    if (!isRelatorios) return [];
    return safeData.map((row) => {
      const contatos = Number(row['Contatos']) || 0;
      const agendado = Number(row['Agendado']) || 0;
      const atendimento = Number(row['Atendimento']) || 0;
      const vendas = Number(row['Vendas']) || 0;
      const orcamentos = Number(row['Orçamentos']) || 0;
	  const faturado = Number(row['Faturado']) || 0;
      const taxaAgendamento = contatos ? `${((agendado / contatos) * 100).toFixed(1)}%` : '0%';
      const taxaConversao = atendimento ? `${((vendas / atendimento) * 100).toFixed(1)}%` : '0%';

      return {
        dataEnvio: row['Data'] || row['Data de Envio'],
        data: row['Data'],
        responsavel: row['Responsável'],
        contatos,
        agendado,
        atendimento,
        vendas,
        orcamentos,
		faturado,
        taxaAgendamento,
        taxaConversao,
        observacoes: row['Observações'],
        conta: row['Account Name'],
      };
    });
  }, [data, isRelatorios]);

  const observacoesData = useMemo(
    () =>
      relatoriosData
        .filter((r) => r.observacoes)
        .map((r) => ({
          data: r.data,
          conta: r.conta,
          responsavel: r.responsavel,
          observacoes: r.observacoes,
        })),
    [relatoriosData],
  );

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = safeData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!isMeta && safeData.length === 0) return null;

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
  
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  const Heading = ({ children }: { children: React.ReactNode }) => (
    <CardHeader>
      <CardTitle className="text-h2">{children}</CardTitle>
      <CardDescription className="text-caption text-muted-foreground">
        Informações completas dos relatórios
      </CardDescription>
    </CardHeader>
  );

  return (
	   <>
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
						placeholder="Buscar..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10 w-full sm:w-[300px]"
					  />
					</div>
					<Button variant="outline" size="sm">
					  <Download className="h-4 w-4 mr-2" />
					  Exportar
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
						  <TableHead className="text-right">Faturado</TableHead>
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
							<TableCell className="text-right">{row.faturado}</TableCell>
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
			) : isMeta ? (
			  <Tabs
				value={metaTab}
				onValueChange={(v) => setMetaTab(v as any)}
				className="w-full"
			  >
				<TabsList className="grid w-full grid-cols-3">
				  <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
				  <TabsTrigger value="adsets">Grupos</TabsTrigger>
				  <TabsTrigger value="ads">Anúncios</TabsTrigger>
				</TabsList>

				{/* ––––– Campanhas ––––– */}
				<TabsContent value="campaigns" className="space-y-4">
				  {/* Search + Export */}
				  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
					<div className="relative w-full sm:w-auto">
					  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					  <Input
						placeholder="Buscar..."
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

				  {/* Tabela Campanhas */}
				  <div className="rounded-md border overflow-x-auto">
					<Table>
					  <TableHeader>
						<TableRow>
						  {metaHeaders.map(({ key, label }, i) => (
						    <TableHead
							  key={key}
							  className={`
							    cursor-pointer
							    text-xs
							    ${i === 0 ? 'text-left' : 'text-right'}
							    text-muted-foreground
							  `}
							  onClick={() => handleSort(key)}
						    >
							  {label}
							  <ArrowUpDown className="ml-1 inline h-3 w-3" />
						    </TableHead>
						  ))}
						</TableRow>
					  </TableHeader>
					  <TableBody>
						{paginatedData.map((row: TableData, idx) => (
						  <TableRow key={idx}>
							{metaHeaders.map(({ key }, i) => {
							  let content: React.ReactNode = row[key];

							  if (key === 'spend') {
								content = currencyFormatter.format(row.spend);
							  }
							  if (key === 'ctr') {
								content = `${row.ctr?.toFixed(2)}%`;

							  }
							  if (key === 'costPerConversion') {
								content = currencyFormatter.format(row[key] ?? 0);
							  }
							  if (key === 'impressions' || key === 'clicks') {
								content = row[key]?.toLocaleString('pt-BR');
							  }
							  if (key === 'conversions') {
                                content = <Badge variant="primary" className="block w-[80px] ml-auto text-center bg-blue-100 text-blue-800">{row.conversions}</Badge>;
                              }
							  if (key === 'status') {
                                content = <Badge variant="secondary">{row.status}</Badge>;
                              }

							  return (
								<TableCell
								  key={key}
								  className={i === 0 ? 'text-left font-medium' : 'text-right whitespace-nowrap'}
								>
								  {content}
								</TableCell>
							  );
							})}
						  </TableRow>
						))}
					  </TableBody>
					</Table>
				  </div>

				  {/* Paginação */}
				  {totalPages > 1 && (
					<div className="flex items-center justify-between pt-4">
					  <div className="text-sm text-muted-foreground">
						Mostrando {startIndex + 1} a{' '}
						{Math.min(startIndex + itemsPerPage, filteredData.length)} de{' '}
						{filteredData.length} resultados
					  </div>
					  <div className="flex items-center gap-2">
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() =>
							setCurrentPage((p) => Math.max(p - 1, 1))
						  }
						  disabled={currentPage === 1}
						>
						  <ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm text-muted-foreground">
						  Página {currentPage} de {totalPages}
						</span>
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() =>
							setCurrentPage((p) => Math.min(p + 1, totalPages))
						  }
						  disabled={currentPage === totalPages}
						>
						  <ChevronRight className="h-4 w-4" />
						</Button>
					  </div>
					</div>
				  )}
				</TabsContent>

				{/* ––––– Grupos ––––– */}
				<TabsContent value="adsets" className="space-y-4">
				  {/* Search + Export */}
				  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
					<div className="relative w-full sm:w-auto">
					  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					  <Input
						placeholder="Buscar..."
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

				  {/* Tabela Grupos */}
				  <div className="rounded-md border overflow-x-auto">
					<Table>
					  <TableHeader>
						<TableRow>
						  {metaHeaders.map(({ key, label }, i) => (
							<TableHead
							  key={key}
							  className={`
							    cursor-pointer
							    text-xs
							    ${i === 0 ? 'text-left' : 'text-right'}
							    text-muted-foreground
							  }`}
							  onClick={() => handleSort(key)}
							>
							  {label}{' '}
							  <ArrowUpDown className="ml-2 h-3 w-3 inline" />
							</TableHead>
						  ))}
						</TableRow>
					  </TableHeader>
					  <TableBody>
						{paginatedData.map((row: TableData, idx) => (
						  <TableRow key={idx}>
							{metaHeaders.map(({ key }, i) => {
							  let content: React.ReactNode = row[key];

							  if (key === 'spend') {
								content = currencyFormatter.format(row.spend);
							  }
							  if (key === 'ctr') {
								content = `${row.ctr?.toFixed(2)}%`;

							  }
							  if (key === 'cpc') {
                                content = currencyFormatter.format(row.cpc ?? 0);
							  }
							  if (key === 'costPerConversion') {
								content = currencyFormatter.format(row[key] ?? 0);
							  }
							  if (key === 'impressions' || key === 'clicks') {
								content = row[key]?.toLocaleString('pt-BR');
							  }
							  if (key === 'conversions') {
                                content = <Badge variant="primary" className="block w-[80px] ml-auto text-center bg-blue-100 text-blue-800">{row.conversions}</Badge>;
                              }
							  if (key === 'status') {
                                content = <Badge variant="secondary">{row.status}</Badge>;
                              }

							  return (
								<TableCell
								  key={key}
								  className={i === 0 ? 'text-left font-medium' : 'text-right whitespace-nowrap'}
								>
								  {content}
								</TableCell>
							  );
							})}
						  </TableRow>
						))}
					  </TableBody>
					</Table>
				  </div>

				  {/* Paginação */}
				  {totalPages > 1 && (
					<div className="flex items-center justify-between pt-4">
					  <div className="text-sm text-muted-foreground">
						Mostrando {startIndex + 1} a{' '}
						{Math.min(startIndex + itemsPerPage, filteredData.length)} de{' '}
						{filteredData.length} resultados
					  </div>
					  <div className="flex items-center gap-2">
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() =>
							setCurrentPage((p) => Math.max(p - 1, 1))
						  }
						  disabled={currentPage === 1}
						>
						  <ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm text-muted-foreground">
						  Página {currentPage} de {totalPages}
						</span>
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() =>
							setCurrentPage((p) => Math.min(p + 1, totalPages))
						  }
						  disabled={currentPage === totalPages}
						>
						  <ChevronRight className="h-4 w-4" />
						</Button>
					  </div>
					</div>
				  )}
				</TabsContent>

				{/* ––––– Anúncios ––––– */}
				<TabsContent value="ads" className="space-y-4">
				  {/* Search + Export */}
				  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
					<div className="relative w-full sm:w-auto">
					  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					  <Input
						placeholder="Buscar..."
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

				  {/* Tabela Anúncios */}
				  <div className="rounded-md border overflow-x-auto">
					<Table>
					  <TableHeader>
						<TableRow>
						  {metaHeaders.map(({ key, label }, i) => (
							<TableHead
							  key={key}
							  className={`
							    cursor-pointer
							    text-xs
							    ${i === 0 ? 'text-left' : 'text-right'}
							    text-muted-foreground
							  }`}
							  onClick={() => handleSort(key)}
							>
							  {label}{' '}
							  <ArrowUpDown className="ml-2 h-3 w-3 inline" />
							</TableHead>
						  ))}
						</TableRow>
					  </TableHeader>
					  <TableBody>
						{paginatedData.map((row: TableData, idx) => (
						  <TableRow key={idx}>
							{metaHeaders.map(({ key }, i) => {
							  let content: React.ReactNode = row[key];

							  // Lightbox no criativo
							  if (key === 'creative' && row.creative) {
								content = (
								  <button
									onClick={() => setLightboxSrc(row.creative)}
									className="inline-block focus:outline-none"
								  >
									<img
									  src={row.creative}
									  alt={row.campaign}
									  className="w-12 h-12 object-cover rounded hover:opacity-80 transition"
									/>
								  </button>
								);
							  }

							  if (key === 'spend') {
								content = currencyFormatter.format(row.spend);
							  }
							  if (key === 'ctr') {
								content = `${row.ctr?.toFixed(2)}%`;

							  }
							  if (key === 'costPerConversion') {
								content = currencyFormatter.format(row[key] ?? 0);
							  }
							  if (key === 'impressions' || key === 'clicks') {
								content = row[key]?.toLocaleString('pt-BR');
							  }
							  if (key === 'conversions') {
                                content = <Badge variant="primary" className="block w-[80px] ml-auto text-center bg-blue-100 text-blue-800">{row.conversions}</Badge>;
                              }
							  if (key === 'adCreativeStatus') {
                                content = <Badge variant="secondary">{row.adCreativeStatus}</Badge>;
                              }
							  
			

							  return (
								<TableCell
								  key={key}
								  className={i === 0 ? 'text-left font-medium' : 'text-right whitespace-nowrap'}
								>
								  {content}
								</TableCell>
							);})}
						  </TableRow>
					  ))}
					  </TableBody>
					</Table>
				  </div>

				  {/* Paginação */}
				  {totalPages > 1 && (
					<div className="flex items-center justify-between pt-4">
					  <div className="text-sm text-muted-foreground">
						Mostrando {startIndex + 1} a{' '}
						{Math.min(startIndex + itemsPerPage, filteredData.length)} de{' '}
						{filteredData.length} resultados
					  </div>
					  <div className="flex items-center gap-2">
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
						  disabled={currentPage === 1}
						>
						  <ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm text-muted-foreground">
						  Página {currentPage} de {totalPages}
						</span>
						<Button
						  variant="outline"
						  size="sm"
						  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
						  disabled={currentPage === totalPages}
						>
						  <ChevronRight className="h-4 w-4" />
						</Button>
					  </div>
					</div>
				  )}
				</TabsContent>
			  </Tabs>
			) : platform === 'google' ? (
			  /* ––––––––––––––––––––––––––––––––––––––––––––––––– Google ––––––––––––––––––––––––––––––––––––––––––––––––– */
			  <>
				<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
				  <div className="relative w-full sm:w-auto">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
					  placeholder="Buscar..."
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

				{/* Tabela Google */}
				<div className="rounded-md border overflow-x-auto">
				  <Table>
					<TableHeader>
					  <TableRow>
						{googleHeaders.map(({ key, label }) => (
						  <TableHead
							key={key}
							className="text-right cursor-pointer"
							onClick={() => handleSort(key)}
						  >
							{label} <ArrowUpDown className="ml-2 h-4 w-4 inline" />
						  </TableHead>
						))}
					  </TableRow>
					</TableHeader>
					<TableBody>
					  {paginatedData.map((row: TableData, idx) => (
						<TableRow key={idx}>
						  {googleHeaders.map(({ key }) => {
							let content: React.ReactNode = row[key];

							if (key === 'date' && row.date) { //converte "2025-05-28" em data brasileira
							  content = new Date(row.date).toLocaleDateString('pt-BR');
							}                        

							if (key === 'spend' || key === 'costPerConversion') {
							  content = currencyFormatter.format(row[key] ?? 0);
							}

							if (key === 'ctr' || key === 'conversionRate') {
							  const rate =
								key === 'conversionRate'
								  ? row.conversions && row.clicks
									? (row.conversions * 100) / row.clicks
									: 0
								  : row.ctr;
							  content = <Badge variant="secondary">{rate?.toFixed(2)}%</Badge>;
							}

							const cellClass = key === 'adset' ? 'font-medium' : 'text-right';
							return (
							  <TableCell key={key} className={cellClass}>
								{content}
							  </TableCell>
							);
						  })}
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</div>

				{/* Paginação Google */}
				{totalPages > 1 && (
				  <div className="flex items-center justify-between pt-4">
					<div className="text-sm text-muted-foreground">
					  Mostrando {startIndex + 1} a{' '}
					  {Math.min(startIndex + itemsPerPage, filteredData.length)} de{' '}
					  {filteredData.length} resultados
					</div>
					<div className="flex items-center gap-2">
					  <Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
						disabled={currentPage === 1}
					  >
						<ChevronLeft className="h-4 w-4" />
					  </Button>
					  <span className="text-sm text-muted-foreground">
						Página {currentPage} de {totalPages}
					  </span>
					  <Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
						disabled={currentPage === totalPages}
					  >
						<ChevronRight className="h-4 w-4" />
					  </Button>
					</div>
				  </div>
				)}
			  </>
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
						  { key: 'creative', label: 'Criativo' }, 
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

	
        {/* O LIGHTBOX */}
        {lightboxSrc && (
           <div
             className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
             onClick={() => setLightboxSrc(null)}
           >
             {/* impede o clique de fechar ao clicar na imagem */}
             <div className="max-w-full max-h-full" onClick={e => e.stopPropagation()}>
               <img
                 src={lightboxSrc}
                 alt="Visualização do criativo"
                 className="max-w-full max-h-[80vh] rounded shadow-lg"
               />
             </div>
           </div>
        )}
      </>
    );
}