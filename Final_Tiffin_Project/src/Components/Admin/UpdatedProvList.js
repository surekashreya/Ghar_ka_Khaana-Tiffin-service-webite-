import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import NoteContext from '../../useContext/NoteContext';
import ViewItem from './Viewitem';
import './menu.css'
import { createNotification } from '../notification';
import { ToastContainer } from 'react-toastify';
import ProviderOrders from './ProviderOrders';


function UpdatedProvList(props) {
    const [provider, setProvider] = useState([]);
    const [name, setName] = useState('');
    const [show, setShow] = useState(true);
    const [visible,setVisible]= useState(false);
    const [found,setFound]= useState(false);
    const [look,setLook]= useState(true)
    const [proId, setProId] = useState('');
    const [orderId,setOrderId]= useState('');
    const [orderName,setOrderName]= useState('');
    const [compId, setCompId] = useState('');
    const [avgRate, setAvgRate] = useState([]);
    const [newRate, setNewRate] = useState();
    const [rateId, setRateId] = useState([]);
    const [noFound,setNoFound]= useState('');

    const [id, setId] = useState("");
    const navigate = useNavigate();

    const menuContext = useContext(NoteContext)
    // menuContext.setPop(show)
    // menuContext.setId(proId)

    useEffect(()=>{
        if(visible)
        {
        
            setShow(false)
        }
       else if(!visible)
        {
            setShow(true)
        }
    },[visible])

    function handleid(e) {
        e.preventDefault();
        setId(e.target.value);
    }

    function handleProps(e) {
        e.preventDefault();
        setProId(e.target.id)
        setLook(false)
        setVisible(false)
        menuContext.setName(e.target.value)
        setName(e.target.value);
    }

    function handleOrders(e) {
        e.preventDefault();
        setOrderId(e.target.id)
        setVisible(true)
        menuContext.setName(e.target.value)
        setOrderName(e.target.value);
    }

    function handleContext(e) {
        e.preventDefault();
        menuContext.setPop(true)
        menuContext.setName(e.target.value)
        menuContext.setId(e.target.id);
        navigate('/menuitem')
    }

    useEffect(() => {

        if (props.find !== null) {
            console.log(props.find);
            var url = `http://localhost:4700/searchprovider/${props.find}`
            console.log(url, 'url fetched')
            Axios.post(url)
                .then(res => {
                    console.log(res.data.length,'searchres')
                    if(res.data.length ===0){
                        setFound(true)
                        console.log('no data collected')
                        setNoFound('Data Not Found. Please enter the correct data')
                      }

                    setProvider(res.data)
                    setCompId(res.data[0].email)
                    console.log(res.data[0].id, 'respose userid search')

                    console.log(res.data[0].username, 'respose usernamesearch')
                    setNoFound('')
                
                })

        }
        
    }, [props.find]
    );

    useEffect(() => {
        let provdata = `http://localhost:4700/avg_rating/${proId}`

        Axios.post(provdata)
            .then((res) => {
                console.log(res.data, 'avg resdata')
                setAvgRate(res.data[0].x)
                setRateId(res.data[0].pack_id)
                console.log({ rateId }, 'rateid')
                console.log(compId, 'getcompid')
                if (compId === rateId) {
                    setNewRate(avgRate)
                }
                console.log(newRate, 'avgrate fetched')
            });

        let saveavg = `http://localhost:4700/add_provrating/${rateId}`
        const data = { 'avgrating': avgRate };
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        Axios.post(saveavg, data, config)
            .then((res) => {
                if (res) {
                    createNotification("success",'avg reviews updated')
                    // window.location.reload()
                    // return false;
                }
            })

    }, [proId])

    return (
        <>
        <ToastContainer/>
            {<div id="#chefs">
               
                {/* <!-- ======= Chefs Section ======= --> */}
                <section className="chefs ">
                <div className='nofound'>
                {noFound}
                </div>
                

                    <div className="card-group">

                        {provider.map((item, index) => {

                            return (
                                <div className="col ms-4" key={index}>
                                        <div className=" gy-4">
                                            <div className="chef-member img-design">
                                                <ul className="row-lg-4">
                                                    <ul className="member-img">
                                                        <img src={item.profile_img} className="img-fluid" alt="" />
                                                        <ul className="social">
                                                            <a href=""><i className="bi bi-twitter"></i></a>
                                                            <a href=""><i className="bi bi-facebook"></i></a>
                                                            <a href=""><i className="bi bi-instagram"></i></a>
                                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                                        </ul>
                                                    </ul>
                   
                                                    <li><span className="subheading">Provider</span></li>
                                                    {/* <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li> */}
                                                    <span>{item.username}</span>
                                                    <br/>
                                                    <br/>
                                                    <span className='provlabel'>Avg Rating</span>
                                                    <br/>
                                                    <span>{item.avgrating}</span>
                                                    {/* <br/> */}
                                                    <ReactStars
                                                        className='center'
                                                        count={item.avgrating}
                                                        edit={false}
                                                        value={item.avgrating}
                                                        size={24}
                                                    />
                                                    
                                                    <li className='ingredients'>{item.mobileno}</li>
                                                    <li className='ingredients'>{item.email}</li>
                                                    <li className='ingredients'>{item.city}</li>

                                                    <br />
                                                    <div>
                                                    <li>
                                                            <Button variant="primary" value={item.username} id={item.email} onClick={handleProps}>My Items</Button>
                                                    </li>
                                                    &nbsp;&nbsp;
                                                    <li>
                                                            <Button variant="primary" value={item.username} id={item.email} onClick={handleOrders}>My Orders</Button>
                                                        
                                                    </li>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>


                                </div>


                            );

                        })}
                        &ensp;&ensp;&ensp;&ensp;
                    </div>

                </section>
                <div className="member-info">
                {
                    show?

                    <div>
                        <ViewItem
                        name={name}
                        id={proId}
                        open={look}
                    />
                    </div>
                    :
                    <>
                    {
                     <div>
                        <ProviderOrders
                        name={orderName}
                        id={orderId}
                    />
                    </div>
                    
                    }
                    </>
                }
                </div>
            </div>
            }
        </>
    );
}

export default UpdatedProvList;

