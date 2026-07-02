"use client"

import { MapPin, Navigation, Thermometer, Clock } from "lucide-react"

interface TrackingMapProps {
  origin: string
  destination: string
  progress: number // 0 to 100
  estimatedTime?: string
  temperature?: string
}

export function TrackingMap({ 
  origin, 
  destination, 
  progress = 50,
  estimatedTime = "Demain, 14:00",
  temperature = "En attente" 
}: TrackingMapProps) {
  
  // Calculate dash offset for the animated path
  const pathLength = 300 // Approximate length of the SVG path
  const dashOffset = pathLength - (pathLength * progress) / 100

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[300px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* SVG Map Area */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="xMidYMid meet">
          {/* Abstract coastline & borders */}
          <path d="M 0,250 Q 150,280 200,300 L 0,300 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <path d="M 200,300 Q 250,260 400,280 L 400,300 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          
          {/* The Route Path (Background) */}
          <path 
            d="M 120,240 C 150,180 220,150 280,60" 
            fill="none" 
            stroke="#334155" 
            strokeWidth="4" 
            strokeDasharray="8 8"
          />

          {/* The Route Path (Active/Animated) */}
          <path 
            d="M 120,240 C 150,180 220,150 280,60" 
            fill="none" 
            stroke="#f97316" 
            strokeWidth="4" 
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Origin Marker (Abidjan usually, bottom leftish) */}
          <g transform="translate(120,240)">
            <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#f97316" strokeWidth="3" />
            <circle cx="0" cy="0" r="6" fill="#f97316" />
            <text x="-15" y="30" fill="#cbd5e1" fontSize="12" fontWeight="bold" fontFamily="system-ui">{origin}</text>
          </g>

          {/* Destination Marker (Bamako usually, top rightish) */}
          <g transform="translate(280,60)">
            <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="0" cy="0" r="6" fill="#3b82f6" />
            <text x="-10" y="-20" fill="#cbd5e1" fontSize="12" fontWeight="bold" fontFamily="system-ui">{destination}</text>
          </g>

          {/* Moving Truck/Position Marker based on Progress */}
          {/* We use an approximation for the position along the curve */}
          <g style={{ 
              transform: `translate(${120 + (160 * progress / 100)}px, ${240 - (180 * progress / 100)}px)`,
              transition: 'transform 1s ease-in-out'
            }}>
            <circle cx="0" cy="0" r="24" fill="rgba(249, 115, 22, 0.2)" className="animate-ping" />
            <circle cx="0" cy="0" r="10" fill="#f97316" className="drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <rect x="-6" y="-6" width="12" height="12" fill="#fff" rx="2" />
          </g>
        </svg>

        {/* Telemetry Panel Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-3 shadow-xl space-y-3 w-48">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-700 pb-2">
            Télémétrie en direct
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Vitesse</p>
              <p className="text-xs font-bold text-slate-200">75 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Arrivée estimée</p>
              <p className="text-xs font-bold text-slate-200">{estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Thermometer className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Température</p>
              <p className="text-xs font-bold text-slate-200">{temperature}</p>
            </div>
          </div>
        </div>
        
        {/* Status indicator bottom left */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-300">Connexion GPS active</span>
        </div>
      </div>
    </div>
  )
}

