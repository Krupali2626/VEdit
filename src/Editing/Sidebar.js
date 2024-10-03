import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCrown, FaUserAlt } from 'react-icons/fa';
import VEHome from './VEHome';
import { Route, Routes } from 'react-router-dom';
// import './Sidebar.css'; // Ensure to import your CSS file

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="d_navbar py-3 px-sm-3 px-2">
        <div className="row ">
          <div className="col-12">
            <div className='d-flex justify-content-between'>
              <div className='d-flex align-items-center'>
                <div className="toggle-sidebar" onClick={toggleSidebar}>
                  ☰ {/* Hamburger icon */}
                </div>
                <p className='mb-0 fs-2  ms-lg-0 ms-3'>LOGO</p>
              </div>
              <div className='d_profile_div'>
                <span>J</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`d_sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className='pt-5 pb-4'></div>
        <div className='d_sidebar_menu active'>
          <AiFillHome /><span>Home</span>
        </div>
        <div className='d_sidebar_menu'>
          <FaCrown /><span>Pricing</span>
        </div>
        <div className='d_sidebar_menu'>
          <FaUserAlt /><span>Account</span>
        </div>
      </div>
      <div className={`d_main ${isSidebarOpen ? 'active' : ''}`}>
        <div className="row">
          <div className="col-10 text-white">
            sdfghj
 {/* Add Routes here */}
 <Routes>
              <Route path="/home" element={<VEHome />} />
              {/* Add more routes as needed */}
            </Routes>

          </div>
        </div>
      </div>
    </div>
  );
}