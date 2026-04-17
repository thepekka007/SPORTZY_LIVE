import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Login = () => {
const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
const { login } = useAuth(); // ✅ ADD THIS
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveTokens = (data) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // if (res.ok) {
      //   saveTokens(data);
      //   setMsg("Login successful!");
      //   setTimeout(() => nav("/"), 800);
      // } 
      if (res.ok) {
  saveTokens(data);

  const userRes = await fetch(`${BASE}/api/userprofile/`, {
    headers: {
      Authorization: `Bearer ${data.access}`,
    },
  });

  const userData = await userRes.json();

  const userInfo = {
    id: userData.id,
    username: userData.username,
  };

  login(userInfo); // ✅ context
  localStorage.setItem("user", JSON.stringify(userInfo)); // ✅ persistence

  alert(`Welcome, ${userData.username} 🎉`);

  setTimeout(() => nav("/"), 800);
}else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-[#0d182e] dark:to-black 
      transition-colors duration-500"
    >
      {/* Overlay (only for dark mode) */}
      <div className="absolute inset-0 dark:bg-black/50"></div>

     
      <form onSubmit={handleSubmit}>
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
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg 
          bg-gray-200 dark:bg-white/20 
          text-black dark:text-white 
          outline-none placeholder-gray-500 dark:placeholder-gray-300"
        />

        {/* Password */}
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
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
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-white"
        >
          Login
        </motion.button>

        {/* Message */}
          {msg && (
            <p className="text-center text-sm mt-3 text-red-500">{msg}</p>
          )}


        {/* Signup Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 cursor-pointer">
            Sign up
          </Link>
        </p>
      </motion.div>
            </form>
    </div>
  );
};

export default Login;