
import { supabase } from '@/integrations/supabase/client';

export async function processNewUser(userId: string) {
  try {
    console.log('Processing new user setup for:', userId);
    
    // Aguardar um pouco para garantir que o usuário foi criado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar se o usuário já tem perfil
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (existingProfile) {
      console.log('User profile already exists');
      return true;
    }
    
    // Se não existir, tentar novamente algumas vezes
    let attempts = 0;
    const maxAttempts = 5;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempts + 1)));
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();
      
      if (profile) {
        console.log('User profile found after', attempts + 1, 'attempts');
        return true;
      }
      
      attempts++;
    }
    
    console.error('User profile not found after maximum attempts');
    return false;
    
  } catch (error) {
    console.error('Error processing new user:', error);
    return false;
  }
}
