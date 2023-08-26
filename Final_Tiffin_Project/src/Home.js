import "./App.css";
import { NavLink as Link } from "react-router-dom";
import Slider from "./Components/Slider";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css"; // import Search from './Search';
import "swiper/css";
import "swiper/css/virtual";
import { Keyboard, Navigation, Pagination, Virtual } from "swiper";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import LocalDiningTwoToneIcon from '@mui/icons-material/LocalDiningTwoTone';
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone';


function Home() {
  const [product, setProducts] = useState([]);
  const [gross, setGross] = useState(0);
  const [user, setUser] = useState([]);
  const [userLength, setUserLength] = useState("");
  const [remCart, setRemCart] = useState(0);

  let delValue = sessionStorage.getItem("delValue");

  useEffect(() => {
    Axios.get("http://localhost:4700/recommended_items").then((res) => {
      setUser(res.data);
      setUserLength(res.data.length);
      console.log(res.data, "userlength");
      console.log(res.data[0].product_id, "prov ratings");
    });
  }, []);

  useEffect(() => {
    console.log("delvalue===" + delValue);
    if (delValue == null) {

      Axios.post("http://localhost:4700/delcart").then((res) => {
        console.log(res.data, "deletecart");
        // localStorage.clear();

        setProducts(res.data);
        setRemCart(1);
        sessionStorage.setItem("delValue", remCart);
        localStorage.setItem("items", JSON.stringify(res.data));
        let g = 0;

        if (res.data.length > 0)
          for (let i = 0; i < res.data.length; i++) {
            g += res.data[i].item_price * res.data[i].qty;
          }
        setGross(g);
        localStorage.setItem("gross", g);
        
      });
    }
  }, [delValue]);

  return (
    <>








      {/* <Login/> */}
      <div>
       



        <Slider />
        <div>
          <br />
          <h3>Recommended Products:</h3>
          <br />
          <Swiper
            slidesPerView={5}
            spaceBetween={5}
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
            <div className="slid" >
              {user.map((sitem, index) => {
                return (
                  <>
                    <SwiperSlide  >
                      <div className="subslid" style={{
                        border: "2px solid lightgrey",
                         fontWeight: "bold", 
                         backgroundColor:"#f9f9f9",
                          width:"600px", 
                          padding:20,
                          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.3)",
                          textAlign: "center",
                          borderRadius:"25px"

                          }}>
              
                        <span>
                          <img src={sitem.product_image} alt='new image' width="250px" height="150px">
                          </img>
                        </span>
                        <br/>
                        <h6 className="label">Provider Name</h6>
                        <span>{sitem.provname}</span>
                        <br/>

                        <h6 className="label">Product Name</h6>
                        <span>{sitem.product_name}</span>
                        <br/>
                        <h6 className="label">Product Description</h6>
                        <span>{sitem.product_details}</span>
                        <br />

                      <h6 className="label">Product Category</h6>
                        <span>{sitem.product_category}</span>
                        <br/>
                        {/* <h6 className="label">Product Price</h6>
                        <span>{sitem.product_price}</span>
                        <br/> */}
                       
                        
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </div>
          </Swiper>
          <br/>
        </div>

        {/* <!-- ======= Why Us Section ======= --> */}
        <section id="why-us" className="why-us section-bg">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="why-box">
                  <h3>Why Choose GharKaKhaana?</h3>
                  <p>
                  Connecting customers to home chefs mostly Housewives and 
                  encouraging them to use their culinary skills to make money, 
                  offering a convenient and flexible job opportunity and food to the
                   customers at min. price while promoting healthy lifestyle.  

                  </p>
                  <div className="text-center">
                    <Link to="/about" className="more-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <!-- End Why Box --> */}

              <div className="col-lg-8 d-flex align-items-center">
                <div className="row gy-4">
                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center"  >
                     <SettingsSuggestTwoToneIcon style={{ fontSize: 80, color: '#cc0000' }}></SettingsSuggestTwoToneIcon>
                     <br></br>
                      <h4>PERSONALIZED MEAL</h4>
                      <p>
                      Just like home kitchen where you can customize 
                      your meal as per our taste & preference.

                      </p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}

                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                     <LocalDiningTwoToneIcon style={{ fontSize: 80, color: '#cc0000' }}></LocalDiningTwoToneIcon>
                     <br></br>
                      <h4>NUTRITIOUS DIET</h4>
                      <p>
                      It aims to improve the health and well-being of customers by 
                      providing a variety of fresh, nutritious meals and dietary options

                      </p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}

                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <SentimentSatisfiedAltTwoToneIcon style={{ fontSize: 80, color: '#cc0000' }}></SentimentSatisfiedAltTwoToneIcon>
                      <br></br>
                      <br></br>

                      <h4>HAPPY HOURS</h4>
                      <p>
                      Happy hours will feature discounts on the meals
                       that will be accessible for a certain period.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Icon Box --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
