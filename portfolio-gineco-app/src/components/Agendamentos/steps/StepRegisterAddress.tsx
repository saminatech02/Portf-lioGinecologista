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

    // 🔥 convênios vindos da API
    const [convenios, setConvenios] =
        useState<any[]>([]);

    const [loadingConvenios, setLoadingConvenios] =
        useState(false);

    // 🔥 apenas convênios aceitos
    const conveniosPermitidos = [
        36769, // ALLIANZ
        36768, // AMEPE / CAMPE
        36770, // ASSEFAZ
        36772, // BANCO CENTRAL
        36775, // CAMED
        36778, // CAPESAUDE
        36803, // CARE PLUS
        36788, // CODEVASF
        36782, // COMSAUDE
        36784, // CONAB
        36794, // EMBRATEL
        36797, // FISCO SAUDE
        36773, // FIO PREV
        36779, // FIO SAUDE
        36774, // GAMA SAÚDE
        42866, // GEAP
        36781, // FUSEX
        36780, // HOSPITAL NAVAL
        36771, // LIFE EMPRESARIAL
        36802, // MEDISERVICE
        36776, // OMINT
        36785, // POSTAL SAUDE
        36795, // PROASA
        36793, // PLAN ASSISTE
        36804, // SERPRO
        36801, // SAUDE CAIXA
        36799, // SAUDE PETROBRAS
        36787, // TRT 6
        36800 // UNAFISCO
    ];

    // 🔥 buscar convênios
    useEffect(() => {

        const buscarConvenios = async () => {

            try {

                setLoadingConvenios(true);

                const response = await fetch(
                    "http://localhost:3000/insurances/plans/19768?user_id=160011"
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

                console.error(error);

                setErrorMessage(
                    "Erro ao carregar convênios."
                );

            } finally {

                setLoadingConvenios(false);
            }
        };

        buscarConvenios();

    }, []);

    // 🔥 filtra somente convênios aceitos
    const conveniosFiltrados =
        useMemo(() => {

            return convenios.filter(
                (convenio) =>
                    conveniosPermitidos.includes(
                        convenio.id
                    )
            );

        }, [convenios]);

    // 🔥 verifica idade
    const calcularIdade = (
        dataNascimento: string
    ) => {

        if (!dataNascimento) return 0;

        const hoje = new Date();

        const nascimento =
            new Date(dataNascimento);

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
        calcularIdade(form.born) < 18;

    // 🔥 máscara CPF
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

    const handleSubmit = async () => {

        setErrorMessage("");

        // 🔥 validações
        if (!form.insurance_id) {
            setErrorMessage(
                "Selecione um convênio."
            );
            return;
        }

        if (
            form.insurance_id !== "no-insurance" &&
            !form.insurance_number?.trim()
        ) {
            setErrorMessage(
                "Informe o número do convênio."
            );
            return;
        }

        if (!form.cpf?.trim()) {
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

        const payload = {

            name: form.name,
            born: form.born,
            contact_cellphone:
                form.contact_cellphone.replace(/\D/g, ""),
            email: form.email,

            cpf: form.cpf?.replace(
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
                form.insurance_id === "no-insurance"
                    ? ""
                    : form.insurance_number,

            insurance_id:
                form.insurance_id === "no-insurance"
                    ? null
                    : Number(form.insurance_id)
        };

        console.log(
            "Payload final:",
            payload
        );

        try {

            const response =
                await fetch(
                    "http://localhost:3000/patients",
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

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Erro ao cadastrar"
                );
            }

            console.log(
                "Paciente cadastrado:",
                result
            );

            onSubmit();

        } catch (error: any) {

            console.error(error);

            setErrorMessage(
                error.message ||
                "Erro ao cadastrar paciente"
            );
        }
    };

    return (
        <div className={styles.card}>

            <h2>
                Plano e endereço
            </h2>

            <div className={styles.formGrid}>

                {/* 🔥 Convênio */}
                <select
                    value={form.insurance_id}
                    onChange={(e) => {

                        const value = e.target.value;

                        updateField(
                            "insurance_id",
                            value
                        );

                        // 🔥 limpa número do convênio
                        // caso não possua convênio
                        if (value === "no-insurance") {

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

                    {/* 🔥 opção sem convênio */}
                    <option value="no-insurance">
                        Não possuo convênio
                    </option>

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

                {/* 🔥 Número convênio */}
                {form.insurance_id !== "no-insurance" && (
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

                {/* 🔥 CPF responsável */}
                <input
                    placeholder="CPF do paciente"
                    value={form.cpf || ""}
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

                {/* 🔥 CPF responsável */}
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
                >
                    Voltar
                </button>

                <button
                    onClick={handleSubmit}
                >
                    Cadastrar
                </button>

            </div>

        </div>
    )
}