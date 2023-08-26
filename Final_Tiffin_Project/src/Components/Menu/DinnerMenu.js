import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function DinnerMenu() {
    const [dinner, setDinner] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4700/showdinner").then(
            res => setDinner(res.data));
        console.log(dinner)
    }, []);


    const addCart = (e) => {
        e.preventDefault();
        const id = e.target.id;
        console.log(id);
        Axios.get(`http://localhost:4700/addcart/${id}`)
    }

    return (
        <div>
            <div className="row gy-5 img-design" >

                <div className="row gy-5 menu-item ">

                    {dinner.map((item, index) => {
                        return (
                            <ul key={index} className="col-lg-4 menu-item img-design" >
                                <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                                <span>{item.item_name}</span>
                                <li className='ingredients'>{item.item_details}</li>
                                <li className='ingredients'>{item.item_category}</li>
                                <li className='price'>${item.item_price}</li>
                                <br />
                            </ul>

                        )
                    })}
                    <div className='btn'>
                        {/* <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li> */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DinnerMenu;

