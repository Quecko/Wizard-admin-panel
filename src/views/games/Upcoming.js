
import React, { useEffect, useState } from "react";
import './games.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
// reactstrap components
import { Link } from "react-router-dom";
function Upcoming() {
    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);
    const token = localStorage.getItem('mytoken')

    const getUpcoming = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/upcomingBoth", { headers: { "Authorization": `Bearer ${token}` } })
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
                getUpcoming()
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }


    const upcoming = myFiles.map((elem => {
        return (
            <tr>
                <td className='main-image'>
                    <img src={elem?.horizontalImage} className="pr-2 imgages-no" alt="" />
                </td>
                <td className=''>{elem?.name}</td>
                <td className=''>{elem?.GameTracks.length > 0 ? elem?.GameTracks[0].totalVotes : '0'}</td>
                <td className=''>{elem.category}</td>
                <td> <button className="buttons-remove" type="button" onClick={() => publish(elem)}><i className="far fa-trash-alt"></i></button></td>
                <td className="button-details">
                    <Link className='btn-common padds' to={'/admin/Detail/Upcoming/' + elem.id}>Details</Link>
                </td>
            </tr>
        )
    }))

    useEffect(() => {
        getUpcoming()
    }, [token])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="play ptb20 card">
                    <div className="container-fluid">
                        <h3>Upcoming</h3>
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Game</th>
                                        <th>Tile</th>
                                        <th>Votes</th>
                                        <th>Upcoming</th>
                                        <th>Remove</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {upcoming}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Upcoming;
