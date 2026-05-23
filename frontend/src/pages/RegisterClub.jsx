import React, { useEffect, useState } from "react";
import footballImg from "../assets/images/bg_img1.jpg";
import axios from "axios";
import Select from "react-select";

function RegisterClub() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [formData, setFormData] = useState({
    club_name: "",
    founded_year: "",
    registration_number: "",
    contact_person: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    stadium_name: "",
    home_ground: "",
    total_players: "",
    achievements: "",
    instagram: "",
    facebook: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [selectedSports, setSelectedSports] = useState([]);

  const sportsList = [
    "Football",
    "Cricket",
    "Volleyball",
    "Kabaddi",
    "Badminton",
    "Athletics",
  ];

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

  const handleSportChange = (sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(
        selectedSports.filter((item) => item !== sport)
      );
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      const payload = {
        ...formData,
        state: selectedState?.value,
        district: selectedDistrict?.value,
        sports: selectedSports,
      };

      const res = await axios.post(
        `${BASE}/api/register-club/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Club Registered Successfully");

      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Club Registration Failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center pt-[14vh] relative px-3 sm:px-6 py-6"
      style={{ backgroundImage: `url(${footballImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div
        className="
          relative z-10
          w-full
          max-w-6xl
          p-4
          sm:p-6
          md:p-8
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Kerala Club Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
        >
          {/* Club Name */}
          <input
            type="text"
            name="club_name"
            value={formData.club_name}
            onChange={handleInputChange}
            placeholder="Club Name"
            className="input"
            required
          />

          {/* Founded Year */}
          <input
            type="number"
            name="founded_year"
            value={formData.founded_year}
            onChange={handleInputChange}
            placeholder="Founded Year"
            className="input"
          />

          {/* Registration Number */}
          <input
            type="text"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleInputChange}
            placeholder="Club Registration Number"
            className="input"
          />

          {/* Contact Person */}
          <input
            type="text"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleInputChange}
            placeholder="Club Secretary / Manager"
            className="input"
            required
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="input"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="input"
          />

          {/* State */}
          <div className="text-black">
            <Select
              options={states}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select State"
              isSearchable
            />
          </div>

          {/* District */}
          <div className="text-black">
            <Select
              options={districts}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              placeholder="Select District"
              isSearchable
            />
          </div>

          {/* Address */}
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Club Address"
            rows="3"
            className="input md:col-span-2"
          />

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="Pincode"
            className="input"
          />

          {/* Stadium */}
          <input
            type="text"
            name="stadium_name"
            value={formData.stadium_name}
            onChange={handleInputChange}
            placeholder="Stadium / Turf Name"
            className="input"
          />

          {/* Home Ground */}
          <input
            type="text"
            name="home_ground"
            value={formData.home_ground}
            onChange={handleInputChange}
            placeholder="Home Ground Location"
            className="input"
          />

          {/* Total Players */}
          <input
            type="number"
            name="total_players"
            value={formData.total_players}
            onChange={handleInputChange}
            placeholder="Total Players"
            className="input"
          />

          {/* Instagram */}
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="Instagram Link"
            className="input"
          />

          {/* Facebook */}
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            placeholder="Facebook Link"
            className="input"
          />

          {/* Sports */}
          <div className="md:col-span-2">
            <p className="mb-3 font-semibold text-lg">
              Select Sports
            </p>

            <div className="flex flex-wrap gap-4">
              {sportsList.map((sport) => (
                <label
                  key={sport}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSports.includes(sport)}
                    onChange={() => handleSportChange(sport)}
                    className="accent-orange-500"
                  />
                  {sport}
                </label>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            placeholder="Achievements / Tournament Details"
            rows="4"
            className="input md:col-span-2"
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 p-3 rounded-lg font-semibold"
            >
              Register Club
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterClub;