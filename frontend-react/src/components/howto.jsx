import React, { useContext } from "react";
import {
  faAddressCard,
  faBell,
  faFaceFrown,
  faFaceSmileWink,
  faFileVideo,
  faMessage,
  faPlusSquare,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightToBracket,
  faArrowsRotate,
  faChalkboardTeacher,
  faFileImport,
  faKey,
  faLink,
  faStarOfLife,
  faTriangleExclamation,
  faUnderline,
  faUsers,
  faUsersBetweenLines,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../App";

export default function HowTo() {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: theme === "dark" ? "#181a1b" : "#f8f9fa" }}>
      <div className={`card shadow-lg p-4 border-0 w-100 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`} style={{ maxWidth: 700 }}>
        <h3 className="display-5 pb-3 mb-4 border-bottom text-center">How to use StreamingPopcorn</h3>
        <section className="mb-4">
          <h4 className="display-6 mb-3">Rooms</h4>
      <ul className="list-unstyled">
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faFaceSmileWink} fixedWidth />Rooms can be created or joined if already created by someone</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faBell} fixedWidth />Notifications and alerts will be displayed on the first column of top bar inside a room.</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faLink} fixedWidth />Room's link can be found on second column of the top bar. One click to copy it!</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faUsersBetweenLines} fixedWidth />Users in the room can be found on the bottom of the page. Host of the room will be in green color</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faTriangleExclamation} fixedWidth />Navigating to any other page inside the application will exit the room</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faMessage} fixedWidth />Users can chat between the room members using the chat box</li>
      </ul>
        </section>
        <section className="mb-4">
          <h4 className="display-6 mb-3">Create Room</h4>
      <ul className="list-unstyled">
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faPlusSquare} fixedWidth />Click the <strong>Create room</strong> button from the room tab to create a new room</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faChalkboardTeacher} fixedWidth />You will be the host of the room</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faUserTag} fixedWidth />If you exit, any other user will be made host</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faKey} fixedWidth />You will have the option to toggle <strong>Host mode</strong> which will disable controls for other users of the room</li>
      </ul>
        </section>
        <section className="mb-4">
          <h4 className="display-6 mb-3">Join Room</h4>
      <ul className="list-unstyled">
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faArrowRightToBracket} fixedWidth />Click the <strong>Join room</strong> button from the room tab to join an existing room</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faUsers} fixedWidth />You will be one of the members of the room</li>
      </ul>
        </section>
        <section className="mb-4">
          <h4 className="display-6 mb-3">Media Playback</h4>
      <ul className="list-unstyled">
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faStarOfLife} fixedWidth />Host has to select the file first.</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faFileVideo} fixedWidth />Once host selects, others will have the option to select the file</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faFileImport} fixedWidth />All the users have to select the same file</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faArrowsRotate} fixedWidth />Once selected, all the actions and playback will be in sync between the users in the room.</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faSquare} fixedWidth />A border around the player controls can be found.<br />
              <span className="ms-4"><FontAwesomeIcon className="me-2" icon={faSquare} color="green" fixedWidth />Green - Player is in sync with other host.</span><br />
              <span className="ms-4"><FontAwesomeIcon className="me-2" icon={faSquare} color="red" fixedWidth />Red - Player is not in sync. Please rejoin or check with host for any network issues.</span>
        </li>
      </ul>
        </section>
        <section className="mb-2">
          <h4 className="display-6 mb-3">User Customization</h4>
      <ul className="list-unstyled">
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth />Users can change a name of their own before entering the room.</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faUnderline} fixedWidth />Just click on the Temporary ID on the top right of the page from Home or Howto page</li>
            <li className="mb-2"><FontAwesomeIcon className="me-2" icon={faFaceFrown} fixedWidth />If a user with same name exists in the room, it will automatically be updated. You can exit and change again.</li>
      </ul>
        </section>
      </div>
    </div>
  );
}
