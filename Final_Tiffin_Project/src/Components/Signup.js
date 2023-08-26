// Sign_up Page
import React from 'react';
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


export default function SignUp() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");


    const { register, handleSubmit, formState: { errors },trigger } = useForm({ shouldUseNativeValidation: true});

    function handlecity(e) {
        e.preventDefault();
        console.log(city);
        setCity(e.target.value);
    };

    function handleaddress(e) {
        e.preventDefault();
        console.log(address);
        setAddress(e.target.value);
    }

    function handlename(e) {

        e.preventDefault();
        console.log(username);
        setUserName(e.target.value);

    };

    function handlepassword(e) {
        e.preventDefault();
        setPassword(e.target.value);

    };

    function handlemobile(e) {
        e.preventDefault();
        setMobile(e.target.value);

    }

    function handlemail(e) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function handleCategory(e) {
        //  e.preventDefault();
        var s = e.target.value
        setCategory(s);
        console.log(e.target.value)
    }


    function mySubmit() 
    {
        const data1 = { "username": username, "password": password, "mobileno": mobile, "email": email, "category": category, "city": city, "address": address };
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1)
        }
        Axios.post("http://localhost:4700/sign_up", data1,config)
        //   .then( res=> setUser(res.data) ); 
        setCategory('');
        setEmail('');
        setMobile('');
        setPassword('');
        setUserName('');
        setCity('');
        setAddress('');

    }

    // console.log(watch);

    const onError = (errors)=>{
        console.log(errors);
    }

    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link to="index.html" className="logo d-flex align-items-center me-auto me-lg-0">
                        {/* Uncomment the line below if you also wish to use an image logo */}
                        {/* <img src="assets/img/logo.png" alt=""> */}
                        <h1>GharKa<span>Khaana</span></h1>
                    </Link>
                    <nav id="navbar" className="navbar">

                    </nav>{/* .navbar */}

                    <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
                    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
                </div>
            </header>{/* End Header */}
            <hr />
            <hr />
            <hr />
            <hr />

            <Container>
                <Form  onSubmit={handleSubmit(mySubmit,onError)}>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name='state'
                            className={`form-control ${ errors.state && "Invalid"}`}

                            {...register("state", {
                                required: "Category is required",
                                min: {
                                    value: 4,
                                    message:"Minimum Required Characters are 4"
                                },
                            })}

                            onKeyUp={()=>{
                                trigger("state");
                            }}
                            onChange={handleCategory} 

                        >
                            <option>Provider</option>
                            <option>Customer</option>
                        </Form.Select>
                        {errors.state && (<small className='text-danger'>{errors.state.message}</small>)}
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter Username"
                            value={username}
                            className={`form-control ${ errors.fullname && "Invalid"}`}

                            {...register("fullname", {
                                required: "Name is required",
                                minLength: {
                                    value: 4,
                                    message:"Minimum Allowed Value is 4"
                                },
                                maxLength: {
                                    value: 20,
                                    message:"Maximum Allowed Value is 20"
                                },
                            })}
                            onKeyUp={()=>{
                                trigger("fullname");
                            }}
                            onChange={handlename}

                        />

                        {errors.fullname && (<small className='text-danger'>{errors.fullname.message}</small>)}

                
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            className={`form-control ${ errors.passcode && "Invalid"}`}

                            {...register("passcode", {
                                required: "Uppercase,LowerCase, Special Character, Number is required",
                                pattern: {
                                    value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                    message:"Invalid Input",
                                }
                            })}
                            onKeyUp={()=>{
                                trigger("passcode");
                            }}
                            onChange={handlepassword}

                        />

                        {errors.passcode && (<small className='text-danger'>{errors.passcode.message}</small>)}
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name='confirmPassword'
                            value={password}
                            className={`form-control ${ errors.confirmPassword && "Invalid"}`}

                            {...register("confirmPassword", {
                                required: "Password should match",
                                
                            })} 
                            onKeyUp={()=>{
                                trigger("confirmPassword");
                            }}
                            onChange={handlepassword}

                            />
                        {errors.confirmPassword && (<small className='text-danger'>{errors.confirmPassword.message}</small>)}
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label>Contact Number</Form.Label>
                        <input type="number"
                            placeholder="Mobile"
                            value={mobile}
                            className={`form-control ${ errors.phone && "Invalid"}`}

                            {...register("phone", {
                                required: "Enter 10 digits mobile no",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message:"Invalid Mobile Number",
                                }
                            })}
                            onKeyUp={()=>{
                                trigger("phone");
                            }}
                            onChange={handlemobile}

                            />
                        {errors.phone && (<small className='text-danger'>{errors.phone.message}</small>)}

                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="e-mail"
                            placeholder="Enter your E-mail"
                            value={email}
                            className={`form-control ${ errors.email && "Invalid"}`}

                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig,
                                    message: "Invalid e-mail address",
                                },
                            })}
                            onKeyUp={()=>{
                                trigger("email");
                            }}
                            onChange={handlemail}

                            />
                        {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}

                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="City"
                            placeholder="Enter your City"
                            value={city}
                            name='city'
                            id='city'
                            className={`form-control ${ errors.city && "Invalid"}`}

                            {...register("city", {
                                required: "Input is required",

                            })}
                            onKeyUp={()=>{
                                trigger("city");
                            }}
                            onChange={handlecity}

                            />
                        {errors.city && (<small className='text-danger'>{errors.city.message}</small>)}

                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="address"
                            placeholder="Enter your Address"
                            value={address}
                            name='address'
                            id='address'
                            className={`form-control ${ errors.address && "Invalid"}`}

                            {...register("address", {
                                required: "this field is required",
                            })}
                            onKeyUp={()=>{
                                trigger("address");
                            }}
                            onChange={handleaddress}

                        />
                        {errors.address && (<small className='text-danger'>{errors.address.message}</small>)}

                    </Form.Group>

                    <Button variant="primary" type="submit" value='Submit'><span>Submit</span></Button>
                </Form>
                <div id="h"></div>
            </Container>
            <br />
            <br />
            {/* ======= Footer ======= */}
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="row gy-3">
                        <div className="col-lg-3 col-md-6 d-flex">
                            <i className="bi bi-geo-alt icon" />
                            <div>
                                <h4>Address</h4>
                                <p>
                                    A108 Adam Street <br />
                                    New York, NY 535022 - US<br />
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-telephone icon" />
                            <div>
                                <h4>Reservations</h4>
                                <p>
                                    <strong>Phone:</strong> +1 5589 55488 55<br />
                                    <strong>Email:</strong> info@example.com<br />
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-clock icon" />
                            <div>
                                <h4>Opening Hours</h4>
                                <p>
                                    <strong>Mon-Sat: 11AM</strong> - 23PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Follow Us</h4>
                            <div className="social-links d-flex">
                                <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        © Copyright <strong><span>Techno service</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        {/* All the links in the footer should remain intact. */}
                        {/* You can delete the links only if you purchased the pro version. */}
                        {/* Licensing information: https://bootstrapmade.com/license/ */}
                        {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/Techno service-bootstrap-restaurant-website-template/ */}
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>{/* End Footer */}
            {/* End Footer */}

        </div>
    );
}

