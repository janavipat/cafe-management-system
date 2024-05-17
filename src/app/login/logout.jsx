import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    
    window.location.href = '/login'; 
  }, []);

  return (
    <div>
      <p>Logging out...</p>
     
    </div>
  );
};

export default LogoutPage;
