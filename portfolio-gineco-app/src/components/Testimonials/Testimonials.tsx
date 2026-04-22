import React from "react";
import styles from "./Testimonials.module.css";

const Testimonials: React.FC = () => {
  return (
    <section className={styles.testimonials}>
      <h2>O que minhas pacientes dizem</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <p>"Atendimento excelente!"</p>
          <span>★★★★★</span>
        </div>

        <div className={styles.card}>
          <p>"Muito atenciosa e profissional."</p>
          <span>★★★★★</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;