"use client"
import React, {useState, useEffect} from 'react';
import CountUp from 'react-countup';
import { Circle } from "rc-progress";
import "./dashboard.css"


const Dashboard = () => {
    const [counts, setCounts] = useState({
        categoryCount: 'Loading...',
        billCount: 'Loading...',
        productCount: 'Loading...'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/counts');
            const data = await response.json();
            setCounts(data);
            console.log(counts)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  return (
    <div>
        <div className="row g-4" style={{ width: "100%" }}>
                    <div
                      className="row g-4"
                      style={{
                        width: "410px",
                        height: "180px",
                        borderRadius: "20px",
                        
                      }}
                    >
                      <div
                        className="max-auto bg-sky-30 rounded-xl shadow-lg p-4 "
                        style={{ display: "flex",marginLeft:"30px" }}
                      >
                        {/* Left side */}
                        <div
                          style={{
                            flex: "1",
                            marginRight: "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Image and "Order Completed" text */}
                          <div style={{ marginBottom: "30px" }}>
                            <img
                              src="../../assets/img/category.svg"
                              alt=""
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <div style={{ width: "168px" }}>
                            {" "}
                            <h3 className="mb-2 m-6" style={{fontSize:"25px", fontWeight:"800", width:"300px", marginLeft:"0px"}}>Total category</h3>
                          </div>

                          {/* Counter */}
                          <div style={{ animation: "scaleAnimation 1s ease-in-out" }}>
  <h1 style={{ fontSize: "30px", color: "orange", fontWeight: "900" }}>
                              <CountUp
                                start={0}
                                end={counts.categoryCount}
                                duration={1}
                              />
                            </h1>
                          </div>
                        </div>
                        {/* Right side */}
                        <div
                          style={{
                            flex: "1",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "55px",
                            marginTop: "-82px",
                          }}
                        >
                          {/* Progress bar */}
                          <div style={{ width: "100px", height: "100px" }}>
                            <Circle
                              percent={counts.categoryCount}
                              strokeWidth={10}
                              trailWidth={10}
                              strokeColor="orange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row g-4"
                      style={{
                        width: "410px",
                        height: "180px",
                        borderRadius: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      <div
                        className="max-auto bg-sky-30 rounded-xl shadow-lg p-4"
                        style={{ display: "flex",marginLeft:"20px", }}
                      >
                        {/* Left side */}
                        <div
                          style={{
                            flex: "1",
                            marginRight: "6px",
                            
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Image and "Order Completed" text */}
                          <div style={{ marginBottom: "30px" }}>
                            <img
                              src="../../assets/img/product.svg"
                              alt=""
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <div style={{ width: "188px" }}>
                            {" "}
                            <h3 className="mb-2 m-6" style={{fontSize:"25px", fontWeight:"800", width:"300px", marginLeft:"0px"}}>Total Product</h3>
                          </div>

                          {/* Counter */}
                          <div style={{ animation: "scaleAnimation 1s ease-in-out" }}>
  <h1 style={{ fontSize: "30px", color: "orange", fontWeight: "900" }}>
    <CountUp start={0} end={counts.productCount} duration={1} />
  </h1>
</div>
                        </div>
                        {/* Right side */}
                        <div
                          style={{
                            flex: "1",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "55px",
                            marginTop: "-82px",
                          }}
                        >
                          {/* Progress bar */}
                          <div style={{ width: "100px", height: "100px" }}>
                            <Circle
                              percent={counts.productCount}
                              strokeWidth={10}
                              trailWidth={10}
                              strokeColor="orange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row g-4"
                      style={{
                        width: "410px",
                        
                        marginLeft: "833px",
                        marginTop: "-180px",
                        borderRadius: "20px",
                      }}
                    >
                      <div
                        className="max-auto bg-sky-30 rounded-xl shadow-lg p-4"
                        style={{ display: "flex" }}
                      >
                        {/* Left side */}
                        <div
                          style={{
                            flex: "1",
                            marginRight: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                           
                          }}
                        >
                          {/* Image and "Order Completed" text */}
                          <div style={{ marginBottom: "30px" }}>
                            <img
                              src="../../assets/img/dashboard.svg"
                              alt=""
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <div style={{ width: "168px" }}>
                            {" "}
                            <h3 className="mb-2 m-6" style={{fontSize:"25px", fontWeight:"800", width:"300px", marginLeft:"0px"}}>Total bill</h3>
                          </div>

                          {/* Counter */}
                          <div style={{ animation: "scaleAnimation 1s ease-in-out" }}>
  <h1 style={{ fontSize: "30px", color: "orange", fontWeight: "900" }}>
                              <CountUp
                                start={0}
                                end={counts.billCount}
                                duration={1}
                              />
                            </h1>
                          </div>
                        </div>
                        {/* Right side */}
                        <div
                          style={{
                            flex: "1",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "55px",
                            marginTop: "-82px",
                          }}
                        >
                          {/* Progress bar */}
                          <div style={{ width: "100px", height: "100px" }}>
                            <Circle
                              percent={counts.billCount}
                              strokeWidth={10}
                              trailWidth={10}
                              strokeColor="orange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  )
}

export default Dashboard