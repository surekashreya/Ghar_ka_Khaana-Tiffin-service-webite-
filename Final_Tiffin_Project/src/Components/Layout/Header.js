import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import NoteContext from "../../useContext/NoteContext";

function Header() {
  const valueContext = useContext(NoteContext);
  const [id, setId] = useState("");
  const [city, setCity] = useState([]);
  const [srch, setSrch] = useState("");
  const [text, setText] = useState("");
  const auth = localStorage.getItem("username");

  useEffect(() => {
    Axios.get("http://localhost:4700/viewcount").then((res) => {
      valueContext.setCount(res.data[0].count);
      console.log(valueContext);
    });
  }, [valueContext]);

  function handleid(e) {
    e.preventDefault();
    setId(e.target.value);
  }

  function handleCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  function handleSearch() {
    setSrch(text);
  }

  function handleText(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* <!-- ======= Header ======= --> */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-lg-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>
              Techno<span>Service</span>
            </h1>
          </Link>
          <input
            type="text"
            value={text}
            placeholder="enter your city"
            id=""
            onChange={handleText}
            required
          />
          <Button variant="primary" type="button" onClick={handleSearch}>
            <span>Search</span>
          </Button>
          <nav id="navbar" className="navbar nav-link">
            <ul>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>

              <li>
                <a href="#chefs" value={valueContext.city} onClick={handleCity}>
                  Providers
                </a>
              </li>

              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          {auth ? (
            <Link onClick={logOut} to="/login">
              Log-out
            </Link>
          ) : (
            <>
              <br />
              <Link to="/login" className="btn-book-a-table">
                {" "}
                Login
              </Link>
            </>
          )}
          {/* <Link className="btn-book-a-table" to="/login">
            Login
          </Link> */}

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>
    </>
  );
}

export default Header;
