
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface AdvancedFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onClearFilters?: () => void;
}

const AdvancedFilters = ({ 
  searchTerm, 
  onSearchTermChange, 
  onClearFilters 
}: AdvancedFiltersProps) => {
  return (
    <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar campanhas, grupos ou anúncios..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            
            {onClearFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
