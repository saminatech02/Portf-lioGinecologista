import React from "react";
import styles from "./About.module.css";
import dennyGinecologista from "../../assets/denny-ginecologista.jpg";

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <img src={dennyGinecologista} alt="Sobre a médica" />

      <div>
        <h2>Sobre o Dr. Denny Chalegre</h2>
        <p>
        Denny Chalegre é Ginecologista, Obstetra e Uroginecologista pelo IMIP. Médico formado pela UFPE, atua com foco na saúde da mulher, 
         oferecendo um atendimento humanizado, baseado em escuta, confiança e cuidado individualizado.
        </p>
        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            Especialista em Ginecologia e Obstetrícia (IMIP)
          </div>

          <div className={styles.highlightCard}>
            Fellowship em Uroginecologia (IMIP)
          </div>

          <div className={styles.highlightCard}>
            Graduado pela UFPE
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;