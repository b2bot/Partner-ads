
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const body = await req.json()
    const { email, nome, role = 'admin', senha } = body

    // Validação básica dos dados
    if (!email || !nome) {
      console.error('Dados obrigatórios ausentes:', { email: !!email, nome: !!nome })
      throw new Error('Email e nome são obrigatórios')
    }

    // Validar se o role é válido
    if (!['admin', 'cliente'].includes(role)) {
      throw new Error('Role deve ser "admin" ou "cliente"')
    }

    const password = senha || Math.random().toString(36).slice(-12) + 'A1!'

    console.log('Iniciando criação de usuário:', { email, nome, role })

    // Criar usuário usando user_metadata (não raw_user_meta_data)
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, role },
    })

    if (createError) {
      console.error('Erro ao criar usuário no Supabase Auth:', createError)
      throw new Error(`Erro ao criar usuário: ${createError.message}`)
    }

    if (!newUser.user) {
      console.error('Usuário não foi criado corretamente')
      throw new Error('Falha na criação do usuário')
    }

    console.log('Usuário criado com sucesso:', {
      id: newUser.user.id,
      email: newUser.user.email,
      metadata: newUser.user.user_metadata
    })

    // A trigger handle_new_user() automaticamente criará:
    // - Perfil na tabela profiles
    // - Permissões na tabela user_permissions  
    // - Registro na tabela colaboradores (se admin) ou clientes (se cliente)

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: newUser.user,
        message: 'Usuário criado com sucesso'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Erro geral na função create-user:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Erro interno do servidor'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
