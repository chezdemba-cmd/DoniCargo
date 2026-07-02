import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-96 max-w-full bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-10 w-48 bg-slate-200 rounded-xl shrink-0"></div>
      </div>

      {/* Filter and Search Bar Skeleton */}
      <Card className="p-4 border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md h-10 bg-slate-100 rounded-lg"></div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="h-10 w-32 bg-slate-100 rounded-lg flex-1 md:flex-initial"></div>
          <div className="h-10 w-32 bg-slate-100 rounded-lg flex-1 md:flex-initial"></div>
          <div className="h-10 w-10 bg-slate-100 rounded-lg"></div>
        </div>
      </Card>

      {/* Grid List Transitaires Skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
              <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="h-3 w-full bg-slate-200 rounded"></div>
              <div className="h-3 w-full bg-slate-200 rounded"></div>
              <div className="h-3 w-full bg-slate-200 rounded"></div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
              <div className="h-10 flex-1 bg-slate-200 rounded-lg"></div>
              <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

