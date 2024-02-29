import React from 'react'
import { Dropdown, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nfts = () => {
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="newinputs">
                    <div className="inputoutermain onlyformobilemain">

                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                            <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                        </svg> */}
                        <div className='fee-wallet-box-wrapper'>
                            <label>Platfrom Fee wallet</label>
                            <div className='wallet-box'>
                                <input type="text" name="full_name" className="ambassadorinput" placeholder="Wallet Address" />
                                <button className='change-wallet-btn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3.69332 13.0133C3.28666 13.0133 2.90666 12.8733 2.63332 12.6133C2.28666 12.2867 2.11999 11.7933 2.17999 11.26L2.42666 9.09999C2.47332 8.69333 2.71999 8.15333 3.00666 7.85999L8.47999 2.06666C9.84666 0.619992 11.2733 0.579992 12.72 1.94666C14.1667 3.31333 14.2067 4.73999 12.84 6.18666L7.36666 11.98C7.08666 12.28 6.56666 12.56 6.15999 12.6267L4.01332 12.9933C3.89999 13 3.79999 13.0133 3.69332 13.0133ZM10.62 1.93999C10.1067 1.93999 9.65999 2.25999 9.20666 2.73999L3.73332 8.53999C3.59999 8.67999 3.44666 9.01333 3.41999 9.20666L3.17332 11.3667C3.14666 11.5867 3.19999 11.7667 3.31999 11.88C3.43999 11.9933 3.61999 12.0333 3.83999 12L5.98666 11.6333C6.17999 11.6 6.49999 11.4267 6.63332 11.2867L12.1067 5.49333C12.9333 4.61333 13.2333 3.79999 12.0267 2.66666C11.4933 2.15333 11.0333 1.93999 10.62 1.93999Z" fill="white" />
                                        <path d="M11.56 7.29998C11.5466 7.29998 11.5266 7.29998 11.5133 7.29998C9.4333 7.09331 7.75996 5.51331 7.43996 3.44665C7.39996 3.17331 7.58663 2.91998 7.85996 2.87331C8.1333 2.83331 8.38663 3.01998 8.4333 3.29331C8.68663 4.90665 9.9933 6.14665 11.62 6.30665C11.8933 6.33331 12.0933 6.57998 12.0666 6.85331C12.0333 7.10665 11.8133 7.29998 11.56 7.29998Z" fill="white" />
                                        <path d="M14 15.1666H2C1.72667 15.1666 1.5 14.94 1.5 14.6666C1.5 14.3933 1.72667 14.1666 2 14.1666H14C14.2733 14.1666 14.5 14.3933 14.5 14.6666C14.5 14.94 14.2733 15.1666 14 15.1666Z" fill="white" />
                                    </svg>
                                    Change Wallet
                                </button>
                            </div>
                        </div>
                        <div className='fee-wallet-box-wrapper fee-wallet-box-wrapper2'>
                            <label>Platfrom Fee Percentage</label>
                            <div className='wallet-box'>
                                <input type="text" name="full_name" className="ambassadorinput" placeholder="4%" />
                                <button className='change-wallet-btn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3.69332 13.0133C3.28666 13.0133 2.90666 12.8733 2.63332 12.6133C2.28666 12.2867 2.11999 11.7933 2.17999 11.26L2.42666 9.09999C2.47332 8.69333 2.71999 8.15333 3.00666 7.85999L8.47999 2.06666C9.84666 0.619992 11.2733 0.579992 12.72 1.94666C14.1667 3.31333 14.2067 4.73999 12.84 6.18666L7.36666 11.98C7.08666 12.28 6.56666 12.56 6.15999 12.6267L4.01332 12.9933C3.89999 13 3.79999 13.0133 3.69332 13.0133ZM10.62 1.93999C10.1067 1.93999 9.65999 2.25999 9.20666 2.73999L3.73332 8.53999C3.59999 8.67999 3.44666 9.01333 3.41999 9.20666L3.17332 11.3667C3.14666 11.5867 3.19999 11.7667 3.31999 11.88C3.43999 11.9933 3.61999 12.0333 3.83999 12L5.98666 11.6333C6.17999 11.6 6.49999 11.4267 6.63332 11.2867L12.1067 5.49333C12.9333 4.61333 13.2333 3.79999 12.0267 2.66666C11.4933 2.15333 11.0333 1.93999 10.62 1.93999Z" fill="white" />
                                        <path d="M11.56 7.29998C11.5466 7.29998 11.5266 7.29998 11.5133 7.29998C9.4333 7.09331 7.75996 5.51331 7.43996 3.44665C7.39996 3.17331 7.58663 2.91998 7.85996 2.87331C8.1333 2.83331 8.38663 3.01998 8.4333 3.29331C8.68663 4.90665 9.9933 6.14665 11.62 6.30665C11.8933 6.33331 12.0933 6.57998 12.0666 6.85331C12.0333 7.10665 11.8133 7.29998 11.56 7.29998Z" fill="white" />
                                        <path d="M14 15.1666H2C1.72667 15.1666 1.5 14.94 1.5 14.6666C1.5 14.3933 1.72667 14.1666 2 14.1666H14C14.2733 14.1666 14.5 14.3933 14.5 14.6666C14.5 14.94 14.2733 15.1666 14 15.1666Z" fill="white" />
                                    </svg>
                                    Change Fee
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* <Dropdown className="amer_dropdonfstnew onlyformobile d-none " autoClose={false}>
                        <Dropdown.Toggle id="dropdown-basic" className="scrhmolddropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="onlymobile">
                            <Dropdown.Item href="#/action-1">
                                <div className="inputoutermain ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ambrinputicon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2916 1.0415 9.58329C1.0415 4.87496 4.87484 1.04163 9.58317 1.04163C14.2915 1.04163 18.1248 4.87496 18.1248 9.58329C18.1248 14.2916 14.2915 18.125 9.58317 18.125ZM9.58317 2.29163C5.55817 2.29163 2.2915 5.56663 2.2915 9.58329C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58329C16.8748 5.56663 13.6082 2.29163 9.58317 2.29163Z" fill="#862FC0" />
                                        <path d="M18.3335 18.9583C18.1752 18.9583 18.0169 18.9 17.8919 18.775L16.2252 17.1083C15.9835 16.8666 15.9835 16.4666 16.2252 16.225C16.4669 15.9833 16.8669 15.9833 17.1085 16.225L18.7752 17.8916C19.0169 18.1333 19.0169 18.5333 18.7752 18.775C18.6502 18.9 18.4919 18.9583 18.3335 18.9583Z" fill="#862FC0" />
                                    </svg>

                                    <input type="text" name="full_name" className="ambassadorinput" placeholder="Search" />
                                </div></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    {/* <Dropdown className="amer_dropdonfst ">
                        <Dropdown.Toggle id="dropdown-basic">
                            Sort by
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <path d="M11.1308 0.634033H6.12637H1.61997C0.848825 0.634033 0.463251 1.50403 1.00948 2.01403L5.17046 5.89903C5.83719 6.52153 6.92161 6.52153 7.58833 5.89903L9.17079 4.42153L11.7493 2.01403C12.2875 1.50403 11.9019 0.634033 11.1308 0.634033Z" fill="#862FC0" />
                </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Sort By</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Name</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Price: Hight to Low</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    {/* <Dropdown className="filyerbyns ">
                        <Dropdown.Toggle className="filyerbynss" id="dropdown-basic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M9.49329 18.875C9.09329 18.875 8.70163 18.775 8.33496 18.575C7.60163 18.1667 7.15996 17.425 7.15996 16.5917V12.175C7.15996 11.7583 6.88496 11.1333 6.62663 10.8167L3.50996 7.51666C2.98496 6.99167 2.58496 6.09167 2.58496 5.41667V3.5C2.58496 2.16667 3.59329 1.125 4.87663 1.125H15.8766C17.1433 1.125 18.1683 2.15 18.1683 3.41667V5.25C18.1683 6.125 17.6433 7.11666 17.1516 7.60833L13.5433 10.8C13.1933 11.0917 12.9183 11.7333 12.9183 12.25V15.8333C12.9183 16.575 12.4516 17.4333 11.8683 17.7833L10.7183 18.525C10.3433 18.7583 9.91829 18.875 9.49329 18.875ZM4.87663 2.375C4.29329 2.375 3.83496 2.86667 3.83496 3.5V5.41667C3.83496 5.725 4.08496 6.325 4.40163 6.64166L7.57663 9.98333C8.00163 10.5083 8.41829 11.3833 8.41829 12.1667V16.5833C8.41829 17.125 8.79329 17.3917 8.95163 17.475C9.30163 17.6667 9.72663 17.6667 10.0516 17.4667L11.21 16.725C11.4433 16.5833 11.6766 16.1333 11.6766 15.8333V12.25C11.6766 11.3583 12.11 10.375 12.735 9.85L16.3016 6.69166C16.585 6.40833 16.9266 5.73333 16.9266 5.24167V3.41667C16.9266 2.84167 16.46 2.375 15.885 2.375H4.87663Z" fill="#862FC0" />
                                <path d="M5.37652 8.95839C5.25985 8.95839 5.15152 8.92506 5.04319 8.86672C4.75152 8.68339 4.65986 8.29172 4.84319 8.00006L8.95152 1.41672C9.13485 1.12506 9.51819 1.03339 9.80985 1.21672C10.1015 1.40006 10.1932 1.78339 10.0099 2.07506L5.90152 8.65839C5.78486 8.85006 5.58485 8.95839 5.37652 8.95839Z" fill="#862FC0" />
                            </svg>
                            Change Wallet
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="inneritem">
                                All
                                <div class="content">
                                    <label class="checkBox">
                                        <input id="ch1" type="checkbox" />
                                        <div class="transition"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="inneritem">
                                Limited Edition
                                <div class="content">
                                    <label class="checkBox">
                                        <input id="ch1" type="checkbox" />
                                        <div class="transition"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="inneritem">
                                Open Edition
                                <div class="content">
                                    <label class="checkBox">
                                        <input id="ch1" type="checkbox" />
                                        <div class="transition"></div>
                                    </label>
                                </div>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>
                {/* <div className="maintablecreater">
                    <div className="innertable_user table-responsive">
                        <table>
                            <thead>
                                <th>
                                    Items
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>
                                    Collection
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>
                                    Price
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>
                                    Creator
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>
                                    owner
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>
                                    Likes
                                    <img src="\users-assets\dropdownarowt.png" className="dropdownarow pl-2" />
                                </th>
                                <th>Block
                                    
                                </th>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                            
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches2" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                           
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches3" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                           
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches4" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                           
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches5" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                              
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches6" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgddd">
                                                <img src="\users-assets\admin-img.png" className="longradiouspic">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Toyo infants
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        Toyo infants
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            3.70 Core
                                        </span>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Ramon
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mainimgdiv">
                                            <div className="inerimgd">
                                                <img src="\users-assets\admin-img.png" className="tableimgginer">
                                                </img>
                                            </div>
                                            <p className="tableimgtext">
                                                Rihana
                                            </p>
                                        </div>
                                    </td>
                                    <td>1.5K</td>

                                    <td>
                             
                                        <div className="main-outer-p">

                                            <div className="main-switch-nn">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="customSwitches7" />
                                                    <label class="custom-control-label" for="customSwitches2"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>




                            </tbody>

                        </table>

                    </div>
                    <div className='Paginationlattable'>
                        <button className='leftpigbtn' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Prev
                        </button>
                        <Pagination>
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item active>{5}</Pagination.Item>
                            <Pagination.Item>{6}</Pagination.Item>
                        </Pagination>
                        <button className='leftpigbtn' >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4.1665 10H14.9998M10.8332 5L15.2439 9.41074C15.5694 9.73618 15.5694 10.2638 15.2439 10.5893L10.8332 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                            </svg>

                        </button>
                    </div>

                </div> */}
            </div>
        </div>
    )
}

export default Nfts
