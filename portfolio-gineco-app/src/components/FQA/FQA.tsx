import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "O que levar para uma consulta ginecológica?",
    answer: [
      "Documento de identificação.",
      "Cartão do plano de saúde, se for convênio.",
      "Exames ginecológicos anteriores, como Papanicolau, ultrassom transvaginal, ultrassom das mamas e exames de sangue.",
      "Data da última menstruação e histórico de regularidade do ciclo menstrual.",
      "Lista de medicamentos de uso contínuo, incluindo anticoncepcionais.",
      "Lista de dúvidas e sintomas, como dores, corrimentos ou alterações percebidas."
    ]
  },
  {
    question: "Com que frequência devo ir ao ginecologista?",
    answer:
      "Pelo menos uma vez por ano. Esse período pode ser encurtado caso surjam sintomas, como sangramentos anormais, dores pélvicas, corrimentos incomuns, dúvidas ou desejo de contracepção."
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
      "Não. Cientificamente, a pílula anticoncepcional não causa ganho de gordura. Em alguns casos, pode ocorrer retenção de líquidos ou aumento do apetite."
  },
  {
    question: "Preciso fazer o preventivo, Papanicolau, todos os anos?",
    answer:
      "Não necessariamente. O exame deve ser feito uma vez por ano por dois anos seguidos. Se ambos os resultados forem normais, os próximos exames podem ser realizados a cada 3 anos."
  },
  {
    question: "O teste de DNA HPV PCR substitui o Papanicolau?",
    answer:
      "Sim. O teste de DNA-HPV por PCR pode substituir o Papanicolau como exame principal de rastreamento, atuando de maneira mais moderna e precoce. Se o resultado for normal, geralmente só precisa ser repetido após 5 anos."
  },
  {
    question: "Qual método contraceptivo mais seguro?",
    answer:
      "O implante hormonal subdérmico, conhecido como Implanon, é um dos métodos reversíveis mais seguros disponíveis atualmente."
  },
  {
    question: "Quando procurar um uroginecologista?",
    answer: [
      "Perda involuntária de urina ao tossir, espirrar, rir ou praticar exercícios.",
      "Urgência para urinar, com necessidade súbita e dificuldade para segurar o xixi.",
      "Sensação de peso na vagina ou de uma “bola” saindo pela região genital.",
      "Infecções urinárias frequentes.",
      "Dificuldade para esvaziar a bexiga.",
      "Flacidez vaginal, sensação de vagina folgada ou pum vaginal.",
      "Desconforto com aparência ou funcionalidade genital."
    ]
  },
  {
    question: "Dói para colocar DIU?",
    answer:
      "Depende. A colocação do DIU pode causar dor ou cólicas, mas isso varia de mulher para mulher. Quando a colocação é planejada com analgesia local ou sistêmica, a dor pode ser mínima ou nem acontecer."
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
    <section className={styles.faq}>
      <div className={styles.titulo}>
        <h2>Dúvidas frequentes</h2>
      </div>

      <div className={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`${styles.item} ${isOpen ? styles.active : ""}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <strong>{isOpen ? "−" : "+"}</strong>
              </button>

              {isOpen && (
                <div className={styles.answer}>
                  {Array.isArray(faq.answer) ? (
                    <ul>
                      {faq.answer.map((text, idx) => (
                        <li key={idx}>{text}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
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