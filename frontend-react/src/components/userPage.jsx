import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import http from "../services/httpService";
import { useUserStore } from "../store/store";
import { ThemeContext } from "../App";

export default function UserPage(props) {
  const errorRef = useRef("");
  const inputRef = useRef("");
  const { theme } = useContext(ThemeContext) || { theme: "light" };

  const user = useUserStore((state) => state.user);
  const changeUserName = useUserStore((state) => state.changeUserName);

  const navigate = useNavigate();

  const handleChangeUserName = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      const userName = inputRef.current.value;
      let userNameAlreadyPresent = false;
      http
        .get(
          http.api + "/user/validateUserNameChange/" + user.ID + "/" + userName
        )
        .then((response) => {
          changeUserName(userName);
          userNameAlreadyPresent = response.data;
        });
      if (userNameAlreadyPresent) {
        errorRef.current.innerHTML =
          "User name already exists in the room. Please enter a different username";
        setTimeout(() => {
          errorRef.current.innerHTML = "";
        }, 4000);
      } else {
        http
          .post(http.api + "/user/changeUserName/" + user.ID + "/" + userName)
          .then((response) => {
            props.onWebSocketSend({
              event: "changeUserName",
              fromUser: user.ID,
              msg: "",
            });
          });
        navigate(-1);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: theme === "dark" ? "#181a1b" : "#f8f9fa" }}>
      <div className={`card shadow-lg p-4 border-0 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ maxWidth: 400 }}>
        <h1 className="h3 mb-3 fw-bold text-center">Change Display Name</h1>
        <p className="mb-3 text-center">Enter a custom user name of your choice...</p>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="userName"
            ref={inputRef}
            className="form-control"
            placeholder="Username"
            autoFocus
          />
          <label htmlFor="userName">Username</label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          onClick={handleChangeUserName}
        >
          Change
        </button>
        <p className="col mt-2 p-2 text-danger text-center" ref={errorRef}></p>
      </div>
    </div>
  );
}
