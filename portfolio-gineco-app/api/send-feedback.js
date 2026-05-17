import nodemailer from "nodemailer";

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

        const {
            patientName,
            comment,
            rating,
            publish
        } = req.body;

        if (!patientName || !comment || !rating) {
            return res.status(400).json({
                status: "error",
                message: "Nome, comentário e nota são obrigatórios"
            });
        }

        const stars =
            "★".repeat(Number(rating)) +
            "☆".repeat(5 - Number(rating));

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
              Novo feedback recebido
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
              Uma nova avaliação foi enviada
            </h2>

            <p style="
              color: #4b5563;
              line-height: 1.6;
              font-size: 15px;
            ">
              Uma paciente enviou um feedback pelo site.
              Confira abaixo os detalhes da avaliação recebida.
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
                  Nome da paciente
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                  ${patientName}
                </strong>
              </div>

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Nota
                </p>

                <strong style="
                  color: #C8A46A;
                  font-size: 22px;
                  letter-spacing: 2px;
                ">
                  ${stars}
                </strong>

                <p style="
                  margin: 6px 0 0;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  ${rating} de 5
                </p>
              </div>

              <div style="margin-bottom: 18px;">
                <p style="
                  margin: 0 0 4px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Autorizou publicação?
                </p>

                <strong style="
                  color: #111827;
                  font-size: 16px;
                ">
                  ${publish ? "Sim, autorizou publicar" : "Não autorizou publicar"}
                </strong>
              </div>

              <div>
                <p style="
                  margin: 0 0 8px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Comentário
                </p>

                <div style="
                  background: #ffffff;
                  border-radius: 14px;
                  border: 1px solid #ead7b5;
                  padding: 18px;
                  color: #374151;
                  font-size: 15px;
                  line-height: 1.7;
                ">
                  ${comment}
                </div>
              </div>

            </div>

            <p style="
              color: #4b5563;
              line-height: 1.6;
              font-size: 14px;
            ">
              Caso a paciente tenha autorizado a publicação, o feedback poderá aparecer na seção de depoimentos do site.
            </p>

            <p style="
              color: #9ca3af;
              font-size: 13px;
              margin-top: 28px;
            ">
              Esta é uma mensagem automática enviada pelo site.
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

            to: "devsamaravitoria@gmail.com",

            subject:
                "⭐ Novo feedback recebido | Dr. Denny Chalegre",

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
            message: "E-mail de feedback enviado com sucesso"
        });

    } catch (error) {
        console.error(
            "Erro ao enviar feedback por e-mail:",
            error
        );

        return res.status(500).json({
            status: "error",
            message: "Erro ao enviar feedback por e-mail"
        });
    }
}