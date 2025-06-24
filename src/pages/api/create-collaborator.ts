// src/pages/api/create-collaborator.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/integrations/supabase/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Garantir que a requisição é do tipo POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email, password, nome, foto_url, role, status } = req.body;

    // 2. Validar os dados recebidos
    if (!email || !password || !nome) {
      return res.status(400).json({ message: 'Email, senha e nome são obrigatórios.' });
    }

    // 3. Usar o cliente ADMIN para criar o usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Já cria o usuário como confirmado
    });

    if (authError) {
      console.error('Supabase Auth Error:', authError);
      // Retorna uma mensagem de erro mais amigável
      if (authError.message.includes('unique constraint')) {
        return res.status(409).json({ message: 'Um usuário com este email já existe.' });
      }
      return res.status(500).json({ message: authError.message });
    }

    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('Falha ao obter o ID do usuário recém-criado.');
    }

    // 4. Inserir o perfil do usuário na tabela 'profiles'
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        nome,
        email,
        foto_url: foto_url || null,
        role: role || 'colaborador',
        is_root_admin: false,
        status: status || 'ativo',
        ativo: (status || 'ativo') === 'ativo', // Garante que a coluna 'ativo' esteja correta
      });

    if (profileError) {
      console.error('Supabase Profile Error:', profileError);
      // Se a criação do perfil falhar, o ideal seria deletar o usuário criado para não deixar lixo.
      // (Isso é um refinamento, por agora vamos focar em retornar o erro)
      return res.status(500).json({ message: profileError.message });
    }

    // 5. Retornar sucesso com o ID do usuário
    return res.status(201).json({ userId });

  } catch (error: any) {
    console.error('Handler Error:', error);
    return res.status(500).json({ message: error.message || 'Ocorreu um erro interno.' });
  }
}