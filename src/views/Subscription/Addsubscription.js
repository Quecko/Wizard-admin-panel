import React, { useState } from 'react'
import "./subscription.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
const Addsubscription = (props) => {
    const [image, setImage] = useState()
    const [imageD, setImageD] = useState()
    const [name, setName] = useState()
    const [inputList, setInputList] = useState(['']);
    const [descriptions, setDescription] = useState([])
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const history = useHistory()
    const id = props.match.params.id;
    console.log("iddd",inputList[inputList - 1]?.length)
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };
    const handleAddClick = () => {
        if (!(inputList[inputList?.length - 1] === '')) {
            setInputList([...inputList, ""]);
        }

    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const addSubscription = async () => {
        const data = new FormData();
        data.append("name", name)
        data.append("description", descriptions)
        data.append("image", image)
        setOpen(true)
        if (!name) {
            toast.error('name is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (!descriptions) {
            toast.error('description is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (!image) {
            toast.error('Image is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (name && descriptions && image) {
            axios.post(Environment.backendUrl + "/subscription/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    history.push('/admin/subscription')
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
        const data = new FormData();
        data.append("name", name)
        data.append("description", inputList)
        data.append("image", image)
        data.append("id", id)
        setOpen(true)
        if (!name) {
            toast.error('name is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (!descriptions) {
            toast.error('description is missing!', {
                position: "top-center",
                autoClose: 2000,
            });
            setOpen(false)
        } else if (name && descriptions) {
            axios.post(Environment.backendUrl + "/subscription/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
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
        axios.get(Environment.backendUrl + `/subscription/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                console.log('single sub', response?.data?.subscription)
                setImageD(response?.data?.subscription?.bannerImage)
                setName(response?.data?.subscription?.name)
                // setDescription(response?.data?.subscription?.descriptions)
                setInputList(response?.data?.subscription?.descriptions)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                // window.location.assign('/admin/newsbanner')
            }).catch((err) => {
                setOpen(false)
                toast.error(err?.response?.data?.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    useEffect(() => {
        if (!(id === '4577432')) {
            getSingleSubscription()
        }

    }, [])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <div className="add-subscription">
                    <div className="upload-img">
                        <label>Banner Image</label>
                        <div className="upload">
                            <img src={imageD} className='imgProfile' alt="" />
                            <label htmlFor="upload"><img src="\dashboard-assets\upload.svg" alt="img" className='img-fluid' /></label>
                            <h6>Drag & Drop or <label htmlFor='upload'>Browse</label></h6>
                        </div>
                        <input onChange={(e) => { setImage(e.target.files[0]); setImageD(URL.createObjectURL(e.target.files[0])) }} type="file" className='d-none' id='upload' />
                    </div>
                    <div className="option-field">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' />
                    </div>
                    <div className="option-field mb-0 d-flex flex-column">
                        <label>Description</label>
                        {inputList?.map((x, i) => {
                            return (
                                <>
                                    <input className='mt-3' value={x} name="value" onChange={e => handleInputChange(e, i)} type="text" placeholder='description' />
                                    {inputList?.length - 1 === i && <button onClick={handleAddClick} className='addMore'>Add More +</button>}
                                    {/* {inputList.length !== 1 && <button
                                                                                        className="  btn-common btn-common-1"
                                                                                        onClick={() => handleRemoveClick(i)}>Remove</button>}<br></br> */}
                                </>
                            )
                        })}

                        { }
                    </div>
                    <div className="bottom-btn">
                        <button onClick={id === '4577432' ? addSubscription : editSubscription} className='btn-publish'>Publish</button>
                        <button onClick={() => { setName(''); setDescription('') }} className='btn-cancel'>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addsubscription
