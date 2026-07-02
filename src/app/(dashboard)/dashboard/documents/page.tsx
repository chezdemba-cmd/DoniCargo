"use client"

import { useState } from "react"
import { Search, FileText, Download, Eye, Filter, ShieldCheck, FileCheck2, FileCode2, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_DOCUMENTS = [
  {
    id: "DOC-001",
    name: "Facture Commerciale - Electronics",
    type: "Facture",
    shipment: "CONTENEUR #HLX-9029",
    date: "10 Juin 2026",
    size: "2.4 MB",
    status: "Vérifié",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "DOC-002",
    name: "Connaissement (Bill of Lading)",
    type: "Transport",
    shipment: "CONTENEUR #HLX-9029",
    date: "12 Juin 2026",
    size: "4.1 MB",
    status: "Vérifié",
    icon: FileCheck2,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "DOC-003",
    name: "Quittance Douane - Zégoua",
    type: "Douane",
    shipment: "CONTENEUR #HLX-9029",
    date: "14 Juin 2026",
    size: "1.2 MB",
    status: "En attente",
    icon: FileCode2,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "DOC-004",
    name: "Facture Transitaire - Transit Express",
    type: "Facture",
    shipment: "CONTENEUR #HLX-9029",
    date: "15 Juin 2026",
    size: "800 KB",
    status: "Vérifié",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "DOC-005",
    name: "Certificat d'Origine",
    type: "Légal",
    shipment: "CONTENEUR #HLX-4421",
    date: "01 Mai 2026",
    size: "1.5 MB",
    status: "Vérifié",
    icon: ShieldCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  }
]

export default function DocumentsVaultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Tous")

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.shipment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "Tous" || doc.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-slate-800">Coffre-fort Documentaire</h1>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl">
            Retrouvez tous vos documents douaniers, factures et connaissements de manière centralisée et sécurisée. Vos données sont cryptées de bout en bout.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Tout télécharger (.zip)
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un document ou un numéro de conteneur..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          {["Tous", "Facture", "Douane", "Transport", "Légal"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === type 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="group hover:border-orange-200 hover:shadow-md transition-all cursor-pointer overflow-hidden border-slate-200">
            <CardContent className="p-0">
              {/* Card Header (Preview Mock) */}
              <div className="h-32 bg-slate-50 flex items-center justify-center border-b border-slate-100 relative group-hover:bg-slate-100 transition-colors">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${doc.bgColor}`}>
                  <doc.icon className={`w-8 h-8 ${doc.color}`} />
                </div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2" title={doc.name}>
                    {doc.name}
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {doc.shipment}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400">{doc.date} • {doc.size}</p>
                    <Badge variant="secondary" className={doc.status === "Vérifié" ? "bg-green-50 text-green-700 border-green-200" : "bg-orange-50 text-orange-700 border-orange-200"}>
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredDocs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
          <div className="inline-flex w-16 h-16 rounded-full bg-slate-50 items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Aucun document trouvé</h3>
          <p className="text-slate-500 text-sm mt-1">Modifiez vos critères de recherche ou de filtre.</p>
        </div>
      )}
    </div>
  )
}

