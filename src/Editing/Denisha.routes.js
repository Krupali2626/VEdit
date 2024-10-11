import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VEHome from './VEHome'; // Import your components here
import Sidebar from './Sidebar';
import NoProject from './NoProject';
import VEPricing from './VEPricing';
import VESidebar from './VESidebar';
import TimelineEditor from './TimelineEditor';

const DenishaRoutes = () => {
  return (
    <Routes>
      <Route path="/den" element={<Sidebar />}>
        {/* Nested routes for Sidebar */}
        <Route path="home" element={<VEHome />} />
        <Route path="noproject" element={<NoProject />} />
        <Route path="VEPricing" element={<VEPricing />} />
        <Route path="timeline" element={<TimelineEditor />} />

        {/* Add more nested routes as needed */}
      </Route>
      <Route path="/VESidebar" element={<VESidebar />} />
      <Route path="/TimelineEditor" element={<TimelineEditor />} />
    </Routes>
  );
};

export default DenishaRoutes;