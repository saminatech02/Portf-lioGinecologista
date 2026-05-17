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

            <h2 className={styles.title}>Você já é paciente?</h2>

            <h5>
                Caso nunca tenha se consultado com o Dr. Denny na Clínica Acolher Saúde solicitamos que seja feito o cadastro prévio. Clique em "Não" para realizar o cadastro
            </h5>

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