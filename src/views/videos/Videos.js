
import React, { useEffect, useState } from "react";
import './video.scss';
import axios from 'axios';
import VideoPlayer from 'simple-react-video-thumbnail'
// reactstrap components
import { Link } from "react-router-dom";
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { toast } from "react-toastify";
function Videos() {
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [allVideo, setAllVideo] = useState([]);
    const [open, setOpen] = useState(false);

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const All = (e) => {
        setAllVideo()
        setOpen(true)
        axios.get(Environment.backendUrl + "/video/all", { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setAllVideo(response.data)
                setOpen(false)

            })
    }

    useEffect(() => {
        All()
    }, [])

    const editVideo = async (id, type, bool) => {
        setOpen(true)
        const data = new FormData();
        data.append("id", id)
        data.append(type, bool)
        axios.post(Environment.backendUrl + "/video/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                All()
                setOpen(false)
                setTimeout(() => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }, 1000);
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-right",
                    autoClose: 2000,
                });
            })
    }

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    const data = allVideo?.videos?.map((elem, index) => {
        const stakingTiers = ['premium', 'legend', 'diamond', 'platinum', 'gold', 'silver', 'freeUser'];

        const levelRows = stakingTiers.map(tier => {
            const tierData = allVideo?.stakingtier?.filter(item => item?.stakeTier === tier)[0];
            const isChecked = elem?.[tier];
            const count = tierData?.count || 0;

            return (
                <td key={tier}>
                    <div className="chec">
                        <label className="checkbox-button">
                            <input
                            disabled={!Acls?.videos?.update}
                                type="checkbox"
                                className="checkbox-button__input"
                                id={`choice-${index}-${tier}`}
                                onChange={() => editVideo(elem?.id, tier, !isChecked)}
                                checked={isChecked}
                                name="choice1"
                            />
                            <span className="checkbox-button__control"></span>
                            <span className="level">
                                <p className="levelP">{tier.charAt(0).toUpperCase() + tier.slice(1)}</p>
                                <p className="numbersss">{count}</p>
                            </span>
                        </label>
                    </div>
                </td>
            );
        });

        return (
            <React.Fragment key={index}>
                <tr className="trSimple">
                    <td className="main-image">
                        <VideoPlayer videoUrl={elem.link} snapshotAt={10} />
                    </td>
                    <td className="">{elem.name}</td>
                    <td>
                        <div className="desci"> {elem.description}</div>
                    </td>
                    <td className="">{elem.createdAt.split('T')[0]}</td>
                    <td className="">{elem.duration}</td>
                    <td className="">{elem.reward} LGX</td>
                    <td className="">{elem.views}</td>
                    <td className="button-details">
                        <Link className="btn-common padds" to={'/admin/videodetail/' + elem.id}>Details</Link>
                    </td>
                </tr>
                    <tr className="trLevel">
                        <td className="levelTitle">
                            <h6>Available for:</h6>
                        </td>
                        {levelRows}
                    </tr>
            </React.Fragment>
        );
    });


    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Video</th>
                                        <th > Title <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Description <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Upload Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Duration <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Reward <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Views <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Details</th>
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {data}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Videos;
