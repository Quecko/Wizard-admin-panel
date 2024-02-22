
// import React from "react";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import banner10 from "assets/img/userflow/logout-icon.svg";
import profile from "assets/img/userflow/avatar-03.png";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import logo from "logo.png";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from 'utils/Environment';

var ps;

function Sidebar(props) {
  const api_url = Environment.api_url;
  const val = localStorage.getItem("accessToken");
  const [name, Setname] = useState({})
  const history = useHistory();
  const token = localStorage.getItem('mytoken')
  const role = localStorage.getItem('myrole')
  const Acls = JSON.parse(localStorage.getItem('acls'))
  const sidebar = React.useRef();
  console.log("::::Acls", Acls)
  const logout = () => {
    localStorage.clear();
    history.push("/adminlogin");

  }

  const getprofile = () => {
    axios.get(Environment.backendUrl + "/user/myprofile", { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        Setname(response.data.user)
      }).catch((err) => {
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }

  const handleLogout = (e) => {
    e.preventDefault();

    var config = {
      method: "delete",
      url: `${api_url}/auth/admins/logout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + val,
      },
    };

    axios(config)
      .then(function (response) {
        localStorage.removeItem("accessToken");
        console.log("tokeen: ", response?.data);
        history.push("/adminlogin");

      })
      .catch(function (error) {
        localStorage.removeItem("accessToken");
        history.push("/adminlogin");

      });
  };

  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(sidebar.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //     });
  //   }
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //   };
  // });


  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >

      <div className="sidebar-wrapper" ref={sidebar}>
     <div>
     <div className="logo">
          <Link
            to="/admin/dashboard"
            className="simple-text logo-mini "
          >
            <div className="logo-img">
              {/* <img src={logo} alt="react-logo" /> */}
              <svg width="220" height="45" viewBox="0 0 220 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_267_8412)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5908 37.415L17.5516 26.9581L15.9013 22.9252L15.3979 26.8747L13.1284 32.1094C13.3494 33.8927 13.4694 35.6191 13.5908 37.4147V37.415Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3891 26.8785L22.7047 26.3713L17.9998 27.6783L15.125 38.6662C15.5278 39.3401 15.9283 40.0154 16.3288 40.6896L19.9136 28.4792L22.7047 26.3713L27.417 27.6714L23.3891 26.8785Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4666 30.0233C23.1232 30.1742 23.5697 30.0724 23.8016 29.7159C23.3453 29.9672 22.8792 29.9399 22.4545 29.6314C21.9884 29.9948 21.6524 29.9114 21.1331 29.7159L20.8224 29.5938C20.6477 29.5308 20.4449 29.4601 20.2205 29.3905L17.7617 42.1014C19.4278 43.0587 21.0105 43.8939 22.7045 44.7678L26.6948 42.7034C25.3126 43.2174 24.1247 43.655 22.7109 44.1782L22.4669 30.0233H22.4666Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4804 21.7168C20.1636 21.6826 15.9866 21.5581 16.6395 22.0848C17.9865 23.1528 17.3711 25.6457 17.54 25.7704C18.4526 26.4593 21.2534 21.7855 20.4804 21.7171V21.7168Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2681 28.696L14.9696 25.6273L14.9005 22.0972L13.4332 23.925L13.3129 27.4163L13.3058 27.6084L13.296 27.8185L13.2681 28.696Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.4264 13.6567C23.0528 13.939 20.5929 14.3263 18.2895 14.9409C17.3283 15.1968 16.3538 15.5041 15.4412 15.8856C15.3635 15.9175 15.417 15.8994 15.4642 15.8937C17.0757 15.6617 18.7542 15.4938 20.3814 15.4538C21.0817 15.4366 21.9261 15.4366 22.6181 15.5406C22.6788 15.5498 22.7369 15.559 22.7965 15.5702C17.5044 15.898 -4.55651 19.3574 12.2666 25.4444C7.14198 24.5328 4.30719 23.2512 4.27065 21.0656C4.2344 18.1695 10.9999 16.6889 13.3772 16.2387C13.643 16.1884 13.9086 16.0969 14.1744 16.0308C14.2763 16.0069 14.3128 15.992 14.4063 15.9509C14.6198 15.8583 14.5119 15.8664 14.3528 15.8641C14.2205 15.8629 13.9523 15.8664 14.0651 15.6743C14.1221 15.5783 14.1974 15.4711 14.2581 15.3739C14.9789 14.236 15.5747 13.0366 16.1294 11.8208C16.2094 11.6437 18.2397 6.63645 18.9751 4.97302C19.0565 4.78903 19.1414 4.58807 19.2312 4.40868C19.3368 4.19392 19.7482 3.34381 19.8998 3.06868C20.3901 2.17631 21.0734 1.12438 21.9422 0.520931C23.3474 -0.450215 24.7831 0.0741691 26.0536 0.969992C24.9264 0.369135 23.5051 0.0183958 22.5197 1.04647C22.112 1.47023 21.8657 2.05527 21.7345 2.60812C21.681 2.83207 21.8134 2.84012 21.6655 3.144C21.5999 3.27884 21.6048 3.3349 21.5901 3.48209C21.4701 4.7252 21.6531 6.0767 21.9348 7.29222C21.3608 6.90266 21.0222 6.53468 20.9192 6.18739C20.7298 7.85541 21.6194 8.85157 23.5853 9.175C20.8743 9.68328 19.0442 11.1777 18.0953 13.6567C20.5115 13.1688 23.0102 13.1688 25.4264 13.6567Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8146 21.9316C28.0853 22.3315 27.3303 23.3185 27.2771 25.2059C26.9664 25.3134 26.8208 25.5224 26.0259 24.5559C26.9604 25.9715 27.5778 26.4545 27.8825 26.0011C27.6954 23.9938 28.0062 22.6354 28.8143 21.9316H28.8146Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M31.968 23.925L31.7726 27.6311L30.9316 26.6933C31.3175 27.3353 31.7217 28.0882 32.1354 28.696L31.968 23.925Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M29.645 31.6526L31.8123 37.4151C31.8779 36.22 32.0307 34.4516 32.2747 32.1097C32.0551 33.2303 31.8379 34.3513 31.6181 35.4719L29.645 31.6529V31.6526Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2446 31.0618C27.1886 34.2699 28.1231 37.4846 29.0745 40.6893L30.2748 38.6659C30.1172 38.8065 29.2385 39.5468 29.2008 39.5787C29.2008 39.5787 28.2117 37.1842 26.2446 31.0618Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M29.8948 15.7612C26.6 10.6179 22.6998 -0.34728 29.7481 5.88352C29.1025 3.50051 27.9545 2.52821 26.7119 1.48059C27.844 2.69725 28.5843 3.62729 28.8709 4.57429C28.2143 3.94123 27.1222 3.4134 26.2605 3.47521C26.3586 3.10061 26.7203 2.8594 26.9824 2.76568C25.093 2.8548 24.6401 5.06647 25.8174 8.43788C24.9606 7.5044 24.4074 6.26617 23.9243 5.07567C24.1559 7.82438 27.8757 13.5685 29.8948 15.7609V15.7612Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3633 15.9897C33.8034 16.6363 39.3349 18.9098 39.3349 21.0062C39.3349 23.7023 34.4893 24.6861 32.5778 25.4445C37.7024 24.5328 40.5726 23.2509 40.5726 21.0654C40.5726 18.8799 34.4769 16.4796 26.3633 15.9894V15.9897Z" fill="#6A3190" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5944 25.039C21.286 25.0083 20.9888 24.4873 21.1367 23.7732C20.9376 23.9699 19.7459 25.039 20.5944 25.039ZM21.9765 23.7479C21.3588 24.4048 21.6597 25.2239 22.6146 25.2469C23.4375 25.2664 24.5757 24.9246 24.9192 24.9545C25.0478 24.9672 25.162 25.054 25.2152 25.1808C25.2685 25.3076 25.2541 25.455 25.1775 25.568C25.5464 25.384 25.7553 24.9568 25.6885 24.525C25.5671 23.7494 25.0429 23.9184 24.5247 23.4613C23.4035 22.3027 23.4496 19.7871 23.287 19.1587C23.2447 19.3507 23.2154 19.6158 23.1852 19.924C23.0686 21.0811 22.928 22.8578 21.9765 23.7476V23.7479Z" fill="white" />
                </g>
                <path d="M53.6575 20.463L49.854 7.80606H52.9874L54.8891 14.46C54.9736 14.7614 55.0461 15.0688 55.1065 15.3822C55.1789 15.6835 55.2332 15.9728 55.2695 16.2501C55.3178 16.5273 55.354 16.7865 55.3781 17.0276C55.4023 17.2566 55.4264 17.4495 55.4506 17.6062H55.0521C55.1246 17.1602 55.1849 16.7624 55.2332 16.4128C55.2936 16.0632 55.36 15.7378 55.4325 15.4364C55.5049 15.123 55.5955 14.7975 55.7042 14.46L57.5878 9.45147H60.051L61.8984 14.46C62.0433 14.8578 62.1641 15.2315 62.2607 15.5811C62.3573 15.9306 62.4297 16.2682 62.478 16.5936C62.5384 16.907 62.5867 17.2204 62.6229 17.5339L62.2607 17.5881C62.2848 17.3711 62.3029 17.1722 62.315 16.9914C62.3271 16.7985 62.3392 16.6177 62.3512 16.449C62.3754 16.2682 62.3995 16.0813 62.4237 15.8884C62.4478 15.6956 62.4841 15.4846 62.5324 15.2556C62.5807 15.0145 62.6471 14.7433 62.7316 14.4419L64.6152 7.80606H67.6761L63.8726 20.463H61.5181L58.5115 13.1762L58.8556 13.2124L56.0845 20.463H53.6575Z" fill="white" />
                <path d="M69.11 20.463V17.8774H71.2472V10.3917H69.11V7.80606H76.4815V10.3917H74.3262V17.8774H76.4815V20.463H69.11Z" fill="white" />
                <path d="M78.9028 20.463V18.4198L85.7129 9.37914L86.7815 10.6268H79.3738V7.80606H88.9369V9.83117L82.163 18.89L81.0763 17.7689H89.1361V20.463H78.9028Z" fill="white" />
                <path d="M90.1615 20.463L95.1785 7.80606H97.7867L102.767 20.463H99.6522L97.2614 14.0441C97.1648 13.791 97.0682 13.5198 96.9716 13.2305C96.875 12.9412 96.7784 12.6458 96.6818 12.3445C96.5852 12.0311 96.4886 11.7297 96.392 11.4404C96.3075 11.1391 96.2351 10.8618 96.1747 10.6087L96.718 10.5906C96.6456 10.8919 96.5611 11.1873 96.4645 11.4766C96.38 11.7659 96.2894 12.0552 96.1928 12.3445C96.1083 12.6217 96.0117 12.905 95.903 13.1943C95.7943 13.4716 95.6917 13.7609 95.5951 14.0622L93.2043 20.463H90.1615ZM92.5523 18.0401L93.5122 15.7257H99.3443L100.286 18.0401H92.5523Z" fill="white" />
                <path d="M104.349 20.463V7.80606H110.055C110.864 7.80606 111.594 7.98084 112.246 8.33042C112.91 8.67999 113.429 9.16216 113.804 9.77693C114.178 10.3796 114.365 11.0667 114.365 11.8382C114.365 12.6338 114.178 13.351 113.804 13.9899C113.429 14.6167 112.916 15.1109 112.264 15.4726C111.612 15.8342 110.876 16.015 110.055 16.015H107.283V20.463H104.349ZM111.377 20.463L108.153 14.7493L111.304 14.2973L114.89 20.463H111.377ZM107.283 13.6644H109.783C110.097 13.6644 110.368 13.5981 110.598 13.4655C110.839 13.3209 111.02 13.122 111.141 12.8688C111.274 12.6157 111.34 12.3264 111.34 12.0009C111.34 11.6755 111.268 11.3922 111.123 11.1511C110.978 10.898 110.767 10.7051 110.489 10.5725C110.224 10.4399 109.898 10.3736 109.511 10.3736H107.283V13.6644Z" fill="white" />
                <path d="M117.067 20.463V7.80606H122.373C123.303 7.80606 124.154 7.96276 124.927 8.27617C125.7 8.57753 126.364 9.01148 126.919 9.57803C127.487 10.1446 127.922 10.8136 128.223 11.5851C128.525 12.3565 128.676 13.2064 128.676 14.1345C128.676 15.0627 128.525 15.9186 128.223 16.7021C127.922 17.4736 127.487 18.1426 126.919 18.7091C126.364 19.2636 125.7 19.6976 124.927 20.011C124.154 20.3124 123.303 20.463 122.373 20.463H117.067ZM120.146 18.3656L119.729 17.7508H122.283C122.79 17.7508 123.243 17.6664 123.641 17.4977C124.04 17.3169 124.378 17.0698 124.655 16.7564C124.945 16.4429 125.169 16.0632 125.326 15.6172C125.483 15.1712 125.561 14.677 125.561 14.1345C125.561 13.5921 125.483 13.0979 125.326 12.6519C125.169 12.2059 124.945 11.8262 124.655 11.5127C124.378 11.1993 124.04 10.9582 123.641 10.7895C123.243 10.6087 122.79 10.5183 122.283 10.5183H119.675L120.146 9.93966V18.3656Z" fill="white" />
                <path d="M142.745 20.6439C141.731 20.6439 140.813 20.4811 139.992 20.1557C139.171 19.8302 138.465 19.3721 137.873 18.7815C137.281 18.1908 136.829 17.4977 136.515 16.7021C136.201 15.8945 136.044 15.0205 136.044 14.0803C136.044 13.1401 136.207 12.2782 136.533 11.4947C136.871 10.6991 137.348 10.006 137.964 9.4153C138.579 8.82464 139.304 8.36658 140.137 8.04112C140.982 7.71565 141.9 7.55292 142.89 7.55292C143.59 7.55292 144.248 7.64332 144.864 7.82414C145.492 8.00495 146.06 8.25207 146.567 8.56548C147.074 8.87889 147.503 9.24051 147.853 9.65036L145.987 11.6212C145.685 11.3319 145.371 11.0908 145.045 10.898C144.731 10.7051 144.393 10.5544 144.031 10.4459C143.669 10.3254 143.282 10.2651 142.872 10.2651C142.341 10.2651 141.852 10.3616 141.405 10.5544C140.97 10.7473 140.584 11.0185 140.246 11.3681C139.92 11.7056 139.666 12.1094 139.485 12.5795C139.304 13.0376 139.213 13.5379 139.213 14.0803C139.213 14.6227 139.31 15.129 139.503 15.5991C139.696 16.0693 139.962 16.4791 140.3 16.8287C140.638 17.1662 141.037 17.4374 141.495 17.6423C141.966 17.8352 142.467 17.9316 142.999 17.9316C143.373 17.9316 143.723 17.8714 144.049 17.7508C144.387 17.6303 144.677 17.4676 144.919 17.2626C145.16 17.0577 145.353 16.8166 145.498 16.5394C145.643 16.2501 145.715 15.9427 145.715 15.6172V15.1471L146.114 15.7619H142.618V13.357H148.577C148.601 13.4896 148.619 13.6705 148.632 13.8995C148.644 14.1285 148.65 14.3515 148.65 14.5685C148.662 14.7855 148.668 14.9482 148.668 15.0567C148.668 15.8764 148.517 16.6298 148.215 17.3169C147.925 17.9919 147.515 18.5765 146.983 19.0708C146.452 19.565 145.824 19.9507 145.1 20.228C144.375 20.5052 143.59 20.6439 142.745 20.6439Z" fill="white" />
                <path d="M149.238 20.463L154.255 7.80606H156.863L161.843 20.463H158.728L156.337 14.0441C156.241 13.791 156.144 13.5198 156.048 13.2305C155.951 12.9412 155.854 12.6458 155.758 12.3445C155.661 12.0311 155.565 11.7297 155.468 11.4404C155.384 11.1391 155.311 10.8618 155.251 10.6087L155.794 10.5906C155.722 10.8919 155.637 11.1873 155.54 11.4766C155.456 11.7659 155.365 12.0552 155.269 12.3445C155.184 12.6217 155.088 12.905 154.979 13.1943C154.87 13.4716 154.768 13.7609 154.671 14.0622L152.28 20.463H149.238ZM151.628 18.0401L152.588 15.7257H158.42L159.362 18.0401H151.628Z" fill="white" />
                <path d="M163.425 20.463V7.80606H166.504V17.7508H172.155V20.463H163.425Z" fill="white" />
                <path d="M174.462 20.463V7.80606H177.541V17.7508H183.192V20.463H174.462Z" fill="white" />
                <path d="M185.499 20.463V7.80606H194.338V10.4279H188.488V17.8412H194.519V20.463H185.499ZM186.948 15.2737V12.7784H193.523V15.2737H186.948Z" fill="white" />
                <path d="M197.173 20.463V7.80606H202.878C203.687 7.80606 204.418 7.98084 205.07 8.33042C205.734 8.67999 206.253 9.16216 206.627 9.77693C207.002 10.3796 207.189 11.0667 207.189 11.8382C207.189 12.6338 207.002 13.351 206.627 13.9899C206.253 14.6167 205.74 15.1109 205.088 15.4726C204.436 15.8342 203.699 16.015 202.878 16.015H200.107V20.463H197.173ZM204.2 20.463L200.976 14.7493L204.128 14.2973L207.714 20.463H204.2ZM200.107 13.6644H202.606C202.92 13.6644 203.192 13.5981 203.421 13.4655C203.663 13.3209 203.844 13.122 203.965 12.8688C204.098 12.6157 204.164 12.3264 204.164 12.0009C204.164 11.6755 204.092 11.3922 203.947 11.1511C203.802 10.898 203.591 10.7051 203.313 10.5725C203.047 10.4399 202.721 10.3736 202.335 10.3736H200.107V13.6644Z" fill="white" />
                <path d="M212.266 20.463V14.1526L212.393 15.0386L207.267 7.80606H210.763L214.675 13.4113L213.081 13.357L216.613 7.80606H220L215.092 15.2375L215.363 14.008V20.463H212.266Z" fill="white" />
                <path d="M55.5854 37.3038V28.2743H56.8388L62.369 35.6656L62.1622 35.7816C62.1278 35.5667 62.0976 35.3345 62.0718 35.0851C62.046 34.8271 62.0201 34.5562 61.9943 34.2724C61.977 33.9801 61.9598 33.6748 61.9426 33.3566C61.934 33.0298 61.9254 32.6901 61.9167 32.3376C61.9081 31.985 61.9038 31.6195 61.9038 31.2411V28.2743H63.2993V37.3038H62.0201L56.5804 30.1834L56.7225 30.0028C56.7656 30.5274 56.8 30.9745 56.8259 31.3443C56.8603 31.7055 56.8862 32.0151 56.9034 32.2731C56.9292 32.5224 56.9465 32.7288 56.9551 32.8922C56.9637 33.047 56.968 33.176 56.968 33.2792C56.9766 33.3824 56.9809 33.4727 56.9809 33.5501V37.3038H55.5854Z" fill="#6A3190" />
                <path d="M68.4156 37.3038V28.2743H69.8111V37.3038H68.4156ZM69.0358 33.4598V32.1183H73.7003V33.4598H69.0358ZM69.0358 29.6158V28.2743H74.2817V29.6158H69.0358Z" fill="#6A3190" />
                <path d="M80.6804 37.3038V29.6158H78.1479V28.2743H84.6859V29.6158H82.0758V37.3038H80.6804Z" fill="#6A3190" />
                <path d="M95.1964 37.3038V28.2743H96.566L99.8609 33.6275L99.2019 33.6146L102.536 28.2743H103.828V37.3038H102.432V33.6017C102.432 32.8277 102.449 32.1312 102.484 31.512C102.527 30.8928 102.596 30.278 102.691 29.6674L102.871 30.1447L99.9126 34.711H99.0598L96.1913 30.1963L96.3335 29.6674C96.4282 30.2436 96.4928 30.8369 96.5273 31.4475C96.5704 32.0495 96.5919 32.7675 96.5919 33.6017V37.3038H95.1964Z" fill="#6A3190" />
                <path d="M108.004 37.3038L111.506 28.2743H112.927L116.403 37.3038H114.917L112.85 31.8603C112.824 31.8001 112.772 31.6539 112.695 31.4217C112.626 31.1895 112.544 30.9315 112.449 30.6478C112.355 30.364 112.268 30.106 112.191 29.8738C112.113 29.633 112.062 29.4782 112.036 29.4094L112.333 29.3965C112.281 29.5427 112.217 29.7276 112.139 29.9512C112.07 30.1748 111.993 30.4113 111.907 30.6607C111.829 30.91 111.752 31.1465 111.674 31.3701C111.597 31.5851 111.532 31.7657 111.48 31.9119L109.426 37.3038H108.004ZM109.555 35.0593L110.072 33.7178H114.181L114.775 35.0593H109.555Z" fill="#6A3190" />
                <path d="M120.579 37.3038V28.2743H124.43C124.946 28.2743 125.42 28.4033 125.851 28.6613C126.29 28.9107 126.639 29.2546 126.898 29.6932C127.156 30.1232 127.285 30.6091 127.285 31.1508C127.285 31.641 127.156 32.0968 126.898 32.5181C126.639 32.9395 126.295 33.2792 125.864 33.5372C125.433 33.7866 124.955 33.9113 124.43 33.9113H121.975V37.3038H120.579ZM125.954 37.3038L123.654 33.2276L125.089 32.9051L127.647 37.3167L125.954 37.3038ZM121.975 32.5697H124.559C124.809 32.5697 125.033 32.5095 125.231 32.3892C125.429 32.2602 125.584 32.0882 125.696 31.8732C125.808 31.6496 125.864 31.4045 125.864 31.1379C125.864 30.8369 125.791 30.5747 125.644 30.3511C125.506 30.1189 125.308 29.9383 125.05 29.8093C124.8 29.6803 124.516 29.6158 124.197 29.6158H121.975V32.5697Z" fill="#6A3190" />
                <path d="M133.31 34.5691L133.233 33.0083L137.975 28.2743H139.81L133.31 34.5691ZM132.147 37.3038V28.2743H133.543V37.3038H132.147ZM138.143 37.3038L134.68 32.6858L135.714 31.7958L139.887 37.3038H138.143Z" fill="#6A3190" />
                <path d="M144.195 37.3038V28.2743H149.893V29.6158H145.591V35.9622H149.893V37.3038H144.195ZM144.828 33.3437V32.0022H149.183V33.3437H144.828Z" fill="#6A3190" />
                <path d="M156.435 37.3038V29.6158H153.902V28.2743H160.44V29.6158H157.83V37.3038H156.435Z" fill="#6A3190" />
                <path d="M164.745 37.3038V28.2743H168.428C168.919 28.2743 169.362 28.399 169.759 28.6484C170.163 28.8892 170.486 29.2202 170.728 29.6416C170.969 30.063 171.089 30.5317 171.089 31.0476C171.089 31.5636 170.969 32.0323 170.728 32.4536C170.486 32.875 170.163 33.2147 169.759 33.4727C169.362 33.7221 168.919 33.8468 168.428 33.8468H166.141V37.3038H164.745ZM166.141 32.5052H168.402C168.634 32.5052 168.846 32.4407 169.035 32.3118C169.225 32.1742 169.375 31.9979 169.487 31.7829C169.608 31.5593 169.668 31.3142 169.668 31.0476C169.668 30.781 169.608 30.5403 169.487 30.3253C169.375 30.1103 169.225 29.9383 169.035 29.8093C168.846 29.6803 168.634 29.6158 168.402 29.6158H166.141V32.5052Z" fill="#6A3190" />
                <path d="M175.519 37.3038V28.2743H176.914V35.9622H181.152V37.3038H175.519Z" fill="#6A3190" />
                <path d="M184.895 37.3038L188.396 28.2743H189.817L193.293 37.3038H191.807L189.74 31.8603C189.714 31.8001 189.662 31.6539 189.585 31.4217C189.516 31.1895 189.434 30.9315 189.339 30.6478C189.245 30.364 189.158 30.106 189.081 29.8738C189.003 29.633 188.952 29.4782 188.926 29.4094L189.223 29.3965C189.171 29.5427 189.107 29.7276 189.029 29.9512C188.96 30.1748 188.883 30.4113 188.797 30.6607C188.719 30.91 188.642 31.1465 188.564 31.3701C188.487 31.5851 188.422 31.7657 188.37 31.9119L186.316 37.3038H184.895ZM186.445 35.0593L186.962 33.7178H191.071L191.665 35.0593H186.445Z" fill="#6A3190" />
                <path d="M200.886 37.4328C200.258 37.4328 199.68 37.321 199.155 37.0974C198.63 36.8738 198.173 36.5556 197.785 36.1428C197.398 35.7215 197.096 35.227 196.881 34.6594C196.674 34.0918 196.571 33.4684 196.571 32.789C196.571 32.1441 196.683 31.5464 196.907 30.996C197.139 30.4371 197.458 29.9469 197.863 29.5255C198.268 29.1041 198.737 28.7774 199.271 28.5452C199.805 28.313 200.383 28.1969 201.003 28.1969C201.442 28.1969 201.868 28.2657 202.282 28.4033C202.704 28.5323 203.083 28.7172 203.419 28.958C203.764 29.1901 204.043 29.4567 204.259 29.7577L203.329 30.7251C203.079 30.4758 202.825 30.2694 202.566 30.106C202.316 29.934 202.058 29.805 201.791 29.719C201.532 29.633 201.27 29.59 201.003 29.59C200.581 29.59 200.184 29.6717 199.814 29.8351C199.452 29.9899 199.133 30.2092 198.858 30.493C198.591 30.7767 198.38 31.1164 198.225 31.512C198.07 31.899 197.992 32.3247 197.992 32.789C197.992 33.2792 198.065 33.7264 198.212 34.1305C198.367 34.5261 198.582 34.8658 198.858 35.1496C199.133 35.4334 199.461 35.6527 199.84 35.8074C200.227 35.9536 200.654 36.0267 201.119 36.0267C201.403 36.0267 201.683 35.988 201.959 35.9106C202.235 35.8332 202.493 35.7215 202.734 35.5753C202.975 35.4291 203.195 35.2571 203.393 35.0593L204.091 36.1944C203.893 36.4266 203.621 36.6373 203.277 36.8265C202.941 37.0157 202.562 37.1662 202.14 37.278C201.726 37.3812 201.309 37.4328 200.886 37.4328Z" fill="#6A3190" />
                <path d="M208.571 37.3038V28.2743H214.269V29.6158H209.966V35.9622H214.269V37.3038H208.571ZM209.204 33.3437V32.0022H213.558V33.3437H209.204Z" fill="#6A3190" />
                <defs>
                  <clipPath id="clip0_267_8412">
                    <rect width="36.3018" height="44.7679" fill="white" transform="translate(4.271)" />
                  </clipPath>
                </defs>
              </svg>

            </div>
          </Link>
        </div>
        <Nav>
          <li className='nav-item'>
            <Link
              to={`/admin/dashboard`}
              className={props.brandName == "Dashboard" ? "nav-link activecustomclasss" : "nav-link"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.77 11.25H15.73C13.72 11.25 12.75 10.36 12.75 8.52V3.98C12.75 2.14 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.14 22.75 3.98V8.51C22.75 10.36 21.77 11.25 19.77 11.25ZM15.73 2.75C14.39 2.75 14.25 3.13 14.25 3.98V8.51C14.25 9.37 14.39 9.74 15.73 9.74H19.77C21.11 9.74 21.25 9.36 21.25 8.51V3.98C21.25 3.12 21.11 2.75 19.77 2.75H15.73Z" fill="#725196" />
                <path d="M19.77 22.75H15.73C13.72 22.75 12.75 21.77 12.75 19.77V15.73C12.75 13.72 13.73 12.75 15.73 12.75H19.77C21.78 12.75 22.75 13.73 22.75 15.73V19.77C22.75 21.77 21.77 22.75 19.77 22.75ZM15.73 14.25C14.55 14.25 14.25 14.55 14.25 15.73V19.77C14.25 20.95 14.55 21.25 15.73 21.25H19.77C20.95 21.25 21.25 20.95 21.25 19.77V15.73C21.25 14.55 20.95 14.25 19.77 14.25H15.73Z" fill="#725196" />
                <path d="M8.27 11.25H4.23C2.22 11.25 1.25 10.36 1.25 8.52V3.98C1.25 2.14 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.14 11.25 3.98V8.51C11.25 10.36 10.27 11.25 8.27 11.25ZM4.23 2.75C2.89 2.75 2.75 3.13 2.75 3.98V8.51C2.75 9.37 2.89 9.74 4.23 9.74H8.27C9.61 9.74 9.75 9.36 9.75 8.51V3.98C9.75 3.12 9.61 2.75 8.27 2.75H4.23Z" fill="#725196" />
                <path d="M8.27 22.75H4.23C2.22 22.75 1.25 21.77 1.25 19.77V15.73C1.25 13.72 2.23 12.75 4.23 12.75H8.27C10.28 12.75 11.25 13.73 11.25 15.73V19.77C11.25 21.77 10.27 22.75 8.27 22.75ZM4.23 14.25C3.05 14.25 2.75 14.55 2.75 15.73V19.77C2.75 20.95 3.05 21.25 4.23 21.25H8.27C9.45 21.25 9.75 20.95 9.75 19.77V15.73C9.75 14.55 9.45 14.25 8.27 14.25H4.23Z" fill="#725196" />
              </svg>
              <p className="">Dashboard</p>
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to={`/admin/creators`}
              className={props.brandName == "Creators" ? "nav-link activecustomclasss" : "nav-link"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.15957 11.62C9.12957 11.62 9.10957 11.62 9.07957 11.62C9.02957 11.61 8.95957 11.61 8.89957 11.62C5.99957 11.53 3.80957 9.25 3.80957 6.44C3.80957 3.58 6.13957 1.25 8.99957 1.25C11.8596 1.25 14.1896 3.58 14.1896 6.44C14.1796 9.25 11.9796 11.53 9.18957 11.62C9.17957 11.62 9.16957 11.62 9.15957 11.62ZM8.99957 2.75C6.96957 2.75 5.30957 4.41 5.30957 6.44C5.30957 8.44 6.86957 10.05 8.85957 10.12C8.91957 10.11 9.04957 10.11 9.17957 10.12C11.1396 10.03 12.6796 8.42 12.6896 6.44C12.6896 4.41 11.0296 2.75 8.99957 2.75Z" fill="#725196" />
                <path d="M16.5394 11.75C16.5094 11.75 16.4794 11.75 16.4494 11.74C16.0394 11.78 15.6194 11.49 15.5794 11.08C15.5394 10.67 15.7894 10.3 16.1994 10.25C16.3194 10.24 16.4494 10.24 16.5594 10.24C18.0194 10.16 19.1594 8.96 19.1594 7.49C19.1594 5.97 17.9294 4.74 16.4094 4.74C15.9994 4.75 15.6594 4.41 15.6594 4C15.6594 3.59 15.9994 3.25 16.4094 3.25C18.7494 3.25 20.6594 5.16 20.6594 7.5C20.6594 9.8 18.8594 11.66 16.5694 11.75C16.5594 11.75 16.5494 11.75 16.5394 11.75Z" fill="#725196" />
                <path d="M9.16961 22.55C7.20961 22.55 5.23961 22.05 3.74961 21.05C2.35961 20.13 1.59961 18.87 1.59961 17.5C1.59961 16.13 2.35961 14.86 3.74961 13.93C6.74961 11.94 11.6096 11.94 14.5896 13.93C15.9696 14.85 16.7396 16.11 16.7396 17.48C16.7396 18.85 15.9796 20.12 14.5896 21.05C13.0896 22.05 11.1296 22.55 9.16961 22.55ZM4.57961 15.19C3.61961 15.83 3.09961 16.65 3.09961 17.51C3.09961 18.36 3.62961 19.18 4.57961 19.81C7.06961 21.48 11.2696 21.48 13.7596 19.81C14.7196 19.17 15.2396 18.35 15.2396 17.49C15.2396 16.64 14.7096 15.82 13.7596 15.19C11.2696 13.53 7.06961 13.53 4.57961 15.19Z" fill="#725196" />
                <path d="M18.3392 20.75C17.9892 20.75 17.6792 20.51 17.6092 20.15C17.5292 19.74 17.7892 19.35 18.1892 19.26C18.8192 19.13 19.3992 18.88 19.8492 18.53C20.4192 18.1 20.7292 17.56 20.7292 16.99C20.7292 16.42 20.4192 15.88 19.8592 15.46C19.4192 15.12 18.8692 14.88 18.2192 14.73C17.8192 14.64 17.5592 14.24 17.6492 13.83C17.7392 13.43 18.1392 13.17 18.5492 13.26C19.4092 13.45 20.1592 13.79 20.7692 14.26C21.6992 14.96 22.2292 15.95 22.2292 16.99C22.2292 18.03 21.6892 19.02 20.7592 19.73C20.1392 20.21 19.3592 20.56 18.4992 20.73C18.4392 20.75 18.3892 20.75 18.3392 20.75Z" fill="#725196" />
              </svg>
              <p className="">Creators</p>
            </Link>
          </li>
          {/* 
          <li className='nav-item'>
            <Link
              to={`/admin/nfts`}
              className={props.brandName == "NFTs" ? "nav-link activecustomclasss" : "nav-link"}
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.625 8.71875C8.45098 8.71885 8.28412 8.78802 8.16107 8.91107C8.03802 9.03412 7.96885 9.20098 7.96875 9.375V12.1537L6.19462 9.0495C6.12279 8.92394 6.01149 8.82563 5.87802 8.76986C5.74455 8.71409 5.59639 8.70398 5.45659 8.7411C5.31678 8.77822 5.19315 8.8605 5.10493 8.97513C5.01671 9.08977 4.96883 9.23035 4.96875 9.375V14.625C4.96875 14.799 5.03789 14.966 5.16096 15.089C5.28403 15.2121 5.45095 15.2812 5.625 15.2812C5.79905 15.2812 5.96597 15.2121 6.08904 15.089C6.21211 14.966 6.28125 14.799 6.28125 14.625V11.8463L8.05538 14.9505C8.12721 15.0761 8.23851 15.1744 8.37198 15.2301C8.50545 15.2859 8.65361 15.296 8.79341 15.2589C8.93322 15.2218 9.05685 15.1395 9.14507 15.0249C9.23329 14.9102 9.28117 14.7697 9.28125 14.625V9.375C9.28115 9.20098 9.21198 9.03412 9.08893 8.91107C8.96588 8.78802 8.79902 8.71885 8.625 8.71875Z" fill="#725196" />
                <path d="M21.6969 6.18798L12.7016 0.994371C12.6095 0.941123 12.505 0.913086 12.3986 0.913086C12.2922 0.913086 12.1877 0.941123 12.0957 0.994371L3.10032 6.18798C3.00817 6.24115 2.93164 6.31766 2.87846 6.4098C2.82527 6.50195 2.7973 6.60648 2.79736 6.71288V17.1001C2.7973 17.2065 2.82527 17.311 2.87846 17.4032C2.93164 17.4953 3.00817 17.5718 3.10032 17.625L12.0957 22.8186C12.1877 22.8719 12.2922 22.8999 12.3986 22.8999C12.505 22.8999 12.6095 22.8719 12.7016 22.8186L21.6969 17.625C21.7891 17.5718 21.8656 17.4953 21.9188 17.4032C21.972 17.311 21.9999 17.2065 21.9999 17.1001V6.71288C21.9999 6.60648 21.972 6.50195 21.9188 6.4098C21.8656 6.31766 21.7891 6.24115 21.6969 6.18798ZM20.788 16.7483L12.3986 21.594L4.00921 16.75V7.06293L12.3986 2.21902L20.788 7.06293V16.7483Z" fill="#725196" />
                <path d="M11.1001 9.48275V14.3301C11.1001 14.4908 11.1639 14.6449 11.2776 14.7586C11.3912 14.8722 11.5453 14.936 11.706 14.936C11.8667 14.936 12.0208 14.8722 12.1345 14.7586C12.2481 14.6449 12.3119 14.4908 12.3119 14.3301V12.5124H13.7835C13.9442 12.5124 14.0983 12.4485 14.2119 12.3349C14.3255 12.2213 14.3894 12.0671 14.3894 11.9064C14.3894 11.7457 14.3255 11.5916 14.2119 11.478C14.0983 11.3644 13.9442 11.3005 13.7835 11.3005H12.3119V10.0887H13.7835C13.9442 10.0887 14.0983 10.0248 14.2119 9.9112C14.3255 9.79757 14.3894 9.64345 14.3894 9.48275C14.3894 9.32205 14.3255 9.16793 14.2119 9.0543C14.0983 8.94067 13.9442 8.87683 13.7835 8.87683H11.706C11.6264 8.87679 11.5476 8.89243 11.4741 8.92286C11.4006 8.9533 11.3337 8.99793 11.2775 9.0542C11.2212 9.11047 11.1766 9.17729 11.1461 9.25082C11.1157 9.32436 11.1001 9.40317 11.1001 9.48275Z" fill="#725196" />
                <path d="M15.8608 10.0887H16.6398V14.3301C16.6398 14.4908 16.7037 14.6449 16.8173 14.7586C16.9309 14.8722 17.0851 14.936 17.2458 14.936C17.4065 14.936 17.5606 14.8722 17.6742 14.7586C17.7878 14.6449 17.8517 14.4908 17.8517 14.3301V10.0887H18.6307C18.7914 10.0887 18.9455 10.0248 19.0592 9.9112C19.1728 9.79757 19.2366 9.64345 19.2366 9.48275C19.2366 9.32205 19.1728 9.16793 19.0592 9.0543C18.9455 8.94067 18.7914 8.87683 18.6307 8.87683H15.8608C15.7001 8.87683 15.546 8.94067 15.4324 9.0543C15.3187 9.16793 15.2549 9.32205 15.2549 9.48275C15.2549 9.64345 15.3187 9.79757 15.4324 9.9112C15.546 10.0248 15.7001 10.0887 15.8608 10.0887Z" fill="#725196" />
              </svg>
              <p className="">NFTs</p>
            </Link>
          </li> */}
          <li className='nav-item'>
            <Link
              to={`/admin/collections`}
              className={props.brandName == "Collections" ? "nav-link activecustomclasss" : "nav-link"}
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02202 1.84619C2.82916 1.84619 1.84619 2.82916 1.84619 4.02202V14.1759C1.84619 15.3687 2.82916 16.3517 4.02202 16.3517H4.74729V17.077C4.74729 18.2698 5.73026 19.2528 6.92311 19.2528H7.64839V19.9781C7.64839 21.1709 8.63135 22.1539 9.82421 22.1539H19.9781C21.1709 22.1539 22.1539 21.1709 22.1539 19.9781V9.82421C22.1539 8.63135 21.1709 7.64839 19.9781 7.64839H19.2528V6.92311C19.2528 5.73026 18.2698 4.74729 17.077 4.74729H16.3517V4.02202C16.3517 2.82916 15.3687 1.84619 14.1759 1.84619H4.02202ZM4.02202 3.29674H14.1759C14.5902 3.29674 14.9011 3.60767 14.9011 4.02202V4.74729H6.92311C5.73026 4.74729 4.74729 5.73026 4.74729 6.92311V14.9011H4.02202C3.60767 14.9011 3.29674 14.5902 3.29674 14.1759V4.02202C3.29674 3.60767 3.60767 3.29674 4.02202 3.29674ZM6.92311 6.19784H17.077C17.4913 6.19784 17.8022 6.50877 17.8022 6.92311V7.64839H9.82421C8.63135 7.64839 7.64839 8.63135 7.64839 9.82421V17.8022H6.92311C6.50877 17.8022 6.19784 17.4913 6.19784 17.077V6.92311C6.19784 6.50877 6.50877 6.19784 6.92311 6.19784ZM9.82421 9.09894H19.9781C20.3924 9.09894 20.7033 9.40987 20.7033 9.82421V19.9781C20.7033 20.3924 20.3924 20.7033 19.9781 20.7033H9.82421C9.40986 20.7033 9.09894 20.3924 9.09894 19.9781C9.09894 16.5934 9.09894 13.2088 9.09894 9.82421C9.09894 9.40987 9.40986 9.09894 9.82421 9.09894Z" fill="#725196" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.901 10.5494C14.7086 10.5494 14.5241 10.6259 14.3881 10.7619C14.2521 10.8979 14.1757 11.0824 14.1757 11.2747V14.1758H11.2746C11.0822 14.1758 10.8978 14.2522 10.7617 14.3882C10.6257 14.5243 10.5493 14.7087 10.5493 14.9011C10.5493 15.0934 10.6257 15.2779 10.7617 15.4139C10.8978 15.5499 11.0822 15.6264 11.2746 15.6264H14.1757V18.5275C14.1757 18.7198 14.2521 18.9043 14.3881 19.0403C14.5241 19.1763 14.7086 19.2527 14.901 19.2527C15.0933 19.2527 15.2778 19.1763 15.4138 19.0403C15.5498 18.9043 15.6262 18.7198 15.6262 18.5275V15.6264H18.5273C18.7197 15.6264 18.9042 15.5499 19.0402 15.4139C19.1762 15.2779 19.2526 15.0934 19.2526 14.9011C19.2526 14.7087 19.1762 14.5243 19.0402 14.3882C18.9042 14.2522 18.7197 14.1758 18.5273 14.1758H15.6262V11.2747C15.6262 11.0824 15.5498 10.8979 15.4138 10.7619C15.2778 10.6259 15.0933 10.5494 14.901 10.5494Z" fill="#725196" />
              </svg>
              <p className="">Collections</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to={`/admin/launchpad`}
              className={props.brandName == "Launchpad" ? "nav-link activecustomclasss" : "nav-link"}
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_267_8464)">
                  <path d="M12 24C5.38581 24 0 18.6142 0 12C0 5.38581 5.38581 0 12 0C18.6142 0 24 5.38581 24 12C24 18.6142 18.6142 24 12 24ZM12 1.14279C6.01423 1.14279 1.14279 6.01423 1.14279 12C1.14279 17.9858 6.01423 22.8572 12 22.8572C17.9858 22.8572 22.8572 17.9858 22.8572 12C22.8572 6.01423 17.9858 1.14279 12 1.14279Z" fill="#725196" />
                  <path d="M13.143 13.1428C11.8807 13.1428 10.8574 12.1195 10.8574 10.8572C10.8574 9.59471 11.8807 8.57141 13.143 8.57141C14.4055 8.57141 15.4288 9.59471 15.4288 10.8572C15.4288 12.1195 14.4055 13.1428 13.143 13.1428ZM13.143 9.7142C12.5119 9.7142 12.0002 10.2258 12.0002 10.8572C12.0002 11.4883 12.5119 12 13.143 12C13.7743 12 14.286 11.4883 14.286 10.8572C14.286 10.2258 13.7743 9.7142 13.143 9.7142Z" fill="#725196" />
                  <path d="M10.6283 17.1571L6.84277 13.3715L6.857 13.1214C7.0784 8.42135 11.7785 5.14282 18.2855 5.14282H18.857V5.71432C18.857 12.2214 15.5785 16.9214 10.8855 17.1428L10.6283 17.1571ZM8.01423 12.9285L11.0785 15.9929C14.864 15.6571 17.5284 11.7499 17.7071 6.30716C12.257 6.47144 8.34989 9.13578 8.01423 12.9214V12.9285Z" fill="#725196" />
                  <path d="M12 21.3785V16.2644H13.1428V18.6215L14.8571 16.9072V14.4H16.0001V17.3785L12 21.3785Z" fill="#725196" />
                  <path d="M7.73577 11.9999H2.62158L6.62165 7.99988H9.6001V9.14287H7.09291L5.37863 10.8572H7.73577V11.9999Z" fill="#725196" />
                  <path d="M7.05744 18.8572C6.52172 18.8572 6.03602 18.6787 5.67169 18.3214C4.80032 17.4501 5.00728 15.8643 6.14316 14.6215L6.98587 15.3928C6.23587 16.2144 6.1145 17.15 6.47882 17.5143C6.84315 17.8786 7.77877 17.7571 8.60034 17.0071L9.37168 17.85C8.65014 18.5144 7.80744 18.8572 7.05744 18.8572Z" fill="#725196" />
                </g>
                <defs>
                  <clipPath id="clip0_267_8464">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="">Launchpads</p>
            </Link>
          </li>



          <li className='nav-item'>
            <Link
              to={`/admin/applications`}
              className={props.brandName == "Applications" ? "nav-link activecustomclasss" : "nav-link"}
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="iconns" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V7C2.25 3.35 4.35 1.25 8 1.25H16C19.65 1.25 21.75 3.35 21.75 7V17C21.75 20.65 19.65 22.75 16 22.75ZM8 2.75C5.14 2.75 3.75 4.14 3.75 7V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V7C20.25 4.14 18.86 2.75 16 2.75H8Z" fill="#725196" />
                <path d="M18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z" fill="#725196" />
                <path d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#725196" />
                <path d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z" fill="#725196" />
              </svg>
              <p className="">Applications</p>
            </Link>
          </li>





        </Nav>
     </div>
        <div className="edit-page-profile">
          {/* <div className="logo-imgss d-flex justify-content-start align-items-center">
              <Link onClick={logout}><img src={banner10} className="pad-rihgt" alt="" /></Link>
              <div className="images-right ml-2">
                <Link to={`/admin/editprofile`}><img src={name.profile_image ? name.profile_image : profile} className="pad-rihgt imggg" alt="" /></Link>
              </div>

              <div className="text-l">
                <h4>{name.full_name}</h4>
                <p>Admin</p>
              </div>

        
            </div> */}

          <button onClick={handleLogout} className='logoutbunn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M13.9698 20.4143H13.8506C9.78064 20.4143 7.81898 18.8101 7.47981 15.2168C7.44314 14.8409 7.71814 14.5018 8.10314 14.4651C8.46981 14.4284 8.81814 14.7126 8.85481 15.0884C9.12064 17.9668 10.4773 19.0393 13.8598 19.0393H13.979C17.7098 19.0393 19.0298 17.7193 19.0298 13.9884V8.01177C19.0298 4.28094 17.7098 2.96094 13.979 2.96094H13.8598C10.459 2.96094 9.10231 4.05177 8.85481 6.9851C8.80898 7.36094 8.48814 7.6451 8.10314 7.60844C7.71814 7.58094 7.44314 7.24177 7.47064 6.86594C7.78231 3.2176 9.75314 1.58594 13.8506 1.58594H13.9698C18.4706 1.58594 20.3956 3.51094 20.3956 8.01177V13.9884C20.3956 18.4893 18.4706 20.4143 13.9698 20.4143Z" fill="white" />
              <path d="M13.75 11.6875H3.31836C2.94253 11.6875 2.63086 11.3758 2.63086 11C2.63086 10.6242 2.94253 10.3125 3.31836 10.3125H13.75C14.1259 10.3125 14.4375 10.6242 14.4375 11C14.4375 11.3758 14.1259 11.6875 13.75 11.6875Z" fill="white" />
              <path d="M5.36249 14.7583C5.18832 14.7583 5.01415 14.6941 4.87665 14.5566L1.80582 11.4858C1.53999 11.2199 1.53999 10.7799 1.80582 10.5141L4.87665 7.44327C5.14249 7.17744 5.58249 7.17744 5.84832 7.44327C6.11415 7.7091 6.11415 8.14911 5.84832 8.41494L3.26332 10.9999L5.84832 13.5849C6.11415 13.8508 6.11415 14.2908 5.84832 14.5566C5.71999 14.6941 5.53665 14.7583 5.36249 14.7583Z" fill="white" />
            </svg>
            Log out
          </button>
        </div>
      </div>
    </div >
  );
}

export default Sidebar;
