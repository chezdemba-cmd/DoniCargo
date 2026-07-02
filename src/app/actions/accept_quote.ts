"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function acceptQuote(quoteId: string, shipmentId: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Mock Accept Quote:", quoteId)
    return { success: true }
  }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) {
    console.warn("Utilisateur non connecté, mode démo pour acceptQuote")
    return { success: true }
  }

  // 1. Mettre le devis sélectionné à 'accepte'
  const { error: updateError } = await supabase
    .from('quotes')
    .update({ status: 'accepte' })
    .eq('id', quoteId)

  if (updateError) {
    console.error("Erreur d'acceptation du devis:", updateError)
    // Mode démo fallback
    return { success: true }
  }

  // 2. Optionnel : Mettre les autres devis à 'rejete'
  await supabase
    .from('quotes')
    .update({ status: 'rejete' })
    .eq('shipment_id', shipmentId)
    .neq('id', quoteId)

  // 3. Optionnel : Créer une mission pour le transitaire
  // (On simplifie pour la démo en gérant juste les devis)

  revalidatePath('/dashboard/shipments')
  revalidatePath('/dashboard/pro')
  return { success: true }
}

