import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = ({ activeTab, onTabClick }) => {
  const navigate = useRouter(); // Use useNavigate instead of useHistory
  ;

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//     // Redirect to the respective pages
//     switch (tabName) {
//       case 'Dashboard':
//         navigate.push('/admin/dashboard'); // Use navigate function to redirect
//         break;
//       case 'Manage Product':
//         navigate.push('/admin/product');
//         break;
//       case 'Manage Category':
//         navigate.push('/admin/category');
//         break;
//       default:
//         break;
//     }
//   };

  return (
    <div style={{ backgroundColor: '#f0f0f0', width: '300px', padding: '20px', height:"700px" }}>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Dashboard' ? 'orange' : '' }}
        onClick={() => onTabClick('Dashboard')}
      >
        <img src="../../assets/img/dashboard.svg" alt="Dashboard" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Dashboard
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Product' ? 'orange' : '' }}
        onClick={() => onTabClick('Product')}
      >
        <img src="../../assets/img/product.svg" alt="Manage Product" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Manage Product
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Category' ? 'orange' : '' }}
        onClick={() => onTabClick('Category')}
      >
        <img src="../../assets/img/category.svg" alt="Manage Category" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Manage Category
      </div>
    </div>
  );
}

export default Sidebar;
