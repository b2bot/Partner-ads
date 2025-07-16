
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user } = await req.json()
    
    if (!user) {
      throw new Error('User data is required')
    }

    console.log('Processing new user:', user.id, user.email)

    const userRole = user.user_metadata?.role || 'cliente'
    const userName = user.user_metadata?.nome || user.email.split('@')[0]

    // 1. Inserir em profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        role: userRole,
        ativo: true,
        nome: userName,
        status: 'ativo',
        created_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Error inserting profile:', profileError)
      throw profileError
    }

    // 2. Inserir permissões básicas
    let permissions = []
    if (userRole === 'admin') {
      permissions = [
        { user_id: user.id, permission: 'access_dashboard', granted_by: user.id },
        { user_id: user.id, permission: 'access_calls', granted_by: user.id },
        { user_id: user.id, permission: 'access_tasks', granted_by: user.id },
        { user_id: user.id, permission: 'manage_tasks', granted_by: user.id }
      ]
    } else {
      permissions = [
        { user_id: user.id, permission: 'access_dashboard', granted_by: user.id },
        { user_id: user.id, permission: 'access_calls', granted_by: user.id },
        { user_id: user.id, permission: 'access_creatives', granted_by: user.id },
        { user_id: user.id, permission: 'access_reports', granted_by: user.id }
      ]
    }

    const { error: permissionsError } = await supabaseAdmin
      .from('user_permissions')
      .insert(permissions)

    if (permissionsError) {
      console.error('Error inserting permissions:', permissionsError)
      throw permissionsError
    }

    // 3. Inserir em colaboradores ou clientes
    if (userRole === 'admin') {
      const { error: colaboradorError } = await supabaseAdmin
        .from('colaboradores')
        .insert({
          user_id: user.id,
          email: user.email,
          nome: userName,
          ativo: true,
          nivel_acesso: 'admin',
          created_at: new Date().toISOString()
        })

      if (colaboradorError) {
        console.error('Error inserting colaborador:', colaboradorError)
        throw colaboradorError
      }
    } else {
      const { error: clienteError } = await supabaseAdmin
        .from('clientes')
        .insert({
          user_id: user.id,
          nome: userName,
          email: user.email,
          ativo: true,
          tipo_acesso: 'api',
          created_at: new Date().toISOString()
        })

      if (clienteError) {
        console.error('Error inserting cliente:', clienteError)
        throw clienteError
      }
    }

    console.log('User setup completed successfully for:', user.id)

    return new Response(
      JSON.stringify({ success: true, message: 'User setup completed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in handle-new-user function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
