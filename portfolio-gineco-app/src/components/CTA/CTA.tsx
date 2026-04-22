import React from "react";
import styles from "./CTA.module.css";

const CTA: React.FC = () => {
  return (
    <section className={styles.cta}>
      <h2>Sua saúde merece prioridade</h2>
      <button>Agendar no WhatsApp</button>
    </section>
  );
};

export default CTA;