import { useAuth } from "../context/AuthContext";
import React, { useEffect,useState } from "react";
import footballImg from "../assets/images/bg_img1.jpg";
import axios from "axios";
import Select from "react-select";



function RegisterPlayer() {

  const [formData, setFormData] = useState({
  full_name: "",
  dob: "",
  mobile: "",
  post_office: "",
  skill_level: "",
  position: "",
  height: "",
  weight: "",
});
const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
const [states, setStates] = useState([]);
const [districts, setDistricts] = useState([]);

const [selectedState, setSelectedState] = useState(null);
const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);

  const handleChange = (sport) => {
    if (selected.includes(sport)) {
      setSelected(selected.filter((item) => item !== sport));
    } else {
      setSelected([...selected, sport]);
    }
  };
useEffect(() => {

  axios
    .get(`${BASE}/api/states/`)
    .then((res) => {

      const formatted = res.data.map((state) => ({
        value: state.id,
        label: state.name,
      }));

      setStates(formatted);
    })
    .catch((err) => console.log(err));

}, []);
const handleStateChange = async (selectedOption) => {

  setSelectedState(selectedOption);
  setSelectedDistrict(null);

  try {

    const res = await axios.get(
      `${BASE}/api/districts/${selectedOption.value}/`
    );

    const formatted = res.data.map((district) => ({
      value: district.id,
      label: district.name,
    }));

    setDistricts(formatted);

  } catch (err) {
    console.log(err);
  }
};
const handleInputChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("access");

    const payload = {
      ...formData,
      state: selectedState?.value,
      district: selectedDistrict?.value,
      sports: selected,
    };

    const res = await axios.post(
      `${BASE}/api/register-player/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Player Registered Successfully");

    console.log(res.data);

  } catch (err) {

    console.log(err);

    alert("Registration Failed");
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

<form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
>
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3">
<input
  type="text"
  name="full_name"
  value={formData.full_name}
  onChange={handleInputChange}
  placeholder="Full Name"
  className="input"
/>            
<input type="date"
 name="dob"
  value={formData.dob}
   onChange={handleInputChange}
    className="input" />

<input type="text"
 name="mobile"
 value={formData.mobile}
  onChange={handleInputChange}
   placeholder="Mobile Number"
    className="input" />
<div className="text-black">

            <Select
              options={states}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Search State..."
              isSearchable
            />

          </div>

          <div className="text-black">

            <Select
              options={districts}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              placeholder="Search District..."
              isSearchable
            />

          </div>
            {/* <input type="text" name="post_office" value={formData.post_office} onChange={handleInputChange} placeholder="Post Office" className="input" /> */}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3">

            {/* Skill Level */}
<select
  name="skill_level"
  value={formData.skill_level}
  onChange={handleInputChange}
  className="input"
>
  <option value="">Skill Level</option>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Advanced">Advanced</option>
  <option value="Professional">Professional</option>
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

            <input type="text" name="position" value={formData.position} onChange={handleInputChange} placeholder="Position" className="input" />
            <input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height" className="input" />
            <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight" className="input" />

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