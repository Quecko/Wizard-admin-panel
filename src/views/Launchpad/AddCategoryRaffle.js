import "./raffles.scss"
import React, { useState } from 'react'
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Category from "views/userflow/ListitemArray";
const AddCategoryRaffle = (props) => {
    const [category, setCategory] = useState()
    const [totalItem, setTotalItem] = useState()
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
   const history= useHistory()
    const id = props.match.params.id;
    console.log("iddd", id)
    const addSubscription = async () => {
        setOpen(true)
        if (!category) {
            toast.error('category is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (!totalItem) {
            toast.error('totalItem is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (category && totalItem) {
            axios.post(Environment.backendUrl + "/rafflesCategory/add", {category,totalItem}, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    // history.push('/admin/subscription')
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
    const editSubscription = async () => {
        // data.append("id", id)
        setOpen(true)
        if (!category) {
            toast.error('category is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (!totalItem) {
            toast.error('totalItem is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        }  else if (category && totalItem) {
            axios.post(Environment.backendUrl + `/rafflesCategory/edit`, {id,category,totalItem}, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
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
    const getSingleSubscription = async () => {
        axios.get(Environment.backendUrl + `/rafflesCategory/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                console.log('single sub', response?.data?.rafflesCategory)
                setCategory(response?.data?.rafflesCategory?.category)
                setTotalItem(response?.data?.rafflesCategory?.totalItem)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
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
        if(!(id === '4577432')){
            getSingleSubscription()
        }
        
    }, [])
  return (
    <>
    <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            
      <div className="content">
                <div className="addraffles">
                    <div className="option-field">
                        <label>Category</label>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder='Category' />
                   
                    </div>
                    <div className="option-field mb-0">
                        <label>Total Items</label>
                        <input value={totalItem} onChange={(e) => setTotalItem(e.target.value)} type="number" placeholder='Total Items' />
                   
                    </div>
                    <div className="bottom-btn">
                        <button onClick={id === '4577432' ? addSubscription : editSubscription} className='btn-publish'>Publish</button>
                        <button onClick={() => { setCategory(''); setTotalItem('') }} className='btn-cancel'>Cancel</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AddCategoryRaffle
