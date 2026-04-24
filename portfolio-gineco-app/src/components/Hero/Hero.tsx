import React from "react";
import styles from "./Hero.module.css";
import denny from "../../assets/imagem-denny.png";

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
          <button className={styles.secondary}>Ver serviços</button>
        </div>
      </div>

      <img src={denny} alt="Médico Denny Chalegre" />
    </section>
  );
};

export default Hero;