
import React, { useEffect, useState } from "react";
import './coin1.scss';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import { Link } from "react-router-dom";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
function AdminUser() {
    const [myFiles, setMyFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const token = localStorage.getItem('mytoken')

    const getAllRole = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/adminManagement/all", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.admin)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const close = () => {
        window.$('#exampleModal345').modal('hide')
    }
    const opeeennn = () => {
        window.$('#exampleModal345').modal('show')
    }


    const News = myFiles?.map(elem => {
        return (
            <tr>
                 <td className=''>{elem.full_name}</td>
                 <td className=''>{elem.email}</td>
                <td className=''>{elem.Role?.role_name}</td>
                <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><i className="far fa-trash-alt"></i></button></td>
                <td> <Link to={'/admin/EditAdminUser/' + elem?.id}><i class="fas fa-edit"></i></Link></td>

            </tr>
        )
    })

    const collection = (de) => {
        const ids = de
        setId(ids)
        opeeennn()
    }

    const deleteCoin = () => {
        close()
        setOpen(true)
        axios.get(Environment.backendUrl + "/adminManagement/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                getAllRole()
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    useEffect(() => {
        getAllRole()
    }, [])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="banner card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Role Name</th>
                                        <th>Remove</th>
                                        <th>Edit</th>

                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {News}
                                </tbody>
                            </table>

                        </div>
                        <div class="modal fade modal-zzz" id="exampleModal345" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog daily-profile-modal">
                                <div class="modal-content daily-profile-modal-inner">
                                    <div class="modal-body modal-body-main">
                                        <div className="main-outter text-center">
                                            <div className="row main-cardssss">
                                                <div className="col-md-12 col-12">
                                                    <div className="awesm">
                                                        <i class="fas fa-exclamation-triangle"></i>
                                                    </div>
                                                    <div className="flux-b pt-3">
                                                        <h3>Are You Sure You Want to Delete This Sub Admin</h3>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-12 ptb20">
                                                    <div className="button-modal-daily">
                                                        <button type="button" className="button-main-daily " onClick={deleteCoin} >Yes</button>
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
                </section>
            </div>
        </>
    );
}

export default AdminUser;
