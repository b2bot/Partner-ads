
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Calendar,
  Mail,
  Users
} from 'lucide-react';
import { useAutomations, useDeleteAutomation, useUpdateAutomation } from '../hooks/useAutomations';
import { parseCronExpression } from '../utils/cronParser';
import { Automation } from '../types/automations';
import { toast } from 'sonner';

interface AutomationsListProps {
  onEdit: (id: string) => void;
}

export const AutomationsList: React.FC<AutomationsListProps> = ({ onEdit }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAutomations(page, 10);
  const deleteAutomation = useDeleteAutomation();
  const updateAutomation = useUpdateAutomation();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja deletar a automação "${name}"?`)) {
      deleteAutomation.mutate(id);
    }
  };

  const handleToggleActive = (automation: Automation) => {
    updateAutomation.mutate({
      id: automation.id,
      active: !automation.active
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Erro ao carregar automações: {error.message}
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className="text-center py-12">
        <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Nenhuma automação encontrada
        </h3>
        <p className="text-gray-500">
          Crie sua primeira automação para enviar emails programados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.data.map((automation) => (
        <Card key={automation.id} className="border-purple-200/50 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {automation.name}
                  </h3>
                  <Badge 
                    variant={automation.active ? "default" : "secondary"}
                    className={automation.active ? "bg-green-100 text-green-800" : ""}
                  >
                    {automation.active ? 'Ativa' : 'Pausada'}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {automation.subject}
                    </span>
                    {automation.schedule_cron && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {parseCronExpression(automation.schedule_cron)}
                      </span>
                    )}
                    {automation.schedule_once && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(automation.schedule_once).toLocaleString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>

                {automation.next_run && (
                  <div className="text-xs text-purple-600">
                    Próxima execução: {new Date(automation.next_run).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleToggleActive(automation)}
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  {automation.active ? (
                    <>
                      <Pause className="h-4 w-4 mr-1" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Ativar
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => onEdit(automation.id)}
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                
                <Button
                  onClick={() => handleDelete(automation.id, automation.name)}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Paginação simples */}
      {data.count > 10 && (
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
            Página {page} de {Math.ceil(data.count / 10)}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(data.count / 10)}
            variant="outline"
            size="sm"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
};
