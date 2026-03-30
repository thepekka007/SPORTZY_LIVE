import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClubReg() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    club_name: ""
  });

  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");

    // ✅ simple validation
    if (form.password !== form.cpassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/clubregister/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Club created successfully. Redirecting...");
        setTimeout(() => nav("/login"), 1200);
      } else {
        setMsg(JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setMsg("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Club Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="uname" onChange={handleChange} value={form.uname} placeholder="Username" required className="w-full p-2 border rounded"/>

          <input name="email" type="email" onChange={handleChange} value={form.email} placeholder="Email" required className="w-full p-2 border rounded"/>

          <input name="phone" onChange={handleChange} value={form.phone} placeholder="Phone" required className="w-full p-2 border rounded"/>

          <input name="club_name" onChange={handleChange} value={form.club_name} placeholder="Club Name" required className="w-full p-2 border rounded"/>

          <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" required className="w-full p-2 border rounded"/>

          <input name="cpassword" type="password" onChange={handleChange} value={form.cpassword} placeholder="Confirm Password" required className="w-full p-2 border rounded"/>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Create Club
          </button>
        </form>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </div>
  );
}

export default ClubReg;