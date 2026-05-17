import { useEffect, useState } from "react";
import styles from "../Agendamento.module.css";

type EventType = {
    id: number;
    name: string;
    preview_name?: string;
    insurances?: number[];
};

type Props = {
    form: any;
    onSelect: (value: EventType) => void;
};

export default function StepType({
    form,
    onSelect
}: Props) {
    const [events, setEvents] =
        useState<EventType[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [selectedId, setSelectedId] =
        useState("");

    const [selectedEvent, setSelectedEvent] =
        useState<EventType | null>(null);

    const [error, setError] =
        useState("");

    // =========================
    // IDS PARTICULARES
    // =========================

    const privateOrNullIds = [
        636634,
        636635,
        93634,
        636631
    ];

    // =========================
    // TODOS OS IDS PERMITIDOS
    // =========================

    const allAllowedIds = [
        634146,
        631785,
        636634,
        636635,
        182205,
        354107,
        99286,
        631793,
        93634,
        636631,
        636630,
        631784
    ];

    // =========================
    // CONVÊNIOS QUE SE COMPORTAM COMO PARTICULAR
    // =========================

    const particularLikeInsuranceIds = [
        42470
    ];

    // =========================
    // BUSCAR EVENTOS
    // =========================

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "/api/events?place_id=13649"
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Erro ao buscar eventos"
                );
            }

            const insuranceId =
                form?.insurance_id
                    ? Number(form.insurance_id)
                    : null;

            const shouldShowPrivateOnly =
                insuranceId === null ||
                particularLikeInsuranceIds.includes(
                    insuranceId
                );

            const filteredEvents =
                (result.data || []).filter((event: EventType) => {
                    const eventId = Number(event.id);

                    if (!allAllowedIds.includes(eventId)) {
                        return false;
                    }

                    if (shouldShowPrivateOnly) {
                        return privateOrNullIds.includes(eventId);
                    }

                    if (privateOrNullIds.includes(eventId)) {
                        return false;
                    }

                    const eventInsurances =
                        Array.isArray(event.insurances)
                            ? event.insurances
                            : [];

                    const hasPatientInsurance =
                        eventInsurances.some(
                            (insurance) =>
                                Number(insurance) === insuranceId
                        );

                    return hasPatientInsurance;
                });

            setEvents(filteredEvents);
            setSelectedId("");
            setSelectedEvent(null);

        } catch (error: any) {
            console.error(error);

            setError(
                error.message ||
                "Erro ao carregar eventos"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [form?.insurance_id]);

    // =========================
    // SELECT
    // =========================

    const handleSelect = (eventId: string) => {
        setSelectedId(eventId);

        const foundEvent =
            events.find(
                (event) =>
                    event.id === Number(eventId)
            );

        setSelectedEvent(
            foundEvent || null
        );
    };

    // =========================
    // CONTINUAR
    // =========================

    const handleContinue = () => {
        if (!selectedEvent) return;

        onSelect({
            id: selectedEvent.id,
            name: selectedEvent.name,
            preview_name:
                selectedEvent.preview_name,
            insurances:
                selectedEvent.insurances
        });
    };

    return (
        <div className={styles.card}>
            <span className={styles.badge}>
                Passo 4 de 7
            </span>

            <h2 className={styles.title}>
                Tipo da consulta
            </h2>

            <p className={styles.subtitle}>
                Escolha como deseja realizar seu atendimento
            </p>

            <select
                value={selectedId}
                onChange={(e) =>
                    handleSelect(e.target.value)
                }
                className={styles.selectForm}
                disabled={loading}
            >
                <option value="">
                    {loading
                        ? "Carregando..."
                        : "Selecione uma opção"}
                </option>

                {events.map((event) => (
                    <option
                        key={event.id}
                        value={event.id}
                    >
                        {event.preview_name || event.name}
                    </option>
                ))}
            </select>

            {selectedEvent && (
                <button
                    className={styles.continueButton}
                    onClick={handleContinue}
                >
                    Continuar
                </button>
            )}

            {error && (
                <div className={styles.disclaimer}>
                    {error}
                </div>
            )}
        </div>
    );
}