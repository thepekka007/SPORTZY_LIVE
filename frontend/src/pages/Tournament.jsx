// TournamentCards.jsx

import React, { useState } from "react";
import cricket from "../assets/images/cricket.jpg";
import football from "../assets/images/circket2.jpg";
import badminton from "../assets/images/cricket3.jpg";
import "../App.css";

const cardData = [
  {
    title: "CRICKET",
    image: cricket,
    date: "28 MAY 2026",
    regDate: "27 MAY 2026",
    location: "National Cricket Stadium",
    category: "Sports",
    prize: "₹5,00,000",
    venue: "National Cricket Stadium",
    teams: "8 Teams Competing",
    color: "#0d2c7a",
  },

  {
    title: "FOOTBALL",
    image: football,
    date: "28 MAY 2026",
    regDate: "27 MAY 2026",
    location: "City Football Ground",
    category: "Sports",
    prize: "₹3,00,000",
    venue: "City Football Ground",
    teams: "12 Teams Competing",
    color: "#1b7a28",
  },

  {
    title: "BADMINTON",
    image: badminton,
    date: "29 MAY 2026",
    regDate: "27 MAY 2026",
    location: "Indoor Sports Complex",
    category: "Sports",
    prize: "₹1,50,000",
    venue: "Indoor Sports Complex",
    teams: "16 Teams Competing",
    color: "#7a1bb7",
  },
];

function TournamentCards() {

  // FIXED ISSUE
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {

    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <div className="cards-wrapper">

      {cardData.map((card, index) => (

        <div className="tournament-card" key={index}>

          {/* IMAGE */}
          <img
            src={card.image}
            alt={card.title}
            className="card-image"
          />

          {/* CONTENT */}
          <div className="card-content">

            {/* TITLE + DATE */}
            <div className="title-row">

              <h2
                className="card-title"
                style={{ color: card.color }}
              >
                {card.title}
              </h2>

              <div className="date-box">
                📅 {card.date}
              </div>

            </div>

            <div
              className="title-line"
              style={{ background: card.color }}
            ></div>

            {/* DETAILS */}
            <p>📅 Registration End : {card.regDate}</p>

            <p>📍 Location : {card.location}</p>

            <p>📂 Category : {card.category}</p>

            <p>🏆 Prize : {card.prize}</p>

            {/* BUTTON */}
            <button
              className="view-btn"
              onClick={() => toggleCard(index)}
            >
              {expandedCard === index
                ? "Show Less ▲"
                : "View More ▼"}
            </button>

            {/* EXPANDED CONTENT */}
            {expandedCard === index && (

              <div className="extra-content">
                <div className="detail-item ">
                   <p>
                  📍 <b>Venue :</b> {card.venue}
                </p>
                </div>

               <div className="detail-item ">

                <p>
                  👥 <b>Teams :</b> {card.teams}
                </p>
                </div>

               <button className="register-btn">
                  Register Now
                </button>

              </div>
            )}

          </div>

        </div>
      ))}

    </div>
  );
}

export default TournamentCards;