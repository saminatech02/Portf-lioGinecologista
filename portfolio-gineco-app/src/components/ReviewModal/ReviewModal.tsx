import { useState } from "react";
import { api } from "../../lib/supabase";
import styles from "./ReviewModal.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type FeedbackMessage = {
    type: "success" | "error";
    text: string;
} | null;

export default function ReviewModal({
    isOpen,
    onClose
}: Props) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [feedbackMessage, setFeedbackMessage] =
        useState<FeedbackMessage>(null);

    const [form, setForm] = useState({
        name: "",
        comment: "",
        publish: false
    });

    if (!isOpen) return null;

    const resetForm = () => {
        setForm({
            name: "",
            comment: "",
            publish: false
        });

        setRating(0);
        setHover(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFeedbackMessage(null);

        if (!rating) {
            setFeedbackMessage({
                type: "error",
                text: "Selecione uma nota antes de enviar sua avaliação."
            });
            return;
        }

        if (!form.name.trim() || !form.comment.trim()) {
            setFeedbackMessage({
                type: "error",
                text: "Preencha seu nome e comentário para continuar."
            });
            return;
        }

        setEnviando(true);

        try {
            await api.createAvaliacao({
                paciente_nome: form.name.trim(),
                comentario: form.comment.trim(),
                nota: rating,
                aprovado: form.publish
            });

            setFeedbackMessage({
                type: "success",
                text: "Avaliação enviada com sucesso! Obrigada pelo feedback ✨"
            });

            resetForm();

            setTimeout(() => {
                setFeedbackMessage(null);
                onClose();
            }, 1800);

        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);

            setFeedbackMessage({
                type: "error",
                text: "Não foi possível enviar sua avaliação. Tente novamente."
            });
        } finally {
            setEnviando(false);
        }
    };

    const handleClose = () => {
        setFeedbackMessage(null);
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>

            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className={styles.close}
                    onClick={handleClose}
                    type="button"
                >
                    ×
                </button>

                <h2>
                    Avalie seu atendimento
                </h2>

                <p>
                    Sua experiência nos ajuda a melhorar.
                </p>

                {feedbackMessage && (
                    <div
                        className={`${styles.message} ${
                            feedbackMessage.type === "success"
                                ? styles.success
                                : styles.error
                        }`}
                    >
                        {feedbackMessage.text}
                    </div>
                )}

                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => {
                                setRating(star);
                                setFeedbackMessage(null);
                            }}
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
                        onChange={(e) => {
                            setForm({
                                ...form,
                                name: e.target.value
                            });

                            setFeedbackMessage(null);
                        }}
                    />

                    <textarea
                        placeholder="Conte como foi sua experiência"
                        value={form.comment}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                comment: e.target.value
                            });

                            setFeedbackMessage(null);
                        }}
                    />

                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={form.publish}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    publish: e.target.checked
                                })}
                            className={styles.checkboxSelect}
                        />
                        Autorizo publicar meu depoimento
                    </label>

                    <button
                        className={styles.submit}
                        type="submit"
                        disabled={enviando}
                    >
                        {enviando ? "Enviando..." : "Enviar avaliação"}
                    </button>

                </form>

            </div>

        </div>
    );
}