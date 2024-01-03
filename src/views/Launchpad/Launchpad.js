import React from 'react'
import "./launchpad.scss"

import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Environment from 'utils/Environment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Launchpad = () => {
    const [open, setOpen] = useState(false);
    const [raffles, setRaffles] = useState([])
    const [status, setStatus] = useState('Ended')
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const getRaffles = async () => {
        setOpen(true)

        axios.post(Environment.backendUrl + "/raffles/all", { type: status }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                // console.log('asldfjld', response?.data?.rafflesData)
                setRaffles(response?.data?.rafflesData)
                // window.location.assign('/admin/newsbanner')
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    useEffect(() => {
        getRaffles()
    }, [status])
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

            <div className="content">
                <div className="raffles">
                    <div className="innertable  table-responsive">
                        <table>
                            <thead>
                                <th>Project Image</th>
                                <th>Project Name
                                    <span className='ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <g opacity="0.7">
                                                <path d="M2.4345 5.31539C2.4055 5.28714 2.2815 5.18047 2.1795 5.0811C1.538 4.49854 0.488 2.97881 0.1675 2.18339C0.116 2.06259 0.007 1.75718 0 1.59401C0 1.43765 0.036 1.2886 0.109 1.14637C0.211 0.96907 0.3715 0.826839 0.561 0.748904C0.6925 0.698734 1.086 0.620799 1.093 0.620799C1.5235 0.542864 2.223 0.5 2.996 0.5C3.7325 0.5 4.4035 0.542864 4.8405 0.606673C4.8475 0.61398 5.3365 0.691914 5.504 0.777155C5.81 0.933512 6 1.23892 6 1.56576V1.59401C5.9925 1.80687 5.8025 2.25451 5.7955 2.25451C5.4745 3.00706 4.476 4.49172 3.8125 5.08841C3.8125 5.08841 3.642 5.25645 3.5355 5.32952C3.3825 5.4435 3.193 5.5 3.0035 5.5C2.792 5.5 2.595 5.43619 2.4345 5.31539Z" fill="#030229" />
                                            </g>
                                        </svg>

                                    </span>
                                </th>
                                <th> Price
                                    <span className='ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <g opacity="0.7">
                                                <path d="M2.4345 5.31539C2.4055 5.28714 2.2815 5.18047 2.1795 5.0811C1.538 4.49854 0.488 2.97881 0.1675 2.18339C0.116 2.06259 0.007 1.75718 0 1.59401C0 1.43765 0.036 1.2886 0.109 1.14637C0.211 0.96907 0.3715 0.826839 0.561 0.748904C0.6925 0.698734 1.086 0.620799 1.093 0.620799C1.5235 0.542864 2.223 0.5 2.996 0.5C3.7325 0.5 4.4035 0.542864 4.8405 0.606673C4.8475 0.61398 5.3365 0.691914 5.504 0.777155C5.81 0.933512 6 1.23892 6 1.56576V1.59401C5.9925 1.80687 5.8025 2.25451 5.7955 2.25451C5.4745 3.00706 4.476 4.49172 3.8125 5.08841C3.8125 5.08841 3.642 5.25645 3.5355 5.32952C3.3825 5.4435 3.193 5.5 3.0035 5.5C2.792 5.5 2.595 5.43619 2.4345 5.31539Z" fill="#030229" />
                                            </g>
                                        </svg>

                                    </span>
                                </th>
                                <th>Creator Name
                                    <span className='ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <g opacity="0.7">
                                                <path d="M2.4345 5.31539C2.4055 5.28714 2.2815 5.18047 2.1795 5.0811C1.538 4.49854 0.488 2.97881 0.1675 2.18339C0.116 2.06259 0.007 1.75718 0 1.59401C0 1.43765 0.036 1.2886 0.109 1.14637C0.211 0.96907 0.3715 0.826839 0.561 0.748904C0.6925 0.698734 1.086 0.620799 1.093 0.620799C1.5235 0.542864 2.223 0.5 2.996 0.5C3.7325 0.5 4.4035 0.542864 4.8405 0.606673C4.8475 0.61398 5.3365 0.691914 5.504 0.777155C5.81 0.933512 6 1.23892 6 1.56576V1.59401C5.9925 1.80687 5.8025 2.25451 5.7955 2.25451C5.4745 3.00706 4.476 4.49172 3.8125 5.08841C3.8125 5.08841 3.642 5.25645 3.5355 5.32952C3.3825 5.4435 3.193 5.5 3.0035 5.5C2.792 5.5 2.595 5.43619 2.4345 5.31539Z" fill="#030229" />
                                            </g>
                                        </svg>
                                    </span>
                                </th>
                                <th>Starting Date
                                    <span className='ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <g opacity="0.7">
                                                <path d="M2.4345 5.31539C2.4055 5.28714 2.2815 5.18047 2.1795 5.0811C1.538 4.49854 0.488 2.97881 0.1675 2.18339C0.116 2.06259 0.007 1.75718 0 1.59401C0 1.43765 0.036 1.2886 0.109 1.14637C0.211 0.96907 0.3715 0.826839 0.561 0.748904C0.6925 0.698734 1.086 0.620799 1.093 0.620799C1.5235 0.542864 2.223 0.5 2.996 0.5C3.7325 0.5 4.4035 0.542864 4.8405 0.606673C4.8475 0.61398 5.3365 0.691914 5.504 0.777155C5.81 0.933512 6 1.23892 6 1.56576V1.59401C5.9925 1.80687 5.8025 2.25451 5.7955 2.25451C5.4745 3.00706 4.476 4.49172 3.8125 5.08841C3.8125 5.08841 3.642 5.25645 3.5355 5.32952C3.3825 5.4435 3.193 5.5 3.0035 5.5C2.792 5.5 2.595 5.43619 2.4345 5.31539Z" fill="#030229" />
                                            </g>
                                        </svg>
                                    </span>
                                </th>
                                <th>End Date <span className='ml-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                        <g opacity="0.7">
                                            <path d="M2.4345 5.31539C2.4055 5.28714 2.2815 5.18047 2.1795 5.0811C1.538 4.49854 0.488 2.97881 0.1675 2.18339C0.116 2.06259 0.007 1.75718 0 1.59401C0 1.43765 0.036 1.2886 0.109 1.14637C0.211 0.96907 0.3715 0.826839 0.561 0.748904C0.6925 0.698734 1.086 0.620799 1.093 0.620799C1.5235 0.542864 2.223 0.5 2.996 0.5C3.7325 0.5 4.4035 0.542864 4.8405 0.606673C4.8475 0.61398 5.3365 0.691914 5.504 0.777155C5.81 0.933512 6 1.23892 6 1.56576V1.59401C5.9925 1.80687 5.8025 2.25451 5.7955 2.25451C5.4745 3.00706 4.476 4.49172 3.8125 5.08841C3.8125 5.08841 3.642 5.25645 3.5355 5.32952C3.3825 5.4435 3.193 5.5 3.0035 5.5C2.792 5.5 2.595 5.43619 2.4345 5.31539Z" fill="#030229" />
                                        </g>
                                    </svg>
                                </span>
                                </th>
                                <th>Details</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="inerimgdvide_videoimgs">
                                            <img src="\launchpad\vido1.svg" className="tableimgg_forvideo">
                                            </img>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="boldextra">
                                            Bored Bunny
                                        </p>
                                    </td>
                                    <td>0.002 ETH</td>
                                    <td>
                                        <span className="eleipiess">
                                            Lynn Hicks
                                        </span>
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            Feb 7, 2022
                                        </span>
                                    </td>
                                    <td>
                                        <span className="eleipiess">
                                            Feb 8, 2022
                                        </span>
                                    </td>
                                    <td>
                                        <Link to="/admin/Launchpaddetails/:5454544">
                                            <button className="detailbtn-common" >Detail</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Launchpad
