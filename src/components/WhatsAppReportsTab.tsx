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
  Settings
} from 'lucide-react';
import { WhatsAppConnectionCard } from './whatsapp/WhatsAppConnectionCard';
import { WhatsAppDashboard } from './whatsapp/WhatsAppDashboard';
import { CampaignList } from './whatsapp/CampaignList';

export function WhatsAppReportsTab() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Relatório Semanal Cliente X',
      clientName: 'João Silva',
      phone: '+55 (11) 99999-9999',
      frequency: 'Semanal',
      day: 'Segunda-feira',
      time: '09:00',
      active: true,
      metaAccount: 'Meta Ads - Buscar Campos da Conta'
    }
  ]);
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);

  const handleNewCampaign = () => {
    console.log('Nova campanha');
    // Implementar modal de nova campanha
  };

  const handleNewMessage = () => {
    console.log('Nova mensagem');
    // Implementar modal de nova mensagem
  };

  const handleConnectWhatsApp = () => {
    // Simulação de conexão
    setIsWhatsAppConnected(true);
    toast({
      title: "WhatsApp conectado",
      description: "Conexão estabelecida com sucesso.",
    });
  };

  const NewReportDialog = () => {
    const [newReport, setNewReport] = useState({
      name: '',
      clientName: '',
      phone: '',
      frequency: 'Semanal',
      day: 'Segunda-feira',
      time: '09:00',
      period: '7',
      template: 'Olá {{client_name}}!\n\nSegue o relatório das suas campanhas do período {{date_range}}:\n\n{{metrics_data}}\n\nQualquer dúvida, estou à disposição!'
    });

    return (
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Novo Relatório Automatizado</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-full max-h-[calc(90vh-120px)] px-6 pb-6">
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-700">
                      WhatsApp não está conectado. O relatório será salvo, mas só será enviado quando o WhatsApp estiver conectado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Nome do Relatório *</Label>
                  <Input
                    id="reportName"
                    placeholder="Ex: Relatório Semanal Cliente X"
                    value={newReport.name}
                    onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome do Cliente</Label>
                  <Input
                    id="clientName"
                    placeholder="Ex: João Silva"
                    value={newReport.clientName}
                    onChange={(e) => setNewReport({...newReport, clientName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">Número do WhatsApp *</Label>
                <Input
                  id="whatsappNumber"
                  placeholder="Ex: +55 (11) 99999-9999"
                  value={newReport.phone}
                  onChange={(e) => setNewReport({...newReport, phone: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sendToGroup" />
                  <Label htmlFor="sendToGroup" className="text-sm">Ou enviar para um grupo</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Conta Meta Ads *</Label>
                <Select defaultValue="meta">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meta">Meta Ads - Buscar Campos da Conta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Select value={newReport.frequency} onValueChange={(value) => setNewReport({...newReport, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Semanal">Semanal</SelectItem>
                      <SelectItem value="Mensal">Mensal</SelectItem>
                      <SelectItem value="Diário">Diário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dia da Semana</Label>
                  <Select value={newReport.day} onValueChange={(value) => setNewReport({...newReport, day: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Segunda-feira">Segunda-feira</SelectItem>
                      <SelectItem value="Terça-feira">Terça-feira</SelectItem>
                      <SelectItem value="Quarta-feira">Quarta-feira</SelectItem>
                      <SelectItem value="Quinta-feira">Quinta-feira</SelectItem>
                      <SelectItem value="Sexta-feira">Sexta-feira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Horário do Envio</Label>
                  <Input
                    type="time"
                    value={newReport.time}
                    onChange={(e) => setNewReport({...newReport, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Período dos Dados (dias)</Label>
                <Select value={newReport.period} onValueChange={(value) => setNewReport({...newReport, period: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Template da Mensagem</Label>
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={newReport.template}
                  onChange={(e) => setNewReport({...newReport, template: e.target.value})}
                  rows={5}
                />
                <div className="text-xs text-slate-500">
                  Use: {'{{client_name}}'}, {'{{date_range}}'}, {'{{metrics_data}}'}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Campos Disponíveis nas Contas Selecionadas</h4>
                <div className="text-sm text-blue-700">
                  <p><strong>Como usar:</strong></p>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>As "Métricas Principais" e "Outras métricas" serão sempre disponíveis</li>
                    <li>Meta Ads: Chegar em "Meta Ads - Buscar Campos da Conta" para ter métricas específicas da conta Google Ads</li>
                    <li><strong>Anúncios - Quantidade:</strong> Exibir número de anúncios que a ação foi realizada</li>
                    <li><strong>Valores Monetários:</strong> Exibir em valor local (moeda) (ex: valor total de conversas)</li>
                    <li><strong>Os dados do Google Ads não estarão disponíveis</strong></li>
                    <li>Use o ícone para filtrar campos disponíveis</li>
                    <li><strong>Os dados da conta Meta não estão baseados nos últimos 7 dias de campanhas ativas</strong></li>
                    <li>Os dados do Google Ads não estarão baseados nos últimos 7 dias de campanhas ativas</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    setReports([...reports, {
                      id: reports.length + 1,
                      name: newReport.name,
                      clientName: newReport.clientName,
                      phone: newReport.phone,
                      frequency: newReport.frequency,
                      day: newReport.day,
                      time: newReport.time,
                      active: true,
                      metaAccount: 'Meta Ads - Buscar Campos da Conta'
                    }]);
                    setShowNewReportDialog(false);
                    toast({
                      title: "Relatório criado",
                      description: "Relatório automatizado criado com sucesso.",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Criar Relatório
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
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
          <CampaignList onNewCampaign={handleNewCampaign} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Histórico de Mensagens</CardTitle>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-600 mb-2">Nenhuma mensagem enviada</h3>
                <p className="text-sm text-gray-500">
                  As mensagens enviadas aparecerão aqui
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Contatos</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Contato
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-600 mb-2">Nenhum contato cadastrado</h3>
                <p className="text-sm text-gray-500">
                  Adicione contatos para enviar mensagens
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewReportDialog />
    </div>
  );
}
