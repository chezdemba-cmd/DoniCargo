"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Shield, Truck, MapPin, BadgeCheck, AlertCircle, MessageSquare, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shipment } from "@/services/shipments"
import { TrackingMap } from "@/components/ui/tracking-map"

export default function ShipmentsClient({ initialData }: { initialData: Shipment[] }) {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
    initialData.length > 0 ? initialData[0].id : null
  )

  const selectedShipment = initialData.find((s) => s.id === selectedShipmentId)

  // Quick helper for steps
  const steps = ["navire", "port", "douane", "route", "livre"]
  const currentStepIndex = selectedShipment ? steps.indexOf(selectedShipment.status) : -1

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Suivi de mes Marchandises</h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualisez et pilotez le transit de vos conteneurs et lots de marchandises de bout en bout.
          </p>
        </div>
        <button 
          onClick={() => {
            alert("Pour créer un nouveau transport, il suffit de demander un devis à un transitaire ou via notre système d'appel d'offres.");
            window.location.href = '/dashboard/transitaires';
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm inline-flex items-center gap-2 transition-colors"
        >
          <Package className="w-4 h-4" />
          Nouveau Transport
        </button>
      </div>

      {initialData.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Aucune expédition en cours</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Vous n&apos;avez aucune expédition active pour le moment. Demandez un devis à un transitaire pour commencer.
          </p>
          <Link 
            href="/dashboard/transitaires"
            className="inline-flex bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Trouver un transitaire
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Shipments Cards & Detailed Logistics Timeline */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Selected Shipment Card */}
            {selectedShipment && (
              <Card className="border-slate-100 shadow-sm overflow-hidden">
                {/* Header of Card */}
                <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 text-[10px] px-2 py-0.5 font-semibold tracking-wider uppercase">
                      Dossier Actif
                    </Badge>
                    <h3 className="text-xl font-bold mt-2">{selectedShipment.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedShipment.origin} → {selectedShipment.destination}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-slate-400">Escrow Sécurisé</p>
                    <p className="text-lg font-bold text-orange-400">
                      {selectedShipment.escrow_amount ? `${selectedShipment.escrow_amount.toLocaleString()} FCFA` : 'Non défini'}
                    </p>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <CardContent className="p-6 border-b border-slate-100">
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-6">Progression de l&apos;acheminement</h4>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0"></div>
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 z-0 transition-all duration-500" 
                      style={{ width: `${Math.max(0, currentStepIndex * 25)}%` }}
                    ></div>
                    
                    {/* Navigation step nodes (simplified simulation based on currentStepIndex) */}
                    {["Départ", "Port", "Douane", "Transport", "Livré"].map((step, idx) => {
                      const isCompleted = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      
                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          {isCompleted ? (
                            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                              ✓
                            </div>
                          ) : isCurrent ? (
                            <div className="w-8 h-8 rounded-full bg-white border-4 border-orange-500 text-orange-600 flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                              {idx + 1}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs shadow-sm">
                              {idx + 1}
                            </div>
                          )}
                          <span className={`text-xs mt-2 text-center ${isCurrent || isCompleted ? 'font-bold text-slate-800' : 'font-medium text-slate-400'}`}>
                            {step}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>

                  {/* Quotes Received */}
                  {selectedShipment.quotes && selectedShipment.quotes.length > 0 && (
                    <CardContent className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">Devis Reçus</h4>
                      <div className="space-y-3">
                        {selectedShipment.quotes.map((quote: any) => (
                          <div key={quote.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-200 transition-colors shadow-sm">
                            <div className="mb-3 sm:mb-0">
                              <h5 className="font-bold text-slate-800 text-sm">
                                {quote.profiles?.full_name || 'Transitaire Partenaire'}
                              </h5>
                              <p className="text-xs text-slate-500 mt-0.5">Offre pour cette expédition</p>
                              {quote.status === 'accepte' && (
                                <Badge className="mt-2 bg-orange-50 text-orange-700 border-orange-200">Offre Acceptée</Badge>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                              <div className="text-left sm:text-right">
                                <p className="font-bold text-lg text-slate-800">{quote.amount_cents ? `${quote.amount_cents.toLocaleString()} FCFA` : 'Sur demande'}</p>
                              </div>
                              {quote.status !== 'accepte' && (
                                <button 
                                  onClick={async () => {
                                    const { acceptQuote } = await import('@/app/actions/accept_quote');
                                    await acceptQuote(quote.id, selectedShipment.id);
                                    window.location.href = `/dashboard/escrow/payment?shipmentId=${selectedShipment.id}&quoteId=${quote.id}`;
                                  }}
                                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                                >
                                  Accepter & Payer
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}

                  {/* Live GPS Tracking Map */}
                  <CardContent className="p-6 border-b border-slate-100">
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
                      Carte Interactive (Suivi GPS)
                    </h4>
                    <TrackingMap 
                      origin={selectedShipment.origin} 
                      destination={selectedShipment.destination} 
                      progress={["navire", "port", "douane", "route"].includes(selectedShipment.status) ? 65 : selectedShipment.status === "livre" ? 100 : 25}
                      temperature={selectedShipment.origin.includes("Abidjan") ? "18°C (Régulé)" : undefined}
                    />
                  </CardContent>

                  {/* Logistics Journal Timeline (Mock for now as it needs a separate logs table) */}
                  <CardContent className="p-6 space-y-6">
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 pb-3">
                      Journal d&apos;activité logistique
                    </h4>
                    <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      <div className="text-sm text-slate-500">Mises à jour non disponibles pour cette expédition.</div>
                    </div>
                  </CardContent>

                  {/* Messagerie Interne (Chat) */}
                  <CardContent className="p-6 border-t border-slate-100 bg-slate-50/30">
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Messagerie avec le transitaire
                    </h4>
                    
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-[300px]">
                      {/* Chat Messages */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <div className="flex flex-col gap-1 items-end">
                          <div className="bg-orange-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                            Bonjour, j&apos;ai accepté votre devis. Quand pensez-vous pouvoir enlever la marchandise ?
                          </div>
                          <span className="text-[10px] text-slate-400">10:45</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                          <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
                            Bonjour ! Merci pour votre confiance. L&apos;enlèvement est prévu demain matin. Nous attendons juste la confirmation du paiement Escrow.
                          </div>
                          <span className="text-[10px] text-slate-400">11:02</span>
                        </div>
                      </div>
                      
                      {/* Chat Input */}
                      <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Écrivez votre message..." 
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
                        />
                        <button className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
              </Card>
            )}
          </div>

          {/* Right Col: Logistics Operator Info, Docs, Actions */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mes autres dossiers</h3>
            {initialData.map((shipment) => (
              <Card 
                key={shipment.id} 
                className={`border-slate-100 shadow-sm cursor-pointer transition-all ${selectedShipmentId === shipment.id ? 'ring-2 ring-orange-500' : 'hover:border-orange-200'}`}
                onClick={() => setSelectedShipmentId(shipment.id)}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm">{shipment.title}</h4>
                    <Badge variant="outline" className="text-[10px]">{shipment.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{shipment.origin} → {shipment.destination}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

