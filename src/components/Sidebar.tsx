
import { 
  BarChart3, 
  Target, 
  Zap, 
  MessageSquare, 
  Settings,
  LayoutDashboard,
  MessageCircle,
  Image,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { isAdmin } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(isAdmin ? [
      { id: 'campaigns', label: 'Campanhas', icon: Target },
      { id: 'adsets', label: 'Conjuntos de Anúncios', icon: BarChart3 },
      { id: 'ads', label: 'Anúncios', icon: Zap },
      { id: 'whatsapp-reports', label: 'Relatórios WhatsApp', icon: MessageSquare },
      { id: 'metrics-objectives', label: 'Métricas e Objetivos', icon: BarChart3 },
    ] : []),
    { id: 'tickets', label: isAdmin ? 'Gerenciar Chamados' : 'Meus Chamados', icon: MessageCircle },
    { id: 'creatives', label: isAdmin ? 'Gerenciar Criativos' : 'Meus Criativos', icon: Image },
    ...(isAdmin ? [{ id: 'clients-management', label: 'Gerenciar Clientes', icon: Users }] : []),
    ...(isAdmin ? [{ id: 'settings', label: 'Configurações', icon: Settings }] : []),
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Meta Ads Pro</h2>
        <p className="text-sm text-slate-600">Gerenciador de Campanhas</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start text-left",
                activeTab === item.id 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-slate-700 hover:bg-slate-100"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
