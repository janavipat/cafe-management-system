const express = require("express");
const connection = require("../connection");
const router = express.Router();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let fs = require("fs");
var uuid = require("uuid");
var auth = require("../services/authenticate");
const Bill = require("../models/bill");
const checkRole = require("../services/checkRole");
const PDFParser = require('pdf-parse');

router.post("/generateReport", auth.authenticateToken, checkRole.checkRole, async (req, res) => {
  const generateuid = uuid.v1();
  const orderdetails = req.body;
  
  const productdetailsReport = JSON.parse(orderdetails.productdetails);

  try {
    const bill = await Bill.create({
      name: orderdetails.name,
      uuid: generateuid,
      email: orderdetails.email,
      contact: orderdetails.contact,
      paymentmethod: orderdetails.paymentmethod,
      total: orderdetails.total,
      productdetails: orderdetails.productDetails,
      createdBy: "admin@gmail.com",
    });
   
    await bill.save();
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        name: orderdetails.name,
        email: orderdetails.email,
        contact: orderdetails.contact,
        paymentmethod: orderdetails.paymentmethod,
        productdetails: productdetailsReport,
        total: orderdetails.total,
      },
      (err, html) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const options = { format: "A4" };
        pdf
          .create(html, options)
          .toFile(
            path.join(__dirname, "", "../ganerated_pdf/" + generateuid + ".pdf"),
            (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              return res.status(200).json(generateuid);
            }
          );
      }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


const generatePDF = async (generateuid, orderdetails,productdetails) => {
 

  console.log(productdetails);
  return new Promise((resolve, reject) => {
      ejs.renderFile(path.join(__dirname, '', 'report.ejs'), {
          name: orderdetails.name,
          email: orderdetails.email,
          contact: orderdetails.contact,
          paymentmethod: orderdetails.paymentmethod,
          productdetails: orderdetails.productdetails,
          total: orderdetails.total,
      }, (err, html) => {
          if (err) {
              reject(err);
          }
          const options = { format: 'A4' };
          pdf.create(html, options).toFile(path.join(__dirname, '', '../generated_pdf/' + generateuid + '.pdf'), (err, result) => {
              if (err) {
                  reject(err);
              }
              resolve();
          });
      });
  });
};

router.post('/getpdf', async (req, res) => {
  console.log(req.body.billData.productdetails);


  const filePath = path.join(__dirname, '', '../generated_pdf/' + req.body.uuid + '.pdf');

  fs.access(filePath, fs.constants.F_OK, async (err) => {
      if (err) {
          try {
              // Generate a new PDF
               new Promise((resolve, reject) => {
                ejs.renderFile(path.join(__dirname, '', 'report.ejs'), {
                    name: req.body.billData.name,
                    email: req.body.billData.email,
                    contact: req.body.billData.contact,
                    paymentmethod: req.body.billData.paymentmethod,
                    productdetails: req.body.billData.productdetails,
                    total: req.body.billData.total,
                }, (err, html) => {
                    if (err) {
                        reject(err);
                    }
                    const options = { format: 'A4' };
                    pdf.create(html, options).toFile(path.join(__dirname, '', '../generated_pdf/' + req.body.uuid + '.pdf'), (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
                });
            });
              
              // Send the generated PDF file
              res.sendFile(filePath);
          } catch (err) {
              console.error('Error generating PDF:', err);
              res.status(500).json({ error: 'Failed to generate PDF' });
          }
      } else {
          // Send the existing PDF file
          res.sendFile(filePath);
      }
  });
});



router.get("/getbills", auth.authenticateToken, async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const billId = req.params.id;
    
    try {
      const deletedBill = await Bill.findByIdAndDelete(billId);
      
      if (!deletedBill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
      
      return res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
