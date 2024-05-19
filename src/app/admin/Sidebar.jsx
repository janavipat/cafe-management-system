import React from 'react';


const Sidebar = ({ activeTab, onTabClick }) => {


  return (
    <div style={{ backgroundColor: 'white', width: '300px', padding: '20px', height:"720px", borderRadius:"15px", marginTop:"20px", marginLeft:"20px" }} className='max-auto bg-sky-30 rounded-xl shadow-lg p-4'>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Dashboard' ? 'orange' : '',borderRadius:"10px" }}
        onClick={() => onTabClick('Dashboard')}
      >
        <img src="../../assets/img/dashboard.svg" alt="Dashboard" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft:"10px" }} />
        Dashboard
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Product' ? 'orange' : '',borderRadius:"10px" }}
        onClick={() => onTabClick('Product')}
      >
        <img src="../../assets/img/product.svg" alt="Manage Product" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft:"10px" }} />
        Manage Product
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'Category' ? 'orange' : '', borderRadius:"10px" }}
        onClick={() => onTabClick('Category')}
      >
        <img src="../../assets/img/category.svg" alt="Manage Category" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft:"10px" }} />
        Manage Category
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'bill' ? 'orange' : '',borderRadius:"10px" }}
        onClick={() => onTabClick('bill')}
      >
        <img src="../../assets/img/bill.svg" alt="Manage Category" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft:"10px" }} />
        bill
      </div>
      <div
        style={{ padding: '10px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: activeTab === 'user' ? 'orange' : '',borderRadius:"10px" }}
        onClick={() => onTabClick('user')}
      >
        <img src="../../assets/img/prof.svg" alt="user" style={{ width: '20px', height: '20px', marginRight: '10px', marginLeft:"10px" }} />
        User
      </div>
    </div>
  );
}

export default Sidebar;
