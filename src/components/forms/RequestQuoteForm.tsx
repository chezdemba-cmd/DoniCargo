"use client"

import { useState, useTransition } from "react"
import { requestQuote } from "@/app/actions/quotes"
import { RefreshCw, AlertCircle, CheckCircle, Upload } from "lucide-react"

interface RequestQuoteFormProps {
  transitaireId: string
  transitaireName: string
}

export default function RequestQuoteForm({ transitaireId, transitaireName }: RequestQuoteFormProps) {
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
      const res = await requestQuote({
        transitaireId,
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
      <div className="p-8 text-center bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800">Demande de devis soumise !</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          Votre demande a été envoyée avec succès à **{transitaireName}**. Vous serez notifié dès qu'un montant estimatif aura été proposé.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-start gap-2.5 border border-red-100">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Origin & Destination */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="origin" className="block text-xs font-semibold text-slate-500 mb-2">Lieu de chargement (Origine) *</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            disabled={isPending}
            className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-xs font-semibold text-slate-500 mb-2">Lieu de livraison (Destination) *</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            disabled={isPending}
            className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Cargo Type & Specs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cargoType" className="block text-xs font-semibold text-slate-500 mb-2">Type de cargaison</label>
          <select
            id="cargoType"
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
            disabled={isPending}
            className="block w-full border border-slate-200 bg-white rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
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
            className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
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
            className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-semibold text-slate-500 mb-2">Description des marchandises *</label>
        <textarea
          id="description"
          placeholder="Ex: 20 palettes de riz blanc parfumé de 50kg..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isPending}
          className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>

      {/* Bill of Lading / Invoice Upload Simulation */}
      <div className="border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50">
        <label className="block text-xs font-semibold text-slate-500 mb-2">Facture d'achat fournisseur (Optionnel)</label>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold">
            <Upload className="w-4 h-4" />
            Téléverser la facture
          </div>
          <span className="text-[10px] text-slate-400">PDF, PNG, JPG (Max 5Mo)</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        {isPending ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          "Soumettre ma demande de devis"
        )}
      </button>
    </form>
  )
}
