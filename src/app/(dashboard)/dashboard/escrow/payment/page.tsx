"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Shield, Smartphone, CreditCard, Lock, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function EscrowPaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shipmentId = searchParams.get('shipmentId')
  
  const [method, setMethod] = useState<'mobile' | 'card'>('mobile')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simuler le délai de l'API de paiement
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      
      // Simuler le retour vers le dashboard après succès
      setTimeout(() => {
        router.push('/dashboard/shipments')
      }, 3000)
    }, 2500)
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Fonds Sécurisés !</h2>
        <p className="text-slate-600">
          Votre acompte est maintenant bloqué dans le coffre-fort Escrow de DoniCargo. Le transitaire est notifié et peut commencer sa mission.
        </p>
        <p className="text-sm text-slate-400">Redirection vers le suivi de vos conteneurs...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux expéditions
      </button>

      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dépôt Escrow</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Sécurisez vos fonds pour le dossier <span className="font-bold text-slate-700">{shipmentId || '...' }</span>. 
          L&apos;argent ne sera débloqué qu&apos;à la livraison validée.
        </p>
      </div>

      <Card className="border-slate-200 shadow-xl shadow-slate-200/40">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 rounded-t-xl">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Montant à sécuriser</span>
            <span className="text-2xl font-bold text-slate-900">450 000 FCFA</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-green-600 font-medium">
            <Lock className="w-4 h-4" /> Transactions protégées par UEMOA / OHADA
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          
          {/* Method Selector */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setMethod('mobile')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${method === 'mobile' ? 'border-orange-500 bg-orange-50/50 text-orange-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
            >
              <Smartphone className={`w-8 h-8 ${method === 'mobile' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span className="font-semibold text-sm">Mobile Money</span>
            </button>
            <button 
              onClick={() => setMethod('card')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${method === 'card' ? 'border-orange-500 bg-orange-50/50 text-orange-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
            >
              <CreditCard className={`w-8 h-8 ${method === 'card' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span className="font-semibold text-sm">Carte Bancaire</span>
            </button>
          </div>

          {/* Form */}
          {method === 'mobile' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Numéro Mobile Money (Wave, Orange, MTN)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                    +225
                  </span>
                  <input type="tel" className="flex-1 block w-full rounded-none rounded-r-lg border-slate-300 px-4 py-3 text-slate-900 border focus:ring-orange-500 focus:border-orange-500 text-lg" placeholder="07 00 00 00 00" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Numéro de carte</label>
                <input type="text" className="w-full rounded-lg border-slate-300 px-4 py-3 text-slate-900 border focus:ring-orange-500 focus:border-orange-500 text-lg" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiration</label>
                  <input type="text" className="w-full rounded-lg border-slate-300 px-4 py-3 text-slate-900 border focus:ring-orange-500 focus:border-orange-500" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">CVC</label>
                  <input type="text" className="w-full rounded-lg border-slate-300 px-4 py-3 text-slate-900 border focus:ring-orange-500 focus:border-orange-500" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <button 
            disabled={isProcessing}
            onClick={handlePayment}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Traitement en cours...</>
            ) : (
              <><Lock className="w-5 h-5" /> Sécuriser 450 000 FCFA</>
            )}
          </button>
          
          <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> DoniCargo Escrow Services - Certifié PCI-DSS
          </p>

        </CardContent>
      </Card>
    </div>
  )
}

export default function EscrowPaymentPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    }>
      <EscrowPaymentContent />
    </Suspense>
  )
}

