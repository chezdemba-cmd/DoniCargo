"use client"

import { useState, useTransition } from "react"
import { loginWithEmail } from "@/app/actions/auth"
import { RefreshCw, AlertCircle, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Veuillez saisir votre email et mot de passe")
      return
    }

    startTransition(async () => {
      const res = await loginWithEmail(formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-center flex flex-col items-center">
          <Logo className="w-48 h-12 text-white mb-2" />
          <p className="text-slate-400 mt-2 text-sm">Connectez-vous pour suivre vos expéditions</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Adresse Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                disabled={isPending}
                required
                className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all sm:text-sm"
                placeholder="contact@exemple.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                disabled={isPending}
                required
                className="block w-full border border-slate-200 rounded-lg py-3.5 px-4 text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-start gap-2.5 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Se connecter"
              )}
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-500">
              Pas encore de compte ?{' '}
              <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-500 hover:underline">
                S&apos;inscrire ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

