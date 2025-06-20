
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting reset-client-password function')
    
    // Create Supabase admin client
    const supabaseUrl = 'https://ekkhzqcjpxzzjtzoojry.supabase.co'
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('Authorization header missing')
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user is authenticated and is admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('User authenticated:', user.id)

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, is_root_admin')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Profile error:', profileError)
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!profile.is_root_admin && profile.role !== 'admin') {
      console.error('Access denied for user:', user.id, 'Role:', profile.role)
      return new Response(
        JSON.stringify({ error: 'Access denied. Admin privileges required.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Admin verified:', user.id)

    // Get request data
    const requestBody = await req.json()
    const { userId, newPassword } = requestBody

    if (!userId || !newPassword) {
      console.error('Missing required fields:', { userId: !!userId, newPassword: !!newPassword })
      return new Response(
        JSON.stringify({ error: 'userId and newPassword are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (newPassword.length < 6) {
      console.error('Password too short')
      return new Response(
        JSON.stringify({ error: 'Password must be at least 6 characters long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Updating password for user:', userId)

    // Verify the target user exists and is a client
    const { data: targetClient, error: clientError } = await supabaseAdmin
      .from('clientes')
      .select('id, nome, user_id')
      .eq('user_id', userId)
      .single()

    if (clientError || !targetClient) {
      console.error('Client not found:', clientError)
      return new Response(
        JSON.stringify({ error: 'Client not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Client found:', targetClient.nome)

    // Update the user password using admin API
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    )

    if (updateError) {
      console.error('Password update failed:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update password: ' + updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Password updated successfully for:', targetClient.nome)

    // Log the password reset activity
    try {
      await supabaseAdmin.rpc('log_system_activity', {
        p_acao: 'password_reset',
        p_modulo: 'client_management',
        p_detalhes: {
          admin_id: user.id,
          client_id: targetClient.id,
          client_name: targetClient.nome,
          timestamp: new Date().toISOString()
        }
      })
    } catch (logError) {
      console.error('Failed to log activity:', logError)
      // Don't fail the entire operation for logging issues
    }

    console.log('Password reset completed successfully')

    return new Response(
      JSON.stringify({ success: true, message: 'Password updated successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error in reset-client-password function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error: ' + error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
