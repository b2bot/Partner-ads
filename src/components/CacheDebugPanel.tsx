
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCw, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Zap
} from 'lucide-react';
import { cacheManager, debugCache } from '@/utils/cacheUtils';

interface DiagnosticResult {
  timestamp: string;
  cacheStatus: {
    viteCache: boolean;
    nodeModulesCache: boolean;
    browserCache: boolean;
  };
  importIssues: string[];
  recommendations: string[];
}

export function CacheDebugPanel() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const handleDiagnose = () => {
    const result = cacheManager.diagnose();
    setDiagnostic(result);
    setLastAction('Diagnóstico executado');
    console.log('🔍 Diagnóstico completo:', result);
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    setLastAction('Limpando cache...');
    
    try {
      await cacheManager.clearAllCaches();
      setLastAction('Cache limpo com sucesso');
      
      // Re-executar diagnóstico após limpeza
      setTimeout(() => {
        handleDiagnose();
      }, 1000);
      
    } catch (error) {
      setLastAction(`Erro ao limpar cache: ${error}`);
    } finally {
      setIsClearing(false);
    }
  };

  const handleForceReload = () => {
    setLastAction('Forçando reload...');
    cacheManager.forceReload();
  };

  const handleDebugConsole = () => {
    const result = debugCache();
    setDiagnostic(result);
    setLastAction('Debug enviado para console');
  };

  const getStatusBadge = (status: boolean, label: string) => (
    <Badge variant={status ? "destructive" : "default"} className="gap-1">
      {status ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
      {label}: {status ? 'Detectado' : 'Limpo'}
    </Badge>
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Cache Debug Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ações principais */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDiagnose} variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            Diagnosticar
          </Button>
          
          <Button 
            onClick={handleClearCache} 
            variant="outline" 
            disabled={isClearing}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isClearing ? 'Limpando...' : 'Limpar Cache'}
          </Button>
          
          <Button onClick={handleForceReload} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Force Reload
          </Button>
          
          <Button onClick={handleDebugConsole} variant="outline" className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            Debug Console
          </Button>
        </div>

        {/* Última ação */}
        {lastAction && (
          <Alert>
            <AlertDescription>
              <strong>Última ação:</strong> {lastAction}
            </AlertDescription>
          </Alert>
        )}

        {/* Resultados do diagnóstico */}
        {diagnostic && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resultado do Diagnóstico</h3>
            
            {/* Status do Cache */}
            <div>
              <h4 className="font-medium mb-2">Status do Cache</h4>
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(diagnostic.cacheStatus.viteCache, 'Vite Cache')}
                {getStatusBadge(diagnostic.cacheStatus.nodeModulesCache, 'Node Modules')}
                {getStatusBadge(diagnostic.cacheStatus.browserCache, 'Browser Cache')}
              </div>
            </div>

            {/* Problemas de Import */}
            {diagnostic.importIssues.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Problemas Detectados</h4>
                <ul className="space-y-1">
                  {diagnostic.importIssues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recomendações */}
            <div>
              <h4 className="font-medium mb-2">Recomendações</h4>
              <ul className="space-y-1">
                {diagnostic.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-600 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-gray-500">
              Diagnóstico executado em: {new Date(diagnostic.timestamp).toLocaleString()}
            </div>
          </div>
        )}

        {/* Instruções */}
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            <strong>Como usar:</strong>
            <br />• <strong>Diagnosticar:</strong> Verifica o estado atual dos caches
            <br />• <strong>Limpar Cache:</strong> Remove todos os caches do navegador
            <br />• <strong>Force Reload:</strong> Recarrega a página forçando limpeza do cache
            <br />• <strong>Debug Console:</strong> Envia informações detalhadas para o console do navegador
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
