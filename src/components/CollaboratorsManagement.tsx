
import { useState } from 'react';
import { CreateCollaboratorModal } from './CreateCollaboratorModal';
import { EditCollaboratorModal } from './EditCollaboratorModal';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/hooks/useAuth';
import { useCollaborators } from '@/hooks/useCollaborators';
import { CollaboratorsHeader } from './collaborators/CollaboratorsHeader';
import { CollaboratorsSearch } from './collaborators/CollaboratorsSearch';
import { CollaboratorsList } from './collaborators/CollaboratorsList';
import { AccessDenied } from './collaborators/AccessDenied';
import { LoadingSpinner } from './collaborators/LoadingSpinner';
import { Collaborator } from '@/types/collaborator';

export function CollaboratorsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollaborator, setEditingCollaborator] = useState<Collaborator | null>(null);
  
  const { hasPermission } = usePermissions();
  const { profile } = useAuth();
  const { collaborators, isLoading, deactivateCollaborator, isDeactivating } = useCollaborators();

  // Verificar se tem permissão para acessar
  if (!hasPermission('manage_collaborators') && !profile?.is_root_admin) {
    return <AccessDenied />;
  }

  // Filtrar colaboradores
  const filteredCollaborators = collaborators.filter(collaborator =>
    collaborator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <CollaboratorsHeader onCreateNew={() => setShowCreateModal(true)} />
      
      <CollaboratorsSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <CollaboratorsList
        collaborators={filteredCollaborators}
        onEdit={setEditingCollaborator}
        onDeactivate={deactivateCollaborator}
        isDeactivating={isDeactivating}
      />

      {showCreateModal && (
        <CreateCollaboratorModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {editingCollaborator && (
        <EditCollaboratorModal
          collaborator={editingCollaborator}
          open={!!editingCollaborator}
          onClose={() => setEditingCollaborator(null)}
        />
      )}
    </div>
  );
}
