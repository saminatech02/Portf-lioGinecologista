import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", "https://www.dennychalegre.com.br"
}));

app.use(express.json());

const API_URL =
  "https://amigobot-api.amigoapp.com.br";

// =========================
// HELPERS
// =========================

const getHeaders = () => ({
  Authorization:
    `Bearer ${process.env.API_TOKEN}`
});

// =========================
// SMTP
// =========================

if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  console.error(
    "EMAIL_USER ou EMAIL_PASS não configurados."
  );
}

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

// =========================
// OTP STORE
// =========================

const otpStore = new Map();

// =========================
// DOCTORS
// =========================

app.get("/doctors", async (req, res) => {

  try {

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

    return res.json({
      status: "success",
      data: doctors
    });

  } catch (error) {

    console.error(
      "Erro /doctors:",
      error.response?.data ||
      error.message
    );

    return res.status(500).json({
      status: "error",
      message:
        "Erro ao buscar médicos"
    });
  }
});

// =========================
// VALIDAR CPF
// =========================

app.get("/patients/exists", async (req, res) => {

  try {

    let { cpf } = req.query;

    if (!cpf) {
      return res.status(400).json({
        status: "error",
        message:
          "CPF é obrigatório"
      });
    }

    cpf = String(cpf)
      .replace(/\D/g, "");

    if (cpf.length !== 11) {
      return res.status(400).json({
        status: "error",
        message:
          "CPF inválido"
      });
    }

    const response =
      await axios.get(
        `${API_URL}/patients/exists?cpf=${cpf}`,
        {
          headers: getHeaders()
        }
      );

    return res.json({
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
});

// =========================
// CRIAR PACIENTE
// =========================

app.post("/patients", async (req, res) => {

  try {

    const body = req.body;

    if (!body.name || !body.cpf) {

      return res.status(400).json({
        status: "error",
        message:
          "Nome e CPF são obrigatórios"
      });
    }

    body.cpf =
      String(body.cpf)
        .replace(/\D/g, "");

    body.cpf_responsible =
      String(
        body.cpf_responsible ||
        body.cpf
      ).replace(/\D/g, "");

    const response =
      await axios.post(
        `${API_URL}/patients`,
        {
          name: body.name,
          born: body.born,
          contact_cellphone:
            body.contact_cellphone,
          email: body.email,
          cpf: body.cpf,
          cpf_responsible:
            body.cpf_responsible,
          insurance_number:
            body.insurance_number,
          insurance_id:
            body.insurance_id
        },
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "application/json"
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
});

// =========================
// PLANOS
// =========================

app.get(
  "/insurances/plans/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      const response =
        await axios.get(
          `${API_URL}/insurances/plans/${id}?insurances_group_id=1976&user_id=160011`,
          {
            headers: getHeaders()
          }
        );

      return res.json({
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
);

// =========================
// ENVIAR OTP
// =========================

app.post("/auth/send-otp",
  async (req, res) => {

    try {

      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          status: "error",
          message:
            "E-mail é obrigatório"
        });
      }

      const otp =
        Math.floor(
          100000 +
          Math.random() * 900000
        ).toString();

      otpStore.set(email, {
        otp,
        expires:
          Date.now() +
          5 * 60 * 1000
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

          <!-- HEADER -->
          <tr>
            <td
              style="
                background:linear-gradient(
                  135deg,
                  #C8A46A,
                  #C8A46A
                );
                padding:40px;
                text-align:center;
              "
            >

              <h1 style="
                color:#white;
                margin:0;
                font-size:28px;
              ">
                Dr. Denny Chalegre
              </h1>

              <p style="
                color:#white;
                margin-top:10px;
                font-size:14px;
              ">
                Verificação de segurança
              </p>

            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px;">

              <h2 style="
                margin-top:0;
                color:#white;
              ">
                Seu código de verificação
              </h2>

              <p style="
                color:#white;
                line-height:1.6;
              ">
                Utilize o código abaixo para
                continuar seu processo.
              </p>

              <!-- OTP -->
              <div style="
                margin:40px 0;
                text-align:center;
              ">

                <div style="
                  display:inline-block;
                  background:#eff6ff;
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
                color:#white;
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

          <!-- FOOTER -->
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

        from: `"Dr. Denny Chalegre" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "🔐 Código de verificação | Dr. Denny Chalegre",

        html,

        priority: "high",

        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high"
        }
      });
      return res.json({
        status: "success",
        message:
          "OTP enviado com sucesso"
      });

    } catch (error) {

      console.error(
        "Erro OTP:",
        error
      );

      return res.status(500).json({
        status: "error",
        message:
          "Erro ao enviar OTP"
      });
    }
  }
);

// =========================
// VALIDAR OTP
// =========================

app.post(
  "/auth/validate-otp",
  (req, res) => {

    const { email, otp } =
      req.body;

    const stored =
      otpStore.get(email);

    if (!stored) {

      return res.status(400).json({
        status: "error",
        message:
          "OTP não encontrado"
      });
    }

    if (
      Date.now() >
      stored.expires
    ) {

      otpStore.delete(email);

      return res.status(400).json({
        status: "error",
        message:
          "OTP expirado"
      });
    }

    if (
      stored.otp !== otp
    ) {

      return res.status(400).json({
        status: "error",
        message:
          "OTP inválido"
      });
    }

    otpStore.delete(email);

    return res.json({
      status: "success",
      message:
        "OTP validado"
    });
  }
);

// =========================
// EVENTOS
// =========================

app.get("/events", async (req, res) => {

  try {

    const { place_id } = req.query;

    if (!place_id) {

      return res.status(400).json({
        status: "error",
        message:
          "place_id é obrigatório"
      });
    }

    const response =
      await axios.get(
        `${API_URL}/events?place_id=${place_id}`,
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "application/json"
          }
        }
      );

    return res.json({
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
});

// =========================
// CRIAR AGENDAMENTO
// =========================

app.post("/appointments", async (req, res) => {

  try {

    const {
      insurance_id,
      event_id,
      user_id,
      start_date,
      end_date,
      place_id,
      patient_id,
      patient
    } = req.body;

    // 🔥 validações
    if (
      !event_id ||
      !user_id ||
      !start_date ||
      !place_id
    ) {

      return res.status(400).json({
        status: "error",
        message:
          "Dados obrigatórios do agendamento ausentes"
      });
    }

    // 🔥 payload final
    const payload = {
      event_id: Number(event_id),

      user_id: Number(user_id),

      start_date,

      end_date,

      place_id: Number(place_id),

      patient_id: patient_id
        ? Number(patient_id)
        : null
    };

    // 🔥 adiciona insurance_id somente se existir
    if (insurance_id && insurance_id !== null) {
      payload.insurance_id =
        Number(insurance_id);
    } else {
      payload.insurance_id = 42470;
    }

    console.log(
      "Payload agendamento:",
      payload
    );

    // 🔥 request API
    const response =
      await axios.post(
        `${API_URL}/attendances`,
        payload,
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "application/json"
          }
        }
      );

    return res.status(201).json({
      status: "success",
      data: response.data
    });

  } catch (error) {

    console.error(
      "Erro ao criar agendamento:",
      error.response?.data ||
      error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      status: "error",
      message:
        error.response?.data?.message ||
        "Erro ao criar agendamento"
    });
  }
});

// =========================
// CALENDÁRIO / HORÁRIOS
// =========================

app.get("/calendar", async (req, res) => {

  try {

    const {
      event_id,
      place_id
    } = req.query;

    // =========================
    // VALIDAÇÕES
    // =========================

    if (!event_id) {

      return res.status(400).json({
        status: "error",
        message:
          "event_id é obrigatório"
      });
    }

    if (!place_id) {

      return res.status(400).json({
        status: "error",
        message:
          "place_id é obrigatório"
      });
    }

    // =========================
    // REQUEST API
    // =========================

    const response =
      await axios.get(
        `${API_URL}/calendar?event_id=${event_id}&place_id=${place_id}`,
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "application/json"
          }
        }
      );

    // =========================
    // RESPONSE
    // =========================

    return res.json({
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
});

// =========================
// TESTE
// =========================

app.get("/test", (req, res) => {
  res.json({
    message:
      "Servidor funcionando!"
  });
});

// =========================
// START
// =========================

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});