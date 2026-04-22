import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <img src="https://scontent-for2-1.cdninstagram.com/v/t51.82787-15/518888242_18517965097005950_905080542069323534_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzY3NzM1MDU3MzU1MjcyMTA1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNTB4MTY4OC5zZHIuQzMifQ%3D%3D&_nc_ohc=Z_pYBHSGjE8Q7kNvwGYOptF&_nc_oc=AdoFxQxSY1_KpFvwLal4D41TVpStunJ_BhaqlUJRdj0Zt0HPBmM7f8DTw0700j3Nnkw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-for2-1.cdninstagram.com&_nc_gid=sxIeOTm9r4yGZIEt1bL0yQ&_nc_ss=7a32e&oh=00_Af1SMeNGfSKex_4vUCrgM5-2sP86DP6dMCtfKfSNpJwjXA&oe=69EE575B" alt="Sobre a médica" />

      <div>
        <h2>Sobre Dr. Denny Chalegre</h2>
        <p>
         Dr. Denny Chalegre é médico especialista em Ginecologia e Obstetrícia pelo IMIP, com fellowship em Uroginecologia. 
         Formado pela UFPE, atua com foco na saúde da mulher, oferecendo um atendimento humanizado, baseado em escuta, 
         confiança e cuidado individualizado.
        </p>
        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            Especialista em Ginecologia e Obstetrícia (IMIP)
          </div>

          <div className={styles.highlightCard}>
            Fellow em Uroginecologia (IMIP)
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