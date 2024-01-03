import React, { useState } from 'react'
import { Nav, Pagination } from 'react-bootstrap'
import './ambassadors.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Ambassadorsclaimrewards = () => {
    const [activeTab, setActiveTab] = useState('link-1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const [activeTab1, setActiveTab1] = useState('link-1');

    const handleSelect1 = (eventKey) => {
        setActiveTab1(eventKey);
    };
    return (
        <div className='content'>
            <div className='maintablea'>
                <div className='maintablepills claimpillss onlyforrewards'>

                    <div className='ambnavlastbtn'>
                        <button disabled className='alowgreen disabled'>Allow Selected Claims</button>
                        <button disabled className='rejetred'>Revoke Selected Claims</button>

                    </div>
                </div>


                <>


                    <>
                        <div className="innertable">
                            <table>
                                <thead>
                                    <th>
                                        <div className="namemain">
                                            <label class="checkbox">
                                                <input type="checkbox" />
                                                <div class="checkbox-circle">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                        <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                    </svg>
                                                </div>
                                            </label>
                                            <p className="namepara">Ambassadors</p>
                                        </div>
                                    </th>
                                    <th>Claim Amount </th>
                                    <th>Allowed Claims </th>
                                    <th>Denied Claims </th>
                                    <th>Action </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="namemain">
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <div class="checkbox-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='d-none innerbox'>
                                                            <rect x="0.910156" y="0.910156" width="10.1818" height="10.1818" rx="1" fill="#3654D6" />
                                                        </svg>
                                                    </div>
                                                </label>
                                                <p className="namepara">John Doe</p>
                                            </div>
                                        </td>
                                        <td>$1,500 + 50,000 LGX  </td>
                                        <td>$1,500 + 50,000 LGX   </td>
                                        <td>$500 + 10,000 LGX  </td>

                                        <td>
                                            <Link to="/admin/claimambassadors">
                                                <button className="detailbtn" >View Detail</button>
                                            </Link>
                                        </td>
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
                    </>


                </>


            </div>
        </div>
    )
}

export default Ambassadorsclaimrewards
