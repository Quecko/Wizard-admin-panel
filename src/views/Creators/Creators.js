
import React, { useEffect, useState } from "react";
import './user.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Dropdown, Pagination } from "react-bootstrap";
import Environment from 'utils/Environment';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';



const Creators = () => {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [block, setBlock] = useState(false);
  const [verify, setVerify] = useState(false);
  const [all, setAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const val = localStorage.getItem("accessToken");
  const api_url = Environment.api_url;
  const [creator, setCreator] = useState([]);

  const handleVerifyFilter = (e) => {
    if (e.target.checked) {
      setVerify(true);
      setBlock(false);
    } else if (!e.target.checked) {
      setVerify(false);
    }
  };

  const handleBlockFilter = (e) => {
    if (e.target.checked) {
      setBlock(true);
      setVerify(false);
    } else if (!e.target.checked) {
      setBlock(false);
    }
  };

  const handleRemoveFilter = (e) => {
    if (e.target.checked) {
      setBlock(false);
      setVerify(false);
    }
  };

  const getCreater = async (val) => {
    let apiUrl = api_url + "/creators?limit=" + limit + "&offset=" + offset;
    
    if (searchQuery) {
      apiUrl += "&search=" + searchQuery;
    }
  
    apiUrl += verify ? "&isVerified=true" : block ? "&isBlocked=true" : "";
  
    const config = {
      method: "get",
      url: apiUrl,
      headers: {
        Authorization: "Bearer " + val,
      },
    };
  
    const response = await axios(config);
    console.log(response?.data?.data?.creators);
    setCreator(response?.data?.data?.creators);
  };
  


  useEffect(() => {
    getCreater(val);
  }, [searchQuery,verify,block,all])

  const verifiedCreator = async (id) => {
    // setLoader(true);
    const config = {
      method: "patch",
      url: api_url + "/creators/" + id + "/is-verified",
      headers: {
        Authorization: "Bearer " + val,
      },
    };
    await axios(config)
      .then((res) => {
        // setLoader(false);
      })
      .catch((err) => {
        if (err?.response?.status == 501) {
          // history.push("/");
        } else {
          console.log("error meessage: ", err?.response?.data?.message);
          toast.error(err?.response?.data?.message, {
            position: "top-right",
            autoClose: 2000,
          });
        }

      });
  };

  const blockCreator = async (id) => {
    // setLoader(true);
    const config = {
      method: "patch",
      url: api_url + "/creators/" + id + "/is-blocked",
      headers: {
        Authorization: "Bearer " + val,
      },
    };
    await axios(config)
      .then((res) => {
        // setLoader(false);
      })
      .catch((err) => {
        if (err?.response?.status == 501) {
          // history.push("/");
        } else {
          console.log("error meessage: ", err?.response?.data?.message);
          toast.error(err?.response?.data?.message, {
            position: "top-right",
            autoClose: 2000,
          });
        }

      });
  };




  return (
    <>
      <Backdrop className="loader" sx={{ color: '#0000' }} open={open}><CircularProgress color="inherit" /></Backdrop>
      <div className="content">
        <div className="container-fluid">
          <div className="newinputs">
            <div className="inputoutermain onlyformobilemain">

              <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
              </svg>
              <input  value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} type="text" name="full_name" className="ambassadorinput" placeholder="Search" />

            </div>
            <Dropdown className="amer_dropdonfstnew onlyformobile d-none " autoClose={false}>
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
            </Dropdown>
            <Dropdown className="amer_dropdonfst ">
              <Dropdown.Toggle id="dropdown-basic">
                Sort by
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <path d="M11.1308 0.634033H6.12637H1.61997C0.848825 0.634033 0.463251 1.50403 1.00948 2.01403L5.17046 5.89903C5.83719 6.52153 6.92161 6.52153 7.58833 5.89903L9.17079 4.42153L11.7493 2.01403C12.2875 1.50403 11.9019 0.634033 11.1308 0.634033Z" fill="#862FC0" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                <Dropdown.Item href="#/action-2">itemsCreated</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="filyerbyns ">
                            <Dropdown.Toggle className="filyerbynss" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M9.49329 18.875C9.09329 18.875 8.70163 18.775 8.33496 18.575C7.60163 18.1667 7.15996 17.425 7.15996 16.5917V12.175C7.15996 11.7583 6.88496 11.1333 6.62663 10.8167L3.50996 7.51666C2.98496 6.99167 2.58496 6.09167 2.58496 5.41667V3.5C2.58496 2.16667 3.59329 1.125 4.87663 1.125H15.8766C17.1433 1.125 18.1683 2.15 18.1683 3.41667V5.25C18.1683 6.125 17.6433 7.11666 17.1516 7.60833L13.5433 10.8C13.1933 11.0917 12.9183 11.7333 12.9183 12.25V15.8333C12.9183 16.575 12.4516 17.4333 11.8683 17.7833L10.7183 18.525C10.3433 18.7583 9.91829 18.875 9.49329 18.875ZM4.87663 2.375C4.29329 2.375 3.83496 2.86667 3.83496 3.5V5.41667C3.83496 5.725 4.08496 6.325 4.40163 6.64166L7.57663 9.98333C8.00163 10.5083 8.41829 11.3833 8.41829 12.1667V16.5833C8.41829 17.125 8.79329 17.3917 8.95163 17.475C9.30163 17.6667 9.72663 17.6667 10.0516 17.4667L11.21 16.725C11.4433 16.5833 11.6766 16.1333 11.6766 15.8333V12.25C11.6766 11.3583 12.11 10.375 12.735 9.85L16.3016 6.69166C16.585 6.40833 16.9266 5.73333 16.9266 5.24167V3.41667C16.9266 2.84167 16.46 2.375 15.885 2.375H4.87663Z" fill="#862FC0" />
                                    <path d="M5.37652 8.95839C5.25985 8.95839 5.15152 8.92506 5.04319 8.86672C4.75152 8.68339 4.65986 8.29172 4.84319 8.00006L8.95152 1.41672C9.13485 1.12506 9.51819 1.03339 9.80985 1.21672C10.1015 1.40006 10.1932 1.78339 10.0099 2.07506L5.90152 8.65839C5.78486 8.85006 5.58485 8.95839 5.37652 8.95839Z" fill="#862FC0" />
                                </svg>
                                Filters
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="inneritem">
                                    All
                                    {/* <div className="main-outer-p">

                                        <div className="main-switch-nns">
                                            <div class="custom-control custom-switchs">
                                                <input type="checkbox" class="custom-control-input" id="customSwitches2" />
                                                <label class="custom-control-label" for="customSwitches2"></label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div class="content">
                                        <label class="checkBox">
                                            <input id="ch1" type="checkbox" />
                                            <div class="transition"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="inneritem">
                                    Limited Edition


                                    <div class="content">
                                        <label class="checkBox">
                                            <input id="ch1" type="checkbox" />
                                            <div class="transition"></div>
                                        </label>
                                    </div>

                                </div>
                                <div className="inneritem">
                                    Open Edition


                                    <div class="content">
                                        <label class="checkBox">
                                            <input id="ch1" type="checkbox" />
                                            <div class="transition"></div>
                                        </label>

                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
          </div>
          <div className="maintablecreater">
            <div className="innertable_user table-responsive">
              <table>
                <thead>
                  <th>Artist name
                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                  </th>
                  <th>items created
                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                  </th>
                  {/* <th>Items sold
                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                  </th>
                  <th>Followers
                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                  </th>
                  <th>Following
                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                  </th> */}
                  <th>Verified
                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                  </th>
                  <th>Block artist
                    {/* <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" /> */}
                  </th>
                </thead>
                <tbody>
                  {creator.map((item, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <div className="mainimgdiv">
                              <div className="inerimgd">
                                <img src={item?.profileImageUrl} className="tableimgginer">
                                </img>
                              </div>
                              <p className="tableimgtext">
                                {item?.name}
                              </p>
                            </div>
                          </td>
                          <td>{item?.itemsCreated} items</td>
                          {/* <td>
                      <span className="eleipiess">
                        25 items
                      </span>
                    </td>
                    <td>3.7K</td>
                    <td>1.5K</td> */}
                          <td>
                            <div className="main-outer-p">
                              <div className="main-switch-nn">
                                <div class="custom-control custom-switch">
                                  <input defaultChecked={item?.isVerified} onChange={() =>
                                    verifiedCreator(item?._id)
                                  } type="checkbox" class="custom-control-input" id="customSwitches1" />
                                  <label class="custom-control-label" for="customSwitches1"></label>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="main-outer-p">
                              <div className="main-switch-nn">
                                <div class="custom-control custom-switch">
                                  <input defaultChecked={item?.isBlocked} onChange={() =>
                                    blockCreator(item?._id)
                                  } type="checkbox" class="custom-control-input" id="customSwitches2" />
                                  <label class="custom-control-label" for="customSwitches2"></label>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                  })}


                </tbody>
              </table>
            </div>
            <div className='Paginationlattable'>
              <button className='leftpigbtn' >
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

              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Creators;
