"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings, FolderOpen, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "../../context/AuthContext"   // ✅ context
import { useNavigate } from "react-router-dom"    // ✅ router

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navigationItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", isActive: true },
    { title: "Services", icon: Settings, href: "/services", isActive: false },
    { title: "Projects", icon: FolderOpen, href: "/projects", isActive: false },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">Dashboard</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.title}
              variant={item.isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground",
                item.isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-2",
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={async () => {
            await logout()
            navigate("/login", { replace: true })
          }}
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground",
            isCollapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
