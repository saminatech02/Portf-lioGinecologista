import nodemailer from "nodemailer";
import { supabase } from "../_lib/supabase.js";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Método não permitido"
      });
    }

    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        status: "error",
        message: "E-mail é obrigatório"
      });
    }

    const emailFormatado = email.trim().toLowerCase();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado);

    if (!emailValido) {
      return res.status(400).json({
        status: "error",
        message: "E-mail inválido"
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    ).toISOString();

    await supabase
      .from("otp_codes")
      .delete()
      .eq("email", emailFormatado);

    const { error: insertError } = await supabase
      .from("otp_codes")
      .insert({
        email: emailFormatado,
        otp,
        expires_at: expiresAt
      });

    if (insertError) {
      throw insertError;
    }

    const html = `
      <div style="
        font-family: Arial, sans-serif;
        background: #f4f7fb;
        padding: 32px;
      ">
        <div style="
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        ">
          <div style="
            background: #C8A46A;
            padding: 40px;
            text-align: center;
          ">
            <h1 style="
              color: #ffffff;
              margin: 0;
              font-size: 28px;
            ">
              Dr. Denny Chalegre
            </h1>

            <p style="
              color: #ffffff;
              margin-top: 10px;
              font-size: 14px;
            ">
              Verificação de segurança
            </p>
          </div>

          <div style="padding: 40px;">
            <h2 style="
              margin-top: 0;
              color: #111827;
            ">
              Seu código de verificação
            </h2>

            <p style="
              color: #4b5563;
              line-height: 1.6;
            ">
              Utilize o código abaixo para continuar seu processo.
            </p>

            <div style="
              margin: 40px 0;
              text-align: center;
            ">
              <div style="
                display: inline-block;
                background: #fff8ed;
                border: 2px dashed #C8A46A;
                border-radius: 16px;
                padding: 20px 32px;
                font-size: 42px;
                letter-spacing: 10px;
                font-weight: bold;
                color: #C8A46A;
              ">
                ${otp}
              </div>
            </div>

            <p style="
              color: #4b5563;
              font-size: 14px;
            ">
              Este código expira em <strong>5 minutos</strong>.
            </p>
          </div>

          <div style="
            background: #f9fafb;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
          ">
            © 2026 Dr. Denny Chalegre<br />
            Todos os direitos reservados.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Dr. Denny Chalegre" <${process.env.EMAIL_USER}>`,
      to: emailFormatado,
      subject: "🔐 Código de verificação | Dr. Denny Chalegre",
      html,
      priority: "high",

      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high"
      }
    });

    return res.status(200).json({
      status: "success",
      message: "OTP enviado com sucesso"
    });

  } catch (error) {
    console.error("Erro OTP:", error);

    return res.status(500).json({
      status: "error",
      message: "Erro ao enviar OTP"
    });
  }
}