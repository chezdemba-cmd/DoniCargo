"use client"

import { useState } from "react"
import { Calculator, Sparkles, ArrowRight, FileText, AlertCircle, TrendingUp, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const CATEGORIES = [
  { id: "cat0", label: "0 - Biens sociaux essentiels (Ex: Médicaments, Livres)", rate: 0.00 },
  { id: "cat1", label: "1 - Biens de première nécessité, matières premières", rate: 0.05 },
  { id: "cat2", label: "2 - Intrants et biens intermédiaires", rate: 0.10 },
  { id: "cat3", label: "3 - Biens de consommation finale", rate: 0.20 },
]

export default function CalculatorClient() {
  const [fob, setFob] = useState<string>("")
  const [freight, setFreight] = useState<string>("")
  const [insurance, setInsurance] = useState<string>("")
  const [category, setCategory] = useState<number>(0.20) // Default to cat3

  // Constants UEMOA
  const RSTA_RATE = 0.01 // Redevance Statistique (1%)
  const PCS_RATE = 0.008 // Prélèvement Communautaire de Solidarité (0.8%)
  const TVA_RATE = 0.18 // TVA (18%)

  // Calculation Logic
  const valFob = Number(fob) || 0
  const valFreight = Number(freight) || 0
  const valInsurance = Number(insurance) || 0

  const cif = valFob + valFreight + valInsurance
  
  const dd = cif * category
  const rsta = cif * RSTA_RATE
  const pcs = cif * PCS_RATE
  
  const baseTva = cif + dd + rsta + pcs
  const tva = baseTva * TVA_RATE
  
  const totalTaxes = dd + rsta + pcs + tva
  const totalCost = cif + totalTaxes

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Propulsé par DoniCargo IA
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Calculateur de Douane UEMOA</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Estimez instantanément vos droits et taxes de douane pour toutes vos importations en Afrique de l&apos;Ouest. 
            Nos calculs sont basés sur le Tarif Extérieur Commun (TEC) officiel de l&apos;UEMOA.
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-0"></div>
        <Calculator className="absolute -right-4 top-4 w-48 h-48 text-white/5 rotate-12" />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 shadow-lg shadow-slate-200/40">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Paramètres de l&apos;importation</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Catégorie de la marchandise (TEC)</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-sm"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.rate}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Valeur de la Marchandise (FOB)
                  <span className="text-slate-400 font-normal">En FCFA</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={fob}
                    onChange={(e) => setFob(e.target.value)}
                    placeholder="Ex: 10 000 000"
                    className="w-full pl-4 pr-16 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">FCFA</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Frais de Transport (Fret)
                  <span className="text-slate-400 font-normal">En FCFA</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={freight}
                    onChange={(e) => setFreight(e.target.value)}
                    placeholder="Ex: 2 500 000"
                    className="w-full pl-4 pr-16 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">FCFA</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Frais d&apos;Assurance
                  <span className="text-slate-400 font-normal">En FCFA</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="Généralement 1% du (FOB + Fret)"
                    className="w-full pl-4 pr-16 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">FCFA</span>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => setInsurance(Math.round((valFob + valFreight) * 0.01).toString())}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Estimer l&apos;assurance à 1%
                  </button>
                </div>
              </div>

            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-sm leading-relaxed">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Avertissement:</strong> Ces calculs sont purement estimatifs. La valeur en douane finale et la classification tarifaire exacte sont déterminées par les autorités douanières.
            </p>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200 shadow-2xl shadow-slate-200/50 h-full flex flex-col overflow-hidden">
            <div className="bg-slate-900 p-8 text-center border-b border-slate-800 shrink-0">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">Total Estimé des Taxes</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                {totalTaxes.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} <span className="text-2xl text-slate-500">FCFA</span>
              </h2>
            </div>
            
            <CardContent className="p-0 flex-1 bg-slate-50">
              {cif === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-slate-400">
                  <Calculator className="w-16 h-16 mb-4 opacity-20" />
                  <p>Saisissez vos valeurs pour voir la répartition des taxes.</p>
                </div>
              ) : (
                <div className="p-8 space-y-6">
                  {/* Valeur en Douane */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        Valeur en Douane (CIF)
                      </h4>
                      <span className="font-bold text-lg text-slate-900">{cif.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">Somme du FOB, Fret et Assurance. C&apos;est la base de calcul des taxes.</p>
                    <div className="h-px bg-slate-200 w-full"></div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div>
                        <p className="font-semibold text-sm text-slate-700">Droits de Douane (DD)</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Taux appliqué : {(category * 100).toFixed(0)}%</p>
                      </div>
                      <span className="font-bold text-slate-800">{dd.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div>
                        <p className="font-semibold text-sm text-slate-700">Redevance Statistique (RSTA)</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Taux fixe UEMOA : 1%</p>
                      </div>
                      <span className="font-bold text-slate-800">{rsta.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div>
                        <p className="font-semibold text-sm text-slate-700">Prélèvement de Solidarité (PCS)</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Taux fixe UEMOA : 0.8%</p>
                      </div>
                      <span className="font-bold text-slate-800">{pcs.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-100 shadow-sm ring-1 ring-blue-50">
                      <div>
                        <p className="font-bold text-sm text-blue-900">Taxe sur la Valeur Ajoutée (TVA)</p>
                        <p className="text-[10px] text-blue-500/80 uppercase font-bold tracking-wider mt-0.5">Taux appliqué : 18% (Base = CIF + DD + RSTA + PCS)</p>
                      </div>
                      <span className="font-bold text-blue-700">{tva.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-600">Coût d&apos;importation total estimé</span>
                      <span className="text-xl font-bold text-slate-900">{totalCost.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA</span>
                    </div>
                    <p className="text-xs text-right text-slate-400 mt-1">(Marchandise + Transport + Assurance + Taxes)</p>
                  </div>
                  
                  <div className="pt-4">
                     <button 
                       onClick={() => window.location.href = '/dashboard/shipments/new'}
                       className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                     >
                       <FileText className="w-4 h-4" />
                       Créer une demande de cotation avec ce calcul
                     </button>
                  </div>

                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </motion.div>
  )
}

