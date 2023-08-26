import React from 'react';
import {NavLink as Link } from 'react-router-dom';

function About(props) {
    return (
        <div>
            
        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>Learn More <span>About Us</span></p>
            </div>
            <div className="row gy-4">
              <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: 'url(assets/img/about.jpg)' ,backgroundSize: "cover"}} data-aos="fade-up" data-aos-delay={150}>
                <div className="call-us position-absolute">
                  <h4>Book your Food</h4>
                  <p>+91-9560576294</p>
                </div>
              </div>
              <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay={300}>
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                  Connecting customers to home chefs mostly Housewives and encouraging them to use their culinary skills 
                  to make money, offering a convenient and flexible job opportunity and food to the customers at min. price
                   while promoting healthy lifestyle  

                  </p>
                  <ul>
                    <li><i className="bi bi-check2-all" /> To create a platform that connects customers with high-quality, home-cooked meals while providing flexible job opportunities for individuals such as housewives</li>
                    <li><i className="bi bi-check2-all" /> To become the leading provider of home-cooked meals and a go-to platform for the customer. It aims to establish a strong reputation and brand as a trusted and reliable source of delicious and healthy meals</li>
                    {/* <li><i className="bi bi-check2-all" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li> */}
                  </ul>
                  <p>
                  Contribute to the nation’s health and wellbeing by providing them hygienic homemade food ,promoting 
                  healthy lifestyle and to the nation’s economic progress and development by providing jobs to the women and transgender
                  </p>
                  <div className="position-relative mt-4">
                    <img src="assets/img/about-2.jpg" className="img-fluid" alt='fluid' />
                    <a href="https://www.youtube.com/watch?v=mMTuK9Yo4tQ" className="glightbox play-btn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{/* End About Section */}

        </div>
    );
}

export default About;