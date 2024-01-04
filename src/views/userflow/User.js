
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './user.scss';
// reactstrap components
import { Link } from "react-router-dom";
import Category from "./ListitemArray";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Pagination } from "react-bootstrap";
const User = () => {
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState('Filter')
  const [user1, setUser1] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [min, setMIn] = useState();
  const [max, setMax] = useState();
  // const [todate, setTodate] = useState();
  // const [fromdate, setfromdate] = useState();
  const [pageCount, setPageCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [tabStatus, setTabStatus] = useState('Verified')
  const [limit] = useState(10);
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  console.log("to frommmmm", category)
  // const counter = useSelector(state => state.Getinput.input);
  const token = localStorage.getItem('mytoken')
  const getAllUser = () => {
    setOpen(true)
    // const search = counter ? counter : ''
    // if (category && min && max || searchTerm) {
    var data
    if (category === 'Filter') {
      data = { limit: limit, page: page, search: searchTerm }
    } else if (category !== 'Filter' && min && max) {
      data = { limit: limit, page: page, search: searchTerm, filter: category, min: min, max: max }
    } else {
      toast.error('Filter Values are incorrect !')
    }
    axios.post(`${Environment.backendUrl}/user/all/verified`, data, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data.users)
        setPageCount(response.data.total / limit)
        // setPage(page)
        setOpen(false)

      }).catch((err) => {
        setUser([])
        setOpen(false)
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
    // } else {


    // }

  }

  const GetUnverified = () => {
    setTabStatus('Unverified')
    // setOpen(true)
    // const search = counter ? counter : ''
    // if (category || min || max || searchTerm) {
    var data
    if (category === 'Filter') {
      data = { limit: limit, page: page, search: searchTerm }
    } else if (category !== 'Filter' && min && max) {
      data = { limit: limit, page: page, search: searchTerm, filter: category, min: min, max: max }
    } else {
      toast.error('Filter Values are incorrect !')
    }
    axios.post(`${Environment.backendUrl}/user/all/unverified`, data, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUser1(response?.data?.users)
        setPageCount(response.data.total / limit)
        // setPage(page)
        // setOpen(false)
      }).catch((err) => {
        // setOpen(false)
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
    // } else {
    //   axios.post(`${Environment.backendUrl}/user/all/unverified`, { limit: limit, page: page }, { headers: { "Authorization": `Bearer ${token}` } })
    //     .then((response) => {
    //       setUser1(response?.data?.users)
    //       setPageCount(response.data.total / limit)
    //       // setPage(page)
    //       // setOpen(false)
    //     }).catch((err) => {
    //       // setOpen(false)
    //       toast.error(err.response?.data.msg, {
    //         position: "top-center",
    //         autoClose: 2000,
    //       });
    //     })
    // }

  }


  // const [searchbut, setsearchbut] = useState('')

  const searchsubmit = (e) => {
    setPage(0)
    setPage(0)
    if (page == 0) {
      getAllUser()
    }
    // setsearchbut(searchTerm)
  }
  // console.log("new search value was",searchbut)
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    // console.log("jskdjkfja", selectedPage)
    // const a = selectedPage + 1
    setPage(selectedPage)
    // getAllUser()
  };

  useEffect(() => {
    if (category !== 'Filter' && min && max) {
      getAllUser()
    } else {
      getAllUser()
    }
  }, [page])
  useEffect(() => {
    if (category !== 'Filter' && min && max) {
      if (tabStatus === 'Verified') {
        getAllUser()
      } else if (tabStatus === 'Unverified') {
        GetUnverified()
      }
    }
  }, [page, category, min, max])

  const mydata = user.map(elem => {
    const account = elem.public_address ? elem.public_address : "";
    return (
      <tr>
        <td className='main-image'>
          <ul className="d-flex justify-content-start align-items-center">
            {/* <li><img src={`${images['user2.png']['default']}`} className="pr-2 imgages-no" alt="" /></li> */}
            <li className="list-inline-item"><Link className=''> <img src={elem?.profile_image} className="pr-2 imgages-no" alt="" /></Link></li>
            <li className="main-name text-truncate">{elem?.full_name}</li>
          </ul>
        </td>
        <td className=''>{elem?.email}</td>
        <td className=''>{elem?.createdAt?.split('T')[0]}</td>
        <td className=''>  {elem?.address === "" || elem?.address === null ? "" : `${elem?.address?.substring(0, 6)}...${elem?.address?.substring(
          elem?.address?.length - 4
        )}`}</td>
        <td className=''>{elem.totalRef}</td>
        <td className=''>{elem?.balance} LGX</td>
        <td className={elem?.email_verified ? 'complete' : 'uncomplete'} >{elem?.email_verified ? 'Complete' : 'Incomplete'}</td>
        <td className="button-details">
          <Link className='btn-common padds' to={'/admin/userdetail/' + elem.id}>Details</Link>
          <ToastContainer style={{ fontSize: 20 }} />
        </td>
      </tr>
    )
  })



  const mydata1 = user1.map(elem => {
    return (
      <tr>
        <td className='main-image'>
          <ul className="d-flex justify-content-start align-items-center">
            <li className="list-inline-item"><Link className=''> <img src={elem?.profile_image} className="pr-2 imgages-no" alt="" /></Link></li>
            <li className="main-name text-truncate">{elem?.full_name}</li>
          </ul>
        </td>
        <td className=''>{elem?.email}</td>
        <td className=''>{elem?.createdAt?.split('T')[0]}</td>
        <td className=''>{elem?.address === "" || elem?.address === null ? "" : `${elem?.address?.substring(0, 6)}...${elem?.address?.substring(
          elem?.address?.length - 4
        )}`}</td>
        <td className=''>{elem.totalRef}</td>
        <td className=''>{elem?.balance} LGX</td>
        <td className={elem?.email_verified ? 'complete' : 'uncomplete'} >{elem?.email_verified ? 'Complete' : 'Incomplete'}</td>
        <td className="button-details">
          <Link className='btn-common padds' to={'/admin/userdetail/' + elem.id}>Details</Link>
          <ToastContainer style={{ fontSize: 20 }} />
        </td>
      </tr>
    )
  })
  // console.log("filter",category)

  // const mydata = user.map(elem => {
  //   const account = elem.public_address ? public_address : "";
  //   return (
  //     <tr>
  //       <td className='main-image'>
  //         <ul className="d-flex justify-content-start align-items-center">
  //           {/* <li><img src={`${images['user2.png']['default']}`} className="pr-2 imgages-no" alt="" /></li> */}
  //           <li className="main-name text-truncate">{elem?.full_name}</li>
  //         </ul>
  //       </td>
  //       <td className=''>{elem?.createdAt?.split('T')[0]}</td>
  //       <td className=''>  {account == "" ? "" : `${account.substring(0, 6)}...${account.substring(
  //         account.length - 4
  //       )}`}</td>
  //       <td className=''>{elem.totalRef}</td>
  //       <td className=''>{elem?.balance} LGX</td>
  //       <td className={elem?.email_verified ? 'complete' : 'uncomplete'} >{elem?.email_verified ? 'Complete' : 'Incomplete'}</td>
  //       <td className="button-details">
  //         <Link className='btn-common padds' to={'/admin/userdetail/' + elem.id}>Details</Link>
  //         <ToastContainer style={{ fontSize: 20 }} />
  //       </td>
  //     </tr>
  //   )
  // })

  const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
  return (
    <>
      <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
      <div className="content">
        <div className="container-fluid">
          {/* <div className="sjndsjdnsjn">
          {category == 'SignedUp' ?
            <div className="inputtttt">
              <input autoFocus className='fgfhf' type="date" placeholder="To" onChange={(e) => setMIn(e.target.value)} />
              <input autoFocus className='fgfhf' type="date" placeholder="From" onChange={(e) => setMax(e.target.value)} />
            </div>
            : category == "lgx" || category == "trx" || category == "refferal" ?
              <div className="MinMax">
                <input autoFocus className='fgfhffg' type="number" placeholder="Min Value" onChange={(e) => setMIn(parseInt(e.target.value))} />
                {min}{max}{tabStatus}
                <input autoFocus className='fgfhffg' type="number" placeholder="Max Value" onChange={(e) => setMax(parseInt(e.target.value))} />
              </div>
              : ''}




          <div class="main-text-feild-head">
            <div className="button-list">
              <div className="dropdown buttons-list-all">
                <button className="butt" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <p>{category}</p>
                  <img alt='' src="\bluemoon-nft\popular-sellers\dropdown-icon.svg" className="img-fluid main-same-img" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {Category.map((elem) => {
                    return (
                      <>
                        {elem?.item === 'Cancel' && <hr className="mb-2" />}
                        <a className="dropdown-item" onClick={() => { setCategory(elem.item === 'Cancel' ? 'Filter' : elem.item) }}>{elem.item}</a>
                      </>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="namessss">
            <input autoFocus className='set_set_search_bar' type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="agsvahvs" onClick={searchsubmit}>
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div> */}
          <div className="maintableauser">



            {/* <input autoFocus className='set_set_search_bar' type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}
            {/* 
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="Publish-tab" data-toggle="tab" href="#Publish" role="tab" aria-controls="Publish" onClick={()=>{setTabStatus('Verified');setCategory('Cancel');setMIn('');setMax('')}} aria-selected="true" >Verified User</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="unpublish-tab" data-toggle="tab" href="#unpublish" role="tab" aria-controls="unpublish" onClick={GetUnverified} aria-selected="false" >Unverified User</a>
          </li>
        </ul>
        <div class="tab-content mt-4" id="myTabContent">
          <div class="tab-pane fade show active" id="Publish" role="tabpanel" aria-labelledby="Publish-tab">
            <section className="users card">
              <div className="container-fluid">
                <div class="table-responsive">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th >Profile Image & Name <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Email <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Signed Up Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Wallet Address <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Referral <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Total LGX <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Verification <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Details <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                      </tr>
                    </thead>
                    <tbody className="main-t-body-text" >
                      {mydata.length > 0 ?
                        mydata : 'No Item'}
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
                </div>
              </div>
            </section>
          </div>
          <div class="tab-pane fade" id="unpublish" role="tabpanel" aria-labelledby="unpublish-tab">
            <section className="users card">
              <div className="container-fluid">
                <div class="table-responsive">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th >Profile Image & Name <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Email <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Signed Up Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Wallet Address <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Referral <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Total LGX <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Verification <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                        <th > Details <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                      </tr>
                    </thead>
                    <tbody className="main-t-body-text" >
                      {mydata1.length > 0 ?
                        mydata1 : 'No Item'}
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
                </div>
              </div>
            </section>
          </div>
        </div> */}

            <div className="innertable_user table-responsive">
              <table>
                <thead>
                  <th>Users Name</th>
                  <th>Joining Date</th>
                  <th>Wallet Address </th>
                  <th>Referrals</th>
                  <th>Email</th>
                  <th>Verification </th>
                  <th>Action</th>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td>
                      <Link to="/admin/userdetail">
                        <button className="detailbtn" >Detail</button>
                      </Link>
                    </td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td><span className="greyish">
                      Complete </span></td>
                    <td><button className="detailbtn" >Detail</button></td>
                  </tr>
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
                    <td>Aug 25, 2022</td>
                    <td>
                      <span className="eleipiess">
                        0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43... 0x0712775C43...
                      </span>
                    </td>
                    <td>100</td>
                    <td>carolyn@gmail.com</td>
                    <td>
                      <span className="orange">
                        Pending </span>
                    </td>
                    <td><button className="detailbtn" >Detail</button></td>
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
      </div>
    </>
  );
}

export default User;
