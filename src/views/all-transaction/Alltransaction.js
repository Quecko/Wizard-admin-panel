import React from "react";

import arrowdown from "assets/img/userflow/arrow-down.png";

import './alltransaction.scss';
function Alltransaction() {

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('assets/img/dashboardimg', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <div className="content">
        <section className="alltransaction">
         
          
          <div className="row ">
            <div className="col-sm-12">
              <div className="card">
                <div className="row ptb20">
                  <div className="col-sm-10">
                    <h3 className="common">All Transections</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                  <div class="table-responsive">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th> Token <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> Date <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> From <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> To <img src={arrowdown} className="pl-1" alt="" /></th>
                        <th> Amount <img src={arrowdown} className="pl-1" alt="" /></th>
                      </tr>
                    </thead>
                    <tbody className="main-t-body-text" >
                      <tr>
                        <td className='main-image'>
                          <ul className="d-flex justify-content-start align-items-center">
                            <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                            <li>BTC</li>
                          </ul>
                        </td>
                        <td className=''>Aug 14, 2021</td>
                        <td className=''>0x1DD74DAF...</td>
                        <td className="">0x340962B...</td>
                        <td className="">0.1 BTC</td>
                      </tr>
                      <tr>
                        <td className='main-image'>
                        <ul className="d-flex justify-content-start align-items-center">
                            <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                            <li>BTC</li>
                          </ul>
                        </td>
                        <td className=''>Aug 14, 2021</td>
                        <td className=''>0x1DD74DAF...</td>
                        <td className="">0x340962B...</td>
                        <td className="">0.1 BTC</td>
                      </tr>
                      <tr>
                        <td className='main-image'>
                        <ul className="d-flex justify-content-start align-items-center">
                            <li><img src={`${images['btc.svg']['default']}`} alt="" className="img-fluid" /></li>&nbsp;&nbsp;
                            <li>BTC</li>
                          </ul>
                        </td>
                        <td className=''>Aug 14, 2021</td>
                        <td className=''>0x1DD74DAF...</td>
                        <td className="">0x340962B...</td>
                        <td className="">0.1 BTC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </section>
      </div>
    </>
  );
}
export default Alltransaction;