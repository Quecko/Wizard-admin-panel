
import React, { useState, useEffect } from "react";
import './video.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from "utils/Environment";
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
// reactstrap components
function AddCategory() {
    const [cate, setCate] = useState([]);
    const [open, setOpen] = useState(true);
    const [selectedImg, setSelectedImg] = useState();
    const Acls = JSON.parse(localStorage.getItem('acls'))
    const [myFiles, setMyFiles] = useState();
    const [id, setId] = useState();
    const token = localStorage.getItem('mytoken')
    const [submitted, setSubmitted] = useState(false);
    const history=useHistory()
  const [inputs, setInputs] = useState({
    name: '',
    search: ''
  })

 
  const { category, search } = inputs;
  const handleChange = (e) => {
    const {  value } = e.target;
    setInputs(inputs => ({ ...inputs, name: value }));
  }
  const handleFileSelect = (evt) => {
    if (evt.target.files) {
        const filesarray = Array.from(evt.target.files).map((file) => URL.createObjectURL(file));

        setSelectedImg(filesarray[0]);
        // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles(file)
}
  const renderPhotos = (source) => {
    return <img src={source} alt="" width="200" height="200" />
  }

  console.log("iddd",inputs)
  const getCourse = (de) => {
     const id=de
     setId(id)
    setOpen(true)
    if (id) {
        axios.get(Environment.backendUrl + "/videoCategory/find/" + id, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setInputs(response.data.category)
                setSelectedImg(response.data.category.image)
                setOpen(false)
                opeeennn()

            }).catch((err) => {
                setOpen(false)
                toast.error(err.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    } else { }

}

  const EditCategory = (e) => {
    setOpen(true)
    const data = new FormData();
    if (myFiles) {
        data.append("image", myFiles)
    }
    data.append("name", inputs.name)
    data.append("id",id)
    if (category != '' && myFiles != '') {
      axios.post(Environment.backendUrl + "/videoCategory/edit", data, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          setOpen(false)
          toast.success("Category Added", {
            position: "top-center",
            autoClose: 3000,
          });
          setInputs({
            category: '',
          })
          setSelectedImg('')
          window.$('#exampleModal345').modal('hide')
          window.location.reload();

        }).catch((err) => {
          setOpen(false)
          toast.error(err.response.data.msg, {
            position: "top-center",
            autoClose: 2000,
          });
        })
    } else {
      close()
      setOpen(false)
      toast.error("Category cannot be empty", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  const close = () => {
    window.$('#exampleModal345').modal('hide')
  }
  const opeeennn = () => {
    window.$('#exampleModal345').modal('show')
  }

  const close1 = () => {
    window.$('#exampleModal346').modal('hide')
  }
  const opeeennn1 = () => {
    window.$('#exampleModal346').modal('show')
  }
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const getCategory = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/videoCategory/all/admin", { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setCate(response.data.categories)
                setOpen(false)
            }).catch((err) => {
                toast.error(err?.response?.data?.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }


    const deleteCourse = () => {
        setOpen(true)
        axios.get(Environment.backendUrl + "/videoCategory/delete/" + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setOpen(false)
                getCategory()
                close1()
                toast.success("Course Deleted", {
                    position: "top-center",
                    autoClose: 3000,
                });
                
                // setOpen(true)

            }).catch((err) => {
                setOpen(false)
                close1()
                toast.error(err.response?.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }



    const collection11 = (de) => {
        const ids = de
        setId(ids)
        opeeennn1()
    }

    useEffect(() => {
        getCategory()

    }, [])

    const data = cate.map((elem) => {
        return (
            <tr >
                <td onClick={()=>history.push('/admin/videos')} className='cPointer'><img src={elem?.image} className="pr-2 imgages-no" alt="" /></td>
                <td onClick={()=>history.push('/admin/videos')} className='cPointer'>{elem.name}</td>
                <td onClick={()=>history.push('/admin/videos')} className='cPointer'>{elem.createdAt.split('T')[0]}</td>
                <td onClick={()=>history.push('/admin/videos')} className='cPointer'>{elem.total} Videos</td>
                {Acls?.course?.delete ? <td > <button className="buttons-remove" type="button" onClick={() => collection11(elem.id)} ><i className="far fa-trash-alt"></i></button></td> : ''}
                {Acls?.course?.update ? <td> <i class="fas fa-edit" onClick={() => getCourse(elem.id)}></i></td> : ''}

            </tr>
        )
    })





    const images = importAll(require.context('assets/img/userflow', false, /\.(png|jpe?g|svg)$/));
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>
            <div className="content">
                <section className="videos card">
                    <div className="container-fluid">
                        <div class="table-responsive">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th>Banner Image</th>
                                        <th>Course</th>
                                        <th > Creation Date <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        <th > Total Videos <img src={`${images['arrow-down.png']['default']}`} className="pl-1" alt="" /></th>
                                        {Acls?.course?.delete ? <th>Remove</th> : ''}
                                        {Acls?.course?.update ? <th>Edit</th>: ''}
                                    </tr>
                                </thead>
                                <tbody className="main-t-body-text" >
                                    {data.length > 0 ? data : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <div className="main-modal-one">
                <div class="modal fade modal-zzz" id="exampleModal345" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog daily-profile-modal">
                        <div class="modal-content daily-profile-modal-inner">
                            <div class="modal-body modal-body-main">
                                <div className="main-outter">
                                    <div className="row main-cardssss">
                                        <div className="col-md-12 col-12">
                                            <div className="flux-b">
                                                <h3>Add Course</h3>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Add Thumbnail</label>
                                                <div className="main-image-div">
                                                <div className="choose-filessss">
                                                    {/* <p>Drag & drop or <span></span></p> */}
                                                    {selectedImg ? renderPhotos(selectedImg) : null}
                                                    <form>
                                                        <input type="file" name="image" className={'form-control'} onChange={handleFileSelect}  />
                                                        {/* <h4 style={{ fontWeight: "bold" }}>Files</h4> */}
                                                        {/* {myFiles[0]} */}
                                                    </form>

                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div class="form-group">
                                                <label for="example">Course Name</label>
                                                <input type="text" name="name" value={inputs.name} onChange={handleChange} className={'form-control' + (submitted && !category ? ' is-invalid' : '')} placeholder="Enter Category Name" />

                                            </div>
                                        </div>
                                        <div className="col-md-12 col-12">
                                            <div className="button-modal-daily">
                                               <button type="button" className="button-main-daily" onClick={EditCategory} >Edit</button>
                                                <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close" onChange={close} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade modal-zzz" id="exampleModal346" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog daily-profile-modal">
                                <div class="modal-content daily-profile-modal-inner">
                                    <div class="modal-body modal-body-main">
                                        <div className="main-outter text-center">
                                            <div className="row main-cardssss">
                                                <div className="col-md-12 col-12">
                                                    <div className="awesm">
                                                        <i class="fas fa-exclamation-triangle"></i>
                                                    </div>
                                                    <div className="flux-b pt-3">
                                                        <h3>Are You Sure You Want to Delete This Course</h3>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-12 ptb20">
                                                    <div className="button-modal-daily">
                                                        <button type="button" className="button-main-daily " onClick={deleteCourse} >Yes</button>
                                                        <button type="button" className="button-main-dailys" data-dismiss="modal" aria-label="Close" onChange={close1} >Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    );
}

export default AddCategory;
