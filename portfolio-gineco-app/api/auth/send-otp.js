import nodemailer from "nodemailer";
import otpStore from "../_lib/otp-store.js";

const transporter =
  nodemailer.createTransport({
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

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "E-mail é obrigatório"
      });
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      return res.status(500).json({
        status: "error",
        message: "Credenciais de e-mail não configuradas"
      });
    }

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    otpStore.set(email, {
      otp,
      expires:
        Date.now() + 5 * 60 * 1000
    });

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f7fb;
  font-family:Arial,sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#ffffff;
            margin:40px auto;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 10px 30px rgba(0,0,0,0.08);
          "
        >

          <tr>
            <td
              style="
                background:#C8A46A;
                padding:40px;
                text-align:center;
              "
            >

              <h1 style="
                color:#ffffff;
                margin:0;
                font-size:28px;
              ">
                Dr. Denny Chalegre
              </h1>

              <p style="
                color:#ffffff;
                margin-top:10px;
                font-size:14px;
              ">
                Verificação de segurança
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:40px;">

              <h2 style="
                margin-top:0;
                color:#111827;
              ">
                Seu código de verificação
              </h2>

              <p style="
                color:#4b5563;
                line-height:1.6;
              ">
                Utilize o código abaixo para continuar seu processo.
              </p>

              <div style="
                margin:40px 0;
                text-align:center;
              ">

                <div style="
                  display:inline-block;
                  background:#fff8ed;
                  border:2px dashed #C8A46A;
                  border-radius:16px;
                  padding:20px 32px;
                  font-size:42px;
                  letter-spacing:10px;
                  font-weight:bold;
                  color:#C8A46A;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                color:#4b5563;
                font-size:14px;
              ">
                Este código expira em
                <strong>5 minutos</strong>.
              </p>

              <p style="
                color:#9ca3af;
                font-size:13px;
                margin-top:30px;
              ">
                Se você não solicitou este código,
                ignore este e-mail.
              </p>

            </td>
          </tr>

          <tr>
            <td style="
              background:#f9fafb;
              padding:24px;
              text-align:center;
              font-size:12px;
              color:#9ca3af;
            ">
              © 2026 Dr. Denny Chalegre<br />
              Todos os direitos reservados.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

    await transporter.sendMail({
      from:
        `"Dr. Denny Chalegre" <${process.env.EMAIL_USER}>`,

      to: email,

      subject:
        "🔐 Código de verificação | Dr. Denny Chalegre",

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
    console.error(
      "Erro OTP:",
      error
    );

    return res.status(500).json({
      status: "error",
      message: "Erro ao enviar OTP"
    });
  }
}