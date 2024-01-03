
import React, { useEffect, useState } from "react";
import './banner.scss';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import { Link } from "react-router-dom";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
function GameBanner() {
    const [myFiles, setMyFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [elemId, setElemId] = useState('')
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item) });
        return images;
    }
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getNewsBanner = () => {
        setOpen(true)
        axios.post(Environment.backendUrl + "/banner/get/all", { category: 'game' }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.banners)
                setOpen(false)

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
                <td className=''>{elem.name}</td>
                <td className=''>{elem.description.slice(0, 25)}...</td>
                <td className=''>{elem.category}</td>
                {/* <td><Link className="common" target="_blank">{elem.routeLink}/{elem.routePage}</Link></td> */}
                {/* <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><img src="\dashboard-assets\btn-delete.svg" alt="img" /></button></td> */}
                {Acls?.gameBanner?.delete ? <td> <button className="buttons-remove" type="button" onClick={() => { setElemId(elem.id); window.$('#exampleModal346').modal('show') }}><i className="far fa-trash-alt"></i></button></td> : ''}

                {Acls?.gameBanner?.update ? <td> <Link to={'/admin/EditBanners/' + elem?.id}><i className="fas fa-edit"></i></Link></td> : ''}
            </tr>
        )
    })

    const collection = () => {
        const id = elemId
        setOpen(true)
        axios.get(Environment.backendUrl + "/banner/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                getNewsBanner()
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
        getNewsBanner()
    }, [token])

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
                                        <th>Banner Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        {Acls?.gameBanner?.delete ? <th>Remove</th> : ''}
                                        {Acls?.gameBanner?.update ? <th>Edit</th> : ''}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {News}
                                    {/* <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['viedo-1.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>New App Release</td>
                                        <td className=''>Legion Flair is now live on the Apple App Store!</td>
                                        <td><Link className="common" target="_blank">https://balance.ex...</Link></td>
                                        <td> <img src={`${images['remove1.png']['default']}`} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['viedo-1.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>New App Release</td>
                                        <td className=''>Legion Flair is now live on the Apple App Store!</td>
                                        <td><Link className="common" target="_blank">https://balance.ex...</Link></td>
                                        <td> <img src={`${images['remove1.png']['default']}`} alt="" /></td>
                                    </tr> */}

                                </tbody>
                            </table>
                            <ToastContainer style={{ fontSize: 20 }} />
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal fade modal-zzz" id="exampleModal346" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered daily-profile-modal">
                    <div class="modal-content  daily-profile-modal-inner">
                        <div class="modal-body modal-body-main">
                            <div className="main-outter text-center">
                                <div className="row main-cardssss">
                                    <div className="col-md-12 col-12">
                                        <div className="awesm">
                                            <i class="fas fa-exclamation-triangle"></i>
                                        </div>
                                        <div className="flux-b pt-3">
                                            <h3>Are You Sure You Want to Delete This Banner</h3>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-12 ptb20">
                                        <div className="button-modal-daily">
                                            <button type="button" className="button-main-daily " onClick={() => { collection(); window.$('#exampleModal346').modal('hide') }} >Yes</button>
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
    );
}

export default GameBanner;
