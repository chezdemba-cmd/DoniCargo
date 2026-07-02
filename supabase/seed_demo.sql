-- ==========================================
-- SCRIPT DE SEED (DONNÉES DE DÉMONSTRATION)
-- À exécuter dans le SQL Editor de Supabase
-- ==========================================

-- On génère des UUIDs fixes pour pouvoir créer des relations cohérentes
DO $$ 
DECLARE
  client_id UUID := gen_random_uuid();
  transitaire1_id UUID := gen_random_uuid();
  transitaire2_id UUID := gen_random_uuid();
  transitaire3_id UUID := gen_random_uuid();
  
  company1_id UUID := gen_random_uuid();
  company2_id UUID := gen_random_uuid();
  company3_id UUID := gen_random_uuid();

  shipment1_id UUID := gen_random_uuid();
  shipment2_id UUID := gen_random_uuid();

  quote_req1_id UUID := gen_random_uuid();
  quote_req2_id UUID := gen_random_uuid();
BEGIN

  -- 1. Création des Profils (1 Client, 3 Transitaires)
  INSERT INTO public.profiles (id, full_name, email, role, status) VALUES
  (client_id, 'Entreprise Sogem SA', 'contact@sogem.ml', 'client', 'actif'),
  (transitaire1_id, 'Bolloré Logistics Admin', 'admin@bollore.ci', 'transitaire', 'actif'),
  (transitaire2_id, 'Maersk Mali Admin', 'contact@maersk.ml', 'transitaire', 'actif'),
  (transitaire3_id, 'Transit Express CI', 'hello@transit-express.ci', 'transitaire', 'actif');

  -- 2. Création des Entreprises (Companies) pour les transitaires
  INSERT INTO public.companies (id, profile_id, company_name, company_type, agrement_douane, kyb_status, country_code) VALUES
  (company1_id, transitaire1_id, 'Bolloré Africa Logistics', 'transit', 'AGR-DOUANE-2024-001', 'verifie', 'CI'),
  (company2_id, transitaire2_id, 'Maersk Mali SA', 'transit', 'AGR-DOUANE-2024-099', 'verifie', 'ML'),
  (company3_id, transitaire3_id, 'Transit Express', 'transit', 'AGR-DOUANE-2025-442', 'en_attente', 'CI');

  -- 3. Création de Cargaisons (Shipments) pour le client
  INSERT INTO public.shipments (id, client_id, title, origin, destination, status_v2, goods_description) VALUES
  (shipment1_id, client_id, '20 Palettes de Riz Blanc', 'Port d''Abidjan', 'Bamako (Guichet Unique)', 'cree', '20 palettes de riz blanc parfumé de 50kg, non fragile.'),
  (shipment2_id, client_id, 'Pièces détachées Toyota', 'Dakar', 'Bamako', 'cree', 'Lots de pièces détachées automobiles (moteurs, carrosserie).');

  -- 4. Création des Demandes de Devis Groupé (Quote Requests)
  INSERT INTO public.quote_requests (id, shipment_id, requester_user_id, status) VALUES
  (quote_req1_id, shipment1_id, client_id, 'ouverte'),
  (quote_req2_id, shipment2_id, client_id, 'ouverte');

  -- 5. Création de quelques Devis (Quotes) proposés par les transitaires
  -- Le transitaire 1 propose 1.2M pour la première demande
  INSERT INTO public.quotes (shipment_id, transitaire_id, quote_request_id, amount_cents, status) VALUES
  (shipment1_id, transitaire1_id, quote_req1_id, 1200000, 'en_attente'),
  -- Le transitaire 2 propose 1.5M pour la première demande
  (shipment1_id, transitaire2_id, quote_req1_id, 1500000, 'en_attente'),
  -- Le transitaire 1 propose 800k pour la deuxième demande
  (shipment2_id, transitaire1_id, quote_req2_id, 800000, 'en_attente');

  -- 6. Création de faux documents
  INSERT INTO public.documents (client_id, shipment_id, name, url, type, size_bytes, status) VALUES
  (client_id, shipment1_id, 'Facture_Proforma_Riz.pdf', 'https://example.com/facture.pdf', 'pdf', 2450000, 'validé'),
  (client_id, shipment2_id, 'Connaissement_Toyota.pdf', 'https://example.com/bl.pdf', 'pdf', 1200000, 'en_attente');

END $$;
