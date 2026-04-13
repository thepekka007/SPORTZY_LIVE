import React, { useState } from "react";
import footballImg from "../assets/images/bg_img1.jpg";

function RegisterPlayer() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);

  const handleChange = (sport) => {
    if (selected.includes(sport)) {
      setSelected(selected.filter((item) => item !== sport));
    } else {
      setSelected([...selected, sport]);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${footballImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form Card */}
      <div className="relative z-10 w-[95%] max-w-3xl p-8 rounded-2xl 
      bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl
      animate-fadeIn">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Player Registration
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3">
            <input type="text" placeholder="Full Name" className="input" />
            <input type="date" className="input" />
            <input type="text" placeholder="Mobile Number" className="input" />
            <select className="input">
              <option value="">Select District</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
             <select className="input">
              <option value="">Select State</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <input type="text" placeholder="Post Office" className="input" />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3">

            {/* Skill Level */}
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
            >
              <option value="">Skill Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Professional</option>
            </select>

            {/* Sports Checkbox */}
            <div>
              <p className="mb-2">Select Sports</p>
              <div className="flex gap-4 flex-wrap">
                {["Cricket", "Football", "Badminton"].map((sport) => (
                  <label
                    key={sport}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(sport)}
                      onChange={() => handleChange(sport)}
                      className="accent-orange-500"
                    />
                    {sport}
                  </label>
                ))}
              </div>
            </div>

            <input type="text" placeholder="Position" className="input" />
            <input type="text" placeholder="Height" className="input" />
            <input type="text" placeholder="Weight" className="input" />

            {/* Club */}
            <select className="input">
              <option value="">Select Club</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          {/* FULL WIDTH BUTTON */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 p-3 rounded-lg font-semibold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPlayer;