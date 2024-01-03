
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import './faq.scss';
// reactstrap components
function Faq() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const token = localStorage.getItem('mytoken')
    const Acls = JSON.parse(localStorage.getItem('acls'))

    const GetFAQ = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/faq/all", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                setData(response.data.Faqs)
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }
 

    const collection = (de) => {
        const id = de
        setOpen(true)
        axios.get(Environment.backendUrl + "/faq/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success(response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                GetFAQ()

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })

    }
    console.log("data:::::", data)


    const Faq = data.map(elem => {
        return (
            <tr>
                <td >
                    {/* <div className='desci'>  {elem?.question}</div> */}
                     {elem?.question}
                </td>
                <td className="main-aop">
                        <p className="main-soop"> {elem.answer}</p>
                </td>
                <td className=''>{elem.createdAt.split('T')[0]}</td>
               { Acls?.faq?.delete ? <td> <button className="buttons-remove" type="button" onClick={() => collection(elem.id)}><i className="far fa-trash-alt"></i></button></td> : ''}
               {Acls?.faq?.update ? <td> <Link to={'/admin/EditFaq/' + elem?.id}><i class="fas fa-edit"></i></Link></td> : ''}
            </tr>
        )
    })

    useEffect(() => {
        GetFAQ()
    }, [])

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos faq notifications card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Questions</th>
                                        <th>Answers</th>
                                        <th >Date</th>
                                        {Acls?.faq?.delete ? <th>Remove</th> : ''}
                                        {Acls?.faq?.update ? <th>Edit</th> : '' }
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                 {Faq ? Faq :''}
                                </tbody>
                            </table>
                            <ToastContainer style={{ fontSize: 20 }} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Faq;
