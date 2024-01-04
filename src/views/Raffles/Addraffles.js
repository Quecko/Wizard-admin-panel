import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import "./raffles.scss"
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import axios from 'axios';
const Addraffles = (props) => {
    const [error, setError] = useState(false)
    const [subs, setSubs] = useState([])
    const [raffelCat, setRaffelCat] = useState({
        image: '',
        name: '',
        description: '',
        totalTickets: '',
        pricePerTicket: '',
        maxCap: '',
        category_id: 'Category',
        category_name: 'Category',
        startDate: '',
        endDate: '',
        winner: {},
        winnerTicketNo: '',
        rafLeadTickets: '',
        ticketBooked: []
    })
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [dImage, setDImage] = useState()
    // console.log('raffel cate', raffelCat, dImage)
    const id = props.match.params.id;
    // console.log("iddd", id)
    const addRaffel = async (e) => {
        const { name, value } = e.target;
        // console.log('raffel cate', name)
        if (name === 'image') {
            setDImage(URL.createObjectURL(e.target.files[0]))
            setRaffelCat((pre) => {
                return {
                    ...pre, [name]: e.target.files[0]
                }
            })
        } else {
            setRaffelCat((pre) => {
                return {
                    ...pre, [name]: value
                }
            })
        }

    }
    const publish = async () => {
        if (raffelCat.image && raffelCat.name && raffelCat.description && raffelCat.totalTickets && raffelCat.pricePerTicket && raffelCat.category_id !== 'Category' && raffelCat?.startDate && raffelCat.endDate) {
            setOpen(true)
            const data = new FormData();
            data.append("image", raffelCat?.image)
            data.append("name", raffelCat?.name)
            data.append("description", raffelCat?.description)
            data.append("totalTickets", raffelCat?.totalTickets)
            data.append("pricePerTicket", raffelCat?.pricePerTicket)
            data.append("maxCap", raffelCat?.maxCap)
            data.append("rafflesCategory_id", raffelCat?.category_id)
            data.append("startDate", raffelCat?.startDate)
            data.append("endDate", raffelCat?.endDate)

            axios.post(Environment.backendUrl + "/raffles/add", data,
                { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            toast.error('Fill all Feilds', {
                position: 'top-center'
            })
            setError(true)
            setOpen(false)
        }
    }
    const editRaffles = async () => {
        if (raffelCat.name && raffelCat.description && raffelCat.totalTickets && raffelCat.pricePerTicket && raffelCat.category_id !== 'Category' && raffelCat?.startDate && raffelCat.endDate) {
            setOpen(true)
            const data = new FormData();
            if (raffelCat?.image) {
                data.append("image", raffelCat?.image)
            }

            data.append("name", raffelCat?.name)
            data.append("description", raffelCat?.description)
            data.append("totalTickets", raffelCat?.totalTickets)
            data.append("pricePerTicket", raffelCat?.pricePerTicket)
            data.append("maxCap", raffelCat?.maxCap)
            data.append("rafflesCategory_id", raffelCat?.category_id)
            data.append("startDate", raffelCat?.startDate)
            data.append("endDate", raffelCat?.endDate)
            data.append('id', id)
            axios.post(Environment.backendUrl + "/raffles/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            toast.error('Fill all Feilds', {
                position: 'top-center'
            })
            setError(true)
            setOpen(false)
        }
    }
    //to get the categories of Raffles
    const getSubscriptions = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/rafflesCategory/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                // console.log('asldfjld', response?.data?.rafflesCategory)
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
    const getSingleSubscription = async () => {
        axios.get(Environment.backendUrl + `/raffles/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                // console.log('single sub', response?.data?.rafflesData)
                setDImage(response?.data?.rafflesData?.image)
                let cat = subs?.filter((item) => {
                    return (
                        item?.id === response?.data?.rafflesData?.rafflesCategory_id
                    )
                })
                // console.log('dsafsadfasfasdf', cat)
                setRaffelCat({
                    // image: response?.data?.rafflesCategory?.image,
                    name: response?.data?.rafflesData?.name,
                    description: response?.data?.rafflesData?.description,
                    totalTickets: response?.data?.rafflesData?.totalTickets,
                    pricePerTicket: response?.data?.rafflesData?.pricePerTicket,
                    maxCap: response?.data?.rafflesData?.maxCap,
                    category_id: response?.data?.rafflesData?.rafflesCategory_id,
                    category_name: cat[0]?.category,
                    startDate: response?.data?.rafflesData?.startDate?.slice(0, 10),
                    endDate: response?.data?.rafflesData?.endDate?.slice(0, 10),
                    winner: response?.data?.rafflesData?.WinnerData,
                    winnerTicketNo: response?.data?.rafflesData?.winnerTicketNo,
                    rafLeadTickets: response?.data?.rafflesData?.RafflesTickets,
                    ticketBooked: response?.data?.ticketNumbers,
                })
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
    const sweepRaffles = async () => {
        setOpen(true)
        toast.info('Sweeping in progress,it will take a bit long', {
            position: "top-center",
            autoClose: 2000,
        });
        axios.post(Environment.backendUrl + `/raffles/sweepFunction`, { raffles_id: id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                getSingleSubscription()
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 5000,
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
        getSubscriptions()
        if (!(id === '4577432') && subs?.length > 0) {
            getSingleSubscription()
        }
    }, [subs?.length > 0])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <div className="row bg-color-raffle">
                    <div className="col-xl-8 col-12">
                        <div className="addraffles">
                            <div className="upload-img">
                                <label>Banner Image</label>
                                <div className="upload">
                                    <img src={dImage} className='imgProfile' alt="" />
                                    <label htmlFor="upload"><img src="\dashboard-assets\upload.svg" alt="img" className='img-fluid' /></label>
                                    <h6>Drag & Drop or <label htmlFor='upload'>Browse</label></h6>
                                </div>

                                {error && (!(raffelCat?.image === '') ? null : <p className="text-danger">Image is missing!</p>)}
                                <input onChange={addRaffel} type="file" name='image' className='d-none' id='upload' />
                            </div>
                            <div className="option-field">
                                <label>Name</label>
                                <input value={raffelCat?.name} onChange={addRaffel} name='name' type="text" placeholder='Name' />
                                {error && (!(raffelCat?.name === '') ? null : <p className="text-danger">name is missing!</p>)}
                            </div>
                            <div className="option-field">
                                <label>Description</label>
                                <textarea value={raffelCat?.description} onChange={addRaffel} name='description' placeholder='Description' />
                                {error && (!(raffelCat?.description === '') ? null : <p className="text-danger">description is missing!</p>)}
                            </div>
                            <div className="option-field">
                                <label>Total No. of tickets</label>
                                <input value={raffelCat?.totalTickets} onChange={addRaffel} name='totalTickets' type="number" placeholder='Total No. of tickets' />
                                {error && (!(raffelCat?.totalTickets === '') ? null : <p className="text-danger">totalTickets is missing!</p>)}
                            </div>
                            <div className="option-field">
                                <label>Price per ticket</label>
                                <input value={raffelCat?.pricePerTicket} onChange={addRaffel} name='pricePerTicket' type="number" placeholder='Price per ticket' />
                                {error && (!(raffelCat?.pricePerTicket === '') ? null : <p className="text-danger">pricePerTicket is missing!</p>)}
                            </div>
                            <div className="option-field">
                                <label>MaxCap</label>
                                <input value={raffelCat?.maxCap} onChange={addRaffel} name='maxCap' type="number" placeholder='max cap' />
                                {error && (!(raffelCat?.maxCap === '') ? null : <p className="text-danger">maxCap is missing!</p>)}
                            </div>
                            <div className="option-field">
                                <label>Category</label>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {raffelCat?.category_name}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {subs?.map((item) => {
                                            return (
                                                <p class="dropdown-item" onClick={() => setRaffelCat({ ...raffelCat, category_id: item?.id, category_name: item?.category })}>{item?.category}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                {error && (!(raffelCat?.category_id === 'Category') ? null : <p className="text-danger">category_id is missing!</p>)}
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>Start Date/time</label>
                                    <input value={raffelCat?.startDate} onChange={addRaffel} name='startDate' type="date" placeholder='Start Date/time' />
                                    {error && (!(raffelCat?.startDate === '') ? null : <p className="text-danger">startDate is missing!</p>)}
                                </div>
                                <div className="option-field">
                                    <label>End Date/time</label>
                                    <input value={raffelCat?.endDate} onChange={addRaffel} name='endDate' type="date" placeholder='End Date/time' />
                                    {error && (!(raffelCat?.endDate === '') ? null : <p className="text-danger">endDate is missing!</p>)}
                                </div>
                            </div>
                            <div className="bottom-btn">
                                <button className='btn-publish' onClick={id === '4577432' ? publish : editRaffles}>Publish</button>
                                <button className='btn-cancel'>Cancel</button>
                            </div>
                        </div>
                    </div>
                    {id === '4577432' ||
                        <div className="col-xl-4 col-12">
                            {raffelCat?.winner ? null :
                                <div className="topCard">
                                    <span className='pH'>
                                        <p>Ticket Booked</p>
                                        <h4>{raffelCat?.ticketBooked?.length}/{raffelCat?.totalTickets}</h4>
                                    </span>
                                    <span>
                                        {raffelCat?.ticketBooked?.length === raffelCat?.totalTickets ?
                                            <img src="\dashboard-assets\sweepFunDis.svg" alt="" />
                                            :
                                            <img onClick={sweepRaffles} className='cPointer' src="\dashboard-assets\sweepFun.svg" alt="" />
                                        }
                                    </span>
                                </div>
                            }
                            <div className="sidebar-raffle">
                                {raffelCat?.winner &&
                                    <div className="main-card">
                                        <label>Winner</label>
                                        <div className="ticket">
                                            <div className="left">
                                                <span>01</span>
                                                <div className="profile">
                                                    <div className="inner-left">
                                                        <div className="profile-img">
                                                            <img src={raffelCat?.winner?.profile_image} alt="img" className='img-fluid' />
                                                        </div>
                                                    </div>
                                                    <div className="inner-right">
                                                        <h6>{raffelCat?.winner?.full_name}</h6>
                                                        <p>Tickets No: {raffelCat?.winnerTicketNo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="right">
                                            <button className='blue-btn' data-toggle="modal" data-target="#viewticket">View Tickets</button>
                                        </div> */}
                                        </div>
                                    </div>
                                }
                                {raffelCat?.rafLeadTickets?.length > 0 &&
                                    <div className="main-card">
                                        <label>Leaderboard</label>
                                        {raffelCat?.rafLeadTickets?.map((item, id) => {
                                            return (
                                                <div className="ticket">
                                                    <div className="left">
                                                        <span>{id < 10 && 0}{id + 1}</span>
                                                        <div className="profile">
                                                            <div className="inner-left">
                                                                <div className="profile-img">
                                                                    <img src={item?.User?.profile_image} alt="img" className='img-fluid' />
                                                                </div>
                                                            </div>
                                                            <div className="inner-right">
                                                                <h6>{item?.User?.full_name}</h6>
                                                                <p>Tickets: {item?.ticketbought}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="right">
                                                        {raffelCat?.ticketBooked?.length > 0 && <button className='blue-btn' data-toggle="modal" data-target="#viewticket">View Tickets</button>}
                                                    </div> */}
                                                </div>
                                            )
                                        })}

                                    </div>
                                }
                                {console.log('kunnn', raffelCat?.ticketBooked)}
                            </div>
                        </div>
                    }
                </div>

                {/* modal view tickets ................... */}


                <div class="modal fade view-tickets" id="viewticket" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Tickets Number</h5>
                            </div>
                            <div class="modal-body">
                                <div className="countsss">
                                    {raffelCat?.ticketBooked?.map((item) => {
                                        return (
                                            <span className="count-value count-active">
                                                {item?.ticket_no}
                                            </span>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addraffles
