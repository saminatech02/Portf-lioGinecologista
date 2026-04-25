import React from "react";
import styles from "./Testimonials.module.css";

const Testimonials: React.FC = () => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.testTitle}>
        <h2>O que minhas pacientes dizem</h2>
      </div>

      <div className={styles.grid}>

        {/* DEPOIMENTO 1 */}
        <div className={styles.card}>
          <p>"Excelente profissional um dos anjos que Deus enviou para transformar minha vida
            eternamente grata pelo dom que Deus lhe deu."</p>

          <span>★★★★★</span>
          <strong className={styles.name}>— Vanessa Santos</strong>
        </div>

        {/* DEPOIMENTO 2 */}
        <div className={styles.card}>
          <p>"Excelente profissional, 1º Deus e 2° o senhor, que fez minha avaliação e
            minha cirurgia foi um sucesso. Serei eternamente grata."</p>

          <span>★★★★★</span>
          <strong className={styles.name}>— Catia Silva</strong>
        </div>

        <div className={styles.card}>
          <p>"Um médico maravilhoso, atencioso, profissional e humano. 
            A minha experiência foi surreal, sou grata a Deus pela vida desse ser de Luz."</p>

          <span>★★★★★</span>
          <strong className={styles.name}>— Everly Gabrielle</strong>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;