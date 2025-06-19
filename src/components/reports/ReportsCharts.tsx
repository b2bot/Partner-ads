
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ResponsiveContainer 
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

const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export function ReportsCharts({ data, platform }: ReportsChartsProps) {
  if (!data || data.length === 0) return null;

  const isRelatorios = platform === 'relatorios';

  // Gráficos para Relatórios Diários
  if (isRelatorios) {
    const funnelData = [
      { name: 'Contatos', value: 1250, fill: '#3B82F6' },
      { name: 'Agendado', value: 892, fill: '#8B5CF6' },
      { name: 'Atendimento', value: 654, fill: '#06B6D4' },
      { name: 'Vendas', value: 234, fill: '#10B981' }
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance por Data */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Performance por Data</CardTitle>
            <CardDescription>Contatos e Agendamentos ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value, name) => [value, name === 'contatos' ? 'Contatos' : 'Agendado']}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="contatos" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                    name="Contatos"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="agendado" 
                    stackId="1"
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.6}
                    name="Agendado"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Atendimento vs Vendas */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Atendimento vs Vendas</CardTitle>
            <CardDescription>Comparativo de atendimentos e vendas realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value, name) => [value, name === 'atendimento' ? 'Atendimento' : 'Vendas']}
                  />
                  <Legend />
                  <Bar dataKey="atendimento" fill="#06B6D4" name="Atendimento" />
                  <Bar dataKey="vendas" fill="#10B981" name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funil de Conversão */}
        <Card className="premium-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
            <CardDescription>Visualização do processo de conversão completo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={funnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={150}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Gráficos para outras plataformas
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance por Data */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Performance por Data</CardTitle>
          <CardDescription>Evolução das principais métricas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Impressões"
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Cliques"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Impressões vs Cliques */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Impressões vs Cliques</CardTitle>
          <CardDescription>Comparativo de visualizações e engajamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="Impressões"
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.8}
                  name="Cliques"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investimento por Data */}
      <Card className="premium-card lg:col-span-2">
        <CardHeader>
          <CardTitle>Investimento por Período</CardTitle>
          <CardDescription>Distribuição do investimento ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                  formatter={(value) => [
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value)),
                    'Investimento'
                  ]}
                />
                <Bar dataKey="spend" fill="#8B5CF6" name="Investimento" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
