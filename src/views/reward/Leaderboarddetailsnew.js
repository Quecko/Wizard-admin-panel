import React, { useEffect, useState } from "react";
import './rewardlea.scss';
// reactstrap components
import { Link } from "react-router-dom";
import user5 from "assets/img/userflow/copy 1.png";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import user17 from "assets/img/userflow/copy-icon.svg";
import Carousel from 'react-bootstrap/Carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Environment from "utils/Environment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

function Leaderboarddetailsnew(props) {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    const [userDetail, setUserDetail] = useState([])
    const [user, setUser] = useState({})
  const [open1, setOpen1] = useState(false);
    const [display, setDisplay] = useState({
        proofImage1 : null,
        proofImage2 : null,
        proofImage3 : null,
        proofImage4 : null,
        proofImage5 : null
    })
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false);
    const token = localStorage.getItem('mytoken')
    const id = props.match.params.id;

    const getUserLeaderboard = () => {
        setOpen1(true)
        axios.get(Environment.backendUrl + "/task/leaderboard/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setUser(response.data.detail)
                setUserDetail(response.data.detail.user)
                setOpen1(false)

            }).catch((err) => {
                setOpen1(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const handleChangeCHeckbox = (elem) => {
        // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        // console.log("valueeeee:::",value)
        setOpen1(true)
        const taskId = elem.TaskTrack.task_id
        const userId = elem.TaskTrack.user_id
        const verified = !elem.TaskTrack.verified
        axios.post(Environment.backendUrl + "/task/verify/submission", { taskId, userId, verified: verified }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setUserDetail(userDetail => ({ ...userDetail, verified: !elem.TaskTrack.verified }));
                getUserLeaderboard()
                setOpen1(false)

            }).catch((err) => {
                setOpen1(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const News = userDetail.map(elem => {
        console.log("verfified", elem.TaskTrack.verified)
        return (
            <tr>
                <td className=''>
                    <div className='main-image'>
                        <img src={elem.image} alt="" />
                    </div>
                </td>
                <td className='text-style-c'>{elem.description}</td>
                <td className={elem.TaskTrack.status == "completed" ? 'complete' :'uncomplete'}>{elem.TaskTrack.status}</td>
                <td className=''>
                    <Link><img src={`${images['eye.png']['default']}`} onClick={() => collection(elem)} alt="" /></Link>
                </td>
                <td className='toggler-main'>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" defaultChecked={elem.TaskTrack.verified} class="custom-control-input" onClick={() => handleChangeCHeckbox(elem)} id="customSwitches" />
                        <label class="custom-control-label" for="customSwitches"></label>
                    </div>
                </td>
            </tr>
        )
    })

    const collection = (de) => {
        setOpen(true)
        setDisplay(de.TaskTrack);
    }

    const Images = () => {
        let arr = [];
        for (let i = 1; i <= 5; i++) {
            if (display[`proofImage${i}`]) {
                arr.push(
                    <Carousel.Item>
                        <img src={display[`proofImage${i}`]} class="d-block w-100" alt="" />
                    </Carousel.Item>
                )
            }
        }
        return arr;
    }


    const close = async () => {
        setOpen(false)
    };

    useEffect(() => {
        getUserLeaderboard()
    }, [id])

    const account = user ? user.Accounts ? user.Accounts.length > 0 ? user.Accounts[0]?.public_address : '' : '' : "";


    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open1}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="leaderdetails">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="upper-detail-page card">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="detail-card">
                                                {/* <img src={user.profile_image} alt="" /> */}
                                                <img src="\rewards\detal.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="row pt-4 pt-lg-0">
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="feildss">
                                                        <label>User Name</label>
                                                        <p>{user.full_name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="feildss">
                                                        <label>Full Name</label>
                                                        <p>{user.full_name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="feildss">
                                                        <label>Wallet Address</label>
                                                        <p>{account == "" ? "" : `${account.substring(0, 6)}...${account.substring(
                                                            account.length - 4
                                                        )}`}
                                                            <span>
                                                                {
                                                                    copied ? <img src={user17} className="img-fluid pl-3" alt="" />
                                                                        :
                                                                        <CopyToClipboard text={account} onCopy={() => setCopied(true)}>
                                                                            <img src={user5} className="img-fluid pl-3" alt="" />
                                                                        </CopyToClipboard>
                                                                }
                                                            </span></p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="feildss">
                                                        <label>Email Address</label>
                                                        <p>{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="feildss">
                                                        <label>Contact No</label>
                                                        <p>{user.contact_no}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-div-drop">
                                <div class="dropdown main-drop-down">
                                    <button class=" dropdown-toggless" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        This Week <img src={`${images['detaildownarrow.png']['default']}`} alt="" />
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link class="dropdown-item" >12</Link>
                                        <Link class="dropdown-item" >12</Link>
                                        <Link class="dropdown-item" >100</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <div className="lower-upper-detail card">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Reward Image</th>
                                                    <th> Details</th>
                                                    <th> Status</th>
                                                    <th>Submitted Proof</th>
                                                    <th> Verifie</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {News ? News : ''}
                                            </tbody>
                                        </table>
                                    </div>
                                    <ToastContainer style={{ fontSize: 20 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-modal-one">
                        <Modal isOpen={open} className="register-modal collection-modal modal-collection-show">
                            <ModalHeader >
                                <button type="button" class="close" data-dismiss="modal" onClick={close} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </ModalHeader>
                            <ModalBody className="modal-body">
                                <div className="main-outter-caresoual">
                                    <Carousel>
                                        {Images()}                        
                                    </Carousel>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </section>
            </div>


            
        </>
    );
}

export default Leaderboarddetailsnew

