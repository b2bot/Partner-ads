// Caminho: [RAIZ]/vite.config.ts

import { defineConfig, loadEnv } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env.local
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Esta seção 'define' garante que as variáveis estarão disponíveis
    // tanto no 'npm run dev' quanto no 'vercel dev'.
    define: {
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    }
  });
}
