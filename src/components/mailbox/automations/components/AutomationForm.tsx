
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Save, X, Calendar, Repeat, Mail } from 'lucide-react';
import { useAutomation, useCreateAutomation, useUpdateAutomation } from '../hooks/useAutomations';
import { parseCronExpression } from '../utils/cronParser';
import { validateEmailList } from '../utils/recipientsFilter';

interface AutomationFormProps {
  automationId?: string | null;
  onClose: () => void;
}

export const AutomationForm: React.FC<AutomationFormProps> = ({ 
  automationId, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    schedule_type: 'cron', // 'cron' ou 'once'
    schedule_cron: '0 9 * * *', // Diário às 9h
    schedule_once: '',
    recipients_type: 'custom',
    recipients_emails: '',
    active: true
  });

  const { data: automation } = useAutomation(automationId || '');
  const createAutomation = useCreateAutomation();
  const updateAutomation = useUpdateAutomation();

  useEffect(() => {
    if (automation) {
      setFormData({
        name: automation.name,
        subject: automation.subject,
        body: automation.body || '',
        schedule_type: automation.schedule_cron ? 'cron' : 'once',
        schedule_cron: automation.schedule_cron || '0 9 * * *',
        schedule_once: automation.schedule_once || '',
        recipients_type: 'custom',
        recipients_emails: Array.isArray(automation.recipients_filter?.emails) 
          ? automation.recipients_filter.emails.join('\n')
          : '',
        active: automation.active
      });
    }
  }, [automation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar emails
    const emailList = formData.recipients_emails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email);

    const { valid, invalid } = validateEmailList(emailList);
    
    if (invalid.length > 0) {
      alert(`Emails inválidos encontrados:\n${invalid.join('\n')}`);
      return;
    }

    const automationData = {
      name: formData.name,
      subject: formData.subject,
      body: formData.body,
      recipients_filter: {
        type: formData.recipients_type,
        emails: valid
      },
      schedule_cron: formData.schedule_type === 'cron' ? formData.schedule_cron : undefined,
      schedule_once: formData.schedule_type === 'once' ? formData.schedule_once : undefined,
      active: formData.active
    };

    if (automationId) {
      updateAutomation.mutate(
        { id: automationId, ...automationData },
        { onSuccess: onClose }
      );
    } else {
      createAutomation.mutate(
        automationData,
        { onSuccess: onClose }
      );
    }
  };

  const cronPresets = [
    { label: 'A cada hora', value: '0 * * * *' },
    { label: 'Diário às 9h', value: '0 9 * * *' },
    { label: 'Diário às 18h', value: '0 18 * * *' },
    { label: 'Segunda às 9h', value: '0 9 * * 1' },
    { label: 'Semanal (domingo)', value: '0 9 * * 0' },
    { label: 'Mensal (dia 1)', value: '0 9 1 * *' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-purple-200/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-purple-800">
              {automationId ? 'Editar Automação' : 'Nova Automação'}
            </span>
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Automação</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Newsletter Semanal"
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Assunto do Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ex: Newsletter da Semana"
                required
              />
            </div>
          </div>

          {/* Corpo do Email */}
          <div>
            <Label htmlFor="body">Conteúdo do Email</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Digite o conteúdo do seu email..."
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Suporte a HTML básico
            </p>
          </div>

          {/* Agendamento */}
          <div>
            <Label className="text-base font-medium flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4" />
              Agendamento
            </Label>
            
            <Tabs 
              value={formData.schedule_type} 
              onValueChange={(value) => setFormData({ ...formData, schedule_type: value })}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cron" className="flex items-center gap-2">
                  <Repeat className="h-4 w-4" />
                  Recorrente
                </TabsTrigger>
                <TabsTrigger value="once" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Uma vez
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cron" className="space-y-4">
                <div>
                  <Label>Presets Rápidos</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cronPresets.map((preset) => (
                      <Button
                        key={preset.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, schedule_cron: preset.value })}
                        className={formData.schedule_cron === preset.value ? 'bg-purple-100 border-purple-300' : ''}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="schedule_cron">Expressão Cron</Label>
                  <Input
                    id="schedule_cron"
                    value={formData.schedule_cron}
                    onChange={(e) => setFormData({ ...formData, schedule_cron: e.target.value })}
                    placeholder="0 9 * * *"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {parseCronExpression(formData.schedule_cron)}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="once">
                <div>
                  <Label htmlFor="schedule_once">Data e Hora</Label>
                  <Input
                    id="schedule_once"
                    type="datetime-local"
                    value={formData.schedule_once}
                    onChange={(e) => setFormData({ ...formData, schedule_once: e.target.value })}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Destinatários */}
          <div>
            <Label className="text-base font-medium flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4" />
              Destinatários
            </Label>
            
            <div>
              <Label htmlFor="recipients_emails">Lista de Emails (um por linha)</Label>
              <Textarea
                id="recipients_emails"
                value={formData.recipients_emails}
                onChange={(e) => setFormData({ ...formData, recipients_emails: e.target.value })}
                placeholder="usuario1@exemplo.com&#10;usuario2@exemplo.com&#10;usuario3@exemplo.com"
                rows={6}
                className="resize-none font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Digite um email por linha
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant={formData.active ? "default" : "secondary"}>
                {formData.active ? 'Ativa' : 'Pausada'}
              </Badge>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, active: !formData.active })}
              >
                {formData.active ? 'Pausar' : 'Ativar'}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createAutomation.isPending || updateAutomation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {createAutomation.isPending || updateAutomation.isPending 
                  ? 'Salvando...' 
                  : 'Salvar Automação'
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
