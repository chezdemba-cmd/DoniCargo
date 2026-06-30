import { createClient } from "@/lib/supabase/client"

export interface CargoDocument {
  id: string
  name: string
  type: string
  size: string
  date: string
  status: 'Verified' | 'Pending' | 'Warning'
  aiSummary: string
}

const MOCK_DOCUMENTS: CargoDocument[] = [
  {
    id: "doc-1",
    name: "Connaissement_BL_HLX9029.pdf",
    type: "Connaissement (BL)",
    size: "2.4 MB",
    date: "24 Juin 2026",
    status: "Verified",
    aiSummary: "N° Connaissement : HLX-9029, Port d'embarquement : Shanghai, Port de déchargement : Abidjan, Poids : 22,400 kg"
  },
  {
    id: "doc-2",
    name: "Facture_Commerciale_SH2026.pdf",
    type: "Facture Commerciale",
    size: "1.1 MB",
    date: "25 Juin 2026",
    status: "Verified",
    aiSummary: "Montant Total : $42,500 USD, Fournisseur : Shanghai Silk Trading, Devise : USD"
  },
  {
    id: "doc-3",
    name: "Certificat_Origine_CO98.pdf",
    type: "Certificat d'Origine",
    size: "890 KB",
    date: "25 Juin 2026",
    status: "Pending",
    aiSummary: "En cours de lecture automatique par l'IA..."
  },
  {
    id: "doc-4",
    name: "Quittance_Douane_CI_208.pdf",
    type: "Note de Frais Douane",
    size: "3.2 MB",
    date: "28 Juin 2026",
    status: "Warning",
    aiSummary: "Attention : Écart détecté de 5% sur le calcul de la TVA douanière par rapport à la facture."
  }
]

export async function getDocuments(shipmentId?: string): Promise<CargoDocument[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('documents')
      .select('*')

    if (error || !data || data.length === 0) {
      return MOCK_DOCUMENTS
    }

    return data.map(doc => ({
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: "1.5 MB",
      date: new Date(doc.created_at).toLocaleDateString(),
      status: doc.is_verified_by_ai ? 'Verified' : 'Pending',
      aiSummary: doc.ai_extracted_data ? JSON.stringify(doc.ai_extracted_data) : "Aucune analyse IA disponible."
    }))
  } catch {
    return MOCK_DOCUMENTS
  }
}
