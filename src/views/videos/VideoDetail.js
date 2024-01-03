
import React, { useEffect, useState } from "react";
import './video.scss';
import axios from 'axios';
import { Link } from "react-router-dom"
import Environment from "utils/Environment";
// import VideoPlayer from 'simple-react-video-thumbnail'
import ReactPlayer from 'react-player'
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { elementAcceptingRef } from "@mui/utils";
// reactstrap components
function VideoDetails(props) {
    const token = localStorage.getItem('mytoken')
    const [open, setOpen] = useState(false);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [allVideo, setAllVideo] = useState({
        createdAt: '',
        VideoQuestions: []
    });
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const id = props.match.params.id;
    const Video = (e) => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/video/find/" + id, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setAllVideo(response.data.video)
                setOpen(false)
            })
    }

    const question = allVideo.VideoQuestions.map((elem) => {
        return (
            <>
                <h5>{elem?.question}</h5>
                <ul className="ptb20">
                    <li>
                        <p>01-  {elem?.a}</p>
                    </li>
                    <li>
                        <p>02-  {elem?.b}</p>
                    </li>
                    <li>
                        <p>03-  {elem?.c}</p>
                    </li>
                    <li>
                        <p>04-  {elem?.d}</p>
                    </li>
                </ul>
                <p><strong>Correct Answer: <span className="green">{elem?.answer}</span></strong></p>
            </>
        )

    })

    const getPublish = () => {
        const access = allVideo.published
        console.log("status", access)
        setOpen(true)
        axios.post(Environment.backendUrl + "/video/publish/unpublish", { id, access: !access }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setAllVideo(allVideo => ({ ...allVideo, published: !allVideo.published }));
                Video()
                setOpen(false)
                // setOpen(true)
            })
    }

    useEffect(() => {
        Video()
    }, [])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos-detail card">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="video-title">
                                    <h4>Video Title</h4>
                                    <div className="title">
                                        <h6>{allVideo?.name}</h6>
                                    </div>
                                </div>
                                <div className="description">
                                    <h4>Video Description</h4>
                                    <div className="inner-dec">
                                        <p>{allVideo?.description}</p>
                                    </div>
                                </div>
                                <div className="RUC">
                                    <div className="RUC-inner">
                                        <p>Video Reward</p>
                                        <h6>{allVideo?.reward} LGX</h6>
                                    </div>
                                    <div className="RUC-inner">
                                        <p>Category</p>
                                        <h6>{allVideo?.VideoCategory?.name}</h6>
                                    </div>
                                    <div className="RUC-inner">
                                        <p>Video Duration</p>
                                        <h6>{allVideo?.duration}</h6>
                                    </div>
                                    <div className="RUC-inner">
                                        <p>Upload Date </p>
                                        <h6>{(allVideo.createdAt).split('T')[0]}</h6>
                                    </div>
                                </div>

                                <div className="row ptb20">
                                    <div className="col-sm-12 p-0">
                                        <div className="questions">
                                            <h2>Questionnaire</h2>
                                            {/* <h4 className="ptb20">Question 1</h4> */}

                                            {question}
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons ptb20">
                                    {Acls?.videos?.delete ?
                                        <button type="button" className={allVideo.published === true ? 'red-g' : 'red-b'} onClick={getPublish} >{allVideo.published === true ? 'Unpublish' : 'Publish'}</button>
                                        : ''}
                                    {Acls?.videos?.update ?
                                        <Link to={'/admin/editvideos/' + id}>  <button type="button" className="red-w" >Edit</button></Link>
                                        : ''}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="image">
                                    <h4>Video</h4>
                                    <ReactPlayer className="videoFrame" url={allVideo.link} width='100%' light={allVideo?.thumbnail} height='100%' controls />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default VideoDetails;
