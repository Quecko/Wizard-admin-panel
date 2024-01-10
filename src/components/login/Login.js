import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Backdrop } from '@material-ui/core';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Environment from 'utils/Environment';
import './login.scss';
import swal from 'sweetalert';
import { CircularProgress } from '@material-ui/core';
import Form from 'react-bootstrap/Form';

const Login = () => {
    // const classes=useStyle();
    const [emailError, setEmailError] = useState({});
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const [passwordError, setPasswordError] = useState({});

    const [loginres, setLoginnRes] = useState({
        dataURL: '',
        secretKey: '',
    })
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

    // const [verifycode, setVerifycode] = useState('')

    // const handleChange1 = (e) => {
    //     setVerifycode(e.target.value)

    // }
    // const [verifycodeError, setverifycodeError] = useState({});

    // const formValidation1 = () => {
    //     const verifycodeError = {};
    //     let isValid = true;
    //     if (verifycode === '') {
    //         verifycodeError.error = "Please Enter Your Verify Code";
    //         isValid = false;
    //     }
    //     setverifycodeError(verifycodeError)
    //     return isValid;
    // }


    // const Signin1 = (e) => {
    //     e.preventDefault();
    //     formValidation1();
    //     if (verifycode != '') {
    //         setOpen(true)
    //         axios.post(Environment.backendUrl + "/user/loginadmin", { email, password, otpToken: verifycode, otpSecretKey: loginres.secretKey })
    //             .then((response) => {
    //                 // console.log("res",response)
    //                 const token = response.data.token
    //                 localStorage.setItem('mytoken', token)
    //                 window.$('#qrcode').modal('hide')
    //                 swal("Good to see you Again!", `Login-Successfull`, "success", { timer: 2000 })
    //                 history.push('admin/dashboard');
    //                 setOpen(false)

    //             }).catch((err) => {
    //                 setOpen(false)
    //                 swal("Invalid OPT Code!!!", "error", { timer: 2000 })
    //                 // toast.error(err.response?.data.msg, {
    //                 //     position: "top-center",
    //                 //     autoClose: 2000,
    //                 // });
    //             })
    //     } else {
    //         swal("Invalid Credentials!", `Try Again`, "error",)
    //     }
    // }

    // const Cancel = (e) => {
    //     e.preventDefault();
    //     window.$('#qrcode').modal('hide')
    //     setOpen(false)
    // }
    // const Cancel1 = (e) => {
    //     e.preventDefault();
    //     window.$('#onlyinput').modal('hide')
    //     setOpen(false)
    // }







    // const Signin2 = (e) => {
    //     e.preventDefault();
    //     formValidation1();
    //     if (verifycode != '') {
    //         setOpen(true)
    //         axios.post(Environment.backendUrl + "/user/loginadmin", { email, password, otpToken: verifycode })
    //             .then((response) => {
    //                 // console.log("res",response)
    //                 const token = response.data.token
    //                 localStorage.setItem('mytoken', token)
    //                 window.$('#onlyinput').modal('hide')
    //                 swal("Good to see you Again!", `Login-Successfull`, "success", { timer: 2000 })
    //                 history.push('admin/dashboard');
    //                 setOpen(false)

    //             }).catch((err) => {
    //                 setOpen(false)
    //                 swal("Invalid OPT Code!!!", { timer: 2000 })
    //                 // toast.error(err.response?.data.msg, {
    //                 //     position: "top-center",
    //                 //     autoClose: 2000,
    //                 // });
    //             })
    //     } else {
    //         swal("Invalid Credentials!", `Try Again`, "error", { timer: 2000 })
    //     }
    // }


    const images = importAll(require.context('assets/img/', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <section className="main-login">
                <div className="container">
                    <div className="mainouterdiv">
                        <div className="inner-logo text-center">
                            {/* <img src={`${images['logo.svg']['default']}`} alt="" className="img-fluid" /> */}
                            <img src='\login-assets\logonew.svg' alt="" className="img-fluid">

                            </img>
                        </div>
                        <div className="cmn-tile-style">
                            <div className='topinerdiv'>
                                <h2 className="">Sign In</h2>
                                <h6 className='loginpara'>Enter your credentials to access your account</h6>

                            </div>

                            {/* <form>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email</label>
                                            <input type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} placeholder="Enter Your Email" />
                                            {Object.keys(emailError).map((key) => {
                                                return <p className="inputErrors">{emailError[key]}</p>
                                            })}
                              
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Enter Password" />
                                            {Object.keys(passwordError).map((key) => {
                                                return <p className="inputErrors">{passwordError[key]}</p>
                                            })}
                                        </div>
                            
                                        <Link to="admin/dashboard">
                                            <button type="submit" className="btn-common" onClick={Signin} >Sign In</button>
                                            <ToastContainer style={{ fontSize: 20 }} />
                                        </Link>
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <Link className="blue" onClick={forgot} >Forgot Password?</Link>
                                            </div>
                                        </div>
                                    </form> */}
                            <form>
                                <div className='butmdivmain'>
                                    <div className="material-textfield">
                                        <input
                                            placeholder="Username"
                                            type="email" name="email" value={email} onChange={handleChange}
                                        />
                                        {Object.keys(emailError).map((key) => {
                                            return <p className="inputErrors">{emailError[key]}</p>
                                        })}
                                        <label>Username</label>
                                    </div>
                                    <div className="material-textfield ">
                                        <input
                                            type="password" name="password" value={password} onChange={handleChange}
                                            placeholder="Password"
                                        />
                                        {Object.keys(passwordError).map((key) => {
                                            return <p className="inputErrors">{passwordError[key]}</p>
                                        })}
                                        <label for="exampleInputPassword1">Password</label>
                                        <svg className="eyeimg" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M15.5819 12.3407C15.5819 14.3207 13.9819 15.9207 12.0019 15.9207C10.0219 15.9207 8.42188 14.3207 8.42188 12.3407C8.42188 10.3607 10.0219 8.76074 12.0019 8.76074C13.9819 8.76074 15.5819 10.3607 15.5819 12.3407Z" stroke="#BFC8D7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9998 20.6105C15.5298 20.6105 18.8198 18.5305 21.1098 14.9305C22.0098 13.5205 22.0098 11.1505 21.1098 9.74055C18.8198 6.14055 15.5298 4.06055 11.9998 4.06055C8.46984 4.06055 5.17984 6.14055 2.88984 9.74055C1.98984 11.1505 1.98984 13.5205 2.88984 14.9305C5.17984 18.5305 8.46984 20.6105 11.9998 20.6105Z" stroke="#BFC8D7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div class="formcheck_newwwwws">
                                        <label class="checkBox m-0">
                                            <input type="checkbox" id="ch1" />
                                            Remember me

                                        </label>
                                    </div>

                                    <div className='ftrbtndiv'>
                                        <Link to="admin/dashboard">
                                            <button type="submit" className="btn-common"  >Sign In</button>
                                            <ToastContainer style={{ fontSize: 20 }} />
                                        </Link>
                                        <Link >
                                            <p className="forgetpasssed  "  >Forgot Password?
                                            </p>
                                        </Link>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
            {/* <div className="main-modal-one">
                <div class="modal fade" id="qrcode" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog daily-profile-modal modal-dialog-centered">
                        <div class="modal-content daily-profile-modal-inner">
                            <div class="modal-body modal-body-main">
                                <div className="main-outter">
                                    <div className="row main-cardssss">
                                        <section className="main-login-auth ptb30">
                                            <div className="col-md-12 mx-auto">
                                                <div className="inner-logo text-center">
                                                    <img src={`${images['logo.svg']['default']}`} alt="" className="img-fluid" />
                                                </div>
                                                <div className="cmn-tile-style text-center">
                                                    <h3 className="ptb20">Two Factor-Authentication</h3>
                                                    <p>Scan Your QR Code:</p>
                                                    <div className='text-center'>
                                                        <img src={loginres.dataURL} alt="" className="img-fluid" />
                                                    </div>

                                                    <h3 className="ptb20">Enter the six-digit code from the application</h3>
                                                    <form>
                                                        <div className="form-group  mt-4">
                                                            <input type="number" name="verifycode" value={verifycode} onChange={handleChange1} className='form-control ' placeholder="xxx-xxxx" />
                                                            {Object.keys(verifycodeError).map((key) => {
                                                                return <p className="inputErrors text-left mt-2">{verifycodeError[key]}</p>
                                                            })}
                                                        </div>
                                                        <div className='text-right'>
                                                            <ul className='list-inline'>
                                                                <li className='list-inline-item'><button type="submit" className="btn-common" onClick={Cancel} >Cancel</button></li>
                                                                <li className='list-inline-item'><button type="submit" className="btn-common" onClick={Signin1} >Enable</button></li>
                                                            </ul>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="main-modal-one">
                <div class="modal fade" id="onlyinput" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog daily-profile-modal modal-dialog-centered">
                        <div class="modal-content daily-profile-modal-inner">
                            <div class="modal-body modal-body-main">
                                <div className="main-outter">
                                    <div className="row main-cardssss">
                                        <section className="main-login-auth ptb30">
                                            <div className="col-md-12 mx-auto">
                                                <div className="cmn-tile-style text-center">
                                                    <h3 className="ptb20">Enter the six-digit code from the application</h3>
                                                    <form>
                                                        <div className="form-group  mt-4">
                                                            <input type="number" name="verifycode" value={verifycode} onChange={handleChange1} className='form-control ' placeholder="xxx-xxxx" />
                                                            {Object.keys(verifycodeError).map((key) => {
                                                                return <p className="inputErrors text-left mt-2">{verifycodeError[key]}</p>
                                                            })}
                                                        </div>
                                                        <div className='text-right'>
                                                            <ul className='list-inline'>
                                                                <li className='list-inline-item'><button type="submit" className="btn-common" onClick={Cancel1} >Cancel</button></li>
                                                                <li className='list-inline-item'><button type="submit" className="btn-common" onClick={Signin2} >Submit</button></li>
                                                            </ul>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Login;
