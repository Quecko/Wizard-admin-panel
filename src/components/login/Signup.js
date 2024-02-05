import Link from 'next/link'
import React from 'react'

const Signup = () => {
    return (
        <>
            <section className="login-section">
            <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-assets\logonew.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Sign up</h6>
                            <p>Please Sign up your account</p>
                        </div>
                        <div className="option-field">
                            <label>Email</label>
                            <input type="text" placeholder='Your email...' />
                        </div>
                        <div className="option-field">
                            <label>Password</label>
                            <input type="text" placeholder='Your password...' />
                        </div>
                        <div className="option-field">
                            <label>Confirm password</label>
                            <input type="text" placeholder='Your password...' />
                        </div>
                        <Link href="/collectiondashbord" className='btn-sign'>Sign Up</Link>
                        <Link href="/login" className='btn-forgot'><span style={{color: "#fff"}}>Already have an account? &nbsp;</span> Sign in </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
