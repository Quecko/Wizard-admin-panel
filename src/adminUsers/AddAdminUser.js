
import React, { useEffect, useState } from "react";
import './coin1.scss';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// const items = ["Action", "Another action", "Something else"];
function AddAdminUser(props) {
    // const [selectedImg, setSelectedImg] = useState();
    const id = props.match.params.id;
    const [myroles, setMyroles] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    // const [myFiles, setMyFiles] = useState();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const [inputs, setInputs] = useState({
        full_name: '',
        email: '',
        password: '',
        RoleId: '',
    })
    console.log("sdfasdfsadfsdaf", id)

    // const handleFileSelect = (evt) => {
    //     if (evt.target.files) {
    //         const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

    //         setSelectedImg(filesarray[0]);
    //         // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    //     }
    //     var files = evt.target.files;
    //     var file = files[0];
    //     setMyFiles(file)
    // }

    const addAdminUser = async (event) => {
        setOpen(true)
        event.preventDefault()

        if (inputs.full_name !== '' && inputs.email !== '' && inputs.password !== '' && inputs.roleId !== '') {
            axios.post(Environment.backendUrl + "/adminManagement/add", {full_name:inputs.full_name , email:inputs.email,password:inputs.password,RoleId:inputs.RoleId}, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        full_name: '',
                        email: '',
                        password: '',
                        roleId: '',
                    })
                    history.push('/admin/allAdmins');
                    // setSelectedImg('');
                }).catch((err) => {
                    setOpen(false)
                    toast.error(err.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                })
        } else {
            setOpen(false)
            toast.error("Field cannot be empty", {
                position: "top-center",
                autoClose: 2000,
            });
        }

    }

    const getAllRole = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/rolesManagement/getRoles", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setMyroles(response.data.roles)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const RoleSelection = (a) => {
        // console.log("aaaaaaaaa",a)
        setInputs(inputs => ({ ...inputs, RoleId: a.id }))
        setSelectedItem(a.role_name)

    }


    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const FIndAdmin = () => { 
        setOpen(true)
        axios.get(Environment.backendUrl + "/adminManagement/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setInputs(response.data.admin)
                setSelectedItem(response.data.admin.Role.role_name)
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    console.log("inputsss", inputs)

    const editAdmin = async (event) => {
        setOpen(true)
        event.preventDefault()
        axios.post(Environment.backendUrl + "/adminManagement/edit", {full_name:inputs.full_name ,RoleId:inputs.RoleId, id:id}, { headers: { "Authorization": `Bearer ${token}`} })
            .then((response) => {
                setOpen(false)
                setTimeout(() => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }, 3000);

                setInputs({
                    name: '',
                    symbol: '',
                    decimals: '',
                    contractAddress: '',
                    type: '',
                    image: ''
                })
                // setSelectedImg('')
                history.push('/admin/allAdmins')
                // console.log(response)
                // setOpen(true)
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }


    const cancel = () => {
        history.push('/admin/Coins')
    }

    useEffect(() => {
        getAllRole()
    }, [])

    useEffect(() => {
        if (id) {
            FIndAdmin()
        }

    }, [])



    // const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));z
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="addbanner12345 card njdhbcdhbc">
                    <form>
                        <div className="inner-submit-lower-div">
                            <div class="row">
                                <div class="col-md-8 order-md-0 order-1">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Admin Name</label>
                                                    <input type="text" name="full_name" value={inputs.full_name} onChange={handleChange1} className={'form-control'} placeholder="Enter Admin Name" />
                                                    {/* {Object.keys(TitleError).map((key) => {
                                                        return <p className="inputErrors">{TitleError[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {/* <div class="form-group">
                                                    <label for="example">Admin Role</label>
                                                    <input type="text" name="role" value={inputs.name} onChange={handleChange1} className={'form-control'} placeholder="Enter Role of Admin Eg reward-Admin" />
                                                    {Object.keys(TitleError).map((key) => {
                                                        return <p className="inputErrors">{TitleError[key]}</p>
                                                    })}
                                                </div> */}
                                                <h6 className="adminheading">Admin Role</h6>
                                                <div class="dropdown droped">
                                                    <button class="dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                        {
                                                            selectedItem ? <><h6 style={{ color: "black" }}>{selectedItem}</h6></> : "Choose a Role"}

                                                    </button>
                                                    <div class="dropdown-menu dropmain">
                                                        {myroles?.map((elem) =>
                                                            <a className="dropdown-item drop" onClick={() => RoleSelection(elem)}>
                                                                {elem?.role_name}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Email</label>
                                                    <input type="text" name="email" value={inputs.email} onChange={handleChange1} readOnly={id} className={'form-control'} placeholder="Enter of Admin" />
                                                    {/* {Object.keys(TitleError).map((key) => {
                                                    return <p className="inputErrors">{TitleError[key]}</p>
                                                })} */}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <label for="example">Password</label>
                                                    <input type="password" name="password" value={inputs.password} readOnly={id}  onChange={handleChange1} className={'form-control'} placeholder="Enter title of the game" />
                                                    {/* {Object.keys(TitleError).map((key) => {
                                                    return <p className="inputErrors">{TitleError[key]}</p>
                                                })} */}
                                                </div>
                                            </div>

                                        </div>



                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {id ? <button className="red-b" onClick={editAdmin}>Save</button> : <button className="red-b" onClick={addAdminUser}>Publish</button>}
                                                    {/* // <button className="red-b" onClick={sendVideo}>Publish</button> */}
                                                    <button className="red-w" onClick={cancel}>Cancel</button>
                                                </div>
                                            </div>
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

export default AddAdminUser;
