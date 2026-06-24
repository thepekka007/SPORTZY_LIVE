import React, { useState } from "react";
import footballBg from "../assets/images/bg_img1.jpg";
import Select from "react-select";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Upload,
  IndianRupee,
} from "lucide-react";

function EditTournament() {
    const { id } = useParams();

  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
useEffect(() => {
  fetchTournament();
}, [id]);

const fetchTournament = async () => {
  try {
    const token = localStorage.getItem("access");

    const res = await axios.get(
      `${BASE}/api/tournament/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    setFormData({
      tournament_name: data.tournament_name || "",
      organizer_name: data.organizer_name || "",
      contact_number: data.contact_number || "",
      whatsapp_number: data.whatsapp_number || "",
      location: data.location || "",
      start_date: data.start_date || "",
      end_date: data.end_date || "",
      registration_deadline: data.registration_deadline || "",
      entry_fee: data.entry_fee || "",
      first_prize: data.first_prize || "",
      second_prize: data.second_prize || "",
      third_prize: data.third_prize || "",
      mvp_prize: data.mvp_prize || "",
      description: data.description || "",
      rules: data.rules || "",
      sport: data.sport || "",
      format: data.format || "",
      max_teams: data.max_teams || "",
      squad_limit: data.squad_limit || "",
      match_duration: data.match_duration || "",
      overs: data.overs || "",
      category: data.category || "",
      set_format: data.set_format || "",
    });

setBannerPreview(data.banner_preview);
  } catch (err) {
    console.log(err);
  }
};
  const sportsOptions = [
    { value: "football", label: "Football" },
    { value: "cricket", label: "Cricket" },
    { value: "badminton", label: "Badminton" },
    { value: "volleyball", label: "Volleyball" },
  ];

  const footballFormats = [
    { value: "5s", label: "5s Football" },
    { value: "6s", label: "6s Football" },
    { value: "7s", label: "7s Football" },
    { value: "11s", label: "11s Football" },
  ];

  const cricketFormats = [
    { value: "t10", label: "T10" },
    { value: "t20", label: "T20" },
    { value: "oneday", label: "One Day" },
  ];

  const badmintonFormats = [
    { value: "singles", label: "Singles" },
    { value: "doubles", label: "Doubles" },
    { value: "mixed", label: "Mixed Doubles" },
  ];

  const volleyballFormats = [
    { value: "indoor", label: "Indoor Volleyball" },
    { value: "beach", label: "Beach Volleyball" },
  ];

  const [loading, setLoading] = useState(false);

  const [bannerPreview, setBannerPreview] = useState(null);

  const [bannerFile, setBannerFile] = useState(null);

  const [formData, setFormData] = useState({
    tournament_name: "",
    organizer_name: "",
    contact_number: "",
    whatsapp_number: "",
    location: "",
    start_date: "",
    end_date: "",
    registration_deadline: "",
    entry_fee: "",
    first_prize: "",
    second_prize: "",
    third_prize: "",
    mvp_prize: "",
    description: "",
    rules: "",
    sport: "",
    format: "",
    max_teams: "",
    squad_limit: "",
    match_duration: "",
    overs: "",
    category: "",
    set_format: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSportChange = (selected) => {
    setFormData({
      ...formData,
      sport: selected.value,
      format: "",
    });
  };

  const handleFormatChange = (selected) => {
    setFormData({
      ...formData,
      format: selected.value,
    });
  };

  const handleBannerUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      setBannerFile(file);

      setBannerPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const getFormatOptions = () => {

    switch (formData.sport) {

      case "football":
        return footballFormats;

      case "cricket":
        return cricketFormats;

      case "badminton":
        return badmintonFormats;

      case "volleyball":
        return volleyballFormats;

      default:
        return [];
    }
  };

  const renderSportFields = () => {

    switch (formData.sport) {

      case "football":
        return (
          <>
            <input
              type="number"
              name="max_teams"
              placeholder="Maximum Teams"
              className="input"
              onChange={handleChange}
              value={formData.max_teams}
            />

            <input
              type="number"
              name="squad_limit"
              placeholder="Squad Limit"
              className="input"
              onChange={handleChange}
              value={formData.squad_limit}
            />

            <input
              type="text"
              name="match_duration"
              placeholder="Match Duration"
              className="input"
              onChange={handleChange}
              value={formData.match_duration}
            />
          </>
        );

      case "cricket":
        return (
          <>
            <input
              type="number"
              name="overs"
              placeholder="Overs Per Match"
              className="input"
              onChange={handleChange}
                value={formData.overs}
            />

            <input
              type="number"
              name="max_teams"
              placeholder="Maximum Teams"
              className="input"
              onChange={handleChange}
                value={formData.max_teams}
            />
          </>
        );

      case "badminton":
        return (
          <>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="input"
              onChange={handleChange}
              value={formData.category}
            />

            <input
              type="number"
              name="max_teams"
              placeholder="Maximum Players"
              className="input"
              onChange={handleChange}
              value={formData.max_teams}
            />
          </>
        );

      case "volleyball":
        return (
          <>
            <input
              type="text"
              name="set_format"
              placeholder="Set Format"
              className="input"
              onChange={handleChange}
              value={formData.set_format}
            />

            <input
              type="number"
              name="max_teams"
              placeholder="Maximum Teams"
              className="input"
              onChange={handleChange}
              value={formData.max_teams}
            />
          </>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("access");

      const form = new FormData();

      Object.keys(formData).forEach((key) => {

        form.append(
          key,
          formData[key]
        );
      });

      if (bannerFile) {

        form.append(
          "banner",
          bannerFile
        );
      }

      const res = await axios.put(
        `${BASE}/api/updatetournament/${id}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(
        res.data.message
      );

      console.log(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Tournament Update Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative px-4 py-10"
      style={{
        backgroundImage: `url(${footballBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Create Tournament
          </h1>

          <p className="text-gray-300 text-lg">
            Organize football, cricket,
            badminton & volleyball tournaments
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Banner Upload */}
            <div className="md:col-span-2">

              <label className="text-white font-semibold mb-3 block">
                Tournament Banner
              </label>

              <label className="border-2 border-dashed border-orange-400 rounded-2xl h-64 flex items-center justify-center cursor-pointer overflow-hidden bg-black/30">

                {bannerPreview ? (

                  <img
                    src={bannerPreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="text-center text-white">
                    <Upload
                      size={45}
                      className="mx-auto mb-3"
                    />
                    <p>Upload Tournament Poster</p>
                  </div>

                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={handleBannerUpload}
                />

              </label>
            </div>

            {/* Tournament Name */}
            <input
              type="text"
              name="tournament_name"
              placeholder="Tournament Name"
              className="input"
              onChange={handleChange}
              required
              value={formData.tournament_name}
            />

            {/* Organizer */}
            <input
              type="text"
              name="organizer_name"
              placeholder="Organizer Name"
              className="input"
              onChange={handleChange}
                value={formData.organizer_name}
            />

            {/* Contact */}
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              className="input"
              onChange={handleChange}
                value={formData.contact_number}
            />

            {/* WhatsApp */}
            <input
              type="text"
              name="whatsapp_number"
              placeholder="WhatsApp Number"
              className="input"
              onChange={handleChange}
                value={formData.whatsapp_number}
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Tournament Location"
              className="input"
              onChange={handleChange}
              value={formData.location}
            />

            {/* Sport */}
            <div>
              <Select
                options={sportsOptions}
                onChange={handleSportChange}
                placeholder="Choose Sport"
                value={sportsOptions.find(opt => opt.value === formData.sport)}
              />
            </div>

            {/* Format */}
            <div>
              <Select
                options={getFormatOptions()}
                onChange={handleFormatChange}
                placeholder="Select Format"
                value={getFormatOptions().find(opt => opt.value === formData.format)}
              />
            </div>

            {/* Entry Fee */}
            <input
              type="number"
              name="entry_fee"
              placeholder="Entry Fee"
              className="input"
              onChange={handleChange}
              value={formData.entry_fee}
            />

            {/* Prize Fields */}
            <input
              type="text"
              name="first_prize"
              placeholder="🥇 First Prize"
              className="input"
              onChange={handleChange}
              value={formData.first_prize}
            />

            <input
              type="text"
              name="second_prize"
              placeholder="🥈 Second Prize"
              className="input"
              onChange={handleChange}
              value={formData.second_prize}
            />

            <input
              type="text"
              name="third_prize"
              placeholder="🥉 Third Prize"
              className="input"
              onChange={handleChange}
              value={formData.third_prize}
            />

            <input
              type="text"
              name="mvp_prize"
              placeholder="⭐ MVP Prize"
              className="input"
              onChange={handleChange}
                value={formData.mvp_prize}
            />

            {/* Dates */}
            <input
              type="date"
              name="start_date"
              className="input"
              onChange={handleChange}
                value={formData.start_date}

            />

            <input
              type="date"
              name="end_date"
              className="input"
              onChange={handleChange}
              value={formData.end_date}
            />

            {/* Dynamic Fields */}
            <div className="md:col-span-2">

              <div className="bg-black/30 border border-orange-400/20 rounded-2xl p-5">

                <h2 className="text-xl font-bold text-orange-400 mb-5">
                  Sport Specific Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderSportFields()}
                </div>

              </div>
            </div>

            {/* Description */}
            <textarea
              rows="4"
              name="description"
              placeholder="Tournament Description"
              className="input md:col-span-2"
              onChange={handleChange}
              value={formData.description}
            />

            {/* Rules */}
            <textarea
              rows="4"
              name="rules"
              placeholder="Rules & Regulations"
              className="input md:col-span-2"
              onChange={handleChange}
                value={formData.rules}
            />

            {/* Submit */}
            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  transition-all
                  duration-300
                  p-4
                  rounded-2xl
                  text-lg
                  font-bold
                  text-white
                "
              >
               {
                    loading ? "Updating..." : "Update Tournament"
                }
              </button>

            </div>

          </form>
        </div>
      </div>

      <style>{`

        .input{
          width:100%;
          padding:14px;
          border-radius:16px;
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.1);
          color:white;
          outline:none;
        }

        .input::placeholder{
          color:#d1d5db;
        }

        .input:focus{
          border-color:#f97316;
          box-shadow:0 0 0 2px rgba(249,115,22,0.3);
        }

      `}</style>
    </div>
  );
}

export default EditTournament;