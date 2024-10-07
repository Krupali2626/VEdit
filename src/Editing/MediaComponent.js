import React from 'react'
import '../CSS/MediaComponent.css'
import d_m1 from "../Assets/denisha_img/cloud.svg";

export default function MediaComponent() {
  return (
    <>
        <div className="row">
            <div className="col-auto p-0">
                <div className='d_upld_bgimg'>
                  <div className='d_overlayer d-flex justify-content-center align-items-center'>
                      <div className='text-center'>
                        <img src={d_m1} alt="" className='mb-2' />
                        <p className='mb-0'>Click to upload</p>
                        <p className='d_gray_imgtxt'>or drag & drop file here</p>
                      </div>
                  </div>
                </div>
            </div>
            <div className="col">
              
            </div>
        </div>
    </> 
  )
}
