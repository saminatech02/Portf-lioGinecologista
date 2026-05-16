import styles from "../Agendamento.module.css";

const slots = [
    "09:00",
    "10:30",
    "14:00",
    "16:30"
];

export default function StepSchedule({
    onSelect
}: any) {

    return (
        <div className={styles.card}>

            <h2>Escolha horário</h2>

            <div className={styles.slots}>
                {slots.map(slot => (
                    <button
                        key={slot}
                        onClick={() =>
                            onSelect(slot)
                        }
                    >
                        {slot}
                    </button>
                ))}
            </div>

        </div>
    )
}