import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

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

      <a className={styles.buttonAgendar} href="https://api.whatsapp.com/send?phone=5581998124105&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es.">Agendar consulta</a>
    </header>
  );
};

export default Header;