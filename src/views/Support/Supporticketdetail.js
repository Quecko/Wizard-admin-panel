import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './support.scss';
const Supporticketdetail = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <div className="content">
                <div className="container-fluid p-0">
                    <div className='row'>
                        <div className='col-xl-8 col-md-12'>
                            <div className="main-ticketouterdiv">
                                <div className="ticket_topdiv">
                                    <h6 className='ttiiitle'>
                                        Title
                                    </h6>
                                    <h5 className='plundered '>
                                        Login Issue
                                    </h5>
                                    <h6 className='ttiiitle'>
                                        Description
                                    </h6>
                                    <p className='ddescription'>
                                        The hacker who plundered more than $600 million of crypto assets from a decentralized finance platform known as Poly Network has now returned almost all of the money.
                                    </p>
                                    <p className='ddescription'>
                                        The assets were transferred back to blockchain addresses controlled by Poly Network on Friday, according to an emailed statement from the company. All that remains outstanding are $33 million of tether tokens, frozen by the company Tether in the effort to recover the stolen goods.
                                    </p>
                                </div>
                                <div className="ticket_topdiv">
                                    <h4 className='ddescriptiondsa'>
                                        Comments
                                    </h4>
                                    <div className='mainimg-and-commets'>
                                        <div className='imgssddand-commets'>
                                            <div className="mainimgdiv">
                                                <div className="inerimgddd">
                                                    <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                                    </img>
                                                </div>

                                            </div>
                                            <div className='img-and-commets'>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                            </div>

                                        </div>
                                        <div className='timeessd'>
                                            <p className='onlytimeanddadt'>
                                                12:00
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mainimg-and-commets'>
                                        <div className='timeessd'>
                                            <p className='onlytimeanddadt'>
                                                12:00
                                            </p>
                                        </div>
                                        <div className='imgssddand-commets'>
                                            <div className='img-and-commets'>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                            </div>
                                            <div className="mainimgdiv">
                                                <div className="inerimgddd">
                                                    <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                                    </img>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <div className='mainimg-and-commets'>
                                        <div className='imgssddand-commets'>
                                            <div className="mainimgdiv">
                                                <div className="inerimgddd">
                                                    <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                                    </img>
                                                </div>

                                            </div>
                                            <div className='img-and-commets'>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                            </div>

                                        </div>
                                        <div className='timeessd'>
                                            <p className='onlytimeanddadt'>
                                                12:00
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mainimg-and-commets'>
                                        <div className='timeessd'>
                                            <p className='onlytimeanddadt'>
                                                12:00
                                            </p>
                                        </div>
                                        <div className='imgssddand-commets'>
                                            <div className='img-and-commets'>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                                <p className="tableimgtext">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                                </p>
                                            </div>
                                            <div className="mainimgdiv">
                                                <div className="inerimgddd">
                                                    <img src="\users-assets\userdetaillast.svg" className="tableimgginerdd">
                                                    </img>
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    <div className='lastinerinput '>
                                        <input className='msgsinputonly' placeholder='Type message' />
                                        {/* <button className='inerinputfstbtn' onClick={handleShow}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12.3291 21.3401C11.2391 21.3401 10.1491 20.9301 9.31906 20.1001C7.65906 18.4401 7.65906 15.7501 9.31906 14.0901L11.7991 11.6201C12.0891 11.3301 12.5691 11.3301 12.8591 11.6201C13.1491 11.9101 13.1491 12.3901 12.8591 12.6801L10.3791 15.1501C9.30906 16.2201 9.30906 17.9701 10.3791 19.0401C11.4491 20.1101 13.1991 20.1101 14.2691 19.0401L18.1591 15.1501C19.3391 13.9701 19.9891 12.4001 19.9891 10.7301C19.9891 9.06011 19.3391 7.49011 18.1591 6.31011C15.7191 3.87011 11.7591 3.87011 9.31906 6.31011L5.07906 10.5501C4.08906 11.5401 3.53906 12.8601 3.53906 14.2601C3.53906 15.6601 4.08906 16.9801 5.07906 17.9701C5.36906 18.2601 5.36906 18.7401 5.07906 19.0301C4.78906 19.3201 4.30906 19.3201 4.01906 19.0301C2.74906 17.7501 2.03906 16.0601 2.03906 14.2601C2.03906 12.4601 2.73906 10.7601 4.01906 9.49011L8.25906 5.25011C11.2791 2.23011 16.1991 2.23011 19.2191 5.25011C20.6791 6.71011 21.4891 8.66011 21.4891 10.7301C21.4891 12.8001 20.6791 14.7501 19.2191 16.2101L15.3291 20.1001C14.4991 20.9301 13.4191 21.3401 12.3291 21.3401Z" fill="#A4B5EC" />
                                            </svg>
                                        </button> */}
                                        <button className='inerinputlastbtn'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.4889 8.90635L4.36386 1.41494C4.14262 1.29083 3.88886 1.23698 3.63628 1.26052C3.38371 1.28407 3.14427 1.38391 2.94979 1.54677C2.7553 1.70963 2.61497 1.92782 2.54743 2.17233C2.47989 2.41685 2.48835 2.67612 2.57167 2.91572L4.99355 9.98369C4.99324 9.98628 4.99324 9.98891 4.99355 9.9915C4.99311 9.99409 4.99311 9.99673 4.99355 9.99931L2.57167 17.0829C2.50494 17.2714 2.4844 17.4731 2.51176 17.6712C2.53913 17.8692 2.6136 18.0578 2.72894 18.2212C2.84427 18.3845 2.9971 18.5177 3.1746 18.6098C3.35209 18.7018 3.54908 18.7499 3.74902 18.7501C3.96595 18.7495 4.17906 18.693 4.36777 18.586L17.4857 11.0821C17.6792 10.9737 17.8404 10.8158 17.9527 10.6246C18.065 10.4333 18.1244 10.2156 18.1248 9.99382C18.1252 9.77203 18.0666 9.55412 17.955 9.36247C17.8434 9.17081 17.6828 9.01231 17.4896 8.90322L17.4889 8.90635ZM3.74902 17.5001V17.4931L6.1037 10.6251H10.624C10.7898 10.6251 10.9487 10.5592 11.066 10.442C11.1832 10.3248 11.249 10.1659 11.249 10.0001C11.249 9.83434 11.1832 9.67536 11.066 9.55815C10.9487 9.44094 10.7898 9.3751 10.624 9.3751H6.10995L3.7537 2.50947L3.74902 2.5001L16.874 9.98681L3.74902 17.5001Z" fill="white" />
                                            </svg>
                                        </button>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-xl-4 col-sm-12  '>
                            <div className='part-right'>
                                <div className="topdiv">
                                    <div className='tommodimg'>
                                        <img src="\support\righttop.svg" alt="" className='modinerimg' />
                                    </div>
                                    <div className='hadingandbtnn'>
                                        <h6 className='damonholland'>
                                            Damon Holland
                                        </h6>
                                        <button className='btn-commonsss'>
                                            View Profile
                                        </button>
                                    </div>

                                </div>
                                <div className='rightsecdiv  mod_bodydivsec '>
                                    <div className='modfsrflex'>
                                        <div className='fsteft'>
                                            <h6 className='usernnamee'>User Name </h6>
                                            <h6 className='namefullletf'> Eric_Brown123 </h6>
                                        </div>
                                        <div className='fsteftsec'>
                                            <h6 className='usernnamee'>Email Address </h6>
                                            <h6 className='namefullletf'>  eric.brown@gmail.com</h6>
                                        </div>
                                    </div>
                                    <div className='modfsrflex'>
                                        <div className='fsteft'>
                                            <h6 className='usernnamee'>Full Name </h6>
                                            <h6 className='namefullletf'> Eric Brown </h6>
                                        </div>
                                        <div className='fsteftsec'>
                                            <h6 className='usernnamee'>Followers </h6>
                                            <h6 className='namefullletf'> 10k </h6>
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

                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal className='ambmodalmain userlastmodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Send gift


                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M12.0008 13.9008L7.10078 18.8008C6.91745 18.9841 6.68411 19.0758 6.40078 19.0758C6.11745 19.0758 5.88411 18.9841 5.70078 18.8008C5.51745 18.6174 5.42578 18.3841 5.42578 18.1008C5.42578 17.8174 5.51745 17.5841 5.70078 17.4008L10.6008 12.5008L5.70078 7.60078C5.51745 7.41745 5.42578 7.18411 5.42578 6.90078C5.42578 6.61745 5.51745 6.38411 5.70078 6.20078C5.88411 6.01745 6.11745 5.92578 6.40078 5.92578C6.68411 5.92578 6.91745 6.01745 7.10078 6.20078L12.0008 11.1008L16.9008 6.20078C17.0841 6.01745 17.3174 5.92578 17.6008 5.92578C17.8841 5.92578 18.1174 6.01745 18.3008 6.20078C18.4841 6.38411 18.5758 6.61745 18.5758 6.90078C18.5758 7.18411 18.4841 7.41745 18.3008 7.60078L13.4008 12.5008L18.3008 17.4008C18.4841 17.5841 18.5758 17.8174 18.5758 18.1008C18.5758 18.3841 18.4841 18.6174 18.3008 18.8008C18.1174 18.9841 17.8841 19.0758 17.6008 19.0758C17.3174 19.0758 17.0841 18.9841 16.9008 18.8008L12.0008 13.9008Z" fill="white" />
                        </svg>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='userlastmod'>
                    <div className='fstdivmod'>
                        <label className='fstlabble'>
                            Choose Gift
                            <div className="dropdown amer_dropdonfstssttss">
                                <button className="btn  dropdown-toggle maindrpdbtnss" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Pending
                                </button>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item dropitmes " href="#">Pending</a>
                                    <a className="dropdown-item dropitmes " href="#">Processing</a>
                                    <a className="dropdown-item dropitmes " href="#">Completed</a>
                                </div>
                            </div>

                        </label>
                    </div>
                    <div className='fstdivmod my-4'>
                        <label className='fstlabble'>
                            Send Message
                            <textarea type="text" name="description" className='form-control  inercallusertextarea' placeholder="Enter description of the video" rows="5"></textarea>

                        </label>
                    </div>

                    <div className='userlastmodxxxx'>
                        <button className='xxxanceldddss'>
                            Cancel
                        </button>
                        <button className='ccancafssadasdsdel'>
                            Send
                        </button>
                    </div>


                </Modal.Body>

            </Modal> */}
        </>
    )
}

export default Supporticketdetail
