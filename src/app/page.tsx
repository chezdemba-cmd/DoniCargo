import Link from "next/link"
import { Compass, Shield, BarChart3, ArrowRight, ArrowUpRight, FileText, MessageSquare, Package } from "lucide-react"

import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col font-sans text-slate-300 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Navigation */}
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-16" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link href="/securite-ohada" className="hover:text-white transition-colors">Sécurité & OHADA</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Se connecter
            </Link>
            <Link 
              href="/login" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
            >
              Rejoindre comme Pro
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-slate-900 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center relative z-10">
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
              Corridor Abidjan - Bamako Opérationnel
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Sécurisez vos importations de l&apos;océan à Bamako.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              DoniCargo connecte commerçants, transitaires agréés et transporteurs en Afrique de l&apos;Ouest. Suivi en temps réel, coffre-fort documentaire et paiement sécurisé (Escrow).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/dashboard"
                className="bg-orange-500 hover:bg-orange-400 text-slate-950 px-8 py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                Accéder au Dashboard Démo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#solutions"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-8 py-4 rounded-xl font-medium transition-colors text-center"
              >
                Découvrir la solution
              </a>
            </div>
            
            {/* Quick Demo Shortcuts */}
            <div className="pt-8 border-t border-slate-800/60 mt-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Accès rapide prototypes :</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard" className="text-xs bg-slate-900/50 hover:bg-slate-800 border border-slate-800 px-4 py-2.5 rounded-lg text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2 shadow-sm backdrop-blur-sm">
                  📊 Dashboard Demo
                  <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
                </Link>
                <Link href="/login" className="text-xs bg-slate-900/50 hover:bg-slate-800 border border-slate-800 px-4 py-2.5 rounded-lg text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2 shadow-sm backdrop-blur-sm">
                  🔑 Page Login
                  <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 relative">
            <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl text-white rounded-3xl p-8 shadow-2xl border border-slate-800/80 ring-1 ring-white/10">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">CONTENEUR #HLX-9029</p>
                  <p className="text-sm font-semibold text-white">Chine → Bamako via Abidjan</p>
                </div>
                <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full border border-orange-500/30 font-semibold shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  Douane Abidjan
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-slate-950 text-xs font-black shadow-[0_0_10px_rgba(249,115,22,0.5)]">✓</div>
                    <div className="w-0.5 h-12 bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Arrivée Port Abidjan</h4>
                    <p className="text-xs text-slate-400">Déchargé du navire MSC KRYSTAL</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-orange-500 flex items-center justify-center text-orange-400 text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] animate-pulse">2</div>
                    <div className="w-0.5 h-12 bg-slate-800"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Passage Douane</h4>
                    <p className="text-xs text-slate-400">En cours de dédouanement par Transit Express CI</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-500 text-xs font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-500">Transport Routier</h4>
                    <p className="text-xs text-slate-600">En attente de chargement camion</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements Decor */}
            <div className="absolute right-0 -top-24 bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{animationDuration: '3s'}}>
              <p className="text-xs text-slate-400 mb-1">Acompte Escrow</p>
              <p className="font-bold text-green-400">Sécurisé (450k XOF)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Features Section */}
      <section id="solutions" className="py-24 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Digitaliser tout le parcours import
            </h2>
            <p className="text-lg text-slate-400">
              Une suite d&apos;outils professionnels pour assurer la transparence de vos opérations logistiques en Afrique de l&apos;Ouest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Suivi en temps réel</h3>
              <p className="text-slate-400 leading-relaxed">
                Suivi des conteneurs, des colis et des camions sur une carte interactive de l&apos;arrivée au port jusqu&apos;à la livraison finale.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Paiement Escrow sécurisé</h3>
                <p className="text-slate-400 leading-relaxed">
                  Sécurisez vos acomptes logistiques. Les fonds sont bloqués et libérés aux transitaires uniquement lorsque les jalons sont validés.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Calculateur IA Douane</h3>
              <p className="text-slate-400 leading-relaxed">
                Estimez instantanément les taxes douanières selon la nature de vos marchandises et les règles en vigueur de l&apos;UEMOA.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Coffre-fort Documentaire</h3>
              <p className="text-slate-400 leading-relaxed">
                Stockez et partagez vos Connaissements (BL) et Quittances de Douane dans un espace cloud ultra-sécurisé.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Messagerie B2B Intégrée</h3>
              <p className="text-slate-400 leading-relaxed">
                Négociez vos tarifs de fret et communiquez en temps réel avec les transitaires sans quitter la plateforme.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-500 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors shadow-lg">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimisation par Groupage</h3>
              <p className="text-slate-400 leading-relaxed">
                Mutualisez l&apos;espace LCL dans les conteneurs avec d&apos;autres commerçants pour réduire drastiquement vos coûts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 mt-auto border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 opacity-50 grayscale" />
            <span className="text-lg font-bold text-slate-600 tracking-tight">DoniCargo</span>
          </div>
          <p className="text-sm">
            © 2026 DoniCargo. Développé pour la FreightTech ouest-africaine. Conformité OHADA / UEMOA.
          </p>
        </div>
      </footer>
    </div>
  )
}

