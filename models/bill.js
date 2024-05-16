
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const billschema = new mongoose.Schema({
    id:{
        type: String,
        default: uuidv4,
        required: true,
        unique: true,
       },
       uuid:{
        type: String,
        required: true,
       },
       name:{
        type: String,
        required: true,
       },
       email:{
        type: String,
        required: true,
       },
       contact:{
        type: String,
        required: true,
       },
       total:{
        type: Number,
        required: true,
       },
       productdetails:{
        type: Array,
        required: true,
       },
       paymentmethod:{
        type: String,
        required: true,
       },
       createdBy:{
        type: String,
        required: true,
       }
},{
    collection: "bill",
  }
)

const Bill = mongoose.model("Bill", billschema);
module.exports = Bill;