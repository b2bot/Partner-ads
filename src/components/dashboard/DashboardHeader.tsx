
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  dataCount?: number;
  onRefresh?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
}

const DashboardHeader = ({ 
  title, 
  subtitle, 
  dataCount, 
  onRefresh, 
  onExport, 
  isLoading = false 
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {dataCount !== undefined && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {dataCount} registros
          </Badge>
        )}
        
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        )}
        
        {onExport && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
