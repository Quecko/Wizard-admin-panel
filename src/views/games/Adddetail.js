
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import './games.scss';
// reactstrap components
function DailyDetail(props) {
    const token = localStorage.getItem('mytoken')
    const [open, setOpen] = useState(false);
    const [myFiles, setMyFiles] = useState([]);
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const id = props.match.params.id;
    console.log("iddd",id)
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getdata=()=>{
        setOpen(true)
        axios.get(Environment.backendUrl + "/game/find/"+id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setMyFiles(response.data.game)
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
        getdata()
    }, [token])
   


    
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="daily daily-detail card">
                <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Title</label>
                                                    <input type="text" value={myFiles.name} class="form-control" id="example" aria-describedby="text" disabled placeholder="" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Description</label>
                                                    <textarea class="form-control" value={myFiles.description} disabled id="exampleFormControlTextarea1" placeholder="" rows="5"></textarea>
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top ptb20" for="example">Game Thumbnail</label>
                                                    <div className="main-image-div">
                                                    <label for="example">Horizontal Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                            <img src={myFiles.horizontalImage} alt="" className="imgdbs12" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <div className="main-image-div">
                                                    <label for="example">Vertical Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                        <img src={myFiles.verticalImage} alt="" className="imgdbs13" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <div className="main-image-div">
                                                    <label for="example">Round Image</label>
                                                        <div className="choose-filessss yoyoyo">
                                                        <img src={myFiles.roundImage} alt="" className="imgdbs14" />
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
                                                <input type="text"name="reward" value={myFiles.first} className='form-control'  disabled  />
                                                
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">2nd Position</label>
                                                <input type="text"name="reward" value={myFiles.second} className='form-control'  disabled  />
                                              
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">3rd Position</label>
                                                <input type="text"name="reward"  value={myFiles.third} className='form-control'  disabled   />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group rewardsss">
                                                <label for="example">4th Position</label>
                                                <input type="text"name="reward"  value={myFiles.fourth} className='form-control'  disabled   />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    <Link to={"/admin/editdailychallange/" + myFiles.id}>
                                                    { Acls?.dailyChallenge?.update  ? <button className="red-b bdhcb">Edit</button>: ''}
                                                    </Link>
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
                                        <label for="exampleInputsymbol">Game</label>
                                        <div className="dashed-border-news">
                                        <img src={myFiles.horizontalImage} alt="" className="sdh" />
                                            {/* <div className="main-image-div">
                                                <img src={`${images['addvid2.png']['default']}`} alt="" />
                                                <p>Drag & drop or <span><Link>Browser</Link></span></p>
                                                <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" />
                                                {selectedImg?renderPhotos(selectedImg):null}
                                            </div> */}
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

export default DailyDetail;
