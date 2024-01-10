import React, { useState } from 'react'
import { Dropdown, Modal, Nav, Pagination } from 'react-bootstrap'
import './applications.scss'
import { Link } from 'react-router-dom';

const Applications = () => {
    const [activeTab, setActiveTab] = useState('link-1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const [activeTab1, setActiveTab1] = useState('link-1');

    const handleSelect1 = (eventKey) => {
        setActiveTab1(eventKey);
    }
    const [activeTab2, setActiveTab2] = useState('link-2');

    const handleSelect2 = (eventKey) => {
        setActiveTab2(eventKey);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='content'>
                <div className="container-fluid">
                    <div className='maintablea'>
                        <div className='applicationpills'>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className='applicationpills_inernavtabs'>
                                <Nav.Item className='app_tabs_items'>
                                    <Nav.Link className='ineramb' eventKey="link-1">Launchpads</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='app_tabs_items'>
                                    <Nav.Link className='ineramb' eventKey="link-2">Collections</Nav.Link>
                                </Nav.Item>

                            </Nav>

                        </div>
                        <div className="newinputs">
                            <div className="inputoutermain onlyformobilemain">

                                <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                    <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                </svg>
                                <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

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
                            {/* <Dropdown className="filyerbyns ">
                                <Dropdown.Toggle className="filyerbynss" id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                        <g clip-path="url(#clip0_267_7989)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50137 15.7501C7.50137 15.2661 7.89512 14.8765 8.375 14.8765H13.625C14.109 14.8765 14.4986 15.2702 14.4986 15.7501C14.4986 16.23 14.1049 16.6237 13.625 16.6237H8.375C7.89102 16.6237 7.50137 16.2341 7.50137 15.7501ZM3.99863 10.5001C3.99863 10.0161 4.39238 9.62646 4.87227 9.62646H17.1236C17.6076 9.62646 17.9973 10.0202 17.9973 10.5001C17.9973 10.98 17.6035 11.3737 17.1236 11.3737H4.87637C4.39238 11.3737 3.99863 10.9841 3.99863 10.5001ZM0.5 5.2501C0.5 4.76611 0.89375 4.37646 1.37363 4.37646H20.6223C21.1063 4.37646 21.4959 4.77021 21.4959 5.2501C21.4959 5.72998 21.1021 6.12373 20.6223 6.12373H1.37363C0.89375 6.12373 0.5 5.73408 0.5 5.2501Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_267_7989">
                                                <rect width="21" height="21" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Filters
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Blocked</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Verified</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>


                        {activeTab === 'link-1' && (
                            <>
                                <div className='maintablea  onlybdrfor'>
                                    <div className='maintablepills'>
                                        <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsouter'>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-2222">Pending</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-3333">Approved</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-4444">
                                                    Rejected
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>



                                    {activeTab1 === 'link-2222' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                    {activeTab1 === 'link-3333' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                    {activeTab1 === 'link-4444' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                            </>
                        )}
                        {activeTab === 'link-2' && (
                            <>
                                <div className='maintablea onlybdrfor'>
                                    <div className='maintablepills'>
                                        <Nav variant="pills" activeKey={activeTab2} onSelect={handleSelect2} className='amberpillsouter'>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-666">Pending</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-777">Approved</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-888">
                                                    Rejected
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>



                                    {activeTab2 === 'link-666' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                    {activeTab2 === 'link-777' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                    {activeTab2 === 'link-888' && (
                                        <>
                                            <div className="maintablecreater">
                                                <div className="innertable_user table-responsive">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                Collections
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                symbol
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>
                                                            <th>
                                                                <div className='volmouter'>
                                                                    Artwork link

                                                                </div>
                                                            </th>
                                                            <th  >
                                                                Category
                                                                {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                            </th>

                                                            <th>
                                                                Supply

                                                            </th>
                                                            <th>
                                                                mint date
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                                                            Forganas
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    FGR
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        i.me/johndoe
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    Pfps
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        30 Core
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="eleipiess">
                                                                        15-3-2024
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="detailbtn" onClick={handleShow}>Detail</button>
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
                                <h5 className=''>
                                    Carolyn Wilson
                                </h5>
                                <div className='tommodimg'>
                                    <img src="\launchpad\modalctr.svg" alt="" className='modinerimg' />
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'>Project name </h6>
                                    <h6 className='namefullletf'> Forganas </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Email  </h6>
                                    <h6 className='namefullletf'> 123@gmail.com </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft w-100'>
                                    <h6 className='usernnamee'>Project description </h6>
                                    <h6 className='namefullletdestpn'> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt. </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'>Supply </h6>
                                    <h6 className='namefullletf'> 30 CORE </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>30 CORE </h6>
                                    <h6 className='namefullletf'> 2,087 CORE </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Expected mint date </h6>
                                    <h6 className='namefullletf'> 15-3-2024 </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Referral  </h6>
                                    <h6 className='namefullletf'> Word of mouth </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Team </h6>
                                    <h6 className='namefullletf'> i.me/johndoe </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Twitter link  </h6>
                                    <h6 className='namefullletf'> i.me/johndoe </h6>
                                </div>
                            </div>
                            <div className='modfsrflex'>
                                <div className='fsteft'>
                                    <h6 className='usernnamee'> Discord link </h6>
                                    <h6 className='namefullletf'> i.me/johndoe </h6>
                                </div>
                                <div className='fsteftsec'>
                                    <h6 className='usernnamee'>Discord address  </h6>
                                    <h6 className='namefullletf'> i.me/johndoe </h6>
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

export default Applications
