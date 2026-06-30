"use client"

import { useState, useTransition, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { verifyOtp } from "@/app/actions/auth"
import { Shield, ArrowRight, RefreshCw, AlertCircle } from "lucide-react"

function VerifyForm() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const isSimulated = searchParams.get("simulated") === "true"

  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (otp.length !== 6) {
      setError("Le code doit contenir exactement 6 chiffres")
      return
    }

    startTransition(async () => {
      const res = await verifyOtp(phone, otp)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/20">
            <Shield className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white">Vérification SMS</h1>
          <p className="text-slate-400 mt-2 text-sm">Saisissez le code à 6 chiffres envoyé au</p>
          <p className="text-emerald-400 font-semibold text-sm mt-1">{phone || "votre numéro"}</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                Code de sécurité (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                disabled={isPending}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="------"
                className="block w-full border border-slate-300 rounded-lg py-3.5 px-4 text-slate-900 text-center tracking-[1em] text-xl font-bold focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-start gap-2.5 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {isSimulated && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-100">
                💡 <strong>Mode simulation activé :</strong> Utilisez le code de test <strong>123456</strong> pour poursuivre.
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || otp.length !== 6}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all font-semibold"
            >
              {isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Confirmer le code"
              )}
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-500">
              Vous n'avez pas reçu le code ?{' '}
              <button 
                disabled={isPending}
                className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline"
              >
                Renvoyer par SMS
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-semibold">Chargement...</div>
      </div>
    }>
      <VerifyForm />
    </Suspense>
  )
}
