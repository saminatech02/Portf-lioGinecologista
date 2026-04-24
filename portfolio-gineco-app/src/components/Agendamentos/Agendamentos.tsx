import Calendar from "react-calendar";
import { useState } from "react";
import styles from "./Agendamento.module.css";

type Value = Date | null;

export default function Agendamentos() {
  const [date, setDate] = useState<Value>(new Date());
  const [horario, setHorario] = useState<string | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // FORM STATE
  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    telefone: "",
    email: "",
    cpf: "",
    cpfResponsavel: "",
    pagamento: "",
    convenio: "",
    observacao: "",
    consentimento: false,
  });

  const formasPagamento = [
    "Pix",
    "Cartão de crédito",
    "Cartão de débito",
    "Dinheiro",
    "Convênio"
  ];

  const horarios = ["08:00", "09:00", "10:00", "14:00", "15:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !horario || !form.nome || !form.telefone) {
      alert("Preencha os dados obrigatórios");
      return;
    }

    console.log("Agendado:", {
      date,
      horario,
      ...form,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  return (
    <section className={styles.agendamento}>
      <div className={styles.agendTitle}>
        <h2>Agende sua consulta</h2>
        <p>Escolha a melhor data e horário</p>
      </div>

      <div className={styles.container}>

        {/* CALENDÁRIO + HORÁRIOS */}
        <div className={styles.agendamentoCard}>

          <Calendar
            value={date}
            onChange={(value) => setDate(value as Date)}
            minDate={today}
            tileClassName={({ date }) => {
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);

              return d < today ? "past-day" : "";
            }}
          />

          <div className={styles.horarios}>
            {horarios.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorario(h)}
                className={
                  horario === h
                    ? `${styles.horarioBtn} ${styles.horarioSelecionado}`
                    : styles.horarioBtn
                }
              >
                {h}
              </button>
            ))}
          </div>

        </div>

        {/* FORMULÁRIO */}
        <form className={styles.form} onSubmit={handleSubmit}>

          {/* DADOS PESSOAIS */}

          <input
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
          />

          <input
            name="nascimento"
            placeholder="Data de nascimento (dd/mm/aaaa)"
            value={form.nascimento || ""}
            onChange={handleChange}
          />

          <input
            name="cpf"
            placeholder="CPF"
            value={form.cpf || ""}
            onChange={handleChange}
          />

          <input
            name="cpfResponsavel"
            placeholder="CPF do responsável (se aplicável)"
            value={form.cpfResponsavel || ""}
            onChange={handleChange}
          />

          <input
            name="telefone"
            placeholder="Celular / WhatsApp"
            value={form.telefone}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />

          {/* PAGAMENTO */}

          <select
            name="pagamento"
            value={form.pagamento}
            onChange={handleChange}
          >
            <option value="">
              Forma de pagamento
            </option>

            {formasPagamento.map((forma) => (
              <option
                key={forma}
                value={forma.toLowerCase()}
              >
                {forma}
              </option>
            ))}
          </select>

          <textarea
            name="observacao"
            placeholder="Motivo da consulta / observações"
            value={form.observacao}
            onChange={handleChange}
          />

          <label className={styles.check}>
            <input
              type="checkbox"
              name="consentimento"
              checked={form.consentimento}
              onChange={handleChange}
              className={styles.checkBOX}
            />
            Autorizo contato para confirmação do agendamento
          </label>

          <button
            type="submit"
            className={styles.confirmar}
          >
            Confirmar agendamento
          </button>

        </form>

      </div>
    </section>
  );
}