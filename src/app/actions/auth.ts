"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithPhone(formData: FormData): Promise<{error?: string} | void> {
  const phone = formData.get("phone") as string
  if (!phone) {
    return { error: "Numéro de téléphone requis" }
  }

  const formattedPhone = phone.startsWith("+") ? phone : `+223${phone}`

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // SMART BYPASS: Simulation mode
    redirect(`/verify?phone=${encodeURIComponent(formattedPhone)}&simulated=true`)
  } else {
    // Real Supabase Connection
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    })

    if (error) {
      return { error: error.message }
    }
    redirect(`/verify?phone=${encodeURIComponent(formattedPhone)}`)
  }
}

export async function verifyOtp(phone: string, token: string): Promise<{error?: string} | void> {
  if (!phone || !token) {
    return { error: "Numéro et code requis" }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // SMART BYPASS
    redirect(`/register?phone=${encodeURIComponent(phone)}&simulated=true`)
  } else {
    // Real Supabase Check
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })

    if (error) {
      return { error: error.message }
    }
    // Check if profile exists, otherwise go to register
    redirect("/dashboard")
  }
}

export async function completeOnboarding(data: {
  phone: string
  role: "commercant" | "transitaire" | "transporteur" | "chauffeur"
  fullName: string
  companyName?: string
  rccm?: string
  nif?: string
}): Promise<{error?: string} | void> {
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // SMART BYPASS
    redirect("/dashboard")
  } else {
    // Real Supabase Insert
    const supabase = await createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    
    if (userError || !userData.user) return { error: "Utilisateur non authentifié" }

    const { error } = await supabase.from('profiles').insert([
      {
        id: userData.user.id,
        phone: data.phone,
        role: data.role,
        full_name: data.fullName,
      }
    ])

    if (error) return { error: error.message }
    redirect("/dashboard")
  }
}
