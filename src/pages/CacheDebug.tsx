
import { CacheDebugPanel } from '@/components/CacheDebugPanel';

export default function CacheDebug() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cache Debug</h1>
        <p className="text-gray-600">
          Ferramenta para diagnosticar e resolver problemas de cache do Vite
        </p>
      </div>
      
      <CacheDebugPanel />
    </div>
  );
}
