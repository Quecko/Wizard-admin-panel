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
const Sociallinks = () => {
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
                                        <th>Icons</th>
                                        <th>Heading</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
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
                                                <td> <Link to={`/admin/addsociallinks/?socialid=${item?.id}`} className=''> <i className=" cPointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <g clip-path="url(#clip0_277_137543)">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_277_137543">
                                                                <rect width="22" height="22" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </i></Link></td>
                                                <td> <i onClick={() => deleteModal(item?.id)} className=" cPointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M17.7506 6.14062H4.24769C3.83907 6.14062 3.50781 6.47185 3.50781 6.88043V18.4379C3.50781 20.4024 5.10608 22.0006 7.07041 22.0006H14.9276C16.892 22.0006 18.4903 20.4024 18.4903 18.4379V6.88043C18.4903 6.47188 18.1592 6.14062 17.7506 6.14062ZM9.22058 17.5446C9.22058 18.0466 8.81365 18.4535 8.31161 18.4535C7.80974 18.4535 7.40263 18.0466 7.40263 17.5446V10.5966C7.40263 10.0946 7.80967 9.68766 8.31161 9.68766C8.81362 9.68766 9.22058 10.0946 9.22058 10.5966V17.5446ZM14.5955 17.5446C14.5955 18.0466 14.1886 18.4535 13.6865 18.4535C13.1847 18.4535 12.7776 18.0466 12.7776 17.5446V10.5966C12.7776 10.0946 13.1846 9.68766 13.6865 9.68766C14.1885 9.68766 14.5955 10.0946 14.5955 10.5966V17.5446Z" fill="#D6D6D6" />
                                                        <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                                    </svg>

                                                </i></td>
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


export default Sociallinks