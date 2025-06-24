
import { useWorkflowTemplates } from '@/hooks/Tarefas/useWorkflowTemplates';
import { TemplateModal } from './TemplateModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Workflow, Plus, Play, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { WorkflowTemplate } from '@/types/task';

export const WorkflowsView = () => {
  const { data: templates, isLoading } = useWorkflowTemplates();
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando templates...</span>
      </div>
    );
  }

  const handleUseTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setTemplateModalOpen(true);
  };

  const getTemplateIcon = (category?: string) => {
    // Retorna ícone baseado na categoria
    return <Workflow className="h-8 w-8 text-blue-600" />;
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'marketing': return 'bg-purple-100 text-purple-800';
      case 'desenvolvimento': return 'bg-green-100 text-green-800';
      case 'design': return 'bg-pink-100 text-pink-800';
      case 'vendas': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/*<div>
          <h2 className="text-2xl font-bold">Fluxos de Trabalho</h2>
          <p className="text-gray-600">
            Templates prontos para acelerar seu trabalho ({templates?.length || 0} disponíveis)
          </p>
        </div>*/}
        
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Criar Template
        </Button>
      </div>

      {/* Grid de Templates */}
      {templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const steps = (template.steps as any[]) || [];
            
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTemplateIcon(template.category)}
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.category && (
                          <Badge className={getCategoryColor(template.category)} variant="secondary">
                            {template.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {template.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                      {template.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Informações do template */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{steps.length} etapas</span>
                    {template.is_public && (
                      <Badge variant="outline">Público</Badge>
                    )}
                  </div>

                  {/* Preview das primeiras etapas */}
                  {steps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Primeiras etapas:</h4>
                      <div className="space-y-1">
                        {steps.slice(0, 3).map((step, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {step.title}
                          </div>
                        ))}
                        {steps.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{steps.length - 3} etapas adicionais
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Usar Template
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum template encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Crie templates personalizados para acelerar fluxos de trabalho recorrentes
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Template
          </Button>
        </div>
      )}

      {/* Modal de Template */}
      <TemplateModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        template={selectedTemplate}
      />
    </div>
  );
};
