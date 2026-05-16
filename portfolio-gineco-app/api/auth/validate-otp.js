import otpStore from "../_lib/otp-store.js";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const { email, otp } =
      req.body;

    if (!email || !otp) {
      return res.status(400).json({
        status: "error",
        message: "E-mail e OTP são obrigatórios"
      });
    }

    const stored =
      otpStore.get(email);

    if (!stored) {
      return res.status(400).json({
        status: "error",
        message: "OTP não encontrado"
      });
    }

    if (Date.now() > stored.expires) {
      otpStore.delete(email);

      return res.status(400).json({
        status: "error",
        message: "OTP expirado"
      });
    }

    if (stored.otp !== String(otp)) {
      return res.status(400).json({
        status: "error",
        message: "OTP inválido"
      });
    }

    otpStore.delete(email);

    return res.status(200).json({
      status: "success",
      message: "OTP validado"
    });

  } catch (error) {
    console.error(
      "Erro validar OTP:",
      error
    );

    return res.status(500).json({
      status: "error",
      message: "Erro ao validar OTP"
    });
  }
}