import React, { useState, useEffect } from "react";
import './banner.scss';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Chain from "./bannerarray";
import { Link } from "react-router-dom";
// reactstrap components
const Addbanners = (props) => {
    const [selectedImg, setSelectedImg] = useState();
    const [myFiles, setMyFiles] = useState('');
    const [selectedImg2, setSelectedImg2] = useState();
    const [myFiles2, setMyFiles2] = useState('');
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [TitleError, setTitleError] = useState({});
    const [DescError, setDescError] = useState({});
    const [pageError, setPageError] = useState({});
    const [linkError, setLinkError] = useState({});
    const [imageError, setImageError] = useState({});
    const [catError, setCatError] = useState({});
    const [typError, setTypError] = useState({});
    // const [pageData, setPageData] = useState([]);
    const [chain, setchain] = useState('Choose Page')
    const id = props.match.params.id;
    console.log("iddd", id)
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        routeLink: '',
        routePage: '',
        category: '',
        type: '',
        image: '',
        image2: '',
    })
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList,];
    //     list[index][name] = value;
    //     setInputList(list);

    // };


    const formValidation = () => {
        const titleError = {};
        const descError = {};
        const pageError = {};
        const linkError = {};
        const imageError = {};
        const catError = {};
        const typwError = {};

        let isValid = true;

        if (name === '') {
            titleError.emailError = "Title is Required";
            isValid = false;
        }
        if (description === '') {
            descError.logoError = "Description is Required";
            isValid = false;
        }
        if (page === '') {
            pageError.logoError = "Page is Required";
            isValid = false;
        }
        if (link === '') {
            linkError.logoError = "Link or page is Required";
            isValid = false;
        }
        if (myFiles === '') {
            imageError.logoError = "Image is Required";
            isValid = false;
        }
        if (category === '') {
            catError.logoError = "category is Required";
            isValid = false;
        }
        if (type === '') {
            typwError.logoError = "type is Required";
            isValid = false;
        }

        // if(messageInputData.)
        setTitleError(titleError)
        setDescError(descError)
        setPageError(pageError)
        setLinkError(linkError)
        setImageError(imageError)
        setCatError(catError)
        setTypError(typwError)
        return isValid;
    }

    const { name, description, category, link, type, page } = inputs;

    const handleFileSelect = (evt) => {
        if (evt.target.files) {
            let filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        let files = evt.target.files;
        let file = files[0];
        setMyFiles(file)
    }
    const handleFileSelect2 = (evt) => {
        if (evt.target.files) {
            let filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg2(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        const files = evt.target.files;
        const file = files[0];
        setMyFiles2(file)
    }

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }
    const renderPhotos2 = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }
    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    console.log("inputsssss", inputs)

    const handleChangeCHeckbox = (e) => {
        console.log("e.target", e.target.value)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, category: value }));
    }

    const handleChangeCHeckbox1 = (e) => {
        console.log("e.target", e.target.value)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, type: value }));
    }

    const addBanner = async (event) => {
        setOpen(true)
        event.preventDefault()
        formValidation()
        const data = new FormData();
        data.append("image", myFiles)
        if (inputs.category === 'news' || inputs.category === 'game') {

        } else {
            data.append("iconImage", myFiles2)
        }

        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("routeLink", inputs.routeLink)
        data.append("category", inputs.category)
        data.append("routePage", chain)
        data.append("type", inputs.type)

        if (myFiles != '' && inputs.name != '' && inputs.description != '' && inputs.category != '') {
            axios.post(Environment.backendUrl + "/banner/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        name: '',
                        description: '',
                        routeLink: '',
                        routePage: '',
                        category: '',
                        type: '',
                        image: ''
                    })
                    setSelectedImg('');
                    // window.location.assign('/admin/newsbanner')
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


    const editBanner = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (myFiles) {
            data.append("image", myFiles)
        }
        if (myFiles2) {
            data.append("iconImage", myFiles2)
        }
        console.log('firstlsafjlsd', myFiles, myFiles2)


        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("routeLink", inputs.routeLink)
        data.append("category", inputs.category)
        data.append("routePage", chain)
        data.append("type", inputs.type)
        data.append("id", id)
        axios.post(Environment.backendUrl + "/banner/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                // setInputs({
                //     name: '',
                //     description: '',
                //     routeLink: '',
                //     routePage: '',
                //     category: '',
                //     type: '',
                //     image: ''
                // })
                // setSelectedImg('');
                // window.location.assign('/admin/newsbanner')
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


    const getBanner = () => {

        setOpen(true)
        if (id) {
            axios.get(Environment.backendUrl + "/banner/find/" + id, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    console.log('first', response.data.banner)
                    setInputs(response.data.banner)
                    setchain(response.data.banner.routePage)
                    setSelectedImg(response.data.banner.image)
                    setSelectedImg2(response.data.banner.iconImage)
                    if (response.data.banner.category == 'game') {
                        window.$('#recom').attr("checked", "checked")
                    } else if (response.data.banner.category == 'news') {
                        window.$('#recom2').attr("checked", "checked")
                    } else if (response.data.banner.category == 'arcadia') {
                        window.$('#recom3').attr("checked", "checked")
                    } else if (response.data.banner.category == 'playToEarn') {
                        window.$('#recom4').attr("checked", "checked")
                    } else if (response.data.banner.category == 'Empower') {
                        window.$('#recom5').attr("checked", "checked")
                    } else if (response.data.banner.category == 'voteForGames') {
                        window.$('#recom6').attr("checked", "checked")
                    } else if (response.data.banner.category == 'leaderBoards') {
                        window.$('#recom7').attr("checked", "checked")
                    } else if (response.data.banner.category == 'multiPlayers') {
                        window.$('#recom8').attr("checked", "checked")
                    } else if (response.data.banner.category == 'dailyChallenge') {
                        window.$('#recom9').attr("checked", "checked")
                    } else if (response.data.banner.category == 'boltStore') {
                        window.$('#recom10').attr("checked", "checked")
                    }
                    if (response.data.banner.type == 'web') {
                        window.$('#screen1').attr("checked", "checked")
                    } else if (response.data.banner.type == 'mobile') {
                        window.$('#screen2').attr("checked", "checked")
                    }
                    setOpen(false)

                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else { }
    }

    useEffect(() => {

        if (id) {
            getBanner()
        }

    }, [])
    useEffect(() => {
        var val = window.location.href;
        val = new URL(val);
        // var name = val.searchParams.get("name").toUpperCase();
        console.log('gggggggg', val?.pathname?.split('/')[3])
        let parValue = val?.pathname?.split('/')[3]
        if (parValue === 'news' || parValue === 'game') {
            setInputs(inputs => ({ ...inputs, category: parValue }));
        }

    }, []);
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addbanner12345 card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Banner Title</label>
                                                    <input type="text" name="name" value={id ? inputs.name : name} onChange={handleChange1} className={'form-control' + (submitted && !name ? ' is-invalid' : '')} placeholder="Enter title of the game" />
                                                    {Object.keys(TitleError).map((key) => {
                                                        return <p className="inputErrors">{TitleError[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example"> Description</label>
                                                    <textarea name="description" value={id ? inputs.description : description} onChange={handleChange1} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} placeholder="Enter description of the game" rows="5"></textarea>
                                                    {Object.keys(DescError).map((key) => {
                                                        return <p className="inputErrors">{DescError[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                            {(inputs.category != 'news' && inputs.category != 'game') &&
                                                <div className="col-12 ">
                                                    <div class="form-group">
                                                        <label for="example">Category</label>
                                                        <input type="text" name="category" value={id ? inputs.category : category} onChange={handleChange1} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} placeholder="Enter title of the game" />
                                                        {Object.keys(TitleError).map((key) => {
                                                            return <p className="inputErrors">{TitleError[key]}</p>
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-md-12 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Choose Banner Link</label>
                                                    <input type="text" name="routeLink" value={id ? inputs.routeLink : link} onChange={handleChange1} className={'form-control' + (submitted && !link ? ' is-invalid' : '')} placeholder="Enter link" />
                                                    {/* {Object.keys(linkError).map((key) => {
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{linkError[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                            <div className="col col-12">

                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Choose Banner Page</label>
                                                    <div className="dropdown buttons-list-all cshbshjbvch">
                                                        <button disabled={inputs.category != 'news' && inputs.category != 'game'} className="button-listing" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <p>{inputs.category || chain}</p>
                                                            <i class=""><svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                                            <path d="M8.33877 0.428711H4.52466H1.09013C0.502402 0.428711 0.208538 1.20931 0.624845 1.6669L3.79613 5.15267C4.30427 5.7112 5.13076 5.7112 5.6389 5.15267L6.84496 3.827L8.81018 1.6669C9.22036 1.20931 8.9265 0.428711 8.33877 0.428711Z" fill="#3654D6" />
                                                        </svg></i>
                                                        </button>

                                                        <div className="dropdown-menu zscscsac" aria-labelledby="dropdownMenuButton">
                                                            {Chain.map((elem) => {
                                                                return (
                                                                    <a className="dropdown-item" onClick={() => setchain(elem.item)}>{elem.item}</a>
                                                                )
                                                            }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* } */}
                                            {/* {(inputs.category != 'news' && inputs.category != 'game') || */}

                                        </div>
                                        {/* {id ?
                                            (id && (inputs.category != 'news' && inputs.category != 'game') || */}
                                        {/* {id ?
                                            (id && (inputs.category != 'news' && inputs.category != 'game') || */}
                                        {/* <div className="row "> */}
                                        {/* <div className="col-12">
                                                        <div class="form-group choose-category">
                                                            <label class="form-check-label" for="category">
                                                                Choose Category
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div div className=" col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input class="form-check-input" id='recom2' type="radio" name="category" value={'news'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                News Banner
                                                            </label>
                                                            {Object.keys(catError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{catError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom" class="form-check-input" type="radio" name="category" value={'game'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Game Banner
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom3" class="form-check-input" type="radio" name="category" value={'arcadia'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Arcadia
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom4" class="form-check-input" type="radio" name="category" value={'playToEarn'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Play To Earn
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom5" class="form-check-input" type="radio" name="category" value={'Empower'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Empower
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom6" class="form-check-input" type="radio" name="category" value={'voteForGames'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Vote For Games
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom7" class="form-check-input" type="radio" name="category" value={'leaderBoards'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Leaderboards
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom8" class="form-check-input" type="radio" name="category" value={'multiPlayers'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Multiplayers
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom9" class="form-check-input" type="radio" name="category" value={'dailyChallenge'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Daily Challenge
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div class="form-check">
                                                            <input id="recom10" class="form-check-input" type="radio" name="category" value={'boltStore'} onChange={handleChangeCHeckbox} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                            <label class="form-check-label" for="category">
                                                                Bolt Store
                                                            </label>
                                                            {Object.keys(pageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{pageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div> */}
                                        {/* {(inputs.category != 'news' && inputs.category != 'game') || */}
                                        {/* } */}
                                        {/* {(inputs.category != 'news' && inputs.category != 'game') || */}
                                        {/* } */}
                                        {/* </div> */}
                                        {/* )
                                            : ''
                                        } */}
                                        {/* {(inputs.category != 'news' && inputs.category != 'game') ||
                                            <div className="row">
                                                <div className="col-12">
                                                    <div class="form-group choose-category">
                                                        <label class="form-check-label" for="type">
                                                            Choose Type
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className=" col-md-6 col-12">
                                                    <div class="form-check">
                                                        <input disabled={inputs.category != 'news' && inputs.category != 'game'} id="screen1" class="form-check-input" type="radio" name="type" value={'web'} onChange={handleChangeCHeckbox1} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                        <label class="form-check-label" for="type">
                                                            Web
                                                        </label>
                                                        {Object.keys(typError).map((key) => {
                                                            console.log("key", key);
                                                            return <p className="inputErrors">{typError[key]}</p>
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div class="form-check">
                                                        <input disabled={inputs.category != 'news' && inputs.category != 'game'} class="form-check-input" id='screen2' type="radio" name="type" value={'mobile'} onChange={handleChangeCHeckbox1} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} />
                                                        <label class="form-check-label" for="type">
                                                            Mobile
                                                        </label>
                                                        {Object.keys(typError).map((key) => {
                                                            console.log("key", key);
                                                            return <p className="inputErrors">{typError[key]}</p>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        } */}
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editBanner}>Save</button> : <button className="red-b" onClick={addBanner}>Publish</button>}
                                                    {/* <button className="red-b" onClick={sendVideo}>Publish</button> */}
                                                    <Link to="/admin/dashboard">
                                                        <button className="red-w">Cancel</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Upload Banner</label>
                                        <p className="nnnnhhew ">
                                            Image size: 670x326
                                        </p>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}

                                                    <form>
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
                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                            </div>
                                        </div>
                                        {Object.keys(imageError).map((key) => {
                                            console.log("key", key);
                                            return <p className="inputErrors">{imageError[key]}</p>
                                        })}
                                    </div>
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Icon</label>

                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}

                                                    <form>
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
                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                            </div>
                                        </div>
                                        {Object.keys(imageError).map((key) => {
                                            console.log("key", key);
                                            return <p className="inputErrors">{imageError[key]}</p>
                                        })}
                                    </div>
                           
                                </div>
                            </div>
                        </div>
                        <ToastContainer style={{ fontSize: 20 }} />
                    </form>
                </section>
            </div>
        </>
    );
}

export default Addbanners;
