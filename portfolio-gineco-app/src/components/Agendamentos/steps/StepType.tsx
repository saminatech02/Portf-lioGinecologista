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
    // IDS PARA CONVÊNIO
    // =========================

    const allAllowedIds = [
        634146,
        631785,
        182205,
        354107,
        99286,
        631793,
        636630,
        631784
    ];

    // =========================
    // IDS PARA PARTICULAR / SEM CONVÊNIO
    // =========================

    const privateOrNullIds = [
        636634,
        636635,
        93634,
        636631
    ];

    // =========================
    // BUSCAR EVENTOS
    // =========================

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");

            const rawInsuranceId =
                form?.insurance_id;

            const insuranceIdToFetch =
                rawInsuranceId
                    ? Number(rawInsuranceId)
                    : 42470;

            const response = await fetch(
                `/api/events?place_id=13649&insurance_id=${insuranceIdToFetch}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Erro ao buscar eventos"
                );
            }

            const isPrivateOrNull =
                !rawInsuranceId ||
                Number(rawInsuranceId) === 42470;

            const idsToShow =
                isPrivateOrNull
                    ? privateOrNullIds
                    : allAllowedIds;

            const filteredEvents =
                (result.data || []).filter(
                    (event: EventType) =>
                        idsToShow.includes(
                            Number(event.id)
                        )
                );

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