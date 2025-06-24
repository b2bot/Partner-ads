// createUserScript.js
const { createClient } = require('@supabase/supabase-js');
// Carrega as variáveis do arquivo .env.local
require('dotenv').config({ path: './.env.local' });

// Pega as credenciais do seu arquivo .env.local
const supabaseUrl = process.env.VITE_SUPABASE_URL;
// ATENÇÃO: Usando a SERVICE_ROLE_KEY para ter privilégios de admin
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERRO: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não foram encontradas no arquivo .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser() {
    // --- Defina aqui os dados do novo colaborador ---
    const newUser = {
        email: 'colaborador.teste@email.com',
        password: 'umaSenhaMuitoForte123',
        nome: 'Colaborador de Teste via Script',
        role: 'colaborador',
        status: 'ativo'
    };
    // ---------------------------------------------

    try {
        console.log(`1. Tentando criar o usuário: ${newUser.email}...`);

        // Cria o usuário na tabela de autenticação do Supabase
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: newUser.email,
            password: newUser.password,
            email_confirm: true, // Já cria o usuário como verificado
        });

        if (authError) {
            throw authError; // Lança o erro para ser pego pelo catch
        }

        console.log('✅ Usuário criado na autenticação com sucesso! ID:', authData.user.id);
        console.log('2. Inserindo/Atualizando perfil na tabela "profiles"...');

        // Insere/Atualiza o perfil na tabela 'profiles' manualmente.
        // Usamos 'upsert' para garantir que funcione mesmo que um gatilho já tenha criado uma linha básica.
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: authData.user.id, // Mesmo ID da autenticação
                email: newUser.email,
                nome: newUser.nome,
                role: newUser.role,
                status: newUser.status,
                is_root_admin: false,
            })
            .select();

        if (profileError) {
            throw profileError; // Lança o erro para ser pego pelo catch
        }

        console.log('✅ Perfil criado/atualizado com sucesso!', profileData);
        console.log('\n--- PROCESSO CONCLUÍDO COM SUCESSO ---');

    } catch (error) {
        console.error('\n--- OCORREU UM ERRO DURANTE O PROCESSO ---');
        console.error('ERRO:', error.message);
    }
}

createUser();