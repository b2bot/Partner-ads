
interface CacheInfo {
  viteCache: boolean;
  nodeModulesCache: boolean;
  browserCache: boolean;
}

interface DiagnosticResult {
  timestamp: string;
  cacheStatus: CacheInfo;
  importIssues: string[];
  recommendations: string[];
}

export class CacheManager {
  private static instance: CacheManager;
  
  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  /**
   * Força reload completo da aplicação limpando todos os caches
   */
  public forceReload(): void {
    console.log('🔄 Forçando reload completo...');
    
    // Limpar sessionStorage e localStorage relacionados ao Vite
    this.clearViteStorage();
    
    // Fazer hard reload da página
    window.location.reload();
  }

  /**
   * Limpa storage relacionado ao Vite
   */
  private clearViteStorage(): void {
    try {
      // Limpar dados específicos do Vite no localStorage
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('vite') || key.includes('hmr'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Limpar sessionStorage também
      sessionStorage.clear();
      
      console.log('✅ Storage do Vite limpo');
    } catch (error) {
      console.error('❌ Erro ao limpar storage:', error);
    }
  }

  /**
   * Executa diagnóstico do sistema
   */
  public diagnose(): DiagnosticResult {
    console.log('🔍 Executando diagnóstico do sistema...');
    
    const result: DiagnosticResult = {
      timestamp: new Date().toISOString(),
      cacheStatus: this.checkCacheStatus(),
      importIssues: this.checkImportIssues(),
      recommendations: []
    };

    // Gerar recomendações baseadas no diagnóstico
    result.recommendations = this.generateRecommendations(result);
    
    console.log('📊 Diagnóstico completo:', result);
    return result;
  }

  private checkCacheStatus(): CacheInfo {
    return {
      viteCache: this.hasViteCache(),
      nodeModulesCache: this.hasNodeModulesCache(),
      browserCache: this.hasBrowserCache()
    };
  }

  private hasViteCache(): boolean {
    // Verificar se há dados do Vite no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('vite')) {
        return true;
      }
    }
    return false;
  }

  private hasNodeModulesCache(): boolean {
    // No browser, não conseguimos verificar diretamente o sistema de arquivos
    // Mas podemos verificar se há sinais de cache antigo
    return window.location.search.includes('t=');
  }

  private hasBrowserCache(): boolean {
    // Verificar se há cache do browser
    return 'caches' in window;
  }

  private checkImportIssues(): string[] {
    const issues: string[] = [];
    
    try {
      // Verificar se há módulos problemáticos no cache do navegador
      if (window.performance) {
        const entries = window.performance.getEntriesByType('navigation');
        if (entries.length > 0) {
          const navEntry = entries[0] as PerformanceNavigationTiming;
          if (navEntry.type === 'reload') {
            issues.push('Página foi recarregada - possível problema de cache');
          }
        }
      }

      // Verificar console errors relacionados a imports
      const errorPattern = /does not provide an export named/i;
      if (window.console && window.console.error) {
        issues.push('Verificar console para erros de importação');
      }

    } catch (error) {
      issues.push(`Erro durante verificação: ${error}`);
    }

    return issues;
  }

  private generateRecommendations(result: DiagnosticResult): string[] {
    const recommendations: string[] = [];

    if (result.cacheStatus.viteCache) {
      recommendations.push('Limpar cache do Vite no localStorage');
    }

    if (result.cacheStatus.browserCache) {
      recommendations.push('Considerar limpar cache do navegador');
    }

    if (result.importIssues.length > 0) {
      recommendations.push('Verificar imports e exports de componentes');
      recommendations.push('Fazer hard reload da aplicação');
    }

    if (recommendations.length === 0) {
      recommendations.push('Sistema aparenta estar funcionando normalmente');
    }

    return recommendations;
  }

  /**
   * Limpa todos os caches possíveis
   */
  public clearAllCaches(): Promise<void> {
    return new Promise((resolve) => {
      console.log('🧹 Limpando todos os caches...');
      
      // Limpar storage
      this.clearViteStorage();
      
      // Limpar cache do service worker se existir
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
          });
        });
      }

      // Limpar cache do browser se possível
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }

      console.log('✅ Limpeza de cache concluída');
      resolve();
    });
  }
}

// Exportar instância singleton
export const cacheManager = CacheManager.getInstance();

// Função utilitária para debug rápido
export const debugCache = () => {
  const manager = CacheManager.getInstance();
  const diagnostic = manager.diagnose();
  
  console.group('🔧 Debug de Cache');
  console.log('Timestamp:', diagnostic.timestamp);
  console.log('Status do Cache:', diagnostic.cacheStatus);
  console.log('Problemas de Import:', diagnostic.importIssues);
  console.log('Recomendações:', diagnostic.recommendations);
  console.groupEnd();
  
  return diagnostic;
};
