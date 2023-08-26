import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../useContext/NoteContext";
import "./menu.css";

function ViewProItem(props) {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [name, setName] = useState();

  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const valueContext = useContext(NoteContext);

  const cs = localStorage.getItem("customer");
  const csname = localStorage.getItem("customername");
  var userid = props.id;

  useEffect(() => {
    setName(localStorage.getItem("customername"));
    console.log(csname, "username");
    console.log(userid, "userpropifhj");

    setShow(true);
    console.log(show, "prevshow data");

    if (props.id === "") {
      return;
    } else if (props.id != null) {
      console.log(props.id, "props break");
      console.log(props.open, "open model");

      var url = `http://localhost:4700/viewbreak/${props.id}`;
      console.log(url);
      Axios.get(url).then((res) => {
        setBreakfast(res.data);
      });
      var lnch = `http://localhost:4700/viewlunch/${props.id}`;
      console.log(lnch, "propslunch");
      Axios.get(lnch).then((res) => {
        setLunch(res.data);
      });
      var dinr = `http://localhost:4700/viewdinner/${props.id}`;
      Axios.get(dinr).then((res) => {
        console.log(res.data, "propsdinner");
        setDinner(res.data);
      });
    }
  }, [props.id]);

  const addCart = async (e) => {
    e.preventDefault();
    const id = e.target.id;

    console.log(id);
    let x = await Axios.get(`http://localhost:4700/addcart/${id}`);
    if (x.data !== "") valueContext.setCount(valueContext.count + 1);
  };

  return (
    <>
      <>
        {props.id !== "" ? (
          <div className="item-group">
            <div className="item">
              <table stripped="col justify-items ">
                <tbody>
                  <div class=" h-100 w-40 ms-4">
                    <div className=" menu-item ">
                      <span
                        className="subheading"
                        style={{ position: "relative", left: "18px" }}
                      >
                        Breakfast
                      </span>
                      <br />
                      <br />
                      {breakfast.map((item, index) => {
                        return (
                          <div>
                            <ul
                              key={index}
                              className="row-lg-4 menu-item img-design "
                            >
                              <li>
                                <img
                                  src={item.item_image}
                                  style={{ width: 200, height: 200 }}
                                  alt="breakfast"
                                />
                              </li>
                              <span>{item.item_name}</span>
                              <li className="ingredients">
                                {item.item_details}
                              </li>
                              <li className="ingredients">
                                {item.item_category}
                              </li>
                              <li className="price">₹{item.item_price}</li>
                              <br />
                              <li>
                                <Button
                                  onClick={addCart}
                                  id={item.id}
                                  value={item.id}
                                  size="Medium"
                                  className="btn-book-a-table"
                                >
                                  Add to Cart
                                </Button>
                              </li>

                              <br />
                            </ul>
                            <br />
                            <br />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      <br />
                    </div>
                  </div>
                </tbody>
              </table>
            </div>

            <div className="item">
              <table stripped="col justify-items">
                <tbody>
                  <div class=" h-100">
                    <div className=" menu-item ">
                      <span
                        className="subheading"
                        style={{ position: "relative", left: "18px" }}
                      >
                        Lunch
                      </span>
                      <br />
                      <br />
                      {lunch.map((item, index) => {
                        return (
                          <div>
                            <ul
                              key={index}
                              className="row-lg-4 menu-item img-design "
                            >
                              <li>
                                <img
                                  src={item.item_image}
                                  style={{ width: 200, height: 200 }}
                                  alt="breakfast"
                                />
                              </li>
                              <span>{item.item_name}</span>
                              <li className="ingredients">
                                {item.item_details}
                              </li>
                              <li className="ingredients">
                                {item.item_category}
                              </li>
                              <li className="price">₹{item.item_price}</li>
                              <br />
                              <li>
                                <Button
                                  onClick={addCart}
                                  id={item.id}
                                  value={item.id}
                                  size="Medium"
                                  className="btn-book-a-table"
                                >
                                  Add to Cart
                                </Button>
                              </li>

                              <br />
                            </ul>
                            <br />
                            <br />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      <br />
                    </div>
                  </div>
                </tbody>
              </table>
            </div>

            <div className="item">
              <table stripped="col justify-items">
                <tbody>
                  <div class=" h-100">
                    <div className=" menu-item ">
                      <span
                        className="subheading center"
                        style={{ position: "relative", left: "18px" }}
                      >
                        Dinner
                      </span>
                      <br />
                      <br />
                      {dinner.map((item, index) => {
                        return (
                          <div>
                            <ul
                              key={index}
                              className="row-lg-4 menu-item img-design "
                            >
                              <li>
                                <img
                                  src={item.item_image}
                                  style={{ width: 200, height: 200 }}
                                  alt="breakfast"
                                />
                              </li>
                              <span>{item.item_name}</span>
                              <li className="ingredients">
                                {item.item_details}
                              </li>
                              <li className="ingredients">
                                {item.item_category}
                              </li>
                              <li className="price">₹{item.item_price}</li>
                              <br />
                              <li>
                                <Button
                                  onClick={addCart}
                                  id={item.id}
                                  value={item.id}
                                  size="Medium"
                                  className="btn-book-a-table"
                                >
                                  Add to Cart
                                </Button>
                              </li>
                            </ul>
                            <br />
                            <br />
                            <br />
                            <br />
                          </div>
                        );
                      })}
                      <br />
                    </div>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    </>
  );
}
export default ViewProItem;
