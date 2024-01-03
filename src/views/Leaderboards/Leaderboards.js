import React, { useState } from 'react'
import { Modal, Nav, Pagination } from 'react-bootstrap'
import './leaderboards.scss'
import { Link } from 'react-router-dom';

const Leaderboards = () => {
    
    const [activeTab, setActiveTab] = useState('link-1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const [activeTab1, setActiveTab1] = useState('link-1');

    const handleSelect1 = (eventKey) => {
        setActiveTab1(eventKey);}
    return (
        <>
            <div className='content'>
                <div className='maintablea_leader'>
                    <div className='maintablepills'>
                        <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className='amberpillsouter_leader'>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-1">
                                    Bolts
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-2">
                                    Invites
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-3">
                                    Followers
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-4">
                                    Arcadia
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-5">
                                    Staking
                                </Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </div>



                    {activeTab === 'link-1' && (
                        <>
                            <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                    {activeTab === 'link-2' && (
                        <>
                         <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                    {activeTab === 'link-3' && (
                        <>
                            <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                    {activeTab === 'link-4' && (
                        <>
                       <div className="lowertabsss claimpillss">
                        <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsoutersss'>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-44">Hoop Shot</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-55">Knife Strike</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-66">Block Shooter</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-77">Fruit Warrior</Nav.Link>
                            </Nav.Item>
                        </Nav>
                  
                    </div>
                    {activeTab1 === 'link-44' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Score </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-55' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Score </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-66' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-77' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
            
               
                        </>
                    )}
                    {activeTab === 'link-5' && (
                        <>
                                    <div className="lowertabsss claimpillss">
                        <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsoutersss'>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-444">Hoop Shot</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-555">Knife Strike</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-666">Block Shooter</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-777">Fruit Warrior</Nav.Link>
                            </Nav.Item>
                        </Nav>
                  
                    </div>
                    {activeTab1 === 'link-444' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Score </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-555' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Score </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-666' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                      {activeTab1 === 'link-777' && (
                        <>
                          <div className="innertable  table-responsive">
                                <table>
                                    <thead>
                                        <th>Rank</th>
                                        <th>Users Name</th>
                                        <th> Date</th>
                                        <th>Bolts </th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#1</td>
                                            <td>
                                                <div className="mainimgdivvid ">
                                                    <div className="inerimgdvide">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginerddvidd">
                                                        </img>
                                                    </div>
                                                    <p className="tableimgtext">
                                                        Carolyn Wilson
                                                    </p>
                                                </div>
                                            </td>
                                            <td>02-Nov-2023</td>
                                            <td>
                                                <span className="eleipiess">
                                                    187,254
                                                </span>
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
                        </>
                    )}
                   
                        </>
                    )}
                </div>
            </div>


        </>
    )
}

export default Leaderboards
