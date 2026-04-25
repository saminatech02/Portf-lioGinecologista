import { useState } from "react";
import styles from "./Testimonials.module.css";

const depoimentos = [
  {
    nome: "Vanessa Santos",
    texto: "Excelente profissional um dos anjos que Deus enviou para transformar minha vida eternamente grata pelo dom que Deus lhe deu."
  },
  {
    nome: "Catia Silva",
    texto: "Excelente profissional, 1º Deus e 2° o senhor, que fez minha avaliação e minha cirurgia foi um sucesso. Serei eternamente grata."
  },
  {
    nome: "Ana Cláudia",
    texto: `Só tenho elogios pra o Dr. Denny. Ele fez o meu parto no Imip. Profissional humano, amoroso com o paciente. Poderia ter feito apenas a obrigação, principalmente por estar ali num hospital público, atendendo "de graça", mas foi me recepcionar, me deixou muito tranquila e à vontade e ainda caprichou na playlist pra que o momento fosse o mais tranquilo e natural possível. Nunca vou esquecer o carinho e a atenção comigo tanto dele quanto da equipe naquela noite. Ah, se toda paciente tivesse a sorte de cruzar o caminho do Dr. Denny ou de outro profissional igual a ele, que ama o que faz! Deus abençoe o senhor, Dr. Denny! Sou grata a esse Deus tão bom por ter colocado o senhor no meu caminho. Que esse mesmo Deus de amor lhe dê o Céu, quando terminar sua carreira aqui na terra daqui há muitas décadas!`
  }
];

export default function Testimonials() {

  const [depoimentoAberto, setDepoimentoAberto] =
    useState<null | {
      nome: string;
      texto: string;
    }>(null);

  return (
    <>
      <section className={styles.testimonials}>

        <div className={styles.testTitle}>
          <h2>O que minhas pacientes dizem</h2>
        </div>

        <div className={styles.grid}>

          {depoimentos.map((item, index) => (

            <div
              key={index}
              className={styles.card}
            >
              <p>{item.texto}</p>

              {item.texto.length > 180 && (
                <button
                  className={styles.readMore}
                  onClick={() =>
                    setDepoimentoAberto(item)
                  }
                >
                  Ler mais
                </button>
              )}

              <span>★★★★★</span>

              <strong className={styles.name}>
                — {item.nome}
              </strong>

            </div>

          ))}

        </div>
      </section>


      {/* MODAL */}
      {depoimentoAberto && (

        <div
          className={styles.overlay}
          onClick={() =>
            setDepoimentoAberto(null)
          }
        >

          <div
            className={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className={styles.close}
              onClick={() =>
                setDepoimentoAberto(null)
              }
            >
              ×
            </button>

            <span className={styles.badge}>
              Depoimento completo
            </span>

            <h3>
              {depoimentoAberto.nome}
            </h3>

            <div className={styles.modalStars}>
              ★★★★★
            </div>

            <p>
              {depoimentoAberto.texto}
            </p>

          </div>

        </div>

      )}

    </>
  );
}