import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface ChartData {
  date: string;
  impressions?: number;
  clicks?: number;
  spend?: number;
  contatos?: number;
  agendado?: number;
  atendimento?: number;
  vendas?: number;
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
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
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

  if (isRelatorios) {
    const totalizador = data.reduce((acc, item) => {
      acc.contatos += item.contatos || 0;
      acc.agendado += item.agendado || 0;
      acc.atendimento += item.atendimento || 0;
      acc.vendas += item.vendas || 0;
      return acc;
    }, { contatos: 0, agendado: 0, atendimento: 0, vendas: 0 });

    const funnelData = [
      { name: 'Contatos', value: totalizador.contatos, fill: COLORS[0] },
      { name: 'Agendado', value: totalizador.agendado, fill: COLORS[1] },
      { name: 'Atendimento', value: totalizador.atendimento, fill: COLORS[2] },
      { name: 'Vendas', value: totalizador.vendas, fill: COLORS[3] },
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Área Chart */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-h2">Performance por Data</CardTitle>
            <CardDescription className="text-caption text-muted-foreground">
              Contatos e Agendamentos ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <YAxis tick={axisStyle} />
                  <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <Legend content={<CustomLegend />} />
                  <Area dataKey="contatos" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} name="Contatos" />
                  <Area dataKey="agendado" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} name="Agendado" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-h2">Atendimento vs Vendas</CardTitle>
            <CardDescription className="text-caption text-muted-foreground">
              Comparativo de atendimentos e vendas realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <YAxis tick={axisStyle} />
                  <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="atendimento" fill={COLORS[2]} name="Atendimento" />
                  <Bar dataKey="vendas" fill={COLORS[3]} name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funnel - Pie Chart */}
        <Card className="premium-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-h2">Funil de Conversão</CardTitle>
            <CardDescription className="text-caption text-muted-foreground">
              Visualização do processo de conversão completo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={funnelData} cx="50%" cy="50%" innerRadius={60} outerRadius={150} paddingAngle={5} dataKey="value">
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LineChart padrão */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-h2">Performance por Data</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            Evolução das principais métricas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <YAxis tick={axisStyle} />
                <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <Legend content={<CustomLegend />} />
                <Line dataKey="impressions" stroke={COLORS[0]} strokeWidth={2} name="Impressões" />
                <Line dataKey="clicks" stroke={COLORS[1]} strokeWidth={2} name="Cliques" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AreaChart padrão */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-h2">Impressões vs Cliques</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            Comparativo de visualizações e engajamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <YAxis tick={axisStyle} />
                <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <Legend content={<CustomLegend />} />
                <Area dataKey="impressions" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} name="Impressões" />
                <Area dataKey="clicks" stackId="2" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.8} name="Cliques" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investimento */}
      <Card className="premium-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-h2">Investimento por Período</CardTitle>
          <CardDescription className="text-caption text-muted-foreground">
            Distribuição do investimento ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <YAxis tick={axisStyle} />
                <Tooltip
                  labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')}
                  formatter={(value) => [
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value)),
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
    </div>
  );
}