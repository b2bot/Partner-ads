
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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Validação interna de permissões
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('Authorization header ausente')
      throw new Error('Authorization header é obrigatório')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError || !user) {
      console.error('Erro de autenticação:', authError)
      throw new Error('Token de autenticação inválido')
    }

    // Verificar se o usuário tem permissão para criar outros usuários
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role, is_root_admin')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Erro ao buscar perfil:', profileError)
      throw new Error('Erro ao verificar perfil do usuário')
    }

    if (!profile.is_root_admin && profile.role !== 'admin') {
      console.error('Usuário sem permissão:', { user_id: user.id, role: profile.role, is_root_admin: profile.is_root_admin })
      throw new Error('Permissão insuficiente para criar usuários')
    }

    const body = await req.json()
    const { email, nome, role = 'admin', senha } = body

    if (!email || !nome) {
      console.error('Dados obrigatórios ausentes:', { email: !!email, nome: !!nome })
      throw new Error('Email e nome são obrigatórios')
    }

    const password = senha || Math.random().toString(36).slice(-12) + 'A1!'

    console.log('Iniciando criação de usuário:', { email, nome, role })

    // Usar user_metadata ao invés de raw_user_meta_data
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, role }, // Corrigido para user_metadata
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
