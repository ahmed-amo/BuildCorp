import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout"
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Services from "../pages/services";
import Projects from "../pages/projects";
import Login from "../pages/login";
import "./assets/global.css";
import Dashboard from "../pages/Admin/dashboard";
import RequireAuth from "../src/context/RequireAuth";


function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home"element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Projects />}/>
          <Route element={<RequireAuth />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
