const urlApi = require('../config/apiUrl');

const sendMsg = ({ number, text }) => {
  fetch(`${urlApi}/send-message`, {
    method: "POST",
    body: JSON.stringify({
      number: number,
      text: text
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => console.log("Mensaje enviado con exito a: ", number))
    .catch((err) => console.log("Error al enviar mensaje a: ", number, "[ERROR]: ", err))
}

module.exports = sendMsg