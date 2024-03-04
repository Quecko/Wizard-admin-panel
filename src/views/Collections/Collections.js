import './collections.scss';
import Environment from 'utils/Environment';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Dropdown, Modal, Nav, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";

const Collections = () => {

    const api_url = Environment.api_url;
    const val = localStorage.getItem("accessToken");
    const [activeTab1, setActiveTab1] = useState('link-2222');
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [collection, setCollection] = useState([]);
    const [block, setBlock] = useState(false);
    const [verify, setVerify] = useState(true);

    const handleVerifyFilter = (e) => {
        setLoader(true);
        setVerify(true);
        setBlock(false);

    };

    const handleBlockFilter = (e) => {
        setLoader(true);
        setBlock(true);
        setVerify(false);


    };
    // pagination ============

    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState([]);

    console.log(page, pageCount, "asd pageee");

    const handlePageChange = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1);
    };

    // pagination ============

    const handleSelect1 = (eventKey) => {
        setActiveTab1(eventKey);
    }

    const getCollection = async (orderField = 'createdAt', orderDirection = -1) => {
        setLoader(true);
        let apiUrl = api_url + "/launchpads/discover?limit=" + limit + "&offset=" + page;

        if (searchQuery) {
            apiUrl += "&search=" + searchQuery;
        }

        apiUrl += verify ? "&limitedEddition=true" : block ? "&openEddition=true" : "";

        const config = {
            method: "get",
            url: apiUrl,
            headers: {
                Authorization: "Bearer " + val,
            },
        };

        axios(config)
            .then(response => {
                console.log(response?.data?.data?.creators);
                setCollection(response?.data?.data?.launchpads);
                setPageCount(response?.data?.data?.count);
                window.scroll(0, 0);
                setLoader(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {

                    history.push("/")
                } else {
                    console.error('Error fetching creators:', error);

                }
                setLoader(false);
            });
    };
    useEffect(() => {
        getCollection();
    }, [page, searchQuery, verify, block])

    return (
        <>

            <div className="content">
                <div className="container-fluid">
                    <div className="newinputs">
                        <div className="inputoutermain ">

                            <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                            </svg>
                            <input value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} type="text" name="full_name" className="ambassadorinput" placeholder="Search" />
                        </div>
                        {/* <Dropdown className="amer_dropdonfstnew  " autoClose={false}>
                            <Dropdown.Toggle id="dropdown-basic" className="scrhmolddropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                    <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="onlymobile">
                                <Dropdown.Item href="#/action-1">
                                    <div className="inputoutermain ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                            <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                        </svg>
                                        <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />
                                    </div></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Dropdown className="amer_dropdonfst ">
                            <Dropdown.Toggle id="dropdown-basic">
                                Sort by
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                    <path d="M11.1308 0.634033H6.12637H1.61997C0.848825 0.634033 0.463251 1.50403 1.00948 2.01403L5.17046 5.89903C5.83719 6.52153 6.92161 6.52153 7.58833 5.89903L9.17079 4.42153L11.7493 2.01403C12.2875 1.50403 11.9019 0.634033 11.1308 0.634033Z" fill="#862FC0" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Sort By</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Name</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">Price: Hight to Low</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <Dropdown className="filyerbyns ">
                            <Dropdown.Toggle className="filyerbynss" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                    <g clip-path="url(#clip0_267_7989)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50137 15.7501C7.50137 15.2661 7.89512 14.8765 8.375 14.8765H13.625C14.109 14.8765 14.4986 15.2702 14.4986 15.7501C14.4986 16.23 14.1049 16.6237 13.625 16.6237H8.375C7.89102 16.6237 7.50137 16.2341 7.50137 15.7501ZM3.99863 10.5001C3.99863 10.0161 4.39238 9.62646 4.87227 9.62646H17.1236C17.6076 9.62646 17.9973 10.0202 17.9973 10.5001C17.9973 10.98 17.6035 11.3737 17.1236 11.3737H4.87637C4.39238 11.3737 3.99863 10.9841 3.99863 10.5001ZM0.5 5.2501C0.5 4.76611 0.89375 4.37646 1.37363 4.37646H20.6223C21.1063 4.37646 21.4959 4.77021 21.4959 5.2501C21.4959 5.72998 21.1021 6.12373 20.6223 6.12373H1.37363C0.89375 6.12373 0.5 5.73408 0.5 5.2501Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_267_7989">
                                            <rect width="21" height="21" fill="white" transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Filters
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Blocked</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Verified</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>

                    <div className='maintablea  onlybdrfor'>
                        <div className='maintablepills'>
                            <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsouter'>
                                <Nav.Item onClick={handleVerifyFilter} className='amberitempils'>
                                    <Nav.Link className='ineramb' eventKey="link-2222">Limited Edition</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item className='amberitempils'>
                                                <Nav.Link className='ineramb' eventKey="link-3333">Approved</Nav.Link>
                                            </Nav.Item> */}
                                <Nav.Item onClick={handleBlockFilter} className='amberitempils'>
                                    <Nav.Link className='ineramb' eventKey="link-4444">
                                        Open Edition
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>



                        {activeTab1 === 'link-2222' && (
                            <>

                                <div className="maintablecreater">
                                    <div className="innertable_user table-responsive">
                                        <table>
                                            <thead>
                                                <th>
                                                    Collections
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>
                                                <th>
                                                    Floor
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Volume
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th  >
                                                    Market cap
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>
                                                <th>
                                                    Floor 1d%
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>
                                                <th>
                                                    <div className='volmouter'>
                                                        Volume 1d
                                                        <div className='sidearrowtb'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M0.868964 6L5.87339 6L10.3798 6C11.1509 6 11.5365 5.13 10.9903 4.62L6.82929 0.735C6.16257 0.112499 5.07814 0.112499 4.41142 0.735L2.82896 2.2125L0.250439 4.62C-0.287758 5.13 0.0978165 6 0.868964 6Z" fill="white" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                                                <path d="M10.3774 0H5.37295H0.866554C0.0954068 0 -0.290167 0.87 0.256063 1.38L4.41705 5.265C5.08377 5.8875 6.16819 5.8875 6.83492 5.265L8.41737 3.7875L10.9959 1.38C11.5341 0.87 11.1485 0 10.3774 0Z" fill="#2C253E" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    Vol 1d%
                                                </th>
                                                <th>
                                                    Sale 1D
                                                </th>
                                                <th>
                                                    Listed
                                                </th>
                                                <th>
                                                    Owners
                                                </th>
                                            </thead>
                                            <tbody>

                                                {collection?.length > 0 ? (
                                                    collection?.map((item, index) => {
                                                        return (
                                                            <>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="mainimgdiv">
                                                                            <div className="inerimgd">
                                                                                <img src={item?.imageUrl} className="tableimgginer">
                                                                                </img>
                                                                            </div>
                                                                            <p className="tableimgtext">
                                                                                {item?.name}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {item?.floorToday?.price ? item?.floorToday?.price.toString().substring(0, 7) : "0"} CORE
                                                                    </td>
                                                                    <td>
                                                                        <span className="eleipiess">
                                                                            {item?.volume.toString().substring(0, 7)} CORE
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                       {item?.marketcap.toString().substring(0, 7)} USDC
                                                                    </td>
                                                                    <td className='red'>
                                                                        <span className={item?.floorYesterday?.price && item?.floorToday?.price && item?.floorYesterday?.price !== 0 && item?.floorToday?.price !== 0 ? ((item?.floorYesterday?.price - item?.floorToday?.price) >= 0 ? 'green' : 'red') : 'green'}>
                                                                            {item?.floorYesterday?.price && item?.floorToday?.price && item?.floorYesterday?.price !== 0 && item?.floorToday?.price !== 0 ?
                                                                                (
                                                                                    ((item?.floorYesterday?.price - item?.floorToday?.price) / item?.floorYesterday?.price * 100).toFixed(2) >= 0 ?
                                                                                        "+" + ((item?.floorYesterday?.price - item?.floorToday?.price) / item?.floorYesterday?.price * 100).toFixed(2) + "%" :
                                                                                        ((item?.floorYesterday?.price - item?.floorToday?.price) / item?.floorYesterday?.price * 100).toFixed(2) + "%"
                                                                                )
                                                                                :
                                                                                (!item?.floorToday?.price && !item?.floorYesterday?.price ? "0%" : (item?.floorToday?.price && item?.floorYesterday?.price === 0 ? "+100%" : (item?.floorYesterday?.price && item?.floorToday?.price === 0 ? "-100%" : "+100%")))
                                                                            }
                                                                        </span>

                                                                    </td>
                                                                    <td>
                                                                    {item?.volumeToday.toString().substring(0, 7)} CORE
                                                                    </td>
                                                                    <td className='red'>
                                                                    <span className={item?.volumeYesterday && item?.volumeToday && item?.volumeYesterday !== 0 && item?.volumeToday !== 0 ? ((item?.volumeYesterday - item?.volumeToday) >= 0 ? 'green' : '') : 'red'}>
                                                                            {item?.volumeYesterday && item?.volumeToday && item?.volumeYesterday !== 0 && item?.volumeToday !== 0 ?
                                                                                (
                                                                                    ((item?.volumeYesterday - item?.volumeToday) / item?.volumeYesterday * 100).toFixed(2) >= 0 ?
                                                                                        "+" + ((item?.volumeYesterday - item?.volumeToday) / item?.volumeYesterday * 100).toFixed(2) + "%" :
                                                                                        ((item?.volumeYesterday - item?.volumeToday) / item?.volumeYesterday * 100).toFixed(2) + "%"
                                                                                )
                                                                                :
                                                                                (!item?.volumeToday && !item?.volumeYesterday ? "0%" : (item?.volumeToday && item?.volumeYesterday === 0 ? "+100%" : (item?.volumeYesterday && item?.volumeToday === 0 ? "-100%" : "+100%")))
                                                                            }
                                                                        </span>

                                                                    </td>
                                                                    <td className=''>
                                                                        {item?.totalSales}
                                                                    </td>
                                                                    <td className=''>
                                                                        {item?.totalNfts}  <span className='lightgrey'>
                                                                            {/* (6.9%) */}
                                                                        </span>
                                                                    </td>
                                                                    <td className=''>
                                                                        {item?.ownersCount}  <span className='lightgrey'>
                                                                            {/* (6.9%) */}
                                                                        </span>
                                                                    </td>

                                                                    <td>
                                                                        {/* <Link to="/admin/userdetail">
                          <button className="detailbtn" >Detail</button>
                        </Link> */}
                                                                        {/* <div className="main-outer-p">

                                                <div className="main-switch-nn">
                                                    <div class="custom-control custom-switch">
                                                        <input type="checkbox" class="custom-control-input" id="customSwitches2" />
                                                        <label class="custom-control-label" for="customSwitches2"></label>
                                                    </div>
                                                </div>
                                            </div> */}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                ) : loader ? (
                                                    <tr>
                                                        <td colSpan="8" className="text-center">
                                                            <div className="text-center">
                                                                {<Spinner animation="border" style={{ color: "#862fc0" }} />}
                                                                {/* <h4>No Categories</h4> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <p class="text-center text-white mt-3">No Records</p>
                                                )}



                                            </tbody>

                                        </table>

                                    </div>
                                    <div className='Paginationlattable'>
                                        {/* <button className='leftpigbtn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
                                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>

                                        </button> */}

                                        {page >= 1 ?
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
                                                pageCount={Math.ceil(pageCount / limit)}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageChange}
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                forcePage={page - 1}
                                            />
                                            : ''}
                                    </div>

                                </div>
                            </>
                        )}
                        {activeTab1 === 'link-3333' && (
                            <>

                            </>
                        )}
                        {activeTab1 === 'link-4444' && (
                            <>

                                <div className="maintablecreater">
                                    <div className="innertable_user table-responsive">
                                        <table>
                                            <thead>
                                                <th>
                                                    Collections
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>
                                                <th>
                                                    Total minted
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>

                                                <th  >
                                                    Total Funds Raised
                                                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                                                </th>


                                            </thead>
                                            <tbody>


                                                {collection?.length > 0 ? (
                                                    collection?.map((item, index) => {
                                                        return (
                                                            <>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="mainimgdiv">
                                                                            <div className="inerimgd">
                                                                                <img src={item?.imageUrl} className="tableimgginer">
                                                                                </img>
                                                                            </div>
                                                                            <p className="tableimgtext">
                                                                                {item?.name}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {item?.todayNFTs}
                                                                    </td>

                                                                    <td>
                                                                        100,000 CORE
                                                                    </td>
                                                                </tr>

                                                            </>
                                                        )
                                                    })
                                                ) : loader ? (
                                                    <tr>
                                                        <td colSpan="8" className="text-center">
                                                            <div className="text-center">
                                                                {<Spinner animation="border" style={{ color: "#862fc0" }} />}
                                                                {/* <h4>No Categories</h4> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <p class="text-center text-white mt-3">No Records</p>
                                                )}
                                            </tbody>

                                        </table>

                                    </div>
                                    <div className='Paginationlattable'>
                                        {/* <button className='leftpigbtn' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
                                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>

                                        </button> */}

                                        {page >= 1 ?
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
                                                pageCount={Math.ceil(pageCount / limit)}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageChange}
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                forcePage={page - 1}
                                            />
                                            : ''}
                                    </div>

                                </div>
                            </>
                        )}
                    </div>


                </div>
            </div>
        </>
    );
}

export default Collections
