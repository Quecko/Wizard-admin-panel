import React, { useState } from 'react';

import arrowdown from "assets/img/userflow/arrow-down.png";
import ReactApexChart from "react-apexcharts";
import './dashboard.scss';
import { Link } from "react-router-dom";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";

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
      type: 'line'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#862FC0'],
      width: 3,
      dashArray: 0, // Remove dashed stroke if not needed
      lineCap: 'round', // Adjust line cap if needed
      dropShadow: {
        enabled: true,
        top: 4,
        left: 0,
        blur: 10,
        opacity: 1,
        color: '#862FC0'
      }
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
          ranges: [{
            from: 0,
            to: 0,
            color: '#862FC0'
          }]
        },
        strokeColors: ['#862FC0'],
        strokeWidth: 3,
        fill: {
          type: 'solid'
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
      <div className="content">
        <section className="main-dashboard">
          <div className="dashbrd_top_cardmaindiv ">
            <div className="new_card">
              <div className='cardinercont'>
                <div className="imgouterdiv">
                  <img src="\dashboard\card1.svg" className="inoncardiner" />
                </div>
                <div className="innercontent">
                  <h6 className="inertext">Total Users</h6>
                  <h3 className="commoncardtext">178+</h3>
                </div>
              </div>
            </div>
            <div className="new_card">
              <div className='cardinercont'>
                <div className="imgouterdiv">
                  <img src="\dashboard\card2.svg" className="inoncardiner" />
                </div>
                <div className="innercontent">
                  <h6 className="inertext">Total NFT’s</h6>
                  <h3 className="commoncardtext">178+</h3>
                </div>
              </div>
            </div>
            <div className="new_card">
              <div className='cardinercont'>
                <div className="imgouterdiv">
                  <img src="\dashboard\card3.svg" className="inoncardiner" />
                </div>
                <div className="innercontent">
                  <h6 className="inertext">Total Collection’s</h6>
                  <h3 className="commoncardtext">178+</h3>
                </div>
              </div>
            </div>
            <div className="new_card">
              <div className='cardinercont'>
                <div className="imgouterdiv">
                  <img src="\dashboard\card4.svg" className="inoncardiner" />
                </div>
                <div className="innercontent">
                  <h6 className="inertext">Total Transaction’s</h6>
                  <h3 className="commoncardtext">178+</h3>
                </div>
              </div>
            </div>
            <div className="new_card">
              <div className='cardinercont'>
                <div className="imgouterdiv">
                  <img src="\dashboard\card5.svg" className="inoncardiner" />
                </div>
                <div className="innercontent">
                  <h6 className="inertext">Total Artist’s</h6>
                  <h3 className="commoncardtext">178+</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-xl-8 col-sm-12">
              <div className='chartouterdiv'>
                <div className="dashbodtop_left ">
                  <h5 className="statay">
                  Sales Report
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M14.1036 2.96822V1.73013C14.1036 1.40473 13.8337 1.13489 13.5083 1.13489C13.1829 1.13489 12.9131 1.40473 12.9131 1.73013V2.9206H7.75435V1.73013C7.75435 1.40473 7.48451 1.13489 7.15911 1.13489C6.83372 1.13489 6.56388 1.40473 6.56388 1.73013V2.96822C4.42102 3.16663 3.38134 4.44441 3.22261 6.34124C3.20673 6.5714 3.39721 6.76187 3.61943 6.76187H17.048C17.2782 6.76187 17.4686 6.56346 17.4448 6.34124C17.2861 4.44441 16.2464 3.16663 14.1036 2.96822Z" fill="#862FC0" />
                          <path d="M16.6825 7.95227H3.98408C3.54757 7.95227 3.19043 8.30941 3.19043 8.74592V13.6348C3.19043 16.0158 4.38091 17.6031 7.15868 17.6031H13.5079C16.2857 17.6031 17.4761 16.0158 17.4761 13.6348V8.74592C17.4761 8.30941 17.119 7.95227 16.6825 7.95227ZM8.119 14.5951C8.07932 14.6269 8.03964 14.6666 7.99995 14.6904C7.95233 14.7221 7.90472 14.7459 7.8571 14.7618C7.80948 14.7856 7.76186 14.8015 7.71424 14.8094C7.65868 14.8173 7.61106 14.8253 7.55551 14.8253C7.45233 14.8253 7.34916 14.8015 7.25392 14.7618C7.15075 14.7221 7.07138 14.6666 6.99202 14.5951C6.84916 14.4443 6.76186 14.238 6.76186 14.0316C6.76186 13.8253 6.84916 13.6189 6.99202 13.4681C7.07138 13.3967 7.15075 13.3412 7.25392 13.3015C7.39678 13.238 7.55551 13.2221 7.71424 13.2539C7.76186 13.2618 7.80948 13.2777 7.8571 13.3015C7.90472 13.3173 7.95233 13.3412 7.99995 13.3729C8.03964 13.4047 8.07932 13.4364 8.119 13.4681C8.26186 13.6189 8.34916 13.8253 8.34916 14.0316C8.34916 14.238 8.26186 14.4443 8.119 14.5951ZM8.119 11.8173C7.96821 11.9602 7.76186 12.0475 7.55551 12.0475C7.34916 12.0475 7.14281 11.9602 6.99202 11.8173C6.84916 11.6666 6.76186 11.4602 6.76186 11.2539C6.76186 11.0475 6.84916 10.8412 6.99202 10.6904C7.21424 10.4681 7.56345 10.3967 7.8571 10.5237C7.96027 10.5634 8.04757 10.6189 8.119 10.6904C8.26186 10.8412 8.34916 11.0475 8.34916 11.2539C8.34916 11.4602 8.26186 11.6666 8.119 11.8173ZM10.8968 14.5951C10.746 14.738 10.5396 14.8253 10.3333 14.8253C10.1269 14.8253 9.92059 14.738 9.76979 14.5951C9.62694 14.4443 9.53964 14.238 9.53964 14.0316C9.53964 13.8253 9.62694 13.6189 9.76979 13.4681C10.0634 13.1745 10.6031 13.1745 10.8968 13.4681C11.0396 13.6189 11.1269 13.8253 11.1269 14.0316C11.1269 14.238 11.0396 14.4443 10.8968 14.5951ZM10.8968 11.8173C10.8571 11.8491 10.8174 11.8808 10.7777 11.9126C10.7301 11.9443 10.6825 11.9681 10.6349 11.984C10.5873 12.0078 10.5396 12.0237 10.492 12.0316C10.4365 12.0396 10.3888 12.0475 10.3333 12.0475C10.1269 12.0475 9.92059 11.9602 9.76979 11.8173C9.62694 11.6666 9.53964 11.4602 9.53964 11.2539C9.53964 11.0475 9.62694 10.8412 9.76979 10.6904C9.84122 10.6189 9.92852 10.5634 10.0317 10.5237C10.3254 10.3967 10.6746 10.4681 10.8968 10.6904C11.0396 10.8412 11.1269 11.0475 11.1269 11.2539C11.1269 11.4602 11.0396 11.6666 10.8968 11.8173ZM13.6746 14.5951C13.5238 14.738 13.3174 14.8253 13.1111 14.8253C12.9047 14.8253 12.6984 14.738 12.5476 14.5951C12.4047 14.4443 12.3174 14.238 12.3174 14.0316C12.3174 13.8253 12.4047 13.6189 12.5476 13.4681C12.8412 13.1745 13.3809 13.1745 13.6746 13.4681C13.8174 13.6189 13.9047 13.8253 13.9047 14.0316C13.9047 14.238 13.8174 14.4443 13.6746 14.5951ZM13.6746 11.8173C13.6349 11.8491 13.5952 11.8808 13.5555 11.9126C13.5079 11.9443 13.4603 11.9681 13.4127 11.984C13.365 12.0078 13.3174 12.0237 13.2698 12.0316C13.2142 12.0396 13.1587 12.0475 13.1111 12.0475C12.9047 12.0475 12.6984 11.9602 12.5476 11.8173C12.4047 11.6666 12.3174 11.4602 12.3174 11.2539C12.3174 11.0475 12.4047 10.8412 12.5476 10.6904C12.6269 10.6189 12.7063 10.5634 12.8095 10.5237C12.9523 10.4602 13.1111 10.4443 13.2698 10.4761C13.3174 10.484 13.365 10.4999 13.4127 10.5237C13.4603 10.5396 13.5079 10.5634 13.5555 10.5951C13.5952 10.6269 13.6349 10.6586 13.6746 10.6904C13.8174 10.8412 13.9047 11.0475 13.9047 11.2539C13.9047 11.4602 13.8174 11.6666 13.6746 11.8173Z" fill="#862FC0" />
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
                <div id="chart">
                  <ReactApexChart options={options} series={series} type="line" height={350} />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 ">
              <div className='dash_leftouter'>
                <div className='dash_leftinertop'>
                  <h5 className='lefttophdng'>
                    Top Items
                  </h5>
                  <h5 className='lefttophdngright'>
                    View All
                  </h5>
                </div>
                <div className='dash_leftinersec_scrol'>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item1.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Taiyo Infants</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item2.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Kups by Raposa</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item3.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">The Anon Club</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item1.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Taiyo Infants</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item2.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Kups by Raposa</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item1.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Taiyo Infants</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item2.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Kups by Raposa</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item3.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">The Anon Club</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item1.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Taiyo Infants</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                  <div className='scrolinerlefttop'>
                    <div className='scrolinerleft_iner'>
                      <img src="\dashboard\item2.svg" className="inoncardinerxx" />
                    </div>
                    <div className='scrolinerleft_text'>
                      <h6 className="inertextc">Kups by Raposa</h6>
                      <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />8,547.2+ <span className='corre'>
                        CORE  </span></h3>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="row my-4 columnreverse">
            <div className="col-xl-8 col-sm-12 ">
              <div className='chartouterdiv'>
                <div className="dashbodtop_left mb-0">
                  <h5 className="statay">
                    Sales
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M14.1036 2.96822V1.73013C14.1036 1.40473 13.8337 1.13489 13.5083 1.13489C13.1829 1.13489 12.9131 1.40473 12.9131 1.73013V2.9206H7.75435V1.73013C7.75435 1.40473 7.48451 1.13489 7.15911 1.13489C6.83372 1.13489 6.56388 1.40473 6.56388 1.73013V2.96822C4.42102 3.16663 3.38134 4.44441 3.22261 6.34124C3.20673 6.5714 3.39721 6.76187 3.61943 6.76187H17.048C17.2782 6.76187 17.4686 6.56346 17.4448 6.34124C17.2861 4.44441 16.2464 3.16663 14.1036 2.96822Z" fill="#862FC0" />
                          <path d="M16.6825 7.95227H3.98408C3.54757 7.95227 3.19043 8.30941 3.19043 8.74592V13.6348C3.19043 16.0158 4.38091 17.6031 7.15868 17.6031H13.5079C16.2857 17.6031 17.4761 16.0158 17.4761 13.6348V8.74592C17.4761 8.30941 17.119 7.95227 16.6825 7.95227ZM8.119 14.5951C8.07932 14.6269 8.03964 14.6666 7.99995 14.6904C7.95233 14.7221 7.90472 14.7459 7.8571 14.7618C7.80948 14.7856 7.76186 14.8015 7.71424 14.8094C7.65868 14.8173 7.61106 14.8253 7.55551 14.8253C7.45233 14.8253 7.34916 14.8015 7.25392 14.7618C7.15075 14.7221 7.07138 14.6666 6.99202 14.5951C6.84916 14.4443 6.76186 14.238 6.76186 14.0316C6.76186 13.8253 6.84916 13.6189 6.99202 13.4681C7.07138 13.3967 7.15075 13.3412 7.25392 13.3015C7.39678 13.238 7.55551 13.2221 7.71424 13.2539C7.76186 13.2618 7.80948 13.2777 7.8571 13.3015C7.90472 13.3173 7.95233 13.3412 7.99995 13.3729C8.03964 13.4047 8.07932 13.4364 8.119 13.4681C8.26186 13.6189 8.34916 13.8253 8.34916 14.0316C8.34916 14.238 8.26186 14.4443 8.119 14.5951ZM8.119 11.8173C7.96821 11.9602 7.76186 12.0475 7.55551 12.0475C7.34916 12.0475 7.14281 11.9602 6.99202 11.8173C6.84916 11.6666 6.76186 11.4602 6.76186 11.2539C6.76186 11.0475 6.84916 10.8412 6.99202 10.6904C7.21424 10.4681 7.56345 10.3967 7.8571 10.5237C7.96027 10.5634 8.04757 10.6189 8.119 10.6904C8.26186 10.8412 8.34916 11.0475 8.34916 11.2539C8.34916 11.4602 8.26186 11.6666 8.119 11.8173ZM10.8968 14.5951C10.746 14.738 10.5396 14.8253 10.3333 14.8253C10.1269 14.8253 9.92059 14.738 9.76979 14.5951C9.62694 14.4443 9.53964 14.238 9.53964 14.0316C9.53964 13.8253 9.62694 13.6189 9.76979 13.4681C10.0634 13.1745 10.6031 13.1745 10.8968 13.4681C11.0396 13.6189 11.1269 13.8253 11.1269 14.0316C11.1269 14.238 11.0396 14.4443 10.8968 14.5951ZM10.8968 11.8173C10.8571 11.8491 10.8174 11.8808 10.7777 11.9126C10.7301 11.9443 10.6825 11.9681 10.6349 11.984C10.5873 12.0078 10.5396 12.0237 10.492 12.0316C10.4365 12.0396 10.3888 12.0475 10.3333 12.0475C10.1269 12.0475 9.92059 11.9602 9.76979 11.8173C9.62694 11.6666 9.53964 11.4602 9.53964 11.2539C9.53964 11.0475 9.62694 10.8412 9.76979 10.6904C9.84122 10.6189 9.92852 10.5634 10.0317 10.5237C10.3254 10.3967 10.6746 10.4681 10.8968 10.6904C11.0396 10.8412 11.1269 11.0475 11.1269 11.2539C11.1269 11.4602 11.0396 11.6666 10.8968 11.8173ZM13.6746 14.5951C13.5238 14.738 13.3174 14.8253 13.1111 14.8253C12.9047 14.8253 12.6984 14.738 12.5476 14.5951C12.4047 14.4443 12.3174 14.238 12.3174 14.0316C12.3174 13.8253 12.4047 13.6189 12.5476 13.4681C12.8412 13.1745 13.3809 13.1745 13.6746 13.4681C13.8174 13.6189 13.9047 13.8253 13.9047 14.0316C13.9047 14.238 13.8174 14.4443 13.6746 14.5951ZM13.6746 11.8173C13.6349 11.8491 13.5952 11.8808 13.5555 11.9126C13.5079 11.9443 13.4603 11.9681 13.4127 11.984C13.365 12.0078 13.3174 12.0237 13.2698 12.0316C13.2142 12.0396 13.1587 12.0475 13.1111 12.0475C12.9047 12.0475 12.6984 11.9602 12.5476 11.8173C12.4047 11.6666 12.3174 11.4602 12.3174 11.2539C12.3174 11.0475 12.4047 10.8412 12.5476 10.6904C12.6269 10.6189 12.7063 10.5634 12.8095 10.5237C12.9523 10.4602 13.1111 10.4443 13.2698 10.4761C13.3174 10.484 13.365 10.4999 13.4127 10.5237C13.4603 10.5396 13.5079 10.5634 13.5555 10.5951C13.5952 10.6269 13.6349 10.6586 13.6746 10.6904C13.8174 10.8412 13.9047 11.0475 13.9047 11.2539C13.9047 11.4602 13.8174 11.6666 13.6746 11.8173Z" fill="#862FC0" />
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
                <div className='btumouterhdngmain'>
                  <div className='inerbutmsec'>
                    <h3 className="commoncardtextbutm">    <img src="\dashboard\iconbig.svg" className="inon" alt='icon' />500,058 CORE</h3>
                    <p className='tootall'>
                      TOTAL
                    </p>
                  </div>
                  <div className='inerbutmsec'>
                    <h3 className="commoncardtextbutm">    <img src="\dashboard\iconbig.svg" className="inon" alt='icon' />54,896 CORE</h3>
                    <p className='tootall'>
                      AVERAGE
                    </p>
                  </div>
                </div>
                <div className='table-responsive dastoutertable'>
                  <div class="tablerow">
                    <p className='toptaberow'>Year</p>
                    <p className='toptaberow'>Sales Count</p>
                    <p className='toptaberow'>Growth</p>
                    <p className='toptaberow'>Earnings</p>
                  </div>
                  <div class="tablerow">
                    <p className='sectblerow'>2023</p>
                    <p className='sectblerow'>7,2039</p>
                    <p className='sectblerow green'>+24%</p>
                    <p className='sectblerow'>789,845.00</p>
                  </div>
                  <div class="tablerow">
                    <p className='sectblerow'>2023</p>
                    <p className='sectblerow'>7,2039</p>
                    <p className='sectblerow red'>Growth</p>
                    <p className='sectblerow'>789,845.00</p>
                  </div>
                  <div class="tablerow">
                    <p className='sectblerow'>2023</p>
                    <p className='sectblerow'>7,2039</p>
                    <p className='sectblerow green'>+24%</p>
                    <p className='sectblerow'>789,845.00</p>
                  </div>
                  <div class="tablerow">
                    <p className='sectblerow'>2023</p>
                    <p className='sectblerow'>7,2039</p>
                    <p className='sectblerow red'>Growth</p>
                    <p className='sectblerow'>789,845.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 ">
              <div className='dash_butmright_outer_chart'>
                <div className='dash_butmouter_chart_inertext'>
                  <div className="imgouterdivxx">
                    <img src="\dashboard\charts.svg" className="inoncardinercx" />
                  </div>
                  <p className='revng'>
                    Revenue
                  </p>
                  <p className='cvfred'>
                    532K CORE
                  </p>
                </div>
                <div className='dash_butmouter_chart_inertextright'>
                  {/* <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={100} />
                  </div> */}
                  <img src="\dashboard\grnchart.svg" className=" w-100"/>

                  <div className='inercrt'>
                    <p className='revngggren'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.52904 3.98754L4.99987 1.45837L2.4707 3.98754" stroke="#04C182" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 8.54168L5 1.52917" stroke="#04C182" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      24.87%
                    </p>
                    <p className='month'>
                      This month
                    </p>
                  </div>

                </div>

              </div>
              <div className='dash_butmright_outer_chart'>
                <div className='dash_butmouter_chart_inertext'>
                  <div className="imgouterdivxx">
                    <img src="\dashboard\charts2.svg" className="inoncardinercx" />
                  </div>
                  <p className='revng'>
                    Sales
                  </p>
                  <p className='cvfred'>
                    153 Units
                  </p>
                </div>
                <div className='dash_butmouter_chart_inertextright'>
                  {/* <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={100} />
                  </div> */}
                  <img src="\dashboard\grnchart2.svg" className=" w-100" />
        

                  <div className='inercrt'>
                    <p className='revngggren red'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.52904 6.01246L4.99987 8.54163L2.4707 6.01246" stroke="#E84A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 1.45832L5 8.47083" stroke="#E84A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      24.87%
                    </p>
                    <p className='month'>
                      This month
                    </p>
                  </div>

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