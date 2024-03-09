const BotWhatsapp = require('@bot-whatsapp/bot');
const database = require('./database');
const provider = require('./provider');
const flow = require('./flow');
const { initServer } = require('./services/http');

/**
 * Funcion principal del bot
 */
const main = async () => {

    const botInstance = await BotWhatsapp.createBot({
        database,
        provider,
        flow
    })

    initServer(botInstance)
}


main()