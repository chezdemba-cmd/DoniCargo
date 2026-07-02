import { getShipments } from "@/services/shipments"
import ShipmentsClient from "./shipments-client"
import { Package } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Suivi des Marchandises | DoniCargo",
  description: "Pilotez le transit de vos marchandises de bout en bout.",
}

export default async function ShipmentsPage() {
  const data = await getShipments()
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mes Conteneurs</h1>
          <p className="text-slate-500 text-sm">Suivez vos expéditions en temps réel et validez les étapes.</p>
        </div>
        <Link 
          href="/dashboard/shipments/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Package className="w-4 h-4" />
          Nouvelle Demande
        </Link>
      </div>
      <ShipmentsClient initialData={data} />
    </div>
  )
}
