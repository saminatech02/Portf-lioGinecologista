import { useState } from "react";
import styles from "../Agendamento.module.css";

export default function StepOtp({
    form,
    updateField,
    onNext
}: any) {

    const [loading, setLoading] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    // =========================
    // VALIDAR OTP
    // =========================

const handleValidateOtp = async (
    e?: React.MouseEvent<HTMLButtonElement>
) => {

    e?.preventDefault();

    setErrorMessage("");

    if (!form.code?.trim()) {

        setErrorMessage(
            "Informe o código de validação."
        );

        return;
    }

    if (form.code.length < 6) {

        setErrorMessage(
            "O código deve possuir 6 dígitos."
        );

        return;
    }

    if (!form.email) {

        setErrorMessage(
            "E-mail não encontrado."
        );

        return;
    }

    try {

        setLoading(true);

        console.log(
            "ENVIANDO REQUEST"
        );

        const response =
            await fetch(
                "http://localhost:3000/auth/validate-otp",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: form.email,
                        otp: form.code
                    })
                }
            );

        console.log(
            "REQUEST ENVIADA"
        );

        const result =
            await response.json();

        if (!response.ok) {

            throw new Error(
                result.message
            );
        }

        onNext();

    } catch (error: any) {

        console.error(error);

        setErrorMessage(
            error.message ||
            "Erro ao validar código"
        );

    } finally {

        setLoading(false);
    }
};

    return (

        <div className={styles.card}>

            <h2 className={styles.title}>
                Validação por e-mail
            </h2>

            <h5>
                Verifique seu e-mail e
                preencha o código de validação
            </h5>

            {/* 🔥 debug email */}
            <p
                style={{
                    fontSize: 14,
                    opacity: 0.7
                }}
            >
                {form.email}
            </p>

            <input
                placeholder="Código"
                value={form.code}
                maxLength={6}
                onChange={(e) =>
                    updateField(
                        "code",
                        e.target.value
                            .replace(
                                /\D/g,
                                ""
                            )
                    )
                }
                className={
                    styles.inputCPF
                }
            />

            {errorMessage && (

                <div
                    className={
                        styles.disclaimer
                    }
                >
                    {errorMessage}
                </div>
            )}

            <button
                onClick={
                    handleValidateOtp
                }
                disabled={loading}
            >
                {loading
                    ? "Validando..."
                    : "Validar"}
            </button>

        </div>
    );
}