import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function TournamentCards() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [msg, setMsg] = useState("");

  const [tournaments, setTournaments] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await axios.get(
        `${BASE}/api/tournaments/`
      );

      setTournaments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCard = (index) => {
    setExpandedCard(
      expandedCard === index ? null : index
    );
  };
const filteredTournaments = tournaments.filter((tournament) => {
  const matchesSearch = [
    tournament.tournament_name,
    tournament.sport,
    tournament.format,
    tournament.location,
    tournament.start_date,
    tournament.registration_deadline,
    tournament.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesSport =
    !selectedSport ||
    tournament.sport?.toLowerCase() ===
      selectedSport.toLowerCase();

  const matchesFormat =
    !selectedFormat ||
    tournament.format?.toLowerCase() ===
      selectedFormat.toLowerCase();

  return (
    matchesSearch &&
    matchesSport &&
    matchesFormat
  );
});
const navigate = useNavigate();
const handleRegister = async (tournamentId) => {
  try {
    const token = localStorage.getItem("access");

    const res = await axios.get(
      `${BASE}/api/check_user_status/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    if (data.registered) {
      navigate(`/register/${tournamentId}`);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Registration Failed"
    );
  }
};
  /*try {
    const res = await fetch(`${BASE}/api/check_user_status/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

   const data = await res.json();

    if (data.registered) {
      navigate(`/register/${tournamentId}`);
    } else {
      setMsg(data.message);
    }
  } catch (err) {
    console.error(err);
    setMsg("Registration Failed");
  }*/
  return (
<div className="tournament-content">
      {/* FILTER SECTION */}

      <div className="filter-container">

        <input
          type="text"
          placeholder="Search Tournament..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

        <select
          value={selectedSport}
          onChange={(e) => {
            setSelectedSport(
              e.target.value
            );
            setSelectedFormat("");
          }}
          className="filter-select"
        >
          <option value="">
            All Sports
          </option>

          <option value="Cricket">
            Cricket
          </option>

          <option value="Football">
            Football
          </option>

          <option value="Volleyball">
            Volleyball
          </option>

          <option value="Badminton">
            Badminton
          </option>
        </select>

        <select
          value={selectedFormat}
          onChange={(e) =>
            setSelectedFormat(
              e.target.value
            )
          }
          className="filter-select"
        >
          <option value="">
            All Formats
          </option>

          {selectedSport ===
            "Cricket" && (
            <>
              <option value="T10">
                T10
              </option>
              <option value="T20">
                T20
              </option>
              <option value="oneday">
                ODI
              </option>
              <option value="Test">
                Test
              </option>
            </>
          )}

          {selectedSport ===
            "Football" && (
            <>
              <option value="5s">
                5s
              </option>
              <option value="6s">
                6s
              </option>
              <option value="7s">
                7s
              </option>
              <option value="11s">
                11s
              </option>
            </>
          )}

          {selectedSport ===
            "Volleyball" && (
            <>
              <option value="Indoor">
                Indoor
              </option>
              <option value="Outdoor">
                Outdoor
              </option>
            </>
          )}

          {selectedSport ===
            "Badminton" && (
            <>
              <option value="Singles">
                Singles
              </option>
              <option value="Doubles">
                Doubles
              </option>
              <option value="Mixed Doubles">
                Mixed Doubles
              </option>
            </>
          )}
        </select>

      </div>

      {/* TOURNAMENT CARDS */}

      <div className="cards-wrapper">

        {filteredTournaments.length >
        0 ? (
          filteredTournaments.map(
            (card, index) => (
              <div
                className="tournament-card"
                key={card.id}
              >
                <img
                  src={
                    card.banner
                      ? `data:image/jpeg;base64,${card.banner}`
                      : "/placeholder.jpg"
                  }
                  alt={
                    card.tournament_name
                  }
                  className="card-image"
                />

                <div className="card-content">

                  <div className="title-row">

                    <h2 className="card-title">
                      {
                        card.tournament_name
                      }
                    </h2>

                    <div className="date-box">
                      📅{" "}
                      {
                        card.start_date
                      }
                    </div>

                  </div>

                  <div className="title-line"></div>

                  <p>
                    📅 Registration End :
                    {" "}
                    {
                      card.registration_deadline
                    }
                  </p>

                  <p>
                    📍 Location :
                    {" "}
                    {
                      card.location
                    }
                  </p>

                  <p>
                    ⚽ Sport :
                    {" "}
                    {card.sport}
                  </p>

                  <p>
                    🏆 First Prize :
                    {" "}
                    {
                      card.first_prize
                    }
                  </p>

                  <button
                    className="view-btn"
                    onClick={() =>
                      toggleCard(
                        index
                      )
                    }
                  >
                    {expandedCard ===
                    index
                      ? "Show Less ▲"
                      : "View More ▼"}
                  </button>

                  {expandedCard ===
                    index && (
                    <div className="extra-content">

                      <p>
                        👥 Max Teams :
                        {" "}
                        {
                          card.max_teams
                        }
                      </p>

                      <p>
                        📋 Format :
                        {" "}
                        {
                          card.format
                        }
                      </p>

                      <p>
                        📝 Description :
                        {" "}
                        {
                          card.description
                        }
                      </p>

                      <button className="register-btn" onClick={() => handleRegister(card.id)}>
                        Register
                        Now
                      </button>

                    </div>
                  )}

                </div>
              </div>
            )
          )
        ) : (
          <div
            style={{
              color: "white",
              textAlign:
                "center",
              width: "100%",
              padding:
                "40px",
            }}
          >
            No tournaments found
          </div>
        )}

      </div>
    </div>
  );
}

export default TournamentCards;