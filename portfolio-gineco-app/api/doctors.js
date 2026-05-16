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

    const { doctorId } = req.query;

    const response = await axios.get(
      `${API_URL}/doctors?to_confirm=true`,
      {
        headers: getHeaders()
      }
    );

    let doctors =
      response.data?.data ||
      response.data ||
      [];

    if (doctorId) {
      doctors = doctors.filter(
        (doctor) =>
          doctor.id === Number(doctorId)
      );
    }

    return res.status(200).json({
      status: "success",
      data: doctors
    });

  } catch (error) {
    console.error(
      "Erro /doctors:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao buscar médicos"
    });
  }
}