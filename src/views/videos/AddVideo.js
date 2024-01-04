
import React, { useRef, useState, useEffect } from "react";
import './video.scss';
import axios from 'axios';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@material-ui/core/Select';
import ReactPlayer from 'react-player'
import FormControl from '@material-ui/core/FormControl';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const AddVideo=(props)=> {
    const [cate, setCate] = useState([]);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState();
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [state, setState] = useState(0);
    const [myFiles, setMyFiles] = useState();
    const [file, setFile] = useState(null);
    const videoInput = useRef();
    const videoElem = useRef();
    const [inputList, setInputList] = useState([{
        question: '',
        answer: '',
        a: '',
        b: '',
        c: '',
        d: '',
    }])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList,];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, {
            question: '',
            answer: '',
            a: '',
            b: '',
            c: '',
            d: '',
        }]);
    };

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        category: '',
        reward: '',
        Link: '',
        recommended: false,
        duration: '',
        VideoCategoryId: ''
    })

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const id = props.match.params.id;
    console.log("id",id)
    const getVideo = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/video/find/" + id, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                setInputs(response.data.video)
                setSelectedImg(response.data.video.thumbnail)
                if (response.data.video.VideoQuestions.length > 0) {
                    setInputList(response.data.video.VideoQuestions);
                }
                if (response.data.video.recommended)
                    window.$('#recom').attr("checked", "checked")
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }


    var fileInput = document.getElementById('fileInput');
    function handleChange(event) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            var aud = new Audio(reader.result);
            aud.onloadedmetadata = function () {
                setInputs({ ...inputs, duration: aud.duration })
            };
        };
        reader.readAsDataURL(file);
        setFile(videoInput.current.files[0]);
    }

    const handleCategory = (event) => {
        setInputs(inputs => ({ ...inputs, VideoCategoryId: event.target.value }));
        ;
    }

    const handleFileSelect = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg(filesarray[0]);
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles(file)
    }

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }


    const { name, description, reward, video, duration } = inputs;
    const handleChange1 = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleChangeCHeckbox = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, recommended: value }));
    }
    
    const allCategory = () => {
        axios.get(Environment.backendUrl + "/videoCategory/all/admin", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setCate(response.data.categories)
                // setOpen(true)

            }).catch((err) => {
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                return false
            })
    }


    const categoryData = cate.map((elem, index) => {
        return (

            <option className="main-boot" value={elem.id}>{elem.name}</option>
        )

    })



    useEffect(() => {
        allCategory()
        if (id) {
            getVideo()
        }

    }, [])

    const sendVideo = async (event) => {
        event.preventDefault()
        setOpen(true)
        // let thumbnail;

        const data = new FormData();
        // thumbnail = await captureThumbnail()
        data.append("image", file)
        data.append("thumbnail", myFiles)
        data.append("name", inputs.name)
        data.append("reward", inputs.reward)
        data.append("description", inputs.description)
        data.append("recommended", inputs.recommended)
        data.append("duration", inputs.duration)
        data.append("VideoCategoryId", inputs.VideoCategoryId)
        if (inputList[0].question !== '') {
            data.append("questions", JSON.stringify(inputList))
        }
        axios.post(Environment.backendUrl + "/video/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                setTimeout(() => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }, 3000);
                setInputs({
                    name: '',
                    description: '',
                    category: '',
                    reward: '',
                    Link: '',
                    recommended: false,
                    duration: '',
                    VideoCategoryId: ''
                })
                setInputList([...inputList, {
                    question: '',
                    answer: '',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                }]);
                setFile('')
                history.push("/admin/videos")
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const editVideo = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (file) {
            data.append("image", file)
           
        }
        if(myFiles){
            data.append("thumbnail", myFiles)
        }
        data.append("name", inputs.name)
        data.append("reward", inputs.reward)
        data.append("description", inputs.description)
        data.append("recommended", inputs.recommended)
        data.append("duration", inputs.duration)
        data.append("VideoCategoryId", inputs.VideoCategoryId)
        data.append("id", id)
        if (inputList[0].question !== '') {
            data.append("questions", JSON.stringify(inputList))
        }
        axios.post(Environment.backendUrl + "/video/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)

                setInputs({
                    name: '',
                    description: '',
                    category: '',
                    reward: '',
                    Link: '',
                    recommended: false,
                    duration: '',
                    VideoCategoryId: ''
                })
                setInputList([...inputList, {
                    question: '',
                    answer: '',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                }]);
                setFile('')
                history.push("/admin/videos")
                setTimeout(() => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }, 1000);
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-right",
                    autoClose: 2000,
                });
            })
    }

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos addvideo card">
                    <form method="post" enctype="multipart/form-data">
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Video Title</label>
                                                    <input type="text" name="name" value={inputs.name} onChange={handleChange1} className={'form-control' + (submitted && !name ? ' is-invalid' : '')} placeholder="Enter title of the video" />
                                                 
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Video Description</label>
                                                    <textarea type="text" name="description" value={inputs.description} onChange={handleChange1} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} placeholder="Enter description of the video" rows="5"></textarea>
                                          
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Course</label>
                                                    <div class="dropdown">
                                                        <FormControl variant="outlined" className="styleeee">
                                                            <Select
                                                                native
                                                                onChange={handleCategory}
                                                                value={inputs.VideoCategoryId}
                                                                inputProps={{
                                                                    state
                                                                }}
                                                            >
                                                                <option className="main-boot" >Select Course</option>,
                                                                {categoryData}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Reward</label>
                                                    <input type="text" name="reward" value={inputs.reward} onChange={handleChange1} className={'form-control' + (submitted && !reward ? ' is-invalid' : '')} placeholder="Enter reward amount" />
                                                   
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Video Duration</label>
                                                    <input type="number"  onWheel={(e) => e.target.blur()} name="duration" min="0" step="1" pattern="\d+" value={parseInt(inputs.duration).toFixed(0)} onChange={handleChange1} className={'form-control' + (submitted && !duration ? ' is-invalid' : '')} placeholder="Enter video Duration" readOnly />
                                                  
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-12 mb-md-0 mb-5">
                                                <div class="form-group " id="form-group1">
                                                    <label className="padd-top" for="example">Recommended</label>
                                                    <input id="recom" type="Checkbox" name="recommended" value={inputs.recommended} onChange={handleChangeCHeckbox} className='form-control ' />
                                                 
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="App">
                                                    {inputList?.map((x, i) => {
                                                        return (
                                                            <div className="box">
                                                                <hr className="main-line"></hr>
                                                                <div className="row ">
                                                                    <div className="col-sm-12 p-0">
                                                                        <label>Questionaires</label>
                                                                        <div className="form-group">
                                                                            <input
                                                                                name="question"
                                                                                placeholder="Enter your Question"
                                                                                value={x.question}
                                                                                onChange={e => handleInputChange(e, i)}
                                                                            />

                                                                        </div>

                                                                        <label className="mt-3 mb-4">Add Options</label>
                                                                        <div className="row">

                                                                            <div className="col-sm-6 pl-md-0 mb-3">
                                                                                <label>Option 1</label>
                                                                                <input
                                                                                    name="a"
                                                                                    value={x.a}
                                                                                    placeholder="Enter your option"
                                                                                    onChange={e => handleInputChange(e, i)}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 mb-3">
                                                                                <label>Option 2</label>
                                                                                <input
                                                                                    name="b"
                                                                                    value={x.b}
                                                                                    placeholder="Enter your option"
                                                                                    onChange={e => handleInputChange(e, i)}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 pl-md-0 mb-3">
                                                                                <label>Option 3</label>
                                                                                <input
                                                                                    name="c"
                                                                                    value={x.c}
                                                                                    placeholder="Enter your option"
                                                                                    onChange={e => handleInputChange(e, i)}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 mb-3">
                                                                                <label>Option 4</label>
                                                                                <input
                                                                                    name="d"
                                                                                    value={x.d}
                                                                                    placeholder="Enter your option"
                                                                                    onChange={e => handleInputChange(e, i)}
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-6 col-12 pl-md-0">
                                                                                <div class="form-group">
                                                                                    <label className="padd-top" for="example">Choose Correct Answer</label>
                                                                                    <div class="dropdown">
                                                                                        <FormControl variant="outlined" className="styleeee">
                                                                                            <Select
                                                                                                native
                                                                                                name="answer"
                                                                                                onChange={e => handleInputChange(e, i)}
                                                                                                value={x.answer ? x.answer : "Choose Answer"}
                                                                                            // inputProps={{
                                                                                            //     inputList
                                                                                            // }}
                                                                                            >
                                                                                                <option className="main-boot">Choose Answer</option>;
                                                                                                <option className="main-boot" name="a" key="option1" value={x.a}>{x.a}</option>;
                                                                                                <option className="main-boot" name="b" key="option2" value={x.b}>{x.b}</option>;
                                                                                                <option className="main-boot" name="c" key="option3" value={x.c}>{x.c}</option>;
                                                                                                <option className="main-boot" name="d" key="option4" value={x.d}>{x.d}</option>;
                                                                                            </Select>
                                                                                        </FormControl>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                    <div className="col-sm-12 p-0">
                                                                    </div>
                                                                    <hr className="main-line"></hr>
                                                                    <div className="btn-box ">
                                                                        {inputList.length !== 1 && <button
                                                                            className=" button-removess"
                                                                            onClick={() => handleRemoveClick(i)}>Remove</button>}<br></br>
                                                                        {inputList.length - 1 === i && <button className="buttonsss_attri" onClick={handleAddClick}><img src={`${images['addvid1.png']['default']}`} alt="" /> Add Questions</button>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editVideo}>Save</button> : <button className="red-b" onClick={sendVideo}>Publish</button>}
                                                    <Link to="/admin/videos">
                                                        <button className="red-w">Cancel</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* <div class="form-group rightside-for-group">
                                                <label for="exampleInputsymbol">Upload video</label>
                                                <div className="dashed-border-new">
                                                    <div className="main-image-div">
                                                        <div className="choose-filessss">
                                                            <form> <input type="file" id="fileInput" accept="video/*" name="video" ref={videoInput} value={video} className={'form-control' + (submitted && !video ? ' is-invalid' : '')} onChange={handleChange} />
                                                             
                                                                {
                                                                    file ? (
                                                                        <video
                                                                            id="video"
                                                                            className="w-100"
                                                                            ref={videoElem}
                                                                            src={URL.createObjectURL(file)}
                                                                            type="video/mp4"
                                                                            controls
                                                                        > </video>
                                                                    ) : (
                                                                        <ReactPlayer url={inputs.link} width='100%' height='100%' controls />
                                                                    )
                                                                }
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
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
                                        <div class="col-lg-12">
                                            {/* <div class="form-group rightside-for-group">
                                                <label for="exampleInputsymbol">Upload Thumbnail</label>
                                                    <div className="dashed-border-new">
                                                        <div className="main-image-div">
                                                            <div className="choose-filessss">
                                                                <form>   <input type="file" name="image" accept="image/*" className={'form-control'} onChange={handleFileSelect} />
                                                               
                                                                </form>
                                                            </div>
                                                            {selectedImg ? renderPhotos(selectedImg) : null}
                                                        </div>
                                                    </div>
                                            </div> */}
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
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default AddVideo;
