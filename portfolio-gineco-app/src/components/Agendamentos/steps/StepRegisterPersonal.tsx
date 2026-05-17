import { useState } from "react";
import styles from "../Agendamento.module.css";

export default function StepRegisterPersonal({
    form,
    updateField,
    onNext
}: any) {

    const formatDateToApi = (date: string) => {
        if (!date) return "";

        const [day, month, year] = date.split("/");

        if (!day || !month || !year) return date;

        return `${year}-${month}-${day}`;
    };

    const [errorMessage, setErrorMessage] = useState("");

    // 🔥 regex email
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 🔥 regex celular BR
    const phoneRegex =
        /^\d{10,11}$/;

    // 🔥 máscara celular
    const formatPhone = (value: string) => {

        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 10) {
            return numbers
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .slice(0, 14);
        }

        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    const handleNext = async () => {

        setErrorMessage("");

        // 🔥 validação campos obrigatórios
        if (
            !form.name?.trim() ||
            !form.born ||
            !form.contact_cellphone?.trim() ||
            !form.email?.trim()
        ) {
            setErrorMessage(
                "Preencha todos os campos antes de continuar."
            );
            return;
        }

        // 🔥 validação email
        if (!emailRegex.test(form.email)) {
            setErrorMessage(
                "Informe um e-mail válido."
            );
            return;
        }

        // 🔥 validação celular
        const celularLimpo =
            form.contact_cellphone.replace(/\D/g, "");

        if (!phoneRegex.test(celularLimpo)) {
            setErrorMessage(
                "Informe um número de celular válido."
            );
            return;
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.born)) {
            setErrorMessage("Informe a data no formato dd/mm/yyyy");
            return;
        }

        const payload = {

            // 🔥 dados pessoais
            name: form.name,
            born: formatDateToApi(form.born),
            contact_cellphone: celularLimpo,
            email: form.email,

            // 🔥 CPF já validado anteriormente
            cpf: Number(form.cpf?.replace(/\D/g, "")),
            cpf_responsible: Number(form.cpf?.replace(/\D/g, "")),

            // 🔥 preencher depois nas próximas etapas
            insurance_number: form.insurance_number || "",
            insurance_id: form.insurance_id || null
        };

        console.log("Payload enviado:", payload);

        onNext();
    };

    return (
        <div className={styles.card}>

            <span className={styles.badge}>
                Cadastro • etapa 1
            </span>

            <h2>Dados pessoais</h2>

            <div className={styles.formGrid}>

                <input
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) =>
                        updateField(
                            "name",
                            e.target.value
                        )}
                    className={styles.formInput}
                />

                <input
                    type="text"
                    placeholder="Data de nascimento"
                    value={form.born}
                    maxLength={10}
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");

                        if (value.length > 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2);
                        }

                        if (value.length > 5) {
                            value = value.slice(0, 5) + "/" + value.slice(5, 9);
                        }

                        updateField("born", value);
                    }}
                    className={styles.formInput}
                />

                <input
                    placeholder="Celular"
                    value={form.contact_cellphone}
                    onChange={(e) =>
                        updateField(
                            "contact_cellphone",
                            formatPhone(e.target.value)
                        )}
                    className={styles.formInput}
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        updateField(
                            "email",
                            e.target.value
                        )}
                    className={styles.formInput}
                />

            </div>

            {errorMessage && (
                <div className={styles.disclaimer}>
                    {errorMessage}
                </div>
            )}

            <button onClick={handleNext}>
                Próxima etapa
            </button>

        </div>
    )
}