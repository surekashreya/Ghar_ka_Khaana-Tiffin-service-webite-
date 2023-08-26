// Sign_up Page
import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Axios from 'axios'
import { registerSchema} from "./schemas/registerSchema";
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from "./notification";
import { Link } from 'react-router-dom';
import './Admin/menu.css'

export default function Register() {
    const [profile_img, setImage] = useState(null)
    const [nameError,setNameError]= useState('')
    const [pentouch,setPenTouch]= useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    const Err=()=>{
        window.scrollTo(0, 0);

    }

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
        gender: '',
        category: '',
        city: '',
        address: ''
    }

    // const checkName=(e)=>{
    //     const nm= e.target.value
    //     Axios.get(`http://localhost:4700/userget/${nm}`)
    //     .then((res)=>{
    //         console.log(res.data.includes(nm),'response')
    //         if(res.data.length>0)
    //         {
    //         setPenTouch(true)
    //         setNameError('username already exist')
    //         }
    //     })
    // }

    const { values, setFieldValue, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: registerSchema,
            

            onSubmit: async (values, action,errors,touched) => {
                console.log(
                    "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
                    values
                );
               

                try {
                    const config = {
                        method: 'post',
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    };
                    

                    const signupResponse = await Axios.post("http://localhost:4700/sign_up", values, config)
                    action.resetForm();
                    values.gender='';

                    console.log(signupResponse, "signupResponse");
                    if (signupResponse.data.statusCode=== 401) {
                        createNotification("warning", signupResponse.data.message);
                    }
                 
                   else if (signupResponse.data.statusCode === 201) {
                        createNotification("success", signupResponse.data.message);
                    } 
                 
                } catch (err) {
                    createNotification("error", err.response);
                }
            },
        });


    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center me-auto me-lg-0">
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
                <ToastContainer />
                <Form>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label className='label'>Category</Form.Label>
                        <Form.Select
                            name='category'
                            value={values.category}
                            placeholder="Enter username"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        >
                            <option value='none'>select the category</option>
                            <option value='provider'>Provider</option>
                            <option value='customer'>Customer</option>
                        </Form.Select>
                        {errors.category && touched.category ? (
                            <p style={{ color: "red" }}>{errors.category}</p>
                        ) : null}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label className='label'>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={values.username}
                            placeholder="Enter username"
                            onChange={handleChange}
                            // onKeyUp={checkName}
                            onBlur={handleBlur}
                        />
                        {nameError && pentouch ? (
                            <p style={{ color: "red" }}>{nameError}</p>
                        ) : null}
                        {errors.username && touched.username ? (
                            <p style={{ color: "red" }}>{errors.username}</p>
                        ) : null}

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={values.password}
                            placeholder="Enter your Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                            <p style={{ color: "red" }}>{errors.password}</p>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='label'>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                        ) : null}

                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label className='label'>Contact Number</Form.Label>
                        <Form.Control
                            type="number"
                            name="mobile"
                            placeholder="Enter your MobileNumber"
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.mobile && touched.mobile ? (
                            <p style={{ color: "red" }}>{errors.mobile}</p>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='label'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            id="input"
                            value={values.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <p style={{ color: "red" }}>{errors.email}</p>
                        ) : null}

                    </Form.Group>

                    <Form.Group
                        className="mb-3 col-lg-6"
                        value={values.gender}
                    >
                        <Form.Label className='label'>Select Your Gender</Form.Label>
                        <Form.Check
                            type={"radio"}
                            label={`Male`}
                            name="gender"
                            value={"Male"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Check
                            type={"radio"}
                            label={`Female`}
                            name="gender"
                            value={"Female"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.gender && touched.gender ? (
                            <p style={{ color: "red" }}>{errors.gender}</p>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label className='label'>City</Form.Label>
                        <Form.Control
                            type="text"
                            name='city'
                            placeholder="Enter your City"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.city && touched.city ? (
                            <p style={{ color: "red" }}>{errors.city}</p>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3" controlled="formBasicPassword">
                        <Form.Label className='label'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='address'
                            placeholder="Enter your Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.address && touched.address ? (
                            <p style={{ color: "red" }}>{errors.address}</p>
                        ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='label'>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            onChange={(event) => {
                                setFieldValue("file", event.target.files[0])
                                setImage( URL.createObjectURL(event.target.files[0]))
                            }}

                        />

                        <img src={profile_img} width='200'
                            height='200' alt="preview image" />

                        {errors.file && touched.file ? (
                            <p style={{ color: "red" }}>{errors.file}</p>
                        ) : null}
                    </Form.Group>


                    <Button variant="primary" type="button" onClick={handleSubmit}><span>Submit</span></Button>
                </Form>
                <div id="h"></div>
            </Container>
            <br />

        </div>
    );
}
