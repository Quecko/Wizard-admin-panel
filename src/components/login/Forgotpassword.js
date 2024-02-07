import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Environment from 'utils/Environment';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {

  const api_url = Environment.api_url;
  const val = localStorage.getItem("accessToken");
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [emailerrorregister, setEmailErrorRegister] = useState("");


  const forgotPassword = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setEmailErrorRegister("Email is Required");
  } 
  
   else if (isValidEmail(email)) {
      const config = {
        method: "post",
        url: api_url + "/auth/admins/forget-password",
        data: {
          email: email,
        },
        headers: {
          Authorization: "Bearer " + val,
        },
      };
      await axios(config)
        .then((res) => {
          // toast.success(res?.data?.message);
          // history.push("");
         
        })
        .catch((err) => {
          if (err?.response?.data?.statusCode == 501) {
            history.push("/");
          } else if (err?.response?.data?.statusCode == 404) {
            setEmailErrorRegister("Admin doesn't exist!");
          } else {
            console.log("error meessage: ", err?.response?.data?.message);
            toast.error(err?.response?.data?.message, {
              position: "bottom-left",
              autoClose: 2000,
            });
          }
         
        });
    } else {
      setEmailErrorRegister("Invalid Email! Please enter a correct email address.");
    }

    // }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return (
    <>
     <section className="login-section">
     <span className='gradient-linear'></span>
        <div className="parent">
            <img src="\login-assets\logonew.svg" alt="img" className='img-fluid login-logo' />
            <div className="main-card">
                <div className="main-heading">
                    <h6>Forgot your Password?</h6>
                    <p className='forgtedpesaw'>Enter your registered email to receive password reset instructions.</p>
                    {/* <p>Enter your registered email to receive password reset instructions.</p> */}
                </div>
                <div className="option-field">
                    <label>Email</label>
                    <input  value={email} onChange={(e) => { setEmail(e.target.value); setEmailErrorRegister("");}} type="text" placeholder='Your email...' />
                    <div>
                                {emailerrorregister ? (
                                    <p className="text-danger mt-2">{emailerrorregister}</p>
                                ) : null}
                            </div>
                </div>
                <Link to=""  onClick={forgotPassword} className='btn-sign mb-0'>Send</Link>
            </div>
        </div>
     </section>
    </>
  )
}

export default ForgotPassword
