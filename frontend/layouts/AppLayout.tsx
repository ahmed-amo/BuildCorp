import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "../headers/navbar.tsx";
import Footer from "../headers/Footer.tsx";

export default function AppLayout() { 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}