import { Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Environment from 'utils/Environment'
import './addnewcategory.scss'

const Addnewcategory = (props) => {
  const [totalProducts, setTotalProducts] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const token = localStorage.getItem('mytoken')
  const [open, setOpen] = useState(false);
  const id = props.match.params.id;
  console.log('raffel cate', id)
  const createCategory = async () => {
    if (totalProducts && categoryName) {
      try {
        setOpen(true)
        const res = await axios.post(`${Environment.backendUrl}/productsCategory/add`, { totalProducts, categoryName }, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
        toast.success('Product Category Added', {
          position: "top-center",
          autoClose: 2000,
        })
        setOpen(false)
      } catch (error) {
        setOpen(false)
        toast.error('Category Not added !', {
          position: "top-center",
          autoClose: 2000,
        })
      }
    } else {
      toast.error('Fill Fields')
    }
  }
  const editCategory = async () => {
    if (totalProducts && categoryName) {
      try {
        setOpen(true)
        const res = await axios.post(`${Environment.backendUrl}/productsCategory/edit`, { id,totalProducts, categoryName }, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
        toast.success('Product Category Editted', {
          position: "top-center",
          autoClose: 2000,
        })
        setOpen(false)
      } catch (error) {
        setOpen(false)
        toast.error('Category Not editted !', {
          position: "top-center",
          autoClose: 2000,
        })
      }
    } else {
      toast.error('Fill Fields')
    }
  }
  const getSingleCategory = async () => {
    setOpen(true)
    axios.get(Environment.backendUrl + `/productsCategory/find/${id}`, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        console.log('single sub', response?.data?.productCategory)
        setCategoryName(response?.data?.productCategory?.categoryName)
        setTotalProducts(response?.data?.productCategory?.totalProducts)
        console.log('dsafsadfasfasdf', response)
        setOpen(false)
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
    if (!(id === '4577432')) {
      getSingleCategory()
    }
  }, [])

  return (
    <>
      <Backdrop className="loader" sx={{ color: '#fff' }} open={open}><CircularProgress color="inherit" /></Backdrop>

      <div className="content">
        <section className='addnewcategory'>
          <div className="row">
            <div className="col-lg-8">
              <p>Category</p>
              <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder='Name' />
              <p>Total Products</p>
              <input value={totalProducts} onChange={(e) => setTotalProducts(e.target.value)} type="number" placeholder='amount' />
              <div className="btnslasts">
                <button onClick={id === '4577432' ? createCategory : editCategory} className="bluebtn">Publish</button>
                <button className="whitebtn">Cancel</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Addnewcategory
