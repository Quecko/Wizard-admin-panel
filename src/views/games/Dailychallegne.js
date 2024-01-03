import React, { useEffect, useState } from "react";
import './games.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// reactstrap components
import { Link } from "react-router-dom";
import user3 from "assets/img/userflow/modal1.png";
import user4 from "assets/img/userflow/unpublish.svg";
function Dailychallegne() {
    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);
    const [Unpublish, setUnpublish] = useState([]);
    const [dcLeader, setDcLeader] = useState([]);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [unpublishLeader, setUnpublishLeader] = useState([]);
    const [value, setValue] = useState('undefined');
    const token = localStorage.getItem('mytoken')
    const [toggler, setToggler] = useState(false);
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    let date
    if (value !== 'undefined') {
        date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
    }

    console.log("value::::", date)
    const getDailyChallenge = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/dailyChallenge", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setMyFiles(response.data.games)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const UnpublishGames = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/dailyChallenge/unpublished", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setUnpublish(response.data.games)
                getDailyChallenge()
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const getDailyChallengLeader = () => {
        setOpen(true)
        axios.post(Environment.backendUrl + "/game/leaderboard/dailyChallenge", { date }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setDcLeader(response.data.leaderboard)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const daily = myFiles.map((elem => {


        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.verticalImage} className="pr-2 imgages-no" alt="" />
                </td>
                <td className=''>{elem?.name}</td>
                <td className=''>{elem?.plays}</td>
                <td> <button className="buttons-remosxve" type="button" onClick={() => publish(elem)}>Unpublish</button></td>
                <td className="button-details">
                    <Link className='btn-common padds' to={'/admin/DailyChallangeDetail/' + elem.id}>Details</Link>
                </td>
            </tr>
        )
    }))

    const unpublish = Unpublish.map((elem => {
        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.verticalImage} className="pr-2 imgages-no" alt="" />
                </td>
                <td className=''>{elem?.name}</td>
                <td className=''>{elem?.plays}</td>
                <td><button data-toggle="modal" className="ascxbdsc" onClick={() => opeeennn(elem.id)}><img src={user4} alt="" /></button></td>
                <td><button className="buttons-remosxvcsc" type="button" onClick={() => publish(elem)}>Publish</button></td>
                <td className="button-details">
                    <Link className='btn-common padds' to={'/admin/DailyChallangeDetail/' + elem.id}>Details</Link>

                </td>
            </tr>
        )
    }))

    const dateeeee = (e) => {
        setValue(e)
    }

    const DCleaderboard = dcLeader?.map((elem, i) => {
        return (
            <tr>
                <td className='main-image bdhjbc'>
                    {/* <Link className='sdhsjc' data-toggle="modal" data-target="#exampleModal"> </Link> */}
                    <img src={elem.profile_image} className="mr-2 imgages-nosds" alt="" />
                    <span>{elem.full_name}</span>
                </td>

                <td className='main-image sjbdssc'>
                    <Link className=''> <img src={`${images['iran.png']['default']}`} className="mr-2 imgages-nosxs" alt="" /></Link>
                </td>

                <td className=''>{elem.public_address}</td>
                <td className='main-sdefef'>
                    {i === 0 ? <img src={`${images['first-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i === 1 ? <img src={`${images['second-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i === 2 ? <img src={`${images['third-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i + 1}
                </td>
                <td className="">
                    {elem.score}
                </td>
            </tr>
        )
    })

    const UnPublishleaderboard = unpublishLeader?.map((elem, i) => {
        return (
            <tr>
                <td className='main-image bdhjbc'>
                    {/* <Link className='sdhsjc' data-toggle="modal" data-target="#exampleModal"> </Link> */}
                    <img src={elem.User.profile_image} className="mr-2 imgages-nosds" alt="" />
                    <span>{elem.User.full_name}</span>
                </td>

                <td className='main-image sjbdssc'>
                    <Link className=''> <img src={`${images['iran.png']['default']}`} className="mr-2 imgages-nosxs" alt="" /></Link>
                </td>

                <td className=''>{elem.User?.Accounts[0].public_address}</td>
                <td className='main-sdefef'>
                    {i === 0 ? <img src={`${images['first-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i === 1 ? <img src={`${images['second-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i === 2 ? <img src={`${images['third-place-icon.svg']['default']}`} className="mr-2 imgages-nosxscz" alt="" /> : i + 1}
                </td>
                <td className="">
                    {elem.score}
                </td>
            </tr>
        )
    })

    const opeeennn = (id) => {
        console.log("idddd", id)
        axios.post(Environment.backendUrl + "/game/leaderboard/dailyChallenge/admin/" + id, {}, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setUnpublishLeader(response.data.leaderboard)
                window.$('#unpublishxx').modal('show')
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }

    const publish = (de) => {
        setOpen(true)
        const id = de.id
        const access = !de.published
        axios.post(Environment.backendUrl + "/game/publishUnpublish", { id, access }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                UnpublishGames()
                getDailyChallenge()
                window.location.reload();
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const toggle = () => {
        if (toggler === true) {
            setToggler(false)
        } else {
            setToggler(true)
        }

    }



    useEffect(() => {
        getDailyChallenge()
        getDailyChallengLeader()
    }, [token, value])




    return (
        <>

            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <div className="dailychallange-tabs">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="Publish-tab" data-toggle="tab" href="#Publish" role="tab" aria-controls="Publish" aria-selected="true" >Published Games</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="unpublish-tab" data-toggle="tab" href="#unpublish" role="tab" aria-controls="unpublish" aria-selected="false" onClick={UnpublishGames}>Unpublished Games</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-4" id="myTabContent">
                        <div class="tab-pane fade show active" id="Publish" role="tabpanel" aria-labelledby="Publish-tab">
                            <section className="daily card">
                                <div className="container-fluid">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Game</th>
                                                    <th>Title</th>
                                                    <th>Total Plays</th>
                                                    <th>Unpublish</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text">
                                                {daily}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>

                            <section className="daily ptb20 card">
                                <div className="container-fluid">
                                    <div className="sjbdsj d-flex justify-content-between align-items-center">
                                        <h3>Daily Leaderboard</h3>
                                        <div className="dropssnbdb">
                                            <div class="dropdown">
                                                <button class="dsjdjdc1" onClick={toggle}>
                                                    <i class="fas fa-calendar acd" aria-hidden="true"></i>
                                                </button>
                                                <div>
                                                    <div className={toggler === false ? 'toggles' : 'toggles1'} >
                                                        <Calendar
                                                            onChange={dateeeee}
                                                        // value={value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Users Name</th>
                                                    <th>Country</th>
                                                    <th>Wallet Address</th>
                                                    <th>Position</th>
                                                    <th>Points</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {DCleaderboard}

                                                {/* Modal Daily Leader board Profiles */}

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="main-modal-one">
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog daily-profile-modal">
                                                <div class="modal-content daily-profile-modal-inner">
                                                    <div class="modal-body modal-body-main">
                                                        <div className="main-outter">
                                                            <div className="imgs">
                                                                <img src={user3} alt="" />
                                                            </div>
                                                            <div className="row main-cardssss">
                                                                <div className="col-md-6 col-6">
                                                                    <div className="flux-b">
                                                                        <p>Full Name</p>
                                                                        <h4>Jose Thompson</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-6">
                                                                    <div className="flux-b">
                                                                        <p className="flux-r">Bank</p>
                                                                        <h4 className="flux-r">Reliance Bank</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-6 ">
                                                                    <div className="flux-b">
                                                                        <p>Account Number</p>
                                                                        <h4 >011 401 5336</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-6">
                                                                    <div className="flux-b">
                                                                        <p className="flux-r">Country</p>
                                                                        <h4 className="flux-r">United State</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-12">
                                                                    <div className="button-modal-daily">
                                                                        <button type="button" className="button-main-daily" data-dismiss="modal" aria-label="Close" >Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                        <div class="tab-pane fade" id="unpublish" role="tabpanel" aria-labelledby="unpublish-tab">
                            <section className="daily card">
                                <div className="container-fluid">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Game</th>
                                                    <th>Title</th>
                                                    <th>Total Plays</th>
                                                    <th>LeaderBoard</th>
                                                    <th>Publish</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text">
                                                {unpublish}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#unpublish">
                                </button> */}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sadjbshcb">
                <div className="modal-unpiublish">
                    <div class="modal fade" id="unpublishxx" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog sjxsjxmn">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title sjbcjbx" id="exampleModalLabel">Makibot Evolve Leaderboard</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Users Name</th>
                                                    <th>Country</th>
                                                    <th>Wallet Address</th>
                                                    <th>Position</th>
                                                    <th>Points</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {UnPublishleaderboard}

                                                {/* Modal Daily Leader board Profiles */}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dailychallegne;
