"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadDocumentAction(data: {
  shipmentId: string
  name: string
  docType: string
  fileUrl: string // Mocked file URL for now
  sizeBytes: number
}) {
  const supabase = await createClient()

  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    return { success: false, error: "Non autorisé" }
  }

  // Ensure user is the transitaire for this shipment, or admin
  const { data: shipment, error: shipError } = await supabase
    .from('shipments')
    .select('transitaire_id')
    .eq('id', data.shipmentId)
    .single()

  if (shipError || !shipment) {
    return { success: false, error: "Expédition introuvable" }
  }

  // For MVP, we'll allow transitaire to upload. We could also allow admin.
  if (shipment.transitaire_id !== userData.user.id) {
    // Check if admin
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', userData.user.id).single()
    if (profile?.role !== 'admin') {
      return { success: false, error: "Vous n'êtes pas autorisé à uploader pour ce conteneur." }
    }
  }

  const { error } = await supabase.from('documents').insert([{
    shipment_id: data.shipmentId,
    uploaded_by: userData.user.id,
    name: data.name,
    doc_type: data.docType,
    file_url: data.fileUrl,
    size_bytes: data.sizeBytes,
    status: 'Vérifié'
  }])

  if (error) {
    console.error("Error uploading document:", error)
    return { success: false, error: "Erreur lors de l'enregistrement du document" }
  }

  revalidatePath('/dashboard/documents')
  revalidatePath('/dashboard/shipments')
  
  return { success: true }
}
