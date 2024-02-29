import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <>
            <section className="login-section">
                 <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-assets\logonew.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="success">
                            <img src="users-assets\success.png" alt="img" className='img-fluid' />
                            <h6>Success!</h6>
                            <p>Your Password has been successfuly changed</p>
                        </div>
                        <Link to="/adminlogin" className='btn-sign mb-0'>Log In</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Success;
