"use client"

import { useState, useTransition, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { completeOnboarding } from "@/app/actions/auth"
import { Compass, Users, Truck, UserCheck, RefreshCw, AlertCircle, Building2, UploadCloud, FileCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"

type Role = "commercant" | "transitaire" | "transporteur" | "chauffeur"

function RegisterForm() {
  const searchParams = useSearchParams()
  const [phone, setPhone] = useState(searchParams.get("phone") || "")
  const [role, setRole] = useState<Role>("commercant")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [rccm, setRccm] = useState("")
  const [nif, setNif] = useState("")
  const [agrementDouane, setAgrementDouane] = useState("")
  
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!phone) {
      setError("Veuillez renseigner votre numéro de téléphone (Obligatoire pour l'authentification SMS)")
      return
    }

    if (!fullName) {
      setError("Veuillez renseigner votre nom complet")
      return
    }

    if (["transitaire", "transporteur"].includes(role)) {
      if (!companyName) return setError("Veuillez renseigner le nom de votre entreprise")
      if (!rccm) return setError("Le N° RCCM est strictement obligatoire pour les professionnels")
      if (!nif) return setError("Le N° NIF est strictement obligatoire pour les professionnels")
    }

    if (role === "transitaire" && !agrementDouane) {
      return setError("L'Agrément en Douane est exigé pour valider votre statut de transitaire")
    }

    startTransition(async () => {
      const res = await completeOnboarding({
        phone,
        role,
        fullName,
        companyName: ["transitaire", "transporteur"].includes(role) ? companyName : undefined,
        rccm: ["transitaire", "transporteur"].includes(role) ? rccm : undefined,
        nif: ["transitaire", "transporteur"].includes(role) ? nif : undefined,
        agrementDouane: role === "transitaire" ? agrementDouane : undefined,
      })

      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-12 px-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-center flex flex-col items-center">
          <Logo className="h-24 mb-6" />
          <h1 className="text-2xl font-bold text-white">Finalisez votre inscription</h1>
          <p className="text-slate-400 mt-2 text-sm">Créez votre profil professionnel DoniCargo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-start gap-2.5 border border-red-100 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Profile information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">1. Informations Personnelles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Numéro de téléphone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +223 70 00 00 00"
                  className="block w-full border border-slate-200 bg-white text-slate-800 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-slate-500 mb-2">Nom complet</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Amadou Diallo"
                  className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2. Role Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">2. Choisissez votre rôle</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Commerçant */}
              <div 
                onClick={() => setRole("commercant")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                  role === "commercant" 
                    ? "border-orange-500 bg-orange-50/20" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <Compass className={`w-8 h-8 mx-auto mb-2 ${role === "commercant" ? "text-orange-600" : "text-slate-400"}`} />
                <h4 className="font-bold text-slate-800 text-xs">Commerçant</h4>
                <p className="text-[10px] text-slate-400 mt-1">Import/Export</p>
              </div>

              {/* Transitaire */}
              <div 
                onClick={() => setRole("transitaire")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                  role === "transitaire" 
                    ? "border-orange-500 bg-orange-50/20" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${role === "transitaire" ? "text-orange-600" : "text-slate-400"}`} />
                <h4 className="font-bold text-slate-800 text-xs">Transitaire</h4>
                <p className="text-[10px] text-slate-400 mt-1">Douane & Port</p>
              </div>

              {/* Transporteur */}
              <div 
                onClick={() => setRole("transporteur")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                  role === "transporteur" 
                    ? "border-orange-500 bg-orange-50/20" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <Truck className={`w-8 h-8 mx-auto mb-2 ${role === "transporteur" ? "text-orange-600" : "text-slate-400"}`} />
                <h4 className="font-bold text-slate-800 text-xs">Transporteur</h4>
                <p className="text-[10px] text-slate-400 mt-1">Propriétaire flotte</p>
              </div>

              {/* Chauffeur */}
              <div 
                onClick={() => setRole("chauffeur")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                  role === "chauffeur" 
                    ? "border-orange-500 bg-orange-50/20" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <Users className={`w-8 h-8 mx-auto mb-2 ${role === "chauffeur" ? "text-orange-600" : "text-slate-400"}`} />
                <h4 className="font-bold text-slate-800 text-xs">Chauffeur</h4>
                <p className="text-[10px] text-slate-400 mt-1">Conducteur camion</p>
              </div>

            </div>
          </div>

          {/* 3. Professional details (conditional) */}
          {["transitaire", "transporteur"].includes(role) && (
            <div className="space-y-4 border-t border-slate-100 pt-6 animate-fadeIn">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">3. Identité Professionnelle (KYB)</h3>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px]">Vérification Stricte</Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="companyName" className="block text-xs font-semibold text-slate-500 mb-2">Nom de l&apos;entreprise *</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: Transit Express Mali"
                    className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="rccm" className="block text-xs font-semibold text-slate-500 mb-2">N° RCCM *</label>
                  <input
                    type="text"
                    id="rccm"
                    value={rccm}
                    onChange={(e) => setRccm(e.target.value)}
                    placeholder="Ex: MA-BKO-2026-B..."
                    className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="nif" className="block text-xs font-semibold text-slate-500 mb-2">N° NIF *</label>
                  <input
                    type="text"
                    id="nif"
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                    placeholder="Ex: 082019208..."
                    className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              {role === "transitaire" && (
                <div className="mt-4 p-5 bg-orange-50/50 border border-orange-100 rounded-xl space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Agrément en Douane Obligatoire</h4>
                      <p className="text-xs text-slate-500 mt-1">Conformément aux directives douanières, les transitaires doivent justifier de leur agrément pour opérer sur la plateforme.</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="agrementDouane" className="block text-xs font-semibold text-slate-500 mb-2">N° d&apos;Agrément en Douane *</label>
                      <input
                        type="text"
                        id="agrementDouane"
                        value={agrementDouane}
                        onChange={(e) => setAgrementDouane(e.target.value)}
                        placeholder="Ex: 0045/DGD/2026"
                        className="block w-full border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Copie de l&apos;Agrément (PDF/Image) *</label>
                      <button type="button" className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 text-slate-500 rounded-lg py-2.5 px-4 text-sm transition-all">
                        <UploadCloud className="w-4 h-4" />
                        Uploader le document
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              "Créer mon compte professionnel"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-semibold">Chargement du formulaire...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}

