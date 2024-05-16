require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
   
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Access token is required" });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    console.log(user);


    req.local = {
      ...user
    };
    next();
  });
}

module.exports = { authenticateToken: authenticateToken };
