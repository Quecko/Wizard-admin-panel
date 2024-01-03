import React, { useState } from 'react';

import arrowdown from "assets/img/userflow/arrow-down.png";
import ReactApexChart from "react-apexcharts";
import './dashboard.scss';
import { Link } from "react-router-dom";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
// import 'your-date-picker-library/styles.css';
function Dashboard() {

  const [setalllset, setSetalllset] = useState();
  const [setDataTime, setSetDataTime] = useState();
  const [alllset, setAlllset] = useState();
  const [showcalendar2, setShowCalendar2] = useState(false);
  const [showcalendar1, setShowCalendar1] = useState(false);
  const [showcalendar3, setShowCalendar3] = useState(false);
  const [showcalendar4, setShowCalendar4] = useState(false);
  const Acls = JSON.parse(localStorage.getItem('acls'))

  const [options, setobject] = useState({
    chart: {
      height: 350,
      type: 'bar'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%', // Adjust column width if needed
        colors: {
          Colors: ['#3654D6',]
        }
      }
    }
  });
  const [series, setseries] = useState(
    [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }
      // {
      //   name: 'series2',
      //   data: [11, 32, 45, 32, 34, 52, 41]
      // }
    ]
  )


  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('assets/img/dashboardimg', false, /\.(png|jpe?g|svg)$/));

  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(12),
    new DateObject().setDay(14).add(1, "month"),
    new DateObject().setDay(23).add(1, "month"),
  ])

  return (
    <>
      {/* <div className="content">
        <section className="main-dashboard">
          <div className="row ">
            <div className="col-sm-3">
              <div className="card">
                <ul className="list-inline">
                  <li className="list-inline-item top">
                    <img src="/dashboard-assets/total-users-icon.svg" className="img-fluid" />
                    <img src={`${images['total-users-icon.svg']['default']}`} alt="" className="img-fluid" />
                  </li>
                  <li className="list-inline-item">
                    <div className="inner-content">
                      <h3 className="common">178+</h3>
                      <h6 className="grey">Total Users</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <ul className="list-inline">
                  <li className="list-inline-item top">
                    <img src="/dashboard-assets/total-users-icon.svg" className="img-fluid" />
                    <img src={`${images['tota-videos-icon.svg']['default']}`} alt="" className="img-fluid" />
                  </li>
                  <li className="list-inline-item">
                    <div className="inner-content">
                      <h3 className="common">20+</h3>
                      <h6 className="grey">Total Videos</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <ul className="list-inline">
                  <li className="list-inline-item top">
                    <img src="/dashboard-assets/total-users-icon.svg" className="img-fluid" />
                    <img src={`${images['total-transections-icon.svg']['default']}`} alt="" className="img-fluid" />
                  </li>
                  <li className="list-inline-item">
                    <div className="inner-content">
                      <h3 className="common">190+</h3>
                      <h6 className="grey">Total Transactions</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <ul className="list-inline">
                  <li className="list-inline-item top">
                    <img src="/dashboard-assets/total-users-icon.svg" className="img-fluid" />
                    <img src={`${images['total-games-icon.svg']['default']}`} alt="" className="img-fluid" />
                  </li>
                  <li className="list-inline-item">
                    <div className="inner-content">
                      <h3 className="common">12+</h3>
                      <h6 className="grey">Total Games</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-8">
              <div className="card">
                <div className="row ptb20">
                  <div className="col-sm-9">
                    <h3 className="common">Statistics</h3>
                  </div>
                  <div className="col-sm-3">
                    <div class="dropdown">
                      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Time
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Last Month</a>
                        <a class="dropdown-item" href="#">Last Week</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ptb20">
                  <div className="col-sm-12 text-center">
                    <div id="chart">
                      <ReactApexChart options={options} series={series} type="area" height={350} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="row pt20">
                  <div className="col-sm-8">
                    <h3 className="common">Top Games</h3>
                  </div>
                  {(Acls?.dailyChallenge || Acls?.playToEarn || Acls?.upComming) ?
                  <div className="col-sm-4">
                    <Link to="playtoearn">
                      <h6 className="common">View All</h6>
                    </Link>
                  </div>
                  : ''}
                </div>
                <div className="row ptb20">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-one.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h3 className="">Eco Birds</h3>
                    <h6 className="grey">Total Votes 1.5K</h6>
                    <h6 className="grey">Total Plays 2.9K</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-two.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h3 className="">Eco Birds</h3>
                    <h6 className="grey">Total Votes 1.5K</h6>
                    <h6 className="grey">Total Plays 2.9K</h6>
                  </div>
                </div>
                <div className="row ptb20">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-three.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h3 className="">Eco Birds</h3>
                    <h6 className="grey">Total Votes 1.5K</h6>
                    <h6 className="grey">Total Plays 2.9K</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-8">
              <div className="card">
                <div className="row ptb20">
                  <div className="col-sm-10">
                    <h3 className="common">Latest Transactions</h3>
                  </div>
                  <div className="col-sm-2">
                    <Link to="alltransaction">
                      <h6 className="common">View All</h6>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div class="table-responsive">
                      <table class="table ">
                        <thead>
                          <tr>
                            <th> Token <img src={arrowdown} className="pl-1" alt="" /></th>
                            <th> Date <img src={arrowdown} className="pl-1" alt="" /></th>
                            <th> From <img src={arrowdown} className="pl-1" alt="" /></th>
                            <th> To <img src={arrowdown} className="pl-1" alt="" /></th>
                            <th> Amount <img src={arrowdown} className="pl-1" alt="" /></th>
                          </tr>
                        </thead>
                        <tbody className="main-t-body-text" >
                          <tr>
                            <td className='main-image'>
                              <ul className="d-flex justify-content-start align-items-center">
                                <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                                <li>BTC</li>
                              </ul>
                            </td>
                            <td className=''>Aug 14, 2021</td>
                            <td className=''>0x1DD74DAF...</td>
                            <td className="">0x340962B...</td>
                            <td className="">0.1 BTC</td>
                          </tr>
                          <tr>
                            <td className='main-image'>
                              <ul className="d-flex justify-content-start align-items-center">
                                <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                                <li>BTC</li>
                              </ul>
                            </td>
                            <td className=''>Aug 14, 2021</td>
                            <td className=''>0x1DD74DAF...</td>
                            <td className="">0x340962B...</td>
                            <td className="">0.1 BTC</td>
                          </tr>
                          <tr>
                            <td className='main-image'>
                              <ul className="d-flex justify-content-start align-items-center">
                                <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                                <li>BTC</li>
                              </ul>
                            </td>
                            <td className=''>Aug 14, 2021</td>
                            <td className=''>0x1DD74DAF...</td>
                            <td className="">0x340962B...</td>
                            <td className="">0.1 BTC</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="row pt20">
                  <div className="col-sm-8">
                    <h3 className="common">Latest Videos</h3>
                  </div>
                  {Acls?.videos ? 
                  <div className="col-sm-4">
                    <Link to="videos">
                      <h6 className="common">View All</h6>
                    </Link>
                  </div>
                  : ''}
                </div>
                <div className="row ptb20">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-one.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h6 className="">REN Price Climbs to Record High, Benefiting From Ethereum Congestion</h6>
                    <ul className="list-inline pt10">
                      <li className="list-inline-item">
                        <span className="circle"></span>&nbsp;
                        <span className="grey">BNB</span>&nbsp;&nbsp;&nbsp;
                        <span className="grey">2.3K Views</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-one.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h6 className="">REN Price Climbs to Record High, Benefiting From Ethereum Congestion</h6>
                    <ul className="list-inline pt10">
                      <li className="list-inline-item">
                        <span className="circle"></span>&nbsp;
                        <span className="grey">BNB</span>&nbsp;&nbsp;&nbsp;
                        <span className="grey">2.3K Views</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row ptb20">
                  <div className="col-sm-3 text-center">
                    <img src={`${images['top-games-img-one.png']['default']}`} alt="" className="img-fluid" />
                  </div>
                  <div className="col-sm-9">
                    <h6 className="">REN Price Climbs to Record High, Benefiting From Ethereum Congestion</h6>
                    <ul className="list-inline pt10">
                      <li className="list-inline-item">
                        <span className="circle"></span>&nbsp;
                        <span className="grey">BNB</span>&nbsp;&nbsp;&nbsp;
                        <span className="grey">2.3K Views</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}



      <div className="content">
        <section className="New-dashboard">
          <div className="inertoperdiv">

            <div className="dashbodtop">
              <h5 className="statay">
                Global Stats
              </h5>
              <div>
                <div className="custom-tab-bar">
                  <a className='clanderdate'
                  >
                    1D
                  </a>
                  <a className='clanderdate'
                  >
                    7D
                  </a>
                  <a className='clanderdate'>
                    1M
                  </a>
                  <a className='clanderdate'  >
                    1Y
                  </a>
                  <a className='clanderdate'>
                    All
                  </a>
                  <a className='clanderdate' onClick={() => setShowCalendar1(!showcalendar1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                      <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                    </svg>
                  </a>
                  {/* {showcalendar && ( */}
                  {showcalendar1 && (
                    <div className="cal set-custom-calendar-div">
                      <Calendar
                        numberOfMonths={2}
                        disableMonthPicker
                        disableYearPicker
                      />
                    </div>
                  )}


                </div>
              </div>
            </div>


            <div className="maaasssuuss">
              <div className="innerkjcontent">
                <img src="/dashboard-assets/11.svg" className="img-fluid" />
                <h6 className="greytoral">Total Users</h6>
                <h3 className=" commondigits">178K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/22.svg" className="img-fluid" />
                <h6 className="greytoral">New Users</h6>
                <h3 className=" commondigits">165K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/33.svg" className="img-fluid" />
                <h6 className="greytoral">Logins</h6>
                <h3 className=" commondigits">172K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/44.svg" className="img-fluid" />
                <h6 className="greytoral">Mystery Boxes</h6>
                <h3 className=" commondigits">10K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/55.svg" className="img-fluid" />
                <h6 className="greytoral">Referrals</h6>
                <h3 className=" commondigits">75K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/66.svg" className="img-fluid" />
                <h6 className="greytoral">Raffles Users </h6>
                <h3 className=" commondigits">98K+</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/77.svg" className="img-fluid" />
                <h6 className="greytoral">Tickets / Used </h6>
                <h3 className=" commondigits">10K-2K</h3>
              </div>
              <div className="innerkjcontent">
                <img src="/dashboard-assets/88.svg" className="img-fluid" />
                <h6 className="greytoral">Commission </h6>
                <h3 className=" commondigits">$10K</h3>
              </div>

            </div>
            <div className="row ">
              <div className="col-xl-6 col-sm-12">
                <div className="outerdivchart">
                  <div className="dashbodtop mb-3">
                    <h5 className="statay">
                      New Users
                    </h5>
                    <div>
                      {/* <img src="/dashboard-assets/issonns.svg" className="img-fluid custom-img" alt="Your Alt Text" /> */}
                      <div className="custom-tab-bar">
                        <a className='clanderdate'
                        >
                          1D
                        </a>
                        <a className='clanderdate'
                        >
                          7D
                        </a>
                        <a className='clanderdate'>
                          1M
                        </a>
                        <a className='clanderdate'  >
                          1Y
                        </a>
                        <a className='clanderdate'>
                          All
                        </a>
                        <a className='clanderdate' onClick={() => setShowCalendar2(!showcalendar2)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                            <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                          </svg>
                        </a>
                        {/* {showcalendar && ( */}
                        {showcalendar2 && (
                          <div className="cal set-custom-calendar-div">
                            <Calendar
                              numberOfMonths={2}
                              disableMonthPicker
                              disableYearPicker
                            />
                          </div>
                        )}


                      </div>
                    </div>
                  </div>

                  <div id="chart ">

                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                  </div>
                </div>

              </div>
              <div className="col-xl-6 col-sm-12">
                <div className="outerdivchart">
                  <div className="dashbodtop mb-3">
                    <h5 className="statay">
                      Mystery Boxes
                    </h5>
                    <div className="custom-tab-bar">
                  <a className='clanderdate'
                  >
                    1D
                  </a>
                  <a className='clanderdate'
                  >
                    7D
                  </a>
                  <a className='clanderdate'>
                    1M
                  </a>
                  <a className='clanderdate'  >
                    1Y
                  </a>
                  <a className='clanderdate'>
                    All
                  </a>
                  <a className='clanderdate' onClick={() => setShowCalendar3(!showcalendar3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                      <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                    </svg>
                  </a>
                  {/* {showcalendar && ( */}
                  {showcalendar3 && (
                    <div className="cal set-custom-calendar-div">
                      <Calendar
                        numberOfMonths={2}
                        disableMonthPicker
                        disableYearPicker
                      />
                    </div>
                  )}


                </div>
                  </div>
                  <div id="chart ">
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                  </div>
                </div>
              </div>
            </div>
            <div className="lastpratdiv">
              <div className="dashbodtoplast">
                <div className="inerlast">
                  <h5 className="statayfst">
                    Total Bolts distributed to users
                  </h5>
                  <h2 className="statayfstbig">
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="35" viewBox="0 0 34 35" fill="none">
                      <path d="M8.6261 19.3133H13.0036V29.5133C13.0036 31.8933 14.2928 32.3749 15.8653 30.5899L26.5894 18.4066C27.9069 16.9191 27.3544 15.6866 25.3569 15.6866H20.9794V5.4866C20.9794 3.1066 19.6903 2.62494 18.1178 4.40994L7.3936 16.5933C6.09026 18.0949 6.64277 19.3133 8.6261 19.3133Z" stroke="#3553D5" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    1,000,000,000
                  </h2>
                </div>

                <div className="statay">
                <div className="custom-tab-bar">
                  <a className='clanderdate'
                  >
                    1D
                  </a>
                  <a className='clanderdate'
                  >
                    7D
                  </a>
                  <a className='clanderdate'>
                    1M
                  </a>
                  <a className='clanderdate'  >
                    1Y
                  </a>
                  <a className='clanderdate'>
                    All
                  </a>
                  <a className='clanderdate' onClick={(handleButtonClick) => setShowCalendar4(!showcalendar4)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z" fill="#3654D6" />
                      <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z" fill="#3654D6" />
                    </svg>
                  </a>
                  {/* {showcalendar && ( */}
                  {showcalendar4 && (
                    <div className="cal set-custom-calendar-div">
                      <Calendar
                        numberOfMonths={2}
                        disableMonthPicker
                        disableYearPicker
                      />
                    </div>
                  )}


                </div>
                </div>
              </div>

              <div className="seclastpartdiv">
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Tasks in the app
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    595,854
                  </p>

                </div>
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Playing games
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    565,857
                  </p>

                </div>
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Empower videos
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    65,450
                  </p>

                </div>
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Tasks in the app
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    595,854
                  </p>

                </div>
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Gifted Bolts
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    456,258
                  </p>

                </div>
                <div className="inerisstdiv">
                  <p className="inerleft">
                    Purchased Bolts
                  </p>
                  <p className="inerright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.56929 9.96017H6.88679V15.3602C6.88679 16.6202 7.56929 16.8752 8.40179 15.9302L14.0793 9.48017C14.7768 8.69267 14.4843 8.04017 13.4268 8.04017H11.1093V2.64017C11.1093 1.38017 10.4268 1.12517 9.59429 2.07017L3.91679 8.52017C3.22679 9.31517 3.51929 9.96017 4.56929 9.96017Z" stroke="#161616" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    658,548
                  </p>

                </div>
              </div>
            </div>




          </div>
        </section>
      </div>
    </>
  );
}
export default Dashboard;