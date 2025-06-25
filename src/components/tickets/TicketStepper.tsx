import { CheckCircle, Clock, AlertCircle, Eye, Play } from 'lucide-react';

interface TicketStepperProps {
  status: 'novo' | 'aguardando_equipe' | 'aguardando_cliente' | 'em_analise' | 'em_andamento' | 'resolvido';
  categoria?: string;
  className?: string;
}

export function TicketStepper({ status, categoria, className }: TicketStepperProps) {
  const steps = [
    { id: 'novo', label: 'Novo', icon: AlertCircle },
    { id: 'aguardando_equipe', label: 'Aguardando Equipe', icon: Clock },
    { id: 'em_analise', label: 'Em Análise', icon: Eye },
    { id: 'em_andamento', label: 'Em Andamento', icon: Play },
    { id: 'resolvido', label: 'Resolvido', icon: CheckCircle }
  ];

  const getCurrentStep = () => {
    switch (status) {
      case 'novo': return 0;
      case 'aguardando_equipe': return 1;
      case 'aguardando_cliente': return 1;
      case 'em_analise': return 2;
      case 'em_andamento': return 3;
      case 'resolvido': return 4;
      default: return 0;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;
        const IconComponent = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-5 h-5 rounded-full border-2 text-[10px] transition-colors
              ${isActive 
                ? 'bg-blue-500 border-blue-500 text-white' 
                : 'bg-gray-100 border-gray-300 text-gray-400'
              }
              ${isCurrent ? 'ring-1 ring-blue-200' : ''}
            `}>
              <IconComponent className="h-3 w-3" />
            </div>

            {index < steps.length - 1 && (
              <div className={`
                w-8 h-0.5 mx-1 transition-colors
                ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}