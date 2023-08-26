import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import NoteContext from "../../useContext/NoteContext";

function ProvOrders() {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const valueContext = useContext(NoteContext);
  const provemail = valueContext.userid;
  const provname = valueContext.name;
  var nm = localStorage.getItem("userid");

  useEffect(() => {
    console.log(provemail, "providercontext");
    console.log(nm, "provid");
    Axios.post(`http://localhost:4700/provOrders/${nm}`).then((res) => {
      setProduct(res.data);
      setName(res.data[0].cname);
      console.log(res.data[0].cname, "customerproduct");
    });
  }, [provemail]);

  return (
    <div>
      <br />
      <br />
      <br />
      <>
        {product.length >= 0 ? (
          <div>
            {/* <h3>{name} Orders </h3> */}
            <br />
            <Table striped bordered hover>
              <thead>
                <th>Product Name</th>
                <th>Product Details</th>
                <th>Product Category</th>
                <th>Product Qty</th>
                <th>Product Price</th>
                <th>Provider</th>
                <th>Product Image</th>
              </thead>
              <tbody>
                {product.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.product_details}</td>
                        <td>{item.product_category}</td>
                        <td>{item.product_qty}</td>
                        <td>{item.product_price}</td>
                        <td>{item.provname}</td>

                        <td>
                          <img
                            src={`http://localhost:3000/${item.product_image}`}
                            alt="product_image"
                            style={{ width: 100, height: 100 }}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <h2>No Orders Are Present For This Provider</h2>
        )}
      </>
    </div>
  );
}

export default ProvOrders;
