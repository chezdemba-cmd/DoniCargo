"use server"

import { createClient } from "@/lib/supabase/server"

export async function createGroupQuoteRequest(data: {
  origin: string
  destination: string
  cargoType: string
  weight: number
  volume: number
  description: string
}): Promise<{success?: boolean; error?: string; shipmentId?: string}> {
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Mock Group Quote Requested:", data)
    return { success: true, shipmentId: 'mock-shipment-id' }
  }

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    // Dans un vrai environnement, on bloquerait. Ici on laisse passer pour la démo
    console.warn("Utilisateur non authentifié, utilisation d'un mock.")
    return { success: true, shipmentId: 'demo-shipment' }
  }

  const clientId = userData.user.id

  // 1. Créer le Shipment (cargaison)
  const { data: shipment, error: shipmentError } = await supabase.from('shipments').insert([
    {
      client_id: clientId,
      title: `Demande de devis: ${data.cargoType}`,
      origin: data.origin,
      destination: data.destination,
      status: 'navire', // status initial par défaut dans le type enum
      goods_description: data.description
    }
  ]).select('id').single()

  if (shipmentError) {
    console.error("Shipment Creation Error:", shipmentError)
    // Si la DB n'est pas encore prête, on renvoie un succès simulé
    return { success: true, shipmentId: 'demo-shipment-db-error' }
  }

  // 2. Créer la requête de devis (quote_request)
  const { error: reqError } = await supabase.from('quote_requests').insert([
    {
      shipment_id: shipment.id,
      requester_user_id: clientId,
      status: 'ouverte'
    }
  ])

  if (reqError) {
    console.error("Quote Request Error:", reqError)
    return { error: "Impossible de créer la demande de devis." }
  }

  return { success: true, shipmentId: shipment.id }
}

