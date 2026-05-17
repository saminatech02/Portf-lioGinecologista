import { supabase } from "../_lib/supabase.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        status: "error",
        message: "E-mail e OTP são obrigatórios"
      });
    }

    const emailFormatado = String(email).trim().toLowerCase();
    const otpFormatado = String(otp).trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado);

    if (!emailValido) {
      return res.status(400).json({
        status: "error",
        message: "E-mail inválido"
      });
    }

    if (!/^\d{6}$/.test(otpFormatado)) {
      return res.status(400).json({
        status: "error",
        message: "OTP inválido"
      });
    }

    const { data, error } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", emailFormatado)
      .order("created_at", {
        ascending: false
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(400).json({
        status: "error",
        message: "OTP não encontrado"
      });
    }

    const expirou = new Date(data.expires_at).getTime() < Date.now();

    if (expirou) {
      await supabase
        .from("otp_codes")
        .delete()
        .eq("email", emailFormatado);

      return res.status(400).json({
        status: "error",
        message: "OTP expirado"
      });
    }

    if (String(data.otp) !== otpFormatado) {
      return res.status(400).json({
        status: "error",
        message: "OTP inválido"
      });
    }

    await supabase
      .from("otp_codes")
      .delete()
      .eq("email", emailFormatado);

    return res.status(200).json({
      status: "success",
      message: "OTP validado"
    });
  } catch (error) {
    console.error("Erro validar OTP:", error);

    return res.status(500).json({
      status: "error",
      message: "Erro ao validar OTP"
    });
  }
}