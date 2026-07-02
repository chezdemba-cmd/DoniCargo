"use client"

import { useState } from "react"
import { Briefcase, FileText, CheckCircle, Clock, Shield, AlertCircle, X, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { submitQuote } from "@/app/actions/submit_quote"

export interface QuoteRequest {
  id: string;
  quote_request_id?: string;
  shipment_id?: string;
  client?: string;
  cargo?: string;
  route?: string;
  date?: string;
  status?: string;
}

export interface Dossier {
  id: string;
  client?: string;
  route?: string;
  status?: string;
  nextAction?: string;
  escrow?: string;
}

export default function ProClient({ initialQuotes, initialDossiers }: { initialQuotes: QuoteRequest[], initialDossiers: Dossier[] }) {
  const [activeTab, setActiveTab] = useState<"devis" | "dossiers">("devis")
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [proposedAmount, setProposedAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Status Modal State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null)
  const [newStatus, setNewStatus] = useState("douane")

  // Utilisation des données réelles ou du mock s'il n'y a rien
  const quotes = initialQuotes.length > 0 ? initialQuotes : [
    {
      id: "QT-1092",
      quote_request_id: "demo-req-1",
      shipment_id: "demo-ship-1",
      client: "Amadou Diallo",
      cargo: "20 palettes de riz blanc (Général)",
      route: "Abidjan → Bamako",
      date: "Aujourd'hui, 09:30",
      status: "pending"
    },
    {
      id: "QT-1088",
      quote_request_id: "demo-req-2",
      shipment_id: "demo-ship-2",
      client: "Sogem S.A.",
      cargo: "Pièces détachées industrielles",
      route: "Dakar → Bamako",
      date: "Hier, 14:15",
      status: "pending"
    }
  ]

  const dossiers = initialDossiers.length > 0 ? initialDossiers : [
    {
      id: "HLX-9029",
      client: "Sogem S.A.",
      route: "Shanghai → Bamako",
      status: "Douane (Abidjan)",
      nextAction: "Payer quittance douane",
      escrow: "1 500 000 FCFA"
    }
  ]

  const handleOpenModal = (quote: QuoteRequest) => {
    setSelectedQuote(quote)
    setIsSuccess(false)
    setProposedAmount("")
    setMessage("")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedQuote(null)
      setIsSuccess(false)
    }, 300)
  }

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (!selectedQuote) {
      setIsSubmitting(false)
      return
    }

    await submitQuote({
      quoteRequestId: selectedQuote.quote_request_id || selectedQuote.id,
      shipmentId: selectedQuote.shipment_id || "",
      amountFCFA: Number(proposedAmount),
      message: message
    })

    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      handleCloseModal()
    }, 2500)
  }

  return (
    <div className="space-y-8 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Espace Professionnel</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez vos demandes de devis et suivez l&apos;avancement de vos dossiers logistiques.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5 inline" />
            Profil Vérifié (KYB)
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-100 shadow-sm hover:border-orange-200 transition-colors cursor-default">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Devis en attente</p>
              <h3 className="text-2xl font-bold text-slate-800">{quotes.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm hover:border-orange-200 transition-colors cursor-default">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Dossiers actifs</p>
              <h3 className="text-2xl font-bold text-slate-800">{dossiers.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm hover:border-orange-200 transition-colors cursor-default">
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
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "devis" ? "border-orange-600 text-orange-700" : "border-transparent text-slate-500 hover:text-orange-600"}`}
        >
          Nouvelles demandes ({quotes.length})
        </button>
        <button 
          onClick={() => setActiveTab("dossiers")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "dossiers" ? "border-orange-600 text-orange-700" : "border-transparent text-slate-500 hover:text-orange-600"}`}
        >
          Dossiers en cours ({dossiers.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "devis" ? (
          <div className="space-y-4">
            {quotes.map(q => (
              <Card key={q.id} className="border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 text-[10px]">Nouveau</Badge>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> {q.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800">{q.cargo}</h4>
                    <p className="text-sm text-slate-500">Client: <span className="font-semibold text-slate-700">{q.client}</span> • Trajet: <span className="font-semibold text-slate-700">{q.route}</span></p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                      Ignorer
                    </button>
                    <button 
                      onClick={() => handleOpenModal(q)}
                      className="flex-1 md:flex-none px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-sm hover:shadow-orange-500/20"
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
              <Card key={d.id} className="border-slate-100 shadow-sm hover:border-orange-200 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-slate-900 text-white text-[10px]">{d.id}</Badge>
                        <span className="text-xs font-semibold text-orange-600">{d.status}</span>
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
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-slate-700">Action requise :</span>
                      <span className="text-xs text-slate-600">{d.nextAction}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedDossier(d);
                        setNewStatus('douane');
                        setIsStatusModalOpen(true);
                      }}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Mettre à jour le statut →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de mise à jour de statut */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Mettre à jour le statut</h3>
              <button onClick={() => setIsStatusModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const { updateShipmentStatus } = await import('@/app/actions/update_shipment_status');
                if (selectedDossier?.id) {
                  await updateShipmentStatus(selectedDossier.id, newStatus);
                }
                setIsSubmitting(false);
                setIsStatusModalOpen(false);
                alert('Statut mis à jour ! Le client a été notifié.');
              }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nouvelle étape logistique</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                  >
                    <option value="navire">🚢 En mer (Navire)</option>
                    <option value="port">🏗️ Arrivé au Port</option>
                    <option value="douane">📑 En Dédouanement</option>
                    <option value="route">🚚 Sur la Route</option>
                    <option value="livre">✅ Livré au Client</option>
                  </select>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md">
                  {isSubmitting ? 'Mise à jour...' : 'Confirmer'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Proposer un devis</h3>
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
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Offre transmise !</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Le client a été notifié de votre proposition. Vous serez alerté s&apos;il accepte le devis.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-6">
                  {selectedQuote && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Récapitulatif</p>
                      <p className="text-sm text-slate-800 font-bold">{selectedQuote.cargo}</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedQuote.route} • {selectedQuote.client}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Votre tarif (FCFA)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        required
                        value={proposedAmount}
                        onChange={(e) => setProposedAmount(e.target.value)}
                        className="w-full pl-4 pr-16 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all shadow-sm"
                        placeholder="Ex: 500000"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">FCFA</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message au client (Optionnel)</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all min-h-[100px] resize-none shadow-sm"
                      placeholder="Précisez vos conditions de transport et d'assurance..."
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
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer l&apos;offre
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

