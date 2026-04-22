import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Dr. Denny Chalegre</p>
      <p>Contato: (81) 99999-9999</p>
    </footer>
  );
};

export default Footer;