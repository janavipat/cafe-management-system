"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
import "./profile.css"; // Import CSS file for styling
import Footer from "../common/Footer";
import Header from "../common/header";

function UserProfile() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    // Check if token exists in localStorage or wherever it is stored
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/user/checkToken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { role } = res.data.message;
          if (role===false) {
            Swal.fire({
              icon: "error",
              title: "Unauthorized Access",
              text: "You are not authorized to access this page.",
            });
          }
        })
    }
  }, []);

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
   <>
   <Header />
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    
                    <h6 className="f-w-600">{name}</h6>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600 m-t-25">Information</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <TextField
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phone</p>
                        <TextField
                          type="text"
                          placeholder="Contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">secure</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Name</p>
                        <TextField
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Password</p>
                        <TextField
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <ul className="">
                      <li style={{marginRight:"-20px", height:"55px" , marginTop:"109px", width:"300px", marginLeft:"139px"}}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "orange" }}
                          onClick={updateProfile}
                          fullWidth
                        >
                          Update Profile
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
   </>
  );
}

export default UserProfile;
