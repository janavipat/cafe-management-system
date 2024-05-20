"use client";
import React from "react";
import Image from "next/image";
import Header from "../common/Header";
import { Fade } from "react-awesome-reveal";
import Footer from "../common/Footer";

const cardData = [
  {
    imgSrc: "../../assets/img/history.svg",
    heading: "Our History",
    subheading:
      "Coffee with us was founded by Janavi patel with a passion for bringing people together over a cup of coffee. From our humble beginnings as a small coffee cart to becoming a beloved community hub, our commitment to quality and hospitality remains unchanged.",
  },
  {
    imgSrc: "../../assets/img/setting.svg",
    heading: "Our Specialties",
    subheading:
      "Indulge in our specialty coffee drinks, delicious pastries, and savory snacks. Try our signature espresso blend or explore our seasonal offerings curated by our expert baristas.",
  },
  {
    imgSrc: "../../assets/img/food1.jpg",
    heading: "Our Services",
    subheading:
      "Table service Takeout and delivery Private events and catering Barista workshops and tastings",
  },
];

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl py-40 px-6" id="about-section">
        <div className="container">
          <section className="about-section">
            <div className="about-content">
              <h1 style={{ color: "orange" }}>About Us</h1>
              <p>
                Welcome to <span>Coffee with us</span>, your cozy sanctuary in
                the heart of the city.
              </p>
              <p>
                Since <span>2024</span>, we've been dedicated to serving the
                finest quality coffee, handcrafted with love and expertise.
              </p>
              <p>
                At <span>Coffee with us</span>, every cup tells a story. From
                the rich aroma of our signature blends to the comforting warmth
                of our cozy ambiance, we strive to create memorable experiences
                for our customers.
              </p>
              <p>
                Whether you're a coffee aficionado, a tea enthusiast, or simply
                seeking a place to unwind, we invite you to join us on a journey
                of flavor and discovery.
              </p>
            </div>
            <div className="about-image">
              <Image
                src="/assets/img/about.png"
                alt="Cafe Image"
                width={600}
                height={400}
              />
            </div>
          </section>
          <div className="text-center mb-14">
            <Fade
              direction="up"
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p
                className="text-3xl lg:text-5xl font-semibold text-lightgrey"
                style={{ color: "orange", marginTop: "-100px" }}
              >
                Welcome to Coffee with us, your cozy sanctuary in the heart of
                the city.
              </p>
            </Fade>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-20"
            style={{ marginTop: "200px", gap: "150px", width: "1500px" }}
          >
            <Fade
              direction="up"
              delay={1000}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              {cardData.map((item, index) => (
                <div
                  className="card-b p-8 relative rounded-3xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                  key={index}
                  style={{ height: "300px", width: "300px" }}
                >
                  <div
                    style={{
                      marginTop: "60px",
                      marginLeft: "99px",
                    }}
                    className="work-img-bg rounded-full flex justify-center absolute top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%]"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.imgSrc}
                      width={100}
                      height={100}
                    />
                  </div>
                  <h3 className="text-2xl text-black font-semibold text-center mt-16">
                    {item.heading}
                  </h3>
                  <p className="text-lg font-normal text-black text-center text-opacity-50 mt-2">
                    {item.subheading}
                  </p>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .about-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
        }
        .about-content {
          flex: 1;
          margin-right: 50px;
          margin-top: -200px;
        }
        .about-image {
          flex: 1;
          text-align: center;
          margin-top: -200px;
        }
        .about-image img {
          border-radius: 8px;
        }
        .about-content h1 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #333;
          font-weight: 700;
        }
        .about-content p {
          margin-bottom: 15px;
          color: #666;
          line-height: 1.6;
          font-size: 18px;
          font-weight: 300;
        }
        .about-content p span {
          font-weight: bold;
          color: #222;
        }
        .work-section {
          text-align: center;
        }
        .work-section .text-center {
          margin-bottom: 20px;
        }
        .work-section h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }
        .work-section .grid {
          display: grid;
          gap: 20px;
          justify-content: center;
        }
        .card-b {
          position: relative;
          padding: 20px;
          border-radius: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        .card-b:hover {
          transform: translateY(-10px);
        }
        .work-img-bg {
          width: 100px;
          height: 100px;
          background-color: #ccc;
          border-radius: 50%;
          overflow: hidden;
        }

        .card-b h3 {
          margin-top: 16px;
          font-size: 20px;
          color: #333;
        }
        .card-b p {
          margin-top: 10px;
          font-size: 16px;
          color: #666;
        }
        .card-b a {
          display: inline-block;
          margin-top: 10px;
          font-size: 16px;
          color: #f1356d;
          text-decoration: none;
          transition: color 0.3s;
        }
        .card-b a:hover {
          color: #333;
        }
      `}</style>

      <Footer />
    </>
  );
};

export default AboutUsPage;
