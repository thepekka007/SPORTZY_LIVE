import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setMsg("");
    try {
      const res = await fetch(`${BASE}/api/register/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(res.ok) {
        setMsg("Account created. Redirecting to login...");
        setTimeout(()=>nav("/login"), 1200);
      } else {
        setMsg(data.username || data.password || JSON.stringify(data));
      }
    } catch(err) {
      console.error(err);
      setMsg("Signup failed");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-[#0d182e] dark:to-black 
      transition-colors duration-500"
    >

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

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
             name="username"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg 
            bg-white dark:bg-gray-700 text-black dark:text-white"
            onChange={handleChange}
            value={form.username}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg 
            bg-white dark:bg-gray-700 text-black dark:text-white"
            onChange={handleChange}
            value={form.email}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg 
            bg-white dark:bg-gray-700 text-black dark:text-white"
            onChange={handleChange}
            value={form.password}
            required
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg 
            bg-white dark:bg-gray-700 text-black dark:text-white"
            onChange={handleChange}
            value={form.password2}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Sign Up
          </button>
        </form>
        {msg && <p className="text-red-500 text-center mt-4">{msg}</p>}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;