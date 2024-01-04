import React, { useState } from 'react'
import "./boltmanagement.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
const Addboltcategory = () => {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState('')
    const [bolt, setBolt] = useState('')
    const token = localStorage.getItem('mytoken')
    // const id = props.match.params.id;
    // console.log("iddd", id)
    const addBolt = async () => {
        setOpen(true)
        if (!task) {
            toast.error('Task is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
        } else if (!bolt) {
            toast.error('Bolt is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
        } else if (task && bolt) {
            axios.post(Environment.backendUrl + "/banner/add",'data', { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    window.location.assign('/admin/newsbanner')
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
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="boltcategories">
                    <div className="container-fluid p-0">
                        <div className='col-sm-12 col-lg-8 p-0'>
                            <p>Task</p>
                            <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} placeholder='Verified Referral' />
                            <p>Bolt</p>
                            <input type="number" value={bolt} onChange={(e)=>parseFloat(e.target.value) > 0 ? setBolt(e.target.value) : setBolt('')} placeholder='10' />
                        </div>
                    </div>
                    <div className='last'>
                        <button onClick={addBolt} >Publish</button>
                        <button onClick={()=>{setBolt('');setTask('')}}>Cancel</button>
                    </div>
                </section>
            </div>

           
        </>
    )
}

export default Addboltcategory