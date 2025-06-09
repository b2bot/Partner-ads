
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdsTabProps {
  viewMode: 'table' | 'cards';
}

export function AdsTab({ viewMode }: AdsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Anúncios</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Novo Anúncio
        </Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            Gerenciamento de Anúncios
          </h3>
          <p className="text-slate-500 mb-4">
            Esta funcionalidade será implementada em breve. Aqui você poderá criar, editar e gerenciar todos os seus anúncios.
          </p>
          <Badge variant="outline">Em desenvolvimento</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
