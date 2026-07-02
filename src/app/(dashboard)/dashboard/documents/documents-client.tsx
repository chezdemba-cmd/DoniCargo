"use client"

import { useState, useTransition, useRef } from "react"
import { FileText, UploadCloud, File, Image as ImageIcon, Search, Filter, Download, Trash2, CheckCircle2, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { uploadDocument } from "@/app/actions/upload_document"

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export interface DocumentItem {
  id: string;
  name: string;
  type?: string;
  size?: string;
  size_bytes?: number;
  date?: string;
  status?: string;
  relatedTo?: string;
  url?: string;
}

export default function DocumentsClient({ initialDocuments }: { initialDocuments: DocumentItem[] }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, startUpload] = useTransition()
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Utiliser les données de la BD ou les mock data
  const documents = initialDocuments.length > 0 ? initialDocuments : [
    {
      id: "DOC-001",
      name: "Connaissement_MSC_892019.pdf",
      type: "pdf",
      size: "2.4 MB",
      date: "Aujourd'hui, 10:42",
      status: "validé",
      relatedTo: "Lot de Colis Électroniques"
    },
    {
      id: "DOC-002",
      name: "Facture_Proforma_Sogem.pdf",
      type: "pdf",
      size: "1.1 MB",
      date: "Hier, 15:30",
      status: "en_attente",
      relatedTo: "Demande de Devis #QT-1088"
    }
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Le fichier dépasse la limite de 10 MB.")
      return
    }
    setUploadError(null)

    const formData = new FormData()
    formData.append("file", file)

    startUpload(async () => {
      const res = await uploadDocument(formData)
      if (res?.error) {
        setUploadError(res.error)
      } else {
        // Succès : le serveur va revalider la route et recharger la liste
        if (fileInputRef.current) {
          fileInputRef.current.value = "" // reset input
        }
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Coffre-fort Numérique</h1>
          <p className="text-sm text-slate-500 mt-1">
            Centralisez et sécurisez tous vos documents logistiques (Factures, Connaissements, Quittances).
          </p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
          Historique des partages
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Col: Upload Zone & Storage Info */}
        <div className="space-y-6">
          {uploadError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
              {uploadError}
            </div>
          )}

          {/* Upload Dropzone */}
          <Card 
            className={`border-2 border-dashed transition-all duration-300 ${isDragging ? 'border-orange-500 bg-orange-50/50 scale-[1.02]' : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
                {isUploading ? <RefreshCw className="w-8 h-8 animate-spin text-orange-600" /> : <UploadCloud className="w-8 h-8" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 mb-1">
                  {isUploading ? "Envoi en cours..." : "Glissez-déposez vos fichiers ici"}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  PDF, JPG, PNG jusqu&apos;à 10MB
                </p>
                <label className={`cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors inline-block ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  Parcourir les fichiers
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isUploading}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Storage capacity mock */}
          <Card className="border-slate-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Espace de stockage sécurisé</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>8.3 MB utilisés</span>
                  <span>100 MB max (Gratuit)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[8%] rounded-full"></div>
                </div>
              </div>
              <button className="w-full py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Passer au plan Premium
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Documents List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher un document (ex: Facture)..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>

          {/* Document Table/List */}
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fichiers récents</span>
              <span className="text-xs text-slate-400 font-medium">{documents.length} fichiers</span>
            </div>
            <div className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${doc.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {doc.type === 'pdf' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span>{doc.size || formatBytes(doc.size_bytes || 0)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{doc.date}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Liaison : {doc.relatedTo || "Non assigné"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {doc.status === 'validé' ? (
                      <Badge className="hidden sm:inline-flex bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Validé
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="hidden sm:inline-flex text-amber-600 border-amber-200 bg-amber-50">
                        En attente
                      </Badge>
                    )}
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={doc.url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Ouvrir">
                        <Download className="w-4 h-4" />
                      </a>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">
                  Aucun document dans le coffre-fort.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

