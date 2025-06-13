
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaApiManagement } from '@/components/MetaApiManagement';
import { MetricsCustomization } from '@/components/MetricsCustomization';

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-600 mt-2">
          Gerencie as configurações da plataforma e integrações
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api">Gestão da API Meta</TabsTrigger>
          <TabsTrigger value="metrics">Personalização de Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <MetaApiManagement />
        </TabsContent>

        <TabsContent value="metrics">
          <MetricsCustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
