import React from 'react'
import "./raffles.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const RafflesCategories = () => {
    const [open, setOpen] = useState(false);
    const [subs, setSubs] = useState([])
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getSubscriptions = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/rafflesCategory/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                console.log('asldfjld', response?.data?.rafflesCategory)
                setSubs(response?.data?.rafflesCategory)
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
                <div className="raffles">
                    <div class="table-responsive">
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Total items</th>
                                   {Acls?.rafflesCategories?.update ? <th>Edit</th> : ''}
                                </tr>
                            </thead>
                            <tbody className="main-t-body-text" >
                                {subs?.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item?.category}</td>
                                            <td>{item?.totalItem} items</td>
                                            {Acls?.rafflesCategories?.update ?  <td>
                                            <Link to={`/admin/addcategoryraffle/${item?.id}`}> <button className='blue-btn'>Edit</button></Link>
                                            </td> : ''}
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

export default RafflesCategories
