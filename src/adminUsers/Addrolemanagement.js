import React, { useEffect, useState } from 'react'
import './coin1.scss'
import {  toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { useHistory } from 'react-router';

const Addrolemanagement = (props) => {
    const [rend, setRend] = useState(false);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('mytoken')
    const id = props.match.params.id;
    const history = useHistory()
    // console.log("ddddddddddd", id)
    const handleChangeCHeckbox = (e, key, b) => {
        let dumObj = myState;
        if (b === "create") {
            dumObj[key].create = e.target.checked;
        } else if (b === "update") {
            dumObj[key].update = e.target.checked;
        } else if (b === "get") {
            dumObj[key].get = e.target.checked;
        } else if (b === "delete") {
            dumObj[key].delete = e.target.checked;
        }
        setMyState(dumObj);
        setRend(!rend);
    }

    const [inputs, setInputs] = useState({
        role: ''
    })
    const [myState, setMyState] = useState({}
    );
    console.log("sdfasdfsadfsdaf", myState)
    console.log("sdfasdfsadfsdaf:::::::::", inputs)
    // const { name, symbol, decimals, contractAddress, type, page, image, link } = inputs;

    const handleChange1 = (e) => {

        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    // const [isSubscribed, setIsSubscribed] = useState(false);
    // const handleChange = event => {
    //     if (event.target.checked) {
    //         console.log('checked');
    //     } else {
    //         console.log(' Checkbox is NOT checked');
    //     }
    //     setIsSubscribed(current => !current);
    // };
    const moreToggle = (e, a, index) => {
        // console.log("e.", e.target.checked)
        if (e.target.checked) {
            // const name = e.currentTarget.name;
            let dumArr = myState;
            let dumObj = {
                selection: a,
                get: false,
                delete: false,
                create: false,
                update: false
            }
            dumArr[a] = dumObj;
            // console.log("ddddddd", dumArr)
            setMyState(dumArr);
            setRend(!rend);
        } else {
            // let dumArr = myState;
            // dumArr = {}
            // setMyState(dumArr);
            setRend(!rend);

            let dumArr = myState;
            // console.log("before delete",dumArr,a)
            // let dumObj = {
            //     selection: '',
            //     get: false,
            //     delete: false,
            //     create: false,
            //     update: false
            // }
            // dumArr = delete dumArr[a]
            let name = a
            const { [name]: removedProperty, ...restObject } = dumArr
            // console.log("after delete",restObject)
            // dumArr[{}]=dumObj
            setMyState(restObject);
        }
    };

    const addRole = async (event) => {

        const arrayOfObj = Object.entries(myState).map((e) => (e[1]))
        // console.log("in arrraryyyyy",arrayOfObj)
        setOpen(true)
        event.preventDefault()

        if (inputs.role !== '') {
            axios.post(Environment.backendUrl + "/rolesManagement/add", { role_name: inputs.role, roles_permissions: arrayOfObj }, { headers: { "Authorization": `Bearer ${token}` } })
                .then((response) => {
                    setOpen(false)
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setInputs({
                        name: '',
                        description: '',
                        routeLink: '',
                        routePage: '',
                        category: '',
                        type: '',
                        image: ''
                    })
                    history.push('/admin/allroles');
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

    const editRole = async (event) => {

        const arrayOfObj = Object.entries(myState).map((e) => (e[1]))
        console.log("in arrraryyyyy", arrayOfObj)
        setOpen(true)
        event.preventDefault()

        // if (inputs.role != '') {
        axios.post(Environment.backendUrl + "/rolesManagement/edit", { role_name: inputs.role, roles_permissions: arrayOfObj, role_id: id, }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
                history.push('/admin/allroles');
                // setSelectedImg('');
            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
        // } else {
        //     setOpen(false)
        //     toast.error("Field cannot be empty", {
        //         position: "top-center",
        //         autoClose: 2000,
        //     });
        // }

    }

    const FIndRole = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/rolesManagement/find/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                let a = response?.data?.role?.Acls
                setInputs(inputs => ({ ...inputs, role: response?.data?.role?.role_name }));
                let obj = {};
                let obj2 = {}
                let a1 = a.map((e, i) => {
                    console.log("eeeee", e)
                    obj[`${e.selection}`] = { ...e };
                    obj2[`${e.selection}`] = e.id
                })
                // console.log(a1,'aa');
                setMyState(obj);
                setInputs(inputs => ({ ...inputs, aclId: obj2 }))
                setOpen(false)

            }).catch((err) => {
                setOpen(false)
                // console.log("err",err)
                toast.error(err.response?.data?.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    useEffect(() => {
        if (id) {
            FIndRole()
        }
    }, [id])

    // console.log("myState", myState,inputs)

    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className='content'>
                <section className='addrole'>
                    <div className='container-fluid p-0'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-8 p-0'>
                                <div className='outermain'>
                                    <div class="form-group">
                                        <label className='adminheading' for="example">Admin Role</label>
                                        <input type="text" name="role" onChange={handleChange1} value={inputs.role} className={'form-control'} placeholder="Enter Role of Admin Eg reward-Admin" />
                                        {/* {Object.keys(TitleError).map((key) => {
                                            return <p className="inputErrors">{TitleError[key]}</p>
                                        })} */}
                                    </div>
                                </div>
                                <div className='main'>
                                    <div className="col-12">
                                        <div class="form-group">
                                            <label className='adminheading' for="example">Choose Access</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="users" checked={myState?.users?.selection}
                                                            onChange={(e) => moreToggle(e, 'users', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            Users
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.users ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.users?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.users?.selection, 'create')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Create
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.users?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.users?.selection, 'update')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        update
                                                                    </label>
                                                                </div>
                                                                {/* <div class="form-check">
                                                                    <input checked={myState?.users?.get} class="form-check-input" type="checkbox" name="get" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.users?.selection, 'get')} />
                                                                  
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Get
                                                                    </label>
                                                                </div> */}
                                                                <div class="form-check">
                                                                    <input checked={myState?.users?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.users?.selection, 'delete')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Delete
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="coins" checked={myState?.coins?.selection}
                                                            onChange={(e) => moreToggle(e, 'coins', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            Coins
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.coins ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.coins?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.coins?.selection, 'create')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Create
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.coins?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.coins?.selection, 'update')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        update
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.coins?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.coins?.selection, 'delete')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Delete
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.videos?.selection}
                                                        onChange={(e) => moreToggle(e, 'videos', 1)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Videos
                                                    </label>
                                                </div>
                                                {
                                                    myState?.videos ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.videos?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.videos?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.videos?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.videos?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.videos?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.videos?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.course?.selection}
                                                        onChange={(e) => moreToggle(e, 'course', 2)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Course
                                                    </label>
                                                </div>
                                                {
                                                    myState?.course ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.course?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.course?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.course?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.course?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.course?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.course?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.dailyChallenge?.selection}
                                                        onChange={(e) => moreToggle(e, 'dailyChallenge', 3)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        dailyChallenge
                                                    </label>
                                                </div>
                                                {
                                                    myState?.dailyChallenge ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.dailyChallenge?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.dailyChallenge?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.dailyChallenge?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.dailyChallenge?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.dailyChallenge?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.dailyChallenge?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.playToEarn?.selection}
                                                        onChange={(e) => moreToggle(e, 'playToEarn', 4)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        play To Earn
                                                    </label>
                                                </div>
                                                {
                                                    myState?.playToEarn ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.playToEarn?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.playToEarn?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.playToEarn?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.playToEarn?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.playToEarn?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.playToEarn?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.upComming?.selection}
                                                        onChange={(e) => moreToggle(e, 'upComming', 5)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        upComming
                                                    </label>
                                                </div>
                                                {
                                                    myState?.upComming ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.upComming?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.upComming?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.upComming?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.upComming?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.upComming?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.upComming?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.newsBanner?.selection}
                                                        onChange={(e) => moreToggle(e, 'newsBanner', 6)} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        newsBanner
                                                    </label>
                                                </div>
                                                {
                                                    myState?.newsBanner ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.newsBanner?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.newsBanner?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.newsBanner?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.newsBanner?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.newsBanner?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.newsBanner?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="raffles" checked={myState?.raffles?.selection}
                                                            onChange={(e) => moreToggle(e, 'raffles', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            raffles
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.raffles ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.raffles?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.raffles?.selection, 'create')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Create
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.raffles?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.raffles?.selection, 'update')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        update
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="rafflesCategories" checked={myState?.rafflesCategories?.selection}
                                                            onChange={(e) => moreToggle(e, 'rafflesCategories', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            rafflesCategories
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.rafflesCategories ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.rafflesCategories?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.rafflesCategories?.selection, 'create')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Create
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.rafflesCategories?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.rafflesCategories?.selection, 'update')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        update
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="gifts" checked={myState?.gifts?.selection}
                                                            onChange={(e) => moreToggle(e, 'gifts', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            gifts
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.gifts ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.gifts?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.gifts?.selection, 'create')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Create
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="otherBanner" checked={myState?.otherBanner?.selection}
                                                            onChange={(e) => moreToggle(e, 'otherBanner', 0)} />
                                                        {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                        <label class="form-check-label" for="exampleRadios1">
                                                            otherBanner
                                                        </label>
                                                    </div>
                                                    {
                                                        myState?.otherBanner ? <>
                                                            <div className='ml-3'>
                                                                <div class="form-check">
                                                                    <input checked={myState?.otherBanner?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.otherBanner?.selection, 'update')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        update
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input checked={myState?.otherBanner?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.otherBanner?.selection, 'delete')} />
                                                                    {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                    <label class="form-check-label" for="exampleRadios1">
                                                                        Delete
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </> : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.gameBanner?.selection}
                                                        onChange={(e) => moreToggle(e, 'gameBanner')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        gameBanner
                                                    </label>
                                                </div>
                                                {
                                                    myState?.gameBanner ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.gameBanner?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.gameBanner?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.gameBanner?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.gameBanner?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.gameBanner?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.gameBanner?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.task?.selection}
                                                        onChange={(e) => moreToggle(e, 'task')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        task
                                                    </label>
                                                </div>
                                                {
                                                    myState?.task ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.task?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.task?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.task?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.task?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.task?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.task?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.weeksReward?.selection}
                                                        onChange={(e) => moreToggle(e, 'weeksReward')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        week's Reward
                                                    </label>
                                                </div>
                                                {
                                                    myState?.weeksReward ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.weeksReward?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.weeksReward?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.weeksReward?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.weeksReward?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            
                                                            <div class="form-check">
                                                                <input checked={myState?.weeksReward?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.weeksReward?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.leaderBoard?.selection}
                                                        onChange={(e) => moreToggle(e, 'leaderBoard')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        leaderBoard
                                                    </label>
                                                </div>
                                                {
                                                    myState?.leaderBoard?.selection ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.leaderBoard?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.leaderBoard?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.leaderBoard?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.leaderBoard?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.leaderBoard?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.leaderBoard?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.notification?.selection}
                                                        onChange={(e) => moreToggle(e, 'notification')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        notification
                                                    </label>
                                                </div>
                                                {
                                                    myState?.notification ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.notification?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.notification?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.notification?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.notification?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.notification?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.notification?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.faq?.selection}
                                                        onChange={(e) => moreToggle(e, 'faq')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        FAQ
                                                    </label>
                                                </div>
                                                {
                                                    myState?.faq ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.faq?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.faq?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.faq?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.faq?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.faq?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.faq?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="checkbox2" checked={myState?.settings?.selection}
                                                        onChange={(e) => moreToggle(e, 'settings')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        settings
                                                    </label>
                                                </div>
                                                {
                                                    myState?.settings ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.settings?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.settings?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.settings?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.settings?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.settings?.delete} class="form-check-input" type="checkbox" name="delete" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.settings?.selection, 'delete')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="products" checked={myState?.products?.selection}
                                                        onChange={(e) => moreToggle(e, 'products')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        products
                                                    </label>
                                                </div>
                                                {
                                                    myState?.products ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.products?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.products?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.products?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.products?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="orders" checked={myState?.orders?.selection}
                                                        onChange={(e) => moreToggle(e, 'orders')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        orders
                                                    </label>
                                                </div>
                                                {
                                                    myState?.orders ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.orders?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.orders?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="productCategories" checked={myState?.productCategories?.selection}
                                                        onChange={(e) => moreToggle(e, 'productCategories')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        productCategories
                                                    </label>
                                                </div>
                                                {
                                                    myState?.productCategories ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.productCategories?.create} class="form-check-input " type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.productCategories?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.productCategories?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.productCategories?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="boltManagement" checked={myState?.boltManagement?.selection}
                                                        onChange={(e) => moreToggle(e, 'boltManagement')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        boltManagement
                                                    </label>
                                                </div>
                                                {
                                                    myState?.boltManagement ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.boltManagement?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.boltManagement?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="badges" checked={myState?.badges?.selection}
                                                        onChange={(e) => moreToggle(e, 'badges')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        badges
                                                    </label>
                                                </div>
                                                {
                                                    myState?.badges ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.badges?.create} class="form-check-input" type="checkbox" name="create" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.badges?.selection, 'create')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Create
                                                                </label>
                                                            </div>
                                                            <div class="form-check">
                                                                <input checked={myState?.badges?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.badges?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" name="subscription" checked={myState?.subscription?.selection}
                                                        onChange={(e) => moreToggle(e, 'subscription')} />
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        subscription
                                                    </label>
                                                </div>
                                                {
                                                    myState?.subscription ? <>
                                                        <div className='ml-3'>
                                                            <div class="form-check">
                                                                <input checked={myState?.subscription?.update} class="form-check-input " type="checkbox" name="update" value={myState} onChange={(e) => handleChangeCHeckbox(e, myState?.subscription?.selection, 'update')} />
                                                                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <div className="videopage">
                                                    {/* <button className="red-b" onClick={addRole}>Publish</button> */}
                                                    {id ? <button className="red-b" onClick={editRole}>Save</button> : <button className="red-b" onClick={addRole}>Publish</button>}
                                                    {/* // <button className="red-b" onClick={sendVideo}>Publish</button> */}
                                                    {/* <button className="red-w" onClick={cancel}>Cancel</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Addrolemanagement