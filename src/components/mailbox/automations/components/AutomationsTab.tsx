
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AutomationsList } from './AutomationsList';
import { AutomationForm } from './AutomationForm';
import { AutomationLogs } from './AutomationLogs';
import { Button } from '@/components/ui/button';
import { Plus, List, History, Play } from 'lucide-react';
import { useProcessAutomations } from '../hooks/useAutomations';

export const AutomationsTab = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const processAutomations = useProcessAutomations();

  const handleEdit = (id: string) => {
    setEditingId(id);
    setActiveTab('form');
  };

  const handleNew = () => {
    setEditingId(null);
    setActiveTab('form');
  };

  const handleFormClose = () => {
    setEditingId(null);
    setActiveTab('list');
  };

  const handleProcessNow = () => {
    processAutomations.mutate();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-purple-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-purple-800">
              Automações de Email
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleProcessNow}
                variant="outline"
                size="sm"
                disabled={processAutomations.isPending}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Play className="h-4 w-4 mr-2" />
                {processAutomations.isPending ? 'Processando...' : 'Executar Agora'}
              </Button>
              <Button
                onClick={handleNew}
                size="sm"
                className="bg-primary hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Automação
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-purple-100/50 border border-purple-200/50">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Lista
              </TabsTrigger>
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingId ? 'Editar' : 'Nova'}
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="list" className="m-0">
                <AutomationsList onEdit={handleEdit} />
              </TabsContent>

              <TabsContent value="form" className="m-0">
                <AutomationForm 
                  automationId={editingId}
                  onClose={handleFormClose}
                />
              </TabsContent>

              <TabsContent value="logs" className="m-0">
                <AutomationLogs />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
