
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaApiSettings } from './MetaApiSettings';
import { MetricsCustomization } from './MetricsCustomization';
import { ApiMonitoring } from './ApiMonitoring';

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie suas configurações e integrações
        </p>
      </div>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">API Meta</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api" className="space-y-4">
          <MetaApiSettings />
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4">
          <MetricsCustomization />
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-4">
          <ApiMonitoring />
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Configurações Gerais
            </h3>
            <p className="text-slate-500">
              Configurações adicionais serão implementadas em breve
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
