import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import BackgroundCarousel from "./components/BackgroundCarousel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterPlayer from "./pages/RegisterPlayer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // ✅ Apply dark mode globally
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
       <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Routes>
        <Route path="/" element={<BackgroundCarousel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-player" element={<RegisterPlayer />} />
      </Routes>
    </div>
  );
}



export default App;