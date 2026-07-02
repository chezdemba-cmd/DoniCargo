import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GroupQuoteForm from "./group-quote-form"

export default function DemandeDevisPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
        <Link 
          href="/dashboard/transitaires"
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Demande de Devis Groupé</h1>
          <p className="text-sm text-slate-500 mt-1">
            Soumettez votre demande en un seul clic à l'ensemble des transitaires agréés.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <GroupQuoteForm />
      </div>
    </div>
  )
}

