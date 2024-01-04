import React, { useState } from 'react'
import { Modal, Nav, Pagination } from 'react-bootstrap'
import './mysteryboxreward.scss'
import { Link } from 'react-router-dom';

const Mysteryboxreward = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='content'>
                <div className='maintablea_leader'>




                    <>

                        <div className="innertable table-responsive">
                            <table>
                                <thead>
                                    <th>Date </th>
                                    <th>Type</th>
                                    <th>User </th>
                                    <th>Received Via </th>
                                    <th>Reward</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>15/11/2023</td>
                                        <td>
                                            <span className="eleipiess">
                                                Rare
                                            </span>
                                        </td>
                                        <td>John Doe</td>
                                        <td>Bolts</td>
                                        <td>Bolts +2</td>
                                        <td>

                                            <button className="detailbtn " onClick={handleShow} >Detail</button>

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
                    <div className='mod_bodydivxx '>

                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Date/Time </h6>
                                <h6 className='namefullletf'> 15/11/2023 </h6>
                            </div>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Type </h6>
                                <h6 className='namefullletf'> Rare </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>User </h6>
                                <h6 className='namefullletf'> John Doe </h6>
                            </div>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>Received Via  </h6>
                                <h6 className='namefullletf'> Gifts </h6>
                            </div>
                        </div>
                        <div className='modfsrflex'>
                            <div className='fsteft'>
                                <h6 className='usernnamee'>User </h6>
                                <h6 className='namefullletf'> John Doe </h6>
                            </div>

                        </div>
                    </div>



                </Modal.Body>
            </Modal >


        </>
    )
}

export default Mysteryboxreward
