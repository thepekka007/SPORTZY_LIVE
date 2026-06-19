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
const validateForm = () => {
  const username = form.username.trim();
  const password = form.password;

  // Username validations
  if (username.length < 3) {
    setMsg("Username must be at least 3 characters long.");
    return false;
  }

  if (username.length > 20) {
    setMsg("Username cannot exceed 20 characters.");
    return false;
  }

  if (/\s/.test(username)) {
    setMsg("Username cannot contain spaces.");
    return false;
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    setMsg(
      "Username can contain only letters, numbers, and underscore (_)."
    );
    return false;
  }

  // Password validations
  if (password.length < 8) {
    setMsg("Password must be at least 8 characters long.");
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    setMsg("Password must contain at least one uppercase letter.");
    return false;
  }

  if (!/[a-z]/.test(password)) {
    setMsg("Password must contain at least one lowercase letter.");
    return false;
  }

  if (!/\d/.test(password)) {
    setMsg("Password must contain at least one number.");
    return false;
  }

  if (!/[@$!%*?&]/.test(password)) {
    setMsg(
      "Password must contain at least one special character (@$!%*?&)."
    );
    return false;
  }

  if (form.password !== form.password2) {
    setMsg("Passwords do not match.");
    return false;
  }

  return true;
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");

  if (!validateForm()) return;

  try {
    const res = await fetch(`${BASE}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("Account created successfully. Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } else {
      setMsg(
        data.username?.[0] ||
          data.password?.[0] ||
          data.email?.[0] ||
          "Registration failed"
      );
    }
  } catch (err) {
    console.error(err);
    setMsg("Signup failed");
  }
};
/* const handleSubmit = async e => {
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
  */
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
        <div className="text-xs text-gray-500 mt-1">
          Password must contain:
          <ul className="list-disc ml-5">
            <li>Minimum 8 characters</li>
            <li>One uppercase and one lowercase letter</li>
            <li>One number</li>
            <li>One special character (@$!%*?&)</li>
          </ul>
        </div>
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