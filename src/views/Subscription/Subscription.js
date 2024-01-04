import React from 'react'
import "./subscription.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Subscription = () => {
    const [open, setOpen] = useState(false);
    const [subs, setSubs] = useState([])
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getSubscriptions = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/subscription/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                console.log('asldfjld', response?.data?.allSubscription)
                setSubs(response?.data?.allSubscription)
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
        getSubscriptions()
    }, [])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <div className="subscription">
                    <div class="table-responsive">
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th>Banner Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    {Acls?.subscription?.update ? <th>Action</th> : ''}
                                </tr>
                            </thead>
                            <tbody className="main-t-body-text" >
                                {subs?.map((item) => {
                                    return (
                                        <tr>
                                            <td >
                                                <div className="sub-img">
                                                    <img src={item?.bannerImage} alt="img" className='img-fluid' />
                                                </div>
                                            </td>
                                            <td>{item?.name}</td>
                                            <td>${item?.price}</td>
                                            {Acls?.subscription?.update ? <td>
                                                <Link to={`/admin/addsubscription/${item?.id}`}> <button className='blue-btn'>Edit</button></Link>
                                            </td>
                                                : ''}
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription
