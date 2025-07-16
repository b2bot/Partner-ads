import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1) Verificar header de autorização
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('❌ Missing or invalid Authorization header');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing authorization header' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const token = authHeader.replace('Bearer ', '');

    // 2) Cliente anônimo pra validar o usuário
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );
    const { data: userData, error: userErr } = await supabaseClient.auth.getUser(token);
    if (userErr || !userData.user) {
      console.error('❌ Unauthorized:', userErr);
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized user' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3) Checar role admin ou is_root_admin
    const userId = userData.user.id;
    const { data: profile, error: profErr } = await supabaseClient
      .from('profiles')
      .select('role, is_root_admin')
      .eq('id', userId)
      .single();

    if (profErr || !(profile.is_root_admin || profile.role === 'admin')) {
      console.error('❌ Insufficient permissions:', profErr, profile);
      return new Response(
        JSON.stringify({ success: false, error: 'Insufficient permissions' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4) Cliente admin service-role pra criar usuário
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // 5) Ler body
    const { email, nome, role = 'admin', senha } = await req.json();
    if (!email || !nome) {
      console.error('❌ Dados obrigatórios ausentes:', { email: !!email, nome: !!nome });
      throw new Error('Email e nome são obrigatórios');
    }
    if (!['admin', 'cliente'].includes(role)) {
      console.error('❌ Role inválido:', role);
      throw new Error('Role deve ser "admin" ou "cliente"');
    }

    const password = senha || Math.random().toString(36).slice(-12) + 'A1!';
    console.log('🚀 Criando usuário:', { email, nome, role });

    // 6) Criar user
    const { data: newUser, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, role },
    });
    if (createErr) {
      console.error('❌ Erro auth.admin.createUser():', createErr);
      throw new Error(createErr.message);
    }
    if (!newUser.user) {
      console.error('❌ newUser.user undefined', newUser);
      throw new Error('Falha na criação do usuário');
    }

    console.log('✅ Usuário criado ID:', newUser.user.id);

    // 7) RETORNO SUCESSO
    return new Response(
      JSON.stringify({
        success: true,
        user: newUser.user,
        message: 'Usuário criado com sucesso'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('💥 Erro geral create-user:', err);
    // SEMPRE 200, pra invoke() devolver o JSON
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
