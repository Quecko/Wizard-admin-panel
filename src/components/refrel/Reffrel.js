import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reffrel.scss';

const Reffrel = () => {
    // const classes=useStyle();
    // const [emailError, setEmailError] = useState({});
    // const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const [passwordError, setPasswordError] = useState({});
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const { email, password } = inputs;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    // const formValidation = () => {
    //     const emailError = {};
    //     const passwordError = {};

    //     let isValid = true;


    //     if (email === '') {
    //         emailError.emailError = "Email is Required";
    //         isValid = false;
    //     }
    //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    //         emailError.emailNameError = "Invalid Email";
    //         isValid = false;
    //     }
    //     if (password === '') {
    //         passwordError.logoError = "Password is Required";
    //         isValid = false;
    //     }

    //     // if(messageInputData.)
    //     setEmailError(emailError)
    //     setPasswordError(passwordError)
    //     return isValid;
    // }

    // console.log(open)
    const images = importAll(require.context('assets/img/', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            {/* <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop> */}
            <section className="main-reffrel">
                <div className="container">
                    <div className="row ptb">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="inner-logo text-center">
                                <img src={`${images['logo.svg']['default']}`} alt="" className="img-fluid" />
                            </div>
                            <div className="cmn-tile-style">
                                <h6>You have been invited to download the Legion Network Super App. You can register to the app here or download the app through Playstore or Appstore.</h6>
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Enter Refferal Code</label>
                                        <input type="name" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} placeholder="Enter Refferal Code" />
                                        {/* {Object.keys(emailError).map((key) => {
                                            return <p className="inputErrors">{emailError[key]}</p>
                                        })} */}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Name</label>
                                        <input type="name" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} placeholder="Enter Your Email" />
                                        {/* {Object.keys(emailError).map((key) => {
                                            return <p className="inputErrors">{emailError[key]}</p>
                                        })} */}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Enter Password" />
                                        {/* {Object.keys(passwordError).map((key) => {
                                            return <p className="inputErrors">{passwordError[key]}</p>
                                        })} */}
                                    </div>

                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Enter confirm Password" />
                                        {/* {Object.keys(passwordError).map((key) => {
                                            return <p className="inputErrors">{passwordError[key]}</p>
                                        })} */}
                                    </div>
                                    
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ backgroundColor: "blue" }}/>
                                        <label className="form-check-label" for="exampleCheck1">By creating an account, you agree to our Terms & Conditions</label>
                                    </div>
                                    <Link to="admin/dashboard">
                                        <button type="submit" className="btn-common"  >Register</button>
                                        <ToastContainer style={{ fontSize: 20 }} />
                                    </Link>
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn shadow-none">
                                                    <img src={`${images['googleplay-button.png']['default']}`} alt="" className="img-fluid" />
                                                </button>
                                                <button className="btn shadow-none">
                                                    <img src={`${images['appstore-button.png']['default']}`} alt="" className="img-fluid" />
                                                </button>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center ptb20">Already have an account ? <Link className=""> Login</Link></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reffrel;
