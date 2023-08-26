import React from 'react'
import { Button } from 'react-bootstrap';
import NoteContext from "../../useContext/NoteContext.js";
import { useState, useEffect, useContext } from "react";
import  Axios  from 'axios';

function ViewMenu() {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);

    const menuContext = useContext(NoteContext);

    const contextId= menuContext.id
    const contextPop= menuContext.pop
    const contextName= menuContext.name

  useEffect(() => {
    console.log(contextName, 'context name')

    if (contextId === '') {
      return
    }
    else if (contextId != null) {
      console.log(contextId, 'context id')
      console.log(contextName, 'context name')

      var url = `http://localhost:4700/viewbreak/${contextId}`;
      console.log(url);
      Axios.get(url).then((res) => {
        setBreakfast(res.data);

      });
      var lnch = `http://localhost:4700/viewlunch/${contextId}`;
      console.log(lnch, 'propslunch');
      Axios.get(lnch)
        .then((res) => {
          setLunch(res.data);

        });
      var dinr = `http://localhost:4700/viewdinner/${contextId}`
      Axios.get(dinr)
        .then((res) => {
          console.log(res.data, 'propsdinner');
          setDinner(res.data);

        });

    }
  }, [contextId]);

  const addCart = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const config = {
      headers: {
          "content-type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),

      },
  };
    console.log(id);
    let x = await Axios.get(`http://localhost:4700/addcart/${id}`,config)
    if (x.data !== '')
      menuContext.setCount(menuContext.count + 1);

  }

  return (
    <div>
             <>
        {contextName ?
          <div className="card-group ">
            <div className="card">
              <table stripped='col justify-items '>

                <tbody>
                  <div class="card h-100 w-40 ms-4">

                    <div className=" menu-item ">

                      {breakfast.map((item, index) => {
                        return (
                          <ul key={index} className="row-lg-4 menu-item img-design ">
                            <li><span className="subheading">Breakfast</span></li>
                            <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                            <span>{item.item_name}</span>
                            <li>{item.id}</li>
                            <li className='ingredients'>{item.item_details}</li>
                            <li className='ingredients'>{item.item_category}</li>
                            <li className='price'>₹{item.item_price}</li>
                            <br />
                            <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                            <br />
                          </ul>
                        );
                      })}
                      <br />

                    </div>
                  </div>
                </tbody>
              </table>

            </div><div className="card">
              <table stripped='col justify-items'>

                <tbody>
                  <div class="card h-100">

                    <div className=" menu-item ">

                      {lunch.map((item, index) => {
                        return (
                          <ul key={index} className="row-lg-4 menu-item img-design ">
                            <li><span className="subheading">Lunch</span></li>
                            <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                            <span>{item.item_name}</span>
                            <li>{item.id}</li>
                            <li className='ingredients'>{item.item_details}</li>
                            <li className='ingredients'>{item.item_category}</li>
                            <li className='price'>${item.item_price}</li>
                            <br />
                            <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                            <br />
                          </ul>

                        );
                      })}
                      <br />

                    </div>
                  </div>
                </tbody>
              </table>
            </div><div className="card">

              <table stripped='col justify-items'>

                <tbody>
                  <div class="card h-100">

                    <div className=" menu-item ">

                      {dinner.map((item, index) => {
                        return (
                          <ul key={index} className="row-lg-4 menu-item img-design ">
                            <li><span className="subheading">Dinner</span></li>
                            <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                            <span>{item.item_name}</span>
                            <li>{item.id}</li>
                            <li className='ingredients'>{item.item_details}</li>
                            <li className='ingredients'>{item.item_category}</li>
                            <li className='price'>${item.item_price}</li>
                            <br />
                            <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                          </ul>

                        );
                      })}
                      <br />


                    </div>
                  </div>
                </tbody>
              </table>
            </div>
          </div>

          :
          ""

        }
      </>

    </div>
  )
}

export default ViewMenu
