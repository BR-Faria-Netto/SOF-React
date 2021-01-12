require("dotenv").config();

const db = require("./configdb/db");
db.connect();

const services = require("./services/server");

const API_PORT = process.env.API_PORT;
const API_URL = process.env.API_URL;
const APP = services;

APP.listen(API_PORT, () => console.log(`Listening on Host ${API_URL} port ${API_PORT}`));
