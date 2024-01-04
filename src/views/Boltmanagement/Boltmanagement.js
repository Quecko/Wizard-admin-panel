import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./boltmanagement.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
const Boltmanagement = () => {
    const [open, setOpen] = useState(false);
    const [boltsData, setBoltsData] = useState([])
    const [task, setTask] = useState('')
    const [bolt, setBolt] = useState('')
    const [boltsRes,setBoltsRes]=useState()
    const [boltId, setBoltId] = useState('')
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const addBolt = async () => {
        setOpen(true)
        if (false) {
            setOpen(false)
            toast.error('Task is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
        } else if (!bolt) {
            setOpen(false)
            toast.error('Bolts Reward is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
        } else if (bolt) {
            axios.post(Environment.backendUrl + "/reward/editBoltsRewardById", {id:boltId,boltReward:bolt}, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setBoltsRes(response)
                    // window.location.assign('/admin/newsbanner')
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Field cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }

    }
    const getBolt = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/reward/getAllBoltsRewards", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                console.log('asldfjld', response?.data?.data)
                setBoltsData(response?.data?.data)
                // window.location.assign('/admin/newsbanner')
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    useEffect(() => {
        getBolt()
    }, [boltsRes])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="boltmanagement">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Bolts</th>
                                        {Acls?.boltManagement?.update ?   <th>Edit</th>: ''}
                                    </tr>
                                </thead>
                                <tbody>
                                    {boltsData?.map((item) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <p className='parara eleipiess' >{item?.description}</p>
                                                </td>
                                                <td>
                                                    {item?.boltReward} Bolts
                                                </td>
                                                {Acls?.boltManagement?.update ?   <td>
                                                    <Link>
                                                        <img onClick={() => {setBolt(null); setBoltId(item?.id); window.$(`#boltEditMOdal${item?.id}`).modal('show') }} src="\dashboard-assets\edit.svg" alt="editimg" className="edit" />
                                                    </Link>
                                                </td>
                                                : ''}
                                                {/* bolt edit modal */}
                                                <div class="modal fade modal-zzz" id={`boltEditMOdal${item?.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered daily-profile-modal">
                                                        <div class="modal-content  daily-profile-modal-inner">
                                                            <div class="modal-body modal-body-main">
                                                                <div className="main-outter text-center">
                                                                    <div className="row main-cardssss">
                                                                        <div className="col-md-12 col-12 boltcategories boltcategoriesModal">
                                                                            <div className="flux-b pt-3">
                                                                                <h3>Edit Your Bolt Reward</h3>
                                                                            </div>
                                                                            <p className='text-left mt-5'>Description</p>
                                                                            <input type="text" readOnly value={item?.description} onChange={(e) => setTask(e.target.value)} placeholder='Verified Referral' />
                                                                            <p className='text-left'>Bolts Reward</p>
                                                                            <input type="number" value={bolt ? bolt : item?.boltReward } onChange={(e) => parseFloat(e.target.value) > 0 ? setBolt(e.target.value) : setBolt(item?.boltReward)} placeholder='10' />

                                                                        </div>

                                                                        <div className="col-md-12 col-12 ptb20">
                                                                            <div className="button-modal-daily button-modal-daily55">
                                                                                {/* window.$('#boltEditMOdal').modal('hide') */}
                                                                                <button type="button" className="button-main-daily " onClick={() => { addBolt();window.$(`#boltEditMOdal${item?.id}`).modal('hide')  }} >Edit</button>
                                                                                <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close"  >Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td>
                                            <p className='parara'>Verified Referral</p>
                                        </td>
                                        <td>
                                            10 Bolts
                                        </td>
                                        <td>
                                            <Link>
                                                <img onClick={() => { window.$('#boltEditMOdal').modal('show') }} src="\dashboard-assets\edit.svg" alt="editimg" className="edit" />
                                            </Link>
                                        </td>
                                        {/* bolt edit modal */}
                                        <div class="modal fade modal-zzz" id="boltEditMOdal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered daily-profile-modal">
                                                <div class="modal-content  daily-profile-modal-inner">
                                                    <div class="modal-body modal-body-main">
                                                        <div className="main-outter text-center">
                                                            <div className="row main-cardssss">
                                                                <div className="col-md-12 col-12 boltcategories boltcategoriesModal">
                                                                    <div className="flux-b pt-3">
                                                                        <h3>Edit Your Bolt Reward</h3>
                                                                    </div>
                                                                    <p className='text-left mt-5'>Description</p>
                                                                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Verified Referral' />
                                                                    <p className='text-left'>Bolts Reward</p>
                                                                    <input type="number" value={bolt} onChange={(e) => parseFloat(e.target.value) > 0 ? setBolt(e.target.value) : setBolt('')} placeholder='10' />

                                                                </div>

                                                                <div className="col-md-12 col-12 ptb20">
                                                                    <div className="button-modal-daily">
                                                                        {/* window.$('#boltEditMOdal').modal('hide') */}
                                                                        <button type="button" className="button-main-daily " onClick={() => { addBolt() }} >Edit</button>
                                                                        <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close"  >Cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Boltmanagement