
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Database, 
  Bell, 
  Shield,
  Save,
  TestTube,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SettingsTab() {
  const [apiKey, setApiKey] = useState('');
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Aqui você salvaria as configurações no localStorage ou backend
    localStorage.setItem('metaAdsSettings', JSON.stringify({
      apiKey,
      appId,
      appSecret,
      notifications,
      autoRefresh
    }));

    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso.",
    });
  };

  const handleTestConnection = () => {
    // Aqui você testaria a conexão com a API da Meta
    toast({
      title: "Testando conexão...",
      description: "Verificando suas credenciais da API da Meta.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Configurações</h2>
        <p className="text-slate-600">Configure sua integração com a API da Meta e personalize a plataforma.</p>
      </div>

      {/* Configurações da API */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600" />
            <CardTitle>Credenciais da API Meta</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Como obter suas credenciais</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Acesse o <strong>Meta for Developers</strong>, crie um app, e copie o App ID, App Secret e gere um Access Token.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appId">App ID</Label>
              <Input
                id="appId"
                type="text"
                placeholder="123456789012345"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appSecret">App Secret</Label>
              <Input
                id="appSecret"
                type="password"
                placeholder="••••••••••••••••"
                value={appSecret}
                onChange={(e) => setAppSecret(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Access Token</Label>
            <Textarea
              id="apiKey"
              placeholder="Cole aqui seu Access Token da Meta API..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-slate-500">
              Este token será usado para acessar suas contas de anúncios. Mantenha-o seguro.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleTestConnection} variant="outline">
              <TestTube className="w-4 h-4 mr-2" />
              Testar Conexão
            </Button>
            <Badge variant="secondary">Status: Não conectado</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Conta */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <CardTitle>Contas de Anúncios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Após conectar sua API, suas contas de anúncios aparecerão aqui.
            </p>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
              <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">Nenhuma conta conectada</p>
              <p className="text-xs text-slate-400">Configure sua API key primeiro</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferências */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <CardTitle>Preferências</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações</Label>
              <p className="text-sm text-slate-500">
                Receber alertas sobre performance das campanhas
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Atualização Automática</Label>
              <p className="text-sm text-slate-500">
                Atualizar dados a cada 5 minutos
              </p>
            </div>
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
