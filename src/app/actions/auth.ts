"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function loginWithEmail(formData: FormData): Promise<{error?: string} | void> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email et mot de passe requis" }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }
  
  redirect("/dashboard")
}

export async function completeOnboarding(data: {
  email?: string
  password?: string
  phone: string
  role: "commercant" | "transitaire" | "transporteur" | "chauffeur" | "client"
  fullName: string
  companyName?: string
  rccm?: string
  nif?: string
  agrementDouane?: string
}): Promise<{error?: string} | void> {
  
  const supabase = await createClient()
  
  // 1. Inscription (Sign Up)
  if (!data.email || !data.password) {
    return { error: "Email et mot de passe manquants" }
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (signUpError) return { error: signUpError.message }
  if (!authData.user) return { error: "Erreur lors de la création de l'utilisateur" }

  // 2. Création du Profil
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: authData.user.id,
      email: data.email,
      phone: data.phone,
      role: data.role,
      full_name: data.fullName,
    }
  ])

  if (profileError) return { error: "Erreur création profil: " + profileError.message }

  // 3. Création de l'entreprise (si transitaire ou transporteur)
  if (['transitaire', 'transporteur'].includes(data.role) && data.companyName) {
    const { error: companyError } = await supabase.from('companies').insert([
      {
        profile_id: authData.user.id,
        company_name: data.companyName,
        company_type: data.role === 'transitaire' ? 'transit' : 'transport',
        rccm: data.rccm,
        nif: data.nif,
        agrement_douane: data.agrementDouane,
      }
    ])
    if (companyError) return { error: "Erreur création entreprise: " + companyError.message }
  }

  redirect("/dashboard")
}

