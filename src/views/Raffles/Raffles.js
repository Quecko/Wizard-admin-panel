import React from 'react'
import "./raffles.scss"
import "./raffles.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Raffles = () => {
    const [open, setOpen] = useState(false);
    const [raffles, setRaffles] = useState([])
    const [status, setStatus] = useState('Ended')
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getRaffles = async () => {
        setOpen(true)

        axios.post(Environment.backendUrl + "/raffles/all", { type: status }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                // console.log('asldfjld', response?.data?.rafflesData)
                setRaffles(response?.data?.rafflesData)
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
        getRaffles()
    }, [status])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <div className="raffles">
                    <div className="raffles-tabs">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li clasos="nav-item" role="presentation">
                                <a onClick={() => { setStatus('Ended') }} class="nav-link active" data-toggle="tab" href="#ended" role="tab" aria-controls="ended" aria-selected="true" >Ended</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a onClick={() => { setStatus('Live') }} class="nav-link" data-toggle="tab" href="#ongoing" role="tab" aria-controls="ongoing" aria-selected="false" >On going</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a onClick={() => { setStatus('Upcomming') }} class="nav-link" data-toggle="tab" href="#upcoming" role="tab" aria-controls="upcoming" aria-selected="false" >Upcoming</a>
                            </li>
                        </ul>
                        <div class="tab-content mt-4" id="myTabContent">
                            <div class="tab-pane fade show active" id="ended" role="tabpanel" aria-labelledby="Publish-tab">
                                <div className="ended-content">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Total No. of tickets</th>
                                                    <th>Price per ticket</th>
                                                    <th>Max Cap</th>
                                                    <th>Categories</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {raffles?.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td >
                                                                <div className="sub-img">
                                                                    <img src={item?.image} alt="img" className='img-fluid' />
                                                                </div>
                                                            </td>
                                                            <td>{item?.name}</td>
                                                            <td style={{ maxWidth: "200px", whiteSpace: "break-spaces", lineHeight: "22px", alignContent: "middle" }}>{item?.description}</td>
                                                            <td>{item?.totalTickets}</td>
                                                            <td>${item?.pricePerTicket}</td>
                                                            <td>{item?.maxCap}</td>
                                                            <td>{item?.rafflesCategory_id}</td>
                                                            <td>
                                                                <Link to={`/admin/addraffles/${item?.id}`}>   <button className='blue-btn'>Edit</button></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="ongoing" role="tabpanel" aria-labelledby="unpublish-tab">
                                <div className="ended-content">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Total No. of tickets</th>
                                                    <th>Price per ticket</th>
                                                    <th>Max Cap</th>
                                                    <th>Categories</th>
                                                    {Acls?.raffles?.update ? <th>Edit</th> : ''}
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {raffles?.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td >
                                                                <div className="sub-img">
                                                                    <img src={item?.image} alt="img" className='img-fluid' />
                                                                </div>
                                                            </td>
                                                            <td>{item?.name}</td>
                                                            <td style={{ maxWidth: "200px", whiteSpace: "break-spaces", lineHeight: "22px", alignContent: "middle" }}>{item?.description}</td>
                                                            <td>{item?.totalTickets}</td>
                                                            <td>${item?.pricePerTicket}</td>
                                                            <td>{item?.maxCap}</td>
                                                            <td>{item?.rafflesCategory_id}</td>
                                                            {Acls?.raffles?.update ? <td>
                                                                <Link to={`/admin/addraffles/${item?.id}`}>   <button className='blue-btn'>Edit</button></Link>
                                                            </td>
                                                            :''}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="unpublish-tab">
                                <div className="ended-content">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Total No. of tickets</th>
                                                    <th>Price per ticket</th>
                                                    <th>Max Cap</th>
                                                    <th>Categories</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {raffles?.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td >
                                                                <div className="sub-img">
                                                                    <img src={item?.image} alt="img" className='img-fluid' />
                                                                </div>
                                                            </td>
                                                            <td>{item?.name}</td>
                                                            <td style={{ maxWidth: "200px", whiteSpace: "break-spaces", lineHeight: "22px", alignContent: "middle" }}>{item?.description}</td>
                                                            <td>{item?.totalTickets}</td>
                                                            <td>${item?.pricePerTicket}</td>
                                                            <td>{item?.maxCap}</td>
                                                            <td>{item?.rafflesCategory_id}</td>
                                                            <td>
                                                                <Link to={`/admin/addraffles/${item?.id}`}>   <button className='blue-btn'>Edit</button></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
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

export default Raffles
