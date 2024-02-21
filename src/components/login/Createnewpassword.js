import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Environment from 'utils/Environment';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const api_url = Environment.api_url;
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    return (
        <>
            <section className="login-section">
                <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-assets\logonew.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Create New Password</h6>
                            <p>Your new password must be different  from previously used passwords.</p>
                        </div>
                        <div className="option-field">
                            <label>New Password</label>
                            <input   value={password}
                                        onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='New Password' />
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
                        </div>
                        <div className="password-must">
                            <h5>Password Must:</h5>
                            <ul>
                                <li> Be at least 8 characters long</li>
                                <li>Have at least one uppercase</li>
                                <li>Contain at least one special character</li>
                            </ul>
                        </div>
                        <div className="option-field">
                            <label>Confirm New Password</label>
                            <input value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword1 ? 'text' : 'password'} placeholder='Confirm New Password' />
                             {showPassword1 ? <svg className='eye' onClick={togglePasswordVisibility1} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.97 15.5059L2.5 22.9759" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22.4998 2.97607L15.0298 10.4461" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> :
                                <svg
                                    className='eye'
                                    onClick={togglePasswordVisibility1}
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
                        </div>
                        <Link to="/successpassword" className='btn-sign mb-0'>Confirm</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create;
