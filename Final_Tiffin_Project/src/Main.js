// home page header part
import React from "react";
import "./App.css";
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Footer from "./Components/Layout/Footer.js";
import { NavLink as Link, Route, Routes, useNavigate } from "react-router-dom";
import NoteContext from "./useContext/NoteContext.js";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import Home from "./Home";
import AdminViews from "./Components/Admin/AdminView";
import View_cart from "./Components/Shopping";
import LoginPayment from "./Components/LoginPayment";
import Bill from "./Components/Bill/Bill";
import Payment from "./Components/Bill/Payment";
import Login from "./Components/Login";
import Viewitem from "./Components/Admin/Viewitem";
import Contact from "./Components/Layout/Contact";
import About from "./Components/Layout/About";
import Menu from "./Components/Menu/Menu";
import ViewMenu from "./Components/Admin/ViewMenu";
import Register from "./Components/Register";
import AddMenu from "./Components/Admin/AddMenu";
import { Button } from "react-bootstrap";
import ProvOrders from "./Components/Admin/ProvOrders";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Chat from './Components/Layout/Chat.js' ;

export default function Main() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("username");
  const category = localStorage.getItem("logincategory");

  //  user icon in navbar

  const [userName, setUserName] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [categorytype, setCategoryType] = useState("");

  const handleHover = () => {
    const storedUserName = auth;
    const storedCategoryType = category;
    setUserName(storedUserName);
    setCategoryType(storedCategoryType);
    clearTimeout(timerId);
  };

  const handleLeave = () => {
    setTimerId(
      setTimeout(() => {
        setUserName("");
        setCategoryType("");
      }, 1000)
    ); // remove user name after 3 seconds
  };

  const valueContext = useContext(NoteContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:4700/viewcount").then((res) => {
      valueContext.setCount(res.data[0].count);
      console.log(valueContext);
    });
  }, [valueContext]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* <Header /> */}
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
              GharKa<span>Khaana</span>
            </h1>
          </Link>
          <nav id="navbar" className="navbar nav-link">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/menu">Providers</a>
              </li>

              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>

          {/* <Avatar {...stringAvatar(auth)} /> */}
          {/* {categorytype}  {auth} */}

          {auth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccountCircleIcon
                onMouseOver={handleHover}
                onMouseLeave={handleLeave}
              ></AccountCircleIcon>
              <div>
                {categorytype} {userName}
              </div>

              <Button onClick={logOut} className="btn-book-a-table">
                LogOut
              </Button>
            </div>
          ) : (
            <>
              <br />
              <Link to="/login" className="btn-book-a-table">
                {" "}
                Login
              </Link>
            </>
          )}
          <Link to="/cart">
            <Badge badgeContent={valueContext.count} color="error">
              <ShoppingCartCheckoutIcon />
            </Badge>
          </Link>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>

      <div>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/tiffindescription" element={<AddMenu />} />
            <Route
              exact
              path="/viewitem"
              element={<Viewitem />}
              target="blank"
            />
            <Route exact path="/adminview" element={<AdminViews />} />
            <Route exact path="/cart" element={<View_cart />} />
            <Route exact path="/loginpayment" element={<LoginPayment />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/bill" element={<Bill />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/menuitem" element={<ViewMenu />} />
            <Route exact path="/provorders" element={<ProvOrders />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </div>

      <div>
        {/* <Chat></Chat> */}
        <Footer />
      </div>
    </>
  );
}
