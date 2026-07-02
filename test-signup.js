const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://oryhryyvujrxxnsvhxlp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yeWhyeXl2dWpyeHhuc3ZoeGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MDczMzgsImV4cCI6MjA5ODM4MzMzOH0.XUsVLqN1_evSEeOonKdvuZv2RaPnk1k3kw7hI0fIO3Q';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignup() {
  console.log("1. Test de l'inscription (Sign Up)...");
  const email = `test.donicargo.${Date.now()}@gmail.com`;
  
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: 'Password123!',
  });

  if (signUpError) {
    console.error("❌ Erreur d'inscription:", signUpError.message);
    return;
  }
  console.log("✅ Inscription réussie pour:", email);
  
  // Checking session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.error("❌ Erreur: L'utilisateur n'est pas connecté. (La confirmation par email est sûrement encore activée)");
    return;
  }
  console.log("✅ L'utilisateur est bien connecté automatiquement.");

  console.log("2. Test de création du profil...");
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: authData.user.id,
      email: email,
      phone: "+22500000000",
      role: "commercant",
      full_name: "Test Verification",
    }
  ]);

  if (profileError) {
    console.error("❌ Erreur de création de profil:", profileError.message);
    return;
  }
  
  console.log("✅ Création du profil réussie ! Tout fonctionne parfaitement !");
}

testSignup();
