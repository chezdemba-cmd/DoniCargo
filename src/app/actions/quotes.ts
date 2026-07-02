"use server"

import { createClient } from "@/lib/supabase/server"

export async function requestQuote(data: {
  transitaireId: string
  origin: string
  destination: string
  cargoType: string
  weight: number
  volume: number
  description: string
}): Promise<{success?: boolean; error?: string}> {
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // SMART BYPASS
    console.log("Mock Quote Requested:", data)
    return { success: true }
  }

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return { error: "Non autorisé" }
  }

  const { error } = await supabase.from('quotes').insert([
    {
      client_id: userData.user.id,
      transitaire_id: data.transitaireId,
      cargo_details: data.cargoType + " / " + data.description,
      origin: data.origin,
      destination: data.destination,
      status: 'pending'
    }
  ])

  if (error) {
    console.error("Quote Error:", error)
    return { error: error.message }
  }

  return { success: true }
}

