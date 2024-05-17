"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Product from './Product';
import Category from './Category';
import Bill from './Bill';
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
      <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />
      </div>

      {/* Content */}
      <div className="content">
        {/* Render content based on activeTab */}
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Product' && <Product />}
        {activeTab === 'Category' && <Category />}
        {activeTab === 'bill' && <Bill />}
      </div>
    </div>
  );
};

export default AdminPage;
