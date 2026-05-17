import { useEffect, useMemo, useState } from "react";
import styles from "../Agendamento.module.css";

type SlotType = {
    start: string;
    end: string;
    timegrid_id: number;
    user_id: number;
    event_id: number;
    place_id: number;
    id: string;
};

type DoctorSlotsType = {
    user: {
        id: number;
        name: string;
        label: string;
        specialty: string;
    };

    event: {
        name: string;
    };

    slots: SlotType[];
};

type CalendarDayType = {
    date: string;
    status: string;
    slotsByUser: DoctorSlotsType[];
};

export default function StepCategory({
    form,
    onSelect
}: any) {
    const [calendar, setCalendar] =
        useState<CalendarDayType[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const allowedUserId = 160011;

    // =========================
    // FETCH
    // =========================

    useEffect(() => {
        const fetchCalendar = async () => {
            try {
                if (!form.event_id) {
                    return;
                }

                setLoading(true);
                setError("");
                setCurrentIndex(0);

                const response = await fetch(
                    `/api/calendar?event_id=${form.event_id}&place_id=13649`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Erro ao buscar horários"
                    );
                }

                const calendarData =
                    Array.isArray(result.data)
                        ? result.data
                        : [];

                setCalendar(calendarData);
            } catch (error: any) {
                console.error(error);

                setError(
                    error.message ||
                    "Erro ao carregar horários"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCalendar();
    }, [form.event_id]);

    // =========================
    // FILTRO
    // =========================

    const filteredCalendar = useMemo(() => {
        return calendar
            .map((day) => ({
                ...day,

                slotsByUser:
                    day.slotsByUser?.filter(
                        (doctorSlots) =>
                            doctorSlots.user?.id === allowedUserId
                    ) || []
            }))
            .filter(
                (day) => day.slotsByUser.length > 0
            );
    }, [calendar]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [filteredCalendar.length]);

    const currentDay =
        filteredCalendar[currentIndex];

    const doctor =
        currentDay?.slotsByUser?.[0];

    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date: string) => {
        const [year, month, day] =
            date.split("-");

        const localDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        return localDate.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "2-digit"
            }
        );
    };

    // =========================
    // NAVEGAÇÃO
    // =========================

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            Math.min(
                prev + 1,
                filteredCalendar.length - 1
            )
        );
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>
                Escolha um horário
            </h2>

            {loading && (
                <p>
                    Carregando horários...
                </p>
            )}

            {error && (
                <div className={styles.disclaimer}>
                    {error}
                </div>
            )}

            {!loading &&
                !error &&
                filteredCalendar.length === 0 && (
                    <p>
                        Nenhum horário encontrado.
                    </p>
                )}

            {!loading &&
                !error &&
                currentDay && (
                    <div
                        style={{
                            position: "relative",
                            maxWidth: 360,
                            margin: "0 auto"
                        }}
                    >
                        {filteredCalendar.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goToPrevious}
                                    disabled={currentIndex === 0}
                                    style={{
                                        position: "absolute",
                                        left: -18,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        zIndex: 10,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        border: "1px solid #ddd",
                                        background: "#fff",
                                        cursor:
                                            currentIndex === 0
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            currentIndex === 0
                                                ? 0.4
                                                : 1,
                                        boxShadow:
                                            "0 2px 10px rgba(0,0,0,0.08)"
                                    }}
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    onClick={goToNext}
                                    disabled={
                                        currentIndex ===
                                        filteredCalendar.length - 1
                                    }
                                    style={{
                                        position: "absolute",
                                        right: -18,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        zIndex: 10,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        border: "1px solid #ddd",
                                        background: "#fff",
                                        cursor:
                                            currentIndex ===
                                                filteredCalendar.length - 1
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            currentIndex ===
                                                filteredCalendar.length - 1
                                                ? 0.4
                                                : 1,
                                        boxShadow:
                                            "0 2px 10px rgba(0,0,0,0.08)"
                                    }}
                                >
                                    →
                                </button>
                            </>
                        )}

                        <div
                            style={{
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: 18,
                                padding: 18,
                                background: "#fff",
                                boxShadow:
                                    "0 4px 18px rgba(0,0,0,0.05)"
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: 16
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        textTransform: "capitalize",
                                        fontSize: 17
                                    }}
                                >
                                    {formatDate(currentDay.date)}
                                </h3>

                                {doctor && (
                                    <div
                                        style={{
                                            marginTop: 6
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}
                                        >
                                            {doctor.user.name}
                                        </p>

                                        <p
                                            style={{
                                                margin: "2px 0 0",
                                                opacity: 0.7,
                                                fontSize: 13
                                            }}
                                        >
                                            {doctor.user.specialty}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(2, 1fr)",
                                    gap: 10
                                }}
                            >
                                {doctor?.slots?.map((slot) => (
                                    <button
                                        key={slot.id}
                                        className={
                                            styles.continueButton
                                        }
                                        style={{
                                            padding: "12px",
                                            minHeight: 46,
                                            fontSize: 14
                                        }}
                                        onClick={() =>
                                            onSelect?.({
                                                date: currentDay.date,
                                                start: slot.start,
                                                end: slot.end,
                                                slot_id: slot.id,
                                                user_id: slot.user_id,
                                                timegrid_id:
                                                    slot.timegrid_id
                                            })
                                        }
                                    >
                                        {slot.start}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredCalendar.length > 1 && (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: 12,
                                    fontSize: 13,
                                    opacity: 0.7
                                }}
                            >
                                {currentIndex + 1} / {filteredCalendar.length}
                            </p>
                        )}
                    </div>
                )}
        </div>
    );
}