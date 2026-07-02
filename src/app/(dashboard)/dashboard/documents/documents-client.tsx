"use client"

import { useState } from "react"
import { Search, FileText, Download, Eye, Filter, ShieldCheck, FileCheck2, FileCode2, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface DocumentRecord {
  id: string
  name: string
  doc_type: string
  shipment: string
  date: string
  size_bytes: number
  status: string
  file_url: string
}

export default function DocumentsVaultClient({ documents }: { documents: DocumentRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Tous")

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.shipment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "Tous" || doc.doc_type === filterType
    return matchesSearch && matchesType
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'Facture': return <FileText className="w-5 h-5 text-blue-500" />
      case 'Transport': return <FileCheck2 className="w-5 h-5 text-orange-500" />
      case 'Douane': return <FileCode2 className="w-5 h-5 text-green-500" />
      default: return <ShieldCheck className="w-5 h-5 text-purple-500" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'Facture': return 'bg-blue-50'
      case 'Transport': return 'bg-orange-50'
      case 'Douane': return 'bg-green-50'
      default: return 'bg-purple-50'
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher par nom de fichier, type ou N° de conteneur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["Tous", "Facture", "Transport", "Douane", "Légal"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border shadow-sm ${filterType === type ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <FileText className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Aucun document trouvé</h3>
          <p className="text-slate-500 max-w-sm">Les documents téléversés par votre transitaire apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBgColor(doc.doc_type)}`}>
                    {getIcon(doc.doc_type)}
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                    {doc.status}
                  </Badge>
                </div>
                
                <div className="mb-4 flex-1">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2" title={doc.name}>{doc.name}</h3>
                  <p className="text-xs text-orange-600 font-semibold mt-1">{doc.shipment}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-slate-100">
                  <span>{doc.date}</span>
                  <span>{formatSize(doc.size_bytes)}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-200">
                    <Eye className="w-3.5 h-3.5" />
                    Voir
                  </button>
                  <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                    <Download className="w-3.5 h-3.5" />
                    Télécharger
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
