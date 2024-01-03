
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import './notification.scss';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Dropdown } from "reactstrap";
// reactstrap components
function PushNotification() {

    // function importAll(r) {
    //     let images = {};
    //     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    //     return images;
    // }
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const history = useHistory();
    const [selectedImg, setSelectedImg] = useState();
    const [myFiles, setMyFiles] = useState({});
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        message: '',
        link1: '',
        link2: '',
    })
    const { title, description, message, link1, link2 } = inputs;

    console.log('inputs', inputs)

    const handleChange1 = (e) => {
        console.log("event", e)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, title: value }));
    }
    const handleChange3 = (e) => {
        console.log("event", e)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, link1: value }));
    }
    const handleChange4 = (e) => {
        console.log("event", e)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, link2: value }));
    }
    console.log("newchn", inputs)
    const handleChange2 = (e) => {
        console.log("event", e)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, message: value }));
    }

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }

    const handleFileSelect = (evt) => {
        console.log("sfsdfsdsdfsdfsd", evt)
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles(file)
    }

    const handleChangeCHeckbox = (e) => {
        console.log("e.target", e.target.value)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, description: value }));
    }

    console.log("img", myFiles)

    const SendNotification = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("image", myFiles)
        data.append("title", inputs.title)
        data.append("description", inputs.message)
        data.append("link1", inputs.link1)
        data.append("link2", inputs.link2)
        setOpen(true)
        const platform = {

            all: Environment.backendUrl + "/notification/sendToAll",
            andriod: Environment.backendUrl + "/notification/sendToAndroid",
            ios: Environment.backendUrl + "/notification/sendToIos",

        }
        let url
        if (inputs.description === 'All') {
            url = platform.all
        } else if (inputs.description === 'Android Only') {
            url = platform.andriod
        } else {
            url = platform.ios
        }
        if (myFiles && title && description !== '') {
            axios.post(url, data, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    setTimeout(() => {
                        toast.success(response.data.msg, {
                            position: "top-center",
                            autoClose: 2000,
                        });
                    }, 3000);

                    setInputs({
                        title: '',
                        description: '',
                        message: '',
                        link1: '',
                        link2: '',
                    })
                    setSelectedImg('')
                    history.push('/admin/notification')
                    // setOpen(true)
                }).catch((err) => {
                    setOpen(false)
                    toast.error("notification not send", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Field Cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }

    }




    // const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addbanner1234 send-notifications card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-7 order-md-0 order-1">
                                    <div className="row">
                                        <div className="col-12 main-send-message">
                                            {/* <h3>Send Manual message</h3> */}
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Title</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" name="title" onChange={handleChange1} placeholder="Title" rows="2"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Link 1</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" name="link1" onChange={handleChange3} placeholder="Enter Link 1" rows="2"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Link 2</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea2" name="link2" onChange={handleChange4} placeholder="Enter Link 2" rows="2"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Message</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" name="message" onChange={handleChange2} placeholder="Your message" rows="5"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-12">

                                            <div class="form-group">
                                                <label className="padd-top" for="example">Send message to</label>
                                                <div className="dropdown buttons-list-all cshbshjbvch">
                                                    <button className="button-listing" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Verified Users
                                                        <i class=""><svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                                            <path d="M8.33877 0.428711H4.52466H1.09013C0.502402 0.428711 0.208538 1.20931 0.624845 1.6669L3.79613 5.15267C4.30427 5.7112 5.13076 5.7112 5.6389 5.15267L6.84496 3.827L8.81018 1.6669C9.22036 1.20931 8.9265 0.428711 8.33877 0.428711Z" fill="#3654D6" />
                                                        </svg></i>
                                                    </button>

                                                    <div className="dropdown-menu zscscsac" aria-labelledby="dropdownMenuButton">
                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group choose-category">
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Send to Platform
                                                </label>
                                            </div>
                                        </div>
                                        <div className=" col-md-4 col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="description" value={'All'} onChange={handleChangeCHeckbox} id="exampleRadios1" />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    All
                                                </label>
                                            </div>
                                        </div>
                                        <div className=" col-md-4 col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="description" value={'Android Only'} onChange={handleChangeCHeckbox} id="exampleRadios1" />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Android Only
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="description" value={'IOS only'} onChange={handleChangeCHeckbox} id="exampleRadios1" />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    IOS only
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div class="form-group">
                                            <div className="videopage">
                                                <button className="red-b" onClick={SendNotification}>Publish</button>
                                                <Link to="/admin/notification">
                                                    <button className="red-w mt-3 mt-sm-0">Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <ToastContainer style={{ fontSize: 20 }} />
                                </div>
                                <div className="col-md-5 order-md-1 order-0">
                                    <div class="form-group mt-4">
                                        <label className="padd-top" for="example">Add Thumbnail</label>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}

                                                    <form className="nsjfhfjaslkfjs">
                                                        <label htmlFor="upload">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                                                                <path d="M47.6633 52.6918H37.804H35.1492H34.5758V39.4672H38.9009C39.9978 39.4672 40.6459 38.2208 39.9978 37.3234L31.5844 25.6818C31.0484 24.9339 29.9391 24.9339 29.4031 25.6818L20.9898 37.3234C20.3416 38.2208 20.9773 39.4672 22.0866 39.4672H26.4117V52.6918H25.8384H23.1835H11.7538C5.21005 52.3303 0 46.2104 0 39.5794C0 35.005 2.48038 31.0165 6.15734 28.8602C5.8208 27.9503 5.6463 26.9781 5.6463 25.956C5.6463 21.2819 9.42297 17.5053 14.0971 17.5053C15.1067 17.5053 16.0789 17.6798 16.9888 18.0163C19.6935 12.2827 25.5268 8.30664 32.3073 8.30664C41.0821 8.3191 48.3114 15.0373 49.134 23.6003C55.8772 24.7594 61 31.004 61 38.0713C61 45.6246 55.1169 52.1683 47.6633 52.6918Z" fill="#EDEDEE" />
                                                            </svg>
                                                            <h6 className="drtuop">
                                                                Drag & Drop or <span className="commonfffr">Browse</span>
                                                            </h6>
                                                        </label>
                                                        <input type="file" name="image" accept="image/*" className={'form-control d-none'} onChange={handleFileSelect} />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                        {myFiles[0]}
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default PushNotification;
