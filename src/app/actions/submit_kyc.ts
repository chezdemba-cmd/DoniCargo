"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitKycAction() {
  const supabase = await createClient()

  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return { success: false, error: "Non autorisé" }
  }

  // Update status to pending only if it's not already verified
  const { data: profile } = await supabase.from('profiles').select('status').eq('id', userData.user.id).single()

  if (profile?.status === 'verified') {
    return { success: false, error: "Votre compte est déjà vérifié." }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ status: 'pending' })
    .eq('id', userData.user.id)

  if (error) {
    console.error("Error submitting KYC:", error)
    return { success: false, error: "Erreur lors de la soumission" }
  }

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard/admin')
  
  return { success: true }
}
