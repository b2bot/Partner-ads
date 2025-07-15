export interface Collaborator {
  id: string;
  nome: string;
  email: string;
  foto_url?: string;
  cargo?: string;
  setor?: string;
  ativo: boolean;
  created_at: string;
  nivel_acesso: string;
  user_id: string;
}

export interface CollaboratorWithProfile extends Collaborator {
  // Campos adicionais que podem vir do profile
  role?: string;
  is_root_admin?: boolean;
}