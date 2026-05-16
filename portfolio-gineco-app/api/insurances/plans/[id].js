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

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "ID do convênio é obrigatório"
      });
    }

    const response = await axios.get(
      `${API_URL}/insurances/plans/${id}?insurances_group_id=1976&user_id=160011`,
      {
        headers: getHeaders()
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
      "Erro planos:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao buscar planos"
    });
  }
}