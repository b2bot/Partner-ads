
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetaApiManagement } from '@/components/MetaApiManagement';
import { DataManagement } from '@/components/DataManagement';
import { CollaboratorsManagement } from '@/components/CollaboratorsManagement';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/hooks/useAuth';

export function SettingsTab() {
  const { hasPermission } = usePermissions();
  const { profile } = useAuth();

  // Verificar se tem acesso a colaboradores
  const canManageCollaborators = hasPermission('manage_collaborators') || profile?.is_root_admin;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">Configurações</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Gerencie as configurações da plataforma e integrações
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="text-xs">
          <TabsTrigger value="api" className="text-xs">Gestão da API Meta</TabsTrigger>
          <TabsTrigger value="data" className="text-xs">Gestão de Dados</TabsTrigger>
          {canManageCollaborators && (
            <TabsTrigger value="collaborators" className="text-xs">Colaboradores</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="api">
          <MetaApiManagement />
        </TabsContent>

        <TabsContent value="data">
          <DataManagement />
        </TabsContent>

        {canManageCollaborators && (
          <TabsContent value="collaborators">
            <CollaboratorsManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
