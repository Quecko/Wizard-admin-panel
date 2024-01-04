import React from 'react'
import "./raffles.scss"

const AddProductRaffle = () => {
  return (
    <>
       <div className="content">
                <div className="addraffles">
                    <div className="option-field">
                        <label>Category</label>
                        <input type="text" placeholder='Category' />
                    </div>
                    <div className="option-field mb-0">
                        <label>Total Items</label>
                        <input type="text" placeholder='Total Items' />
                    </div>
                    <div className="bottom-btn">
                        <button className='btn-publish'>Publish</button>
                        <button className='btn-cancel'>Cancel</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AddProductRaffle
