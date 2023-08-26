import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "../RatingStyles";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../useContext/NoteContext";
import "./menu.css";
import "./slider.css";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import "./slider.css";
import "swiper/css";
import "swiper/css/virtual";
import { Keyboard, Navigation, Pagination, Virtual } from "swiper";

function ViewProvItem(props) {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [name, setName] = useState();
  const [mylist, setList] = useState([]);
  const [remCart, setRemCart] = useState(true);
  const [propName, setPropName] = useState("");

  const [rate, setRate] = useState(0);
  const [cmnt, setCmnt] = useState("");
  const [rs, setRs] = useState([]);
  const [rsLength, setRsLength] = useState("");
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const valueContext = useContext(NoteContext);

  const swiper = useSwiper();
  const cs = localStorage.getItem("customer");
  const csname = localStorage.getItem("customername");
  var userid = props.id;

  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  useEffect(() => {
    setName(localStorage.getItem("customername"));
    localStorage.setItem("provname", props.name);
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
        setPropName(props.name);
      });
      var lnch = `http://localhost:4700/viewlunch/${props.id}`;
      console.log(lnch, "propslunch");
      Axios.get(lnch).then((res) => {
        setLunch(res.data);
        setPropName(props.name);
      });
      var dinr = `http://localhost:4700/viewdinner/${props.id}`;
      Axios.get(dinr).then((res) => {
        console.log(res.data, "propsdinner");
        setDinner(res.data);
        setPropName(props.name);
      });

      // var provdata = `http://localhost:4700/provider_rating/${props.id}`
      // Axios.get(provdata)
      //   .then((res) => {
      //     console.log(res.data, 'prov rating data');
      //     if (res.data.length > 0) {
      //       setShow(false);
      //     }
      //   });

      let ratedata = { provid: userid, cusid: csname };
      console.log(ratedata, "getselratedata");
      Axios.post(`http://localhost:4700/selected_rating`, ratedata).then(
        (res) => {
          console.log(res.data.length, "selected rating data");
          if (res.data.length > 0) {
            setShow(false);
          }
        }
      );

      // Axios.get(`http://localhost:4700/customer_rating/${csname}`).then(
      //   res => {
      //     if (res.data.length > 0) {
      //       setShow(false);
      //     }
      //   }
      // );

      console.log(show, "currentshow data");
    }
  }, [props.id]);

  useEffect(() => {
    Axios.get("http://localhost:4700/showrating").then((res) => {
      setRs(res.data);
      setRsLength(res.data.length);
      console.log(rsLength, "reslength");
      console.log(res.data[0].pack_id, "prov ratings");
    });
    console.log(rs, mylist);
  }, [props.id, setRs]);

  const addCart = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const provName = propName;

    console.log(provName, "providername");
    console.log(id);
    setRemCart(false);
    console.log(remCart, "remcartvalue");
    localStorage.setItem("addcartValue", remCart);

    let x = await Axios.post(`http://localhost:4700/addcart/${id}`, {
      provName,
    });
    if (x.data !== "") valueContext.setCount(valueContext.count + 1);
  };

  const addReview = async (e) => {
    const id = e.target.value;
    console.log(id, "id fetched");

    let data = {
      comments: cmnt,
      rating: rate,
      pack_id: id,
      provider: props.name,
      user: csname,
    };
    console.log(userid.length, "comp data");
    console.log(cs, "csdata");
    const ratedata = { provid: id, cusid: csname };

    console.log(ratedata, "ratedata");

    let selected_rating = await Axios.post(
      `http://localhost:4700/selected_rating`,
      ratedata
    );

    console.log(selected_rating.data, "selectedrating");

    if (cs) {
      if (selected_rating.data.length <= 0) {
        Axios.post(`http://localhost:4700/addrating`, data).then((res) => {
          setRate(0);
          setRs(res.data);
          setShow(false);
        });
      } else {
        alert("rating already given");
        window.location.reload();
        return false;
      }
      // window.location.reload();
      // return false;
    } else {
      navigate("/login");
      alert("customer login is required");
    }
  };

  const cmntChange = (e) => {
    e.preventDefault();
    setCmnt(e.target.value);
  };

  return (
    <>
      <>
        {props.id !== "" ? (
          <div className="card-group">
            <div className="card">
              <table stripped="col justify-items ">
                <tbody>
                  <div class=" h-100 w-40 ms-4">
                    <div className=" menu-item ">
                      <span className="subheading">Breakfast</span>
                      <br />
                      <br />
                      {breakfast.map((item, index) => {
                        return (
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
                            <li className="ingredients">{item.item_details}</li>
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
                        );
                      })}
                      <br />
                    </div>
                  </div>
                </tbody>
              </table>
            </div>

            <div className="card">
              <table stripped="col justify-items">
                <tbody>
                  <div class=" h-100">
                    <div className=" menu-item ">
                      <span className="subheading">Lunch</span>
                      <br />
                      <br />
                      {lunch.map((item, index) => {
                        return (
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
                            <li className="ingredients">{item.item_details}</li>
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
                        );
                      })}
                      <br />
                    </div>
                  </div>
                </tbody>
              </table>
            </div>

            <div className="card">
              <table stripped="col justify-items">
                <tbody>
                  <div class=" h-100">
                    <div className=" menu-item ">
                      <span className="subheading center">Dinner</span>
                      <br />
                      <br />
                      {dinner.map((item, index) => {
                        return (
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
                            <li className="ingredients">{item.item_details}</li>
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

      <div className="">
        {show ? (
          <>
            <div>
              <br />
              <br />
              {!props.open ? (
                <div className=" review">
                  <h4 className="label">
                    Have Your Ratings Here: &nbsp;&nbsp;
                  </h4>
                  <Container>
                    {[...Array(5)].map((item, index) => {
                      const rateit = index + 1;
                      return (
                        <label>
                          <Radio
                            type="radio"
                            value={rateit}
                            onClick={(e) => {
                              setRate(rateit);
                              alert(
                                `Are you sure you want to give ${rateit} stars ?`
                              );
                            }}
                          />
                          <Rating id="reset">
                            <FaStar
                              color={
                                rateit < rate || rateit === rate
                                  ? "fbe016"
                                  : "rgb(192,192,192)"
                              }
                            />
                          </Rating>
                        </label>
                      );
                    })}
                  </Container>
                  <br />

                  <h4 className="label">Your Feedback is Important for Us:</h4>
                  <div class="form-group" id="reset">
                    <textarea
                      class="form-control"
                      name="message"
                      rows="5"
                      onChange={cmntChange}
                      value={cmnt}
                      placeholder="coment here..."
                      required
                    ></textarea>
                  </div>
                  <br />

                  <Button
                    variant="primary"
                    type="button"
                    value={userid}
                    onClick={addReview}
                  >
                    Add Review
                  </Button>
                  <br />
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <div>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Navigation]}
              className="mySwiper"
            >
              <div className="slid">
                {rs.map((sitem, index) => {
                  return (
                    <>
                      <SwiperSlide>
                        <div className="subslid">
                          <p className="label">Customer Name</p>
                          <span>{sitem.user}</span>
                          <p className="label">Provider</p>
                          <h6></h6>
                          <span>{sitem.pack_id}</span>
                          <br />
                          <span>{sitem.provider}</span>
                          <br />
                          <div>
                            <span>{sitem.rating}</span>
                            {[...Array(5)].map((item, findex) => {
                              const rating = sitem.rating - findex;
                              return (
                                <label>
                                  <Rating>
                                    <FaStar
                                      color={
                                        rating > 0
                                          ? "fbe016"
                                          : "rgb(192,192,192)"
                                      }
                                    />
                                  </Rating>
                                </label>
                              );
                            })}
                            <p>{sitem.comments}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
              </div>
            </Swiper>

            <br />
            <br />
            <h3>Reviews Given By Customers For Different Providers:</h3>
            <br />
            <div className="gridcards">
              {rs.map((sitem) => {
                return (
                  <>
                    <div className="gridcard">
                      <p className="label">Customer Name</p>
                      <span>{sitem.user}</span>
                      &nbsp;&nbsp;
                      <p className="label">Provider</p>
                      <h6></h6>
                      <span>{sitem.pack_id}</span>
                      <br />
                      <span>{sitem.provider}</span>
                      <br />
                      <div>
                        <span>{sitem.rating}</span>
                        {[...Array(5)].map((item, findex) => {
                          const rating = sitem.rating - findex;
                          return (
                            <label>
                              <Rating>
                                <FaStar
                                  color={
                                    rating > 0 ? "fbe016" : "rgb(192,192,192)"
                                  }
                                />
                              </Rating>
                            </label>
                          );
                        })}
                        <p>{sitem.comments}</p>
                      </div>
                    </div>
                    <br />
                    <br />
                    &nbsp;&nbsp;&nbsp;
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ViewProvItem;
