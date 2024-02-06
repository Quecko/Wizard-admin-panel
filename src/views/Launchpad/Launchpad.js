
import "./launchpad.scss"

import Environment from 'utils/Environment';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { Dropdown, Modal, Nav, Pagination } from 'react-bootstrap'


const Launchpad = () => {
    const api_url = Environment.api_url;
    const val = localStorage.getItem("accessToken");
    const [offset, setOffset] = useState(1);
    const [limit, setLimit] = useState(100);
    const [activeTab, setActiveTab] = useState('live');
    const [block, setBlock] = useState(false);
    const [verify, setVerify] = useState(false);
    const [all, setAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleVerifyFilter = (e) => {
        if (e.target.checked) {
          setVerify(true);
          setBlock(false);
        } else if (!e.target.checked) {
          setVerify(false);
        }
      };
    
      const handleBlockFilter = (e) => {
        if (e.target.checked) {
          setBlock(true);
          setVerify(false);
        } else if (!e.target.checked) {
          setBlock(false);
        }
      };
    
      const handleRemoveFilter = (e) => {
        if (e.target.checked) {
          setBlock(false);
          setVerify(false);
        }
      };


    const handleSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    const getLaunchpads = async (val, duration) =>{
        let apiUrl = api_url + "/launchpads/approved?limit=" + limit + "&offset=" + offset+ "&duration=" + duration;
        
        if (searchQuery) {
          apiUrl += "&search=" + searchQuery;
        }
      
        apiUrl += verify ? "&openEddition=true" : block ? "&limitedEddition=true" : "";
      
        const config = {
          method: "get",
          url: apiUrl,
          headers: {
            Authorization: "Bearer " + val,
          },
        };
      
        const response = await axios(config);
        console.log(response?.data?.data?.creators);
        // setCreator(response?.data?.data?.creators);
      };

    useEffect(() => {
        getLaunchpads(val, activeTab);
    }, [activeTab,searchQuery,verify,block,all])

    return (
        <>


            <div className="content">
                <div className="container-fluid">
                    <div className="newinputs">
                        <div className="inputoutermain onlyformobilemain">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                            </svg>
                            <input  value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                        </div>
                        <Dropdown className="amer_dropdonfstnew onlyformobile d-none " autoClose={false}>
                            <Dropdown.Toggle id="dropdown-basic" className="scrhmolddropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                    <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="onlymobile">
                                <Dropdown.Item href="#/action-1">
                                    <div className="inputoutermain ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                            <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                        </svg>
                                        <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

                                    </div></Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="amer_dropdonfst ">
                            <Dropdown.Toggle id="dropdown-basic">
                                Sort by
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Sort By</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Name</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">Item Created</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Item Sold</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">Followers</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Following</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="filyerbyns ">
                            <Dropdown.Toggle className="filyerbynss" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M9.49329 18.875C9.09329 18.875 8.70163 18.775 8.33496 18.575C7.60163 18.1667 7.15996 17.425 7.15996 16.5917V12.175C7.15996 11.7583 6.88496 11.1333 6.62663 10.8167L3.50996 7.51666C2.98496 6.99167 2.58496 6.09167 2.58496 5.41667V3.5C2.58496 2.16667 3.59329 1.125 4.87663 1.125H15.8766C17.1433 1.125 18.1683 2.15 18.1683 3.41667V5.25C18.1683 6.125 17.6433 7.11666 17.1516 7.60833L13.5433 10.8C13.1933 11.0917 12.9183 11.7333 12.9183 12.25V15.8333C12.9183 16.575 12.4516 17.4333 11.8683 17.7833L10.7183 18.525C10.3433 18.7583 9.91829 18.875 9.49329 18.875ZM4.87663 2.375C4.29329 2.375 3.83496 2.86667 3.83496 3.5V5.41667C3.83496 5.725 4.08496 6.325 4.40163 6.64166L7.57663 9.98333C8.00163 10.5083 8.41829 11.3833 8.41829 12.1667V16.5833C8.41829 17.125 8.79329 17.3917 8.95163 17.475C9.30163 17.6667 9.72663 17.6667 10.0516 17.4667L11.21 16.725C11.4433 16.5833 11.6766 16.1333 11.6766 15.8333V12.25C11.6766 11.3583 12.11 10.375 12.735 9.85L16.3016 6.69166C16.585 6.40833 16.9266 5.73333 16.9266 5.24167V3.41667C16.9266 2.84167 16.46 2.375 15.885 2.375H4.87663Z" fill="#862FC0" />
                                    <path d="M5.37652 8.95839C5.25985 8.95839 5.15152 8.92506 5.04319 8.86672C4.75152 8.68339 4.65986 8.29172 4.84319 8.00006L8.95152 1.41672C9.13485 1.12506 9.51819 1.03339 9.80985 1.21672C10.1015 1.40006 10.1932 1.78339 10.0099 2.07506L5.90152 8.65839C5.78486 8.85006 5.58485 8.95839 5.37652 8.95839Z" fill="#862FC0" />
                                </svg>
                                Filters
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="inneritem">
                                    All
                                    <div className="main-outer-p">

                                        <div className="main-switch-nns">
                                            <div class="custom-control custom-switchs">
                                                <input checked={all}
                                                    onChange={(e) => handleRemoveFilter(e)} type="checkbox" class="custom-control-input" id="customSwitches1" />
                                                <label class="custom-control-label" for="customSwitches1"></label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="inneritem">
                                    Open Edition

                                        <div className="main-switch-nns">
                                            <div class="custom-control custom-switchs">
                                                <input checked={verify}
                                                    onChange={(e) => handleVerifyFilter(e)} type="checkbox" class="custom-control-input" id="customSwitches2" />
                                                <label class="custom-control-label" for="customSwitches2"></label>
                                            </div>
                                        </div>
                                    </div>
                             
                                <div className="inneritem">
                                    limited Edition
                                    <div className="main-outer-p">

                                        <div className="main-switch-nns">
                                            <div class="custom-control custom-switchs">
                                                <input checked={block}
                                                    onChange={(e) => handleBlockFilter(e)} type="checkbox" class="custom-control-input" id="customSwitches3" />
                                                <label class="custom-control-label" for="customSwitches3"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className='maintablea  onlybdrfor'>
                        <div className='maintablepills'>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className='amberpillsouter'>
                                <Nav.Item className='amberitempils'>
                                    <Nav.Link className='ineramb' eventKey="live" onSelect={() => getLaunchpads(val, 'live')}>Live</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempils'>
                                    <Nav.Link className='ineramb' eventKey="upcoming" onSelect={() => getLaunchpads(val, 'upcoming')}>Upcoming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='amberitempils'>
                                    <Nav.Link className='ineramb' eventKey="past" onSelect={() => getLaunchpads(val, 'past')}>
                                        Ended
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>



                        // {activeTab === 'live' && (
                            <>
                                <div className="maintablecreater">
                                    <div className="innertable_user table-responsive">
                                        <table>
                                            <thead>
                                                <th>
                                                    project two
                                                    // <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    Supply
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Price
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th  >
                                                    expected mint date
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Email address
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    Referral
                                                </th>
                                                <th>
                                                    Detail
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='Paginationlattable'>
                                        <button className='leftpigbtn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
                                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab === 'upcoming' && (
                            <>
                                <div className="maintablecreater">
                                    <div className="innertable_user table-responsive">
                                        <table>
                                            <thead>
                                                <th>
                                                    project
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    Supply
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Price
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th  >
                                                    expected mint date
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Email address
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    Referral
                                                </th>
                                                <th>
                                                    Detail
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='Paginationlattable'>
                                        <button className='leftpigbtn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
                                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab === 'past' && (
                            <>
                                <div className="maintablecreater">
                                    <div className="innertable_user table-responsive">
                                        <table>
                                            <thead>
                                                <th>
                                                    project name
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    Supply
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Price
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th  >
                                                    expected mint date
                                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Email address
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    Referral
                                                </th>
                                                <th>
                                                    Detail
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="mainimgdiv">
                                                            <div className="inerimgd">
                                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                                </img>
                                                            </div>
                                                            <p className="tableimgtext">
                                                                Ramon
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        30 CORE
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            2,087 CORE
                                                        </span>
                                                    </td>
                                                    <td>
                                                        15-3-2024
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            123@gmail.com
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="eleipiess">
                                                            twitter
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="detailbtn" onClick={handleShow}>Details</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='Paginationlattable'>
                                        <button className='leftpigbtn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
                                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                </div>
            </div>
            <div className="gernelmodal">
                <Modal className='gernelmodal' show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>

                            Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mod_bodydiv '>
                            <div className="topdiv">
                                <h3 className='launchpadinfo'>
                                    Launchpad Info
                                </h3>
                                <h5 className=''>
                                    Project Image
                                </h5>
                                <div className='tommodimg'>
                                    <img src="\launchpad\modalctr.svg" alt="" className='modinerimg' />
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'>
                                        Launchpad Name
                                    </h6>
                                    <h6 className='namefullletf'>
                                        Spiritual but not religious
                                    </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Launchpad  </h6>
                                    <h6 className='namefullletf'> Limited edition </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft w-100'>
                                    <h6 className='usernnamee'>Limited edition </h6>
                                    <h6 className='namefullletdestpn'> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt. </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'>Total Supply </h6>
                                    <h6 className='namefullletf'> 4,444 </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Price </h6>
                                    <h6 className='namefullletf'> Games </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Team member 1</h6>
                                    <h6 className='namefullletf'> john Doe</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Team member 2  </h6>
                                    <h6 className='namefullletf'> Damon Holland </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Mint Start date </h6>
                                    <h6 className='namefullletf'>Mint Start date </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Mint Start date  </h6>
                                    <h6 className='namefullletf'> 3 </h6>
                                </div>
                            </div>
                            <div className='onlyforbdrre'>

                            </div>

                            <div className="topdivfds">
                                <h5 className='launchpadinfosssxx'>
                                    Team Info
                                </h5>
                                <h5 className='launchpadinfosssxxsmall'>
                                    Team Member 1
                                </h5>

                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Name </h6>
                                    <h6 className='namefullletf'> John Doe </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Designation  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Twitter </h6>
                                    <h6 className='namefullletf'> http://me.xn--c6h </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Designation  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                            <div className='onlyforbdrre'>

                            </div>

                            <div className="topdivfds">
                                <h5 className='launchpadinfosssxx'>
                                    Mint info
                                </h5>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Mint Start Date </h6>
                                    <h6 className='namefullletf'> 01/02/2024 2:44 PM</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Designation  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                            <div className="topdivfds">
                                <h5 className='launchpadinfosssxxsmall'>
                                    Mint Stage 1
                                </h5>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Name </h6>
                                    <h6 className='namefullletf'>Presale 1</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Duration  </h6>
                                    <h6 className='namefullletf'> 1d 2h 23m </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Sale Price </h6>
                                    <h6 className='namefullletf'>15.258 CORE</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Duration  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                            <div className="topdivfds">
                                <h5 className='launchpadinfosssxxsmall'>
                                    Mint Stage 2
                                </h5>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Name </h6>
                                    <h6 className='namefullletf'>Presale 1</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Duration  </h6>
                                    <h6 className='namefullletf'> 1d 2h 23m </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Sale Price </h6>
                                    <h6 className='namefullletf'>15.258 CORE</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Duration  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                            <div className='onlyforbdrre'>

                            </div>
                            <div className="topdivfds">
                                <h5 className='launchpadinfosssxx'>
                                    Earnings
                                </h5>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> earnings address </h6>
                                    <h6 className='namefullletf eleipiess'>0xab6fd6074782c805933...</h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Platfrom Fees  </h6>
                                    <h6 className='namefullletf'> 10% </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Your Earning </h6>
                                    <h6 className='namefullletf'>90%</h6>
                                </div>
                                 <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Duration  </h6>
                                    <h6 className='namefullletf'> Designer </h6>
                                </div>
                            </div>
                        </div>

                        <div className='lastfoterbtn'>
                            <button className='rreject'>
                                Reject
                            </button>

                            <button className='approveeedd'>
                                Approve
                            </button>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        </>
    )
}

export default Launchpad
