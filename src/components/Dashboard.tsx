
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  MousePointer,
  Eye
} from 'lucide-react';

const metrics = [
  {
    title: 'Gasto Total',
    value: 'R$ 12.450,00',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
    color: 'blue'
  },
  {
    title: 'ROAS',
    value: '4.2x',
    change: '+8%',
    trend: 'up',
    icon: TrendingUp,
    color: 'green'
  },
  {
    title: 'Alcance',
    value: '145.320',
    change: '-3%',
    trend: 'down',
    icon: Eye,
    color: 'purple'
  },
  {
    title: 'CTR',
    value: '2.8%',
    change: '+15%',
    trend: 'up',
    icon: MousePointer,
    color: 'orange'
  },
];

const campaigns = [
  {
    name: 'Campanha Black Friday 2024',
    status: 'Ativa',
    budget: 'R$ 500/dia',
    roas: '5.2x',
    spend: 'R$ 2.450',
    impressions: '45.320'
  },
  {
    name: 'Retargeting - Carrinho Abandonado',
    status: 'Ativa',
    budget: 'R$ 200/dia',
    roas: '3.8x',
    spend: 'R$ 890',
    impressions: '12.450'
  },
  {
    name: 'Prospecção - Lookalike',
    status: 'Pausada',
    budget: 'R$ 300/dia',
    roas: '2.1x',
    spend: 'R$ 1.200',
    impressions: '28.670'
  },
];

export function Dashboard() {
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
                <div className="flex items-center text-xs mt-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {metric.change}
                  </span>
                  <span className="text-slate-500 ml-1">vs. período anterior</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campanhas principais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Campanhas Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{campaign.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Ativa' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {campaign.status}
                    </span>
                    <span>Orçamento: {campaign.budget}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-xs text-slate-500">ROAS</p>
                    <p className="font-bold text-slate-800">{campaign.roas}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Gasto</p>
                    <p className="font-bold text-slate-800">{campaign.spend}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Impressões</p>
                    <p className="font-bold text-slate-800">{campaign.impressions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
