
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  DollarSign,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const Relatorios = () => {
  const [activeTab, setActiveTab] = useState('meta');
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const platforms = [
    { id: 'meta', name: 'Meta', icon: '📘' },
    { id: 'google', name: 'Google', icon: '🔍' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'b2bot', name: 'B2Bot', icon: '🤖' },
    { id: 'relatorios', name: 'Relatórios Diários', icon: '📈' }
  ];

  const mockMetrics = {
    impressions: { value: 125430, change: 12.5 },
    clicks: { value: 2430, change: -3.2 },
    spend: { value: 1250.30, change: 8.7 },
    conversions: { value: 45, change: 22.1 }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Relatórios Personalizados
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Visualize suas métricas de campanhas e dados operacionais
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              Últimos 7 dias
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Platform Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-9 w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            {platforms.map((platform) => (
              <TabsTrigger 
                key={platform.id} 
                value={platform.id}
                className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <span className="text-lg">{platform.icon}</span>
                <span className="text-xs font-medium hidden sm:block">{platform.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Impressões
                </CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatNumber(mockMetrics.impressions.value)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">
                    +{mockMetrics.impressions.change}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Cliques
                </CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <MousePointer className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatNumber(mockMetrics.clicks.value)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                  <span className="text-xs text-red-600 dark:text-red-400">
                    {mockMetrics.clicks.change}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Investimento
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(mockMetrics.spend.value)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">
                    +{mockMetrics.spend.change}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Conversões
                </CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {mockMetrics.conversions.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">
                    +{mockMetrics.conversions.change}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">vs período anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          {platforms.map((platform) => (
            <TabsContent key={platform.id} value={platform.id} className="mt-8">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span>Dados de {platform.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      Em desenvolvimento
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center mb-4">
                      <BarChart3 className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      Dados de {platform.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                      Os dados desta plataforma serão carregados via API do Google Sheets.
                      Interface completa em desenvolvimento.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Relatorios;
