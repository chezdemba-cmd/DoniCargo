"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Send, User } from "lucide-react"

interface Message {
  id: string
  content: string
  created_at: string
  sender_id: string
  profiles?: {
    full_name: string
  }
}

export function Chat({ quoteRequestId }: { quoteRequestId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUserId(user.id)

      // Fetch initial messages
      const { data } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          profiles ( full_name )
        `)
        .eq('quote_request_id', quoteRequestId)
        .order('created_at', { ascending: true })
      
      if (data) setMessages(data as any)
    }

    fetchUserAndMessages()

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`chat_${quoteRequestId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `quote_request_id=eq.${quoteRequestId}`
      }, async (payload) => {
        // Fetch sender profile for the new message
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', payload.new.sender_id)
          .single()

        const newMsg: Message = {
          id: payload.new.id,
          content: payload.new.content,
          created_at: payload.new.created_at,
          sender_id: payload.new.sender_id,
          profiles: profileData as any
        }

        setMessages(prev => [...prev, newMsg])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [quoteRequestId, supabase])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !userId) return

    const messageText = newMessage
    setNewMessage("") // Optimistic UI clear

    const { error } = await supabase.from('messages').insert([
      {
        quote_request_id: quoteRequestId,
        sender_id: userId,
        content: messageText
      }
    ])

    if (error) {
      console.error("Error sending message:", error)
      // Could show toast error here
    }
  }

  return (
    <div className="flex flex-col h-[500px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Discussion en direct</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-500">Connecté</span>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
            Aucun message pour l'instant. Lancez la discussion !
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === userId
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${isMe ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                  {!isMe && (
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500">{msg.profiles?.full_name || "Utilisateur"}</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <span className={`text-[10px] mt-1 block ${isMe ? 'text-orange-200' : 'text-slate-400'}`}>
                    {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
