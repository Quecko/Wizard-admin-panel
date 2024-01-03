
import React, { useState, useEffect } from "react";
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
const Addupcoming = (props) => {
    const id = props.match.params.id;
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [inputs, setInputs] = useState([
        {
            name: '',
            description: '',
            category: '',

        }
    ]);
    const token = localStorage.getItem('mytoken')
    const [imageHorizontal, setImageHorizontal] = useState();
    const [imageVertical, setImageVertical] = useState();
    const [imageRound, setImageRound] = useState();
    const [imageGame, setImageGame] = useState();
    const [selectedImg_new, setSelectedImg_new] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [vertical, setVertical] = useState();
    const [game, setgame] = useState();
    const [round, setround] = useState();

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const gameImage = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setImageGame(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setgame(file)
    }

    const getdata = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setInputs(response.data.game)
                setImageHorizontal(response.data.game.horizontalImage)
                setImageVertical(response.data.game.verticalImage)
                setImageRound(response.data.game.roundImage)
                setImageGame(response.data.game.gameImage)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }
    const { name, description, category, reward } = inputs;

    const handleFileHoridontal = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setImageHorizontal(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setThumbnail(file)
    }
    const handleFileVertical = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setImageVertical(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setVertical(file)
    }
    const handleFileRound = (evt) => {
        if (evt.target.files) {
            const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

            setImageRound(filesarray[0]);
            // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
        }
        var files = evt.target.files;
        var file = files[0];
        setround(file)
    }

    const renderPhotos = (source) => {
        return <img src={source} alt="" width="200" height="200" />
    }

    const handleChangeCHeckbox = (e) => {
        console.log("e.target", e.target.value)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, category: value }));
    }

    const editDaily = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        if (thumbnail) {
            data.append("horizontalImage", thumbnail)
        }
        if (round) {
            data.append("roundImage", round)
        }
        if (vertical) {
            data.append("roundImage", vertical)
        }
        if (game) {
            data.append("roundImage", game)
        }

        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("category", inputs.category)
        data.append("id", id)
        axios.post(Environment.backendUrl + "/game/edit/upcoming", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                setInputs({
                    name: '',
                    description: '',
                    reward: '',
                    threshold: ''
                })
                history.push('/admin/upcoming')
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

    const publishUpcomming = async (event) => {
        setOpen(true)
        event.preventDefault()
        const data = new FormData();
        data.append("horizontalImage", thumbnail)
        data.append("roundImage", round)
        data.append("verticalImage", vertical)
        data.append("gameImage", game)
        data.append("name", inputs.name)
        data.append("description", inputs.description)
        data.append("category", inputs.category)
        axios.post(Environment.backendUrl + "/game/add", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setOpen(false)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                setInputs({
                    name: '',
                    description: '',
                    reward: '',
                    threshold: ''
                })
                history.push('/admin/upcoming')
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
                                                    <input type="text" name="name" value={id ? inputs.name : name} onChange={handleChange1} className='form-control' placeholder="Enter title of the game" />
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Description</label>
                                                    <textarea name="description" value={id ? inputs.description : description} onChange={handleChange1} className='form-control' placeholder="Enter description of the game" rows="5"></textarea>

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
                                                    <input class="form-check-input" type="radio" name="category" checked={inputs.category === 'Upcoming Daily Challenge' ? "checked" : ''} onChange={handleChangeCHeckbox} id="exampleRadios1" value="Upcoming Daily Challenge" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Upcoming Daily Challenge
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="category" checked={inputs.category === 'Upcoming Future' ? "checked" : ''} onChange={handleChangeCHeckbox} id="exampleRadios1" value="Upcoming Future" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Upcoming Future
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 ">
                                            <div class="form-group">
                                                <label className="padd-top ptb20" for="example">Game Thumbnail</label>
                                                <div className="main-image-div">
                                                    <label for="example">Horizontal Image</label>
                                                    <div className="choose-filessss yoyoyo">
                                                        {imageHorizontal ? renderPhotos(imageHorizontal) : null}
                                                        <form>
                                                            <input type="file" name="thumbnail" accept="image/*" onChange={handleFileHoridontal} className='form-control' />
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
                                                        {imageVertical ? renderPhotos(imageVertical) : null}
                                                        <form>
                                                            <input type="file" name="thumbnail" accept="image/*" onChange={handleFileVertical} className='form-control' />
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
                                                        {imageRound ? renderPhotos(imageRound) : null}
                                                        <form>
                                                            <input type="file" name="thumbnail" accept="image/*" onChange={handleFileRound} className='form-control' />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editDaily}>Save</button> : <button className="red-b" onClick={publishUpcomming}>Publish</button>}
                                                    <Link to="/admin/upcoming">
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
                                                    {imageGame ? renderPhotos(imageGame) : null}
                                                    <form>
                                                        <input type="file" name="image" accept="image/*" className={'form-control'} onChange={gameImage} />
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

export default Addupcoming;
