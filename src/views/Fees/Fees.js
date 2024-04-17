import React, { useState } from 'react'
import './fees.scss'
import { Modal } from 'react-bootstrap'

const Fees = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <div className='content'>
            <div className="container-fluid">
            <div className="feesmain">
                <p className="feesmainpara">Platform fee Percentage</p>
                <div className="feeslow">
                    <p className="feeslowpara">4%</p>
                    <button onClick={handleShow} className="feeslowbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.69332 13.0134C3.28666 13.0134 2.90666 12.8734 2.63332 12.6134C2.28666 12.2868 2.11999 11.7934 2.17999 11.2601L2.42666 9.10011C2.47332 8.69345 2.71999 8.15345 3.00666 7.86011L8.47999 2.06678C9.84666 0.620114 11.2733 0.580114 12.72 1.94678C14.1667 3.31345 14.2067 4.74011 12.84 6.18678L7.36666 11.9801C7.08666 12.2801 6.56666 12.5601 6.15999 12.6268L4.01332 12.9934C3.89999 13.0001 3.79999 13.0134 3.69332 13.0134ZM10.62 1.94011C10.1067 1.94011 9.65999 2.26011 9.20666 2.74011L3.73332 8.54011C3.59999 8.68011 3.44666 9.01345 3.41999 9.20678L3.17332 11.3668C3.14666 11.5868 3.19999 11.7668 3.31999 11.8801C3.43999 11.9934 3.61999 12.0334 3.83999 12.0001L5.98666 11.6334C6.17999 11.6001 6.49999 11.4268 6.63332 11.2868L12.1067 5.49345C12.9333 4.61345 13.2333 3.80011 12.0267 2.66678C11.4933 2.15345 11.0333 1.94011 10.62 1.94011Z" fill="white" />
                            <path d="M11.56 7.29998C11.5466 7.29998 11.5266 7.29998 11.5133 7.29998C9.4333 7.09331 7.75996 5.51331 7.43996 3.44665C7.39996 3.17331 7.58663 2.91998 7.85996 2.87331C8.1333 2.83331 8.38663 3.01998 8.4333 3.29331C8.68663 4.90665 9.9933 6.14665 11.62 6.30665C11.8933 6.33331 12.0933 6.57998 12.0666 6.85331C12.0333 7.10665 11.8133 7.29998 11.56 7.29998Z" fill="white" />
                            <path d="M14 15.1667H2C1.72667 15.1667 1.5 14.9401 1.5 14.6667C1.5 14.3934 1.72667 14.1667 2 14.1667H14C14.2733 14.1667 14.5 14.3934 14.5 14.6667C14.5 14.9401 14.2733 15.1667 14 15.1667Z" fill="white" />
                        </svg>
                        Change Fee
                    </button>
                </div>
            </div>
            </div>
        </div>

        <div className="gernelmodal">
                <Modal className='gernelmodal' show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        Platform fee Percentage
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <div className="feeinputs">
                    <p className="feeinputspara">Platform fee Percentage</p>
                    <input type="text" placeholder='Enter Platform fee Percentage' className="feeinput" />
                  </div>
                  <div className="feemodalbtns">
                    <button onClick={handleClose} className="brdrbtn">Cancel</button>
                    <button onClick={handleClose} className="bluebtn">Save</button>
                  </div>
                    </Modal.Body>
                </Modal>
            </div>
</>
        
    )
}

export default Fees