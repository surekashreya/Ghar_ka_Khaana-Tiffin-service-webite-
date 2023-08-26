import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Header1() {
    const [name,setName]= useState('')

    useEffect(()=>{
        let consumer = localStorage.getItem("customername");
        let csname = localStorage.getItem("cname");
        
        if(consumer)
        {
            setName(consumer)
        }
        else if(!consumer)
        {
            setName(csname)
        }
    },[])

    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link to='/' className="logo d-flex align-items-center me-auto me-lg-0">
                        {/* Uncomment the line below if you also wish to use an image logo */}
                        {/* <img src="assets/img/logo.png" alt=""> */}
                        <h1>GharKa <span>Khaana</span></h1>
                    </Link>
                    <span>{name}</span>
                    <nav id="navbar" className="navbar">

                    </nav>{/* .navbar */}

                    <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
                    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
                </div>
            </header>
            {/* End Header */}

        </div>
    );
}

export default Header1;
