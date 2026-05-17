import { useState } from "react";
import styles from "../Agendamento.module.css";

export default function StepOtp({
    form,
    updateField,
    onNext,
    patientBool
}: any) {

    const [loading, setLoading] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    // =========================
    // VALIDAR OTP
    // =========================

    const formatDateToApi = (date: string) => {
        if (!date) return "";

        const [day, month, year] = date.split("/");

        if (!day || !month || !year) return date;

        return `${year}-${month}-${day}`;
    };

    const handleValidateOtp = async (
        e?: React.MouseEvent<HTMLButtonElement>
    ) => {

        e?.preventDefault();

        setErrorMessage("");

        // =========================
        // VALIDAÇÕES
        // =========================

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

            const otpResponse =
                await fetch(
                    "/api/auth/validate-otp",
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

            const otpResult =
                await otpResponse.json();

            if (!otpResponse.ok) {

                throw new Error(
                    otpResult.message
                );
            }


            if (patientBool) {
                onNext();

                return;
            }

            // =========================
            // CALCULAR IDADE
            // =========================

            const calcularIdade = (
                dataNascimento: string
            ) => {

                if (!dataNascimento)
                    return 0;

                const hoje =
                    new Date();

                const nascimento =
                    new Date(
                        dataNascimento
                    );

                let idade =
                    hoje.getFullYear() -
                    nascimento.getFullYear();

                const mes =
                    hoje.getMonth() -
                    nascimento.getMonth();

                if (
                    mes < 0 ||
                    (
                        mes === 0 &&
                        hoje.getDate() <
                        nascimento.getDate()
                    )
                ) {
                    idade--;
                }

                return idade;
            };

            const menorDeIdade =
                calcularIdade(
                    form.born
                ) < 18;

            // =========================
            // PAYLOAD PACIENTE
            // =========================

            const payload = {

                name: form.name,

                born: formatDateToApi(form.born),

                contact_cellphone:
                    form.contact_cellphone?.replace(
                        /\D/g,
                        ""
                    ),

                email: form.email,

                cpf:
                    form.cpf?.replace(
                        /\D/g,
                        ""
                    ),

                cpf_responsible:
                    menorDeIdade
                        ? form.cpf_responsible?.replace(
                            /\D/g,
                            ""
                        )
                        : form.cpf?.replace(
                            /\D/g,
                            ""
                        ),

                insurance_number:
                    form.insurance_id ===
                        "no-insurance"
                        ? ""
                        : form.insurance_number,

                insurance_id:
                    form.insurance_id ===
                        "no-insurance"
                        ? null
                        : Number(
                            form.insurance_id
                        )
            };
            // =========================
            // CRIAR PACIENTE
            // =========================

            const patientResponse =
                await fetch(
                    "/api/patients",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            payload
                        )
                    }
                );

            const patientResult =
                await patientResponse.json();

            if (!patientResponse.ok) {

                throw new Error(
                    patientResult.message ||
                    "Erro ao cadastrar paciente"
                );
            }

            // =========================
            // SALVAR PATIENT_ID
            // =========================

            const patientId =
                patientResult?.data?.id ||
                patientResult?.data?.data?.id;

            if (patientId) {

                updateField(
                    "patient_id",
                    patientId
                );
            }

            // =========================
            // NEXT STEP
            // =========================

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