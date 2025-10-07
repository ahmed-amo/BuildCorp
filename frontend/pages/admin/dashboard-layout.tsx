import React from "react"

import { Outlet } from "react-router-dom"
import Sidebar  from "../../src/assets/dashboard/sidebar"
import Header from "../../src/assets/dashboard/dashboard-header"


export  default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}