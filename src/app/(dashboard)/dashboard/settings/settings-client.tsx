"use client"

import { useState } from "react"
import { Shield, User, Building, CreditCard, UploadCloud, CheckCircle2, Lock, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface ProfileData {
  company_name: string
  phone: string
  address: string
  status: string | null
}

export default function SettingsClient({ initialProfile }: { initialProfile: ProfileData }) {
  const [activeTab, setActiveTab] = useState("kyc")
  
  // Profile state
  const [profile, setProfile] = useState({
    companyName: initialProfile.company_name || "",
    phone: initialProfile.phone || "",
    address: initialProfile.address || ""
  })
  const [isSaving, setIsSaving] = useState(false)

  // KYC state
  const [isUploading, setIsUploading] = useState(false)
  const [kycStatus, setKycStatus] = useState(initialProfile.status)

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const { updateProfileAction } = await import('@/app/actions/update_profile')
    const res = await updateProfileAction(profile)
    setIsSaving(false)
    if (res.success) {
      alert("Profil mis à jour avec succès")
    } else {
      alert("Erreur: " + res.error)
    }
  }

  const handleUploadKyc = async () => {
    setIsUploading(true)
    // Simulate upload delay
    await new Promise(r => setTimeout(r, 1500))
    
    const { submitKycAction } = await import('@/app/actions/submit_kyc')
    const res = await submitKycAction()
    setIsUploading(false)
    
    if (res.success) {
      setKycStatus("pending")
      alert("Documents envoyés ! En attente de validation.")
    } else {
      alert("Erreur: " + res.error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Paramètres du compte</h1>
        <p className="text-slate-500 text-sm mt-1">Gérez votre profil, vos documents légaux et vos informations de facturation.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200 overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab("profile")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === "profile" ? "border-orange-600 text-orange-700" : "border-transparent text-slate-500 hover:text-orange-600"}`}
        >
          <User className="w-4 h-4 inline-block mr-2" /> Profil
        </button>
        <button 
          onClick={() => setActiveTab("kyc")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === "kyc" ? "border-orange-600 text-orange-700" : "border-transparent text-slate-500 hover:text-orange-600"}`}
        >
          <Shield className="w-4 h-4 inline-block mr-2" /> Vérification KYC/KYB
        </button>
        <button 
          onClick={() => setActiveTab("billing")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === "billing" ? "border-orange-600 text-orange-700" : "border-transparent text-slate-500 hover:text-orange-600"}`}
        >
          <CreditCard className="w-4 h-4 inline-block mr-2" /> Facturation
        </button>
      </div>

      {activeTab === "profile" && (
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-lg">Informations de l&apos;entreprise</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleSaveProfile}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nom de l&apos;entreprise</label>
                  <input 
                    type="text" 
                    required
                    value={profile.companyName}
                    onChange={e => setProfile({...profile, companyName: e.target.value})}
                    placeholder="Ex: Transit Express S.A."
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Numéro de téléphone</label>
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={e => setProfile({...profile, phone: e.target.value})}
                    placeholder="+223 ..."
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Adresse du siège social</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={e => setProfile({...profile, address: e.target.value})}
                    placeholder="Adresse complète"
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500" 
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className={`bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors ${isSaving ? 'opacity-50' : ''}`}
                >
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "kyc" && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl flex gap-3 text-sm">
            <Lock className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
            <p>
              <strong>Pourquoi vérifier mon compte ?</strong><br/>
              Pour effectuer des paiements Escrow et valider des devis avec nos transitaires partenaires, votre entreprise doit être vérifiée conformément aux normes UEMOA/OHADA.
            </p>
          </div>

          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg flex justify-between items-center">
                Statut de vérification
                {kycStatus === 'verified' ? (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Vérifié
                  </span>
                ) : kycStatus === 'pending' ? (
                  <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> En cours d&apos;analyse
                  </span>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">Non vérifié</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                
                {/* RCCM */}
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Registre de Commerce (RCCM)</h4>
                    <p className="text-xs text-slate-500 mt-1">Fournissez une copie de votre RC datant de moins de 3 mois.</p>
                  </div>
                  {kycStatus ? (
                    <div className="text-green-600 text-sm font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Document reçu</div>
                  ) : (
                    <button onClick={handleUploadKyc} disabled={isUploading} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                      {isUploading ? "Envoi..." : <><UploadCloud className="w-4 h-4"/> Uploader PDF</>}
                    </button>
                  )}
                </div>

                {/* NIF */}
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Numéro d&apos;Identification (NIF)</h4>
                    <p className="text-xs text-slate-500 mt-1">Votre numéro d&apos;immatriculation fiscale national.</p>
                  </div>
                  {kycStatus ? (
                    <div className="text-green-600 text-sm font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Document reçu</div>
                  ) : (
                    <button onClick={handleUploadKyc} disabled={isUploading} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                      {isUploading ? "Envoi..." : <><UploadCloud className="w-4 h-4"/> Uploader PDF</>}
                    </button>
                  )}
                </div>

                {/* ID Manager */}
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Pièce d&apos;Identité (Gérant)</h4>
                    <p className="text-xs text-slate-500 mt-1">Carte NINA, Passeport ou Carte d&apos;Identité Nationale.</p>
                  </div>
                  {kycStatus ? (
                    <div className="text-green-600 text-sm font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Document reçu</div>
                  ) : (
                    <button onClick={handleUploadKyc} disabled={isUploading} className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                      {isUploading ? "Envoi..." : <><UploadCloud className="w-4 h-4"/> Uploader PDF</>}
                    </button>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "billing" && (
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-12 text-center text-slate-500">
            <CreditCard className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">Méthodes de paiement</h3>
            <p className="text-sm max-w-sm mx-auto">Ajoutez une carte bancaire ou un compte Mobile Money pour faciliter vos prochains paiements Escrow.</p>
            <button className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">Ajouter un moyen de paiement</button>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
