import React from "react";
import styles from "./CTA.module.css";

const CTA: React.FC = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <span className={styles.badge}>Consultório em Recife</span>

        <h2>Sua saúde merece prioridade</h2>

        <p>
          Atendimento em localização central com fácil acesso e estacionamento.
        </p>
      </div>

      <div className={styles.mapCard}>
        <iframe
          title="Localização consultório"
          src="https://www.google.com/maps?q=-8.067926088124556,-34.892707675940855&z=16&output=embed"
          loading="lazy"
          allowFullScreen
        />

        <div className={styles.address}>
          <strong>R. Francisco Alves, 325</strong>
          <span>Paissandu, Recife - PE</span>
        </div>
      </div>
    </section>
  );
};

export default CTA;