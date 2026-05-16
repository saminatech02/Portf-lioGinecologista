import { useState, useRef } from "react";
import styles from "../Agendamento.module.css";

export default function StepCpf({
    form,
    updateField,
    onNext
}: any) {

    const [loading, setLoading] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    // 🔥 Rate limit
    const lastRequestTime =
        useRef(0);

    // =========================
    // FORMATAR CPF
    // =========================

    const formatCPF = (
        value: string
    ) => {

        return value
            .replace(/\D/g, "")
            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )
            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )
            .replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            )
            .slice(0, 14);
    };

    // =========================
    // VALIDAR RATE LIMIT
    // =========================

    const validateRateLimit = () => {

        const now =
            Date.now();

        const LIMIT_TIME =
            5000;

        if (
            now -
            lastRequestTime.current <
            LIMIT_TIME
        ) {

            setErrorMessage(
                "Aguarde alguns segundos antes de tentar novamente."
            );

            return false;
        }

        lastRequestTime.current =
            now;

        return true;
    };

    // =========================
    // VALIDAR CPF
    // =========================

    const validateCpf = (
        cpf: string
    ) => {

        if (cpf.length !== 11) {

            setErrorMessage(
                "CPF não é válido."
            );

            return false;
        }

        return true;
    };

    // =========================
    // BUSCAR PACIENTE
    // =========================

    const fetchPatient =
        async (cpf: string) => {

            const response =
                await fetch(
                    `http://localhost:3000/patients/exists?cpf=${cpf}`
                );

            const result =
                await response.json();

            console.log(
                "RESULTADO CPF:",
                result
            );

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Erro ao validar CPF"
                );
            }

            // 🔥 aqui pegamos o data.data
            return result.data?.data;
        };

    // =========================
    // PREENCHER PACIENTE
    // =========================

    const fillPatientData = (
        patient: any
    ) => {

        updateField(
            "name",
            patient.name || ""
        );

        updateField(
            "email",
            patient.email || ""
        );

        updateField(
            "contact_cellphone",
            patient.contact_cellphone || ""
        );

        updateField(
            "born",
            patient.born || ""
        );
    };

    // =========================
    // ENVIAR OTP
    // =========================

    const sendOtp =
        async (email: string) => {

            if (!email) {

                throw new Error(
                    "Paciente não possui e-mail cadastrado."
                );
            }

            const response =
                await fetch(
                    "http://localhost:3000/auth/send-otp",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email
                        })
                    }
                );

            const result =
                await response.json();

            console.log(
                "OTP RESULT:",
                result
            );

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Erro ao enviar OTP"
                );
            }

            return result;
        };

    // =========================
    // CONTINUAR
    // =========================

    const handleContinue =
        async () => {

            setErrorMessage("");

            // 🔥 rate limit
            const canContinue =
                validateRateLimit();

            if (!canContinue) {
                return;
            }

            const cpfLimpo =
                form.cpf.replace(
                    /\D/g,
                    ""
                );

            // 🔥 valida CPF
            const cpfValid =
                validateCpf(
                    cpfLimpo
                );

            if (!cpfValid) {
                return;
            }

            try {

                setLoading(true);

                // 🔥 busca paciente
                const patient =
                    await fetchPatient(
                        cpfLimpo
                    );

                // =========================
                // PACIENTE EXISTE
                // =========================

                if (patient) {

                    console.log(
                        "Paciente encontrado:",
                        patient
                    );

                    // 🔥 preenche dados
                    fillPatientData(
                        patient
                    );

                    // 🔥 envia OTP usando email do exists
                    await sendOtp(
                        patient.email
                    );

                    // 🔥 vai para OTP
                    onNext(true);

                    return;
                }

                // =========================
                // PACIENTE NÃO EXISTE
                // =========================

                console.log(
                    "Paciente não encontrado"
                );

                onNext(false);

            } catch (error: any) {

                console.error(
                    "Erro:",
                    error
                );

                setErrorMessage(
                    error.message ||
                    "Erro ao validar CPF."
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className={styles.card}>

            <span className={styles.badge}>
                Passo 1 de 6
            </span>

            <h2 className={styles.title}>
                Informe seu CPF
            </h2>

            <input
                placeholder="CPF"
                value={form.cpf}
                type="text"
                maxLength={14}
                onChange={(e) =>
                    updateField(
                        "cpf",
                        formatCPF(
                            e.target.value
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
                type="button"
                onClick={
                    handleContinue
                }
                disabled={loading}
            >
                {loading
                    ? "Validando..."
                    : "Continuar"}
            </button>

        </div>
    );
}