-- migration 20260630000000_schema_v2.sql

-- 1. Create New Enums
CREATE TYPE kyc_status_enum AS ENUM ('en_attente', 'verifie', 'rejete');
CREATE TYPE company_type_enum AS ENUM ('transit', 'transport', 'entrepot', 'assurance', 'import_export');
CREATE TYPE kyc_doc_type_enum AS ENUM ('cni', 'passeport', 'rccm', 'agrement', 'ifu', 'carte_grise');
CREATE TYPE transport_mode_enum AS ENUM ('maritime', 'routier', 'multimodal', 'aerien');
CREATE TYPE incoterm_enum AS ENUM ('FOB', 'CIF', 'EXW', 'DAP', 'CFR', 'CPT', 'CIP', 'DDP', 'FAS', 'FCA', 'DPU');
CREATE TYPE container_type_enum AS ENUM ('20', '40', '40HC');
CREATE TYPE mission_type_enum AS ENUM ('transit', 'transport');
CREATE TYPE mission_status_enum AS ENUM ('assignee', 'en_cours', 'livree', 'validee', 'annulee');
CREATE TYPE quote_request_status_enum AS ENUM ('ouverte', 'fermee', 'attribuee');
CREATE TYPE payment_method_enum AS ENUM ('orange_money', 'wave', 'mtn', 'moov', 'carte', 'virement');

CREATE TYPE shipment_status_v2 AS ENUM ('cree', 'en_mer', 'arrive_port', 'dedouanement', 'en_transit_routier', 'livre', 'cloture', 'litige');

-- Update Profiles
ALTER TABLE public.profiles 
  ADD COLUMN email TEXT,
  ADD COLUMN language TEXT DEFAULT 'fr',
  ADD COLUMN country_code CHAR(2),
  ADD COLUMN kyc_status kyc_status_enum DEFAULT 'en_attente',
  ADD COLUMN is_2fa_enabled BOOLEAN DEFAULT false,
  ADD COLUMN status TEXT DEFAULT 'actif';

-- Update Companies
ALTER TABLE public.companies 
  ADD COLUMN company_type company_type_enum,
  ADD COLUMN agrement_douane TEXT,
  ADD COLUMN kyb_status kyc_status_enum DEFAULT 'en_attente',
  ADD COLUMN country_code CHAR(2);
ALTER TABLE public.companies RENAME COLUMN nif TO ifu_nif;

-- Create KYC Documents
CREATE TABLE public.kyc_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  doc_type kyc_doc_type_enum NOT NULL,
  file_id UUID,
  verification_status kyc_status_enum DEFAULT 'en_attente',
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Update Shipments
ALTER TABLE public.shipments
  ADD COLUMN reference TEXT UNIQUE,
  ADD COLUMN origin_country TEXT,
  ADD COLUMN origin_port TEXT,
  ADD COLUMN dest_country TEXT,
  ADD COLUMN dest_city TEXT,
  ADD COLUMN transport_mode transport_mode_enum,
  ADD COLUMN incoterm incoterm_enum,
  ADD COLUMN goods_description TEXT,
  ADD COLUMN goods_value_cents BIGINT,
  ADD COLUMN currency_code CHAR(3) DEFAULT 'XOF',
  ADD COLUMN hs_code TEXT,
  ADD COLUMN estimated_duty_cents BIGINT,
  ADD COLUMN status_v2 shipment_status_v2 DEFAULT 'cree';

-- Containers
CREATE TABLE public.containers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  container_number TEXT,
  type container_type_enum,
  seal_number TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Parcels
CREATE TABLE public.parcels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  label TEXT,
  weight_kg NUMERIC,
  volume_m3 NUMERIC,
  qty INTEGER,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tracking Events update
ALTER TABLE public.tracking_events
  ADD COLUMN event_type TEXT,
  ADD COLUMN location_lat NUMERIC,
  ADD COLUMN location_lng NUMERIC,
  ADD COLUMN occurred_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Marketplace
CREATE TABLE public.service_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  service_type TEXT,
  corridor TEXT,
  base_price_cents BIGINT,
  lead_time_days INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  requester_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status quote_request_status_enum DEFAULT 'ouverte',
  deadline_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add quote_request_id to Quotes
ALTER TABLE public.quotes
  ADD COLUMN quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  ADD COLUMN lead_time_days INTEGER,
  ADD COLUMN valid_until TIMESTAMP WITH TIME ZONE,
  ADD COLUMN amount_cents BIGINT;

CREATE TABLE public.missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  driver_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type mission_type_enum NOT NULL,
  status mission_status_enum DEFAULT 'assignee',
  agreed_amount_cents BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Vehicle Positions
CREATE TABLE public.vehicle_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  speed NUMERIC,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
  author_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Documents Additions
ALTER TABLE public.documents
  ADD COLUMN file_key TEXT,
  ADD COLUMN mime_type TEXT,
  ADD COLUMN size_bytes BIGINT,
  ADD COLUMN checksum_sha256 TEXT,
  ADD COLUMN ocr_status TEXT DEFAULT 'non_traite',
  ADD COLUMN is_signed BOOLEAN DEFAULT false,
  ADD COLUMN version INTEGER DEFAULT 1;

CREATE TABLE public.document_extractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  extracted_json JSONB,
  confidence NUMERIC(4,3),
  missing_fields JSONB,
  errors_detected JSONB,
  model_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  signer_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  signature_image_key TEXT,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ip_address TEXT,
  hash TEXT
);

-- Payments / Escrow
ALTER TABLE public.transactions
  ADD COLUMN mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
  ADD COLUMN payee_company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  ADD COLUMN payment_method payment_method_enum,
  ADD COLUMN provider_ref TEXT,
  ADD COLUMN escrow_release_condition TEXT;

CREATE TABLE public.escrow_holds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'bloque',
  released_at TIMESTAMP WITH TIME ZONE,
  released_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
  number TEXT UNIQUE NOT NULL,
  amount_cents BIGINT NOT NULL,
  tax_cents BIGINT,
  status TEXT DEFAULT 'emise',
  pdf_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  number TEXT UNIQUE NOT NULL,
  pdf_key TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_id UUID NOT NULL,
  base_amount_cents BIGINT NOT NULL,
  rate NUMERIC(5,4),
  commission_cents BIGINT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Systems / Audit
CREATE TABLE public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  ip TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.fraud_flags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL,
  severity TEXT,
  status TEXT DEFAULT 'open',
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure RLS is enabled for all new tables
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_extractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_flags ENABLE ROW LEVEL SECURITY;

-- Basic RLS
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert kyc docs" ON public.kyc_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own kyc docs" ON public.kyc_documents
  FOR SELECT USING (auth.uid() = user_id);

-- Quotes and Requests
CREATE POLICY "Users view own quote requests" ON public.quote_requests
  FOR SELECT USING (auth.uid() = requester_user_id);

CREATE POLICY "Users create own quote requests" ON public.quote_requests
  FOR INSERT WITH CHECK (auth.uid() = requester_user_id);

-- Missions
CREATE POLICY "Drivers view own missions" ON public.missions
  FOR SELECT USING (auth.uid() = driver_user_id);

-- Reviews
CREATE POLICY "Public view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users create own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = author_user_id);

-- Signatures
CREATE POLICY "Users view own signatures" ON public.signatures
  FOR SELECT USING (auth.uid() = signer_user_id);

CREATE POLICY "Users create own signatures" ON public.signatures
  FOR INSERT WITH CHECK (auth.uid() = signer_user_id);

-- Activity Logs
CREATE POLICY "Users view own activity" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create own activity" ON public.activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service Offers
CREATE POLICY "Public view service offers" ON public.service_offers
  FOR SELECT USING (true);

-- Default read-only policies for other entities (adjust as needed for business logic)
CREATE POLICY "View containers" ON public.containers FOR SELECT USING (true);
CREATE POLICY "View parcels" ON public.parcels FOR SELECT USING (true);
CREATE POLICY "View vehicle positions" ON public.vehicle_positions FOR SELECT USING (true);
CREATE POLICY "View document extractions" ON public.document_extractions FOR SELECT USING (true);
CREATE POLICY "View escrow holds" ON public.escrow_holds FOR SELECT USING (true);
CREATE POLICY "View invoices" ON public.invoices FOR SELECT USING (true);
CREATE POLICY "View receipts" ON public.receipts FOR SELECT USING (true);
CREATE POLICY "View commissions" ON public.commissions FOR SELECT USING (true);
CREATE POLICY "View fraud flags" ON public.fraud_flags FOR SELECT USING (true);
