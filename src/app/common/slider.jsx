import React, { useMemo } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProduct } from "../../context/Mycontext"; // Import your context hook
import { useRouter } from "next/navigation";
import "./CreativeService.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function CreativeService() {
  const { setSelectedProduct } = useProduct(); // Destructure the context hook to set product value
  const router = useRouter();

  const images = [
    { src: "../../assets/img/Americano.jpg", name: "Americano" },
    { src: "../../assets/img/Cappuccino.jpg", name: "Cappuccino" },
    { src: "../../assets/img/Espresso.jpg", name: "Espresso" },
    { src: "../../assets/img/Caffè mocha.jpg", name: "Caffè mocha" },
    { src: "../../assets/img/Cortado.jpg", name: "Cortado" },
    { src: "../../assets/img/Café au lait.jpg", name: "Café au lait" },
    { src: "../../assets/img/cafe.png", name: "coffee" },
    // Add more images as needed
  ];

  const slider = useMemo(() => {
    return {
      slidesPerView: 6,
      spaceBetween: 25,
      autoplay: { delay: 300 }, // Autoplay configuration
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-c",
        prevEl: ".swiper-button-prev-c",
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 5,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 6,
        },
      },
    };
  }, [Autoplay]);

  const handleImageClick = (productName) => {
    setSelectedProduct(productName); // Set the selected product using context
    router.push("/order");
  };

  return (
    <section id="category" className="creative-services sec-p-top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="sec-title layout-1 wow animate fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <div className="title-left">
                <span
                  style={{
                    fontSize: "25px",
                    color: "orange",
                    fontWeight: "700",
                  }}
                >
                  Category
                </span>
                <h2
                  style={{
                    fontSize: "25px",
                    color: "black",
                    fontWeight: "700",
                  }}
                >
                  See All Creative Services
                </h2>
                <br />
                <br />
              </div>
              <div className="title-right"></div>
            </div>
          </div>
        </div>
        <Swiper
          {...slider}
          className="swiper creative-service-slider"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="swiper-wrapper">
            {images.map((item, index) => {
              return (
                <SwiperSlide key={index} className="swiper-slide">
                  <div
                    className="creative-service wow animate fadeInDown"
                    data-wow-delay="200ms"
                    data-wow-duration="1500ms"
                    onClick={() => handleImageClick(item.name)} // Call handleImageClick on image click
                  >
                    <div className="thumb">
                      <img
                        src={item.src}
                        alt=""
                        style={{ width: "200px", height: "200px" }}
                      />
                    </div>
                    <div className="cre-service-inner">
                      <strong>{item.name}</strong>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default CreativeService;
