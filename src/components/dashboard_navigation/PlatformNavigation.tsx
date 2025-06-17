
import React from 'react';
import { usePlatformNavigation } from '@/hooks/dashboard_hooks/usePlatformNavigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpenCheck, BarChart3, Activity } from 'lucide-react';

const platformOptions = [
  { key: 'meta', label: 'Meta', icon: BookOpenCheck },
  { key: 'google', label: 'Google', icon: BarChart3 },
  { key: 'relatorios', label: 'Relatórios', icon: Activity },
];

const PlatformNavigation = () => {
  const { platform, setPlatform } = usePlatformNavigation();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Título */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">MD</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Media Dashboard
          </h1>
        </div>

        {/* Botões de Plataforma */}
        <div className="flex items-center space-x-2">
          {platformOptions.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={platform === key ? 'default' : 'outline'}
              onClick={() => setPlatform(key as any)}
              className={cn(
                'flex items-center space-x-2 text-sm px-3 py-1.5',
                platform === key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4 mr-1" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default PlatformNavigation;
