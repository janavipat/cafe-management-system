import { useScrollTrigger } from '@mui/material';
import React, { useState } from 'react';

const page = () => {

    const [ oldpassword , setOldPassword] = useState("");
    const[ newpassword, setNewpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
   <>
   
   <div className="container">

  <input type='text' placeholder='enter old password' onChange={(event)=>setOldPassword(event.target.value)} />
  <input type='text' placeholder='enter new password' onChange={(event)=>setNewpassword(event.target.value)} />

  <input type='text' placeholder='confirm password' onChange={(event)=>setConfirmPassword(event.target.value)} />

  
  
   </div>
   
   
   </>
  )
}

export default page