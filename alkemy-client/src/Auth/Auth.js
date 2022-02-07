import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Parallax, Background } from 'react-parallax';
import Image from '../Assets/Images/background.jpg';
import { Fade } from 'react-reveal';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { onAuth , onSignUp, onSignIn} from '../store/payloads/actions';
import {userSignUp, signInUser ,singWithGoogle } from '../api/auth';

import("./Auth.scss");


const formStateData = {
    
    username: "",
    firstname: "",
    lastname: "",
    email:"",
    password:"",
    confirmPassword:"",
};

const googleID= "701837201168-ja3csd91ipqfietfuvi09pc3cmtnqijr.apps.googleusercontent.com";


function Auth() {
    const stateUser = useSelector(state => state.authData);
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)
    const [users, setUsers] = useState(stateUser)
    const [formData, setFormData] = useState(formStateData)
    const dispatch = useDispatch()

    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        setFormData({...formData, [event.target.name] : event.target.value})

    }
    const  handleSubmit = async (event)=> {
        event.preventDefault();
        
        if(!isSignUp) {
            const results = await userSignUp(formData)
            const {data} = results;
            const{result, token} = data;
            console.log(result)
            console.log(token)
            dispatch(onAuth(result, token))
            navigate('/dashboard', { replace: true })
         } else {
            const results = await signInUser(formData)
            const {data} = results; 
            const{result, token} = data;
            dispatch(onAuth(result, token))
            navigate('/dashboard', { replace: true })

        }

    }

    const handleIsSignUp = () => {
        setIsSignUp(prevSetIsSignUp => !prevSetIsSignUp)
    }


    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In Failed")

    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        dispatch(onAuth(result, token))
        await singWithGoogle(result);
        navigate('/dashboard', { replace: true })
    }

    useEffect(() => {
        setUsers(stateUser)
    },[]) 

  

    return (

        <div className='body '>
            <Parallax
                bgImage={Image}
                strength={-400}
                bgImageStyle={{ opacity: '.4 ' }}
                >
                <div className='row'>
                    <Fade left delay={2000}>
                        <div className='col-7'>
                            <div className="brandMessage">
                                <h1>Make your money smart.</h1>
                                <h3> We got  the perfect mix of tools to help grow your savings. </h3>
                                <p>Alkemon is the new way for organizing and controlling cashflow. Analize all your expenses and incomes, set your savings goal, and control your money. </p>
                            </div>
                        </div>
                    </Fade>
                    <Fade left delay={1000}>
                        <div className='col-5 formcontainer'>
                            <div className="signup-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-primary login-btn text-center" onClick={handleIsSignUp}>{isSignUp ? "Don't have an account? Sign Up!"  :  'Already have an account? Sign In!'}</button>
                                    </div>

                                    {!isSignUp && (
                                        <>
                                            <div className="or-seperator"><b>or</b></div>
                                            <h2>Create an Account</h2>
                                            <p className="hint-text">Sign up with your social media account or email address</p>
                                        </>
                                    )}
                                    {isSignUp && (
                                        <div className="or-seperator"></div>
                                    )}

                                    <div className="social-btn text-center">
                                        <GoogleLogin
                                            clientId={googleID}
                                            render={(renderProps) => (
                                                <button
                                                    className="btn btn-danger btn-lg"
                                                    onClick={renderProps.onClick}
                                                    disabled={renderProps.disable}
                                                    starticon={<FontAwesomeIcon className="googleIcon" size="lg" icon={faGoogle} />}
                                                >
                                                    {isSignUp ?"Sign in with Google"  : 'Sign up with Google' }
                                                </button>

                                            )}
                                            onSuccess={googleSuccess}
                                            onFailure={googleFailure}

                                        />


                                    </div>
                                    <div className="or-seperator"><b>or</b></div>

                                    {isSignUp && (
                                        <h2 >Sign in with E-mail</h2>
                                    )}
                                 
                                    {!isSignUp && (
                                        <>
                                            <div className="form-group ">
                                                <input 
                                                    type="text" 
                                                    className="form-control input-lg" 
                                                    name="username" 
                                                    placeholder="Username" 
                                                    required="required" 
                                                    onChange={handleFormChanges}   
                                                />
                                            </div>
                                            <div className="form-group ">
                                            <div className="row">
                                                <div className="col">
                                                    <input 
                                                    type="text" 
                                                    className="form-control input-lg" 
                                                    name="firstname" 
                                                    placeholder="First name" 
                                                    required="required" 
                                                    onChange={handleFormChanges}   
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control input-lg"  name="lastname" placeholder="Last name" required="required" 
                                                    onChange={handleFormChanges} 
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="form-group">
                                        <input type="email" className="form-control input-lg" name="email" placeholder="Email Address" required="required"  onChange={handleFormChanges}  />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control input-lg" name="password" placeholder="Password" required="required"  onChange={handleFormChanges}  />
                                    </div>
                                   
                                    {!isSignUp && (<div className="form-group">
                                        <input type="password" className="form-control input-lg" name="confirmPassword" placeholder="Confirm Password" required="required"  onChange={handleFormChanges}  />
                                    </div>
                                     )}
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-lg btn-block signup-btn">{isSignUp ? 'Sign In' : "Sign Up"}</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </Fade>
                </div>
            </Parallax>
        </div>
    );
}



export default Auth;




