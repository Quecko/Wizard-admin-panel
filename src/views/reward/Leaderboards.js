
import React, { useState, useEffect } from "react";
import './rewardlea.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from 'utils/Environment';
import ReactPaginate from 'react-paginate';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
import { Link } from "react-router-dom";
function LeaderBoard() {
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [leader, setLeader] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [limit] = useState(10);
    const token = localStorage.getItem('mytoken')

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage)
    };


    const getLeaderboard = () => {
        setOpen(true)
        axios.post(Environment.backendUrl + "/task/leaderboard", { limit: limit, page: page }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setLeader(response.data.board)
                //  varc= response.data.total[0]
                setPageCount(response.data.total / limit);
                setPage(page)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data?.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    console.log("pageee", pageCount)

    const mydata = leader.map(elem => {
        const account = elem.public_address;
        return (
            <tr>
                <td className='main-image'>
                    <Link className=''> <img src={elem.profile_image} className="pr-2 imgages-no" alt="" /></Link>
                    <span>{elem.full_name}</span>
                </td>
                <td className=''>  {account == "" ? "" : `${account?.substring(0, 6)}...${account?.substring(
                    account.length - 4
                )}`}</td>
                <td className='completed'>{elem.completed == null ? 0 : elem.completed}</td>
                <td className='uncomplete'>
                    {elem.pending ? elem.pending : '0'}
                </td>
                <td className="button-details">
                    <Link className='btn-common padds' to={'/admin/leaderboardDetails/' + elem.id}>Details</Link>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        getLeaderboard()
    }, [token])

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            {/* <div className="content">
                <section className="daily leaderboard ptb20 card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Users Name<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Wallet Address<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Task Completed<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Tasks Pending<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {mydata ? mydata : ''}
                                </tbody>
                            </table>
                            {pageCount >= 1 ? 
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
                            : ''}
                            <ToastContainer style={{ fontSize: 20 }} />
                        </div>
                    </div>
                </section>
            </div> */}



            {/* NEW Rewards / Leaderboard design */}


            <div className="content">
                <section className="daily leaderboard ptb20 card">
                    <div className="container-fluid">
                        <div className="innertable_leaderBoard">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Users Name<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Wallet Address<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Task Completed<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Tasks Pending<img src={`${images['arrow-down.png']['default']}`} className="pl-2" alt="" /></th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="mainimgdiv">
                                                <div className="inerimgd">
                                                    <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                    </img>
                                                </div>
                                                <p className="tableimgtext">
                                                    Carolyn Wilson
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="eleipiess">
                                                0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                                            </span>
                                        </td>
                                        <td><span className="greyish">
                                            10 </span></td>
                                        <td>0</td>
                                      
                                        <td>
                                            <Link to="/admin/Leaderboarddetailsnew">
                                                <button className="detailbtn-common" >Detail</button>
                                            </Link>
                                        </td>
                                    </tr>


                                </tbody>

                            </table>

                        </div>
                    </div>
                </section>
            </div>



        </>
    );
}

export default LeaderBoard;
