const BotWhatsapp = require('@bot-whatsapp/bot');
const sendMsg = require('../helpers/sendMessage');
const adminNumber = require('../config/numbers');

/**
 * Un flujo conversacion que responder cuando el cliente esta interesado en un producto ...
 */
module.exports = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
  .addAction(async (ctx) => {
    const number = adminNumber;
    const text = `Esta persona se quiere comunicar contigo: ${ctx.from}`;
    sendMsg({ number, text });
  })
  .addAnswer("En unos minutos un vendedor de technodevs de pondrá en contacto contigo😃🕑");