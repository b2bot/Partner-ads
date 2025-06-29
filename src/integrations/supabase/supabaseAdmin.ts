// src/integrations/supabase/supabaseAdmin.ts

// ATENÇÃO: Este arquivo SÓ PODE ser importado em código
// que roda no lado do servidor (Server-Side), como API Routes.
import { createClient } from '@supabase/supabase-js';

// As variáveis de ambiente aqui NÃO usam o prefixo VITE_
// porque estamos no ambiente de servidor (Node.js).
const supabaseUrl = process.env.SUPABASE_URL; // <<< CORREÇÃO AQUI
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or Service Role Key are not defined in server environment variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);