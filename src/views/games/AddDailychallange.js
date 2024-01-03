
import React, { useEffect, useState } from "react";
import './games.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// reactstrap components
import { Link } from "react-router-dom";
const AddDaily=(props)=> {
    const [open, setOpen] = useState(false);
    const [selectedImg1, setSelectedImg1] = useState();
    const history = useHistory();
    const [selectedImg2, setSelectedImg2] = useState();
    const [selectedImg3, setSelectedImg3] = useState();
    const id = props.match.params.id;
    const token = localStorage.getItem('mytoken')
    const [myFiles, setMyFiles] = useState();
    const [myFiles1, setMyFiles1] = useState();
    const [myFiles2, setMyfiles2] = useState();
    const [selectedImg_new, setSelectedImg_new] = useState();
    const [inputs, setInputs] = useState([
        {
            name: '',
            description: '',
            first: '',
            second: '',
            third: '',
            fourth: ''
        }
    ]);
    const { name, description, first, second, third, fourth } = inputs;
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getdata = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setInputs(response.data.game)
                setSelectedImg1(response.data.game.horizontalImage)
                setSelectedImg2(response.data.game.verticalImage)
                setSelectedImg3(response.data.game.roundImage)
                setSelectedImg_new(response.data.game.horizontalImage)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const handleFileSelect = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg1(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles(file)
    }
    const handleFileSelect1 = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg2(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles1(file)
    }
    const handleFileSelect2 = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg3(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyfiles2(file)
    }
    const handleFileSelect3 = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg_new(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setMyFiles(file)
    }


    const editDaily = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (myFiles) {
            data.append("horizontalImage", myFiles)
        }
        if (myFiles1) {
            data.append("verticalImage", myFiles1)
        }
        if (myFiles2) {
            data.append("roundImage", myFiles2)
        }

        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("first", inputs.first)
        data.append("second", inputs.second)
        data.append("third", inputs.third)
        data.append("fourth", inputs.fourth)
        data.append("id", id)
        axios.post(Environment.backendUrl + "/game/edit/dailyChallenge", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                setInputs({
                    name: '',
                    description: '',
                    first: '',
                    second: '',
                    third: '',
                    fourth: ''
                })
                setSelectedImg1('');
                setSelectedImg2('');
                setSelectedImg3('');
                history.push('/admin/dailychallegne')
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

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    useEffect(() => {
        if (id) {
            getdata()
        }
 
    }, [token])

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="daily card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Game Title</label>
                                                    <input type="text" name="name" value={id ? inputs.name : name} className='form-control' onChange={handleChange1} placeholder="Enter title of the game" />
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Description</label>
                                                    <textarea name="description" value={id ? inputs.description : description} onChange={handleChange1} className='form-control' placeholder="Enter description of the game" rows="5"></textarea>

                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top ptb20" for="example">Game Thumbnail</label>
                                                    <div className="main-image-div">
                                                        <label for="example">Horizontal Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                            <small> {selectedImg1 ? selectedImg1 : null}</small>
                                                            <form> <input type="file" name="horizontalImage" onChange={handleFileSelect} accept="image/*" className='form-control' />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <div className="main-image-div">
                                                        <label for="example">Vertical Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                            <small> {selectedImg2 ? selectedImg2 : null}</small>
                                                            <form>
                                                                <input type="file" name="verticalImage" onChange={handleFileSelect1} accept="image/*" className='form-control' />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <div className="main-image-div">
                                                        <label for="example">Round Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                            <small> {selectedImg3 ? selectedImg3 : null}</small>
                                                            <form>  <input type="file" name="roundImage" onChange={handleFileSelect2} accept="image/*" className='form-control' />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group choose-category">
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Daily Challenge Reward
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">1st Position</label>
                                                <input type="text" name="first" value={id ? inputs.first : first} onChange={handleChange1} className='form-control' placeholder="Game Reward" />

                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">2nd Position</label>
                                                <input type="text" name="second" value={id ? inputs.second : second} onChange={handleChange1} className='form-control' placeholder="Game Reward" />

                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">3rd Position</label>
                                                <input type="text" name="third" value={id ? inputs.third : third} onChange={handleChange1} className='form-control' placeholder="Game Reward" />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">4th Position</label>
                                                <input type="text" name="fourth" value={id ? inputs.fourth : fourth} onChange={handleChange1} className='form-control' placeholder="Game Reward" />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editDaily}>Save</button> : <button className="red-b"  >Publish</button>}
                                                    <Link to="/admin/dailychallegne">
                                                        <button className="red-w">Cancel</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 order-md-1 order-0">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Upload Games</label>
                                        <div className="dashed-border-new">
                                            <div className="main-image-div">
                                                <div className="choose-filessss">
                                                    {selectedImg_new ? renderPhotos(selectedImg_new) : null}
                                                    <form>
                                                        <input type="file" name="image" accept="image/*" className={'form-control'} onChange={handleFileSelect3} />
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

export default AddDaily;
