import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../App";
import "../css/App.css";

export default function Footer() {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  return (
    <footer className={`footer mt-auto py-3 ${theme === "dark" ? "bg-dark text-light border-top border-secondary" : "bg-light text-muted border-top"}`}>
      <div className="container text-center">
        <p className="mb-1 pt-3">
          Made with <FontAwesomeIcon icon={faHeart} color={theme === "dark" ? "#ff4d6d" : "#e63946"} />
      </p>
        <p className="mt-1 mb-3">&copy; StreamingPopcorn, 2024</p>
    </div>
    </footer>
  );
}
