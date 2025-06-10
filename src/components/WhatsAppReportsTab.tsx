
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Smartphone,
  Plus,
  Settings,
  Clock,
  MessageSquare,
  QrCode,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
const client_name = 'João da Silva';
const date_range = '01/06/2024 - 10/06/2024';
const metrics_data = [];

export function WhatsAppReportsTab() {
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
  const { toast } = useToast();

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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Relatório Automatizado</DialogTitle>
          </DialogHeader>
          
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
                Use: {{client_name}}, {{date_range}}, {{metrics_data}}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Campos Disponíveis nas Contas Selecionadas</h4>
              <div className="text-sm text-blue-700">
                <p><strong>Como usar:</strong></p>
                <ul className="list-disc ml-4 mt-1">
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

            <div className="flex justify-end gap-2">
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
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Relatórios via WhatsApp</h2>
        <p className="text-slate-600">Conecte seu WhatsApp e envie relatórios automaticamente para seus clientes</p>
      </div>

      {/* Conexão WhatsApp */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-green-600" />
            <CardTitle>Conexão WhatsApp</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                Conecte seu WhatsApp para começar a enviar relatórios automaticamente para seus clientes
              </div>
            </div>

            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">WhatsApp Desconectado</h3>
                  <p className="text-sm text-slate-500">
                    Conecte seu WhatsApp para começar a enviar relatórios automaticamente para seus clientes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">Conexão segura e criptografada</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleConnectWhatsApp}
                className="bg-green-600 hover:bg-green-700"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Conectar WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Automatizados */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle>Relatórios Automatizados</CardTitle>
            </div>
            <Button 
              onClick={() => setShowNewReportDialog(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-slate-600">
              Configure relatórios que são enviados automaticamente via WhatsApp
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium">{report.name}</h3>
                      <Badge variant={report.active ? "default" : "secondary"}>
                        {report.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={report.active} />
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Cliente:</span>
                      <div className="font-medium">{report.clientName}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">WhatsApp:</span>
                      <div className="font-medium">{report.phone}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Frequência:</span>
                      <div className="font-medium">{report.frequency}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Próximo envio:</span>
                      <div className="font-medium">{report.day} - {report.time}</div>
                    </div>
                  </div>
                </div>
              ))}

              {reports.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-medium text-slate-600 mb-2">Nenhum relatório configurado</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Configure relatórios que são enviados automaticamente via WhatsApp
                  </p>
                  <Button 
                    onClick={() => setShowNewReportDialog(true)}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Relatório
                  </Button>
                </div>
              )}
            </div>

            {!isWhatsAppConnected && reports.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-700">
                      WhatsApp não está conectado. Os relatórios podem ser configurados, mas só serão enviados quando o WhatsApp estiver conectado.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <NewReportDialog />
    </div>
  );
}
