
import React, { useEffect, useState } from "react";
// import './banner.scss';
// reactstrap components
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router'
function CreateFaq(props) {
    const id = props.match.params.id;
    const history = useHistory()
    const [inputs, setInputs] = useState({
        question: '',
        answer: '',
    })
    console.log("edit data",inputs)
    const token = localStorage.getItem('mytoken')
  const [open, setOpen] = useState(false);

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    // const { question, answer } = inputs;

    const FAQ = (e) => {
        e.preventDefault();
        setOpen(true)
        axios.post(Environment.backendUrl + "/faq/create", {question:inputs.question, answer:inputs.answer}, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
            setOpen(false)
            toast.success(response.data.msg, {
                position: "top-center",
                autoClose: 2000,
            });
            setInputs({
                question: '',
                answer: '',
            })
            history.push('/admin/Faq');
            // setOpen(true)
        }).catch((err) => {
            setOpen(false)
            toast.error(err.response?.data.msg, {
                position: "top-center",
                autoClose: 2000,
            });
        })
    }

    const FAQEdit = (e) => {
        e.preventDefault();
        setOpen(true)
        axios.post(Environment.backendUrl + "/faq/edit",{id , question:inputs.question, answer:inputs.answer}, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)  
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                }); 
                setInputs({
                    question: '',
                    answer: '',
                })
                history.push('/admin/Faq')
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const FaqFInd = () => {
        setOpen(true)
        if(id){
            axios.get(Environment.backendUrl + "/faq/find/" + id, { headers: { "Authorization": `Bearer ${token}`} })
            .then((response) => {
                setInputs(response.data.faq)
                setOpen(false)
     
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        }
    }

    useEffect(() => {
        if(id){
            FaqFInd()
        }
    }, [id])
 
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addbanner1234 send-notifications card">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-lg-7">
                                    <div className="row">
                                        <div className="col-12 main-send-message">
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Question</label>
                                                <textarea type="text" value={inputs.question} name="question" class="form-control" id="exampleFormControlTextarea1" onChange={handleChange1} placeholder="Enter The  Question" rows="2"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 main-send-message">
                                            <div class="form-group">
                                                <label className="padd-top" for="example">Answer</label>
                                                <textarea type="text" value={inputs.answer} name="answer"  class="form-control" id="exampleFormControlTextarea1" onChange={handleChange1} placeholder="Enter The Answer" rows="4"></textarea>
                                                {/* {Object.keys(projectNameError).map((key)=>{
                                                          console.log("key",key);
                                                         return <p className="inputErrors">{projectNameError[key]}</p>
                                                          })} */}
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div className="col-12">
                                        <div class="form-group">
                                            <div className="videopage">
                                            {  id ? <button className="red-b" onClick={FAQEdit}>Save</button> : <button className="red-b" onClick={FAQ}>Publish</button> } 
                                                {/* <button className="red-b" onClick={FAQ}>Publish</button> */}
                                                <Link to="/admin/Faq">
                                                <button className="red-w">Cancel</button>
                                                </Link>
                                            </div>
                                            <ToastContainer style={{ fontSize: 20 }} />
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

export default CreateFaq;
