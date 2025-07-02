import React, { useRef, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useUserStore, useRoomStore } from "../store/store";
import http from "../services/httpService";
import "../css/roomDecision.css";
import { ThemeContext } from "../App";

export default function RoomDecision(props) {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const user = useUserStore((state) => state.user);
  const setUserHost = useUserStore((state) => state.setUserHost);
  const room = useRoomStore((state) => state.room);
  const createRoom = useRoomStore((state) => state.createRoom);
  const [showJoinComponent, setshowJoinComponent] = useState(false);
  const navigate = useNavigate();
  const errorRef = useRef("");
  const inputRef = useRef("");

  const handleNewRoomRequest = () => {
    http.get(http.api + "/room/createRoom/" + user.ID).then((response) => {
      const room_ID = response.data;
      createRoom({
        link: room_ID,
        isRoomCreated: true,
        usersInRoom: [],
        isUserRoomHost: true,
      });
      setUserHost(true);
      navigate("/room/session/" + room_ID, { replace: true });
    });
  };

  const checkRoomLink = () => {
    if (inputRef.current.value !== "") {
      let roomLink = inputRef.current.value;
      http
        .get(http.api + "/room/checkIfRoomExists/" + roomLink)
        .then((response) => {
          if (response.data) handleJoinRoomRequest();
          else {
            errorRef.current.innerHTML = "Please enter a correct Room Link";
            setTimeout(() => {
              errorRef.current.innerHTML = "";
            }, 4000);
          }
        });
    }
  };

  const handleJoinRoomRequest = () => {
    if (inputRef.current.value !== "") {
      let roomLink = inputRef.current.value;
      http
        .get(http.api + "/room/joinRoom/" + user.ID + "/" + roomLink)
        .then(async (response) => {
          createRoom({
            link: roomLink,
            isRoomCreated: true,
            usersInRoom: response.data,
            isUserRoomHost: false,
          });
          props.onWebSocketSend({
            event: "newUserRequest",
            fromUser: user.ID,
            msg: roomLink,
          });
          let usersIDInRoom = response.data.map((u) => u.id);
          await props.onInitializeUsers(usersIDInRoom);
          navigate("/room/session/" + roomLink, { replace: true });
        });
    }
  };

  if (room.isRoomCreated) {
    const url = "/room/session/" + room.link;
    return <Navigate to={url} />;
  }

  return (
    <div className={`d-flex align-items-center justify-content-center min-vh-100 ${theme}`}
      style={{ background: theme === "dark" ? "#181a1b" : "#f8f9fa" }}>
      <div className={`card shadow-lg p-4 border-0 w-100 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ maxWidth: 700 }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{letterSpacing: '1px', color:'#1976d2'}}>🍿 Welcome to PopcornSync!</h2>
          <p className="lead mb-0">Create a new room or join an existing one to watch videos together in perfect sync.</p>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div className={`card h-100 shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"}`}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faChampagneGlasses} size="2x" className="mb-3" style={{color:'#1976d2'}}/>
                <h4 className="fw-semibold mb-2">Create a Room</h4>
                <p className="mb-3 text-center">Start a new PopcornSync session and invite your friends to join you!</p>
            <button
              type="button"
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow"
              onClick={handleNewRoomRequest}
            >
              Create Room
            </button>
          </div>
        </div>
          </div>
          <div className="col-md-6">
            <div className={`card h-100 shadow-sm border-0 ${theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"}`}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" className="mb-3" style={{color:'#1976d2'}}/>
                <h4 className="fw-semibold mb-2">Join a Room</h4>
                <p className="mb-3 text-center">Already have a room link? Enter it below to join your friends!</p>
                <div className="input-group mb-2">
                  <input
                    ref={inputRef}
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Room link"
                    aria-label="Room link"
                    aria-describedby="button-addon2"
                  />
                  <button
                    style={{ marginLeft: 8 }}
                    className="btn btn-outline-primary rounded-pill px-3 fw-semibold"
                    type="button"
                    id="button-addon2"
                    onClick={checkRoomLink}
                  >
                    Join
                  </button>
                </div>
                <p className="text-danger mt-2 mb-0 small" ref={errorRef}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
