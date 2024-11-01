import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VEHome from './VEHome';
import Sidebar from './Sidebar';
import NoProject from './NoProject';
import VEPricing from './VEPricing';
import VESidebar from './VESidebar';
import TimelineEditor from './TimelineEditor';
import PSidebar from './Profile/PSidebar';
import PHome from './Profile/PHome';
import ChangePass from './Profile/ChangePass';
import MyProject from './Profile/MyProject';
import Logout from './Profile/Logout';
import Empty from './Profile/Empty';


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
      {/* <Route path="/PSidebar" element={<PSidebar />} > */}
      <Route path="/PSidebar/*" element={<PSidebar />}>
        <Route path="empty" element={<Empty />} />
        <Route path="Phome" element={<PHome />} />
      
        <Route path="MyProject" element={<MyProject />} />
        <Route path="ChangePass" element={<ChangePass />} />
        <Route path="Logout" element={<Logout/>} />
      </Route>
    </Routes>
  );
};

export default DenishaRoutes;