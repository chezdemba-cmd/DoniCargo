const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  await client.connect();

  try {
    await client.query(`
      ALTER TABLE profiles 
      ADD COLUMN IF NOT EXISTS phone TEXT,
      ADD COLUMN IF NOT EXISTS address TEXT;
    `);
    
    console.log("Migration réussie : colonnes phone et address ajoutées à profiles.");
  } catch (e) {
    console.error("Erreur lors de la migration:", e);
  } finally {
    await client.end();
  }
}
run();
