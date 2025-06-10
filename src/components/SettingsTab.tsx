
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveMetaCredentials, getMetaCredentials, testMetaConnection, getAdAccounts } from '@/lib/metaApi';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Database, 
  Bell, 
  Shield,
  Save,
  TestTube,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { MetricsCustomization } from './MetricsCustomization';

export function SettingsTab() {
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'conectado' | 'não conectado' | 'testando'>('não conectado');
  const [adAccounts, setAdAccounts] = useState<any[]>([]);
  const [selectedAdAccount, setSelectedAdAccount] = useState('');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    localStorage.setItem('metaAdsSettings', JSON.stringify({
      appId,
      appSecret,
      accessToken,
      notifications,
      autoRefresh,
      selectedAdAccount
    }));

    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso.",
    });
  };

  const handleTestConnection = async () => {
    if (!appId || !appSecret || !accessToken) {
      toast({
        title: 'Dados incompletos',
        description: 'Preencha todos os campos antes de testar a conexão.',
        variant: 'destructive',
      });
      return;
    }

    setConnectionStatus('testando');
    
    try {
      // Test connection first
      const isValid = await testMetaConnection(accessToken);
      
      if (!isValid) {
        throw new Error('Access Token inválido');
      }

      // Save credentials
      await saveMetaCredentials(appId, appSecret, accessToken);
      
      // Get ad accounts
      const accounts = await getAdAccounts(accessToken);
      setAdAccounts(accounts);
      
      if (accounts.length > 0 && !selectedAdAccount) {
        setSelectedAdAccount(accounts[0].id);
      }

      setConnectionStatus('conectado');
      toast({
        title: 'Conexão bem-sucedida!',
        description: `Conectado com sucesso. ${accounts.length} conta(s) de anúncio encontrada(s).`,
      });
    } catch (err: any) {
      setConnectionStatus('não conectado');
      toast({
        title: 'Erro na conexão',
        description: err.message || 'Verifique seus dados e tente novamente.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const fetchCreds = async () => {
      try {
        const creds = await getMetaCredentials();
        if (creds) {
          setAppId(creds.app_id);
          setAppSecret(creds.app_secret);
          setAccessToken(creds.access_token);
          
          // Test existing connection
          const isValid = await testMetaConnection(creds.access_token);
          if (isValid) {
            setConnectionStatus('conectado');
            const accounts = await getAdAccounts(creds.access_token);
            setAdAccounts(accounts);
          } else {
            setConnectionStatus('não conectado');
          }
        }
      } catch {
        setConnectionStatus('não conectado');
      }
    };

    fetchCreds();

    // Load local settings
    const saved = localStorage.getItem('metaAdsSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setNotifications(settings.notifications ?? true);
      setAutoRefresh(settings.autoRefresh ?? true);
      if (settings.selectedAdAccount) {
        setSelectedAdAccount(settings.selectedAdAccount);
      }
    }
  }, []);

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'conectado':
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Conectado
          </Badge>
        );
      case 'testando':
        return (
          <Badge variant="secondary">
            <TestTube className="w-3 h-3 mr-1" />
            Testando...
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 mr-1" />
            Não conectado
          </Badge>
        );
    }
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
                  1. Acesse <strong>developers.facebook.com</strong><br/>
                  2. Crie um app e vá em <strong>Configurações Básicas</strong><br/>
                  3. Copie o <strong>ID do App</strong> e <strong>Chave Secreta</strong><br/>
                  4. Em <strong>Ferramentas</strong> → <strong>Explorador da API</strong>, gere um token de acesso
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
            <Label htmlFor="accessToken">Access Token</Label>
            <Textarea
              id="accessToken"
              placeholder="Cole aqui seu Access Token da Meta API..."
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-slate-500">
              Este token será usado para acessar suas contas de anúncios. Mantenha-o seguro.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={handleTestConnection} 
              variant="outline"
              disabled={connectionStatus === 'testando'}
            >
              <TestTube className="w-4 h-4 mr-2" />
              {connectionStatus === 'testando' ? 'Testando...' : 'Testar Conexão'}
            </Button>
            {getStatusBadge()}
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
            {adAccounts.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Conta Padrão</Label>
                  <Select value={selectedAdAccount} onValueChange={setSelectedAdAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma conta de anúncios" />
                    </SelectTrigger>
                    <SelectContent>
                      {adAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <p className="text-sm text-slate-600 font-medium">
                    {adAccounts.length} conta(s) de anúncios conectada(s):
                  </p>
                  {adAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium text-green-800">{account.name}</p>
                        <p className="text-xs text-green-600">{account.id}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ativa
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : connectionStatus === 'conectado' ? (
              <div className="border-2 border-dashed border-yellow-200 rounded-lg p-6 text-center bg-yellow-50">
                <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-yellow-700 font-medium">Nenhuma conta de anúncios encontrada</p>
                <p className="text-xs text-yellow-600">Verifique as permissões do seu Access Token</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500">Nenhuma conta conectada</p>
                <p className="text-xs text-slate-400">Configure sua API primeiro</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personalização de Métricas */}
      <MetricsCustomization />

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
