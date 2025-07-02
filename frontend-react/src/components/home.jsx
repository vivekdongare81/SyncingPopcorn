import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext) || { theme: "light" };

  const navigateToRoomPage = () => {
    navigate("/room");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: theme === "dark" ? "#181a1b" : "#f8f9fa" }}>
      <div className={`card shadow-lg p-4 border-0 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ maxWidth: 500 }}>
        <main className="px-3">
          <h1 className="mb-3 fw-bold" style={{fontFamily: 'inherit', letterSpacing: '1px', color:'#ffb300'}}>🍿 PopcornSync</h1>
          <p className="lead mb-4">
            A realtime peer-to-peer app to watch videos together and chat with your friends and family.
          </p>
          <button
              onClick={navigateToRoomPage}
            className="btn btn-lg btn-warning rounded-pill fw-bold shadow px-5 py-2"
            >
            Explore Rooms
          </button>
        </main>
      </div>
    </div>
  );
}
