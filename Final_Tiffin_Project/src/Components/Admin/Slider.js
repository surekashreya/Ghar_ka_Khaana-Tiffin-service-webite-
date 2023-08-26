import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Slider = async() =>{
    const [provider, setProvider] = useState([]);
    const [found, setFound] = useState(false);

    useEffect(() => {
          var url = `http://localhost:4700/providers`;
          console.log(url, "url fetched");
          Axios.get(url).then((res) => {

            setProvider(res.data);
            console.log(res.data[0].id, "respose userid search");
    
            console.log(res.data[0].username, "respose usernamesearch");
          });
    
      }, []);
    
    return(
        <section className="chefs ">

        <div className="card-group manage_card">
          {provider.map((item, index) => {
            return (
              <>
                <div className="col ms-4" key={index}>
                  <div className=" gy-4">
                    <div className="chef-member img-design">
                      <ul className="row-lg-4">
                        <ul className="member-img">
                          <img
                            src={item.profile_img}
                            className="img-fluid"
                            alt=""
                          />
                          <ul className="social">
                            <a href="">
                              <i className="bi bi-twitter"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-facebook"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-instagram"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          </ul>
                        </ul>

                        <li>
                          <span className="subheading">Provider</span>
                        </li>
                        {/* <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li> */}
                        <span>{item.username}</span>
                        <br />
                        <br />
                        <span className="provlabel">Avg Rating</span>
                        <br />
                        <span>{item.avgrating}</span>
                        {/* <br/> */}
                        <ReactStars
                          className="center"
                          count={item.avgrating}
                          edit={false}
                          value={item.avgrating}
                          size={24}
                        />

                        <li className="ingredients">{item.mobileno}</li>

                        <li className="ingredients">{item.email}</li>
                        <li className="ingredients">{item.city}</li>

                        <br />
                        <div>
                          <li>
                            <Button
                              variant="primary"
                              value={item.username}
                              id={item.email}
                              onClick={handleProps}
                            >
                              My Items
                            </Button>
                          </li>
                          &nbsp;&nbsp;
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          &ensp;&ensp;&ensp;&ensp;
        </div>
      </section>
    )
}

export default Slider;
