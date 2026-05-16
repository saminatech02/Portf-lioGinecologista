import styles from "../Agendamento.module.css";

export default function StepSuccess({
    horario,
    onFinish
}: any) {

    return (
        <div className={styles.card}>

            <div className={styles.check}>
                ✓
            </div>

            <h2>
                Agendamento confirmado
            </h2>

            <p>
                Consulta às {horario}
            </p>

            <button onClick={onFinish}>
                Finalizar
            </button>

        </div>
    )
}