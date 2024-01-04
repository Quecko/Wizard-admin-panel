import React, { useState } from 'react'
import './factor.scss'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Environment from 'utils/Environment';

const FactorAuth = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [verifycode, setVerifycode] = useState('')
    const qrcode = localStorage.getItem('qrcode')

    const handleChange = (e) => {
        setVerifycode(e.target.value)

    }
    const [verifycodeError, setverifycodeError] = useState({});

    const formValidation = () => {
        const verifycodeError = {};
        let isValid = true;
        if (verifycode === '') {
            verifycodeError.error = "Please Enter Your Verify Code";
            isValid = false;
        }
        setverifycodeError(verifycodeError)
        return isValid;
    }
    const Signin = (e) => {
        e.preventDefault();
        formValidation();
        if (verifycode) {
            setOpen(true)
            axios.post(Environment.backendUrl + "/user/loginadmin", {})
                .then((response) => {
                    swal("Good to see you Again!", `Login-Successfull`, "success", { timer: 2000 })
                    history.push('admin/dashboard');
                    setOpen(false)

                }).catch((err) => {
                    setOpen(false)
                    swal("Invalid OPT Code!!!", "error",)
                    // toast.error(err.response?.data.msg, {
                    //     position: "top-center",
                    //     autoClose: 2000,
                    // });
                })
        } else {
            swal("Invalid Credentials!", `Try Again`, "Error",)
        }
    }
    console.log("verifycode", verifycode)

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('assets/img/', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            {/* <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop> */}
            <section className="main-login-auth ">
                <div className="container">
          
                            <div className="inner-logo text-center">
                                {/* <img src={`${images['logo.svg']['default']}`} alt="" className="img-fluid" /> */}
                                <img src='\login-assets\logonew.svg' alt="" className="img-fluid" />
                            </div>
                            <div className="cmn-tile-style text-center">
                                <h3 className="fsthndg">Two Factor-Authentication</h3>
                                <p className='secpara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled.</p>
                                <div className='text-center crqscntrdiv'>
                                    {/* <img src={qrcode} alt="" className="img-fluid" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220" fill="none">
                                        <g clip-path="url(#clip0_277_138448)">
                                            <path d="M27.5 27.5H55V55H27.5V27.5Z" fill="black" />
                                            <path d="M82.5 0V82.5H0V0H82.5ZM68.75 13.75H13.75V68.75H68.75V13.75ZM55 165H27.5V192.5H55V165Z" fill="black" />
                                            <path d="M82.5 137.5V220H0V137.5H82.5ZM13.75 151.25V206.25H68.75V151.25H13.75ZM165 27.5H192.5V55H165V27.5Z" fill="black" />
                                            <path d="M137.5 0V82.5H220V0H137.5ZM206.25 13.75V68.75H151.25V13.75H206.25ZM110 13.75V0H123.75V27.5H110V55H96.25V13.75H110ZM110 82.5V55H123.75V82.5H110ZM82.5 110V96.25H96.25V82.5H110V110H123.75V96.25H192.5V110H137.5V123.75H96.25V110H82.5ZM82.5 110V123.75H27.5V110H13.75V123.75H0V96.25H41.25V110H82.5ZM220 123.75H206.25V96.25H220V123.75ZM206.25 123.75H192.5V151.25H220V137.5H206.25V123.75ZM151.25 123.75H178.75V137.5H165V151.25H151.25V123.75ZM178.75 165V151.25H165V165H151.25V178.75H123.75V192.5H165V165H178.75ZM178.75 165H220V178.75H192.5V192.5H178.75V165ZM123.75 151.25V165H137.5V137.5H96.25V151.25H123.75Z" fill="black" />
                                            <path d="M96.25 165H110V206.25H165V220H96.25V165ZM220 192.5V220H178.75V206.25H206.25V192.5H220Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_138448">
                                                <rect width="220" height="220" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                <h3 className="seclasthngd">Enter the six-digit code from the application</h3>
                                <p className='seclastparss'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>

                                <form>
                                    <div className="form-group  mt-4">
                                        {/* <label for="exampleInputPassword1">Password</label> */}
                                        <input type="number" name="verifycode" value={verifycode} onChange={handleChange} className='form-control ' placeholder="xxx-xxxx" />
                                        {Object.keys(verifycodeError).map((key) => {
                                            return <p className="inputErrors text-left mt-2">{verifycodeError[key]}</p>
                                        })}
                                    </div>
                                    <div className='textrightlast'>
                                
                                           <button type="submit" className="btn-commonseccfst" >Cancel</button>
                                   <button type="submit" className="btn-commonsecc" onClick={Signin} >Enable</button>
                                 
                                    </div>
                                </form>
                            </div>
                        </div>
  
            </section>
        </>
    )
}

export default FactorAuth


