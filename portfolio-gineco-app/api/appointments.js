import axios from "axios";

const API_URL = "https://amigobot-api.amigoapp.com.br";

const getHeaders = () => ({
  Authorization: `Bearer ${String(process.env.API_TOKEN).trim()}`
});

const addMinutes = (dateString, minutes) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  date.setMinutes(date.getMinutes() + minutes);

  return date.toISOString();
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const {
      insurance_id,
      event_id,
      user_id,
      start_date,
      end_date,
      place_id,
      patient_id
    } = req.body;

    if (
      !event_id ||
      !user_id ||
      !start_date ||
      !place_id ||
      !patient_id
    ) {
      return res.status(400).json({
        status: "error",
        message: "Dados obrigatórios do agendamento ausentes"
      });
    }

    const insuranceIdFinal = insurance_id
      ? Number(insurance_id)
      : 42470;

    const endDateFinal =
      insuranceIdFinal === 42470
        ? addMinutes(start_date, 40)
        : end_date;

    console.log(endDateFinal, insuranceIdFinal)

    if (!endDateFinal) {
      return res.status(400).json({
        status: "error",
        message: "Data final do agendamento ausente"
      });
    }

    const payload = {
      event_id: Number(event_id),
      user_id: Number(user_id),
      start_date,
      end_date: endDateFinal,
      place_id: Number(place_id),
      patient_id: Number(patient_id),
      insurance_id: insuranceIdFinal
    };

    console.log("Payload agendamento:", payload);

    const response = await axios.post(
      `${API_URL}/attendances`,
      payload,
      {
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(201).json({
      status: "success",
      data: response.data
    });

  } catch (error) {
    console.error(
      "Erro ao criar agendamento:",
      error.response?.data || error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao criar agendamento"
    });
  }
}