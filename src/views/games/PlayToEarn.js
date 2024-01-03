
import React, { useEffect, useState } from "react";
import './games.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import user5 from "assets/img/userflow/scscscx.svg";
// reactstrap components
import { Link } from "react-router-dom";
function PlayToEarn() {
    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);
    const [leader, setLeader] = useState([]);
    const [state, setState] = useState({
        id: '',
        name: 'All Games'
    });
    const token = localStorage.getItem('mytoken')
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));

    const getPlayToEarn = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/playToEarn/both", { headers: { "Authorization": `Bearer ${token}` } })
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

    const handleChange = (event) => {
        console.log("event.tar", event.id)
        setState(event);
        axios.post(Environment.backendUrl + "/game/leaderboard/playToEarn/admin", { game_id: event.id }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setLeader(response.data.leaderboard)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        // getAllNft()
    };

    const getPlayLeader = () => {
        setOpen(true)
        axios.post(Environment.backendUrl + "/game/leaderboard/playToEarn/admin", {}, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setLeader(response.data.leaderboard)
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const leaderData = leader.map((elem => {
        const dollar = elem?.totalLgxEarned * 0.1
        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.User.profile_image} className="pr-2 imgages-no" alt="" />
                    <span>{elem?.User.full_name}</span>
                </td>
                <td className='main-image'>
                    <Link className=''> <img src={`${images['iran.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                </td>

                <td className=''>{elem?.User?.Accounts[0]?.public_address}</td>
                <td className='main-image'>
                    {elem?.totalLgxEarned}
                </td>
                <td className="">
                    {dollar} USDT
                </td>
            </tr>
        )
    }))

    const play = myFiles.map((elem => {
        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.verticalImage} className="pr-2 imgages-no" alt="" />
                </td>
                <td className=''>{elem?.name}</td>
                <td className=''>{elem?.plays}</td>
                <td className=''>{elem?.reward}</td>
                <td> <button className={elem?.published == true ? 'buttons-remosxve' : 'buttons-remosxvcsc'} type="button" onClick={() => publish(elem)}>{elem?.published == true ? 'Unpublish' : 'Publish'}</button></td>
                <td className="button-details">
                    <Link to={'/admin/Detail/PlayToEarn/' + elem?.id}>
                        <button className='btn-common padds'>
                            Details
                        </button>

                    </Link>
                </td>
            </tr>
        )
    }))

    const drop = myFiles.map((elem => {
        return (
            <li class="dropdown-item" onClick={() => handleChange(elem)}>{elem?.name}</li>
        )
    }))

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
                getPlayToEarn()
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    useEffect(() => {
        getPlayToEarn()
        getPlayLeader()
    }, [token])


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
                            <a class="nav-link" id="unpublish-tab" data-toggle="tab" href="#unpublish" role="tab" aria-controls="unpublish" aria-selected="false" >Unpublished Games</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-4" id="myTabContent">
                        <div class="tab-pane fade show active mt-4" id="Publish" role="tabpanel" aria-labelledby="Publish-tab">

                            <section className="play ptb20 card">
                                <div className="container-fluid">
                                    <h3 className="newplayfont">Play to Earn</h3>
                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Game</th>
                                                    <th>Tile</th>
                                                    <th>Total Plays</th>
                                                    <th>reward/ Plays</th>
                                                    <th>Publish/Unpublish</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {play}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="tab-pane fade" id="unpublish" role="tabpanel" aria-labelledby="unpublish-tab">
                            <section className="play ptb20 card">
                                <div className="container-fluid">
                                    {/* <div className="sjbdsj d-flex justify-content-between align-items-center">
                                        <h3>Tokens Earned</h3>
                                        <div className="dropssnbdb">
                                            <div class="dropdown">
                                                <button class="dsjdjdc" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                                    <img src={user5} alt="" />  {state.name}
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {drop}
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div class="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                <th>Game</th>
                                                    <th>Tile</th>
                                                    <th>Total Plays</th>
                                                    <th>reward/ Plays</th>
                                                    <th>Publish/Unpublish</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="main-t-body-text" >
                                                {leaderData}
                                                {/* {play} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayToEarn;
