
import React, { useState } from "react";
import './games.scss';
import axios from "axios";
// reactstrap components
import { Link } from "react-router-dom";
const AddGames=()=> {
    const [myFiles, setMyFiles] = useState([]);
    const [myThumb, setMyThumb] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [TitleError, setTitleError] = useState({});
    const [DescError, setDescError] = useState({});
    const [ThumbError, setThumbError] = useState({});
    const [RewError, setRewError] = useState({});
    const [VideoError, setVideoError] = useState({});
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        link: '',
        page: '',
        category: '',
        reward: '',
        video: ''
    })

    const formValidation = () => {
        const titleError = {};
        const descError = {};
        const thumError = {};
        const rewError = {};
        const vidError = {};

        let isValid = true;


        if (title === '') {
            titleError.emailError = "Title is Required";
            isValid = false;
        }
        if (description === '') {
            descError.logoError = "Description is Required";
            isValid = false;
        }
        if (myThumb === '') {
            thumError.logoError = "Thumbnail is Required";
            isValid = false;
        }
        if (reward === '') {
            rewError.logoError = "Reward is Required";
            isValid = false;
        }
        if (myFiles === '') {
            vidError.logoError = "Game is Required";
            isValid = false;
        }

        // if(messageInputData.)
        setTitleError(titleError)
        setDescError(descError)
        setThumbError(thumError)
        setRewError(rewError)
        setVideoError(vidError)
        return isValid;
    }
    console.log("videeooo", VideoError)

    const { title, description, category, reward, link, thumbnail, page, video } = inputs;

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const handleChangeCHeckbox = (e) => {
        console.log("e.target", e.target.value)
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, category: value }));
    }

    // function handleChange(event) {
    //     setMyFiles(event.target.files);
    // }

    function handleChangeThumb(event) {
        setMyThumb(event.target.files[0]);
    }

    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    // console.log("filesssss:::",myFiles[0].FileList.webkitRelativePath)

    const handleChange = (evt) => {
        setMyFiles(evt.target.files);
    }

    const sendGames = (event) => {
        let productimages = [];
        event.preventDefault()
        setSubmitted(true);
        formValidation()
        const data = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
            let toPush = { ...myFiles[i] }
            toPush.name = myFiles[i].webkitRelativePath
            productimages.push(toPush);
        }

        // productimages.forEach(file=>{
        //     data.append("game", file);
        //   });

        data.append("game", productimages)
        data.append("thumbnail", myThumb)
        data.append("reward", inputs.reward)
        data.append("name", inputs.title)
        data.append("description", inputs.description)
        data.append("category", inputs.category)
        // data.append("VideoCategoryId", state)
        if (title && description && myThumb && category) {
            axios.post("http://192.168.18.46:3000/game/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    console.log(response)
                    // setOpen(true)
                })
        }

    }

    return (
        <>
            <div className="content">
                <section className="daily card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Game Title</label>
                                                    <input type="text" name="title" value={title} onChange={handleChange1} className={'form-control' + (submitted && !title ? ' is-invalid' : '')} placeholder="Enter title of the game" />
                                                    {Object.keys(TitleError).map((key) => {
                                                        return <p className="inputErrors">{TitleError[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Description</label>
                                                    <textarea name="description" value={description} onChange={handleChange1} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} placeholder="Enter description of the game" rows="5"></textarea>
                                                    {Object.keys(DescError).map((key) => {
                                                        return <p className="inputErrors">{DescError[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Thumbnail</label>
                                                    <div className="main-image-div">
                                                        {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                        <div className="choose-filessss">
                                                            {/* <p>Drag & drop or <span></span></p> */}
                                                            <form>
                                                                <input type="file" name="thumbnail" value={thumbnail} className={'form-control' + (submitted && !myThumb ? ' is-invalid' : '')} onChange={handleChangeThumb} />
                                                                {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                                {/* {myFiles[0]} */}
                                                                {myThumb?.name}
                                                                {Object.keys(ThumbError).map((key) => {
                                                                    return <p className="inputErrors">{ThumbError[key]}</p>
                                                                })}
                                                            </form>

                                                        </div>
                                                        {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                        {/* {selectedImg?renderPhotos(selectedImg):null} */}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group choose-category">
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Choose Category
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="category" value={'Play to Earn'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Play to Earn
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="category" value={'Daily Challenge'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Daily Challenge
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="category" value={'Daily Challenge Upcoming'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Daily Challenge Upcoming
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="category" value={'Future Coming'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Future Coming
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group rewardsss">
                                                <label for="example">Reward</label>
                                                <input type="text" name="reward" value={reward} onChange={handleChange1} className={'form-control' + (submitted && !reward ? ' is-invalid' : '')} placeholder="Game Reward" />
                                                {Object.keys(RewError).map((key) => {
                                                    return <p className="inputErrors">{RewError[key]}</p>
                                                })}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group choose-category">
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Daily Challenge Reward
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <div class="form-group rewardsss">
                                                <label for="example">1st Position</label>
                                                <input type="text" name="reward" value={reward} onChange={handleChange1} className={'form-control' + (submitted && !reward ? ' is-invalid' : '')} placeholder="Game Reward" />
                                                {Object.keys(RewError).map((key) => {
                                                    return <p className="inputErrors">{RewError[key]}</p>
                                                })}
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <div class="form-group rewardsss">
                                                <label for="example">2nd Position</label>
                                                <input type="text" name="reward" value={reward} onChange={handleChange1} className={'form-control' + (submitted && !reward ? ' is-invalid' : '')} placeholder="Game Reward" />
                                                {Object.keys(RewError).map((key) => {
                                                    return <p className="inputErrors">{RewError[key]}</p>
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div class="form-group rewardsss">
                                                <label for="example">3rd Position</label>
                                                <input type="text" name="reward" value={reward} onChange={handleChange1} className={'form-control' + (submitted && !reward ? ' is-invalid' : '')} placeholder="Game Reward" />
                                                {Object.keys(RewError).map((key) => {
                                                    return <p className="inputErrors">{RewError[key]}</p>
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    <button className="red-b" onClick={sendGames} >Publish</button>
                                                    <button className="red-w">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Upload Games</label>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}
                                                    <form>
                                                        <input type="file" multiple name="file" directory="" webkitdirectory="" className={'form-control'} onChange={handleChange} />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                        {/* {myFiles[0]} */}
                                                    </form>
                                                </div>
                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                {/* {selectedImg?renderPhotos(selectedImg):null} */}
                                            </div>

                                        </div>
                                        {Object.keys(VideoError).map((key) => {
                                            return <p className="inputErrors">{VideoError[key]}</p>
                                        })}
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

export default AddGames;
