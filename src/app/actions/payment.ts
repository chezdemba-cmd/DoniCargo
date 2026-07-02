"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function processMockPayment(shipmentId: string, amount: number) {
  const supabase = await createClient()

  // Dans un cas réel, ceci appellerait l'API de Stripe ou Paystack.
  // Pour le MVP, on valide le paiement directement.
  
  // 1. Mettre à jour le statut du conteneur
  const { error } = await supabase
    .from('shipments')
    .update({ 
      status_v2: 'paye',
      escrow_amount: amount
    })
    .eq('id', shipmentId)

  if (error) {
    return { error: "Erreur lors de la sécurisation des fonds: " + error.message }
  }

  // 2. Revalider les pages
  revalidatePath('/dashboard/shipments')
  revalidatePath('/dashboard/escrow/payment')

  return { success: true }
}
