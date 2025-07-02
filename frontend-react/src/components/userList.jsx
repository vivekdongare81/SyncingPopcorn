import React, { useContext } from "react";
import { useRoomStore } from "../store/store";
import { ThemeContext } from "../App";

function UserList() {
  const usersInRoom = useRoomStore((state) => state.room.usersInRoom);
  const { theme } = useContext(ThemeContext) || { theme: "light" };

  return (
    <div style={{ minHeight: 120 }}>
      <div className={`card card-body ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ width: 100 + "vh" }}>
          <h5 className="card-title">Room Members</h5>
          <div className="row row-cols-1 row-cols-md-auto g-4">
            {usersInRoom.length === 0 ? (
              <p>There are no users in the room currently...</p>
            ) : (
              usersInRoom.map((u) => <User key={u.id} user={u}></User>)
            )}
          </div>
        </div>
      </div>
  );
}

export function User(props) {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  let isHost = props.user.userHost;
  const calculateUserStyle = () => {
    return isHost
      ? `card card-body mb-3 ${theme === "dark" ? "bg-success text-light" : "bg-success text-light"}`
      : `card card-body mb-3 ${theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"}`;
  };

  return (
    <div className="col">
      <div className={calculateUserStyle()} style={{ maxWidth: 16 + "rem" }}>
        <p className="card-text">{props.user.name}</p>
      </div>
    </div>
  );
}

export default UserList;
