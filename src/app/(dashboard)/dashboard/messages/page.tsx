"use client"

import { useState } from "react"
import { Send, MapPin, Check, CheckCheck, Paperclip, MoreVertical, Phone, Image as ImageIcon } from "lucide-react"

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour, le conteneur a passé la douane de Dakar ce matin.", sender: "pro", time: "10:30", read: true },
    { id: 2, text: "Excellent ! Quand pensez-vous arriver à la frontière de Zégoua ?", sender: "client", time: "10:35", read: true },
    { id: 3, text: "D'ici jeudi. Je vous enverrai ma position en temps réel quand j'approcherai.", sender: "pro", time: "10:38", read: true },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSend = () => {
    if (!inputMessage.trim()) return
    setMessages([...messages, { id: Date.now(), text: inputMessage, sender: "client", time: "Maintenant", read: false }])
    setInputMessage("")
  }

  const handleShareLocation = () => {
    setMessages([...messages, { 
      id: Date.now(), 
      text: "📍 [Position GPS Partagée] RN7, Près de Zégoua (Mali)", 
      sender: "client", 
      time: "Maintenant", 
      read: false 
    }])
  }

  return (
    <div className="h-[calc(100vh-8rem)] bg-slate-50 flex rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-fadeIn">
      {/* Sidebar - Contacts */}
      <div className="w-80 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Active Chat */}
          <div className="p-4 flex items-center gap-3 cursor-pointer bg-slate-50 border-l-4 border-orange-500">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                TE
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-slate-800 truncate">Transit Express</h3>
                <span className="text-[10px] text-slate-400">10:38</span>
              </div>
              <p className="text-sm text-slate-500 truncate">D&apos;ici jeudi. Je vous enverrai...</p>
            </div>
          </div>
          
          {/* Inactive Chat */}
          <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                DT
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-slate-800 truncate">Support DoniCargo</h3>
                <span className="text-[10px] text-slate-400">Hier</span>
              </div>
              <p className="text-sm text-slate-500 truncate">Votre KYC a été validé.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#efeae2]">
        {/* Chat Header */}
        <div className="bg-white px-4 h-16 flex items-center justify-between border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 md:hidden">
              TE
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Transit Express CI</h2>
              <p className="text-xs text-green-500 font-medium">En ligne</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-slate-600 transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="hover:text-slate-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center">
            <span className="inline-block bg-white/60 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Aujourd&apos;hui
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === "client"
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                  isMe ? "bg-slate-900 text-white rounded-br-none" : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                }`}>
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${isMe ? "text-slate-400" : "text-slate-400"}`}>
                    <span className="text-[10px]">{msg.time}</span>
                    {isMe && (
                      msg.read ? <CheckCheck className="w-3 h-3 text-blue-400" /> : <Check className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Input Area */}
        <div className="bg-slate-100 px-4 py-3 flex items-end gap-2 border-t border-slate-200">
          <button className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <button 
            onClick={handleShareLocation}
            className="p-3 text-orange-500 hover:bg-orange-100 rounded-full transition-colors shrink-0"
            title="Partager ma position GPS"
          >
            <MapPin className="w-5 h-5" />
          </button>
          
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center px-4">
            <input 
              type="text" 
              placeholder="Écrivez un message..." 
              className="flex-1 bg-transparent py-3 focus:outline-none text-slate-800"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="text-slate-400 hover:text-slate-600 transition-colors p-2">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={handleSend}
            className={`p-3 rounded-full shrink-0 transition-colors ${
              inputMessage.trim() ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md" : "bg-slate-300 text-white cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
