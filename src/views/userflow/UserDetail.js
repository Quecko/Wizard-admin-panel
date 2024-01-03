
import React, { useEffect, useState } from "react";
import './user.scss';

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
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";

import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import MultiDatePicker, { Calendar, DateObject } from "react-multi-date-picker";

function UserDetail(props) {
  
  const [showcalendar, setShowCalendar] = useState(false);
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

        <div className="container-fluid">
          <section className="user-details  mb-5 ">
            <div className="maintopdiv">
              <div className="inerimgdss">
                <img src="\users-assets\admin-img.png" className="tableimgginerss">
                </img>
              </div>
              <div className="inertopcolmm">
                <p className="Usernnvame ">
                  User Name
                </p>
                <h5 className="ericccrown">
                  Eric_Brown123
                </h5>
              </div>
              <div className="inertopcolmm">
                <p className="Usernnvame">
                  Email Address
                </p>
                <h5 className="ericccrown">
                  eric.brown@gmail.com
                </h5>
              </div>
              <div className="inertopcolmm">
                <p className="Usernnvame">
                  Full Name
                </p>
                <h5 className="ericccrown">
                  Eric Brown
                </h5>
              </div>
              <div className="inertopcolmm">
                <p className="Usernnvame">
                  Wallet Address
                </p>
                <h5 className="ericccrown">
                  <div className="feildss">

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
                </h5>
              </div>

              <div className="inertopcolmm">
                <p className="Usernnvame">
                  Following
                </p>
                <h5 className="ericccrown">
                  100k
                </h5>
              </div>

              <div className="inertopcolmm">
                <p className="Usernnvame">
                  User Name
                </p>
                <h5 className="ericccrown">
                  Eric_Brown123
                </h5>
              </div>
              <div className="inertopcolmm">
                {user.user_status == true ? <button type="button" className="button-green">UnBlock User</button> : <button type="button" className="button-red">Block User</button>}
              </div>
            </div>
            {activeTab === 'link-1' && (
              <>
                <div className="lowertabsss">
                  <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsoutersss'>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-1111">Security</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-2222">Financials</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-3333">Engagement</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-4444">Raffles</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-5555">Activity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-6666">Support</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='amberitempilsss'>
                      <Nav.Link className='inerambss' eventKey="link-7777">KYC</Nav.Link>
                    </Nav.Item>

                  </Nav>

                </div>
                {activeTab1 === 'link-1111' && (
                  <>
                    <div className='maintablea'>
                      <div className="maintablea_user-detailss table-responsive">
                        <table>
                          <thead>
                            <th>
                              Last Login Date/Time

                            </th>
                            <th>IP Address </th>
                            <th>Device </th>

                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
                            </tr>
                            <tr>
                              <td>
                                20/11/2023 01:22
                              </td>
                              <td>194.44.234.160 </td>
                              <td>Samsung S22 Ultra (App Ver: 12.45.23.51)  </td>
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
                  </>
                )}
                {activeTab1 === 'link-2222' && (
                  <>
                    <div className="sectoaldiv">
                      <p className="totalwalet">
                        Total No. of Wallets
                      </p>
                      <h3 className="waltdigts ">
                        50,456
                      </h3>
                    </div>
                    <div className='maintablea_usedetails'>
                      <div className='maintablepills_usedetails'>
                        <Nav variant="pills" activeKey={activeTabiner} onSelect={handleSelectiner} className='amberpillsouterdetails'>
                          {/* <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb ' eventKey="link-122">activeTabiner</Nav.Link>
                          </Nav.Item> */}
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-233">Bolts</Nav.Link>
                          </Nav.Item>
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-344">
                              Mystery Boxes
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-4445">
                              Subscriptions
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-5446">
                              Metaverse Assets
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-64477">
                              Purchase History
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className='amberitempils'>
                            <Nav.Link className='ineramb' eventKey="link-34488">
                              Badges
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>



                      {activeTabiner === 'link-122' && (
                        <>

                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Wallets

                                  </th>
                                  <th> Date Created </th>
                                  <th>Total Balance in USDT </th>

                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="eleipiess">
                                      0x3409....62BA
                                    </td>
                                    <td>24/11/2023 </td>
                                    <td>500 USDT </td>
                                  </tr>
                                  <tr>
                                    <td className="eleipiess">
                                      0x3409....62BA
                                    </td>
                                    <td>24/11/2023 </td>
                                    <td>500 USDT </td>
                                  </tr>
                                  <tr>
                                    <td className="eleipiess">
                                      0x3409....62BA
                                    </td>
                                    <td>24/11/2023 </td>
                                    <td>500 USDT </td>
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

                        </>
                      )}
                      {activeTabiner === 'link-233' && (
                        <>
                          <>

                            <div className="lowertabsss">
                              <Nav variant="pills" activeKey={activeTab11} onSelect={handleSelect11} className='amberpillsoutersss'>
                                <Nav.Item className='amberitempilsss'>
                                  <Nav.Link className='inerambss' eventKey="link-2323">Earned</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempilsss'>
                                  <Nav.Link className='inerambss' eventKey="link-2424">Spend</Nav.Link>
                                </Nav.Item>

                              </Nav>
                            </div>



                            {activeTab11 === 'link-2323' && (
                              <>
                                <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th> Task </th>
                                        <th>Bolts Earned </th>

                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Score 10 Points in Fruit Ninja </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Score 10 Points in Fruit Ninja </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Score 10 Points in Fruit Ninja </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Score 10 Points in Fruit Ninja </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Score 10 Points in Fruit Ninja </td>
                                          <td>500 BOLTS </td>
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
                              </>
                            )}
                            {activeTab11 === 'link-2424' && (
                              <>
                                <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th> Bolt Spend </th>
                                        <th>Bolts Amount </th>

                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts Amount </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts Amount </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts Amount </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts Amount </td>
                                          <td>500 BOLTS </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts Amount </td>
                                          <td>500 BOLTS </td>
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
                              </>
                            )}

                          </>
                        </>
                      )}
                      {activeTabiner === 'link-344' && (
                        <>
                          <>

                            <div className="lowertabsss">
                              <Nav variant="pills" activeKey={activeTab11} onSelect={handleSelect11} className='amberpillsoutersss'>
                                <Nav.Item className='amberitempilsss'>
                                  <Nav.Link className='inerambss' eventKey="link-23232">Rare Box</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempilsss'>
                                  <Nav.Link className='inerambss' eventKey="link-24242">Legendary Box</Nav.Link>
                                </Nav.Item>

                              </Nav>
                            </div>



                            {activeTab11 === 'link-23232' && (
                              <>
                                <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th>Reward </th>
                                        <th>Earned Via </th>
                                        <th> Claim Time </th>
                                        <th> Is Claimed </th>
                                    
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
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
                              </>
                            )}
                            {activeTab11 === 'link-24242' && (
                              <>
                              <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th>Reward </th>
                                        <th>Earned Via </th>
                                        <th> Claim Time </th>
                                        <th> Is Claimed </th>                                    
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Store</td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="green">True</span ></td>

                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>Bolts, Land & Tickets </td>
                                          <td>Gift </td>
                                          <td>24/11/2023 06:04 </td>
                                          <td><span className="red">False</span ></td>
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
                              </>
                            )}

                          </>
                        </>
                      )}
                      {activeTabiner === 'link-4445' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Date/Time
                                  </th>
                                  <th> Subscription </th>
                                  <th>Amount </th>
                                  <th>Expiry Date </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                    <td>
                                      24/11/2023 06:04
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
                        </>
                      )}
                      {activeTabiner === 'link-5446' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Date/Time
                                  </th>
                                  <th> Assets </th>
                                  <th>Price in BOLTS </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Land </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Avatar </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Furniture </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Car </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Office </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Land </td>
                                    <td>500 BOLTS </td>
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
                        </>
                      )} 
                      {activeTabiner === 'link-64477' && (
                        <>
                   <div className="lowertabsss">
                              <Nav variant="pills" activeKey={activeTab11} onSelect={handleSelect11} className='outertabsnewdesign amberpillsoutersss'>
                                <Nav.Item className='amberitempilsss newwtabsdesign'>
                                  <Nav.Link className='inerambss' eventKey="link-0251">Bolts Bundle</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempilsss newwtabsdesign'>
                                  <Nav.Link className='inerambss' eventKey="link-0252">Tickets</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempilsss newwtabsdesign'>
                                  <Nav.Link className='inerambss' eventKey="link-0253">Turns</Nav.Link>
                                </Nav.Item>

                              </Nav>
                            </div>
                            
                            {activeTab11 === 'link-0251' && (
                              <>
                                <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th>Bolts Bundle </th>
                                        <th>Transaction ID </th>
                                
                                    
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>5988787959</td>                              
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
                              </>
                            )}
                                    {activeTab11 === 'link-0252' && (
                              <>
                               <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th>Bolts Bundle </th>
                                        <th>Bolts Price </th>
                                
                                    
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>150 BOLTS </td>
                                          <td>200 BOLTS</td>                              
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
                              </>
                            )}
                                    {activeTab11 === 'link-0253' && (
                              <>
                                 <div className='maintablea'>
                                  <div className="maintablea_user-detailss table-responsive">
                                    <table>
                                      <thead>
                                        <th>
                                          Date/Time
                                        </th>
                                        <th>Turns</th>
                                        <th>Transaction ID </th>
                                
                                    
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
                                        </tr>
                                        <tr>
                                          <td>
                                            24/11/2023 06:04
                                          </td>
                                          <td>50 Turns </td>
                                          <td>5988787959</td>                              
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
                              </>
                            )}
                   
                        </>
                      )}
                      {activeTabiner === 'link-34488' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                  Badge
                                  </th>
                                  <th> Type </th>
                                  <th>Task </th>
                                  <th>Completed On </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_281_206732)" />
                                            <path d="M19.9971 35.2701C28.4308 35.2701 35.2676 28.4332 35.2676 19.9995C35.2676 11.5659 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5659 4.72656 19.9995C4.72656 28.4332 11.5634 35.2701 19.9971 35.2701Z" fill="#78D2FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#0A265C" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82629C21.0318 6.36064 18.943 6.36064 16.934 6.82629L19.9874 19.9996L23.0407 6.82629ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.053L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.173C18.943 33.6386 21.0318 33.6386 23.0407 33.173L19.9874 19.9996L16.934 33.173ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.053C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.053ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8059 6.50146C22.5474 6.60499 24.2005 7.03877 25.7032 7.74086L22.8039 13.8693H17.3203L20.8059 6.50146Z" fill="#B3001E" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4755 6.70532C23.0729 6.81623 23.6566 6.96647 24.2242 7.15339L21.0465 13.8701H19.0859L22.4755 6.70532Z" fill="#D7B8B8" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5636 17.1553V15.3188C16.5636 14.3353 17.3609 13.538 18.3445 13.538H21.6477C22.6312 13.538 23.4285 14.3353 23.4285 15.3188V17.1553C23.4285 17.5513 23.7499 17.8727 24.146 17.8727C24.5419 17.8727 24.8633 17.5513 24.8633 17.1553V15.3188C24.8633 13.5429 23.4237 12.1033 21.6477 12.1033H18.3445C16.5686 12.1033 15.1289 13.5429 15.1289 15.3188V17.1553C15.1289 17.5513 15.4503 17.8727 15.8463 17.8727C16.2422 17.8727 16.5636 17.5513 16.5636 17.1553Z" fill="url(#paint2_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2758 6.49658L22.8801 14.1155C22.8801 14.1155 18.9987 14.1155 17.767 14.1155C17.5408 14.1155 17.3349 13.9851 17.2382 13.7807L14.3633 7.70367C15.8726 7.0109 17.5307 6.58797 19.2758 6.49658Z" fill="url(#paint3_linear_281_206732)" />
                                            <path d="M19.9793 33.5224C25.0313 33.5224 29.1266 29.427 29.1266 24.3751C29.1266 19.3232 25.0313 15.2278 19.9793 15.2278C14.9274 15.2278 10.832 19.3232 10.832 24.3751C10.832 29.427 14.9274 33.5224 19.9793 33.5224Z" fill="url(#paint4_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0328 20.4591C27.2876 20.3177 27.4693 20.0737 27.532 19.7891C27.5946 19.5045 27.5321 19.2067 27.3602 18.9714C25.6515 16.6367 22.9176 15.2278 19.9793 15.2278C17.1636 15.2278 14.5355 16.5216 12.8175 18.6843C12.5826 18.981 12.4899 19.3659 12.564 19.7371C12.6382 20.1082 12.8716 20.4279 13.2025 20.6116C13.2105 20.6172 13.2189 20.6218 13.2273 20.6265C13.5757 20.8199 14.0141 20.7186 14.2423 20.3918C15.5384 18.5239 17.6766 17.3906 19.9793 17.3906C22.1779 17.3906 24.2266 18.4238 25.5356 20.1428C25.8864 20.6062 26.5246 20.7408 27.0325 20.4587C27.0328 20.4591 27.0328 20.4591 27.0328 20.4591Z" fill="url(#paint5_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9437 28.2911C12.689 28.4325 12.5072 28.6766 12.4446 28.9612C12.3819 29.2458 12.4445 29.5435 12.6163 29.7788C14.325 32.1135 17.059 33.5225 19.9972 33.5225C22.813 33.5225 25.4411 32.2286 27.1591 30.066C27.394 29.7692 27.4866 29.3843 27.4125 29.0132C27.3383 28.642 27.105 28.3223 26.7741 28.1386C26.7661 28.1331 26.7577 28.1284 26.7493 28.1237C26.4008 27.9303 25.9625 28.0316 25.7343 28.3585C24.4382 30.2264 22.2999 31.3596 19.9972 31.3596C17.7986 31.3596 15.75 30.3265 14.4409 28.6074C14.0901 28.1441 13.452 28.0095 12.944 28.2916C12.9437 28.2911 12.9437 28.2911 12.9437 28.2911Z" fill="url(#paint6_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2838 17.0133C23.4036 16.7454 23.4021 16.439 23.2799 16.1722C23.1577 15.9055 22.9266 15.7043 22.6455 15.62C21.788 15.3606 20.895 15.2278 19.9949 15.2278C19.2132 15.2278 18.4367 15.328 17.6842 15.5244C17.3178 15.6214 17.0125 15.8743 16.849 16.2162C16.6856 16.5581 16.6804 16.9546 16.8351 17.3007C16.838 17.3088 16.8414 17.3165 16.845 17.3243C17.0075 17.6881 17.4187 17.8702 17.7974 17.746C18.5046 17.5109 19.2466 17.3906 19.9949 17.3906C20.6424 17.3906 21.2849 17.4806 21.9045 17.6567C22.4604 17.8151 23.048 17.5409 23.2838 17.0133Z" fill="#CCEEFF" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6966 31.7369C16.5769 32.0048 16.5783 32.3113 16.7006 32.5781C16.8227 32.8448 17.0539 33.046 17.335 33.1303C18.1925 33.3897 19.0855 33.5225 19.9855 33.5225C20.7673 33.5225 21.5438 33.4223 22.2963 33.2258C22.6626 33.1289 22.968 32.8759 23.1314 32.534C23.2949 32.1922 23.3 31.7956 23.1454 31.4496C23.1425 31.4415 23.139 31.4337 23.1355 31.4259C22.9729 31.0622 22.5617 30.8801 22.1831 31.0043C21.4758 31.2394 20.7339 31.3596 19.9855 31.3596C19.3381 31.3596 18.6955 31.2696 18.0759 31.0935C17.5201 30.9351 16.9325 31.2093 16.6966 31.7369Z" fill="#0F388A" />
                                            <path d="M19.9803 31.3595C23.8376 31.3595 26.9645 28.2326 26.9645 24.3753C26.9645 20.5181 23.8376 17.3911 19.9803 17.3911C16.123 17.3911 12.9961 20.5181 12.9961 24.3753C12.9961 28.2326 16.123 31.3595 19.9803 31.3595Z" fill="#78D2FF" />
                                            <path d="M19.9816 30.5602C23.3974 30.5602 26.1664 27.7912 26.1664 24.3754C26.1664 20.9597 23.3974 18.1907 19.9816 18.1907C16.5659 18.1907 13.7969 20.9597 13.7969 24.3754C13.7969 27.7912 16.5659 30.5602 19.9816 30.5602Z" fill="#005CB2" />
                                            <path d="M23.8057 23.2234C23.5974 22.7308 23.2993 22.2881 22.92 21.908L22.9211 21.9067L24.0769 20.9082L21.5828 22.2431H21.5825L17.6816 24.3312L19.3217 25.2309L17.7807 26.8656L17.7635 26.8834C17.2425 26.3406 16.9221 25.6058 16.9221 24.7977C16.9221 23.131 18.285 21.7751 19.9601 21.7751C20.2787 21.7751 20.5859 21.8243 20.8745 21.9151L22.107 21.2737C21.944 21.1765 21.7739 21.0902 21.5974 21.0155C21.0856 20.7988 20.5421 20.6892 19.9819 20.6892C19.4219 20.6892 18.8784 20.7991 18.3664 21.0155C17.8721 21.2243 17.4284 21.5236 17.0473 21.9045C16.6662 22.2854 16.3674 22.7291 16.1583 23.2234C15.9417 23.7353 15.832 24.2789 15.832 24.8389C15.832 25.3989 15.9417 25.9425 16.1583 26.4544C16.3527 26.9145 16.6257 27.3308 16.97 27.6938L15.9532 28.6433L22.0291 25.2203L20.5871 24.2768L22.1391 22.6969L22.1402 22.6957C22.6705 23.2401 22.9974 23.9815 22.9974 24.7979C22.9974 26.4647 21.6345 27.8206 19.9593 27.8206C19.614 27.8206 19.2819 27.7627 18.9725 27.6568L17.7295 28.3253C17.9307 28.4556 18.1432 28.5683 18.3664 28.6626C18.8781 28.8793 19.4216 28.9889 19.9819 28.9889C20.5418 28.9889 21.0854 28.879 21.5974 28.6626C22.0917 28.4537 22.5353 28.1545 22.9164 27.7736C23.2975 27.3927 23.5964 26.9489 23.8054 26.4547C24.022 25.9428 24.1317 25.3992 24.1317 24.8391C24.1322 24.2786 24.0222 23.7353 23.8057 23.2234Z" fill="url(#paint7_linear_281_206732)" />
                                            <path d="M23.8057 22.6157C23.5974 22.1232 23.2993 21.6804 22.92 21.3003L22.9211 21.299L24.0769 20.3005L21.5828 21.6355H21.5825L17.6816 23.7235L19.3217 24.6232L17.7807 26.258L17.7635 26.2758C17.2425 25.7329 16.9221 24.9981 16.9221 24.1901C16.9221 22.5233 18.285 21.1674 19.9601 21.1674C20.2787 21.1674 20.5859 21.2166 20.8745 21.3074L22.107 20.6661C21.944 20.5689 21.7739 20.4825 21.5974 20.4078C21.0856 20.1911 20.5421 20.0815 19.9819 20.0815C19.4219 20.0815 18.8784 20.1914 18.3664 20.4078C17.8721 20.6167 17.4284 20.916 17.0473 21.2968C16.6662 21.6777 16.3674 22.1215 16.1583 22.6157C15.9417 23.1276 15.832 23.6712 15.832 24.2313C15.832 24.7912 15.9417 25.3348 16.1583 25.8467C16.3527 26.3069 16.6257 26.7231 16.97 27.0862L15.9532 28.0357L22.0291 24.6127L20.5871 23.6692L22.1391 22.0893L22.1402 22.088C22.6705 22.6324 22.9974 23.3738 22.9974 24.1903C22.9974 25.857 21.6345 27.2129 19.9593 27.2129C19.614 27.2129 19.2819 27.155 18.9725 27.0491L17.7295 27.7176C17.9307 27.8479 18.1432 27.9607 18.3664 28.0549C18.8781 28.2716 19.4216 28.3812 19.9819 28.3812C20.5418 28.3812 21.0854 28.2713 21.5974 28.0549C22.0917 27.8461 22.5353 27.5468 22.9164 27.1659C23.2975 26.785 23.5964 26.3413 23.8054 25.847C24.022 25.3351 24.1317 24.7915 24.1317 24.2315C24.1322 23.6709 24.0222 23.1276 23.8057 22.6157Z" fill="url(#paint8_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5339 6.70093L21.0415 14.1154C21.0415 14.1154 20.1311 14.1154 19.6013 14.1154C19.3752 14.1154 19.1693 13.9851 19.0726 13.7807L15.9141 7.10429C16.4409 6.93769 16.9816 6.80251 17.5339 6.70093Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206732" x1="21.0505" y1="7.77016" x2="21.0505" y2="39.9728" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206732" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                <stop stop-color="#33A2FF" />
                                                <stop offset="1" stop-color="#33A2FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206732" x1="20.0951" y1="12.1033" x2="20.0951" y2="16.7288" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206732" x1="16.808" y1="7.77059" x2="19.083" y2="14.9884" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E61A5E" />
                                                <stop offset="1" stop-color="#CC0022" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206732" x1="20.4598" y1="18.7816" x2="20.4598" y2="33.5099" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206732" x1="19.9794" y1="15.2278" x2="19.9794" y2="24.3751" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#78D2FF" />
                                                <stop offset="1" stop-color="#00A6F9" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206732" x1="19.9973" y1="24.3751" x2="19.9973" y2="33.5225" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2F74FF" />
                                                <stop offset="1" stop-color="#144BB8" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206732" x1="20.4415" y1="22.4538" x2="21.7381" y2="28.4807" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#006699" />
                                                <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206732" x1="21.9342" y1="21.4474" x2="10.009" y2="35.064" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          GENESIS
                                        </p>
                                      </div>
                                    </td>
                                    <td>Techwiz</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206794)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#DE99FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#2D0066" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82628C21.0318 6.36064 18.943 6.36064 16.934 6.82628L19.9874 19.9996L23.0407 6.82628ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.0529L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.1729C18.943 33.6386 21.0318 33.6386 23.0407 33.1729L19.9874 19.9996L16.934 33.1729ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.0529C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.0529ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206794)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8137 6.50122C22.5552 6.60475 24.2083 7.03852 25.711 7.74062L22.8117 13.8691H17.3281L20.8137 6.50122Z" fill="#B3001E" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4794 6.7041C23.0768 6.81501 23.6605 6.96525 24.2281 7.15216L21.0504 13.8689H19.0898L22.4794 6.7041Z" fill="#D7B8B8" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9255 16.6427C16.9255 17.2419 16.439 17.7285 15.8397 17.7285C15.2404 17.7285 14.7539 17.2419 14.7539 16.6427V14.8061C14.7539 12.8268 16.3585 11.2222 18.3379 11.2222H21.6411C23.6206 11.2222 25.2253 12.8268 25.2253 14.8061V16.6427C25.2253 17.2419 24.7386 17.7285 24.1395 17.7285C23.54 17.7285 23.0536 17.2419 23.0536 16.6427V14.8061C23.0536 14.0261 22.4213 13.3938 21.6411 13.3938H18.3379C17.5578 13.3938 16.9255 14.0261 16.9255 14.8061V16.6427Z" fill="url(#paint2_linear_281_206794)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2797 6.49634L22.884 14.1152C22.884 14.1152 19.0026 14.1152 17.7709 14.1152C17.5447 14.1152 17.3388 13.9849 17.2421 13.7804L14.3672 7.70342C15.8765 7.01066 17.5346 6.58773 19.2797 6.49634Z" fill="url(#paint3_linear_281_206794)" />
                                            <path d="M19.9871 33.5221C25.0391 33.5221 29.1344 29.4268 29.1344 24.3748C29.1344 19.3229 25.0391 15.2275 19.9871 15.2275C14.9352 15.2275 10.8398 19.3229 10.8398 24.3748C10.8398 29.4268 14.9352 33.5221 19.9871 33.5221Z" fill="url(#paint4_linear_281_206794)" />
                                            <path d="M19.9881 31.3593C23.8454 31.3593 26.9723 28.2324 26.9723 24.3751C26.9723 20.5178 23.8454 17.3909 19.9881 17.3909C16.1308 17.3909 13.0039 20.5178 13.0039 24.3751C13.0039 28.2324 16.1308 31.3593 19.9881 31.3593Z" fill="url(#paint5_linear_281_206794)" />
                                            <path d="M19.9894 30.5597C23.4052 30.5597 26.1742 27.7907 26.1742 24.3749C26.1742 20.9592 23.4052 18.1902 19.9894 18.1902C16.5737 18.1902 13.8047 20.9592 13.8047 24.3749C13.8047 27.7907 16.5737 30.5597 19.9894 30.5597Z" fill="url(#paint6_linear_281_206794)" />
                                            <path d="M16.9805 26.3807V25.178L19.7353 21.2373H21.4003V25.0907H22.1151V26.3807H21.4003V27.5142H19.9094V26.3807H16.9805ZM20.0142 22.8763L18.5494 25.0907H20.0142V22.8763Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5417 6.70068L21.0493 14.1152C21.0493 14.1152 20.1389 14.1152 19.6091 14.1152C19.383 14.1152 19.1771 13.9848 19.0804 13.7804L15.9219 7.10404C16.4488 6.93744 16.9894 6.80226 17.5417 6.70068Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206794" x1="23.2261" y1="6.47747" x2="23.2261" y2="39.7406" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BE00FF" />
                                                <stop offset="1" stop-color="#5500FF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206794" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                <stop stop-color="#BE00FF" />
                                                <stop offset="1" stop-color="#BE00FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206794" x1="19.9895" y1="11.2222" x2="19.9895" y2="17.7285" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B1B1B1" />
                                                <stop offset="1" stop-color="#747474" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206794" x1="16.812" y1="7.77034" x2="19.0869" y2="14.9882" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E61A5E" />
                                                <stop offset="1" stop-color="#CC0022" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206794" x1="19.9871" y1="15.2275" x2="19.9871" y2="33.5221" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#747474" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206794" x1="19.9881" y1="21.1243" x2="19.9881" y2="33.5224" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206794" x1="19.9519" y1="30.5597" x2="19.9519" y2="18.1902" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#3A3A3A" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </div>
                                        <p className="tableimgtext">
                                          RUNNER UP
                                        </p>
                                      </div>
                                    </td>
                                    <td>Arcadia</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">

                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206820)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#FFE978" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#994000" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0713 10.8065C19.244 10.4597 19.598 10.2405 19.9855 10.2405C20.3729 10.2405 20.7269 10.4597 20.8996 10.8065C21.8034 12.6218 23.1263 15.2783 23.6586 16.3474C23.8058 16.6431 24.087 16.8493 24.4133 16.9009C25.6092 17.0899 28.6085 17.5641 30.652 17.8871C31.0366 17.9479 31.3532 18.2221 31.4683 18.594C31.5833 18.966 31.4768 19.371 31.1937 19.6383C29.7226 21.0274 27.5843 23.0468 26.7067 23.8754C26.4579 24.1104 26.3433 24.4544 26.4016 24.7916C26.6113 26.0077 27.1304 29.0154 27.4857 31.0741C27.5524 31.4607 27.3918 31.8512 27.0724 32.0791C26.7531 32.3069 26.3315 32.3317 25.9877 32.1427C24.181 31.1503 21.5565 29.7086 20.4772 29.1156C20.171 28.9474 19.8 28.9474 19.4938 29.1156C18.4144 29.7086 15.7899 31.1503 13.9833 32.1427C13.6394 32.3317 13.2178 32.3069 12.8985 32.0791C12.5791 31.8512 12.4185 31.4607 12.4852 31.0741C12.8405 29.0154 13.3595 26.0077 13.5694 24.7916C13.6276 24.4544 13.513 24.1104 13.2642 23.8754C12.3867 23.0468 10.2482 21.0274 8.77714 19.6383C8.49407 19.371 8.38762 18.966 8.50267 18.594C8.61773 18.2221 8.93426 17.9479 9.31883 17.8871C11.3623 17.5641 14.3618 17.0899 15.5577 16.9009C15.8839 16.8493 16.1651 16.6431 16.3124 16.3474C16.8447 15.2783 18.1674 12.6218 19.0713 10.8065Z" fill="url(#paint1_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.087 8.48181C19.2596 8.135 19.6137 7.91577 20.0011 7.91577C20.3885 7.91577 20.7426 8.135 20.9153 8.48181C21.8191 10.2971 23.142 12.9537 23.6743 14.0227C23.8215 14.3184 24.1026 14.5246 24.429 14.5762C25.6249 14.7652 28.6242 15.2394 30.6678 15.5624C31.0524 15.6232 31.369 15.8974 31.484 16.2693C31.599 16.6413 31.4926 17.0463 31.2095 17.3136C29.7383 18.7028 27.6 20.7221 26.7224 21.5507C26.4736 21.7857 26.359 22.1298 26.4173 22.4669C26.6271 23.6831 27.1461 26.6908 27.5014 28.7495C27.5681 29.1361 27.4075 29.5266 27.0881 29.7545C26.7688 29.9823 26.3472 30.007 26.0034 29.8181C24.1967 28.8256 21.5722 27.384 20.4929 26.791C20.1867 26.6228 19.8156 26.6228 19.5094 26.791C18.43 27.384 15.8056 28.8256 13.9989 29.8181C13.6551 30.007 13.2335 29.9823 12.9141 29.7545C12.5948 29.5266 12.4341 29.1361 12.5009 28.7495C12.8561 26.6908 13.3752 23.6831 13.585 22.4669C13.6432 22.1298 13.5286 21.7857 13.2798 21.5507C12.4023 20.7221 10.2638 18.7028 8.79277 17.3136C8.5097 17.0463 8.40324 16.6413 8.5183 16.2693C8.63335 15.8974 8.94989 15.6232 9.33446 15.5624C11.378 15.2394 14.3774 14.7652 15.5733 14.5762C15.8996 14.5246 16.1808 14.3184 16.328 14.0227C16.8603 12.9537 18.1831 10.2971 19.087 8.48181Z" fill="#FFDD32" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0039 7.91577C20.3913 7.91577 20.7454 8.13501 20.918 8.48181L23.6771 14.0227C23.7503 14.1699 23.8567 14.2949 23.9855 14.3897L20.0039 20.0196V7.91577Z" fill="url(#paint2_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9337 29.7613C12.9306 29.7592 12.9274 29.7569 12.9244 29.7547C12.6049 29.5268 12.4444 29.1362 12.511 28.7496L13.5953 22.4672C13.6245 22.2972 13.61 22.1256 13.5565 21.967L20.0113 20.0198L12.9337 29.7613Z" fill="url(#paint3_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0073 26.665C19.838 26.6649 19.6687 26.707 19.5155 26.7911L14.0051 29.8183C13.6647 30.0054 13.2479 29.9829 12.9297 29.7612L20.0073 20.0198L20.0073 26.665Z" fill="url(#paint4_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.993 14.3901C24.1229 14.4858 24.2753 14.5506 24.4392 14.5765L30.6781 15.5628C31.0626 15.6236 31.3792 15.8977 31.4942 16.2696C31.4961 16.2756 31.4978 16.2814 31.4995 16.2873L20.0114 20.02L23.993 14.3901Z" fill="url(#paint5_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 16.2871C31.6064 16.6542 31.4989 17.0508 31.2203 17.3138L26.7332 21.551C26.6098 21.6676 26.5194 21.8108 26.4667 21.967L20.0119 20.0198L31.5 16.2871Z" fill="url(#paint6_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4552 21.967C26.4017 22.1256 26.3872 22.2972 26.4165 22.4672L27.5007 28.7496C27.5674 29.1362 27.4068 29.5268 27.0874 29.7547C27.0843 29.7569 27.0811 29.7592 27.078 29.7613L20.0004 20.0198L26.4552 21.967Z" fill="url(#paint7_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0781 29.7612C26.7599 29.9829 26.3432 30.0054 26.0027 29.8183L20.4923 26.7911C20.3391 26.707 20.1698 26.6649 20.0005 26.665L20.0005 20.0198L27.0781 29.7612Z" fill="url(#paint8_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0184 14.3897C16.1472 14.2949 16.2536 14.1699 16.3268 14.0227L19.0859 8.48181C19.2585 8.13501 19.6126 7.91577 20 7.91577V20.0196L16.0184 14.3897Z" fill="url(#paint9_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52004 16.2873C8.52173 16.2814 8.52347 16.2756 8.52532 16.2696C8.64038 15.8977 8.95689 15.6236 9.34146 15.5628L15.5803 14.5765C15.7442 14.5506 15.8967 14.4858 16.0266 14.3901L20.0081 20.02L8.52004 16.2873Z" fill="url(#paint10_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5528 21.967C13.5002 21.8108 13.4097 21.6676 13.2863 21.551L8.79928 17.3138C8.52061 17.0508 8.41312 16.6542 8.51953 16.2871L20.0076 20.0198L13.5528 21.967Z" fill="url(#paint11_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.414 11.3362C24.3731 11.2712 24.3827 11.1846 24.438 11.1293C24.4934 11.074 24.5799 11.0644 24.6449 11.1053C24.6761 11.127 24.7098 11.1462 24.7386 11.1654C25.3759 11.567 26.1888 11.567 26.826 11.1654C26.8549 11.1462 26.8885 11.127 26.9198 11.1053C26.9847 11.0644 27.0713 11.074 27.1266 11.1293C27.1819 11.1846 27.1915 11.2712 27.1507 11.3362C27.129 11.3674 27.1098 11.4011 27.0906 11.4299C26.689 12.0672 26.689 12.8801 27.0906 13.5173C27.1098 13.5462 27.129 13.5798 27.1507 13.6111C27.1915 13.676 27.1819 13.7626 27.1266 13.8179C27.0713 13.8732 26.9847 13.8828 26.9198 13.842C26.8885 13.8203 26.8549 13.8011 26.826 13.7819C26.1888 13.3803 25.3759 13.3803 24.7386 13.7819C24.7098 13.8011 24.6761 13.8203 24.6449 13.842C24.5799 13.8828 24.4934 13.8732 24.438 13.8179C24.3827 13.7626 24.3731 13.676 24.414 13.6111C24.4357 13.5798 24.4549 13.5462 24.4741 13.5173C24.8757 12.8801 24.8757 12.0672 24.4741 11.4299C24.4549 11.4011 24.4357 11.3674 24.414 11.3362Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4805 23.9929C28.5388 23.93 28.635 23.9154 28.7107 23.9591C28.7864 24.0028 28.8218 24.0934 28.7964 24.1753C28.7821 24.2153 28.7711 24.2572 28.7587 24.2939C28.5095 25.0978 28.7446 25.9751 29.3623 26.5468C29.3914 26.5723 29.4219 26.6031 29.4543 26.6306C29.5172 26.6888 29.5319 26.7851 29.4882 26.8607C29.4445 26.9364 29.3538 26.9718 29.2719 26.9465C29.2319 26.9322 29.19 26.9212 29.1533 26.9087C28.3494 26.6596 27.4721 26.8947 26.9005 27.5124C26.8749 27.5415 26.8442 27.572 26.8167 27.6044C26.7584 27.6673 26.6622 27.682 26.5865 27.6383C26.5108 27.5946 26.4754 27.5039 26.5008 27.422C26.5151 27.382 26.5261 27.3401 26.5385 27.3034C26.7877 26.4995 26.5526 25.6222 25.9349 25.0506C25.9058 25.025 25.8753 24.9942 25.8429 24.9667C25.78 24.9085 25.7653 24.8123 25.809 24.7366C25.8527 24.6609 25.9434 24.6255 26.0253 24.6508C26.0653 24.6651 26.1072 24.6762 26.1439 24.6886C26.9478 24.9377 27.8251 24.7026 28.3967 24.0849C28.4223 24.0558 28.453 24.0253 28.4805 23.9929Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8242 12.9311C11.8044 12.867 11.8321 12.7962 11.8912 12.762C11.9504 12.7278 12.0256 12.7393 12.0712 12.7885C12.0927 12.8138 12.1167 12.8376 12.1367 12.8604C12.5836 13.3433 13.2694 13.5271 13.8979 13.3323C13.9266 13.3226 13.9593 13.314 13.9906 13.3028C14.0546 13.283 14.1255 13.3106 14.1596 13.3698C14.1938 13.429 14.1823 13.5042 14.1331 13.5497C14.1078 13.5712 14.084 13.5953 14.0612 13.6153C13.5783 14.0622 13.3946 14.748 13.5893 15.3764C13.5991 15.4051 13.6077 15.4379 13.6188 15.4691C13.6387 15.5332 13.611 15.604 13.5518 15.6382C13.4927 15.6724 13.4174 15.6609 13.3719 15.6117C13.3504 15.5864 13.3264 15.5626 13.3064 15.5398C12.8595 15.0569 12.1737 14.8731 11.5452 15.0679C11.5165 15.0776 11.4838 15.0862 11.4525 15.0974C11.3885 15.1172 11.3176 15.0896 11.2834 15.0304C11.2493 14.9712 11.2607 14.896 11.3099 14.8505C11.3352 14.829 11.3591 14.8049 11.3818 14.7849C11.8647 14.338 12.0485 13.6522 11.8537 13.0238C11.844 12.9951 11.8354 12.9623 11.8242 12.9311Z" fill="white" />
                                            <path d="M19.9832 27.0544C23.1863 27.0544 25.7829 24.4578 25.7829 21.2547C25.7829 18.0517 23.1863 15.4551 19.9832 15.4551C16.7802 15.4551 14.1836 18.0517 14.1836 21.2547C14.1836 24.4578 16.7802 27.0544 19.9832 27.0544Z" fill="url(#paint12_linear_281_206820)" />
                                            <path d="M19.9832 25.8C23.1863 25.8 25.7829 23.2034 25.7829 20.0003C25.7829 16.7973 23.1863 14.2007 19.9832 14.2007C16.7802 14.2007 14.1836 16.7973 14.1836 20.0003C14.1836 23.2034 16.7802 25.8 19.9832 25.8Z" fill="url(#paint13_linear_281_206820)" />
                                            <path d="M19.9851 19.3446C22.035 19.3446 23.6967 18.4193 23.6967 17.2779C23.6967 16.1365 22.035 15.2112 19.9851 15.2112C17.9352 15.2112 16.2734 16.1365 16.2734 17.2779C16.2734 18.4193 17.9352 19.3446 19.9851 19.3446Z" fill="url(#paint14_linear_281_206820)" />
                                            <path d="M22.3858 18.5352H19.3562V19.8752C19.4825 19.7295 19.667 19.613 19.9 19.5256C20.1331 19.4382 20.3855 19.3897 20.6574 19.3897C21.1429 19.3897 21.541 19.4965 21.8615 19.7198C22.1916 19.9432 22.4247 20.2248 22.5703 20.5743C22.716 20.9239 22.7937 21.3026 22.7937 21.7104C22.7937 22.4679 22.5801 23.0699 22.1528 23.5069C21.7255 23.9535 21.1235 24.1769 20.3467 24.1769C19.832 24.1769 19.3756 24.0895 18.9969 23.905C18.6182 23.7302 18.3172 23.4874 18.1133 23.167C17.9094 22.8466 17.7929 22.4873 17.7734 22.0697H19.3951C19.4339 22.2736 19.531 22.4387 19.6767 22.565C19.8223 22.7009 20.0262 22.7689 20.2884 22.7689C20.5894 22.7689 20.8225 22.6718 20.9681 22.4776C21.1138 22.2834 21.1915 22.0212 21.1915 21.7007C21.1915 21.3803 21.1138 21.1375 20.9584 20.9725C20.8031 20.8074 20.5797 20.72 20.2787 20.72C20.0554 20.72 19.8806 20.7783 19.7349 20.8754C19.5893 20.9822 19.5019 21.1278 19.4533 21.3026H17.8511V17.0786H22.3858V18.5352Z" fill="#1B4DB1" />
                                            <path d="M22.3858 17.9033H19.3562V19.2434C19.4825 19.0977 19.667 18.9812 19.9 18.8938C20.1331 18.8064 20.3855 18.7578 20.6574 18.7578C21.1429 18.7578 21.541 18.8647 21.8615 19.088C22.1916 19.3113 22.4247 19.5929 22.5703 19.9425C22.716 20.2921 22.7937 20.6708 22.7937 21.0786C22.7937 21.836 22.5801 22.4381 22.1528 22.875C21.7255 23.3217 21.1235 23.545 20.3467 23.545C19.832 23.545 19.3756 23.4576 18.9969 23.2731C18.6182 23.0984 18.3172 22.8556 18.1133 22.5352C17.9094 22.2147 17.7929 21.8554 17.7734 21.4379H19.3951C19.4339 21.6418 19.531 21.8069 19.6767 21.9331C19.8223 22.0691 20.0262 22.137 20.2884 22.137C20.5894 22.137 20.8225 22.0399 20.9681 21.8457C21.1138 21.6515 21.1915 21.3893 21.1915 21.0689C21.1915 20.7485 21.1138 20.5057 20.9584 20.3406C20.8031 20.1755 20.5797 20.0882 20.2787 20.0882C20.0554 20.0882 19.8806 20.1464 19.7349 20.2435C19.5893 20.3503 19.5019 20.496 19.4533 20.6708H17.8511V16.4468H22.3858V17.9033Z" fill="url(#paint15_linear_281_206820)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206820" x1="20" y1="4.72941" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFD500" />
                                                <stop offset="1" stop-color="#FF9500" />
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_281_206820" x1="20.0004" y1="12.8271" x2="20.0004" y2="39.2833" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2D1706" />
                                                <stop offset="1" stop-color="#2D1706" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206820" x1="20.0039" y1="6.87276" x2="20.0039" y2="19.9569" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206820" x1="12.2838" y1="30.6559" x2="19.9267" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206820" x1="12.1464" y1="30.8394" x2="20.0073" y2="20.0198" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FF8000" />
                                                <stop offset="1" stop-color="#E66000" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206820" x1="32.5148" y1="15.9574" x2="20.0114" y2="19.931" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206820" x1="32.5153" y1="15.9572" x2="20.0716" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206820" x1="27.7279" y1="30.6559" x2="20.085" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206820" x1="27.7281" y1="30.6558" x2="20.0374" y2="20.0705" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206820" x1="20" y1="6.64586" x2="20" y2="19.9307" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFEE99" />
                                                <stop offset="1" stop-color="#FFE666" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_206820" x1="7.76854" y1="16.0431" x2="19.9435" y2="19.931" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFE666" />
                                                <stop offset="1" stop-color="#FFDD33" />
                                              </linearGradient>
                                              <linearGradient id="paint11_linear_281_206820" x1="7.5042" y1="15.9572" x2="19.948" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint12_linear_281_206820" x1="21.1101" y1="19.2475" x2="21.1101" y2="28.8099" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CC4400" />
                                                <stop offset="1" stop-color="#CC4400" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint13_linear_281_206820" x1="19.9832" y1="6.13748" x2="19.9832" y2="25.8" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                              <linearGradient id="paint14_linear_281_206820" x1="19.9851" y1="12.3073" x2="19.9851" y2="19.3445" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B5EAFE" />
                                                <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint15_linear_281_206820" x1="20.2836" y1="16.4468" x2="20.2836" y2="29.9436" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          5 STARS
                                        </p>
                                      </div>
                                    </td>
                                    <td>Rewards</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206872)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#6699FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="url(#paint1_radial_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3766 27.1385C26.3766 28.4353 23.5215 29.4886 20.0047 29.4886C16.4879 29.4886 13.6328 28.4353 13.6328 27.1385V19.8022H26.3766V27.1385Z" fill="url(#paint2_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3462 14.887C19.755 14.6435 20.2633 14.6435 20.6721 14.887C22.6705 16.0681 28.6135 19.5871 30.4887 20.6951C30.6087 20.7682 30.6823 20.8961 30.6823 21.0361C30.6823 21.1761 30.6087 21.304 30.4887 21.374C28.6135 22.4851 22.6705 26.0041 20.6721 27.1852C20.2633 27.4287 19.755 27.4287 19.3462 27.1852C17.3477 26.0041 11.4045 22.4851 9.52945 21.374C9.40951 21.304 9.33594 21.1761 9.33594 21.0361C9.33594 20.8961 9.40951 20.7682 9.52945 20.6951C11.4045 19.5871 17.3477 16.0681 19.3462 14.887Z" fill="url(#paint3_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6565 21.407C19.4521 21.2852 19.3843 21.0204 19.5053 20.8164C19.6263 20.6125 19.8907 20.5425 20.0949 20.6642L25.679 23.9701C25.8099 24.0462 25.8903 24.1893 25.8903 24.3415V30.2288C25.8903 30.4662 25.6973 30.6611 25.4598 30.6611C25.2221 30.6611 25.0294 30.4662 25.0294 30.2288V24.585L19.6565 21.407Z" fill="white" />
                                            <path d="M19.8884 21.1838C23.4597 21.1838 26.3549 18.2886 26.3549 14.7172C26.3549 11.1459 23.4597 8.25073 19.8884 8.25073C16.317 8.25073 13.4219 11.1459 13.4219 14.7172C13.4219 18.2886 16.317 21.1838 19.8884 21.1838Z" fill="url(#paint4_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.8832 11.9494C25.0635 11.8493 25.1922 11.6765 25.2365 11.4751C25.2808 11.2736 25.2365 11.0629 25.1148 10.8963C23.9068 9.24639 21.9744 8.25073 19.8977 8.25073C17.9025 8.25073 16.0406 9.1697 14.8262 10.705C14.6627 10.9126 14.5984 11.1815 14.6505 11.4406C14.7026 11.6997 14.8657 11.9229 15.0967 12.0511C15.1033 12.0554 15.11 12.0592 15.1167 12.0629C15.3671 12.202 15.6821 12.1294 15.8465 11.8947C16.7632 10.5782 18.2725 9.77971 19.8977 9.77971C21.4522 9.77971 22.9008 10.5104 23.8262 11.726C24.0737 12.0532 24.5243 12.1483 24.8829 11.9492C24.8831 11.9494 24.8831 11.9494 24.8832 11.9494Z" fill="url(#paint5_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9059 17.4849C14.7256 17.585 14.5969 17.7578 14.5526 17.9592C14.5082 18.1607 14.5525 18.3715 14.6742 18.538C15.8822 20.1879 17.8146 21.1836 19.8914 21.1836C21.8866 21.1836 23.7485 20.2646 24.9628 18.7294C25.1264 18.5217 25.1907 18.2528 25.1386 17.9938C25.0865 17.7346 24.9233 17.5115 24.6923 17.3832C24.6858 17.3789 24.6791 17.3752 24.6724 17.3714C24.4219 17.2324 24.1069 17.305 23.9426 17.5396C23.0258 18.8561 21.5165 19.6546 19.8914 19.6546C18.3368 19.6546 16.8883 18.924 15.9629 17.7083C15.7153 17.3812 15.2648 17.286 14.9062 17.4851C14.906 17.4849 14.906 17.4849 14.9059 17.4849Z" fill="url(#paint6_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.201 9.51155C22.2855 9.32259 22.2845 9.10638 22.1983 8.91813C22.1121 8.72996 21.949 8.58794 21.7508 8.52841C21.1441 8.34475 20.5122 8.25073 19.8754 8.25073C19.3187 8.25073 18.7658 8.32257 18.2303 8.46344C17.9741 8.5317 17.7608 8.70885 17.6467 8.94811C17.5326 9.18737 17.5292 9.46462 17.6373 9.70659C17.6403 9.71432 17.6437 9.7219 17.6471 9.72949C17.7628 9.98842 18.0554 10.1181 18.3249 10.0298C18.824 9.86436 19.3474 9.77971 19.8754 9.77971C20.3326 9.77971 20.7864 9.84318 21.2241 9.96746C21.6178 10.0796 22.034 9.88532 22.201 9.51162C22.201 9.51162 22.201 9.51155 22.201 9.51155Z" fill="#CCEEFF" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5646 19.922C17.4802 20.111 17.4812 20.3272 17.5674 20.5155C17.6535 20.7036 17.8166 20.8457 18.0148 20.9052C18.6216 21.0888 19.2534 21.1829 19.8903 21.1829C20.447 21.1829 20.9998 21.111 21.5354 20.9701C21.7915 20.9019 22.0048 20.7247 22.1189 20.4855C22.233 20.2462 22.2365 19.969 22.1283 19.727C22.1253 19.7193 22.1219 19.7117 22.1185 19.7041C22.0029 19.4452 21.7102 19.3155 21.4407 19.4037C20.9416 19.5692 20.4182 19.6539 19.8903 19.6539C19.4331 19.6539 18.9792 19.5904 18.5416 19.4661C18.1478 19.354 17.7316 19.5483 17.5647 19.922C17.5646 19.922 17.5646 19.922 17.5646 19.922Z" fill="#0F388A" />
                                            <path d="M19.8827 19.6543C22.6095 19.6543 24.82 17.4437 24.82 14.7169C24.82 11.9901 22.6095 9.77954 19.8827 9.77954C17.1558 9.77954 14.9453 11.9901 14.9453 14.7169C14.9453 17.4437 17.1558 19.6543 19.8827 19.6543Z" fill="#78D2FF" />
                                            <path d="M19.88 19.0889C22.2947 19.0889 24.2522 17.1314 24.2522 14.7167C24.2522 12.302 22.2947 10.3445 19.88 10.3445C17.4653 10.3445 15.5078 12.302 15.5078 14.7167C15.5078 17.1314 17.4653 19.0889 19.88 19.0889Z" fill="#005CB2" />
                                            <path d="M22.6017 13.9018C22.4545 13.5536 22.2436 13.2406 21.9756 12.9719L21.9763 12.971L22.7934 12.2651L21.0302 13.2089H21.03L18.2723 14.685L19.4318 15.321L18.3424 16.4767L18.3302 16.4892C17.9619 16.1055 17.7354 15.586 17.7354 15.0148C17.7354 13.8365 18.6989 12.878 19.8831 12.878C20.1083 12.878 20.3255 12.9128 20.5295 12.977L21.4008 12.5236C21.2856 12.4548 21.1653 12.3938 21.0406 12.341C20.6788 12.1878 20.2945 12.1104 19.8985 12.1104C19.5027 12.1104 19.1184 12.188 18.7565 12.341C18.407 12.4887 18.0934 12.7002 17.824 12.9695C17.5546 13.2388 17.3433 13.5524 17.1955 13.9018C17.0424 14.2637 16.9648 14.648 16.9648 15.0439C16.9648 15.4398 17.0424 15.8241 17.1955 16.1859C17.3329 16.5112 17.5259 16.8055 17.7693 17.0621L17.0505 17.7334L21.3457 15.3135L20.3264 14.6466L21.4235 13.5297L21.4243 13.5288C21.7991 13.9136 22.0303 14.4378 22.0303 15.0149C22.0303 16.1932 21.0668 17.1517 19.8826 17.1517C19.6384 17.1517 19.4037 17.1108 19.1849 17.0359L18.3062 17.5085C18.4484 17.6007 18.5987 17.6804 18.7565 17.747C19.1182 17.9002 19.5024 17.9776 19.8985 17.9776C20.2943 17.9776 20.6786 17.9 21.0406 17.747C21.39 17.5993 21.7036 17.3878 21.973 17.1185C22.2424 16.8492 22.4537 16.5355 22.6015 16.1862C22.7546 15.8243 22.8321 15.44 22.8321 15.0441C22.8325 14.6478 22.7547 14.2637 22.6017 13.9018Z" fill="url(#paint7_linear_281_206872)" />
                                            <path d="M22.6017 13.4731C22.4545 13.1249 22.2436 12.8119 21.9756 12.5432L21.9763 12.5423L22.7934 11.8364L21.0302 12.7801H21.03L18.2723 14.2563L19.4318 14.8923L18.3424 16.0479L18.3302 16.0605C17.9619 15.6768 17.7354 15.1573 17.7354 14.5861C17.7354 13.4078 18.6989 12.4493 19.8831 12.4493C20.1083 12.4493 20.3255 12.4841 20.5295 12.5483L21.4008 12.0949C21.2856 12.0261 21.1653 11.9651 21.0406 11.9123C20.6788 11.7591 20.2945 11.6816 19.8985 11.6816C19.5027 11.6816 19.1184 11.7593 18.7565 11.9123C18.407 12.0599 18.0934 12.2715 17.824 12.5408C17.5546 12.81 17.3433 13.1237 17.1955 13.4731C17.0424 13.835 16.9648 14.2193 16.9648 14.6152C16.9648 15.011 17.0424 15.3953 17.1955 15.7572C17.3329 16.0825 17.5259 16.3768 17.7693 16.6334L17.0505 17.3047L21.3457 14.8848L20.3264 14.2178L21.4235 13.101L21.4243 13.1001C21.7991 13.4849 22.0303 14.0091 22.0303 14.5862C22.0303 15.7645 21.0668 16.723 19.8826 16.723C19.6384 16.723 19.4037 16.6821 19.1849 16.6072L18.3062 17.0798C18.4484 17.1719 18.5987 17.2516 18.7565 17.3183C19.1182 17.4715 19.5024 17.5489 19.8985 17.5489C20.2943 17.5489 20.6786 17.4712 21.0406 17.3183C21.39 17.1706 21.7036 16.9591 21.973 16.6898C22.2424 16.4205 22.4537 16.1068 22.6015 15.7574C22.7546 15.3956 22.8321 15.0113 22.8321 14.6154C22.8325 14.2191 22.7547 13.835 22.6017 13.4731Z" fill="url(#paint8_linear_281_206872)" />
                                            <path d="M25.4675 31.7485C26.0925 31.7485 26.5991 31.2419 26.5991 30.6169C26.5991 29.992 26.0925 29.4854 25.4675 29.4854C24.8426 29.4854 24.3359 29.992 24.3359 30.6169C24.3359 31.2419 24.8426 31.7485 25.4675 31.7485Z" fill="url(#paint9_linear_281_206872)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206872" x1="20.7782" y1="12.6362" x2="20.7782" y2="39.5661" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0056FF" />
                                                <stop offset="1" stop-color="#003499" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206872" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(13.5226)">
                                                <stop stop-color="#3378FF" />
                                                <stop offset="1" stop-color="#002366" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206872" x1="19.966" y1="43.4001" x2="19.966" y2="19.4961" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#262626" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206872" x1="19.942" y1="36.5458" x2="19.942" y2="14.7051" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#262626" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206872" x1="20.228" y1="10.763" x2="20.228" y2="21.1749" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206872" x1="19.8978" y1="8.25073" x2="19.8978" y2="14.7173" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#78D2FF" />
                                                <stop offset="1" stop-color="#00A6F9" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206872" x1="19.8914" y1="14.7171" x2="19.8914" y2="21.1836" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2F74FF" />
                                                <stop offset="1" stop-color="#144BB8" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206872" x1="20.2234" y1="13.3578" x2="21.14" y2="17.6184" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#006699" />
                                                <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206872" x1="21.2786" y1="12.6472" x2="12.8484" y2="22.2732" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206872" x1="25.4675" y1="29.7524" x2="25.4675" y2="31.748" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFD500" />
                                                <stop offset="1" stop-color="#FF9500" />
                                              </linearGradient>
                                            </defs>
                                          </svg>



                                        </div>
                                        <p className="tableimgtext">
                                          Empower
                                        </p>
                                      </div>
                                    </td>
                                    <td>Techwiz</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
                                            <path d="M19.3605 38.7211C30.053 38.7211 38.7211 30.053 38.7211 19.3605C38.7211 8.668 30.053 0 19.3605 0C8.668 0 0 8.668 0 19.3605C0 30.053 8.668 38.7211 19.3605 38.7211Z" fill="#FF0055" />
                                            <path d="M19.3526 34.1424C27.5166 34.1424 34.1348 27.5242 34.1348 19.3601C34.1348 11.1961 27.5166 4.57788 19.3526 4.57788C11.1886 4.57788 4.57031 11.1961 4.57031 19.3601C4.57031 27.5242 11.1886 34.1424 19.3526 34.1424Z" fill="#FF9999" />
                                            <path d="M19.3597 32.4509C26.5892 32.4509 32.4499 26.5902 32.4499 19.3607C32.4499 12.1312 26.5892 6.27051 19.3597 6.27051C12.1302 6.27051 6.26953 12.1312 6.26953 19.3607C6.26953 26.5902 12.1302 32.4509 19.3597 32.4509Z" fill="#990033" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3154 6.60858C20.3707 6.15782 18.3487 6.15782 16.4039 6.60858L19.3597 19.3607L22.3154 6.60858ZM12.4327 8.25353C10.7388 9.30993 9.30895 10.7398 8.25255 12.4336L19.3597 19.3607L12.4327 8.25353ZM6.6076 16.4049C6.15684 18.3497 6.15684 20.3717 6.6076 22.3164L19.3597 19.3607L6.6076 16.4049ZM8.25255 26.2878C9.30895 27.9816 10.7388 29.4114 12.4327 30.4678L19.3597 19.3607L8.25255 26.2878ZM16.4039 32.1128C18.3487 32.5636 20.3707 32.5636 22.3154 32.1128L19.3597 19.3607L16.4039 32.1128ZM26.2868 30.4678C27.9807 29.4114 29.4104 27.9816 30.4669 26.2878L19.3597 19.3607L26.2868 30.4678ZM32.1119 22.3164C32.5626 20.3717 32.5626 18.3497 32.1119 16.4049L19.3597 19.3607L32.1119 22.3164ZM30.4669 12.4336C29.4104 10.7398 27.9807 9.30993 26.2868 8.25353L19.3597 19.3607L30.4669 12.4336Z" fill="url(#paint0_radial_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5703 28.6587C26.2043 31.0025 22.9496 32.4509 19.3596 32.4509C15.7696 32.4509 12.5149 31.0025 10.1489 28.6587C10.6137 25.3864 13.4267 22.87 16.8272 22.87H21.8921C25.2925 22.87 28.1055 25.3864 28.5703 28.6587Z" fill="url(#paint1_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8783 19.5125H16.8359V23.9327C16.8359 24.6013 17.1015 25.2426 17.5744 25.7153C18.0472 26.1882 18.6884 26.4538 19.3571 26.4538C20.0257 26.4538 20.667 26.1882 21.1398 25.7153C21.6127 25.2426 21.8783 24.6013 21.8783 23.9327V19.5125Z" fill="#F57D3D" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3978 19.0032C26.3978 18.0562 25.6301 17.2886 24.6831 17.2886H14.0389C13.0919 17.2886 12.3242 18.0562 12.3242 19.0032C12.3242 19.9502 13.0919 20.7179 14.0389 20.7179H24.6831C25.6301 20.7179 26.3978 19.9502 26.3978 19.0032Z" fill="url(#paint2_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6507 14.168H14.0781V18.4626C14.0781 21.3821 16.4448 23.7489 19.3644 23.7489C20.7664 23.7489 22.111 23.192 23.1024 22.2005C24.0938 21.2092 24.6507 19.8646 24.6507 18.4626V14.168Z" fill="url(#paint3_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.089 18.4645C14.089 18.4645 12.1373 16.0098 12.7288 13.4437C13.3201 10.8777 15.2596 10.9903 15.2596 10.9903C15.2596 10.9903 15.4626 9.07198 18.7785 8.73562C22.0945 8.39926 24.9837 10.7291 26.412 9.88122C26.412 9.88122 26.4066 11.8773 25.546 13.0282C25.546 13.0282 26.8413 15.8058 24.6616 18.463C24.6616 18.463 24.5873 15.3435 23.5511 14.1399C23.5511 14.1399 17.896 17.7186 15.6305 14.1399C15.6305 14.1399 14.089 15.6526 14.089 18.4645Z" fill="url(#paint4_linear_281_206910)" />
                                            <path d="M19.3747 39.9999C23.1154 39.9999 26.1479 36.9675 26.1479 33.2268C26.1479 29.4861 23.1154 26.4536 19.3747 26.4536C15.634 26.4536 12.6016 29.4861 12.6016 33.2268C12.6016 36.9675 15.634 39.9999 19.3747 39.9999Z" fill="url(#paint5_linear_281_206910)" />
                                            <path d="M19.3659 32.461C21.7599 32.461 23.7006 31.3804 23.7006 30.0474C23.7006 28.7144 21.7599 27.6338 19.3659 27.6338C16.9719 27.6338 15.0312 28.7144 15.0312 30.0474C15.0312 31.3804 16.9719 32.461 19.3659 32.461Z" fill="url(#paint6_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7144 33.821L21.777 30.5305C22.1952 30.0817 22.899 30.0562 23.3478 30.4739C23.7966 30.8916 23.8221 31.5951 23.4039 32.0442L19.9767 35.7267C19.6503 36.0789 19.1913 36.2783 18.7093 36.2772C18.2299 36.2762 17.7709 36.0745 17.4445 35.7211L15.3254 33.4215C14.9098 32.9706 14.9378 32.267 15.3892 31.8514C15.8405 31.4357 16.5418 31.4643 16.9574 31.9151L18.7144 33.821Z" fill="white" />
                                            <defs>
                                              <radialGradient id="paint0_radial_281_206910" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.3597 19.3607) scale(21.1659 21.1659)">
                                                <stop stop-color="#FF9F66" />
                                                <stop offset="1" stop-color="#FF9F66" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint1_linear_281_206910" x1="19.3596" y1="32.4509" x2="19.3596" y2="17.2895" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FF9500" />
                                                <stop offset="1" stop-color="#FFD500" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206910" x1="21.8821" y1="14.1676" x2="21.8821" y2="19.5115" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FED9B4" />
                                                <stop offset="1" stop-color="#F79E61" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206910" x1="19.8119" y1="8.15771" x2="19.8119" y2="23.73" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FED9B4" />
                                                <stop offset="1" stop-color="#F79E61" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206910" x1="19.5146" y1="20.7186" x2="19.5146" y2="8.70243" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#49200A" />
                                                <stop offset="1" stop-color="#A67459" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206910" x1="19.3747" y1="17.0369" x2="19.3747" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206910" x1="19.3659" y1="24.2424" x2="19.3659" y2="32.4609" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B5EAFE" />
                                                <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </div>
                                        <p className="tableimgtext">
                                          LOOKING GOOD
                                        </p>
                                      </div>
                                    </td>
                                    <td>Launchpad</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1811 11.5727C35.8045 11.2266 36.2475 10.6278 36.3957 9.93051C36.5442 9.23323 36.3836 8.50564 35.9552 7.93583C32.2079 2.98053 26.321 0 20.0019 0C13.6828 0 7.79585 2.98053 4.04923 7.93627C3.62104 8.50608 3.46038 9.23323 3.60864 9.93029C3.75713 10.6273 4.19993 11.2262 4.82307 11.572C4.85781 11.5922 4.89278 11.6116 4.92752 11.6309C5.85494 12.1458 7.02068 11.8874 7.6436 11.0285C10.4938 7.10113 15.0758 4.72892 20.0019 4.72892C24.8914 4.72892 29.442 7.06594 32.2966 10.9416C32.962 11.848 34.1977 12.1184 35.1809 11.5725C35.1811 11.5727 35.1811 11.5727 35.1811 11.5727Z" fill="url(#paint1_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8189 28.4273C4.19554 28.7734 3.75252 29.3722 3.60425 30.0695C3.45577 30.7668 3.61643 31.4944 4.04484 32.0642C7.79213 37.0195 13.679 40 19.9981 40C26.3172 40 32.2041 37.0195 35.9508 32.0637C36.379 31.4939 36.5396 30.7668 36.3914 30.0697C36.2429 29.3727 35.8001 28.7738 35.1769 28.428C35.1422 28.4078 35.1072 28.3884 35.0725 28.3691C34.1451 27.8542 32.9793 28.1126 32.3564 28.9715C29.5062 32.8989 24.9242 35.2711 19.9981 35.2711C15.1086 35.2711 10.558 32.9341 7.70339 29.0584C7.03798 28.152 5.80231 27.8816 4.81913 28.4275C4.8189 28.4273 4.8189 28.4273 4.8189 28.4273Z" fill="#808080" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0732 4.14848C27.3642 3.49657 27.3584 2.75039 27.0573 2.10312C26.7561 1.45585 26.1887 0.97101 25.5025 0.774286C23.7149 0.261783 21.8601 0 19.9913 0C18.1226 0 16.2677 0.261783 14.4802 0.774286C13.7939 0.971232 13.2268 1.45585 12.9254 2.10312C12.6242 2.75039 12.6185 3.49657 12.9097 4.14848C12.9261 4.18521 12.9424 4.22195 12.9588 4.25868C13.3905 5.22505 14.4744 5.7183 15.4866 5.40916C16.9422 4.95906 18.4607 4.72892 19.9913 4.72892C21.4863 4.72892 22.9696 4.94844 24.3945 5.37751C25.4691 5.69816 26.6151 5.17238 27.0728 4.14826C27.0732 4.14848 27.0732 4.14848 27.0732 4.14848Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9268 35.8515C12.6358 36.5034 12.6416 37.2496 12.9427 37.8969C13.2439 38.5441 13.8113 39.029 14.4975 39.2257C16.2851 39.7382 18.1399 40 20.0087 40C21.8774 40 23.7323 39.7382 25.5198 39.2257C26.2061 39.0288 26.7732 38.5441 27.0746 37.8969C27.3758 37.2496 27.3815 36.5034 27.0903 35.8515C27.0739 35.8148 27.0576 35.7781 27.0412 35.7413C26.6095 34.775 25.5256 34.2817 24.5134 34.5908C23.0578 35.0409 21.5393 35.2711 20.0087 35.2711C18.5137 35.2711 17.0304 35.0516 15.6055 34.6225C14.5309 34.3018 13.3849 34.8276 12.9272 35.8517C12.9268 35.8515 12.9268 35.8515 12.9268 35.8515Z" fill="#666666" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#E6E6E6" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#808080" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 11.6357C19.2939 11.3067 19.6298 11.0986 19.9974 11.0986C20.365 11.0986 20.701 11.3067 20.8649 11.6357C21.7224 13.3582 22.9777 15.8789 23.4827 16.8932C23.6224 17.1738 23.8892 17.3695 24.1988 17.4184C25.3336 17.5978 28.1795 18.0477 30.1185 18.3542C30.4835 18.4119 30.7839 18.672 30.893 19.025C31.0021 19.3779 30.9012 19.7622 30.6325 20.0158C29.2367 21.3339 27.2076 23.25 26.3749 24.0362C26.1389 24.2592 26.0302 24.5856 26.0855 24.9056C26.2845 26.0595 26.777 28.9134 27.1141 30.8668C27.1774 31.2336 27.025 31.6042 26.7219 31.8204C26.419 32.0365 26.0189 32.0601 25.6927 31.8808C23.9784 30.9391 21.4882 29.5711 20.464 29.0085C20.1735 28.8489 19.8214 28.8489 19.5309 29.0085C18.5067 29.5711 16.0165 30.9391 14.3022 31.8808C13.976 32.0601 13.5759 32.0365 13.2729 31.8204C12.9699 31.6042 12.8175 31.2336 12.8808 30.8668C13.2179 28.9134 13.7104 26.0595 13.9095 24.9056C13.9647 24.5856 13.856 24.2592 13.6199 24.0362C12.7873 23.25 10.7582 21.3339 9.36233 20.0158C9.09374 19.7622 8.99273 19.3779 9.1019 19.025C9.21107 18.672 9.51142 18.4119 9.87632 18.3542C11.8153 18.0477 14.6614 17.5978 15.7961 17.4184C16.1057 17.3695 16.3725 17.1738 16.5122 16.8932C17.0173 15.8789 18.2724 13.3582 19.13 11.6357Z" fill="url(#paint2_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 9.02463C19.2939 8.69557 19.6298 8.48755 19.9974 8.48755C20.365 8.48755 20.701 8.69557 20.8649 9.02463C21.7224 10.7471 22.9777 13.2678 23.4827 14.2821C23.6224 14.5627 23.8892 14.7584 24.1988 14.8073C25.3336 14.9867 28.1795 15.4366 30.1185 15.7431C30.4835 15.8008 30.7839 16.0609 30.893 16.4139C31.0021 16.7668 30.9012 17.1511 30.6325 17.4047C29.2367 18.7228 27.2076 20.6389 26.3749 21.4252C26.1389 21.6481 26.0302 21.9746 26.0855 22.2945C26.2845 23.4484 26.777 26.3023 27.1141 28.2557C27.1774 28.6225 27.025 28.9931 26.7219 29.2093C26.419 29.4255 26.0189 29.449 25.6927 29.2697C23.9784 28.328 21.4882 26.96 20.464 26.3974C20.1735 26.2378 19.8214 26.2378 19.5309 26.3974C18.5067 26.96 16.0165 28.328 14.3022 29.2697C13.976 29.449 13.5759 29.4255 13.2729 29.2093C12.9699 28.9931 12.8175 28.6225 12.8808 28.2557C13.2179 26.3023 13.7104 23.4484 13.9095 22.2945C13.9647 21.9746 13.856 21.6481 13.6199 21.4252C12.7873 20.6389 10.7582 18.7228 9.36233 17.4047C9.09374 17.1511 8.99273 16.7668 9.1019 16.4139C9.21107 16.0609 9.51142 15.8008 9.87632 15.7431C11.8153 15.4366 14.6614 14.9867 15.7961 14.8073C16.1057 14.7584 16.3725 14.5627 16.5122 14.2821C17.0173 13.2678 18.2724 10.7471 19.13 9.02463Z" fill="#999999" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.48755C20.3676 8.48755 20.7036 8.69557 20.8673 9.02464L23.4853 14.2821C23.5548 14.4218 23.6557 14.5404 23.7779 14.6303L20 19.9724V8.48755Z" fill="url(#paint3_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2853 29.2152C13.2823 29.2131 13.2793 29.211 13.2764 29.2089C12.9733 28.9927 12.8209 28.6221 12.8842 28.2552L13.913 22.2941C13.9407 22.1328 13.927 21.97 13.8762 21.8195L20.0009 19.9719L13.2853 29.2152Z" fill="url(#paint4_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0008 26.277C19.8401 26.2769 19.6795 26.3168 19.5342 26.3966L14.3055 29.269C13.9825 29.4465 13.5871 29.4252 13.2852 29.2148L20.0008 19.9716L20.0008 26.277Z" fill="url(#paint5_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7753 14.6299C23.8986 14.7207 24.0433 14.7823 24.1988 14.8068L30.1185 15.7427C30.4835 15.8004 30.7838 16.0604 30.8929 16.4134C30.8947 16.419 30.8964 16.4245 30.898 16.4301L19.9974 19.9719L23.7753 14.6299Z" fill="url(#paint6_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8984 16.4299C30.9994 16.7782 30.8974 17.1545 30.633 17.4041L26.3755 21.4246C26.2584 21.5352 26.1725 21.6711 26.1226 21.8193L19.9979 19.9717L30.8984 16.4299Z" fill="url(#paint7_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.1238 21.8195C26.073 21.97 26.0593 22.1328 26.087 22.2941L27.1158 28.2552C27.1791 28.6221 27.0267 28.9927 26.7236 29.2089C26.7207 29.211 26.7177 29.2131 26.7147 29.2152L19.9991 19.9719L26.1238 21.8195Z" fill="url(#paint8_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7148 29.2148C26.4129 29.4252 26.0175 29.4465 25.6945 29.269L20.4658 26.3966C20.3205 26.3168 20.1599 26.2769 19.9992 26.277L19.9992 19.9716L26.7148 29.2148Z" fill="url(#paint9_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2221 14.6303C16.3443 14.5404 16.4452 14.4218 16.5147 14.2821L19.1327 9.02464C19.2964 8.69557 19.6324 8.48755 20 8.48755V19.9724L16.2221 14.6303Z" fill="url(#paint10_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.10204 16.4301C9.10365 16.4245 9.1053 16.419 9.10705 16.4134C9.21623 16.0604 9.51655 15.8004 9.88145 15.7427L15.8012 14.8068C15.9567 14.7823 16.1014 14.7207 16.2247 14.6299L20.0026 19.9719L9.10204 16.4301Z" fill="url(#paint11_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8774 21.8193C13.8275 21.6711 13.7416 21.5352 13.6245 21.4246L9.36701 17.4041C9.10259 17.1545 9.0006 16.7782 9.10156 16.4299L20.0021 19.9717L13.8774 21.8193Z" fill="url(#paint12_linear_281_206937)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206937" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#999999" />
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_281_206937" x1="2.51592" y1="0.213543" x2="2.51592" y2="12.5285" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206937" x1="20.8582" y1="17.3315" x2="20.8582" y2="34.5769" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#4D4D4D" />
                                                <stop offset="1" stop-color="#4D4D4D" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#CCCCCC" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206937" x1="12.6686" y1="30.064" x2="19.9164" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206937" x1="12.6685" y1="30.0637" x2="19.9658" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#999999" />
                                                <stop offset="1" stop-color="#666666" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206937" x1="31.8614" y1="16.1171" x2="19.9974" y2="19.8874" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206937" x1="31.8618" y1="16.1169" x2="20.0545" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#808080" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206937" x1="27.3314" y1="30.064" x2="20.0836" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206937" x1="27.3315" y1="30.0637" x2="20.0342" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#737373" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint11_linear_281_206937" x1="8.13864" y1="16.1171" x2="23.732" y2="21.0969" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint12_linear_281_206937" x1="8.13816" y1="16.1169" x2="19.9455" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#808080" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          SILVER
                                        </p>
                                      </div>
                                    </td>
                                    <td>Staking</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">

                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M19.9998 39.3097C31.0453 39.3097 39.9995 30.5099 39.9995 19.6547C39.9995 8.79958 31.0453 -0.000244141 19.9998 -0.000244141C8.9542 -0.000244141 0 8.79958 0 19.6547C0 30.5099 8.9542 39.3097 19.9998 39.3097Z" fill="url(#paint0_linear_281_207109)" />
                                            <path d="M19.9969 34.6614C28.4305 34.6614 35.2672 27.9425 35.2672 19.6543C35.2672 11.3661 28.4305 4.64722 19.9969 4.64722C11.5633 4.64722 4.72656 11.3661 4.72656 19.6543C4.72656 27.9425 11.5633 34.6614 19.9969 34.6614Z" fill="#78D2FF" />
                                            <path d="M19.9872 32.9435C27.4555 32.9435 33.5096 26.9937 33.5096 19.6543C33.5096 12.3148 27.4555 6.36499 19.9872 6.36499C12.519 6.36499 6.46484 12.3148 6.46484 19.6543C6.46484 26.9937 12.519 32.9435 19.9872 32.9435Z" fill="#0A265C" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48992 20.3093C6.47844 20.0922 6.47266 19.8751 6.47266 19.6551C6.47266 17.7911 6.86579 16.0146 7.57166 14.4044L19.9962 17.2328L6.48992 20.3093ZM19.9962 17.2328L9.76962 10.9641C10.9375 9.63868 12.3665 8.54174 13.9791 7.75216L19.9962 17.2328ZM19.9962 17.2328L17.4855 6.59599C18.3004 6.44371 19.1382 6.36475 19.9962 6.36475C20.8541 6.36475 21.692 6.44371 22.5069 6.59599L19.9962 17.2328ZM19.9962 17.2328L26.0133 7.75216C27.6259 8.54174 29.0549 9.63868 30.2228 10.9641L19.9962 17.2328ZM19.9962 17.2328L32.4207 14.4044C33.1266 16.0146 33.5197 17.7911 33.5197 19.6551C33.5197 19.8751 33.5139 20.0922 33.5025 20.3093L19.9962 17.2328ZM32.4408 24.8607C31.5197 26.9785 30.0563 28.8143 28.2228 30.1989L19.9962 17.2328L32.4408 24.8607ZM23.5887 32.4689C22.4438 32.7791 21.2415 32.9455 19.9962 32.9455C18.7509 32.9455 17.5486 32.7791 16.4037 32.4689L19.9962 17.2328L23.5887 32.4689ZM11.7696 30.1989C9.93607 28.8143 8.47268 26.9785 7.5516 24.8607L19.9962 17.2328L11.7696 30.1989Z" fill="url(#paint1_radial_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6144 9.784C28.6592 9.7364 28.7333 9.72529 28.7916 9.75836C28.8499 9.79143 28.8771 9.86005 28.8576 9.92203C28.8466 9.9523 28.8381 9.98399 28.8286 10.0118C28.6367 10.6202 28.8177 11.2841 29.2934 11.7167C29.3158 11.736 29.3393 11.7593 29.3642 11.7801C29.4127 11.8242 29.424 11.897 29.3903 11.9543C29.3567 12.0116 29.2868 12.0384 29.2238 12.0192C29.193 12.0084 29.1607 12 29.1325 11.9906C28.5134 11.8021 27.8378 11.98 27.3976 12.4475C27.3779 12.4695 27.3543 12.4925 27.3331 12.5171C27.2882 12.5647 27.2141 12.5758 27.1559 12.5427C27.0976 12.5096 27.0703 12.441 27.0898 12.379C27.1009 12.3488 27.1093 12.3171 27.1189 12.2893C27.3107 11.6809 27.1297 11.017 26.654 10.5844C26.6316 10.565 26.6082 10.5417 26.5832 10.5209C26.5348 10.4769 26.5235 10.404 26.5571 10.3468C26.5908 10.2895 26.6606 10.2627 26.7237 10.2819C26.7545 10.2927 26.7867 10.301 26.815 10.3104C27.4341 10.499 28.1096 10.3211 28.5498 9.85361C28.5695 9.83158 28.5932 9.80852 28.6144 9.784Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4521 18.7749C10.4326 18.713 10.4599 18.6443 10.5182 18.6113C10.5764 18.5782 10.6505 18.5893 10.6954 18.6369C10.7166 18.6614 10.7403 18.6845 10.76 18.7065C11.2001 19.174 11.8757 19.3519 12.4948 19.1633C12.523 19.1539 12.5553 19.1456 12.5861 19.1348C12.6491 19.1156 12.719 19.1424 12.7526 19.1997C12.7863 19.2569 12.775 19.3298 12.7265 19.3739C12.7016 19.3947 12.6781 19.4179 12.6557 19.4373C12.18 19.8699 11.999 20.5338 12.1909 21.1422C12.2004 21.17 12.2089 21.2017 12.2199 21.2319C12.2394 21.2939 12.2122 21.3625 12.1539 21.3956C12.0956 21.4287 12.0215 21.4176 11.9767 21.37C11.9555 21.3454 11.9318 21.3224 11.9121 21.3004C11.4719 20.8329 10.7964 20.655 10.1773 20.8435C10.149 20.8529 10.1168 20.8613 10.086 20.8721C10.0229 20.8913 9.95309 20.8645 9.91943 20.8072C9.88578 20.7499 9.89709 20.6771 9.94553 20.633C9.97048 20.6122 9.99394 20.5889 10.0164 20.5696C10.492 20.137 10.673 19.4731 10.4812 18.8647C10.4716 18.8369 10.4632 18.8052 10.4521 18.7749Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9066 14.4089C19.9066 14.4089 17.896 11.6738 16.9824 10.4293C16.873 10.2837 16.7037 10.1901 16.5168 10.1797C16.3334 10.1658 16.1534 10.2386 16.0265 10.3703C15.6843 10.7274 15.2433 11.1919 14.9047 11.5455C14.7813 11.6772 14.7213 11.8575 14.7425 12.0343C14.7636 12.2146 14.866 12.374 15.0176 12.4711C16.2558 13.2754 18.9331 15.0087 18.9331 15.0087L19.9066 14.4089Z" fill="url(#paint2_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0426 14.4089C20.0426 14.4089 22.0532 11.6738 22.9668 10.4293C23.0762 10.2837 23.2455 10.1901 23.4324 10.1797C23.6159 10.1658 23.7958 10.2386 23.9228 10.3703C24.2649 10.7274 24.7059 11.1919 25.0445 11.5455C25.168 11.6772 25.2279 11.8575 25.2068 12.0343C25.1856 12.2146 25.0833 12.374 24.9316 12.4711C23.6935 13.2754 21.0162 15.0087 21.0162 15.0087L20.0426 14.4089Z" fill="url(#paint3_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6901 12.924C21.6901 12.7545 21.6203 12.5921 21.5005 12.4721C21.3775 12.3544 21.2145 12.2861 21.0416 12.2861C20.4697 12.2861 19.6384 12.2861 19.0664 12.2861C18.8935 12.2861 18.7305 12.3544 18.6075 12.4721C18.4878 12.5921 18.418 12.7545 18.418 12.924C18.418 13.3476 18.418 13.8278 18.418 13.8278H21.6901C21.6901 13.8278 21.6901 13.3476 21.6901 12.924Z" fill="url(#paint4_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7607 29.7728C26.3992 31.7495 23.3404 32.9452 19.9976 32.9452C16.6547 32.9452 13.5959 31.7495 11.2344 29.7728C11.2344 29.7728 11.2344 28.2218 11.2344 26.9302C11.2344 25.9968 12.0062 25.2383 12.9589 25.2383C16.3132 25.2383 23.6819 25.2383 27.0362 25.2383C27.9889 25.2383 28.7607 25.9968 28.7607 26.9302V29.7728Z" fill="url(#paint5_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 23.3402C26.05 23.5472 25.9657 23.7443 25.8163 23.8922C25.6707 24.0368 25.4677 24.1189 25.257 24.1189H14.8438C14.6331 24.1189 14.4301 24.0368 14.2845 23.8922C14.1351 23.7443 14.0508 23.5472 14.0508 23.3402V14.6069C14.0508 14.3999 14.1351 14.2027 14.2845 14.0549C14.4301 13.9103 14.6331 13.8282 14.8438 13.8282H25.257C25.4677 13.8282 25.6707 13.9103 25.8163 14.0549C25.9657 14.2027 26.05 14.3999 26.05 14.6069V23.3402Z" fill="url(#paint6_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 18.1018H14.0508C14.0508 18.1018 14.0508 15.2923 14.0508 14.2294C14.0508 14.1229 14.0929 14.0206 14.1695 13.9456C14.2462 13.8705 14.3496 13.8282 14.4569 13.8282H25.6439C25.7512 13.8282 25.8546 13.8705 25.9312 13.9456C26.0079 14.0206 26.05 14.1229 26.05 14.2294C26.05 15.2923 26.05 18.1018 26.05 18.1018Z" fill="#A4122B" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8037 16.3294C26.8037 16.76 26.4501 17.1089 26.0104 17.1089C23.6176 17.1089 16.4868 17.1089 14.0941 17.1089C13.6543 17.1089 13.3008 16.76 13.3008 16.3294C13.3008 15.8087 13.3008 15.1277 13.3008 14.607C13.3008 14.1764 13.6543 13.8276 14.0941 13.8276C16.4868 13.8276 23.6176 13.8276 26.0104 13.8276C26.4501 13.8276 26.8037 14.1764 26.8037 14.607C26.8037 15.1277 26.8037 15.8087 26.8037 16.3294Z" fill="url(#paint7_linear_281_207109)" />
                                            <path d="M22.0418 13.8276H18.0859V17.1089H22.0418V13.8276Z" fill="url(#paint8_linear_281_207109)" />
                                            <path d="M22.0418 17.1094H18.0859V24.1188H22.0418V17.1094Z" fill="url(#paint9_linear_281_207109)" />
                                            <path d="M22.0418 17.1089H18.0859V18.1012H22.0418V17.1089Z" fill="#D2D2D2" />
                                            <path d="M32.989 40.0006C36.8532 40.0006 39.9858 36.922 39.9858 33.1244C39.9858 29.3268 36.8532 26.2483 32.989 26.2483C29.1247 26.2483 25.9922 29.3268 25.9922 33.1244C25.9922 36.922 29.1247 40.0006 32.989 40.0006Z" fill="url(#paint10_linear_281_207109)" />
                                            <path d="M28.1406 32.1356V31.2031H29.8528V35.4842H28.7526V32.1356H28.1406Z" fill="white" />
                                            <path d="M30.582 33.2848C30.582 32.6104 30.718 32.0826 30.9962 31.6956C31.2681 31.3085 31.707 31.115 32.3189 31.115C32.9309 31.115 33.3697 31.3085 33.6479 31.6956C33.9198 32.0826 34.0558 32.6104 34.0558 33.2848C34.0558 33.9651 33.9198 34.4988 33.6479 34.8858C33.3697 35.2729 32.9309 35.4664 32.3189 35.4664C31.707 35.4664 31.2681 35.2729 30.9962 34.8858C30.718 34.4988 30.582 33.9651 30.582 33.2848ZM33.0174 33.2848C33.0174 32.8919 32.9741 32.587 32.8814 32.37C32.7887 32.1589 32.6033 32.0533 32.3189 32.0533C32.0346 32.0533 31.8492 32.1589 31.7564 32.37C31.6637 32.587 31.6205 32.8919 31.6205 33.2848C31.6205 33.5487 31.639 33.7716 31.6699 33.9416C31.7008 34.1176 31.7688 34.2583 31.8739 34.3639C31.9728 34.4753 32.1211 34.5281 32.3189 34.5281C32.5167 34.5281 32.6651 34.4753 32.7701 34.3639C32.869 34.2583 32.937 34.1176 32.9679 33.9416C32.9989 33.7716 33.0174 33.5487 33.0174 33.2848Z" fill="white" />
                                            <path d="M34.6094 33.2848C34.6094 32.6104 34.7454 32.0826 35.0235 31.6956C35.2955 31.3085 35.7343 31.115 36.3463 31.115C36.9582 31.115 37.3971 31.3085 37.6752 31.6956C37.9472 32.0826 38.0832 32.6104 38.0832 33.2848C38.0832 33.9651 37.9472 34.4988 37.6752 34.8858C37.3971 35.2729 36.9582 35.4664 36.3463 35.4664C35.7343 35.4664 35.2955 35.2729 35.0235 34.8858C34.7454 34.4988 34.6094 33.9651 34.6094 33.2848ZM37.0447 33.2848C37.0447 32.8919 37.0015 32.587 36.9088 32.37C36.816 32.1589 36.6306 32.0533 36.3463 32.0533C36.0619 32.0533 35.8765 32.1589 35.7838 32.37C35.6911 32.587 35.6478 32.8919 35.6478 33.2848C35.6478 33.5487 35.6663 33.7716 35.6973 33.9416C35.7282 34.1176 35.7962 34.2583 35.9012 34.3639C36.0001 34.4753 36.1485 34.5281 36.3463 34.5281C36.5441 34.5281 36.6924 34.4753 36.7975 34.3639C36.8964 34.2583 36.9644 34.1176 36.9953 33.9416C37.0262 33.7716 37.0447 33.5487 37.0447 33.2848Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_207109" x1="19.9998" y1="4.64758" x2="19.9998" y2="39.3097" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_207109" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9962 19.6551) scale(21.8649 21.4879)">
                                                <stop stop-color="#33A2FF" />
                                                <stop offset="0.994792" stop-color="#33A2FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_207109" x1="16.7566" y1="12.2874" x2="18.2435" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_207109" x1="23.1926" y1="12.2874" x2="21.7058" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_207109" x1="20.054" y1="12.2861" x2="19.9177" y2="14.7145" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_207109" x1="19.9976" y1="25.2383" x2="19.9976" y2="32.9457" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#C0C0C0" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_207109" x1="20.0504" y1="24.1189" x2="20.0504" y2="12.4797" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BB1530" />
                                                <stop offset="1" stop-color="#CC0070" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_207109" x1="20.0522" y1="17.1089" x2="20.0522" y2="13.3976" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BB1530" />
                                                <stop offset="1" stop-color="#CC0070" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_207109" x1="20.0639" y1="13.8276" x2="20.0639" y2="17.1089" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#D9D9D9" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_207109" x1="20.0639" y1="17.1094" x2="20.0639" y2="24.1188" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#D9D9D9" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_207109" x1="32.989" y1="16.6884" x2="32.989" y2="40.0006" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          EXPLORER
                                        </p>
                                      </div>
                                    </td>
                                    <td>EXPLORER</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
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
                        </>
                      )}
                    </div>
                  </>
                )}
                {activeTab1 === 'link-3333' && (
                  <>
                    <>
                      <div className="sectoaldiv">
                        <p className="totalwalet">
                          Total No. of Wallets
                        </p>
                        <h3 className="waltdigts ">
                          50,456
                        </h3>
                      </div>
                      <div className='maintablea_usedetails'>
                        <div className='maintablepills_usedetails'>
                          <Nav variant="pills" activeKey={activeTabiner} onSelect={handleSelectiner} className='amberpillsouterdetails'>
                            <Nav.Item className='amberitempils'>
                              <Nav.Link className='ineramb' eventKey="link-122">
                                Referrals
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                              <Nav.Link className='ineramb' eventKey="link-233">
                                Following
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                              <Nav.Link className='ineramb' eventKey="link-344">
                                Followers
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                        {activeTabiner === 'link-122' && (
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      User
                                    </th>
                                    <th> Date/Time </th>
                                    <th>
                                      Status </th>
                                    <th>
                                      Social media’s connected
                                    </th>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                      <td>
                                        <span className="blue">
                                          Verified
                                        </span>
                                      </td>
                                      <td>http://instagram//:</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                      <td>
                                        <span className="blue">
                                          Verified
                                        </span>
                                      </td>
                                      <td>http://instagram//:</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                      <td>
                                        <span className="red">
                                        Unverified
                                        </span>
                                      </td>
                                      <td>http://instagram//:</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                      <td>
                                        <span className="blue">
                                          Verified
                                        </span>
                                      </td>
                                      <td>http://instagram//:</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                      <td>
                                        <span className="red">
                                        Unverified
                                        </span>
                                      </td>
                                      <td>http://instagram//:</td>
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
                          </>
                        )}
                        {activeTabiner === 'link-233' && (
                          <>
                            <>
                              <div className='maintablea'>
                                <div className="maintablea_user-detailss table-responsive">
                                  <table>
                                    <thead>
                                      <th>
                                        User
                                      </th>
                                      <th> Date/Time </th>

                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

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
                            </>
                          </>
                        )}
                        {activeTabiner === 'link-344' && (
                          <>
                            <>

                              <div className='maintablea'>
                                <div className="maintablea_user-detailss table-responsive">
                                  <table>
                                    <thead>
                                      <th>
                                        User
                                      </th>
                                      <th> Date/Time </th>

                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                              <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                              </img>
                                            </div>
                                            <p className="tableimgtext">
                                              Gregory Stewart
                                            </p>
                                          </div>
                                        </td>
                                        <td>24/11/2023 06:04</td>

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

                            </>
                          </>
                        )}
                        {activeTabiner === 'link-4445' && (
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Date/Time
                                    </th>
                                    <th> Subscription </th>
                                    <th>Amount </th>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Premium Monthly </td>
                                      <td>$50 </td>
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
                          </>
                        )}
                        {activeTabiner === 'link-5446' && (
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Date/Time
                                    </th>
                                    <th> Assets </th>
                                    <th>Price in BOLTS </th>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Land </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Avatar </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Furniture </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Car </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Office </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Land </td>
                                      <td>500 BOLTS </td>
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
                          </>
                        )}
                        {activeTabiner === 'link-64477' && (
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Badge
                                    </th>
                                    <th> Type </th>
                                    <th>Price in BOLTS </th>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Subscription </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Mystery Box </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Tickets </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Subscription </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Mansion </td>
                                      <td>500 BOLTS </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>Mystery Box </td>
                                      <td>500 BOLTS </td>
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
                          </>
                        )}
                        {activeTabiner === 'link-34488' && (
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Badge
                                    </th>
                                    <th> Type </th>
                                    <th>Task </th>
                                    <th>Completed On </th>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">
                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_281_206732)" />
                                              <path d="M19.9971 35.2701C28.4308 35.2701 35.2676 28.4332 35.2676 19.9995C35.2676 11.5659 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5659 4.72656 19.9995C4.72656 28.4332 11.5634 35.2701 19.9971 35.2701Z" fill="#78D2FF" />
                                              <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#0A265C" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82629C21.0318 6.36064 18.943 6.36064 16.934 6.82629L19.9874 19.9996L23.0407 6.82629ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.053L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.173C18.943 33.6386 21.0318 33.6386 23.0407 33.173L19.9874 19.9996L16.934 33.173ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.053C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.053ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8059 6.50146C22.5474 6.60499 24.2005 7.03877 25.7032 7.74086L22.8039 13.8693H17.3203L20.8059 6.50146Z" fill="#B3001E" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4755 6.70532C23.0729 6.81623 23.6566 6.96647 24.2242 7.15339L21.0465 13.8701H19.0859L22.4755 6.70532Z" fill="#D7B8B8" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5636 17.1553V15.3188C16.5636 14.3353 17.3609 13.538 18.3445 13.538H21.6477C22.6312 13.538 23.4285 14.3353 23.4285 15.3188V17.1553C23.4285 17.5513 23.7499 17.8727 24.146 17.8727C24.5419 17.8727 24.8633 17.5513 24.8633 17.1553V15.3188C24.8633 13.5429 23.4237 12.1033 21.6477 12.1033H18.3445C16.5686 12.1033 15.1289 13.5429 15.1289 15.3188V17.1553C15.1289 17.5513 15.4503 17.8727 15.8463 17.8727C16.2422 17.8727 16.5636 17.5513 16.5636 17.1553Z" fill="url(#paint2_linear_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2758 6.49658L22.8801 14.1155C22.8801 14.1155 18.9987 14.1155 17.767 14.1155C17.5408 14.1155 17.3349 13.9851 17.2382 13.7807L14.3633 7.70367C15.8726 7.0109 17.5307 6.58797 19.2758 6.49658Z" fill="url(#paint3_linear_281_206732)" />
                                              <path d="M19.9793 33.5224C25.0313 33.5224 29.1266 29.427 29.1266 24.3751C29.1266 19.3232 25.0313 15.2278 19.9793 15.2278C14.9274 15.2278 10.832 19.3232 10.832 24.3751C10.832 29.427 14.9274 33.5224 19.9793 33.5224Z" fill="url(#paint4_linear_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0328 20.4591C27.2876 20.3177 27.4693 20.0737 27.532 19.7891C27.5946 19.5045 27.5321 19.2067 27.3602 18.9714C25.6515 16.6367 22.9176 15.2278 19.9793 15.2278C17.1636 15.2278 14.5355 16.5216 12.8175 18.6843C12.5826 18.981 12.4899 19.3659 12.564 19.7371C12.6382 20.1082 12.8716 20.4279 13.2025 20.6116C13.2105 20.6172 13.2189 20.6218 13.2273 20.6265C13.5757 20.8199 14.0141 20.7186 14.2423 20.3918C15.5384 18.5239 17.6766 17.3906 19.9793 17.3906C22.1779 17.3906 24.2266 18.4238 25.5356 20.1428C25.8864 20.6062 26.5246 20.7408 27.0325 20.4587C27.0328 20.4591 27.0328 20.4591 27.0328 20.4591Z" fill="url(#paint5_linear_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9437 28.2911C12.689 28.4325 12.5072 28.6766 12.4446 28.9612C12.3819 29.2458 12.4445 29.5435 12.6163 29.7788C14.325 32.1135 17.059 33.5225 19.9972 33.5225C22.813 33.5225 25.4411 32.2286 27.1591 30.066C27.394 29.7692 27.4866 29.3843 27.4125 29.0132C27.3383 28.642 27.105 28.3223 26.7741 28.1386C26.7661 28.1331 26.7577 28.1284 26.7493 28.1237C26.4008 27.9303 25.9625 28.0316 25.7343 28.3585C24.4382 30.2264 22.2999 31.3596 19.9972 31.3596C17.7986 31.3596 15.75 30.3265 14.4409 28.6074C14.0901 28.1441 13.452 28.0095 12.944 28.2916C12.9437 28.2911 12.9437 28.2911 12.9437 28.2911Z" fill="url(#paint6_linear_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2838 17.0133C23.4036 16.7454 23.4021 16.439 23.2799 16.1722C23.1577 15.9055 22.9266 15.7043 22.6455 15.62C21.788 15.3606 20.895 15.2278 19.9949 15.2278C19.2132 15.2278 18.4367 15.328 17.6842 15.5244C17.3178 15.6214 17.0125 15.8743 16.849 16.2162C16.6856 16.5581 16.6804 16.9546 16.8351 17.3007C16.838 17.3088 16.8414 17.3165 16.845 17.3243C17.0075 17.6881 17.4187 17.8702 17.7974 17.746C18.5046 17.5109 19.2466 17.3906 19.9949 17.3906C20.6424 17.3906 21.2849 17.4806 21.9045 17.6567C22.4604 17.8151 23.048 17.5409 23.2838 17.0133Z" fill="#CCEEFF" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6966 31.7369C16.5769 32.0048 16.5783 32.3113 16.7006 32.5781C16.8227 32.8448 17.0539 33.046 17.335 33.1303C18.1925 33.3897 19.0855 33.5225 19.9855 33.5225C20.7673 33.5225 21.5438 33.4223 22.2963 33.2258C22.6626 33.1289 22.968 32.8759 23.1314 32.534C23.2949 32.1922 23.3 31.7956 23.1454 31.4496C23.1425 31.4415 23.139 31.4337 23.1355 31.4259C22.9729 31.0622 22.5617 30.8801 22.1831 31.0043C21.4758 31.2394 20.7339 31.3596 19.9855 31.3596C19.3381 31.3596 18.6955 31.2696 18.0759 31.0935C17.5201 30.9351 16.9325 31.2093 16.6966 31.7369Z" fill="#0F388A" />
                                              <path d="M19.9803 31.3595C23.8376 31.3595 26.9645 28.2326 26.9645 24.3753C26.9645 20.5181 23.8376 17.3911 19.9803 17.3911C16.123 17.3911 12.9961 20.5181 12.9961 24.3753C12.9961 28.2326 16.123 31.3595 19.9803 31.3595Z" fill="#78D2FF" />
                                              <path d="M19.9816 30.5602C23.3974 30.5602 26.1664 27.7912 26.1664 24.3754C26.1664 20.9597 23.3974 18.1907 19.9816 18.1907C16.5659 18.1907 13.7969 20.9597 13.7969 24.3754C13.7969 27.7912 16.5659 30.5602 19.9816 30.5602Z" fill="#005CB2" />
                                              <path d="M23.8057 23.2234C23.5974 22.7308 23.2993 22.2881 22.92 21.908L22.9211 21.9067L24.0769 20.9082L21.5828 22.2431H21.5825L17.6816 24.3312L19.3217 25.2309L17.7807 26.8656L17.7635 26.8834C17.2425 26.3406 16.9221 25.6058 16.9221 24.7977C16.9221 23.131 18.285 21.7751 19.9601 21.7751C20.2787 21.7751 20.5859 21.8243 20.8745 21.9151L22.107 21.2737C21.944 21.1765 21.7739 21.0902 21.5974 21.0155C21.0856 20.7988 20.5421 20.6892 19.9819 20.6892C19.4219 20.6892 18.8784 20.7991 18.3664 21.0155C17.8721 21.2243 17.4284 21.5236 17.0473 21.9045C16.6662 22.2854 16.3674 22.7291 16.1583 23.2234C15.9417 23.7353 15.832 24.2789 15.832 24.8389C15.832 25.3989 15.9417 25.9425 16.1583 26.4544C16.3527 26.9145 16.6257 27.3308 16.97 27.6938L15.9532 28.6433L22.0291 25.2203L20.5871 24.2768L22.1391 22.6969L22.1402 22.6957C22.6705 23.2401 22.9974 23.9815 22.9974 24.7979C22.9974 26.4647 21.6345 27.8206 19.9593 27.8206C19.614 27.8206 19.2819 27.7627 18.9725 27.6568L17.7295 28.3253C17.9307 28.4556 18.1432 28.5683 18.3664 28.6626C18.8781 28.8793 19.4216 28.9889 19.9819 28.9889C20.5418 28.9889 21.0854 28.879 21.5974 28.6626C22.0917 28.4537 22.5353 28.1545 22.9164 27.7736C23.2975 27.3927 23.5964 26.9489 23.8054 26.4547C24.022 25.9428 24.1317 25.3992 24.1317 24.8391C24.1322 24.2786 24.0222 23.7353 23.8057 23.2234Z" fill="url(#paint7_linear_281_206732)" />
                                              <path d="M23.8057 22.6157C23.5974 22.1232 23.2993 21.6804 22.92 21.3003L22.9211 21.299L24.0769 20.3005L21.5828 21.6355H21.5825L17.6816 23.7235L19.3217 24.6232L17.7807 26.258L17.7635 26.2758C17.2425 25.7329 16.9221 24.9981 16.9221 24.1901C16.9221 22.5233 18.285 21.1674 19.9601 21.1674C20.2787 21.1674 20.5859 21.2166 20.8745 21.3074L22.107 20.6661C21.944 20.5689 21.7739 20.4825 21.5974 20.4078C21.0856 20.1911 20.5421 20.0815 19.9819 20.0815C19.4219 20.0815 18.8784 20.1914 18.3664 20.4078C17.8721 20.6167 17.4284 20.916 17.0473 21.2968C16.6662 21.6777 16.3674 22.1215 16.1583 22.6157C15.9417 23.1276 15.832 23.6712 15.832 24.2313C15.832 24.7912 15.9417 25.3348 16.1583 25.8467C16.3527 26.3069 16.6257 26.7231 16.97 27.0862L15.9532 28.0357L22.0291 24.6127L20.5871 23.6692L22.1391 22.0893L22.1402 22.088C22.6705 22.6324 22.9974 23.3738 22.9974 24.1903C22.9974 25.857 21.6345 27.2129 19.9593 27.2129C19.614 27.2129 19.2819 27.155 18.9725 27.0491L17.7295 27.7176C17.9307 27.8479 18.1432 27.9607 18.3664 28.0549C18.8781 28.2716 19.4216 28.3812 19.9819 28.3812C20.5418 28.3812 21.0854 28.2713 21.5974 28.0549C22.0917 27.8461 22.5353 27.5468 22.9164 27.1659C23.2975 26.785 23.5964 26.3413 23.8054 25.847C24.022 25.3351 24.1317 24.7915 24.1317 24.2315C24.1322 23.6709 24.0222 23.1276 23.8057 22.6157Z" fill="url(#paint8_linear_281_206732)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5339 6.70093L21.0415 14.1154C21.0415 14.1154 20.1311 14.1154 19.6013 14.1154C19.3752 14.1154 19.1693 13.9851 19.0726 13.7807L15.9141 7.10429C16.4409 6.93769 16.9816 6.80251 17.5339 6.70093Z" fill="white" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_206732" x1="21.0505" y1="7.77016" x2="21.0505" y2="39.9728" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#00AAFF" />
                                                  <stop offset="1" stop-color="#0068EF" />
                                                </linearGradient>
                                                <radialGradient id="paint1_radial_281_206732" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                  <stop stop-color="#33A2FF" />
                                                  <stop offset="1" stop-color="#33A2FF" stop-opacity="0" />
                                                </radialGradient>
                                                <linearGradient id="paint2_linear_281_206732" x1="20.0951" y1="12.1033" x2="20.0951" y2="16.7288" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#00AAFF" />
                                                  <stop offset="1" stop-color="#0068EF" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206732" x1="16.808" y1="7.77059" x2="19.083" y2="14.9884" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E61A5E" />
                                                  <stop offset="1" stop-color="#CC0022" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206732" x1="20.4598" y1="18.7816" x2="20.4598" y2="33.5099" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#00AAFF" />
                                                  <stop offset="1" stop-color="#0068EF" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206732" x1="19.9794" y1="15.2278" x2="19.9794" y2="24.3751" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#78D2FF" />
                                                  <stop offset="1" stop-color="#00A6F9" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206732" x1="19.9973" y1="24.3751" x2="19.9973" y2="33.5225" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#2F74FF" />
                                                  <stop offset="1" stop-color="#144BB8" />
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_281_206732" x1="20.4415" y1="22.4538" x2="21.7381" y2="28.4807" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#006699" />
                                                  <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_281_206732" x1="21.9342" y1="21.4474" x2="10.009" y2="35.064" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#78D2FF" />
                                                </linearGradient>
                                              </defs>
                                            </svg>

                                          </div>
                                          <p className="tableimgtext">
                                            GENESIS
                                          </p>
                                        </div>
                                      </td>
                                      <td>Techwiz</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">
                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206794)" />
                                              <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#DE99FF" />
                                              <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#2D0066" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82628C21.0318 6.36064 18.943 6.36064 16.934 6.82628L19.9874 19.9996L23.0407 6.82628ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.0529L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.1729C18.943 33.6386 21.0318 33.6386 23.0407 33.1729L19.9874 19.9996L16.934 33.1729ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.0529C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.0529ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206794)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8137 6.50122C22.5552 6.60475 24.2083 7.03852 25.711 7.74062L22.8117 13.8691H17.3281L20.8137 6.50122Z" fill="#B3001E" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4794 6.7041C23.0768 6.81501 23.6605 6.96525 24.2281 7.15216L21.0504 13.8689H19.0898L22.4794 6.7041Z" fill="#D7B8B8" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9255 16.6427C16.9255 17.2419 16.439 17.7285 15.8397 17.7285C15.2404 17.7285 14.7539 17.2419 14.7539 16.6427V14.8061C14.7539 12.8268 16.3585 11.2222 18.3379 11.2222H21.6411C23.6206 11.2222 25.2253 12.8268 25.2253 14.8061V16.6427C25.2253 17.2419 24.7386 17.7285 24.1395 17.7285C23.54 17.7285 23.0536 17.2419 23.0536 16.6427V14.8061C23.0536 14.0261 22.4213 13.3938 21.6411 13.3938H18.3379C17.5578 13.3938 16.9255 14.0261 16.9255 14.8061V16.6427Z" fill="url(#paint2_linear_281_206794)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2797 6.49634L22.884 14.1152C22.884 14.1152 19.0026 14.1152 17.7709 14.1152C17.5447 14.1152 17.3388 13.9849 17.2421 13.7804L14.3672 7.70342C15.8765 7.01066 17.5346 6.58773 19.2797 6.49634Z" fill="url(#paint3_linear_281_206794)" />
                                              <path d="M19.9871 33.5221C25.0391 33.5221 29.1344 29.4268 29.1344 24.3748C29.1344 19.3229 25.0391 15.2275 19.9871 15.2275C14.9352 15.2275 10.8398 19.3229 10.8398 24.3748C10.8398 29.4268 14.9352 33.5221 19.9871 33.5221Z" fill="url(#paint4_linear_281_206794)" />
                                              <path d="M19.9881 31.3593C23.8454 31.3593 26.9723 28.2324 26.9723 24.3751C26.9723 20.5178 23.8454 17.3909 19.9881 17.3909C16.1308 17.3909 13.0039 20.5178 13.0039 24.3751C13.0039 28.2324 16.1308 31.3593 19.9881 31.3593Z" fill="url(#paint5_linear_281_206794)" />
                                              <path d="M19.9894 30.5597C23.4052 30.5597 26.1742 27.7907 26.1742 24.3749C26.1742 20.9592 23.4052 18.1902 19.9894 18.1902C16.5737 18.1902 13.8047 20.9592 13.8047 24.3749C13.8047 27.7907 16.5737 30.5597 19.9894 30.5597Z" fill="url(#paint6_linear_281_206794)" />
                                              <path d="M16.9805 26.3807V25.178L19.7353 21.2373H21.4003V25.0907H22.1151V26.3807H21.4003V27.5142H19.9094V26.3807H16.9805ZM20.0142 22.8763L18.5494 25.0907H20.0142V22.8763Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5417 6.70068L21.0493 14.1152C21.0493 14.1152 20.1389 14.1152 19.6091 14.1152C19.383 14.1152 19.1771 13.9848 19.0804 13.7804L15.9219 7.10404C16.4488 6.93744 16.9894 6.80226 17.5417 6.70068Z" fill="white" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_206794" x1="23.2261" y1="6.47747" x2="23.2261" y2="39.7406" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#BE00FF" />
                                                  <stop offset="1" stop-color="#5500FF" />
                                                </linearGradient>
                                                <radialGradient id="paint1_radial_281_206794" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                  <stop stop-color="#BE00FF" />
                                                  <stop offset="1" stop-color="#BE00FF" stop-opacity="0" />
                                                </radialGradient>
                                                <linearGradient id="paint2_linear_281_206794" x1="19.9895" y1="11.2222" x2="19.9895" y2="17.7285" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B1B1B1" />
                                                  <stop offset="1" stop-color="#747474" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206794" x1="16.812" y1="7.77034" x2="19.0869" y2="14.9882" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E61A5E" />
                                                  <stop offset="1" stop-color="#CC0022" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206794" x1="19.9871" y1="15.2275" x2="19.9871" y2="33.5221" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E6E6E6" />
                                                  <stop offset="1" stop-color="#747474" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206794" x1="19.9881" y1="21.1243" x2="19.9881" y2="33.5224" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206794" x1="19.9519" y1="30.5597" x2="19.9519" y2="18.1902" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#3A3A3A" />
                                                  <stop offset="1" stop-color="#7B7B7B" />
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                          </div>
                                          <p className="tableimgtext">
                                            RUNNER UP
                                          </p>
                                        </div>
                                      </td>
                                      <td>Arcadia</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">

                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206820)" />
                                              <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#FFE978" />
                                              <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#994000" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0713 10.8065C19.244 10.4597 19.598 10.2405 19.9855 10.2405C20.3729 10.2405 20.7269 10.4597 20.8996 10.8065C21.8034 12.6218 23.1263 15.2783 23.6586 16.3474C23.8058 16.6431 24.087 16.8493 24.4133 16.9009C25.6092 17.0899 28.6085 17.5641 30.652 17.8871C31.0366 17.9479 31.3532 18.2221 31.4683 18.594C31.5833 18.966 31.4768 19.371 31.1937 19.6383C29.7226 21.0274 27.5843 23.0468 26.7067 23.8754C26.4579 24.1104 26.3433 24.4544 26.4016 24.7916C26.6113 26.0077 27.1304 29.0154 27.4857 31.0741C27.5524 31.4607 27.3918 31.8512 27.0724 32.0791C26.7531 32.3069 26.3315 32.3317 25.9877 32.1427C24.181 31.1503 21.5565 29.7086 20.4772 29.1156C20.171 28.9474 19.8 28.9474 19.4938 29.1156C18.4144 29.7086 15.7899 31.1503 13.9833 32.1427C13.6394 32.3317 13.2178 32.3069 12.8985 32.0791C12.5791 31.8512 12.4185 31.4607 12.4852 31.0741C12.8405 29.0154 13.3595 26.0077 13.5694 24.7916C13.6276 24.4544 13.513 24.1104 13.2642 23.8754C12.3867 23.0468 10.2482 21.0274 8.77714 19.6383C8.49407 19.371 8.38762 18.966 8.50267 18.594C8.61773 18.2221 8.93426 17.9479 9.31883 17.8871C11.3623 17.5641 14.3618 17.0899 15.5577 16.9009C15.8839 16.8493 16.1651 16.6431 16.3124 16.3474C16.8447 15.2783 18.1674 12.6218 19.0713 10.8065Z" fill="url(#paint1_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.087 8.48181C19.2596 8.135 19.6137 7.91577 20.0011 7.91577C20.3885 7.91577 20.7426 8.135 20.9153 8.48181C21.8191 10.2971 23.142 12.9537 23.6743 14.0227C23.8215 14.3184 24.1026 14.5246 24.429 14.5762C25.6249 14.7652 28.6242 15.2394 30.6678 15.5624C31.0524 15.6232 31.369 15.8974 31.484 16.2693C31.599 16.6413 31.4926 17.0463 31.2095 17.3136C29.7383 18.7028 27.6 20.7221 26.7224 21.5507C26.4736 21.7857 26.359 22.1298 26.4173 22.4669C26.6271 23.6831 27.1461 26.6908 27.5014 28.7495C27.5681 29.1361 27.4075 29.5266 27.0881 29.7545C26.7688 29.9823 26.3472 30.007 26.0034 29.8181C24.1967 28.8256 21.5722 27.384 20.4929 26.791C20.1867 26.6228 19.8156 26.6228 19.5094 26.791C18.43 27.384 15.8056 28.8256 13.9989 29.8181C13.6551 30.007 13.2335 29.9823 12.9141 29.7545C12.5948 29.5266 12.4341 29.1361 12.5009 28.7495C12.8561 26.6908 13.3752 23.6831 13.585 22.4669C13.6432 22.1298 13.5286 21.7857 13.2798 21.5507C12.4023 20.7221 10.2638 18.7028 8.79277 17.3136C8.5097 17.0463 8.40324 16.6413 8.5183 16.2693C8.63335 15.8974 8.94989 15.6232 9.33446 15.5624C11.378 15.2394 14.3774 14.7652 15.5733 14.5762C15.8996 14.5246 16.1808 14.3184 16.328 14.0227C16.8603 12.9537 18.1831 10.2971 19.087 8.48181Z" fill="#FFDD32" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0039 7.91577C20.3913 7.91577 20.7454 8.13501 20.918 8.48181L23.6771 14.0227C23.7503 14.1699 23.8567 14.2949 23.9855 14.3897L20.0039 20.0196V7.91577Z" fill="url(#paint2_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9337 29.7613C12.9306 29.7592 12.9274 29.7569 12.9244 29.7547C12.6049 29.5268 12.4444 29.1362 12.511 28.7496L13.5953 22.4672C13.6245 22.2972 13.61 22.1256 13.5565 21.967L20.0113 20.0198L12.9337 29.7613Z" fill="url(#paint3_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0073 26.665C19.838 26.6649 19.6687 26.707 19.5155 26.7911L14.0051 29.8183C13.6647 30.0054 13.2479 29.9829 12.9297 29.7612L20.0073 20.0198L20.0073 26.665Z" fill="url(#paint4_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.993 14.3901C24.1229 14.4858 24.2753 14.5506 24.4392 14.5765L30.6781 15.5628C31.0626 15.6236 31.3792 15.8977 31.4942 16.2696C31.4961 16.2756 31.4978 16.2814 31.4995 16.2873L20.0114 20.02L23.993 14.3901Z" fill="url(#paint5_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 16.2871C31.6064 16.6542 31.4989 17.0508 31.2203 17.3138L26.7332 21.551C26.6098 21.6676 26.5194 21.8108 26.4667 21.967L20.0119 20.0198L31.5 16.2871Z" fill="url(#paint6_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4552 21.967C26.4017 22.1256 26.3872 22.2972 26.4165 22.4672L27.5007 28.7496C27.5674 29.1362 27.4068 29.5268 27.0874 29.7547C27.0843 29.7569 27.0811 29.7592 27.078 29.7613L20.0004 20.0198L26.4552 21.967Z" fill="url(#paint7_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0781 29.7612C26.7599 29.9829 26.3432 30.0054 26.0027 29.8183L20.4923 26.7911C20.3391 26.707 20.1698 26.6649 20.0005 26.665L20.0005 20.0198L27.0781 29.7612Z" fill="url(#paint8_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0184 14.3897C16.1472 14.2949 16.2536 14.1699 16.3268 14.0227L19.0859 8.48181C19.2585 8.13501 19.6126 7.91577 20 7.91577V20.0196L16.0184 14.3897Z" fill="url(#paint9_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52004 16.2873C8.52173 16.2814 8.52347 16.2756 8.52532 16.2696C8.64038 15.8977 8.95689 15.6236 9.34146 15.5628L15.5803 14.5765C15.7442 14.5506 15.8967 14.4858 16.0266 14.3901L20.0081 20.02L8.52004 16.2873Z" fill="url(#paint10_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5528 21.967C13.5002 21.8108 13.4097 21.6676 13.2863 21.551L8.79928 17.3138C8.52061 17.0508 8.41312 16.6542 8.51953 16.2871L20.0076 20.0198L13.5528 21.967Z" fill="url(#paint11_linear_281_206820)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.414 11.3362C24.3731 11.2712 24.3827 11.1846 24.438 11.1293C24.4934 11.074 24.5799 11.0644 24.6449 11.1053C24.6761 11.127 24.7098 11.1462 24.7386 11.1654C25.3759 11.567 26.1888 11.567 26.826 11.1654C26.8549 11.1462 26.8885 11.127 26.9198 11.1053C26.9847 11.0644 27.0713 11.074 27.1266 11.1293C27.1819 11.1846 27.1915 11.2712 27.1507 11.3362C27.129 11.3674 27.1098 11.4011 27.0906 11.4299C26.689 12.0672 26.689 12.8801 27.0906 13.5173C27.1098 13.5462 27.129 13.5798 27.1507 13.6111C27.1915 13.676 27.1819 13.7626 27.1266 13.8179C27.0713 13.8732 26.9847 13.8828 26.9198 13.842C26.8885 13.8203 26.8549 13.8011 26.826 13.7819C26.1888 13.3803 25.3759 13.3803 24.7386 13.7819C24.7098 13.8011 24.6761 13.8203 24.6449 13.842C24.5799 13.8828 24.4934 13.8732 24.438 13.8179C24.3827 13.7626 24.3731 13.676 24.414 13.6111C24.4357 13.5798 24.4549 13.5462 24.4741 13.5173C24.8757 12.8801 24.8757 12.0672 24.4741 11.4299C24.4549 11.4011 24.4357 11.3674 24.414 11.3362Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4805 23.9929C28.5388 23.93 28.635 23.9154 28.7107 23.9591C28.7864 24.0028 28.8218 24.0934 28.7964 24.1753C28.7821 24.2153 28.7711 24.2572 28.7587 24.2939C28.5095 25.0978 28.7446 25.9751 29.3623 26.5468C29.3914 26.5723 29.4219 26.6031 29.4543 26.6306C29.5172 26.6888 29.5319 26.7851 29.4882 26.8607C29.4445 26.9364 29.3538 26.9718 29.2719 26.9465C29.2319 26.9322 29.19 26.9212 29.1533 26.9087C28.3494 26.6596 27.4721 26.8947 26.9005 27.5124C26.8749 27.5415 26.8442 27.572 26.8167 27.6044C26.7584 27.6673 26.6622 27.682 26.5865 27.6383C26.5108 27.5946 26.4754 27.5039 26.5008 27.422C26.5151 27.382 26.5261 27.3401 26.5385 27.3034C26.7877 26.4995 26.5526 25.6222 25.9349 25.0506C25.9058 25.025 25.8753 24.9942 25.8429 24.9667C25.78 24.9085 25.7653 24.8123 25.809 24.7366C25.8527 24.6609 25.9434 24.6255 26.0253 24.6508C26.0653 24.6651 26.1072 24.6762 26.1439 24.6886C26.9478 24.9377 27.8251 24.7026 28.3967 24.0849C28.4223 24.0558 28.453 24.0253 28.4805 23.9929Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8242 12.9311C11.8044 12.867 11.8321 12.7962 11.8912 12.762C11.9504 12.7278 12.0256 12.7393 12.0712 12.7885C12.0927 12.8138 12.1167 12.8376 12.1367 12.8604C12.5836 13.3433 13.2694 13.5271 13.8979 13.3323C13.9266 13.3226 13.9593 13.314 13.9906 13.3028C14.0546 13.283 14.1255 13.3106 14.1596 13.3698C14.1938 13.429 14.1823 13.5042 14.1331 13.5497C14.1078 13.5712 14.084 13.5953 14.0612 13.6153C13.5783 14.0622 13.3946 14.748 13.5893 15.3764C13.5991 15.4051 13.6077 15.4379 13.6188 15.4691C13.6387 15.5332 13.611 15.604 13.5518 15.6382C13.4927 15.6724 13.4174 15.6609 13.3719 15.6117C13.3504 15.5864 13.3264 15.5626 13.3064 15.5398C12.8595 15.0569 12.1737 14.8731 11.5452 15.0679C11.5165 15.0776 11.4838 15.0862 11.4525 15.0974C11.3885 15.1172 11.3176 15.0896 11.2834 15.0304C11.2493 14.9712 11.2607 14.896 11.3099 14.8505C11.3352 14.829 11.3591 14.8049 11.3818 14.7849C11.8647 14.338 12.0485 13.6522 11.8537 13.0238C11.844 12.9951 11.8354 12.9623 11.8242 12.9311Z" fill="white" />
                                              <path d="M19.9832 27.0544C23.1863 27.0544 25.7829 24.4578 25.7829 21.2547C25.7829 18.0517 23.1863 15.4551 19.9832 15.4551C16.7802 15.4551 14.1836 18.0517 14.1836 21.2547C14.1836 24.4578 16.7802 27.0544 19.9832 27.0544Z" fill="url(#paint12_linear_281_206820)" />
                                              <path d="M19.9832 25.8C23.1863 25.8 25.7829 23.2034 25.7829 20.0003C25.7829 16.7973 23.1863 14.2007 19.9832 14.2007C16.7802 14.2007 14.1836 16.7973 14.1836 20.0003C14.1836 23.2034 16.7802 25.8 19.9832 25.8Z" fill="url(#paint13_linear_281_206820)" />
                                              <path d="M19.9851 19.3446C22.035 19.3446 23.6967 18.4193 23.6967 17.2779C23.6967 16.1365 22.035 15.2112 19.9851 15.2112C17.9352 15.2112 16.2734 16.1365 16.2734 17.2779C16.2734 18.4193 17.9352 19.3446 19.9851 19.3446Z" fill="url(#paint14_linear_281_206820)" />
                                              <path d="M22.3858 18.5352H19.3562V19.8752C19.4825 19.7295 19.667 19.613 19.9 19.5256C20.1331 19.4382 20.3855 19.3897 20.6574 19.3897C21.1429 19.3897 21.541 19.4965 21.8615 19.7198C22.1916 19.9432 22.4247 20.2248 22.5703 20.5743C22.716 20.9239 22.7937 21.3026 22.7937 21.7104C22.7937 22.4679 22.5801 23.0699 22.1528 23.5069C21.7255 23.9535 21.1235 24.1769 20.3467 24.1769C19.832 24.1769 19.3756 24.0895 18.9969 23.905C18.6182 23.7302 18.3172 23.4874 18.1133 23.167C17.9094 22.8466 17.7929 22.4873 17.7734 22.0697H19.3951C19.4339 22.2736 19.531 22.4387 19.6767 22.565C19.8223 22.7009 20.0262 22.7689 20.2884 22.7689C20.5894 22.7689 20.8225 22.6718 20.9681 22.4776C21.1138 22.2834 21.1915 22.0212 21.1915 21.7007C21.1915 21.3803 21.1138 21.1375 20.9584 20.9725C20.8031 20.8074 20.5797 20.72 20.2787 20.72C20.0554 20.72 19.8806 20.7783 19.7349 20.8754C19.5893 20.9822 19.5019 21.1278 19.4533 21.3026H17.8511V17.0786H22.3858V18.5352Z" fill="#1B4DB1" />
                                              <path d="M22.3858 17.9033H19.3562V19.2434C19.4825 19.0977 19.667 18.9812 19.9 18.8938C20.1331 18.8064 20.3855 18.7578 20.6574 18.7578C21.1429 18.7578 21.541 18.8647 21.8615 19.088C22.1916 19.3113 22.4247 19.5929 22.5703 19.9425C22.716 20.2921 22.7937 20.6708 22.7937 21.0786C22.7937 21.836 22.5801 22.4381 22.1528 22.875C21.7255 23.3217 21.1235 23.545 20.3467 23.545C19.832 23.545 19.3756 23.4576 18.9969 23.2731C18.6182 23.0984 18.3172 22.8556 18.1133 22.5352C17.9094 22.2147 17.7929 21.8554 17.7734 21.4379H19.3951C19.4339 21.6418 19.531 21.8069 19.6767 21.9331C19.8223 22.0691 20.0262 22.137 20.2884 22.137C20.5894 22.137 20.8225 22.0399 20.9681 21.8457C21.1138 21.6515 21.1915 21.3893 21.1915 21.0689C21.1915 20.7485 21.1138 20.5057 20.9584 20.3406C20.8031 20.1755 20.5797 20.0882 20.2787 20.0882C20.0554 20.0882 19.8806 20.1464 19.7349 20.2435C19.5893 20.3503 19.5019 20.496 19.4533 20.6708H17.8511V16.4468H22.3858V17.9033Z" fill="url(#paint15_linear_281_206820)" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_206820" x1="20" y1="4.72941" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFD500" />
                                                  <stop offset="1" stop-color="#FF9500" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_281_206820" x1="20.0004" y1="12.8271" x2="20.0004" y2="39.2833" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#2D1706" />
                                                  <stop offset="1" stop-color="#2D1706" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_281_206820" x1="20.0039" y1="6.87276" x2="20.0039" y2="19.9569" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFAA00" />
                                                  <stop offset="1" stop-color="#FF8000" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206820" x1="12.2838" y1="30.6559" x2="19.9267" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFDD32" />
                                                  <stop offset="1" stop-color="#FFAA00" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206820" x1="12.1464" y1="30.8394" x2="20.0073" y2="20.0198" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FF8000" />
                                                  <stop offset="1" stop-color="#E66000" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206820" x1="32.5148" y1="15.9574" x2="20.0114" y2="19.931" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFDD32" />
                                                  <stop offset="1" stop-color="#FFAA00" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206820" x1="32.5153" y1="15.9572" x2="20.0716" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFAA00" />
                                                  <stop offset="1" stop-color="#FF8000" />
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_281_206820" x1="27.7279" y1="30.6559" x2="20.085" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFDD32" />
                                                  <stop offset="1" stop-color="#FFAA00" />
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_281_206820" x1="27.7281" y1="30.6558" x2="20.0374" y2="20.0705" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFAA00" />
                                                  <stop offset="1" stop-color="#FF8000" />
                                                </linearGradient>
                                                <linearGradient id="paint9_linear_281_206820" x1="20" y1="6.64586" x2="20" y2="19.9307" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFEE99" />
                                                  <stop offset="1" stop-color="#FFE666" />
                                                </linearGradient>
                                                <linearGradient id="paint10_linear_281_206820" x1="7.76854" y1="16.0431" x2="19.9435" y2="19.931" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFE666" />
                                                  <stop offset="1" stop-color="#FFDD33" />
                                                </linearGradient>
                                                <linearGradient id="paint11_linear_281_206820" x1="7.5042" y1="15.9572" x2="19.948" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFAA00" />
                                                  <stop offset="1" stop-color="#FF8000" />
                                                </linearGradient>
                                                <linearGradient id="paint12_linear_281_206820" x1="21.1101" y1="19.2475" x2="21.1101" y2="28.8099" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#CC4400" />
                                                  <stop offset="1" stop-color="#CC4400" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint13_linear_281_206820" x1="19.9832" y1="6.13748" x2="19.9832" y2="25.8" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#6CD6FD" />
                                                  <stop offset="1" stop-color="#3359FF" />
                                                </linearGradient>
                                                <linearGradient id="paint14_linear_281_206820" x1="19.9851" y1="12.3073" x2="19.9851" y2="19.3445" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B5EAFE" />
                                                  <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint15_linear_281_206820" x1="20.2836" y1="16.4468" x2="20.2836" y2="29.9436" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#78D2FF" />
                                                </linearGradient>
                                              </defs>
                                            </svg>

                                          </div>
                                          <p className="tableimgtext">
                                            5 STARS
                                          </p>
                                        </div>
                                      </td>
                                      <td>Rewards</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">
                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206872)" />
                                              <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#6699FF" />
                                              <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="url(#paint1_radial_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3766 27.1385C26.3766 28.4353 23.5215 29.4886 20.0047 29.4886C16.4879 29.4886 13.6328 28.4353 13.6328 27.1385V19.8022H26.3766V27.1385Z" fill="url(#paint2_linear_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3462 14.887C19.755 14.6435 20.2633 14.6435 20.6721 14.887C22.6705 16.0681 28.6135 19.5871 30.4887 20.6951C30.6087 20.7682 30.6823 20.8961 30.6823 21.0361C30.6823 21.1761 30.6087 21.304 30.4887 21.374C28.6135 22.4851 22.6705 26.0041 20.6721 27.1852C20.2633 27.4287 19.755 27.4287 19.3462 27.1852C17.3477 26.0041 11.4045 22.4851 9.52945 21.374C9.40951 21.304 9.33594 21.1761 9.33594 21.0361C9.33594 20.8961 9.40951 20.7682 9.52945 20.6951C11.4045 19.5871 17.3477 16.0681 19.3462 14.887Z" fill="url(#paint3_linear_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6565 21.407C19.4521 21.2852 19.3843 21.0204 19.5053 20.8164C19.6263 20.6125 19.8907 20.5425 20.0949 20.6642L25.679 23.9701C25.8099 24.0462 25.8903 24.1893 25.8903 24.3415V30.2288C25.8903 30.4662 25.6973 30.6611 25.4598 30.6611C25.2221 30.6611 25.0294 30.4662 25.0294 30.2288V24.585L19.6565 21.407Z" fill="white" />
                                              <path d="M19.8884 21.1838C23.4597 21.1838 26.3549 18.2886 26.3549 14.7172C26.3549 11.1459 23.4597 8.25073 19.8884 8.25073C16.317 8.25073 13.4219 11.1459 13.4219 14.7172C13.4219 18.2886 16.317 21.1838 19.8884 21.1838Z" fill="url(#paint4_linear_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.8832 11.9494C25.0635 11.8493 25.1922 11.6765 25.2365 11.4751C25.2808 11.2736 25.2365 11.0629 25.1148 10.8963C23.9068 9.24639 21.9744 8.25073 19.8977 8.25073C17.9025 8.25073 16.0406 9.1697 14.8262 10.705C14.6627 10.9126 14.5984 11.1815 14.6505 11.4406C14.7026 11.6997 14.8657 11.9229 15.0967 12.0511C15.1033 12.0554 15.11 12.0592 15.1167 12.0629C15.3671 12.202 15.6821 12.1294 15.8465 11.8947C16.7632 10.5782 18.2725 9.77971 19.8977 9.77971C21.4522 9.77971 22.9008 10.5104 23.8262 11.726C24.0737 12.0532 24.5243 12.1483 24.8829 11.9492C24.8831 11.9494 24.8831 11.9494 24.8832 11.9494Z" fill="url(#paint5_linear_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9059 17.4849C14.7256 17.585 14.5969 17.7578 14.5526 17.9592C14.5082 18.1607 14.5525 18.3715 14.6742 18.538C15.8822 20.1879 17.8146 21.1836 19.8914 21.1836C21.8866 21.1836 23.7485 20.2646 24.9628 18.7294C25.1264 18.5217 25.1907 18.2528 25.1386 17.9938C25.0865 17.7346 24.9233 17.5115 24.6923 17.3832C24.6858 17.3789 24.6791 17.3752 24.6724 17.3714C24.4219 17.2324 24.1069 17.305 23.9426 17.5396C23.0258 18.8561 21.5165 19.6546 19.8914 19.6546C18.3368 19.6546 16.8883 18.924 15.9629 17.7083C15.7153 17.3812 15.2648 17.286 14.9062 17.4851C14.906 17.4849 14.906 17.4849 14.9059 17.4849Z" fill="url(#paint6_linear_281_206872)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.201 9.51155C22.2855 9.32259 22.2845 9.10638 22.1983 8.91813C22.1121 8.72996 21.949 8.58794 21.7508 8.52841C21.1441 8.34475 20.5122 8.25073 19.8754 8.25073C19.3187 8.25073 18.7658 8.32257 18.2303 8.46344C17.9741 8.5317 17.7608 8.70885 17.6467 8.94811C17.5326 9.18737 17.5292 9.46462 17.6373 9.70659C17.6403 9.71432 17.6437 9.7219 17.6471 9.72949C17.7628 9.98842 18.0554 10.1181 18.3249 10.0298C18.824 9.86436 19.3474 9.77971 19.8754 9.77971C20.3326 9.77971 20.7864 9.84318 21.2241 9.96746C21.6178 10.0796 22.034 9.88532 22.201 9.51162C22.201 9.51162 22.201 9.51155 22.201 9.51155Z" fill="#CCEEFF" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5646 19.922C17.4802 20.111 17.4812 20.3272 17.5674 20.5155C17.6535 20.7036 17.8166 20.8457 18.0148 20.9052C18.6216 21.0888 19.2534 21.1829 19.8903 21.1829C20.447 21.1829 20.9998 21.111 21.5354 20.9701C21.7915 20.9019 22.0048 20.7247 22.1189 20.4855C22.233 20.2462 22.2365 19.969 22.1283 19.727C22.1253 19.7193 22.1219 19.7117 22.1185 19.7041C22.0029 19.4452 21.7102 19.3155 21.4407 19.4037C20.9416 19.5692 20.4182 19.6539 19.8903 19.6539C19.4331 19.6539 18.9792 19.5904 18.5416 19.4661C18.1478 19.354 17.7316 19.5483 17.5647 19.922C17.5646 19.922 17.5646 19.922 17.5646 19.922Z" fill="#0F388A" />
                                              <path d="M19.8827 19.6543C22.6095 19.6543 24.82 17.4437 24.82 14.7169C24.82 11.9901 22.6095 9.77954 19.8827 9.77954C17.1558 9.77954 14.9453 11.9901 14.9453 14.7169C14.9453 17.4437 17.1558 19.6543 19.8827 19.6543Z" fill="#78D2FF" />
                                              <path d="M19.88 19.0889C22.2947 19.0889 24.2522 17.1314 24.2522 14.7167C24.2522 12.302 22.2947 10.3445 19.88 10.3445C17.4653 10.3445 15.5078 12.302 15.5078 14.7167C15.5078 17.1314 17.4653 19.0889 19.88 19.0889Z" fill="#005CB2" />
                                              <path d="M22.6017 13.9018C22.4545 13.5536 22.2436 13.2406 21.9756 12.9719L21.9763 12.971L22.7934 12.2651L21.0302 13.2089H21.03L18.2723 14.685L19.4318 15.321L18.3424 16.4767L18.3302 16.4892C17.9619 16.1055 17.7354 15.586 17.7354 15.0148C17.7354 13.8365 18.6989 12.878 19.8831 12.878C20.1083 12.878 20.3255 12.9128 20.5295 12.977L21.4008 12.5236C21.2856 12.4548 21.1653 12.3938 21.0406 12.341C20.6788 12.1878 20.2945 12.1104 19.8985 12.1104C19.5027 12.1104 19.1184 12.188 18.7565 12.341C18.407 12.4887 18.0934 12.7002 17.824 12.9695C17.5546 13.2388 17.3433 13.5524 17.1955 13.9018C17.0424 14.2637 16.9648 14.648 16.9648 15.0439C16.9648 15.4398 17.0424 15.8241 17.1955 16.1859C17.3329 16.5112 17.5259 16.8055 17.7693 17.0621L17.0505 17.7334L21.3457 15.3135L20.3264 14.6466L21.4235 13.5297L21.4243 13.5288C21.7991 13.9136 22.0303 14.4378 22.0303 15.0149C22.0303 16.1932 21.0668 17.1517 19.8826 17.1517C19.6384 17.1517 19.4037 17.1108 19.1849 17.0359L18.3062 17.5085C18.4484 17.6007 18.5987 17.6804 18.7565 17.747C19.1182 17.9002 19.5024 17.9776 19.8985 17.9776C20.2943 17.9776 20.6786 17.9 21.0406 17.747C21.39 17.5993 21.7036 17.3878 21.973 17.1185C22.2424 16.8492 22.4537 16.5355 22.6015 16.1862C22.7546 15.8243 22.8321 15.44 22.8321 15.0441C22.8325 14.6478 22.7547 14.2637 22.6017 13.9018Z" fill="url(#paint7_linear_281_206872)" />
                                              <path d="M22.6017 13.4731C22.4545 13.1249 22.2436 12.8119 21.9756 12.5432L21.9763 12.5423L22.7934 11.8364L21.0302 12.7801H21.03L18.2723 14.2563L19.4318 14.8923L18.3424 16.0479L18.3302 16.0605C17.9619 15.6768 17.7354 15.1573 17.7354 14.5861C17.7354 13.4078 18.6989 12.4493 19.8831 12.4493C20.1083 12.4493 20.3255 12.4841 20.5295 12.5483L21.4008 12.0949C21.2856 12.0261 21.1653 11.9651 21.0406 11.9123C20.6788 11.7591 20.2945 11.6816 19.8985 11.6816C19.5027 11.6816 19.1184 11.7593 18.7565 11.9123C18.407 12.0599 18.0934 12.2715 17.824 12.5408C17.5546 12.81 17.3433 13.1237 17.1955 13.4731C17.0424 13.835 16.9648 14.2193 16.9648 14.6152C16.9648 15.011 17.0424 15.3953 17.1955 15.7572C17.3329 16.0825 17.5259 16.3768 17.7693 16.6334L17.0505 17.3047L21.3457 14.8848L20.3264 14.2178L21.4235 13.101L21.4243 13.1001C21.7991 13.4849 22.0303 14.0091 22.0303 14.5862C22.0303 15.7645 21.0668 16.723 19.8826 16.723C19.6384 16.723 19.4037 16.6821 19.1849 16.6072L18.3062 17.0798C18.4484 17.1719 18.5987 17.2516 18.7565 17.3183C19.1182 17.4715 19.5024 17.5489 19.8985 17.5489C20.2943 17.5489 20.6786 17.4712 21.0406 17.3183C21.39 17.1706 21.7036 16.9591 21.973 16.6898C22.2424 16.4205 22.4537 16.1068 22.6015 15.7574C22.7546 15.3956 22.8321 15.0113 22.8321 14.6154C22.8325 14.2191 22.7547 13.835 22.6017 13.4731Z" fill="url(#paint8_linear_281_206872)" />
                                              <path d="M25.4675 31.7485C26.0925 31.7485 26.5991 31.2419 26.5991 30.6169C26.5991 29.992 26.0925 29.4854 25.4675 29.4854C24.8426 29.4854 24.3359 29.992 24.3359 30.6169C24.3359 31.2419 24.8426 31.7485 25.4675 31.7485Z" fill="url(#paint9_linear_281_206872)" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_206872" x1="20.7782" y1="12.6362" x2="20.7782" y2="39.5661" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#0056FF" />
                                                  <stop offset="1" stop-color="#003499" />
                                                </linearGradient>
                                                <radialGradient id="paint1_radial_281_206872" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(13.5226)">
                                                  <stop stop-color="#3378FF" />
                                                  <stop offset="1" stop-color="#002366" />
                                                </radialGradient>
                                                <linearGradient id="paint2_linear_281_206872" x1="19.966" y1="43.4001" x2="19.966" y2="19.4961" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#262626" />
                                                  <stop offset="1" stop-color="#7B7B7B" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206872" x1="19.942" y1="36.5458" x2="19.942" y2="14.7051" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#262626" />
                                                  <stop offset="1" stop-color="#7B7B7B" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206872" x1="20.228" y1="10.763" x2="20.228" y2="21.1749" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#00AAFF" />
                                                  <stop offset="1" stop-color="#0068EF" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206872" x1="19.8978" y1="8.25073" x2="19.8978" y2="14.7173" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#78D2FF" />
                                                  <stop offset="1" stop-color="#00A6F9" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206872" x1="19.8914" y1="14.7171" x2="19.8914" y2="21.1836" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#2F74FF" />
                                                  <stop offset="1" stop-color="#144BB8" />
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_281_206872" x1="20.2234" y1="13.3578" x2="21.14" y2="17.6184" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#006699" />
                                                  <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_281_206872" x1="21.2786" y1="12.6472" x2="12.8484" y2="22.2732" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#78D2FF" />
                                                </linearGradient>
                                                <linearGradient id="paint9_linear_281_206872" x1="25.4675" y1="29.7524" x2="25.4675" y2="31.748" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FFD500" />
                                                  <stop offset="1" stop-color="#FF9500" />
                                                </linearGradient>
                                              </defs>
                                            </svg>



                                          </div>
                                          <p className="tableimgtext">
                                            Empower
                                          </p>
                                        </div>
                                      </td>
                                      <td>Techwiz</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">
                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
                                              <path d="M19.3605 38.7211C30.053 38.7211 38.7211 30.053 38.7211 19.3605C38.7211 8.668 30.053 0 19.3605 0C8.668 0 0 8.668 0 19.3605C0 30.053 8.668 38.7211 19.3605 38.7211Z" fill="#FF0055" />
                                              <path d="M19.3526 34.1424C27.5166 34.1424 34.1348 27.5242 34.1348 19.3601C34.1348 11.1961 27.5166 4.57788 19.3526 4.57788C11.1886 4.57788 4.57031 11.1961 4.57031 19.3601C4.57031 27.5242 11.1886 34.1424 19.3526 34.1424Z" fill="#FF9999" />
                                              <path d="M19.3597 32.4509C26.5892 32.4509 32.4499 26.5902 32.4499 19.3607C32.4499 12.1312 26.5892 6.27051 19.3597 6.27051C12.1302 6.27051 6.26953 12.1312 6.26953 19.3607C6.26953 26.5902 12.1302 32.4509 19.3597 32.4509Z" fill="#990033" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3154 6.60858C20.3707 6.15782 18.3487 6.15782 16.4039 6.60858L19.3597 19.3607L22.3154 6.60858ZM12.4327 8.25353C10.7388 9.30993 9.30895 10.7398 8.25255 12.4336L19.3597 19.3607L12.4327 8.25353ZM6.6076 16.4049C6.15684 18.3497 6.15684 20.3717 6.6076 22.3164L19.3597 19.3607L6.6076 16.4049ZM8.25255 26.2878C9.30895 27.9816 10.7388 29.4114 12.4327 30.4678L19.3597 19.3607L8.25255 26.2878ZM16.4039 32.1128C18.3487 32.5636 20.3707 32.5636 22.3154 32.1128L19.3597 19.3607L16.4039 32.1128ZM26.2868 30.4678C27.9807 29.4114 29.4104 27.9816 30.4669 26.2878L19.3597 19.3607L26.2868 30.4678ZM32.1119 22.3164C32.5626 20.3717 32.5626 18.3497 32.1119 16.4049L19.3597 19.3607L32.1119 22.3164ZM30.4669 12.4336C29.4104 10.7398 27.9807 9.30993 26.2868 8.25353L19.3597 19.3607L30.4669 12.4336Z" fill="url(#paint0_radial_281_206910)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5703 28.6587C26.2043 31.0025 22.9496 32.4509 19.3596 32.4509C15.7696 32.4509 12.5149 31.0025 10.1489 28.6587C10.6137 25.3864 13.4267 22.87 16.8272 22.87H21.8921C25.2925 22.87 28.1055 25.3864 28.5703 28.6587Z" fill="url(#paint1_linear_281_206910)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8783 19.5125H16.8359V23.9327C16.8359 24.6013 17.1015 25.2426 17.5744 25.7153C18.0472 26.1882 18.6884 26.4538 19.3571 26.4538C20.0257 26.4538 20.667 26.1882 21.1398 25.7153C21.6127 25.2426 21.8783 24.6013 21.8783 23.9327V19.5125Z" fill="#F57D3D" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3978 19.0032C26.3978 18.0562 25.6301 17.2886 24.6831 17.2886H14.0389C13.0919 17.2886 12.3242 18.0562 12.3242 19.0032C12.3242 19.9502 13.0919 20.7179 14.0389 20.7179H24.6831C25.6301 20.7179 26.3978 19.9502 26.3978 19.0032Z" fill="url(#paint2_linear_281_206910)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6507 14.168H14.0781V18.4626C14.0781 21.3821 16.4448 23.7489 19.3644 23.7489C20.7664 23.7489 22.111 23.192 23.1024 22.2005C24.0938 21.2092 24.6507 19.8646 24.6507 18.4626V14.168Z" fill="url(#paint3_linear_281_206910)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.089 18.4645C14.089 18.4645 12.1373 16.0098 12.7288 13.4437C13.3201 10.8777 15.2596 10.9903 15.2596 10.9903C15.2596 10.9903 15.4626 9.07198 18.7785 8.73562C22.0945 8.39926 24.9837 10.7291 26.412 9.88122C26.412 9.88122 26.4066 11.8773 25.546 13.0282C25.546 13.0282 26.8413 15.8058 24.6616 18.463C24.6616 18.463 24.5873 15.3435 23.5511 14.1399C23.5511 14.1399 17.896 17.7186 15.6305 14.1399C15.6305 14.1399 14.089 15.6526 14.089 18.4645Z" fill="url(#paint4_linear_281_206910)" />
                                              <path d="M19.3747 39.9999C23.1154 39.9999 26.1479 36.9675 26.1479 33.2268C26.1479 29.4861 23.1154 26.4536 19.3747 26.4536C15.634 26.4536 12.6016 29.4861 12.6016 33.2268C12.6016 36.9675 15.634 39.9999 19.3747 39.9999Z" fill="url(#paint5_linear_281_206910)" />
                                              <path d="M19.3659 32.461C21.7599 32.461 23.7006 31.3804 23.7006 30.0474C23.7006 28.7144 21.7599 27.6338 19.3659 27.6338C16.9719 27.6338 15.0312 28.7144 15.0312 30.0474C15.0312 31.3804 16.9719 32.461 19.3659 32.461Z" fill="url(#paint6_linear_281_206910)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7144 33.821L21.777 30.5305C22.1952 30.0817 22.899 30.0562 23.3478 30.4739C23.7966 30.8916 23.8221 31.5951 23.4039 32.0442L19.9767 35.7267C19.6503 36.0789 19.1913 36.2783 18.7093 36.2772C18.2299 36.2762 17.7709 36.0745 17.4445 35.7211L15.3254 33.4215C14.9098 32.9706 14.9378 32.267 15.3892 31.8514C15.8405 31.4357 16.5418 31.4643 16.9574 31.9151L18.7144 33.821Z" fill="white" />
                                              <defs>
                                                <radialGradient id="paint0_radial_281_206910" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.3597 19.3607) scale(21.1659 21.1659)">
                                                  <stop stop-color="#FF9F66" />
                                                  <stop offset="1" stop-color="#FF9F66" stop-opacity="0" />
                                                </radialGradient>
                                                <linearGradient id="paint1_linear_281_206910" x1="19.3596" y1="32.4509" x2="19.3596" y2="17.2895" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FF9500" />
                                                  <stop offset="1" stop-color="#FFD500" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_281_206910" x1="21.8821" y1="14.1676" x2="21.8821" y2="19.5115" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FED9B4" />
                                                  <stop offset="1" stop-color="#F79E61" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206910" x1="19.8119" y1="8.15771" x2="19.8119" y2="23.73" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#FED9B4" />
                                                  <stop offset="1" stop-color="#F79E61" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206910" x1="19.5146" y1="20.7186" x2="19.5146" y2="8.70243" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#49200A" />
                                                  <stop offset="1" stop-color="#A67459" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206910" x1="19.3747" y1="17.0369" x2="19.3747" y2="40" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#6CD6FD" />
                                                  <stop offset="1" stop-color="#3359FF" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206910" x1="19.3659" y1="24.2424" x2="19.3659" y2="32.4609" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B5EAFE" />
                                                  <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                          </div>
                                          <p className="tableimgtext">
                                            LOOKING GOOD
                                          </p>
                                        </div>
                                      </td>
                                      <td>Launchpad</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">
                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1811 11.5727C35.8045 11.2266 36.2475 10.6278 36.3957 9.93051C36.5442 9.23323 36.3836 8.50564 35.9552 7.93583C32.2079 2.98053 26.321 0 20.0019 0C13.6828 0 7.79585 2.98053 4.04923 7.93627C3.62104 8.50608 3.46038 9.23323 3.60864 9.93029C3.75713 10.6273 4.19993 11.2262 4.82307 11.572C4.85781 11.5922 4.89278 11.6116 4.92752 11.6309C5.85494 12.1458 7.02068 11.8874 7.6436 11.0285C10.4938 7.10113 15.0758 4.72892 20.0019 4.72892C24.8914 4.72892 29.442 7.06594 32.2966 10.9416C32.962 11.848 34.1977 12.1184 35.1809 11.5725C35.1811 11.5727 35.1811 11.5727 35.1811 11.5727Z" fill="url(#paint1_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8189 28.4273C4.19554 28.7734 3.75252 29.3722 3.60425 30.0695C3.45577 30.7668 3.61643 31.4944 4.04484 32.0642C7.79213 37.0195 13.679 40 19.9981 40C26.3172 40 32.2041 37.0195 35.9508 32.0637C36.379 31.4939 36.5396 30.7668 36.3914 30.0697C36.2429 29.3727 35.8001 28.7738 35.1769 28.428C35.1422 28.4078 35.1072 28.3884 35.0725 28.3691C34.1451 27.8542 32.9793 28.1126 32.3564 28.9715C29.5062 32.8989 24.9242 35.2711 19.9981 35.2711C15.1086 35.2711 10.558 32.9341 7.70339 29.0584C7.03798 28.152 5.80231 27.8816 4.81913 28.4275C4.8189 28.4273 4.8189 28.4273 4.8189 28.4273Z" fill="#808080" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0732 4.14848C27.3642 3.49657 27.3584 2.75039 27.0573 2.10312C26.7561 1.45585 26.1887 0.97101 25.5025 0.774286C23.7149 0.261783 21.8601 0 19.9913 0C18.1226 0 16.2677 0.261783 14.4802 0.774286C13.7939 0.971232 13.2268 1.45585 12.9254 2.10312C12.6242 2.75039 12.6185 3.49657 12.9097 4.14848C12.9261 4.18521 12.9424 4.22195 12.9588 4.25868C13.3905 5.22505 14.4744 5.7183 15.4866 5.40916C16.9422 4.95906 18.4607 4.72892 19.9913 4.72892C21.4863 4.72892 22.9696 4.94844 24.3945 5.37751C25.4691 5.69816 26.6151 5.17238 27.0728 4.14826C27.0732 4.14848 27.0732 4.14848 27.0732 4.14848Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9268 35.8515C12.6358 36.5034 12.6416 37.2496 12.9427 37.8969C13.2439 38.5441 13.8113 39.029 14.4975 39.2257C16.2851 39.7382 18.1399 40 20.0087 40C21.8774 40 23.7323 39.7382 25.5198 39.2257C26.2061 39.0288 26.7732 38.5441 27.0746 37.8969C27.3758 37.2496 27.3815 36.5034 27.0903 35.8515C27.0739 35.8148 27.0576 35.7781 27.0412 35.7413C26.6095 34.775 25.5256 34.2817 24.5134 34.5908C23.0578 35.0409 21.5393 35.2711 20.0087 35.2711C18.5137 35.2711 17.0304 35.0516 15.6055 34.6225C14.5309 34.3018 13.3849 34.8276 12.9272 35.8517C12.9268 35.8515 12.9268 35.8515 12.9268 35.8515Z" fill="#666666" />
                                              <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#E6E6E6" />
                                              <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#808080" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 11.6357C19.2939 11.3067 19.6298 11.0986 19.9974 11.0986C20.365 11.0986 20.701 11.3067 20.8649 11.6357C21.7224 13.3582 22.9777 15.8789 23.4827 16.8932C23.6224 17.1738 23.8892 17.3695 24.1988 17.4184C25.3336 17.5978 28.1795 18.0477 30.1185 18.3542C30.4835 18.4119 30.7839 18.672 30.893 19.025C31.0021 19.3779 30.9012 19.7622 30.6325 20.0158C29.2367 21.3339 27.2076 23.25 26.3749 24.0362C26.1389 24.2592 26.0302 24.5856 26.0855 24.9056C26.2845 26.0595 26.777 28.9134 27.1141 30.8668C27.1774 31.2336 27.025 31.6042 26.7219 31.8204C26.419 32.0365 26.0189 32.0601 25.6927 31.8808C23.9784 30.9391 21.4882 29.5711 20.464 29.0085C20.1735 28.8489 19.8214 28.8489 19.5309 29.0085C18.5067 29.5711 16.0165 30.9391 14.3022 31.8808C13.976 32.0601 13.5759 32.0365 13.2729 31.8204C12.9699 31.6042 12.8175 31.2336 12.8808 30.8668C13.2179 28.9134 13.7104 26.0595 13.9095 24.9056C13.9647 24.5856 13.856 24.2592 13.6199 24.0362C12.7873 23.25 10.7582 21.3339 9.36233 20.0158C9.09374 19.7622 8.99273 19.3779 9.1019 19.025C9.21107 18.672 9.51142 18.4119 9.87632 18.3542C11.8153 18.0477 14.6614 17.5978 15.7961 17.4184C16.1057 17.3695 16.3725 17.1738 16.5122 16.8932C17.0173 15.8789 18.2724 13.3582 19.13 11.6357Z" fill="url(#paint2_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 9.02463C19.2939 8.69557 19.6298 8.48755 19.9974 8.48755C20.365 8.48755 20.701 8.69557 20.8649 9.02463C21.7224 10.7471 22.9777 13.2678 23.4827 14.2821C23.6224 14.5627 23.8892 14.7584 24.1988 14.8073C25.3336 14.9867 28.1795 15.4366 30.1185 15.7431C30.4835 15.8008 30.7839 16.0609 30.893 16.4139C31.0021 16.7668 30.9012 17.1511 30.6325 17.4047C29.2367 18.7228 27.2076 20.6389 26.3749 21.4252C26.1389 21.6481 26.0302 21.9746 26.0855 22.2945C26.2845 23.4484 26.777 26.3023 27.1141 28.2557C27.1774 28.6225 27.025 28.9931 26.7219 29.2093C26.419 29.4255 26.0189 29.449 25.6927 29.2697C23.9784 28.328 21.4882 26.96 20.464 26.3974C20.1735 26.2378 19.8214 26.2378 19.5309 26.3974C18.5067 26.96 16.0165 28.328 14.3022 29.2697C13.976 29.449 13.5759 29.4255 13.2729 29.2093C12.9699 28.9931 12.8175 28.6225 12.8808 28.2557C13.2179 26.3023 13.7104 23.4484 13.9095 22.2945C13.9647 21.9746 13.856 21.6481 13.6199 21.4252C12.7873 20.6389 10.7582 18.7228 9.36233 17.4047C9.09374 17.1511 8.99273 16.7668 9.1019 16.4139C9.21107 16.0609 9.51142 15.8008 9.87632 15.7431C11.8153 15.4366 14.6614 14.9867 15.7961 14.8073C16.1057 14.7584 16.3725 14.5627 16.5122 14.2821C17.0173 13.2678 18.2724 10.7471 19.13 9.02463Z" fill="#999999" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.48755C20.3676 8.48755 20.7036 8.69557 20.8673 9.02464L23.4853 14.2821C23.5548 14.4218 23.6557 14.5404 23.7779 14.6303L20 19.9724V8.48755Z" fill="url(#paint3_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2853 29.2152C13.2823 29.2131 13.2793 29.211 13.2764 29.2089C12.9733 28.9927 12.8209 28.6221 12.8842 28.2552L13.913 22.2941C13.9407 22.1328 13.927 21.97 13.8762 21.8195L20.0009 19.9719L13.2853 29.2152Z" fill="url(#paint4_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0008 26.277C19.8401 26.2769 19.6795 26.3168 19.5342 26.3966L14.3055 29.269C13.9825 29.4465 13.5871 29.4252 13.2852 29.2148L20.0008 19.9716L20.0008 26.277Z" fill="url(#paint5_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7753 14.6299C23.8986 14.7207 24.0433 14.7823 24.1988 14.8068L30.1185 15.7427C30.4835 15.8004 30.7838 16.0604 30.8929 16.4134C30.8947 16.419 30.8964 16.4245 30.898 16.4301L19.9974 19.9719L23.7753 14.6299Z" fill="url(#paint6_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8984 16.4299C30.9994 16.7782 30.8974 17.1545 30.633 17.4041L26.3755 21.4246C26.2584 21.5352 26.1725 21.6711 26.1226 21.8193L19.9979 19.9717L30.8984 16.4299Z" fill="url(#paint7_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.1238 21.8195C26.073 21.97 26.0593 22.1328 26.087 22.2941L27.1158 28.2552C27.1791 28.6221 27.0267 28.9927 26.7236 29.2089C26.7207 29.211 26.7177 29.2131 26.7147 29.2152L19.9991 19.9719L26.1238 21.8195Z" fill="url(#paint8_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7148 29.2148C26.4129 29.4252 26.0175 29.4465 25.6945 29.269L20.4658 26.3966C20.3205 26.3168 20.1599 26.2769 19.9992 26.277L19.9992 19.9716L26.7148 29.2148Z" fill="url(#paint9_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2221 14.6303C16.3443 14.5404 16.4452 14.4218 16.5147 14.2821L19.1327 9.02464C19.2964 8.69557 19.6324 8.48755 20 8.48755V19.9724L16.2221 14.6303Z" fill="url(#paint10_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.10204 16.4301C9.10365 16.4245 9.1053 16.419 9.10705 16.4134C9.21623 16.0604 9.51655 15.8004 9.88145 15.7427L15.8012 14.8068C15.9567 14.7823 16.1014 14.7207 16.2247 14.6299L20.0026 19.9719L9.10204 16.4301Z" fill="url(#paint11_linear_281_206937)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8774 21.8193C13.8275 21.6711 13.7416 21.5352 13.6245 21.4246L9.36701 17.4041C9.10259 17.1545 9.0006 16.7782 9.10156 16.4299L20.0021 19.9717L13.8774 21.8193Z" fill="url(#paint12_linear_281_206937)" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_206937" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B3B3B3" />
                                                  <stop offset="1" stop-color="#999999" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_281_206937" x1="2.51592" y1="0.213543" x2="2.51592" y2="12.5285" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E6E6E6" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_281_206937" x1="20.8582" y1="17.3315" x2="20.8582" y2="34.5769" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#4D4D4D" />
                                                  <stop offset="1" stop-color="#4D4D4D" stop-opacity="0" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#CCCCCC" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_206937" x1="12.6686" y1="30.064" x2="19.9164" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#CCCCCC" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_206937" x1="12.6685" y1="30.0637" x2="19.9658" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#999999" />
                                                  <stop offset="1" stop-color="#666666" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_206937" x1="31.8614" y1="16.1171" x2="19.9974" y2="19.8874" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#CCCCCC" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_281_206937" x1="31.8618" y1="16.1169" x2="20.0545" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B3B3B3" />
                                                  <stop offset="1" stop-color="#808080" />
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_281_206937" x1="27.3314" y1="30.064" x2="20.0836" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#CCCCCC" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint9_linear_281_206937" x1="27.3315" y1="30.0637" x2="20.0342" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B3B3B3" />
                                                  <stop offset="1" stop-color="#737373" />
                                                </linearGradient>
                                                <linearGradient id="paint10_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E6E6E6" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint11_linear_281_206937" x1="8.13864" y1="16.1171" x2="23.732" y2="21.0969" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#E6E6E6" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint12_linear_281_206937" x1="8.13816" y1="16.1169" x2="19.9455" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#B3B3B3" />
                                                  <stop offset="1" stop-color="#808080" />
                                                </linearGradient>
                                              </defs>
                                            </svg>

                                          </div>
                                          <p className="tableimgtext">
                                            SILVER
                                          </p>
                                        </div>
                                      </td>
                                      <td>Staking</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgd">

                                            <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                              <path d="M19.9998 39.3097C31.0453 39.3097 39.9995 30.5099 39.9995 19.6547C39.9995 8.79958 31.0453 -0.000244141 19.9998 -0.000244141C8.9542 -0.000244141 0 8.79958 0 19.6547C0 30.5099 8.9542 39.3097 19.9998 39.3097Z" fill="url(#paint0_linear_281_207109)" />
                                              <path d="M19.9969 34.6614C28.4305 34.6614 35.2672 27.9425 35.2672 19.6543C35.2672 11.3661 28.4305 4.64722 19.9969 4.64722C11.5633 4.64722 4.72656 11.3661 4.72656 19.6543C4.72656 27.9425 11.5633 34.6614 19.9969 34.6614Z" fill="#78D2FF" />
                                              <path d="M19.9872 32.9435C27.4555 32.9435 33.5096 26.9937 33.5096 19.6543C33.5096 12.3148 27.4555 6.36499 19.9872 6.36499C12.519 6.36499 6.46484 12.3148 6.46484 19.6543C6.46484 26.9937 12.519 32.9435 19.9872 32.9435Z" fill="#0A265C" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48992 20.3093C6.47844 20.0922 6.47266 19.8751 6.47266 19.6551C6.47266 17.7911 6.86579 16.0146 7.57166 14.4044L19.9962 17.2328L6.48992 20.3093ZM19.9962 17.2328L9.76962 10.9641C10.9375 9.63868 12.3665 8.54174 13.9791 7.75216L19.9962 17.2328ZM19.9962 17.2328L17.4855 6.59599C18.3004 6.44371 19.1382 6.36475 19.9962 6.36475C20.8541 6.36475 21.692 6.44371 22.5069 6.59599L19.9962 17.2328ZM19.9962 17.2328L26.0133 7.75216C27.6259 8.54174 29.0549 9.63868 30.2228 10.9641L19.9962 17.2328ZM19.9962 17.2328L32.4207 14.4044C33.1266 16.0146 33.5197 17.7911 33.5197 19.6551C33.5197 19.8751 33.5139 20.0922 33.5025 20.3093L19.9962 17.2328ZM32.4408 24.8607C31.5197 26.9785 30.0563 28.8143 28.2228 30.1989L19.9962 17.2328L32.4408 24.8607ZM23.5887 32.4689C22.4438 32.7791 21.2415 32.9455 19.9962 32.9455C18.7509 32.9455 17.5486 32.7791 16.4037 32.4689L19.9962 17.2328L23.5887 32.4689ZM11.7696 30.1989C9.93607 28.8143 8.47268 26.9785 7.5516 24.8607L19.9962 17.2328L11.7696 30.1989Z" fill="url(#paint1_radial_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6144 9.784C28.6592 9.7364 28.7333 9.72529 28.7916 9.75836C28.8499 9.79143 28.8771 9.86005 28.8576 9.92203C28.8466 9.9523 28.8381 9.98399 28.8286 10.0118C28.6367 10.6202 28.8177 11.2841 29.2934 11.7167C29.3158 11.736 29.3393 11.7593 29.3642 11.7801C29.4127 11.8242 29.424 11.897 29.3903 11.9543C29.3567 12.0116 29.2868 12.0384 29.2238 12.0192C29.193 12.0084 29.1607 12 29.1325 11.9906C28.5134 11.8021 27.8378 11.98 27.3976 12.4475C27.3779 12.4695 27.3543 12.4925 27.3331 12.5171C27.2882 12.5647 27.2141 12.5758 27.1559 12.5427C27.0976 12.5096 27.0703 12.441 27.0898 12.379C27.1009 12.3488 27.1093 12.3171 27.1189 12.2893C27.3107 11.6809 27.1297 11.017 26.654 10.5844C26.6316 10.565 26.6082 10.5417 26.5832 10.5209C26.5348 10.4769 26.5235 10.404 26.5571 10.3468C26.5908 10.2895 26.6606 10.2627 26.7237 10.2819C26.7545 10.2927 26.7867 10.301 26.815 10.3104C27.4341 10.499 28.1096 10.3211 28.5498 9.85361C28.5695 9.83158 28.5932 9.80852 28.6144 9.784Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4521 18.7749C10.4326 18.713 10.4599 18.6443 10.5182 18.6113C10.5764 18.5782 10.6505 18.5893 10.6954 18.6369C10.7166 18.6614 10.7403 18.6845 10.76 18.7065C11.2001 19.174 11.8757 19.3519 12.4948 19.1633C12.523 19.1539 12.5553 19.1456 12.5861 19.1348C12.6491 19.1156 12.719 19.1424 12.7526 19.1997C12.7863 19.2569 12.775 19.3298 12.7265 19.3739C12.7016 19.3947 12.6781 19.4179 12.6557 19.4373C12.18 19.8699 11.999 20.5338 12.1909 21.1422C12.2004 21.17 12.2089 21.2017 12.2199 21.2319C12.2394 21.2939 12.2122 21.3625 12.1539 21.3956C12.0956 21.4287 12.0215 21.4176 11.9767 21.37C11.9555 21.3454 11.9318 21.3224 11.9121 21.3004C11.4719 20.8329 10.7964 20.655 10.1773 20.8435C10.149 20.8529 10.1168 20.8613 10.086 20.8721C10.0229 20.8913 9.95309 20.8645 9.91943 20.8072C9.88578 20.7499 9.89709 20.6771 9.94553 20.633C9.97048 20.6122 9.99394 20.5889 10.0164 20.5696C10.492 20.137 10.673 19.4731 10.4812 18.8647C10.4716 18.8369 10.4632 18.8052 10.4521 18.7749Z" fill="white" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9066 14.4089C19.9066 14.4089 17.896 11.6738 16.9824 10.4293C16.873 10.2837 16.7037 10.1901 16.5168 10.1797C16.3334 10.1658 16.1534 10.2386 16.0265 10.3703C15.6843 10.7274 15.2433 11.1919 14.9047 11.5455C14.7813 11.6772 14.7213 11.8575 14.7425 12.0343C14.7636 12.2146 14.866 12.374 15.0176 12.4711C16.2558 13.2754 18.9331 15.0087 18.9331 15.0087L19.9066 14.4089Z" fill="url(#paint2_linear_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0426 14.4089C20.0426 14.4089 22.0532 11.6738 22.9668 10.4293C23.0762 10.2837 23.2455 10.1901 23.4324 10.1797C23.6159 10.1658 23.7958 10.2386 23.9228 10.3703C24.2649 10.7274 24.7059 11.1919 25.0445 11.5455C25.168 11.6772 25.2279 11.8575 25.2068 12.0343C25.1856 12.2146 25.0833 12.374 24.9316 12.4711C23.6935 13.2754 21.0162 15.0087 21.0162 15.0087L20.0426 14.4089Z" fill="url(#paint3_linear_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6901 12.924C21.6901 12.7545 21.6203 12.5921 21.5005 12.4721C21.3775 12.3544 21.2145 12.2861 21.0416 12.2861C20.4697 12.2861 19.6384 12.2861 19.0664 12.2861C18.8935 12.2861 18.7305 12.3544 18.6075 12.4721C18.4878 12.5921 18.418 12.7545 18.418 12.924C18.418 13.3476 18.418 13.8278 18.418 13.8278H21.6901C21.6901 13.8278 21.6901 13.3476 21.6901 12.924Z" fill="url(#paint4_linear_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7607 29.7728C26.3992 31.7495 23.3404 32.9452 19.9976 32.9452C16.6547 32.9452 13.5959 31.7495 11.2344 29.7728C11.2344 29.7728 11.2344 28.2218 11.2344 26.9302C11.2344 25.9968 12.0062 25.2383 12.9589 25.2383C16.3132 25.2383 23.6819 25.2383 27.0362 25.2383C27.9889 25.2383 28.7607 25.9968 28.7607 26.9302V29.7728Z" fill="url(#paint5_linear_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 23.3402C26.05 23.5472 25.9657 23.7443 25.8163 23.8922C25.6707 24.0368 25.4677 24.1189 25.257 24.1189H14.8438C14.6331 24.1189 14.4301 24.0368 14.2845 23.8922C14.1351 23.7443 14.0508 23.5472 14.0508 23.3402V14.6069C14.0508 14.3999 14.1351 14.2027 14.2845 14.0549C14.4301 13.9103 14.6331 13.8282 14.8438 13.8282H25.257C25.4677 13.8282 25.6707 13.9103 25.8163 14.0549C25.9657 14.2027 26.05 14.3999 26.05 14.6069V23.3402Z" fill="url(#paint6_linear_281_207109)" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 18.1018H14.0508C14.0508 18.1018 14.0508 15.2923 14.0508 14.2294C14.0508 14.1229 14.0929 14.0206 14.1695 13.9456C14.2462 13.8705 14.3496 13.8282 14.4569 13.8282H25.6439C25.7512 13.8282 25.8546 13.8705 25.9312 13.9456C26.0079 14.0206 26.05 14.1229 26.05 14.2294C26.05 15.2923 26.05 18.1018 26.05 18.1018Z" fill="#A4122B" />
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8037 16.3294C26.8037 16.76 26.4501 17.1089 26.0104 17.1089C23.6176 17.1089 16.4868 17.1089 14.0941 17.1089C13.6543 17.1089 13.3008 16.76 13.3008 16.3294C13.3008 15.8087 13.3008 15.1277 13.3008 14.607C13.3008 14.1764 13.6543 13.8276 14.0941 13.8276C16.4868 13.8276 23.6176 13.8276 26.0104 13.8276C26.4501 13.8276 26.8037 14.1764 26.8037 14.607C26.8037 15.1277 26.8037 15.8087 26.8037 16.3294Z" fill="url(#paint7_linear_281_207109)" />
                                              <path d="M22.0418 13.8276H18.0859V17.1089H22.0418V13.8276Z" fill="url(#paint8_linear_281_207109)" />
                                              <path d="M22.0418 17.1094H18.0859V24.1188H22.0418V17.1094Z" fill="url(#paint9_linear_281_207109)" />
                                              <path d="M22.0418 17.1089H18.0859V18.1012H22.0418V17.1089Z" fill="#D2D2D2" />
                                              <path d="M32.989 40.0006C36.8532 40.0006 39.9858 36.922 39.9858 33.1244C39.9858 29.3268 36.8532 26.2483 32.989 26.2483C29.1247 26.2483 25.9922 29.3268 25.9922 33.1244C25.9922 36.922 29.1247 40.0006 32.989 40.0006Z" fill="url(#paint10_linear_281_207109)" />
                                              <path d="M28.1406 32.1356V31.2031H29.8528V35.4842H28.7526V32.1356H28.1406Z" fill="white" />
                                              <path d="M30.582 33.2848C30.582 32.6104 30.718 32.0826 30.9962 31.6956C31.2681 31.3085 31.707 31.115 32.3189 31.115C32.9309 31.115 33.3697 31.3085 33.6479 31.6956C33.9198 32.0826 34.0558 32.6104 34.0558 33.2848C34.0558 33.9651 33.9198 34.4988 33.6479 34.8858C33.3697 35.2729 32.9309 35.4664 32.3189 35.4664C31.707 35.4664 31.2681 35.2729 30.9962 34.8858C30.718 34.4988 30.582 33.9651 30.582 33.2848ZM33.0174 33.2848C33.0174 32.8919 32.9741 32.587 32.8814 32.37C32.7887 32.1589 32.6033 32.0533 32.3189 32.0533C32.0346 32.0533 31.8492 32.1589 31.7564 32.37C31.6637 32.587 31.6205 32.8919 31.6205 33.2848C31.6205 33.5487 31.639 33.7716 31.6699 33.9416C31.7008 34.1176 31.7688 34.2583 31.8739 34.3639C31.9728 34.4753 32.1211 34.5281 32.3189 34.5281C32.5167 34.5281 32.6651 34.4753 32.7701 34.3639C32.869 34.2583 32.937 34.1176 32.9679 33.9416C32.9989 33.7716 33.0174 33.5487 33.0174 33.2848Z" fill="white" />
                                              <path d="M34.6094 33.2848C34.6094 32.6104 34.7454 32.0826 35.0235 31.6956C35.2955 31.3085 35.7343 31.115 36.3463 31.115C36.9582 31.115 37.3971 31.3085 37.6752 31.6956C37.9472 32.0826 38.0832 32.6104 38.0832 33.2848C38.0832 33.9651 37.9472 34.4988 37.6752 34.8858C37.3971 35.2729 36.9582 35.4664 36.3463 35.4664C35.7343 35.4664 35.2955 35.2729 35.0235 34.8858C34.7454 34.4988 34.6094 33.9651 34.6094 33.2848ZM37.0447 33.2848C37.0447 32.8919 37.0015 32.587 36.9088 32.37C36.816 32.1589 36.6306 32.0533 36.3463 32.0533C36.0619 32.0533 35.8765 32.1589 35.7838 32.37C35.6911 32.587 35.6478 32.8919 35.6478 33.2848C35.6478 33.5487 35.6663 33.7716 35.6973 33.9416C35.7282 34.1176 35.7962 34.2583 35.9012 34.3639C36.0001 34.4753 36.1485 34.5281 36.3463 34.5281C36.5441 34.5281 36.6924 34.4753 36.7975 34.3639C36.8964 34.2583 36.9644 34.1176 36.9953 33.9416C37.0262 33.7716 37.0447 33.5487 37.0447 33.2848Z" fill="white" />
                                              <defs>
                                                <linearGradient id="paint0_linear_281_207109" x1="19.9998" y1="4.64758" x2="19.9998" y2="39.3097" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#00AAFF" />
                                                  <stop offset="1" stop-color="#0068EF" />
                                                </linearGradient>
                                                <radialGradient id="paint1_radial_281_207109" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9962 19.6551) scale(21.8649 21.4879)">
                                                  <stop stop-color="#33A2FF" />
                                                  <stop offset="0.994792" stop-color="#33A2FF" stop-opacity="0" />
                                                </radialGradient>
                                                <linearGradient id="paint2_linear_281_207109" x1="16.7566" y1="12.2874" x2="18.2435" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_281_207109" x1="23.1926" y1="12.2874" x2="21.7058" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_281_207109" x1="20.054" y1="12.2861" x2="19.9177" y2="14.7145" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#B3B3B3" />
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_281_207109" x1="19.9976" y1="25.2383" x2="19.9976" y2="32.9457" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#C0C0C0" />
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_281_207109" x1="20.0504" y1="24.1189" x2="20.0504" y2="12.4797" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#BB1530" />
                                                  <stop offset="1" stop-color="#CC0070" />
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_281_207109" x1="20.0522" y1="17.1089" x2="20.0522" y2="13.3976" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#BB1530" />
                                                  <stop offset="1" stop-color="#CC0070" />
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_281_207109" x1="20.0639" y1="13.8276" x2="20.0639" y2="17.1089" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#D9D9D9" />
                                                </linearGradient>
                                                <linearGradient id="paint9_linear_281_207109" x1="20.0639" y1="17.1094" x2="20.0639" y2="24.1188" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="white" />
                                                  <stop offset="1" stop-color="#D9D9D9" />
                                                </linearGradient>
                                                <linearGradient id="paint10_linear_281_207109" x1="32.989" y1="16.6884" x2="32.989" y2="40.0006" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#6CD6FD" />
                                                  <stop offset="1" stop-color="#3359FF" />
                                                </linearGradient>
                                              </defs>
                                            </svg>

                                          </div>
                                          <p className="tableimgtext">
                                            EXPLORER
                                          </p>
                                        </div>
                                      </td>
                                      <td>EXPLORER</td>
                                      <td>
                                        <span className="eleipiess">
                                          Lorum ipsum dolar set up
                                        </span>
                                      </td>
                                      <td>24/11/2023 06:04</td>
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
                          </>
                        )}
                      </div>

                    </>
                  </>
                )}
                {activeTab1 === 'link-4444' && (
                  <>
                    <div className='maintablea'>
                      <div className="maintablea_user-detailss table-responsive">
                        <table>
                          <thead>
                            <th>
                              Raffles
                            </th>
                            <th> Date/Time </th>
                            <th>
                              Tickets Spend </th>
                            <th>
                              Status
                            </th>
                            <th>
                              Reward
                            </th>

                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Gregory Stewart
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="greenstatus">
                                  Won
                                </span>
                              </td>
                              <td>Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Airpods Pro 2nd G...
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="redstatus">
                                  Did not Won
                                </span>
                              </td>
                              <td>Not Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Gregory Stewart
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="greenstatus">
                                  Won
                                </span>
                              </td>
                              <td>Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Airpods Pro 2nd G...
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="redstatus">
                                  Did not Won
                                </span>
                              </td>
                              <td>Not Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Gregory Stewart
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="greenstatus">
                                  Won
                                </span>
                              </td>
                              <td>Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Airpods Pro 2nd G...
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="redstatus">
                                  Did not Won
                                </span>
                              </td>
                              <td>Not Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Gregory Stewart
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="greenstatus">
                                  Won
                                </span>
                              </td>
                              <td>Sent</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="mainimgdiv">
                                  <div className="inerimgddd">
                                    <img src="\users-assets\rafal.svg" className="tableimgginerddimgrafal">
                                    </img>
                                  </div>
                                  <p className="tableimgtext">
                                    Airpods Pro 2nd G...
                                  </p>
                                </div>
                              </td>
                              <td>24/11/2023 06:04</td>
                              <td>1200</td>
                              <td>
                                <span className="redstatus">
                                  Did not Won
                                </span>
                              </td>
                              <td>Not Sent</td>
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
                  </>
                )}
                {activeTab1 === 'link-5555' && (
                  <>
                    <div className='maintablea_usedetails '>
                      <div className='maintablepills_usedetails  '>
                        <div className="newclanadeflaxdiv">
                          <Nav variant="pills" activeKey={activeTabiner} onSelect={handleSelectiner} className='amberpillsouterdetails amberpillsouterdetails_activity '>
                            <Nav.Item className='amberitempils  amberitempils_activity '>
                              <Nav.Link className='ineramb' eventKey="link-122">
                                Comments
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils amberitempils_activity'>
                              <Nav.Link className='ineramb' eventKey="link-233">
                                Likes
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils amberitempils_activity'>
                              <Nav.Link className='ineramb' eventKey="link-344">
                                Share
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>


                          {/* <div className="clanderbytans">
                            <button className="clanderbtnn" onClick={() => document.getElementById('datepicker-input').click()}>
                              <img src="\users-assets\calanderx.svg" alt="" />

                            </button>
                            <DatePicker
                              value={dates}
                              onChange={setDates}
                              multiple
                              numberOfMonths={2}
                              placeholderText="Select Dates"
                              className="custom-datepicker" // Add a custom class for the date picker
                            />
                          </div> */}
                          <div className="custom-tab-bars userditailactivity">
                     
                            <a className='clanderdate' onClick={() => setShowCalendar(!showcalendar)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                                <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                              </svg>
                            </a>
                            {/* {showcalendar && ( */}
                            {showcalendar && (
                              <div className="cal set-custom-calendar-div">
                                <Calendar
                                  numberOfMonths={2}
                                  disableMonthPicker
                                  disableYearPicker
                                />
                              </div>
                            )}


                          </div>

                        </div>
                      </div>
                      {activeTabiner === 'link-122' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Interacted with
                                  </th>
                                  <th> Date/Time</th>
                                  <th>
                                    Comments </th>
                                  <th>
                                    Content
                                  </th>
                                  <th>
                                    Action
                                  </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" onClick={handleShow} >Detail</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" >Detail</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" >Detail</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" >Detail</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" >Detail</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgddd">
                                          <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                          </img>
                                        </div>
                                        <p className="tableimgtext">
                                          Gregory Stewart
                                        </p>
                                      </div>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                    <td>
                                      So excited to engage with the creator of this video
                                    </td>
                                    <td>
                                      <div className="mainimgdivvid">
                                        <div className="inerimgdvide">
                                          <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                          </img>
                                        </div>
                                        <span className="">
                                          Thesis Defense: Is Eminem a Feminist?
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <button className="detailbtn" >Detail</button>
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
                        </>
                      )}
                      {activeTabiner === 'link-233' && (
                        <>
                          <>
                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Interacted with
                                    </th>
                                    <th> Date/Time</th>

                                    <th>
                                      Content
                                    </th>

                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
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
                          </>
                        </>
                      )}
                      {activeTabiner === 'link-344' && (
                        <>
                          <>

                            <div className='maintablea'>
                              <div className="maintablea_user-detailss table-responsive">
                                <table>
                                  <thead>
                                    <th>
                                      Interacted with
                                    </th>
                                    <th> Date/Time</th>

                                    <th>
                                      Content
                                    </th>

                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="mainimgdiv">
                                          <div className="inerimgddd">
                                            <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                            </img>
                                          </div>
                                          <p className="tableimgtext">
                                            Gregory Stewart
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        24/11/2023 06:04
                                      </td>
                                      <td>
                                        <div className="mainimgdivvid">
                                          <div className="inerimgdvide">
                                            <img src="\users-assets\cideo.svg" className="tableimgginerddvidd">
                                            </img>
                                          </div>
                                          <span className="">
                                            Thesis Defense: Is Eminem a Feminist?
                                          </span>
                                        </div>
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

                          </>
                        </>
                      )}
                      {activeTabiner === 'link-4445' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Date/Time
                                  </th>
                                  <th> Subscription </th>
                                  <th>Amount </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Premium Monthly </td>
                                    <td>$50 </td>
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
                        </>
                      )}
                      {activeTabiner === 'link-5446' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Date/Time
                                  </th>
                                  <th> Assets </th>
                                  <th>Price in BOLTS </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Land </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Avatar </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Furniture </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Car </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Office </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Land </td>
                                    <td>500 BOLTS </td>
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
                        </>
                      )}
                      {activeTabiner === 'link-64477' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Badge
                                  </th>
                                  <th> Type </th>
                                  <th>Price in BOLTS </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Subscription </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Mystery Box </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Tickets </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Subscription </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Mansion </td>
                                    <td>500 BOLTS </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      24/11/2023 06:04
                                    </td>
                                    <td>Mystery Box </td>
                                    <td>500 BOLTS </td>
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
                        </>
                      )}
                      {activeTabiner === 'link-34488' && (
                        <>
                          <div className='maintablea'>
                            <div className="maintablea_user-detailss table-responsive">
                              <table>
                                <thead>
                                  <th>
                                    Badge
                                  </th>
                                  <th> Type </th>
                                  <th>Task </th>
                                  <th>Completed On </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_281_206732)" />
                                            <path d="M19.9971 35.2701C28.4308 35.2701 35.2676 28.4332 35.2676 19.9995C35.2676 11.5659 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5659 4.72656 19.9995C4.72656 28.4332 11.5634 35.2701 19.9971 35.2701Z" fill="#78D2FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#0A265C" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82629C21.0318 6.36064 18.943 6.36064 16.934 6.82629L19.9874 19.9996L23.0407 6.82629ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.053L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.173C18.943 33.6386 21.0318 33.6386 23.0407 33.173L19.9874 19.9996L16.934 33.173ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.053C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.053ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8059 6.50146C22.5474 6.60499 24.2005 7.03877 25.7032 7.74086L22.8039 13.8693H17.3203L20.8059 6.50146Z" fill="#B3001E" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4755 6.70532C23.0729 6.81623 23.6566 6.96647 24.2242 7.15339L21.0465 13.8701H19.0859L22.4755 6.70532Z" fill="#D7B8B8" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5636 17.1553V15.3188C16.5636 14.3353 17.3609 13.538 18.3445 13.538H21.6477C22.6312 13.538 23.4285 14.3353 23.4285 15.3188V17.1553C23.4285 17.5513 23.7499 17.8727 24.146 17.8727C24.5419 17.8727 24.8633 17.5513 24.8633 17.1553V15.3188C24.8633 13.5429 23.4237 12.1033 21.6477 12.1033H18.3445C16.5686 12.1033 15.1289 13.5429 15.1289 15.3188V17.1553C15.1289 17.5513 15.4503 17.8727 15.8463 17.8727C16.2422 17.8727 16.5636 17.5513 16.5636 17.1553Z" fill="url(#paint2_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2758 6.49658L22.8801 14.1155C22.8801 14.1155 18.9987 14.1155 17.767 14.1155C17.5408 14.1155 17.3349 13.9851 17.2382 13.7807L14.3633 7.70367C15.8726 7.0109 17.5307 6.58797 19.2758 6.49658Z" fill="url(#paint3_linear_281_206732)" />
                                            <path d="M19.9793 33.5224C25.0313 33.5224 29.1266 29.427 29.1266 24.3751C29.1266 19.3232 25.0313 15.2278 19.9793 15.2278C14.9274 15.2278 10.832 19.3232 10.832 24.3751C10.832 29.427 14.9274 33.5224 19.9793 33.5224Z" fill="url(#paint4_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0328 20.4591C27.2876 20.3177 27.4693 20.0737 27.532 19.7891C27.5946 19.5045 27.5321 19.2067 27.3602 18.9714C25.6515 16.6367 22.9176 15.2278 19.9793 15.2278C17.1636 15.2278 14.5355 16.5216 12.8175 18.6843C12.5826 18.981 12.4899 19.3659 12.564 19.7371C12.6382 20.1082 12.8716 20.4279 13.2025 20.6116C13.2105 20.6172 13.2189 20.6218 13.2273 20.6265C13.5757 20.8199 14.0141 20.7186 14.2423 20.3918C15.5384 18.5239 17.6766 17.3906 19.9793 17.3906C22.1779 17.3906 24.2266 18.4238 25.5356 20.1428C25.8864 20.6062 26.5246 20.7408 27.0325 20.4587C27.0328 20.4591 27.0328 20.4591 27.0328 20.4591Z" fill="url(#paint5_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9437 28.2911C12.689 28.4325 12.5072 28.6766 12.4446 28.9612C12.3819 29.2458 12.4445 29.5435 12.6163 29.7788C14.325 32.1135 17.059 33.5225 19.9972 33.5225C22.813 33.5225 25.4411 32.2286 27.1591 30.066C27.394 29.7692 27.4866 29.3843 27.4125 29.0132C27.3383 28.642 27.105 28.3223 26.7741 28.1386C26.7661 28.1331 26.7577 28.1284 26.7493 28.1237C26.4008 27.9303 25.9625 28.0316 25.7343 28.3585C24.4382 30.2264 22.2999 31.3596 19.9972 31.3596C17.7986 31.3596 15.75 30.3265 14.4409 28.6074C14.0901 28.1441 13.452 28.0095 12.944 28.2916C12.9437 28.2911 12.9437 28.2911 12.9437 28.2911Z" fill="url(#paint6_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2838 17.0133C23.4036 16.7454 23.4021 16.439 23.2799 16.1722C23.1577 15.9055 22.9266 15.7043 22.6455 15.62C21.788 15.3606 20.895 15.2278 19.9949 15.2278C19.2132 15.2278 18.4367 15.328 17.6842 15.5244C17.3178 15.6214 17.0125 15.8743 16.849 16.2162C16.6856 16.5581 16.6804 16.9546 16.8351 17.3007C16.838 17.3088 16.8414 17.3165 16.845 17.3243C17.0075 17.6881 17.4187 17.8702 17.7974 17.746C18.5046 17.5109 19.2466 17.3906 19.9949 17.3906C20.6424 17.3906 21.2849 17.4806 21.9045 17.6567C22.4604 17.8151 23.048 17.5409 23.2838 17.0133Z" fill="#CCEEFF" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6966 31.7369C16.5769 32.0048 16.5783 32.3113 16.7006 32.5781C16.8227 32.8448 17.0539 33.046 17.335 33.1303C18.1925 33.3897 19.0855 33.5225 19.9855 33.5225C20.7673 33.5225 21.5438 33.4223 22.2963 33.2258C22.6626 33.1289 22.968 32.8759 23.1314 32.534C23.2949 32.1922 23.3 31.7956 23.1454 31.4496C23.1425 31.4415 23.139 31.4337 23.1355 31.4259C22.9729 31.0622 22.5617 30.8801 22.1831 31.0043C21.4758 31.2394 20.7339 31.3596 19.9855 31.3596C19.3381 31.3596 18.6955 31.2696 18.0759 31.0935C17.5201 30.9351 16.9325 31.2093 16.6966 31.7369Z" fill="#0F388A" />
                                            <path d="M19.9803 31.3595C23.8376 31.3595 26.9645 28.2326 26.9645 24.3753C26.9645 20.5181 23.8376 17.3911 19.9803 17.3911C16.123 17.3911 12.9961 20.5181 12.9961 24.3753C12.9961 28.2326 16.123 31.3595 19.9803 31.3595Z" fill="#78D2FF" />
                                            <path d="M19.9816 30.5602C23.3974 30.5602 26.1664 27.7912 26.1664 24.3754C26.1664 20.9597 23.3974 18.1907 19.9816 18.1907C16.5659 18.1907 13.7969 20.9597 13.7969 24.3754C13.7969 27.7912 16.5659 30.5602 19.9816 30.5602Z" fill="#005CB2" />
                                            <path d="M23.8057 23.2234C23.5974 22.7308 23.2993 22.2881 22.92 21.908L22.9211 21.9067L24.0769 20.9082L21.5828 22.2431H21.5825L17.6816 24.3312L19.3217 25.2309L17.7807 26.8656L17.7635 26.8834C17.2425 26.3406 16.9221 25.6058 16.9221 24.7977C16.9221 23.131 18.285 21.7751 19.9601 21.7751C20.2787 21.7751 20.5859 21.8243 20.8745 21.9151L22.107 21.2737C21.944 21.1765 21.7739 21.0902 21.5974 21.0155C21.0856 20.7988 20.5421 20.6892 19.9819 20.6892C19.4219 20.6892 18.8784 20.7991 18.3664 21.0155C17.8721 21.2243 17.4284 21.5236 17.0473 21.9045C16.6662 22.2854 16.3674 22.7291 16.1583 23.2234C15.9417 23.7353 15.832 24.2789 15.832 24.8389C15.832 25.3989 15.9417 25.9425 16.1583 26.4544C16.3527 26.9145 16.6257 27.3308 16.97 27.6938L15.9532 28.6433L22.0291 25.2203L20.5871 24.2768L22.1391 22.6969L22.1402 22.6957C22.6705 23.2401 22.9974 23.9815 22.9974 24.7979C22.9974 26.4647 21.6345 27.8206 19.9593 27.8206C19.614 27.8206 19.2819 27.7627 18.9725 27.6568L17.7295 28.3253C17.9307 28.4556 18.1432 28.5683 18.3664 28.6626C18.8781 28.8793 19.4216 28.9889 19.9819 28.9889C20.5418 28.9889 21.0854 28.879 21.5974 28.6626C22.0917 28.4537 22.5353 28.1545 22.9164 27.7736C23.2975 27.3927 23.5964 26.9489 23.8054 26.4547C24.022 25.9428 24.1317 25.3992 24.1317 24.8391C24.1322 24.2786 24.0222 23.7353 23.8057 23.2234Z" fill="url(#paint7_linear_281_206732)" />
                                            <path d="M23.8057 22.6157C23.5974 22.1232 23.2993 21.6804 22.92 21.3003L22.9211 21.299L24.0769 20.3005L21.5828 21.6355H21.5825L17.6816 23.7235L19.3217 24.6232L17.7807 26.258L17.7635 26.2758C17.2425 25.7329 16.9221 24.9981 16.9221 24.1901C16.9221 22.5233 18.285 21.1674 19.9601 21.1674C20.2787 21.1674 20.5859 21.2166 20.8745 21.3074L22.107 20.6661C21.944 20.5689 21.7739 20.4825 21.5974 20.4078C21.0856 20.1911 20.5421 20.0815 19.9819 20.0815C19.4219 20.0815 18.8784 20.1914 18.3664 20.4078C17.8721 20.6167 17.4284 20.916 17.0473 21.2968C16.6662 21.6777 16.3674 22.1215 16.1583 22.6157C15.9417 23.1276 15.832 23.6712 15.832 24.2313C15.832 24.7912 15.9417 25.3348 16.1583 25.8467C16.3527 26.3069 16.6257 26.7231 16.97 27.0862L15.9532 28.0357L22.0291 24.6127L20.5871 23.6692L22.1391 22.0893L22.1402 22.088C22.6705 22.6324 22.9974 23.3738 22.9974 24.1903C22.9974 25.857 21.6345 27.2129 19.9593 27.2129C19.614 27.2129 19.2819 27.155 18.9725 27.0491L17.7295 27.7176C17.9307 27.8479 18.1432 27.9607 18.3664 28.0549C18.8781 28.2716 19.4216 28.3812 19.9819 28.3812C20.5418 28.3812 21.0854 28.2713 21.5974 28.0549C22.0917 27.8461 22.5353 27.5468 22.9164 27.1659C23.2975 26.785 23.5964 26.3413 23.8054 25.847C24.022 25.3351 24.1317 24.7915 24.1317 24.2315C24.1322 23.6709 24.0222 23.1276 23.8057 22.6157Z" fill="url(#paint8_linear_281_206732)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5339 6.70093L21.0415 14.1154C21.0415 14.1154 20.1311 14.1154 19.6013 14.1154C19.3752 14.1154 19.1693 13.9851 19.0726 13.7807L15.9141 7.10429C16.4409 6.93769 16.9816 6.80251 17.5339 6.70093Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206732" x1="21.0505" y1="7.77016" x2="21.0505" y2="39.9728" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206732" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                <stop stop-color="#33A2FF" />
                                                <stop offset="1" stop-color="#33A2FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206732" x1="20.0951" y1="12.1033" x2="20.0951" y2="16.7288" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206732" x1="16.808" y1="7.77059" x2="19.083" y2="14.9884" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E61A5E" />
                                                <stop offset="1" stop-color="#CC0022" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206732" x1="20.4598" y1="18.7816" x2="20.4598" y2="33.5099" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206732" x1="19.9794" y1="15.2278" x2="19.9794" y2="24.3751" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#78D2FF" />
                                                <stop offset="1" stop-color="#00A6F9" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206732" x1="19.9973" y1="24.3751" x2="19.9973" y2="33.5225" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2F74FF" />
                                                <stop offset="1" stop-color="#144BB8" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206732" x1="20.4415" y1="22.4538" x2="21.7381" y2="28.4807" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#006699" />
                                                <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206732" x1="21.9342" y1="21.4474" x2="10.009" y2="35.064" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          GENESIS
                                        </p>
                                      </div>
                                    </td>
                                    <td>Techwiz</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206794)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#DE99FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#2D0066" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0407 6.82628C21.0318 6.36064 18.943 6.36064 16.934 6.82628L19.9874 19.9996L23.0407 6.82628ZM12.8315 8.52557C11.0817 9.61686 9.60465 11.0939 8.51336 12.8437L19.9874 19.9996L12.8315 8.52557ZM6.81408 16.9462C6.34843 18.9552 6.34843 21.044 6.81408 23.0529L19.9874 19.9996L6.81408 16.9462ZM8.51336 27.1555C9.60465 28.9053 11.0817 30.3823 12.8315 31.4736L19.9874 19.9996L8.51336 27.1555ZM16.934 33.1729C18.943 33.6386 21.0318 33.6386 23.0407 33.1729L19.9874 19.9996L16.934 33.1729ZM27.1433 31.4736C28.8931 30.3823 30.3701 28.9053 31.4614 27.1555L19.9874 19.9996L27.1433 31.4736ZM33.1607 23.0529C33.6264 21.044 33.6264 18.9552 33.1607 16.9462L19.9874 19.9996L33.1607 23.0529ZM31.4614 12.8437C30.3701 11.0939 28.8931 9.61686 27.1433 8.52557L19.9874 19.9996L31.4614 12.8437Z" fill="url(#paint1_radial_281_206794)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8137 6.50122C22.5552 6.60475 24.2083 7.03852 25.711 7.74062L22.8117 13.8691H17.3281L20.8137 6.50122Z" fill="#B3001E" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4794 6.7041C23.0768 6.81501 23.6605 6.96525 24.2281 7.15216L21.0504 13.8689H19.0898L22.4794 6.7041Z" fill="#D7B8B8" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9255 16.6427C16.9255 17.2419 16.439 17.7285 15.8397 17.7285C15.2404 17.7285 14.7539 17.2419 14.7539 16.6427V14.8061C14.7539 12.8268 16.3585 11.2222 18.3379 11.2222H21.6411C23.6206 11.2222 25.2253 12.8268 25.2253 14.8061V16.6427C25.2253 17.2419 24.7386 17.7285 24.1395 17.7285C23.54 17.7285 23.0536 17.2419 23.0536 16.6427V14.8061C23.0536 14.0261 22.4213 13.3938 21.6411 13.3938H18.3379C17.5578 13.3938 16.9255 14.0261 16.9255 14.8061V16.6427Z" fill="url(#paint2_linear_281_206794)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2797 6.49634L22.884 14.1152C22.884 14.1152 19.0026 14.1152 17.7709 14.1152C17.5447 14.1152 17.3388 13.9849 17.2421 13.7804L14.3672 7.70342C15.8765 7.01066 17.5346 6.58773 19.2797 6.49634Z" fill="url(#paint3_linear_281_206794)" />
                                            <path d="M19.9871 33.5221C25.0391 33.5221 29.1344 29.4268 29.1344 24.3748C29.1344 19.3229 25.0391 15.2275 19.9871 15.2275C14.9352 15.2275 10.8398 19.3229 10.8398 24.3748C10.8398 29.4268 14.9352 33.5221 19.9871 33.5221Z" fill="url(#paint4_linear_281_206794)" />
                                            <path d="M19.9881 31.3593C23.8454 31.3593 26.9723 28.2324 26.9723 24.3751C26.9723 20.5178 23.8454 17.3909 19.9881 17.3909C16.1308 17.3909 13.0039 20.5178 13.0039 24.3751C13.0039 28.2324 16.1308 31.3593 19.9881 31.3593Z" fill="url(#paint5_linear_281_206794)" />
                                            <path d="M19.9894 30.5597C23.4052 30.5597 26.1742 27.7907 26.1742 24.3749C26.1742 20.9592 23.4052 18.1902 19.9894 18.1902C16.5737 18.1902 13.8047 20.9592 13.8047 24.3749C13.8047 27.7907 16.5737 30.5597 19.9894 30.5597Z" fill="url(#paint6_linear_281_206794)" />
                                            <path d="M16.9805 26.3807V25.178L19.7353 21.2373H21.4003V25.0907H22.1151V26.3807H21.4003V27.5142H19.9094V26.3807H16.9805ZM20.0142 22.8763L18.5494 25.0907H20.0142V22.8763Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5417 6.70068L21.0493 14.1152C21.0493 14.1152 20.1389 14.1152 19.6091 14.1152C19.383 14.1152 19.1771 13.9848 19.0804 13.7804L15.9219 7.10404C16.4488 6.93744 16.9894 6.80226 17.5417 6.70068Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206794" x1="23.2261" y1="6.47747" x2="23.2261" y2="39.7406" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BE00FF" />
                                                <stop offset="1" stop-color="#5500FF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206794" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(21.865)">
                                                <stop stop-color="#BE00FF" />
                                                <stop offset="1" stop-color="#BE00FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206794" x1="19.9895" y1="11.2222" x2="19.9895" y2="17.7285" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B1B1B1" />
                                                <stop offset="1" stop-color="#747474" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206794" x1="16.812" y1="7.77034" x2="19.0869" y2="14.9882" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E61A5E" />
                                                <stop offset="1" stop-color="#CC0022" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206794" x1="19.9871" y1="15.2275" x2="19.9871" y2="33.5221" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#747474" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206794" x1="19.9881" y1="21.1243" x2="19.9881" y2="33.5224" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206794" x1="19.9519" y1="30.5597" x2="19.9519" y2="18.1902" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#3A3A3A" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </div>
                                        <p className="tableimgtext">
                                          RUNNER UP
                                        </p>
                                      </div>
                                    </td>
                                    <td>Arcadia</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">

                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206820)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#FFE978" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#994000" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0713 10.8065C19.244 10.4597 19.598 10.2405 19.9855 10.2405C20.3729 10.2405 20.7269 10.4597 20.8996 10.8065C21.8034 12.6218 23.1263 15.2783 23.6586 16.3474C23.8058 16.6431 24.087 16.8493 24.4133 16.9009C25.6092 17.0899 28.6085 17.5641 30.652 17.8871C31.0366 17.9479 31.3532 18.2221 31.4683 18.594C31.5833 18.966 31.4768 19.371 31.1937 19.6383C29.7226 21.0274 27.5843 23.0468 26.7067 23.8754C26.4579 24.1104 26.3433 24.4544 26.4016 24.7916C26.6113 26.0077 27.1304 29.0154 27.4857 31.0741C27.5524 31.4607 27.3918 31.8512 27.0724 32.0791C26.7531 32.3069 26.3315 32.3317 25.9877 32.1427C24.181 31.1503 21.5565 29.7086 20.4772 29.1156C20.171 28.9474 19.8 28.9474 19.4938 29.1156C18.4144 29.7086 15.7899 31.1503 13.9833 32.1427C13.6394 32.3317 13.2178 32.3069 12.8985 32.0791C12.5791 31.8512 12.4185 31.4607 12.4852 31.0741C12.8405 29.0154 13.3595 26.0077 13.5694 24.7916C13.6276 24.4544 13.513 24.1104 13.2642 23.8754C12.3867 23.0468 10.2482 21.0274 8.77714 19.6383C8.49407 19.371 8.38762 18.966 8.50267 18.594C8.61773 18.2221 8.93426 17.9479 9.31883 17.8871C11.3623 17.5641 14.3618 17.0899 15.5577 16.9009C15.8839 16.8493 16.1651 16.6431 16.3124 16.3474C16.8447 15.2783 18.1674 12.6218 19.0713 10.8065Z" fill="url(#paint1_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.087 8.48181C19.2596 8.135 19.6137 7.91577 20.0011 7.91577C20.3885 7.91577 20.7426 8.135 20.9153 8.48181C21.8191 10.2971 23.142 12.9537 23.6743 14.0227C23.8215 14.3184 24.1026 14.5246 24.429 14.5762C25.6249 14.7652 28.6242 15.2394 30.6678 15.5624C31.0524 15.6232 31.369 15.8974 31.484 16.2693C31.599 16.6413 31.4926 17.0463 31.2095 17.3136C29.7383 18.7028 27.6 20.7221 26.7224 21.5507C26.4736 21.7857 26.359 22.1298 26.4173 22.4669C26.6271 23.6831 27.1461 26.6908 27.5014 28.7495C27.5681 29.1361 27.4075 29.5266 27.0881 29.7545C26.7688 29.9823 26.3472 30.007 26.0034 29.8181C24.1967 28.8256 21.5722 27.384 20.4929 26.791C20.1867 26.6228 19.8156 26.6228 19.5094 26.791C18.43 27.384 15.8056 28.8256 13.9989 29.8181C13.6551 30.007 13.2335 29.9823 12.9141 29.7545C12.5948 29.5266 12.4341 29.1361 12.5009 28.7495C12.8561 26.6908 13.3752 23.6831 13.585 22.4669C13.6432 22.1298 13.5286 21.7857 13.2798 21.5507C12.4023 20.7221 10.2638 18.7028 8.79277 17.3136C8.5097 17.0463 8.40324 16.6413 8.5183 16.2693C8.63335 15.8974 8.94989 15.6232 9.33446 15.5624C11.378 15.2394 14.3774 14.7652 15.5733 14.5762C15.8996 14.5246 16.1808 14.3184 16.328 14.0227C16.8603 12.9537 18.1831 10.2971 19.087 8.48181Z" fill="#FFDD32" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0039 7.91577C20.3913 7.91577 20.7454 8.13501 20.918 8.48181L23.6771 14.0227C23.7503 14.1699 23.8567 14.2949 23.9855 14.3897L20.0039 20.0196V7.91577Z" fill="url(#paint2_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9337 29.7613C12.9306 29.7592 12.9274 29.7569 12.9244 29.7547C12.6049 29.5268 12.4444 29.1362 12.511 28.7496L13.5953 22.4672C13.6245 22.2972 13.61 22.1256 13.5565 21.967L20.0113 20.0198L12.9337 29.7613Z" fill="url(#paint3_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0073 26.665C19.838 26.6649 19.6687 26.707 19.5155 26.7911L14.0051 29.8183C13.6647 30.0054 13.2479 29.9829 12.9297 29.7612L20.0073 20.0198L20.0073 26.665Z" fill="url(#paint4_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.993 14.3901C24.1229 14.4858 24.2753 14.5506 24.4392 14.5765L30.6781 15.5628C31.0626 15.6236 31.3792 15.8977 31.4942 16.2696C31.4961 16.2756 31.4978 16.2814 31.4995 16.2873L20.0114 20.02L23.993 14.3901Z" fill="url(#paint5_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 16.2871C31.6064 16.6542 31.4989 17.0508 31.2203 17.3138L26.7332 21.551C26.6098 21.6676 26.5194 21.8108 26.4667 21.967L20.0119 20.0198L31.5 16.2871Z" fill="url(#paint6_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4552 21.967C26.4017 22.1256 26.3872 22.2972 26.4165 22.4672L27.5007 28.7496C27.5674 29.1362 27.4068 29.5268 27.0874 29.7547C27.0843 29.7569 27.0811 29.7592 27.078 29.7613L20.0004 20.0198L26.4552 21.967Z" fill="url(#paint7_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0781 29.7612C26.7599 29.9829 26.3432 30.0054 26.0027 29.8183L20.4923 26.7911C20.3391 26.707 20.1698 26.6649 20.0005 26.665L20.0005 20.0198L27.0781 29.7612Z" fill="url(#paint8_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0184 14.3897C16.1472 14.2949 16.2536 14.1699 16.3268 14.0227L19.0859 8.48181C19.2585 8.13501 19.6126 7.91577 20 7.91577V20.0196L16.0184 14.3897Z" fill="url(#paint9_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52004 16.2873C8.52173 16.2814 8.52347 16.2756 8.52532 16.2696C8.64038 15.8977 8.95689 15.6236 9.34146 15.5628L15.5803 14.5765C15.7442 14.5506 15.8967 14.4858 16.0266 14.3901L20.0081 20.02L8.52004 16.2873Z" fill="url(#paint10_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5528 21.967C13.5002 21.8108 13.4097 21.6676 13.2863 21.551L8.79928 17.3138C8.52061 17.0508 8.41312 16.6542 8.51953 16.2871L20.0076 20.0198L13.5528 21.967Z" fill="url(#paint11_linear_281_206820)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.414 11.3362C24.3731 11.2712 24.3827 11.1846 24.438 11.1293C24.4934 11.074 24.5799 11.0644 24.6449 11.1053C24.6761 11.127 24.7098 11.1462 24.7386 11.1654C25.3759 11.567 26.1888 11.567 26.826 11.1654C26.8549 11.1462 26.8885 11.127 26.9198 11.1053C26.9847 11.0644 27.0713 11.074 27.1266 11.1293C27.1819 11.1846 27.1915 11.2712 27.1507 11.3362C27.129 11.3674 27.1098 11.4011 27.0906 11.4299C26.689 12.0672 26.689 12.8801 27.0906 13.5173C27.1098 13.5462 27.129 13.5798 27.1507 13.6111C27.1915 13.676 27.1819 13.7626 27.1266 13.8179C27.0713 13.8732 26.9847 13.8828 26.9198 13.842C26.8885 13.8203 26.8549 13.8011 26.826 13.7819C26.1888 13.3803 25.3759 13.3803 24.7386 13.7819C24.7098 13.8011 24.6761 13.8203 24.6449 13.842C24.5799 13.8828 24.4934 13.8732 24.438 13.8179C24.3827 13.7626 24.3731 13.676 24.414 13.6111C24.4357 13.5798 24.4549 13.5462 24.4741 13.5173C24.8757 12.8801 24.8757 12.0672 24.4741 11.4299C24.4549 11.4011 24.4357 11.3674 24.414 11.3362Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4805 23.9929C28.5388 23.93 28.635 23.9154 28.7107 23.9591C28.7864 24.0028 28.8218 24.0934 28.7964 24.1753C28.7821 24.2153 28.7711 24.2572 28.7587 24.2939C28.5095 25.0978 28.7446 25.9751 29.3623 26.5468C29.3914 26.5723 29.4219 26.6031 29.4543 26.6306C29.5172 26.6888 29.5319 26.7851 29.4882 26.8607C29.4445 26.9364 29.3538 26.9718 29.2719 26.9465C29.2319 26.9322 29.19 26.9212 29.1533 26.9087C28.3494 26.6596 27.4721 26.8947 26.9005 27.5124C26.8749 27.5415 26.8442 27.572 26.8167 27.6044C26.7584 27.6673 26.6622 27.682 26.5865 27.6383C26.5108 27.5946 26.4754 27.5039 26.5008 27.422C26.5151 27.382 26.5261 27.3401 26.5385 27.3034C26.7877 26.4995 26.5526 25.6222 25.9349 25.0506C25.9058 25.025 25.8753 24.9942 25.8429 24.9667C25.78 24.9085 25.7653 24.8123 25.809 24.7366C25.8527 24.6609 25.9434 24.6255 26.0253 24.6508C26.0653 24.6651 26.1072 24.6762 26.1439 24.6886C26.9478 24.9377 27.8251 24.7026 28.3967 24.0849C28.4223 24.0558 28.453 24.0253 28.4805 23.9929Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8242 12.9311C11.8044 12.867 11.8321 12.7962 11.8912 12.762C11.9504 12.7278 12.0256 12.7393 12.0712 12.7885C12.0927 12.8138 12.1167 12.8376 12.1367 12.8604C12.5836 13.3433 13.2694 13.5271 13.8979 13.3323C13.9266 13.3226 13.9593 13.314 13.9906 13.3028C14.0546 13.283 14.1255 13.3106 14.1596 13.3698C14.1938 13.429 14.1823 13.5042 14.1331 13.5497C14.1078 13.5712 14.084 13.5953 14.0612 13.6153C13.5783 14.0622 13.3946 14.748 13.5893 15.3764C13.5991 15.4051 13.6077 15.4379 13.6188 15.4691C13.6387 15.5332 13.611 15.604 13.5518 15.6382C13.4927 15.6724 13.4174 15.6609 13.3719 15.6117C13.3504 15.5864 13.3264 15.5626 13.3064 15.5398C12.8595 15.0569 12.1737 14.8731 11.5452 15.0679C11.5165 15.0776 11.4838 15.0862 11.4525 15.0974C11.3885 15.1172 11.3176 15.0896 11.2834 15.0304C11.2493 14.9712 11.2607 14.896 11.3099 14.8505C11.3352 14.829 11.3591 14.8049 11.3818 14.7849C11.8647 14.338 12.0485 13.6522 11.8537 13.0238C11.844 12.9951 11.8354 12.9623 11.8242 12.9311Z" fill="white" />
                                            <path d="M19.9832 27.0544C23.1863 27.0544 25.7829 24.4578 25.7829 21.2547C25.7829 18.0517 23.1863 15.4551 19.9832 15.4551C16.7802 15.4551 14.1836 18.0517 14.1836 21.2547C14.1836 24.4578 16.7802 27.0544 19.9832 27.0544Z" fill="url(#paint12_linear_281_206820)" />
                                            <path d="M19.9832 25.8C23.1863 25.8 25.7829 23.2034 25.7829 20.0003C25.7829 16.7973 23.1863 14.2007 19.9832 14.2007C16.7802 14.2007 14.1836 16.7973 14.1836 20.0003C14.1836 23.2034 16.7802 25.8 19.9832 25.8Z" fill="url(#paint13_linear_281_206820)" />
                                            <path d="M19.9851 19.3446C22.035 19.3446 23.6967 18.4193 23.6967 17.2779C23.6967 16.1365 22.035 15.2112 19.9851 15.2112C17.9352 15.2112 16.2734 16.1365 16.2734 17.2779C16.2734 18.4193 17.9352 19.3446 19.9851 19.3446Z" fill="url(#paint14_linear_281_206820)" />
                                            <path d="M22.3858 18.5352H19.3562V19.8752C19.4825 19.7295 19.667 19.613 19.9 19.5256C20.1331 19.4382 20.3855 19.3897 20.6574 19.3897C21.1429 19.3897 21.541 19.4965 21.8615 19.7198C22.1916 19.9432 22.4247 20.2248 22.5703 20.5743C22.716 20.9239 22.7937 21.3026 22.7937 21.7104C22.7937 22.4679 22.5801 23.0699 22.1528 23.5069C21.7255 23.9535 21.1235 24.1769 20.3467 24.1769C19.832 24.1769 19.3756 24.0895 18.9969 23.905C18.6182 23.7302 18.3172 23.4874 18.1133 23.167C17.9094 22.8466 17.7929 22.4873 17.7734 22.0697H19.3951C19.4339 22.2736 19.531 22.4387 19.6767 22.565C19.8223 22.7009 20.0262 22.7689 20.2884 22.7689C20.5894 22.7689 20.8225 22.6718 20.9681 22.4776C21.1138 22.2834 21.1915 22.0212 21.1915 21.7007C21.1915 21.3803 21.1138 21.1375 20.9584 20.9725C20.8031 20.8074 20.5797 20.72 20.2787 20.72C20.0554 20.72 19.8806 20.7783 19.7349 20.8754C19.5893 20.9822 19.5019 21.1278 19.4533 21.3026H17.8511V17.0786H22.3858V18.5352Z" fill="#1B4DB1" />
                                            <path d="M22.3858 17.9033H19.3562V19.2434C19.4825 19.0977 19.667 18.9812 19.9 18.8938C20.1331 18.8064 20.3855 18.7578 20.6574 18.7578C21.1429 18.7578 21.541 18.8647 21.8615 19.088C22.1916 19.3113 22.4247 19.5929 22.5703 19.9425C22.716 20.2921 22.7937 20.6708 22.7937 21.0786C22.7937 21.836 22.5801 22.4381 22.1528 22.875C21.7255 23.3217 21.1235 23.545 20.3467 23.545C19.832 23.545 19.3756 23.4576 18.9969 23.2731C18.6182 23.0984 18.3172 22.8556 18.1133 22.5352C17.9094 22.2147 17.7929 21.8554 17.7734 21.4379H19.3951C19.4339 21.6418 19.531 21.8069 19.6767 21.9331C19.8223 22.0691 20.0262 22.137 20.2884 22.137C20.5894 22.137 20.8225 22.0399 20.9681 21.8457C21.1138 21.6515 21.1915 21.3893 21.1915 21.0689C21.1915 20.7485 21.1138 20.5057 20.9584 20.3406C20.8031 20.1755 20.5797 20.0882 20.2787 20.0882C20.0554 20.0882 19.8806 20.1464 19.7349 20.2435C19.5893 20.3503 19.5019 20.496 19.4533 20.6708H17.8511V16.4468H22.3858V17.9033Z" fill="url(#paint15_linear_281_206820)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206820" x1="20" y1="4.72941" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFD500" />
                                                <stop offset="1" stop-color="#FF9500" />
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_281_206820" x1="20.0004" y1="12.8271" x2="20.0004" y2="39.2833" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2D1706" />
                                                <stop offset="1" stop-color="#2D1706" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206820" x1="20.0039" y1="6.87276" x2="20.0039" y2="19.9569" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206820" x1="12.2838" y1="30.6559" x2="19.9267" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206820" x1="12.1464" y1="30.8394" x2="20.0073" y2="20.0198" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FF8000" />
                                                <stop offset="1" stop-color="#E66000" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206820" x1="32.5148" y1="15.9574" x2="20.0114" y2="19.931" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206820" x1="32.5153" y1="15.9572" x2="20.0716" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206820" x1="27.7279" y1="30.6559" x2="20.085" y2="19.9923" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFDD32" />
                                                <stop offset="1" stop-color="#FFAA00" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206820" x1="27.7281" y1="30.6558" x2="20.0374" y2="20.0705" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206820" x1="20" y1="6.64586" x2="20" y2="19.9307" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFEE99" />
                                                <stop offset="1" stop-color="#FFE666" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_206820" x1="7.76854" y1="16.0431" x2="19.9435" y2="19.931" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFE666" />
                                                <stop offset="1" stop-color="#FFDD33" />
                                              </linearGradient>
                                              <linearGradient id="paint11_linear_281_206820" x1="7.5042" y1="15.9572" x2="19.948" y2="20.0004" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFAA00" />
                                                <stop offset="1" stop-color="#FF8000" />
                                              </linearGradient>
                                              <linearGradient id="paint12_linear_281_206820" x1="21.1101" y1="19.2475" x2="21.1101" y2="28.8099" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CC4400" />
                                                <stop offset="1" stop-color="#CC4400" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint13_linear_281_206820" x1="19.9832" y1="6.13748" x2="19.9832" y2="25.8" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                              <linearGradient id="paint14_linear_281_206820" x1="19.9851" y1="12.3073" x2="19.9851" y2="19.3445" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B5EAFE" />
                                                <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint15_linear_281_206820" x1="20.2836" y1="16.4468" x2="20.2836" y2="29.9436" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          5 STARS
                                        </p>
                                      </div>
                                    </td>
                                    <td>Rewards</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206872)" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#6699FF" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="url(#paint1_radial_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3766 27.1385C26.3766 28.4353 23.5215 29.4886 20.0047 29.4886C16.4879 29.4886 13.6328 28.4353 13.6328 27.1385V19.8022H26.3766V27.1385Z" fill="url(#paint2_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3462 14.887C19.755 14.6435 20.2633 14.6435 20.6721 14.887C22.6705 16.0681 28.6135 19.5871 30.4887 20.6951C30.6087 20.7682 30.6823 20.8961 30.6823 21.0361C30.6823 21.1761 30.6087 21.304 30.4887 21.374C28.6135 22.4851 22.6705 26.0041 20.6721 27.1852C20.2633 27.4287 19.755 27.4287 19.3462 27.1852C17.3477 26.0041 11.4045 22.4851 9.52945 21.374C9.40951 21.304 9.33594 21.1761 9.33594 21.0361C9.33594 20.8961 9.40951 20.7682 9.52945 20.6951C11.4045 19.5871 17.3477 16.0681 19.3462 14.887Z" fill="url(#paint3_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6565 21.407C19.4521 21.2852 19.3843 21.0204 19.5053 20.8164C19.6263 20.6125 19.8907 20.5425 20.0949 20.6642L25.679 23.9701C25.8099 24.0462 25.8903 24.1893 25.8903 24.3415V30.2288C25.8903 30.4662 25.6973 30.6611 25.4598 30.6611C25.2221 30.6611 25.0294 30.4662 25.0294 30.2288V24.585L19.6565 21.407Z" fill="white" />
                                            <path d="M19.8884 21.1838C23.4597 21.1838 26.3549 18.2886 26.3549 14.7172C26.3549 11.1459 23.4597 8.25073 19.8884 8.25073C16.317 8.25073 13.4219 11.1459 13.4219 14.7172C13.4219 18.2886 16.317 21.1838 19.8884 21.1838Z" fill="url(#paint4_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.8832 11.9494C25.0635 11.8493 25.1922 11.6765 25.2365 11.4751C25.2808 11.2736 25.2365 11.0629 25.1148 10.8963C23.9068 9.24639 21.9744 8.25073 19.8977 8.25073C17.9025 8.25073 16.0406 9.1697 14.8262 10.705C14.6627 10.9126 14.5984 11.1815 14.6505 11.4406C14.7026 11.6997 14.8657 11.9229 15.0967 12.0511C15.1033 12.0554 15.11 12.0592 15.1167 12.0629C15.3671 12.202 15.6821 12.1294 15.8465 11.8947C16.7632 10.5782 18.2725 9.77971 19.8977 9.77971C21.4522 9.77971 22.9008 10.5104 23.8262 11.726C24.0737 12.0532 24.5243 12.1483 24.8829 11.9492C24.8831 11.9494 24.8831 11.9494 24.8832 11.9494Z" fill="url(#paint5_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9059 17.4849C14.7256 17.585 14.5969 17.7578 14.5526 17.9592C14.5082 18.1607 14.5525 18.3715 14.6742 18.538C15.8822 20.1879 17.8146 21.1836 19.8914 21.1836C21.8866 21.1836 23.7485 20.2646 24.9628 18.7294C25.1264 18.5217 25.1907 18.2528 25.1386 17.9938C25.0865 17.7346 24.9233 17.5115 24.6923 17.3832C24.6858 17.3789 24.6791 17.3752 24.6724 17.3714C24.4219 17.2324 24.1069 17.305 23.9426 17.5396C23.0258 18.8561 21.5165 19.6546 19.8914 19.6546C18.3368 19.6546 16.8883 18.924 15.9629 17.7083C15.7153 17.3812 15.2648 17.286 14.9062 17.4851C14.906 17.4849 14.906 17.4849 14.9059 17.4849Z" fill="url(#paint6_linear_281_206872)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.201 9.51155C22.2855 9.32259 22.2845 9.10638 22.1983 8.91813C22.1121 8.72996 21.949 8.58794 21.7508 8.52841C21.1441 8.34475 20.5122 8.25073 19.8754 8.25073C19.3187 8.25073 18.7658 8.32257 18.2303 8.46344C17.9741 8.5317 17.7608 8.70885 17.6467 8.94811C17.5326 9.18737 17.5292 9.46462 17.6373 9.70659C17.6403 9.71432 17.6437 9.7219 17.6471 9.72949C17.7628 9.98842 18.0554 10.1181 18.3249 10.0298C18.824 9.86436 19.3474 9.77971 19.8754 9.77971C20.3326 9.77971 20.7864 9.84318 21.2241 9.96746C21.6178 10.0796 22.034 9.88532 22.201 9.51162C22.201 9.51162 22.201 9.51155 22.201 9.51155Z" fill="#CCEEFF" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5646 19.922C17.4802 20.111 17.4812 20.3272 17.5674 20.5155C17.6535 20.7036 17.8166 20.8457 18.0148 20.9052C18.6216 21.0888 19.2534 21.1829 19.8903 21.1829C20.447 21.1829 20.9998 21.111 21.5354 20.9701C21.7915 20.9019 22.0048 20.7247 22.1189 20.4855C22.233 20.2462 22.2365 19.969 22.1283 19.727C22.1253 19.7193 22.1219 19.7117 22.1185 19.7041C22.0029 19.4452 21.7102 19.3155 21.4407 19.4037C20.9416 19.5692 20.4182 19.6539 19.8903 19.6539C19.4331 19.6539 18.9792 19.5904 18.5416 19.4661C18.1478 19.354 17.7316 19.5483 17.5647 19.922C17.5646 19.922 17.5646 19.922 17.5646 19.922Z" fill="#0F388A" />
                                            <path d="M19.8827 19.6543C22.6095 19.6543 24.82 17.4437 24.82 14.7169C24.82 11.9901 22.6095 9.77954 19.8827 9.77954C17.1558 9.77954 14.9453 11.9901 14.9453 14.7169C14.9453 17.4437 17.1558 19.6543 19.8827 19.6543Z" fill="#78D2FF" />
                                            <path d="M19.88 19.0889C22.2947 19.0889 24.2522 17.1314 24.2522 14.7167C24.2522 12.302 22.2947 10.3445 19.88 10.3445C17.4653 10.3445 15.5078 12.302 15.5078 14.7167C15.5078 17.1314 17.4653 19.0889 19.88 19.0889Z" fill="#005CB2" />
                                            <path d="M22.6017 13.9018C22.4545 13.5536 22.2436 13.2406 21.9756 12.9719L21.9763 12.971L22.7934 12.2651L21.0302 13.2089H21.03L18.2723 14.685L19.4318 15.321L18.3424 16.4767L18.3302 16.4892C17.9619 16.1055 17.7354 15.586 17.7354 15.0148C17.7354 13.8365 18.6989 12.878 19.8831 12.878C20.1083 12.878 20.3255 12.9128 20.5295 12.977L21.4008 12.5236C21.2856 12.4548 21.1653 12.3938 21.0406 12.341C20.6788 12.1878 20.2945 12.1104 19.8985 12.1104C19.5027 12.1104 19.1184 12.188 18.7565 12.341C18.407 12.4887 18.0934 12.7002 17.824 12.9695C17.5546 13.2388 17.3433 13.5524 17.1955 13.9018C17.0424 14.2637 16.9648 14.648 16.9648 15.0439C16.9648 15.4398 17.0424 15.8241 17.1955 16.1859C17.3329 16.5112 17.5259 16.8055 17.7693 17.0621L17.0505 17.7334L21.3457 15.3135L20.3264 14.6466L21.4235 13.5297L21.4243 13.5288C21.7991 13.9136 22.0303 14.4378 22.0303 15.0149C22.0303 16.1932 21.0668 17.1517 19.8826 17.1517C19.6384 17.1517 19.4037 17.1108 19.1849 17.0359L18.3062 17.5085C18.4484 17.6007 18.5987 17.6804 18.7565 17.747C19.1182 17.9002 19.5024 17.9776 19.8985 17.9776C20.2943 17.9776 20.6786 17.9 21.0406 17.747C21.39 17.5993 21.7036 17.3878 21.973 17.1185C22.2424 16.8492 22.4537 16.5355 22.6015 16.1862C22.7546 15.8243 22.8321 15.44 22.8321 15.0441C22.8325 14.6478 22.7547 14.2637 22.6017 13.9018Z" fill="url(#paint7_linear_281_206872)" />
                                            <path d="M22.6017 13.4731C22.4545 13.1249 22.2436 12.8119 21.9756 12.5432L21.9763 12.5423L22.7934 11.8364L21.0302 12.7801H21.03L18.2723 14.2563L19.4318 14.8923L18.3424 16.0479L18.3302 16.0605C17.9619 15.6768 17.7354 15.1573 17.7354 14.5861C17.7354 13.4078 18.6989 12.4493 19.8831 12.4493C20.1083 12.4493 20.3255 12.4841 20.5295 12.5483L21.4008 12.0949C21.2856 12.0261 21.1653 11.9651 21.0406 11.9123C20.6788 11.7591 20.2945 11.6816 19.8985 11.6816C19.5027 11.6816 19.1184 11.7593 18.7565 11.9123C18.407 12.0599 18.0934 12.2715 17.824 12.5408C17.5546 12.81 17.3433 13.1237 17.1955 13.4731C17.0424 13.835 16.9648 14.2193 16.9648 14.6152C16.9648 15.011 17.0424 15.3953 17.1955 15.7572C17.3329 16.0825 17.5259 16.3768 17.7693 16.6334L17.0505 17.3047L21.3457 14.8848L20.3264 14.2178L21.4235 13.101L21.4243 13.1001C21.7991 13.4849 22.0303 14.0091 22.0303 14.5862C22.0303 15.7645 21.0668 16.723 19.8826 16.723C19.6384 16.723 19.4037 16.6821 19.1849 16.6072L18.3062 17.0798C18.4484 17.1719 18.5987 17.2516 18.7565 17.3183C19.1182 17.4715 19.5024 17.5489 19.8985 17.5489C20.2943 17.5489 20.6786 17.4712 21.0406 17.3183C21.39 17.1706 21.7036 16.9591 21.973 16.6898C22.2424 16.4205 22.4537 16.1068 22.6015 15.7574C22.7546 15.3956 22.8321 15.0113 22.8321 14.6154C22.8325 14.2191 22.7547 13.835 22.6017 13.4731Z" fill="url(#paint8_linear_281_206872)" />
                                            <path d="M25.4675 31.7485C26.0925 31.7485 26.5991 31.2419 26.5991 30.6169C26.5991 29.992 26.0925 29.4854 25.4675 29.4854C24.8426 29.4854 24.3359 29.992 24.3359 30.6169C24.3359 31.2419 24.8426 31.7485 25.4675 31.7485Z" fill="url(#paint9_linear_281_206872)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206872" x1="20.7782" y1="12.6362" x2="20.7782" y2="39.5661" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0056FF" />
                                                <stop offset="1" stop-color="#003499" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_206872" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9874 19.9996) scale(13.5226)">
                                                <stop stop-color="#3378FF" />
                                                <stop offset="1" stop-color="#002366" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_206872" x1="19.966" y1="43.4001" x2="19.966" y2="19.4961" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#262626" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206872" x1="19.942" y1="36.5458" x2="19.942" y2="14.7051" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#262626" />
                                                <stop offset="1" stop-color="#7B7B7B" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206872" x1="20.228" y1="10.763" x2="20.228" y2="21.1749" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206872" x1="19.8978" y1="8.25073" x2="19.8978" y2="14.7173" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#78D2FF" />
                                                <stop offset="1" stop-color="#00A6F9" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206872" x1="19.8914" y1="14.7171" x2="19.8914" y2="21.1836" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2F74FF" />
                                                <stop offset="1" stop-color="#144BB8" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206872" x1="20.2234" y1="13.3578" x2="21.14" y2="17.6184" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#006699" />
                                                <stop offset="1" stop-color="#006699" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206872" x1="21.2786" y1="12.6472" x2="12.8484" y2="22.2732" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#78D2FF" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206872" x1="25.4675" y1="29.7524" x2="25.4675" y2="31.748" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFD500" />
                                                <stop offset="1" stop-color="#FF9500" />
                                              </linearGradient>
                                            </defs>
                                          </svg>



                                        </div>
                                        <p className="tableimgtext">
                                          Empower
                                        </p>
                                      </div>
                                    </td>
                                    <td>Techwiz</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
                                            <path d="M19.3605 38.7211C30.053 38.7211 38.7211 30.053 38.7211 19.3605C38.7211 8.668 30.053 0 19.3605 0C8.668 0 0 8.668 0 19.3605C0 30.053 8.668 38.7211 19.3605 38.7211Z" fill="#FF0055" />
                                            <path d="M19.3526 34.1424C27.5166 34.1424 34.1348 27.5242 34.1348 19.3601C34.1348 11.1961 27.5166 4.57788 19.3526 4.57788C11.1886 4.57788 4.57031 11.1961 4.57031 19.3601C4.57031 27.5242 11.1886 34.1424 19.3526 34.1424Z" fill="#FF9999" />
                                            <path d="M19.3597 32.4509C26.5892 32.4509 32.4499 26.5902 32.4499 19.3607C32.4499 12.1312 26.5892 6.27051 19.3597 6.27051C12.1302 6.27051 6.26953 12.1312 6.26953 19.3607C6.26953 26.5902 12.1302 32.4509 19.3597 32.4509Z" fill="#990033" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3154 6.60858C20.3707 6.15782 18.3487 6.15782 16.4039 6.60858L19.3597 19.3607L22.3154 6.60858ZM12.4327 8.25353C10.7388 9.30993 9.30895 10.7398 8.25255 12.4336L19.3597 19.3607L12.4327 8.25353ZM6.6076 16.4049C6.15684 18.3497 6.15684 20.3717 6.6076 22.3164L19.3597 19.3607L6.6076 16.4049ZM8.25255 26.2878C9.30895 27.9816 10.7388 29.4114 12.4327 30.4678L19.3597 19.3607L8.25255 26.2878ZM16.4039 32.1128C18.3487 32.5636 20.3707 32.5636 22.3154 32.1128L19.3597 19.3607L16.4039 32.1128ZM26.2868 30.4678C27.9807 29.4114 29.4104 27.9816 30.4669 26.2878L19.3597 19.3607L26.2868 30.4678ZM32.1119 22.3164C32.5626 20.3717 32.5626 18.3497 32.1119 16.4049L19.3597 19.3607L32.1119 22.3164ZM30.4669 12.4336C29.4104 10.7398 27.9807 9.30993 26.2868 8.25353L19.3597 19.3607L30.4669 12.4336Z" fill="url(#paint0_radial_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5703 28.6587C26.2043 31.0025 22.9496 32.4509 19.3596 32.4509C15.7696 32.4509 12.5149 31.0025 10.1489 28.6587C10.6137 25.3864 13.4267 22.87 16.8272 22.87H21.8921C25.2925 22.87 28.1055 25.3864 28.5703 28.6587Z" fill="url(#paint1_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8783 19.5125H16.8359V23.9327C16.8359 24.6013 17.1015 25.2426 17.5744 25.7153C18.0472 26.1882 18.6884 26.4538 19.3571 26.4538C20.0257 26.4538 20.667 26.1882 21.1398 25.7153C21.6127 25.2426 21.8783 24.6013 21.8783 23.9327V19.5125Z" fill="#F57D3D" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3978 19.0032C26.3978 18.0562 25.6301 17.2886 24.6831 17.2886H14.0389C13.0919 17.2886 12.3242 18.0562 12.3242 19.0032C12.3242 19.9502 13.0919 20.7179 14.0389 20.7179H24.6831C25.6301 20.7179 26.3978 19.9502 26.3978 19.0032Z" fill="url(#paint2_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6507 14.168H14.0781V18.4626C14.0781 21.3821 16.4448 23.7489 19.3644 23.7489C20.7664 23.7489 22.111 23.192 23.1024 22.2005C24.0938 21.2092 24.6507 19.8646 24.6507 18.4626V14.168Z" fill="url(#paint3_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.089 18.4645C14.089 18.4645 12.1373 16.0098 12.7288 13.4437C13.3201 10.8777 15.2596 10.9903 15.2596 10.9903C15.2596 10.9903 15.4626 9.07198 18.7785 8.73562C22.0945 8.39926 24.9837 10.7291 26.412 9.88122C26.412 9.88122 26.4066 11.8773 25.546 13.0282C25.546 13.0282 26.8413 15.8058 24.6616 18.463C24.6616 18.463 24.5873 15.3435 23.5511 14.1399C23.5511 14.1399 17.896 17.7186 15.6305 14.1399C15.6305 14.1399 14.089 15.6526 14.089 18.4645Z" fill="url(#paint4_linear_281_206910)" />
                                            <path d="M19.3747 39.9999C23.1154 39.9999 26.1479 36.9675 26.1479 33.2268C26.1479 29.4861 23.1154 26.4536 19.3747 26.4536C15.634 26.4536 12.6016 29.4861 12.6016 33.2268C12.6016 36.9675 15.634 39.9999 19.3747 39.9999Z" fill="url(#paint5_linear_281_206910)" />
                                            <path d="M19.3659 32.461C21.7599 32.461 23.7006 31.3804 23.7006 30.0474C23.7006 28.7144 21.7599 27.6338 19.3659 27.6338C16.9719 27.6338 15.0312 28.7144 15.0312 30.0474C15.0312 31.3804 16.9719 32.461 19.3659 32.461Z" fill="url(#paint6_linear_281_206910)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7144 33.821L21.777 30.5305C22.1952 30.0817 22.899 30.0562 23.3478 30.4739C23.7966 30.8916 23.8221 31.5951 23.4039 32.0442L19.9767 35.7267C19.6503 36.0789 19.1913 36.2783 18.7093 36.2772C18.2299 36.2762 17.7709 36.0745 17.4445 35.7211L15.3254 33.4215C14.9098 32.9706 14.9378 32.267 15.3892 31.8514C15.8405 31.4357 16.5418 31.4643 16.9574 31.9151L18.7144 33.821Z" fill="white" />
                                            <defs>
                                              <radialGradient id="paint0_radial_281_206910" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.3597 19.3607) scale(21.1659 21.1659)">
                                                <stop stop-color="#FF9F66" />
                                                <stop offset="1" stop-color="#FF9F66" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint1_linear_281_206910" x1="19.3596" y1="32.4509" x2="19.3596" y2="17.2895" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FF9500" />
                                                <stop offset="1" stop-color="#FFD500" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206910" x1="21.8821" y1="14.1676" x2="21.8821" y2="19.5115" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FED9B4" />
                                                <stop offset="1" stop-color="#F79E61" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206910" x1="19.8119" y1="8.15771" x2="19.8119" y2="23.73" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FED9B4" />
                                                <stop offset="1" stop-color="#F79E61" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206910" x1="19.5146" y1="20.7186" x2="19.5146" y2="8.70243" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#49200A" />
                                                <stop offset="1" stop-color="#A67459" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206910" x1="19.3747" y1="17.0369" x2="19.3747" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206910" x1="19.3659" y1="24.2424" x2="19.3659" y2="32.4609" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B5EAFE" />
                                                <stop offset="1" stop-color="#B5EAFE" stop-opacity="0" />
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </div>
                                        <p className="tableimgtext">
                                          LOOKING GOOD
                                        </p>
                                      </div>
                                    </td>
                                    <td>Launchpad</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">
                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="url(#paint0_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1811 11.5727C35.8045 11.2266 36.2475 10.6278 36.3957 9.93051C36.5442 9.23323 36.3836 8.50564 35.9552 7.93583C32.2079 2.98053 26.321 0 20.0019 0C13.6828 0 7.79585 2.98053 4.04923 7.93627C3.62104 8.50608 3.46038 9.23323 3.60864 9.93029C3.75713 10.6273 4.19993 11.2262 4.82307 11.572C4.85781 11.5922 4.89278 11.6116 4.92752 11.6309C5.85494 12.1458 7.02068 11.8874 7.6436 11.0285C10.4938 7.10113 15.0758 4.72892 20.0019 4.72892C24.8914 4.72892 29.442 7.06594 32.2966 10.9416C32.962 11.848 34.1977 12.1184 35.1809 11.5725C35.1811 11.5727 35.1811 11.5727 35.1811 11.5727Z" fill="url(#paint1_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8189 28.4273C4.19554 28.7734 3.75252 29.3722 3.60425 30.0695C3.45577 30.7668 3.61643 31.4944 4.04484 32.0642C7.79213 37.0195 13.679 40 19.9981 40C26.3172 40 32.2041 37.0195 35.9508 32.0637C36.379 31.4939 36.5396 30.7668 36.3914 30.0697C36.2429 29.3727 35.8001 28.7738 35.1769 28.428C35.1422 28.4078 35.1072 28.3884 35.0725 28.3691C34.1451 27.8542 32.9793 28.1126 32.3564 28.9715C29.5062 32.8989 24.9242 35.2711 19.9981 35.2711C15.1086 35.2711 10.558 32.9341 7.70339 29.0584C7.03798 28.152 5.80231 27.8816 4.81913 28.4275C4.8189 28.4273 4.8189 28.4273 4.8189 28.4273Z" fill="#808080" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0732 4.14848C27.3642 3.49657 27.3584 2.75039 27.0573 2.10312C26.7561 1.45585 26.1887 0.97101 25.5025 0.774286C23.7149 0.261783 21.8601 0 19.9913 0C18.1226 0 16.2677 0.261783 14.4802 0.774286C13.7939 0.971232 13.2268 1.45585 12.9254 2.10312C12.6242 2.75039 12.6185 3.49657 12.9097 4.14848C12.9261 4.18521 12.9424 4.22195 12.9588 4.25868C13.3905 5.22505 14.4744 5.7183 15.4866 5.40916C16.9422 4.95906 18.4607 4.72892 19.9913 4.72892C21.4863 4.72892 22.9696 4.94844 24.3945 5.37751C25.4691 5.69816 26.6151 5.17238 27.0728 4.14826C27.0732 4.14848 27.0732 4.14848 27.0732 4.14848Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9268 35.8515C12.6358 36.5034 12.6416 37.2496 12.9427 37.8969C13.2439 38.5441 13.8113 39.029 14.4975 39.2257C16.2851 39.7382 18.1399 40 20.0087 40C21.8774 40 23.7323 39.7382 25.5198 39.2257C26.2061 39.0288 26.7732 38.5441 27.0746 37.8969C27.3758 37.2496 27.3815 36.5034 27.0903 35.8515C27.0739 35.8148 27.0576 35.7781 27.0412 35.7413C26.6095 34.775 25.5256 34.2817 24.5134 34.5908C23.0578 35.0409 21.5393 35.2711 20.0087 35.2711C18.5137 35.2711 17.0304 35.0516 15.6055 34.6225C14.5309 34.3018 13.3849 34.8276 12.9272 35.8517C12.9268 35.8515 12.9268 35.8515 12.9268 35.8515Z" fill="#666666" />
                                            <path d="M19.9971 35.27C28.4308 35.27 35.2676 28.4332 35.2676 19.9995C35.2676 11.5658 28.4308 4.729 19.9971 4.729C11.5634 4.729 4.72656 11.5658 4.72656 19.9995C4.72656 28.4332 11.5634 35.27 19.9971 35.27Z" fill="#E6E6E6" />
                                            <path d="M19.9874 33.5222C27.4557 33.5222 33.51 27.4679 33.51 19.9996C33.51 12.5313 27.4557 6.47705 19.9874 6.47705C12.5191 6.47705 6.46484 12.5313 6.46484 19.9996C6.46484 27.4679 12.5191 33.5222 19.9874 33.5222Z" fill="#808080" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 11.6357C19.2939 11.3067 19.6298 11.0986 19.9974 11.0986C20.365 11.0986 20.701 11.3067 20.8649 11.6357C21.7224 13.3582 22.9777 15.8789 23.4827 16.8932C23.6224 17.1738 23.8892 17.3695 24.1988 17.4184C25.3336 17.5978 28.1795 18.0477 30.1185 18.3542C30.4835 18.4119 30.7839 18.672 30.893 19.025C31.0021 19.3779 30.9012 19.7622 30.6325 20.0158C29.2367 21.3339 27.2076 23.25 26.3749 24.0362C26.1389 24.2592 26.0302 24.5856 26.0855 24.9056C26.2845 26.0595 26.777 28.9134 27.1141 30.8668C27.1774 31.2336 27.025 31.6042 26.7219 31.8204C26.419 32.0365 26.0189 32.0601 25.6927 31.8808C23.9784 30.9391 21.4882 29.5711 20.464 29.0085C20.1735 28.8489 19.8214 28.8489 19.5309 29.0085C18.5067 29.5711 16.0165 30.9391 14.3022 31.8808C13.976 32.0601 13.5759 32.0365 13.2729 31.8204C12.9699 31.6042 12.8175 31.2336 12.8808 30.8668C13.2179 28.9134 13.7104 26.0595 13.9095 24.9056C13.9647 24.5856 13.856 24.2592 13.6199 24.0362C12.7873 23.25 10.7582 21.3339 9.36233 20.0158C9.09374 19.7622 8.99273 19.3779 9.1019 19.025C9.21107 18.672 9.51142 18.4119 9.87632 18.3542C11.8153 18.0477 14.6614 17.5978 15.7961 17.4184C16.1057 17.3695 16.3725 17.1738 16.5122 16.8932C17.0173 15.8789 18.2724 13.3582 19.13 11.6357Z" fill="url(#paint2_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.13 9.02463C19.2939 8.69557 19.6298 8.48755 19.9974 8.48755C20.365 8.48755 20.701 8.69557 20.8649 9.02463C21.7224 10.7471 22.9777 13.2678 23.4827 14.2821C23.6224 14.5627 23.8892 14.7584 24.1988 14.8073C25.3336 14.9867 28.1795 15.4366 30.1185 15.7431C30.4835 15.8008 30.7839 16.0609 30.893 16.4139C31.0021 16.7668 30.9012 17.1511 30.6325 17.4047C29.2367 18.7228 27.2076 20.6389 26.3749 21.4252C26.1389 21.6481 26.0302 21.9746 26.0855 22.2945C26.2845 23.4484 26.777 26.3023 27.1141 28.2557C27.1774 28.6225 27.025 28.9931 26.7219 29.2093C26.419 29.4255 26.0189 29.449 25.6927 29.2697C23.9784 28.328 21.4882 26.96 20.464 26.3974C20.1735 26.2378 19.8214 26.2378 19.5309 26.3974C18.5067 26.96 16.0165 28.328 14.3022 29.2697C13.976 29.449 13.5759 29.4255 13.2729 29.2093C12.9699 28.9931 12.8175 28.6225 12.8808 28.2557C13.2179 26.3023 13.7104 23.4484 13.9095 22.2945C13.9647 21.9746 13.856 21.6481 13.6199 21.4252C12.7873 20.6389 10.7582 18.7228 9.36233 17.4047C9.09374 17.1511 8.99273 16.7668 9.1019 16.4139C9.21107 16.0609 9.51142 15.8008 9.87632 15.7431C11.8153 15.4366 14.6614 14.9867 15.7961 14.8073C16.1057 14.7584 16.3725 14.5627 16.5122 14.2821C17.0173 13.2678 18.2724 10.7471 19.13 9.02463Z" fill="#999999" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.48755C20.3676 8.48755 20.7036 8.69557 20.8673 9.02464L23.4853 14.2821C23.5548 14.4218 23.6557 14.5404 23.7779 14.6303L20 19.9724V8.48755Z" fill="url(#paint3_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2853 29.2152C13.2823 29.2131 13.2793 29.211 13.2764 29.2089C12.9733 28.9927 12.8209 28.6221 12.8842 28.2552L13.913 22.2941C13.9407 22.1328 13.927 21.97 13.8762 21.8195L20.0009 19.9719L13.2853 29.2152Z" fill="url(#paint4_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0008 26.277C19.8401 26.2769 19.6795 26.3168 19.5342 26.3966L14.3055 29.269C13.9825 29.4465 13.5871 29.4252 13.2852 29.2148L20.0008 19.9716L20.0008 26.277Z" fill="url(#paint5_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7753 14.6299C23.8986 14.7207 24.0433 14.7823 24.1988 14.8068L30.1185 15.7427C30.4835 15.8004 30.7838 16.0604 30.8929 16.4134C30.8947 16.419 30.8964 16.4245 30.898 16.4301L19.9974 19.9719L23.7753 14.6299Z" fill="url(#paint6_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8984 16.4299C30.9994 16.7782 30.8974 17.1545 30.633 17.4041L26.3755 21.4246C26.2584 21.5352 26.1725 21.6711 26.1226 21.8193L19.9979 19.9717L30.8984 16.4299Z" fill="url(#paint7_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.1238 21.8195C26.073 21.97 26.0593 22.1328 26.087 22.2941L27.1158 28.2552C27.1791 28.6221 27.0267 28.9927 26.7236 29.2089C26.7207 29.211 26.7177 29.2131 26.7147 29.2152L19.9991 19.9719L26.1238 21.8195Z" fill="url(#paint8_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7148 29.2148C26.4129 29.4252 26.0175 29.4465 25.6945 29.269L20.4658 26.3966C20.3205 26.3168 20.1599 26.2769 19.9992 26.277L19.9992 19.9716L26.7148 29.2148Z" fill="url(#paint9_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2221 14.6303C16.3443 14.5404 16.4452 14.4218 16.5147 14.2821L19.1327 9.02464C19.2964 8.69557 19.6324 8.48755 20 8.48755V19.9724L16.2221 14.6303Z" fill="url(#paint10_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.10204 16.4301C9.10365 16.4245 9.1053 16.419 9.10705 16.4134C9.21623 16.0604 9.51655 15.8004 9.88145 15.7427L15.8012 14.8068C15.9567 14.7823 16.1014 14.7207 16.2247 14.6299L20.0026 19.9719L9.10204 16.4301Z" fill="url(#paint11_linear_281_206937)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8774 21.8193C13.8275 21.6711 13.7416 21.5352 13.6245 21.4246L9.36701 17.4041C9.10259 17.1545 9.0006 16.7782 9.10156 16.4299L20.0021 19.9717L13.8774 21.8193Z" fill="url(#paint12_linear_281_206937)" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_206937" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#999999" />
                                              </linearGradient>
                                              <linearGradient id="paint1_linear_281_206937" x1="2.51592" y1="0.213543" x2="2.51592" y2="12.5285" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint2_linear_281_206937" x1="20.8582" y1="17.3315" x2="20.8582" y2="34.5769" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#4D4D4D" />
                                                <stop offset="1" stop-color="#4D4D4D" stop-opacity="0" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#CCCCCC" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_206937" x1="12.6686" y1="30.064" x2="19.9164" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_206937" x1="12.6685" y1="30.0637" x2="19.9658" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#999999" />
                                                <stop offset="1" stop-color="#666666" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_206937" x1="31.8614" y1="16.1171" x2="19.9974" y2="19.8874" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_206937" x1="31.8618" y1="16.1169" x2="20.0545" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#808080" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_206937" x1="27.3314" y1="30.064" x2="20.0836" y2="19.9429" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#CCCCCC" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_206937" x1="27.3315" y1="30.0637" x2="20.0342" y2="20.0197" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#737373" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_206937" x1="20" y1="7.49788" x2="20" y2="19.9129" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint11_linear_281_206937" x1="8.13864" y1="16.1171" x2="23.732" y2="21.0969" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E6E6E6" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint12_linear_281_206937" x1="8.13816" y1="16.1169" x2="19.9455" y2="19.9533" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B3B3B3" />
                                                <stop offset="1" stop-color="#808080" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          SILVER
                                        </p>
                                      </div>
                                    </td>
                                    <td>Staking</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="mainimgdiv">
                                        <div className="inerimgd">

                                          <svg className="tableimgginer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M19.9998 39.3097C31.0453 39.3097 39.9995 30.5099 39.9995 19.6547C39.9995 8.79958 31.0453 -0.000244141 19.9998 -0.000244141C8.9542 -0.000244141 0 8.79958 0 19.6547C0 30.5099 8.9542 39.3097 19.9998 39.3097Z" fill="url(#paint0_linear_281_207109)" />
                                            <path d="M19.9969 34.6614C28.4305 34.6614 35.2672 27.9425 35.2672 19.6543C35.2672 11.3661 28.4305 4.64722 19.9969 4.64722C11.5633 4.64722 4.72656 11.3661 4.72656 19.6543C4.72656 27.9425 11.5633 34.6614 19.9969 34.6614Z" fill="#78D2FF" />
                                            <path d="M19.9872 32.9435C27.4555 32.9435 33.5096 26.9937 33.5096 19.6543C33.5096 12.3148 27.4555 6.36499 19.9872 6.36499C12.519 6.36499 6.46484 12.3148 6.46484 19.6543C6.46484 26.9937 12.519 32.9435 19.9872 32.9435Z" fill="#0A265C" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48992 20.3093C6.47844 20.0922 6.47266 19.8751 6.47266 19.6551C6.47266 17.7911 6.86579 16.0146 7.57166 14.4044L19.9962 17.2328L6.48992 20.3093ZM19.9962 17.2328L9.76962 10.9641C10.9375 9.63868 12.3665 8.54174 13.9791 7.75216L19.9962 17.2328ZM19.9962 17.2328L17.4855 6.59599C18.3004 6.44371 19.1382 6.36475 19.9962 6.36475C20.8541 6.36475 21.692 6.44371 22.5069 6.59599L19.9962 17.2328ZM19.9962 17.2328L26.0133 7.75216C27.6259 8.54174 29.0549 9.63868 30.2228 10.9641L19.9962 17.2328ZM19.9962 17.2328L32.4207 14.4044C33.1266 16.0146 33.5197 17.7911 33.5197 19.6551C33.5197 19.8751 33.5139 20.0922 33.5025 20.3093L19.9962 17.2328ZM32.4408 24.8607C31.5197 26.9785 30.0563 28.8143 28.2228 30.1989L19.9962 17.2328L32.4408 24.8607ZM23.5887 32.4689C22.4438 32.7791 21.2415 32.9455 19.9962 32.9455C18.7509 32.9455 17.5486 32.7791 16.4037 32.4689L19.9962 17.2328L23.5887 32.4689ZM11.7696 30.1989C9.93607 28.8143 8.47268 26.9785 7.5516 24.8607L19.9962 17.2328L11.7696 30.1989Z" fill="url(#paint1_radial_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6144 9.784C28.6592 9.7364 28.7333 9.72529 28.7916 9.75836C28.8499 9.79143 28.8771 9.86005 28.8576 9.92203C28.8466 9.9523 28.8381 9.98399 28.8286 10.0118C28.6367 10.6202 28.8177 11.2841 29.2934 11.7167C29.3158 11.736 29.3393 11.7593 29.3642 11.7801C29.4127 11.8242 29.424 11.897 29.3903 11.9543C29.3567 12.0116 29.2868 12.0384 29.2238 12.0192C29.193 12.0084 29.1607 12 29.1325 11.9906C28.5134 11.8021 27.8378 11.98 27.3976 12.4475C27.3779 12.4695 27.3543 12.4925 27.3331 12.5171C27.2882 12.5647 27.2141 12.5758 27.1559 12.5427C27.0976 12.5096 27.0703 12.441 27.0898 12.379C27.1009 12.3488 27.1093 12.3171 27.1189 12.2893C27.3107 11.6809 27.1297 11.017 26.654 10.5844C26.6316 10.565 26.6082 10.5417 26.5832 10.5209C26.5348 10.4769 26.5235 10.404 26.5571 10.3468C26.5908 10.2895 26.6606 10.2627 26.7237 10.2819C26.7545 10.2927 26.7867 10.301 26.815 10.3104C27.4341 10.499 28.1096 10.3211 28.5498 9.85361C28.5695 9.83158 28.5932 9.80852 28.6144 9.784Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4521 18.7749C10.4326 18.713 10.4599 18.6443 10.5182 18.6113C10.5764 18.5782 10.6505 18.5893 10.6954 18.6369C10.7166 18.6614 10.7403 18.6845 10.76 18.7065C11.2001 19.174 11.8757 19.3519 12.4948 19.1633C12.523 19.1539 12.5553 19.1456 12.5861 19.1348C12.6491 19.1156 12.719 19.1424 12.7526 19.1997C12.7863 19.2569 12.775 19.3298 12.7265 19.3739C12.7016 19.3947 12.6781 19.4179 12.6557 19.4373C12.18 19.8699 11.999 20.5338 12.1909 21.1422C12.2004 21.17 12.2089 21.2017 12.2199 21.2319C12.2394 21.2939 12.2122 21.3625 12.1539 21.3956C12.0956 21.4287 12.0215 21.4176 11.9767 21.37C11.9555 21.3454 11.9318 21.3224 11.9121 21.3004C11.4719 20.8329 10.7964 20.655 10.1773 20.8435C10.149 20.8529 10.1168 20.8613 10.086 20.8721C10.0229 20.8913 9.95309 20.8645 9.91943 20.8072C9.88578 20.7499 9.89709 20.6771 9.94553 20.633C9.97048 20.6122 9.99394 20.5889 10.0164 20.5696C10.492 20.137 10.673 19.4731 10.4812 18.8647C10.4716 18.8369 10.4632 18.8052 10.4521 18.7749Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9066 14.4089C19.9066 14.4089 17.896 11.6738 16.9824 10.4293C16.873 10.2837 16.7037 10.1901 16.5168 10.1797C16.3334 10.1658 16.1534 10.2386 16.0265 10.3703C15.6843 10.7274 15.2433 11.1919 14.9047 11.5455C14.7813 11.6772 14.7213 11.8575 14.7425 12.0343C14.7636 12.2146 14.866 12.374 15.0176 12.4711C16.2558 13.2754 18.9331 15.0087 18.9331 15.0087L19.9066 14.4089Z" fill="url(#paint2_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0426 14.4089C20.0426 14.4089 22.0532 11.6738 22.9668 10.4293C23.0762 10.2837 23.2455 10.1901 23.4324 10.1797C23.6159 10.1658 23.7958 10.2386 23.9228 10.3703C24.2649 10.7274 24.7059 11.1919 25.0445 11.5455C25.168 11.6772 25.2279 11.8575 25.2068 12.0343C25.1856 12.2146 25.0833 12.374 24.9316 12.4711C23.6935 13.2754 21.0162 15.0087 21.0162 15.0087L20.0426 14.4089Z" fill="url(#paint3_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6901 12.924C21.6901 12.7545 21.6203 12.5921 21.5005 12.4721C21.3775 12.3544 21.2145 12.2861 21.0416 12.2861C20.4697 12.2861 19.6384 12.2861 19.0664 12.2861C18.8935 12.2861 18.7305 12.3544 18.6075 12.4721C18.4878 12.5921 18.418 12.7545 18.418 12.924C18.418 13.3476 18.418 13.8278 18.418 13.8278H21.6901C21.6901 13.8278 21.6901 13.3476 21.6901 12.924Z" fill="url(#paint4_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7607 29.7728C26.3992 31.7495 23.3404 32.9452 19.9976 32.9452C16.6547 32.9452 13.5959 31.7495 11.2344 29.7728C11.2344 29.7728 11.2344 28.2218 11.2344 26.9302C11.2344 25.9968 12.0062 25.2383 12.9589 25.2383C16.3132 25.2383 23.6819 25.2383 27.0362 25.2383C27.9889 25.2383 28.7607 25.9968 28.7607 26.9302V29.7728Z" fill="url(#paint5_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 23.3402C26.05 23.5472 25.9657 23.7443 25.8163 23.8922C25.6707 24.0368 25.4677 24.1189 25.257 24.1189H14.8438C14.6331 24.1189 14.4301 24.0368 14.2845 23.8922C14.1351 23.7443 14.0508 23.5472 14.0508 23.3402V14.6069C14.0508 14.3999 14.1351 14.2027 14.2845 14.0549C14.4301 13.9103 14.6331 13.8282 14.8438 13.8282H25.257C25.4677 13.8282 25.6707 13.9103 25.8163 14.0549C25.9657 14.2027 26.05 14.3999 26.05 14.6069V23.3402Z" fill="url(#paint6_linear_281_207109)" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.05 18.1018H14.0508C14.0508 18.1018 14.0508 15.2923 14.0508 14.2294C14.0508 14.1229 14.0929 14.0206 14.1695 13.9456C14.2462 13.8705 14.3496 13.8282 14.4569 13.8282H25.6439C25.7512 13.8282 25.8546 13.8705 25.9312 13.9456C26.0079 14.0206 26.05 14.1229 26.05 14.2294C26.05 15.2923 26.05 18.1018 26.05 18.1018Z" fill="#A4122B" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8037 16.3294C26.8037 16.76 26.4501 17.1089 26.0104 17.1089C23.6176 17.1089 16.4868 17.1089 14.0941 17.1089C13.6543 17.1089 13.3008 16.76 13.3008 16.3294C13.3008 15.8087 13.3008 15.1277 13.3008 14.607C13.3008 14.1764 13.6543 13.8276 14.0941 13.8276C16.4868 13.8276 23.6176 13.8276 26.0104 13.8276C26.4501 13.8276 26.8037 14.1764 26.8037 14.607C26.8037 15.1277 26.8037 15.8087 26.8037 16.3294Z" fill="url(#paint7_linear_281_207109)" />
                                            <path d="M22.0418 13.8276H18.0859V17.1089H22.0418V13.8276Z" fill="url(#paint8_linear_281_207109)" />
                                            <path d="M22.0418 17.1094H18.0859V24.1188H22.0418V17.1094Z" fill="url(#paint9_linear_281_207109)" />
                                            <path d="M22.0418 17.1089H18.0859V18.1012H22.0418V17.1089Z" fill="#D2D2D2" />
                                            <path d="M32.989 40.0006C36.8532 40.0006 39.9858 36.922 39.9858 33.1244C39.9858 29.3268 36.8532 26.2483 32.989 26.2483C29.1247 26.2483 25.9922 29.3268 25.9922 33.1244C25.9922 36.922 29.1247 40.0006 32.989 40.0006Z" fill="url(#paint10_linear_281_207109)" />
                                            <path d="M28.1406 32.1356V31.2031H29.8528V35.4842H28.7526V32.1356H28.1406Z" fill="white" />
                                            <path d="M30.582 33.2848C30.582 32.6104 30.718 32.0826 30.9962 31.6956C31.2681 31.3085 31.707 31.115 32.3189 31.115C32.9309 31.115 33.3697 31.3085 33.6479 31.6956C33.9198 32.0826 34.0558 32.6104 34.0558 33.2848C34.0558 33.9651 33.9198 34.4988 33.6479 34.8858C33.3697 35.2729 32.9309 35.4664 32.3189 35.4664C31.707 35.4664 31.2681 35.2729 30.9962 34.8858C30.718 34.4988 30.582 33.9651 30.582 33.2848ZM33.0174 33.2848C33.0174 32.8919 32.9741 32.587 32.8814 32.37C32.7887 32.1589 32.6033 32.0533 32.3189 32.0533C32.0346 32.0533 31.8492 32.1589 31.7564 32.37C31.6637 32.587 31.6205 32.8919 31.6205 33.2848C31.6205 33.5487 31.639 33.7716 31.6699 33.9416C31.7008 34.1176 31.7688 34.2583 31.8739 34.3639C31.9728 34.4753 32.1211 34.5281 32.3189 34.5281C32.5167 34.5281 32.6651 34.4753 32.7701 34.3639C32.869 34.2583 32.937 34.1176 32.9679 33.9416C32.9989 33.7716 33.0174 33.5487 33.0174 33.2848Z" fill="white" />
                                            <path d="M34.6094 33.2848C34.6094 32.6104 34.7454 32.0826 35.0235 31.6956C35.2955 31.3085 35.7343 31.115 36.3463 31.115C36.9582 31.115 37.3971 31.3085 37.6752 31.6956C37.9472 32.0826 38.0832 32.6104 38.0832 33.2848C38.0832 33.9651 37.9472 34.4988 37.6752 34.8858C37.3971 35.2729 36.9582 35.4664 36.3463 35.4664C35.7343 35.4664 35.2955 35.2729 35.0235 34.8858C34.7454 34.4988 34.6094 33.9651 34.6094 33.2848ZM37.0447 33.2848C37.0447 32.8919 37.0015 32.587 36.9088 32.37C36.816 32.1589 36.6306 32.0533 36.3463 32.0533C36.0619 32.0533 35.8765 32.1589 35.7838 32.37C35.6911 32.587 35.6478 32.8919 35.6478 33.2848C35.6478 33.5487 35.6663 33.7716 35.6973 33.9416C35.7282 34.1176 35.7962 34.2583 35.9012 34.3639C36.0001 34.4753 36.1485 34.5281 36.3463 34.5281C36.5441 34.5281 36.6924 34.4753 36.7975 34.3639C36.8964 34.2583 36.9644 34.1176 36.9953 33.9416C37.0262 33.7716 37.0447 33.5487 37.0447 33.2848Z" fill="white" />
                                            <defs>
                                              <linearGradient id="paint0_linear_281_207109" x1="19.9998" y1="4.64758" x2="19.9998" y2="39.3097" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00AAFF" />
                                                <stop offset="1" stop-color="#0068EF" />
                                              </linearGradient>
                                              <radialGradient id="paint1_radial_281_207109" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9962 19.6551) scale(21.8649 21.4879)">
                                                <stop stop-color="#33A2FF" />
                                                <stop offset="0.994792" stop-color="#33A2FF" stop-opacity="0" />
                                              </radialGradient>
                                              <linearGradient id="paint2_linear_281_207109" x1="16.7566" y1="12.2874" x2="18.2435" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint3_linear_281_207109" x1="23.1926" y1="12.2874" x2="21.7058" y2="13.8549" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint4_linear_281_207109" x1="20.054" y1="12.2861" x2="19.9177" y2="14.7145" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#B3B3B3" />
                                              </linearGradient>
                                              <linearGradient id="paint5_linear_281_207109" x1="19.9976" y1="25.2383" x2="19.9976" y2="32.9457" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#C0C0C0" />
                                              </linearGradient>
                                              <linearGradient id="paint6_linear_281_207109" x1="20.0504" y1="24.1189" x2="20.0504" y2="12.4797" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BB1530" />
                                                <stop offset="1" stop-color="#CC0070" />
                                              </linearGradient>
                                              <linearGradient id="paint7_linear_281_207109" x1="20.0522" y1="17.1089" x2="20.0522" y2="13.3976" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#BB1530" />
                                                <stop offset="1" stop-color="#CC0070" />
                                              </linearGradient>
                                              <linearGradient id="paint8_linear_281_207109" x1="20.0639" y1="13.8276" x2="20.0639" y2="17.1089" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#D9D9D9" />
                                              </linearGradient>
                                              <linearGradient id="paint9_linear_281_207109" x1="20.0639" y1="17.1094" x2="20.0639" y2="24.1188" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="white" />
                                                <stop offset="1" stop-color="#D9D9D9" />
                                              </linearGradient>
                                              <linearGradient id="paint10_linear_281_207109" x1="32.989" y1="16.6884" x2="32.989" y2="40.0006" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#6CD6FD" />
                                                <stop offset="1" stop-color="#3359FF" />
                                              </linearGradient>
                                            </defs>
                                          </svg>

                                        </div>
                                        <p className="tableimgtext">
                                          EXPLORER
                                        </p>
                                      </div>
                                    </td>
                                    <td>EXPLORER</td>
                                    <td>
                                      <span className="eleipiess">
                                        Lorum ipsum dolar set up
                                      </span>
                                    </td>
                                    <td>24/11/2023 06:04</td>
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
                        </>
                      )}
                    </div>
                  </>
                )}
                {activeTab1 === 'link-6666' && (
                  <>
                    <div className='maintablea mb-3'>
                      <div className="maintablea_user-detailss table-responsive">
                        <table>
                          <thead>
                            <th>
                              Ticket id
                            </th>
                            <th> Subject</th>
                            <th>
                              Date </th>
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
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
                                  <button className="detailbtn" >Detail</button>
                                </Link>

                              </td>
                            </tr>
                            <tr>
                              <td>
                                9AF3DF
                              </td>
                              <td>Claim Failed</td>
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
                                <Link to="/admin/Ticketdetail">
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
                  </>
                )}
                {activeTab1 === 'link-7777' && (
                  <>
                    <h1>KYC</h1>
                  </>
                )}


              </>
            )}

          </section>
        </div >
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

export default UserDetail;
