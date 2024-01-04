

import React, { useEffect, useState } from "react";
import './setting.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
import { Link } from "react-router-dom";
function Task() {

    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);

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
                <td> <Link to={`/admin/addtask/` + elem.id}><i class="fas fa-edit"></i></Link></td>
                <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)} ><i className="far fa-trash-alt"></i></button></td>
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
}
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
const Onboarding = () => {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [allSocials, setSocials] = useState()
    const [modalId, setModalId] = useState(null)
    const [deleteRes, setDeleteRes] = useState()
    const publishFun = async () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/community/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                console.log('all data', response?.data?.community)
                setSocials(response?.data?.community)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        setOpen(false)
    }
    const deleteModal = (id) => {
        window.$('#exampleModal346').modal('show')
        setModalId(id)
    }
    const deleteSocial = async () => {
        window.$('#exampleModal346').modal('hide')
        setOpen(true)
        axios.get(Environment.backendUrl + `/community/delete/${modalId}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success('Deleted Successfully', {
                    position: "top-center",
                    autoClose: 2000,
                });
                setDeleteRes(response)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        setOpen(false)
    }
    useEffect(() => {
        publishFun()
    }, [deleteRes])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="tasks ">
                    <div className="container-fluid">
                        <div class="table-responsive overflow-responce">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                        {/* <th>Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {allSocials?.map((item) => {
                                        return (
                                            <tr>
                                                <td className='main-image'>
                                                    <Link className=''> <img src={item?.image || images['instagram.png']['default']} className="pr-2 imgages-no " alt="" /></Link>
                                                </td>
                                                <td className=''>{item?.heading}</td>
                                                <td className='whitespace'>{item?.bodyText}</td>
                                                <td> <Link to={`/admin/Addonboarding/?socialid=${item?.id}`} className=''>

                                                    <button className="btn-common px-3  py-2">Edit</button>


                                                    {/* <i className="fas fa-edit cPointer"></i> */}

                                                </Link></td>
                                                {/* <td> <i onClick={() => deleteModal(item?.id)} className="far fa-trash-alt cPointer"></i></td> */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal fade modal-zzz" id="exampleModal346" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog daily-profile-modal modal-dialog-centered">
                    <div class="modal-content daily-profile-modal-inner">
                        <div class="modal-body modal-body-main">
                            <div className="main-outter text-center">
                                <div className="row main-cardssss">
                                    <div className="col-md-12 col-12">
                                        <div className="awesm">
                                            <i class="fas fa-exclamation-triangle"></i>
                                        </div>
                                        <div className="flux-b pt-3">
                                            <h3>Are You Sure You Want to Delete</h3>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-12 ptb20">
                                        <div className="button-modal-daily">
                                            <button type="button" className="button-main-daily " onClick={deleteSocial}>Yes</button>
                                            <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close"  >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Onboarding