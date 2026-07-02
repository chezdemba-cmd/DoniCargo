const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.oryhryyvujrxxnsvhxlp:Demetbad49000@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true",
  ssl: { rejectUnauthorized: false }
});

async function fixDb() {
  await client.connect();
  try {
    // Profiles
    await client.query(`DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;`);
    await client.query(`
      CREATE POLICY "Users can insert their own profile."
      ON profiles FOR INSERT 
      WITH CHECK ( auth.uid() = id );
    `);

    // Companies
    await client.query(`DROP POLICY IF EXISTS "Users can insert their own company." ON companies;`);
    await client.query(`
      CREATE POLICY "Users can insert their own company."
      ON companies FOR INSERT 
      WITH CHECK ( auth.uid() = profile_id );
    `);

    console.log("✅ Politiques RLS corrigées avec succès dans la base de données !");
  } catch(e) {
    console.error("❌ Erreur SQL:", e.message);
  } finally {
    await client.end();
  }
}
fixDb();
