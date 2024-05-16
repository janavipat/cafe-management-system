const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const users = new mongoose.Schema(
  {
   id:{
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
   },
   name:{
    type: String,
    required: true,
   },
   contact:{
    type: String,
    required: true,
   },
   email:{
    type: String,
    required: true,
    unique: true,
   },
   password:{
    type: String,
    required: true,
   },
   status:{
    type: String,
    required: true,
   },
   role:{
    type: String,
    required: true,
   }
  },
  {
    collection: "cafe/login",
  }
);

const mydb = mongoose.connection.useDb('cafe');
const Userdata = mydb.model("user", users);

module.exports = Userdata;
