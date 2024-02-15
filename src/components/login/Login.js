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
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailerrorregister, setEmailErrorRegister] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                email: email,
                password: password,
                rememberMe: rememberMe,
            });

            var config = {
                method: "post",
                url: `${api_url}/auth/admins/signin`,
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
                            <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailErrorRegister(""); setError("") }} type="text" placeholder='Your email...' />
                            <div>
                                {emailerrorregister ? (
                                    <p className="text-danger mt-2">{emailerrorregister}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="option-field">
                            <label>Password</label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrorPassword("");
                                    setError("");
                                }}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Your password...'
                            />
                            {showPassword ? <svg className='eye' onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.97 15.5059L2.5 22.9759" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22.4998 2.97607L15.0298 10.4461" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> :
                                <svg
                                    className='eye'
                                    onClick={togglePasswordVisibility}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <path
                                        d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
                                        stroke="#745F8C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.9998 21.2468C15.5298 21.2468 18.8198 19.1668 21.1098 15.5668C22.0098 14.1568 22.0098 11.7868 21.1098 10.3768C18.8198 6.77678 15.5298 4.69678 11.9998 4.69678C8.46984 4.69678 5.17984 6.77678 2.88984 10.3768C1.98984 11.7868 1.98984 14.1568 2.88984 15.5668C5.17984 19.1668 8.46984 21.2468 11.9998 21.2468Z"
                                        stroke="#745F8C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>}
                            {errorpassword && (
                                <p className="text-danger mt-2">{errorpassword}</p>
                            )}
                        </div>
                        <div className="twice-items">
                            <div className="custom-check-style">
                                <div class="form-group adasdsadasdasdsadsad">
                                    {/* <input className='chrreeddgtrer' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" id="html" />
                                    <label for="html">Remember me</label> */}

                                    <label class="containersssss">Remember me
                                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <span class="checkmark"></span>
                                    </label>



                                </div>
                            </div>
                        </div>
                        {error ? (
                            <p className="input-Errors pb-3 text-danger mt-2">{error}</p>
                        ) : null}
                        <Link onClick={userLogin} className='btn-sign'>Sign In</Link>
                        {/* <Link to="/signup" className='btn-forgot'><span style={{ color: "#fff" }}>Don&apos;t have an account? &nbsp; </span> Sign up </Link> */}
                        <Link to="/ForgotPassword" className='btn-forgotpassword'>Forgot Password?</Link>
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
