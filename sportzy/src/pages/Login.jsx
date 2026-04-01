import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-[#0d182e] dark:to-black 
      transition-colors duration-500"
    >
      {/* Overlay (only for dark mode) */}
      <div className="absolute inset-0 dark:bg-black/50"></div>

     

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[350px] p-8 rounded-2xl 
        bg-white dark:bg-white/10 
        backdrop-blur-lg border border-gray-300 dark:border-white/20 
        shadow-2xl 
        text-black dark:text-white transition"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg 
          bg-gray-200 dark:bg-white/20 
          text-black dark:text-white 
          outline-none placeholder-gray-500 dark:placeholder-gray-300"
        />

        {/* Password */}
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg 
          bg-gray-200 dark:bg-white/20 
          text-black dark:text-white 
          outline-none placeholder-gray-500 dark:placeholder-gray-300"
        />

        {/* Show Password */}
        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <a href="#" className="text-orange-400 hover:underline">
            Forgot?
          </a>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-white"
        >
          Login
        </motion.button>

        {/* Signup Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 cursor-pointer">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;