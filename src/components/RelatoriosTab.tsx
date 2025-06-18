import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { DateRange } from '@/types/sheets';

interface ReportData {
  date: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

const initialData: ReportData[] = [
  { date: '2024-01-01', impressions: 1000, clicks: 100, cost: 20, conversions: 10 },
  { date: '2024-01-02', impressions: 1200, clicks: 120, cost: 25, conversions: 12 },
  { date: '2024-01-03', impressions: 1500, clicks: 150, cost: 30, conversions: 15 },
];

export function RelatoriosTab() {
  const [data, setData] = useState<ReportData[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const { user, profile } = useAuth();

  useEffect(() => {
    // Simulação de carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(initialData);
      setLoading(false);
      toast.success('Relatórios atualizados com sucesso!');
    }, 1000);
  };

  const handleDownloadReport = () => {
    toast.info('Download do relatório iniciado...');
    // Lógica real de download aqui
  };

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from) {
      setDateRange({
        from: range.from,
        to: range.to || range.from
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            Relatórios
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Acompanhe os resultados das suas campanhas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Selecionar período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {error && (
          <Badge variant="destructive">
            Erro ao carregar os dados: {error}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Impressões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.reduce((acc, item) => acc + item.impressions, 0)}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total de impressões
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cliques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.reduce((acc, item) => acc + item.clicks, 0)}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total de cliques
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {data.reduce((acc, item) => acc + item.cost, 0).toFixed(2)}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Custo total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.reduce((acc, item) => acc + item.conversions, 0)}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total de conversões
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
