import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "../Agendamento.module.css";

type Props = {
    onSelect: (date: Date) => void;
};

export default function StepCategory({
    onSelect
}: Props) {

    const [date, setDate] =
        useState<Date | null>(
            new Date()
        );

const fetchCalendar =
  async () => {

    try {

      const response =
        await fetch(
          `http://localhost:3000/calendar?event_id=${selectedEvent.id}&place_id=13649`
        );

      const result =
        await response.json();

      console.log(
        "CALENDAR:",
        result
      );

    } catch (error) {

      console.error(error);
    }
  };
  
    const availableDates = [
        "2026-05-14",
        "2026-05-20",
        "2026-05-22",
        "2026-06-03",
        "2026-06-10",
        "2026-06-17",
        "2026-07-05"
    ];

    // =========================
    // FORMATAR DATA
    // =========================

    const formatDate = (
        date: Date
    ) => {

        return date
            .toISOString()
            .split("T")[0];
    };

    // =========================
    // VERIFICAR DISPONIBILIDADE
    // =========================

    const isDateAvailable = (
        date: Date
    ) => {

        const formatted =
            formatDate(date);

        return availableDates.includes(
            formatted
        );
    };

    // =========================
    // DATA MÁXIMA
    // =========================

    const maxDate =
        new Date();

    maxDate.setMonth(
        maxDate.getMonth() + 2
    );

    // =========================
    // SELECIONAR DATA
    // =========================

    const handleSelectDate = (
        value: any
    ) => {

        const selectedDate =
            value as Date;

        if (
            isDateAvailable(
                selectedDate
            )
        ) {

            setDate(
                selectedDate
            );

            onSelect(
                selectedDate
            );
        }
    };

    return (

        <div className={styles.card}>

            <h2 className={styles.title}>
                Selecione uma data
            </h2>

            <Calendar
                onChange={
                    handleSelectDate
                }

                value={date}

                minDate={
                    new Date()
                }

                maxDate={
                    maxDate
                }

                prev2Label={null}

                next2Label={null}

                // BLOQUEIA DATAS
                tileDisabled={({
                    date,
                    view
                }) => {

                    if (
                        view !== "month"
                    ) {
                        return false;
                    }

                    return !isDateAvailable(
                        date
                    );
                }}

                // ESTILIZA DATAS DISPONÍVEIS
                tileClassName={({
                    date,
                    view
                }) => {

                    if (
                        view === "month" &&
                        isDateAvailable(
                            date
                        )
                    ) {

                        return styles.availableDate;
                    }

                    return "";
                }}
            />

        </div>
    );
}