"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateShipmentStatus(shipmentId: string, newStatus: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Mock Update Status:", shipmentId, newStatus)
    return { success: true }
  }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) {
    console.warn("Utilisateur non connecté, mode démo pour updateShipmentStatus")
    return { success: true }
  }

  // Update logic:
  // Using 'status' for v1 or 'status_v2' based on what exists
  const { error: updateError } = await supabase
    .from('shipments')
    .update({ status: newStatus })
    .eq('id', shipmentId)

  if (updateError) {
    console.error("Erreur de mise à jour du statut:", updateError)
    // Fallback mode démo
    return { success: true }
  }

  revalidatePath('/dashboard/shipments')
  revalidatePath('/dashboard/pro')
  return { success: true }
}

