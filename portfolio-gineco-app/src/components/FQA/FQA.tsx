import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "O que levar para uma consulta ginecológica?",
    answer: (
      <ul>
        <li>Documento de identificação;</li>
        <li>Cartão do plano de saúde, se for convênio;</li>
        <li>Exames ginecológicos anteriores, como Papanicolau, ultrassom transvaginal, ultrassom das mamas e exames de sangue;</li>
        <li>Data da última menstruação e histórico de regularidade do ciclo menstrual;</li>
        <li>Lista de medicamentos de uso contínuo, incluindo anticoncepcionais;</li>
        <li>Lista de dúvidas e sintomas, como dores, corrimentos ou alterações percebidas.</li>
      </ul>
    )
  },
  {
    question: "Com que frequência devo ir ao ginecologista?",
    answer:
      "Pelo menos uma vez por ano. Esse período pode ser encurtado caso surjam sintomas como sangramentos anormais, dores pélvicas, corrimentos incomuns, dúvidas, desejo de contracepção ou outras necessidades específicas."
  },
  {
    question: "Posso engravidar se tiver ovários policísticos ou endometriose?",
    answer:
      "Sim. Com o diagnóstico correto e o tratamento adequado, muitas mulheres conseguem realizar o sonho de ter filhos."
  },
  {
    question: "Com que idade devo começar a fazer mamografia e quando repetir o exame?",
    answer:
      "A mamografia deve ser iniciada a partir dos 40 anos de idade e repetida anualmente."
  },
  {
    question: "A pílula anticoncepcional engorda?",
    answer:
      "Não. Cientificamente, a pílula anticoncepcional não causa ganho de gordura. O que pode acontecer em alguns casos é retenção de líquidos ou aumento do apetite."
  },
  {
    question: "Preciso fazer o preventivo, Papanicolau, todos os anos?",
    answer:
      "Não necessariamente. Se os resultados anteriores foram normais, o exame deve ser feito uma vez por ano por dois anos seguidos. Se ambos forem normais, os próximos exames podem ser realizados a cada 3 anos."
  },
  {
    question: "O teste de DNA HPV PCR substitui o Papanicolau?",
    answer:
      "Sim. O teste de DNA-HPV por PCR pode substituir o Papanicolau como exame principal de rastreamento, atuando de forma mais moderna e precoce. Se o resultado for normal, a repetição pode ser feita após 5 anos."
  },
  {
    question: "Qual método contraceptivo mais seguro?",
    answer:
      "O implante hormonal subdérmico, conhecido como Implanon, é um dos métodos reversíveis mais seguros disponíveis atualmente."
  },
  {
    question: "Quando procurar um uroginecologista?",
    answer: (
      <ul>
        <li>Perda involuntária de urina ao tossir, espirrar, rir ou praticar exercícios;</li>
        <li>Urgência para urinar, com necessidade súbita e dificuldade para segurar o xixi;</li>
        <li>Sensação de peso na vagina ou de uma “bola” saindo pela região genital;</li>
        <li>Infecções urinárias frequentes;</li>
        <li>Dificuldade para esvaziar a bexiga;</li>
        <li>Flacidez vaginal, sensação de vagina folgada ou pum vaginal;</li>
        <li>Desconforto com aparência ou funcionalidade genital.</li>
      </ul>
    )
  },
  {
    question: "Dói para colocar DIU?",
    answer:
      "Depende. A colocação do DIU pode causar dor ou cólicas, mas isso varia muito de mulher para mulher. Quando a colocação é planejada, com analgesia local ou sistêmica, a dor pode não acontecer ou ser mínima."
  },
  {
    question: "Sabonete íntimo faz mal?",
    answer:
      "O sabonete íntimo não faz mal, desde que seja usado corretamente, apenas na parte externa e sem excessos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <span className={styles.badge}>Dúvidas frequentes</span>

        <h2>Perguntas comuns sobre saúde feminina</h2>

        <p>
          Encontre respostas rápidas para dúvidas que costumam surgir antes da
          consulta ginecológica.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`${styles.faqItem} ${isOpen ? styles.active : ""}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <strong>{isOpen ? "−" : "+"}</strong>
              </button>

              {isOpen && (
                <div className={styles.answer}>
                  {typeof item.answer === "string" ? (
                    <p>{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}