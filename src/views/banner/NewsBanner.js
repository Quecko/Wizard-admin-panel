
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
function NewsBanner() {
    const [myFiles, setMyFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [elemId, setElemId] = useState('')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item) });
        return images;
    }

    const getNewsBanner = () => {
        setOpen(true)
        axios.post(Environment.backendUrl + "/banner/get/all", { category: 'news' }, { headers: { "Authorization": `Bearer ${token}` } })
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
                {Acls?.newsBanner?.delete ? <td> <button className="buttons-remove" type="button" onClick={() => { setElemId(elem.id); window.$('#exampleModal346').modal('show') }}><i className="far fa-trash-alt"></i></button></td> : ''}

                {Acls?.newsBanner?.update ? <td> <Link to={'/admin/EditBanners/' + elem?.id}><i className="fas fa-edit"></i></Link></td> : ''}
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
                {/* <section className="banner card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Banner Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        {Acls?.newsBanner?.delete ? <th>Remove</th> : ''}
                                        {Acls?.newsBanner?.update ? <th>Edit</th> : ''}

                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {News}
                                    <tr>
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
                                    </tr>

                                </tbody>
                            </table>
                            <ToastContainer style={{ fontSize: 20 }} />
                        </div>
                    </div>
                </section> */}
                <div className="maintableauser ">
                    <div className="innertable_user_bannar table-responsive">
                        <table>
                            <thead>
                                <th>Banner Image</th>
                                <th>Title</th>
                                <th>Description </th>
                                <th>Link/Page</th>
                                <th>Remove</th>
                                <th>Edit </th>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\bannar\tablefst.svg" className="tableimgginer">
                                                </img>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="onlyboldtext">New App Release</td>
                                    <td>Legion Flair is now live on the Apple App Store!</td>
                                    <td className="onlyboldtext">
                                        <span className="eleipiess">
                                            https://balance.ex...
                                        </span>
                                    </td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135448)">
                                            <path d="M17.7506 6.14062H4.24769C3.83907 6.14062 3.50781 6.47185 3.50781 6.88043V18.4379C3.50781 20.4024 5.10608 22.0006 7.07041 22.0006H14.9276C16.892 22.0006 18.4903 20.4024 18.4903 18.4379V6.88043C18.4903 6.47188 18.1592 6.14062 17.7506 6.14062ZM9.22058 17.5446C9.22058 18.0466 8.81365 18.4535 8.31161 18.4535C7.80974 18.4535 7.40263 18.0466 7.40263 17.5446V10.5966C7.40263 10.0946 7.80967 9.68766 8.31161 9.68766C8.81362 9.68766 9.22058 10.0946 9.22058 10.5966V17.5446ZM14.5955 17.5446C14.5955 18.0466 14.1886 18.4535 13.6865 18.4535C13.1847 18.4535 12.7776 18.0466 12.7776 17.5446V10.5966C12.7776 10.0946 13.1846 9.68766 13.6865 9.68766C14.1885 9.68766 14.5955 10.0946 14.5955 10.5966V17.5446Z" fill="#D6D6D6" />
                                            <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135448">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135465)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135465">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    {/* <td><span className="greyish">
                                    Complete </span></td>
                                <td>
                                    <Link to="/admin/userdetail">
                                        <button className="detailbtn" >Detail</button>
                                    </Link>
                                </td> */}
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\bannar\tablsec.svg" className="tableimgginer">
                                                </img>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="onlyboldtext">New App Release</td>
                                    <td>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</td>
                                    <td className="onlyboldtext">
                                        <span className="eleipiess">
                                            https://balance.ex...
                                        </span>
                                    </td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135448)">
                                            <path d="M17.7506 6.14062H4.24769C3.83907 6.14062 3.50781 6.47185 3.50781 6.88043V18.4379C3.50781 20.4024 5.10608 22.0006 7.07041 22.0006H14.9276C16.892 22.0006 18.4903 20.4024 18.4903 18.4379V6.88043C18.4903 6.47188 18.1592 6.14062 17.7506 6.14062ZM9.22058 17.5446C9.22058 18.0466 8.81365 18.4535 8.31161 18.4535C7.80974 18.4535 7.40263 18.0466 7.40263 17.5446V10.5966C7.40263 10.0946 7.80967 9.68766 8.31161 9.68766C8.81362 9.68766 9.22058 10.0946 9.22058 10.5966V17.5446ZM14.5955 17.5446C14.5955 18.0466 14.1886 18.4535 13.6865 18.4535C13.1847 18.4535 12.7776 18.0466 12.7776 17.5446V10.5966C12.7776 10.0946 13.1846 9.68766 13.6865 9.68766C14.1885 9.68766 14.5955 10.0946 14.5955 10.5966V17.5446Z" fill="#D6D6D6" />
                                            <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135448">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135465)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135465">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    {/* <td><span className="greyish">
                                    Complete </span></td>
                                <td>
                                    <Link to="/admin/userdetail">
                                        <button className="detailbtn" >Detail</button>
                                    </Link>
                                </td> */}
                                </tr>

                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\bannar\tablefst.svg" className="tableimgginer">
                                                </img>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="onlyboldtext">New App Release</td>
                                    <td>Legion Flair is now live on the Apple App Store!</td>
                                    <td className="onlyboldtext">
                                        <span className="eleipiess">
                                            https://balance.ex...
                                        </span>
                                    </td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135448)">
                                            <path d="M17.7506 6.14062H4.24769C3.83907 6.14062 3.50781 6.47185 3.50781 6.88043V18.4379C3.50781 20.4024 5.10608 22.0006 7.07041 22.0006H14.9276C16.892 22.0006 18.4903 20.4024 18.4903 18.4379V6.88043C18.4903 6.47188 18.1592 6.14062 17.7506 6.14062ZM9.22058 17.5446C9.22058 18.0466 8.81365 18.4535 8.31161 18.4535C7.80974 18.4535 7.40263 18.0466 7.40263 17.5446V10.5966C7.40263 10.0946 7.80967 9.68766 8.31161 9.68766C8.81362 9.68766 9.22058 10.0946 9.22058 10.5966V17.5446ZM14.5955 17.5446C14.5955 18.0466 14.1886 18.4535 13.6865 18.4535C13.1847 18.4535 12.7776 18.0466 12.7776 17.5446V10.5966C12.7776 10.0946 13.1846 9.68766 13.6865 9.68766C14.1885 9.68766 14.5955 10.0946 14.5955 10.5966V17.5446Z" fill="#D6D6D6" />
                                            <path d="M17.0087 1.15112H13.7858V0.871624C13.7858 0.391003 13.3949 0 12.9143 0H9.08262C8.602 0 8.211 0.391003 8.211 0.871624V1.15112H4.98814C3.75406 1.15112 2.75 2.1551 2.75 3.38922V4.8244C2.75 5.08107 2.95807 5.28917 3.21484 5.28917H18.7821C19.0387 5.28917 19.2468 5.08107 19.2468 4.8244V3.38922C19.2468 2.15514 18.2429 1.15112 17.0087 1.15112Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135448">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clip-path="url(#clip0_277_135465)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16V12C5 11.7348 5.10533 11.4804 5.29293 11.2929L16.2929 0.292933C16.4804 0.1054 16.7348 0 17 0C17.2652 0 17.5196 0.1054 17.707 0.292867L21.707 4.29287C22.0975 4.6834 22.0975 5.31653 21.707 5.70707L10.7071 16.7071C10.5195 16.8946 10.2652 17 10 17H6C5.44773 17 5 16.5523 5 16ZM9.17199 10.2422L7 12.4142V15H9.5858L11.7578 12.828L11.7929 12.7929L9.2071 10.2071L9.17199 10.2422Z" fill="#D6D6D6" />
                                            <path d="M21 10.0001C20.4477 10.0001 20 10.4478 20 11.0001V20H2V2H11C11.5523 2 12 1.55227 12 1C12 0.447733 11.5523 0 11 0H1C0.447733 0 0 0.447733 0 1V21C0 21.5523 0.447733 22 1 22H21C21.5523 22 22 21.5523 22 21V11.0001C22 10.4477 21.5523 10.0001 21 10.0001Z" fill="#D6D6D6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_135465">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg></td>
                                    {/* <td><span className="greyish">
                                    Complete </span></td>
                                <td>
                                    <Link to="/admin/userdetail">
                                        <button className="detailbtn" >Detail</button>
                                    </Link>
                                </td> */}
                                </tr>




                            </tbody>

                        </table>

                    </div>
                </div>
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

export default NewsBanner;
