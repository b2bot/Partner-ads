import { 
  BarChart3, 
  Target, 
  Users, 
  Image, 
  Settings, 
  ChevronLeft,
  Facebook,
  MessageSquare,
  Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar as SidebarUI, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'campaigns', label: 'Campanhas', icon: Target },
  { id: 'adsets', label: 'Conjuntos de Anúncios', icon: Users },
  { id: 'ads', label: 'Anúncios', icon: Image },
  { id: 'whatsapp-reports', label: 'Relatórios WhatsApp', icon: MessageSquare },
  { id: 'metrics-objectives', label: 'Objetivos de Métricas', icon: Gauge },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { state } = useSidebar();

  return (
    <SidebarUI className="border-r border-blue-100 bg-white/70 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Facebook className="w-6 h-6 text-white" />
          </div>
          {state === 'expanded' && (
            <div>
              <h2 className="font-bold text-lg text-slate-800">Meta Ads Pro</h2>
              <p className="text-xs text-slate-500">Gerenciador de Campanhas</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full justify-start transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'hover:bg-blue-50 text-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </SidebarUI>
  );
}
