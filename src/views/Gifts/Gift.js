import React, { useEffect, useState } from 'react'
import "./gifts.scss"
import Environment from 'utils/Environment'
import { Backdrop, CircularProgress } from '@material-ui/core'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { toast } from 'react-toastify'
import user4 from "assets/img/userflow/add1.png";
import ReactPaginate from 'react-paginate';
import { Pagination } from 'react-bootstrap';


const Gift = () => {
    const [open, setOpen] = useState(false);
    const [showw, setShoww] = useState(false);
    const handleClose = () => setShoww(false);
    const [email, setEmail] = useState('')
    const [emailArr, setEmailArr] = useState([])
    const [emailAvail, setEmailAvail] = useState(false)
    const [itemData, setItemData] = useState([])
    const [items, setItems] = useState({})
    const [sGListing, setSGListing] = useState([])
    const token = localStorage.getItem('mytoken')
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [walletAddress, setWalletAddress] = useState('')
    const [isValid, setIsValid] = useState(false);
    const [note, setNote] = useState()
    const [limit] = useState(10);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getItems = async () => {
        axios.get(Environment.backendUrl + `/giftHistory/getProducts`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setItemData(response?.data?.productData)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    const verifyEmail = async (value) => {
        setEmailAvail(false)
        if (value) {
            setOpen(true)
            axios.post(Environment.backendUrl + `/giftHistory/searchUserWithEmail`, { email: value }, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    setEmail(null)
                    setEmailArr(response?.data?.UserData)

                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        }
    }
    const sendGifts = async () => {
        if (items?.ProductType?.productName && email?.email && note) {
            let data;
            if (items?.ProductCategory?.categoryName === "Metaverse Assets ") {
                data = {
                    product_id: items?.id,
                    email: email?.email,
                    user_id: email?.id,
                    gift_name: items?.ProductType?.productName,
                    status: 'complete',
                    walletAddress,
                    note
                }
            } else {
                data = {
                    product_id: items?.id,
                    email: email?.email,
                    user_id: email?.id,
                    gift_name: items?.ProductType?.productName,
                    status: 'inProgress',
                    note
                }
            }
            setOpen(true)
            axios.post(Environment.backendUrl + `/giftHistory/sendGift`, data, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    sendGiftsListing()
                    setOpen(false)
                    setEmail(null)
                    setItems(null)
                    setWalletAddress(null)
                    handleClose()
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
            toast.error('Fill all fields first', {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }
    const sendGiftsListing = async () => {
        let data = { limit: limit, page: page }
        axios.post(Environment.backendUrl + `/giftHistory/allGifts`, data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
                setSGListing(response?.data?.gifthistoryData)
                setPageCount(response.data.total / limit)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage)
    };
    function isValidWalletAddress(address) {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        return regex.test(address);
    }
    const validateWallet = (event) => {
        const inputAddress = event.target.value;
        setWalletAddress(inputAddress);
        setIsValid(isValidWalletAddress(inputAddress));
    }
    useEffect(() => {
        getItems()
        sendGiftsListing()
    }, [])
    useEffect(() => {
        if (page) {
            sendGiftsListing()
        }
    }, [page])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="gifts-section">
                    <div className="container-fluid">
                        {/* {Acls?.gifts?.create ?
                            <div className="text-right add_gift__button_main">
                                <img onClick={() => setShoww(true)} className='cPointer' src="\dashboard-assets\sendGifts.svg" alt="" />
                            </div>
                            : ''} */}
                        {/* <button  type="button" className="blue-add-category"> <img src={user4} className="img-fluid pr-2" alt="" />  Send Gifts</button> */}
                        <div class="table-responsive">
                            {/* <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Sent to</th>
                                        <th>Item</th>
                                        <th>Admin Note</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sGListing?.map((item) => {
                                        return (
                                            <tr>
                                                <td className='set-text-mails'>
                                                    {item?.email}
                                                </td>
                                                <td>
                                                    {item?.gift_name}
                                                </td>
                                                <td>{item?.note || '----'}</td>
                                                <td>{item?.createdAt?.slice(0, 10)}</td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> */}
                            {/* {pageCount >= 1 ?
                                <div className="text-center">
                                    <ReactPaginate
                                        previousLabel="Previous"
                                        nextLabel="Next"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        forcePage={page}
                                    ></ReactPaginate>
                                </div>
                                : ''} */}


                            <div className="innertable_gifts">
                                <table>
                                    <thead>
                                        <th>Users Name</th>
                                        <th>Items</th>
                                        <th>Send by </th>
                                        <th>Admin note</th>
                                        <th>Date</th>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Rare Box</td>
                                            <td>
                                            <div className="mainimgdiv">
                                                    <div className="inerimgd">
                                                        <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                        </img>
                                                    </div>
                                                    <div className='onlycolmflex'>
                                                        <p className="tableimgtext">
                                                            Carolyn Wilson
                                                        </p>
                                                        <p className='tableimgtext_mute'>
                                                            carolyn@gmail.com
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>Monthly Rare Box Drop</td>
                                            <td>5-Oct-2023</td>
                                      
                                        </tr>



                                    </tbody>

                                </table>

                            </div>
                            <div className='Paginationlattable'>
                                <button className='leftpigbtn' >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="#5F6D7E" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    Prev
                                </button>
                                <Pagination>
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Item>{2}</Pagination.Item>
                                    <Pagination.Ellipsis />
                                    <Pagination.Item active>{5}</Pagination.Item>
                                    <Pagination.Item>{6}</Pagination.Item>
                                </Pagination>
                                <button className='leftpigbtn' >
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16797 10H15.0013M10.8346 5L15.2454 9.41074C15.5708 9.73618 15.5708 10.2638 15.2454 10.5893L10.8346 15" stroke="#5F6D7E" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <div className="main-div-nav-head">
                <Modal className='sendgift-modal' show={showw} onHide={handleClose} centered>
                    <Modal.Header>
                        <Modal.Title>Send Gift</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="parent-field">
                            <h6>Select Item</h6>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {items?.ProductType?.productName ? <p className='text-dark'>{items?.ProductType?.productName} </p> : 'Select Item'}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {itemData?.map((item) => {
                                        return (
                                            <a onClick={() => setItems(item)} class="dropdown-item" href="#">{item?.ProductType?.productName}</a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        {items?.ProductCategory?.categoryName === "Metaverse Assets " &&
                            <div className="option-field parent-field">
                                <h6>Wallet Address</h6>
                                <input value={walletAddress} onChange={validateWallet} type="text" placeholder='Enter wallet address' />
                                {(isValid === false && walletAddress) && <p className='text-danger'>Wallet Address Invalid</p>}
                            </div>
                        }
                        <div className="option-field parent-field">
                            <h6>Search with email address</h6>

                            <div class="dropdown w-100">
                                <input id="dropdownMenuButtonINput" value={email?.email && email?.email} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => { verifyEmail(e.target.value); setEmailAvail(false) }} type="text" placeholder='Enter email address' />

                                <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButtonINput">
                                    {emailArr?.map((item) => {
                                        return (
                                            <a onClick={() => { setEmail(item); setEmailAvail(true) }} class="dropdown-item" href="#">{item?.email}</a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='areatext'>
                            <p>Admin Note</p>
                            <textarea onChange={(e) => setNote(e.target.value)} type='text' placeholder='Admin Note' />
                        </div>

                        <div className="twice-btn">
                            <button onClick={handleClose} className=''>Cancel</button>
                            {(items?.ProductCategory?.categoryName === "Metaverse Assets ") ?
                                ((items?.ProductType?.productName && emailAvail && walletAddress && isValid) ?
                                    <button onClick={sendGifts} className=''>Send</button>
                                    :
                                    <button className=''>Send</button>
                                )
                                :
                                ((items?.ProductType?.productName && emailAvail) ?
                                    <button onClick={sendGifts} className='btn-send'>Send</button>
                                    :
                                    <button className=''>Send</button>
                                )
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default Gift
