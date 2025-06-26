
import { useState } from 'react';

interface ClientData {
  name: string;
  sheetId: string;
}

export const clients: Record<string, ClientData> = {
  "cliente-a": {
    name: "Cliente A",
    sheetId: "1RkIUU3a_arzxY7IGAtl8sPeNLA9Ztkj4y0CRtrpBAuE"
  },
  "cliente-b": {
    name: "Cliente B", 
    sheetId: "1RkIUU3a_arzxY7IGAtl8sPeNLA9Ztkj4y0CRtrpBAuE"
  },
  "cliente-c": {
    name: "Cliente C",
    sheetId: "1RkIUU3a_arzxY7IGAtl8sPeNLA9Ztkj4y0CRtrpBAuE"
  }
};

export const useClientManager = () => {
  const [currentClientId, setCurrentClientId] = useState<string>(() => {
    return localStorage.getItem('current-client') || 'cliente-a';
  });

  const updateClient = (clientId: string) => {
    setCurrentClientId(clientId);
    localStorage.setItem('current-client', clientId);
  };

  const currentSheetId = clients[currentClientId]?.sheetId || clients['cliente-a'].sheetId;

  return {
    currentClientId,
    setCurrentClientId: updateClient,
    currentSheetId,
    clients,
  };
};
