import React from "react";
import { NavLink as Link } from "react-router-dom";
import { useState } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

// import KomChat from "./chat";

function Footer() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      <div>
        {/* ======= Footer ======= */}
        <footer id="footer" className="footer">
          <div className="container">
            <div className="row gy-3">
              <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-geo-alt icon" />
                <div>
                  <h4>Address</h4>
                  <p>
                    Sector 10 <br />
                    Gurgaon, Haryana
                    <br />
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-links d-flex">
                <i className="bi bi-telephone icon" />
                <div>
                  <h4>Reservations</h4>
                  <p>
                    <strong>Phone:</strong> +91-9560576294
                    <br />
                    <strong>Email:</strong> admin@gharKaKhaana.com
                    <br />
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-links d-flex">
                <i className="bi bi-clock icon" />
                <div>
                  <h4>Opening Hours</h4>
                  <p>
                    <strong>24 X 7 open</strong>
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Follow Us</h4>
                <div className="social-links d-flex">
                  <a href="#" className="twitter">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#" className="facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#" className="instagram">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
              © Copyright{" "}
              <strong>
                <span>GharKaKhaana</span>
              </strong>
              <br></br>
              All Rights Reserved
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/Techno service-bootstrap-restaurant-website-template/ */}
              Designed by gharKaKhaana
            </div>
          </div>
        </footer>
        {/* End Footer */}
        {/* End Footer */}
        {/* <KomChat></KomChat> */}
        {/* <iframe
          style="border: none;"
          height="430"
          width="350"
          src="https://widget.kommunicate.io/chat?appId=1837531277ae9f0e2cb57420325e7f70a"
          allow="microphone; geolocation;"
        ></iframe> */}
        <Link
          to="/"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i
            className="bi bi-arrow-up-short"
            onClick={function getBackToBeginning() {
              window.scrollTo(0, 0);
            }}
          />
        </Link>
        {/* <div className="chat-icon" onClick={() => setShowChat(true)}>
          <FontAwesomeIcon
            icon={showChat ? faTimes : faCommentAlt}
            className="chat-icon"
          />
        </div> */}
        <button
          className={`chat-button ${showChat ? "active" : ""}`}
          onClick={toggleChat}
        >
          {showChat ? (
            <FontAwesomeIcon icon={faTimes} className="chat-icon" />
          ) : (
            <FontAwesomeIcon icon={faCommentAlt} className="chat-icon" />
          )}
        </button>
        {showChat && (
          <div className="chat-overlay">
            {/* <button className="close-button" onClick={toggleChat}>
              Close
            </button> */}
            <iframe
              className="chat-iframe"
              width="350"
              height="430"
              allow="microphone; geolocation;"
              src="https://widget.kommunicate.io/chat?appId=1837531277ae9f0e2cb57420325e7f70a"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
