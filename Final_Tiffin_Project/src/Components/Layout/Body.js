import React from 'react';
import { NavLink as Link } from 'react-router-dom';


function Body(props) {
  return (
    <div>
      <main id="main">


        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>Learn More <span>About Us</span></p>
            </div>
            <div className="row gy-4">
              <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: 'url(assets/img/about.jpg)' }} data-aos="fade-up" data-aos-delay={150}>
                <div className="call-us position-absolute">
                  <h4>Book a Table</h4>
                  <p>+95015-48486</p>
                </div>
              </div>
              <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay={300}>
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                  </p>
                  <ul>
                    <li><i className="bi bi-check2-all" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    <li><i className="bi bi-check2-all" /> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                    <li><i className="bi bi-check2-all" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                  </p>
                  <div className="position-relative mt-4">
                    <img src="assets/img/about-2.jpg" className="img-fluid" alt='fluid' />
                    <Link to="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{/* End About Section */}

        {/* <!-- ======= Why Us Section ======= --> */}
        <section id="why-us" className="why-us section-bg">
          <div className="container" data-aos="fade-up">

            <div className="row gy-4">

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="why-box">
                  <h3>Why Choose Techno?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                    Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                  </p>
                  <div className="text-center">
                    <Link to="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
                  </div>
                </div>
              </div>
              {/* <!-- End Why Box --> */}

              <div className="col-lg-8 d-flex align-items-center">
                <div className="row gy-4">

                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-clipboard-data"></i>
                      <h4>Corporis voluptates officia eiusmod</h4>
                      <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}

                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-gem"></i>
                      <h4>Ullamco laboris ladore pan</h4>
                      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}

                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-inboxes"></i>
                      <h4>Labore consequatur incidid dolore</h4>
                      <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}

                </div>
              </div>

          </div>
          </div>
          </section>
      
      </main>
      <div>
        {/* ======= Stats Counter Section ======= */}
        <section id="stats-counter" className="stats-counter">
          <div className="container" data-aos="zoom-out">


          </div>
        </section>{/* End Stats Counter Section */}
      </div>
    </div>


  );
}

export default Body;
