
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare,
  Plus,
  Clock,
  Send,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';
import { WhatsAppConnectionCard } from './whatsapp/WhatsAppConnectionCard';
import { WhatsAppDashboard } from './whatsapp/WhatsAppDashboard';
import { CampaignList } from './whatsapp/CampaignList';
import { NewMessageModal } from './whatsapp/NewMessageModal';
import { NewCampaignModal } from './whatsapp/NewCampaignModal';
import { NewContactModal } from './whatsapp/NewContactModal';
import { MessageFiltersModal } from './whatsapp/MessageFiltersModal';

export function WhatsAppReportsTab() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [showMessageFiltersModal, setShowMessageFiltersModal] = useState(false);
  const [campaignRefreshKey, setCampaignRefreshKey] = useState(0);

  const handleNewCampaign = () => {
    setShowNewCampaignModal(true);
  };

  const handleNewMessage = () => {
    setShowNewMessageModal(true);
  };

  const handleNewContact = () => {
    setShowNewContactModal(true);
  };

  const handleMessageFilters = () => {
    setShowMessageFiltersModal(true);
  };

  const handleCampaignSuccess = () => {
    setCampaignRefreshKey(prev => prev + 1);
  };

  const handleApplyMessageFilters = (filters: any) => {
    console.log('Applying filters:', filters);
    // Implementar lógica de filtros aqui
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">WhatsApp Business</h1>
          <p className="text-sm text-slate-600 mt-1">
            Automação e disparo de mensagens para clientes via WhatsApp Business API
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleNewMessage}>
            <Send className="w-4 h-4 mr-1" />
            Nova Mensagem
          </Button>
          <Button size="sm" onClick={handleNewCampaign}>
            <Plus className="w-4 h-4 mr-1" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Conexão WhatsApp */}
      <WhatsAppConnectionCard />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Campanhas
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mensagens
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Contatos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <WhatsAppDashboard />
          
          {/* Últimas Atividades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Últimas Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Relatório semanal enviado</p>
                      <p className="text-xs text-gray-500">João Silva - há 2 horas</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Entregue</div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Promoção mensal programada</p>
                      <p className="text-xs text-gray-500">Campanha Marketing - há 3 horas</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Agendado</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <CampaignList 
            key={campaignRefreshKey}
            onNewCampaign={handleNewCampaign} 
          />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Histórico de Mensagens</CardTitle>
                <Button variant="outline" size="sm" onClick={handleMessageFilters}>
                  <Settings className="w-4 h-4 mr-1" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-600 mb-2">Nenhuma mensagem enviada</h3>
                <p className="text-sm text-gray-500 mb-4">
                  As mensagens enviadas aparecerão aqui
                </p>
                <Button onClick={handleNewMessage} variant="outline">
                  <Send className="w-4 h-4 mr-1" />
                  Enviar Primeira Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Contatos</CardTitle>
                <Button variant="outline" size="sm" onClick={handleNewContact}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Contato
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-600 mb-2">Nenhum contato cadastrado</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Adicione contatos para enviar mensagens
                </p>
                <Button onClick={handleNewContact} variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Primeiro Contato
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NewMessageModal 
        open={showNewMessageModal} 
        onClose={() => setShowNewMessageModal(false)} 
      />
      
      <NewCampaignModal 
        open={showNewCampaignModal} 
        onClose={() => setShowNewCampaignModal(false)}
        onSuccess={handleCampaignSuccess}
      />
      
      <NewContactModal 
        open={showNewContactModal} 
        onClose={() => setShowNewContactModal(false)} 
      />
      
      <MessageFiltersModal 
        open={showMessageFiltersModal} 
        onClose={() => setShowMessageFiltersModal(false)}
        onApplyFilters={handleApplyMessageFilters}
      />
    </div>
  );
}
