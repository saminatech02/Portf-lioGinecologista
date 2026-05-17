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

    const { place_id, insurance_id } = req.query;

    if (!place_id) {
      return res.status(400).json({
        status: "error",
        message: "place_id é obrigatório"
      });
    }

    const response = await axios.get(
      `${API_URL}/events?place_id=${place_id}&insurance_id=${insurance_id}`,
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
      "Erro ao buscar eventos:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao buscar eventos"
    });
  }
}