import React, { useState } from "react";
import styles from "./CTA.module.css";
import ReviewModal from "../ReviewModal/ReviewModal";

const CTA: React.FC = () => {

  const [openReview, setOpenReview] = useState(false);

  return (
    <>
      <section className={styles.cta}>
        <div className={styles.content}>

          <span className={styles.badge}>
            Consultório em Recife
          </span>

          <h2>
            Sua saúde merece prioridade
          </h2>

          <p>
            Atendimento em localização central
            com fácil acesso e estacionamento.
          </p>

          <div className={styles.actions}>
            <h4> Já nos visitou?</h4>
            <button
              className={styles.reviewBtn}
              onClick={() => setOpenReview(true)}
            > Nos dê sua opinião </button>
          </div>

        </div>

        <div className={styles.mapCard}>
          <iframe
            title="Localização consultório"
            src="https://www.google.com/maps?q=-8.067926088124556,-34.892707675940855&z=16&output=embed"
            loading="lazy"
            allowFullScreen
          />

          <div className={styles.address}>
            <strong>
              R. Francisco Alves, 325
            </strong>

            <span>
              Paissandu, Recife - PE
            </span>
          </div>
        </div>

      </section>

      <ReviewModal
        isOpen={openReview}
        onClose={() => setOpenReview(false)}
      />
    </>
  );
};

export default CTA;