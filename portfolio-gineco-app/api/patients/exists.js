import axios from "axios";

const API_URL =
  "https://amigobot-api.amigoapp.com.br";

const getHeaders = () => ({
  Authorization:
    `Bearer ${String(process.env.API_TOKEN).trim()}`
});

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    let { cpf } = req.query;

    if (!cpf) {
      return res.status(400).json({
        status: "error",
        message: "CPF é obrigatório"
      });
    }

    cpf = String(cpf).replace(/\D/g, "");

    if (cpf.length !== 11) {
      return res.status(400).json({
        status: "error",
        message: "CPF inválido"
      });
    }

    const response = await axios.get(
      `${API_URL}/patients/exists?cpf=${cpf}`,
      {
        headers: getHeaders()
      }
    );

    return res.status(200).json({
      status: "success",
      data: response.data
    });

  } catch (error) {
    console.error(
      "Erro validar CPF:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao validar CPF"
    });
  }
}