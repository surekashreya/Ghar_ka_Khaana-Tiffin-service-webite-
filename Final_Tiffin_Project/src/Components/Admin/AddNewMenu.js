import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Axios from "axios";
import { createNotification } from "../notification";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './menu.css'
import NoteContext from "../../useContext/NoteContext";

function AddMenu() {
    const [image, setImage] = useState(null)

    const [file, setFile] = useState("");
    const [product, setProduct] = useState([]);
    const [error, setError] = useState([]);
    const [photo,setPhoto]= useState('');
    const [menuImg,setMenuImg]= useState('');
    const [id, setId] = useState("");
    const [editItem, setEditItem] = useState();
    const logincategory= localStorage.getItem("provider")
    const providername= localStorage.getItem('providername')
    const valueContext= useContext(NoteContext);
    var useremail= valueContext.userid;
    var nm = localStorage.getItem("userid");

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    const [tiffin, setTiffin] = useState(
        {
            category: '',
            itemname: '',
            detail: '',
            price: '',
            identity: "",
            tiffin_img: ""
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTiffin({
            ...tiffin,

            [name]: value,
        });
    };

    const handleFile = (event) => {

            setTiffin({ ...tiffin, ["tiffin_img"]: event.target.files[0] });
            setMenuImg(event.target.files[0])
            setImage(URL.createObjectURL(event.target.files[0]));
            console.log(tiffin.tiffin_img, 'user image ......')

        
    }

    const validForm = (e) => {
        const { category, itemname, detail, price, tiffin_img } = tiffin;

        const formError = {};
        console.log('form validation')

        let isValue = true;

        if (!category) {
            formError["foodtypeError"] = "enter the type of food";
            isValue = false;
        }
        if (!itemname) {
            formError["itemnameError"] = "Please enter the name of item";
            isValue = false;
        }
        if (!detail) {
            formError["detailError"] = "give few idea about product";
            isValue = false;
        }
        if (!price) {
            formError["priceError"] = "enter the amount of product";
            isValue = false;
        }
        if (!tiffin_img) {
            formError["imageError"] = "please upload the image";
            isValue = false;
        }
        setError(formError);
        return isValue;
    };

    const getProduct=()=>{
        let mydata = { 'nm': nm };

        console.log(useremail,'emailof_user')
        console.log(mydata);
        Axios.post("http://localhost:4700/showitem",mydata)
            .then((res) => {
                console.log(product, 'setproduct')
                setProduct(res.data)
            })
    }

    useEffect(() => {
        getProduct();
    }, []);

    const addtiffin = (e) => {
        e.preventDefault();
        const val = validForm();
        const { itemname, detail, price, category, tiffin_img,identity } = tiffin

        if (val) {
            const formData = new FormData();
            formData.append("itemname", itemname);
            formData.append("details", detail);
            formData.append("price", price);
            formData.append("file", tiffin_img);
            formData.append("foodtype", category);
            formData.append("name", localStorage.getItem("userid"));
            console.log(file);
            const config = {
                header: {
                    "content-type": "multipart/form-data",
                },
            };

            Axios.post("http://localhost:4700/saveitem", formData, config).then(
                (res) => {
                    console.log(res.data, 'products added')
                    setTimeout(() => {

                        setProduct(res.data)
                    }, 1000)
                    
                    createNotification('success', 'data submitted successfully')
                    tiffin.category='';
                    tiffin.detail='';
                    tiffin.identity='';
                    tiffin.itemname='';
                    tiffin.price='';
                    tiffin.tiffin_img='';
                  
                    // getProduct();
                }
            );

        }
        else {
            createNotification('warning', 'data is not valid')
        }
    };

    const delitem = (e) => {
        e.preventDefault();
        const id = e.target.value;
        console.log(id);
        Axios.post(`http://localhost:4700/itemdelete/${id}`).then((res) => {
            setTimeout(()=>{
                setProduct(res.data);

            },1000)
            createNotification('info', 'item deleted')

        });

    };

    const EditItem = (item) => {
        console.log(item, 'items ..')
        console.log(item.item_image, 'image of item')
        setEditItem(item);
        setPhoto(item.item_image);
        tiffin.category = item.item_category
        tiffin.itemname = item.item_name
        tiffin.detail = item.item_details
        tiffin.price = item.item_price
        tiffin.identity = item.id
        tiffin.tiffin_img=item.tiffin_img

        console.log(tiffin.tiffin_img, '......fetched image')
    }


    const updateItem = (e) => {
        e.preventDefault();

        const { itemname, detail, price, category, tiffin_img, identity } = tiffin

    
            const formData = new FormData();
            formData.append("itemname", itemname);
            formData.append("details", detail);
            formData.append("price", price);
            formData.append("file", tiffin_img);
            formData.append("foodtype", category);
            formData.append("id", identity);
            console.log(file);
            const config = {
                header: {
                    "content-type": "multipart/form-data",
                },
            };

            Axios.post("http://localhost:4700/updateitem", tiffin, config).then(
                (res) => {
                    createNotification('success', 'data submitted successfully')
                    setTimeout(() => {

                        setProduct(res.data)
                    }, 1000)

                    // setTiffin("");
                    tiffin.category=''
                    tiffin.detail=''
                    tiffin.identity=''
                    tiffin.itemname=''
                    tiffin.price=''
                    // tiffin.tiffin_img=''
                    // getProduct();
                }
            );
      
    };

    return (
        <div>
            <ToastContainer />
            <div id="h"></div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link to='/' className="logo d-flex align-items-center me-auto me-lg-0">
                        {/* Uncomment the line below if you also wish to use an image logo */}
                        {/* <img src="assets/img/logo.png" alt=""> */}
                        <h1>GharKa<span>Khaana</span></h1>
                    </Link>
                    <nav id="navbar" className="navbar">
                        {logincategory} : {providername}
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
                                <Form.Label className='label'>Tiffin type</Form.Label>
                                <Form.Select
                                    name='category'
                                    value={tiffin.category}
                                    onChange={handleChange}
                                >
                                    <option
                                        value='none'
                                    >Choose...</option>

                                    <option

                                        value='breakfast'
                                    >Breakfast</option>

                                    <option
                                        value='lunch'
                                    >Lunch</option>

                                    <option
                                        value='dinner'
                                    >Dinner</option>

                                </Form.Select>
                                <p style={{ color: "red" }}>{error.foodtypeError}</p>

                            </Form.Group>
                            <br></br>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalitemname"
                            >
                                <Form.Label column sm={2} className='label'>
                                    Item name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name of item"
                                        name='itemname'
                                        value={tiffin.itemname}
                                        onChange={handleChange}
                                    />
                                    <p style={{ color: "red" }}>{error.itemnameError}</p>

                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalDiscription"
                            >
                                <Form.Label column sm={2} className='label'>
                                    Discription
                                </Form.Label >
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Describe about product"
                                        name="detail"
                                        value={tiffin.detail}
                                        onChange={handleChange}
                                    />
                                    <p style={{ color: "red" }}>{error.detailError}</p>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalprice">
                                <Form.Label column sm={2} className='label'>
                                    Price
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Price"
                                        name="price"
                                        value={tiffin.price}
                                        onChange={handleChange}
                                    />
                                    <p style={{ color: "red" }}>{error.priceError}</p>

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalprice">
                                <Form.Label column sm={2} className='label'>
                                    Item Image
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control 
                                        type="file" 
                                        name='profile_img' 
                                        
                                        onChange={handleFile} />
                                </Col>
                                <img src={image} width='200'
                                    height='200' alt="preview image" />

                                <p style={{ color: "red" }}>{error.tiffin_imgError}</p>

                            </Form.Group>
                            <br />
                            <>
                                {
                                    <>
                                        {editItem ?

                                            <Button variant="primary" onClick={updateItem}>
                                                <span>Update Item</span>
                                            </Button>

                                            :

                                            <Button variant="primary" onClick={addtiffin}>
                                                <span>Add tiffin</span>
                                            </Button>
                                        }

                                    </>
                                }
                                {" "}

                            </>
                        </Container>
                        <br />
                        <br />

                        <div>
                            <Table striped="rows" className="table table-striped">
                                <thead className="thead-dark">
                                    <tr className="lg">
                                        <th scope="col">Item name</th>
                                        <th scope="col">Item Details</th>
                                        <th scope="col">Item Price</th>
                                        <th scope="col">Item Category</th>
                                        <th scope="col">item Image</th>
                                        <th scope="col">Edit Item</th>
                                        <th scope="col">Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.item_name}</td>
                                                <td>{item.item_details}</td>
                                                <td>{item.item_price}</td>
                                                <td>{item.item_category}</td>
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
                                                        onClick={() => EditItem(item)}

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

      
        </div>

    );
}

export default AddMenu;
