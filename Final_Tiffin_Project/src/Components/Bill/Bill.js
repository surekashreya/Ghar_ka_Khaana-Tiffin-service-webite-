// import React, { useEffect, useRef, useState } from "react";
// import { Button, Container, Form, Table } from "react-bootstrap";
// import Axios from "axios";
// import Header1 from "../Layout/Header1.js";
// // import Footer from "../Layout/Footer.js";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";
// import PrintIcon from "@mui/icons-material/Print";
// import DoneIcon from "@mui/icons-material/Done";
// import ReactToPrint from "react-to-print";

// import { Link } from "react-router-dom";

// export default function Bill() {
//   const [mylist, setList] = useState([]);
//   const [gross, setGross] = useState("");
//   const [billno, setBillno] = useState("");
//   const items = JSON.parse(localStorage.getItem("items"));
//   const cname = localStorage.getItem("cname");
//   const cust = localStorage.getItem("customername");
//   let disPrice = localStorage.getItem("discountPrice");
//   let componentRef = useRef();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   async function mysubmit() {
//     const result = await Axios.post("http://localhost:4700/bill");
//     setList(result.data);
//     console.log(result.data);
//     console.log(billno);
//     console.log(items);
//     setBillno(result.data[0].billno);

//     let g = 0;
//     if (result.data.length > 0)
//       for (let i = 0; i < result.data.length; i++) {
//         g += result.data[i].purchase_price * result.data[i].purchase_qty;
//       }
//     setGross(g);

//     console.log(disPrice, "discountprice");
//   }

//   return (
//     <div>
//       <Header1 />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div style={{ position: "relative", left: "50%" }}>
//         <Link to="/">
//           <Button>Go To Home</Button>
//         </Link>
//       </div>

//       <ReactToPrint
//         trigger={() => (
//           <PrintIcon style={{ position: "relative", left: "80%" }} />
//         )}
//         content={() => componentRef}
//       />

//       <Container>
//         <Form>
//           <Button variant="primary" type="button" onClick={mysubmit}>
//             Generate Bill
//           </Button>
//           &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
//           <div>
//             <Table ref={(el) => (componentRef = el)} striped bordered hover>
//               <thead>
//                 <tr>
//                   <th colSpan="6">
//                     <h1 align="center">INVOICE</h1>
//                     <h3 align="center">GHAR KA KHAANA</h3>
//                     <h3 align="center">Gurgaon, Sector 10</h3>
//                     <h3 align="center">Phone: +91-9560576294</h3>
//                     <hr></hr>
//                     <h4>
//                       Invoice No: {billno} Invoice Date:{" "}
//                       {new Date().toDateString()}
//                     </h4>
//                     Customer Name : {cname ? cname : cust}
//                     <br />
//                     Shipment Address : #121
//                   </th>
//                 </tr>
//               </thead>
//               <br />
//               <br />
//               <tbody>
//                 <tr>
//                   <th> Product Id</th>
//                   <th>Product Name</th>
//                   <th>Individual Price </th>
//                   <th>Product Quantity</th> <th>Amount</th>
//                 </tr>

//                 {mylist.map((item, index) => {
//                   console.log(item);
//                   return (
//                     <tr key={index}>
//                       <td>{item.id}</td>
//                       <td>{item.item_name}</td>
//                       <td>{item.purchase_price}</td>
//                       <td>{item.purchase_qty}</td>

//                       <td>{item.purchase_price * item.purchase_qty}</td>
//                     </tr>
//                   );
//                 })}
//                 <tr>
//                   <td>
//                     <td colSpan="4" align="right">
//                       <h6>Gross Payable Amount Without Discount</h6>
//                     </td>
//                     <td colSpan="4" align="right">
//                       {gross}
//                     </td>

//                     <br />

//                     {disPrice !== "null" ? (
//                       <td>
//                         <td>
//                           <Stack direction="row" spacing={1}>
//                             <Chip
//                               label={`${Math.ceil(
//                                 ((gross - disPrice) / gross) * 100
//                               )}% discount applied`}
//                               deleteIcon={<DoneIcon />}
//                             />
//                           </Stack>
//                         </td>

//                         <td colSpan="4" align="right">
//                           <br />
//                           <h6>You have to pay this Discounted Price only</h6>
//                           &nbsp;&nbsp;&nbsp;&nbsp;{disPrice}
//                         </td>
//                       </td>
//                     ) : (
//                       ""
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         </Form>
//       </Container>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import Axios from "axios";
import Header1 from "../Layout/Header1.js";
// import Footer from "../Layout/Footer.js";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PrintIcon from "@mui/icons-material/Print";
import DoneIcon from "@mui/icons-material/Done";
import ReactToPrint from "react-to-print";

import { Link } from "react-router-dom";

export default function Bill() {
  const [mylist, setList] = useState([]);
  const [gross, setGross] = useState("");
  const [billno, setBillno] = useState("");
  const items = JSON.parse(localStorage.getItem("items"));
  const cname = localStorage.getItem("cname");
  const cust = localStorage.getItem("customername");
  let disPrice = localStorage.getItem("discountPrice");
  let componentRef = useRef();

  console.log(disPrice, "discountprice");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function mysubmit() {
    const result = await Axios.post("http://localhost:4700/bill");
    setList(result.data);
    console.log(result.data);
    console.log(billno);
    console.log(items);
    setBillno(result.data[0].billno);

    let g = 0;
    if (result.data.length > 0)
      for (let i = 0; i < result.data.length; i++) {
        g += result.data[i].purchase_price * result.data[i].purchase_qty;
      }
    setGross(g);
  }

  return (
    <div>
      <Header1 />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ position: "relative", left: "50%" }}>
        <Link to="/">
          <Button>Go To Home</Button>
        </Link>
      </div>

      <ReactToPrint
        trigger={() => (
          <PrintIcon style={{ position: "relative", left: "80%" }} />
        )}
        content={() => componentRef}
      />

      <Container>
        <Form>
          <Button variant="primary" type="button" onClick={mysubmit}>
            Generate Bill
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <div>
            <Table ref={(el) => (componentRef = el)} striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="6">
                    <h1 align="center">INVOICE</h1>
                    <h3 align="center">GHAR KA KHAANA</h3>
                    <h3 align="center">Gurgaon, Sector 10</h3>
                    <h3 align="center">Phone: +91-9560576294</h3>
                    <hr></hr>
                    <h4>
                      Invoice No: {billno} <br />
                      Invoice Date: {new Date().toDateString()}
                    </h4>
                    Customer Name : {cname ? cname : cust}
                    <br />
                    Shipment Address : #121
                  </th>
                </tr>
              </thead>
              <br />
              <br />
              <tbody>
                <tr>
                  <th> Product Id</th>
                  <th>Product Name</th>
                  <th>Individual Price </th>
                  <th>Product Quantity</th> <th>Amount</th>
                </tr>

                {mylist.map((item, index) => {
                  console.log(item);
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.item_name}</td>
                      <td>{item.purchase_price}</td>
                      <td>{item.purchase_qty}</td>

                      <td>{item.purchase_price * item.purchase_qty}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan="4" align="right">
                    <h5>Gross Payable Amount Without Discount</h5>
                  </td>
                  <td colSpan="4">
                    <h5> {gross}</h5>
                  </td>
                </tr>

                {disPrice !== "null" ? (
                  <tr>
                    <td colSpan="1" align="right">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={`${Math.ceil(
                            ((gross - disPrice) / gross) * 100
                          )}% discount applied`}
                          deleteIcon={<DoneIcon />}
                        />
                      </Stack>
                    </td>

                    <td align="right" colSpan="3">
                      <h5>You have to pay this Discounted Price only</h5>
                    </td>
                    <td>
                      {" "}
                      <h5> &nbsp;&nbsp;&nbsp;&nbsp;{disPrice} </h5>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
          </div>
        </Form>
      </Container>
    </div>
  );
}
