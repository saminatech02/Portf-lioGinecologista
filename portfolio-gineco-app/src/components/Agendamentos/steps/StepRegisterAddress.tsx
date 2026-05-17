import { useEffect, useMemo, useState } from "react";
import styles from "../Agendamento.module.css";

export default function StepRegisterAddress({
    form,
    updateField,
    onBack,
    onSubmit
}: any) {

    const [errorMessage, setErrorMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // =========================
    // CONVÊNIOS
    // =========================

    const [convenios, setConvenios] =
        useState<any[]>([]);

    const [loadingConvenios, setLoadingConvenios] =
        useState(false);

    // =========================
    // CONVÊNIOS FIXOS
    // =========================

    const conveniosFixos = [
        {
            id: 42470,
            name: "Particular"
        },
        {
            id: 36798,
            name: "AMIL"
        },
        {
            id: 145994,
            name: "FOX SAÚDE"
        },
        {
            id: 124940,
            name: "SELECT - COOPEGO"
        },
        {
            id: 36791,
            name: "UNIMED INTERCAMBIO"
        },
        {
            id: 36789,
            name: "UNIMED RECIFE"
        }
    ];

    const idsConveniosFixos =
        conveniosFixos.map((convenio) => convenio.id);

    // =========================
    // CONVÊNIOS PERMITIDOS
    // =========================

    const conveniosPermitidos = [
        36769,
        36768,
        36770,
        36772,
        36775,
        36778,
        36803,
        36788,
        36782,
        36784,
        36794,
        36797,
        36773,
        36779,
        36774,
        42866,
        36781,
        36780,
        36771,
        36802,
        36776,
        36785,
        36795,
        36793,
        36804,
        36801,
        36799,
        36787,
        36800
    ];

    // =========================
    // BUSCAR CONVÊNIOS
    // =========================

    useEffect(() => {

        const buscarConvenios =
            async () => {

                try {

                    setLoadingConvenios(
                        true
                    );

                    const response =
                        await fetch(
                            "/api/insurances/plans/19768?user_id=160011"
                        );

                    const result =
                        await response.json();

                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Erro ao buscar convênios"
                        );
                    }

                    setConvenios(
                        result.data || []
                    );

                } catch (error: any) {

                    console.error(
                        error
                    );

                    setErrorMessage(
                        "Erro ao carregar convênios."
                    );

                } finally {

                    setLoadingConvenios(
                        false
                    );
                }
            };

        buscarConvenios();

    }, []);

    // =========================
    // FILTRAR CONVÊNIOS
    // =========================

    const conveniosFiltrados =
        useMemo(() => {

            return convenios.filter(
                (convenio) =>
                    conveniosPermitidos.includes(
                        Number(convenio.id)
                    ) &&
                    !idsConveniosFixos.includes(
                        Number(convenio.id)
                    )
            );

        }, [convenios]);

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
    // MÁSCARA CPF
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
    // ENVIAR OTP
    // =========================

    const handleSubmit =
        async () => {

            setErrorMessage("");

            // =========================
            // VALIDAÇÕES
            // =========================

            if (
                !form.insurance_id
            ) {

                setErrorMessage(
                    "Selecione um convênio."
                );

                return;
            }

            if (
                Number(form.insurance_id) !== 42470 &&
                !form.insurance_number?.trim()
            ) {

                setErrorMessage(
                    "Informe o número do convênio."
                );

                return;
            }

            if (
                !form.cpf?.trim()
            ) {

                setErrorMessage(
                    "Informe o CPF do paciente."
                );

                return;
            }

            if (
                menorDeIdade &&
                !form.cpf_responsible?.trim()
            ) {

                setErrorMessage(
                    "Menores de idade precisam informar um CPF responsável."
                );

                return;
            }

            try {

                setLoading(true);

                // =========================
                // ENVIA OTP
                // =========================

                const otpResponse =
                    await fetch(
                        "/api/auth/send-otp",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email:
                                    form.email
                            })
                        }
                    );

                const otpResult =
                    await otpResponse.json();

                if (
                    !otpResponse.ok
                ) {

                    throw new Error(
                        otpResult.message ||
                        "Erro ao enviar OTP"
                    );
                }

                console.log(
                    "OTP enviado:",
                    otpResult
                );

                // =========================
                // AVANÇA ETAPA
                // =========================

                onSubmit();

            } catch (error: any) {

                console.error(
                    error
                );

                setErrorMessage(
                    error.message ||
                    "Erro ao enviar código"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className={styles.card}>

            <h2>
                Plano e endereço
            </h2>

            <div className={styles.formGrid}>

                {/* CONVÊNIO */}
                <select
                    value={
                        form.insurance_id
                    }
                    onChange={(e) => {

                        const value =
                            e.target.value;

                        updateField(
                            "insurance_id",
                            value
                        );

                        if (
                            Number(value) === 42470
                        ) {

                            updateField(
                                "insurance_number",
                                "42470"
                            );
                        } else {

                            updateField(
                                "insurance_number",
                                ""
                            );
                        }
                    }}
                    className={
                        styles.selectForm
                    }
                >

                    <option value="">
                        {loadingConvenios
                            ? "Carregando convênios..."
                            : "Selecione o convênio"}
                    </option>

                    {conveniosFixos.map(
                        (convenio) => (

                            <option
                                key={
                                    convenio.id
                                }
                                value={
                                    convenio.id
                                }
                            >
                                {
                                    convenio.name
                                }
                            </option>
                        )
                    )}

                    {conveniosFiltrados.map(
                        (convenio) => (

                            <option
                                key={
                                    convenio.id
                                }
                                value={
                                    convenio.id
                                }
                            >
                                {
                                    convenio.name
                                }
                            </option>
                        )
                    )}

                </select>

                {/* NÚMERO CONVÊNIO */}
                {Number(form.insurance_id) !==
                    42470 && (

                        <input
                            placeholder="Número do convênio"
                            value={
                                form.insurance_number
                            }
                            onChange={(e) =>
                                updateField(
                                    "insurance_number",
                                    e.target.value
                                )
                            }
                            className={
                                styles.formInput
                            }
                        />
                    )}

                {/* CPF PACIENTE */}
                <input
                    placeholder="CPF do paciente"
                    value={
                        form.cpf || ""
                    }
                    onChange={(e) =>
                        updateField(
                            "cpf",
                            formatCPF(
                                e.target.value
                            )
                        )
                    }
                    className={
                        styles.formInput
                    }
                />

                {/* CPF RESPONSÁVEL */}
                {menorDeIdade && (

                    <input
                        placeholder="CPF do responsável"
                        value={
                            form.cpf_responsible ||
                            ""
                        }
                        onChange={(e) =>
                            updateField(
                                "cpf_responsible",
                                formatCPF(
                                    e.target.value
                                )
                            )
                        }
                        className={
                            styles.formInput
                        }
                    />
                )}

            </div>

            {errorMessage && (

                <div
                    className={
                        styles.disclaimer
                    }
                >
                    {errorMessage}
                </div>
            )}

            <div className={styles.actions}>

                <button
                    onClick={onBack}
                    disabled={loading}
                >
                    Voltar
                </button>

                <button
                    onClick={
                        handleSubmit
                    }
                    disabled={loading}
                >
                    {loading
                        ? "Enviando..."
                        : "Continuar"}
                </button>

            </div>

        </div>
    );
}