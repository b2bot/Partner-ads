
import React, { createContext, useContext, ReactNode } from 'react';

interface SettingsContextType {
  clientId: string | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
  clientId: string | null;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ 
  children, 
  clientId 
}) => {
  const value = {
    clientId
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
