
import React, { useEffect, useState } from "react";
import './coin.scss';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import { Link } from "react-router-dom";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import swal from 'sweetalert';
function Coin() {
    const [myFiles, setMyFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const token = localStorage.getItem('mytoken')
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item) });
        return images;
    }

    const getNewsBanner = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/MemeTokens/all", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyFiles(response.data.coins)
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


    const News = myFiles.map(elem => {
        return (
            <tr>
                <td className='main-image'>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link className=''> <img src={elem?.image} className="pr-2 imgages-no" alt="" /></Link></li>
                        <li className="list-inline-item">{elem.name}</li>
                    </ul>
                </td>
                <td className=''>{elem.symbol}</td>
                <td>{elem.contractAddress}</td>
                <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><i className="far fa-trash-alt"></i></button></td>
                <td> <Link to={'/admin/EditMemeCoins/' + elem?.id}><i class="fas fa-edit"></i></Link></td>

            </tr>
        )
    })

    // const collection11=() =>{
    //     swal("Thanks for your rating!", `You rated us 3/3`, "success")
    // onClick={() => collection(elem.id)}
    // }

    const collection = (de) => {
        const ids = de
        setId(ids)
        opeeennn()
    }

    const deleteCoin = () => {
        close()
        setOpen(true)
        axios.get(Environment.backendUrl + "/MemeTokens/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
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
                                        <th>Token</th>
                                        <th>Symbol</th>
                                        <th>Address</th>
                                        <th>Remove</th>
                                        <th>Edit</th>

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
                                                        <h3>Are You Sure You Want to Delete This COIN</h3>
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

export default Coin;
