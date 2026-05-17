import { useState } from "react";
import styles from "../Agendamento.module.css";

type Props = {
    form: any;
    onSuccess: () => void;
};

export default function StepSchedule({
    form,
    onSuccess
}: Props) {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    // =========================
    // CÓDIGOS POR TIPO DE LOCAL
    // =========================
    // Troque os números abaixo pelos event_id reais
    // das consultas online e presenciais.

    const onlineEventCodes = [
        636635,
        182205,
        636631,

    ];

    const presencialEventCodes = [
        634146,
        631785,
        636634,
        354107,
        99286,
        631793,
        93634,
        636630,
        631784,
        
    ];

    // =========================
    // FORMATAR DATA
    // =========================

    const formatDate = (
        date: string
    ) => {

        if (!date) {
            return "";
        }

        const [year, month, day] =
            date.split("-");

        const localDate =
            new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

        return localDate.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );
    };

    // =========================
    // CONFIRMAR AGENDAMENTO
    // =========================

    const handleConfirm =
        async () => {

            try {

                setLoading(true);

                setError("");

                // =========================
                // START DATE
                // =========================

                const startDate =
                    `${form.data} ${form.horario}`;

                // =========================
                // END DATE (+25 MIN)
                // =========================

                const start =
                    new Date(
                        `${form.data}T${form.horario}:00`
                    );

                const end =
                    new Date(start);

                end.setMinutes(
                    end.getMinutes() + 25
                );

                const endHours =
                    String(
                        end.getHours()
                    ).padStart(2, "0");

                const endMinutes =
                    String(
                        end.getMinutes()
                    ).padStart(2, "0");

                const endDate =
                    `${form.data} ${endHours}:${endMinutes}`;

                // =========================
                // LOCAL CONDICIONAL
                // =========================

                const eventId =
                    Number(form.event_id);

                const isOnline =
                    onlineEventCodes.includes(
                        eventId
                    );

                const isPresencial =
                    presencialEventCodes.includes(
                        eventId
                    );

                const placeId =
                    isOnline
                        ? 1
                        : isPresencial
                            ? 13649
                            : 13649;

                const payload = {

                    insurance_id:
                        form.insurance_id
                            ? Number(
                                form.insurance_id
                            )
                            : null,

                    event_id:
                        eventId,

                    user_id:
                        Number(form.user_id),

                    start_date:
                        startDate,

                    end_date:
                        endDate,

                    place_id:
                        placeId,

                    patient_id:
                        form.patient_id
                            ? Number(
                                form.patient_id
                            )
                            : null
                };

                const response =
                    await fetch(
                        "/api/appointments",
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
                        "Erro ao criar agendamento"
                    );
                }

                await fetch(
                    "/api/notifications/appointment-confirmation",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: form.email,

                            patientName:
                                form.name,

                            eventName:
                                form.event?.preview_name ||
                                form.event?.name,

                            date:
                                form.data,

                            hour:
                                form.horario,

                            doctorName:
                                "Dr. Denny Chalegre",

                            placeId,

                            isOnline
                        })
                    }
                );

                onSuccess();

            } catch (error: any) {

                console.error(error);

                setError(
                    error.message ||
                    "Erro ao finalizar agendamento"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className={styles.card}>

            <span className={styles.badge}>
                Passo 6 de 7
            </span>

            <h2 className={styles.title}>
                Confirmar agendamento
            </h2>

            <p className={styles.subtitle}>
                Confira as informações antes de finalizar
            </p>

            {/* RESUMO */}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginTop: 25
                }}
            >

                {/* CONSULTA */}

                <div
                    style={{
                        padding: 16,
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: 14
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontSize: 13,
                            opacity: 0.7
                        }}
                    >
                        Tipo de consulta
                    </p>

                    <strong>
                        {form.event?.preview_name ||
                            form.event?.name ||
                            "-"}
                    </strong>

                </div>

                {/* DATA */}

                <div
                    style={{
                        padding: 16,
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: 14
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontSize: 13,
                            opacity: 0.7
                        }}
                    >
                        Data
                    </p>

                    <strong>
                        {formatDate(
                            form.data
                        )}
                    </strong>

                </div>

                {/* HORÁRIO */}

                <div
                    style={{
                        padding: 16,
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: 14
                    }}
                >

                    <p
                        style={{
                            margin: 0,
                            fontSize: 13,
                            opacity: 0.7
                        }}
                    >
                        Horário
                    </p>

                    <strong>
                        {form.horario}
                    </strong>

                </div>

            </div>

            {/* ERROR */}

            {error && (

                <div
                    className={
                        styles.disclaimer
                    }
                    style={{
                        marginTop: 20
                    }}
                >
                    {error}
                </div>
            )}

            {/* BOTÃO */}

            <button
                className={
                    styles.continueButton
                }
                style={{
                    marginTop: 30
                }}
                onClick={
                    handleConfirm
                }
                disabled={loading}
            >
                {loading
                    ? "Confirmando..."
                    : "Confirmar agendamento"}
            </button>

        </div>
    );
}