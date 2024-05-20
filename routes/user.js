const express = require("express");
const connection = require("../connection");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Userdata = require("../models/login");
const jwt = require("jsonwebtoken");
var auth = require("../services/authenticate");
var checkRole = require("../services/checkRole");
require("dotenv").config();
const nodemailer = require("nodemailer");

router.post("/signup", async (req, res) => {
  const { name, email, password, contact, status, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await Userdata.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Userdata({
      name,
      email,
      password: hashedPassword,
      contact,
      status: "false",
      role: "user",
    });

    // Save the new user to the database
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Userdata.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.status === "false") {
      return res.status(401).json({ error: "Wait for admin approval" });
    }

    const response = { email: user.email, role: user.role };
    const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
      expiresIn: "48h",
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

var transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: "jknx wtyw crcl ppsq",
  },
});
function generateResetToken() {
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
}
async function saveResetTokenToUser(email, resetToken) {
  try {
    // Find the user by email and update their resetToken field
    const user = await Userdata.findOneAndUpdate({ email }, { resetToken });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const resetToken = generateResetToken();
    await saveResetTokenToUser(email, resetToken);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                <p><a href="${process.env.CLIENT_URL}/reset/${resetToken}">${process.env.CLIENT_URL}/reset/${resetToken}</a></p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                <p><a href="http://localhost:3000/login/reset">Click here to login</a></p>`,
    };
    // Send the email
    await transpoter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/data",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const userRole = "user";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;
      const skip = (page - 1) * limit;

      const userData = await Userdata.find({ role: userRole })
        .skip(skip)
        .limit(limit);

      const totalUsers = await Userdata.countDocuments({ role: userRole });

      res.status(200).json({
        data: userData,
        total: totalUsers,
        page: page,
        totalPages: Math.ceil(totalUsers / limit),
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/users/:userId/status",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    const id = req.params.userId;
    const { status } = req.body;
    console.log(id);

    try {
      // Check if the user with the given ID exists
      const user = await Userdata.findOne({ id: id });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user status
      user.status = status;
      await user.save();

      res
        .status(200)
        .json({ message: "User status updated successfully", user });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});
router.put("/changepassword", auth.authenticateToken, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Retrieve user from database
    const user = await Userdata.findOne({ id: req.body.id }); // Assuming you're using authentication middleware to attach user to request object
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/user/update-profile", auth.authenticateToken, (req, res) => {
  // Validate if the provided email matches the email associated with the token
  const tokenEmail = req.user.email;
  const { email, password, name, contact, status, role } = req.body;

  // Validate if the email matches the email associated with the token
  if (tokenEmail !== email) {
    return res.status(403).send("Access denied. Email mismatch.");
  }

  // Validate password here if needed

  // Update the user profile in the database
  Userdata.findOneAndUpdate(
    { email },
    { name, contact, password, status, role },
    { new: true },
    (err, user) => {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Failed to update profile.");
      } else {
        res.send("Profile updated successfully.");
      }
    }
  );
});

module.exports = router;
