-- ==========================================
-- SCHÉMA DE LA BASE DE DONNÉES DONICARGO
-- ==========================================

-- Enable the "pgcrypto" extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Table Profiles (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  phone TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('commercant', 'transitaire', 'transporteur', 'client', 'admin')),
  avatar_url TEXT,
  status TEXT DEFAULT 'actif' CHECK (status IN ('actif', 'suspendu')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table Companies (KYB pour les Transitaires et Transporteurs)
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  company_type TEXT NOT NULL CHECK (company_type IN ('transit', 'transport')),
  rccm TEXT,
  nif TEXT,
  agrement_douane TEXT,
  kyb_status TEXT DEFAULT 'en_attente' CHECK (kyb_status IN ('en_attente', 'verifie', 'rejete')),
  country_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- 3. Table Shipments (Expéditions et Suivi)
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  transitaire_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  goods_description TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status_v2 TEXT DEFAULT 'cree' CHECK (status_v2 IN ('cree', 'devis', 'navire', 'port', 'douane', 'route', 'livre')),
  container_id TEXT,
  estimated_arrival TIMESTAMPTZ,
  escrow_amount BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table Quote Requests (Demandes de devis groupées)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  requester_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'ouverte' CHECK (status IN ('ouverte', 'fermee', 'attribuee')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table Quotes (Devis proposés par les transitaires)
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE NOT NULL,
  transitaire_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount_cents BIGINT NOT NULL,
  status TEXT DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'accepte', 'refuse')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table Documents (Coffre-fort documentaire)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  status TEXT DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'validé', 'rejeté')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active profiles (for the marketplace)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (status = 'actif');

-- Allow authenticated users to view companies
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);

-- Users can only view their own shipments (client) or shipments assigned to them (transitaire)
CREATE POLICY "Users can view their shipments" ON public.shipments FOR SELECT 
USING (auth.uid() = client_id OR auth.uid() = transitaire_id);

-- Anyone can view open quote requests
CREATE POLICY "Open quote requests are viewable by everyone" ON public.quote_requests FOR SELECT USING (status = 'ouverte');

-- Quotes are viewable by the requester or the transitaire who made them
CREATE POLICY "Quotes are viewable by involved parties" ON public.quotes FOR SELECT 
USING (auth.uid() = transitaire_id OR auth.uid() IN (SELECT requester_user_id FROM public.quote_requests WHERE id = quote_request_id));

-- Users can view their own documents
CREATE POLICY "Users can view their documents" ON public.documents FOR SELECT USING (auth.uid() = client_id);
