"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(data: {
  companyName: string
  phone: string
  address: string
}) {
  const supabase = await createClient()

  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return { success: false, error: "Non autorisé" }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      company_name: data.companyName,
      phone: data.phone,
      address: data.address
    })
    .eq('id', userData.user.id)

  if (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Erreur lors de la mise à jour du profil" }
  }

  revalidatePath('/dashboard/settings')
  return { success: true }
}
