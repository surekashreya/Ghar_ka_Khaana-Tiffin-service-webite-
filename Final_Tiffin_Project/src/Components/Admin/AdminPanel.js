import React, { useEffect, useState } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from "../notification";
import { NavLink as Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./menu.css";
import ViewProItem from "./ViewProItem";
import ViewCustomer from "./ViewCustomer";
import Axios from "axios";
import "./panel.css";

export default function AdminPanel() {
  const [profile_img, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [photo, setPhoto] = useState();
  const [pic, setPic] = useState();
  const [editUser, setEditUser] = useState();
  const [identity, setIdentity] = useState(0);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const [showProv, setShowProv] = useState(false);
  const [visible, setVisible] = useState(true);
  const [proId, setProId] = useState("");
  const [cusId, setCusId] = useState("");
  const [cusName, setCusName] = useState("");
  const [st, setSt] = useState("");
  const navigate = useNavigate();
  const [activeTable, setActiveTable] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    username: "",
    mobileno: "",
    email: "",
    city: "",
    category: "",
    identity: "",
    address: "",
  };

  // // axios.defaults.withCredentials = true
  // useEffect(()=>{
  //   Axios.get("http://localhost:4700/showusers").then((res) => {
  //   console.log(users, "setproduct");
  //   setUsers(res.data);
  // });
  // },[])

  const getUsers = () => {
    Axios.post("http://localhost:4700/showusers").then((res) => {
      console.log(users, "setproduct");
      setUsers(res.data);
    });
  };

  useEffect(() => {
    // setSt({})
    getUsers();
    // window.location.reload(false);
    //    window.location.reload(true);
  }, [setUsers]);

  const delUser = (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        //   "Content-Type": "application/json",
      },
    };

    const id = e.target.value;
    console.log(id);
    fetch(`http://localhost:4700/deleteuser/${id}`, config).then((res) => {
      setTimeout(() => {
        getUsers();
      }, 1000);
      createNotification("info", "item deleted");
    });
  };

  const EditUser = (item) => {
    console.log(item, "items ..");
    console.log(item.item_image, "image of item");
    setShowedit(!showedit);
    setEditUser(item);
    setPhoto(item.item_image);
    setIdentity(item.id);

    values.username = item.username ? item.username : "";
    values.address = item.address ? item.address : "";
    values.city = item.city ? item.city : "";
    values.email = item.email ? item.email : "";
    values.identity = item.id;
    values.category = item.category;
    values.mobileno = item.mobileno ? item.mobileno : "";
    values.profile_img = item.profile_img ? item.profile_img : "";
  };

  const View = (e) => {
    e.preventDefault();
    const cat = e.target.name;
    const email = e.target.id;
    if (cat === "provider") {
      e.preventDefault();
      setProId(e.target.id);
      setName(e.target.value);
      // setVisible(true);
      setShowProv(!showProv);
      console.log(name, "provider get");
    }
    if (cat === "customer") {
      e.preventDefault();
      setCusId(e.target.id);
      setCusName(e.target.value);
      // setVisible(false);
      setShow(!show);
      console.log(name, "customer get");
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,

    onSubmit: async (values, action) => {
      console.log(initialValues, "......fetched image");

      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
        values
      );
      console.log(pic, "fileupload");

      // let data={
      //   username:values.username,
      //   email:values.email,
      //   mobileno:values.mobileno,
      //   category:values.category,
      //   profile_img:pic,
      //   city:values.city,
      //   address:values.address,
      //   identity:values.identity,
      // }

      let formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("mobileno", values.mobileno);
      formData.append("file", pic);
      formData.append("category", values.category);

      formData.append("city", values.city);
      formData.append("address", values.address);
      formData.append("identity", values.identity);

      try {
        const config1 = {
          method: "POST",
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            // "Content-Type": "multipart/form-data",
          },
          body: formData,
        };

        console.log(values.identity, "id tobe updated");
        const updateResponse = await fetch(
          `http://localhost:4700/updateuser/${values.identity}`,

          config1
        );
        console.log(updateResponse.data, "updateResponse");
        if (updateResponse) {
          createNotification("success", "data updated successfully");
          setTimeout(() => {
            getUsers();
            action.resetForm();
          }, 1000);
        }
      } catch (err) {
        console.log(err.response, "error valid");
        toast(err.response.data.message);
      }
    },
  });

  const handleTable1Click = () => {
    setActiveTable("table1");
  };

  const handleTable2Click = () => {
    setActiveTable("table2");
  };

  return (
    <div>
      <ToastContainer />
      {/* ======= Header ======= */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="container d-flex align-items-center justify-content-between ">
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

          <nav id="navbar" className="navbar"></nav>
          {/* .navbar */}
          <Button variant="primary" type="button" onClick={logOut}>
            Log-Out
          </Button>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>

      {/* End Header */}
      <hr />
      <hr />
      <hr />
      <hr />

      <button className="button btn1" onClick={handleTable1Click}>
        {" "}
        Service Providers
      </button>
      <button className="button btn2" onClick={handleTable2Click}>
        Customers
      </button>
      {showedit ? (
        <Container>
          <ToastContainer />
          <Form>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="label">Category</Form.Label>
              <Form.Select
                name="category"
                value={values.category}
                placeholder="Enter username"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="provider">Provider</option>
                <option value="customer">Customer</option>
              </Form.Select>
              {errors.category && touched.category ? (
                <p style={{ color: "red" }}>{errors.category}</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label">User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                placeholder="Enter username"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <p style={{ color: "red" }}>{errors.username}</p>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlled="formBasicPassword">
              <Form.Label className="label">Contact Number</Form.Label>
              <Form.Control
                type="number"
                name="mobileno"
                placeholder="Enter your MobileNumber"
                value={values.mobileno}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobileno && touched.mobileno ? (
                <p style={{ color: "red" }}>{errors.mobileno}</p>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label">Email</Form.Label>
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

            <Form.Group className="mb-3" controlled="formBasicPassword">
              <Form.Label className="label">City</Form.Label>
              <Form.Control
                type="text"
                name="city"
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
              <Form.Label className="label">Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
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
              <Form.Label className="label">Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={(event) => {
                  setFieldValue("file", event.target.files[0]);
                  setImage(URL.createObjectURL(event.target.files[0]));
                  setPic(event.target.files[0]);
                }}
              />

              <img
                src={profile_img}
                width="200"
                height="200"
                alt="preview image"
              />

              {errors.file && touched.file ? (
                <p style={{ color: "red" }}>{errors.file}</p>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              <span>Submit</span>
            </Button>
          </Form>
          <div id="h"></div>
        </Container>
      ) : (
        ""
      )}
      <br />
      <div>
        <Table striped="rows" className="table table-striped">
          <thead className="thead-dark">
            <tr className="lg">
              <th scope="col">Username</th>
              <th scope="col">Email Address</th>
              <th scope="col">Gender</th>
              <th scope="col">Mobile</th>
              <th scope="col">Category</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">User Image</th>
              <th scope="col">Edit Item</th>
              <th scope="col">Delete</th>
              <th scope="col">View Item</th>
            </tr>
          </thead>

          <tbody>
            {activeTable === "table1" &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.category === "provider" && (
                      <>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.mobileno}</td>
                        <td>{item.category}</td>
                        <td>{item.city}</td>
                        <td>{item.address}</td>
                        <td>
                          <img
                            src={item.profile_img}
                            style={{ width: 100, height: 100 }}
                            alt="tiffinservice"
                          />
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => EditUser(item)}
                          >
                            {showedit ? "Close " : "Edit"}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={delUser}
                            value={item.id}
                            id={item.id}
                          >
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={View}
                            value={item.username}
                            id={item.email}
                            name={item.category}
                          >
                            {showProv ? "Close Item" : "View Item"}
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}

            {activeTable === "table2" &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.category === "customer" && (
                      <>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.mobileno}</td>
                        <td>{item.category}</td>
                        <td>{item.city}</td>
                        <td>{item.address}</td>
                        <td>
                          <img
                            src={item.profile_img}
                            style={{ width: 100, height: 100 }}
                            alt="tiffinservice"
                          />
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => EditUser(item)}
                          >
                            {showedit ? "Close " : "Edit"}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={delUser}
                            value={item.id}
                            id={item.id}
                          >
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={View}
                            value={item.username}
                            id={item.email}
                            name={item.category}
                          >
                            {/* View Item */}
                            {show ? "Close Item" : "View Item"}
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}

            <div></div>
          </tbody>
        </Table>
      </div>
      <>
        {showProv && (
          <div>
            <ViewProItem
              name={name}
              id={proId}
              open={show}
              handleClose={View}
            />
          </div>
        )}

        {show && (
          <div>
            <ViewCustomer
              name={cusName}
              id={cusId}
              open={show}
              handleClose={View}
            />
          </div>
        )}
        {/* {!visible ? (
          <div>
            <ViewCustomer name={cusName} id={cusId} open={show} />
          </div>
        ) : (
          ""
        )} */}
      </>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
