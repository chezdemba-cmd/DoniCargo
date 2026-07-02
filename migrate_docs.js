const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
        uploaded_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        doc_type TEXT NOT NULL,
        file_url TEXT NOT NULL,
        size_bytes BIGINT DEFAULT 0,
        status TEXT DEFAULT 'Vérifié',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    // Enable RLS
    await client.query(`ALTER TABLE documents ENABLE ROW LEVEL SECURITY;`);

    // Policies
    // Anyone involved in the shipment can view
    await client.query(`
      CREATE POLICY "Documents visibles par client et transitaire" ON documents
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM shipments 
          WHERE shipments.id = documents.shipment_id 
          AND (shipments.client_id = auth.uid() OR shipments.transitaire_id = auth.uid())
        )
      );
    `).catch(() => console.log('Policy SELECT already exists'));

    await client.query(`
      CREATE POLICY "Transitaires peuvent insérer" ON documents
      FOR INSERT WITH CHECK (
        auth.uid() = uploaded_by
      );
    `).catch(() => console.log('Policy INSERT already exists'));

    console.log("Migration réussie pour la table documents.");
  } catch (e) {
    console.error("Erreur lors de la migration:", e);
  } finally {
    await client.end();
  }
}
run();
