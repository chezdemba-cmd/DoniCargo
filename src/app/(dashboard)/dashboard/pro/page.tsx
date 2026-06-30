"use client"

import { useState } from "react"
import { Briefcase, FileText, CheckCircle, Clock, Truck, Shield, AlertCircle, X, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TransitaireDashboard() {
  const [activeTab, setActiveTab] = useState<"devis" | "dossiers">("devis")
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [proposedAmount, setProposedAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Mock Quotes Received
  const quotes = [
    {
      id: "QT-1092",
      client: "Amadou Diallo",
      cargo: "20 palettes de riz blanc (Général)",
      route: "Abidjan → Bamako",
      date: "Aujourd'hui, 09:30",
      status: "pending"
    },
    {
      id: "QT-1088",
      client: "Sogem S.A.",
      cargo: "Pièces détachées industrielles",
      route: "Dakar → Bamako",
      date: "Hier, 14:15",
      status: "pending"
    }
  ]

  // Mock Active Shipments
  const dossiers = [
    {
      id: "HLX-9029",
      client: "Sogem S.A.",
      route: "Shanghai → Bamako",
      status: "Douane (Abidjan)",
      nextAction: "Payer quittance douane",
      escrow: "1 500 000 FCFA"
    }
  ]

  const handleOpenModal = (quote: any) => {
    setSelectedQuote(quote)
    setIsSuccess(false)
    setProposedAmount("")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedQuote(null)
      setIsSuccess(false)
    }, 300)
  }

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      // Optional: auto-close after success
      setTimeout(() => {
        handleCloseModal()
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-8 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Espace Professionnel</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez vos demandes de devis et suivez l'avancement de vos dossiers logistiques.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5 inline" />
            Profil Vérifié (KYB)
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Devis en attente</p>
              <h3 className="text-2xl font-bold text-slate-800">{quotes.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Dossiers actifs</p>
              <h3 className="text-2xl font-bold text-slate-800">{dossiers.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Fonds sous séquestre</p>
              <h3 className="text-2xl font-bold text-slate-800">1.5M FCFA</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("devis")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "devis" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Nouvelles demandes ({quotes.length})
        </button>
        <button 
          onClick={() => setActiveTab("dossiers")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "dossiers" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Dossiers en cours ({dossiers.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "devis" ? (
          <div className="space-y-4">
            {quotes.map(q => (
              <Card key={q.id} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 text-[10px]">Nouveau</Badge>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> {q.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800">{q.cargo}</h4>
                    <p className="text-sm text-slate-500">Client: <span className="font-semibold text-slate-700">{q.client}</span> • Trajet: <span className="font-semibold text-slate-700">{q.route}</span></p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                      Refuser
                    </button>
                    <button 
                      onClick={() => handleOpenModal(q)}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Proposer un prix
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {dossiers.map(d => (
              <Card key={d.id} className="border-slate-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-slate-900 text-white text-[10px]">{d.id}</Badge>
                        <span className="text-xs font-semibold text-emerald-600">{d.status}</span>
                      </div>
                      <h4 className="font-bold text-slate-800">{d.route}</h4>
                      <p className="text-xs text-slate-500">Client: {d.client}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs text-slate-400">Escrow garanti</p>
                      <p className="font-bold text-slate-800">{d.escrow}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-semibold text-slate-700">Action requise :</span>
                      <span className="text-xs text-slate-600">{d.nextAction}</span>
                    </div>
                    <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Gérer le dossier →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Proposer un prix</h3>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in slide-in-from-bottom-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Proposition envoyée !</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Le client a été notifié de votre offre. Il vous contactera s'il l'accepte.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-6">
                  {selectedQuote && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Récapitulatif de la demande</p>
                      <p className="text-sm text-slate-700 font-medium">{selectedQuote.cargo}</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedQuote.route} • {selectedQuote.client}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Prix proposé (FCFA)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        required
                        value={proposedAmount}
                        onChange={(e) => setProposedAmount(e.target.value)}
                        className="w-full pl-4 pr-16 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="Ex: 500000"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">FCFA</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message au client (Optionnel)</label>
                    <textarea 
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all min-h-[100px] resize-none"
                      placeholder="Précisez vos conditions (ex: Inclut les frais de magasinage)..."
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer l'offre
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
