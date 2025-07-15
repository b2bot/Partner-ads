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

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Authorization header ausente')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError || !user) {
      console.error('Erro de autenticação:', authError)
      throw new Error('Unauthorized')
    }

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
      throw new Error('Permissão insuficiente')
    }

    const body = await req.json()
    const { email, nome, role = 'admin', senha } = body

    if (!email || !nome) {
      console.error('Body inválido:', body)
      throw new Error('Campos obrigatórios: email e nome')
    }

    const password = senha || Math.random().toString(36).slice(-12) + 'A1!'

    console.log('Iniciando criação de usuário:', { email, nome, role })

    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, role },
    })

    if (createError) {
      console.error('Erro ao criar usuário:', createError)
      throw new Error(createError.message)
    }

    console.log('Usuário criado com sucesso:', newUser.user?.id)

    return new Response(
      JSON.stringify({ success: true, user: newUser.user }),
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
        error: error.message || 'Erro interno'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
