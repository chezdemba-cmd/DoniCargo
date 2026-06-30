-- Create custom roles and types
CREATE TYPE user_role AS ENUM ('commercant', 'transitaire', 'transporteur', 'chauffeur', 'admin');
CREATE TYPE shipment_status AS ENUM ('navire', 'port', 'douane', 'route', 'livre');
CREATE TYPE quote_status AS ENUM ('en_attente', 'accepte', 'refuse');
CREATE TYPE document_type AS ENUM ('bl', 'facture', 'douane', 'assurance', 'autre');
CREATE TYPE payment_status AS ENUM ('en_attente', 'escrow_bloque', 'complete', 'echoue');

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'commercant'::user_role NOT NULL,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Companies Table (for Transitaires, Transporteurs etc.)
CREATE TABLE public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name TEXT NOT NULL,
  rccm TEXT,
  nif TEXT,
  address TEXT,
  rating_score NUMERIC(3,2) DEFAULT 5.00,
  reviews_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Shipments Table (Dossiers logistiques)
CREATE TABLE public.shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  transitaire_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  transporteur_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status shipment_status DEFAULT 'navire'::shipment_status NOT NULL,
  container_id TEXT,
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Quotes Table (Devis transitaires)
CREATE TABLE public.quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  transitaire_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'XOF' NOT NULL,
  status quote_status DEFAULT 'en_attente'::quote_status NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Documents Table (Coffre-fort)
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  uploader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  type document_type NOT NULL,
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  ai_extracted_data JSONB,
  is_verified_by_ai BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Tracking Events Table (Journal logistique)
CREATE TABLE public.tracking_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Transactions Table (Paiement Escrow)
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'XOF' NOT NULL,
  provider TEXT NOT NULL, -- e.g. 'wave', 'orange_money'
  status payment_status DEFAULT 'en_attente'::payment_status NOT NULL,
  is_escrow BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- SECURITY POLICIES

-- Profiles: Chacun peut voir son profil, seuls les admins peuvent tout voir
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Companies: Tout le monde peut voir les entreprises (Marketplace), seul le propriétaire peut modifier
CREATE POLICY "Anyone can view companies" ON public.companies
  FOR SELECT USING (true);

CREATE POLICY "Owners can update own company" ON public.companies
  FOR UPDATE USING (auth.uid() = owner_id);

-- Shipments: Les commerçants voient leurs dossiers, les transitaires aussi
CREATE POLICY "Clients can view own shipments" ON public.shipments
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = transitaire_id OR 
    auth.uid() = transporteur_id
  );

CREATE POLICY "Clients can insert own shipments" ON public.shipments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Operators can update assigned shipments" ON public.shipments
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    auth.uid() = transitaire_id OR 
    auth.uid() = transporteur_id
  );

-- Quotes: Les commerçants voient les devis liés à leurs shipments, les transitaires voient leurs propres devis
CREATE POLICY "Users can view relevant quotes" ON public.quotes
  FOR SELECT USING (
    auth.uid() = transitaire_id OR 
    EXISTS (
      SELECT 1 FROM public.shipments 
      WHERE shipments.id = quotes.shipment_id AND shipments.client_id = auth.uid()
    )
  );

CREATE POLICY "Transitaires can insert quotes" ON public.quotes
  FOR INSERT WITH CHECK (auth.uid() = transitaire_id);

-- Documents: Seuls les acteurs concernés par le shipment peuvent voir/ajouter des documents
CREATE POLICY "Access relevant documents" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shipments 
      WHERE shipments.id = documents.shipment_id AND (
        shipments.client_id = auth.uid() OR 
        shipments.transitaire_id = auth.uid() OR 
        shipments.transporteur_id = auth.uid()
      )
    )
  );

CREATE POLICY "Upload relevant documents" ON public.documents
  FOR INSERT WITH CHECK (
    auth.uid() = uploader_id AND
    EXISTS (
      SELECT 1 FROM public.shipments 
      WHERE shipments.id = documents.shipment_id AND (
        shipments.client_id = auth.uid() OR 
        shipments.transitaire_id = auth.uid() OR 
        shipments.transporteur_id = auth.uid()
      )
    )
  );

-- Automate profile generation on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, role)
  VALUES (
    new.id,
    new.phone,
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'commercant'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
