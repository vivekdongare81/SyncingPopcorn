import React, { useRef, useEffect, useImperativeHandle, useContext, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ChatBox from "./chatBox";
import PlayerMain from "./player/playerMain";
import UserList from "./userList";
import http from "../services/httpService";
import { useUserStore, useRoomStore } from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../App";

function RoomSession(props, ref) {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const { roomID } = useParams();
  const isOfferCreated = useRef(false);
  const room = useRoomStore((state) => state.room);
  const user = useUserStore((state) => state.user);
  const changeUserName = useUserStore((state) => state.changeUserName);
  const actionNotificaitonRef = useRef();
  const chatRef = useRef();
  const playerActionRef = useRef();
  const [notificationMsg, setNotificationMsg] = useState("");

  useImperativeHandle(ref, () => ({
    onPlayerActionMessage: (data) => {
      //console.log(data);
      playerActionRef.current.onPlayerActionMessage(data);
    },
    onChatMessage: (data) => {
      //console.log(data);
      chatRef.current.onChatMessage(data);
    },
    onChatNeedRender: () => {
      chatRef.current.onChatNeedRender();
    },
  }));

  useEffect(() => {
    let userNameAlreadyPresent = room.usersInRoom.some(
      (_user) => _user.name === user.name
    );
    //console.log(userNameAlreadyPresent);

    if (userNameAlreadyPresent) {
      handleShowNotification(
        "User name already exists in the room. So its altered. Please go to Home to change to a different ones if needed."
      );
      let temp = user.name + "_" + user.ID.slice(7);
      changeUserName(temp);
      http
        .post(http.api + "/user/changeUserName/" + user.ID + "/" + temp)
        .then((response) => {
          props.onWebSocketSend({
            event: "changeUserName",
            fromUser: user.ID,
            msg: room.link,
          });
        });
    }
    peerSetup();
    async function peerSetup() {
      if (!isOfferCreated.current) {
        let usersIDInRoom = room.usersInRoom.map((u) => {
          return u.id;
        });
        await props.onHandleOfferCreation(usersIDInRoom).then(() => {
          isOfferCreated.current = true;
        });
      }
    }
  }, []);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } //else {
    // return document.execCommand("copy", true, text);
    // }
  }

  // Use roomID from params, fallback to room.link
  const displayRoomID = roomID || room.link;

  const handleCopyClick = () => {
    copyTextToClipboard(displayRoomID)
      .then(() => {
        handleShowNotification("Room ID Copied successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //console.log("Room session rendered");
  });

  const handleShowNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg("");
    }, 3000);
  };

  if (!room.isRoomCreated) {
    return <Navigate to="/room" replace />;
  }

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-start ${theme}`}
      style={{
        background: theme === "dark" ? "#181a1b" : "#f8f9fa",
        minHeight: "100vh",
        width: '100%',
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          minHeight: '96vh',
          margin: '2vh auto',
          boxSizing: 'border-box',
          borderRadius: '18px',
          boxShadow: theme === 'dark' ? '0 0 24px #222' : '0 0 24px #ccc',
          background: theme === 'dark' ? '#181a1b' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Top Bar: Notification, Room ID, Exit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 0 20px', minHeight: 60 }}>
          <div style={{ flex: 2, minWidth: 0 }}>
            {notificationMsg && (
              <div className={`alert ${theme === "dark" ? "alert-secondary" : "alert-primary"} text-center shadow-sm mb-0`} style={{ marginBottom: 0, padding: '8px 12px', fontSize: 15 }}>
                {notificationMsg}
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <div className={`card-sm m-0 ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark border-primary"}`} style={{ cursor: "pointer", minWidth: 140 }} onClick={handleCopyClick}>
              <div className="card-body py-2 px-3 text-center">
                <h6 className="card-title mb-1">Room ID</h6>
                <p className="card-text mb-0">
                  <span className="fw-bold">{displayRoomID}</span> <FontAwesomeIcon icon={faClipboard} />
                </p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-danger px-4 py-2 fw-bold"
              onClick={props.onRoomExit}
            >
              Exit Room
            </button>
          </div>
        </div>
        {/* Main Content: Video | Chat | Viewers */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'flex-start', flex: 1, width: '100%', minHeight: 0, padding: 0, boxSizing: 'border-box', gap: '0', overflow: 'hidden' }}>
          {/* Video Section */}
          <div style={{ flex: 3, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', height: '100%' }}>
            <div className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%', overflow: 'hidden' }}>
              <div className="card-body p-2 d-flex flex-column justify-content-center h-100" style={{ width: '100%' }}>
                <PlayerMain onShowNotification={handleShowNotification} ref={playerActionRef} />
              </div>
            </div>
          </div>
          {/* Vertical Divider */}
          <div style={{ width: '1px', background: theme === 'dark' ? '#23272b' : '#e0e0e0', margin: '0 0.5rem', height: '100%' }} />
          {/* Sidebar: Chat and Viewers in one card */}
          <div style={{ width: 340, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={`card shadow-sm border-0 h-100 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ minHeight: 0, overflow: 'auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="card-body p-2 d-flex flex-column h-100" style={{ width: '100%' }}>
                <h5 className="fw-bold mb-3 text-center" style={{letterSpacing: '1px', color: theme === 'dark' ? '#90caf9' : '#1976d2'}}>Room Activity</h5>
                <div style={{ flex: 1, minHeight: 0, marginBottom: '1rem', overflow: 'auto' }}>
            <ChatBox ref={chatRef} wsConn={props.wsConn} />
                </div>
                <div style={{ flex: 'none', minHeight: 0, overflow: 'auto' }}>
                  <UserList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(RoomSession);
