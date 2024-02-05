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
    const api_url = Environment.api_url;

    const history = useHistory();





    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailerrorregister, setEmailErrorRegister] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const userLogin = (e) => {
        e.preventDefault();
        if (email.length === 0) {
            setEmailErrorRegister("Email is Required");
        } else if (!isValidEmail(email)) {
            setEmailErrorRegister("Email is invalid");
        }
        if (password.length === 0) {
            setErrorPassword("Password is Required");
        } else {
            var data = JSON.stringify({
                userEmail: email,
                password: password,
            });

            var config = {
                method: "post",
                url: `${api_url}/users/admin-login`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            axios(config)
                .then(function (response) {
                    const resData = response?.data?.data;
                    localStorage.setItem("accessToken", resData?.accessToken);
                    localStorage.setItem("refreshToken", resData?.refreshToken);
                    localStorage.setItem("userId", resData?.user?._id);
                    history.push("/admin/dashboard")
                })
                .catch(function (error) {
                    if (
                        email.length > 0 &&
                        isValidEmail(email) &&
                        password.length > 0
                    ) {
                        setError("Incorrect email or password!");
                    }
                });
        }
    };

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



    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} ><CircularProgress color="inherit" /></Backdrop>


            <section className="login-section">
                <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-assets\logonew.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Sign In</h6>
                            <p>Enter your credentials to access your account</p>
                        </div>
                        <div className="option-field">
                            <label>Email</label>
                            <input type="text" placeholder='Your email...' />
                        </div>
                        <div className="option-field">
                            <label>Password</label>
                            <input type="text" placeholder='Your password...' />
                        </div>
                        <div className="twice-items">
                            <div className="custom-check-style">
                                <div class="form-group">
                                    <input type="checkbox" id="html" />
                                    <label for="html">Remember me</label>
                                </div>
                            </div>

                        </div>
                        <Link to="/das" className='btn-sign'>Sign In</Link>
                        {/* <Link to="/signup" className='btn-forgot'><span style={{ color: "#fff" }}>Don&apos;t have an account? &nbsp; </span> Sign up </Link> */}
                        <Link to="/forgotPassword" className='btn-forgotpassword'>Forgot Password?</Link>
                    </div>
                </div>
            </section>
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
