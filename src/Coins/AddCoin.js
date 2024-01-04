
import React, { useEffect, useState } from "react";
// import './banner.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
function AddCoin(props) {
    const [selectedImg, setSelectedImg] = useState();
    const [myFiles, setMyFiles] = useState();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const id = props.match.params.id;
    const [inputs, setInputs] = useState({
        name: '',
        symbol: '',
        decimals: '',
        contractAddress: '',
        type: '',
        image: '',
        chainUrl: ''
    })
    console.log("sdfasdfsadfsdaf",inputs)

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

console.log("coinsssss",inputs)
    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }

    const FIndcoin = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/coin/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setInputs(response.data.coin)
                setSelectedImg(response.data.coin.image)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const Addcoin = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        data.append("image", myFiles)
        data.append("name", inputs.name)
        data.append("symbol", inputs.symbol)
        data.append("decimals", inputs.decimals)
        data.append("contractAddress", inputs.contractAddress)
        data.append("type", inputs.type)
        data.append("chainUrl", inputs.chainUrl)

        if (myFiles !== '' && inputs.name !== '' && inputs.symbol !== '' && inputs.contractAddress !== '') {
            axios.post(Environment.backendUrl + "/coin/create", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        name: '',
                        symbol: '',
                        decimals: '',
                        contractAddress: '',
                        type: '',
                        image: ''
                    })
                    setSelectedImg('')
                    history.push('/admin/Coins')
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

    const editCoin = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (myFiles) {
            data.append("image", myFiles)
        }
        data.append("name", inputs.name)
        data.append("symbol", inputs.symbol)
        data.append("decimals", inputs.decimals)
        data.append("contractAddress", inputs.contractAddress)
        data.append("type", inputs.type)
        data.append("chainUrl", inputs.chainUrl.toString())
        data.append("id", id)
        axios.post(Environment.backendUrl + "/coin/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
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
                    symbol: '',
                    decimals: '',
                    contractAddress: '',
                    type: '',
                    image: ''
                })
                setSelectedImg('')
                history.push('/admin/Coins')
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
        history.push('/admin/Coins')
    }

    useEffect(() => {

        if (id) {
            FIndcoin()
        }

    }, [id])

    // const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));z
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
                                                    <label for="example">Coin Name</label>
                                                    <input type="text" name="name" value={inputs.name} onChange={handleChange1} className={'form-control'} placeholder="Enter title of the game" />
                                                    {/* {Object.keys(TitleError).map((key) => {
                                                        return <p className="inputErrors">{TitleError[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Symbol</label>
                                                    <input type="text" name="symbol" value={inputs.symbol} onChange={handleChange1} className={'form-control'} placeholder="Enter link" />
                                                    {/* {Object.keys(linkError).map((key) => {
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{linkError[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Decimal</label>
                                                    <input type="number" name="decimals" value={inputs.decimals} onChange={handleChange1} className={'form-control'} placeholder="Select Page" />
                                                    {/* {Object.keys(linkError).map((key) => {
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{linkError[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Address</label>
                                                <input type="text" name="contractAddress" value={inputs.contractAddress} onChange={handleChange1} className={'form-control'} placeholder="Enter title of the game" />
                                                {/* {Object.keys(TitleError).map((key) => {
                                                    return <p className="inputErrors">{TitleError[key]}</p>
                                                })} */}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            {/* <div class="form-group">
                                                <label for="example">External Link</label>
                                                <input type="text" name="chainUrl" value={inputs.chainUrl} onChange={handleChange1}  className={'form-control'} placeholder="Enter External Link" />
                                          
                                            </div> */}
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Chain</label>
                                                <div class="dropdown">
                                                    <FormControl variant="outlined" className="styleeee">
                                                        <Select
                                                            native
                                                            name="chainUrl"
                                                            onChange={handleChange1}
                                                           value={inputs.chainUrl}
                                                        // inputProps={{
                                                        //     state
                                                        // }}
                                                        >
                                                            <option className="main-boot" >Select Chain</option>,
                                                            <option className="main-boot" name="chainUrl" key="option1" value='BSC'>BSC</option>;
                                                            <option className="main-boot" name="chainUrl" key="option2" value='Matic'>Matic</option>;
                                                            <option className="main-boot" name="chainUrl" key="option3" value='ETH'>ETH</option>;
                                                            <option className="main-boot" name="chainUrl" key="option4" value='Gate'>Gate</option>;
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Type</label>
                                                <input type="text" name="type" onChange={handleChange1} value={inputs.type} className={'form-control'} placeholder="Enter title of the game" />
                                                {/* {Object.keys(TitleError).map((key) => {
                                                    return <p className="inputErrors">{TitleError[key]}</p>
                                                })} */}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editCoin}>Save</button> : <button className="red-b" onClick={Addcoin}>Publish</button>}
                                                    {/* // <button className="red-b" onClick={sendVideo}>Publish</button> */}
                                                    <button className="red-w" onClick={cancel}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Upload Coin Image</label>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                {/* <img src={`${images['addvid2.png']['default']}`} alt="" /> */}
                                                {selectedImg ? renderPhotos(selectedImg) : null}
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}
                                                    <form>  <input type="file" name="image" className={'form-control'} onChange={handleFileSelect} accept="image/*" />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>{myFiles[0].name}</h4> */}
                                                        {/* {myFiles[0]} */}
                                                    </form>

                                                </div>

                                                {/* <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                {/* {selectedImg?renderPhotos(selectedImg):null} */}
                                            </div>

                                        </div>
                                        {/* {Object.keys(imageError).map((key) => {
                                            console.log("key", key);
                                            return <p className="inputErrors">{imageError[key]}</p>
                                        })} */}
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

export default AddCoin;
