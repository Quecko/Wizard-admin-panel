
import React from "react";
import './games.scss';
// reactstrap components
import { Link } from "react-router-dom";
function DailyLeaderBoard() {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <div className="content">
                <section className="daily daily-leader-board ptb20 card">
                    <div className="container-fluid">
                        <h3>Daily Leaderboard</h3>
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Users Name</th>
                                        <th>Country</th>
                                        <th>Wallet Address</th>
                                        <th>Position</th>
                                        <th>Reward Sent</th>
                                        <th>Reminder</th>
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    <tr>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['gamess1.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                            <span>Carolyn Wilson</span>
                                        </td>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['iran.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className=''>0x0712775C43...</td>
                                        <td className='main-image'>
                                            <Link className=''> <img src={`${images['batch1.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className="">
                                            <Link className=''> <img src={`${images['greentick.png']['default']}`} className="pr-2 imgages-no" alt="" /></Link>
                                        </td>
                                        <td className="">
                                            <Link className=''>Send Reminder</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default DailyLeaderBoard;
