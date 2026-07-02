"use client"

import React, { useState } from 'react'

export function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 bg-white p-1.5 rounded-xl shadow-sm w-fit ${className}`}>
      <img 
        src="/logo.png" 
        alt="DoniCargo Logo" 
        className="h-full w-auto object-contain drop-shadow-sm"
      />
    </div>
  )
}
