import React, { useState, useCallback, useEffect } from 'react';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Addsociallinks = () => {
    const [open, setOpen] = useState(false);
    const [socialIdState, setSocialIdState] = useState(null)
    const [localImg, setLocalImg]=useState()
    const { history } = useHistory()
    const [allData, setAllFormDtata] = useState({
        form: {
            bodyText: '',
            heading: '',
            link1Name: '',
            link1Url: '',
            image: ''
        },
    })
    const token = localStorage.getItem('mytoken')
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const [inputList, setInputList] = useState([{ name: "", url: "", icon: "" }]);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        if (name === 'icon') {
            list[index][name] = e.target.files[0];

        } else {
            list[index][name] = value;
        }
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
        setInputList([...inputList, { name: "", url: "", icon: "" }]);
    };
    const handleChange = (e) => {
        const { form } = allData;
        if (e.target.name === 'image') {
            form[e.target.name] = e.target.files[0];
            setLocalImg(URL.createObjectURL(e.target.files[0]))
        } else {
            form[e.target.name] = e.target.value;
        }

        setAllFormDtata({ form });
    };
    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    const publishFun = async () => {
        setOpen(true)
        const data = new FormData();
        data.append("bodyText", allData.form.bodyText)
        data.append("heading", allData.form.heading)
        data.append("link1Name", allData.form.link1Name)
        data.append("link1Url", allData.form.link1Url)
        data.append("image", allData.form.image)
        // data.append("name", category)
        let endPoint;
        if (socialIdState) {
            data.append("id", socialIdState)
            endPoint = "/community/edit"
        } else {
            endPoint = "/community/add"
        }
        if (allData.form.heading != '' && allData.form.image != '') {
            axios.post(Environment.backendUrl + endPoint, data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response?.data?.msg, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                    window.location.assign('/admin/sociallinks')
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Title or Image is missing", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }
    const getSocialData = async () => {
        var val = window.location.href;
        val = new URL(val);
        var socialId = val.searchParams.get("socialid");
        setSocialIdState(socialId)
        if (socialId) {
            axios.get(Environment.backendUrl + `/community/find/${socialId}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    setAllFormDtata({
                        form: {
                            bodyText: response?.data?.community?.bodyText,
                            heading: response?.data?.community?.heading,
                            link1Name: response?.data?.community?.link1Name,
                            link1Url: response?.data?.community?.link1Url,
                            image: response?.data?.community?.image
                        },
                    })
                    setLocalImg(response?.data?.community?.image)
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        }
    }
    useEffect(() => {
        getSocialData()
    }, [])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className='addsocial'>
                    <div className='container-fluid'>
                        <div className="main-second-cards">
                            <h3>Heading</h3>
                            <div className="row">
                                <div className="col-lg-12 pl-0 pr-0">
                                    <div className="col-8 p-0">
                                        <div class="form-group">
                                            <label for="example">Title</label>
                                            <input value={allData.form.heading}
                                                onChange={handleChange} name='heading' type="text" class="form-control" id="example" aria-describedby="text" placeholder="Community" />
                                        </div>
                                    </div>
                                    <div className="col-8 p-0">
                                        <div class="form-group">
                                            <label className="padd-top" for="example">Body Text</label>
                                            <textarea value={allData.form.bodyText}
                                                name='bodyText' onChange={handleChange} class="form-control" id="exampleFormControlTextarea1" placeholder="Connect with thousand of other Legion users to disscuss and share anything about cryptocurrency knowledge." rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div class="form-group">
                                            <div className="App">
                                                {inputList.map((x, i) => {
                                                    return (
                                                        <div className="box">
                                                            <div className="row ">
                                                                <div className="col-sm-12 pl-md-0">
                                                                    <div className="row">
                                                                        <div className="col-sm-4 pl-md-0">
                                                                            <label>Link Name</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="main-inout-nh"
                                                                                    name="link1Name"
                                                                                    placeholder="Social Link Name"
                                                                                    value={allData.form.link1Name}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4 pl-md-0">
                                                                            <label>Link URL</label>
                                                                            <div className="form-group">
                                                                                <input
                                                                                    className="mai=n-inout-nh"
                                                                                    placeholder="Social Link URL"
                                                                                    name='link1Url'
                                                                                    value={allData.form.link1Url}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4 pl-md-0">
                                                                            <label>Icon </label>
                                                                            <div className="main-divs-image">
                                                                                <label className="main-label-m" for="filess1011">{allData.form?.image ? <img className='lolgo' src={localImg} alt="" /> : 'Upload Icon'} </label>
                                                                                <input name='image'

                                                                                    onChange={handleChange} className="d-none" type="file" id="filess1011" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="btn-box ">
                                                                    {inputList.length !== 1 && <button
                                                                        className=" button-removess"
                                                                        onClick={() => handleRemoveClick(i)}>Remove</button>}
                                                                    {inputList.length - 1 === i && <button className="buttonsss_attri ml-3" onClick={handleAddClick}><img src={`${images['addvid1.png']['default']}`} alt="" /> Add Questions</button>}
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div class="form-group">
                                            <div className="videopage">
                                                <button onClick={publishFun} className="red-b">Publish</button>
                                                <button className="red-w">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Addsociallinks