const BotWhatsapp = require('@bot-whatsapp/bot');
const ProviderWS = require('@bot-whatsapp/provider/baileys');

module.exports = BotWhatsapp.createProvider(ProviderWS)