import React, { useState } from 'react'
import { Modal, Nav, Pagination } from 'react-bootstrap'
import './ambassadors.scss'
import { Link } from 'react-router-dom';

const Ambassadors = () => {
    const [activeTab, setActiveTab] = useState('link-1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='content'>
                <div className='maintablea'>
                    <div className='maintablepills'>
                        <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect} className='amberpillsouter'>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-1">Pending</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-2">Approved</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='amberitempils'>
                                <Nav.Link className='ineramb' eventKey="link-3">
                                    Rejected
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>



                    {activeTab === 'link-1' && (
                        <>
                            <div className="innertable">
                                <table>
                                    <thead>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Followers</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn" onClick={handleShow}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>Carolyn Wilson</td>
                                            <td>carolyn@gmail.com</td>
                                            <td>500</td>
                                            <td><button className="detailbtn">Detail</button></td>
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
                    {activeTab === 'link-2' && (
                         <>
                         <div className="innertable">
                             <table>
                                 <thead>
                                     <th>Name</th>
                                     <th>Email</th>
                                     <th>Followers</th>
                                     <th>Action</th>
                                 </thead>
                                 <tbody>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn" onClick={handleShow}>Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
                                     </tr>
                                     <tr>
                                         <td>Carolyn Wilson</td>
                                         <td>carolyn@gmail.com</td>
                                         <td>500</td>
                                         <td><button className="detailbtn">Detail</button></td>
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
                    {activeTab === 'link-3' && (
                      <>
                      <div className="innertable">
                          <table>
                              <thead>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Followers</th>
                                  <th>Action</th>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td>
                              
                                        <button className="detailbtn" onClick={handleShow}>Detail</button>
                                        </td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
                                  </tr>
                                  <tr>
                                      <td>Carolyn Wilson</td>
                                      <td>carolyn@gmail.com</td>
                                      <td>500</td>
                                      <td><button className="detailbtn">Detail</button></td>
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
                </div>
            </div>

            <Modal className='ambmodalmain' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>

                        details
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M12.0008 13.9008L7.10078 18.8008C6.91745 18.9841 6.68411 19.0758 6.40078 19.0758C6.11745 19.0758 5.88411 18.9841 5.70078 18.8008C5.51745 18.6174 5.42578 18.3841 5.42578 18.1008C5.42578 17.8174 5.51745 17.5841 5.70078 17.4008L10.6008 12.5008L5.70078 7.60078C5.51745 7.41745 5.42578 7.18411 5.42578 6.90078C5.42578 6.61745 5.51745 6.38411 5.70078 6.20078C5.88411 6.01745 6.11745 5.92578 6.40078 5.92578C6.68411 5.92578 6.91745 6.01745 7.10078 6.20078L12.0008 11.1008L16.9008 6.20078C17.0841 6.01745 17.3174 5.92578 17.6008 5.92578C17.8841 5.92578 18.1174 6.01745 18.3008 6.20078C18.4841 6.38411 18.5758 6.61745 18.5758 6.90078C18.5758 7.18411 18.4841 7.41745 18.3008 7.60078L13.4008 12.5008L18.3008 17.4008C18.4841 17.5841 18.5758 17.8174 18.5758 18.1008C18.5758 18.3841 18.4841 18.6174 18.3008 18.8008C18.1174 18.9841 17.8841 19.0758 17.6008 19.0758C17.3174 19.0758 17.0841 18.9841 16.9008 18.8008L12.0008 13.9008Z" fill="white" />
                        </svg></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mod_bodydiv '>
                        <div className="topdiv">
                            <div className='tommodimg'>
                                <img src="\ambassadors\modavt.svg" alt="" className='modinerimg' />
                            </div>
                            <div className='top_rght'>
                                <h5 className=''>
                                    Carolyn Wilson
                                </h5>
                                <button className='modprobtn'>
                                    View Detail Profile
                                </button>
                            </div>

                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>User Name </h6>
                                <h6 className='namefullletf'> Carolyn_Wilson123 </h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Email Address </h6>
                                <h6 className='namefullletf'> carolyn.wilson@gmail.com </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Full Name </h6>
                                <h6 className='namefullletf'> 10k </h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Followers </h6>
                                <h6 className='namefullletf'> Carolyn_Wilson123 </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Wallet Address </h6>
                                <h6 className='namefullletf'><span className="walletaddresss">0x340962BA0x340962BA0x340962BA0x340962BA0x340962BA </span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                    <g clip-path="url(#clip0_277_126377)">
                                        <path d="M5.67842 11.8724C4.31166 11.8724 3.19922 10.7599 3.19922 9.39316V3.41406H2.17842C1.29349 3.41406 0.574219 4.13322 0.574219 5.01816V12.8932C0.574219 13.7781 1.29349 14.4974 2.17842 14.4974H9.47002C10.3549 14.4974 11.0742 13.7781 11.0742 12.8932V11.8724H5.67842Z" fill="#030229" fill-opacity="0.4" />
                                        <path d="M13.4075 2.1042C13.4075 1.21809 12.6894 0.5 11.8034 0.5H5.67842C4.79231 0.5 4.07422 1.21809 4.07422 2.1042V9.3958C4.07422 10.2819 4.79231 11 5.67842 11H11.8034C12.6894 11 13.4075 10.2819 13.4075 9.3958V2.1042Z" fill="#030229" fill-opacity="0.4" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_277_126377">
                                            <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg></h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Following </h6>
                                <h6 className='namefullletf'> 100k </h6>
                            </div>
                        </div>
                    </div>
                    <div className='mod_bodydivsec '>

                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'> Name </h6>
                                <h6 className='namefullletf'> Carolyn_Wilson </h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Email  </h6>
                                <h6 className='namefullletf'> carolyn.wilson@gmail.com </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft w-100'>
                                <h6 className='usernnamee'>Description </h6>
                                <h6 className='namefullletf'> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt. </h6>
                            </div>

                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Instagram </h6>
                                <h6 className='namefullletf Ellipsis'> i.me/johndoe
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M6.4763 13.7721H4.0263C1.74547 13.7721 0.730469 12.7571 0.730469 10.4763V8.0263C0.730469 5.74547 1.74547 4.73047 4.0263 4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V10.4763C9.77214 12.7571 8.75714 13.7721 6.4763 13.7721ZM4.0263 5.60547C2.21797 5.60547 1.60547 6.21797 1.60547 8.0263V10.4763C1.60547 12.2846 2.21797 12.8971 4.0263 12.8971H6.4763C8.28464 12.8971 8.89714 12.2846 8.89714 10.4763V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.0263Z" fill="#030229" />
                                        <path d="M9.9763 10.2721H9.33464C9.09547 10.2721 8.89714 10.0738 8.89714 9.83464V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.66797C4.4288 5.60547 4.23047 5.40714 4.23047 5.16797V4.5263C4.23047 2.24547 5.24547 1.23047 7.5263 1.23047H9.9763C12.2571 1.23047 13.2721 2.24547 13.2721 4.5263V6.9763C13.2721 9.25714 12.2571 10.2721 9.9763 10.2721ZM9.77214 9.39714H9.9763C11.7846 9.39714 12.3971 8.78464 12.3971 6.9763V4.5263C12.3971 2.71797 11.7846 2.10547 9.9763 2.10547H7.5263C5.71797 2.10547 5.10547 2.71797 5.10547 4.5263V4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V9.39714Z" fill="#030229" />
                                    </svg>
                                </h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Twitter</h6>
                                <h6 className='namefullletf Ellipsis'>
                                    i.me/johndoe

                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M6.4763 13.7721H4.0263C1.74547 13.7721 0.730469 12.7571 0.730469 10.4763V8.0263C0.730469 5.74547 1.74547 4.73047 4.0263 4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V10.4763C9.77214 12.7571 8.75714 13.7721 6.4763 13.7721ZM4.0263 5.60547C2.21797 5.60547 1.60547 6.21797 1.60547 8.0263V10.4763C1.60547 12.2846 2.21797 12.8971 4.0263 12.8971H6.4763C8.28464 12.8971 8.89714 12.2846 8.89714 10.4763V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.0263Z" fill="#030229" />
                                        <path d="M9.9763 10.2721H9.33464C9.09547 10.2721 8.89714 10.0738 8.89714 9.83464V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.66797C4.4288 5.60547 4.23047 5.40714 4.23047 5.16797V4.5263C4.23047 2.24547 5.24547 1.23047 7.5263 1.23047H9.9763C12.2571 1.23047 13.2721 2.24547 13.2721 4.5263V6.9763C13.2721 9.25714 12.2571 10.2721 9.9763 10.2721ZM9.77214 9.39714H9.9763C11.7846 9.39714 12.3971 8.78464 12.3971 6.9763V4.5263C12.3971 2.71797 11.7846 2.10547 9.9763 2.10547H7.5263C5.71797 2.10547 5.10547 2.71797 5.10547 4.5263V4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V9.39714Z" fill="#030229" />
                                    </svg>

                                </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Discord </h6>
                                <h6 className='namefullletf Ellipsis'> i.me/johndoe

                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M6.4763 13.7721H4.0263C1.74547 13.7721 0.730469 12.7571 0.730469 10.4763V8.0263C0.730469 5.74547 1.74547 4.73047 4.0263 4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V10.4763C9.77214 12.7571 8.75714 13.7721 6.4763 13.7721ZM4.0263 5.60547C2.21797 5.60547 1.60547 6.21797 1.60547 8.0263V10.4763C1.60547 12.2846 2.21797 12.8971 4.0263 12.8971H6.4763C8.28464 12.8971 8.89714 12.2846 8.89714 10.4763V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.0263Z" fill="#030229" />
                                        <path d="M9.9763 10.2721H9.33464C9.09547 10.2721 8.89714 10.0738 8.89714 9.83464V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.66797C4.4288 5.60547 4.23047 5.40714 4.23047 5.16797V4.5263C4.23047 2.24547 5.24547 1.23047 7.5263 1.23047H9.9763C12.2571 1.23047 13.2721 2.24547 13.2721 4.5263V6.9763C13.2721 9.25714 12.2571 10.2721 9.9763 10.2721ZM9.77214 9.39714H9.9763C11.7846 9.39714 12.3971 8.78464 12.3971 6.9763V4.5263C12.3971 2.71797 11.7846 2.10547 9.9763 2.10547H7.5263C5.71797 2.10547 5.10547 2.71797 5.10547 4.5263V4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V9.39714Z" fill="#030229" />
                                    </svg>
                                </h6>
                            </div>
                            <div className='fsteftsec'>
                                <h6 className='usernnamee'>Telegram</h6>
                                <h6 className='namefullletf Ellipsis'>
                                    i.me/johndoe
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M6.4763 13.7721H4.0263C1.74547 13.7721 0.730469 12.7571 0.730469 10.4763V8.0263C0.730469 5.74547 1.74547 4.73047 4.0263 4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V10.4763C9.77214 12.7571 8.75714 13.7721 6.4763 13.7721ZM4.0263 5.60547C2.21797 5.60547 1.60547 6.21797 1.60547 8.0263V10.4763C1.60547 12.2846 2.21797 12.8971 4.0263 12.8971H6.4763C8.28464 12.8971 8.89714 12.2846 8.89714 10.4763V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.0263Z" fill="#030229" />
                                        <path d="M9.9763 10.2721H9.33464C9.09547 10.2721 8.89714 10.0738 8.89714 9.83464V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.66797C4.4288 5.60547 4.23047 5.40714 4.23047 5.16797V4.5263C4.23047 2.24547 5.24547 1.23047 7.5263 1.23047H9.9763C12.2571 1.23047 13.2721 2.24547 13.2721 4.5263V6.9763C13.2721 9.25714 12.2571 10.2721 9.9763 10.2721ZM9.77214 9.39714H9.9763C11.7846 9.39714 12.3971 8.78464 12.3971 6.9763V4.5263C12.3971 2.71797 11.7846 2.10547 9.9763 2.10547H7.5263C5.71797 2.10547 5.10547 2.71797 5.10547 4.5263V4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V9.39714Z" fill="#030229" />
                                    </svg>
                                </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Tiktok </h6>
                                <h6 className='namefullletf Ellipsis'> i.me/johndoe

                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M6.4763 13.7721H4.0263C1.74547 13.7721 0.730469 12.7571 0.730469 10.4763V8.0263C0.730469 5.74547 1.74547 4.73047 4.0263 4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V10.4763C9.77214 12.7571 8.75714 13.7721 6.4763 13.7721ZM4.0263 5.60547C2.21797 5.60547 1.60547 6.21797 1.60547 8.0263V10.4763C1.60547 12.2846 2.21797 12.8971 4.0263 12.8971H6.4763C8.28464 12.8971 8.89714 12.2846 8.89714 10.4763V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.0263Z" fill="#030229" />
                                        <path d="M9.9763 10.2721H9.33464C9.09547 10.2721 8.89714 10.0738 8.89714 9.83464V8.0263C8.89714 6.21797 8.28464 5.60547 6.4763 5.60547H4.66797C4.4288 5.60547 4.23047 5.40714 4.23047 5.16797V4.5263C4.23047 2.24547 5.24547 1.23047 7.5263 1.23047H9.9763C12.2571 1.23047 13.2721 2.24547 13.2721 4.5263V6.9763C13.2721 9.25714 12.2571 10.2721 9.9763 10.2721ZM9.77214 9.39714H9.9763C11.7846 9.39714 12.3971 8.78464 12.3971 6.9763V4.5263C12.3971 2.71797 11.7846 2.10547 9.9763 2.10547H7.5263C5.71797 2.10547 5.10547 2.71797 5.10547 4.5263V4.73047H6.4763C8.75714 4.73047 9.77214 5.74547 9.77214 8.0263V9.39714Z" fill="#030229" />
                                    </svg>
                                </h6>
                            </div>

                        </div>
                    </div>
                    <div className='lastfoterbtn'>
                        <button className='rreject'>
                            Reject
                        </button>
              
                        <button className='approveeedd'>
                            Approve
                        </button>
                    
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Ambassadors
