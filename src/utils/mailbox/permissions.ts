
// Função utilitária para verificar permissões do mailbox
export const hasMailboxPermission = (permission: string): boolean => {
  // Implementação básica - ajuste conforme sua lógica de permissões
  const userPermissions = ['access_mailbox']; // Vem do contexto de auth
  return userPermissions.includes(permission);
};

export const checkMailboxAccess = (): boolean => {
  return hasMailboxPermission('access_mailbox');
};
