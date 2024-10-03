import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCrown, FaUserAlt } from 'react-icons/fa';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import VEHome from './VEHome';
import NoProject from './NoProject';
import VEPricing from './VEPricing';
// import './Sidebar.css'; // Ensure to import your CSS file

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location

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
                  ☰
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
        <div className='pt-lg-5 pb-lg-4'></div>
        <Link to="/den/home" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/den/home' ? 'active' : ''}`}>
          <AiFillHome /><span>Home</span>
        </Link>
        <Link to="/den/VEPricing" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/den/VEPricing' ? 'active' : ''}`}>
          <FaCrown /><span>Pricing</span>
        </Link>
        <div className='d_sidebar_menu'>
          <FaUserAlt /><span>Account</span>
        </div>
      </div>
      <div className={`d_main ${isSidebarOpen ? 'active' : ''}`}>
        <div className="row py-4 px-md-3 px-1">
          <div className="col-12 text-white">
            {/* Add Routes here */}
            <Routes>
              <Route path="home" element={<VEHome />} />
              <Route path="noproject" element={<NoProject />} />
              <Route path="VEPricing" element={<VEPricing />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}