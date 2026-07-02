"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Truck, LayoutDashboard, FileText, Settings, LogOut, Bell, Briefcase, Menu, X, Calculator, ChevronDown, MessageSquare } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isDemoRoleOpen, setIsDemoRoleOpen] = useState(false)
  const pathname = usePathname()

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { href: "/dashboard/shipments", icon: Package, label: "Mes Conteneurs" },
    { href: "/dashboard/transitaires", icon: Truck, label: "Transitaires" },
    { href: "/dashboard/calculator", icon: Calculator, label: "Calculateur IA Douane" },
    { href: "/dashboard/messages", icon: MessageSquare, label: "Messagerie" },
    { href: "/dashboard/pro", icon: Briefcase, label: "Espace Pro (Transitaire)" },
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
          <div className="flex items-center pt-2">
            <Logo className="w-auto h-8 text-xl mr-3" />
          </div>
          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={closeMobileMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href))
            const Icon = link.icon

            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={closeMobileMenu}
                className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-medium ${isActive ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-orange-400 hover:translate-x-1'}`}
              >
                <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${isActive ? 'text-orange-500' : 'group-hover:text-orange-400'}`} />
                {link.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 shrink-0">
          <Link 
            href="/dashboard/settings" 
            onClick={closeMobileMenu}
            className={`flex items-center px-4 py-2 transition-colors ${pathname?.startsWith('/dashboard/settings') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Paramètres
          </Link>
          <button className="flex items-center px-4 py-2 mt-2 text-slate-400 hover:text-white transition-colors w-full">
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
            
            {/* Demo Role Switcher */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsDemoRoleOpen(!isDemoRoleOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Sélecteur de Rôle (Démo)</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isDemoRoleOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDemoRoleOpen(false)}></div>
                  <div className="absolute top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 py-1 right-0 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">Basculer vers</div>
                    <Link href="/dashboard" onClick={() => setIsDemoRoleOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                      👤 Espace Client
                    </Link>
                    <Link href="/dashboard/pro" onClick={() => setIsDemoRoleOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors border-t border-slate-50">
                      🏢 Espace Transitaire
                    </Link>
                    <Link href="/dashboard/admin" onClick={() => setIsDemoRoleOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors border-t border-slate-50 font-medium">
                      🛡️ Super-Admin
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">Notifications</h3>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">2 Nouvelles</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer bg-orange-50/30">
                        <p className="text-sm font-semibold text-slate-800">Devis accepté !</p>
                        <p className="text-xs text-slate-500 mt-1">Votre devis pour le transport vers Bamako a été validé.</p>
                        <span className="text-[10px] text-slate-400 mt-2 block">Il y a 5 min</span>
                      </div>
                      <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer bg-orange-50/30">
                        <p className="text-sm font-semibold text-slate-800">Paiement Escrow sécurisé</p>
                        <p className="text-xs text-slate-500 mt-1">450 000 FCFA ont été bloqués sur votre dossier HLX-9029.</p>
                        <span className="text-[10px] text-slate-400 mt-2 block">Il y a 10 min</span>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                        <p className="text-sm font-semibold text-slate-800">Statut mis à jour</p>
                        <p className="text-xs text-slate-500 mt-1">Votre conteneur est désormais en phase de dédouanement.</p>
                        <span className="text-[10px] text-slate-400 mt-2 block">Hier</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                      <button 
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-sm text-orange-600 font-semibold hover:underline"
                      >
                        Tout marquer comme lu
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold border border-orange-200 text-sm sm:text-base">
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

