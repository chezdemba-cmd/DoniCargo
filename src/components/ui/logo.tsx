"use client"

import Image from 'next/image'

export function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 bg-white p-1.5 rounded-xl shadow-sm w-fit ${className}`}>
      <Image 
        src="/logo.png" 
        alt="DoniCargo Logo" 
        width={150}
        height={64}
        className="h-full w-auto object-contain drop-shadow-sm"
      />
    </div>
  )
}
