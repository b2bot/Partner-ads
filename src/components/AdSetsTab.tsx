
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdSetsTabProps {
  viewMode: 'table' | 'cards';
}

export function AdSetsTab({ viewMode }: AdSetsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Conjuntos de Anúncios</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Novo Conjunto de Anúncios
        </Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            Conjuntos de Anúncios
          </h3>
          <p className="text-slate-500 mb-4">
            Esta funcionalidade será implementada em breve. Aqui você poderá gerenciar todos os seus conjuntos de anúncios.
          </p>
          <Badge variant="outline">Em desenvolvimento</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
