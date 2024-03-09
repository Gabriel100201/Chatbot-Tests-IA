const BotWhatsapp = require('@bot-whatsapp/bot');
const { run, runDetermine } = require('../services/openAI');
const { addToCCVClients } = require('../helpers/addToCCVClients');
const CCVClients = require('../constants/CCVClients.json');
const end = require('./end.flow');

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos.
 * Es decir, el flujo que hace uso de la IA.
 * El objetivo es persuadir al cliente a hacer uso de otros flujos con la deteccion de palabras clave.
 */
module.exports = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, {state, gotoFlow}) => {
        if (CCVClients.includes(ctx.from)) return
        try{
			const history = (state.getMyState()?.history ?? [])
            const ai = await runDetermine(history);

            if(ai.toLowerCase().includes('unknown')){
                return 
            }

            if(ai.toLowerCase().includes('decidido')){
                addToCCVClients(ctx);
                return gotoFlow(end)
            }
            
        }catch(err){
            console.log(`[ERROR]:`,err)
            return
        }
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        try{
            const newHistory = (state.getMyState()?.history ?? [])
            const name = ctx?.pushName ?? ''
    
            newHistory.push({
                role: 'user',
                content: ctx.body
            })
    
            const largeResponse = await run(name, newHistory)

            const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
            for (const chunk of chunks) {
                await flowDynamic(chunk)
            }

            newHistory.push({
                role: 'assistant',
                content: largeResponse
            })
        
            await state.update({history: newHistory})
    
        }catch(err){
            console.log(`[ERROR]:`,err)
        }
    })


