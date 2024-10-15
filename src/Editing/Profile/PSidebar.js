import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaCrown, FaUserAlt } from 'react-icons/fa';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import NoProject from '../NoProject';
import VEPricing from '../VEPricing';
import PHome from './PHome';
import ChangePass from './ChangePass';
import MyProject from './MyProject';
import Logout from './Logout';
import '../../CSS/dprofile.css'; // Ensure to import your CSS file
import Empty from './Empty';

export default function PSidebar() {
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
        <Link to="/PSidebar/Phome" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/PSidebar/Phome' ? 'active' : ''}`}>
          <AiFillHome /><span>My profile</span>
        </Link>
        <Link to="/PSidebar/ChangePass" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/PSidebar/ChangePass' ? 'active' : ''}`}>
          <FaCrown /><span>Change Password</span>
        </Link>
        <Link to="/PSidebar/MyProject" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/PSidebar/MyProject' ? 'active' : ''}`}>
          <FaUserAlt /><span>My project</span>
        </Link>
        <Link to="/PSidebar/Logout" className={`d_sidebar_menu text-decoration-none ${location.pathname === '/PSidebar/Logout' ? 'active' : ''}`}>
          <FaUserAlt /><span>Logout</span>
        </Link>
      </div>
      <div className={`d_main ${isSidebarOpen ? 'active' : ''}`}>
        <div className="row py-4 px-md-3 px-1">
          <div className="col-12 text-white">
            {/* Add Routes here */}
            <Routes>
              <Route path="Phome" element={<PHome />} />
              <Route path="ChangePass" element={<ChangePass />} />
              <Route path="MyProject" element={<MyProject />} />
              <Route path="Logout" element={<Logout />} />
              <Route path="empty" element={<Empty />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}