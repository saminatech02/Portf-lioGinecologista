import { useState, useEffect, useRef } from "react";
import { api } from "../../lib/supabase";
import styles from "./Testimonials.module.css";

type Depoimento = {
  nome: string;
  texto: string;
  nota: number;
};

const depoimentosLocais: Depoimento[] = [
  {
    nome: "Vanessa Santos",
    texto: "Excelente profissional um dos anjos que Deus enviou para transformar minha vida eternamente grata pelo dom que Deus lhe deu.",
    nota: 5
  },
  {
    nome: "Catia Silva",
    texto: "Excelente profissional, 1º Deus e 2° o senhor, que fez minha avaliação e minha cirurgia foi um sucesso. Serei eternamente grata.",
    nota: 5
  },
  {
    nome: "Ana Cláudia",
    texto: `Só tenho elogios pra o Dr. Denny. Ele fez o meu parto no Imip. Profissional humano, amoroso com o paciente. Poderia ter feito apenas a obrigação, principalmente por estar ali num hospital público, atendendo de graça, mas foi me recepcionar, me deixou muito tranquila e à vontade e ainda caprichou na playlist pra que o momento fosse o mais tranquilo e natural possível. Nunca vou esquecer o carinho e a atenção comigo tanto dele quanto da equipe naquela noite. Ah, se toda paciente tivesse a sorte de cruzar o caminho do Dr. Denny ou de outro profissional igual a ele, que ama o que faz! Deus abençoe o senhor, Dr. Denny! Sou grata a esse Deus tão bom por ter colocado o senhor no meu caminho. Que esse mesmo Deus de amor lhe dê o Céu, quando terminar sua carreira aqui na terra daqui há muitas décadas!`,
    nota: 5
  },
  {
    nome: "Everly Gabrielle",
    texto: `Um médico maravilhoso, atencioso, profissional e humano. A minha experiência foi surreal, sou grata a Deus pela vida desse ser de Luz.`,
    nota: 5
  },
  {
    nome: "Edineide Lima",
    texto: `Que Deus continue te abençoando sempre. Sou grata a Deus e a esse médico maravilhoso, atencioso e humano. A minha experiência foi nota mil que Deus realize todos os seus sonhos.`,
    nota: 5
  },
  {
    nome: "Carol Taissa",
    texto: `Denny sempre seremos gratos a Deus por nos apresentar a você. Não poderia ter sido outra pessoa a trazer nossa pequena ao mundo. Obrigada Dr. por tanta atenção, paciência, humanidade. Você é 10!!`,
    nota: 5
  }
];

export default function Testimonials() {

  const [depoimentosBanco, setDepoimentosBanco] = useState<Depoimento[]>([]);
  const [depoimentoAberto, setDepoimentoAberto] = useState<Depoimento | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 6;

  // 🔥 detectar mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 ref do carrossel
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

  const buscarAvaliacoes = async () => {
    try {
      const data = await api.getAvaliacoes();

      const filtradas: Depoimento[] = data
        .filter((a: any) => a.nota >= 4)
        .map((a: any) => ({
          nome: a.paciente_nome || "Paciente",
          texto: a.comentario,
          nota: a.nota
        }));

      setDepoimentosBanco(filtradas);

    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  const renderStars = (nota: number) => {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
  };

  const depoimentosExibir = [
    ...depoimentosLocais,
    ...depoimentosBanco
  ].sort((a, b) => b.nota - a.nota);

  const totalPaginas = Math.ceil(depoimentosExibir.length / itensPorPagina);

  const depoimentosPaginados = depoimentosExibir.slice(
    paginaAtual * itensPorPagina,
    (paginaAtual + 1) * itensPorPagina
  );

  const scroll = (dir: "left" | "right") => {
    if (!gridRef.current) return;

    const card = gridRef.current.querySelector(`.${styles.card}`) as HTMLElement;

    if (!card) return;

    const scrollAmount = card.offsetWidth + 16;

    gridRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const temProximaPaginaComMaisDe4 = (() => {
    const inicioProxima = (paginaAtual + 1) * itensPorPagina;
    const fimProxima = inicioProxima + itensPorPagina;

    const itensProximaPagina = depoimentosExibir.slice(inicioProxima, fimProxima);

    return itensProximaPagina.length >= 4;
  })();

  return (
    <>
      <section className={styles.testimonials}>

        <div className={styles.testTitle}>
          <h2>O que minhas pacientes dizem</h2>
        </div>

        <div className={styles.grid} ref={gridRef}>

          {(isMobile ? depoimentosExibir : depoimentosPaginados).map((item, index) => (

            <div key={index} className={styles.card}>
              <p>{item.texto}</p>

              {item.texto.length > 180 && (
                <button
                  className={styles.readMore}
                  onClick={() => setDepoimentoAberto(item)}
                >
                  Ler mais
                </button>
              )}

              <span>{renderStars(item.nota)}</span>

              <strong className={styles.name}>
                — {item.nome}
              </strong>
            </div>

          ))}

        </div>

        {/* 🔥 CONTROLES */}
        {isMobile ? (
          <div className={styles.carouselControls}>
            <button onClick={() => scroll("left")}>←</button>
            <button onClick={() => scroll("right")}>→</button>
          </div>
        ) : (
          totalPaginas > 1 && (
            <div className={styles.carouselControls}>

              <button
                onClick={() => {
                  setPaginaAtual((prev) => prev - 1)
                }}
                disabled={paginaAtual == 0}
              >
                ←
              </button>

              <span>
                {paginaAtual + 1} / {((temProximaPaginaComMaisDe4 || totalPaginas == (paginaAtual+1)) ? totalPaginas : totalPaginas - 1)}
              </span>

              <button
                onClick={() => {
                  if (temProximaPaginaComMaisDe4) {
                    setPaginaAtual((prev) => prev + 1);
                  }
                }}
                disabled={!temProximaPaginaComMaisDe4}
              >
                →
              </button>

            </div>
          )
        )}

      </section>

      {/* MODAL */}
      {depoimentoAberto && (
        <div className={styles.overlay} onClick={() => setDepoimentoAberto(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            <button className={styles.close} onClick={() => setDepoimentoAberto(null)}>
              ×
            </button>

            <span className={styles.badge}>
              Depoimento completo
            </span>

            <h3>{depoimentoAberto.nome}</h3>

            <div className={styles.modalStars}>
              {renderStars(depoimentoAberto.nota)}
            </div>

            <p>{depoimentoAberto.texto}</p>

          </div>
        </div>
      )}
    </>
  );
}