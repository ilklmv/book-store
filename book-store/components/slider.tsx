import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper";
import "../components/slider.module.css";
import { Pagination, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <div className="banner">
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/banner_1.jpg"
              alt="Banner 1"
              width={1200}
              height={500}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/banner_2.jpg"
              alt="Banner 2"
              width={1200}
              height={500}
            />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/banner_3.jpg"
              alt="Banner 3"
              width={1200}
              height={500}
            />
          </SwiperSlide>
        </div>
      </Swiper>
    </>
  );
}
