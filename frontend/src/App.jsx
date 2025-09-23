import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout"
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import "./assets/global.css"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
