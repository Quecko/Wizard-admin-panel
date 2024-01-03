
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import './badges.scss';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
// reactstrap components
function PushBadges(props) {
    const id = props.match.params.id;
    console.log("asdkfasdfasd", id)
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const history = useHistory();
    const [state, setState] = useState(0);
    const [selectedImg, setSelectedImg] = useState();
    const [selectedImg2, setSelectedImg2] = useState();
    const [myFiles, setMyFiles] = useState({});
    const [myFiles2, setMyFiles2] = useState({});
    const [myFiles1, setMyFiles1] = useState();
    const [myFiles12, setMyFiles12] = useState();
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        type: ''
    })
    const { name, description, type } = inputs;


    console.log("fielee", myFiles1)
    const handleChange1 = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleCategory = (event) => {
        console.log("events", event.target.value)
        setInputs(inputs => ({ ...inputs, type: event.target.value }));

    }
    // console.log("newchn",id, inputs, selectedImg)

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }
    const renderPhotos2 = (source) => {
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
        if (id) {
            setMyFiles1(file)
        }
    }
    const handleFileSelect2 = (evt) => {
        console.log("sfsdfsdsdfsdfsd", evt)
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg2(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles2(file)
        if (id) {
            setMyFiles12(file)
        }
    }
    const FIndBadge = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/badges/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setInputs(response.data.badges)
                setSelectedImg(response.data.badges.image)
                setSelectedImg2(response.data.badges.sharedImage)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const AddBadges = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("image", myFiles)
        data.append("sharedImage", myFiles2)
        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("type", inputs.type)
        setOpen(true)
        if (myFiles && name && description !== '') {
            axios.post(Environment.backendUrl + '/badges/add', data, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    setTimeout(() => {
                        toast.success(response.data.msg, {
                            position: "top-center",
                            autoClose: 1000,
                        });
                    }, 1000);

                    setInputs({
                        name: '',
                        description: '',
                        Type: '',
                    })
                    setSelectedImg('')
                    setMyFiles('')
                    history.push('/admin/badges')
                    // setOpen(true)
                }).catch((err) => {
                    setOpen(false)
                    toast.error("Badge Not Created", {
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

    const editBadge = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (myFiles1) {
            data.append("image", myFiles1)
        }
        if (myFiles12) {
            data.append("sharedImage", myFiles12)
        }
        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("type", inputs.type)
        data.append("id", id)
        axios.post(Environment.backendUrl + "/badges/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                setTimeout(() => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }, 1000);

                setInputs({
                    name: '',
                    description: '',
                    type: '',
                })
                setSelectedImg('')
                setMyFiles('')
                history.push('/admin/badges')
                // console.log(response)
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const cancel = () => {
        history.push('/admin/badges')
    }

    useEffect(() => {
        if (id) {
            FIndBadge()
        }
    }, [id])

    // const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addbanner1234 send-notifications card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-7  col-sm-12 order-md-0 order-1">
                                    <div className="bbadges_flex">

                                        <div class="form-group rightside-for-group">
                                            <label for="exampleInputsymbol">Badge Image</label>
                                            <div className="dashed-border-new">
                                                <div className="main-image-div text-center">
                                                    {selectedImg ? renderPhotos(selectedImg) : null}
                                                    <div className="choose-filessss">
                                                        <p className='draganddrop'>Drag & drop or <span className='common'>Browse</span></p>
                                                        <form action="" className="style-actionn">
                                                            <input type="file" className="custom-file-inputt" accept="video/*" id="myFile" name="filename" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group rightside-for-group">
                                            <label for="exampleInputsymbol"> Badge Banner Image</label>
                                            <div className="dashed-border-new">
                                                <div className="main-image-div text-center">
                                                    {selectedImg2 ? renderPhotos2(selectedImg2) : null}
                                                    <div className="choose-filessss">
                                                        <p className='draganddrop'>Drag & drop or <span className='common'>Browse</span></p>
                                                        <form action="" className="style-actionn">
                                                            <input type="file" className="custom-file-inputt" accept="video/*" id="myFile" name="filename" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 main-send-message">
                                            {/* <h3>Add Badges</h3> */}
                                            <div class="form-group">
                                                {console.log("injsxxx", inputs)}
                                                <label className="padd-top" for="example">Name</label>
                                                <textarea class="form-control" name="name" value={inputs?.name} onChange={handleChange1} id="exampleFormControlTextarea1" placeholder="Title" rows="2"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Type</label>
                                                <div class="dropdown">
                                                    <FormControl variant="outlined" className="styleeee">
                                                        <Select
                                                            native
                                                            onChange={handleCategory}
                                                            value={inputs?.type}
                                                            inputProps={{
                                                                state
                                                            }}
                                                        >
                                                            <option className="main-boot" >Select Course</option>
                                                            <option className="main-boot" >Legion App</option>
                                                            <option className="main-boot" >Launch Pad</option>
                                                            <option className="main-boot" >Arcadia</option>
                                                            <option className="main-boot" >Empower</option>
                                                            <option className="main-boot" >Rewards</option>
                                                            {/* {categoryData} */}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Description</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" name="description" value={inputs?.description} onChange={handleChange1} placeholder="Your message" rows="5"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div class="form-group">
                                            <div className="videopage">
                                                {id ? <button className="red-b" onClick={editBadge}>Edit</button> : <button className="red-b" onClick={AddBadges}>Publish</button>}
                                                <Link to="/admin/notification">
                                                    <button className="red-w mt-3 mt-sm-0" onClick={cancel}>Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <ToastContainer style={{ fontSize: 20 }} />
                                </div>
                                <div className="col-md-5 order-md-1 order-0">

                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default PushBadges;
