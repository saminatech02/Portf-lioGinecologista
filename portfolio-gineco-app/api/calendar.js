import axios from "axios";

const API_URL = "https://amigobot-api.amigoapp.com.br";

const getHeaders = () => ({
  Authorization: `Bearer ${String(process.env.API_TOKEN).trim()}`
});

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const {
      event_id,
      place_id
    } = req.query;

    if (!event_id) {
      return res.status(400).json({
        status: "error",
        message: "event_id é obrigatório"
      });
    }

    if (!place_id) {
      return res.status(400).json({
        status: "error",
        message: "place_id é obrigatório"
      });
    }

    const response = await axios.get(
      `${API_URL}/calendar?event_id=${event_id}&place_id=${place_id}`,
      {
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({
      status: "success",
      data:
        response.data?.data ||
        response.data
    });

  } catch (error) {
    console.error(
      "Erro ao buscar calendário:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao buscar calendário"
    });
  }
}