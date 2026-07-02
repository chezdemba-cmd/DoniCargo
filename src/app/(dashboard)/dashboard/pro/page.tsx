import { createClient } from "@/lib/supabase/server"
import ProClient from "./pro-client"

export default async function TransitaireDashboardPage() {
  const supabase = await createClient()
  
  // Fetch real quote_requests that are open
  const { data: requests } = await supabase
    .from('quote_requests')
    .select(`
      id,
      status,
      created_at,
      shipments (
        id,
        title,
        origin,
        destination,
        goods_description
      ),
      profiles (
        full_name
      )
    `)
    .eq('status', 'ouverte')
    .order('created_at', { ascending: false })
    .limit(10)

  // Mapping to format the component expects
  const formattedQuotes = (requests || []).map((req: any) => ({
    id: req.id.substring(0, 8).toUpperCase(),
    quote_request_id: req.id,
    shipment_id: req.shipments?.id,
    client: req.profiles?.full_name || "Client Anonyme",
    cargo: req.shipments?.title || req.shipments?.goods_description || "Marchandise diverse",
    route: `${req.shipments?.origin || 'Origine'} → ${req.shipments?.destination || 'Destination'}`,
    date: new Date(req.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
    status: req.status
  }))

  // For active dossiers, we'd normally fetch quotes with status 'accepte'
  // But we'll leave it empty to trigger the mock in the client for now, 
  // or fetch real ones if needed.
  const dossiers: any[] = []

  return <ProClient initialQuotes={formattedQuotes} initialDossiers={dossiers} />
}

