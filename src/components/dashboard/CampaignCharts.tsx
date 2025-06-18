
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard_ui/card';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SheetRow } from '@/types/sheets';
import { usePlatformNavigation } from '@/hooks/dashboard_hooks/usePlatformNavigation';

interface CampaignChartsProps {
  data: SheetRow[];
}

const CampaignCharts = ({ data }: CampaignChartsProps) => {
  console.log('📊 CampaignCharts rendering with data:', data?.length || 0, 'rows');
  
  const { platform } = usePlatformNavigation();
  console.log('📊 Current platform:', platform);

  // Safe data handling
  const safeData = Array.isArray(data) ? data : [];
  
  // Agregar dados por dia
  const rawDailyData = safeData.reduce((acc, row) => {
    if (!row || !row.day) {
      console.warn('📊 Skipping invalid row:', row);
      return acc;
    }

    try {
      const existingDay = acc.find(d => d.day === row.day);
      const conv =
        row.actionMessagingConversationsStarted ||
        row.conversions ||
        row.vendas ||
        0;
      const agend = row.agendado || 0;
      const vendas = row.vendas || 0;
      const contatos = row.contatos || 0;
      const orcamentos = row.orcamentos || 0;
      const faturado = row.faturado || 0;
      
      if (existingDay) {
        existingDay.impressions += row.impressions || 0;
        existingDay.clicks += row.clicks || 0;
        existingDay.spent += row.amountSpent || 0;
        existingDay.conversions += conv;
        existingDay.agendado += agend;
        existingDay.vendas += vendas;
        existingDay.contatos += contatos;
        existingDay.orcamentos += orcamentos;
        existingDay.faturado += faturado;
      } else {
        acc.push({
          day: row.day,
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          spent: row.amountSpent || 0,
          conversions: conv,
          agendado: agend,
          vendas,
          contatos,
          orcamentos,
          faturado,
        });
      }
    } catch (error) {
      console.error('📊 Error processing row:', error, row);
    }
    
    return acc;
  }, [] as Array<{
    day: string;
    impressions: number;
    clicks: number;
    spent: number;
    conversions: number;
    agendado: number;
    vendas: number;
    contatos: number;
    orcamentos: number;
    faturado: number;
  }>)
  .sort((a, b) => {
    try {
      return new Date(a.day).getTime() - new Date(b.day).getTime();
    } catch (error) {
      console.error('📊 Error sorting dates:', error);
      return 0;
    }
  });

  const dailyData = rawDailyData.map(d => {
    try {
      return {
        ...d,
        day: format(parseISO(d.day), 'dd.MM.yyyy'),
      };
    } catch (error) {
      console.error('📊 Error formatting date:', error, d.day);
      return {
        ...d,
        day: d.day, // fallback to original
      };
    }
  });

  console.log('📊 Processed daily data:', dailyData.length, 'entries');

  // Agregar dados por plataforma
  const platformData = safeData.reduce((acc, row) => {
    if (!row) return acc;
    
    try {
      const platform = row.accountName || 'Não especificado';
      const existing = acc.find(p => p.name === platform);
      if (existing) {
        existing.value += row.amountSpent || 0;
      } else {
        acc.push({
          name: platform,
          value: row.amountSpent || 0,
          color: getRandomColor(platform),
        });
      }
    } catch (error) {
      console.error('📊 Error processing platform data:', error, row);
    }
    
    return acc;
  }, [] as Array<{name: string, value: number, color: string}>);

  function getRandomColor(platform: string) {
    try {
      const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
      const index = platform.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
      return colors[index];
    } catch (error) {
      console.error('📊 Error generating color:', error);
      return '#3B82F6'; // fallback color
    }
  }

  const renderChart = (type: 'performance' | 'comparison') => {
    try {
      if (type === 'performance') {
        if (platform === 'google') {
          return (
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-600" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="impressions" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} name="Impressões" />
              <Line type="monotone" dataKey="clicks" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} name="Cliques" />
              <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} name="Conversões" />
            </LineChart>
          );
        } else if (platform === 'relatorios') {
          return (
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-600" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="contatos" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} name="Contatos" />
              <Line type="monotone" dataKey="agendado" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} name="Agendados" />
              <Line type="monotone" dataKey="vendas" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} name="Vendas" />
            </LineChart>
          );
        } else {
          return (
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-600" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
              <YAxis yAxisId="left" stroke="#6B7280" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="spent"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSpent)"
                name="Gasto (R$)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="conversations"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConversations)"
                name="Conversas"
              />
            </AreaChart>
          );
        }
      } else {
        return (
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-600" />
            <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
            <YAxis stroke="#6B7280" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            {platform === 'relatorios' ? (
              <>
                <Line type="monotone" dataKey="orcamentos" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} name="Orçamentos" />
                <Line type="monotone" dataKey="faturado" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} name="Faturado" />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="impressions" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} name="Impressões" />
                <Line type="monotone" dataKey="clicks" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} name="Cliques" />
              </>
            )}
          </LineChart>
        );
      }
    } catch (error) {
      console.error('📊 Error rendering chart:', error);
      return (
        <div className="flex items-center justify-center h-48">
          <p className="text-slate-500">Erro ao carregar gráfico</p>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Gráfico de Performance por Data */}
      <Card className="col-span-1 lg:col-span-3 group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Performance por Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart('performance')}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Impressões vs Cliques ou Orçamentos x Faturamento */}
      <Card className="col-span-1 lg:grid-cols-3 group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {platform === 'relatorios' ? 'Orçamentos x Faturamento' : 'Impressões vs Cliques'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart('comparison')}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCharts;
