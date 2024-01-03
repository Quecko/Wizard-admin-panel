import React, { useState } from 'react'
import { Nav, Pagination } from 'react-bootstrap'
import './ambassadors.scss'


const Claimambassadors = () => {
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
                <div className="maintopdiv">
                    <div className="inerimgdss">
                        <img src="\users-assets\admin-img.png" className="tableimgginerss">
                        </img>
                    </div>
                    <div className="inertopcolmm">
                        <p className="Usernnvame ">
                            User Name
                        </p>
                        <h5 className="ericccrown">
                            Eric_Brown123
                        </h5>
                    </div>
                    <div className="inertopcolmm">
                        <p className="Usernnvame">
                            Claim Amount
                        </p>
                        <h5 className="ericccrown">
                            $1,500 + 50,000 LGX
                        </h5>
                    </div>
                    <div className="inertopcolmm">
                        <p className="Usernnvame">
                            Allowed Claims
                        </p>
                        <h5 className="ericccrown">
                            $1,000 + 40,000 LGX
                        </h5>
                    </div>
                    <div className="inertopcolmm">
                        <p className="Usernnvame">
                            Denied Claims
                        </p>
                        <h5 className="ericccrown">
                            $500 + 10,000 LGX
                        </h5>
                    </div>
                    <div className="inertopcolmm">
                        <button type="button" className="buttonddred">Block User</button>
                    </div>
                </div>



                <>
                    <div className="lowertabsss claimpillss">
                        <Nav variant="pills" activeKey={activeTab1} onSelect={handleSelect1} className='amberpillsoutersss'>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-1">Pending</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-2">Allowed</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempilsss'>
                                <Nav.Link className='inerambss' eventKey="link-3">Denied</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='ambnavlastbtn'>
                            <button className='alowgreen'>Allow Selected Claims</button>
                            <button className='rejetred'>Revoke Selected Claims</button>
                        </div>
                    </div>
                    {activeTab1 === 'link-1' && (
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
                                                <p className="namepara">Referred User</p>
                                            </div>
                                        </th>

                                        <th>Type </th>
                                        <th>Claim Amount </th>
                                        <th>Date/Time  </th>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                    )}
                    {activeTab1 === 'link-2' && (
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
                                                <p className="namepara">Referred User</p>
                                            </div>
                                        </th>

                                        <th>Type </th>
                                        <th>Claim Amount </th>
                                        <th>Date/Time  </th>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                    )}
                    {activeTab1 === 'link-3' && (
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
                                                <p className="namepara">Referred User</p>
                                            </div>
                                        </th>

                                        <th>Type </th>
                                        <th>Claim Amount </th>
                                        <th>Date/Time  </th>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                                            <td>Premium Monthly </td>
                                            <td>500 USDT  </td>
                                            <td>29/11/2023 01:58</td>
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
                    )}
                </>

           
            </div>
        </div>
    )
}

export default Claimambassadors
