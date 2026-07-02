import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, ShieldCheck, CheckCircle2, Filter, Package, Truck, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Marketplace | DoniCargo",
  description: "Trouvez les meilleurs transitaires et transporteurs pour vos expéditions vers l'Afrique de l'Ouest.",
}

const professionals = [
  {
    id: 1,
    name: "Transit Express CI",
    type: "Transitaire",
    rating: 4.8,
    reviews: 124,
    location: "Abidjan, Côte d'Ivoire",
    specialties: ["Conteneur Complet (FCL)", "Dédouanement Véhicules"],
    verified: true,
    priceLevel: "$$",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=TransitCI&backgroundColor=1e293b",
  },
  {
    id: 2,
    name: "Sako & Associés Logistique",
    type: "Transitaire",
    rating: 4.9,
    reviews: 89,
    location: "Dakar, Sénégal",
    specialties: ["Groupage Maritime", "Fret Aérien", "Agroalimentaire"],
    verified: true,
    priceLevel: "$$$",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=Sako&backgroundColor=ea580c",
  },
  {
    id: 3,
    name: "Transport Kone Frères",
    type: "Transporteur Routier",
    rating: 4.6,
    reviews: 56,
    location: "Bamako, Mali",
    specialties: ["Transport International", "Marchandises Dangereuses"],
    verified: true,
    priceLevel: "$$",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=Kone&backgroundColor=3b82f6",
  },
  {
    id: 4,
    name: "Global Transit SARL",
    type: "Transitaire",
    rating: 4.5,
    reviews: 210,
    location: "Abidjan, Côte d'Ivoire",
    specialties: ["Fret Industriel", "Dédouanement Rapide"],
    verified: false,
    priceLevel: "$",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=Global&backgroundColor=64748b",
  },
]

export default function MarketplacePage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800 selection:bg-orange-500/30">
      {/* Navigation (Reprise de l'accueil) */}
      <header className="bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo className="h-16" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/marketplace" className="text-orange-500 transition-colors">Marketplace</Link>
            <Link href="/#securite" className="hover:text-white transition-colors">Sécurité & OHADA</Link>
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
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-sm font-semibold mb-6">
            RÉSEAU DE CONFIANCE
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Trouvez le partenaire idéal pour <br /> vos expéditions en Afrique de l&apos;Ouest</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Comparez les transitaires agréés en douane et les transporteurs routiers certifiés. 
            Protégez vos paiements grâce au système Escrow de DoniCargo.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 md:p-3 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input type="text" placeholder="Port de départ, pays ou spécialité..." className="bg-transparent w-full focus:outline-none text-slate-800" />
            </div>
            <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <Filter className="w-5 h-5 text-slate-400 mr-3" />
              <select className="bg-transparent w-full focus:outline-none text-slate-800 appearance-none">
                <option value="">Tous les professionnels</option>
                <option value="transitaire">Transitaires Maritimes</option>
                <option value="transporteur">Transporteurs Routiers</option>
              </select>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 md:py-0 px-8 rounded-xl transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Grille des Professionnels */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Professionnels Populaires</h2>
              <p className="text-slate-500 text-sm">Ils ont traité plus de 50 conteneurs avec succès sur DoniCargo le mois dernier.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Les mieux notés</button>
              <button className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Vérifiés KYB</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((pro) => (
              <div key={pro.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Image src={pro.imageUrl} alt={pro.name} width={64} height={64} unoptimized className="w-16 h-16 rounded-xl border border-slate-100 shadow-sm object-cover" />
                    {pro.verified && (
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-green-200">
                        <ShieldCheck className="w-3 h-3" /> Agréé & Vérifié
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-slate-800">{pro.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      {pro.type === "Transitaire" ? <Package className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                      {pro.type} • <MapPin className="w-3.5 h-3.5 ml-1" /> {pro.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= Math.floor(pro.rating) ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{pro.rating}</span>
                    <span className="text-xs text-slate-400">({pro.reviews} avis)</span>
                  </div>

                  <div className="space-y-2">
                    {pro.specialties.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl mt-auto">
                  <Link 
                    href="/login" 
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors group-hover:bg-orange-500"
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-slate-400" /> Paiement Escrow disponible
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center">
        <p className="text-sm">© 2026 DoniCargo. La marketplace de confiance pour l&apos;Afrique de l&apos;Ouest.</p>
      </footer>
    </div>
  )
}
