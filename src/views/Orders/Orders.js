import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './orders.scss'
import axios from 'axios'
import { toast } from 'react-toastify'
import Environment from 'utils/Environment';
const Orders = () => {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getOrders = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/orderProduct/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                console.log('asldfjld', response?.data?.orderProduct)
                setOrders(response?.data?.orderProduct)
                // window.location.assign('/admin/newsbanner')
            }).catch((err) => {
                setOpen(false)
                toast.error(err?.response?.data?.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }
    const changeStatus = async (status, id) => {
        if (status && id) {
            try {
                setOpen(true)
                const res = await axios.post(`${Environment.backendUrl}/orderProduct/update/status`, { status, id }, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
                toast.success('Product Category Added', {
                    position: "top-center",
                    autoClose: 2000,
                })
                getOrders()
                setOpen(false)
            } catch (error) {
                setOpen(false)
                toast.error('Category Not added !', {
                    position: "top-center",
                    autoClose: 2000,
                })
            }
        } else {
            toast.error('Fill Fields')
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    const [selectedItem, setSelectedItem] = useState("");
    const items = ["Pending", "InProcess", "Completed"];

    const [selectedItem1, setSelectedItem1] = useState("");
    const items1 = ["Pending", "Processing", "Completed"];

    const [selectedItem2, setSelectedItem2] = useState("");
    const items2 = ["Pending", "Processing", "Completed"];

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="products">
                    <div className="productstable">
                        <table>
                            <thead>
                                <th>Project Image</th>
                                <th>Product <img src="\dashboard-assets\Arrow - Down 3.svg" alt="arrow" className="arrowdown" /></th>
                                <th>Price <img src="\dashboard-assets\Arrow - Down 3.svg" alt="arrow" className="arrowdown" /></th>
                                <th>Buyer Wallet</th>
                                <th>Date Order</th>
                                {Acls?.orders?.update ?      <th>Status</th>: ''}
                            </thead>
                            <tbody>
                                {orders?.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="productimg">
                                                    <img src={item?.Product?.image} alt="innerimg" className="innerimg" />
                                                </div>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.Product?.ProductType?.productName}</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.Product?.price} Bolts</p>
                                            </td>
                                            <td>
                                                <p className="wallet">{item?.User?.address}</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.Product?.createdAt?.slice(0, 10)}</p>
                                            </td>
                                            {Acls?.orders?.update ?    <td>
                                                <div class="dropdown droped">
                                                    <button class="dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                        {item?.status ? <><h6 className={item?.status == items[0] ? "pendingcolor" : item?.status == items[1] ? "processingcolor" : item?.status == items[2] ? "completecolor" : ""}>{item?.status}</h6></> : <p className='status'>Status</p>}
                                                    </button>
                                                    <div class="dropdown-menu dropmain">
                                                        {items?.map((status) => (
                                                            <p className="dropdown-item drop" onClick={() => changeStatus(status, item?.id)}>

                                                                {status}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            : ''}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Orders
