"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./profile.css"; // Import CSS file for styling

function UserProfile() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateProfile = () => {
    // Validation for contact number
    if (!/^\d{10}$/.test(contact)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Contact number must be a 10-digit number.",
      });
      return;
    }

    // Validation for password
    if (password.length < 8 || password.length > 15) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be between 8 and 15 characters long.",
      });
      return;
    }

    // Validation for name
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name must contain only alphabets and spaces.",
      });
      return;
    }

    // Validation for email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Make API call to update profile
    axios
      .post("http://localhost:5000/user/update-profile", {
        name,
        contact,
        email,
        password,
      })
      .then((res) => {
        Swal.fire({
          title: "Profile Updated",
          text: "Your profile has been successfully updated.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to update profile.",
          icon: "error",
        });
      });
  };

  return (
    <div className="user-form">
      <h2>Update Profile</h2>
      <form>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
       
        <button type="button" onClick={updateProfile}>Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;
