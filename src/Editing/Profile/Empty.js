import React from 'react'
import empty from '../../Assets/denisha_img/empty.png'
import '../../CSS/dprofile.css';

export default function Empty() {
  return (
    <>
        <div className='h4'>My Project</div>
        <div className='d-flex flex-column ddd'> 
            <img src={empty} alt=""  className='d_empty_img '/>
            <p className='text-secondary'>You have no project yet</p>
        </div>
    </>
  )
}
