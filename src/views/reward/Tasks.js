
import React, { useEffect, useState } from "react";
import './rewardlea.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
import { Link } from "react-router-dom";
import { Nav, Pagination } from "react-bootstrap";
function Task() {
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
    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const token = localStorage.getItem('mytoken')

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getTask = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/task/all/admin", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setMyFiles(response.data.tasks)
                // setOpen(true)

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
                <td className='rrrsrsrr'>{elem.name}</td>
                <td className='rrrsrsr'>{elem.description}</td>
                {Acls?.task?.delete ? <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)} ><i className="far fa-trash-alt"></i></button></td> : ''}
                {Acls?.task?.update ? <td> <Link to={`/admin/addtask/` + elem.id}><i class="fas fa-edit"></i></Link></td> : ''}
            </tr>
        )
    })

    const collection = (de) => {
        setOpen(true)
        const id = de
        axios.get(Environment.backendUrl + "/task/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success('Task Deleted ', {
                    position: "top-center",
                    autoClose: 2000,
                });
                getTask()

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }

    useEffect(() => {
        getTask()
    }, [token])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            {/* <div className="content">
                <section className="tasks card">
                    <div className="container-fluid">
                        <div class="table-responsive overflow-responce">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Tasks Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        {Acls?.task?.delete ?<th>Remove</th> : ''}
                                        {Acls?.task?.update ? <th>Edit</th> : ''}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {News ? News : ""}
                                    <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['instagram.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>Instagram Story</td>
                                        <td className='whitespace'>Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.</td>
                                        <td> <img src={`${images['greentick.png']['default']}`} className="pr-2 imgages-no" alt="" /></td>
                                        <td> <img src={`${images['remove1.png']['default']}`} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['instagram.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>Play & Earn</td>
                                        <td className='whitespace'>Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.</td>
                                        <td><img src={`${images['greentick.png']['default']}`} className="pr-2 imgages-no" alt="" /></td>
                                        <td> <img src={`${images['remove1.png']['default']}`} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['instagram.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>Play & Earn</td>
                                        <td className='whitespace'>Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.</td>
                                        <td><img src={`${images['greentick.png']['default']}`} className="pr-2 imgages-no" alt="" /></td>
                                        <td> <img src={`${images['remove1.png']['default']}`} alt="" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div> */}


            <div className="content">
                <section className="main-tasks user-details">
                    {activeTab === 'link-1' && (
                        <>
                            <div className="lowertabsss">
                                <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsoutersss  newtabsstyl'>
                                    <Nav.Item className='amberitempilsss  inertabtask'>
                                        <Nav.Link className='inerambss' eventKey="link-1111">Live</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='amberitempilsss inertabtask'>
                                        <Nav.Link className='inerambss' eventKey="link-2222">Ended</Nav.Link>
                                    </Nav.Item>


                                </Nav>

                            </div>
                            {activeTab1 === 'link-1111' && (
                                <>
                                    <div className='maintablea_task'>
                                        <div className="innertable">
                                            <table>
                                                <thead>
                                                    <th>
                                                        Tasks Image
                                                    </th>
                                                    <th> Title / Description </th>
                                                    <th>Task Completion </th>
                                                    <th>Rewards </th>
                                                    <th>Featured Task </th>
                                                    <th>Date </th>
                                                    <th>Action </th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                <g clip-path="url(#clip0_277_135708)">
                                                                    <path d="M18.7466 8.87502C19.1433 9.27174 19.1433 9.91484 18.7466 10.3114L11.9332 17.125C11.5365 17.5215 10.8936 17.5215 10.4968 17.125L7.25339 13.8813C6.85666 13.4848 6.85666 12.8417 7.25339 12.4452C7.64992 12.0484 8.29301 12.0484 8.68954 12.4452L11.2149 14.9706L17.3103 8.87502C17.707 8.47849 18.3501 8.47849 18.7466 8.87502ZM26 13C26 20.1857 20.1848 26 13 26C5.81425 26 0 20.1848 0 13C0 5.81425 5.81525 0 13 0C20.1857 0 26 5.81525 26 13ZM23.9688 13C23.9688 6.937 19.0622 2.03125 13 2.03125C6.937 2.03125 2.03125 6.93779 2.03125 13C2.03125 19.063 6.93779 23.9688 13 23.9688C19.063 23.9688 23.9688 19.0622 23.9688 13Z" fill="#2CC84A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_277_135708">
                                                                        <rect width="26" height="26" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </>
                            )}
                            {activeTab1 === 'link-2222' && (
                                <>
                                    <div className='maintablea_task'>
                                        <div className="innertable">
                                            <table>
                                                <thead>
                                                    <th>
                                                        Tasks Image
                                                    </th>
                                                    <th> Title / Description </th>
                                                    <th>Task Completion </th>
                                                    <th>Rewards </th>
                                                    <th>Featured Task </th>
                                                    <th>Date </th>
                                                    <th>Action </th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="inerimgddd_task_table">
                                                                <img src="\rewards\fimg.svg" className="taskimg">
                                                                </img>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="taskinertablesecrow">
                                                                <h6 className="boldstory">
                                                                    Instagram Story
                                                                </h6>
                                                                <p className="Synergy">
                                                                    Share Our Post About Synergy
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="eleipiess">
                                                                15
                                                            </span>
                                                        </td>
                                                        <td>
                                                            10 Bolts
                                                        </td>
                                                        <td>
                                                            -
                                                        </td>
                                                        <td>24/11/2023 06:04</td>
                                                        <td>
                                                            <div className="tasktablelast">
                                                                <span className="edit">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <g clip-path="url(#clip0_277_135658)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_277_135658">
                                                                                <rect width="22" height="22" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                                <span className="trash">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                        <path d="M17.7506 6.13965H4.24769C3.83907 6.13965 3.50781 6.47087 3.50781 6.87945V18.437C3.50781 20.4014 5.10608 21.9996 7.07041 21.9996H14.9276C16.892 21.9996 18.4903 20.4014 18.4903 18.437V6.87945C18.4903 6.47091 18.1592 6.13965 17.7506 6.13965ZM9.22058 17.5437C9.22058 18.0456 8.81365 18.4526 8.31161 18.4526C7.80974 18.4526 7.40263 18.0456 7.40263 17.5437V10.5956C7.40263 10.0936 7.80967 9.68668 8.31161 9.68668C8.81362 9.68668 9.22058 10.0936 9.22058 10.5956V17.5437ZM14.5955 17.5437C14.5955 18.0456 14.1886 18.4526 13.6865 18.4526C13.1847 18.4526 12.7776 18.0456 12.7776 17.5437V10.5956C12.7776 10.0936 13.1846 9.68668 13.6865 9.68668C14.1885 9.68668 14.5955 10.0936 14.5955 10.5956V17.5437Z" fill="#D6D6D6" />
                                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>


                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </>
                            )}


                        </>
                    )}

                </section>
            </div>
        </>
    );
}

export default Task;
