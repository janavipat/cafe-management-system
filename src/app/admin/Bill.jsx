import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const IndexPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "", category: "", quantity: 0, price: 0 },
  ]);
  const [total, setTotal] = useState(0);
  const [bills, setBills] = useState([]);
  const [token, setToken] = useState("");
  const containerStyle = {
    marginTop: "60px",
    Width: "900px",
    marginLeft: "100px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "orange",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  const addProductButtonStyle = {
    ...buttonStyle,
    backgroundColor: "orange",
    marginTop: "20px",
    marginLeft: "335px",
    marginBottom: "20px",
  };

  const listItemStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    // Fetch token from local storage or wherever it's stored
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: "",
        category: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };
  const updateProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);

    calculateTotal(updatedProducts);
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setTotal(totalPrice);
  };

  const generateBill = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/bill/generateReport",
        {
          name,
          email,
          contact,
          paymentmethod: paymentMethod,
          productdetails: JSON.stringify(products),
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newBillId = response.data;
      setBills([...bills, newBillId]);
    } catch (error) {
      console.error("Error generating bill:", error);
    }
    setName("");
    setEmail("");
    setContact("");
    setPaymentMethod("");
    setProducts([{ id: 1, name: "", category: "", quantity: 0, price: 0 }]);
    setTotal(0);
  };
  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bill/getbills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const downloadBill = async (uuid, billData, products) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/bill/getpdf",
        { uuid, billData, productdetails: JSON.stringify(products) },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Process the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${uuid}.pdf`); // Set the download attribute for specifying the file name
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading bill:", error);
    }
  };
  const deleteBill = async (billId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/bill/delete/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };
  return (
    <div
      style={{
        width: "900px",
        marginTop: "100px",
        marginLeft: "100px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        padding: "50px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            style={{ ...inputStyle, marginRight: "10px", flex: "1" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            style={{ ...inputStyle, flex: "1" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            style={{ ...inputStyle, marginRight: "10px", flex: "1" }}
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
          />
          <input
            style={{ ...inputStyle, flex: "1" }}
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Payment Method"
          />
        </div>

        <div>
          <h3>Product Details</h3>
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                ...listItemStyle,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: "1", marginRight: "10px" }}>
                <input
                  style={inputStyle}
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(index, "name", e.target.value)}
                  placeholder="Product Name"
                />
              </div>
              <div style={{ flex: "1", marginLeft: "10px" }}>
                <input
                  style={inputStyle}
                  type="text"
                  value={product.category}
                  onChange={(e) =>
                    updateProduct(index, "category", e.target.value)
                  }
                  placeholder="Category"
                />
              </div>
              <div style={{ flex: "1", marginLeft: "10px" }}>
                <input
                  style={inputStyle}
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    updateProduct(index, "quantity", parseInt(e.target.value))
                  }
                  placeholder="Quantity"
                />
              </div>
              <div style={{ flex: "1", marginLeft: "10px" }}>
                <input
                  style={inputStyle}
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    updateProduct(index, "price", parseFloat(e.target.value))
                  }
                  placeholder="Price"
                />
              </div>
            </div>
          ))}
          <button style={addProductButtonStyle} onClick={addProduct}>
            Add Product
          </button>
        </div>

        <input
          style={inputStyle}
          type="text"
          value={total}
          placeholder="Total"
          readOnly
        />

        <button style={buttonStyle} onClick={generateBill}>
          Generate Bill
        </button>
      </div>
      <div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {bills.map((bill) => (
            <li
              key={bill.uuid}
              style={{
                ...listItemStyle,
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{bill.name}</span>
                <span style={{ marginLeft: "220px" }}>{bill.email}</span>
                <span style={{ marginLeft: "100px" }}>{bill.contact}</span>
              </div>
              <div>
                <button
                  style={{ ...buttonStyle, backgroundColor: "#007bff" }}
                  onClick={() =>
                    downloadBill(bill.uuid, bill, bill.productdetails)
                  }
                >
                  <CloudDownloadIcon />
                </button>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#dc3545",
                    marginLeft: "30px",
                  }}
                  onClick={() => deleteBill(bill._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          style={{ ...buttonStyle, display: "block", margin: "0 auto" }}
          onClick={fetchBills}
        >
          Refresh Bills
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
