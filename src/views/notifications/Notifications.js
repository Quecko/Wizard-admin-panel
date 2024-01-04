
import React, { useEffect, useState } from "react";
import './notification.scss';
import Environment from "utils/Environment";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
function Notificationss() {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [myFiles, setMyFiles] = useState([]);
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getNotification = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/notification/all/admin", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.notifications)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const noti = myFiles.map((elem) => {
        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.image} className="pr-2 imgages-no" alt="" />
                </td>
                <td className=''>{elem?.title}</td>
                <td className=''>{elem?.description}</td>
                <td className=''>{elem?.createdAt.split('T')[0]}</td>
                <td className=''>{elem?.to}</td>
                {Acls?.notification?.delete ? <td><button className="buttons-remove" type="button" onClick={() => notiDel(elem.id)}><i className="far fa-trash-alt"></i></button></td> : ''}
            </tr>
        )
    })

    const notiDel = (de) => {
        setOpen(true)
        const id = de
        axios.get(Environment.backendUrl + "/notification/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success('Notification Deleted ', {
                    position: "top-center",
                    autoClose: 2000,
                });
                getNotification()

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }


    useEffect(() => {
        getNotification()
    }, [token])

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                {/* <section className="videos notifications card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th > Creation Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Platform <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th>Remove </th>
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {noti}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section> */}
                <section className="videos notifications card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <div className="innertable-notificationss">
                                <table>
                                    <thead>
                                        <th>Message</th>
                                        <th > Creation Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Platform <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="onlyboldtext">Sed ut perspiciatis unde omnis iste natus error</td>
                                            <td className="onlyboldtext">Aug 18, 2021</td>
                                            <td className="onlyboldtext">All</td>
                                        </tr>
                                        <tr>
                                            <td className="onlyboldtext">Sed ut perspiciatis unde omnis iste natus error</td>
                                            <td className="onlyboldtext">Aug 18, 2021</td>
                                            <td className="onlyboldtext">All</td>
                                        </tr>
                                        <tr>
                                            <td className="onlyboldtext">Sed ut perspiciatis unde omnis iste natus error</td>
                                            <td className="onlyboldtext">Aug 18, 2021</td>
                                            <td className="onlyboldtext">Android</td>
                                        </tr>
                                        <tr>
                                            <td className="onlyboldtext">Sed ut perspiciatis unde omnis iste natus error</td>
                                            <td className="onlyboldtext">Aug 18, 2021</td>
                                            <td className="onlyboldtext">IOS</td>
                                        </tr>
                                        <tr>
                                            <td className="onlyboldtext">Sed ut perspiciatis unde omnis iste natus error</td>
                                            <td className="onlyboldtext">Aug 18, 2021</td>
                                            <td className="onlyboldtext">IOS</td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}

export default Notificationss;
