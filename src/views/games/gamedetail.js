
import React from "react";
import './games.scss';
// reactstrap components
function GameDetail() {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <div className="content">
                <section className="daily daily-detail card">
                <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Game Title</label>
                                                    <input type="text" class="form-control" id="example" aria-describedby="text" disabled placeholder="" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Description</label>
                                                    <textarea class="form-control" disabled id="exampleFormControlTextarea1" placeholder="" rows="5"></textarea>
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Game Code</label>
                                                    <textarea class="form-control" disabled id="exampleFormControlTextarea1" rows="10"></textarea>
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Link</label>
                                                    <input type="text" class="form-control" id="example" disabled aria-describedby="text" placeholder="" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-group">
                                                    <label className="padd-top" for="example">Page</label>
                                                    <input type="text" class="form-control" id="example" disabled aria-describedby="text" placeholder="" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
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
                                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                    Play to Earn
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                    Daily Challenge
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                    Daily Challenge Upcoming
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                    Future Coming
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                                <div class="form-group rewardsss">
                                                    <label for="example">Reward</label>
                                                    <input type="text" class="form-control" id="example" disabled aria-describedby="text" placeholder="" />
                                                    {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                                </div>
                                            </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    <button className="red-b">Publish</button>
                                                    <button className="red-w">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group rightside-for-group">
                                        <label for="exampleInputsymbol">Game</label>
                                        <div className="dashed-border-news">
                                        <img src={`${images['games222.png']['default']}`} alt="" />
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

export default GameDetail;
