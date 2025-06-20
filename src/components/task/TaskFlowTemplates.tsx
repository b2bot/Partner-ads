import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const templates = [
  { id: 'onboarding', name: 'Fluxo de Onboarding', steps: 5 },
  { id: 'seo', name: 'SEO Básico', steps: 8 },
  { id: 'ads', name: 'Tráfego Pago', steps: 6 },
  { id: 'dev', name: 'Deploy de App', steps: 7 },
];

export function TaskFlowTemplates() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((flow) => (
        <Card key={flow.id} className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg">{flow.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{flow.steps} etapas</span>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Usar Fluxo
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
