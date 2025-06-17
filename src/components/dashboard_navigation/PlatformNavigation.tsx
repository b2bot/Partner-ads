
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Facebook, Globe } from 'lucide-react';

const PlatformNavigation = () => {
  return (
    <div className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Painel de Métricas
            </h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Multi-plataforma
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Facebook className="w-4 h-4" />
              <span>Meta</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformNavigation;
