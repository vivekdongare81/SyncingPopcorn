import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/store";
import { ThemeContext } from "../App";

const NavBar = (props) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext) || props;

  const calculateLinkClasses = (loc) => {
    let base = "nav-link px-3 py-2 mx-1 rounded";
    if (loc === "room" && location.pathname.includes("room"))
      return base + " active text-light bg-primary";
    if (loc === "home" && location.pathname.includes("home"))
      return base + " active text-light bg-primary";
    if (loc === "howto" && location.pathname.includes("howto"))
      return base + " active text-light bg-primary";
    return base + (theme === "dark" ? " text-light" : " text-dark");
  };

  return (
    <header>
      <div style={{ width: '96vw', maxWidth: '1200px', margin: '2vh auto 0 auto', boxSizing: 'border-box' }}>
        <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-dark shadow" : "navbar-light bg-light shadow"}`} style={{ width: '100%', borderRadius: '18px' }}>
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <Link className="navbar-brand fw-bold fs-3" to="/home" style={{fontFamily: 'inherit', letterSpacing: '1px'}}>
              <span role="img" aria-label="popcorn">🍿</span> <span style={{color:'#ffb300'}}>PopcornSync</span>
          </Link>
            <div className="d-flex align-items-center">
              <div className="navbar-nav flex-row gap-2">
                <Link className={calculateLinkClasses("home") + " btn btn-outline-primary rounded-pill px-3 mx-1 shadow-sm fw-semibold"}
                  aria-current="page" to="/home">Home</Link>
                <Link className={
                  calculateLinkClasses("room") +
                  (location.pathname.includes("room")
                    ? " btn btn-primary rounded-pill px-3 mx-1 shadow-sm fw-semibold text-white"
                    : " btn btn-outline-primary rounded-pill px-3 mx-1 shadow-sm fw-semibold")
                } to="/room">Room</Link>
              </div>
          <button
                className={`btn btn-sm ms-3 rounded-circle shadow-sm ${theme === "dark" ? "btn-light" : "btn-dark"}`}
                onClick={toggleTheme}
                title="Toggle dark mode"
                style={{fontSize: '1.2rem'}}
              >
                {theme === "dark" ? "🌙" : "☀️"}
          </button>
              <div className="ms-3">
                {user.isAuthenticated ? (
                  <Link className="text-decoration-none fw-semibold" to="/userPage">
                    <span className={theme === "dark" ? "text-info" : "text-primary"}>Hello, {user.name}</span>
              </Link>
                ) : (
                  <span className={theme === "dark" ? "text-light" : "text-dark"}>{user.name}</span>
                )}
              </div>
            </div>
          </div>
        </nav>
        </div>
    </header>
  );
};

export default NavBar;
