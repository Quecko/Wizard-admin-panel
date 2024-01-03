/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import user4 from "assets/img/userflow/add1.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
// import { inputAction } from '../../redux/action/action';
// import { useDispatch } from 'react-redux'
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  // InputGroup,
  // InputGroupText,
  // InputGroupAddon,
  // Input,
} from "reactstrap";

import routes from "routes.js";
import { Dropdown, FormLabel, InputGroup } from "react-bootstrap";


const Header = (props) => {
  const [showcalendar4, setShowCalendar4] = useState(false);
  const [showw, setShoww] = useState(false);
  const handleClose = () => setShoww(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [myFiles, setMyFiles] = useState({});
  const token = localStorage.getItem('mytoken')
  const Acls = JSON.parse(localStorage.getItem('acls'))
  const role = localStorage.getItem('myrole')
  const [open, setOpen] = useState(false);
  const [brandName, setbrandName] = React.useState();
  // const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  console.log("brandnaemmee", brandName)

  const getBrand = () => {
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // brandname = prop.name;

        setbrandName(prop.name)
      }
      return null;
    });
  };
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    category: '',
    search: ''
  })

  const renderPhotos = (source) => {
    return <img src={source} alt="" width="200" height="200" />
  }
  const { category } = inputs;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }
  const handleFileSelect = (evt) => {
    if (evt.target.files) {
      const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImg(filesarray[0]);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles(file)
  }

  const addCategory = (e) => {
    setOpen(true)
    const data = new FormData();
    data.append("image", myFiles)
    data.append("name", category)
    if (category !== '' && myFiles !== '') {
      axios.post(Environment.backendUrl + "/videoCategory/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          setOpen(false)
          toast.success("Category Added", {
            position: "top-center",
            autoClose: 3000,
          });
          setInputs({
            category: '',
          })
          setSelectedImg('')
          window.$('#exampleModal34').modal('hide')
          window.location.reload();

        }).catch((err) => {
          setOpen(false)
          toast.error(err.response.data.msg, {
            position: "top-center",
            autoClose: 2000,
          });
        })
    } else {
      close()
      setOpen(false)
      toast.error("Category cannot be empty", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  const close = () => {
    window.$('#exampleModal34').modal('hide')
  }
  const opeeennn = () => {
    window.$('#exampleModal34').modal('show')
  }
  useEffect(() => {
    getBrand()
  })

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);



  const [selectedItem, setSelectedItem] = useState("");
  const items = ["Latest", "day", "week"]

  const [selectedItemfilter, setSelectedItemfilter] = useState("");
  const itemsfilter = ["Latest", "day", "week"]


  console.log("brancd name", brandName)
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <div className="main-div-nav-head">
      <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
      <Navbar
        color={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : color
        }
        expand="md"
        className={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid className="main-header-top-change">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand >{brandName}</NavbarBrand>
          </div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className="justify-content-end text-center">
            {/* <form>
              <InputGroup className="no-border">
                <Input name="search" value={search} onChange={handleChange} className={'form-control'} placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <button onClick={() => dispatch(inputAction(inputs.search))} type="button" className="nav-buttonss" > <i className="nc-icon nc-zoom-split" /></button>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form> */}

            {brandName === 'Videos / Videos' && Acls?.videos?.create && <Link to={`/admin/addvideos`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Video</button></Link>}
            {(brandName === 'Banner / Game Banner' && Acls?.gameBanner?.create) ? <Link to={`/admin/addBanners/game`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Banner</button></Link> : null}
            {brandName === 'Banner / News Banner' ? <Link to={`/admin/addBanners/news`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Banner</button></Link> : null}
            {brandName === 'Other Banner' ? <Link to={`/admin/addBanners/other`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Banner</button></Link> : null}
            {console.log('otherBanner', brandName)}
            {brandName === 'Play To Earn' && Acls?.playToEarn?.create && <Link to={`/admin/addplaytoearn`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />Add Play to Earn</button></Link>}
            {brandName === 'Upcoming' && Acls?.upComming?.create && <Link to={`/admin/addupcoming`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />Add Upcoming</button></Link>}
            {brandName === 'Daily Challegne' && Acls?.dailyChallenge?.create && <Link to={`/admin/adddailychallange`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />Add Challanges</button></Link>}


            {brandName === 'Task' && Acls?.task?.create && <Link to={`/admin/addtask`}>

              <div className="newinputs">
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    This Week
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Task</button>
              </div>
            </Link>


            }

            {brandName === 'Rewards / LeaderBoard' && Acls?.leaderBoard?.create &&
              <div className="custom-tab-bar d-flex justify-content-center p-0 border-0">
                <a className='clanderdate' onClick={() => setShowCalendar4(!showcalendar4)}>
             <input className="cutimixwclndr" placeholder="12 Apr, 2023 -12 May, 2023" type="date">

             </input>
                </a>
                {/* {showcalendar && ( */}
                {/* {showcalendar4 && (
                  <div className="cal set-custom-calendar-div">
                    <Calendar
                      numberOfMonths={2}
                      disableMonthPicker
                      disableYearPicker
                    />
                  </div>
                )} */}
                <Link to={`/admin/dailyleaderboard`}>

                  <button type="button" className="blue-add-category"> Past Week</button></Link>




              </div>

            }

            {/* {brandName === 'Rewards / LeaderBoard' && Acls?.leaderBoard?.create && <Link to={`/admin/dailyleaderboard`}>
              <button type="button" className="blue-add-category"> Past Week</button></Link>} */}

            {brandName === 'on boarding' && <Link to={`/admin/addonboarding`}>

              <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="img" />  Add On Boarding</button></Link>}



            {/* {brandName === 'LeaderBoard / Detail'&& Acls?.leaderboarddetailsnew?.create &&  role === 'super-admin' &&


  <></>

            } */}
            {brandName === 'Reward / This Week Reward' && Acls?.weeksReward?.create && <Link to={`/admin/thisweekrewardform`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Reward</button></Link>}





            {brandName === 'FAQs' && Acls?.faq?.create && <Link to={`/admin/AddFaq`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add FAQ</button></Link>}
            {brandName === 'Coins' && Acls?.coins?.create && <Link to={`/admin/AddCoins`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Coin</button></Link>}
            {brandName === 'Meme Coins' && <Link to={`/admin/AddMemeCoins`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add MemeCoin</button></Link>}
            {brandName === 'Push Notifications' && Acls?.notification?.create && <Link to={`/admin/sendnotification`}> <button type="button" className="blue-add-category">  Send Notification</button></Link>}
            {/* {(window.location.href.indexOf(prop.layout + prop.path) == a} */}
            {brandName === 'Videos / Course' && Acls?.course?.create && <Link> <button type="button" className="blue-add-category" data-toggle="modal" onClick={opeeennn} >  Add Course</button></Link>}
            {(brandName === 'add badges' && Acls?.badges?.create) && <Link to={`/admin/sendbadges`}> <button type="button" className="blue-add-category">  ADD Badges</button></Link>}
            {brandName === 'Social Links' && <Link to={`/admin/addsociallinks`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Links</button></Link>}
            {brandName === 'Bolt Management' && <Link to={`/admin/addboltcategory`}> <button type="button" className="blue-add-category">  ADD Categories</button></Link>}
            {brandName === 'Subscription' && <Link to={`/admin/addsubscription/4577432`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Subcription</button></Link>}
            {(brandName === 'Raffles' && Acls?.raffles?.create) && <Link to={`/admin/addraffles/4577432`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Raffles</button></Link>}


            {(brandName === 'Raffles categories' && Acls?.rafflesCategories?.create) && <Link to={`/admin/addcategoryraffle/4577432`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Categories</button></Link>}
            {brandName === 'Categories' && <Link to={`/admin/addproductraffle`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Products</button></Link>}
            {(brandName === 'Products' && Acls?.products?.create) && <Link to={`/admin/addproducts/4577432`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Products</button></Link>}
            {(brandName === 'Category' && Acls?.productCategories?.create) && <Link to={`/admin/addnewcategory/4577432`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Categories</button></Link>}
            {brandName === 'Add Category' && <Link to={`/admin/addproducts`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Products</button></Link>}
            {brandName === 'AllUserAdmin' && role === 'super-admin' && <Link to={`/admin/AddAdminUser`}> <button type="button" className="blue-add-category" data-toggle="modal" >  Add Admin User</button></Link>}
            {brandName === 'Add role management' && role === 'super-admin' && <Link to={`/admin/addrolemanagement`}> <button type="button" className="blue-add-category" data-toggle="modal" >  Add Role</button></Link>}

            {brandName === 'Ambassadors Applications' && role === 'super-admin' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>

            }
            {brandName === 'Support' && role === 'super-admin' &&
              <div className="newinputs">
                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
            }
            {brandName === "Support/Ticket Details" && role === 'super-admin' &&
              <></>

            }
            {brandName === 'Ambassadors Claims' && role === 'super-admin' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
            }
            {brandName === 'Leaderboards' && role === 'super-admin' &&
         <div className="newinputs">

         <div className="inputoutermain">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
             <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
             <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
           </svg>
           <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

         </div>

         <Dropdown className="amer_dropdonfst">
           <Dropdown.Toggle id="dropdown-basic">
             Sort by
           </Dropdown.Toggle>

           <Dropdown.Menu>
             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
         <Dropdown className="amer_dropdonfst">
           <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
               <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
               <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
               <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
               <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
             </svg>
             Filters
           </Dropdown.Toggle>

           <Dropdown.Menu>
             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>

       </div>

            }




            {brandName === 'Launchpad' && <Link to={`/admin/raffles`}> <button type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Add Raffles</button></Link>}

            {brandName === 'Users' && role === 'super-admin' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>}

            {brandName === 'User / Detail' && role === 'super-admin' &&
              <div className="">

                <div className="custom-tab-bar  border-0">
                  <div className="main-outer-p">
                    <div className="main-p">
                      <p>Verifie user</p>
                    </div>
                    <div className="main-switch-nn">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitches" />
                        <label class="custom-control-label" for="customSwitches"></label>
                      </div>
                    </div>
                  </div>




                  <a className='clanderdate' onClick={(handleButtonClick) => setShowCalendar4(!showcalendar4)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                      <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                    </svg>
                  </a>
                  {/* {showcalendar && ( */}
                  {showcalendar4 && (
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
            }

            {brandName === 'User / Detail' && role === 'super-admin' &&
              <></>

            }
            {brandName === 'Gifts' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button onClick={() => setShoww(true)} type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Send Gifts</button>

              </div>


            }

            {/* orders navbar */}
            {brandName === 'Orders' && <div className="ordersnavbar">
              <div className="searchinput">
                <input type="text" placeholder="search" className="orderinput" />
                <img src="\dashboard-assets\Search.svg" alt="search" className="searchimg" />
              </div>
              <div class="dropdown droped">
                <button class="dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                  {
                    selectedItem ? <><h6 style={{ color: "black" }}>{selectedItem}</h6></> : "Sort by"}
                </button>
                <div class="dropdown-menu dropmain">
                  {items.map((item) => (
                    <a className="dropdown-item drop" onClick={() => setSelectedItem(item)}>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div class="dropdown droped">
                <button class="dropbtnfilter" type="button" data-toggle="dropdown" aria-expanded="false">
                  {
                    selectedItemfilter ? <><h6 style={{ color: "black" }}>{selectedItemfilter}</h6></> : <p><img src="\dashboard-assets\Group 17.svg" alt="filters" />Filters</p>}
                </button>
                <div class="dropdown-menu dropmain">
                  {itemsfilter.map((item) => (
                    <a className="dropdown-item drop" onClick={() => setSelectedItemfilter(item)}>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>}
            {brandName === 'staking Leaderboard' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
            }
            {brandName === 'Mystery Box Reward' &&
              <div className="newinputs">

                <div className="inputoutermain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ambrinputicon">
                    <path d="M7.66927 14.5026C3.9026 14.5026 0.835938 11.4359 0.835938 7.66927C0.835938 3.9026 3.9026 0.835938 7.66927 0.835938C11.4359 0.835938 14.5026 3.9026 14.5026 7.66927C14.5026 11.4359 11.4359 14.5026 7.66927 14.5026ZM7.66927 1.83594C4.44927 1.83594 1.83594 4.45594 1.83594 7.66927C1.83594 10.8826 4.44927 13.5026 7.66927 13.5026C10.8893 13.5026 13.5026 10.8826 13.5026 7.66927C13.5026 4.45594 10.8893 1.83594 7.66927 1.83594Z" fill="#A3A3A3" />
                    <path d="M14.6676 15.1676C14.5409 15.1676 14.4143 15.1209 14.3143 15.0209L12.9809 13.6876C12.7876 13.4943 12.7876 13.1743 12.9809 12.9809C13.1743 12.7876 13.4943 12.7876 13.6876 12.9809L15.0209 14.3143C15.2143 14.5076 15.2143 14.8276 15.0209 15.0209C14.9209 15.1209 14.7943 15.1676 14.6676 15.1676Z" fill="#A3A3A3" />
                  </svg>
                  <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                </div>

                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="amer_dropdonfst">
                  <Dropdown.Toggle className="filyerbyn" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <line x1="1" y1="1" x2="17" y2="1" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="3" y1="5" x2="15" y2="5" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="5" y1="9" x2="13" y2="9" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                      <line x1="8" y1="13" x2="10" y2="13" stroke="#4F4E69" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>}


          </Collapse>
        </Container>
      </Navbar>
      {/* Add Category Modal */}
      <div className="main-modal-one">
        <div class="modal fade modal-zzz" id="exampleModal34" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog daily-profile-modal">
            <div class="modal-content daily-profile-modal-inner">
              <div class="modal-body modal-body-main">
                <div className="main-outter">
                  <div className="row main-cardssss">
                    <div className="col-md-12 col-12">
                      <div className="flux-b">
                        <h3>Add Course</h3>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label for="example">Add Thumbnail</label>
                        <div className="main-image-div">
                          <div className="choose-filessssss">
                            <form>
                              <div className="sbhjsbd">
                                {selectedImg ? renderPhotos(selectedImg) : null}
                                <div className="layerss"></div>
                              </div>

                              <div className="nsjd">
                                <label className="" for="filess"><i class="fas fa-cloud-upload-alt"></i></label>
                                <input type="file" name="image" id="filess" onChange={handleFileSelect} className='form-control d-none' />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="form-group">
                        <label for="example">Course Name</label>
                        <input type="text" name="category" value={category} onChange={handleChange} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} placeholder="Enter Category Name" />

                      </div>
                    </div>
                    <div className="col-md-12 col-12">
                      <div className="button-modal-daily">
                        <button type="button" className="button-main-daily" onClick={addCategory} >Add</button>
                        <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close" onChange={close} >Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* send gift modal here......................... */}
      <Modal className='sendgift-modal' show={showw} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Send Gift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="parent-field">
            <h6>Select Item</h6>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Item
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
                <a class="dropdown-item" href="#">Select Item</a>
              </div>
            </div>
          </div>
          <div className="option-field">
            <h6>Search with email address</h6>
            <input type="text" placeholder='Enter email address' />
          </div>
          <div className="twice-btn">
            <button onClick={handleClose} className='btn-cancel'>Cancel</button>
            <button className='btn-send'>Send</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>

  );
}

export default Header;
