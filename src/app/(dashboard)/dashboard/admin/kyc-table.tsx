"use client"

import { useState } from "react"
import { ShieldCheck, XCircle, AlertCircle } from "lucide-react"
import { verifyTransitaireAction } from "@/app/actions/verify_transitaire"

interface Profile {
  id: string
  full_name: string
  email: string
  role: string
  status: string | null
}

export function KycTable({ transitaires }: { transitaires: Profile[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleToggleStatus = async (id: string, currentStatus: string | null) => {
    setLoadingId(id)
    
    const newStatus = currentStatus === 'verified' ? null : 'verified'
    const res = await verifyTransitaireAction(id, newStatus)
    
    setLoadingId(null)
    
    if (!res.success) {
      alert("Erreur: " + res.error)
    }
  }

  if (!transitaires || transitaires.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-500">Aucun transitaire ou transporteur inscrit pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Validation KYC (Transitaires)</h2>
          <p className="text-sm text-slate-500">Gérez les accès et vérifiez les documents des professionnels.</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4 font-medium">Professionnel</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Statut KYC</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transitaires.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-800">{t.full_name || 'Non renseigné'}</p>
                </td>
                <td className="p-4">
                  <p className="text-slate-600">{t.email}</p>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium uppercase">
                    {t.role}
                  </span>
                </td>
                <td className="p-4">
                  {t.status === 'verified' ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit font-medium text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Vérifié
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full w-fit font-medium text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      En attente
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(t.id, t.status)}
                    disabled={loadingId === t.id}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ml-auto ${
                      t.status === 'verified' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    } ${loadingId === t.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loadingId === t.id ? (
                      <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    ) : t.status === 'verified' ? (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Révoquer
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" /> Approuver
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
