import Link from "next/link"
import { Shield, Lock, FileCheck, Scale, AlertTriangle, ArrowRight, Download } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export const metadata = {
  title: "Sécurité & OHADA | DoniCargo",
  description: "Découvrez nos engagements légaux et sécuritaires. Une plateforme 100% conforme au droit OHADA.",
}

export default function SecuriteOHADAPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800 selection:bg-orange-500/30">
      {/* Navigation */}
      <header className="bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo className="h-16" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link href="/securite-ohada" className="text-orange-500 transition-colors">Sécurité & OHADA</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Se connecter
            </Link>
            <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5">
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-orange-500 mb-8 shadow-2xl">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Confiance, Transparence & <br /> Droit OHADA</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Parce que la logistique internationale requiert une confiance absolue. DoniCargo a été conçu en parfaite conformité avec le Droit Commercial Général de l'OHADA, protégeant toutes les parties prenantes.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl border border-slate-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Livre Blanc OHADA (Bientôt)
            </button>
          </div>
        </div>
      </section>

      {/* Les 3 piliers */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Pilier 1 : OHADA */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Scale className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Conformité Légale (OHADA)</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                Chaque accord de transport passé via la plateforme génère une trace numérique indélébile, valant preuve en cas de litige selon l'Acte Uniforme relatif au droit commercial général.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start gap-2"><CheckIcon /> Reconnaissance des contrats électroniques</li>
                <li className="flex items-start gap-2"><CheckIcon /> Preuve de dépôt documentaire (BL)</li>
              </ul>
            </div>

            {/* Pilier 2 : Escrow */}
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6 border border-orange-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Paiement Séquestre (Escrow)</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                L'argent du client n'est jamais versé directement au transporteur à la commande. Il est conservé sur un compte séquestre par un tiers de confiance financier agréé par la BCEAO.
              </p>
              <ul className="text-sm text-slate-300 space-y-2">
                <li className="flex items-start gap-2"><CheckOrangeIcon /> Fonds bloqués à la validation</li>
                <li className="flex items-start gap-2"><CheckOrangeIcon /> Déblocage uniquement à la livraison</li>
                <li className="flex items-start gap-2"><CheckOrangeIcon /> Médiation indépendante par DoniCargo</li>
              </ul>
            </div>

            {/* Pilier 3 : KYC */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Vérification Stricte (KYB)</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                "Know Your Business". Avant d'apparaître sur la Marketplace, chaque entreprise logistique subit une vérification rigoureuse de son existence légale.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start gap-2"><CheckIcon /> Vérification du RCCM (Registre Commerce)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Validation du NIF (Numéro d'Identification Fiscale)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Exigence de l'Agrément en Douane</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800 text-center">
        <p className="text-sm">© 2026 DoniCargo. Sécurité et Droit OHADA au service du Fret Africain.</p>
      </footer>
    </div>
  )
}

function CheckIcon() {
  return <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 bg-blue-600 rounded-full"></div></div>
}

function CheckOrangeIcon() {
  return <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 bg-orange-500 rounded-full"></div></div>
}
