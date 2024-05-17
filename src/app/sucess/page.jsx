"use client"
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import lottie from "lottie-web";
import { useRouter } from "next/navigation"; // Fix the import statement to use 'next/router' instead of 'next/navigation'

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    Swal.fire({
      title: "Payment Done!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-success",
      },
    }).then(() => {});
  }, [router]);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./assets/animation/payment.json",
    });

    return () => {
      animation.destroy();
    };
  }, []);

  const goToAccountPage = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "0px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#333",
              textAlign: "center",
              fontSize: "40px",
              marginBottom: "10px",
              marginTop: "20px",
              marginLeft: "70px",
            }}
          >
            Payment Successfully Completed!
          </h2>
          <div
            id="lottie-animation"
            style={{
              width: "800px",
              borderRadius: "10px",
              marginTop: "-30px",
              marginLeft: "100px",
              height: "1000px",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            marginLeft: "80px",
            marginTop: "-550px",
          }}
        >
          <p
            style={{
              color: "#666",
              textAlign: "center",
              lineHeight: "1.6",
              marginBottom: "20px",
              fontSize: "24px",
            }}
          >
            Thank you for completing your secure online payment. We hope you
            enjoy your purchase. Have a great day!
          </p>
        </div>
      </div>
      <button
        style={{
          padding: "12px 30px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          transition: "background-color 0.3s",
          marginTop: "-10px",
          height: "60px",
          marginLeft: "80px",
        }}
        onClick={goToAccountPage}
      >
       HOME 
      </button>
    </div>
  );
};

export default Success;
