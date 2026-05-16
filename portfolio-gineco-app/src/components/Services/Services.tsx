import React, { useState } from "react";
import styles from "./Services.module.css";
import heroImg from "../../assets/hero.png";
import logoImg from "../../assets/logo.png";

const servicesData = [
  {
    images: [heroImg, logoImg],
    title: "Consulta Ginecológica",
    description: "Avaliação completa da sua saúde geral e íntima, com escuta atenta, acolhimento e um plano de cuidado individualizado em todas as fases da vida da mulher. Investigação e tratamento de sindrome dos ovários policísticos (SOP), endometriose, sangramento uterino anormal, dor pélvica e dor na relação sexual, corrimento vaginal e infecções ginecológicas, alterações menstruais, HPV e câncer de colo do útero."
  },
  {
    images: [heroImg, logoImg],
    title: "Exames Preventivos (Papanicolau e Check-up Ginecológico)",
    description: "Prescrição e orientação de exames essenciais para prevenção e diagnóstico precoce, com foco em segurança e tranquilidade. Realização de Papanicolau e exame de DNA HPV."
  },
  {
    images: [heroImg, logoImg],
    title: "Planejamento Familiar",
    description: "Aconselhamento personalizado sobre métodos contraceptivos (DIU, anticoncepcional, implante, laqueadura tubária) e planejamento reprodutivo, respeitando seus desejos e seu momento de vida."
  },
  {
    images: [heroImg, logoImg],
    title: "Climatério e Menopausa",
    description: "Acompanhamento especializado para essa fase de transição, promovendo equilíbrio hormonal, controle dos sintomas, avaliação da terapia de reposição hormonal, promovendo melhora da qualidade de vida e bem-estar."
  },
  {
    images: [heroImg, logoImg],
    title: "Uroginecologia",
    description: "Diagnóstico e tratamento de disfunções do assoalho pélvico, como incontinência urinária, bexiga caída/sensação de bola na vagina (prolapso genital), infecções urinárias de repetição e dor pélvica, com abordagem moderna e individualizada."
  },
  {
    images: [heroImg, logoImg],
    title: "Cirurgias Ginecológicas (Tradicionais e minimamente Invasivas)",
    description: "Realização de cirurgias ginecológicas com técnicas tradicionais e modernas (minimamente invasivas), como histeroscopia, cirurgia por via abdominal e por via vaginal, com foco em segurança, recuperação mais rápida e melhores resultados."
  },
  {
    images: [heroImg, logoImg],
    title: "Ninfoplastia e Cirurgias Íntimas Femininas",
    description: "Procedimentos cirúrgicos íntimos, como ninfoplastia (redução e/ou correção de assimetria dos pequenos lábios) e outras cirurgias íntimas femininas, indicadas para desconforto funcional ou estético, sempre com avaliação criteriosa, técnica precisa e foco na naturalidade, segurança e bem-estar da paciente."
  },
  {
    images: [heroImg, logoImg],
    title: "Pré-natal e Parto",
    description: "Acompanhamento completo da gestação, com consultas detalhadas, solicitação e interpretação de exames e orientação contínua, garantindo segurança e cuidado próximo em todas as fases. Assistência ao parto com abordagem humanizada, respeitando suas escolhas e priorizando a segurança materno-fetal, com presença e suporte do planejamento ao nascimento."
  }
];

const ServiceCard: React.FC<{ service: typeof servicesData[0]; onReadMore: () => void }> = ({ service, onReadMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className={styles.card}>
      <div className={styles.carousel}>
        <img 
          src={service.images[currentIndex]} 
          alt={service.title}
          className={styles.cardImage}
        />
        {service.images.length > 1 && (
          <>
            <button className={styles.prevBtn} onClick={prevImage}>&#10094;</button>
            <button className={styles.nextBtn} onClick={nextImage}>&#10095;</button>
            <div className={styles.dots}>
              {service.images.map((_, idx) => (
                <span 
                  key={idx}
                  className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <h3>{service.title}</h3>
      <p className={styles.cardDescription}>{service.description}</p>
      <button className={styles.readMoreBtn} onClick={onReadMore}>
        Ler mais
      </button>
    </div>
  );
};

const Services: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

  const openModal = (service: typeof servicesData[0]) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section className={styles.services}>
      <div className={styles.titulo}>
        <h2 className={styles.titulo}>Como posso te ajudar</h2>
      </div>

      <div className={styles.grid}>
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={index} 
            service={service} 
            onReadMore={() => openModal(service)}
          />
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && selectedService && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={closeModal}>&times;</button>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;