import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import whatsapp from "../../assets/whatsapp.png";

const Header: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Denny Chalegre" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <a href="#inicio" onClick={(e) => handleNavClick(e, "inicio")}>Início</a>
        <a href="#sobre" onClick={(e) => handleNavClick(e, "sobre")}>Sobre</a>
        <a href="#servicos" onClick={(e) => handleNavClick(e, "servicos")}>Serviços</a>
        <a href="#contato" onClick={(e) => handleNavClick(e, "contato")}>Contato</a>
      </nav>

      <div className={styles.buttonAgendar}>
        <img src={whatsapp} className={styles.imgWpp} />
        <a className={styles.linksWpp} href="https://api.whatsapp.com/send?phone=5581998124105&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es."  target="_blank" rel="noopener noreferrer">Agendar consulta</a>
    </div>
    </header >
  );
};

export default Header;