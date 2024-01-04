import React, { useState } from 'react'
import { Modal, Nav, Pagination } from 'react-bootstrap'
import './stakingleaderboards.scss'
import { Link } from 'react-router-dom';

const Stakingleaderboards = () => {

    const [activeTab, setActiveTab] = useState('link-1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const [activeTab1, setActiveTab1] = useState('link-1');

    const handleSelect1 = (eventKey) => {
        setActiveTab1(eventKey);
    }
    return (
        <>
            <div className='content'>
                <div className='maintablea_leader'>




                    <>
                        <div className="innertable  table-responsive">
                            <table>
                                <thead>

                                    <th>Users </th>
                                    <th> No of Referres</th>
                                    <th>Referrer Staking  </th>

                                </thead>
                                <tbody>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        <td>121</td>
                                        <td>
                                            <span className="eleipiess">
                                                100
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


                </div>
            </div>


        </>
    )
}

export default Stakingleaderboards
