import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";// ✅
import { FaUserCircle } from "react-icons/fa";
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Register Club", path: "/register-club" },
    { name: "Register Player", path: "/register-player" },
    { name: "Create Tournament", path: "/create-tournament" },
    { name: "Tournament", path: "/tournament" },
    { name: "Ranking", path: "/ranking" },
    // { icon: <FaUserCircle size={25} /> , path: "/login", },

    // { name: "Signup", path: "/signup" },
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50 lg:flex lg:justify-center lg:mt-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-center 
        bg-white dark:bg-gray-900 
        rounded-2xl px-4 lg:px-8 py-2 shadow-lg transition"
      >
        <div className="flex items-center justify-between w-full space-x-6">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-black dark:text-white">
            Sportzy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500">
                {/* Icon */}
                {item.icon && item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
         <div className="flex items-center space-x-3">

  {/* Login Icon - visible on all screens */}
  <Link to="/login">
    <FaUserCircle size={25} className="text-gray-700 dark:text-white" />
  </Link>

  {/* Dark Mode Toggle */}
  <button
    onClick={toggleDarkMode}
    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
  >
    {darkMode ? (
      <Sun className="text-yellow-300" />
    ) : (
      <Moon className="text-gray-700" />
    )}
  </button>

  {/* Mobile Menu Button */}
  <button
    className="lg:hidden"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {isMenuOpen ? <X /> : <Menu />}
  </button>

</div>
        </div>


        {/* Mobile Dropdown */}
       {isMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 
            bg-white dark:bg-gray-900 shadow-lg  rounded-xl lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block p-3 text-center text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </motion.nav>
    </div>
  );
};
export default Navbar;