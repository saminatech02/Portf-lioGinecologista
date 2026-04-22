import Calendar from "react-calendar";
import { useState } from "react";
import styles from "./Agendamento.module.css";
import "react-calendar/dist/Calendar.css";

type Value = Date | null;

export default function Agendamentos() {
  const [date, setDate] = useState<Value>(new Date());
  const [horario, setHorario] = useState<string | null>(null);

  const horarios = ["08:00", "09:00", "10:00", "14:00", "15:00"];

  const handleSubmit = () => {
    if (!date || !horario) {
      alert("Selecione uma data e um horário");
      return;
    }

    console.log("Agendado:", date, horario);
  };

  return (
    <section className={styles.agendamento}>
      <h2>Agende sua consulta</h2>
      <p>Escolha a melhor data e horário</p>

      <div className={styles.agendamentoCard}>
        
        <Calendar
          selectRange={false}
          onChange={(value) => setDate(value as Date)}
          value={date}
        />

        <div className={styles.horarios}>
          {horarios.map((h) => (
            <button
              key={h}
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

        <button className={styles.confirmar} onClick={handleSubmit}>
          Confirmar agendamento
        </button>
      </div>
    </section>
  );
}
