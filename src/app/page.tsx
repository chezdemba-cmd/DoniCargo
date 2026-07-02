import Link from "next/link"
import { Shield, ArrowRight, FileText, Anchor, TrendingUp, CheckCircle, Smartphone, Globe, Lock } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800 selection:bg-orange-500/30 selection:text-orange-900 overflow-x-hidden">
      
      {/* ---------------- NAVIGATION ---------------- */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-12 transition-transform group-hover:scale-105" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#features" className="hover:text-orange-600 transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="hover:text-orange-600 transition-colors">Comment ça marche</a>
            <Link href="/securite-ohada" className="hover:text-orange-600 transition-colors">Sécurité Escrow</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="hidden sm:block text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent -z-10"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-orange-400/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200 text-xs font-bold text-orange-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              Corridor Abidjan - Bamako 100% Sécurisé
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Importez d&apos;Asie. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                L&apos;esprit tranquille.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
              DoniCargo connecte les commerçants maliens aux meilleurs transitaires. Suivi GPS en temps réel, coffre-fort documentaire IA, et paiement bloqué jusqu&apos;à livraison.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-orange-500/30"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/dashboard"
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold transition-all text-center hover:shadow-md"
              >
                Voir le Dashboard Démo
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px]">👤</div>
                ))}
              </div>
              <p>Rejoint par +50 transitaires agréés cette semaine.</p>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-slate-100 rounded-[3rem] rotate-3 scale-105 -z-10 shadow-inner border border-slate-200/50"></div>
            <div className="relative w-full max-w-md bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-slate-800 flex flex-col">
              {/* Fake Mobile Header */}
              <div className="h-6 w-full flex justify-center pt-2 bg-slate-900">
                <div className="w-20 h-4 bg-black rounded-full"></div>
              </div>
              {/* Fake Mobile App Body */}
              <div className="flex-1 p-6 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">En transit</p>
                    <h3 className="font-black text-xl text-slate-800">Conteneur #HLX-9029</h3>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Anchor className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700">Shanghai</span>
                    <span className="font-bold text-slate-700">Bamako</span>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 w-[60%]"></div>
                  </div>
                  <p className="text-xs text-center text-slate-500 mt-2 font-medium">Étape actuelle : Dédouanement Abidjan</p>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">Paiement Escrow</span>
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black">2 450 000 FCFA</p>
                  <p className="text-xs text-slate-400 mt-1">Fonds sécurisés en attente de livraison.</p>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -right-6 top-24 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Document vérifié par IA</p>
                  <p className="text-sm font-black text-slate-800">Connaissement (BL)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Le standard de confiance pour le Fret Africain.</h2>
            <p className="text-slate-500 font-medium text-lg">Nous éliminons les arnaques, les retards inexpliqués et les pertes de documents.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Paiement Escrow Sécurisé</h3>
              <p className="text-slate-600 leading-relaxed font-medium">L&apos;argent est bloqué sur un compte de séquestre (Escrow) et n&apos;est débloqué au transitaire que lorsque la marchandise arrive à bon port à Bamako.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Suivi GPS Temps Réel</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Ne demandez plus "Où est mon conteneur ?". Suivez sa position exacte sur une carte interactive, du port de Shanghai jusqu&apos;à votre entrepôt.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vérification par I.A.</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Nos algorithmes analysent automatiquement les connaissements (BL) et les factures pour détecter toute anomalie ou fraude douanière.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black mb-4">Comment ça marche ?</h2>
            <p className="text-slate-400 font-medium">Un processus fluide, transparent et 100% digitalisé.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Publiez un besoin", desc: "Décrivez votre marchandise et son origine." },
              { step: "02", title: "Recevez des devis", desc: "Les transitaires certifiés vous font leurs meilleures offres." },
              { step: "03", title: "Payez en sécurité", desc: "Les fonds sont bloqués en Escrow." },
              { step: "04", title: "Suivez & Validez", desc: "Suivez sur la carte et débloquez à l'arrivée." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center text-orange-500 font-black text-xl mb-6 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl shadow-orange-500/20">
            <h2 className="text-4xl font-black mb-6">Prêt à digitaliser votre logistique ?</h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto font-medium text-lg">
              Rejoignez les centaines de commerçants et transitaires qui font déjà confiance à DoniCargo pour sécuriser leurs flux de marchandises.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Créer un compte Commerçant
              </Link>
              <Link href="/register" className="bg-white hover:bg-slate-50 text-orange-600 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Devenir Transitaire Partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Logo className="h-10 mb-6" />
            <p className="text-slate-500 text-sm max-w-sm font-medium">
              DoniCargo est la plateforme de référence pour la sécurisation du fret et la mise en relation logistique en Afrique de l&apos;Ouest.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Plateforme</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><Link href="/dashboard" className="hover:text-orange-600">Dashboard</Link></li>
              <li><Link href="#features" className="hover:text-orange-600">Fonctionnalités</Link></li>
              <li><Link href="/securite-ohada" className="hover:text-orange-600">Sécurité OHADA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Légal</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-orange-600">Conditions d&apos;utilisation</a></li>
              <li><a href="#" className="hover:text-orange-600">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-orange-600">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm font-medium">© {new Date().getFullYear()} DoniCargo. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
