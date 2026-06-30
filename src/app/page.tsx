import Link from "next/link"
import { Package, Shield, Truck, Compass, ArrowRight, ArrowUpRight, BarChart3, HelpCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Doni<span className="text-emerald-600">Cargo</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</a>
            <a href="#marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</a>
            <a href="#securite" className="hover:text-emerald-600 transition-colors">Sécurité & OHADA</a>
            <a href="#tarifs" className="hover:text-emerald-600 transition-colors">Tarifs</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Se connecter
            </Link>
            <Link 
              href="/login" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-emerald-600/10 transition-all hover:-translate-y-0.5"
            >
              Rejoindre comme Pro
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-xs font-semibold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
              Corridor Abidjan - Bamako Opérationnel
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Sécurisez vos importations de l'océan à Bamako.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              DoniCargo connecte commerçants, transitaires agréés et transporteurs en Afrique de l'Ouest. Suivi en temps réel, coffre-fort documentaire et paiement sécurisé bloqué (Escrow).
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-medium shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                Accéder au Dashboard Démo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#solutions"
                className="border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-medium transition-colors text-center"
              >
                Découvrir la solution
              </a>
            </div>
            {/* Quick Demo Shortcuts */}
            <div className="pt-6 border-t border-slate-200/60">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Accès rapide prototypes :</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard" className="text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3.5 py-2 rounded-lg text-slate-600 hover:text-emerald-700 font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                  📊 Dashboard Demo
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/login" className="text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3.5 py-2 rounded-lg text-slate-600 hover:text-emerald-700 font-medium transition-colors flex items-center gap-1.5 shadow-sm">
                  🔑 Page Login
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="relative z-10 bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">CONTENEUR #HLX-9029</p>
                  <p className="text-sm font-semibold text-white">Chine → Bamako via Abidjan</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                  Douane Abidjan
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
                    <div className="w-0.5 h-12 bg-emerald-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Arrivée Port Abidjan</h4>
                    <p className="text-xs text-slate-400">Déchargé du navire MSC KRYSTAL</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xs font-bold animate-pulse">2</div>
                    <div className="w-0.5 h-12 bg-slate-800"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Passage Douane</h4>
                    <p className="text-xs text-slate-400">En cours de dédouanement par Transit Express CI</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 text-xs font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400">Transport Routier</h4>
                    <p className="text-xs text-slate-500">En attente de chargement camion</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background patterns */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Solutions / Features Section */}
      <section id="solutions" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Digitaliser tout le parcours import-export
            </h2>
            <p className="text-lg text-slate-600">
              Une suite d'outils professionnels pour assurer la transparence de vos opérations logistiques en Afrique de l'Ouest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Suivi en temps réel</h3>
              <p className="text-slate-600 leading-relaxed">
                Suivi des conteneurs, des colis et des camions sur une carte interactive de l'arrivée au port jusqu'à la livraison finale.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Paiement Escrow sécurisé</h3>
              <p className="text-slate-600 leading-relaxed">
                Sécurisez vos acomptes logistiques. Les fonds sont bloqués et libérés aux transitaires uniquement lorsque les jalons sont validés.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Calculateur IA Douane</h3>
              <p className="text-slate-600 leading-relaxed">
                Estimez instantanément les taxes douanières selon la nature de vos marchandises et les règles en vigueur de l'UEMOA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="text-lg font-bold text-white tracking-tight">DoniCargo</span>
          </div>
          <p className="text-sm">
            © 2026 DoniCargo. Développé pour la FreightTech ouest-africaine. Conformité OHADA / UEMOA.
          </p>
        </div>
      </footer>
    </div>
  )
}
