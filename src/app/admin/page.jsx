"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Product from "./Product";
import Category from "./Category";
import User from "./User";
import Bill from "./Bill";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(storedToken);
    const storedRole = decodedToken.role;
    if (storedToken && storedRole === "admin") {
      setToken(storedToken);
      setRole(storedRole);
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have access to this page.",
      });
    }
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (!token || role !== "admin") {
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
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "Product" && <Product />}
        {activeTab === "Category" && <Category />}
        {activeTab === "bill" && <Bill />}
        {activeTab === "user" && <User />}
      </div>
    </div>
  );
};

export default AdminPage;
