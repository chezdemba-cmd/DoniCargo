"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Package, MapPin, Weight, FileText, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NewShipmentRequest() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    origin: "",
    destination: "",
    container_type: "20ft",
    weight_kg: "",
    description: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError("Vous devez être connecté pour publier une demande.")
      setIsSubmitting(false)
      return
    }

    try {
      const { error: insertError } = await supabase.from('quote_requests').insert([
        {
          client_id: user.id,
          title: formData.title,
          origin: formData.origin,
          destination: formData.destination,
          container_type: formData.container_type,
          weight_kg: parseInt(formData.weight_kg) || null,
          description: formData.description,
          status: 'ouvert'
        }
      ])

      if (insertError) throw insertError

      // Redirect back to shipments or a specific requests page
      router.push('/dashboard/shipments')
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la création de la demande.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/shipments" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Nouvelle demande d'expédition</h1>
          <p className="text-slate-500 text-sm">Publiez votre besoin pour recevoir des devis de transitaires agréés.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-start gap-2.5 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-500" />
                Titre de la demande *
              </label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Conteneur de pièces automobiles"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Ville de départ *
              </label>
              <input 
                type="text" 
                required
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
                placeholder="Ex: Shanghai, Chine"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Ville d'arrivée *
              </label>
              <input 
                type="text" 
                required
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
                placeholder="Ex: Bamako, Mali"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                Type de conteneur *
              </label>
              <select 
                value={formData.container_type}
                onChange={e => setFormData({...formData, container_type: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white"
              >
                <option value="20ft">Conteneur 20 pieds</option>
                <option value="40ft">Conteneur 40 pieds</option>
                <option value="40hc">Conteneur 40 pieds HC</option>
                <option value="LCL">Groupage (LCL)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Weight className="w-4 h-4 text-slate-400" />
                Poids estimé (kg)
              </label>
              <input 
                type="number" 
                value={formData.weight_kg}
                onChange={e => setFormData({...formData, weight_kg: e.target.value})}
                placeholder="Ex: 15000"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Description supplémentaire
              </label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Détails sur la marchandise, exigences particulières..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Publication...</>
              ) : (
                "Publier ma demande"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
