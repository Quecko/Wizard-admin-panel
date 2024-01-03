
import React, { useState, useEffect } from 'react';
import './edit.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from 'utils/Environment';
import { Link } from "react-router-dom";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components

function EditProfiles() {
    const [myPro, setMyPro] = useState([]);
    const [passwordError, setPasswordError] = useState({});
    const [open, setOpen] = useState(false);
    const [conformPasswordError, setConformPasswordError] = useState({});
    const [oldpasswordError, setOldpasswordError] = useState({});
    const token = localStorage.getItem('mytoken')
    const [inputs, setInputs] = useState({
        cnfrmpassword: '',
        newPassword: '',
        oldpassword: ""
    })

    const [edit, setEdit] = useState({
        full_name: '',
    })
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const { cnfrmpassword, newPassword, oldpassword, full_name } = inputs;


    const formValidation = () => {
        const passwordError = {};
        const ConformPasswordError = {}
        const oldpasswordError = {}

        let isValid = true;
        if (oldpassword == '') {
            oldpasswordError.logoError = "Password cannot be null";
        } else if (oldpassword === newPassword) {
            oldpasswordError.logoError = "You Entered your Old Password";
        }
        if (newPassword == '') {
            passwordError.logoError = "Password cannot be null";
            isValid = false;
        } else if ((newPassword.length < 8)) {
            passwordError.logoError = "Minimun 8 character is Required"
        }

        if (newPassword != cnfrmpassword) {
            ConformPasswordError.logoError = "Password Did Not Match";
        }

        // if(messageInputData.)
        setPasswordError(passwordError)
        setConformPasswordError(ConformPasswordError)
        setOldpasswordError(oldpasswordError)
        return isValid;
    }

    const getprofile = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/user/myprofile", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyPro(response.data.user)
                setOpen(false)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const handleSubbmit = (e) => {
        setOpen(true)
        e.preventDefault();
        formValidation();
        if (newPassword !== oldpassword) {
            axios.post(Environment.backendUrl + "/user/changepassword", { password: oldpassword, newPassword, }, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response?.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    close()
                    // const token = response.data.token
                    // localStorage.setItem('mytoken', token)
                    // history.push("/promoted");

                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("invalid password", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }

    const close = () => {
        window.$('#exampleModal').modal('hide')
    }

    const editProfile = (e) => {
        e.preventDefault();
        axios.post(Environment.backendUrl + "/user/editprofile", { full_name: myPro.full_name }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                // const token = response.data.token
                // localStorage.setItem('mytoken', token)
                // history.push("/promoted");

            }).catch((err) => {
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleChange = (e) => {

        const value = e.target.value;
        setMyPro(myPro => ({ ...myPro, full_name: value }));
    }
    console.log("nameeeee", edit)

    useEffect(() => {
        getprofile()
    }, [token])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="leaderdetails edit-page-profile">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="upper-detail-page ">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-12">

                                        <div className="detail-card">
                                            <div className='imgedit'>
                                                <img src="\users-assets\profile.svg" alt="" className='ineredit' />
                                            </div>

                                            <h3>Easin Arafat</h3>
                                            <p>Admin</p>
                                            <button type="button" className="change-password" data-toggle="modal" data-target="#exampleModal" >Change Password</button>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-12 edit-cards">
                                        <div className="upper-edit">
                                            <h5>Edit Profile</h5>
                                            {/* <hr className="main-line"></hr> */}
                                        </div>
                                        <div className="row pt-4 pt-lg-0">
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="example">Username</label>
                                                    <input type="text" class="form-control" id="example" aria-describedby="text" placeholder="Enter your username" />

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="example">Full name</label>
                                                    <input type="text" name='full_name' value={myPro.full_name} onChange={handleChange} class="form-control" placeholder="Enter your full name" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="example">Email Adress</label>
                                                    <input value={myPro.email} class="form-control" id="example" aria-describedby="text" placeholder="Enter your email address" readonly />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="example">Email Adress</label>
                                                    <input value={myPro.email} class="form-control" id="example" aria-describedby="text" placeholder="Enter your email address" readonly />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    <button className="red-b" onClick={editProfile}>Publish</button>
                                                    <Link to="/admin/dashboard">
                                                        <button className="red-w">Cancel</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-modal-one">
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog daily-profile-modal">
                                            <div class="modal-content daily-profile-modal-inner">
                                                <div class="modal-body modal-body-main">
                                                    <div className="main-outter">
                                                        <div className="row main-cardssss">
                                                            <div className="col-md-12 col-12">
                                                                <div className="flux-b">
                                                                    <h3>Change Password</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div class="form-group">
                                                                    <label for="example">Old Password</label>
                                                                    <input type="password" name="oldpassword" value={oldpassword} onChange={handleChange1} class="form-control" placeholder="Enter Your old password" />
                                                                    {Object.keys(oldpasswordError).map((key) => {
                                                                        return <p className="inputErrors ">{oldpasswordError[key]}</p>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div class="form-group">
                                                                    <label for="example">New Password</label>
                                                                    <input type="password" name="newPassword" value={newPassword} onChange={handleChange1} class="form-control" placeholder="Enter Your new password" />
                                                                    {Object.keys(passwordError).map((key) => {
                                                                        return <p className="inputErrors">{passwordError[key]}</p>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div class="form-group">
                                                                    <label for="example">Confirm Password</label>
                                                                    <input type="password" name="cnfrmpassword" value={cnfrmpassword} onChange={handleChange1} class="form-control" placeholder="Enter Your new password" />
                                                                    {Object.keys(conformPasswordError).map((key) => {
                                                                        return <p className="inputErrors">{conformPasswordError[key]}</p>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-12">
                                                                <div className="button-modal-daily">
                                                                    <button type="button" className="button-main-daily" onClick={handleSubbmit}  >Save</button>
                                                                    <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close" >Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default EditProfiles;
