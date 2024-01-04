
import React, {  useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import './rewardlea.scss';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";
// reactstrap components
function ThisWeekRewForm() {
    const [selectedImg, setSelectedImg] = useState();
    const [myFiles, setMyFiles] = useState({});
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('mytoken')

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const [inputs, setInputs] = useState({
        rewards: '',
        description: '',
    })
    const { rewards, description } = inputs;

    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

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

    const sendVideo = async (event) => {
        event.preventDefault()
        setOpen(true)
        setSubmitted(true)
        const data = new FormData();
        data.append("image", myFiles)
        data.append("name", inputs.rewards)
        data.append("description", inputs.description)

        if(myFiles && inputs.rewards && inputs.description){
            axios.post(Environment.backendUrl + "/reward/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                setInputs({
                    rewards: '',
                    description: '',
                })
                setSelectedImg('')
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        }else{
            setOpen(false)
            toast.error("Field cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }
      
    }

    return (
        <>
        <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
            <section className="addtask card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Reward</label>
                                                <input type="text" name="rewards" value={rewards} onChange={handleChange1} className={'form-control' + (submitted && !rewards ? ' is-invalid' : '')} placeholder="Enter title of the banner" />
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                        <div className="col-12 ">
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Reward Description</label>
                                                <textarea name="description" value={description} onChange={handleChange1} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} placeholder="Enter description of the banner" rows="5"></textarea>
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
                                                <button className="red-b" onClick={sendVideo}>Publish</button>
                                                <Link to="/admin/thisweekreward">  <button className="red-w">Cancel</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Reward Image</label>
                                        <div className="dashed-border-new">
                                        <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                    {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}
                                                    <form>  <input type="file" name="image" accept="image/*" className={'form-control'} onChange={handleFileSelect} />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                        {/* {myFiles[0]} */}
                                                    </form>

                                                </div>

                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                {/* {selectedImg?renderPhotos(selectedImg):null} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ToastContainer style={{ fontSize: 20 }} />
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default ThisWeekRewForm;
