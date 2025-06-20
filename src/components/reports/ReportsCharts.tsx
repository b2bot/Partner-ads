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
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
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
};

export function ReportsCharts({ data, platform }: ReportsChartsProps) {
  if (!data || data.length === 0) return null;

  const isRelatorios = platform === 'relatorios';

  const axisStyle = { fontSize: 10, fill: '#64748b' }; // text-xs text-muted-foreground

  if (isRelatorios) {
    const funnelData = [
      { name: 'Contatos', value: 1250, fill: 'hsl(var(--primary))' },
      { name: 'Agendado', value: 892, fill: 'hsl(var(--accent))' },
      { name: 'Atendimento', value: 654, fill: 'hsl(var(--muted))' },
      { name: 'Vendas', value: 234, fill: 'hsl(var(--success))' },
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                  <YAxis tick={axisStyle} />
                  <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <Legend content={<CustomLegend />} />
                  <Area dataKey="contatos" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} name="Contatos" />
                  <Area dataKey="agendado" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} name="Agendado" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
                  <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                  <YAxis tick={axisStyle} />
                  <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="atendimento" fill="hsl(var(--muted))" name="Atendimento" />
                  <Bar dataKey="vendas" fill="hsl(var(--success))" name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                <YAxis tick={axisStyle} />
                <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <Legend content={<CustomLegend />} />
                <Line dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} name="Impressões" />
                <Line dataKey="clicks" stroke="hsl(var(--accent))" strokeWidth={2} name="Cliques" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                <YAxis tick={axisStyle} />
                <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')} />
                <Legend content={<CustomLegend />} />
                <Area dataKey="impressions" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} name="Impressões" />
                <Area dataKey="clicks" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.8} name="Cliques" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
                <XAxis dataKey="date" tick={axisStyle} tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                <YAxis tick={axisStyle} />
                <Tooltip
                  labelFormatter={(v) => new Date(v).toLocaleDateString('pt-BR')}
                  formatter={(value) => [
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(value)),
                    'Investimento',
                  ]}
                />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="spend" fill="hsl(var(--accent))" name="Investimento" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}