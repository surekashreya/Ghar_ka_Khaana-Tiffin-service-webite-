import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState ,useEffect} from 'react';
import '../App.css';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from './notification';
import 'react-toastify/dist/ReactToastify.css';

function LoginPayment() {

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  async function onlogin(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const data = { 'email': formValues.email, 'password': formValues.password };
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data)
    }
    console.log(config)
    const response = await fetch('http://localhost:4700/login', config)
    let json = await response.json();
    console.log(json);
    console.log(json.results[0].username);
    localStorage.setItem("username",JSON.stringify(json.results[0].username));
    localStorage.setItem("logincategory", JSON.stringify(json.results[0].category));
    localStorage.setItem("token",JSON.stringify(json.token))

    // alert("welcome");
    if (json.results.length === 0) {
          createNotification("warning", "invalid user");

    }
    else if (json.results[0].category === "provider") {
      createNotification("info","provider can't view the bill")
      setTimeout(() => {
        navigate("/loginpayment");
      }, 1000);
    }
    else if (json.results[0].category === "customer") {
    
      createNotification("success", "welcome to customer panel");
      localStorage.setItem("cname",json.results[0].username);
      setTimeout(() => {
        navigate("/payment");
      }, 1000);

    }
    else if (json.results[0].category === "admin") {
      createNotification("info","admin can't view the bill")
      setTimeout(() => {
        navigate("/loginpayment");
      }, 1000);
    }
  }


  return (
    <div>
      <ToastContainer/>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center me-auto me-lg-0">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>GharKa<span>Khaana</span></h1>
          </Link>
          <nav id="navbar" className="navbar">

          </nav>

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>{/* End Header */}
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
                    <div className="col-lg-6 d-none d-lg-block"><img src="login.jpeg" height="600px" width="500px" alt='login'></img></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input type="text" className="form-control form-control-user"
                              id="exampleInputEmail" aria-describedby="emailHelp"
                              placeholder="Enter Username..."
                              name='email'
                              value={formValues.email}
                              onChange={handleChange} />
                          </div>
                          <p>{formErrors.email}</p>

                          <div className="form-group">
                            <input type="password" className="form-control form-control-user"
                              id="exampleInputPassword" placeholder="Password"     
                              name='password'          
                              value={formValues.password}
                              onChange={handleChange} />
                          </div>
                          <p>{formErrors.password}</p>

                          <button type='button' className="btn btn-primary btn-user btn-block" onClick={onlogin}>
                            Login
                          </button>
                          <hr />
                        </form>

                        <div className="text-center">
                          <Link className="small" to="forgot-password.html">Forgot Password?</Link>
                        </div>
                        <div className="text-center">
                          <Link className="small" to="/signup">Create an Account!</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        {/* <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="js/sb-admin-2.min.js"></script> */}

      </body>

    </div>

  );
}

export default LoginPayment;
