import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VEHome from './VEHome';
import Sidebar from './Sidebar';
import NoProject from './NoProject';
import VEPricing from './VEPricing';
import VESidebar from './VESidebar';
import TimelineEditor from './TimelineEditor';


const DenishaRoutes = () => {
  return (
    <Routes>
      <Route path="/den" element={<Sidebar />}>
        <Route index element={<VEHome />} />
        <Route path="home" element={<VEHome />} />
        <Route path="noproject" element={<NoProject />} />
        <Route path="VEPricing" element={<VEPricing />} />
        <Route path="timeline" element={<TimelineEditor />} />
      </Route>
      <Route path="/VESidebar" element={<VESidebar />} />
      <Route path="/TimelineEditor" element={<TimelineEditor />} />
    </Routes>
  );
};

export default DenishaRoutes;