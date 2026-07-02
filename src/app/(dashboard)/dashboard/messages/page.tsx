import { createClient } from "@/lib/supabase/server"
import { Chat } from "@/components/chat"
import { MessageSquare, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Messagerie | DoniCargo",
}

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) {
    return <div>Non autorisé</div>
  }

  // Fetch quote requests where the user is either the client or a transitaire
  // To keep it simple, if they are the client, fetch their requests.
  // If they are a transitaire, fetch requests where they have submitted a quote, OR just fetch all open requests.
  // We'll fetch requests where they are the client for now. 
  // (In a real app, we'd also fetch where they are the transitaire and have active quotes)
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', userData.user.id).single()
  const isTransitaire = profile?.role === 'transitaire' || profile?.role === 'transporteur'

  let requestsQuery = supabase.from('quote_requests').select(`
    id,
    title,
    origin,
    destination,
    status
  `)

  if (!isTransitaire) {
    requestsQuery = requestsQuery.eq('client_id', userData.user.id)
  } else {
    // If transitaire, maybe they just see messages for open requests, or requests they bidded on.
    // For MVP, show all open requests.
    requestsQuery = requestsQuery.eq('status', 'ouvert')
  }

  const { data: requests } = await requestsQuery.order('created_at', { ascending: false }).limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messagerie Interne</h1>
        <p className="text-slate-500 text-sm">Discutez en direct avec les {isTransitaire ? 'commerçants' : 'transitaires'} pour finaliser vos devis.</p>
      </div>

      {!requests || requests.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Aucune discussion</h3>
          <p className="text-slate-500">Vous n'avez pas de demandes d'expédition actives pour le moment.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-800">{req.title}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${req.status === 'ouvert' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{req.origin} → {req.destination}</p>
              </div>
              
              <div className="flex-1">
                <Chat quoteRequestId={req.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
