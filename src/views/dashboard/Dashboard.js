import Environment from 'utils/Environment';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import arrowdown from "assets/img/userflow/arrow-down.png";
import ReactApexChart from "react-apexcharts";
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";

function Dashboard() {
  const api_url = Environment.api_url;
  const val = localStorage.getItem("accessToken");
  const history = useHistory();
  const [setalllset, setSetalllset] = useState();
  const [setDataTime, setSetDataTime] = useState();
  const [loader, setLoader] = useState(false);
  const [stats, setStats] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  console.log(count, 'asdfdsafdsa');
  const [alllset, setAlllset] = useState();
  const [showcalendar2, setShowCalendar2] = useState(false);
  const [showcalendar1, setShowCalendar1] = useState(false);
  const [showcalendar3, setShowCalendar3] = useState(false);
  const [showcalendar4, setShowCalendar4] = useState(false);
  const [activeButton, setActiveButton] = useState('All');
  const [activeButtonTwo, setActiveButtonTwo] = useState('All');
  const [totalSalePrice, setTotalSalePrice] = useState('');
  const [currentMonthPrice, setCurrentMonthPrice] = useState('');
  const [lastMonthPrice, setLastMonthPrice] = useState('');
  const [totalSaleCount, setTotalSaleCount] = useState('');
  const [currentMonthCount, setCurrentMonthCount] = useState('');
  const [lastMonthCount, setLastMonthCount] = useState('');
  const [yearData, setYearData] = useState([]);
  const [totalYear, setTotalYear] = useState("");
  const [trans, setTrans] = useState("");

  const [endDate, setEndDate] = useState('');
  const Acls = JSON.parse(localStorage.getItem('acls'))
  const [calledAPI, setCalledAPI] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (value) => {
    setSelectedDates(value);
    if (Array.isArray(value) && value.length === 2) {
      setShowCalendar2(false);
      newUserchartHandle(value[0], value[1]);
      setSelectedDates([]);
    }
  };

  const [selectedDatesTwo, setSelectedDatesTwo] = useState([]);

  const handleDateChangeTwo = (value) => {
    setSelectedDatesTwo(value);
    if (Array.isArray(value) && value.length === 2) {
      setShowCalendar1(false);
      getYearData(value[0], value[1]);
      setSelectedDatesTwo([]);
    }
  };


  const getOrderStats = async () => {

    setStats([]);
    const config = {
      method: "get",
      url: api_url + "/admins/stats",
      headers: {
        Authorization: "Bearer " + val,
      },
    };
    await axios(config)
      .then((res) => {
        const resData = res?.data?.data;
        console.log("order stats: ", resData);
        setStats(resData);
      })
      .catch((error) => {
        if (error?.response?.status == 501) {
          localStorage.removeItem("accessToken");
          history.push("/");
        }
      });
  };

  const getTopItems = async () => {
    setLoader(true);
    setTopItems([]);
    const config = {
      method: "get",
      url: api_url + "/nfts/top-items?offset=1&limit=10&orderField=price&orderDirection=-1",
      headers: {
        Authorization: "Bearer " + val,
      },
    };
    await axios(config)
      .then((res) => {
        const resData = res?.data?.data;
        setTopItems(resData?.nfts);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        if (error?.response?.status == 501) {
          localStorage.removeItem("accessToken");
          history.push("/");
        }
      });
  };

  // const getSaleReport = async () => {
  //   const config = {
  //     method: "get",
  //     url: api_url + "/nfts/sale-Reports",
  //     headers: {
  //       Authorization: "Bearer " + val,
  //     },
  //   };
  //   await axios(config)
  //     .then((res) => {
  //       const resData = res?.data?.data;
  //       console.log("top okokokokok", resData?.count, resData?.nfts, resData?.dailyTotalPrices);
  //       setCount(resData?.count);
  //       setCount1(resData?.dailyTotalPrices);
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       if (error?.response?.status == 501) {
  //         localStorage.removeItem("accessToken");
  //         history.push("/");
  //       }
  //     });
  // };

  const newUserchartHandle = (startDate, endDate) => {
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';

    let url = `${api_url}/sales/`;

    if (startDate && endDate) {
      url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }

    axios.get(url, { headers: { "Authorization": `Bearer ${val}` } })
      .then((response) => {
        console.log("🚀 ~ response newUserchartHandle", response);
        const dates = [];
        const counts = [];
        response.data.data.dailyTotalPrices.forEach(user => {
          dates.push(user.date);
          counts.push(user.sale?.toFixed(4));
        });

        setCount(dates);
        setCount1(counts);
        setTrans(response?.data?.data?.count);
        setTotalSalePrice(response?.data?.data?.totalSalePriceSum);
        setCurrentMonthPrice(response?.data?.data?.currentMonthTotalSalePriceSum);
        setLastMonthPrice(response?.data?.data?.lastMonthTotalSalePriceSum);
        setTotalSaleCount(response?.data?.data?.totalSaleCount);
        setCurrentMonthCount(response?.data?.data?.currentMonthTotalSaleCount);
        setLastMonthCount(response?.data?.data?.lastMonthTotalSaleCount);

        console.log('Dates:', dates);
        console.log('Counts:', counts);
      })
      .catch((err) => {
        console.log(err, 'error in API call');
        // Handle errors
      });
  }



  const getYearData = async (startDate, endDate) => {
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';
    let url = `${api_url}/sales/SaleWithDate`;

    if (startDate && endDate) {
      url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }

    axios.get(url, { headers: { "Authorization": `Bearer ${val}` } })
      .then((response) => {
        setYearData(response?.data?.data?.dailyTotalPrices);

      })
      .catch((error) => {
        if (error?.response?.status == 501) {
          localStorage.removeItem("accessToken");
          history.push("/");
        }
      });
  };


  useEffect(() => {
    getOrderStats();
    getTopItems();
    getYearData();

  }, []);

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
        top: 9,
        left: 5,
        blur: 10,
        opacity: 1,
        color: '#862FC0'
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      axisBorder: {
        show: false // Hide the x-axis border
      },
      axisTicks: {
        show: false // Hide the x-axis ticks
      },
      labels: {
        style: {
          colors: '#725196' // Customize the color of x-axis labels
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#725196' // Customize the color of y-axis labels
        }
      }
    },
    tooltip: {
      enabled: false // Remove the tooltip
    },
    grid: {
      show: false // Hide the center line of the chart
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
        strokeWidth: 5,
        fill: {
          type: 'solid'
        }
      }
    }
  });


  const [options1, setobject1] = useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#04C182'],
      width: 3,
    },
    xaxis: {
      type: 'datetime',
      categories: count1,
      // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      labels: {
        show: false, // Hide x-axis labels
      }
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      }
    },
    grid: {
      show: false // Hide the grid
    },
    plotOptions: {
      area: {
        fillTo: 'origin', // Fill area to the x-axis
        opacity: 0.5,
        colors: ['#04C182'],
      }
    }
  });

  const [options2, setobject2] = useState({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#E84A4A'],
      width: 3,
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      labels: {
        show: false, // Hide x-axis labels
      }
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      }
    },
    grid: {
      show: false // Hide the grid
    },
    plotOptions: {
      area: {
        fillTo: 'origin', // Fill area to the x-axis
        opacity: 0.5,
        colors: ['#E84A4A'],
      }
    }
  });

  const state = {
    series: [
      {
        name: 'New users',
        // data: [31, 40, 28, 51, 42, 109, 100]
        data: count1
        // data: newUChartcounts
      }
      // {
      //   name: 'series2',
      //   data: [11, 32, 45, 32, 34, 52, 41]
      // }
    ],
    options: {
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
          top: 9,
          left: 5,
          blur: 10,
          opacity: 1,
          color: '#862FC0'
        }
      },
      xaxis: {
        type: 'datetime',
        categories: count,
        // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
        axisBorder: {
          show: false // Hide the x-axis border
        },
        axisTicks: {
          show: false // Hide the x-axis ticks
        },
        labels: {
          style: {
            colors: '#725196' // Customize the color of x-axis labels
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#725196' // Customize the color of y-axis labels
          }
        }
      },
      tooltip: {
        enabled: false // Remove the tooltip
      },
      grid: {
        show: false // Hide the center line of the chart
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
          strokeWidth: 5,
          fill: {
            type: 'solid'
          }
        }
      }
    }
  }

  const [series, setseries] = useState(
    [
      {
        name: 'series1',
        data: count
        // data: [31, 40, 90, 51, 42, 109, 100, 120,]
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

  const calculatePastDate = (days) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);
    return pastDate.toISOString().split('T')[0];
  };


  const handleDateButtonClick = (days) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = calculatePastDate(days);
    newUserchartHandle(startDate, endDate);
  };


  const handleDateButtonClickTwo = (days) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = calculatePastDate(days);
    getYearData(startDate, endDate);
  };


  useEffect(() => {
    if (!calledAPI) {
      newUserchartHandle();
      setCalledAPI(true);
    }
  }, [calledAPI]);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleClickTwo = (buttonName) => {
    setActiveButtonTwo(buttonName);
  };
  
  const normalizeImageLink = (link) => {
    // Check if the link starts with "ipfs://"
    if (link?.startsWith("ipfs://")) {
      // Extract the hash from the link
      const hash = link?.replace(/^ipfs:\/\//, '');
      // Construct the normalized link
      return `https://ipfs-lb.com/ipfs/${hash}`;
    } else if (link?.startsWith("/")) {
      // Extract the hash from the link
      const hash = link.replace(/^\//, '');
      // Construct the normalized link
      return `https://ipfs-lb.com/ipfs/${hash}`;
    }
    // If the link doesn't match the expected formats, return it as is
    return link;
  };
  return (
    <>
      <div className="content">
        <section className="main-dashboard">
          <div className="row ">
            <div className="col-xl-12 col-sm-12  nopaddingonmobileonly">
              <div className="dashbrd_top_cardmaindiv ">
                <div className="new_card">
                  <div className='cardinercont'>
                    <div className="imgouterdiv">
                      <img src="\dashboard\card1.svg" className="inoncardiner" />
                    </div>
                    <div className="innercontent">
                      <h6 className="inertext">Total Users</h6>
                      {stats?.users &&
                        Object.keys(stats).length > 0 ? (
                        <h3 className="commoncardtext">   {" "}
                          {stats?.users}</h3>
                      ) : (
                        <h3 className="commoncardtext">   {" "}
                          0</h3>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="new_card">
                  <div className='cardinercont'>
                    <div className="imgouterdiv">
                      <img src="\dashboard\card2.svg" className="inoncardiner" />
                    </div>
                    <div className="innercontent">
                      <h6 className="inertext">Total NFTs</h6>
                      {stats?.nfts  &&
                        Object.keys(stats).length > 0 ? (
                      <h3 className="commoncardtext">   {" "}
                      {stats?.nfts}</h3>
                      ) : (
                        <h3 className="commoncardtext">   {" "}
                      0</h3>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="new_card">
                  <div className='cardinercont'>
                    <div className="imgouterdiv">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.35714 2C3.06488 2 2 3.06488 2 4.35714V15.3571C2 16.6494 3.06488 17.7143 4.35714 17.7143H5.14286V18.5C5.14286 19.7923 6.20774 20.8571 7.5 20.8571H8.28571V21.6429C8.28571 22.9351 9.35059 24 10.6429 24H21.6429C22.9351 24 24 22.9351 24 21.6429V10.6429C24 9.35059 22.9351 8.28571 21.6429 8.28571H20.8571V7.5C20.8571 6.20774 19.7923 5.14286 18.5 5.14286H17.7143V4.35714C17.7143 3.06488 16.6494 2 15.3571 2H4.35714ZM4.35714 3.57143H15.3571C15.806 3.57143 16.1429 3.90827 16.1429 4.35714V5.14286H7.5C6.20774 5.14286 5.14286 6.20774 5.14286 7.5V16.1429H4.35714C3.90827 16.1429 3.57143 15.806 3.57143 15.3571V4.35714C3.57143 3.90827 3.90827 3.57143 4.35714 3.57143ZM7.5 6.71429H18.5C18.9489 6.71429 19.2857 7.05113 19.2857 7.5V8.28571H10.6429C9.35059 8.28571 8.28571 9.35059 8.28571 10.6429V19.2857H7.5C7.05113 19.2857 6.71429 18.9489 6.71429 18.5V7.5C6.71429 7.05113 7.05113 6.71429 7.5 6.71429ZM10.6429 9.85714H21.6429C22.0917 9.85714 22.4286 10.194 22.4286 10.6429V21.6429C22.4286 22.0917 22.0917 22.4286 21.6429 22.4286H10.6429C10.194 22.4286 9.85714 22.0917 9.85714 21.6429C9.85714 17.9762 9.85714 14.3095 9.85714 10.6429C9.85714 10.194 10.194 9.85714 10.6429 9.85714Z" fill="#862FC0" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.143 11.4286C15.9346 11.4286 15.7348 11.5114 15.5874 11.6587C15.4401 11.8061 15.3573 12.0059 15.3573 12.2143V15.3572H12.2144C12.006 15.3572 11.8062 15.4399 11.6588 15.5873C11.5115 15.7346 11.4287 15.9345 11.4287 16.1429C11.4287 16.3513 11.5115 16.5511 11.6588 16.6985C11.8062 16.8458 12.006 16.9286 12.2144 16.9286H15.3573V20.0714C15.3573 20.2798 15.4401 20.4797 15.5874 20.627C15.7348 20.7744 15.9346 20.8572 16.143 20.8572C16.3514 20.8572 16.5512 20.7744 16.6986 20.627C16.8459 20.4797 16.9287 20.2798 16.9287 20.0714V16.9286H20.0716C20.28 16.9286 20.4798 16.8458 20.6272 16.6985C20.7745 16.5511 20.8573 16.3513 20.8573 16.1429C20.8573 15.9345 20.7745 15.7346 20.6272 15.5873C20.4798 15.4399 20.28 15.3572 20.0716 15.3572H16.9287V12.2143C16.9287 12.0059 16.8459 11.8061 16.6986 11.6587C16.5512 11.5114 16.3514 11.4286 16.143 11.4286Z" fill="#862FC0" />
                      </svg>
                      {/* <img src="\dashboard\card3.svg" className="inoncardiner" /> */}
                    </div>
                    <div className="innercontent">
                      <h6 className="inertext">Total Collections</h6>
                      {stats?.collections &&
                        Object.keys(stats).length > 0 ? (
                        <h3 className="commoncardtext">   {" "}
                          {stats?.collections}</h3>
                      ) : (
                        <h3 className="commoncardtext">   {" "}
                          0</h3>
                      )}
                    </div>
                  </div>
                </div>
                <div className="new_card">
                  <div className='cardinercont'>
                    <div className="imgouterdiv">
                      <img src="\dashboard\card4.svg" className="inoncardiner" />
                    </div>
                    <div className="innercontent">
                      <h6 className="inertext">Total Transactions</h6>
                      {trans &&
                        Object.keys(stats).length > 0 ? (
                        <h3 className="commoncardtext">   {" "}
                          {trans}</h3>
                      ) : (
                        <h3 className="commoncardtext">   {" "}
                          0</h3>
                      )}
                    </div>
                  </div>
                </div>
                <div className="new_card">
                  <div className='cardinercont'>
                    <div className="imgouterdiv">
                      <img src="\dashboard\card5.svg" className="inoncardiner" />
                    </div>
                    <div className="innercontent">
                      <h6 className="inertext">Total Artists</h6>
                      {stats?.creators &&
                        Object.keys(stats).length > 0 ? (
                        <h3 className="commoncardtext">   {" "}
                          {stats?.creators}</h3>
                      ) : (
                        <h3 className="commoncardtext">   {" "}
                          0</h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-xl-8 col-sm-12 nopaddingonmobileonly">
              <div className='chartouterdiv'>
                <div className="dashbodtop_left ">
                  <h5 className="statay">
                    Sales Report
                  </h5>
                  <div>
                    {/* <img src="/dashboard-assets/issonns.svg" className="img-fluid custom-img" alt="Your Alt Text" /> */}
                    <div className="custom-tab-bar">

                      <a className={activeButton === '1D' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClick(1), handleClick("1D"))}>
                        1D
                      </a>

                      <a className={activeButton === '7D' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClick(7), handleClick("7D"))}>
                        7D
                      </a>

                      <a className={activeButton === '1M' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClick(30), handleClick("1M"))}>
                        1M
                      </a>

                      <a className={activeButton === '1Y' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClick(365), handleClick("1Y"))}>
                        1Y
                      </a>

                      <a className={activeButton === 'All' ? 'clanderdate active' : 'clanderdate'} onClick={() => (newUserchartHandle(), handleClick("All"))}>
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
                            multiple
                            value={selectedDates}
                            onChange={handleDateChange} // Call handleDateChange when a date or range of dates is selected
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div id="chart">
                  <ReactApexChart options={state?.options} series={state?.series} type="line" height={350} />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 nopaddingonmobileonly">
              <div className='dash_leftouter'>
                <div className='dash_leftinertop'>
                  <h5 className='lefttophdng'>
                    Top Items
                  </h5>
                  {/* <h5 className='lefttophdngright'>
                    View All
                  </h5> */}
                </div>
                <div className='dash_leftinersec_scrol'>
                  {topItems.length > 0 ? (
                    topItems?.map((item, index) => {
                      return (
                        <>
                          <div key={index} className='scrolinerlefttop'>
                            <div className='scrolinerleft_iner'>

                              {item?.nft &&
                                <img src={(normalizeImageLink(item?.nft?.image))} className="inoncardinerxx" />
                                // <img src={item} className="inoncardinerxx" />
                              }

                            </div>
                            <div className='scrolinerleft_text'>
                              <h6 className="inertextc">{item?.nft?.name}</h6>

                              <h3 className="commoncardtextc">    <img src="\dashboard\iconcc.svg" className="inon" alt='icon' />{item?.price} <span className='corre'>
                                CORE  </span></h3>
                            </div>
                          </div>
                        </>
                      )
                    })
                  ) : loader ? (


                    <div className="text-center">
                      {<Spinner animation="border" style={{ color: "#862fc0" }} />}
                      {/* <h4>No Categories</h4> */}
                    </div>


                  ) : (
                    <p class="text-center text-white mt-3">No Records</p>
                  )}
                </div>
              </div>

            </div>
          </div>
          <div className="row my-4 columnreverse ">
            <div className="col-xl-8 col-sm-12 nopaddingonmobileonly ">
              <div className='chartouterdiv'>
                <div className="dashbodtop_left mb-0">
                  <h5 className="statay">
                    Sales
                  </h5>
                  <div>
                    <div className="custom-tab-bar">
                      <a className={activeButtonTwo === '1D' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClickTwo(1), handleClickTwo("1D"))}
                      >
                        1D
                      </a>
                      <a className={activeButtonTwo === '7D' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClickTwo(7), handleClickTwo("7D"))}
                      >
                        7D
                      </a>
                      <a className={activeButtonTwo === '1M' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClickTwo(30), handleClickTwo("1M"))}>
                        1M
                      </a>
                      <a className={activeButtonTwo === '1Y' ? 'clanderdate active' : 'clanderdate'} onClick={() => (handleDateButtonClickTwo(365), handleClickTwo("1Y"))} >
                        1Y
                      </a>
                      <a className={activeButtonTwo === 'All' ? 'clanderdate active' : 'clanderdate'} onClick={() => (getYearData(), handleClickTwo("All"))}>
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
                            multiple
                            value={selectedDatesTwo}
                            onChange={handleDateChangeTwo} // Call handleDateChange when a date or range of dates is selected
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='btumouterhdngmain'>
                  <div className='inerbutmsec'>
                    <h3 className="commoncardtextbutm">    <img src="\dashboard\iconbig.svg" className="inon" alt='icon' />{totalYear?.toString().substring(0, 7)} CORE</h3>
                    <p className='tootall'>
                      TOTAL
                    </p>
                  </div>
                  {/* <div className='inerbutmsec'>
                    <h3 className="commoncardtextbutm">    <img src="\dashboard\iconbig.svg" className="inon" alt='icon' />54,896 CORE</h3>
                    <p className='tootall'>
                      AVERAGE
                    </p>
                  </div> */}
                </div>
                <div className='table-responsive dastoutertable'>
                  <div class="tablerow">
                    <p className='toptaberow'>Year</p>
                    <p className='toptaberow'>Sales Count</p>
                    <p className='toptaberow'>Growth</p>
                    <p className='toptaberow'>Earnings</p>
                  </div>
                  {yearData?.map((item, index) => {
                    return (
                      <>
                        <div key={index} class="tablerow">
                          <p className='sectblerow'>{item?.date}</p>
                          <p className='sectblerow'>{item?.count}</p>
                          <p className={((item?.previousCount - item?.count) / item?.previousCount * 100 >= 0 || (item?.count && item?.previousCount === 0) ? 'sectblerow green' : 'sectblerow red')}>
                            {item?.previousCount && item?.count && item?.previousCount !== 0 && item?.count !== 0 ?
                              (
                                ((item?.previousCount - item?.count) / item?.previousCount * 100).toFixed(2) >= 0 ?
                                  "+" + ((item?.previousCount - item?.count) / item?.previousCount * 100).toFixed(2) + "%" :
                                  ((item?.previousCount - item?.count) / item?.previousCount * 100).toFixed(2) + "%"
                              )
                              :
                              (!item?.count && !item?.previousCount ? "0%" : (item?.count && item?.previousCount === 0 ? "+100%" : (item?.previousCount && item?.count === 0 ? "-100%" : "+100%")))
                            }</p>
                          <p className='sectblerow'>{item?.sale?.toString().substring(0, 7)} CORE</p>
                        </div>
                      </>
                    )
                  })}


                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12 nopaddingonmobileonly">
              <div className='dash_butmright_outer_chart'>
                <div className='dash_butmouter_chart_inertext'>
                  <div className="imgouterdivxx">
                    <img src="\dashboard\charts.svg" className="inoncardinercx" />
                  </div>
                  <p className='revng'>
                    Revenue
                  </p>
                  <p className='cvfred'>
                    {totalSalePrice?.toString().substring(0, 7)} CORE
                  </p>
                </div>
                <div className='dash_butmouter_chart_inertextright'>
                  <div className='onlyfordshsmalchat'>
                    <div id="chart">
                      {/* <ReactApexChart options={options1} series={series} type="area" height={100} /> */}
                    </div>
                    {/* <img src="\dashboard\grnchart.svg" className=" w-100"/> */}
                  </div>



                  <div className='inercrt'>
                    <p className={((lastMonthPrice - currentMonthPrice) / lastMonthPrice * 100 >= 0 || (currentMonthPrice && lastMonthPrice === 0) ? 'revngggren' : 'revngggren red')}>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.52904 3.98754L4.99987 1.45837L2.4707 3.98754" stroke="#04C182" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 8.54168L5 1.52917" stroke="#04C182" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      24.87% */}
                      {lastMonthPrice && currentMonthPrice && lastMonthPrice !== 0 && currentMonthPrice !== 0 ?
                        (
                          ((lastMonthPrice - currentMonthPrice) / lastMonthPrice * 100).toFixed(2) >= 0 ?
                            "+" + ((lastMonthPrice - currentMonthPrice) / lastMonthPrice * 100).toFixed(2) + "%" :
                            ((lastMonthPrice - currentMonthPrice) / lastMonthPrice * 100).toFixed(2) + "%"
                        )
                        :
                        (!currentMonthPrice && !lastMonthPrice ? "0%" : (currentMonthPrice && lastMonthPrice === 0 ? "+100%" : (lastMonthPrice && currentMonthPrice === 0 ? "-100%" : "+100%")))
                      }
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
                    {totalSaleCount} Units
                  </p>
                </div>
                <div className='dash_butmouter_chart_inertextright'>


                  <div className='onlyfordshsmalchat'>
                    <div id="chart">
                      {/* <ReactApexChart options={options2} series={series} type="area" height={100} /> */}
                    </div>
                    {/* <img src="\dashboard\grnchart2.svg" className=" w-100" /> */}
                  </div>


                  <div className='inercrt'>
                    <p
                      // className='revngggren red'
                      className={((lastMonthCount - currentMonthCount) / lastMonthCount * 100 >= 0 || (currentMonthCount && lastMonthCount === 0) ? 'revngggren' : 'revngggren red')}
                    >
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.52904 6.01246L4.99987 8.54163L2.4707 6.01246" stroke="#E84A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 1.45832L5 8.47083" stroke="#E84A4A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      24.87% */}
                      {lastMonthCount && currentMonthCount && lastMonthCount !== 0 && currentMonthCount !== 0 ?
                        (
                          ((lastMonthCount - currentMonthCount) / lastMonthCount * 100).toFixed(2) >= 0 ?
                            "+" + ((lastMonthCount - currentMonthCount) / lastMonthCount * 100).toFixed(2) + "%" :
                            ((lastMonthCount - currentMonthCount) / lastMonthCount * 100).toFixed(2) + "%"
                        )
                        :
                        (!currentMonthCount && !lastMonthCount ? "0%" : (currentMonthCount && lastMonthCount === 0 ? "+100%" : (lastMonthCount && currentMonthCount === 0 ? "-100%" : "+100%")))
                      }
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