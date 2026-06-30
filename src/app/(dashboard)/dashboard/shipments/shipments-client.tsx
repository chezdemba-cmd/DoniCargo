"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Shield, Truck, MapPin, BadgeCheck, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shipment } from "@/services/shipments"

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
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm inline-flex items-center gap-2 transition-colors">
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
            Vous n'avez aucune expédition active pour le moment. Demandez un devis à un transitaire pour commencer.
          </p>
          <Link 
            href="/dashboard/transitaires"
            className="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
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
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-[10px] px-2 py-0.5 font-semibold tracking-wider uppercase">
                      Dossier Actif
                    </Badge>
                    <h3 className="text-xl font-bold mt-2">{selectedShipment.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedShipment.origin} → {selectedShipment.destination}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-slate-400">Escrow Sécurisé</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {selectedShipment.escrow_amount ? `${selectedShipment.escrow_amount.toLocaleString()} FCFA` : 'Non défini'}
                    </p>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <CardContent className="p-6 border-b border-slate-100">
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-6">Progression de l'acheminement</h4>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0"></div>
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 z-0 transition-all duration-500" 
                      style={{ width: `${Math.max(0, currentStepIndex * 25)}%` }}
                    ></div>
                    
                    {/* Navigation step nodes (simplified simulation based on currentStepIndex) */}
                    {["Départ", "Port", "Douane", "Transport", "Livré"].map((step, idx) => {
                      const isCompleted = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      
                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          {isCompleted ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                              ✓
                            </div>
                          ) : isCurrent ? (
                            <div className="w-8 h-8 rounded-full bg-white border-4 border-emerald-500 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
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

                {/* Logistics Journal Timeline (Mock for now as it needs a separate logs table) */}
                <CardContent className="p-6 space-y-6">
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 pb-3">
                    Journal d'activité logistique
                  </h4>
                  <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    <div className="text-sm text-slate-500">Mises à jour non disponibles pour cette expédition.</div>
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
                className={`border-slate-100 shadow-sm cursor-pointer transition-all ${selectedShipmentId === shipment.id ? 'ring-2 ring-emerald-500' : 'hover:border-emerald-200'}`}
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
