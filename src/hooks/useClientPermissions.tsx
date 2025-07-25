import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { User } from '@apiClient/apiClient-js';

export type ClientModule = 'dashboard' | 'chamados' | 'relatorios' | 'criativos';
export type ReportType = 'campanhas' | 'conjuntos_anuncios' | 'anuncios' | 'criativos_performance' | 'whatsapp';

export interface ClientPermission {
  id: string;
  client_id: string;
  module: ClientModule;
  enabled: boolean;
}

export interface ClientReportPermission {
  id: string;
  client_id: string;
  report_type: ReportType;
  enabled: boolean;
  account_ids: string[];
}

export function useClientPermissions(user: User | null, isCliente: boolean) {
  const { data: modulePermissions = [], isLoading: moduleLoading } = useQuery({
    queryKey: ['client-module-permissions', user?.id],
    queryFn: async () => {
      if (!user?.id || !isCliente) return [];

      const data = await apiClient.get<ClientPermission[]>(
        `/api/client_permissions.php?user_id=${user.id}`
      );
      return data || [];
    },
    enabled: !!user?.id && isCliente,
  });

  const { data: reportPermissions = [], isLoading: reportLoading } = useQuery({
    queryKey: ['client-report-permissions', user?.id],
    queryFn: async () => {
      if (!user?.id || !isCliente) return [];

      const data = await apiClient.get<ClientReportPermission[]>(
        `/api/client_report_permissions.php?user_id=${user.id}`
      );
      return data || [];
    },
    enabled: !!user?.id && isCliente,
  });

  const hasModulePermission = (module: ClientModule): boolean => {
    return modulePermissions.some(p => p.module === module && p.enabled);
  };

  const hasReportPermission = (reportType: ReportType): boolean => {
    return reportPermissions.some(p => p.report_type === reportType && p.enabled);
  };

  const getReportAccountIds = (reportType: ReportType): string[] => {
    const permission = reportPermissions.find(p => p.report_type === reportType && p.enabled);
    return permission?.account_ids || [];
  };

  return {
    modulePermissions,
    reportPermissions,
    hasModulePermission,
    hasReportPermission,
    getReportAccountIds,
    loading: moduleLoading || reportLoading,
  };
}
