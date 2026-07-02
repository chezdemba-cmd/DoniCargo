import { createClient } from "@/lib/supabase/server"
import SettingsClient from "./settings-client"

export const metadata = {
  title: "Paramètres | DoniCargo",
}

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()
  
  if (!userData?.user) {
    return <div>Non autorisé</div>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('company_name, phone, address, status')
    .eq('id', userData.user.id)
    .single()

  return <SettingsClient initialProfile={profile as any} />
}
