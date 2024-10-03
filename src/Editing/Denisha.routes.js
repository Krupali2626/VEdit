// path/to/Denisha.routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VEHome from './VEHome'; // Import your components here
import Sidebar from './Sidebar';
// Import other components as needed

const DenishaRoutes = () => {
  return (
    
    <Routes>
      {/* Define your routes here */}
      <Route path="/den" element={<Sidebar />} /> {/* Sidebar will be rendered at /den */}
      <Route path="/den/home" element={<VEHome />} /> {/* VEHome will be rendered at /den/home */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default DenishaRoutes;