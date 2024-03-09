const fs = require('fs');
const CCVClients = require('../constants/CCVClients.json');
const path = require('path');
const CCVpath = path.join(__dirname, '../constants/CCVClients.json');

const timeToRemove = 20000; // 20 segs

const addToCCVClients = (ctx) => {
  const clientNumber = ctx.from;

  CCVClients.push(clientNumber);

  fs.writeFile(CCVpath, JSON.stringify(CCVClients), "utf8", (err) => {
    if (err) {
      console.log("Error al escribir en el archivo JSON:", err);
    } else {
      setTimeout(() => {
        removeFromCCVClients(clientNumber);
      }, timeToRemove);
    }
  });
};

const removeFromCCVClients = (clientNumber) => {
  const index = CCVClients.indexOf(clientNumber);
  if (index !== -1) {
    CCVClients.splice(index, 1);
    fs.writeFile(CCVpath, JSON.stringify(CCVClients), "utf8", (err) => {
      if (err) {
        console.log("Error al escribir en el archivo JSON:", err);
      }
    });
  }
};

module.exports = { addToCCVClients }