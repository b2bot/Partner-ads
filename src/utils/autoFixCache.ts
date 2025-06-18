
import { cacheManager } from './cacheUtils';

interface AutoFixOptions {
  autoReload?: boolean;
  showNotifications?: boolean;
  debugMode?: boolean;
}

export class AutoCacheFix {
  private static hasRun = false;
  
  public static initialize(options: AutoFixOptions = {}) {
    // Evitar execução múltipla
    if (this.hasRun) return;
    this.hasRun = true;

    const {
      autoReload = false,
      showNotifications = true,
      debugMode = true
    } = options;

    console.log('🚀 AutoCacheFix inicializado');

    // Detectar erros de import automaticamente
    this.detectImportErrors(autoReload, showNotifications, debugMode);
    
    // Verificar cache no carregamento
    this.checkCacheOnLoad(debugMode);
  }

  private static detectImportErrors(
    autoReload: boolean, 
    showNotifications: boolean,
    debugMode: boolean
  ) {
    // Interceptar erros de import
    window.addEventListener('error', (event) => {
      const message = event.message;
      
      if (message.includes('does not provide an export named')) {
        console.error('🚨 Erro de import detectado:', message);
        
        if (debugMode) {
          console.group('🔧 AutoCacheFix - Erro Detectado');
          console.log('Mensagem:', message);
          console.log('Arquivo:', event.filename);
          console.log('Linha:', event.lineno);
          console.groupEnd();
        }

        if (showNotifications) {
          this.showCacheNotification(autoReload);
        }

        if (autoReload) {
          console.log('🔄 Auto-reload ativado, limpando cache...');
          setTimeout(() => {
            cacheManager.forceReload();
          }, 2000);
        }
      }
    });

    // Interceptar erros não capturados
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      
      if (reason && typeof reason === 'string' && reason.includes('import')) {
        console.error('🚨 Promise rejeitada relacionada a import:', reason);
        
        if (showNotifications) {
          this.showCacheNotification(autoReload);
        }
      }
    });
  }

  private static checkCacheOnLoad(debugMode: boolean) {
    // Verificar se há parâmetros de cache na URL
    const urlParams = new URLSearchParams(window.location.search);
    const hasTimestamp = urlParams.has('t');

    if (hasTimestamp && debugMode) {
      console.log('⚠️ Detectado timestamp na URL - possível reload de cache');
    }

    // Executar diagnóstico inicial
    setTimeout(() => {
      const diagnostic = cacheManager.diagnose();
      
      if (debugMode) {
        console.group('📊 Diagnóstico Inicial do Cache');
        console.log(diagnostic);
        console.groupEnd();
      }

      // Se há problemas, mostrar notificação
      if (diagnostic.importIssues.length > 0 || 
          Object.values(diagnostic.cacheStatus).some(status => status)) {
        
        if (debugMode) {
          console.log('⚠️ Problemas de cache detectados no carregamento');
        }
      }
    }, 1000);
  }

  private static showCacheNotification(autoReload: boolean) {
    // Criar notificação visual
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 300px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 16px;">⚠️</span>
        <strong>Problema de Cache Detectado</strong>
      </div>
      <div style="margin-bottom: 12px;">
        Erro de importação de módulo. ${autoReload ? 'Recarregando automaticamente...' : 'Clique para limpar o cache.'}
      </div>
      ${!autoReload ? `
        <button onclick="window.cacheManager?.forceReload?.()" 
                style="background: white; color: #ef4444; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">
          Limpar Cache
        </button>
      ` : ''}
    `;

    document.body.appendChild(notification);

    // Remover notificação após alguns segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, autoReload ? 3000 : 10000);
  }

  public static reset() {
    this.hasRun = false;
  }
}

// Tornar cacheManager disponível globalmente para a notificação
(window as any).cacheManager = cacheManager;

// Exportar função de inicialização simples
export const initAutoFix = (options?: AutoFixOptions) => {
  AutoCacheFix.initialize(options);
};
