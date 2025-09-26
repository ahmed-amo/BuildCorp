import React from "react"
import { Sidebar } from "../../src/assets/dashboard/sidebar"
import { DashboardHeader } from "../../src/assets/dashboard/dashboard-header"
import { DashboardContent } from "../../src/assets/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}