import React from "react";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  return (
    <section className={styles.services}>
      <div className={styles.titulo}>
      <h2 className={styles.titulo}>Como posso te ajudar</h2>
      </div>

      <div className={styles.grid}>

        {/* CARD 1 */}
        <div className={styles.card}>
          <h3>Consulta Ginecológica</h3>
          <p>
            Avaliação completa da saúde íntima, com escuta atenta e atendimento
            individualizado.
          </p>
        </div>

        {/* CARD 2 */}
        <div className={styles.card}>
          <h3>Exames Preventivos</h3>
          <p>
            Realização de exames essenciais para prevenção e detecção precoce de
            alterações.
          </p>
        </div>

        {/* CARD 3 */}
        <div className={styles.card}>
          <h3>Planejamento Familiar</h3>
          <p>
            Orientação sobre métodos contraceptivos e planejamento seguro da
            sua saúde reprodutiva.
          </p>
        </div>

        {/* CARD 4 */}
        <div className={styles.card}>
          <h3>Climatério e Menopausa</h3>
          <p>
            Acompanhamento especializado para essa fase, com cuidado e bem-estar
            integral.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Services;