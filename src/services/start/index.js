const express = require('express');
const { createReadStream } = require('fs');
const { join } = require('path');
const { restartCCVClients } = require('../../helpers/addToCCVClients');
const app = express();
app.use(express.json());

const PORT = process.env?.PORT ?? 3000;

/**
 * INICIO DEL SERVICIO EN EL PUERTO DEFINIDO || 3000
 */
const initServer = (provider) => {

  restartCCVClients();

  app.get("/ready", (req, res) => {
    const query = req.query;
    if (query && query?.status === "fail") {
      res.redirect(`http://gabriel-portfolio-red.vercel.app/`);
      return;
    }
    res.send(`Bot funcionando y listo`);
  });

  app.get("/qr", async (_, res) => {
    const PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(PATH_QR);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  });

  app.post("/send-message", async (req, res) => {
    const number = req.body.number;
    const msg = req.body.text;
    await provider.sendText(`${number}@c.us`, msg);
    res.send({ data: "enviado!" });
  });

  app.listen(PORT, () => {
    console.log(`http://locahost:${PORT} listo🏁!`);
    console.log("PATH_QR: ", `http://locahost:${PORT}/qr`, `bot.qr.png`);
  });
};

module.exports = { initServer };
