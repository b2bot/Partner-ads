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
      console.error("🚨 Sem authorization header na requisição.")
      throw new Error('No authorization header')
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      console.error("❌ Erro na autenticação do usuário:", authError)
      throw new Error('Unauthorized')
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role, is_root_admin')
      .eq('id', user.id)
      .single()

    console.log("🔍 Usuário autenticado:", user.email)
    console.log("📄 Perfil encontrado:", profile)

    if (profileError) {
      console.error("❌ Erro ao buscar perfil:", profileError)
      throw new Error('Failed to fetch user profile')
    }

    if (!profile.is_root_admin && profile.role !== 'admin') {
      console.warn("🚫 Permissões insuficientes:", profile)
      throw new Error('Insufficient permissions')
    }

    const body = await req.json()
    console.log("📨 Payload recebido:", body)

    const { email, nome, role = 'admin', senha } = body

    if (!email || !nome) {
      console.warn("❗ Dados incompletos: email ou nome ausentes.")
      throw new Error('Email and nome are required')
    }

    const password = senha || Math.random().toString(36).slice(-12) + 'A1!'

    console.log('🛠 Criando usuário com email:', email, '| Role:', role)

    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        nome,
        role
      }
    })

    console.log("🧠 Resultado do createUser:", { newUser, createError })

    if (createError) {
      console.error('❌ Erro ao criar usuário:', createError)
      throw createError
    }

    console.log('✅ Usuário criado com sucesso:', newUser.user?.id)

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
    console.error('🔥 Erro final na create-user:', error)

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
