"use client"

import { useState } from "react"
import { CheckCircle, CreditCard, Smartphone, X } from "lucide-react"
import { acceptQuoteAction } from "@/app/actions/accept_quote"

interface Quote {
  id: string
  amount_cents: number
  status: string
  transitaire_id: string
  profiles?: { full_name: string } | null
}

export function QuoteList({ quotes, quoteRequestId }: { quotes: Quote[], quoteRequestId: string }) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('mobile')

  const openPaymentModal = (quote: Quote) => {
    setSelectedQuote(quote)
    setIsModalOpen(true)
  }

  const handlePayment = async () => {
    if (!selectedQuote) return
    
    setIsProcessing(true)
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Call server action to update DB
    const result = await acceptQuoteAction(selectedQuote.id, quoteRequestId)
    
    setIsProcessing(false)
    setIsModalOpen(false)
    
    if (result.success) {
      alert("Paiement validé avec succès ! L'expédition a été créée dans 'Mes Conteneurs'.")
      window.location.href = "/dashboard/shipments"
    } else {
      alert("Erreur lors du paiement: " + result.error)
    }
  }

  if (!quotes || quotes.length === 0) {
    return (
      <div className="p-3 text-sm text-slate-500 bg-slate-50 italic text-center">
        Aucun devis reçu pour le moment.
      </div>
    )
  }

  // Si un devis est déjà accepté pour cette requête
  const acceptedQuote = quotes.find(q => q.status === 'accepte')
  if (acceptedQuote) {
    return (
      <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm font-bold text-emerald-800">Devis accepté : {(acceptedQuote.amount_cents / 100).toLocaleString()} FCFA</p>
          <p className="text-xs text-emerald-600">Transitaire : {acceptedQuote.profiles?.full_name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b border-slate-100 bg-slate-50 p-4">
      <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Devis reçus ({quotes.length})</h4>
      <div className="space-y-2">
        {quotes.map(quote => (
          <div key={quote.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <div>
              <p className="text-sm font-bold text-slate-800">{(quote.amount_cents / 100).toLocaleString()} FCFA</p>
              <p className="text-xs text-slate-500">{quote.profiles?.full_name || 'Transitaire'}</p>
            </div>
            <button 
              onClick={() => openPaymentModal(quote)}
              className="bg-slate-900 hover:bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors"
            >
              Accepter & Payer
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedQuote && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Sécuriser les fonds (Escrow)</h3>
              <button onClick={() => !isProcessing && setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-1">Montant à sécuriser</p>
                <h2 className="text-3xl font-black text-slate-800">{(selectedQuote.amount_cents / 100).toLocaleString()} FCFA</h2>
                <p className="text-xs text-slate-400 mt-2">Les fonds seront bloqués sur un compte de séquestre DoniCargo jusqu'à la livraison.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPaymentMethod('mobile')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'mobile' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <Smartphone className={`w-6 h-6 mb-2 ${paymentMethod === 'mobile' ? 'text-orange-500' : 'text-slate-400'}`} />
                  <span className={`text-xs font-bold ${paymentMethod === 'mobile' ? 'text-orange-700' : 'text-slate-500'}`}>Mobile Money</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === 'card' ? 'text-indigo-500' : 'text-slate-400'}`} />
                  <span className={`text-xs font-bold ${paymentMethod === 'card' ? 'text-indigo-700' : 'text-slate-500'}`}>Carte Bancaire</span>
                </button>
              </div>

              {paymentMethod === 'mobile' ? (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Numéro Wave / Orange Money</label>
                  <input type="text" placeholder="+223 XX XX XX XX" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Numéro de Carte</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/AA" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    <input type="text" placeholder="CVC" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
              )}

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${paymentMethod === 'mobile' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'} ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Traitement sécurisé...
                  </>
                ) : (
                  <>Payer et Sécuriser</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
