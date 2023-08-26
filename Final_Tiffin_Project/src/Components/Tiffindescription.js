import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Axios from "axios";

function Tiffintype() {
  const [foodtype, setFoodtype] = useState("");
  const [itemname, setItemName] = useState("");
  const [detail, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [product, setProduct] = useState([]);
  const [id, setId] = useState("");
  // const [name,setName]=useState("");

  function handlefoodtype(e) {
    e.preventDefault();
    setFoodtype(e.target.value);
  }
  function handlename(e) {
    e.preventDefault();
    setItemName(e.target.value);
  }
  function handledetails(e) {
    e.preventDefault();
    setDetails(e.target.value);
  }
  function handleprice(e) {
    e.preventDefault();
    setPrice(e.target.value);
  }
  function handlefile(e) {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  useEffect(() => { 
    let nm=localStorage.getItem("userid");
    let mydata ={ 'nm' : nm};
    console.log(mydata);
    Axios.post("http://localhost:4700/showitem",mydata)
    .then((res)=>setProduct(res.data))
  }, []);

 
  const addtiffin = (e) => {
    e.preventDefault();
    let err = false;
    let m = document.getElementById("h");
    if (itemname === "") {
      m.innerHTML += "Field is required";
      err = true;
    }
    if (detail === "") {
      m.innerHTML = "Kindly fill Detials of an item";
      err = true;
    }
    if (price === "") {
      m.innerHTML += "Price field can't be empty";
      err = true;
    }
    if (file === "") {
      m.innerHTML += "Please upload an image";
      err = true;
    }
    if (foodtype === "") {
      m.innerHTML += "Please select the type of food";
      err = true;
    }
    if (err) {
      return;
    } else {
      const data = {
        foodtype: foodtype,
        itemname: itemname,
        details: detail,
        price: price,
        file: file,
      };

      const formData = new FormData();
      formData.append("itemname", itemname);
      formData.append("details", detail);
      formData.append("price", price);
      formData.append("file", file);
      formData.append("foodtype", foodtype);
      formData.append("name", localStorage.getItem("userid"));
      console.log(file);
      const config = {
        header: {
          "content-type": "multipart/form-data",
        },
      };

      Axios.post("http://localhost:4700/saveitem", formData, config).then(
        (res) => setProduct(res.data)
      );
      console.log(product);
      setItemName("");
      setDetails("");
      setPrice("");
      setFile("");
      setFile("");
      setFoodtype("");
    }
  };

  const delitem = (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log(id);
    Axios.post(`http://localhost:4700/itemdelete/${id}`).then((res) => {
      setProduct(res.data);
    });
  };

  const editItem = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/itemedit/${id}`).then((res) => {
      console.log(res.data);
      setFoodtype(res.data[0].item_category);
      setItemName(res.data[0].item_name);
      setPrice(res.data[0].item_price);
      // setFile(res.data[0].item_image);
      setDetails(res.data[0].item_details);
      setId(res.data[0].id);
      setFile("");
      // alert(product.length + "done" + res.data.length);
    });
  };

  const updateitem = (e) => {
    const formData = new FormData();
    formData.append("itemname", itemname);
    formData.append("details", detail);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("foodtype", foodtype);
    formData.append("id", e.target.id);
    console.log(file);
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };

    Axios.post("http://localhost:4700/updateitem", formData, config).then(
      (res) => setProduct(res.data)
    );
  };

  return (
    <div>
      <div id="h"></div>
       {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">
      <Link to="index.html" className="logo d-flex align-items-center me-auto me-lg-0">
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.png" alt=""> */}
        <h1>Techno <span>service</span></h1>
      </Link>
      <nav id="navbar" className="navbar">
       
      </nav>{/* .navbar */}
      
      <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
      <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
    </div>
  </header>{/* End Header */}
      
  <main id="main">
    {/* ======= Breadcrumbs ======= */}
    <div className="breadcrumbs">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Add New Items</h2>
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>items panel</li>
          </ol>
        </div>
      </div>
    </div>{/* End Breadcrumbs */}
    <section className="sample-page">
      <div className="container" data-aos="fade-up">
        
      <Container>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Tiffin type</Form.Label>
            <Form.Select value={foodtype} onChange={handlefoodtype}>
              <option>Choose...</option>
              <option>Break fast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </Form.Select>
          </Form.Group>
          <br></br>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalitemname"
          >
            <Form.Label column sm={2}>
              Item name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="Discription"
                placeholder="Name of item"
                value={itemname}
                onChange={handlename}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalDiscription"
          >
            <Form.Label column sm={2}>
              Discription
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="Discription"
                placeholder="Discription"
                value={detail}
                onChange={handledetails}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalprice">
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="Price"
                placeholder="Price"
                value={price}
                onChange={handleprice}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalprice">
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" onChange={handlefile} />
            </Col>
          </Form.Group>
          <br />
          <>
            <Button variant="primary" onClick={addtiffin}>
              <span>Add tiffin</span>
            </Button>{" "}
            {/* <Button variant="danger">Modify</Button>{' '} */}
            {/* <Button variant="success" onClick={updateitem} id={id}>
              Update
            </Button>{" "} */}
          </>
        </Container>
        <br />
        <br />
      
      <div>
      <Table striped="rows"  className="table table-striped">
        <thead className="thead-dark">
          <tr className="lg">
            <th scope="col">item id</th>
            <th scope="col">Item name</th>
            <th scope="col">Item Details</th>
            <th scope="col">Item Price</th>
            <th scope="col">item Image</th>
            <th scope="col">Edit Item</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => {
            return (
              <tr key={index}>
                <td >{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.item_details}</td>
                <td>{item.item_price}</td>
                <td>
                  <img
                    src={item.item_image}
                    style={{ width: 100, height: 100 }} 
                    alt='tiffinservice'
                  />
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={editItem}
                    value={item.id}
                    id={item.id}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={delitem}
                    value={item.id}
                    id={item.id}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        </Table>
      </div>
      </div>
    </section>
  </main>{/* End #main */} 
  
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
        Designed by <a href="http://techversyssolutions.com/">Techversys</a>
      </div>
    </div>
  </footer>{/* End Footer */}
  {/* End Footer */}
</div>

  );
}

export default Tiffintype;
