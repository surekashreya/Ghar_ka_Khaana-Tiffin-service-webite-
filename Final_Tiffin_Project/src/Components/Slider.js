// slider of home page

import React from "react";
import { NavLink as Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slider1() {
  return (
    <div style={{ marginBottom: 30 }}>
      <section id="hero" className="hero d-flex align-items-center section-bg">
        <div className="container">
          <div className="row justify-content-between gy-5">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up" style={{ marginTop: "-100px" }}>
                Enjoy Your Healthy
                <br />
                Delicious Food
              </h2>
              <br></br>
              <p
                style={{ marginLeft: 20, fontSize: 20, fontFamily: "cursive" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Nothing more satisfying than <br></br>
                <b>“Ghar Ka Khana”</b>
                <br></br>
                <br></br>
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <Link to="/menu" className="btn-book-a-table">
                  Order Now!
                </Link>
                <a
                  href="https://www.youtube.com/watch?v=4O5Q4Z87epo&feature=youtu.be"
                  className="glightbox btn-watch-video d-flex align-items-center"
                  target="_blank"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img
                src="assets\img\menu\aa.png"
                className="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="800"
                style={{ height: "450px", width: "450px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 500, margin: 0, padding: 0 }}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={1400}
          style={{ width: "98%" }}
        >
          <div style={{ margin: 0, padding: 0 }}>
            <img
              src={require("./GHAR KA KHAANA.png")}
              style={{
                height: 500,
                width: "98%",
                margin: 0,
                padding: 0,
                marginLeft: 30,
                marginTop: 30,
              }}
            ></img>
          </div>
          <div>
            <img
              src={require("./Personalised Meal.png")}
              style={{
                height: 500,
                width: "98%",
                margin: 0,
                padding: 0,
                marginLeft: 30,
                marginTop: 30,
              }}
            ></img>
          </div>
          <div>
            <img
              src={require("./Homechefs.gif")}
              style={{
                height: 500,
                width: "98%",
                margin: 0,
                padding: 0,
                marginLeft: 30,
                marginTop: 30,
              }}
            ></img>
          </div>

          <div>
            <img
              src={require("./First User Offer.png")}
              style={{
                height: 500,
                width: "98%",
                margin: 0,
                padding: 0,
                marginLeft: 30,
                marginTop: 30,
              }}
            ></img>
          </div>
        </Slider>
      </div>
    </div>
  );
}
