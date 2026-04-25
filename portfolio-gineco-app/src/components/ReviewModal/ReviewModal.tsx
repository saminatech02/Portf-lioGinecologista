import { useState } from "react";
import styles from "./ReviewModal.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ReviewModal({
    isOpen,
    onClose
}: Props) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [form, setForm] = useState({
        name: "",
        comment: "",
        publish: false
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating) {
            alert("Selecione uma nota");
            return;
        }

        console.log({
            rating,
            ...form
        });

        alert("Avaliação enviada com sucesso ✨");
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>

            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className={styles.close}
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>
                    Avalie seu atendimento
                </h2>

                <p>
                    Sua experiência nos ajuda a melhorar.
                </p>

                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className={
                                star <= (hover || rating)
                                    ? styles.activeStar
                                    : styles.star
                            }
                        >
                            ★
                        </button>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >

                    <input
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Conte como foi sua experiência"
                        value={form.comment}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                comment: e.target.value
                            })
                        }
                    />

                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={form.publish}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    publish: e.target.checked
                                })
                            }
                        />
                        Autorizo publicar meu depoimento
                    </label>

                    <button
                        className={styles.submit}
                        type="submit"
                    >
                        Enviar avaliação
                    </button>

                </form>

            </div>

        </div>
    );
}