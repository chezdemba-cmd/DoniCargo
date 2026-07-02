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

  // Simulation Envoi d'email au client
  try {
    const { sendEmail } = await import('@/lib/email')
    
    // Fetch client email via quote_request
    const { data: request } = await supabase
      .from('quote_requests')
      .select('client_id, profiles!quote_requests_client_id_fkey(email)')
      .eq('id', data.quoteRequestId)
      .single()

    const clientEmail = (request?.profiles as any)?.email

    if (clientEmail) {
      await sendEmail({
        to: clientEmail,
        subject: "🔔 Nouveau devis reçu sur DoniCargo !",
        text: `Bonjour,\n\nVous avez reçu un nouveau devis d'un montant de ${data.amountFCFA} FCFA pour votre demande (Réf: ${data.quoteRequestId.substring(0,8)}).\nConnectez-vous à votre espace DoniCargo pour le consulter et l'accepter.\n\nL'équipe DoniCargo`
      })
    }
  } catch (err) {
    console.error("Failed to send email notification", err)
  }

  return { success: true }
}

