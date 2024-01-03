
import React, { useEffect, useState } from "react";
import './rewardlea.scss';
// reactstrap components
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Modal } from "react-bootstrap";
function ThisWeekReward() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [myFiles, setMyFiles] = useState([]);
    const token = localStorage.getItem('mytoken')
    const [open, setOpen] = useState(false);
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getReward = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/reward/all", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.rewards)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const News = myFiles.map(elem => {
        return (
            <tr>
                <td className='main-image'>
                    <Link className=''> <img src={elem?.image} className="pr-2 imgages-no" alt="" /></Link>
                </td>
                <td className=''>{elem.name}</td>
                <td className=''>{elem?.createdAt.split('T')[0]}</td>
                <td className=''>{elem.description}</td>
                {/* <td> <i class="fas fa-check"></i></td> */}
                {/* <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><i className="far fa-trash-alt"></i></button></td> */}
            </tr>
            // <tr>
            //     <td className='main-image'>
            //         <Link className=''> <img src={elem?.image} className="pr-2 imgages-no" alt="" /></Link>
            //     </td>
            //     <td className=''>{elem.name}</td>
            //     <td className=''>{elem.description}</td>
            //     <td><Link className="common" target="_blank">{elem.routePage}</Link></td>
            //     <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><i className="far fa-trash-alt"></i></button></td>
            // </tr>
        )
    })

    useEffect(() => {
        getReward()
    }, [token])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="thisweekrewards card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Reward</th>
                                        <th>Edit</th>
                                        {/* <th>Description</th> */}
                                        {/* <th>Remove</th> */}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {/* {News.length > 0 ? News :""} */}
                                    <tr>
                                        <td className='main-image'>
                                            Sign Up and get 20 Bolts
                                        </td>
                                        <td className=''>20 Bolts</td>
                                        <td className=''><svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_277_141271)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_277_141271">
                                                    <rect width="22" height="22" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg></td>

                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            Sign Up and get 20 Bolts
                                        </td>
                                        <td className=''>20 Bolts</td>
                                        <td className=''><svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_277_141271)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_277_141271">
                                                    <rect width="22" height="22" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg></td>

                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            Sign Up and get 20 Bolts
                                        </td>
                                        <td className=''>20 Bolts</td>
                                        <td className=''><svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_277_141271)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_277_141271">
                                                    <rect width="22" height="22" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg></td>

                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            Sign Up and get 20 Bolts
                                        </td>
                                        <td className=''>20 Bolts</td>
                                        <td className=''><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_277_141271)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_277_141271">
                                                    <rect width="22" height="22" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg></td>

                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            Sign Up and get 20 Bolts
                                        </td>
                                        <td className=''>20 Bolts</td>
                                        <td className=''><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_277_141271)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_277_141271">
                                                    <rect width="22" height="22" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg></td>

                                    </tr>

                                </tbody>
                            </table>
                            <ToastContainer style={{ fontSize: 20 }} />
                        </div>
                    </div>
                </section>

            </div>
            <Modal className='ambmodalmain userlastmodal  addrewads' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Rewards

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='userlastmodrewards'>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 1 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 2 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 3 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 4 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 5 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 6 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>
                    <div class="form-group">
                        <label className="rewardslable" for="example">Day 7 Reward</label>
                        <input type="text" name="rewards" className="rewardinput" placeholder="Enter Rewards" />
                    </div>


                    <div className="videopagerewards">
                        <button className="red-b" >Save</button>
                        <Link to="/admin/thisweekreward">  <button className="red-w">Cancel</button></Link>
                    </div>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default ThisWeekReward;
