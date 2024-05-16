import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const navigate = useRouter(); // Use useNavigate instead of useHistory
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Redirect to the respective pages
    switch (tabName) {
      case 'Dashboard':
        navigate.push('/admin/dashboard'); // Use navigate function to redirect
        break;
      case 'Manage Product':
        navigate.push('/admin/product');
        break;
      case 'Manage Category':
        navigate.push('/admin/category');
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', width: '200px', padding: '20px' }}>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Dashboard' ? 'orange' : '' }}
        onClick={() => handleTabClick('Dashboard')}
      >
        <img src="dashboard-icon.png" alt="Dashboard" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Dashboard
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Manage Product' ? 'orange' : '' }}
        onClick={() => handleTabClick('Manage Product')}
      >
        <img src="product-icon.png" alt="Manage Product" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Manage Product
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Manage Category' ? 'orange' : '' }}
        onClick={() => handleTabClick('Manage Category')}
      >
        <img src="category-icon.png" alt="Manage Category" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        Manage Category
      </div>
    </div>
  );
}

export default Sidebar;
