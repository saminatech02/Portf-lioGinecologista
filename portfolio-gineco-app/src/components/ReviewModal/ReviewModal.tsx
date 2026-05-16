import { useState } from "react";
import { api } from "../../lib/supabase";
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
    const [enviando, setEnviando] = useState(false);

    const [form, setForm] = useState({
        name: "",
        comment: "",
        publish: false
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating) {
            alert("Selecione uma nota");
            return;
        }

        if (!form.name.trim() || !form.comment.trim()) {
            alert("Preencha seu nome e comentário");
            return;
        }

        setEnviando(true);

        try {
            // Enviar para o Supabase - aprovado = publish (usuário autoriza)
            await api.createAvaliacao({
                paciente_nome: form.name,
                comentario: form.comment,
                nota: rating,
                aprovado: form.publish
            });

            alert("Avaliação enviada com sucesso! Obrigada pelo feedback ✨");
            onClose();
            
            // Limpar formulário
            setForm({ name: "", comment: "", publish: false });
            setRating(0);
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
            alert("Erro ao enviar avaliação. Tente novamente.");
        } finally {
            setEnviando(false);
        }
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