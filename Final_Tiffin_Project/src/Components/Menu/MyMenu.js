import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import Axios from 'axios';
import NoteContext from '../../NoteContext';

function MyMenu(props) {
    const [menu, setMenu] = useState([]);
    const valueContext = useContext(NoteContext);

    useEffect(() => {
        var url = `http://localhost:4700/category/${props.data}`
        console.log(url)
        Axios.get(url)
            .then(
                res => { setMenu(res.data); })
    }, [props.data]
    );

    const addCart = async (e) => {
        e.preventDefault();
        const id = e.target.id;

        console.log(id);
        let x = await Axios.get(`http://localhost:4700/addcart/${id}`)
        if (x.data !== '')
            valueContext.setCount(valueContext.count + 1);

    }

    return (
        <div>
            <div className="row gy-5" >

                <div className="row gy-5 menu-item ">

                    {menu.map((item, index) => {
                        return (
                                <ul key={index} className="col-lg-4 menu-item img-design" >
                                    <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                                    <span>{item.item_name}</span>
                                    <li className='ingredients'>{item.item_details}</li>
                                    <li className='ingredients'>{item.item_category}</li>
                                    <li className='price'>${item.item_price}</li>
                                    <br />
                                    <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                                </ul>
                                
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

export default MyMenu;
