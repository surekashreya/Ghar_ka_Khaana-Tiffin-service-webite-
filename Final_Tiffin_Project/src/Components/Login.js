import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from "./notification";
import "react-toastify/dist/ReactToastify.css";
import NoteContext from "../useContext/NoteContext";
import  Axios  from "axios";
import { useCookies } from 'react-cookie';
import Footer from "./Layout/Footer";


function Login() {
  const [error, setError] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);

  const navigate = useNavigate();
  const valueContext = useContext(NoteContext);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,

      [name]: value,
    });
  };

  const validForm = (e) => {
    const { email, password } = user;
    const formError = {};
    console.log("form validation");
    var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    let isValue = true;

    if (!email) {
      formError["emailError"] = "email is required";
      isValue = false;
    } else if (!regEmail.test(email)) {
      formError["emailError"] = "email pattern wont match";
      isValue = false;
    }
    if (!password || password.length < 4) {
      formError["passwordError"] = "password is required";
      isValue = false;
    }

    setError(formError);
    return isValue;
  };


  const userAuthenticeted = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  async function onlogin(e) {
    e.preventDefault();

    const val = validForm();
    console.log(val);

    if (val) {
      try {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };
        console.log(config);
        var response = await fetch("http://localhost:4700/login", config);
        const json = await response.json();
        localStorage.setItem("token",JSON.stringify(json.token))
        console.log(json,'jsondata');
        localStorage.setItem("username", json.results[0].username);
        localStorage.setItem("logincategory", JSON.stringify(json.results[0].category));
        setLoginStatus (true);

        // console.log(json[0].category);
        // alert("welcome");
        if (json.results.length === 0) {
          createNotification("warning", "invalid user,please try again");
        } else if (json.results[0].category === "provider") {
          // alert("welcome Provider");
          localStorage.setItem("userid", json.results[0].email);
          localStorage.setItem("provider", JSON.stringify(json.results[0].category));
          localStorage.setItem("providername", json.results[0].username);

          valueContext.setUserId(json.results[0].email);
          valueContext.setName(json.results[0].username);

          createNotification("success", "welcome to provider panel");

          setTimeout(() => {
            navigate("/tiffindescription");
          }, 1000);
        } else if (json.results[0].category === "customer") {
          localStorage.setItem("customer", JSON.stringify(json.results[0].category));
          localStorage.setItem("customername", json.results[0].username);
          createNotification("success", "welcome to customer panel");
          setTimeout(() => {
            navigate("/menu");
          }, 1000);
        } else if (json.results[0].category === "admin") {
          localStorage.setItem("admin", JSON.stringify(json.results[0].category));
          localStorage.setItem("adminname", json.results[0].username);
          createNotification("success", "welcome to admin panel");
          setTimeout(() => {
            navigate("/adminview");
          }, 1000);
        }
      } catch (err) {
        if (!response.auth) {
          setLoginStatus( false);
        }
        createNotification("warning", "incorrect username or password");
      }
    }
  }



  return (
    <div>
      <ToastContainer />

      {/* ======= Header ======= */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <p>{cookies.user}</p>
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-lg-0"
          >
            
            <h1>GharKa<span>Khaana</span></h1>
             
          </Link>
          <nav id="navbar" className="navbar"></nav>

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>
      {/* End Header */}
      <br />
      <br />
      <br />
      <body className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block">
                      <img
                        src="login.jpeg"
                        height="600px"
                        width="500px"
                        alt="login"
                      ></img>
                    </div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              name="email"
                              value={user.email}
                              placeholder="Please Enter Your EmailId"
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>{error.emailError}</p>
                          </div>

                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Please Enter Your Password"
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>
                              {error.passwordError}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary btn-user btn-block"
                            onClick={onlogin}
                          >
                            Login
                          </button>
                          <hr />
                          {/* {loginStatus && (
                            <button onClick={userAuthenticeted}>
                              Check if authenticated
                            </button>
                          )} */}
                        </form>

                        <div className="text-center">
                          <Link className="small" to="#">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="text-center">
                          <Link className="small" to="/signup">
                            Create an Account!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="js/sb-admin-2.min.js"></script>
      </body>
      {/* ======= Footer ======= */}
     {/* <Footer></Footer> */}
    </div>
  );
}

export default Login;
