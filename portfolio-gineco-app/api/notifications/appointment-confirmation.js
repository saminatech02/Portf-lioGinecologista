import nodemailer from "nodemailer";

const transporter =
    nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

const formatDate = (date) => {
    if (!date) return "";

    const [year, month, day] =
        date.split("-");

    const localDate =
        new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

    return localDate.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
};

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                status: "error",
                message: "Método não permitido"
            });
        }

        const {
            email,
            patientName,
            eventName,
            date,
            hour,
            doctorName,
            placeName
        } = req.body;

        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "E-mail é obrigatório"
            });
        }

        const formattedDate =
            formatDate(date);

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
              Agendamento confirmado
            </h1>

            <p style="
              color: #ffffff;
              margin-top: 10px;
              font-size: 14px;
            ">
              Dr. Denny Chalegre
            </p>
          </div>

          <div style="padding: 40px;">

            <h2 style="
              margin-top: 0;
              color: #111827;
            ">
              Olá, ${patientName || "paciente"}!
            </h2>

            <p style="
              color: #4b5563;
              line-height: 1.6;
              font-size: 15px;
            ">
              Seu agendamento foi realizado com sucesso.
              Confira abaixo os detalhes da sua consulta.
            </p>

            <div style="
              margin: 32px 0;
              background: #fff8ed;
              border: 1px solid #ead7b5;
              border-radius: 18px;
              padding: 24px;
            ">

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Tipo de consulta
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                  ${eventName || "Consulta"}
                </strong>
              </div>

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Data
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                  text-transform: capitalize;
                ">
                  ${formattedDate || date || "-"}
                </strong>
              </div>

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Horário
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                  ${hour || "-"}
                </strong>
              </div>

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Médico
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                  ${doctorName || "Dr. Denny Chalegre"}
                </strong>
              </div>

              <div>
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Local
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                Rua Francisco Alves, 325, Paissandu - Recife - PE (Clínica Acolher Saúde - salas 504 - 506)
                </strong>
              </div>

            </div>

            <div style="
              margin: 32px 0;
              background: #ffffff;
              border: 1px solid #ead7b5;
              border-radius: 18px;
              padding: 24px;
            ">
              <h3 style="
                margin: 0 0 16px;
                color: #111827;
                font-size: 18px;
              ">
                O que levar para a consulta?
              </h3>

              <ul style="
                margin: 0;
                padding-left: 20px;
                color: #4b5563;
                font-size: 14px;
                line-height: 1.7;
              ">
                <li>Documento de identificação;</li>
                <li>Cartão do plano de saúde, se for convênio. Se for particular, não precisa;</li>
                <li>Exames ginecológicos anteriores, como Papanicolau, ultrassom transvaginal, ultrassom das mamas e exames de sangue;</li>
                <li>Data da última menstruação e histórico de regularidade do ciclo menstrual;</li>
                <li>Lista de medicamentos de uso contínuo, incluindo anticoncepcionais;</li>
                <li>Lista de dúvidas e sintomas, como dores, corrimentos ou outras alterações percebidas.</li>
              </ul>
            </div>

            <p style="
              color: #4b5563;
              line-height: 1.6;
              font-size: 14px;
            ">
              Caso precise remarcar ou cancelar, entre em contato com a clínica. Através do número: 81 99812-4105 ou 813019-4526
            </p>

            <p style="
              color: #9ca3af;
              font-size: 13px;
              margin-top: 28px;
            ">
              Esta é uma mensagem automática. Por favor, não responda este e-mail.
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
            from:
                `"Dr. Denny Chalegre" <${process.env.EMAIL_USER}>`,

            to: email,

            subject:
                "✅ Agendamento confirmado | Dr. Denny Chalegre",

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
            message: "E-mail de confirmação enviado com sucesso"
        });

    } catch (error) {
        console.error(
            "Erro confirmação agendamento:",
            error
        );

        return res.status(500).json({
            status: "error",
            message: "Erro ao enviar confirmação de agendamento"
        });
    }
}