import React, { useEffect, useState } from 'react'
import  Axios  from 'axios';
import { Table } from 'react-bootstrap';

function ViewCustomer(props) {
    const [product,setProduct]= useState([]);

    
    useEffect(()=>{
        console.log(props.name,'customerprops')
        Axios.post(`http://localhost:4700/custProduct/${props.name}`)
        .then((res)=>{
            setProduct(res.data)
            console.log(product,'customerproduct')
        })
    },[props.name])

  return (
    <div>
        <Table striped bordered hover>
        <thead>
            <th>Product Name</th>
            <th>Product Details</th>
            <th>Product Category</th>
            <th>Product Qty</th>
            <th>Product Price</th>
            <th>Customer</th>
            <th>Provider</th>
            <th>Product Image</th>

        </thead>
        <tbody>
        {product.map((item,index)=>{
            return(
                <>
                    <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.product_details}</td>
                        <td>{item.product_category}</td>
                        <td>{item.product_qty}</td>
                        <td>{item.product_price}</td>
                        <td>{item.cname}</td>
                        <td>{item.provname}</td>
                        <td>{console.log(item.product_image,'image')}</td>
                        <td>
                            <img src={`http://localhost:3000/${item.product_image}`} alt='product_image' style={{ width: 200, height: 200 }}
                            />
                            
                        </td>

                    </tr>
                </>
            )
        })
        }
        </tbody>
        </Table>
    </div>
  )
}

export default ViewCustomer;
