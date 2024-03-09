const BotWhatsapp = require('@bot-whatsapp/bot');

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
module.exports = BotWhatsapp.addKeyword(["hola", "buenas"]).addAnswer([
  "¡Bienvenido al chat de Technodevs! 🚀 Soy tu asistente virtual, aquí para ayudarte en lo que necesites.",
  "💻 Somos una empresa especializada en el desarrollo de soluciones informáticas para hacer crecer tu negocio.",
  "🌐 ¡No dudes en preguntar, estamos listos para brindarte el mejor apoyo tecnológico! 🌟",
])
.addAction(async (ctx, {state, gotoFlow})=> {
  const newHistory = (state.getMyState()?.history ?? [])
  newHistory.push({
      role: 'user',
      content: ctx.body
  })
  await state.update({history: newHistory})
})
