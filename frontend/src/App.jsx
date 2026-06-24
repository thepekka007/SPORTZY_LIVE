import { AuthProvider } from "./context/AuthContext";
import  PrivateRoute  from "./context/PrivateRoute.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/NavBar.jsx";
import BackgroundCarousel from "./components/BackgroundCarousel.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Register from "./pages/RegisterPlayer.jsx";
import RegisterClub from "./pages/RegisterClub.jsx";
import CreateTournament from "./pages/CreateTournament.jsx";
import Tournament from "./pages/Tournament.jsx";
import MyTournaments from "./pages/Mytournaments.jsx";
import EditTournament from "./pages/EditTournament.jsx";


function App() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

useEffect(() => {
  const checkSession = async () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (!access || !refresh) return;

    try {
      const decoded = jwtDecode(access);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("Access token expired. Refreshing...");

        const res = await axios.post(
          `${BASE}/api/token/refresh/`,
          {
            refresh,
          }
        );

        localStorage.setItem(
          "access",
          res.data.access
        );
      }
    } catch (err) {
      console.error("Session expired:", err);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
  };

  checkSession();
}, []);
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
        <Route path="/RegisterClub" element={
          <PrivateRoute>
            <RegisterClub />
          </PrivateRoute>
        } />
        <Route path="/create-tournament" element={
          <PrivateRoute>
            <CreateTournament />
          </PrivateRoute>
        } />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/Mytournaments" element={
          <PrivateRoute>
            <MyTournaments />
          </PrivateRoute>
        } />
        <Route path="/EditTournament/:id" element={
          <PrivateRoute>
            <EditTournament />
          </PrivateRoute>
        } />


      </Routes>
    </div>
    );
}



export default App;