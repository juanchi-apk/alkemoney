
import React from 'react';
import {Link, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import("./navbar.scss");


function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stateUser = useSelector(state => state.authData)

     
    const  logout = async () =>{
        dispatch({ type: 'LOGOUT' })
        navigate("/" , {replace: false})
    }

 

    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
             
                    <h3 className = "navbar-brand brandtitle">Alkemoney</h3>
         
                <div className="d-flex userBar" >
                    {stateUser? (
                    <>
                        {stateUser.result.ImageUrl && (

                            <>
                            <img className='userBar' src={stateUser.result.ImageUrl}  alt="user"></img>
                            </>
                        )}    
                        
                    
                    <h6 style={{color:"white", marginRight:"10px" }}>Bienvenido {stateUser.result.givenName||stateUser.result.first_name}!!!</h6>
                    <button  type="button" className="btn btn-success" onClick={logout}>Log Out</button>
                    </>
                    ):(<></>)}
                </div>
            </div>
        </nav>
    )
}


  export default Navbar

