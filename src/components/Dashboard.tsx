
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  MousePointer,
  Eye,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';

export function Dashboard() {
  const { campaigns, adSets, ads, loading, credentials } = useMetaData();

  if (!credentials) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Conecte-se à Meta API
            </h3>
            <p className="text-slate-500 mb-4">
              Configure suas credenciais da Meta API nas configurações para visualizar seus dados.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading.campaigns || loading.adSets || loading.ads) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm text-slate-500">Carregando dados...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-slate-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const activeCampaigns = campaigns.filter(c => c.status.toLowerCase() === 'active');
  const activeAdSets = adSets.filter(as => as.status.toLowerCase() === 'active');
  const activeAds = ads.filter(a => a.status.toLowerCase() === 'active');

  const metrics = [
    {
      title: 'Campanhas Ativas',
      value: activeCampaigns.length.toString(),
      total: campaigns.length,
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Conjuntos de Anúncios',
      value: activeAdSets.length.toString(),
      total: adSets.length,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Anúncios Ativos',
      value: activeAds.length.toString(),
      total: ads.length,
      icon: MousePointer,
      color: 'purple'
    },
    {
      title: 'Total de Itens',
      value: (campaigns.length + adSets.length + ads.length).toString(),
      total: null,
      icon: Eye,
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-5 w-5 text-${metric.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{metric.value}</div>
                {metric.total && (
                  <div className="flex items-center text-xs mt-1">
                    <span className="text-slate-500">
                      de {metric.total} total
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campanhas principais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Campanhas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500">Nenhuma campanha encontrada</p>
              </div>
            ) : (
              campaigns.slice(0, 5).map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{campaign.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status.toLowerCase() === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : campaign.status.toLowerCase() === 'paused'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {campaign.status.toLowerCase() === 'active' ? 'Ativa' : 
                         campaign.status.toLowerCase() === 'paused' ? 'Pausada' : 'Inativa'}
                      </span>
                      <span>Objetivo: {campaign.objective || 'Não definido'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-right">
                    <div>
                      <p className="text-xs text-slate-500">Criada em</p>
                      <p className="font-bold text-slate-800">{new Date(campaign.created_time).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
