import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Address() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4700/address").then(
            res => {
                setProducts(res.data);
            }, []);
    });

    return (
        <div>
            {products.map((item, index) => {

                return (

                    <ul className='cards2' key={index}>
                        <li className='subtitle'>{item.name}</li>
                        <li className='subtitle'>{item.phonenumber}</li>
                        <li className='subtitle'>{item.email}</li>
                        <li className='subtitle'>{item.city}</li>
                        <li className='subtitle'>{item.address}</li>
                        <li className='subtitle'>{item.state}</li>
                        <li className='subtitle'>{item.postalcode}</li>
                    </ul>

                );
            })}
        </div>
    );
}

export default Address;
