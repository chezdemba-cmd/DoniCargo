"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Star, CheckCircle, ArrowRight, MessageSquare, Filter, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Transitaire } from "@/services/transitaires"

export default function TransitairesClient({ initialData }: { initialData: Transitaire[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAxis, setSelectedAxis] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")

  // Use useMemo instead of useEffect to derive state directly.
  // This avoids double rendering and is much more efficient.
  const filteredTransitaires = useMemo(() => {
    return initialData.filter((t) => {
      const query = searchTerm.toLowerCase()
      const matchesSearch =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.license.toLowerCase().includes(query) ||
        t.specialty.toLowerCase().includes(query)

      const matchesAxis = selectedAxis === "all" || t.destinations.includes(selectedAxis)

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        t.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())

      return matchesSearch && matchesAxis && matchesSpecialty
    })
  }, [initialData, searchTerm, selectedAxis, selectedSpecialty])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Marketplace des Transitaires</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comparez et collaborez avec des transitaires professionnels agréés douane (KYB validés).
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm inline-flex items-center gap-2 transition-colors">
          Demande de Devis Groupé
        </button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, agrément, spécialité..."
            className="pl-10 pr-4 py-2 w-full text-sm border-slate-200 outline-none"
            aria-label="Rechercher un transitaire"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={selectedAxis}
            onChange={(e) => setSelectedAxis(e.target.value)}
            className="border border-slate-200 rounded-lg text-xs py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white font-medium text-slate-700 flex-1 md:flex-initial"
            aria-label="Sélectionner l'axe"
          >
            <option value="all">Tous les axes</option>
            <option value="CI">Départ Côte d'Ivoire (CI)</option>
            <option value="Mali">Arrivée Mali</option>
          </select>

          <select 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="border border-slate-200 rounded-lg text-xs py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white font-medium text-slate-700 flex-1 md:flex-initial"
            aria-label="Sélectionner la spécialité"
          >
            <option value="all">Toutes spécialités</option>
            <option value="Conteneur">Conteneurs</option>
            <option value="Véhicule">Véhicules</option>
            <option value="Alimentaire">Produits Alimentaires</option>
          </select>
          
          <button 
            className="border border-slate-200 hover:bg-slate-50 p-2 rounded-lg transition-colors"
            aria-label="Filtres avancés"
          >
            <Filter className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </Card>

      {/* Grid List Transitaires */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTransitaires.map((item) => (
          <Card key={item.id} className="border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6">
            <div className="space-y-4">
              {/* Header Profile */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200 shrink-0">
                  {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                {item.verified && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 text-[10px] px-2 py-0.5 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Vérifié KYB
                  </Badge>
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.license}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-800">{item.rating}</span>
                  <span className="text-[10px] text-slate-400">({item.reviews} avis)</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Spécialité :</span>
                  <span className="font-semibold text-slate-700 text-right">{item.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destinations :</span>
                  <span className="font-semibold text-slate-700 text-right">{item.destinations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Délai estimé :</span>
                  <span className="font-semibold text-emerald-600 text-right">{item.transitTime}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
              <Link 
                href={`/dashboard/transitaires/${item.id}`}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                Voir Profil & Devis
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button 
                className="border border-slate-200 hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
                aria-label="Envoyer un message"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </Card>
        ))}
        {filteredTransitaires.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400 text-sm font-medium bg-white rounded-2xl border border-dashed border-slate-200">
            Aucun transitaire ne correspond à vos critères de recherche.
          </div>
        )}
      </div>
    </div>
  )
}
