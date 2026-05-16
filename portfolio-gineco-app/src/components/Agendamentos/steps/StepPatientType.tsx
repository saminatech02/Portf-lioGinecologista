import styles from "../Agendamento.module.css";

type Props = {
    onExistingPatient: () => void;
    onNewPatient: () => void;
};

export default function StepPatientType({
    onExistingPatient,
    onNewPatient
}: Props) {
    return (
        <div className={styles.card}>
            <span className={styles.badge}>
                Passo 1 de 5
            </span>

            <h2 className={styles.title}>Você já é paciente?</h2>

            <div className={styles.actions}>
                <button onClick={onExistingPatient}>
                    Sim
                </button>

                <button onClick={onNewPatient}>
                    Não
                </button>
            </div>
        </div>
    );
}