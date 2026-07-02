import { createClient } from "@/lib/supabase/client"

export interface Transitaire {
  id: string
  name: string
  license: string
  rating: number
  reviews: number
  specialty: string
  destinations: string
  transitTime: string
  priceIndicator: string
  verified: boolean
  description?: string
}

export const MOCK_TRANSITAIRES: Transitaire[] = [
  {
    id: "1",
    name: "Transit Express Côte d'Ivoire",
    license: "Licence Douane N°1280",
    rating: 4.8,
    reviews: 120,
    specialty: "Conteneurs, Véhicules, Vrac",
    destinations: "CI → Mali, CI → Burkina",
    transitTime: "12-15 jours (Abidjan-Bamako)",
    priceIndicator: "Tarifs Compétitifs",
    verified: true,
    description: "Spécialiste de l'axe logistique Côte d'Ivoire - Mali. Nous prenons en charge toutes les étapes du dédouanement à Abidjan jusqu'à la livraison finale à Bamako."
  },
  {
    id: "2",
    name: "Diarra Logistique & Co",
    license: "Licence Douane N°2045",
    rating: 4.6,
    reviews: 84,
    specialty: "Produits Alimentaires, Colisage",
    destinations: "CI → Mali, Sénégal → Mali",
    transitTime: "10-12 jours",
    priceIndicator: "Moyen de gamme",
    verified: true,
    description: "Entreprise familiale spécialisée dans le groupage de colis et le transport de denrées périssables sous température contrôlée."
  },
  {
    id: "3",
    name: "West Africa Forwarding",
    license: "Licence Douane N°0981",
    rating: 4.9,
    reviews: 45,
    specialty: "Matériel Industriel, Hydrocarbures",
    destinations: "CI → Mali, Ghana → Mali",
    transitTime: "14-18 jours",
    priceIndicator: "Premium",
    verified: true,
    description: "Partenaire de confiance des grands comptes miniers et industriels au Mali. Flotte de camions certifiée avec géolocalisation intégrée."
  }
]

export async function getTransitaires(): Promise<Transitaire[]> {
  try {
    const supabase = createClient()
    const { data: dbCompanies, error } = await supabase
      .from('companies')
      .select('*, owner:owner_id(phone, full_name)')
      .eq('company_type', 'transit')

    if (error || !dbCompanies || dbCompanies.length === 0) {
      return MOCK_TRANSITAIRES
    }

    return dbCompanies.map(c => ({
      id: c.id,
      name: c.name,
      license: c.rccm ? `RCCM ${c.rccm}` : (c.agrement_douane || "Agrément officiel"),
      rating: Number(c.rating_score) || 5.0,
      reviews: c.reviews_count || 0,
      specialty: "Général / Tout type",
      destinations: "CI → Mali",
      transitTime: "10-15 jours",
      priceIndicator: "Tarif standard",
      verified: c.kyb_status === 'verifie' || c.rating_score >= 4.0,
      description: c.address || "Aucune description fournie."
    }))
  } catch {
    return MOCK_TRANSITAIRES
  }
}

export async function getTransitaireById(id: string): Promise<Transitaire | null> {
  try {
    const supabase = createClient()
    const { data: company, error } = await supabase
      .from('companies')
      .select('*, owner:owner_id(phone, full_name)')
      .eq('id', id)
      .single()

    if (error || !company) {
      return MOCK_TRANSITAIRES.find(t => t.id === id) || null
    }

    return {
      id: company.id,
      name: company.name,
      license: company.rccm ? `RCCM ${company.rccm}` : (company.agrement_douane || "Agrément officiel"),
      rating: Number(company.rating_score) || 5.0,
      reviews: company.reviews_count || 0,
      specialty: "Général / Tout type",
      destinations: "CI → Mali",
      transitTime: "10-15 jours",
      priceIndicator: "Tarif standard",
      verified: company.kyb_status === 'verifie' || company.rating_score >= 4.0,
      description: company.address || "Aucune description."
    }
  } catch {
    return MOCK_TRANSITAIRES.find(t => t.id === id) || null
  }
}

