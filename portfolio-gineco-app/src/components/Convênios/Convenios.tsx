import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";

import styles from "./Convenios.module.css";

const planos = [
    "Bradesco Saúde",
    "Amil",
    "Fox Saúde",
    "GEAP Saúde",
    "Hospital Naval do Recife",
    "Hospital do Exército",
    "Life Empresarial",
    "Mediservice",
    "Nova Saúde",
    "Omint",
    "Postal Saúde",
    "Proasa",
    "Plan Assiste MPU",
    "SerPRO",
    "SB Saúde",
    "TRT6 Saúde",
    "AMEPE/CAMPE",
    "Assefaz",
    "Allianz Saúde",
    "Banco Central",
    "CapeSaúde",
    "Conab",
    "Saúde Caixa",
    "Saúde Petrobras",
    "Select",
    "Care Plus"
];

export default function Convenios() {
    const swiperRef = useRef<any>(null);

    const goPrev = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    }, []);

    const goNext = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    }, []);

    return (
        <section className={styles.convenios}>

            <h2>+ de 30 convênios atendidos</h2>

            <p>
                Atendimento por planos e consultas particulares
            </p>

            <div className={styles.sliderWrapper}>

                <button
                    className={styles.prev}
                    onClick={goPrev}
                >
                    ‹
                </button>

                <Swiper
                    ref={swiperRef}
                    modules={[Autoplay]}
                    loop={true}
                    centeredSlides={false}
                    watchSlidesProgress={true}
                    spaceBetween={24}
                    className={styles.slider}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 3
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >

                    {planos.map((plano) => (
                        <SwiperSlide key={plano}>
                            <div className={styles.card}>
                                <div className={styles.icon}>✓</div>
                                {plano}
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

                <button
                    className={styles.next}
                    onClick={goNext}
                >
                    ›
                </button>

            </div>

            <div className={styles.infoBox}>
                <h3>Não encontrou seu convênio?</h3>
                <p>Entre em contato conosco para verificar se atendemos seu plano.</p>
            </div>

        </section>
    )
}