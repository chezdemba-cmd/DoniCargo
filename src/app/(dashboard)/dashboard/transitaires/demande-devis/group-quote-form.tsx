"use client"

import { useState, useTransition } from "react"
import { createGroupQuoteRequest } from "@/app/actions/quote_requests"
import { RefreshCw, AlertCircle, CheckCircle, Upload, Globe } from "lucide-react"
import Link from "next/link"

export default function GroupQuoteForm() {
  const [origin, setOrigin] = useState("Port d'Abidjan")
  const [destination, setDestination] = useState("Bamako (Guichet Unique)")
  const [cargoType, setCargoType] = useState("Général")
  const [weight, setWeight] = useState("")
  const [volume, setVolume] = useState("")
  const [description, setDescription] = useState("")
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!weight || Number(weight) <= 0) {
      setError("Veuillez renseigner un poids valide (supérieur à 0)")
      return
    }

    if (!description) {
      setError("Veuillez décrire brièvement la marchandise")
      return
    }

    startTransition(async () => {
      const res = await createGroupQuoteRequest({
        origin,
        destination,
        cargoType,
        weight: Number(weight),
        volume: Number(volume) || 0,
        description
      })

      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(true)
      }
    })
  }

  if (success) {
    return (
      <div className="p-8 text-center bg-orange-50/50 border border-orange-100 rounded-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-800">Demande diffusée avec succès !</h4>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mt-2">
            Votre appel d&apos;offres a été envoyé à tous les transitaires certifiés sur l&apos;axe {origin} ➔ {destination}. Vous recevrez leurs devis dans votre espace.
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/dashboard" className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Retour au tableau de bord
          </Link>
          <Link href="/dashboard/pro" className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800">
            Voir côté Transitaire (Démo)
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-semibold flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Axis Information */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-orange-600" />
          <h3 className="text-sm font-bold text-slate-800">Axe Logistique</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origin" className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Lieu de chargement *</label>
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              disabled={isPending}
              className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Destination Finale *</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              disabled={isPending}
              className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Cargo Details */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Détails de la marchandise</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="cargoType" className="block text-xs font-semibold text-slate-500 mb-2">Type de cargaison</label>
            <select
              id="cargoType"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              disabled={isPending}
              className="block w-full border border-slate-200 bg-white rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
            >
              <option value="Général">Général (Dry)</option>
              <option value="Frigo">Frigorifique</option>
              <option value="Véhicule">Véhicule (RORO)</option>
              <option value="Dangereux">Matières Dangereuses</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight" className="block text-xs font-semibold text-slate-500 mb-2">Poids total (kg) *</label>
            <input
              type="number"
              id="weight"
              placeholder="Ex: 12000"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              disabled={isPending}
              className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="volume" className="block text-xs font-semibold text-slate-500 mb-2">Volume (m³)</label>
            <input
              type="number"
              id="volume"
              placeholder="Ex: 35"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              disabled={isPending}
              className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-semibold text-slate-500 mb-2">Description des marchandises *</label>
          <textarea
            id="description"
            placeholder="Ex: 20 palettes de pièces automobiles détachées, non fragiles..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isPending}
            className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Bill of Lading / Invoice Upload Simulation */}
      <div className="border border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50/50 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-orange-600 mb-3 shadow-sm">
          <Upload className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Documents d&apos;accompagnement</h4>
        <p className="text-xs text-slate-500 max-w-sm mb-4">
          Ajoutez une facture proforma ou un connaissement (BL) pour obtenir des devis plus précis.
        </p>
        <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm">
          Parcourir les fichiers
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5"
      >
        {isPending ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          "Diffuser ma demande à tous les transitaires"
        )}
      </button>
    </form>
  )
}

