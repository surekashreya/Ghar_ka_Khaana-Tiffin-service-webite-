import React from 'react';

function Contact(props) {
    return (
        <div>

            {/* <!-- ======= Contact Section ======= --> */}
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>Contact</h2>
                        <p>Need Help? <span>Contact Us</span></p>
                    </div>

                    <div className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14032.476781782243!2d77.0093168!3d28.445823049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d178c959e1e89%3A0x51e949b9b52831b9!2sSector%2010A%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1681455023357!5m2!1sen!2sin" width={"100%"} height={"300px"} title='dishes'></iframe>

                    </div>
                    {/* <!-- End Google Maps --> */}

                    <div className="row gy-4">

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-map flex-shrink-0"></i>
                                <div>
                                    <h3>Our Address</h3>
                                    <p> Sector 10, Gurgaon, Haryana</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Info Item --> */}

                        <div className="col-md-6">
                            <div className="info-item d-flex align-items-center">
                                <i className="icon bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>admin@gharKaKhaana.com</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Info Item --> */}

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-telephone flex-shrink-0"></i>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+91-9560576294</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Info Item --> */}

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-share flex-shrink-0"></i>
                                <div>
                                    <h3>Opening Hours</h3>
                                    <div><strong>24 X 7 open</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Info Item --> */}

                    </div>

                    <form action="https://formsubmit.co/07f1c5a89f616c9f054b7b1f310ee981"  method="POST" role="form" className="php-email-form p-3 p-md-4">
                        <div className="row">
                            <div className="col-xl-6 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                            </div>
                            <div className="col-xl-6 form-group">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                        </div>
                        <div className="my-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your message has been sent. Thank you!</div>
                        </div>
                        <div className="text-center"><button type="submit">Send Message</button></div>
                    </form>
                    {/* <!--End Contact Form --> */}

                </div>
            </section>
            {/* <!-- End Contact Section --> */}

        </div>
    );
}

export default Contact;
