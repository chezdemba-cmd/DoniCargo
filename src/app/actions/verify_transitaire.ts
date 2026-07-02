"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function verifyTransitaireAction(transitaireId: string, status: 'verified' | null) {
  const supabase = await createClient()

  // Ensure current user is admin
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return { success: false, error: "Non autorisé" }
  }

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (adminProfile?.role !== 'admin') {
    return { success: false, error: "Accès refusé. Privilèges administrateur requis." }
  }

  // Update transitaire profile status
  const { error } = await supabase
    .from('profiles')
    .update({ status: status })
    .eq('id', transitaireId)

  if (error) {
    console.error("Erreur lors de la vérification:", error)
    return { success: false, error: "Erreur lors de la mise à jour du statut." }
  }

  revalidatePath('/dashboard/admin')
  
  return { success: true }
}
