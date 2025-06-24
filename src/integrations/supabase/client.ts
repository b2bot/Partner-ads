// Caminho: src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js'

// --- Linhas de diagnóstico que você pode remover depois que tudo funcionar ---
//console.log('--- TESTE DE VARIÁVEIS DE AMBIENTE ---');
//console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
//console.log('ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Carregada' : 'NÃO CARREGADA');
//console.log('------------------------------------');
// -----------------------------------------------------------------------

// 1. Declaramos as variáveis primeiro
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Verificamos se elas foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'ERRO CRÍTICO: Variáveis do Supabase não foram carregadas. Verifique o arquivo .env.local e reinicie o servidor.';
  alert(errorMessage);
  throw new Error(errorMessage);
}

// 3. Criamos e exportamos o cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);