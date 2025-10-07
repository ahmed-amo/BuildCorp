import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Services from "../pages/services";
import ServiceDetailPage from "../pages/servicesDetail";
import Projects from "../pages/projects";
import Login from "../pages/login";
import Dashboard from "../pages/admin/dashboard-layout";
import StatsDashboard from "../src/assets/dashboard/dashboard-stats";
import ServicesDashboard from "../src/assets/dashboard/services/page";
import ProjectsDashboard from "../src/assets/dashboard/projects/page";
import RequireAuth from "../src/context/RequireAuth";
import "./assets/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Route>

        {/* Login Route (no layout) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="stats" element={<StatsDashboard />} />
            <Route path="services" element={<ServicesDashboard />} />
            <Route path="projects" element={<ProjectsDashboard />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;