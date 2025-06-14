
import { CheckCircle, Clock, AlertCircle, User, FileCheck } from 'lucide-react';

interface TicketStepperProps {
  status: 'aberto' | 'em_andamento' | 'resolvido';
  categoria?: string;
  className?: string;
}

export function TicketStepper({ status, categoria, className }: TicketStepperProps) {
  const steps = [
    { id: 'novo', label: 'Novo', icon: AlertCircle },
    { id: 'analise', label: 'Em Análise', icon: Clock },
    { id: 'andamento', label: 'Em Andamento', icon: User },
    { id: 'aguardando', label: 'Aguardando Cliente', icon: Clock },
    { id: 'concluido', label: 'Concluído', icon: CheckCircle }
  ];

  const getCurrentStep = () => {
    switch (status) {
      case 'aberto': return 0;
      case 'em_andamento': return 2;
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
              flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors
              ${isActive 
                ? 'bg-blue-500 border-blue-500 text-white' 
                : 'bg-gray-100 border-gray-300 text-gray-400'
              }
              ${isCurrent ? 'ring-2 ring-blue-200' : ''}
            `}>
              <IconComponent className="h-4 w-4" />
            </div>
            
            {index < steps.length - 1 && (
              <div className={`
                w-12 h-0.5 mx-2 transition-colors
                ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}
