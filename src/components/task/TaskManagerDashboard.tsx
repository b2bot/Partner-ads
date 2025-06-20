import { useTasks } from '@/hooks/task/useTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TaskManagerDashboard() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const late = tasks.filter((t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'finalizada').length;
  const awaiting = tasks.filter((t) => t.status === 'aguardando').length;

  const items = [
    { label: 'Total', value: total },
    { label: 'Atrasadas', value: late },
    { label: 'Aguardando', value: awaiting },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <Card key={i.label} className="premium-card text-center">
          <CardHeader>
            <CardTitle className="text-sm">{i.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{i.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
