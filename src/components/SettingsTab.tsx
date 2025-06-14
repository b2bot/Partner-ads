
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaApiManagement } from '@/components/MetaApiManagement';
import { DataManagement } from '@/components/DataManagement';

export function SettingsTab() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Configurações</h1>
        <p className="text-xs text-slate-600 mt-1">
          Gerencie as configurações da plataforma e integrações
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="text-xs">
          <TabsTrigger value="api" className="text-xs">Gestão da API Meta</TabsTrigger>
          <TabsTrigger value="data" className="text-xs">Gestão de Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <MetaApiManagement />
        </TabsContent>

        <TabsContent value="data">
          <DataManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
