import { Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Environment from 'utils/Environment'
import './newcategory.scss'

const Newcategory = () => {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [categories, setCategories] = useState([])
    const getCategories = async () => {
        setOpen(true)

        axios.get(Environment.backendUrl + "/productsCategory/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                setCategories(response?.data?.productCategory)
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
        getCategories()
    }, [])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="products">
                    <div className="productstable">
                        <table>
                            <thead>
                                <th>Category</th>
                                <th>Creation Date</th>
                                <th>Total Products</th>
                                {Acls?.productCategories?.update ? <th>Edit</th> : ''}
                            </thead>
                            <tbody>
                                {categories?.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                <p className="darktext">{item?.categoryName}</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.createdAt?.slice(0, 10)}</p>
                                            </td>
                                            <td>
                                                <p className="darktext">{item?.totalProducts} Products</p>
                                            </td>
                                            {Acls?.productCategories?.update ? <td>
                                                <Link to={`/admin/addnewcategory/${item?.id}`}>
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

export default Newcategory
