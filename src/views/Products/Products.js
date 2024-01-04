import { Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Environment from 'utils/Environment'
import './products.scss'

const Products = () => {
    const [open, setOpen] = useState(false);
    const [productsArr, setProductsArr] = useState([])
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getProducts = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/products/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                console.log('asldfjld', response?.data?.product)
                setProductsArr(response?.data?.product)
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
        getProducts()
    }, [])
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
                                <th>Category</th>
                                {Acls?.products?.update ? <th>Edit</th> : ''}
                            </thead>
                            <tbody>
                                {productsArr?.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="productimg">
                                                    <img src={item?.image} alt="innerimg" className="innerimg" />
                                                </div>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.ProductType?.productName}</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.price} Bolts</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.ProductCategory?.categoryName}</p>
                                            </td>
                                            {Acls?.products?.update ? <td>
                                                <Link to={`/admin/addproducts/${item?.id}`}>
                                                    <button className="bluebtn">Edit</button>
                                                </Link>
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

export default Products
