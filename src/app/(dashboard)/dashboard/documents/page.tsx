import { createClient } from "@/lib/supabase/server"
import DocumentsVaultClient from "./documents-client"

export const metadata = {
  title: "Documents | DoniCargo",
}

export default async function DocumentsVaultPage() {
  const supabase = await createClient()

  // We rely on RLS policies to only fetch documents the user has access to
  const { data: documents } = await supabase
    .from('documents')
    .select(`
      id,
      name,
      doc_type,
      file_url,
      size_bytes,
      status,
      created_at,
      shipments (
        container_id
      )
    `)
    .order('created_at', { ascending: false })

  const formattedDocuments = (documents || []).map(doc => {
    const ship: any = Array.isArray(doc.shipments) ? doc.shipments[0] : doc.shipments;
    return {
      id: doc.id,
      name: doc.name,
      doc_type: doc.doc_type,
      file_url: doc.file_url,
      size_bytes: doc.size_bytes || 0,
      status: doc.status || 'Vérifié',
      date: new Date(doc.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      shipment: ship?.container_id ? `CONTENEUR #${ship.container_id}` : 'Conteneur Inconnu'
    }
  })

  return <DocumentsVaultClient documents={formattedDocuments as any} />
}
