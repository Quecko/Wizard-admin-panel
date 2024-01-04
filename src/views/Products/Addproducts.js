import React, { useEffect, useRef, useState } from 'react'
import './products.scss'
import JoditEditor from 'jodit-react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';

const Addproducts = (props) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicture2, setProfilePicture2] = useState(null);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const setProfilePic = (evt) => {
        setProfilePicture(URL?.createObjectURL(evt.target.files[0]));
        setImage(evt.target.files[0])
    };
    const setProfilePic2 = (evt) => {
        setProfilePicture2(URL?.createObjectURL(evt.target.files[0]));
        setImage2(evt.target.files[0])
    };
    const id = props.match.params.id;
    console.log('id', id)
    const [productType, setProductType] = useState([])
    const [categories, setCategories] = useState([])
    const [category_id, setCategoryId] = useState("");
    const [category_id_id, setCategoryId_Id] = useState("");
    // setCategoryId_Id
    const [productType_id, setProductType_id] = useState({
        productName: '',
        id: ''
    });
    console.log('sdfjaldflj',productType_id)
    const items1 = ["Latest", "day", "week"]
    const [price, setPrice] = useState("");
    const editor = useRef(null);
    const [description, setDescription] = useState()
    const [productBenifits, setProductBenifits] = useState()
    const editor1 = useRef(null);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    // const config = {
    //     placeholder: "Description"
    // }
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
    const getProductType = async (id) => {
        setCategoryId_Id(id)
        setOpen(true)

        axios.post(Environment.backendUrl + "/productsCategory/getProductTypeList", { category_id: id }, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                console.log('response', response?.data?.productTypeList)
                setProductType(response?.data?.productTypeList)
                // setCategories(response?.data?.productCategory)
                // window.location.assign('/admin/newsbanner')
                // setProductType_id({
                //     productName: '',
                //     id: ''
                // });
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    console.log('single sub', productType_id)
    useEffect(() => {
        getCategories()
    }, [])
    const createProduct = async () => {
        if (image && image2 && category_id && productType_id && price && description && productBenifits) {
            const data = new FormData();
            data.append("image", image)
            data.append("productImage", image2)
            data.append("price", price)
            data.append("description", JSON.stringify(description))
            data.append("productBenifits", JSON.stringify(productBenifits))
            data.append("category_id", category_id_id)
            data.append("productType_id", productType_id?.id)
            axios.post(Environment.backendUrl + "/products/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    console.log('response', response)
                    toast.success('Product Added', {
                        position: "top-center",
                        autoClose: 2000,
                    })
                    // setProductType(response?.data?.productTypeList)
                    // setCategories(response?.data?.productCategory)
                    // window.location.assign('/admin/newsbanner')
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
            setOpen(true)
        } else {
            toast.error('Fill Feilds First', {
                position: "top-center",
                autoClose: 2000,
            })
        }

    }
    const editProduct = async () => {
        if (category_id && productType_id && price && description && productBenifits) {
            const data = new FormData();
            if (image) {
                data.append("image", image)
            }
            if (image2) {
                data.append("productImage", image2)
            }
            data.append("price", price)
            data.append("description", JSON.stringify(description))
            data.append("productBenifits", JSON.stringify(productBenifits))
            data.append("category_id", category_id_id)
            data.append("productType_id", productType_id?.id)
            data.append('id', id)
            axios.post(Environment.backendUrl + "/products/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    console.log('response', response)
                    toast.success('Product Edited', {
                        position: "top-center",
                        autoClose: 2000,
                    })
                    // setProductType(response?.data?.productTypeList)
                    // setCategories(response?.data?.productCategory)
                    // window.location.assign('/admin/newsbanner')
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
            setOpen(true)
        } else {
            toast.error('Fill Feilds First', {
                position: "top-center",
                autoClose: 2000,
            })
        }

    }
    const getSingleProduct = async () => {
        axios.get(Environment.backendUrl + `/products/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setOpen(false)
                console.log('single sub', response?.data?.product)
                setProfilePicture(response?.data?.product?.image)
                setProfilePicture2(response?.data?.product?.productImage)
                setPrice(response?.data?.product?.price)
                setCategoryId(response?.data?.product?.ProductCategory?.categoryName)
                setDescription(JSON.parse(response?.data?.product?.description))
                setProductBenifits(JSON.parse(response?.data?.product?.productBenifits))
                setProductType_id({ productName: response?.data?.product?.ProductType?.productName, id: response?.data?.product?.ProductType?.id })
                getProductType(response?.data?.product?.ProductCategory?.id)
                // toast.success(response.data.msg, {
                //     position: "top-center",
                //     autoClose: 2000,
                // });
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
        if (!(id === '4577432')) {
            getSingleProduct()
        }

    }, [])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <section className="addproductform">
                    <div className="row">
                        <div className="col-sm-8 p-0">
                            <div className="d-flex">
                                <div className="upload-parent">
                                    <p className="head">Item Image</p>
                                    <div className="upload">
                                        {
                                            profilePicture ? <label htmlFor="upload">
                                                {" "}
                                                <img
                                                    src={profilePicture ? profilePicture : ""}
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                            </label> : <label htmlFor="upload">
                                                {" "}
                                                <img
                                                    src="\dashboard-assets\cloud-computing 1.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                                <p>Drag & Drop or <span>Browse</span></p>
                                            </label>
                                        }
                                        <input type="file" className="d-none" id="upload" onChange={(e) => setProfilePic(e)} />
                                    </div>
                                </div>
                                <div className="upload-parent ml-3">
                                    <p className="head">Product Image</p>
                                    <div className="upload">
                                        {
                                            profilePicture2 ? <label htmlFor="upload2">
                                                {" "}
                                                <img
                                                    src={profilePicture2 ? profilePicture2 : ""}
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                            </label> : <label htmlFor="upload2">
                                                {" "}
                                                <img
                                                    src="\dashboard-assets\cloud-computing 1.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                                <p>Drag & Drop or <span>Browse</span></p>
                                            </label>
                                        }
                                        <input type="file" className="d-none" id="upload2" onChange={(e) => setProfilePic2(e)} />
                                    </div>
                                </div>
                            </div>

                            <p className="head">Category <span className="text-danger">*</span></p>
                            <div class="dropdown droped">
                                <button class="dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                    {
                                        category_id ? <>
                                            <h6 style={{ color: "black" }}>
                                                {category_id}
                                            </h6>
                                        </>
                                            : "Select Category"}
                                </button>
                                <div class="dropdown-menu dropmain">
                                    {categories.map((item) => (
                                        <a className="dropdown-item drop" onClick={() => { setCategoryId(item?.categoryName); getProductType(item?.id) }}>
                                            {item?.categoryName}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <p className="head">Product Type</p>
                            <div class="dropdown droped">
                                <button class="dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                    {
                                        productType_id?.productName ? <><h6 style={{ color: "black" }}>{productType_id?.productName}</h6></> : productType?.length > 0 ? "Select Product Type" : 'Select Category First'}
                                </button>
                                <div class="dropdown-menu dropmain">
                                    {productType?.map((item) => (
                                        <a className="dropdown-item drop" onClick={() => setProductType_id(item)}>
                                            {item?.productName}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <p className="head">Price in Bolts</p>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder='Price' />
                            <p className="head">Description</p>
                            {/* <textarea type="text" placeholder='Description'></textarea> */}
                            <JoditEditor
                                ref={editor}
                                value={description}
                                // config={config}
                                tabIndex={1}
                                // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => setDescription(newContent)}
                            />
                            <p className="head">Product Benefit</p>
                            {/* <textarea type="text" placeholder='Description'></textarea> */}
                            <JoditEditor
                                ref={editor1}
                                value={productBenifits}
                                // config={config}
                                tabIndex={2}
                                // onBlur={newContent1 => setContent1(newContent1)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => setProductBenifits(newContent)}
                            />
                            <div className="lastbtns pt-5">
                                <button onClick={id === '4577432' ? createProduct : editProduct} className="red-b">Publish</button>
                                <button className="red-w">Cancel</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Addproducts
