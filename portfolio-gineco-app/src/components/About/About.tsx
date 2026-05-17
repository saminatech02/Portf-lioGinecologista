import { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import dennyGinecologista from "../../assets/denny-ginecologista.jpg";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const element = aboutRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);


  return (
    <section ref={aboutRef} className={`${styles.about} ${show ? styles.show : ""}`}>
      <img src={dennyGinecologista} alt="Sobre a médica" />

      <div>
        <h2>Sobre o Dr. Denny Chalegre</h2>
        <p>
          Denny Chalegre é Ginecologista, Obstetra e Uroginecologista pelo IMIP. Médico formado pela UFPE, atua com foco na saúde da mulher,
          oferecendo um atendimento humanizado, baseado em escuta, confiança e cuidado individualizado.
        </p>
        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            Especialista em Ginecologia e Obstetrícia (IMIP)
          </div>

          <div className={styles.highlightCard}>
            Fellowship em Uroginecologia (IMIP)
          </div>

          <div className={styles.highlightCard}>
            Graduado pela UFPE
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;