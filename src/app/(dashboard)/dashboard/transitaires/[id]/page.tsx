import Link from "next/link"
import { getTransitaireById } from "@/services/transitaires"
import RequestQuoteForm from "@/components/forms/RequestQuoteForm"
import { Star, CheckCircle, ArrowLeft, Shield, Calendar, MapPin, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function TransitaireDetailPage({ params }: PageProps) {
  const { id } = await params
  const transitaire = await getTransitaireById(id)

  if (!transitaire) {
    return (
      <div className="text-center py-12 space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Transitaire introuvable</h3>
        <Link href="/dashboard/transitaires" className="text-sm text-orange-600 font-semibold hover:underline">
          Retourner à la marketplace
        </Link>
      </div>
    )
  }

  // Simulated Reviews
  const reviews = [
    {
      id: 1,
      author: "Diallo Frères Import",
      rating: 5,
      date: "14 Mai 2026",
      comment: "Excellent service. Dédouanement de 3 conteneurs à Abidjan réalisé en moins de 10 jours. Livraison à Bamako sans soucis."
    },
    {
      id: 2,
      author: "Moussa Sow (Commerce Général)",
      rating: 4,
      date: "02 Avril 2026",
      comment: "Bonne communication avec l'équipe de transit. Tarifs conformes aux estimations de départ, pas de frais cachés."
    }
  ]

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link 
        href="/dashboard/transitaires"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la marketplace
      </Link>

      {/* Main Grid Detail */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Details Profile, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/10 text-xl shrink-0">
                    {transitaire.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  {transitaire.verified && (
                    <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 text-[10px] px-2.5 py-1 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Vérifié KYB
                    </Badge>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{transitaire.name}</h2>
                  <p className="text-slate-400 text-xs mt-1">{transitaire.license} • Agréé UEMOA</p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-white">{transitaire.rating}</span>
                  </div>
                  <span className="text-slate-400">({transitaire.reviews} avis vérifiés)</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -z-0 translate-x-20 translate-y-20"></div>
            </div>

            {/* Description */}
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Présentation</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {transitaire.description}
                </p>
              </div>

              {/* Transit Details */}
              <div className="grid md:grid-cols-3 gap-6 border-t border-slate-100 pt-6 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Spécialité :</span>
                  <p className="font-bold text-slate-800 text-sm">{transitaire.specialty}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Destinations couvertes :</span>
                  <p className="font-bold text-slate-800 text-sm">{transitaire.destinations}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Délai indicatif :</span>
                  <p className="font-bold text-orange-600 text-sm">{transitaire.transitTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Reviews Section */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800">Avis clients vérifiés ({transitaire.reviews})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 divide-y divide-slate-100">
              {reviews.map((rev) => (
                <div key={rev.id} className="py-5 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{rev.author}</span>
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {rev.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Quote Request Form */}
        <div className="space-y-6">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base font-bold text-slate-800">Demander un Devis</CardTitle>
              <CardDescription className="text-xs">
                Dossier sécurisé par compte Escrow. Transit Express CI étudiera votre dossier.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RequestQuoteForm transitaireId={id} transitaireName={transitaire.name} />
            </CardContent>
          </Card>

          {/* Security details card */}
          <Card className="border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Acompte Bloqué</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  L'acompte que vous payez après acceptation du devis est mis sous séquestre par DoniCargo. Les fonds ne sont libérés qu'après validation de l'étape douanière correspondante.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
