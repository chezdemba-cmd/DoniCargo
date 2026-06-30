"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Truck, LayoutDashboard, FileText, Settings, LogOut, Bell, Briefcase, Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { href: "/dashboard/shipments", icon: Package, label: "Mes Conteneurs" },
    { href: "/dashboard/transitaires", icon: Truck, label: "Transitaires" },
    { href: "/dashboard/pro", icon: Briefcase, label: "Espace Pro (Transitaire)", isSpecial: true },
    { href: "/dashboard/documents", icon: FileText, label: "Coffre-fort" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Responsive */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-emerald-500 mr-2" />
            <span className="text-xl font-bold tracking-tight text-white">DoniCargo</span>
          </div>
          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={closeMobileMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href))
            const Icon = link.icon

            if (link.isSpecial) {
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors font-semibold ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 bg-emerald-500/5'}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.label}
                </Link>
              )
            }

            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 shrink-0">
          <Link 
            href="/settings" 
            onClick={closeMobileMenu}
            className={`flex items-center px-4 py-2 transition-colors ${pathname?.startsWith('/settings') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Paramètres
          </Link>
          <button className="flex w-full items-center px-4 py-2 mt-2 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 ensures flex children can shrink */}
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 mr-4 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">Vue d'ensemble</h2>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 text-sm sm:text-base">
              CO
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
