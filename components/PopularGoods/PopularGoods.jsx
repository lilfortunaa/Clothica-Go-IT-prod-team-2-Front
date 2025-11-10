

"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./PopularGoods.module.css";
import Link from "next/link";
import Image from "next/image";

export default function PopularGoods({ goods }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (paginationRef.current) {
      paginationRef.current.classList.remove(
        "swiper-pagination-vertical",
        "swiper-pagination-progressbar",
        "swiper-pagination-progressbar-opposite"
      );
    }
  }, []);

  const handleSwiperInit = (swiper) => {
    setTimeout(() => {
      if (prevRef.current && nextRef.current && paginationRef.current) {
       
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.params.pagination.el = paginationRef.current;

        swiper.navigation.init();
        swiper.navigation.update();

        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();

        const updatePaginationPosition = () => {
        if (window.innerWidth < 768) {
          paginationRef.current.style.display = "flex"
          paginationRef.current.style.justifyContent = "flex-start";
          paginationRef.current.style.left = "20px";
          paginationRef.current.style.transform = "none";
        } else {
          paginationRef.current.style.justifyContent = "center";
          paginationRef.current.style.left = "50%";
          paginationRef.current.style.transform = "translateX(-50%)";
        }
      };

      updatePaginationPosition();
      window.addEventListener("resize", updatePaginationPosition);
    }
    }, 0);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.categoryLabel}>Популярні товари</span>
        <Link href="/goods" className={styles.viewAll}>
          Всі товари
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          375: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          type: "bullets",
        }}
        onSwiper={handleSwiperInit}
        className={styles.slider}
      >
        {goods.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.imageBox}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>

                <div className={styles.row}>
                  <div className={styles.leftMeta}>
                    <span className={styles.metaItem}>
                      <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-icon-star-fill" />
                      </svg>
                      {item.rating}
                    </span>
                    <span className={styles.metaItem}>
                      <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-comment-section" />
                      </svg>
                      {item.reviews}
                    </span>
                  </div>

                  <span className={styles.price}>{item.price} грн</span>
                </div>

                <Link
                  href={`/goods/${item.id}`}
                  className={styles.moreBtn}
                >
                  Детальніше
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className={styles.paginationWrapper}>
        <div ref={paginationRef} className="swiper-pagination"></div>
      </div>

      
      <div className={styles.navButtons}>
        <button
          ref={prevRef}
          className={styles.navPrev}
          aria-label="Назад"
        >
          <svg className={styles.iconArrow}>
            <use href="/sprite.svg#icon-arrow-back" />
          </svg>
        </button>

        <button
          ref={nextRef}
          className={styles.navNext}
          aria-label="Вперед"
        >
          <svg className={styles.iconArrow}>
            <use href="/sprite.svg#icon-arrow-forward" />
          </svg>
        </button>
      </div>
    </section>
  );
}

