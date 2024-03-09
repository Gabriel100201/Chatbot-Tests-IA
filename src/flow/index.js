const BotWhatsapp = require("@bot-whatsapp/bot");
const ia = require("./ia.flow");
const hello = require("./hello.flow");
const end = require("./end.flow");
/**
 * Deben implementarse todos los flows aquí
 */
module.exports = BotWhatsapp.createFlow([
  ia,
  hello,
  end
]);
