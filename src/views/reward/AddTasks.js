import React, { useRef, useState, useEffect } from "react";
import './rewardlea.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
import { Link } from "react-router-dom";
const AddTask = (props) => {
    const [selectedImg, setSelectedImg] = useState();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [myFiles, setMyFiles] = useState();
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('mytoken')
    const id = props.match.params.id;

    console.log("id", id)

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        link: '',
        featured: false,
    })
    const { name, description, link } = inputs;

    const handleFileSelect = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles(file)
    }
    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }

    const handleChangeCHeckbox = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, featured: value }));
    }
    console.log("inputssssss", inputs)

    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const getTask = () => {
        setOpen(true)
        if (id) {
            axios.get(Environment.backendUrl + `/task/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setInputs(response.data.task)
                    setSelectedImg(response.data.task.image)
                    if (response.data.task.featured) {
                        window.$('#customSwitches').prop("checked", true)
                    }
                    setOpen(false)

                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else { setOpen(false) }

    }


    const AddTask = async (event) => {
        setOpen(true)
        event.preventDefault()
        setSubmitted(true)
        const data = new FormData();
        data.append("image", myFiles)
        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("link", inputs.link)
        data.append("featured", inputs.featured)

        if (myFiles && inputs.name && inputs.description && inputs.featured) {
            axios.post(Environment.backendUrl + "/task/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response?.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        title: '',
                        description: '',
                        task: false
                    })
                    // setOpen(true)
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Field cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }

    }
    console.log("asdfasdf", inputs.featured)
    const EditTask = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (myFiles) {
            data.append("image", myFiles)
        }
        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("featured", inputs.featured)
        data.append("link", inputs.link)
        data.append("id", id)

        if (inputs.name && inputs.description) {
            axios.post(Environment.backendUrl + "/task/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response?.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        title: '',
                        description: '',
                        task: false
                    })
                    setSelectedImg('')
                    history.push('/admin/task')
                    // setOpen(true)
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Field cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }

    }

    useEffect(() => {
        getTask()

    }, [])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addtask card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1 ">
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Task Title</label>
                                                <input type="text" name="name" value={name} onChange={handleChange1} className={'form-control' + (submitted && !name ? ' is-invalid' : '')} placeholder="Enter title of the reward" />
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                        <div className="col-12 ">
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Task Description</label>
                                                <textarea name="description" value={description} onChange={handleChange1} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} placeholder="Enter description of the reward" rows="5"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                        <div className=" col-12">
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Rewards</label>
                                                <input type="text" name="link" value={link} onChange={handleChange1} className={'form-control' + (submitted && !link ? ' is-invalid' : '')} placeholder="Enter reward" />
                                                {/* {Object.keys(linkError).map((key) => {
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{linkError[key]}</p>
                                                    })} */}
                                            </div>
                                        </div>
                                        <div className="radioouterdiv">
                                            <div className="col-4 ">
                                                <div class="form-group">
                                                    <div className="main-switch">
                                                        <label class="switch">
                                                            <input type="checkbox" defaultChecked={inputs.featured} class="custom-control-input" id="customSwitches" onClick={handleChangeCHeckbox} />
                                                            <span class="slider round">  <h5>Featured Task</h5></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 ">
                                                <div class="form-group">
                                                    <div className="main-switch">
                                                        <label class="switch">
                                                            <input type="checkbox" defaultChecked={inputs.featured} class="custom-control-input" id="customSwitches" onClick={handleChangeCHeckbox} />
                                                            <span class="slider round">  <h5>Require Proof</h5></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div class="form-group">
                                            <div className="videopage">
                                                {id ? <button className="red-b" onClick={EditTask}>Save</button> : <button className="red-b" onClick={AddTask}>Publish</button>}
                                                <Link to="/admin/task">
                                                    <button className="red-w">Cancel</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Upload Task Image</label>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                                                    <path d="M47.6633 52.6928H37.804H35.1492H34.5758V39.4682H38.9009C39.9978 39.4682 40.6459 38.2218 39.9978 37.3244L31.5844 25.6828C31.0484 24.9349 29.9391 24.9349 29.4031 25.6828L20.9898 37.3244C20.3416 38.2218 20.9773 39.4682 22.0866 39.4682H26.4117V52.6928H25.8384H23.1835H11.7538C5.21005 52.3313 0 46.2114 0 39.5804C0 35.006 2.48038 31.0175 6.15734 28.8612C5.8208 27.9513 5.6463 26.9791 5.6463 25.957C5.6463 21.2829 9.42297 17.5062 14.0971 17.5062C15.1067 17.5062 16.0789 17.6807 16.9888 18.0173C19.6935 12.2837 25.5268 8.30762 32.3073 8.30762C41.0821 8.32008 48.3114 15.0383 49.134 23.6012C55.8772 24.7604 61 31.005 61 38.0722C61 45.6256 55.1169 52.1693 47.6633 52.6928Z" fill="#EDEDEE" />
                                                </svg>
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    <p>Drag & drop or <span> Browse</span></p>

                                                    <form>  <input type="file" name="image" accept="image/*" className={'form-control d-none'} onChange={handleFileSelect} />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                        {/* {myFiles[0]} */}
                                                    </form>

                                                </div>

                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}

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

export default AddTask;
