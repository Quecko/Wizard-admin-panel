
import React, { useEffect, useState } from "react";
import './badges.scss';
import Environment from "utils/Environment";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";
// reactstrap components
function Badges() {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [myFiles, setMyFiles] = useState([]);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getAllBadges = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/badges/all", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.badges)
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
                    <div className="inerimgd">
                        <img src={elem?.image} className="tableimgginer" alt="" />
                    </div>
                </td>
                <td className='bagestablerow'>{elem?.name}</td>
                <td className='bagestablerow'>{elem?.type}</td>
                <td className='bagestablerow eleipiess'>{elem?.description}</td>
                {/* <td>               
                                 <button className="buttons-remove" type="button" onClick={() => badgeDelete(elem.id)}><i className="far fa-trash-alt"></i></button>
                 
                 
                 </td> */}
                {Acls?.badges?.update ? <td> <Link to={'/admin/sendbadgesss/' + elem?.id}>

                    <button className="btn-common px-3  py-2">Edit</button>
                </Link></td> : ''}
            </tr>
        )
    })

    const badgeDelete = (de) => {
        setOpen(true)
        const id = de
        axios.get(Environment.backendUrl + "/badges/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success('Notification Deleted ', {
                    position: "top-center",
                    autoClose: 2000,
                });
                getAllBadges()

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }


    useEffect(() => {
        getAllBadges()
    }, [token])

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos notifications card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Badge Image</th>
                                        <th>name</th>
                                        <th>Type  <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th >Description <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        {/* <th>Delete </th> */}
                                        {Acls?.badges?.update ? <th>Edit </th> : ''}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {noti}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Badges;
