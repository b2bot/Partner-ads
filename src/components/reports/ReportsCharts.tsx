import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import FunnelVisualization from '@/components/reports/FunnelVisualization';

interface ChartData {
  date: string;
  impressions?: number;
  clicks?: number;
  spend?: number;
  conversions?: number;
  atendimento?: number;
  vendas?: number;
  [key: string]: number | string | undefined;
}

interface ReportsChartsProps {
  data?: ChartData[];
  platform: string;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--muted))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--destructive))',
];

const CustomLegend = ({ payload }: any) => (
  <div className="flex justify-center">
    <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      {payload.map((entry: any, i: number) => (
        <li key={i} className="flex items-center gap-2">
          <span
            className="block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export function ReportsCharts({ data, platform }: ReportsChartsProps) {
  if (!data || data.length === 0) return null;
  const isRelatorios = platform === 'relatorios';
  const axisStyle = { fontSize: 10, fill: '#64748b' };

  // --- constroi dinamicamente os campos do funil ---
  const funnelFields = useMemo<string[]>(() => {
    if (platform === 'relatorios') return ['contatos', 'agendado', 'vendas'];
    if (platform === 'google') return ['impressions', 'clicks', 'conversions'];
    // fallback: primeiras 3 chaves numéricas (exceto date)
    const keys = Object.keys(data[0]).filter(
      (k) => k !== 'date' && typeof data[0][k] === 'number'
    );
    return keys.slice(0, 3);
  }, [data, platform]);

  const funnelData = useMemo(
    () =>
      funnelFields.map((field, idx) => ({
        name: field,
        value: data.reduce((sum, row) => sum + Number(row[field] || 0), 0),
        fill: COLORS[idx],
      })),
    [data, funnelFields]
  );

  // --- constroi chartData incluindo conversions ---
  const chartData = useMemo<ChartData[]>(() => {
    return data.map((row) => ({
      date: String(row.date),
      impressions: Number(row.impressions || 0),
      clicks: Number(row.clicks || 0),
      spend: Number(row.spend || 0),
      conversions: Number(row.conversions || 0),
      atendimento: Number(row.atendimento || 0),
      vendas: Number(row.vendas || 0),
    }));
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1) Performance por Data */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-h2">
            {isRelatorios ? 'Performance por Data' : 'Evolução das métricas'}
          </CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            {isRelatorios
              ? 'Contatos e Agendamentos ao longo do tempo'
              : 'Impressões e Cliques ao longo do tempo'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={isRelatorios ? 'h-[200px]' : 'h-[300px]'}>
            <ResponsiveContainer width="100%" height="100%">
              {isRelatorios ? (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={axisStyle}
                    tickFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <YAxis tick={axisStyle} />
                  <Tooltip
                    labelFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <Legend content={<CustomLegend />} />
                  <Area
                    dataKey="atendimento"
                    stackId="1"
                    stroke={COLORS[0]}
                    fill={COLORS[0]}
                    fillOpacity={0.6}
                    name="Atendimento"
                  />
                  <Area
                    dataKey="vendas"
                    stackId="1"
                    stroke={COLORS[1]}
                    fill={COLORS[1]}
                    fillOpacity={0.6}
                    name="Vendas"
                  />
                </AreaChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={axisStyle}
                    tickFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <YAxis tick={axisStyle} />
                  <Tooltip
                    labelFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <Legend content={<CustomLegend />} />
                  <Line
                    dataKey="impressions"
                    stroke={COLORS[0]}
                    strokeWidth={2}
                    name="Impressões"
                  />
                  <Line
                    dataKey="clicks"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                    name="Cliques"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2) Cliques vs Conversões ou Atendimento vs Vendas */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-h2">
            {isRelatorios ? 'Atendimento vs Vendas' : 'Cliques vs Conversões'}
          </CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            {isRelatorios
              ? 'Comparativo de atendimentos e vendas realizadas'
              : 'Comparativo de cliques e conversões'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {isRelatorios ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={axisStyle}
                    tickFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <YAxis tick={axisStyle} />
                  <Tooltip
                    labelFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <Legend content={<CustomLegend />} />
                  <Bar
                    dataKey="atendimento"
                    fill={COLORS[2]}
                    name="Atendimento"
                  />
                  <Bar dataKey="vendas" fill={COLORS[3]} name="Vendas" />
                </BarChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={axisStyle}
                    tickFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <YAxis tick={axisStyle} />
                  <Tooltip
                    labelFormatter={(v) =>
                      new Date(String(v)).toLocaleDateString('pt-BR')
                    }
                  />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="clicks" fill={COLORS[1]} name="Cliques" />
                  <Bar
                    dataKey="conversions"
                    fill={COLORS[2]}
                    name="Conversões"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 3) Investimento por Período */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-h2">Investimento por Período</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            Distribuição do investimento ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  tick={axisStyle}
                  tickFormatter={(v) =>
                    new Date(String(v)).toLocaleDateString('pt-BR')
                  }
                />
                <YAxis tick={axisStyle} />
                <Tooltip
                  labelFormatter={(v) =>
                    new Date(String(v)).toLocaleDateString('pt-BR')
                  }
                  formatter={(value) => [
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(value)),
                    'Investimento',
                  ]}
                />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="spend" fill={COLORS[1]} name="Investimento" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 4) Funil de Conversão (componente customizado) */}
      <Card className="premium-card">
        <FunnelVisualization data={chartData} platform={platform} />
      </Card>
    </div>
  );
}
