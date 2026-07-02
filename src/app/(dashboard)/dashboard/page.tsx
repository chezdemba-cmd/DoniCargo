import Link from "next/link"
import { Package, Shield, FileText, ArrowRight, Users, Clock } from "lucide-react"
import { getShipments } from "@/services/shipments"
import { getDocuments } from "@/services/documents"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function Dashboard() {
  const shipments = await getShipments()
  const documents = await getDocuments()
  
  const activeShipmentsCount = shipments.length
  const totalEscrow = shipments.reduce((acc, curr) => acc + (curr.escrow_amount || 0), 0)
  const documentsCount = documents.length
  
  const statusMap = {
    navire: "En mer",
    port: "Arrivée Port",
    douane: "Dédouanement",
    route: "Transport routier",
    livre: "Livré"
  }

  const progressPercent = {
    navire: "20%",
    port: "40%",
    douane: "60%",
    route: "80%",
    livre: "100%"
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-orange-950 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-orange-500/10">
        <div className="relative z-10 max-w-xl space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Bonjour, Cabinet Diallo & Fils 👋</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Bienvenue sur votre espace d&apos;importation. Vous avez actuellement {activeShipmentsCount} dossier(s) de marchandises en cours de transit sur l&apos;axe Abidjan - Bamako.
          </p>
          <div className="pt-2 flex gap-3">
            <Link 
              href="/dashboard/shipments" 
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm"
            >
              Suivre mes marchandises
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link 
              href="/dashboard/transitaires" 
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors border border-white/10"
            >
              Trouver un transitaire
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -z-0 translate-x-20 translate-y-20"></div>
      </div>

      {/* Metrics Row */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="flex items-center p-6 gap-4 border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Marchandises actives</p>
            <h3 className="text-2xl font-bold text-slate-800">{activeShipmentsCount} Dossier(s)</h3>
          </div>
        </Card>

        <Card className="flex items-center p-6 gap-4 border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Fonds sécurisés (Escrow)</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalEscrow.toLocaleString()} F</h3>
          </div>
        </Card>

        <Card className="flex items-center p-6 gap-4 border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Documents vérifiés</p>
            <h3 className="text-2xl font-bold text-slate-800">{documentsCount} Fichiers</h3>
          </div>
        </Card>

        <Card className="flex items-center p-6 gap-4 border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Transitaires agréés</p>
            <h3 className="text-2xl font-bold text-slate-800">3 Partenaires</h3>
          </div>
        </Card>
      </div>

      {/* Main Grid Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Col - Shipments overview & Chart */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Expenditure Chart (Simulated) */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800">Évolution des dépenses logistiques</CardTitle>
              <CardDescription className="text-xs text-slate-500">Dépenses mensuelles cumulées (FCFA)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-48 flex items-end gap-2 sm:gap-6">
                {[
                  { month: 'Jan', value: 30, amount: '1.2M' },
                  { month: 'Fév', value: 45, amount: '1.8M' },
                  { month: 'Mar', value: 25, amount: '1.0M' },
                  { month: 'Avr', value: 60, amount: '2.4M' },
                  { month: 'Mai', value: 80, amount: '3.2M' },
                  { month: 'Juin', value: 100, amount: '4.0M', active: true },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-semibold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.amount}</span>
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-500 ${item.active ? 'bg-orange-500' : 'bg-slate-200 group-hover:bg-orange-300'}`}
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className={`text-[10px] mt-2 font-semibold ${item.active ? 'text-orange-600' : 'text-slate-400'}`}>{item.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4 space-y-0">
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">Suivis en cours</CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">Vos cargaisons actives sur la route</CardDescription>
              </div>
              <Link href="/dashboard/shipments" className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Tout voir
              </Link>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="border border-slate-100 rounded-xl p-5 hover:border-orange-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{shipment.title} (#{shipment.id})</h4>
                      <p className="text-xs text-slate-400 mt-1">Axe : {shipment.origin} ➔ {shipment.destination}</p>
                    </div>
                    <Badge variant={shipment.status === 'livre' ? 'default' : 'secondary'} className="bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-50">
                      {statusMap[shipment.status]}
                    </Badge>
                  </div>
                  
                  {/* Visual Tracking Bar */}
                  <div className="relative pt-2">
                    <div className="overflow-hidden h-1.5 text-xs flex rounded bg-slate-100 mb-4">
                      <div style={{ width: progressPercent[shipment.status] }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                      <span className={shipment.status !== 'navire' ? 'text-orange-600' : 'font-bold'}>🚢 Port</span>
                      <span className={['douane', 'route', 'livre'].includes(shipment.status) ? 'text-orange-600' : ''}>📑 Douane</span>
                      <span className={['route', 'livre'].includes(shipment.status) ? 'text-orange-600' : ''}>🚚 Route</span>
                      <span className={shipment.status === 'livre' ? 'text-orange-600' : ''}>🏁 Bamako</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Col - Alerts & Vault summary */}
        <div className="space-y-6">
          {/* Quick Actions / Alerts */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800">Actions Requises</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/50 flex gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-800 text-xs">Document Manquant</h4>
                  <p className="text-[11px] text-amber-600 mt-1 leading-relaxed">
                    Veuillez ajouter la **Facture Commerciale** pour le conteneur #HLX-9029 pour débloquer l&apos;étape douanière.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200/50 flex gap-3">
                <Shield className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-orange-800 text-xs">Acompte à payer</h4>
                  <p className="text-[11px] text-orange-600 mt-1 leading-relaxed">
                    Le devis pour le dossier #COL-1840 a été accepté. Sécurisez l&apos;acompte (450 000 F) sur le compte Escrow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secure Document Vault */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4 space-y-0">
              <CardTitle className="text-lg font-bold text-slate-800">Documents Récents</CardTitle>
              <Link href="/dashboard/documents" className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Ouvrir coffre-fort
              </Link>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {documents.slice(0, 2).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 text-xs truncate max-w-[120px]">{doc.name}</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">{doc.type}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === 'Verified' ? 'default' : 'outline'} className={
                    doc.status === 'Verified' ? 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-50' : 'text-slate-500 border-slate-200'
                  }>
                    {doc.status === 'Verified' ? 'Validé' : 'Vérif. IA'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

