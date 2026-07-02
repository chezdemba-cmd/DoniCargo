import { Shield, Users, FileCheck, AlertTriangle, TrendingUp, DollarSign, Activity, CheckCircle2, XCircle, Search, Ban, Eye, Mail, LockOpen, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Super-Admin | DoniCargo",
  description: "Espace d'administration de la plateforme DoniCargo.",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Admin */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              Vue globale Super-Administrateur
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Centre de Contrôle Global</h1>
            <p className="text-slate-400 text-sm">Gestion des litiges, validation des comptes (KYB) et flux financiers de la plateforme.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Statut Plateforme</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="text-sm font-semibold text-white">Opérationnelle (99.9%)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900">Utilisateurs</TabsTrigger>
          <TabsTrigger value="escrow" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900">Fonds Escrow</TabsTrigger>
          <TabsTrigger value="disputes" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900">Litiges & KYC</TabsTrigger>
        </TabsList>

        {/* ONGLET 1: Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-8 outline-none">
          {/* KPIs Admin */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-slate-100 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">+12%</Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-1">Volume Escrow Total (En cours)</p>
                <h3 className="text-2xl font-bold text-slate-800">45.2M FCFA</h3>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">+8%</Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-1">Frais de Plateforme (CA)</p>
                <h3 className="text-2xl font-bold text-slate-800">1.8M FCFA</h3>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm bg-white ring-2 ring-red-500/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <Badge variant="default" className="bg-red-600 text-white">2 urgents</Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-1">Litiges Escrow en attente</p>
                <h3 className="text-2xl font-bold text-slate-800">3 Dossiers</h3>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">Cette semaine</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-1">Nouveaux KYC à vérifier</p>
                <h3 className="text-2xl font-bold text-slate-800">5 Comptes</h3>
              </CardContent>
            </Card>
          </div>

          {/* Graphique simulé */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg">Évolution du Volume Escrow & Revenus</CardTitle>
              <CardDescription>Comparaison hebdomadaire sur le dernier mois (Simulé)</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-64 flex items-end gap-2 justify-between">
                {[40, 60, 45, 80, 50, 90, 75, 100].map((h, i) => (
                  <div key={i} className="w-full flex justify-center group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Semaine {i+1}
                    </div>
                    <div 
                      className="w-1/2 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors" 
                      style={{ height: `${h}%` }}
                    ></div>
                    <div 
                      className="w-1/2 bg-orange-400 rounded-t-sm hover:bg-orange-500 transition-colors ml-1" 
                      style={{ height: `${h * 0.15}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-sm text-slate-600">Volume Transité (Escrow)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                  <span className="text-sm text-slate-600">Revenus Générés (Commissions)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ONGLET 2: Utilisateurs */}
        <TabsContent value="users" className="space-y-6 outline-none">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Rechercher un utilisateur..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">Tous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">Transitaires</button>
            </div>
          </div>

          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Utilisateur</th>
                  <th className="p-4 font-semibold">Rôle</th>
                  <th className="p-4 font-semibold">Statut</th>
                  <th className="p-4 font-semibold">Inscrit le</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Amadou Diallo", email: "amadou@example.com", role: "Commerçant", status: "Actif", date: "01/06/2026", color: "bg-green-100 text-green-700" },
                  { name: "Transit Express CI", email: "contact@transit-express.ci", role: "Transitaire", status: "Vérifié (KYB)", date: "15/05/2026", color: "bg-blue-100 text-blue-700" },
                  { name: "Sako Logistique", email: "info@sako.ml", role: "Transitaire", status: "En attente", date: "02/07/2026", color: "bg-orange-100 text-orange-700" },
                  { name: "Moussa Keita", email: "moussa.k@transport.ml", role: "Transporteur", status: "Suspendu", date: "20/04/2026", color: "bg-red-100 text-red-700" },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-800 text-sm">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 font-medium">{user.role}</td>
                    <td className="p-4">
                      <Badge variant="secondary" className={`${user.color} border-none`}>{user.status}</Badge>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{user.date}</td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 bg-white border border-slate-200 rounded-md shadow-sm transition-colors" title="Voir le profil">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-orange-500 bg-white border border-slate-200 rounded-md shadow-sm transition-colors" title="Contacter">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-md shadow-sm transition-colors" title="Suspendre">
                        <Ban className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ONGLET 3: Transactions Escrow */}
        <TabsContent value="escrow" className="space-y-6 outline-none">
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-start gap-3">
            <LockOpen className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-orange-800 text-sm">Zone Critique</h4>
              <p className="text-xs text-orange-700 mt-1">
                En tant que Super-Admin, vous avez le pouvoir de débloquer ou rembourser des fonds bloqués en Escrow en cas de litige insoluble. Ces actions sont irréversibles.
              </p>
            </div>
          </div>

          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">ID Transaction</th>
                  <th className="p-4 font-semibold">Parties</th>
                  <th className="p-4 font-semibold">Montant</th>
                  <th className="p-4 font-semibold">Statut Escrow</th>
                  <th className="p-4 font-semibold text-right">Actions Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: "ESC-9029", client: "Amadou Diallo", pro: "Transit Express CI", amount: "450 000 FCFA", status: "Bloqué (Séquestre)", badge: "bg-blue-100 text-blue-700" },
                  { id: "ESC-8820", client: "Fatouma Cissé", pro: "Bolloré Logistics", amount: "2 500 000 FCFA", status: "En Litige", badge: "bg-red-100 text-red-700" },
                  { id: "ESC-4421", client: "Sarl Import", pro: "Sako Logistique", amount: "120 000 FCFA", status: "Débloqué (Payé)", badge: "bg-green-100 text-green-700" },
                ].map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm">{tx.id}</div>
                      <div className="text-[10px] text-slate-400">Via Orange Money</div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="font-medium text-slate-700">{tx.client}</div>
                      <div className="text-xs text-slate-500">→ {tx.pro}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-800 text-sm">{tx.amount}</td>
                    <td className="p-4">
                      <Badge variant="secondary" className={`${tx.badge} border-none`}>{tx.status}</Badge>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      {tx.status === "En Litige" ? (
                        <>
                          <button className="px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded shadow-sm transition-colors" title="Forcer le paiement au pro">
                            Débloquer
                          </button>
                          <button className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded shadow-sm transition-colors" title="Rembourser le client">
                            Rembourser
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Aucune action requise</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ONGLET 4: Litiges & KYC (Ancien code recyclé) */}
        <TabsContent value="disputes" className="outline-none">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Résolution de Litiges */}
            <Card className="border-slate-100 shadow-sm flex flex-col h-full">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Gestion des Litiges (Escrow)
                </CardTitle>
                <CardDescription className="text-xs">
                  Médiation entre le transitaire (qui réclame les fonds) et le client (qui refuse de valider l&apos;étape).
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-1 bg-slate-50/50">
                <div className="divide-y divide-slate-100">
                  <div className="p-6 bg-white space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Dossier #HLX-8820 (Transit Express CI)</h4>
                        <p className="text-xs text-slate-500 mt-1">Étape contestée : &quot;Arrivée Douane Bamako&quot; (2 500 000 FCFA)</p>
                      </div>
                      <Badge className="bg-red-50 text-red-700 border-red-200">Litige Ouvert</Badge>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-3">
                      <div className="flex gap-2">
                        <span className="font-bold text-slate-700 shrink-0">Client :</span>
                        <span className="text-slate-600">&quot;Le conteneur n&apos;est toujours pas au bureau des douanes de Bamako.&quot;</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-slate-700 shrink-0">Transitaire :</span>
                        <span className="text-slate-600">&quot;Le camion est bloqué à la frontière Zégoua, mais l&apos;étape douanière est administrativement lancée.&quot;</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                        Demander des preuves
                      </button>
                      <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                        Geler le dossier
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation KYC/KYB */}
            <Card className="border-slate-100 shadow-sm flex flex-col h-full">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-orange-500" />
                  Approbation KYC (Vérification d&apos;Entreprise)
                </CardTitle>
                <CardDescription className="text-xs">
                  Nouveaux transitaires souhaitant intégrer la Marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <div className="divide-y divide-slate-100">
                  <div className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                          SA
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Sako & Associés Logistique</h4>
                          <p className="text-xs text-slate-500">Demande soumise il y a 2 heures</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">En attente</Badge>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-semibold cursor-pointer hover:bg-slate-200 transition-colors">
                        📄 Agrément Douane.pdf
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-semibold cursor-pointer hover:bg-slate-200 transition-colors">
                        📄 RCCM_2026.pdf
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                        <CheckCircle2 className="w-4 h-4" /> Approuver
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold py-2 rounded-lg transition-colors">
                        <XCircle className="w-4 h-4" /> Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
