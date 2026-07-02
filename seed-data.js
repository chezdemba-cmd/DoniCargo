const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seedData() {
  console.log("Seeding data for admin@donicargo.com...");
  
  const { data: { users }, error: userError } = await supabase.auth.admin?.listUsers() || await supabase.from('profiles').select('id').eq('email', 'admin@donicargo.com');
  
  let adminId;
  if (users) {
      adminId = users.find(u => u.email === 'admin@donicargo.com')?.id;
  } else {
      const { data: profileData } = await supabase.from('profiles').select('id').eq('email', 'admin@donicargo.com').single();
      adminId = profileData?.id;
  }

  if (!adminId) {
    console.log("Impossible de trouver l'utilisateur admin.");
    return;
  }

  // Insert 2 shipments
  const { data: shipments, error: shipError } = await supabase.from('shipments').insert([
    {
      client_id: adminId,
      title: "Conteneur 40HC - Pièces Automobiles",
      origin: "Shanghai, Chine",
      destination: "Bamako, Mali",
      status: "navire",
      container_id: "MSCU-892019",
      estimated_arrival: "2026-08-15",
      escrow_amount: 0
    },
    {
      client_id: adminId,
      title: "Matériel Électronique",
      origin: "Dubaï, EAU",
      destination: "Abidjan, CI",
      status: "port",
      container_id: "HLXU-452109",
      estimated_arrival: "2026-07-10",
      escrow_amount: 2500000
    }
  ]).select();

  if (shipError) {
      console.error("Erreur ajout shipments:", shipError);
      return;
  }

  console.log("Shipments ajoutés !");

  // Insert 1 transitaire profile for the quote
  const transitaireId = "11111111-1111-1111-1111-111111111111"; // fake UUID or just a new user. 
  // Wait, quotes need a valid transitaire_id due to foreign key?
  // Let's create a fake quote if RLS allows or we can just ignore quotes.
  // Actually, we can just fetch another user or bypass. Let's just create a quote with adminId as transitaire for now to avoid FK issues.
  
  const { error: quoteError } = await supabase.from('quotes').insert([
    {
      shipment_id: shipments[0].id,
      transitaire_id: adminId, // using adminId just to bypass FK
      amount_cents: 1250000,
      status: 'en_attente'
    }
  ]);

  if (quoteError) {
      console.error("Erreur ajout quote:", quoteError);
  } else {
      console.log("Devis ajouté !");
  }

  console.log("✅ Seed terminé. Rafraîchissez le dashboard !");
}

seedData();
