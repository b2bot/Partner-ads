
import { MetricsCustomization } from '@/components/MetricsCustomization';

export default function ObjetivosMetricasPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Objetivos de Métricas</h1>
        <p className="text-slate-600 mt-2">
          Configure quais métricas da Meta Ads API serão exibidas em cada página do sistema. 
          Escolha entre todas as métricas disponíveis para personalizar completamente sua experiência de análise.
        </p>
      </div>
      
      <MetricsCustomization />
    </div>
  );
}
