
import React, { useEffect, useState } from "react";
import './support.scss';

// import React, { useState } from 'react';

// reactstrap components
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import arrowdown from "assets/img/userflow/arrow-down.png";
import user3 from "assets/img/userflow/arrow-down-green.png";
import user5 from "assets/img/userflow/copy 1.png";
import user7 from "assets/img/userflow/copy-icon.svg";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Modal, Nav, Pagination } from "react-bootstrap";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MultiDatePicker, { Calendar, DateObject } from "react-multi-date-picker";

function Support(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(12),
    new DateObject().setDay(14).add(1, "month"),
    new DateObject().setDay(23).add(1, "month"),
  ])
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState('link-1');

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  const [activeTab1, setActiveTab1] = useState('link-1');

  const handleSelect1 = (eventKey) => {
    setActiveTab1(eventKey);
  }
  const [activeTab11, setActiveTab11] = useState('link-1');

  const handleSelect11 = (eventKey) => {
    setActiveTab11(eventKey);
  }
  const [activeTabiner, setActiveTabiner] = useState('link-1');

  const handleSelectiner = (eventKey) => {
    setActiveTabiner(eventKey);
  }

  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState({
    referrer: []
  })

  const [tras, setTras] = useState([]);
  const [open, setOpen] = useState(false);
  const id = props.match.params.id;
  const token = localStorage.getItem('mytoken')

  const getUserDetail = () => {
    setOpen(true)
    axios.get(Environment.backendUrl + "/user/detail/" + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data.user)
        setTras(response.data.transactions)
        setOpen(false)

      }).catch((err) => {
        setOpen(false)
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }




  const getUserAccess = () => {
    setOpen(true)
    const access = user.user_status
    axios.post(Environment.backendUrl + "/user/updateAccess/", { id, access: !access }, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUser(user => ({ ...user, user_status: !user.user_status }));
        setOpen(false)
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });

      }).catch((err) => {
        setOpen(false)
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }


  const account = user ? user.Accounts ? user.Accounts.length > 0 ? user.Accounts[0]?.public_address : '' : '' : "";


  const mydata = tras.map(elem => {
    return (
      <tr>
        <td className='main-image'>
          <img src={user3} alt="" />
        </td>
        <td className=''> {elem.sended_to === "" ? "" : `${elem.sended_to.substring(0, 6)}...${elem.sended_to.substring(
          elem.sended_to.length - 4)}`}</td>
        <td className=''> {elem.sended_from === "" ? "" : `${elem.sended_from.substring(0, 6)}...${elem.sended_from.substring(
          elem.sended_from.length - 4
        )}`}</td>
        <td className=''>{elem.createdAt.split('T')[0]}</td>
        <td className=''>{elem.amount} {elem.coin_symbol}</td>
      </tr>
    )
  })

  const handleChangeCHeckbox = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    axios.post(Environment.backendUrl + "/user/updateKyc/", { id: parseInt(id), access: value }, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUser(user => ({ ...user, kycVerified: !user.kycVerified }));
        // setOpen(true)

      }).catch((err) => {
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }

  const Invitees = user.referrer.map(elem => {
    return (
      <tr>
        <td className='main-image'>
          <ul className="d-flex justify-content-start align-items-center">
            {/* <li><img src={user2} className="pr-2 imgages-no" alt="" /></li> */}
            <li>{elem.referee.full_name}</li>
          </ul>
        </td>
        {/* <td className=''> {elem.referee.Accounts[0]?.public_address == "" ? "" : `${elem?.referee?.Accounts[0]?.public_address.substring(0, 6)}...${elem.referee.Accounts[0]?.public_address.substring(
          elem.referee.Accounts[0]?.public_address.length - 4
        )}`}</td> */}
        <td className=''> {elem?.referee?.address === "" || elem?.referee?.address === null ? "" : `${elem?.referee?.address?.substring(0, 6)}...${elem?.referee?.address?.substring(
          elem?.referee?.address?.length - 4
        )}`}</td>
        <td className=''>{elem.referee.balance} LGX</td>
      </tr>
    )
  })



  useEffect(() => {
    getUserDetail()

  }, [id])
  return (
    <>
      <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
      {/* <div className="content">
        <section className="user-details">
          <div className="row">
            <div className="col-sm-12">
              <div className="upper-detail-page card">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="detail-card">
                      <img src={user.profile_image} className="img-fluid profile_image_image" alt="" /><br></br>
                      <img src={user4} className="img-fluid" alt="" /><br></br> 
                      <div className="main-outer-p">
                        <div className="main-p">
                          <p>Verifie user</p>
                        </div>
                        <div className="main-switch-nn">
                          <div className="custom-control custom-switch">
                            <input type="checkbox" defaultChecked={user.kycVerified} className="custom-control-input" id="customSwitches" onClick={handleChangeCHeckbox} />
                            <label className="custom-control-label" for="customSwitches"></label>
                          </div>
                        </div>
                      </div> 
                       {user.user_status == true ? <button type="button" className="button-green">UnBlock User</button> : <button type="button" className="button-red">Block User</button> } 
                      <button type="button" className={user.user_status === true ? 'button-green' : 'button-red'} onClick={getUserAccess} >{user.user_status === true ? 'Block User' : 'Unblock User'}</button>
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
                          <p>{user?.address == "" ? "" : `${user?.address?.substring(0, 6)}...${user?.address?.substring(
                            user?.address?.length - 4
                          )}`}
                            <span>
                              {
                                copied ? <img src={user7} className="img-fluid pl-3" alt="" />
                                  :
                                  <CopyToClipboard text={account} onCopy={() => setCopied(true)}>
                                    <img src={user5} className="img-fluid pl-3" alt="" style={{ cursor: "pointer" }} />
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
                      {user?.contact_no &&
                        <div className="col-lg-4 col-md-6">
                          <div className="feildss">
                            <label>Contact NO</label>
                            <p className="email">{user.contact_no}</p>
                          </div>
                        </div>
                      }
                    </div>
                     <div className="row">
                      <div className="col-sm-3">
                        <div className="imsge-d">
                          <Link data-toggle="modal" data-target="#exampleModal3" data-whatever="@mdo"><img src={user.Kyc?.imageFront} alt="" /></Link>
                          <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content modal-main">
                                <div className="modal-body">
                                  <img src={user.Kyc?.imageFront} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="imsge-d mt-3 mt-sm-0">
                          <Link data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo"><img src={user.Kyc?.imageBack} alt="" /></Link>
                          <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content modal-main">
                                <div className="modal-body">
                                  <img src={user.Kyc?.imageBack} alt="" />
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
            {Invitees.length > 0 &&
              <div className="col-lg-6  col-md-12 col-12">
                <div className="lower-upper-detail card">
                  <h4>Invitees List</h4>
                  <div className="table-responsive">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th> Name <img src={arrowdown} className="pl-1" alt="" /></th>
                          <th> Wallet Address <img src={arrowdown} className="pl-1" alt="" /></th>
                          <th> Total LGX <img src={arrowdown} className="pl-1" alt="" /></th>
                        </tr>
                      </thead>
                      <tbody className="main-t-body-text" >
                        {Invitees.length > 0 ? Invitees : ''}

                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            }
        <div className="col-lg-7 col-md-12 col-12">
              <div className="lower-upper-detail card">
                <h4>Transactions</h4>
                <div className="table-responsive">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th> Transaction <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> To <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> From <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> Date <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> Amount <img src={arrowdown} className="pl-1" alt="" /></th>
                      </tr>
                    </thead>
                    <tbody className="main-t-body-text" >
                      {mydata.length > 0 ? mydata : ''}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> 
          </div>
        </section>
      </div > */}










      <div className="content">


        <section className="user-details  mb-5 ">
          <div className='maintablea mb-3'>
            <div className="maintablea_user-detailss">
              <table>
                <thead>
                  <th>
                    Ticket id
                  </th>
                  <th> User’s Name</th>
                  <th>
                    Subject
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Action
                  </th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      9AF3DF
                    </td>
                    <td>   
                       <div className="mainimgdiv">
                      <div className="inerimgd">
                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                        </img>
                      </div>
                      <p className="tableimgtext">
                        Carolyn Wilson
                      </p>
                    </div></td>
                    <td>
                      Claim Failed
                    </td>
                    <td>
                      02-Nov-2023
                    </td>
                    <td>
                      <div className="dropdown amer_dropdonfstsstt">
                        <button className="btn  dropdown-toggle maindrpdbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Pending
                        </button>
                        <div className="dropdown-menu menubardrop" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item dropitmes orangebtnn" href="#">Pending</a>
                          <a className="dropdown-item dropitmes blluuee" href="#">Processing</a>
                          <a className="dropdown-item dropitmes greenstatus" href="#">Completed</a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to="/admin/supporticketdetail">
                        <button className="detailbtn" >Detail</button>
                      </Link>

                    </td>
                  </tr>


                </tbody>
              </table>

            </div>
            <div className='Paginationlattable'>
              <button className='leftpigbtn' >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="#5F6D7E" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                Prev
              </button>
              <Pagination>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item active>{5}</Pagination.Item>
                <Pagination.Item>{6}</Pagination.Item>
              </Pagination>
              <button className='leftpigbtn' >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16797 10H15.0013M10.8346 5L15.2454 9.41074C15.5708 9.73618 15.5708 10.2638 15.2454 10.5893L10.8346 15" stroke="#5F6D7E" stroke-width="1.5" stroke-linecap="round" />
                </svg>

              </button>
            </div>
          </div>

        </section>

      </div >

      <Modal className='ambmodalmain userlastmodal' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>details


            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M12.0008 13.9008L7.10078 18.8008C6.91745 18.9841 6.68411 19.0758 6.40078 19.0758C6.11745 19.0758 5.88411 18.9841 5.70078 18.8008C5.51745 18.6174 5.42578 18.3841 5.42578 18.1008C5.42578 17.8174 5.51745 17.5841 5.70078 17.4008L10.6008 12.5008L5.70078 7.60078C5.51745 7.41745 5.42578 7.18411 5.42578 6.90078C5.42578 6.61745 5.51745 6.38411 5.70078 6.20078C5.88411 6.01745 6.11745 5.92578 6.40078 5.92578C6.68411 5.92578 6.91745 6.01745 7.10078 6.20078L12.0008 11.1008L16.9008 6.20078C17.0841 6.01745 17.3174 5.92578 17.6008 5.92578C17.8841 5.92578 18.1174 6.01745 18.3008 6.20078C18.4841 6.38411 18.5758 6.61745 18.5758 6.90078C18.5758 7.18411 18.4841 7.41745 18.3008 7.60078L13.4008 12.5008L18.3008 17.4008C18.4841 17.5841 18.5758 17.8174 18.5758 18.1008C18.5758 18.3841 18.4841 18.6174 18.3008 18.8008C18.1174 18.9841 17.8841 19.0758 17.6008 19.0758C17.3174 19.0758 17.0841 18.9841 16.9008 18.8008L12.0008 13.9008Z" fill="white" />
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='userlastmod'>
          <div className="userdtalcntrmod">
            <div className="imginggh">
              <p className="videhumbnail">
                Video Thumbnail
              </p>
              <div className="mainimgdivmod">
                <div className="inerimgdmod">
                  <img src="\bannar\modalimmmg.svg" className="tableimgginermod">
                  </img>
                </div>
              </div>
            </div>
            <div className="imginggh">
              <p className="videhumbnail">
                Video Title
              </p>
              <h5 className="videhumbnailss">
                Thesis Defense: Is Eminem a Feminist?
              </h5>
            </div>
            <div className="imginggh">
              <p className="videhumbnail">
                Comment
              </p>
              <h5 className="videhumbnailss">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
              </h5>
            </div>
            <div className="imginggh">
              <p className="videhumbnail">
                Date/Time
              </p>
              <h5 className="videhumbnailss">
                15/11/2023
              </h5>
            </div>


          </div>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default Support;
