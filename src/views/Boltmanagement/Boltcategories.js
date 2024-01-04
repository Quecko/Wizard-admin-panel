import React from 'react'
import "./boltmanagement.scss"

const Boltcategories = () => {
    return (
            <div className="content">
                <section className="boltcategories">
                    <div className="container-fluid p-0">
                        <div className='col-sm-12 col-lg-8 p-0'>
                            <p>Task</p>
                            <input type="text" placeholder='Verified Referral' />
                            <p>Bolt</p>
                            <input type="text" placeholder='10' />
                        </div>
                    </div>
                    <div className='last'>
                        <button>Publish</button>
                        <button>Cancel</button>
                    </div>
                </section>
            </div>
    )
}

export default Boltcategories