import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import whatsapp from "../../assets/whatsapp.png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Denny Chalegre" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contato</a>
      </nav>

      <div className={styles.buttonAgendar}>
      <img src={whatsapp} className={styles.imgWpp} />
      <a className={styles.linksWpp} href="https://api.whatsapp.com/send?phone=5581998124105&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es.">Agendar consulta</a>
      </div>
    </header>
  );
};

export default Header;