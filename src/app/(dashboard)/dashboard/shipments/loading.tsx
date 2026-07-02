import { Card } from "@/components/ui/card"
import { Package } from "lucide-react"

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-96 max-w-full bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded-xl"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm overflow-hidden h-[400px]">
            <div className="bg-slate-200 h-24 w-full"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
              <div className="h-8 w-full bg-slate-200 rounded"></div>
              <div className="h-32 w-full bg-slate-200 rounded mt-8"></div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
           <div className="h-5 w-40 bg-slate-200 rounded mb-4"></div>
           <div className="h-24 w-full bg-slate-200 rounded-xl"></div>
           <div className="h-24 w-full bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}

