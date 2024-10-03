import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VEHome from './VEHome'; // Import your components here
import Sidebar from './Sidebar';
import NoProject from './NoProject';
import VEPricing from './VEPricing';

const DenishaRoutes = () => {
  return (
    <Routes>
      <Route path="/den" element={<Sidebar />}>
        {/* Nested routes for Sidebar */}
        <Route path="home" element={<VEHome />} />
        <Route path="noproject" element={<NoProject />} />
        <Route path="VEPricing" element={<VEPricing />} />

        {/* Add more nested routes as needed */}
      </Route>
    </Routes>
  );
};

export default DenishaRoutes;