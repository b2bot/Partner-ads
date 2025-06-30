
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Settings, Shield, FileText, MessageCircle, BarChart3, Palette, ClipboardList } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
  email?: string;
}

interface ClientPermissionsManagerProps {
  client: Cliente;
  open: boolean;
  onClose: () => void;
}

export function ClientPermissionsManager({ client, open, onClose }: ClientPermissionsManagerProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: modulePermissions = [] } = useQuery({
    queryKey: ['client-module-permissions-admin', client.id],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('client_permissions')
        .select('*')
        .eq('client_id', client.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!client.id && open,
  });

  const { data: reportPermissions = [] } = useQuery({
    queryKey: ['client-report-permissions-admin', client.id],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('client_report_permissions')
        .select('*')
        .eq('client_id', client.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!client.id && open,
  });

  const { data: clientAccounts = [] } = useQuery({
    queryKey: ['client-accounts', client.id],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('contas')
        .select('*')
        .eq('cliente_id', client.id)
        .eq('ativo', true);

      if (error) throw error;
      return data || [];
    },
    enabled: !!client.id && open,
  });

  const updateModulePermission = useMutation({
    mutationFn: async ({ module, enabled }: { module: string; enabled: boolean }) => {
      const { error } = await apiClient
        .from('client_permissions')
        .upsert({
          client_id: client.id,
          module: module as any,
          enabled,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-module-permissions-admin', client.id] });
      toast.success('Permissão atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating module permission:', error);
      toast.error('Erro ao atualizar permissão. Tente novamente.');
    },
  });

  const updateReportPermission = useMutation({
    mutationFn: async ({ reportType, enabled, accountIds }: { reportType: string; enabled: boolean; accountIds?: string[] }) => {
      const { error } = await apiClient
        .from('client_report_permissions')
        .upsert({
          client_id: client.id,
          report_type: reportType as any,
          enabled,
          account_ids: accountIds || [],
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-report-permissions-admin', client.id] });
      toast.success('Permissão de relatório atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating report permission:', error);
      toast.error('Erro ao atualizar permissão de relatório. Tente novamente.');
    },
  });

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, description: 'Acesso ao painel principal' },
    { id: 'chamados', name: 'Chamados', icon: MessageCircle, description: 'Sistema de tickets e suporte' },
    { id: 'criativos', name: 'Criativos', icon: Palette, description: 'Gerenciamento de materiais criativos' },
    { id: 'relatorios', name: 'Relatórios', icon: FileText, description: 'Acesso aos relatórios personalizados' },
    { id: 'tarefas', name: 'Tarefas', icon: ClipboardList, description: 'Módulo de gerenciamento de projetos e tarefas' },
  ];

  const reportTypes = [
    { id: 'campanhas', name: 'Campanhas', description: 'Relatórios de desempenho de campanhas' },
    { id: 'conjuntos_anuncios', name: 'Conjuntos de Anúncios', description: 'Relatórios de conjuntos de anúncios' },
    { id: 'anuncios', name: 'Anúncios', description: 'Relatórios detalhados de anúncios' },
    { id: 'criativos_performance', name: 'Performance de Criativos', description: 'Análise de desempenho dos criativos' },
    { id: 'whatsapp', name: 'WhatsApp', description: 'Relatórios de campanhas do WhatsApp' },
  ];

  const getModulePermission = (moduleId: string) => {
    return modulePermissions.find(p => p.module === moduleId);
  };

  const getReportPermission = (reportType: string) => {
    return reportPermissions.find(p => p.report_type === reportType);
  };

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    updateModulePermission.mutate({ module: moduleId, enabled });
  };

  const handleReportToggle = (reportType: string, enabled: boolean) => {
    const accountIds = clientAccounts.map(account => account.identificador);
    updateReportPermission.mutate({ reportType, enabled, accountIds });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gerenciar Permissões do Cliente
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{client.nome}</span>
            {client.email && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500">{client.email}</span>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Módulos Principais */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Módulos do Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => {
                const permission = getModulePermission(module.id);
                const isEnabled = permission?.enabled ?? (module.id === 'dashboard' || module.id === 'chamados' || module.id === 'criativos');
                
                return (
                  <Card key={module.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <module.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <Label className="text-sm font-medium">{module.name}</Label>
                          <p className="text-xs text-slate-500 mt-1">{module.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                        disabled={updateModulePermission.isPending}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Relatórios */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Relatórios Disponíveis
            </h3>
            <div className="space-y-3">
              {reportTypes.map((reportType) => {
                const permission = getReportPermission(reportType.id);
                const isEnabled = permission?.enabled ?? false;
                
                return (
                  <Card key={reportType.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm font-medium">{reportType.name}</Label>
                          <Badge variant="outline" className="text-xs">
                            {clientAccounts.length} conta(s)
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{reportType.description}</p>
                        {clientAccounts.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {clientAccounts.map((account) => (
                              <Badge key={account.id} variant="secondary" className="text-xs">
                                {account.nome}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => handleReportToggle(reportType.id, checked)}
                        disabled={updateReportPermission.isPending || clientAccounts.length === 0}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
