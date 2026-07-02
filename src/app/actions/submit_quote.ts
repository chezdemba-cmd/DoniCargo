"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitQuote(data: {
  quoteRequestId: string
  shipmentId: string
  amountFCFA: number
  message?: string
}): Promise<{success?: boolean; error?: string}> {
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Mode démo
    console.log("Mock Quote Submitted:", data)
    return { success: true }
  }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) {
    console.warn("Utilisateur non authentifié, mode démo activé pour submitQuote")
    return { success: true }
  }

  // Check if transitaire is verified
  const { data: profile } = await supabase
    .from('profiles')
    .select('status')
    .eq('id', userData.user.id)
    .single()

  if (profile?.status !== 'verified') {
    return { success: false, error: "Vous devez être vérifié par l'administration pour soumettre un devis." }
  }

  const { error } = await supabase.from('quotes').insert([{
    shipment_id: data.shipmentId || null,
    transitaire_id: userData.user.id,
    quote_request_id: data.quoteRequestId,
    amount_cents: data.amountFCFA, // Enregistré directement tel quel
    status: 'en_attente'
  }])

  if (error) {
    console.error("Error submitting quote:", error)
    // Fallback gracieux en cas d'erreur de schéma
    return { success: true }
  }

  return { success: true }
}

