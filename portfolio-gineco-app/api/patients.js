import axios from "axios";

const API_URL = "https://amigobot-api.amigoapp.com.br";

const getHeaders = () => ({
  Authorization: `Bearer ${String(process.env.API_TOKEN).trim()}`
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const body = req.body;

    if (!body.name || !body.cpf) {
      return res.status(400).json({
        status: "error",
        message: "Nome e CPF são obrigatórios"
      });
    }

    const cpf =
      String(body.cpf).replace(/\D/g, "");

    const cpfResponsible =
      String(
        body.cpf_responsible || body.cpf
      ).replace(/\D/g, "");

    const payload = {
      name: body.name,
      born: body.born,
      contact_cellphone: body.contact_cellphone,
      email: body.email,
      cpf,
      cpf_responsible: cpfResponsible,
      insurance_number: body.insurance_number,
      insurance_id: body.insurance_id
    };

    const response = await axios.post(
      `${API_URL}/patients`,
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
      "Erro criar paciente:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao criar paciente"
    });
  }
}