import React from "react";
import styles from "./Hero.module.css";

import dennyDesktop from "../../assets/imagem-denny.png";
import dennyMobile from "../../assets/imagem-denny-mobile.png";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.decor1}></div>
      <div className={styles.decor2}></div>

      <div className={styles.text}>
        <h1>Cuidado que acolhe, prevenção que transforma</h1>

        <p>
          Atendimento ginecológico humanizado em todas as fases da vida da mulher.
        </p>

        <div className={styles.buttons}>
          <a href="#agendamentos">Agendar consulta</a>
          <a className={styles.secondary} href="#contato">
            Ver localização
          </a>
        </div>
      </div>

      <picture>
        <div className={styles.imageWrap}>
        </div>
        <source
          media="(max-width: 767px)"
          srcSet={dennyMobile}
        />

        <img
          src={dennyDesktop}
          alt="Médico Denny Chalegre"
        />
      </picture>

    </section>
  );
};

export default Hero;