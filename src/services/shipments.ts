import { createClient } from "@/lib/supabase/server"

export interface Shipment {
  id: string
  client_id?: string
  transitaire_id?: string
  title: string
  origin: string
  destination: string
  status: 'navire' | 'port' | 'douane' | 'route' | 'livre'
  container_id?: string
  estimated_arrival?: string
  escrow_amount?: number
  quotes?: Record<string, unknown>[]
}

// Mock Fallback Data
const MOCK_SHIPMENTS: any[] = [
  {
    id: "HLX-9029",
    client_id: "mock",
    title: "Conteneur de Pièces Détachées",
    origin: "Shanghai, Chine",
    destination: "Bamako, Mali via Abidjan",
    status: "douane",
    container_id: "HLX-9029",
    estimated_arrival: "2026-07-05",
    escrow_amount: 1500000,
    quotes: [
      {
        id: "mock-quote-1",
        amount_cents: 450000,
        status: "attente",
        profiles: { full_name: "Transit Express CI" }
      },
      {
        id: "mock-quote-2",
        amount_cents: 520000,
        status: "attente",
        profiles: { full_name: "Bolloré Logistics" }
      }
    ]
  },
  {
    id: "COL-1840",
    client_id: "mock",
    title: "Lot de Colis Électroniques",
    origin: "Paris, France",
    destination: "Bamako, Mali via Abidjan",
    status: "port",
    container_id: "MSCU-892019",
    estimated_arrival: "2026-07-12",
    escrow_amount: 450000,
    quotes: []
  }
]

export async function getShipments(): Promise<(Shipment & { quotes?: any[] })[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SHIPMENTS
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('shipments')
    .select(`
      *,
      quotes (
        id,
        amount_cents,
        status,
        profiles ( full_name )
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error || !data || data.length === 0) {
    return MOCK_SHIPMENTS
  }
  
  return data.map(s => ({
    id: s.id,
    client_id: s.client_id,
    transitaire_id: s.transitaire_id,
    title: s.title || s.goods_description || 'Marchandise',
    origin: s.origin || s.origin_country || 'Origine',
    destination: s.destination || s.dest_city || 'Destination',
    status: s.status_v2 === 'cree' ? 'port' : (s.status as Shipment['status'] || 'port'),
    container_id: s.reference || s.container_id,
    estimated_arrival: s.estimated_arrival,
    escrow_amount: 0,
    quotes: s.quotes || []
  }))
}

export async function getShipmentById(id: string): Promise<Shipment | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SHIPMENTS.find(s => s.id === id) || MOCK_SHIPMENTS[0]
  }

  const supabase = await createClient() // Must await createClient() for SSR
  const { data, error } = await supabase.from('shipments').select('*').eq('id', id).single()
  
  if (error || !data) {
    return MOCK_SHIPMENTS.find(s => s.id === id) || MOCK_SHIPMENTS[0]
  }
  
  return {
    id: data.id,
    client_id: data.client_id,
    transitaire_id: data.transitaire_id,
    title: data.title,
    origin: data.origin,
    destination: data.destination,
    status: data.status as Shipment['status'],
    container_id: data.container_id,
    estimated_arrival: data.estimated_arrival,
    escrow_amount: 0
  }
}

