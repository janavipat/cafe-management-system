"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Product from './Product';
import Category from './Category';
import Bill from './Bill';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode'


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Simulate token check on component mount
  useEffect(() => {
    // Check if token exists in localStorage or wherever it's stored
    const storedToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(storedToken);
    const storedRole = decodedToken.role;
    if (storedToken && storedRole === 'admin') {
      setToken(storedToken);
      setRole(storedRole);
    } else {
      // Show error message if token or role is invalid
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have access to this page.',
      });
    }
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (!token || role !== 'admin') {
   
    return null;
  }

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
