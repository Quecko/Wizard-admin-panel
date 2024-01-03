

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
function Steakleaderboard() {
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

                    <div className='maintablea_task'>
                        <div className="innertable_user">
                            <table>
                                <thead>
                                    <th>Users </th>
                                    <th>Streak (Days)</th>
                                    <th>Earned Bolts
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M10.4457 6.25331H8.64318V2.05331C8.64318 1.07331 8.11234 0.874981 7.46484 1.60998L6.99818 2.14081L3.04901 6.63248C2.50651 7.24498 2.73401 7.74665 3.55068 7.74665H5.35318V11.9466C5.35318 12.9266 5.88401 13.125 6.53151 12.39L6.99818 11.8591L10.9473 7.36748C11.4898 6.75498 11.2623 6.25331 10.4457 6.25331Z" fill="url(#paint0_linear_758_1353)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_758_1353" x1="2.78002" y1="1.16614" x2="13.6105" y2="3.85172" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#AF1DF0" />
                                                    <stop offset="1" stop-color="#CF62FF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
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
                                        {/* <td>
                                            <Link to="/admin/userdetail">
                                                <button className="detailbtn" >Detail</button>
                                            </Link>
                                        </td> */}
                                    </tr>



                                </tbody>

                            </table>

                        </div>

                    </div>






                </section>
            </div>
        </>
    );
}

export default Steakleaderboard;
