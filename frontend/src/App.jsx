import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/NavBar.jsx";
import BackgroundCarousel from "./components/BackgroundCarousel.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Register from "./pages/RegisterPlayer.jsx";
import RegisterClub from "./pages/RegisterClub.jsx";
import CreateTournament from "./pages/CreateTournament.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // ✅ Apply dark mode globally jnjbj
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
        <Route path="/register-player" element={<Register />} />
        <Route path="/RegisterClub" element={<RegisterClub />} />
        <Route path="/create-tournament" element={<CreateTournament />} />


      </Routes>
    </div>
    );
}



export default App;