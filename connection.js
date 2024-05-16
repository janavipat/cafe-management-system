const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://janavipatel2002:janavi@cluster0.fkm5awq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection ;