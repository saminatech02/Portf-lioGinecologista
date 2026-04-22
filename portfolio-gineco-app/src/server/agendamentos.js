const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

app.post("/agendar", async (req, res) => {
  const { nome, date } = req.body;

  await sheets.spreadsheets.values.append({
    spreadsheetId: "SEU_ID_DA_PLANILHA",
    range: "A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[nome, date]],
    },
  });

  res.send("Agendado!");
});

app.listen(3001, () => console.log("Servidor rodando"));