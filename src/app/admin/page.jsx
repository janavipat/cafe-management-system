"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div className="flex-1">
      <Sidebar/>
    </div>
    </div>
  );
};

export default AdminPage;
