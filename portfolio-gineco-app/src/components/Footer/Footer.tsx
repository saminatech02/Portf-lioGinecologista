import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* IDENTIDADE */}
        <div className={styles.block}>
          <h4 className={styles.title}>Dr. Denny Chalegre</h4>
          <p>Ginecologia, Obstetrícia e Uroginecologia</p>
        </div>

        {/* REGISTROS */}
        <div className={styles.block}>
          <p>CRM: 32341-PE</p>
          <p>RQE: 17451</p>
        </div>

        {/* CONTATO */}
        <div className={styles.block}>
          <p> (81) 99812-4105</p>
          <p>drdennychalegre@gmail.com</p>
          <a
            href="https://instagram.com/drdennychalegre"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            @drdennychalegre
          </a>
        </div>

        {/* ENDEREÇO */}
        <div className={styles.block}>
          <p> Rua Francisco Alves, 325, Paissandu - Recife - PE (Clínica Acolher Saúde - salas 504 - 506)</p>
          <p>Atendimento com hora marcada</p>
        </div>

      </div>

      <p className={styles.copy}>
        © 2026 Dr. Denny Chalegre — Todos os direitos reservados
      </p>

    </footer>
  );
};

export default Footer;