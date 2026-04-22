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
          <p>"Atendimento excelente! Me senti muito acolhida e bem cuidada."</p>
          
          <span>★★★★★</span>
          <strong className={styles.name}>— Maria S.</strong>
        </div>

        {/* DEPOIMENTO 2 */}
        <div className={styles.card}>
          <p>"Muito atencioso e profissional. Explica tudo com calma e segurança."</p>

          <span>★★★★★</span>
          <strong className={styles.name}>— Ana Paula R.</strong>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;