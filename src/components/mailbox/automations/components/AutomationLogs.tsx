
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, AlertCircle, History } from 'lucide-react';
import { useAutomations, useAutomationLogs } from '../hooks/useAutomations';

export const AutomationLogs: React.FC = () => {
  const [selectedAutomationId, setSelectedAutomationId] = useState<string>('');
  const [page, setPage] = useState(1);
  
  const { data: automations } = useAutomations(1, 100);
  const { data: logs, isLoading } = useAutomationLogs(selectedAutomationId, page, 20);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Parcial</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-600" />
            Histórico de Execuções
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <Select value={selectedAutomationId} onValueChange={setSelectedAutomationId}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Selecione uma automação" />
              </SelectTrigger>
              <SelectContent>
                {automations?.data.map((automation) => (
                  <SelectItem key={automation.id} value={automation.id}>
                    {automation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!selectedAutomationId ? (
            <div className="text-center py-8 text-gray-500">
              Selecione uma automação para ver o histórico de execuções
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : !logs?.data.length ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma execução encontrada para esta automação
            </div>
          ) : (
            <div className="space-y-4">
              {logs.data.map((log) => (
                <Card key={log.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(log.status)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(log.status)}
                            <span className="text-sm text-gray-600">
                              {new Date(log.run_at).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700">
                            <span className="text-green-600 font-medium">
                              {log.emails_sent} enviados
                            </span>
                            {log.emails_failed > 0 && (
                              <span className="text-red-600 font-medium ml-3">
                                {log.emails_failed} falharam
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {log.details && Object.keys(log.details).length > 0 && (
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      )}
                    </div>
                    
                    {log.details && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Paginação */}
              {logs.count > 20 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    Anterior
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Página {page} de {Math.ceil(logs.count / 20)}
                  </span>
                  <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= Math.ceil(logs.count / 20)}
                    variant="outline"
                    size="sm"
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
