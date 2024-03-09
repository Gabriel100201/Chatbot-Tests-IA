require("dotenv").config();

const urlApi = process.env.PUBLIC_URL || "http://localhost:3000";

module.exports = urlApi