import { createClient } from "@/lib/supabase/server"

export interface Shipment {
  id: string
  user_id: string
  transitaire_id?: string
  title: string
  origin: string
  destination: string
  status: 'navire' | 'port' | 'douane' | 'route' | 'livre'
  container_id?: string
  estimated_arrival?: string
  escrow_amount?: number
}

// Mock Fallback Data
const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "HLX-9029",
    user_id: "mock",
    title: "Conteneur de Pièces Détachées",
    origin: "Shanghai, Chine",
    destination: "Bamako, Mali via Abidjan",
    status: "douane",
    container_id: "HLX-9029",
    estimated_arrival: "2026-07-05",
    escrow_amount: 1500000
  },
  {
    id: "COL-1840",
    user_id: "mock",
    title: "Lot de Colis Électroniques",
    origin: "Paris, France",
    destination: "Bamako, Mali via Abidjan",
    status: "port",
    container_id: "MSCU-892019",
    estimated_arrival: "2026-07-12",
    escrow_amount: 450000
  }
]

export async function getShipments(): Promise<Shipment[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SHIPMENTS
  }

  const supabase = await createClient()
  const { data, error } = await supabase.from('shipments').select('*')
  
  if (error) {
    console.error("Error fetching shipments:", error)
    return MOCK_SHIPMENTS // Fallback to mock if DB table doesn't exist yet
  }
  
  return data as Shipment[]
}

export async function getShipmentById(id: string): Promise<Shipment | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SHIPMENTS.find(s => s.id === id) || MOCK_SHIPMENTS[0]
  }

  const supabase = createClient()
  const { data, error } = await supabase.from('shipments').select('*').eq('id', id).single()
  
  if (error || !data) {
    return MOCK_SHIPMENTS.find(s => s.id === id) || MOCK_SHIPMENTS[0]
  }
  
  return data as Shipment
}
